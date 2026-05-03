import { contextBridge, ipcRenderer } from "electron";

import { IPC_CHANNELS, IpcChannel } from "./types/ipc";

export type AllowedChannel = IpcChannel;

const api = {
  platform: process.platform,

  window: {
    minimize: () => ipcRenderer.invoke(IPC_CHANNELS.WINDOW_MINIMIZE),

    maximize: () => ipcRenderer.invoke(IPC_CHANNELS.WINDOW_MAXIMIZE),

    close: () => ipcRenderer.invoke(IPC_CHANNELS.WINDOW_CLOSE),
  },

  storage: {
    users: {
      fetch: () => ipcRenderer.invoke(IPC_CHANNELS.FETCH_USERS),

      register: (name: string) => ipcRenderer.invoke(IPC_CHANNELS.REGISTER_USER, { name }),

      delete: (userIds: number[]) => ipcRenderer.invoke(IPC_CHANNELS.DELETE_USERS, userIds),
    },
  },
};

export type DesktopApi = typeof api;

contextBridge.exposeInMainWorld("desktopApi", api);

declare global {
  interface Window {
    desktopApi: DesktopApi;
  }
}
