CREATE TYPE "public"."auth_type" AS ENUM('google', 'magic_link');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"profile_image" text,
	"auth_type" "auth_type" NOT NULL,
	"google_id" varchar(255),
	"last_magic_link_token" varchar(100),
	"magic_link_token_expiry" timestamp,
	"email_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_google_id_unique" UNIQUE("google_id")
);
