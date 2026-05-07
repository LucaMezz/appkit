import { resolve } from "path";

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    outDir: ".vite/build",
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(__dirname, "preload/index.ts"),
      output: {
        entryFileNames: "preload.js",
        format: "cjs",
      },
      external: ["electron"],
    },
  },
});
