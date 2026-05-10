import { registerUser } from "@appkit/api-client";
import { RegisterInput } from "@appkit/core";
import { SignUpForm } from "@appkit/ui";

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

  return (
    <div className="flex items-center justify-center h-full w-full">
      <SignUpForm onSubmit={onSubmit} />
    </div>
  );
}
