import { deleteImage } from "@/supabase/storage/client"
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
  return prisma.patient.create({
    data: { email, name, phone, photo },
  })
}

export async function getPatients(query: string) {
  return prisma.patient.findMany({
    orderBy: { created_at: "desc" },
    where: {
      name: { contains: query, mode: "insensitive" },
    },
  })
}

export async function deletePatientById(id: number) {
  return prisma.patient.delete({ where: { id } })
}

export async function getPatientByEmail(email: string) {
  return prisma.patient.findUnique({ where: { email } })
}
