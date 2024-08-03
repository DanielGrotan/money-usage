import { seedDatabase } from "@/api/seed";
import "@/db/env-config";
import { payments } from "@/db/schema";
import { db } from "@/utils/database";

async function seed() {
  // database teardown
  await db.delete(payments);

  // database setup
  await seedDatabase();
}

seed();
