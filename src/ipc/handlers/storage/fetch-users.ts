import { users } from "@/schema";
import { IpcMainListener } from "@/types/ipc";
import { db } from "@/utils/db";

export const fetchUsers = ((): Promise<(typeof users.$inferSelect)[]> => {
  return db.select().from(users);
}) satisfies IpcMainListener;
