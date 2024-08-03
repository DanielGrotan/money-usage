CREATE TABLE IF NOT EXISTS "money_usage_payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"date" date NOT NULL,
	"cost_norwegian_øre" integer NOT NULL
);
