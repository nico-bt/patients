"use client"

import { addPatient, type ActionResponse } from "./actions"
import { SubmitButton } from "./SubmitButton"
import { useActionState } from "react"
import { Dialog } from "radix-ui"
import { Plus, X } from "lucide-react"

export default function AddPatientForm() {
  return (
    <Dialog.Root>
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

          <Form />

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

const Form = () => {
  const [state, formAction, isPending] = useActionState<ActionResponse, FormData>(addPatient, {
    success: false,
    errors: null,
  })

  return (
    <form action={formAction} className="w-[350px] mx-auto space-y-5 p-4 pb-0 bg-black" noValidate>
      {state.errors?.general && (
        <div className="text-red-500 border rounded-md px-4 py-6">{state.errors.general}</div>
      )}

      <div>
        <label htmlFor="name" className="block">
          Full Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder=" "
          className="mt-1 text-lg block w-full rounded-md border border-gray-300 px-3 py-2 not-placeholder-shown:bg-gray-100 not-placeholder-shown:text-black"
          style={state.errors?.name && { border: "2px solid red" }}
          defaultValue={state.data?.name || ""}
        />

        {state?.errors?.name && (
          <p className="text-sm text-red-500 text-center mt-1">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block font-medium ">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder=" "
          className="mt-1 text-lg block w-full rounded-md border border-gray-300 px-3 py-2 not-placeholder-shown:bg-gray-100 not-placeholder-shown:text-black"
          style={state.errors?.email && { border: "2px solid red" }}
          defaultValue={state.data?.email || ""}
        />

        {state?.errors?.email && (
          <p className="text-sm text-red-500 text-center mt-1">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block font-medium ">
          Phone:
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder=" "
          className="mt-1 text-lg block w-full rounded-md border border-gray-300 px-3 py-2 not-placeholder-shown:bg-gray-100 not-placeholder-shown:text-black"
          style={state.errors?.phone && { border: "2px solid red" }}
          defaultValue={state.data?.phone || ""}
        />

        {state?.errors?.phone && (
          <p className="text-sm text-red-500 text-center mt-1">{state.errors?.phone[0]}</p>
        )}
      </div>

      <SubmitButton />
    </form>
  )
}
