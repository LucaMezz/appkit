import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthSession } from "./auth-session-provider";

export function ProtectedRoute() {
  const location = useLocation();
  const { status } = useAuthSession();

  if (status === "loading") {
    return <div></div>;
  }

  if (status === "unauthenticated") {
    return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
