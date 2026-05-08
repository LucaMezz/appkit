import { SignOutResult } from "./types";

export async function signOut(options?: {
  apiBaseUrl?: string;
  redirectTo?: string;
}): Promise<SignOutResult> {
  const apiBaseUrl = options?.apiBaseUrl ?? "http://localhost:4000";
  const redirectTo = options?.redirectTo ?? "/auth/login";

  const csrfResponse = await fetch(`${apiBaseUrl}/auth/csrf`, {
    credentials: "include",
  });

  if (!csrfResponse.ok) {
    return {
      success: false,
      error: "unknown",
      message: "Could not start sign out. Please try again.",
    };
  }

  const { csrfToken } = (await csrfResponse.json()) as {
    csrfToken: string;
  };

  await fetch(`${apiBaseUrl}/auth/signout`, {
    method: "POST",
    credentials: "include",
    redirect: "manual",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      csrfToken,
      callbackUrl: `${apiBaseUrl}/auth/session`,
    }),
  });

  return {
    success: true,
    redirectTo,
  };
}
