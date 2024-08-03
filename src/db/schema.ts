import { relations } from "drizzle-orm";
import {
  date,
  integer,
  pgTableCreator,
  serial,
  text,
} from "drizzle-orm/pg-core";

const pgTable = pgTableCreator((name) => `money_usage_${name}`);

export const users = pgTable("users", {
  externalId: text("extarnal_id").primaryKey(),
});

export const usersRelations = relations(users, ({ many }) => ({
  payments: many(payments),
}));

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  ownerId: text("user_id")
    .references(() => users.externalId)
    .notNull(),
  text: text("text").notNull(),
  date: date("date", { mode: "date" }).notNull(),
  costNorwegianØre: integer("cost_norwegian_øre").notNull(),
});

export const paymentsRelations = relations(payments, ({ one }) => ({
  owner: one(users, {
    fields: [payments.ownerId],
    references: [users.externalId],
  }),
}));
