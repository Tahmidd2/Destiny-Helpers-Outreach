"use client"

import { useMemo, useState } from "react"

import EventModal from "@/lib/components/EventModal"
import type { CalendarEvent } from "@/lib/types/event"

type CalendarProps = {
  events: CalendarEvent[]
  onAddEvent: (event: CalendarEvent) => void
  onDeleteEvent: (id: string) => void
}

type CalendarDay = {
  date: string
  isCurrentMonth: boolean
}

type ViewingState =
  | { type: "single"; event: CalendarEvent }
  | { type: "list"; date: string; events: CalendarEvent[] }
  | null

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function pad(value: number) {
  return `${value}`.padStart(2, "0")
}

function toIsoDate(year: number, month: number, day: number) {
  return `${year}-${pad(month + 1)}-${pad(day)}`
}

function formatAriaDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function formatEventTime(time?: string) {
  if (!time) {
    return ""
  }

  const [hours, minutes] = time.split(":")
  const hourValue = Number(hours)

  if (Number.isNaN(hourValue) || minutes === undefined) {
    return time
  }

  const suffix = hourValue >= 12 ? "PM" : "AM"
  const displayHour = hourValue % 12 || 12
  return `${displayHour}:${minutes} ${suffix}`
}

function buildCalendarDays(currentYear: number, currentMonth: number) {
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const firstWeekday = firstDayOfMonth.getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const daysInPreviousMonth = new Date(currentYear, currentMonth, 0).getDate()
  const days: CalendarDay[] = []

  for (let index = firstWeekday - 1; index >= 0; index -= 1) {
    const previousMonthDate = new Date(currentYear, currentMonth - 1, daysInPreviousMonth - index)
    days.push({
      date: toIsoDate(
        previousMonthDate.getFullYear(),
        previousMonthDate.getMonth(),
        previousMonthDate.getDate()
      ),
      isCurrentMonth: false,
    })
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push({
      date: toIsoDate(currentYear, currentMonth, day),
      isCurrentMonth: true,
    })
  }

  let nextMonthDay = 1
  while (days.length < 42) {
    const nextMonthDate = new Date(currentYear, currentMonth + 1, nextMonthDay)
    days.push({
      date: toIsoDate(
        nextMonthDate.getFullYear(),
        nextMonthDate.getMonth(),
        nextMonthDate.getDate()
      ),
      isCurrentMonth: false,
    })
    nextMonthDay += 1
  }

  return days
}

