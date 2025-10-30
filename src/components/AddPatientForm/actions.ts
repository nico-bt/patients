"use server"

import { createPatient, getPatientByEmail } from "@/lib/Patients"
import { PatientFormFields, patientSchema } from "@/utils/zodSchema"
import { revalidatePath } from "next/cache"
import z from "zod"

export type ActionResponse = {
  success: boolean
  errors: {
    email?: string
    name?: string
    phone?: string
    root?: string
  } | null
  data?: {
    name: string
    email: string
    phone: string
  }
}

export async function addPatient(data: PatientFormFields): Promise<ActionResponse> {
  // Validate input
  const result = patientSchema.safeParse(data)

  if (!result.success) {
    // Normalize: just keep the first message for each field instead of an array of messages
    const fieldErrors = z.flattenError(result.error).fieldErrors
    const normalizedErrors = Object.fromEntries(
      Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0] ?? "Invalid input"])
    )

    return {
      success: false,
      errors: normalizedErrors,
      data,
    }
  }

  const { name, email, phone } = result.data

  try {
    const patientAllreadyExists = await getPatientByEmail(email)

    if (patientAllreadyExists) {
      return {
        success: false,
        errors: { email: "Email already registered" },
        data: { email, name, phone },
      }
    }

    await createPatient({ name, email, phone })

    // Mock sending email
    // sendWelcomeEmail({ email, name })
    console.log(
      `Sending welcome email to ${email}: "Welcome, ${name}! You have been successfully registered in Light-it."`
    )

    revalidatePath("/")

    return {
      success: true,
      errors: null,
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      errors: {
        root: "There was an error trying to access the database, please try again",
      },
      data: { email, name, phone },
    }
  }
}
