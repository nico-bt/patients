import type { Metadata } from "next"
import { Ubuntu_Sans } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import { Toaster } from "react-hot-toast"

const ubuntu = Ubuntu_Sans({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Light-it Patients",
  description: "Register and manage patients efficiently :thunder",
  keywords: ["light-it", "patients", "healthcare", "health", "wellness"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={ubuntu.className}>
      <body>
        <Toaster position="top-center" />
        <Header />
        <div className="mx-auto max-w-[1440px] grid justify-items-center gap-6">{children}</div>
      </body>
    </html>
  )
}
