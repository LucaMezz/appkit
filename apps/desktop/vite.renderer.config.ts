import path from "node:path";

import { defineConfig } from "vite";

import { alias } from "./vite.alias";

// https://vitejs.dev/config
// oxlint-disable-next-line import/no-default-export
export default defineConfig({
  root: path.resolve(__dirname, "renderer"),

  resolve: {
    alias,
  },
});
