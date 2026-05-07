import { defineConfig } from "vite";
import native from "vite-plugin-native";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config
// oxlint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    native({
      // Load C/C++ native modules. Like sqlite3, better-sqlite3, fsevents etc.
      webpack: {},
    }),
  ],
});
