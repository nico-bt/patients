"use server"

import { deletePatientById } from "@/lib/Patients"
import { revalidatePath } from "next/cache"

export async function deletePatient(patientId: number) {
  try {
    await deletePatientById(patientId)

    revalidatePath("/", "layout")
    return { success: true, error: "" }
  } catch (error) {
    console.error("Error deleting patient:", error)
    return { success: false, error: "Failed to delete patient. Please try again" }
  }
}