export default function Calendar({
  events,
  onAddEvent,
  onDeleteEvent,
}: CalendarProps) {
  const today = useMemo(() => new Date(), [])
  const todayIso = useMemo(
    () => toIsoDate(today.getFullYear(), today.getMonth(), today.getDate()),
    [today]
  )
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [viewingEvent, setViewingEvent] = useState<ViewingState>(null)

  const monthHeading = useMemo(() => {
    return new Date(currentYear, currentMonth, 1).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
  }, [currentMonth, currentYear])

  const days = useMemo(
    () => buildCalendarDays(currentYear, currentMonth),
    [currentMonth, currentYear]
  )

  const isCurrentRealMonth =
    currentMonth === today.getMonth() && currentYear === today.getFullYear()

  const eventsByDate = useMemo(() => {
    return events.reduce<Record<string, CalendarEvent[]>>((groupedEvents, event) => {
      const currentEvents = groupedEvents[event.date] ?? []
      groupedEvents[event.date] = [...currentEvents, event].sort((left, right) => {
        const leftKey = `${left.time ?? ""}-${left.name}`
        const rightKey = `${right.time ?? ""}-${right.name}`
        return leftKey.localeCompare(rightKey)
      })
      return groupedEvents
    }, {})
  }, [events])

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((year) => year - 1)
      return
    }

    setCurrentMonth((month) => month - 1)
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((year) => year + 1)
      return
    }

    setCurrentMonth((month) => month + 1)
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous month"
            onClick={handlePreviousMonth}
            className="min-h-[44px] min-w-[44px] rounded-full p-2 text-gray-600 transition hover:bg-gray-100"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={handleNextMonth}
            className="min-h-[44px] min-w-[44px] rounded-full p-2 text-gray-600 transition hover:bg-gray-100"
          >
            →
          </button>
        </div>

        <h2 className="text-center text-2xl font-semibold text-gray-900">{monthHeading}</h2>

        <div className="flex min-w-[88px] justify-end">
          {!isCurrentRealMonth ? (
            <button
              type="button"
              onClick={() => {
                setCurrentMonth(today.getMonth())
                setCurrentYear(today.getFullYear())
              }}
              className="min-h-[44px] rounded-md bg-blue-600 px-4 py-2 text-white transition hover:opacity-90"
            >
              Today
            </button>
          ) : null}
        </div>
      </div>

      <div className="mb-1 grid grid-cols-7 text-center text-xs font-medium uppercase text-gray-400">
        {weekdayLabels.map((label) => (
          <div key={label} className="py-2">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 border-l border-t border-gray-200">
        {days.map((day) => {
          const dayEvents = eventsByDate[day.date] ?? []
          const dayNumber = Number(day.date.slice(-2))
          const isToday = day.date === todayIso
          const visibleEvents = dayEvents.slice(0, 2)
          const remainingCount = dayEvents.length - visibleEvents.length

          return (
            <div
              key={day.date}
              role="button"
              tabIndex={0}
              aria-label={`Add event on ${formatAriaDate(day.date)}`}
              className={`relative min-h-[70px] cursor-pointer border-b border-r border-gray-200 p-1 transition hover:bg-gray-50 sm:min-h-[100px] sm:p-2 ${
                day.isCurrentMonth ? "bg-white" : "bg-gray-50"
              } ${day.isCurrentMonth ? "" : "opacity-40"}`}
              onClick={() => setSelectedDate(day.date)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  setSelectedDate(day.date)
                }
              }}
            >
              <div className="mb-1 flex justify-end">
                {isToday ? (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-medium text-white sm:text-sm">
                    {dayNumber}
                  </span>
                ) : (
                  <span className="text-right text-xs font-medium sm:text-sm">{dayNumber}</span>
                )}
              </div>

              <div className="hidden sm:block">
                {visibleEvents.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    aria-label={`View event: ${event.name}`}
                    onClick={(clickEvent) => {
                      clickEvent.stopPropagation()
                      setViewingEvent({ type: "single", event })
                    }}
                    className="mb-0.5 block w-full truncate rounded bg-blue-100 px-1.5 py-0.5 text-left text-xs text-blue-800 transition hover:bg-blue-200"
                  >
                    {event.name}
                  </button>
                ))}

                {remainingCount > 0 ? (
                  <button
                    type="button"
                    onClick={(clickEvent) => {
                      clickEvent.stopPropagation()
                      setViewingEvent({ type: "list", date: day.date, events: dayEvents })
                    }}
                    className="text-xs font-medium text-blue-700 underline-offset-2 hover:underline"
                  >
                    +{remainingCount} more
                  </button>
                ) : null}
              </div>

              <div className="flex items-center justify-center sm:hidden">
                {dayEvents.length > 0 ? (
                  <button
                    type="button"
                    aria-label={`View ${dayEvents.length} events on ${formatAriaDate(day.date)}`}
                    onClick={(clickEvent) => {
                      clickEvent.stopPropagation()
                      if (dayEvents.length === 1) {
                        setViewingEvent({ type: "single", event: dayEvents[0] })
                        return
                      }

                      setViewingEvent({ type: "list", date: day.date, events: dayEvents })
                    }}
                    className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-[10px] font-medium text-blue-800"
                  >
                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                    {dayEvents.length}
                  </button>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>

      {selectedDate ? (
        <EventModal
          mode="add"
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
          onSave={(event) => onAddEvent({ ...event, id: "" })}
        />
      ) : null}

      {viewingEvent?.type === "single" ? (
        <EventModal
          mode="detail"
          event={viewingEvent.event}
          onDelete={onDeleteEvent}
          onClose={() => setViewingEvent(null)}
        />
      ) : null}

      {viewingEvent?.type === "list" ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setViewingEvent(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-list-title"
            className="mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="event-list-title" className="mb-1 text-xl font-semibold text-gray-900">
              Events on {formatAriaDate(viewingEvent.date)}
            </h2>
            <p className="mb-4 text-sm text-gray-500">
              Select an event to view details or delete it.
            </p>

            <div className="space-y-2">
              {viewingEvent.events.map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => setViewingEvent({ type: "single", event })}
                  className="block w-full rounded-md border border-gray-200 px-3 py-3 text-left transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <div className="text-sm font-medium text-gray-900">{event.name}</div>
                  <div className="mt-1 text-xs text-gray-500">
                    {event.time ? formatEventTime(event.time) : "No time specified"}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setViewingEvent(null)}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50"
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
