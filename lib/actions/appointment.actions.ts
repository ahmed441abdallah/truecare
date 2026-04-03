"use server";

import { serverDatabases, serverUsers } from "@/lib/appwrite.config";
import { ID, Query } from "node-appwrite";
import { APPOINTMENTS_TABLE_ID, DATABASE_ID, PATIENTS_TABLE_ID } from "@/lib/appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";

export const createAppointment = async (appointmentData: CreateAppointmentParams) => {
  try {
    const newAppointment = await serverDatabases.createDocument(
      DATABASE_ID,
      APPOINTMENTS_TABLE_ID,
      ID.unique(),
      {
        ...appointmentData,
        schedule: appointmentData.schedule.toISOString(),
      }
    );

    return parseStringify(newAppointment);
  }
  catch (error) {
    console.error("An error occurred while creating an appointment:", error);
    return null;
  }
};

export const getAppointmentById = async (appointmentId: string) => {
  try {
    const appointment = await serverDatabases.getDocument(
      DATABASE_ID,
      APPOINTMENTS_TABLE_ID,
      appointmentId
    );
    return parseStringify(appointment);
  }
  catch (error) {
    console.error("An error occurred while fetching appointment:", error);
    return null;
  }
};

export const updateAppointmentStatus = async (
  appointmentId: string,
  status: "scheduled" | "pending" | "cancelled",
  cancellationReason?: string
) => {
  try {
    const updateData: any = { status };
    if (status === "cancelled" && cancellationReason) {
      updateData.cancellationReason = cancellationReason;
    }
    
    const updatedAppointment = await serverDatabases.updateDocument(
      DATABASE_ID,
      APPOINTMENTS_TABLE_ID,
      appointmentId,
      updateData
    );
    
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("An error occurred while updating appointment status:", error);
    return null;
  }
};
export const getRecentAppointments = async () => {
  if (!DATABASE_ID || !APPOINTMENTS_TABLE_ID) {
    console.warn(
      "Appwrite DATABASE_ID or APPOINTMENTS_TABLE_ID is not set; skipping appointments fetch."
    );
    return parseStringify({
      totalCount: 0,
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
      documents: [],
    });
  }
  try {
    const appointments = await serverDatabases.listDocuments(
      DATABASE_ID,
      APPOINTMENTS_TABLE_ID,
      [Query.orderDesc("$createdAt")]
    );

    // Fetch patient and user data for each appointment
    const appointmentsWithData = await Promise.all(
      appointments.documents.map(async (appointment: any) => {
        const appointmentData: any = { ...appointment };
        
        // Fetch patient data
        if (appointment.patient) {
          try {
            const patient = await serverDatabases.getDocument(
              DATABASE_ID,
              PATIENTS_TABLE_ID,
              appointment.patient
            );
            appointmentData.patient = patient;
          } catch (error) {
            console.error(`Error fetching patient ${appointment.patient}:`, error);
          }
        }
        
        // Fetch user data from userId
        if (appointment.userId) {
          try {
            const user = await serverUsers.get(appointment.userId);
            appointmentData.user = parseStringify(user);
          } catch (error: unknown) {
            const err = error as { code?: number; type?: string };
            const missingUser =
              err.code === 404 || err.type === "user_not_found";
            if (!missingUser) {
              console.error(
                `Error fetching user ${appointment.userId}:`,
                error
              );
            }
            appointmentData.user = {
              name: "N/A",
              email: "",
              phone: "",
            };
          }
        }
        
        return appointmentData;
      })
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointmentsWithData as unknown as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointmentsWithData,
    };

    return parseStringify(data);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent appointments:",
      error
    );
    return parseStringify({
      totalCount: 0,
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
      documents: [],
    });
  }
};