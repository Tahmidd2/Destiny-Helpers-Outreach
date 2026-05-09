import Link from "next/link";

const opportunities = [
  "Program support and mentorship",
  "Event setup, guest support, and cleanup",
  "Administrative and outreach support",
  "Creative, media, and storytelling help",
];

export default function VolunteerWithUsPage() {
  return (
    <>
      <style>{`
        .volunteer-page { background: #fffaf0; color: #10204f; font-family: 'DM Sans', sans-serif; }
        .volunteer-shell { max-width: 1120px; margin: 0 auto; padding: 88px 48px 112px; }
        .volunteer-hero { display: grid; grid-template-columns: 1.05fr .95fr; gap: 42px; align-items: center; }
        .volunteer-kicker { color: #d4a017; font-size: 12px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; }
        .volunteer-title { margin: 18px 0; font-family: 'Playfair Display', serif; font-size: clamp(44px, 6vw, 72px); line-height: 1; }
        .volunteer-copy { color: #626b80; font-size: 18px; line-height: 1.8; }
        .volunteer-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 30px; }
        .volunteer-btn { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; padding: 15px 26px; font-weight: 800; text-decoration: none; }
        .volunteer-btn.primary { background: #d4a017; color: #10204f; }
        .volunteer-btn.secondary { border: 1px solid rgba(16,32,79,.24); color: #10204f; }
        .volunteer-panel { background: white; border: 1px solid rgba(16,32,79,.08); border-radius: 8px; padding: 32px; box-shadow: 0 20px 56px rgba(16,32,79,.08); }
        .volunteer-list { list-style: none; padding: 0; margin: 24px 0 0; display: grid; gap: 14px; }
        .volunteer-list li { display: grid; grid-template-columns: 30px 1fr; gap: 10px; color: #27375f; line-height: 1.6; }
        .volunteer-list li::before { content: "✓"; color: #d4a017; font-weight: 900; }
        .volunteer-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 58px; }
        .volunteer-card { background: white; border: 1px solid rgba(16,32,79,.08); border-radius: 8px; padding: 26px; }
        .volunteer-card h2 { margin: 0 0 10px; font-family: 'Playfair Display', serif; font-size: 28px; }
        .volunteer-card p { margin: 0; color: #687087; line-height: 1.75; }
        @media (max-width: 860px) { .volunteer-shell { padding: 64px 24px 88px; } .volunteer-hero, .volunteer-grid { grid-template-columns: 1fr; } .volunteer-actions { flex-direction: column; } }
      `}</style>
      <main className="volunteer-page">
        <div className="volunteer-shell">
          <section className="volunteer-hero">
            <div>
              <div className="volunteer-kicker">Volunteer With Us</div>
              <h1 className="volunteer-title">Show Up for Youth, Families, and Community</h1>
              <p className="volunteer-copy">
                Volunteers help Destiny Helpers Outreach Inc. create welcoming, organized,
                and meaningful experiences across programs, events, and outreach efforts.
              </p>
              <div className="volunteer-actions">
                <Link href="/contact" className="volunteer-btn primary">Become a Volunteer</Link>
                <Link href="/events" className="volunteer-btn secondary">View Events</Link>
              </div>
            </div>
            <aside className="volunteer-panel">
              <div className="volunteer-kicker">Ways to Help</div>
              <ul className="volunteer-list">
                {opportunities.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </aside>
          </section>
          <section className="volunteer-grid">
            <div className="volunteer-card">
              <h2>Support Programs</h2>
              <p>Assist facilitators, encourage participants, and help create safe, affirming spaces.</p>
            </div>
            <div className="volunteer-card">
              <h2>Serve at Events</h2>
              <p>Help with check-in, distribution, hospitality, setup, and family support.</p>
            </div>
            <div className="volunteer-card">
              <h2>Share Skills</h2>
              <p>Contribute professional, creative, technical, or administrative talents.</p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
