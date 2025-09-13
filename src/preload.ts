import { contextBridge, ipcRenderer } from "electron";
import type { ipcMainListeners } from "./ipc-main-listeners";

export type AllowedChannel = keyof typeof ipcMainListeners;

// Extract all arguments except the first one (event argument)
type InvokeArgs<K extends AllowedChannel> =
  Parameters<(typeof ipcMainListeners)[K]> extends [unknown, ...infer Args]
    ? Args
    : never;

const api = {
  invoke: <K extends AllowedChannel>(
    channel: K,
    ...args: InvokeArgs<K> extends [] ? [] : InvokeArgs<K>
  ): Promise<Awaited<ReturnType<(typeof ipcMainListeners)[K]>>> => {
    return ipcRenderer.invoke(channel, ...args);
  },
};

contextBridge.exposeInMainWorld("ipcRenderer", api);

declare global {
  interface Window {
    ipcRenderer: typeof api;
  }
}
