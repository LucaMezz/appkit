import { getActiveWindow } from ".";
import { IpcMainListener } from "../../../../shared/ipc/types";

export const maximizeWindow = (() => {
  const window = getActiveWindow();
  if (window) {
    if (window.isMaximized()) {
      window.unmaximize();
    } else {
      window.maximize();
    }
  }
}) satisfies IpcMainListener;
