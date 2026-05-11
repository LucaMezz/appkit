import { AuthSession } from "./types";

export async function fetchAuthSession(options?: { apiBaseUrl?: string }): Promise<AuthSession> {
  const apiBaseUrl = options?.apiBaseUrl ?? "http://localhost:4000";

  const response = await fetch(`${apiBaseUrl}/auth/session`, {
    credentials: "include",
  });

  if (!response.ok) {
    return null;
  }

  const session = await response.json();

  return session?.user ? session : null;
}
