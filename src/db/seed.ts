import { seedDatabase } from "@/api/seed";
import "@/db/env-config";
import { paymentsModel } from "@/db/schema";
import { db } from "@/utils/database";

async function seed() {
  // database teardown
  await db.delete(paymentsModel);

  // database setup
  await seedDatabase();
}

seed();
