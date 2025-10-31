import Image from "next/image"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import toast from "react-hot-toast"

export const FileImgInput = ({
  setImageFile,
  isSubmitting,
}: {
  setImageFile: Dispatch<SetStateAction<File | undefined>>
  isSubmitting: boolean
}) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]

    if (!file) {
      setImagePreviewUrl("")
      setImageFile(undefined)
      return
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (jpg, png, jpeg)")
      e.target.value = ""
      setImagePreviewUrl("")
      setImageFile(undefined)
      return
    }

    // Limit size 5 MB
    const maxSizeMB = 5
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Image must be smaller than ${maxSizeMB} MB`)
      e.target.value = ""
      setImagePreviewUrl("")
      setImageFile(undefined)
      return
    }

    const imgURl = URL.createObjectURL(file)
    setImagePreviewUrl(imgURl)
    setImageFile(file)
  }

  return (
    <div>
      <label className="block font-medium">Image</label>

      {imagePreviewUrl && (
        <Image
          src={imagePreviewUrl}
          height={150}
          width={150}
          alt="preview image to upload"
          key={imagePreviewUrl}
          className="object-cover object-top h-20 w-20 rounded-xl mx-auto mt-1"
        />
      )}

      <input
        className="formInputFile mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-center cursor-pointer"
        type="file"
        id="image"
        onChange={handleChange}
        accept=".jpg,.png,.jpeg"
        required
        disabled={isSubmitting}
      />
    </div>
  )
}
