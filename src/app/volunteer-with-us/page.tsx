import Link from "next/link";

const volunteerOptions = [
  "Social Media Management",
  "Photography/Videography",
  "Set up/ Break down",
  "Distribution",
  "Pick up/ drop off donations",
  "Pre-event packaging",
  "Service/ Skill/ Expertise",
];

export default function VolunteerWithUsPage() {
  return (
    <>
      <style>{`
        .volunteer-page { background: #fffaf0; color: #10204f; font-family: 'DM Sans', sans-serif; }
        .volunteer-shell { max-width: 1120px; margin: 0 auto; padding: 88px 48px 112px; }
        .volunteer-hero { max-width: 820px; }
        .volunteer-kicker { color: #d4a017; font-size: 12px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; }
        .volunteer-title { margin: 18px 0; font-family: 'Playfair Display', serif; font-size: clamp(44px, 6vw, 72px); line-height: 1; }
        .volunteer-copy { color: #626b80; font-size: 18px; line-height: 1.8; }
        .volunteer-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 30px; }
        .volunteer-btn { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; padding: 15px 26px; font-weight: 800; text-decoration: none; }
        .volunteer-btn.primary { background: #d4a017; color: #10204f; }
        .volunteer-btn.secondary { border: 1px solid rgba(16,32,79,.24); color: #10204f; }
        .volunteer-form-card { max-width: 980px; margin: 56px auto 0; background: white; border: 1px solid rgba(16,32,79,.08); border-radius: 8px; padding: clamp(32px, 5vw, 56px); box-shadow: 0 20px 56px rgba(16,32,79,.08); }
        .volunteer-form-heading { margin: 0; font-family: 'Playfair Display', serif; font-size: clamp(34px, 5vw, 54px); line-height: 1.02; text-align: center; }
        .volunteer-form-subtitle { margin: 12px 0 18px; color: #626b80; font-size: 17px; line-height: 1.6; text-align: center; }
        .volunteer-form-pill { width: fit-content; margin: 0 auto 28px; border-radius: 999px; background: #f4b31a; color: #10204f; padding: 11px 28px; font-weight: 800; }
        .volunteer-form { display: grid; gap: 20px; }
        .volunteer-field { display: grid; grid-template-columns: minmax(190px, .42fr) minmax(0, 1fr); gap: 28px; align-items: center; }
        .volunteer-field label, .volunteer-field legend { color: #10204f; font-weight: 800; line-height: 1.35; }
        .volunteer-field input, .volunteer-field textarea { width: 100%; border: 1px solid rgba(16,32,79,.16); border-radius: 8px; background: #fff; color: #10204f; font: inherit; padding: 14px 16px; outline: none; transition: border-color .2s ease, box-shadow .2s ease; }
        .volunteer-field textarea { min-height: 126px; resize: vertical; }
        .volunteer-field input:focus, .volunteer-field textarea:focus { border-color: #d4a017; box-shadow: 0 0 0 4px rgba(212,160,23,.14); }
        .volunteer-check-field { border: 0; padding: 0; margin: 0; align-items: start; }
        .volunteer-options { display: grid; gap: 10px; padding-top: 2px; }
        .volunteer-check { display: grid; grid-template-columns: 20px minmax(0, 1fr); gap: 12px; align-items: start; color: #27375f; font-weight: 700; line-height: 1.35; min-height: 24px; }
        .volunteer-check input { appearance: none; width: 20px; height: 20px; min-width: 20px; margin: 0; border: 1px solid rgba(16,32,79,.22); border-radius: 3px; background: #fff; display: grid; place-items: center; padding: 0; }
        .volunteer-check span { padding-top: 1px; }
        .volunteer-check input::after { content: ""; width: 9px; height: 9px; border-radius: 2px; background: #d4a017; transform: scale(0); transition: transform .16s ease; }
        .volunteer-check input:checked::after { transform: scale(1); }
        .volunteer-submit-row { display: flex; justify-content: flex-end; padding-top: 8px; }
        .volunteer-submit { border: 0; border-radius: 999px; background: #f4b31a; color: #10204f; cursor: pointer; font: inherit; font-weight: 800; padding: 14px 34px; transition: transform .2s ease, box-shadow .2s ease; }
        .volunteer-submit:hover { box-shadow: 0 14px 30px rgba(212,160,23,.24); transform: translateY(-1px); }
        .volunteer-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 58px; }
        .volunteer-card { background: white; border: 1px solid rgba(16,32,79,.08); border-radius: 8px; padding: 26px; }
        .volunteer-card h2 { margin: 0 0 10px; font-family: 'Playfair Display', serif; font-size: 28px; }
        .volunteer-card p { margin: 0; color: #687087; line-height: 1.75; }
        @media (max-width: 860px) { .volunteer-shell { padding: 64px 24px 88px; } .volunteer-grid { grid-template-columns: 1fr; } .volunteer-actions { flex-direction: column; } .volunteer-field { grid-template-columns: 1fr; gap: 8px; } .volunteer-form-card { margin-top: 42px; padding: 30px 22px; } .volunteer-submit-row { justify-content: stretch; } .volunteer-submit { width: 100%; } }
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
          </section>
          <section className="volunteer-form-card" aria-labelledby="volunteer-form-title">
            <h2 className="volunteer-form-heading" id="volunteer-form-title">Become a Destiny Helper</h2>
            <p className="volunteer-form-subtitle">Get involved and create meaningful impact!</p>
            <div className="volunteer-form-pill">New volunteer</div>
            <form className="volunteer-form">
              <div className="volunteer-field">
                <label htmlFor="volunteer-name">Your Name *</label>
                <input id="volunteer-name" name="name" type="text" required />
              </div>
              <div className="volunteer-field">
                <label htmlFor="volunteer-phone">Phone Number *</label>
                <input id="volunteer-phone" name="phone" type="tel" defaultValue="+1" required />
              </div>
              <div className="volunteer-field">
                <label htmlFor="volunteer-email">Your Email *</label>
                <input id="volunteer-email" name="email" type="email" required />
              </div>
              <div className="volunteer-field">
                <label htmlFor="volunteer-company">Your Company</label>
                <input id="volunteer-company" name="company" type="text" />
              </div>
              <div className="volunteer-field">
                <label htmlFor="volunteer-subject">Subject *</label>
                <input id="volunteer-subject" name="subject" type="text" required />
              </div>
              <fieldset className="volunteer-field volunteer-check-field">
                <legend>How would you like to volunteer? *</legend>
                <div className="volunteer-options">
                  {volunteerOptions.map((option) => (
                    <label className="volunteer-check" key={option}>
                      <input name="volunteer_interest" type="checkbox" value={option} />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="volunteer-field">
                <label htmlFor="volunteer-question">Your Question *</label>
                <textarea id="volunteer-question" name="question" required />
              </div>
              <div className="volunteer-submit-row">
                <button className="volunteer-submit" type="submit">Submit</button>
              </div>
            </form>
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
