"use client"

import Link from "next/link"
import { useEffect } from "react"
import { HomeIcon } from "lucide-react"

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-center text-xl mt-6"> Ups... Something went wrong! </h2>

      {error.message && <p className="text-center"> {error.message} </p>}

      <Link
        href={"/"}
        className="flex gap-2 mt-12 font-bold text-lg text-center bg-red text-white tracking-wider border py-2 px-4 rounded-lg bg-blue-800"
      >
        <HomeIcon /> Back Home
      </Link>
    </main>
  )
}
