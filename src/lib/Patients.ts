import { prisma } from "./prisma"

export async function createPatient({
  name,
  email,
  phone,
  photo,
}: {
  name: string
  email: string
  phone: string
  photo?: string
}) {
  try {
    return prisma.patient.create({
      data: { email, name, phone, photo },
    })
  } catch (error) {
    console.error("Error creating patient:", error)
    throw new Error("Ups... Something went wrong accessing the database. Try again please")
  }
}

export async function getPatients(query: string) {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { created_at: "desc" },
      where: {
        name: { contains: query, mode: "insensitive" },
      },
    })

    return patients
  } catch (error: any) {
    throw new Error(
      error.message || "Ups... Something went wrong accessing the database. Try again please"
    )
  }
}

export async function deletePatientById(id: number) {
  try {
    return prisma.patient.delete({ where: { id } })
  } catch (error) {
    console.error("Error deleting patient:", error)
    throw new Error("Failed to delete patient. Please try again.")
  }
}

export async function getPatientByEmail(email: string) {
  try {
    return prisma.patient.findUnique({ where: { email } })
  } catch (error) {
    console.error("Error fetching patient by email:", error)
    throw new Error("Failed to fetch patient. Please try again.")
  }
}
