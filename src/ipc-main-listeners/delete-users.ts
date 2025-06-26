import { users } from "@/schema";
import { db } from "@/utils/db";
import type { IpcMainListener } from ".";

export const deleteUsers = (async (): Promise<void> => {
  await db.delete(users);
}) satisfies IpcMainListener;
