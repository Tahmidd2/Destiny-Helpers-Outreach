"use client"

import { useState } from "react"

import Calendar from "@/lib/components/Calendar"
import type { CalendarEvent } from "@/lib/types/event"

export default function EventsPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([])

  const handleAddEvent = (event: CalendarEvent) => {
    setEvents((currentEvents) => {
      const eventWithId = {
        ...event,
        id: crypto.randomUUID(),
      }

      return [...currentEvents, eventWithId].sort((left, right) => {
        const leftKey = `${left.date}-${left.time ?? ""}-${left.name}`
        const rightKey = `${right.date}-${right.time ?? ""}-${right.name}`
        return leftKey.localeCompare(rightKey)
      })
    })
  }

  const handleDeleteEvent = (id: string) => {
    setEvents((currentEvents) => currentEvents.filter((event) => event.id !== id))
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Events</h1>
        <p className="text-base text-gray-600">Stay up to date with what&apos;s happening.</p>
      </div>

      <Calendar
        events={events}
        onAddEvent={handleAddEvent}
        onDeleteEvent={handleDeleteEvent}
      />
    </div>
  )
}
