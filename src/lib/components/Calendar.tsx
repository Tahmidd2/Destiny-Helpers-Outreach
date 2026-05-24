"use client"

import { useMemo, useState } from "react"
import { format } from "date-fns"

import type { CalendarEvent } from "@/lib/types/event"

type CalendarProps = {
  events: CalendarEvent[]
  year?: number
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

function parseEventDate(date: string) {
  return new Date(`${date}T00:00:00`)
}

function formatEventDate(date: string) {
  return format(parseEventDate(date), "MMM. d")
}

function formatEventTime(time?: string, endTime?: string) {
  if (!time) return "TBD"

  const startLabel = format(new Date(`2026-01-01T${time}`), "h:mm a")
  return endTime
    ? `${startLabel} to ${format(new Date(`2026-01-01T${endTime}`), "h:mm a")}`
    : startLabel
}

function getEventMonth(event: CalendarEvent) {
  return parseEventDate(event.date).getMonth()
}

function getEventStatus(event: CalendarEvent) {
  return event.time && event.location ? "Confirmed" : "Details TBD"
}

export default function Calendar({ events, year = 2026 }: CalendarProps) {
  const [viewingEvent, setViewingEvent] = useState<CalendarEvent | null>(null)
  const [activeMonth, setActiveMonth] = useState<number | "all">("all")

  const eventsByMonth = useMemo(() => {
    return events.reduce<Record<number, CalendarEvent[]>>((grouped, event) => {
      const month = getEventMonth(event)
      grouped[month] = [...(grouped[month] ?? []), event].sort((left, right) =>
        `${left.date}-${left.time ?? ""}`.localeCompare(`${right.date}-${right.time ?? ""}`)
      )
      return grouped
    }, {})
  }, [events])

  const visibleMonths =
    activeMonth === "all" ? monthNames.map((_, index) => index) : [activeMonth]

  return (
    <>
      <style>{`
        .community-calendar {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(15, 31, 77, 0.12);
          border-radius: 8px;
          background: #fff8d8;
          padding: clamp(24px, 4vw, 44px);
          box-shadow: 0 18px 48px rgba(15, 31, 77, 0.08);
          font-family: 'DM Sans', Arial, sans-serif;
        }

        .calendar-dot-field {
          position: absolute;
          right: 0;
          top: 0;
          display: grid;
          grid-template-columns: repeat(5, 10px);
          gap: 22px;
          padding: 28px;
          opacity: 0.18;
          pointer-events: none;
        }

        .calendar-dot-field span {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #000;
        }

        .calendar-heading {
          position: relative;
          z-index: 1;
          text-align: center;
          color: #000;
        }

        .calendar-year {
          margin: 0;
          font-size: clamp(48px, 7vw, 72px);
          line-height: 0.9;
          font-weight: 900;
          letter-spacing: 0;
        }

        .calendar-title {
          margin: 8px 0 0;
          font-size: clamp(38px, 6vw, 68px);
          line-height: 1;
          font-weight: 900;
          letter-spacing: 0;
        }

        .calendar-filters {
          position: relative;
          z-index: 1;
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 34px 0 8px;
        }

        .calendar-filter {
          flex: 0 0 auto;
          border: 1px solid rgba(15, 31, 77, 0.14);
          border-radius: 999px;
          background: #fff;
          color: #0f1f4d;
          cursor: pointer;
          font: inherit;
          font-size: 14px;
          font-weight: 800;
          padding: 10px 16px;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }

        .calendar-filter:hover {
          transform: translateY(-1px);
          background: rgba(15, 31, 77, 0.08);
        }

        .calendar-filter.active {
          background: #0f1f4d;
          color: #fff;
        }

        .calendar-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 28px;
          margin-top: 30px;
        }

        .calendar-month {
          border: 1px solid rgba(15, 31, 77, 0.22);
          border-radius: 8px;
          background: #fff;
          box-shadow: 4px 4px 0 rgba(15, 31, 77, 0.25);
        }

        .calendar-month-label {
          width: 76%;
          margin: -16px auto 0;
          border: 1px solid rgba(15, 31, 77, 0.16);
          border-radius: 8px;
          background: #ffd400;
          color: #000;
          padding: 10px 14px;
          text-align: center;
          font-size: 24px;
          font-weight: 900;
          line-height: 1;
          box-shadow: 3px 3px 0 rgba(15, 31, 77, 0.25);
        }

        .calendar-month-body {
          min-height: 286px;
          padding: 22px 16px 18px;
        }

        .calendar-events {
          display: grid;
          gap: 14px;
        }

        .calendar-event {
          display: block;
          width: 100%;
          border: 1px solid rgba(15, 31, 77, 0.1);
          border-radius: 8px;
          background: #f9f6f1;
          color: #000;
          cursor: pointer;
          font: inherit;
          padding: 16px;
          text-align: left;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }

        .calendar-event:hover {
          border-color: #d4a017;
          box-shadow: 0 12px 28px rgba(15, 31, 77, 0.12);
          transform: translateY(-2px);
        }

        .calendar-event-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .calendar-event-title {
          margin: 0;
          font-size: 20px;
          font-weight: 900;
          line-height: 1.12;
        }

        .calendar-status {
          flex: 0 0 auto;
          border-radius: 999px;
          background: #0f1f4d;
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 6px 8px;
          text-transform: uppercase;
        }

        .calendar-event-meta {
          display: grid;
          gap: 8px;
          margin-top: 14px;
          color: #111;
          font-size: 16px;
          line-height: 1.45;
        }

        .calendar-event-meta p {
          display: grid;
          grid-template-columns: 24px minmax(0, 1fr);
          gap: 8px;
          margin: 0;
        }

        .calendar-description {
          margin: 12px 0 0;
          color: #5f6470;
          font-size: 14px;
          line-height: 1.6;
        }

        .calendar-empty {
          display: flex;
          min-height: 210px;
          align-items: center;
          justify-content: center;
          border: 1px dashed #c9c9c9;
          border-radius: 8px;
          background: #fafafa;
          color: #8a8f9b;
          font-size: 14px;
          font-weight: 800;
          text-align: center;
        }

        .calendar-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.5);
          padding: 20px;
          backdrop-filter: blur(5px);
        }

        .calendar-modal {
          width: min(100%, 520px);
          border-radius: 8px;
          background: #fff;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
          padding: 28px;
        }

        .calendar-modal-date {
          margin: 0;
          color: #d4a017;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .calendar-modal h2 {
          margin: 10px 0 0;
          color: #0f1f4d;
          font-size: 34px;
          line-height: 1;
          font-weight: 900;
        }

        .calendar-modal-details {
          display: grid;
          gap: 12px;
          margin-top: 24px;
          color: #4b5563;
          font-size: 16px;
          line-height: 1.7;
        }

        .calendar-modal-details p {
          margin: 0;
        }

        .calendar-modal-details strong {
          color: #111827;
        }

        .calendar-close-row {
          display: flex;
          justify-content: flex-end;
          margin-top: 28px;
        }

        .calendar-close {
          border: 0;
          border-radius: 8px;
          background: #0f1f4d;
          color: #fff;
          cursor: pointer;
          font: inherit;
          font-weight: 800;
          padding: 12px 20px;
        }

        @media (max-width: 1060px) {
          .calendar-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 680px) {
          .community-calendar {
            padding: 22px 14px;
          }

          .calendar-grid {
            grid-template-columns: 1fr;
            gap: 26px;
          }

          .calendar-month-body {
            min-height: 220px;
          }

          .calendar-dot-field {
            display: none;
          }
        }
      `}</style>

      <section className="community-calendar">
        <div className="calendar-dot-field" aria-hidden="true">
          {Array.from({ length: 25 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>

        <div className="calendar-heading">
          <p className="calendar-year">{year}</p>
          <h2 className="calendar-title">Community Calendar</h2>
        </div>

        <div className="calendar-filters" aria-label="Calendar month filters">
          <button
            type="button"
            onClick={() => setActiveMonth("all")}
            className={`calendar-filter ${activeMonth === "all" ? "active" : ""}`}
          >
            Full Year
          </button>
          {monthNames.map((month, index) => (
            <button
              key={month}
              type="button"
              onClick={() => setActiveMonth(index)}
              className={`calendar-filter ${activeMonth === index ? "active" : ""}`}
            >
              {month}
            </button>
          ))}
        </div>

        <div className="calendar-grid">
          {visibleMonths.map((monthIndex) => {
            const monthEvents = eventsByMonth[monthIndex] ?? []

            return (
              <article
                key={monthNames[monthIndex]}
                id={`calendar-${monthNames[monthIndex].toLowerCase()}`}
                className="calendar-month"
              >
                <div className="calendar-month-label">{monthNames[monthIndex]}</div>
                <div className="calendar-month-body">
                  {monthEvents.length > 0 ? (
                    <div className="calendar-events">
                      {monthEvents.map((event) => (
                        <button
                          key={event.id}
                          type="button"
                          onClick={() => setViewingEvent(event)}
                          className="calendar-event"
                        >
                          <div className="calendar-event-top">
                            <h3 className="calendar-event-title">{event.name}</h3>
                            <span className="calendar-status">{getEventStatus(event)}</span>
                          </div>
                          <div className="calendar-event-meta">
                            <p>
                              <span aria-hidden="true">📅</span>
                              <span>{formatEventDate(event.date)}</span>
                            </p>
                            <p>
                              <span aria-hidden="true">📍</span>
                              <span>{event.location ?? "TBD"}</span>
                            </p>
                            <p>
                              <span aria-hidden="true">🕒</span>
                              <span>{formatEventTime(event.time, event.endTime)}</span>
                            </p>
                          </div>
                          {event.description ? (
                            <p className="calendar-description">{event.description}</p>
                          ) : null}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="calendar-empty">No events scheduled yet</div>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        {viewingEvent ? (
          <div
            className="calendar-modal-backdrop"
            onClick={() => setViewingEvent(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="calendar-event-title"
              className="calendar-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="calendar-modal-date">{formatEventDate(viewingEvent.date)}</p>
              <h2 id="calendar-event-title">{viewingEvent.name}</h2>
              <div className="calendar-modal-details">
                <p>
                  <strong>Time:</strong> {formatEventTime(viewingEvent.time, viewingEvent.endTime)}
                </p>
                <p>
                  <strong>Location:</strong> {viewingEvent.location ?? "TBD"}
                </p>
                {viewingEvent.description ? (
                  <p>
                    <strong>Details:</strong> {viewingEvent.description}
                  </p>
                ) : null}
              </div>
              <div className="calendar-close-row">
                <button
                  type="button"
                  onClick={() => setViewingEvent(null)}
                  className="calendar-close"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </>
  )
}
