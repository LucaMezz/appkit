import { db } from "@/db";
import { users } from "@/db/schema";

export const usersService = {
  list() {
    return db.select().from(users);
  },
};
