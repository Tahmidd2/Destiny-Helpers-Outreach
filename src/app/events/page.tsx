import { communityEvents } from "@/lib/data/community-events"
import Calendar from "@/lib/components/Calendar"

export default function EventsPage() {
  return (
    <>
      <style>{`
        body {
          background: #f9f6f1 !important;
          color: #0f1f4d !important;
        }

        body > main {
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
          background: #f9f6f1 !important;
        }

        .events-page {
          width: min(1280px, calc(100% - 32px));
          margin: 0 auto;
          padding: 124px 0 84px;
          background: #f9f6f1;
          font-family: 'DM Sans', Arial, sans-serif;
        }

        .events-header {
          margin-bottom: 34px;
        }

        .events-kicker {
          margin: 0 0 10px;
          color: #d4a017;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .events-title {
          margin: 0;
          color: #0f1f4d;
          font-size: clamp(38px, 5vw, 58px);
          line-height: 1;
          font-weight: 900;
        }

        .events-copy {
          max-width: 760px;
          margin: 16px 0 0;
          color: #5f6470;
          font-size: 17px;
          line-height: 1.75;
        }

        @media (max-width: 860px) {
          .events-page {
            padding-top: 96px;
          }
        }
      `}</style>

      <div className="events-page">
        <div className="events-header">
          <p className="events-kicker">Community Calendar</p>
          <h1 className="events-title">2026 Community Calendar</h1>
          <p className="events-copy">
            Stay up to date with upcoming programs, outreach events, fundraisers, and community celebrations.
          </p>
        </div>

        <Calendar events={communityEvents} />
      </div>
    </>
  )
}
