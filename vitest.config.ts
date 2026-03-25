import { defineConfig } from "vitest/config";

// oxlint-disable-next-line import/no-default-export
export default defineConfig({
  test: {
    globals: true,
    includeSource: ["src/**/*.{ts,tsx}"],
    environment: "happy-dom",
  },
  define: {
    "import.meta.vitest": "undefined",
  },
});
