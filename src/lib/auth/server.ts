import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { randomBytes } from "node:crypto";
import { emailPasswordEnabled } from "./email-password";
import { getPglite } from "../db";
import { pgliteDialect } from "./pglite-dialect";

const globalAuthRef = globalThis as typeof globalThis & {
  __authSecret__?: string;
};

function previewAuthSecret(): string {
  globalAuthRef.__authSecret__ ??= randomBytes(32).toString("hex");
  return globalAuthRef.__authSecret__;
}

const env = (key: string): string | undefined => {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
};

const authDisabled = env("VITE_AUTH_ENABLED") === "false";
export const authConfigured = !authDisabled;

const explicitBaseURL = env("BETTER_AUTH_URL");

const LOCAL_DEV_ORIGINS: string[] = [
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://[::1]:8080",
];

const baseURL = explicitBaseURL ?? {
  allowedHosts: ["localhost", "127.0.0.1", "[::1]"],
  protocol: "auto" as const,
  fallback: "http://localhost:8080",
};

const trustedOrigins: string[] = explicitBaseURL
  ? [explicitBaseURL, ...LOCAL_DEV_ORIGINS]
  : LOCAL_DEV_ORIGINS;

const databaseUrl = env("DATABASE_URL");

const database = databaseUrl
  ? new Pool({ connectionString: databaseUrl })
  : { dialect: pgliteDialect(() => getPglite()), type: "postgres" as const };

export const SESSION_TOKEN_COOKIE = "nigoto_session_token";

export const auth = betterAuth({
  baseURL,
  secret: env("BETTER_AUTH_SECRET") ?? previewAuthSecret(),
  database,
  trustedOrigins,
  session: { cookieCache: { enabled: true, maxAge: 300 } },
  ...(emailPasswordEnabled ? { emailAndPassword: { enabled: true } } : {}),
  advanced: {
    useSecureCookies: false,
    defaultCookieAttributes: { secure: true, sameSite: "lax", path: "/" },
    cookies: {
      session_token: { name: SESSION_TOKEN_COOKIE },
      session_data: { name: "nigoto_session_data" },
      account_data: { name: "nigoto_account_data" },
      dont_remember: { name: "nigoto_dont_remember" },
    },
  },
});
