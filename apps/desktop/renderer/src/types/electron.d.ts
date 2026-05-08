import type { api } from "#preload";

declare global {
  interface Window {
    ipcRenderer: typeof api;
  }
}

export {};
