import { labelsModel, paymentsModel, usersModel } from "@/db/schema";

export type User = typeof usersModel.$inferSelect;

export type Payment = typeof paymentsModel.$inferSelect;

export type Label = typeof labelsModel.$inferSelect;
export type InsertLabel = typeof labelsModel.$inferInsert;
