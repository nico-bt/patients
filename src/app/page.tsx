import { Suspense } from "react"
import Patients from "@/components/Patients/Patients"
import { getPatients } from "@/lib/Patients"
import SearchBar from "@/components/SearchBar"
import AddPatientDialog from "@/components/AddPatientForm/AddPatientDialog"

type SearchParams = Promise<{ query: string | undefined }>

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ""

  return (
    <main className="w-full p-2 mx-auto grid grid-cols-1 max-w-[400px] sm:max-w-[1000px] gap-3 sm:gap-5 mt-1">
      <AddPatientDialog />

      <SearchBar />

      <Suspense
        key={query}
        fallback={<p className="mt-26 tracking-wider text-center">Loading...</p>}
      >
        <PatientsList query={query} />
      </Suspense>
    </main>
  )
}

async function PatientsList({ query }: { query: string }) {
  const patients = await getPatients(query)

  if (patients.length === 0) {
    const message = query ? "No results" : "Please add a patient"

    return <p className="mt-26 tracking-wider text-center">{message}</p>
  }

  return <Patients patients={patients} />
}
