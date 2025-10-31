"use client"

import { Patient } from "@prisma/client"
import { PatientCard } from "./PatientCard"

export default function Patients({ patients }: { patients: Patient[] }) {
  return (
    <ul className="cards mt-6 mb-12 w-full grid gap-4 justify-center grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
      {patients.map((patient) => (
        <PatientCard patient={patient} key={patient.id} />
      ))}
    </ul>
  )
}
