import { use } from "react";
import type { users } from "@/schema";

interface Props {
  usersPromise: Promise<(typeof users.$inferSelect)[]>;
}

export function UserList({ usersPromise }: Props): React.JSX.Element {
  const users = use(usersPromise);
  const sortedUsers = [...users].sort((a, b) => b.id - a.id);

  return (
    <ul>
      {sortedUsers.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
