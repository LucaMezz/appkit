import { LoginInput } from "@appkit/core";

import { LoginForm } from "#components/features/auth/login-form";

interface LoginScreenProps {
  onSubmit: (data: LoginInput) => Promise<void>;
}

export function LoginScreen({ onSubmit }: LoginScreenProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
}
