import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    client: "src/client.ts",
  },
  format: ["esm", "cjs"],
  clean: true,
  target: "es2020",

  dts: false,
  splitting: false,
  sourcemap: true,

  tsconfig: "./tsconfig.json",

  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "react/jsx-dev-runtime",
    "radix-ui",
    "lucide-react",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
  ],

  esbuildOptions(options) {
    options.jsx = "automatic";
  },

  skipNodeModulesBundle: true,
});
