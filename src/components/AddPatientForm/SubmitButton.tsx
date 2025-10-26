"use client"

import { useFormStatus } from "react-dom"

export const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="ml-auto flex mt-12 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 disabled:bg-blue-300 cursor-pointer disabled:cursor-not-allowed"
    >
      {pending ? "Adding..." : "Add Patient"}
    </button>
  )
}
