import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./pages";
import { applyTheme } from "./themes/apply";
import { defaultTheme } from "./themes/default";

applyTheme(defaultTheme);

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
