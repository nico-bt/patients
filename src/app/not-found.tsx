import { HomeIcon } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div>
      <h2 className="text-4xl mt-6">Not Found</h2>
      <p className="mt-2">Could not find requested resource</p>

      <Link
        href={"/"}
        className="flex gap-2 mt-12 font-bold text-lg text-center bg-red text-white tracking-wider border py-2 px-4 rounded-lg bg-blue-800"
      >
        <HomeIcon /> Back Home
      </Link>
    </div>
  )
}
