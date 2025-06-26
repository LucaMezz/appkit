import { readFileSync } from "node:fs";
import path from "node:path";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { app, BrowserWindow, ipcMain } from "electron";
import started from "electron-squirrel-startup";
import { Hono } from "hono";
import { ipcMainListeners } from "./ipc-main-listeners";
import { db } from "./utils/db";

const HONO_PORT = 3000;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

app
  .whenReady()
  .then(() => {
    migrateDatabase();
    setupStaticFileServer();
    registerIpcMainListeners();

    app.on("activate", () => {
      // On OS X it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  })
  .catch(console.error);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Load the app
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL).catch(console.error);
  } else {
    // In production, use Hono server for serving static files
    const startURL = `http://localhost:${HONO_PORT}`;
    mainWindow.loadURL(startURL).catch(console.error);
  }

  // Open the DevTools when in development mode.
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
  }
}

function migrateDatabase(): void {
  const isProduction = app.isPackaged;
  const baseResourcePath = isProduction ? process.resourcesPath : ".";
  const migrationsFolder = path.resolve(baseResourcePath, "drizzle");

  migrate(db, { migrationsFolder });
}

function setupStaticFileServer(): void {
  const hono = new Hono();

  if (!MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    // Set up Hono server for production
    const distPath = path.join(
      __dirname,
      `../renderer/${MAIN_WINDOW_VITE_NAME}`,
    );

    // Serve static files
    hono.use("/*", serveStatic({ root: distPath }));

    // Add fallback setting for SPA
    hono.get("*", (c) => {
      const html = readFileSync(path.join(distPath, "index.html"), "utf-8");
      return c.html(html);
    });

    // Start the server
    serve(
      {
        fetch: hono.fetch,
        port: HONO_PORT,
      },
      createWindow,
    );
  } else {
    createWindow();
  }
}

function registerIpcMainListeners(): void {
  for (const [channel, listener] of Object.entries(ipcMainListeners)) {
    ipcMain.handle(channel, listener);
  }
}
