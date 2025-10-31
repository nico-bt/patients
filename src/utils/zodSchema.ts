import z from "zod"
import { isPhoneValid } from "./isPhoneValid"

export const patientSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .regex(/^[^@]+@gmail\.com$/, { message: "Email must be a @gmail.com address" })
    .trim(),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .regex(/^[A-Za-z\s]+$/, { message: "Name must contain only letters" })
    .trim(),
  phone: z
    .string()
    .trim()
    .refine((val) => isPhoneValid(val), {
      message: "Invalid phone number",
    }),
  photo: z.string().optional(),
})

export type PatientFormFields = z.infer<typeof patientSchema>
