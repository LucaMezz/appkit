import { fetchAuthSession } from "@appkit/api-client";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type AuthState =
  | { status: "loading" }
  | { status: "authenticated" }
  | { status: "unauthenticated" };

export function ProtectedRoute() {
  const location = useLocation();

  const [authState, setAuthState] = useState<AuthState>({
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      const session = await fetchAuthSession({
        apiBaseUrl: "http://localhost:4000",
      });

      if (cancelled) return;

      setAuthState(session?.user ? { status: "authenticated" } : { status: "unauthenticated" });
    }

    checkSession();

    return () => {
      cancelled = true;
    };
  }, []);

  if (authState.status === "loading") {
    return <div></div>;
  }

  if (authState.status === "unauthenticated") {
    return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
