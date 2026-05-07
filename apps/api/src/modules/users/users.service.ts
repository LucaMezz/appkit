import { db } from "@/db";
import { users } from "@/db/schema";

export const usersService = {
  list() {
    return db.select().from(users);
  },

  findByEmail(email: string) {
    return db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });
  },
};
