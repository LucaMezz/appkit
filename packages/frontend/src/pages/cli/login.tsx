import { fetchAuthSession, startCliAuthorization } from "@appkit/api-client";
import { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useFrontendRuntimeConfig } from "../../config";

type AuthState =
  | { status: "loading" }
  | { status: "authenticated"; userLabel: string }
  | { status: "unauthenticated" };

export function CliLogin(): React.JSX.Element {
  const config = useFrontendRuntimeConfig();
  const location = useLocation();
  const [authState, setAuthState] = useState<AuthState>({ status: "loading" });
  const [error, setError] = useState<string | null>(null);
  const [authorizing, setAuthorizing] = useState(false);

  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const state = params.get("state");
  const codeChallenge = params.get("code_challenge");
  const redirectUri = params.get("redirect_uri");
  const returnPath = `${location.pathname}${location.search}`;

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      const session = await fetchAuthSession({ apiBaseUrl: config.apiBaseUrl });

      if (cancelled) return;

      if (session?.user) {
        setAuthState({
          status: "authenticated",
          userLabel: session.user.email ?? session.user.name ?? "your account",
        });
      } else {
        setAuthState({ status: "unauthenticated" });
      }
    }

    void checkSession();

    return () => {
      cancelled = true;
    };
  }, [config.apiBaseUrl]);

  if (!state || !codeChallenge || !redirectUri) {
    return (
      <div className="flex h-full w-full items-center justify-center p-6">
        <div className="max-w-md space-y-3">
          <h1 className="text-2xl font-semibold">CLI authorization failed</h1>
          <p className="text-muted-foreground">The login request is missing required parameters.</p>
        </div>
      </div>
    );
  }

  if (authState.status === "loading") {
    return <div />;
  }

  if (authState.status === "unauthenticated") {
    return <Navigate to={`/auth/login?callbackUrl=${encodeURIComponent(returnPath)}`} replace />;
  }

  async function authorize() {
    if (!state || !codeChallenge || !redirectUri) return;

    setAuthorizing(true);
    setError(null);

    try {
      const result = await startCliAuthorization(
        {
          state,
          codeChallenge,
          redirectUri,
        },
        { apiBaseUrl: config.apiBaseUrl },
      );
      const callbackUrl = new URL(result.redirectUri);
      callbackUrl.searchParams.set("code", result.code);
      callbackUrl.searchParams.set("state", result.state);
      window.location.assign(callbackUrl.toString());
    } catch {
      setError("Could not authorize the CLI. Please try again.");
      setAuthorizing(false);
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Authorize AppKit CLI?</h1>
          <p className="text-muted-foreground">
            The AppKit CLI is requesting access to {authState.userLabel}.
          </p>
        </div>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <div className="flex gap-3">
          <button
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
            disabled={authorizing}
            onClick={authorize}
            type="button"
          >
            {authorizing ? "Authorizing..." : "Authorize CLI"}
          </button>
          <button
            className="inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium"
            onClick={() => window.close()}
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
