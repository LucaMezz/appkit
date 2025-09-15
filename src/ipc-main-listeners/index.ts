import type { ipcMain } from "electron";
import { deleteUsers } from "./delete-users";
import { fetchUsers } from "./fetch-users";
import { registerUser } from "./register-user";

export const ipcMainListeners = {
  fetchUsers,
  registerUser,
  deleteUsers,
};

export type IpcMainListener = Parameters<typeof ipcMain.handle>[1];
