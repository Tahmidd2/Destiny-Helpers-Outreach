"use client"

import { useEffect, useId, useMemo, useRef, useState } from "react"

import type { CalendarEvent } from "@/lib/types/event"

type EventModalProps =
  | {
      mode: "add"
      date: string
      onSave: (event: Omit<CalendarEvent, "id">) => void
      onClose: () => void
    }
  | {
      mode: "detail"
      event: CalendarEvent
      onDelete: (id: string) => void
      onClose: () => void
    }

function formatReadableDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function formatReadableTime(time?: string) {
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

export default function EventModal(props: EventModalProps) {
  const [name, setName] = useState("")
  const [time, setTime] = useState("")
  const [description, setDescription] = useState("")
  const modalRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  const formattedDate = useMemo(() => {
    return props.mode === "add"
      ? formatReadableDate(props.date)
      : formatReadableDate(props.event.date)
  }, [props])

  useEffect(() => {
    if (props.mode !== "add") {
      return
    }

    setName("")
    setTime("")
    setDescription("")
  }, [props.mode, props.mode === "add" ? props.date : null])

  useEffect(() => {
    const modalElement = modalRef.current

    if (!modalElement) {
      return
    }

    const getFocusableElements = () =>
      Array.from(
        modalElement.querySelectorAll<HTMLElement>(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute("disabled"))

    getFocusableElements()[0]?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        props.onClose()
        return
      }

      if (event.key !== "Tab") {
        return
      }

      const focusableElements = getFocusableElements()

      if (focusableElements.length === 0) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [props])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={props.onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        {props.mode === "add" ? (
          <>
            <h2 id={titleId} className="mb-1 text-xl font-semibold text-gray-900">
              Add Event
            </h2>
            <p className="mb-4 text-sm text-gray-500">{formattedDate}</p>

            <div className="mb-4">
              <label htmlFor="event-name" className="block text-sm font-medium text-gray-700">
                Event Name
              </label>
              <input
                id="event-name"
                type="text"
                required
                autoFocus
                aria-label="Event Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="event-time" className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                id="event-time"
                type="time"
                aria-label="Time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="event-description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="event-description"
                rows={3}
                aria-label="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={props.onClose}
                aria-label="Cancel adding event"
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!name.trim()}
                aria-label="Save Event"
                onClick={() => {
                  props.onSave({
                    date: props.date,
                    name: name.trim(),
                    time: time || undefined,
                    description: description.trim() || undefined,
                  })
                  props.onClose()
                }}
                className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Save Event
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 id={titleId} className="mb-1 text-xl font-semibold text-gray-900">
              {props.event.name}
            </h2>
            <p className="mb-4 text-sm text-gray-500">{formattedDate}</p>

            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <span className="font-medium text-gray-900">Date:</span> {formattedDate}
              </p>
              {props.event.time ? (
                <p>
                  <span className="font-medium text-gray-900">Time:</span>{" "}
                  {formatReadableTime(props.event.time)}
                </p>
              ) : null}
              {props.event.description ? (
                <p>
                  <span className="font-medium text-gray-900">Description:</span>{" "}
                  {props.event.description}
                </p>
              ) : null}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={props.onClose}
                aria-label="Close event details"
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50"
              >
                Close
              </button>
              <button
                type="button"
                aria-label={`Delete Event ${props.event.name}`}
                onClick={() => {
                  props.onDelete(props.event.id)
                  props.onClose()
                }}
                className="rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
              >
                Delete Event
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
