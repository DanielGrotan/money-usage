import { labelsModel, usersModel } from "@/db/schema";
import { defaultLabels } from "@/utils/constants";
import { db } from "@/utils/database";
import { User } from "@/utils/types";
import { eq } from "drizzle-orm";

export async function createUser(externalId: User["externalId"]) {
  await db.transaction(async (tx) => {
    // create user
    await tx.insert(usersModel).values({
      externalId,
    });

    // add default labels
    const labels = defaultLabels.map((label) => ({
      userId: externalId,
      ...label,
    }));

    await tx.insert(labelsModel).values(labels);
  });
}

export async function deleteUser(externalId: User["externalId"]) {
  await db.delete(usersModel).where(eq(usersModel.externalId, externalId));
}
