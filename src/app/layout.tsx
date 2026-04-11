import "./globals.css"
import type { Metadata } from "next"
import Navbar from "@/lib/components/navbar"
import Footer from "@/lib/components/footer"

export const metadata: Metadata = {
  title: "Destiny Helpers Outreach",
  description:
    "Destiny Helpers Outreach empowers youth and families through mentorship, education, and compassionate community support.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto px-6 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
