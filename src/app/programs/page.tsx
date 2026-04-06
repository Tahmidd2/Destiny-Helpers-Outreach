"use client";

import { useState, useEffect } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
}

// ─── Programs Data ────────────────────────────────────────────────────────────
const programs = [
  {
    title: "Beyond The Mask",
    slug: "beyond-the-mask",
    folder: "Pics/Videos/2026/Beyond The Mask",
    icon: "🎭",
    color: "#7C3AED",
    colorLight: "rgba(124,58,237,0.08)",
    description:
      "Helping youth explore identity, emotional awareness, and self-expression in a safe and nurturing environment. Through art, performance, and reflection, participants learn to unmask their authentic selves and step into their power.",
    highlights: ["Identity Development", "Emotional Awareness", "Self-Expression", "Safe Space"],
  },
  {
    title: "The Confidence Lens Project",
    slug: "confidence-lens",
    folder: "Pics/Videos/2026/The Confidence Lens Project",
    icon: "📸",
    color: "#1E3A8A",
    colorLight: "rgba(30,58,138,0.08)",
    description:
      "Building confidence and self-image through reflection and storytelling — empowering youth to see their own brilliance. Participants use photography and visual storytelling to document their journeys and celebrate who they are.",
    highlights: ["Photography", "Storytelling", "Self-Image", "Confidence Building"],
  },
  {
    title: "Project ICON",
    slug: "project-icon",
    folder: "Pics/Videos/2023/Miss Teen Brownsville",
    icon: "⭐",
    color: "#D4A017",
    colorLight: "rgba(212,160,23,0.08)",
    description:
      "Leadership and identity development for youth, cultivating the next generation of community changemakers. Project ICON equips young people with the tools, mindset, and mentorship needed to lead with purpose.",
    highlights: ["Leadership", "Mentorship", "Community Impact", "Identity"],
  },
  {
    title: "Mr & Ms Teen Destiny Changer NYC",
    slug: "teen-destiny-changer",
    folder: "Pics/Videos/2022/Crowned In Her Story 2022",
    icon: "👑",
    color: "#6B4F3B",
    colorLight: "rgba(107,79,59,0.08)",
    description:
      "Youth leadership and empowerment initiative celebrating the brilliance of young men and women across New York City. This program honors excellence, character, and community service.",
    highlights: ["Youth Leadership", "Recognition", "Community Service", "Excellence"],
  },
  {
    title: "Ms. Teen Brownsville",
    slug: "teen-brownsville",
    folder: "Pics/Videos/2022/Miss Teen Brownsville 2022",
    icon: "🌟",
    color: "#1E3A8A",
    colorLight: "rgba(30,58,138,0.08)",
    description:
      "Community-based youth empowerment and leadership program rooted in the heart of Brownsville, Brooklyn. This program uplifts young women, celebrates their achievements, and connects them with mentors.",
    highlights: ["Empowerment", "Brooklyn Roots", "Mentorship", "Community"],
  },
  {
    title: "Let's Get Artsy",
    slug: "lets-get-artsy",
    folder: "Pics/Videos/2021/Community Engagement Events",
    icon: "🎨",
    color: "#7C3AED",
    colorLight: "rgba(124,58,237,0.08)",
    description:
      "Creative arts and self-expression program where youth discover their voices through art, music, and creativity. A joyful space where imagination has no limits and every young person is celebrated as an artist.",
    highlights: ["Visual Art", "Music", "Creative Expression", "Joy"],
  },
];

