import { RegisterInput } from "@appkit/core";

import { SignUpForm } from "#components/features/auth/sign-up-form";

interface SignUpScreenProps {
  onSubmit: (data: RegisterInput) => Promise<void>;
}

export function SignUpScreen({ onSubmit }: SignUpScreenProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <SignUpForm onSubmit={onSubmit} />
    </div>
  );
}
