"use client"

import { useMemo, useState } from "react"
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  type EventProps,
  type SlotInfo,
  type ToolbarProps,
  Views,
} from "react-big-calendar"
import {
  format,
  getDay,
  parse,
  startOfWeek,
} from "date-fns"
import { enUS } from "date-fns/locale"

import EventModal from "@/lib/components/EventModal"
import type { CalendarEvent } from "@/lib/types/event"

type CalendarProps = {
  events: CalendarEvent[]
  onAddEvent: (event: CalendarEvent) => void
  onDeleteEvent: (id: string) => void
}

type CalendarDisplayEvent = {
  id: string
  title: string
  start: Date
  end: Date
  allDay: boolean
  resource: CalendarEvent
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: enUS }),
  getDay,
  locales: {
    "en-US": enUS,
  },
})

function combineEventDate(date: string, time?: string) {
  const baseDate = new Date(`${date}T00:00:00`)

  if (!time) {
    return {
      start: baseDate,
      end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), 23, 59, 59),
      allDay: true,
    }
  }

  const [hours, minutes] = time.split(":").map(Number)
  const start = new Date(baseDate)
  start.setHours(hours || 0, minutes || 0, 0, 0)

  const end = new Date(start)
  end.setHours(start.getHours() + 1)

  return { start, end, allDay: false }
}

function toIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${year}-${month}-${day}`
}

function EventChip({ event }: EventProps<CalendarDisplayEvent>) {
  const timeLabel = event.resource.time
    ? format(new Date(event.start), "h:mm a")
    : null

  return (
    <div className="truncate text-xs font-semibold">
      {timeLabel ? `${timeLabel} · ` : ""}
      {event.title}
    </div>
  )
}

function CalendarToolbar({
  label,
  onNavigate,
  currentDate,
}: ToolbarProps<CalendarDisplayEvent> & { currentDate: Date }) {
  const today = new Date()
  const isCurrentMonth =
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear()

  return (
    <div className="mb-6 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => onNavigate("PREV")}
          className="min-h-[44px] min-w-[44px] rounded-full p-2 text-gray-600 transition hover:bg-gray-100"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => onNavigate("NEXT")}
          className="min-h-[44px] min-w-[44px] rounded-full p-2 text-gray-600 transition hover:bg-gray-100"
        >
          →
        </button>
      </div>

      <h2 className="text-center text-2xl font-semibold text-gray-900">{label}</h2>

      <div className="flex min-w-[88px] justify-end">
        {!isCurrentMonth ? (
          <button
            type="button"
            aria-label="Go to today"
            onClick={() => onNavigate("TODAY")}
            className="min-h-[44px] rounded-md bg-blue-600 px-4 py-2 text-white transition hover:opacity-90"
          >
            Today
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default function Calendar({
  events,
  onAddEvent,
  onDeleteEvent,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [viewingEvent, setViewingEvent] = useState<CalendarEvent | null>(null)

  const calendarEvents = useMemo<CalendarDisplayEvent[]>(() => {
    return events.map((event) => {
      const { start, end, allDay } = combineEventDate(event.date, event.time)

      return {
        id: event.id,
        title: event.name,
        start,
        end,
        allDay,
        resource: event,
      }
    })
  }, [events])

  const handleSelectSlot = (slot: SlotInfo) => {
    const clickedDate = Array.isArray(slot.slots) && slot.slots[0] instanceof Date
      ? slot.slots[0]
      : slot.start

    setSelectedDate(toIsoDate(clickedDate as Date))
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <BigCalendar
        localizer={localizer}
        events={calendarEvents}
        date={currentDate}
        view={Views.MONTH}
        views={[Views.MONTH]}
        selectable
        popup
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        onNavigate={setCurrentDate}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event) => setViewingEvent(event.resource)}
        components={{
          event: EventChip,
          toolbar: (toolbarProps) => (
            <CalendarToolbar {...toolbarProps} currentDate={currentDate} />
          ),
        }}
        eventPropGetter={() => ({
          className:
            "rounded-full border-0 bg-blue-100 text-blue-800 hover:bg-blue-200 transition",
        })}
        dayPropGetter={(date) => ({
          className:
            "cursor-pointer transition hover:bg-gray-50",
          "aria-label": `Add event on ${format(date, "MMMM d, yyyy")}`,
        })}
        formats={{
          weekdayFormat: (date, culture, formatLocalizer) =>
            formatLocalizer?.format(date, "EEE", culture)?.toUpperCase() ?? "",
          dayFormat: (date, culture, formatLocalizer) =>
            formatLocalizer?.format(date, "d", culture) ?? "",
        }}
      />

      {selectedDate ? (
        <EventModal
          mode="add"
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
          onSave={(event) => onAddEvent({ ...event, id: "" })}
        />
      ) : null}

      {viewingEvent ? (
        <EventModal
          mode="detail"
          event={viewingEvent}
          onDelete={onDeleteEvent}
          onClose={() => setViewingEvent(null)}
        />
      ) : null}
    </div>
  )
}
