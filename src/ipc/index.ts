import { deleteUsers } from "@/ipc/handlers/storage/delete-users";
import { fetchUsers } from "@/ipc/handlers/storage/fetch-users";
import { registerUser } from "@/ipc/handlers/storage/register-user";
import { closeWindow } from "@/ipc/handlers/window/close";
import { maximizeWindow } from "@/ipc/handlers/window/maximize";
import { minimizeWindow } from "@/ipc/handlers/window/minimize";
import { IPC_CHANNELS } from "@/types/ipc";

export const ipcMainListeners = {
  [IPC_CHANNELS.FETCH_USERS]: fetchUsers,
  [IPC_CHANNELS.REGISTER_USER]: registerUser,
  [IPC_CHANNELS.DELETE_USERS]: deleteUsers,
  [IPC_CHANNELS.WINDOW_MINIMIZE]: minimizeWindow,
  [IPC_CHANNELS.WINDOW_MAXIMIZE]: maximizeWindow,
  [IPC_CHANNELS.WINDOW_CLOSE]: closeWindow,
} as const;
