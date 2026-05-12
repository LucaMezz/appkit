import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const configDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(configDir, "../..");

// oxlint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: [
      {
        find: "@appkit/ui/globals.css",
        replacement: path.resolve(workspaceRoot, "packages/ui/src/styles/globals.css"),
      },
      {
        find: "@appkit/ui/client",
        replacement: path.resolve(workspaceRoot, "packages/ui/src/client.ts"),
      },
      {
        find: "@appkit/ui",
        replacement: path.resolve(workspaceRoot, "packages/ui/src/index.ts"),
      },
      {
        find: "@appkit/api-client",
        replacement: path.resolve(workspaceRoot, "packages/api-client/src/index.ts"),
      },
      {
        find: "@appkit/core",
        replacement: path.resolve(workspaceRoot, "packages/core/src/index.ts"),
      },
    ],
    dedupe: ["react", "react-dom"],
  },

  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    exclude: ["@appkit/ui", "@appkit/api-client", "@appkit/core"],
  },

  server: {
    fs: {
      allow: [workspaceRoot],
    },
    port: 3000,
    strictPort: true,
  },
});
