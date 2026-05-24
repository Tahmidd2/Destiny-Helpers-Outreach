import Calendar from "@/lib/components/Calendar"
import { communityEvents } from "@/lib/data/community-events"

function formatEventDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function formatEventTime(time?: string, endTime?: string) {
  if (!time) {
    return "Time TBD"
  }

  const start = new Date(`2026-01-01T${time}`)
  const startLabel = start.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })

  if (!endTime) {
    return startLabel
  }

  const end = new Date(`2026-01-01T${endTime}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })

  return `${startLabel} to ${end}`
}

export default function EventsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-8 space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d4a017]">Community Calendar</p>
        <h1 className="text-4xl font-bold tracking-tight text-[#0f1f4d]">2026 Community Calendar</h1>
        <p className="max-w-2xl text-base leading-7 text-gray-600">
          Stay up to date with upcoming programs, outreach events, fundraisers, and community celebrations.
        </p>
      </div>

      <Calendar events={communityEvents} />

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-[#0f1f4d]">Upcoming 2026 Events</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {communityEvents.map((event) => (
            <article key={event.id} className="rounded-lg border border-[#0f1f4d]/10 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d4a017]">
                {formatEventDate(event.date)}
              </p>
              <h3 className="mt-2 text-xl font-bold text-[#0f1f4d]">{event.name}</h3>
              <div className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                <p><span className="font-semibold text-gray-900">Time:</span> {formatEventTime(event.time, event.endTime)}</p>
                <p><span className="font-semibold text-gray-900">Location:</span> {event.location ?? "TBD"}</p>
                {event.description ? <p>{event.description}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
