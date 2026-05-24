import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/lib/components/footer";
import Navbar from "@/lib/components/navbar";

export const metadata: Metadata = {
  title: "Miss Teen Brownsville | Destiny Helpers Outreach",
  description:
    "Miss Teen Brownsville is a confidence, leadership, and prevention program for teen girls in Brownsville and East New York.",
};

const focusAreas = [
  "Financial literacy",
  "Sex education",
  "Entrepreneurship",
  "Leadership",
  "Personal development",
];

const outcomes = [
  "Mentorship and guided workshops",
  "Education-based scholarships",
  "Community service and volunteerism",
  "Confidence rooted in identity and purpose",
];

const stats = [
  { value: "13 to 19", label: "Teen girls served" },
  { value: "6", label: "Month experience" },
  { value: "2019", label: "Program launch" },
  { value: "19", label: "Tracked success stories" },
];

export default function TeenBrownsvillePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');

        .mtb-page { background: #fbf7ef; color: #201a16; font-family: 'Manrope', sans-serif; }
        .mtb-page h1, .mtb-page h2, .mtb-page h3 { font-family: 'Cormorant Garamond', serif; }
        .mtb-shell { width: min(1160px, calc(100% - 48px)); margin: 0 auto; }
        .mtb-hero { padding: 86px 0 72px; background: linear-gradient(180deg, #fbf7ef 0%, #f3eadc 100%); }
        .mtb-hero-grid { display: grid; grid-template-columns: 1fr .95fr; gap: 52px; align-items: center; }
        .mtb-kicker { color: #9f6f35; font-size: 12px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase; }
        .mtb-title { margin: 18px 0; font-size: clamp(54px, 8vw, 96px); line-height: .9; color: #2d2722; }
        .mtb-title span { display: block; color: #7a5a3a; }
        .mtb-lede { color: #665d54; font-size: 18px; line-height: 1.85; max-width: 680px; }
        .mtb-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 32px; }
        .mtb-btn { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; min-height: 48px; padding: 0 24px; text-decoration: none; font-weight: 800; }
        .mtb-btn-primary { background: #c8a96a; color: #201a16; }
        .mtb-btn-secondary { border: 1px solid rgba(32,26,22,.2); color: #201a16; }
        .mtb-photo-stack { position: relative; min-height: 520px; }
        .mtb-photo-main, .mtb-photo-small { position: absolute; overflow: hidden; border-radius: 8px; box-shadow: 0 24px 70px rgba(32,26,22,.16); background: #e8dfd0; }
        .mtb-photo-main { inset: 0 8% 12% 0; }
        .mtb-photo-small { width: 48%; aspect-ratio: 4/5; right: 0; bottom: 0; border: 8px solid #fbf7ef; }
        .mtb-stat-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; margin-top: 54px; background: rgba(122,90,58,.18); }
        .mtb-stat { background: #fffdf8; padding: 24px; }
        .mtb-stat-value { font-size: 42px; font-weight: 800; color: #7a5a3a; line-height: 1; }
        .mtb-stat-label { margin-top: 8px; color: #665d54; font-size: 14px; line-height: 1.5; }
        .mtb-section { padding: 86px 0; }
        .mtb-section.alt { background: white; }
        .mtb-section-header { max-width: 760px; margin-bottom: 38px; }
        .mtb-section-title { margin: 12px 0 0; font-size: clamp(38px, 5vw, 60px); line-height: 1; color: #2d2722; }
        .mtb-two-col { display: grid; grid-template-columns: .95fr 1.05fr; gap: 38px; align-items: start; }
        .mtb-card { background: #fffdf8; border: 1px solid rgba(122,90,58,.12); border-radius: 8px; padding: 30px; box-shadow: 0 18px 48px rgba(32,26,22,.06); }
        .mtb-card h3 { margin: 0 0 12px; font-size: 30px; color: #7a5a3a; }
        .mtb-card p { margin: 0; color: #665d54; line-height: 1.82; }
        .mtb-focus-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-top: 26px; }
        .mtb-focus { background: #f3eadc; border-radius: 8px; padding: 18px; color: #5c4430; font-weight: 800; min-height: 86px; display: flex; align-items: end; }
        .mtb-image-band { display: grid; grid-template-columns: 1.15fr .85fr; gap: 18px; margin-top: 32px; }
        .mtb-band-photo { position: relative; min-height: 360px; border-radius: 8px; overflow: hidden; background: #e6dccd; }
        .mtb-band-copy { background: #2d2722; color: #fbf7ef; border-radius: 8px; padding: 34px; display: flex; flex-direction: column; justify-content: center; }
        .mtb-band-copy h3 { margin: 0 0 16px; color: #c8a96a; font-size: 38px; line-height: 1; }
        .mtb-band-copy p { margin: 0; color: rgba(251,247,239,.82); line-height: 1.8; }
        .mtb-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; list-style: none; margin: 0; padding: 0; }
        .mtb-list li { background: #fbf7ef; border-radius: 8px; padding: 18px; color: #4f463f; line-height: 1.65; }
        .mtb-list li::before { content: "✓"; color: #9f6f35; font-weight: 900; margin-right: 8px; }
        .mtb-media-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
        .mtb-media-card { background: #fffdf8; border: 1px solid rgba(122,90,58,.12); border-radius: 8px; overflow: hidden; }
        .mtb-media-image { position: relative; min-height: 260px; background: #e6dccd; }
        .mtb-media-body { padding: 24px; }
        .mtb-media-body h3 { margin: 0; color: #7a5a3a; font-size: 30px; line-height: 1; }
        .mtb-media-body p { margin: 12px 0 0; color: #665d54; line-height: 1.75; }
        .mtb-quote { background: #7a5a3a; color: white; border-radius: 8px; padding: 34px; font-family: 'Cormorant Garamond', serif; font-size: clamp(30px, 4vw, 46px); line-height: 1.08; }
        .mtb-cta { background: #201a16; color: white; padding: 78px 0; }
        .mtb-cta-grid { display: grid; grid-template-columns: 1fr auto; gap: 28px; align-items: center; }
        .mtb-cta h2 { margin: 0; color: white; font-size: clamp(36px, 5vw, 58px); line-height: 1; }
        .mtb-cta p { color: rgba(255,255,255,.76); line-height: 1.8; max-width: 720px; }
        @media (max-width: 920px) { .mtb-hero-grid, .mtb-two-col, .mtb-image-band, .mtb-media-grid, .mtb-cta-grid { grid-template-columns: 1fr; } .mtb-stat-strip { grid-template-columns: repeat(2, 1fr); } .mtb-focus-grid { grid-template-columns: repeat(2, 1fr); } .mtb-photo-stack { min-height: 420px; } }
        @media (max-width: 620px) { .mtb-shell { width: min(1160px, calc(100% - 28px)); } .mtb-hero, .mtb-section { padding: 64px 0; } .mtb-stat-strip, .mtb-list, .mtb-focus-grid { grid-template-columns: 1fr; } .mtb-actions { flex-direction: column; } .mtb-btn { width: 100%; } }
      `}</style>

      <Navbar />
      <main className="mtb-page">
        <section className="mtb-hero">
          <div className="mtb-shell">
            <div className="mtb-hero-grid">
              <div>
                <div className="mtb-kicker">A Destiny Helpers Outreach Inc. Signature Program</div>
                <h1 className="mtb-title">
                  Miss Teen
                  <span>Brownsville</span>
                </h1>
                <p className="mtb-lede">
                  A six-month confidence, leadership, and prevention experience for teen
                  girls ages 13 to 19 in Brownsville and East New York. Through pageantry,
                  workshops, mentorship, scholarships, and service, participants are
                  encouraged to see beauty as self-worth, wisdom, and purpose.
                </p>
                <div className="mtb-actions">
                  <a href="#program" className="mtb-btn mtb-btn-primary">Explore the Program</a>
                  <Link href="/contact" className="mtb-btn mtb-btn-secondary">Get Involved</Link>
                </div>
              </div>
              <div className="mtb-photo-stack" aria-label="Miss Teen Brownsville community imagery">
                <div className="mtb-photo-main">
                  <Image src="/MTB:Collage17.png" alt="Miss Teen Brownsville pageant participant moment" fill sizes="(max-width: 920px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                </div>
                <div className="mtb-photo-small">
                  <Image src="/Collage33:MTB.JPG" alt="Miss Teen Brownsville pageant celebration" fill sizes="(max-width: 920px) 50vw, 24vw" style={{ objectFit: "cover" }} />
                </div>
              </div>
            </div>
            <div className="mtb-stat-strip">
              {stats.map((stat) => (
                <div key={stat.label} className="mtb-stat">
                  <div className="mtb-stat-value">{stat.value}</div>
                  <div className="mtb-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="program" className="mtb-section alt">
          <div className="mtb-shell">
            <div className="mtb-section-header">
              <div className="mtb-kicker">More Than a Pageant</div>
              <h2 className="mtb-section-title">An Elegant Platform for Growth</h2>
            </div>
            <div className="mtb-two-col">
              <div className="mtb-card">
                <h3>What It Is</h3>
                <p>
                  Miss Teen Brownsville uses pageantry as a doorway into education,
                  prevention, leadership, and self-confidence. Participants engage in
                  interactive workshops from February through July and receive guided
                  support as they build a stronger vision for their future.
                </p>
              </div>
              <div className="mtb-quote">
                Beauty, Brains &amp; Philanthropy Meet.
              </div>
            </div>
            <div className="mtb-focus-grid">
              {focusAreas.map((area) => <div key={area} className="mtb-focus">{area}</div>)}
            </div>
          </div>
        </section>

        <section className="mtb-section">
          <div className="mtb-shell">
            <div className="mtb-section-header">
              <div className="mtb-kicker">Why It Matters</div>
              <h2 className="mtb-section-title">Prevention Through Possibility</h2>
            </div>
            <div className="mtb-image-band">
              <div className="mtb-band-photo">
                <Image src="/collage37:MTB.JPEG" alt="Miss Teen Brownsville community-centered gathering" fill sizes="(max-width: 920px) 100vw, 58vw" style={{ objectFit: "cover" }} />
              </div>
              <div className="mtb-band-copy">
                <h3>Rooted in Brownsville</h3>
                <p>
                  The program was launched after seeing how many teen girls in Brownsville
                  were navigating adulthood too soon. Miss Teen Brownsville responds with
                  mentorship, knowledge, confidence, and community care.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mtb-section alt">
          <div className="mtb-shell">
            <div className="mtb-section-header">
              <div className="mtb-kicker">What Participants Receive</div>
              <h2 className="mtb-section-title">Support That Stays With Them</h2>
            </div>
            <ul className="mtb-list">
              {outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
            </ul>
          </div>
        </section>

        <section className="mtb-section">
          <div className="mtb-shell">
            <div className="mtb-section-header">
              <div className="mtb-kicker">Media Highlights</div>
              <h2 className="mtb-section-title">Coverage, Celebration, and Recap Moments</h2>
            </div>
            <div className="mtb-media-grid">
              <article className="mtb-media-card">
                <div className="mtb-media-image">
                  <Image src="/Collage33:MTB.JPG" alt="Miss Teen Brownsville media highlight" fill sizes="(max-width: 920px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                </div>
                <div className="mtb-media-body">
                  <h3>PIX11 Clip</h3>
                  <p>Featured media moments from the Miss Teen Brownsville platform and its community-centered work.</p>
                </div>
              </article>
              <article className="mtb-media-card">
                <div className="mtb-media-image">
                  <Image src="/MTB:Collage17.png" alt="Miss Teen Brownsville event recap" fill sizes="(max-width: 920px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                </div>
                <div className="mtb-media-body">
                  <h3>Event Recap Video</h3>
                  <p>A celebration of the workshops, service, pageant moments, and the confidence participants built along the way.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="mtb-cta">
          <div className="mtb-shell mtb-cta-grid">
            <div>
              <div className="mtb-kicker">Apply / Partner / Support</div>
              <h2>Help Create More Opportunity for Brownsville&apos;s Young Women</h2>
              <p>
                Partner with Destiny Helpers Outreach Inc., sponsor a participant, or help
                expand this community-centered leadership experience.
              </p>
            </div>
            <div className="mtb-actions">
              <Link href="/contact" className="mtb-btn mtb-btn-primary">Contact the Team</Link>
              <Link href="/donate-now" className="mtb-btn mtb-btn-secondary" style={{ color: "white", borderColor: "rgba(255,255,255,.32)" }}>Support the Program</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
