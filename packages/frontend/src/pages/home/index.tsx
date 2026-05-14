import { Navigate } from "react-router-dom";

import { useAuthSession } from "../../components/auth/auth-session-provider";

export function RootRedirect() {
  const { status } = useAuthSession();

  if (status === "loading") {
    return null;
  }

  if (status === "authenticated") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/auth/login" replace />;
}
