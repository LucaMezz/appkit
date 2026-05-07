import { SignInResult } from "./types";

export async function signInWithCredentials(
  email: string,
  password: string,
  options?: {
    apiBaseUrl?: string;
    callbackUrl?: string;
  },
): Promise<SignInResult> {
  const apiBaseUrl = options?.apiBaseUrl ?? "http://localhost:4000";
  const callbackUrl = options?.callbackUrl ?? "http://localhost:5173/dashboard";

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

  const response = await fetch(`${apiBaseUrl}/auth/callback/credentials`, {
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

  const finalUrl = new URL(response.url);

  if (
    finalUrl.pathname === "/auth/signin" &&
    finalUrl.searchParams.get("error") === "CredentialsSignin"
  ) {
    return {
      success: false,
      error: "invalid_credentials",
      message: "Invalid email or password.",
    };
  }

  if (!response.ok) {
    return {
      success: false,
      error: "unknown",
      message: "Sign in failed. Please try again.",
    };
  }

  return {
    success: true,
    redirectTo: finalUrl.toString(),
  };
}

export { SignInResult };
