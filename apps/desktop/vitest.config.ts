import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,

    includeSource: ["renderer/src/**/*.{ts,tsx}"],

    environment: "happy-dom",
  },

  resolve: {
    alias: {
      // local renderer code
      "@": path.resolve(__dirname, "./renderer/src"),

      // shared monorepo packages (important for real testing)
      "@ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@core": path.resolve(__dirname, "../../packages/core/src"),
    },
  },

  define: {
    "import.meta.vitest": "undefined",
  },
});
