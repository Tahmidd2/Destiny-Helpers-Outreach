"use client"

import { useEffect, useMemo, useRef, useState } from "react"

import type { CalendarEvent } from "@/lib/types/event"

type CalendarProps = {
  events: CalendarEvent[]
  onAddEvent: (event: CalendarEvent) => void
  onDeleteEvent: (id: string) => void
}

type AddDialogState = {
  date: string
}

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function formatDateKey(date: Date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${year}-${month}-${day}`
}

function isSameDay(left: Date, right: Date) {
  return formatDateKey(left) === formatDateKey(right)
}

function buildCalendarDays(month: Date) {
  const monthStart = startOfMonth(month)
  const gridStart = new Date(monthStart)
  gridStart.setDate(monthStart.getDate() - monthStart.getDay())

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + index)

    return {
      date,
      key: formatDateKey(date),
      isCurrentMonth: date.getMonth() === month.getMonth(),
    }
  })
}

function formatTimeLabel(time?: string) {
  if (!time) {
    return ""
  }

  const [hours, minutes] = time.split(":")
  const normalizedHours = Number(hours)

  if (Number.isNaN(normalizedHours) || minutes === undefined) {
    return time
  }

  const period = normalizedHours >= 12 ? "PM" : "AM"
  const hourOnClock = normalizedHours % 12 || 12
  return `${hourOnClock}:${minutes} ${period}`
}

function trapFocus(container: HTMLElement, event: KeyboardEvent) {
  if (event.key !== "Tab") {
    return
  }

  const focusableElements = Array.from(
    container.querySelectorAll<HTMLElement>(
      'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("disabled"))

  if (focusableElements.length === 0) {
    event.preventDefault()
    return
  }

  const first = focusableElements[0]
  const last = focusableElements[focusableElements.length - 1]
  const activeElement = document.activeElement

  if (!event.shiftKey && activeElement === last) {
    event.preventDefault()
    first.focus()
  }

  if (event.shiftKey && activeElement === first) {
    event.preventDefault()
    last.focus()
  }
}

export default function Calendar({
  events,
  onAddEvent,
  onDeleteEvent,
}: CalendarProps) {
  const today = useMemo(() => new Date(), [])
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(today))
  const [addDialog, setAddDialog] = useState<AddDialogState | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [eventName, setEventName] = useState("")
  const [eventTime, setEventTime] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const addDialogRef = useRef<HTMLDivElement>(null)
  const eventDialogRef = useRef<HTMLDivElement>(null)
  const lastFocusedElementRef = useRef<HTMLElement | null>(null)

  const calendarDays = useMemo(() => buildCalendarDays(currentMonth), [currentMonth])
  const monthLabel = useMemo(
    () =>
      currentMonth.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
    [currentMonth]
  )

  const eventsByDate = useMemo(() => {
    return events.reduce<Record<string, CalendarEvent[]>>((accumulator, event) => {
      accumulator[event.date] = [...(accumulator[event.date] ?? []), event]
      return accumulator
    }, {})
  }, [events])

  useEffect(() => {
    const activeDialogRef = addDialog ? addDialogRef : selectedEvent ? eventDialogRef : null
    const container = activeDialogRef?.current

    if (!container) {
      return
    }

    const focusableElements = Array.from(
      container.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => !element.hasAttribute("disabled"))

    focusableElements[0]?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAddDialog(null)
        setSelectedEvent(null)
        return
      }

      trapFocus(container, event)
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [addDialog, selectedEvent])

  useEffect(() => {
    if (!addDialog && !selectedEvent) {
      lastFocusedElementRef.current?.focus()
    }
  }, [addDialog, selectedEvent])

  const openAddDialog = (date: string, trigger?: HTMLElement | null) => {
    lastFocusedElementRef.current = trigger ?? null
    setEventName("")
    setEventTime("")
    setEventDescription("")
    setSelectedEvent(null)
    setAddDialog({ date })
  }

  const openEventDialog = (event: CalendarEvent, trigger?: HTMLElement | null) => {
    lastFocusedElementRef.current = trigger ?? null
    setAddDialog(null)
    setSelectedEvent(event)
  }

  const closeDialogs = () => {
    setAddDialog(null)
    setSelectedEvent(null)
  }

  const handleSave = () => {
    if (!addDialog || !eventName.trim()) {
      return
    }

    const createId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${addDialog.date}-${Date.now()}`

    onAddEvent({
      id: createId,
      date: addDialog.date,
      name: eventName.trim(),
      time: eventTime || undefined,
      description: eventDescription.trim() || undefined,
    })

    closeDialogs()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Community Calendar
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">{monthLabel}</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            aria-label="Go to previous month"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            onClick={() =>
              setCurrentMonth(
                (previousMonth) =>
                  new Date(previousMonth.getFullYear(), previousMonth.getMonth() - 1, 1)
              )
            }
          >
            Previous
          </button>
          <button
            type="button"
            aria-label="Go to current month"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            onClick={() => setCurrentMonth(startOfMonth(today))}
          >
            Today
          </button>
          <button
            type="button"
            aria-label="Go to next month"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            onClick={() =>
              setCurrentMonth(
                (previousMonth) =>
                  new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 1)
              )
            }
          >
            Next
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
          {weekdayLabels.map((label) => (
            <div
              key={label}
              className="px-2 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 sm:px-4"
            >
              {label}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {calendarDays.map(({ date, key, isCurrentMonth }) => {
            const dayEvents = eventsByDate[key] ?? []
            const isToday = isSameDay(date, today)

            return (
              <div
                key={key}
                role="button"
                tabIndex={0}
                aria-label={`Add event on ${date.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}`}
                className={`min-h-[8.5rem] border-b border-r border-slate-200 p-2 align-top outline-none transition focus-visible:ring-2 focus-visible:ring-slate-400 sm:min-h-[10rem] sm:p-3 ${
                  isCurrentMonth ? "bg-white" : "bg-slate-50/70 text-slate-400"
                }`}
                onClick={(event) => openAddDialog(key, event.currentTarget)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    openAddDialog(key, event.currentTarget)
                  }
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                      isToday
                        ? "bg-slate-900 text-white"
                        : isCurrentMonth
                          ? "text-slate-900"
                          : "text-slate-400"
                    }`}
                  >
                    {date.getDate()}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                    {dayEvents.length > 0 ? `${dayEvents.length} event${dayEvents.length > 1 ? "s" : ""}` : ""}
                  </span>
                </div>

                <div className="mt-3 space-y-2">
                  {dayEvents.slice(0, 2).map((eventItem) => (
                    <button
                      key={eventItem.id}
                      type="button"
                      aria-label={`View event ${eventItem.name}`}
                      className="block w-full truncate rounded-xl bg-amber-100 px-2 py-1 text-left text-xs font-medium text-amber-900 transition hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                      onClick={(event) => {
                        event.stopPropagation()
                        openEventDialog(eventItem, event.currentTarget)
                      }}
                    >
                      {eventItem.time ? `${formatTimeLabel(eventItem.time)} • ` : ""}
                      {eventItem.name}
                    </button>
                  ))}

                  {dayEvents.length > 2 ? (
                    <p className="text-xs font-medium text-slate-500">+{dayEvents.length - 2} more</p>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {addDialog ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div
            ref={addDialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Add event for ${addDialog.date}`}
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                  New Event
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                  {new Date(`${addDialog.date}T00:00:00`).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close add event dialog"
                className="rounded-full border border-slate-300 px-3 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                onClick={closeDialogs}
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="event-name" className="mb-2 block text-sm font-medium text-slate-700">
                  Event name
                </label>
                <input
                  id="event-name"
                  aria-label="Event name"
                  required
                  value={eventName}
                  onChange={(event) => setEventName(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                  placeholder="Community workshop"
                />
              </div>

              <div>
                <label htmlFor="event-time" className="mb-2 block text-sm font-medium text-slate-700">
                  Time
                </label>
                <input
                  id="event-time"
                  aria-label="Event time"
                  type="time"
                  value={eventTime}
                  onChange={(event) => setEventTime(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                />
              </div>

              <div>
                <label
                  htmlFor="event-description"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Description
                </label>
                <textarea
                  id="event-description"
                  aria-label="Event description"
                  value={eventDescription}
                  onChange={(event) => setEventDescription(event.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                  placeholder="Share details for volunteers, families, or attendees."
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                aria-label="Cancel adding event"
                className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                onClick={closeDialogs}
              >
                Cancel
              </button>
              <button
                type="button"
                aria-label="Save event"
                className="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!eventName.trim()}
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {selectedEvent ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div
            ref={eventDialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Event details for ${selectedEvent.name}`}
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                  Event Details
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">{selectedEvent.name}</h3>
              </div>
              <button
                type="button"
                aria-label="Close event details dialog"
                className="rounded-full border border-slate-300 px-3 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                onClick={closeDialogs}
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
              <p>
                <span className="font-semibold text-slate-900">Date:</span>{" "}
                {new Date(`${selectedEvent.date}T00:00:00`).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Time:</span>{" "}
                {selectedEvent.time ? formatTimeLabel(selectedEvent.time) : "Not specified"}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Description:</span>{" "}
                {selectedEvent.description || "No description provided."}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                aria-label="Close event details"
                className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                onClick={closeDialogs}
              >
                Cancel
              </button>
              <button
                type="button"
                aria-label={`Delete event ${selectedEvent.name}`}
                className="rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-rose-500"
                onClick={() => {
                  onDeleteEvent(selectedEvent.id)
                  closeDialogs()
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
