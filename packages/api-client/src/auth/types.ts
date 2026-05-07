export type SignInResult =
  | { success: true; redirectTo: string }
  | {
      success: false;
      error: "invalid_credentials" | "unknown";
      message: string;
    };
