import { fetchAuthSession } from "@appkit/api-client";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useFrontendRuntimeConfig } from "../../config";

type AuthState =
  | { status: "loading" }
  | { status: "authenticated" }
  | { status: "unauthenticated" };

export function ProtectedRoute() {
  const location = useLocation();
  const config = useFrontendRuntimeConfig();

  const [authState, setAuthState] = useState<AuthState>({
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      const session = await fetchAuthSession({
        apiBaseUrl: config.apiBaseUrl,
      });

      if (cancelled) return;

      setAuthState(session?.user ? { status: "authenticated" } : { status: "unauthenticated" });
    }

    void checkSession();

    return () => {
      cancelled = true;
    };
  }, [config.apiBaseUrl]);

  if (authState.status === "loading") {
    return <div></div>;
  }

  if (authState.status === "unauthenticated") {
    return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
