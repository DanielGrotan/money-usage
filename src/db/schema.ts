import { relations } from "drizzle-orm";
import {
  date,
  integer,
  pgTableCreator,
  serial,
  text,
} from "drizzle-orm/pg-core";

const pgTable = pgTableCreator((name) => `money_usage_${name}`);

export const usersModel = pgTable("users", {
  externalId: text("extarnal_id").primaryKey(),
});

export const usersRelations = relations(usersModel, ({ many }) => ({
  payments: many(paymentsModel),
  labels: many(labelsModel),
}));

export const paymentsModel = pgTable("payments", {
  id: serial("id").primaryKey(),
  ownerId: text("user_id")
    .references(() => usersModel.externalId, { onDelete: "cascade" })
    .notNull(),
  text: text("text").notNull(),
  date: date("date", { mode: "date" }).notNull(),
  costNorwegianØre: integer("cost_norwegian_øre").notNull(),
  labelId: integer("label_id").references(() => labelsModel.id),
});

export const paymentsRelations = relations(paymentsModel, ({ one }) => ({
  owner: one(usersModel, {
    fields: [paymentsModel.ownerId],
    references: [usersModel.externalId],
  }),
  label: one(labelsModel, {
    fields: [paymentsModel.labelId],
    references: [labelsModel.id],
  }),
}));

export const labelsModel = pgTable("labels", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => usersModel.externalId, { onDelete: "cascade" })
    .notNull(),
  text: text("text").notNull(),
  color: text("color").notNull(),
});

export const labelsRelations = relations(labelsModel, ({ one, many }) => ({
  user: one(usersModel, {
    fields: [labelsModel.userId],
    references: [usersModel.externalId],
  }),
  payments: many(paymentsModel),
}));
