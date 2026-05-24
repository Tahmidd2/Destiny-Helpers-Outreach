import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/lib/components/footer";
import Navbar from "@/lib/components/navbar";

export const metadata: Metadata = {
  title: "Mr. & Ms. Teen Destiny Changer NYC | Destiny Helpers Outreach",
  description:
    "A six month youth leadership and pageant experience that reshapes perspectives, builds confidence, and supports teen career growth.",
};

const newsItems = [
  {
    title: "Pageant Participants Serve Asylum Seeking Families",
    date: "March 9, 2024",
    description:
      "Participants volunteered with Brooklyn WATE at a Spring Coat Open Closet event serving more than 100 asylum seeking families.",
  },
  {
    title: "Celebrating Our Official Streetwear Fashion Partner",
    date: "May 28, 2024",
    description:
      "GranRu Market partnered with the pageant to provide a streetwear category outfit for each participant on the grand finale stage.",
  },
  {
    title: "Sportswear Returns to the Competition Stage",
    date: "June 1, 2024",
    description:
      "Organized Unity provided sportswear for each participant, bringing a message of community, culture, and shared uplift.",
  },
  {
    title: "The Soprano Twins Set to Perform",
    date: "June 11, 2024",
    description:
      "Brooklyn natives Cherisse and Cherissia Williams were announced as performers for the first annual pageant finale.",
  },
];

const pillars = [
  "Confidence and self worth",
  "Career growth",
  "Collaboration",
  "Community service",
  "Leadership development",
  "Stage presence",
];

