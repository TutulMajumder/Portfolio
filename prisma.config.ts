import "dotenv/config";
import { defineConfig } from "prisma/config";
import config from "./config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: config.database_url,
  },
});
