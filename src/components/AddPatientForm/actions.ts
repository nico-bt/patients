"use server"

import { createPatient, getPatientByEmail } from "@/lib/Patients"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export type ActionResponse = {
  success: boolean
  error: string | null
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
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string

  // TODO add validation
  console.log({ name, phone, email })

  const patientAllreadyExists = await getPatientByEmail(email)

  console.log({ patientAllreadyExists })

  if (patientAllreadyExists) {
    return {
      success: false,
      error: "A patient with this email already exists.",
      data: { email, name, phone },
    }
  } else {
    await createPatient({ name, email, phone })

    revalidatePath("/")
    redirect(`/?query=${name}`)
  }
}
