import { getActiveWindow } from ".";
import { IpcMainListener } from "../../../../shared/ipc/types";

export const closeWindow = (() => {
  const window = getActiveWindow();
  if (window) {
    window.close();
  }
}) satisfies IpcMainListener;
