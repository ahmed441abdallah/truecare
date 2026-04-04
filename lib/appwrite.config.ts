import { Client, Account, Databases, Storage, Messaging } from "appwrite";
import {
  Client as ServerClient,
  Users,
  Databases as ServerDatabases,
} from "node-appwrite";

function firstEnv(...keys: (string | undefined)[]): string {
  for (const v of keys) {
    const t = v?.trim();
    if (t) return t;
  }
  return "";
}

/** Supports NEXT_PUBLIC_* (browser) and server-only names; never undefined (avoids SDK .startsWith crash). */
const rawEndpoint = firstEnv(
  process.env.NEXT_PUBLIC_ENDPOINT_URL,
  process.env.ENDPOINT_URL
);
export const ENDPOINT_URL =
  rawEndpoint.replace(/\/$/, "") || "https://cloud.appwrite.io/v1";

const rawProject = firstEnv(
  process.env.NEXT_PUBLIC_PROJECT_ID,
  process.env.PROJECT_ID
);
export const PROJECT_ID = rawProject || "missing-project-configure-env";

export const DATABASE_ID = firstEnv(
  process.env.NEXT_PUBLIC_DATABASE_ID,
  process.env.DATABASE_ID
);
export const PATIENTS_TABLE_ID = firstEnv(
  process.env.NEXT_PUBLIC_PATIENTS_TABLE_ID,
  process.env.PATIENTS_TABLE_ID
);
export const DOCTORS_TABLE_ID = firstEnv(
  process.env.NEXT_PUBLIC_DOCTORS_TABLE_ID,
  process.env.DOCTORS_TABLE_ID
);
export const APPOINTMENTS_TABLE_ID = firstEnv(
  process.env.NEXT_PUBLIC_APPOINTMENTS_TABLE_ID,
  process.env.APPOINTMENTS_TABLE_ID
);
export const BUCKET_ID = firstEnv(
  process.env.NEXT_PUBLIC_BUCKET_ID,
  process.env.BUCKET_ID
);

// Client SDK (for client-side)
const client = new Client();
client.setEndpoint(ENDPOINT_URL).setProject(PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const messaging = new Messaging(client);
export const storage = new Storage(client);

// Server SDK (for server-side)
const serverClient = new ServerClient()
  .setEndpoint(ENDPOINT_URL)
  .setProject(PROJECT_ID);

// Server-only: prefer API_KEY / APPWRITE_API_KEY. In development only, fall back to NEXT_PUBLIC_API_KEY if set (not recommended for production).
const serverApiKey =
  process.env.API_KEY ||
  process.env.APPWRITE_API_KEY ||
  (process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_KEY
    : undefined);
if (serverApiKey) {
  serverClient.setKey(serverApiKey);
} else {
  console.warn(
    "API_KEY or APPWRITE_API_KEY is not set. Server actions that use Appwrite admin APIs will fail. Add API_KEY in .env.local and in Vercel (same value as your Appwrite API key)."
  );
}

export const serverUsers = new Users(serverClient);
export const serverDatabases = new ServerDatabases(serverClient);
