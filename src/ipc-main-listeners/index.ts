import type { ipcMain } from "electron";
import { deleteAllUsers } from "./delete-all-users";
import { fetchUsers } from "./fetch-users";
import { registerUser } from "./register-user";

export const ipcMainListeners = {
  fetchUsers,
  registerUser,
  deleteAllUsers,
};

export type IpcMainListener = Parameters<typeof ipcMain.handle>[1];
