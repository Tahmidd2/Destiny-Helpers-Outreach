import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Miss Teen Brownsville | Destiny Helpers Outreach",
  description:
    "Miss Teen Brownsville uses pageantry to educate, empower, and enrich the lives of teen girls ages 13–19 in Brownsville and East New York.",
}

const focusAreas = [
  "Financial literacy",
  "Sex education",
  "Entrepreneurship & leadership",
  "Skills training",
  "Personal development",
]

const impactPoints = [
  "None of the 19 participants have become teenage moms.",
  "Miss Teen Brownsville 2019, Adia K. Clarke, is a 3rd year student at USC. She also worked on the Biden/Harris campaign team as a video intern.",
  "Miss Teen Brownsville 1st Runner Up 2019, Shanice Baptiste Peters, started her 1st year at Howard University.",
  "Miss Teen Brownsville 2022, Avareah Charles, started her 1st year at Queensborough Community College.",
  "Miss Teen Brownsville 2023, Alisha Antonetti, started a community fridge located outside of the Brownsville Collaborative Middle School.",
]

const supportLines = [
  "We walk alongside them.",
  "We support their growth.",
  "We nurture their voice.",
  "We empower their future.",
]

const footerLinks = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "X", href: "https://x.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
]

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "Blogs", href: "/blogs" },
  { label: "Help", href: "/help" },
  { label: "Volunteer With Us", href: "/volunteer-with-us" },
  { label: "Donate Now", href: "/donate-now" },
]

const programLinks = [
  { label: "Beyond The Mask", href: "/programs/beyond-the-mask" },
  { label: "The Confidence Lens Project", href: "/programs/confidence-lens" },
  { label: "Project ICON", href: "/programs/project-icon" },
  { label: "Mr & Ms Teen Destiny Changer NYC", href: "/programs/teen-destiny-changer" },
  { label: "Miss Teen Brownsville", href: "/programs/teen-brownsville" },
  { label: "Let's Get Artsy", href: "/programs/lets-get-artsy" },
]

