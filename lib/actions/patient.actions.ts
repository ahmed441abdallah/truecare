"use server";

import { serverUsers, serverDatabases } from "@/lib/appwrite.config";
import { ID } from "node-appwrite";
import { PATIENTS_TABLE_ID, DATABASE_ID } from "@/lib/appwrite.config";
import { parseStringify } from "../utils";
import { Query } from "node-appwrite";
import {
  isLikelyNetworkError,
  withNetworkRetries,
} from "@/lib/utils/network";

export type CreateUserOutcome =
  | { status: "created"; user: User }
  | { status: "exists" }
  | { status: "network" }
  | { status: "failed" };

// CREATE APPWRITE USER (server-only — never call Users API from the browser)
export async function createUser(
  user: CreateUserParams
): Promise<CreateUserOutcome> {
  try {
    const apiKey =
      process.env.API_KEY ||
      process.env.APPWRITE_API_KEY ||
      (process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_KEY
        : undefined);
    if (!apiKey) {
      console.error(
        "API_KEY / APPWRITE_API_KEY is not configured on the server."
      );
      return { status: "failed" };
    }

    let existingUsers;
    try {
      existingUsers = await withNetworkRetries(() =>
        serverUsers.list([Query.equal("email", [user.email])])
      );
    } catch (listError: unknown) {
      console.error("Error listing users by email:", listError);
      if (isLikelyNetworkError(listError)) {
        return { status: "network" };
      }
      return { status: "failed" };
    }

    if (existingUsers.users.length > 0) {
      return { status: "exists" };
    }

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    const randomPassword =
      Array.from({ length: 16 }, () =>
        chars[Math.floor(Math.random() * chars.length)]
      ).join("") + "A1!";

    try {
      const newuser = await withNetworkRetries(() =>
        serverUsers.create(
          ID.unique(),
          user.email,
          user.phone,
          randomPassword,
          user.name
        )
      );

      return { status: "created", user: parseStringify(newuser) };
    } catch (createError: unknown) {
      if (isLikelyNetworkError(createError)) {
        return { status: "network" };
      }
      throw createError;
    }
  } catch (error: unknown) {
    const err = error as { code?: number; response?: { code?: number } };
    if (err?.code === 409 || err?.response?.code === 409) {
      try {
        const existingUsers = await withNetworkRetries(() =>
          serverUsers.list([Query.equal("email", [user.email])])
        );

        if (existingUsers.users.length > 0) {
          return { status: "exists" };
        }
      } catch (listError) {
        console.error("Error fetching existing user:", listError);
        if (isLikelyNetworkError(listError)) {
          return { status: "network" };
        }
      }
    }
    if (isLikelyNetworkError(error)) {
      return { status: "network" };
    }
    console.error("An error occurred while creating a new user:", error);
    return { status: "failed" };
  }
}

export async function getUserById(userId: string) {
  try {
    const apiKey =
      process.env.API_KEY ||
      process.env.APPWRITE_API_KEY ||
      (process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_KEY
        : undefined);
    if (!apiKey) {
      console.warn("API_KEY is not configured. Returning fallback user.");
      return {
        $id: userId,
        name: "",
        email: "",
        phone: "",
      };
    }
    const user = await serverUsers.get(userId);
    return parseStringify(user);
  } catch (error: unknown) {
    const err = error as { code?: number; type?: string };
    const notFound = err.code === 404 || err.type === "user_not_found";
    if (!notFound) {
      console.error("An error occurred while fetching user by ID:", error);
    }
    return {
      $id: userId,
      name: "",
      email: "",
      phone: "",
    };
  }
}

export async function createPatient(patient: CreatePatientParams) {
  try {
    const newPatient = await serverDatabases.createDocument(
      DATABASE_ID,
      PATIENTS_TABLE_ID,
      ID.unique(),
      patient
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a patient:", error);
  }
}

export async function getPatient(userId: string) {
  try {
    const patientId = Math.abs(
      userId.split("").reduce((acc, char) => {
        return (acc << 5) - acc + char.charCodeAt(0);
      }, 0)
    );

    const patient = await serverDatabases.listDocuments(
      DATABASE_ID,
      PATIENTS_TABLE_ID,
      [Query.equal("patientId", patientId)]
    );
    return parseStringify(patient.documents[0]);
  } catch (error) {
    console.error("An error occurred while fetching patient:", error);
    return null;
  }
}
