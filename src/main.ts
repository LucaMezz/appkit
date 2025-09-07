import { readFileSync } from "node:fs";
import path from "node:path";
import { type ServerType, serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { app, BrowserWindow, dialog, ipcMain } from "electron";
import started from "electron-squirrel-startup";
import { Hono } from "hono";
import { ipcMainListeners } from "./ipc-main-listeners";
import { db } from "./utils/db";

const CONFIG = {
  HONO_PORT: 3000,
  WINDOW: {
    WIDTH: 800,
    HEIGHT: 600,
  },
} as const;

let mainWindow: BrowserWindow | null = null;
let honoServer: ServerType | null = null;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

app
  .whenReady()
  .then(() => {
    try {
      initializeApp();
    } catch (error) {
      console.error("Failed to initialize application:", error);
      dialog.showErrorBox(
        "Initialization Error",
        `Failed to start the application: ${error instanceof Error ? error.message : String(error)}`,
      );
      app.quit();
    }
  })
  .catch((error) => {
    console.error("Fatal error during app initialization:", error);
    app.quit();
  });

function initializeApp(): void {
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
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    cleanup();
    app.quit();
  }
});

app.on("before-quit", () => {
  cleanup();
});

function cleanup(): void {
  if (honoServer) {
    honoServer.close((err) => {
      if (err) {
        console.error("Error closing Hono server:", err);
      }
    });
    honoServer = null;
  }

  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.close();
  }
  mainWindow = null;
}

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: CONFIG.WINDOW.WIDTH,
    height: CONFIG.WINDOW.HEIGHT,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  loadApplication(mainWindow);

  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
  }
}

function loadApplication(window: BrowserWindow): void {
  const appUrl = MAIN_WINDOW_VITE_DEV_SERVER_URL
    ? MAIN_WINDOW_VITE_DEV_SERVER_URL
    : `http://localhost:${CONFIG.HONO_PORT}`;

  window.loadURL(appUrl).catch((error) => {
    console.error("Failed to load application:", error);
    dialog.showErrorBox(
      "Loading Error",
      "Failed to load the application. Please try restarting.",
    );
  });
}

function migrateDatabase(): void {
  try {
    const isProduction = app.isPackaged;
    const baseResourcePath = isProduction ? process.resourcesPath : ".";
    const migrationsFolder = path.resolve(baseResourcePath, "drizzle");

    console.log("Running database migrations from:", migrationsFolder);
    migrate(db, { migrationsFolder });
    console.log("Database migrations completed successfully");
  } catch (error) {
    console.error("Database migration failed:", error);
    throw new Error(
      `Failed to migrate database: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

function setupStaticFileServer(): void {
  if (!MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    try {
      const hono = new Hono();

      const distPath = path.join(
        __dirname,
        `../renderer/${MAIN_WINDOW_VITE_NAME}`,
      );

      hono.use("/*", serveStatic({ root: distPath }));

      hono.get("*", (c) => {
        try {
          const html = readFileSync(path.join(distPath, "index.html"), "utf-8");
          return c.html(html);
        } catch (error) {
          console.error("Failed to read index.html:", error);
          return c.text("Failed to load application", 500);
        }
      });

      honoServer = serve(
        {
          fetch: hono.fetch,
          port: CONFIG.HONO_PORT,
        },
        () => {
          console.log(`Hono server started on port ${CONFIG.HONO_PORT}`);
          createWindow();
        },
      );

      if (honoServer) {
        honoServer.on("error", (error) => {
          console.error("Hono server error:", error);
          dialog.showErrorBox(
            "Server Error",
            `Failed to start server: ${error instanceof Error ? error.message : String(error)}`,
          );
          app.quit();
        });
      }
    } catch (error) {
      console.error("Failed to setup static file server:", error);
      throw new Error(
        `Failed to start server: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  } else {
    createWindow();
  }
}

function registerIpcMainListeners(): void {
  try {
    for (const [channel, listener] of Object.entries(ipcMainListeners)) {
      ipcMain.handle(channel, listener);
    }
    console.log(
      `Registered ${Object.keys(ipcMainListeners).length} IPC listeners`,
    );
  } catch (error) {
    console.error("Failed to register IPC listeners:", error);
    throw new Error(
      `Failed to register IPC listeners: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
