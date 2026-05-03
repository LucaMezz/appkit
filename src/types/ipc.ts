import { ipcMain } from "electron";

export const IPC_CHANNELS = {
  FETCH_USERS: "users:fetch",
  REGISTER_USER: "users:register",
  DELETE_USERS: "users:delete",
  WINDOW_MINIMIZE: "window:minimize",
  WINDOW_MAXIMIZE: "window:maximize",
  WINDOW_CLOSE: "window:close",
};

export type IpcChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS];

export type IpcMainListener = Parameters<typeof ipcMain.handle>[1];
