import "./globals.css"
import Navbar from "@/lib/components/navbar"
import Footer from "@/lib/components/footer"

export const metadata = {
  title: "Destiny Helpers Outreach Inc",
  description: "Short description of the business."
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