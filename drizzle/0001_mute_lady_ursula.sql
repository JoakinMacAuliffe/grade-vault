CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"passwordHash" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "semestres" ALTER COLUMN "numero" DROP NOT NULL;