import z from "zod"

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
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }).trim(),
})

export type PatientFormFields = z.infer<typeof patientSchema>
