import { Client, Account, Databases, Storage, Messaging } from "appwrite";
import { Client as ServerClient, Users, Databases as ServerDatabases } from "node-appwrite";

export const ENDPOINT_URL = process.env.NEXT_PUBLIC_ENDPOINT_URL!;
export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID!;
export const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID!;
export const PATIENTS_TABLE_ID = process.env.NEXT_PUBLIC_PATIENTS_TABLE_ID!;
export const DOCTORS_TABLE_ID = process.env.NEXT_PUBLIC_DOCTORS_TABLE_ID!;
export const APPOINTMENTS_TABLE_ID =
  process.env.NEXT_PUBLIC_APPOINTMENTS_TABLE_ID!;
export const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID!;

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

// Only set API key if it exists
const apiKey = process.env.API_KEY || process.env.APPWRITE_API_KEY || process.env.NEXT_PUBLIC_API_KEY;
if (apiKey) {
  serverClient.setKey(apiKey);
} else {
  console.warn("API_KEY, APPWRITE_API_KEY, or NEXT_PUBLIC_API_KEY is not set. Server-side operations may fail.");
}

export const serverUsers = new Users(serverClient);
export const serverDatabases = new ServerDatabases(serverClient);
