import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Events | Destiny Helpers Outreach",
  description: "View and add upcoming events.",
}

export default function EventsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
