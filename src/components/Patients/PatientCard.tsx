import { Loader2, Mail, Phone, TrashIcon } from "lucide-react"
import { useTransition } from "react"
import Image from "next/image"
import photo_placeholder from "../../../public/Photo_Placeholder.jpg"
import { deletePatient } from "./actions"
import { deleteImage } from "@/supabase/storage/client"
import toast from "react-hot-toast"
import { Patient } from "@prisma/client"
import { PhoneInput } from "react-international-phone"
import "react-international-phone/style.css"
import { Manrope } from "next/font/google"

const manrope = Manrope({
  subsets: ["latin"],
})

export function PatientCard({ patient }: { patient: Patient }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = async (id: number) => {
    startTransition(async () => {
      if (patient.photo) {
        deleteImage(patient.photo)
      }
      const result = await deletePatient(id)

      if (result.error) {
        toast.error(result.error)
      }

      if (result.success) {
        toast("Patient deleted successfully", { icon: "🗑️" })
      }
    })
  }

  return (
    <li className={`rounded-2xl ${manrope.className}`}>
      <details className="group border border-slate-600 overflow-hidden elevateOnHover relative bg-slate-900">
        <summary className="flex flex-col items-center gap-4 p-4 cursor-pointer list-none">
          {patient.photo ? (
            <Image
              src={patient.photo}
              height={150}
              width={150}
              alt={patient.name}
              className="object-cover object-top h-[150px] w-[150px] rounded-xl"
            />
          ) : (
            <Image
              src={photo_placeholder}
              alt="Photo Placeholder"
              width={150}
              height={150}
              className="rounded-xl"
            />
          )}

          <h3 className="font-semibold text-lg tracking-wider">{patient.name}</h3>

          <svg
            className="h-5 w-5 transition-transform group-open:rotate-180 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>

        <div className="mx-4 pb-2 pt-4 space-y-3 border-t border-gray-600 overflow-auto mb-6">
          <div>
            <p className="text-xs text-gray-200 flex gap-1 items-center">
              <Mail className="h-4 w-4" />
              Email:
            </p>
            <p className="text-base pl-2">{patient.email}</p>
          </div>

          <div>
            <p className="text-xs text-gray-200 flex gap-1 items-center">
              <Phone className="h-4 w-4" />
              Phone:
            </p>
            <div className="text-base pl-2">
              <PhoneInput
                value={patient.phone}
                disabled
                inputProps={{ readOnly: true }}
                inputStyle={{ background: "none", border: "none", color: "white", fontSize: 16 }}
                countrySelectorStyleProps={{
                  dropdownArrowStyle: { display: "none" },
                  flagStyle: { opacity: 1 },
                  buttonStyle: { background: "none", border: "none", opacity: 1 },
                }}
              />
            </div>
          </div>
        </div>

        {isPending ? (
          <div className="top-0 bottom-0 w-full grid place-items-center z-20 absolute bg-gray-800 opacity-50 rounded-xl">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <TrashIcon
            className="absolute bottom-2 right-2 h-8 w-8 rounded-full p-2 bg-slate-800 hover:bg-red-700 text-white cursor-pointer"
            onClick={() => handleDelete(patient.id)}
          />
        )}
      </details>
    </li>
  )
}
