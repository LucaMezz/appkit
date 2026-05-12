import type { ReactNode } from "react";
import type { RouteObject } from "react-router-dom";

import { GuestOnlyRoute } from "./components/layout/auth/guest-only-route";
import { ProtectedRoute } from "./components/layout/auth/protected-route";
import { About } from "./pages/about";
import { Login } from "./pages/auth/login";
import { SignUp } from "./pages/auth/sign-up";
import { Dashboard } from "./pages/dashboard";
import { DashboardLayout } from "./pages/dashboard/layout";
import { ErrorBoundary } from "./pages/error-boundary";
import { Home } from "./pages/home";

export function createRoutes(rootLayout: ReactNode): RouteObject[] {
  return [
    {
      path: "/",
      element: rootLayout,
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
