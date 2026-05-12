import "@appkit/ui/globals.css";
import { createRoutes } from "@appkit/ui";
import { createHashRouter, RouterProvider } from "react-router-dom";

import { Layout } from "./components/layout";

const routes = createRoutes(<Layout />);

const router = createHashRouter(routes);

export function App(): React.JSX.Element {
  return <RouterProvider router={router} />;
}
