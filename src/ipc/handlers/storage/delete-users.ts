import { inArray } from "drizzle-orm";

import { users } from "@/schema";
import { IpcMainListener } from "@/types/ipc";
import { db } from "@/utils/db";

export const deleteUsers = (async (_event, userIds: number[]): Promise<void> => {
  if (userIds.length === 0) {
    return;
  }

  await db.delete(users).where(inArray(users.id, userIds));
}) satisfies IpcMainListener;
