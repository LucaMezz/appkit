import { fetchAuthSession } from "@appkit/api-client";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

type AuthState = "loading" | "authenticated" | "unauthenticated";

export function GuestOnlyRoute() {
  const [status, setStatus] = useState<AuthState>("loading");

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      const session = await fetchAuthSession({
        apiBaseUrl: "http://localhost:4000",
      });

      if (cancelled) return;

      setStatus(session?.user ? "authenticated" : "unauthenticated");
    }

    checkSession();

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return null;
  }

  if (status === "authenticated") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
