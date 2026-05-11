"use client";

import { registerUser } from "@appkit/api-client";
import type { RegisterInput } from "@appkit/core";
import { SignUpScreen } from "@appkit/ui/client";
import { useRouter } from "next/navigation";

export function SignUpPageClient(): React.JSX.Element {
  const router = useRouter();

  async function onSubmit(data: RegisterInput) {
    const result = await registerUser(data, {
      apiBaseUrl: "http://localhost:4000",
    });

    if (!result.success) {
      console.error(result.message);
      return;
    }

    console.info("successfully registered.");
    router.push("/auth/login");
  }

  return <SignUpScreen onSubmit={onSubmit} />;
}
