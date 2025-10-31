// Obs:
// url params are in sync with the search input value
// On input change, the url is updated with debounce
// Then parent uses the query to perform the fetch SSR

"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { useRef } from "react"
import { Search, X } from "lucide-react"

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const WAITING_TIME_DEBOUNCE = 300

  const handleInputChange = useDebouncedCallback((input: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (input) {
      params.set("query", input)
    } else {
      params.delete("query")
    }
    replace(`${pathname}?${params.toString()}`)
  }, WAITING_TIME_DEBOUNCE)

  const handleClose = () => {
    const params = new URLSearchParams(searchParams)
    params.delete("query")
    replace(`${pathname}`)
    inputRef.current!.value = ""
  }

  return (
    <div className="relative sm:mx-auto mt-6">
      <input
        className="w-full peer sm:w-[384px] bg-white p-2 pl-11 border-2 border-blue-800 border-opacity-20 rounded-[20px] text-gray-500 focus:text-black focus:outline-none focus:border-blue-500 shadow"
        type="text"
        name="query"
        id="query"
        placeholder="Search patient"
        defaultValue={searchParams?.get("query")?.toString() || ""}
        autoComplete="off"
        onChange={(e) => handleInputChange(e.target.value)}
        ref={inputRef}
      />

      {/* Icons: Magnifying Glass and Close search */}
      <Search className="absolute left-4 top-3 opacity-50 peer-focus:opacity-100 text-black w-4.5 h-4.5" />

      {searchParams?.get("query") && (
        <X
          onClick={() => handleClose()}
          className="absolute right-4 top-3 cursor-pointer hover:bg-slate-600 hover:text-white text-black h-4.5 w-4.5"
        />
      )}
    </div>
  )
}
