import Link from "next/link"

const tiers = [
  {
    label: "Tier 1",
    title: "Elementary School (Grades 3–5)",
    focus: "Self-awareness, feelings, confidence building",
    experiences: [
      "Fun reflection activities",
      "Emotion identification",
      "Confidence-building exercises",
      "Creative expression through drawing and storytelling",
    ],
    outcome: "Students begin to understand: “I am important. My voice matters.”",
  },
  {
    label: "Tier 2",
    title: "Middle School (Grades 6–8)",
    focus: "Identity, peer dynamics, self-expression",
    experiences: [
      "Guided group discussions",
      "Social awareness activities",
      "Identity exploration exercises",
      "Confidence and communication building",
    ],
    outcome: "Students begin to say: “I understand who I am and how I show up.”",
  },
  {
    label: "Tier 3",
    title: "High School (Grades 9–12)",
    focus: "Voice, purpose, personal agency",
    experiences: [
      "Deep reflection sessions",
      "Real-life scenario discussions",
      "Leadership and voice development",
      "Personal vision exercises",
    ],
    outcome: "Students begin to embody: “I am confident in who I am and where I’m going.”",
  },
]

const sessionIncludes = [
  {
    title: "Guided Reflection",
    description:
      "Students are invited to pause, process, and name what they are carrying in a way that feels safe and affirming.",
    icon: "◎",
  },
  {
    title: "Choice-Based Participation",
    description:
      "Young people can engage in ways that feel developmentally appropriate, emotionally safe, and empowering.",
    icon: "◌",
  },
  {
    title: "Identity-Centered Activities",
    description:
      "Each session centers confidence, voice, self-worth, and how students see themselves and show up in their communities.",
    icon: "◐",
  },
  {
    title: "Safe Space Discussions",
    description:
      "Facilitated conversations help participants practice listening, sharing, affirming peers, and expressing themselves with confidence.",
    icon: "◍",
  },
  {
    title: "Closing Reflection",
    description:
      "Each session closes with a strengths-based reflection that reinforces growth, voice, and possibility.",
    icon: "◉",
  },
]

const outcomes = [
  "Increased confidence",
  "Stronger self-awareness",
  "Greater engagement in school and relationships",
  "Ability to reflect and express themselves",
  "A deeper understanding of identity",
]

const testimonials = [
  {
    quote: "This experience gave my students a safe space to be themselves.",
    source: "School Partner",
  },
  {
    quote: "I learned that my voice matters, even when I am still figuring things out.",
    source: "Student Participant",
  },
  {
    quote: "The structure was thoughtful, healing, and exactly what our young people needed.",
    source: "Educator",
  },
]

const sponsorLevels = [
  {
    amount: "$250",
    description: "Supports materials for one student group.",
  },
  {
    amount: "$500",
    description: "Sponsors a full workshop experience.",
  },
  {
    amount: "$1,500+",
    description: "Helps bring the program to an entire school community.",
  },
]

