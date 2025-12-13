import { serverUsers, serverDatabases } from "@/lib/appwrite.config";
import { ID } from "node-appwrite";
import { PATIENTS_TABLE_ID, DATABASE_ID } from "@/lib/appwrite.config";
import { parseStringify } from "../utils";
import { Query } from "node-appwrite";

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    const apiKey = process.env.API_KEY || process.env.APPWRITE_API_KEY || process.env.NEXT_PUBLIC_API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY is not configured. Cannot create user.");
    }

    // Check if user already exists by email
    try {
      const existingUsers = await serverUsers.list([
        Query.equal("email", [user.email]),
      ]);
      
      if (existingUsers.users.length > 0) {
        const error = new Error("User already exists");
        (error as any).code = "USER_EXISTS";
        (error as any).user = parseStringify(existingUsers.users[0]);
        throw error;
      }
    } catch (listError: any) {
      // If it's our custom USER_EXISTS error, re-throw it
      if (listError?.code === "USER_EXISTS") {
        throw listError;
      }
      // If listing fails for other reasons, continue to create
    }

    // Generate a secure random password (user can reset it later)
    // Password must be 8-265 chars and not commonly used
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    const randomPassword = Array.from({ length: 16 }, () => 
      chars[Math.floor(Math.random() * chars.length)]
    ).join("") + "A1!";

    const newuser = await serverUsers.create(
      ID.unique(),
      user.email,
      user.phone,
      randomPassword,
      user.name
    );

    return parseStringify(newuser);
  } catch (error: any) {
    // If it's our custom USER_EXISTS error, re-throw it
    if (error?.code === "USER_EXISTS") {
      throw error;
    }
    
    // If creation fails with 409, user already exists
    if (error && (error?.code === 409 || error?.response?.code === 409)) {
      try {
        const existingUsers = await serverUsers.list([
          Query.equal("email", [user.email]),
        ]);
        
        if (existingUsers.users.length > 0) {
          const userExistsError = new Error("User already exists");
          (userExistsError as any).code = "USER_EXISTS";
          (userExistsError as any).user = parseStringify(existingUsers.users[0]);
          throw userExistsError;
        }
      } catch (listError: any) {
        if (listError?.code === "USER_EXISTS") {
          throw listError;
        }
        console.error("Error fetching existing user:", listError);
      }
    }
    console.error("An error occurred while creating a new user:", error);
    throw error;
  }
};
// get user by id
export const getUserById = async (userId: string) => {
  try {
    const apiKey = process.env.API_KEY || process.env.APPWRITE_API_KEY || process.env.NEXT_PUBLIC_API_KEY;
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
  } catch (error: any) {
    console.error("An error occurred while fetching user by ID:", error);
    // Return a minimal user object to prevent page crash
    return {
      $id: userId,
      name: "",
      email: "",
      phone: "",
    };
  }
};
export const createPatient = async (patient: CreatePatientParams) => {
  try {
    const newPatient = await serverDatabases.createDocument(
      DATABASE_ID,
      PATIENTS_TABLE_ID,
      ID.unique(),
      patient
    );

    return parseStringify(newPatient);
  }
  catch (error) {
    console.error("An error occurred while creating a patient:", error);
  }
};
export const getPatient = async (userId: string) => {
  try {
    // Generate patientId from userId (same logic as in registerForm)
    const patientId = Math.abs(userId.split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0));
    
    const patient = await serverDatabases.listDocuments(
      DATABASE_ID,
      PATIENTS_TABLE_ID,
      [Query.equal("patientId", patientId)]
    );
    return parseStringify(patient.documents[0]);
  }
  catch (error) {
    console.error("An error occurred while fetching patient:", error);
    return null;
  }
};
