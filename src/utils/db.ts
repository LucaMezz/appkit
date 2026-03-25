import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

import Database, { type Database as DatabaseType } from "better-sqlite3";
import { type BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";
import { app } from "electron";

import { getErrorMessage } from "./get-error-message";

const isProduction = app.isPackaged;

function initializeDatabase(): BetterSQLite3Database {
  let betterSqlite3: DatabaseType | undefined;

  try {
    const baseResourcePath = isProduction ? process.resourcesPath : ".";
    const databaseDirectoryPath = path.resolve(baseResourcePath, "database");

    if (!existsSync(databaseDirectoryPath)) {
      mkdirSync(databaseDirectoryPath, { recursive: true });
    }

    const appDbPath = path.join(databaseDirectoryPath, "app.db");

    betterSqlite3 = new Database(appDbPath, {
      verbose: isProduction ? undefined : console.info,
    });

    betterSqlite3.pragma("journal_mode = WAL");

    return drizzle(betterSqlite3);
  } catch (error) {
    if (betterSqlite3) {
      try {
        betterSqlite3.close();
      } catch (closeError) {
        console.error("[Database] Error while closing database:", closeError);
      }
    }

    if (!isProduction) {
      console.error("[Database] Initialization failed:", error);
    }

    throw new Error(`Database initialization failed: ${getErrorMessage(error) || "Unknown error"}`);
  }
}

export const db = initializeDatabase();