export default function ConfidenceLensPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

        :root {
          --lens-blue: #1E3A8A;
          --lens-gold: #D4A017;
          --lens-purple: #A78BFA;
          --lens-cream: #F9F6F1;
          --lens-navy: #0F1F4D;
          --lens-text: #334155;
          --lens-white: #FFFFFF;
        }

        .lens-page {
          background: var(--lens-cream);
          color: var(--lens-text);
          font-family: 'DM Sans', sans-serif;
        }

        .lens-page h1,
        .lens-page h2,
        .lens-page h3 {
          font-family: 'Playfair Display', serif;
        }

        .lens-shell {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }

        .lens-section {
          padding: 110px 0;
        }

        .lens-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--lens-gold);
          margin-bottom: 20px;
        }

        .lens-eyebrow::before {
          content: '';
          width: 36px;
          height: 1px;
          background: currentColor;
          display: block;
        }

        .lens-title {
          font-size: clamp(38px, 5vw, 58px);
          line-height: 1.06;
          color: var(--lens-blue);
          margin: 0 0 18px;
        }

        .lens-copy {
          font-size: 17px;
          line-height: 1.8;
          color: var(--lens-text);
        }

        .lens-hero {
          position: relative;
          overflow: hidden;
          min-height: 92vh;
          background:
            radial-gradient(circle at top left, rgba(167,139,250,0.28), transparent 30%),
            radial-gradient(circle at bottom right, rgba(212,160,23,0.22), transparent 26%),
            linear-gradient(135deg, rgba(30,58,138,0.97), rgba(15,31,77,0.97));
          color: white;
          display: flex;
          align-items: center;
        }

        .lens-hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 56px;
          align-items: center;
          width: 100%;
        }

        .lens-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.08);
          color: white;
          border-radius: 999px;
          padding: 10px 18px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .lens-hero-title {
          font-size: clamp(50px, 7vw, 78px);
          line-height: 0.98;
          margin: 24px 0 24px;
          color: white;
        }

        .lens-hero-title span {
          display: block;
          color: var(--lens-gold);
        }

        .lens-hero-copy {
          font-size: 20px;
          line-height: 1.8;
          color: rgba(255,255,255,0.86);
          max-width: 700px;
        }

        .lens-tagline {
          margin-top: 18px;
          color: #f7ebc0;
          font-size: 14px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 700;
        }

        .lens-button-row {
          margin-top: 36px;
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .lens-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 15px 26px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s, color 0.2s;
        }

        .lens-btn:hover {
          transform: translateY(-2px);
        }

        .lens-btn-primary {
          background: var(--lens-gold);
          color: var(--lens-blue);
          box-shadow: 0 10px 28px rgba(212,160,23,0.28);
        }

        .lens-btn-secondary {
          border: 1px solid rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.08);
          color: white;
        }

        .lens-btn-outline {
          border: 1px solid rgba(212,160,23,0.55);
          color: #f7ebc0;
          background: transparent;
        }

        .lens-visual-frame {
          position: relative;
          border-radius: 32px;
          padding: 18px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 30px 70px rgba(8, 15, 40, 0.35);
        }

        .lens-visual-inner {
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(249,246,241,0.98));
          padding: 24px;
          color: var(--lens-text);
        }

        .lens-focus-box,
        .lens-hero-card,
        .lens-mini-card {
          border-radius: 24px;
          border: 1px solid rgba(15,31,77,0.08);
        }

        .lens-focus-box {
          background: var(--lens-cream);
          padding: 16px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #64748b;
        }

        .lens-hero-card {
          margin-top: 16px;
          padding: 34px;
          color: white;
          background: linear-gradient(135deg, var(--lens-blue), #3b82f6 58%, var(--lens-purple));
        }

        .lens-hero-card p {
          margin: 0;
        }

        .lens-hero-card-top {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #f7ebc0;
        }

        .lens-hero-quote {
          margin-top: 14px;
          font-size: 30px;
          line-height: 1.22;
          font-family: 'Playfair Display', serif;
        }

        .lens-mini-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin-top: 24px;
        }

        .lens-mini-card {
          padding: 16px;
          background: rgba(255,255,255,0.12);
        }

        .lens-mini-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.78);
        }

        .lens-mini-copy {
          margin-top: 8px;
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255,255,255,0.92);
        }

        .lens-token-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 18px;
        }

        .lens-token {
          padding: 18px 14px;
          border-radius: 22px;
          background: white;
          border: 1px solid rgba(15,31,77,0.08);
          text-align: center;
        }

        .lens-token-icon {
          width: 48px;
          height: 48px;
          border-radius: 999px;
          margin: 0 auto 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--lens-purple), var(--lens-gold));
          color: white;
          font-size: 18px;
        }

        .lens-token-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--lens-navy);
        }

        .lens-two-col {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 42px;
          align-items: start;
        }

        .lens-highlight-panel,
        .lens-soft-panel,
        .lens-position-panel,
        .lens-sponsor-panel,
        .lens-cta-box,
        .lens-testimonial,
        .lens-tier-card,
        .lens-outcome,
        .lens-session-card,
        .lens-support-card {
          border-radius: 30px;
          box-shadow: 0 18px 46px rgba(15,31,77,0.06);
        }

        .lens-highlight-panel {
          background: white;
          border: 1px solid rgba(167,139,250,0.22);
          padding: 34px;
        }

        .lens-soft-panel {
          background: linear-gradient(135deg, #f9f6f1, #f3eeff);
          padding: 34px;
        }

        .lens-stat-grid,
        .lens-tier-grid,
        .lens-session-grid,
        .lens-outcome-grid,
        .lens-testimonial-grid,
        .lens-support-grid,
        .lens-cta-grid {
          display: grid;
          gap: 22px;
        }

        .lens-stat-grid {
          grid-template-columns: repeat(3, 1fr);
          margin-top: 30px;
        }

        .lens-stat {
          background: rgba(255,255,255,0.86);
          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 20px;
          padding: 18px;
          font-size: 14px;
          line-height: 1.6;
          font-weight: 600;
          color: var(--lens-text);
        }

        .lens-tier-grid {
          grid-template-columns: repeat(3, 1fr);
          margin-top: 48px;
        }

        .lens-tier-card {
          background: white;
          border: 1px solid rgba(167,139,250,0.18);
          padding: 30px;
          transition: transform 0.25s, box-shadow 0.25s;
        }

        .lens-tier-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 54px rgba(30,58,138,0.12);
        }

        .lens-tier-label {
          display: inline-flex;
          padding: 8px 16px;
          border-radius: 999px;
          background: #f3eeff;
          color: #6d28d9;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .lens-tier-title {
          margin: 22px 0 0;
          font-size: 30px;
          color: var(--lens-blue);
          line-height: 1.1;
        }

        .lens-tier-subhead,
        .lens-support-amount {
          margin-top: 22px;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--lens-gold);
          font-weight: 700;
        }

        .lens-tier-copy {
          margin-top: 8px;
          font-size: 16px;
          line-height: 1.75;
        }

        .lens-tier-list {
          margin: 18px 0 0;
          padding: 0;
          list-style: none;
        }

        .lens-tier-list li {
          display: flex;
          gap: 12px;
          margin-top: 12px;
          font-size: 15px;
          line-height: 1.7;
        }

        .lens-tier-list li::before {
          content: '◉';
          color: var(--lens-purple);
          margin-top: 1px;
        }

        .lens-tier-outcome {
          margin-top: 24px;
          padding: 18px;
          border-radius: 20px;
          background: linear-gradient(135deg, var(--lens-blue), var(--lens-purple));
          color: white;
          font-size: 15px;
          line-height: 1.7;
        }

        .lens-band {
          background: var(--lens-blue);
          color: white;
        }

        .lens-band .lens-title,
        .lens-band .lens-copy {
          color: white;
        }

        .lens-session-grid {
          grid-template-columns: repeat(5, 1fr);
          margin-top: 42px;
        }

        .lens-session-card {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 28px 22px;
          backdrop-filter: blur(8px);
        }

        .lens-session-icon {
          width: 56px;
          height: 56px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--lens-purple), var(--lens-gold));
          color: white;
          font-size: 22px;
        }

        .lens-session-title {
          margin-top: 18px;
          font-size: 22px;
          color: white;
        }

        .lens-session-copy {
          margin-top: 10px;
          font-size: 14px;
          line-height: 1.8;
          color: rgba(255,255,255,0.82);
        }

        .lens-outcome-grid,
        .lens-testimonial-grid,
        .lens-support-grid,
        .lens-cta-grid {
          grid-template-columns: repeat(3, 1fr);
        }

        .lens-outcome-grid {
          margin-top: 34px;
        }

        .lens-outcome {
          background: white;
          border: 1px solid rgba(15,31,77,0.08);
          padding: 22px;
          font-size: 16px;
          line-height: 1.65;
          font-weight: 600;
        }

        .lens-position-panel {
          background: linear-gradient(135deg, #f3eeff, white, #fff7e6);
          padding: 34px;
        }

        .lens-position-quote {
          margin-top: 20px;
          font-size: 34px;
          line-height: 1.22;
          color: var(--lens-blue);
        }

        .lens-position-callout {
          margin-top: 24px;
          padding: 18px 20px;
          border-radius: 20px;
          background: #fff8ea;
          border: 1px solid rgba(212,160,23,0.2);
        }

        .lens-position-callout strong {
          display: block;
          color: #8a5a00;
          font-size: 22px;
          margin-bottom: 8px;
        }

        .lens-testimonial-grid {
          margin-top: 42px;
        }

        .lens-testimonial {
          background: white;
          border: 1px solid rgba(15,31,77,0.08);
          padding: 30px;
        }

        .lens-quote-mark {
          font-size: 68px;
          line-height: 0.8;
          color: var(--lens-gold);
          font-family: 'Playfair Display', serif;
        }

        .lens-testimonial-text {
          margin-top: 12px;
          font-size: 18px;
          line-height: 1.8;
        }

        .lens-testimonial-source {
          margin-top: 24px;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--lens-blue);
        }

        .lens-sponsor-layout {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 28px;
        }

        .lens-sponsor-panel {
          background: linear-gradient(135deg, var(--lens-blue), #3b82f6);
          color: white;
          padding: 34px;
        }

        .lens-sponsor-panel .lens-title {
          color: white;
        }

        .lens-sponsor-panel .lens-copy {
          color: rgba(255,255,255,0.88);
        }

        .lens-support-grid {
          align-content: start;
        }

        .lens-support-card {
          background: white;
          border: 1px solid rgba(15,31,77,0.08);
          padding: 24px;
        }

        .lens-support-amount {
          margin-top: 0;
          font-size: 32px;
          letter-spacing: normal;
          text-transform: none;
          color: var(--lens-blue);
        }

        .lens-cta {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at center, rgba(167,139,250,0.2), transparent 30%),
            linear-gradient(135deg, rgba(30,58,138,0.98), rgba(15,31,77,0.98));
          color: white;
          text-align: center;
        }

        .lens-cta-box {
          max-width: 1080px;
          margin: 44px auto 0;
          padding: 0;
          box-shadow: none;
          background: transparent;
        }

        .lens-cta-grid {
          margin-top: 34px;
        }

        .lens-cta-card {
          border-radius: 26px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.08);
          padding: 24px;
        }

        .lens-cta-card-label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #f7ebc0;
        }

        .lens-cta-card-title {
          margin-top: 12px;
          font-size: 20px;
          line-height: 1.45;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
        }

        .lens-cta-buttons {
          margin-top: 36px;
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        @media (max-width: 1100px) {
          .lens-hero-grid,
          .lens-two-col,
          .lens-sponsor-layout {
            grid-template-columns: 1fr;
          }

          .lens-tier-grid {
            grid-template-columns: 1fr;
          }

          .lens-session-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .lens-outcome-grid,
          .lens-testimonial-grid,
          .lens-support-grid,
          .lens-cta-grid,
          .lens-stat-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 760px) {
          .lens-shell {
            padding: 0 24px;
          }

          .lens-section {
            padding: 80px 0;
          }

          .lens-hero {
            min-height: auto;
          }

          .lens-hero-grid,
          .lens-session-grid,
          .lens-outcome-grid,
          .lens-testimonial-grid,
          .lens-support-grid,
          .lens-cta-grid,
          .lens-stat-grid,
          .lens-token-grid,
          .lens-mini-grid {
            grid-template-columns: 1fr;
          }

          .lens-hero-title {
            font-size: 46px;
          }

          .lens-title {
            font-size: 36px;
          }

          .lens-button-row,
          .lens-cta-buttons {
            flex-direction: column;
          }

          .lens-btn {
            width: 100%;
          }
        }
      `}</style>

      <main className="lens-page">
        <section className="lens-hero">
          <div className="lens-shell lens-hero-grid">
            <div>
              <div className="lens-pill">
                <span style={{ color: "#D4A017" }}>◉</span>
                The Confidence Lens Project™
              </div>
              <h1 className="lens-hero-title">
                See Yourself Clearly.
                <span>Show Up Powerfully.</span>
              </h1>
              <p className="lens-hero-copy">
                The Confidence Lens Project™ is a youth-centered experience that helps young
                people discover their voice, strengthen their identity, and step into who
                they are becoming.
              </p>
              <div className="lens-tagline">
                Changing lives. One individual, one community at a time.
              </div>
              <div className="lens-button-row">
                <Link href="/contact" className="lens-btn lens-btn-primary">
                  Bring This Program to Your School
                </Link>
                <Link href="/contact" className="lens-btn lens-btn-secondary">
                  Partner With Us
                </Link>
                <Link href="/donate-now" className="lens-btn lens-btn-outline">
                  Support a Student
                </Link>
              </div>
            </div>

            <div className="lens-visual-frame">
              <div className="lens-visual-inner">
                <div className="lens-focus-box">
                  <span>Lens Focus</span>
                  <span style={{ color: "#A78BFA", fontSize: 24 }}>◌</span>
                </div>
                <div className="lens-hero-card">
                  <p className="lens-hero-card-top">Reflection</p>
                  <p className="lens-hero-quote">“Let me see myself clearly.”</p>
                  <div className="lens-mini-grid">
                    <div className="lens-mini-card">
                      <div className="lens-mini-label">Safe</div>
                      <div className="lens-mini-copy">
                        Reflection moments, guided journaling, and supportive processing.
                      </div>
                    </div>
                    <div className="lens-mini-card">
                      <div className="lens-mini-label">Transformational</div>
                      <div className="lens-mini-copy">
                        Voice-building experiences that move students from uncertainty to confidence.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lens-token-grid">
                  {["Reflection", "Connection", "Confidence"].map((item) => (
                    <div key={item} className="lens-token">
                      <div className="lens-token-icon">👓</div>
                      <div className="lens-token-title">{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lens-section">
          <div className="lens-shell lens-two-col">
            <div className="lens-highlight-panel">
              <div className="lens-eyebrow">What It Is</div>
              <h2 className="lens-title">A Transformative, Youth-Centered Experience</h2>
            </div>
            <div className="lens-copy">
              <p>
                The Confidence Lens Project™ is an interactive workshop experience designed
                to help young people strengthen confidence, self-awareness, and voice.
              </p>
              <p>
                Through guided reflection, meaningful conversation, and intentional choice,
                participants explore how they see themselves and how they show up in their
                communities.
              </p>
              <p>
                Using eyewear as a symbolic tool, students engage in identity exploration in
                a way that is engaging, affirming, and developmentally appropriate.
              </p>
            </div>
          </div>
        </section>

        <section className="lens-section" style={{ background: "white" }}>
          <div className="lens-shell lens-two-col">
            <div>
              <div className="lens-eyebrow">Why This Matters</div>
              <h2 className="lens-title">Why This Experience Matters</h2>
            </div>
            <div className="lens-soft-panel">
              <p className="lens-copy">
                Many young people are navigating identity, confidence, and self-expression
                during critical developmental years.
              </p>
              <p className="lens-copy">
                When they are given safe, supportive spaces to reflect and express
                themselves, they are more likely to engage confidently in school, build
                stronger peer relationships, and develop a positive sense of identity.
              </p>
              <div className="lens-stat-grid">
                <div className="lens-stat">Engage confidently in school</div>
                <div className="lens-stat">Build stronger peer relationships</div>
                <div className="lens-stat">Develop a positive sense of identity</div>
              </div>
            </div>
          </div>
        </section>

        <section className="lens-section">
          <div className="lens-shell">
            <div style={{ textAlign: "center", maxWidth: 820, margin: "0 auto" }}>
              <div className="lens-eyebrow" style={{ justifyContent: "center" }}>
                Program Tiers
              </div>
              <h2 className="lens-title">Structured for Every Stage of Growth</h2>
              <p className="lens-copy">
                Each tier is designed to meet young people where they are developmentally
                while helping them grow in confidence, identity, and voice.
              </p>
            </div>
            <div className="lens-tier-grid">
              {tiers.map((tier) => (
                <article key={tier.title} className="lens-tier-card">
                  <div className="lens-tier-label">{tier.label}</div>
                  <h3 className="lens-tier-title">{tier.title}</h3>
                  <div className="lens-tier-subhead">Focus</div>
                  <div className="lens-tier-copy">{tier.focus}</div>
                  <div className="lens-tier-subhead">Experience Includes</div>
                  <ul className="lens-tier-list">
                    {tier.experiences.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="lens-tier-outcome">{tier.outcome}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lens-section lens-band">
          <div className="lens-shell" style={{ textAlign: "center" }}>
            <div className="lens-eyebrow" style={{ justifyContent: "center", color: "#F5E6B8" }}>
              What Each Session Includes
            </div>
            <h2 className="lens-title">Built for Reflection, Safety, and Growth</h2>
            <div className="lens-session-grid">
              {sessionIncludes.map((item) => (
                <div key={item.title} className="lens-session-card">
                  <div className="lens-session-icon">{item.icon}</div>
                  <h3 className="lens-session-title">{item.title}</h3>
                  <div className="lens-session-copy">{item.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lens-section">
          <div className="lens-shell lens-two-col">
            <div>
              <div className="lens-eyebrow">Outcomes</div>
              <h2 className="lens-title">What Young People Walk Away With</h2>
              <div className="lens-outcome-grid">
                {outcomes.map((outcome) => (
                  <div key={outcome} className="lens-outcome">
                    {outcome}
                  </div>
                ))}
              </div>
            </div>
            <div className="lens-position-panel">
              <div className="lens-eyebrow" style={{ marginBottom: 10 }}>Positioning</div>
              <div className="lens-position-quote">
                “The Confidence Lens Project™ is not just a workshop. It is an experience
                that helps young people see themselves differently.”
              </div>
              <p className="lens-copy" style={{ marginTop: 24 }}>
                This work is about helping students move from blur to clarity, from silence
                to expression, and from uncertainty to grounded self-belief.
              </p>
              <div className="lens-position-callout">
                <strong>“My voice matters.”</strong>
                <div className="lens-copy">
                  That is the shift this experience is designed to support again and again.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lens-section" style={{ background: "white" }}>
          <div className="lens-shell">
            <div style={{ textAlign: "center" }}>
              <div className="lens-eyebrow" style={{ justifyContent: "center" }}>
                Community Voices
              </div>
              <h2 className="lens-title">Early Signs of Impact</h2>
            </div>
            <div className="lens-testimonial-grid">
              {testimonials.map((testimonial) => (
                <article key={testimonial.quote} className="lens-testimonial">
                  <div className="lens-quote-mark">“</div>
                  <div className="lens-testimonial-text">{testimonial.quote}</div>
                  <div className="lens-testimonial-source">{testimonial.source}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lens-section">
          <div className="lens-shell lens-sponsor-layout">
            <div className="lens-sponsor-panel">
              <div className="lens-eyebrow" style={{ color: "#F5E6B8" }}>
                Sponsor Confidence
              </div>
              <h2 className="lens-title">Invest in Reflection, Voice, and Student Growth</h2>
              <div className="lens-copy">
                Support helps us create safe, affirming student experiences with the
                materials, facilitation, and structure needed for real impact.
              </div>
            </div>
            <div className="lens-support-grid">
              {sponsorLevels.map((level) => (
                <div key={level.amount} className="lens-support-card">
                  <div className="lens-support-amount">{level.amount}</div>
                  <div className="lens-copy" style={{ marginTop: 10 }}>
                    {level.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lens-section lens-cta">
          <div className="lens-shell">
            <div className="lens-eyebrow" style={{ justifyContent: "center", color: "#F5E6B8" }}>
              Bring It to Your Community
            </div>
            <h2 className="lens-title" style={{ color: "white", textAlign: "center", maxWidth: 860, margin: "0 auto" }}>
              Bring The Confidence Lens Project™ to Your School or Community
            </h2>
            <p className="lens-copy" style={{ color: "rgba(255,255,255,0.88)", textAlign: "center", maxWidth: 860, margin: "24px auto 0" }}>
              This is a safe, structured, deeply affirming experience for young people who
              need room to reflect, express themselves, and grow into who they are becoming.
            </p>
            <div className="lens-cta-box">
              <div className="lens-cta-grid">
                {[
                  { title: "For Schools", action: "Book a Workshop" },
                  { title: "For Donors", action: "Sponsor a Student Experience" },
                  { title: "For Partners", action: "Collaborate With Us" },
                ].map((item) => (
                  <div key={item.title} className="lens-cta-card">
                    <div className="lens-cta-card-label">{item.title}</div>
                    <div className="lens-cta-card-title">{item.action}</div>
                  </div>
                ))}
              </div>
              <div className="lens-cta-buttons">
                <Link href="/contact" className="lens-btn lens-btn-primary">
                  Book a Consultation
                </Link>
                <Link href="/donate-now" className="lens-btn lens-btn-secondary">
                  Sponsor a Workshop
                </Link>
                <Link href="/contact" className="lens-btn lens-btn-outline">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
