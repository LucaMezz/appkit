import { SignInResult } from "./types";

export async function signInWithCredentials(
  email: string,
  password: string,
  options?: {
    apiBaseUrl?: string;
    redirectTo?: string;
  },
): Promise<SignInResult> {
  const apiBaseUrl = options?.apiBaseUrl ?? "http://localhost:4000";
  const redirectTo = options?.redirectTo ?? "/dashboard";

  const csrfResponse = await fetch(`${apiBaseUrl}/auth/csrf`, {
    credentials: "include",
  });

  if (!csrfResponse.ok) {
    return {
      success: false,
      error: "unknown",
      message: "Could not start sign in. Please try again.",
    };
  }

  const { csrfToken } = (await csrfResponse.json()) as {
    csrfToken: string;
  };

  const callbackUrl = `${apiBaseUrl}/auth/session`;
  await fetch(`${apiBaseUrl}/auth/callback/credentials`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      csrfToken,
      email,
      password,
      callbackUrl,
    }),
  });

  const sessionResponse = await fetch(`${apiBaseUrl}/auth/session`, {
    credentials: "include",
  });

  if (!sessionResponse.ok) {
    return {
      success: false,
      error: "unknown",
      message: "Could not verify sign in. Please try again.",
    };
  }

  const session = await sessionResponse.json();

  if (!session?.user) {
    return {
      success: false,
      error: "invalid_credentials",
      message: "Invalid email or password.",
    };
  }

  return {
    success: true,
    redirectTo,
  };
}

export type { SignInResult };
