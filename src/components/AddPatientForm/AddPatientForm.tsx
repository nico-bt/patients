"use client"

import { addPatient } from "./actions"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { PatientFormFields, patientSchema } from "@/utils/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dispatch, SetStateAction, useState } from "react"
import { useRouter } from "next/navigation"

// phone
import { PhoneInput } from "react-international-phone"
import "react-international-phone/style.css"
import { uploadImage } from "@/supabase/storage/client"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"
import { FileImgInput } from "./FileImgInput"

export const Form = ({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
  const router = useRouter()

  const [imageFile, setImageFile] = useState<File>()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
  } = useForm<PatientFormFields>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      photo: "",
    },
  })

  const onSubmit: SubmitHandler<PatientFormFields> = async (data) => {
    if (imageFile) {
      const { imageUrl, error } = await uploadImage({
        file: imageFile,
        bucket: "patients-imgs",
      })

      if (error) {
        console.error(error)
        toast.error(error)
        return
      }

      data.photo = imageUrl
    }

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
      toast.success("Patient added")
      router.push(`/?query=${data.name}`)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[350px] mx-auto space-y-5 p-4 pb-0 bg-black"
      noValidate
      autoComplete="off"
    >
      {/* GENERAL ERROR */}
      {/* (named "root" both in react-hook-form and in the returned errors.root in the addPatient action) */}
      {errors?.root && (
        <div className="text-red-500 border rounded-md px-4 py-6">{errors.root.message}</div>
      )}

      {/* NAME */}
      <div>
        <label htmlFor="name" className="block">
          Full Name:
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder=""
          className="mt-1 text-lg block w-full rounded-md border border-gray-300 px-3 py-2"
          style={errors?.name && { border: "2px solid red" }}
        />

        {errors.name && (
          <p className="text-sm text-red-500 text-center mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* EMAIL */}
      <div>
        <label htmlFor="email" className="block font-medium ">
          Email:
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder=""
          className="mt-1 text-lg block w-full rounded-md border border-gray-300 px-3 py-2"
          style={errors?.email && { border: "2px solid red" }}
        />

        {errors.email && (
          <p className="text-sm text-red-500 text-center mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* PHONE */}
      <div>
        <label htmlFor="phone" className="block font-medium ">
          Phone:
        </label>

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <PhoneInput
              value={value}
              onChange={onChange} // send value to hook form
              onBlur={onBlur} // notify when input is touched/blur
              defaultCountry="ar"
              className="px-3 py-2 mt-1 text-lg block w-full rounded-md border border-gray-300 bg-black"
              inputClassName="w-full bg-black"
              inputStyle={{
                backgroundColor: "black",
                color: "white",
                fontSize: 16,
                border: "none",
              }}
              countrySelectorStyleProps={{
                buttonStyle: { backgroundColor: "black", border: "none" },
              }}
              style={errors?.phone && { border: "2px solid red" }}
            />
          )}
        />

        {errors.phone && (
          <p className="text-sm text-red-500 text-center mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* IMAGE */}
      <FileImgInput setImageFile={setImageFile} isSubmitting={isSubmitting} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="ml-auto flex mt-12 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 disabled:bg-blue-300 cursor-pointer disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Loading..." : "Add Patient"}
      </button>

      {/* Loading OVERLAY */}
      {isSubmitting && (
        <div className="inset-0 grid place-items-center z-20 absolute bg-gray-800 opacity-50 rounded-xl">
          <Loader2 className="animate-spin text-red-500 h-12 w-12" strokeWidth={3} />
        </div>
      )}
    </form>
  )
}
