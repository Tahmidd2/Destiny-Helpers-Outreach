import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <style>{`
        .contact-page { background: #f9f6f1; color: #0f1f4d; font-family: 'DM Sans', sans-serif; }
        .contact-shell { max-width: 1120px; margin: 0 auto; padding: 124px 48px 110px; }
        .contact-hero { display: grid; grid-template-columns: 1fr 0.85fr; gap: 48px; align-items: center; }
        .contact-kicker { color: #d4a017; font-size: 12px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; }
        .contact-title { margin: 18px 0 20px; font-family: 'Playfair Display', serif; font-size: clamp(42px, 6vw, 70px); line-height: 1; color: #0f1f4d; }
        .contact-copy { color: #5f6677; font-size: 18px; line-height: 1.8; max-width: 650px; }
        .contact-card { background: white; border: 1px solid rgba(15,31,77,.08); border-radius: 8px; padding: 30px; box-shadow: 0 18px 50px rgba(15,31,77,.08); }
        .contact-list { display: grid; gap: 18px; margin-top: 28px; }
        .contact-item { display: grid; grid-template-columns: 48px 1fr; gap: 14px; align-items: start; }
        .contact-icon { width: 48px; height: 48px; border-radius: 8px; background: #f5e6b8; display: flex; align-items: center; justify-content: center; color: #0f1f4d; font-weight: 800; }
        .contact-label { font-size: 12px; font-weight: 800; color: #d4a017; letter-spacing: .14em; text-transform: uppercase; }
        .contact-value, .contact-value a { margin-top: 4px; color: #24345f; text-decoration: none; line-height: 1.6; }
        .contact-form { display: grid; gap: 14px; margin-top: 22px; }
        .contact-input, .contact-textarea { width: 100%; border: 1px solid rgba(15,31,77,.14); border-radius: 8px; padding: 14px 16px; font: inherit; color: #0f1f4d; background: #fffdf8; }
        .contact-textarea { min-height: 132px; resize: vertical; }
        .contact-button { border: 0; border-radius: 999px; padding: 15px 24px; background: #d4a017; color: #0f1f4d; font-weight: 800; cursor: pointer; }
        .contact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 54px; }
        .contact-small { background: white; border-radius: 8px; padding: 24px; border: 1px solid rgba(15,31,77,.08); }
        .contact-small h2 { margin: 0 0 10px; font-family: 'Playfair Display', serif; font-size: 26px; }
        .contact-small p { margin: 0; color: #687087; line-height: 1.7; }
        @media (max-width: 860px) { .contact-shell { padding: 96px 24px 86px; } .contact-hero, .contact-grid { grid-template-columns: 1fr; } }
      `}</style>
      <main className="contact-page">
        <div className="contact-shell">
          <section className="contact-hero">
            <div>
              <div className="contact-kicker">Contact Us</div>
              <h1 className="contact-title">Let&apos;s Build Something Good Together</h1>
              <p className="contact-copy">
                Reach out to book a program, ask about partnerships, sponsor an initiative,
                or connect with the Destiny Helpers Outreach Inc. team.
              </p>
              <div className="contact-list">
                <div className="contact-item">
                  <div className="contact-icon">✉</div>
                  <div>
                    <div className="contact-label">Email</div>
                    <div className="contact-value">
                      <a href="mailto:info@destinyhelpersoutreach.org">info@destinyhelpersoutreach.org</a>
                    </div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">☎</div>
                  <div>
                    <div className="contact-label">Phone</div>
                    <div className="contact-value">
                      <a href="tel:+16313526615">+1 (631) 352-6615</a>
                    </div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">⌖</div>
                  <div>
                    <div className="contact-label">Location</div>
                    <div className="contact-value">Brooklyn, NY</div>
                  </div>
                </div>
              </div>
            </div>
            <form className="contact-card">
              <div className="contact-kicker">Send a Message</div>
              <div className="contact-form">
                <input className="contact-input" name="name" placeholder="Name" />
                <input className="contact-input" name="email" type="email" placeholder="Email" />
                <input className="contact-input" name="subject" placeholder="Subject" />
                <textarea className="contact-textarea" name="message" placeholder="How can we help?" />
                <button className="contact-button" type="submit">Submit Message</button>
              </div>
            </form>
          </section>
          <section className="contact-grid">
            <div className="contact-small">
              <h2>Programs</h2>
              <p>Bring a youth-centered workshop, pageant, or community experience to your school or organization.</p>
            </div>
            <div className="contact-small">
              <h2>Partnerships</h2>
              <p>Collaborate with us as a company, school, nonprofit, or community partner.</p>
            </div>
            <div className="contact-small">
              <h2>Support</h2>
              <p><Link href="/donate-now">Donate</Link> or <Link href="/volunteer-with-us">volunteer</Link> to help expand our impact.</p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
