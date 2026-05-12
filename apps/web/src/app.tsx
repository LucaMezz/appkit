import { createRoutes } from "@appkit/ui";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "./layout";

const routes = createRoutes(<Layout />);

const router = createBrowserRouter(routes);

export function App(): React.JSX.Element {
  return <RouterProvider router={router} />;
}