export default function TeenDestinyChangerPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

        .tdc-page { background: #f9f6f1; color: #0f1f4d; font-family: 'DM Sans', sans-serif; }
        .tdc-page h1, .tdc-page h2, .tdc-page h3 { font-family: 'Playfair Display', serif; }
        .tdc-shell { width: min(1180px, calc(100% - 48px)); margin: 0 auto; }
        .tdc-hero { padding: 92px 0 76px; background: linear-gradient(135deg, #0f1f4d 0%, #1e3a8a 62%, #6b4f3b 100%); color: white; overflow: hidden; }
        .tdc-hero-grid { display: grid; grid-template-columns: 1fr .92fr; gap: 54px; align-items: center; }
        .tdc-kicker { color: #f5c842; font-size: 12px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; }
        .tdc-title { margin: 18px 0 20px; font-size: clamp(48px, 7vw, 84px); line-height: .95; color: white; }
        .tdc-title span { display: block; color: #f5c842; }
        .tdc-lede { color: rgba(255,255,255,.8); font-size: 18px; line-height: 1.8; max-width: 680px; }
        .tdc-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 32px; }
        .tdc-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 50px; padding: 0 24px; border-radius: 999px; text-decoration: none; font-weight: 800; }
        .tdc-btn.primary { background: #d4a017; color: #0f1f4d; }
        .tdc-btn.secondary { border: 1px solid rgba(255,255,255,.32); color: white; }
        .tdc-photo-grid { display: grid; grid-template-columns: .86fr 1.14fr; gap: 14px; min-height: 520px; }
        .tdc-photo { position: relative; border-radius: 8px; overflow: hidden; background: rgba(255,255,255,.12); box-shadow: 0 28px 70px rgba(0,0,0,.22); }
        .tdc-photo:first-child { transform: translateY(42px); }
        .tdc-photo:nth-child(2) { transform: translateY(-18px); }
        .tdc-section { padding: 88px 0; }
        .tdc-section.white { background: white; }
        .tdc-section-header { max-width: 760px; margin-bottom: 36px; }
        .tdc-section-title { margin: 12px 0 0; font-size: clamp(36px, 5vw, 58px); line-height: 1.03; }
        .tdc-copy { color: #58627a; font-size: 17px; line-height: 1.82; }
        .tdc-two-col { display: grid; grid-template-columns: .92fr 1.08fr; gap: 38px; align-items: start; }
        .tdc-panel { background: #fffdf8; border: 1px solid rgba(15,31,77,.08); border-radius: 8px; padding: 32px; box-shadow: 0 18px 48px rgba(15,31,77,.06); }
        .tdc-panel h3 { margin: 0 0 12px; font-size: 32px; color: #6b4f3b; }
        .tdc-pill-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 26px; }
        .tdc-pill { min-height: 86px; display: flex; align-items: end; background: #eef2ff; border: 1px solid rgba(30,58,138,.08); border-radius: 8px; padding: 18px; color: #1e3a8a; font-weight: 800; }
        .tdc-news-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
        .tdc-news-card { background: #f9f6f1; border: 1px solid rgba(15,31,77,.08); border-radius: 8px; padding: 26px; }
        .tdc-news-date { color: #d4a017; font-size: 12px; font-weight: 900; letter-spacing: .14em; text-transform: uppercase; }
        .tdc-news-card h3 { margin: 10px 0 12px; color: #0f1f4d; font-size: 28px; line-height: 1.08; }
        .tdc-news-card p { margin: 0; color: #687087; line-height: 1.72; }
        .tdc-image-band { display: grid; grid-template-columns: 1.15fr .85fr; gap: 18px; }
        .tdc-band-photo { position: relative; min-height: 390px; border-radius: 8px; overflow: hidden; background: #dfe5f5; }
        .tdc-band-copy { background: #0f1f4d; color: white; border-radius: 8px; padding: 36px; display: flex; flex-direction: column; justify-content: center; }
        .tdc-band-copy h3 { margin: 0 0 14px; color: #f5c842; font-size: 38px; line-height: 1; }
        .tdc-band-copy p { color: rgba(255,255,255,.78); line-height: 1.8; margin: 0; }
        .tdc-cta { background: #1e3a8a; color: white; padding: 78px 0; }
        .tdc-cta-grid { display: grid; grid-template-columns: 1fr auto; gap: 28px; align-items: center; }
        .tdc-cta h2 { color: white; margin: 0; font-size: clamp(36px, 5vw, 58px); line-height: 1; }
        .tdc-cta p { color: rgba(255,255,255,.76); line-height: 1.8; max-width: 720px; }
        @media (max-width: 940px) { .tdc-hero-grid, .tdc-two-col, .tdc-image-band, .tdc-cta-grid { grid-template-columns: 1fr; } .tdc-photo-grid { min-height: 420px; } .tdc-pill-grid, .tdc-news-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 620px) { .tdc-shell { width: min(1180px, calc(100% - 28px)); } .tdc-hero, .tdc-section { padding: 64px 0; } .tdc-actions { flex-direction: column; } .tdc-btn { width: 100%; } .tdc-pill-grid, .tdc-news-grid { grid-template-columns: 1fr; } .tdc-photo-grid { grid-template-columns: 1fr; min-height: 650px; } .tdc-photo:first-child, .tdc-photo:nth-child(2) { transform: none; } }
      `}</style>

      <Navbar />
      <main className="tdc-page">
        <section className="tdc-hero">
          <div className="tdc-shell tdc-hero-grid">
            <div>
              <div className="tdc-kicker">Mr. &amp; Ms. Teen Destiny Changer NYC</div>
              <h1 className="tdc-title">
                More Than a Pageant
                <span>A Six Month Experience</span>
              </h1>
              <p className="tdc-lede">
                The public often thinks of pageants as a one night event focused on beauty and fashion,
                but this opportunity is much more. It is an enriching program designed to reshape
                perspectives, foster collaboration, nurture career growth, and boost self confidence.
              </p>
              <div className="tdc-actions">
                <Link href="/contact" className="tdc-btn primary">Register or Learn More</Link>
                <Link href="/donate-now" className="tdc-btn secondary">Support the Program</Link>
              </div>
            </div>
            <div className="tdc-photo-grid" aria-label="Mr. and Ms. Teen Destiny Changer moments">
              <div className="tdc-photo">
                <Image src="/Mr and Ms Teen.png" alt="Mr. and Ms. Teen Destiny Changer participant moment" fill sizes="(max-width: 940px) 45vw, 22vw" style={{ objectFit: "cover" }} unoptimized />
              </div>
              <div className="tdc-photo">
                <Image src="/Mr. and Ms. Teen Destiny.png" alt="Mr. and Ms. Teen Destiny Changer pageant moment" fill sizes="(max-width: 940px) 55vw, 30vw" style={{ objectFit: "cover" }} unoptimized />
              </div>
            </div>
          </div>
        </section>

        <section className="tdc-section white">
          <div className="tdc-shell tdc-two-col">
            <div className="tdc-section-header">
              <div className="tdc-kicker">The Opportunity</div>
              <h2 className="tdc-section-title">Confidence, Character, and Community on One Stage</h2>
            </div>
            <div>
              <p className="tdc-copy">
                Mr. &amp; Ms. Teen Destiny Changer NYC gives teens a platform to grow beyond a single performance night.
                Participants build confidence, practice leadership, connect with partners and mentors, and serve their
                community while preparing for the grand finale stage.
              </p>
              <div className="tdc-pill-grid">
                {pillars.map((pillar) => <div key={pillar} className="tdc-pill">{pillar}</div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="tdc-section">
          <div className="tdc-shell">
            <div className="tdc-section-header">
              <div className="tdc-kicker">What Has Been Happening</div>
              <h2 className="tdc-section-title">Program News and Milestones</h2>
            </div>
            <div className="tdc-news-grid">
              {newsItems.map((item) => (
                <article key={item.title} className="tdc-news-card">
                  <div className="tdc-news-date">{item.date}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tdc-section white">
          <div className="tdc-shell tdc-image-band">
            <div className="tdc-band-photo">
              <Image src="/Mr and Ms Teen2.png" alt="Mr. and Ms. Teen Destiny Changer program participant" fill sizes="(max-width: 940px) 100vw, 58vw" style={{ objectFit: "cover" }} unoptimized loading="eager" />
            </div>
            <div className="tdc-band-copy">
              <h3>Built for Growth</h3>
              <p>
                Every part of the experience is designed to help teens see themselves as leaders.
                Through service, partnerships, stage preparation, and mentorship, participants are invited
                to bring their full brilliance forward.
              </p>
            </div>
          </div>
        </section>

        <section className="tdc-cta">
          <div className="tdc-shell tdc-cta-grid">
            <div>
              <div className="tdc-kicker">Register / Partner / Sponsor</div>
              <h2>Help Teens Step Into Their Next Chapter</h2>
              <p>
                Connect with Destiny Helpers Outreach Inc. to learn more about registration,
                sponsorship, and partnership opportunities for Mr. &amp; Ms. Teen Destiny Changer NYC.
              </p>
            </div>
            <div className="tdc-actions">
              <Link href="/contact" className="tdc-btn primary">Contact the Team</Link>
              <Link href="/donate-now" className="tdc-btn secondary">Donate Now</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
