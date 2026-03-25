import { defineConfig } from "drizzle-kit";

// oxlint-disable-next-line import/no-default-export
export default defineConfig({
  schema: "./src/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "database/app.db",
  },
});
