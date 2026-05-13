import { signInWithCredentials } from "@appkit/api-client";
import { LoginInput, loginSchema } from "@appkit/core";
import { LoginForm } from "@appkit/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function Login(): React.JSX.Element {
  const navigate = useNavigate();

  async function onSubmit(data: LoginInput) {
    const result = await signInWithCredentials(data.email, data.password, {
      apiBaseUrl: "http://localhost:4000",
      redirectTo: "/dashboard",
    });

    if (!result.success) {
      console.error(result.message);
      return;
    }

    navigate(result.redirectTo);
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
