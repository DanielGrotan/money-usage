import { labelsModel } from "@/db/schema";
import { db } from "@/utils/database";
import { User } from "@/utils/types";
import { eq } from "drizzle-orm";

export async function getLabelsForUserId(userId: User["externalId"]) {
  return await db
    .select()
    .from(labelsModel)
    .where(eq(labelsModel.userId, userId));
}
