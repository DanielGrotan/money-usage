import { payments } from "@/db/schema";
import { db } from "@/utils/database";

export async function seedDatabase() {
  const payment = await db
    .insert(payments)
    .values({
      text: "Husleie",
      costNorwegianØre: 440000,
      date: new Date(),
    })
    .returning();

  console.log(payment);
}
