import { registerUser } from "@appkit/api-client";
import { RegisterInput } from "@appkit/core";

import { SignUpScreen } from "#screens/auth/sign-up";

export function SignUp(): React.JSX.Element {
  async function onSubmit(data: RegisterInput) {
    const result = await registerUser(data, {
      apiBaseUrl: "http://localhost:4000",
    });

    if (!result.success) {
      console.error(result.message);
    }

    console.info("successfully registered.");
  }

  return <SignUpScreen onSubmit={onSubmit} />;
}
