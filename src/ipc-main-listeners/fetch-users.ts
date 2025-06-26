import { users } from "@/schema";
import { db } from "@/utils/db";
import type { IpcMainListener } from ".";

export const fetchUsers = ((): Promise<(typeof users.$inferSelect)[]> => {
  return db.select().from(users);
}) satisfies IpcMainListener;