// ─── Image Collage Component ──────────────────────────────────────────────────
function ProgramCollage({ folder, title, color }: { folder: string; title: string; color: string }) {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/cloudinary?folder=${encodeURIComponent(folder)}`)
      .then((r) => r.json())
      .then((d) => { setImages(d.images || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [folder]);

  if (loading) {
    return (
      <div className="collage-loading">
        <div className="collage-spinner" style={{ borderTopColor: color }} />
        <span>Loading photos...</span>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="collage-empty">
        <span style={{ fontSize: "40px", opacity: 0.3 }}>📸</span>
        <span>Photos coming soon</span>
      </div>
    );
  }

  // Layout: first image large, rest smaller
  return (
    <div className="collage-grid">
      {images.slice(0, 5).map((img, i) => (
        <div
          key={img.public_id}
          className={`collage-cell ${i === 0 ? "collage-cell-large" : ""}`}
          style={{ "--accent": color } as React.CSSProperties}
        >
          <img src={img.secure_url} alt={`${title} ${i + 1}`} loading="lazy" />
          <div className="collage-overlay" style={{ background: `linear-gradient(to top, ${color}99, transparent)` }} />
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProgramsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #F9F6F1; }
        h1, h2, h3 { font-family: 'Playfair Display', serif; }

        /* ── Hero ── */
        .prog-hero {
          background: linear-gradient(135deg, #1E3A8A 0%, #0F1F4D 60%, #2D1B69 100%);
          padding: 100px 48px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .prog-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 60% 40%, rgba(212,160,23,.12), transparent 60%),
                      radial-gradient(ellipse at 20% 80%, rgba(124,58,237,.15), transparent 50%);
        }
        .prog-hero-inner { position: relative; z-index: 1; max-width: 760px; margin: 0 auto; }
        .prog-hero-label {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(212,160,23,.15); border: 1px solid rgba(212,160,23,.4);
          border-radius: 100px; padding: 8px 20px;
          font-size: 12px; font-weight: 600; color: #F5C842;
          letter-spacing: .1em; text-transform: uppercase; margin-bottom: 24px;
        }
        .prog-hero h1 {
          font-size: clamp(42px, 6vw, 72px); font-weight: 900;
          color: white; line-height: 1.05; margin-bottom: 20px;
        }
        .prog-hero h1 span {
          background: linear-gradient(135deg, #D4A017, #F5C842);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .prog-hero-sub {
          font-size: 18px; color: rgba(255,255,255,.7);
          line-height: 1.7; font-weight: 300; max-width: 560px; margin: 0 auto 36px;
        }
        .prog-hero-stats {
          display: flex; justify-content: center; gap: 40px; flex-wrap: wrap;
          padding-top: 40px; border-top: 1px solid rgba(255,255,255,.1);
        }
        .prog-hero-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 36px; font-weight: 900; color: #F5C842; line-height: 1;
        }
        .prog-hero-stat-label { font-size: 13px; color: rgba(255,255,255,.5); margin-top: 4px; font-weight: 500; }

        /* ── Nav dots ── */
        .prog-nav {
          background: white; border-bottom: 1px solid rgba(0,0,0,.07);
          padding: 0 48px; position: sticky; top: 0; z-index: 100;
          box-shadow: 0 2px 20px rgba(0,0,0,.05);
        }
        .prog-nav-inner {
          max-width: 1300px; margin: 0 auto;
          display: flex; gap: 4px; overflow-x: auto;
          scrollbar-width: none; -ms-overflow-style: none;
        }
        .prog-nav-inner::-webkit-scrollbar { display: none; }
        .prog-nav-btn {
          padding: 16px 20px; font-size: 13px; font-weight: 600;
          color: #888; background: none; border: none; cursor: pointer;
          border-bottom: 3px solid transparent; transition: all .2s;
          white-space: nowrap; font-family: 'DM Sans', sans-serif;
        }
        .prog-nav-btn:hover { color: #1E3A8A; }
        .prog-nav-btn.active { color: #1E3A8A; border-bottom-color: #D4A017; }

        /* ── Program Section ── */
        .prog-section {
          max-width: 1300px; margin: 0 auto;
          padding: 80px 48px;
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .prog-section:last-child { border-bottom: none; }
        .prog-section-inner {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 64px; align-items: center;
        }
        .prog-section-inner.reverse { direction: rtl; }
        .prog-section-inner.reverse > * { direction: ltr; }

        .prog-section-label {
          font-size: 12px; font-weight: 700; letter-spacing: .12em;
          text-transform: uppercase; margin-bottom: 14px;
          display: flex; align-items: center; gap: 10px;
        }
        .prog-section-label::before {
          content: ''; display: block; width: 28px; height: 2px; border-radius: 2px;
        }
        .prog-section-icon {
          font-size: 48px; margin-bottom: 16px; display: block;
        }
        .prog-section h2 {
          font-size: clamp(28px, 3.5vw, 44px); font-weight: 900;
          color: #0F1F4D; line-height: 1.1; margin-bottom: 16px;
        }
        .prog-section-desc {
          font-size: 16px; color: #666; line-height: 1.8;
          font-weight: 300; margin-bottom: 28px;
        }
        .prog-highlights {
          display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px;
        }
        .prog-highlight-pill {
          padding: 7px 16px; border-radius: 100px;
          font-size: 13px; font-weight: 600; border: 1px solid;
        }
        .prog-section-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 100px;
          font-size: 14px; font-weight: 700; text-decoration: none;
          transition: all .2s; color: white;
          box-shadow: 0 4px 20px rgba(0,0,0,.15);
        }
        .prog-section-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,.2); }

        /* ── Collage ── */
        .collage-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 240px 200px;
          gap: 10px;
          border-radius: 20px; overflow: hidden;
        }
        .collage-cell {
          position: relative; overflow: hidden;
          background: rgba(0,0,0,.06);
          border-radius: 12px;
        }
        .collage-cell-large {
          grid-row: 1 / 2; grid-column: 1 / 3;
        }
        .collage-cell img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform .5s ease;
        }
        .collage-cell:hover img { transform: scale(1.04); }
        .collage-overlay {
          position: absolute; inset: 0; opacity: 0;
          transition: opacity .3s;
        }
        .collage-cell:hover .collage-overlay { opacity: 1; }
        .collage-loading {
          height: 440px; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 16px;
          color: #aaa; font-size: 14px; border-radius: 20px;
          background: rgba(0,0,0,.03); border: 1px dashed rgba(0,0,0,.1);
        }
        .collage-spinner {
          width: 36px; height: 36px; border-radius: 50%;
          border: 3px solid rgba(0,0,0,.08);
          border-top-color: #1E3A8A;
          animation: spin .8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .collage-empty {
          height: 440px; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 12px;
          color: #bbb; font-size: 14px; border-radius: 20px;
          background: rgba(0,0,0,.03); border: 1px dashed rgba(0,0,0,.1);
        }

        /* ── CTA Banner ── */
        .prog-cta {
          background: linear-gradient(135deg, #D4A017, #E8B820);
          padding: 80px 48px; text-align: center;
        }
        .prog-cta h2 {
          font-size: clamp(28px, 4vw, 48px); color: #0F1F4D;
          margin-bottom: 16px; font-weight: 900;
        }
        .prog-cta p { font-size: 17px; color: rgba(15,31,77,.7); margin-bottom: 36px; font-weight: 300; }
        .prog-cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .prog-cta-btn-dark {
          background: #0F1F4D; color: white; font-weight: 700; font-size: 15px;
          padding: 16px 36px; border-radius: 100px; text-decoration: none;
          transition: all .2s; box-shadow: 0 4px 20px rgba(15,31,77,.3);
        }
        .prog-cta-btn-dark:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(15,31,77,.4); }
        .prog-cta-btn-outline {
          border: 2px solid rgba(15,31,77,.3); color: #0F1F4D; font-weight: 600;
          font-size: 15px; padding: 14px 32px; border-radius: 100px;
          text-decoration: none; transition: all .2s;
        }
        .prog-cta-btn-outline:hover { background: rgba(15,31,77,.08); border-color: #0F1F4D; }

        @media (max-width: 1024px) {
          .prog-section-inner, .prog-section-inner.reverse {
            grid-template-columns: 1fr; direction: ltr; gap: 40px;
          }
          .prog-section { padding: 60px 24px; }
          .prog-hero { padding: 80px 24px 60px; }
          .prog-nav { padding: 0 24px; }
          .prog-cta { padding: 60px 24px; }
        }
        @media (max-width: 640px) {
          .collage-grid { grid-template-rows: 200px 160px; }
          .prog-hero-stats { gap: 24px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="prog-hero">
        <div className="prog-hero-inner">
          <div className="prog-hero-label">✦ What We Do</div>
          <h1>Programs That <span>Transform Lives</span></h1>
          <p className="prog-hero-sub">
            Six powerful programs designed to meet youth where they are — and help them grow into who they're meant to be.
          </p>
          <div className="prog-hero-stats">
            {[
              { num: "6", label: "Active Programs" },
              { num: "500+", label: "Youth Served" },
              { num: "7+", label: "Years of Impact" },
              { num: "Brooklyn", label: "Based in NY" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div className="prog-hero-stat-num">{s.num}</div>
                <div className="prog-hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY NAV ── */}
      <nav className="prog-nav">
        <div className="prog-nav-inner">
          {programs.map((p) => (
            <button
              key={p.slug}
              className="prog-nav-btn"
              onClick={() => document.getElementById(p.slug)?.scrollIntoView({ behavior: "smooth" })}
            >
              {p.icon} {p.title}
            </button>
          ))}
        </div>
      </nav>

      {/* ── PROGRAM SECTIONS ── */}
      <div style={{ background: "#F9F6F1" }}>
        {programs.map((p, i) => (
          <section key={p.slug} id={p.slug} className="prog-section">
            <div className={`prog-section-inner ${i % 2 !== 0 ? "reverse" : ""}`}>

              {/* Text side */}
              <div>
                <div className="prog-section-label" style={{ color: p.color }}>
                  <span style={{ background: p.color }} />
                  Program {String(i + 1).padStart(2, "0")}
                </div>
                <span className="prog-section-icon">{p.icon}</span>
                <h2>{p.title}</h2>
                <p className="prog-section-desc">{p.description}</p>
                <div className="prog-highlights">
                  {p.highlights.map((h) => (
                    <span
                      key={h}
                      className="prog-highlight-pill"
                      style={{
                        background: p.colorLight,
                        color: p.color,
                        borderColor: p.color + "33",
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
                
                <a
                  href={`/programs/${p.slug}`}
                  className="prog-section-btn"
                  style={{ background: p.color }}
                >
                  Learn More →
                </a>
              </div>

              {/* Collage side */}
              <div>
                <ProgramCollage folder={p.folder} title={p.title} color={p.color} />
              </div>

            </div>
          </section>
        ))}
      </div>

      {/* ── CTA ── */}
      <section className="prog-cta">
        <h2>Ready to Make a Difference?</h2>
        <p>Join us as a volunteer, donor, or partner and help us expand these programs to reach more youth.</p>
        <div className="prog-cta-btns">
          <a href="/volunteer-with-us" className="prog-cta-btn-dark">Volunteer With Us</a>
          <a href="/donate-now" className="prog-cta-btn-outline">Donate Now</a>
        </div>
      </section>
    </>
  );
}