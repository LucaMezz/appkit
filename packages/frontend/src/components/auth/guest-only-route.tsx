import { Navigate, Outlet } from "react-router-dom";

import { useAuthSession } from "./auth-session-provider";

export function GuestOnlyRoute() {
  const { status } = useAuthSession();

  if (status === "loading") {
    return null;
  }

  if (status === "authenticated") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
