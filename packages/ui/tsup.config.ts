import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  clean: true,
  target: "es2020",

  dts: false,

  tsconfig: "./tsconfig.json",
});
