import path from "node:path";
import { defineConfig } from "vite";
import native from "vite-plugin-native";

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    native({
      // Load C/C++ native modules. Like sqlite3, better-sqlite3, fsevents etc.
      webpack: {},
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
