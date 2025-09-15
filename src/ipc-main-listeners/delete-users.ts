import { inArray } from "drizzle-orm";
import { users } from "@/schema";
import { db } from "@/utils/db";
import type { IpcMainListener } from ".";

export const deleteUsers = (async (
  _event,
  userIds: number[],
): Promise<void> => {
  if (userIds.length === 0) {
    return;
  }

  await db.delete(users).where(inArray(users.id, userIds));
}) satisfies IpcMainListener;
