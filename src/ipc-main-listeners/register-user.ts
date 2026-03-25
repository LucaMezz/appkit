import { users } from "@/schema";
import { db } from "@/utils/db";

import type { IpcMainListener } from ".";

export const registerUser = (async (
  _: unknown,
  name: string,
): Promise<typeof users.$inferSelect> => {
  return db.insert(users).values({ name }).returning().get();
}) satisfies IpcMainListener;
