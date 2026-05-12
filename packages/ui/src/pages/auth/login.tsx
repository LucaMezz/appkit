import { signInWithCredentials } from "@appkit/api-client";
import { LoginInput } from "@appkit/core";
import { useNavigate } from "react-router-dom";

import { LoginScreen } from "#screens/auth/login";

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

  return <LoginScreen onSubmit={onSubmit} />;
}
