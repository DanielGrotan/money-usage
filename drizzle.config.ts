import "@/db/env-config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dbCredentials: {
    url: process.env.POSTGRES_URL ?? "",
  },
  tablesFilter: ["money_usage_*"],
});
