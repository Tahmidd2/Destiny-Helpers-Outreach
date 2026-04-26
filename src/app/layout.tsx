import "./globals.css"
import type { Metadata } from "next"
import AppShell from "@/lib/components/app-shell"

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
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