export default function TeenBrownsvillePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');

        :root {
          --mtb-plum: #371441;
          --mtb-rose: #8f3c67;
          --mtb-blush: #f4dde8;
          --mtb-gold: #d8b06a;
          --mtb-gold-soft: #f2dfba;
          --mtb-ink: #221726;
          --mtb-cream: #fff7f3;
          --mtb-mauve: #5a3959;
          --mtb-shadow: 0 20px 70px rgba(29, 12, 32, 0.18);
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background: var(--mtb-cream);
        }

        .mtb-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top right, rgba(216,176,106,0.18), transparent 30%),
            radial-gradient(circle at 0% 20%, rgba(143,60,103,0.12), transparent 28%),
            var(--mtb-cream);
          color: var(--mtb-ink);
          font-family: 'Manrope', sans-serif;
        }

        .mtb-page h1,
        .mtb-page h2,
        .mtb-page h3,
        .mtb-page h4 {
          font-family: 'Cormorant Garamond', serif;
        }

        .mtb-shell {
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
        }

        .mtb-navbar {
          position: sticky;
          top: 0;
          z-index: 60;
          backdrop-filter: blur(16px);
          background: rgba(55, 20, 65, 0.86);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .mtb-nav-inner {
          width: min(1220px, calc(100% - 40px));
          margin: 0 auto;
          min-height: 82px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .mtb-brand {
          text-decoration: none;
          color: white;
          display: inline-flex;
          flex-direction: column;
          gap: 3px;
        }

        .mtb-brand-top {
          font-size: 0.76rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--mtb-gold-soft);
          font-weight: 800;
        }

        .mtb-brand-title {
          font-size: clamp(1.5rem, 2.2vw, 2.15rem);
          line-height: 0.95;
          font-weight: 700;
        }

        .mtb-nav-links {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .mtb-nav-group {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .mtb-nav-divider {
          width: 1px;
          height: 28px;
          background: rgba(255,255,255,0.12);
        }

        .mtb-nav-links a {
          text-decoration: none;
          color: rgba(255,255,255,0.9);
          font-size: 0.95rem;
          font-weight: 600;
          padding: 10px 14px;
          border-radius: 999px;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }

        .mtb-nav-links a:hover,
        .mtb-nav-links a:focus-visible {
          background: rgba(255,255,255,0.08);
          color: white;
          outline: none;
          transform: translateY(-1px);
        }

        .mtb-nav-cta {
          background: linear-gradient(135deg, var(--mtb-gold), #f0c783);
          color: var(--mtb-ink) !important;
          box-shadow: 0 16px 30px rgba(216,176,106,0.2);
        }

        .mtb-hero {
          position: relative;
          overflow: hidden;
          padding: 88px 0 70px;
          background:
            linear-gradient(135deg, rgba(55,20,65,0.96), rgba(89,40,76,0.9)),
            url("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&q=80&fit=crop&auto=format") center/cover no-repeat;
          color: white;
        }

        .mtb-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 82% 18%, rgba(216,176,106,0.24), transparent 18%),
            linear-gradient(180deg, rgba(34,23,38,0.18), rgba(34,23,38,0.3));
          pointer-events: none;
        }

        .mtb-hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
          gap: 42px;
          align-items: center;
        }

        .mtb-overline {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          color: var(--mtb-gold-soft);
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        .mtb-overline::before {
          content: "";
          width: 42px;
          height: 1px;
          background: currentColor;
        }

        .mtb-hero-title {
          margin: 0;
          font-size: clamp(3.6rem, 8vw, 6.8rem);
          line-height: 0.92;
          letter-spacing: -0.04em;
        }

        .mtb-hero-title span {
          display: block;
          color: var(--mtb-gold-soft);
          font-size: clamp(1.35rem, 3vw, 2.2rem);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 18px;
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
        }

        .mtb-tagline {
          margin: 22px 0 18px;
          font-size: clamp(1.3rem, 2.6vw, 1.8rem);
          color: var(--mtb-gold-soft);
          font-style: italic;
        }

        .mtb-hero-copy,
        .mtb-body {
          font-size: 1.05rem;
          line-height: 1.9;
        }

        .mtb-hero-copy {
          max-width: 760px;
          color: rgba(255,255,255,0.92);
        }

        .mtb-hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 28px;
        }

        .mtb-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 20px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 800;
          letter-spacing: 0.02em;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;
        }

        .mtb-button:hover,
        .mtb-button:focus-visible {
          transform: translateY(-2px);
          outline: none;
        }

        .mtb-button-primary {
          background: linear-gradient(135deg, var(--mtb-gold), #f0c783);
          color: var(--mtb-ink);
          box-shadow: 0 18px 36px rgba(216,176,106,0.22);
        }

        .mtb-button-secondary {
          border: 1px solid rgba(255,255,255,0.28);
          color: white;
          background: rgba(255,255,255,0.06);
        }

        .mtb-hero-card {
          position: relative;
          padding: 28px;
          border-radius: 28px;
          background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06));
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow: 0 24px 60px rgba(15, 6, 16, 0.22);
        }

        .mtb-hero-card::before {
          content: "♛";
          position: absolute;
          top: -18px;
          right: 22px;
          font-size: 2.4rem;
          color: var(--mtb-gold);
        }

        .mtb-stat-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin-top: 18px;
        }

        .mtb-stat {
          padding: 16px;
          border-radius: 18px;
          background: rgba(255,255,255,0.08);
        }

        .mtb-stat-number {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--mtb-gold-soft);
        }

        .mtb-stat-label {
          margin-top: 6px;
          font-size: 0.92rem;
          line-height: 1.5;
          color: rgba(255,255,255,0.86);
        }

        .mtb-section {
          padding: 88px 0;
        }

        .mtb-section-alt {
          background: linear-gradient(180deg, rgba(143,60,103,0.06), rgba(255,255,255,0));
        }

        .mtb-section-header {
          max-width: 720px;
          margin-bottom: 34px;
        }

        .mtb-section-title {
          margin: 0 0 10px;
          font-size: clamp(2.4rem, 4vw, 4rem);
          line-height: 0.98;
          color: var(--mtb-plum);
        }

        .mtb-section-subtitle {
          margin: 0;
          color: var(--mtb-mauve);
          font-size: 1.02rem;
          line-height: 1.8;
        }

        .mtb-two-col {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
          gap: 34px;
          align-items: start;
        }

        .mtb-panel {
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(90,57,89,0.12);
          border-radius: 28px;
          padding: 30px;
          box-shadow: var(--mtb-shadow);
        }

        .mtb-pull-quote {
          padding: 28px;
          border-radius: 26px;
          background: linear-gradient(160deg, var(--mtb-plum), #56305b);
          color: white;
          box-shadow: var(--mtb-shadow);
        }

        .mtb-pull-quote-copy {
          margin: 0;
          font-size: clamp(1.7rem, 3.5vw, 2.5rem);
          line-height: 1.06;
        }

        .mtb-pull-quote-label {
          margin-top: 18px;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.7);
        }

        .mtb-focus-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-top: 24px;
        }

        .mtb-focus-card {
          background: linear-gradient(180deg, white, rgba(244,221,232,0.66));
          border: 1px solid rgba(143,60,103,0.12);
          border-radius: 22px;
          padding: 22px;
          box-shadow: 0 16px 36px rgba(55,20,65,0.08);
        }

        .mtb-focus-card strong {
          display: block;
          font-size: 1.08rem;
          color: var(--mtb-plum);
          margin-bottom: 8px;
        }

        .mtb-list {
          display: grid;
          gap: 12px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .mtb-list li {
          position: relative;
          padding-left: 28px;
          line-height: 1.7;
        }

        .mtb-list li::before {
          content: "✦";
          position: absolute;
          left: 0;
          top: 0;
          color: var(--mtb-gold);
          font-weight: 800;
        }

        .mtb-problem-band {
          background:
            linear-gradient(135deg, rgba(55,20,65,0.98), rgba(90,57,89,0.95)),
            radial-gradient(circle at 100% 0%, rgba(216,176,106,0.24), transparent 18%);
          color: white;
        }

        .mtb-problem-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: 30px;
          align-items: stretch;
        }

        .mtb-problem-stat {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 100%;
          padding: 34px;
          border-radius: 28px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
        }

        .mtb-problem-rate {
          font-size: clamp(3.8rem, 8vw, 6rem);
          line-height: 0.9;
          color: var(--mtb-gold-soft);
          margin: 0 0 12px;
        }

        .mtb-problem-copy {
          font-size: 1rem;
          line-height: 1.9;
          color: rgba(255,255,255,0.9);
        }

        .mtb-impact-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 28px;
          align-items: start;
        }

        .mtb-impact-card {
          background: white;
          border-radius: 26px;
          padding: 28px;
          border: 1px solid rgba(90,57,89,0.12);
          box-shadow: var(--mtb-shadow);
        }

        .mtb-impact-card h3,
        .mtb-cta-card h3 {
          margin: 0 0 16px;
          font-size: 2rem;
          color: var(--mtb-plum);
        }

        .mtb-quote-stack {
          display: grid;
          gap: 16px;
        }

        .mtb-mini-quote {
          padding: 22px;
          border-radius: 22px;
          background: linear-gradient(180deg, rgba(244,221,232,0.8), rgba(255,255,255,0.96));
          border-left: 4px solid var(--mtb-gold);
          color: var(--mtb-mauve);
          box-shadow: 0 14px 28px rgba(55,20,65,0.08);
          font-weight: 700;
        }

        .mtb-cta {
          padding: 0 0 96px;
        }

        .mtb-cta-card {
          background:
            linear-gradient(135deg, rgba(55,20,65,0.98), rgba(143,60,103,0.95));
          border-radius: 34px;
          padding: 42px;
          color: white;
          box-shadow: 0 26px 60px rgba(32, 10, 36, 0.24);
        }

        .mtb-cta-card h3 {
          color: white;
        }

        .mtb-cta-card p {
          max-width: 760px;
          color: rgba(255,255,255,0.86);
          line-height: 1.8;
          font-size: 1rem;
        }

        .mtb-footer {
          background: #1a0d1f;
          color: rgba(255,255,255,0.82);
          padding: 52px 0 26px;
        }

        .mtb-footer-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr 1fr 1fr;
          gap: 26px;
        }

        .mtb-footer-title {
          margin: 0 0 12px;
          color: var(--mtb-gold-soft);
          font-size: 1.2rem;
          font-weight: 800;
          letter-spacing: 0.06em;
        }

        .mtb-footer-copy,
        .mtb-footer a,
        .mtb-footer p {
          color: rgba(255,255,255,0.82);
          text-decoration: none;
          line-height: 1.85;
        }

        .mtb-footer-links {
          display: grid;
          gap: 2px;
        }

        .mtb-footer-links a {
          width: fit-content;
        }

        .mtb-footer-contact {
          display: grid;
          gap: 12px;
        }

        .mtb-footer-contact-item {
          display: grid;
          grid-template-columns: 24px 1fr;
          gap: 10px;
          align-items: start;
        }

        .mtb-footer-contact-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: rgba(242,223,186,0.72);
          margin-bottom: 2px;
          font-weight: 700;
        }

        .mtb-footer a:hover,
        .mtb-footer a:focus-visible {
          color: white;
          outline: none;
        }

        .mtb-socials {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 14px;
        }

        .mtb-socials a {
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 0.92rem;
          font-weight: 700;
        }

        .mtb-footer-bottom {
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          font-size: 0.92rem;
        }

        .mtb-footer-mid {
          margin-top: 28px;
          padding: 22px 24px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: center;
          flex-wrap: wrap;
        }

        .mtb-footer-mid-title {
          margin: 0 0 4px;
          color: white;
          font-weight: 800;
          font-size: 1.1rem;
        }

        .mtb-footer-mid-copy {
          margin: 0;
          color: rgba(255,255,255,0.78);
        }

        @media (max-width: 980px) {
          .mtb-hero-grid,
          .mtb-two-col,
          .mtb-problem-grid,
          .mtb-impact-grid,
          .mtb-footer-grid {
            grid-template-columns: 1fr;
          }

          .mtb-nav-inner {
            width: min(1220px, calc(100% - 28px));
            padding: 14px 0;
            align-items: flex-start;
            flex-direction: column;
          }

          .mtb-nav-links {
            width: 100%;
            justify-content: flex-start;
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 4px;
          }

          .mtb-nav-group {
            flex-wrap: nowrap;
          }

          .mtb-shell {
            width: min(1180px, calc(100% - 28px));
          }

          .mtb-hero {
            padding-top: 56px;
          }
        }

        @media (max-width: 640px) {
          .mtb-hero-title {
            font-size: 3.2rem;
          }

          .mtb-focus-grid,
          .mtb-stat-grid {
            grid-template-columns: 1fr;
          }

          .mtb-section,
          .mtb-hero {
            padding-left: 0;
            padding-right: 0;
          }

          .mtb-hero-card,
          .mtb-panel,
          .mtb-pull-quote,
          .mtb-problem-stat,
          .mtb-impact-card,
          .mtb-cta-card {
            padding: 22px;
            border-radius: 22px;
          }

          .mtb-hero-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .mtb-button {
            width: 100%;
          }

          .mtb-nav-divider {
            display: none;
          }
        }
      `}</style>

      <div className="mtb-page">
        <header className="mtb-navbar">
          <div className="mtb-nav-inner">
            <a href="#top" className="mtb-brand">
              <span className="mtb-brand-top">A DHOI Signature Program</span>
              <span className="mtb-brand-title">Miss Teen Brownsville</span>
            </a>
            <nav className="mtb-nav-links" aria-label="Miss Teen Brownsville navigation">
              <div className="mtb-nav-group">
                <Link href="/">DHOI Home</Link>
                <Link href="/programs">All Programs</Link>
                <Link href="/about">Our Story</Link>
              </div>
              <div className="mtb-nav-divider" aria-hidden="true" />
              <div className="mtb-nav-group">
                <a href="#about-program">About the Program</a>
                <a href="#our-impact">Our Impact</a>
                <a href="#apply">Apply / Get Involved</a>
                <a href="#contact" className="mtb-nav-cta">Contact</a>
              </div>
            </nav>
          </div>
        </header>

        <main id="top">
          <section className="mtb-hero">
            <div className="mtb-shell mtb-hero-grid">
              <div>
                <div className="mtb-overline">Crown. Community. Confidence.</div>
                <h1 className="mtb-hero-title">
                  Miss Teen
                  <span>Brownsville</span>
                </h1>
                <div className="mtb-tagline">Beauty, Brains &amp; Philanthropy Meet.</div>
                <p className="mtb-hero-copy">
                  Walking through the community of Brownsville, a culturally rich community,
                  one cannot ignore just how many teen girls are pushing strollers with babies.
                  Brownsville has a teen birth rate of 32.1 per 1,000 teen girls between the
                  ages of 15 and 19 years. This is almost double the NYC-wide and Brooklyn rates.
                  This moved TrudyAnn Williams to start Miss Teen Brownsville in 2019.
                </p>
                <p className="mtb-hero-copy" style={{ marginTop: 18 }}>
                  Miss Teen Brownsville is a teen pregnancy prevention program that uses
                  pageantry to educate, empower, and enrich the lives of teen girls ages
                  13–19 residing in Brownsville and East New York.
                </p>
                <div className="mtb-hero-actions">
                  <a href="#about-program" className="mtb-button mtb-button-primary">
                    Explore the Program
                  </a>
                  <a href="#apply" className="mtb-button mtb-button-secondary">
                    Apply / Get Involved
                  </a>
                </div>
              </div>

              <aside className="mtb-hero-card" aria-label="Program highlights">
                <div className="mtb-overline" style={{ marginBottom: 12 }}>
                  Why It Matters
                </div>
                <p className="mtb-body" style={{ margin: 0, color: "rgba(255,255,255,0.9)" }}>
                  A six-month experience designed to build self-worth, leadership, knowledge,
                  and long-term possibilities for teen girls in Brownsville.
                </p>
                <div className="mtb-stat-grid">
                  <div className="mtb-stat">
                    <div className="mtb-stat-number">13–19</div>
                    <div className="mtb-stat-label">Girls served through this empowerment-focused program</div>
                  </div>
                  <div className="mtb-stat">
                    <div className="mtb-stat-number">6 Months</div>
                    <div className="mtb-stat-label">Program season runs February through July</div>
                  </div>
                  <div className="mtb-stat">
                    <div className="mtb-stat-number">2019</div>
                    <div className="mtb-stat-label">Year Miss Teen Brownsville was launched</div>
                  </div>
                  <div className="mtb-stat">
                    <div className="mtb-stat-number">19</div>
                    <div className="mtb-stat-label">Participants tracked in the 2019–2023 success story</div>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <section id="about-program" className="mtb-section">
            <div className="mtb-shell">
              <div className="mtb-section-header">
                <div className="mtb-overline" style={{ color: "var(--mtb-gold)" }}>
                  About the Program
                </div>
                <h2 className="mtb-section-title">More Than a Pageant</h2>
                <p className="mtb-section-subtitle">
                  Miss Teen Brownsville is a confidence-building, education-centered experience
                  rooted in self-worth, leadership, and long-term possibility.
                </p>
              </div>

              <div className="mtb-two-col">
                <div className="mtb-panel">
                  <p className="mtb-body" style={{ marginTop: 0 }}>
                    Miss Teen Brownsville is not your traditional beauty pageant. It is a
                    program that emphasizes the role that knowledge, wisdom, and the right
                    attitude play in preventing teen pregnancy.
                  </p>
                  <p className="mtb-body">
                    For six months, from February through July, participants are engaged in
                    educational, fun, and interactive workshops that help them see themselves
                    differently and imagine more for their future.
                  </p>

                  <div className="mtb-focus-grid">
                    {focusAreas.map((item) => (
                      <div key={item} className="mtb-focus-card">
                        <strong>{item}</strong>
                        <span>
                          Practical exposure and guided support that help participants grow in
                          confidence, decision-making, and purpose.
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="mtb-body" style={{ marginTop: 24, marginBottom: 0 }}>
                    To further support the girls, we provide mentorship and offer
                    education-based scholarships. We also instill in our young women the
                    benefits of giving back to their community through volunteerism.
                  </p>
                </div>

                <div style={{ display: "grid", gap: 20 }}>
                  <aside className="mtb-pull-quote">
                    <p className="mtb-pull-quote-copy">
                      Beauty that radiates from within is rooted in self-worth and self-confidence.
                    </p>
                    <div className="mtb-pull-quote-label">Miss Teen Brownsville Vision</div>
                  </aside>
                  <div className="mtb-panel">
                    <div className="mtb-overline" style={{ color: "var(--mtb-gold)", marginBottom: 10 }}>
                      Supporting Language
                    </div>
                    <ul className="mtb-list">
                      {supportLines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mtb-panel">
                    <div className="mtb-overline" style={{ color: "var(--mtb-gold)", marginBottom: 10 }}>
                      Our Hope
                    </div>
                    <p className="mtb-body" style={{ margin: 0 }}>
                      At the end of the program, our hope is that these young women will not
                      only attribute beauty to their physical appearance, but to the strength,
                      dignity, and possibility they carry within. Ultimately, we hope none of
                      the girls will become teenage moms, but instead become ambassadors and
                      leaders with good moral values in their community.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mtb-section mtb-problem-band">
            <div className="mtb-shell">
              <div className="mtb-section-header">
                <div className="mtb-overline">The Problem We&apos;re Solving</div>
                <h2 className="mtb-section-title" style={{ color: "white" }}>
                  Teenage Pregnancy in Brownsville
                </h2>
              </div>

              <div className="mtb-problem-grid">
                <div className="mtb-problem-stat">
                  <div className="mtb-problem-rate">31.2</div>
                  <div className="mtb-problem-copy">
                    According to the 2018 Community Health Profiles Report, Brownsville has a
                    teen birth rate of 31.2% per 1,000 teenage girls between the ages of 15–19.
                  </div>
                </div>
                <div className="mtb-panel" style={{ background: "rgba(255,255,255,0.96)" }}>
                  <p className="mtb-body" style={{ marginTop: 0 }}>
                    This is 30 times that of Greenwich Village and nearly twice the NYC and
                    Brooklyn-wide rates.
                  </p>
                  <p className="mtb-body">
                    This directly correlates to the cycle of poverty and high levels of crime
                    and violence in Brownsville. Twenty-seven percent of Brownsville residents
                    never finish high school, and only a fifth go to college, compared to
                    84% in Greenwich Village.
                  </p>
                  <p className="mtb-body" style={{ marginBottom: 0 }}>
                    If the root cause is addressed, Brownsville will become a safe place for
                    people to live, work, and raise families. Together, we can make this a reality.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="our-impact" className="mtb-section mtb-section-alt">
            <div className="mtb-shell">
              <div className="mtb-section-header">
                <div className="mtb-overline" style={{ color: "var(--mtb-gold)" }}>
                  Our Success
                </div>
                <h2 className="mtb-section-title">Impact from 2019–2023</h2>
                <p className="mtb-section-subtitle">
                  The story of Miss Teen Brownsville is one of prevention, possibility, and
                  young women stepping into leadership with confidence.
                </p>
              </div>

              <div className="mtb-impact-grid">
                <div className="mtb-impact-card">
                  <h3>What We&apos;ve Seen</h3>
                  <ul className="mtb-list">
                    {impactPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="mtb-quote-stack">
                  <div className="mtb-mini-quote">We walk alongside them.</div>
                  <div className="mtb-mini-quote">We support their growth.</div>
                  <div className="mtb-mini-quote">We nurture their voice.</div>
                  <div className="mtb-mini-quote">We empower their future.</div>
                </div>
              </div>
            </div>
          </section>

          <section id="apply" className="mtb-cta">
            <div className="mtb-shell">
              <div className="mtb-cta-card">
                <div className="mtb-overline">Apply / Get Involved</div>
                <h3>Bring More Opportunity to Brownsville&apos;s Young Women</h3>
                <p>
                  Whether you want to support a participant, partner with Destiny Helpers
                  Outreach, or help create stronger pathways for teen girls in Brownsville and
                  East New York, Miss Teen Brownsville is a place where confidence, leadership,
                  and community care come together.
                </p>
                <div className="mtb-hero-actions" style={{ marginTop: 24 }}>
                  <Link href="/contact" className="mtb-button mtb-button-primary">
                    Contact the Team
                  </Link>
                  <Link href="/donate-now" className="mtb-button mtb-button-secondary">
                    Support the Program
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer id="contact" className="mtb-footer">
          <div className="mtb-shell">
            <div className="mtb-footer-grid">
              <div>
                <div className="mtb-footer-title">Miss Teen Brownsville</div>
                <p className="mtb-footer-copy">
                  Beauty, Brains &amp; Philanthropy Meet. A bold, affirming experience for teen girls
                  ages 13–19 rooted in education, leadership, and self-worth.
                </p>
                <div className="mtb-socials">
                  {footerLinks.map((item) => (
                    <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <div className="mtb-footer-title">Quick Links</div>
                <div className="mtb-footer-links">
                  {quickLinks.map((item) => (
                    <Link key={item.label} href={item.href}>
                      → {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <div className="mtb-footer-title">Our Programs</div>
                <div className="mtb-footer-links">
                  {programLinks.map((item) => (
                    <Link key={item.label} href={item.href}>
                      → {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <div className="mtb-footer-title">Contact Us</div>
                <div className="mtb-footer-contact">
                  <div className="mtb-footer-contact-item">
                    <div>📞</div>
                    <div>
                      <div className="mtb-footer-contact-label">Call Us</div>
                      <a href="tel:+16313526615">+1 (631) 352-6615</a>
                    </div>
                  </div>
                  <div className="mtb-footer-contact-item">
                    <div>✉️</div>
                    <div>
                      <div className="mtb-footer-contact-label">Email Us</div>
                      <a href="mailto:info@destinyhelpersoutreach.org">info@destinyhelpersoutreach.org</a>
                    </div>
                  </div>
                  <div className="mtb-footer-contact-item">
                    <div>🌐</div>
                    <div>
                      <div className="mtb-footer-contact-label">Website</div>
                      <a href="https://www.destinyhelpersoutreach.org" target="_blank" rel="noreferrer">
                        www.destinyhelpersoutreach.org
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mtb-footer-mid">
              <div>
                <p className="mtb-footer-mid-title">Support Our Mission</p>
                <p className="mtb-footer-mid-copy">
                  Help us create more opportunities for teen girls through mentorship, scholarships, and community-centered leadership.
                </p>
              </div>
              <Link href="/donate-now" className="mtb-button mtb-button-primary">
                Donate Now
              </Link>
            </div>

            <div className="mtb-footer-bottom">
              <span>A program of Destiny Helpers Outreach Inc.</span>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Link href="/privacy-policy" style={{ color: "var(--mtb-gold-soft)", textDecoration: "none", fontWeight: 700 }}>
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" style={{ color: "var(--mtb-gold-soft)", textDecoration: "none", fontWeight: 700 }}>
                  Terms of Service
                </Link>
                <Link href="/" style={{ color: "var(--mtb-gold-soft)", textDecoration: "none", fontWeight: 700 }}>
                  Return to DHOI Home
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
