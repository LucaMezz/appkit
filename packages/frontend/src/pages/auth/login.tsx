import { signInWithCredentials } from "@appkit/api-client";
import { LoginInput, loginSchema } from "@appkit/core";
import { LoginForm } from "@appkit/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useFrontendRuntimeConfig } from "../../config";

export function Login(): React.JSX.Element {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const config = useFrontendRuntimeConfig();
  const callbackUrl = searchParams.get("callbackUrl");

  async function onSubmit(data: LoginInput) {
    const result = await signInWithCredentials(data.email, data.password, {
      apiBaseUrl: config.apiBaseUrl,
      redirectTo: callbackUrl ?? "/dashboard",
    });

    if (!result.success) {
      console.error(result.message);
      return;
    }

    void navigate(result.redirectTo);
  }

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex items-center justify-center h-full w-full">
      <LoginForm form={form} onSubmit={onSubmit} />
    </div>
  );
}
