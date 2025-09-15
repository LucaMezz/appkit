import { use } from "react";
import type { users } from "@/schema";

interface Props {
  usersPromise: Promise<(typeof users.$inferSelect)[]>;
}

export function UserList({ usersPromise }: Props): React.JSX.Element {
  const users = use(usersPromise);

  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}
