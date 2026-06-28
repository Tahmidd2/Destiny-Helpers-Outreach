import type { CalendarEvent } from "@/lib/types/event"

// Calendar events are managed in code because the public site does not have authentication.
// Add, edit, or remove events here and the events page will update on the next deploy.
export const communityEvents: CalendarEvent[] = [
  {
    id: "2026-womens-month-makeover",
    date: "2026-03-15",
    name: "Women's Month Make Over",
    time: "15:00",
    endTime: "18:00",
    location: "The Delight Factory",
  },
  {
    id: "2026-mothers-day-event",
    date: "2026-05-07",
    name: "Mother's Day Event",
    time: "12:00",
    endTime: "15:00",
    location: "Kensington Family Shelter, 385 McDonald Ave, Brooklyn, NY",
  },
  {
    id: "2026-fathers-day-bbq",
    date: "2026-06-15",
    name: "Father's Day BBQ",
    time: "15:00",
    endTime: "18:00",
    location: "The Delight Factory",
  },
  {
    id: "2026-hilltop-community-event",
    date: "2026-07-25",
    name: "Community Event at Hilltop Playground",
    time: "10:00",
    endTime: "14:00",
    location: "Hilltop Playground, Thomas Boyland St & Pacific St, Brooklyn, NY",
  },
  {
    id: "2026-back-to-school-bbq",
    date: "2026-08-22",
    name: "Back To School BBQ",
    location: "Riverdale Avenue Community School",
    description: "Time to be confirmed.",
  },
  {
    id: "2026-campari-day-of-service",
    date: "2026-09-01",
    name: "Campari Day of Service",
    description: "Date, venue, and time to be confirmed.",
  },
  {
    id: "2026-fundraiser",
    date: "2026-10-24",
    name: "Destiny Helpers Outreach Fundraiser",
    description: "Venue and time to be confirmed.",
  },
  {
    id: "2026-nourish-your-community",
    date: "2026-11-25",
    name: "Nourish Your Community",
    description: "Venue and time to be determined.",
  },
  {
    id: "2026-winter-wonderland",
    date: "2026-12-19",
    name: "Winter Wonderland Event",
    location: "Hilltop Playground, Thomas Boyland St & Pacific St, Brooklyn, NY",
    description: "Time to be confirmed.",
  },
]
