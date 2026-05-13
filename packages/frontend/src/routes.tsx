import type { ReactNode } from "react";
import type { RouteObject } from "react-router-dom";

import { About } from "../../frontend/src/pages/about";
import { Login } from "../../frontend/src/pages/auth/login";
import { SignUp } from "../../frontend/src/pages/auth/sign-up";
import { Dashboard } from "../../frontend/src/pages/dashboard";
import { DashboardLayout } from "../../frontend/src/pages/dashboard/layout";
import { ErrorBoundary } from "../../frontend/src/pages/error-boundary";
import { Home } from "../../frontend/src/pages/home";
import { GuestOnlyRoute } from "./components/auth/guest-only-route";
import { ProtectedRoute } from "./components/auth/protected-route";
import { FrontendRuntimeConfigProvider, type FrontendRuntimeConfig } from "./config";

export function createRoutes(rootLayout: ReactNode, config: FrontendRuntimeConfig): RouteObject[] {
  return [
    {
      path: "/",
      element: (
        <FrontendRuntimeConfigProvider config={config}>{rootLayout}</FrontendRuntimeConfigProvider>
      ),
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "dashboard",
              element: <DashboardLayout />,
              children: [
                {
                  index: true,
                  element: <Dashboard />,
                },
              ],
            },
          ],
        },
        {
          element: <GuestOnlyRoute />,
          children: [
            {
              path: "auth",
              children: [
                {
                  path: "login",
                  element: <Login />,
                },
                {
                  path: "sign-up",
                  element: <SignUp />,
                },
              ],
            },
          ],
        },
      ],
    },
  ];
}
