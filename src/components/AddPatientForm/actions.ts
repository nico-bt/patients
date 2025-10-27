"use server"

import { createPatient, getPatientByEmail } from "@/lib/Patients"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import z from "zod"

export type ActionResponse = {
  success: boolean
  errors: {
    email?: string[]
    name?: string[]
    phone?: string[]
    general?: string
  } | null
  data?: {
    name: string
    email: string
    phone: string
  }
}

export async function addPatient(
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  const nameInput = formData.get("name") as string
  const emailInput = formData.get("email") as string
  const phoneInput = formData.get("phone") as string

  const patientSchema = z.object({
    email: z
      .email({ message: "Invalid email address" })
      .regex(/^[^@]+@gmail\.com$/, { message: "Email must be a @gmail.com address" })
      .trim(),
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" })
      .regex(/^[A-Za-z\s]+$/, { message: "Name must contain only letters" })
      .trim(),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }).trim(),
  })

  // Validate input
  const result = patientSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return {
      success: false,
      errors: z.flattenError(result.error).fieldErrors,
      data: { name: nameInput, email: emailInput, phone: phoneInput },
    }
  }

  const { name, email, phone } = result.data

  try {
    const patientAllreadyExists = await getPatientByEmail(email)

    if (patientAllreadyExists) {
      return {
        success: false,
        errors: { email: ["Email already registered"] },
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
  } catch (error) {
    console.error(error)

    return {
      success: false,
      errors: {
        general: "There was an error trying to access the database, please try again",
      },
      data: { email, name, phone },
    }
  }
  redirect(`/?query=${name}`)
}
