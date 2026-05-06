import { resolve } from "path";

import { defineConfig } from "vite";

import { alias } from "./vite.alias";

export default defineConfig({
  resolve: {
    alias,
  },
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
