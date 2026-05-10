import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig, searchForWorkspaceRoot } from "vite";

// https://vitejs.dev/config
// oxlint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [react()],

  root: path.resolve(__dirname, "renderer"),

  base: "./",

  build: {
    outDir: path.resolve(__dirname, ".vite/renderer/main_window"),
    emptyOutDir: true,
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",

      "use-sync-external-store/shim",
      "use-sync-external-store/shim/index.js",
      "use-sync-external-store/shim/with-selector",
      "use-sync-external-store/shim/with-selector.js",
    ],
    exclude: ["@appkit/ui", "@appkit/api-client"],
  },

  server: {
    fs: {
      allow: [searchForWorkspaceRoot(__dirname)],
    },
  },

  esbuild: {
    jsx: "automatic",
  },
});
