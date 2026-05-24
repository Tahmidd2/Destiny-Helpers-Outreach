"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

import Footer from "@/lib/components/footer"
import Navbar from "@/lib/components/navbar"

const STANDALONE_ROUTES = new Set([
  "/programs/teen-brownsville",
  "/programs/teen-destiny-changer",
])

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isStandalone = pathname ? STANDALONE_ROUTES.has(pathname) : false

  if (isStandalone) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12">
        {children}
      </main>
      <Footer />
    </>
  )
}
