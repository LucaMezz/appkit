import path from "node:path";

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config
// oxlint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [tsconfigPaths()],

  root: path.resolve(__dirname, "renderer"),

  base: "./",

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "renderer/src"),
    },
  },

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
      allow: ["../.."],
    },
  },
});
