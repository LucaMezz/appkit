import { fetchAuthSession } from "@appkit/api-client";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useFrontendRuntimeConfig } from "../../config";

type AuthState = "loading" | "authenticated" | "unauthenticated";

export function GuestOnlyRoute() {
  const config = useFrontendRuntimeConfig();
  const [status, setStatus] = useState<AuthState>("loading");

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      const session = await fetchAuthSession({
        apiBaseUrl: config.apiBaseUrl,
      });

      if (cancelled) return;

      setStatus(session?.user ? "authenticated" : "unauthenticated");
    }

    void checkSession();

    return () => {
      cancelled = true;
    };
  }, [config.apiBaseUrl]);

  if (status === "loading") {
    return null;
  }

  if (status === "authenticated") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
