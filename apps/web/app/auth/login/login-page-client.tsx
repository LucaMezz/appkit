"use client";

import { signInWithCredentials } from "@appkit/api-client";
import { LoginInput } from "@appkit/core";
import { LoginScreen } from "@appkit/ui/client";
import { useRouter } from "next/navigation";

export function LoginPageClient(): React.JSX.Element {
  const router = useRouter();

  async function onSubmit(data: LoginInput) {
    const result = await signInWithCredentials(data.email, data.password, {
      apiBaseUrl: "http://localhost:4000",
      redirectTo: "/dashboard",
    });

    if (!result.success) {
      console.error(result.message);
      return;
    }

    router.push(result.redirectTo);
  }

  return <LoginScreen onSubmit={onSubmit} />;
}
