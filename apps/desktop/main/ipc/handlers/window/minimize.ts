import { getActiveWindow } from ".";
import { IpcMainListener } from "../../../../shared/ipc/types";

export const minimizeWindow = (() => {
  const window = getActiveWindow();
  if (window) {
    window.minimize();
  }
}) satisfies IpcMainListener;
