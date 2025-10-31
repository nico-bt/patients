"use client"

import { Dialog } from "radix-ui"
import { Plus, X } from "lucide-react"
import { useState } from "react"
import { Form } from "./AddPatientForm"

export default function AddPatientDialog() {
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
