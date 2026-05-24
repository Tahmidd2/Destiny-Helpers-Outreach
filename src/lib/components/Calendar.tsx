"use client"

import { useMemo, useState } from "react"
import {
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns"

import type { CalendarEvent } from "@/lib/types/event"

type CalendarProps = {
  events: CalendarEvent[]
}

function dateKey(date: Date) {
  return format(date, "yyyy-MM-dd")
}

function parseEventDate(date: string) {
  return new Date(`${date}T00:00:00`)
}

function formatEventDate(date: string) {
  return format(parseEventDate(date), "MMM. d")
}

function formatEventTime(time?: string, endTime?: string) {
  if (!time) {
    return "Time TBD"
  }

  const startLabel = format(new Date(`2026-01-01T${time}`), "h:mm a")

  if (!endTime) {
    return startLabel
  }

  return `${startLabel} to ${format(new Date(`2026-01-01T${endTime}`), "h:mm a")}`
}

function buildMonthDays(currentDate: Date) {
  const start = startOfWeek(startOfMonth(currentDate))
  const end = endOfWeek(endOfMonth(currentDate))
  const days: Date[] = []
  const cursor = new Date(start)

  while (cursor <= end) {
    days.push(new Date(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }

  return days
}

export default function Calendar({ events }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1))
  const [viewingEvent, setViewingEvent] = useState<CalendarEvent | null>(null)

  const eventsByDate = useMemo(() => {
    return events.reduce<Record<string, CalendarEvent[]>>((grouped, event) => {
      grouped[event.date] = [...(grouped[event.date] ?? []), event]
      return grouped
    }, {})
  }, [events])

  const monthDays = useMemo(() => buildMonthDays(currentDate), [currentDate])
  const today = new Date()

  return (
    <div className="mx-auto w-full max-w-6xl rounded-lg border border-[#0f1f4d]/10 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => setCurrentDate((date) => subMonths(date, 1))}
            className="min-h-[44px] min-w-[44px] rounded-full p-2 text-gray-600 transition hover:bg-gray-100"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => setCurrentDate((date) => addMonths(date, 1))}
            className="min-h-[44px] min-w-[44px] rounded-full p-2 text-gray-600 transition hover:bg-gray-100"
          >
            →
          </button>
        </div>

        <h2 className="text-center text-2xl font-semibold text-[#0f1f4d]">
          {format(currentDate, "MMMM yyyy")}
        </h2>

        <div className="flex min-w-[88px] justify-end">
          {!isSameMonth(currentDate, today) ? (
            <button
              type="button"
              aria-label="Go to today"
              onClick={() => setCurrentDate(new Date())}
              className="min-h-[44px] rounded-md bg-[#0f1f4d] px-4 py-2 text-white transition hover:opacity-90"
            >
              Today
            </button>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-7 border-l border-t border-gray-200">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="border-b border-r border-gray-200 bg-gray-50 px-2 py-3 text-center text-xs font-bold uppercase tracking-[0.08em] text-gray-500"
          >
            {day}
          </div>
        ))}

        {monthDays.map((day) => {
          const key = dateKey(day)
          const dayEvents = eventsByDate[key] ?? []
          const muted = !isSameMonth(day, currentDate)
          const isToday = isSameDay(day, today)

          return (
            <div
              key={key}
              aria-label={format(day, "MMMM d, yyyy")}
              className={`min-h-28 border-b border-r border-gray-200 p-2 transition hover:bg-gray-50 ${
                muted ? "bg-gray-50/70 text-gray-400" : "bg-white text-gray-900"
              }`}
            >
              <div className="flex justify-end">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                    isToday ? "bg-[#0f1f4d] text-white" : ""
                  }`}
                >
                  {format(day, "d")}
                </span>
              </div>

              <div className="mt-2 space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => setViewingEvent(event)}
                    className="block w-full truncate rounded-full bg-[#d4a017]/20 px-2 py-1 text-left text-xs font-semibold text-[#0f1f4d] transition hover:bg-[#d4a017]/30"
                  >
                    {event.time ? `${format(new Date(`2026-01-01T${event.time}`), "h:mm a")} · ` : ""}
                    {event.name}
                  </button>
                ))}
                {dayEvents.length > 3 ? (
                  <button
                    type="button"
                    onClick={() => setViewingEvent(dayEvents[3])}
                    className="text-xs font-semibold text-[#1e3a8a]"
                  >
                    +{dayEvents.length - 3} more
                  </button>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>

      {viewingEvent ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setViewingEvent(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="calendar-event-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d4a017]">
              {formatEventDate(viewingEvent.date)}
            </p>
            <h2 id="calendar-event-title" className="mt-2 text-2xl font-bold text-[#0f1f4d]">
              {viewingEvent.name}
            </h2>
            <div className="mt-5 space-y-3 text-sm leading-6 text-gray-700">
              <p>
                <span className="font-semibold text-gray-950">Time:</span>{" "}
                {formatEventTime(viewingEvent.time, viewingEvent.endTime)}
              </p>
              <p>
                <span className="font-semibold text-gray-950">Location:</span>{" "}
                {viewingEvent.location ?? "TBD"}
              </p>
              {viewingEvent.description ? (
                <p>
                  <span className="font-semibold text-gray-950">Details:</span>{" "}
                  {viewingEvent.description}
                </p>
              ) : null}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setViewingEvent(null)}
                className="rounded-md bg-[#0f1f4d] px-4 py-2 text-white transition hover:opacity-90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
