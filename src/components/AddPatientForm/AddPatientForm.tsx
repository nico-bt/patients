"use client"

import { addPatient } from "./actions"
import { Dialog } from "radix-ui"
import { Plus, X } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { PatientFormFields, patientSchema } from "@/utils/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dispatch, SetStateAction, useState } from "react"
import { useRouter } from "next/navigation"

export default function AddPatientForm() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog.Root defaultOpen={false} open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="bg-blue-700 text-white px-4 py-2 hover:bg-blue-900 cursor-pointer rounded-[20px] mx-auto flex gap-1 items-center tracking-wide">
          <Plus strokeWidth={4} className="w-5 h-5" />
          New Patient
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[rgba(12,3,24,0.7)] data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1 p-[25px] shadow-2xl focus:outline-none data-[state=open]:animate-contentShow bg-black">
          <Dialog.Title className="m-0 font-medium border-b border-gray-600 pb-2 text-gray-200">
            New Patient
          </Dialog.Title>

          <Form setIsOpen={setIsOpen} />

          <Dialog.Close asChild>
            <button
              className="cursor-pointer absolute right-0 top-0 p-1 hover:bg-red-800"
              aria-label="Close"
            >
              <X strokeWidth={1} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const Form = ({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<PatientFormFields>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  const onSubmit: SubmitHandler<PatientFormFields> = async (data) => {
    const result = await addPatient(data)

    // set the server error response to local state managed by react-hook-form (setError)
    if (!result.success && result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        setError(field as keyof typeof data, { message })
      })
    }

    if (result.success) {
      setIsOpen(false)
      router.refresh()
      router.push(`/?query=${data.name}`)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[350px] mx-auto space-y-5 p-4 pb-0 bg-black"
      noValidate
    >
      {/* GENERAL ERROR */}
      {/* (named "root" both in react-hook-form and in the returned errors.root in the addPatient action) */}
      {errors?.root && (
        <div className="text-red-500 border rounded-md px-4 py-6">{errors.root.message}</div>
      )}

      {/* INPUTS  */}
      {/* with their respective error below --> errors.name */}
      <div>
        <label htmlFor="name" className="block">
          Full Name:
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder=""
          className="mt-1 text-lg block w-full rounded-md border border-gray-300 px-3 py-2 not-placeholder-shown:bg-gray-100 not-placeholder-shown:text-black"
          style={errors?.name && { border: "2px solid red" }}
        />

        {errors.name && (
          <p className="text-sm text-red-500 text-center mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block font-medium ">
          Email:
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder=""
          className="mt-1 text-lg block w-full rounded-md border border-gray-300 px-3 py-2 not-placeholder-shown:bg-gray-100 not-placeholder-shown:text-black"
          style={errors?.email && { border: "2px solid red" }}
        />

        {errors.email && (
          <p className="text-sm text-red-500 text-center mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block font-medium ">
          Phone:
        </label>
        <input
          {...register("phone")}
          type="tel"
          placeholder=""
          className="mt-1 text-lg block w-full rounded-md border border-gray-300 px-3 py-2 not-placeholder-shown:bg-gray-100 not-placeholder-shown:text-black"
          style={errors?.phone && { border: "2px solid red" }}
        />

        {errors.phone && (
          <p className="text-sm text-red-500 text-center mt-1">{errors.phone.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="ml-auto flex mt-12 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 disabled:bg-blue-300 cursor-pointer disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Loading..." : "Add Patient"}
      </button>
    </form>
  )
}
