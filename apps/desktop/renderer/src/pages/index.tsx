import "#styles/globals.css";
import { createHashRouter, RouterProvider } from "react-router-dom";

import { GuestOnlyRoute } from "#components/layout/auth/guest-only-route";
import { ProtectedRoute } from "#components/layout/auth/protected-route";

import { About } from "./about";
import { Login } from "./auth/login";
import { SignUp } from "./auth/sign-up";
import { Dashboard } from "./dashboard";
import { DashboardLayout } from "./dashboard/layout";
import { ErrorBoundary } from "./error-boundary";
import { Home } from "./home";
import { Layout } from "./layout";

// Since this is a client-only application, use `createHashRouter`
const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
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
]);

export function App(): React.JSX.Element {
  return <RouterProvider router={router} />;
}
