import "@/db/env-config";
import { defineConfig } from "drizzle-kit";

console.log(process.env.POSTGRES_URL);

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dbCredentials: {
    url: process.env.POSTGRES_URL ?? "",
  },
  tablesFilter: ["money_usage_*"],
});
