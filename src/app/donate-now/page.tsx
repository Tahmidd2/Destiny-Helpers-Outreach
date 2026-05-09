import Link from "next/link";

const givingTiers = [
  { amount: "$25", label: "Supplies", text: "Helps provide workshop materials and care items." },
  { amount: "$100", label: "Programs", text: "Supports youth-centered activities and facilitation." },
  { amount: "$500", label: "Community", text: "Helps fund events, resources, and family support." },
];

export default function DonateNowPage() {
  return (
    <>
      <style>{`
        .donate-page { background: #f9f6f1; color: #0f1f4d; font-family: 'DM Sans', sans-serif; }
        .donate-shell { max-width: 1120px; margin: 0 auto; padding: 88px 48px 112px; }
        .donate-hero { display: grid; grid-template-columns: 1fr .9fr; gap: 42px; align-items: center; }
        .donate-kicker { color: #d4a017; font-size: 12px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; }
        .donate-title { margin: 18px 0; font-family: 'Playfair Display', serif; font-size: clamp(44px, 6vw, 74px); line-height: 1; }
        .donate-copy { color: #616a7f; font-size: 18px; line-height: 1.8; max-width: 660px; }
        .donate-card { background: #0f1f4d; color: white; border-radius: 8px; padding: 34px; box-shadow: 0 22px 62px rgba(15,31,77,.22); }
        .donate-card p { color: rgba(255,255,255,.78); line-height: 1.75; }
        .donate-btn { display: inline-flex; align-items: center; justify-content: center; margin-top: 24px; border-radius: 999px; padding: 16px 28px; background: #d4a017; color: #0f1f4d; font-weight: 900; text-decoration: none; }
        .donate-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 58px; }
        .donate-tier { background: white; border: 1px solid rgba(15,31,77,.08); border-radius: 8px; padding: 28px; }
        .donate-tier-amount { font-family: 'Playfair Display', serif; font-size: 46px; color: #d4a017; line-height: 1; }
        .donate-tier h2 { margin: 12px 0 8px; font-family: 'Playfair Display', serif; font-size: 28px; }
        .donate-tier p { margin: 0; color: #687087; line-height: 1.7; }
        .donate-note { margin-top: 46px; padding: 24px; background: white; border-left: 4px solid #d4a017; color: #596277; line-height: 1.7; }
        @media (max-width: 860px) { .donate-shell { padding: 64px 24px 88px; } .donate-hero, .donate-grid { grid-template-columns: 1fr; } }
      `}</style>
      <main className="donate-page">
        <div className="donate-shell">
          <section className="donate-hero">
            <div>
              <div className="donate-kicker">Donate Now</div>
              <h1 className="donate-title">Fuel Mentorship, Resources, and Hope</h1>
              <p className="donate-copy">
                Your gift helps Destiny Helpers Outreach Inc. serve more youth and families
                through mentorship, education, creative expression, leadership development,
                and compassionate community support.
              </p>
            </div>
            <aside className="donate-card">
              <div className="donate-kicker">Give Today</div>
              <h2 className="donate-title" style={{ color: "white", fontSize: 42 }}>Every dollar moves the mission.</h2>
              <p>
                Donations support program materials, community events, scholarships,
                outreach resources, and the everyday work of showing up for families.
              </p>
              <Link href="/contact" className="donate-btn">Contact Us to Donate</Link>
            </aside>
          </section>
          <section className="donate-grid" aria-label="Suggested giving tiers">
            {givingTiers.map((tier) => (
              <article key={tier.amount} className="donate-tier">
                <div className="donate-tier-amount">{tier.amount}</div>
                <h2>{tier.label}</h2>
                <p>{tier.text}</p>
              </article>
            ))}
          </section>
          <div className="donate-note">
            Destiny Helpers Outreach Inc. is listed as a 501(c)(3) nonprofit on the site footer.
            For sponsorships, in-kind donations, or program-specific giving, contact the team directly.
          </div>
        </div>
      </main>
    </>
  );
}
