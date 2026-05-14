import { registerUser } from "@appkit/api-client";
import { RegisterInput, registerSchema } from "@appkit/core";
import { SignUpForm } from "@appkit/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import signUpImageUrl from "../../assets/sign-up-image.png";
import { useFrontendRuntimeConfig } from "../../config";

export function SignUp(): React.JSX.Element {
  const config = useFrontendRuntimeConfig();

  async function onSubmit(data: RegisterInput) {
    const result = await registerUser(data, {
      apiBaseUrl: config.apiBaseUrl,
    });

    if (!result.success) {
      console.error(result.message);
    }

    console.info("successfully registered.");
  }

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <div className="flex items-center justify-center h-full w-full">
      <SignUpForm form={form} imageSrc={signUpImageUrl} onSubmit={onSubmit} />
    </div>
  );
}
