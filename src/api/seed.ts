import { paymentsModel, usersModel } from "@/db/schema";
import { db } from "@/utils/database";

export async function seedDatabase() {
  // creates users
  const users = await db
    .insert(usersModel)
    .values({
      externalId: "seededId",
    })
    .returning();

  const userId = users[0].externalId;

  // creates payments
  const payments = await db.insert(paymentsModel).values({
    text: "Rent",
    costNorwegianØre: 440000,
    date: new Date(),
    ownerId: userId,
  });
}
