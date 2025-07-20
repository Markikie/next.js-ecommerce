import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import conn from "@/db"; // your drizzle instance
import { account, session, user, verification } from "@/db/schema";

const db = await conn;

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "mysql", // or "mysql", "sqlite"
    schema: {
      user: user,
      account: account,
      session: session,
      verification: verification,
    },
    usePlural: false,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // default is true
    requireEmailVerification: false,
    minPasswordLength: 8,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false, // don't allow user to set role
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
  },
  advanced: {
    cookiePrefix: "mar-app",
  },
});
