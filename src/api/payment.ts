"use server";

import { paymentsModel } from "@/db/schema";
import { db } from "@/utils/database";
import { InsertPayment } from "@/utils/types";

export async function createPayment(payment: InsertPayment) {
  await db.insert(paymentsModel).values(payment);
}
