import { IpcMainListener } from "@/types/ipc";

import { getActiveWindow } from ".";

export const closeWindow = (() => {
  const window = getActiveWindow();
  if (window) {
    window.close();
  }
}) satisfies IpcMainListener;
