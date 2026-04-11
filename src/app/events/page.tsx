"use client"

import { useState } from "react"

import Calendar from "@/lib/components/Calendar"
import type { CalendarEvent } from "@/lib/types/event"

const initialEvents: CalendarEvent[] = []

export default function EventsPage() {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents)

  const handleAddEvent = (event: CalendarEvent) => {
    setEvents((currentEvents) =>
      [...currentEvents, event].sort((left, right) => {
        const leftKey = `${left.date}-${left.time ?? ""}-${left.name}`
        const rightKey = `${right.date}-${right.time ?? ""}-${right.name}`
        return leftKey.localeCompare(rightKey)
      })
    )
  }

  const handleDeleteEvent = (id: string) => {
    setEvents((currentEvents) => currentEvents.filter((event) => event.id !== id))
  }

  return (
    <section className="space-y-8 py-4">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Destiny Helpers Outreach
        </p>
        <div className="max-w-3xl space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Events Calendar
          </h1>
          <p className="text-base leading-7 text-slate-600 sm:text-lg">
            Plan outreach gatherings, workshops, and community moments in one simple shared
            calendar. Add events to any date, revisit details, and keep each month organized.
          </p>
        </div>
      </div>

      <Calendar
        events={events}
        onAddEvent={handleAddEvent}
        onDeleteEvent={handleDeleteEvent}
      />
    </section>
  )
}
