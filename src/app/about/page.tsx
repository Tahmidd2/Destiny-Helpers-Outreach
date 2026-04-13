import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const team = [
    {
      name: "TrudyAnn Williams",
      title: "CEO",
      image: "/TrudyAnnWilliams.jpg",
      bio: "TrudyAnn Williams is a visionary leader, devoted mother, and passionate community advocate. As the CEO of Destiny Helpers Outreach Inc., she is committed to uplifting individuals and families facing hardship, turning challenges into pathways for growth and restoration. With a professional background in Finance, TrudyAnn brings both compassion and strategic insight to her work, ensuring that outreach efforts are not only heartfelt, but sustainable and impactful. Her leadership is rooted in empathy, faith, and action, as she works hands-on to provide resources, mentorship, and hope to underserved communities. Above all, TrudyAnn believes in the power of purpose. Whether serving families through her organization or nurturing her own at home, she leads with integrity, resilience, and an unwavering commitment to helping others step fully into their destiny.",
    },
    {
      name: "Ariel Trent",
      title: "Secretary",
      image: "/ArielTrent.jpg",
      bio: "Ariel Trent, a Brooklyn-bred leader with roots in St. Vincent and the Grenadines, supports the team by maintaining accurate records, coordinating communications, and assisting with administrative needs. With a background in Finance, Mathematics, Africana Studies, Dance, and Visual Art, she helps keep the organization organized and efficient.",
    },
    {
      name: "Gloria Seay",
      title: "Community Outreach Coordinator",
      image: "/GloriaSeay.jpeg",
      bio: "Gloria connects DHOI with companies, organizations, and the community by building relationships, coordinating volunteer events, and ensuring programs reach those most in need. With a heart for service and experience in social work, she helps bring the mission to life.",
    },
    {
      name: "DeVasha Lloyd",
      title: "Board Chair",
      image: "/DeVashaLloyd.jpg",
      bio: "As Board Chair, DeVasha provides guidance, accountability, and leadership to ensure the organization stays aligned with its mission. With 25+ years of experience in business leadership, she brings strong governance and vision to the team.",
    },
    {
      name: "Cameron Thomas",
      title: "Chief Financial Officer",
      image: "/CameronThomas.png",
      bio: "Cameron manages all financial operations, budgeting, and compliance for DHOI. With a background in accounting, he ensures the organization's resources are managed responsibly to maximize impact.",
    },
  ];

  const values = [
    { label: "Accountability", icon: "⚖️", desc: "We hold ourselves to the highest standard in all that we do." },
    { label: "Integrity", icon: "🌿", desc: "We lead with honesty and transparency in every interaction." },
    { label: "Respect", icon: "🤝", desc: "Every individual is seen, heard, and valued in our community." },
    { label: "Teamwork", icon: "🔗", desc: "Together we accomplish what none of us could alone." },
    { label: "Transparency", icon: "💡", desc: "We operate openly so our community can trust every decision." },
  ];

  const testimonials = [
    {
      quote: "I was moved. What I thought was just a task turned out to be so much more fulfilling. To see the contestants supporting each other was beautiful — some realized talents they never imagined showing the world.",
      author: "Event Judge",
      org: "Miss Teen Brownsville Pageant",
    },
    {
      quote: "The love I received was different from the normal business transactions I conduct with others. It was overwhelmingly warm and unforgettable. I will be sure to attend every event Destiny Helpers Outreach Inc. hosts.",
      author: "Deriann's Gift Shop",
      org: "Sponsor, Miss Teen Brownsville",
    },
    {
      quote: "I did not move until the show ended. To see young ladies supporting each other, displaying talents they never imagined — and being presented with a scholarship for college — I was blown away.",
      author: "Sobro Talks",
      org: "Community Observer",
    },
  ];

  const partners = [
    "The Fashion Foundation",
    "Gotham",
    "MetroPlusHealth",
    "The Home Depot",
    "Lowe's",
    "NY State Senate",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap');

        :root {
          --navy: #0F1F4D;
          --gold: #D4A017;
          --gold-light: #F5E6B8;
          --cream: #FAF7F2;
          --warm-gray: #6B6560;
          --dark: #1A1208;
        }

        .about-page {
          font-family: 'Outfit', sans-serif;
          background: var(--cream);
          color: var(--dark);
          overflow-x: hidden;
        }

        /* ── HERO ── */
        .hero {
          position: relative;
          min-height: 92vh;
          display: flex;
          align-items: flex-end;
          padding-bottom: 80px;
          background: var(--navy);
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            rgba(15,31,77,0.92) 0%,
            rgba(15,31,77,0.6) 50%,
            rgba(15,31,77,0.82) 100%
          ),
          url('/about-hero.jpg') center/cover no-repeat;
        }
        .hero-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(212,160,23,0.12) 1px, transparent 0);
          background-size: 40px 40px;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
          width: 100%;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 24px;
        }
        .hero-eyebrow::before {
          content: '';
          display: block;
          width: 40px;
          height: 1px;
          background: var(--gold);
        }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(52px, 8vw, 96px);
          font-weight: 700;
          color: white;
          line-height: 1.0;
          margin: 0 0 32px;
          max-width: 800px;
        }
        .hero-title em {
          font-style: italic;
          color: var(--gold);
        }
        .hero-subtitle {
          font-size: 18px;
          font-weight: 300;
          color: rgba(255,255,255,0.75);
          max-width: 560px;
          line-height: 1.7;
          margin: 0 0 48px;
        }
        .hero-stat-row {
          display: flex;
          gap: 48px;
          flex-wrap: wrap;
        }
        .hero-stat {
          border-left: 2px solid var(--gold);
          padding-left: 20px;
        }
        .hero-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 700;
          color: white;
          line-height: 1;
        }
        .hero-stat-label {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-top: 4px;
        }

        /* ── STORY ── */
        .story-section {
          padding: 120px 48px;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .section-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .section-label::after {
          content: '';
          flex: 1;
          max-width: 40px;
          height: 1px;
          background: var(--gold);
        }
        .section-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 4vw, 56px);
          font-weight: 700;
          color: var(--navy);
          line-height: 1.1;
          margin: 0 0 28px;
        }
        .section-heading em {
          font-style: italic;
          color: var(--gold);
        }
        .body-text {
          font-size: 16px;
          line-height: 1.85;
          color: var(--warm-gray);
          font-weight: 300;
        }
        .body-text + .body-text {
          margin-top: 16px;
        }
        .story-image-wrap {
          position: relative;
        }
        .story-image-wrap::before {
          content: '';
          position: absolute;
          top: -20px;
          left: -20px;
          right: 20px;
          bottom: 20px;
          border: 2px solid var(--gold-light);
          border-radius: 4px;
          z-index: 0;
        }
        .story-image {
          position: relative;
          z-index: 1;
          width: 100%;
          aspect-ratio: 4/5;
          object-fit: cover;
          border-radius: 4px;
          display: block;
          background: linear-gradient(135deg, #e8e0d5, #d5ccbf);
        }
        .story-image-placeholder {
          position: relative;
          z-index: 1;
          width: 100%;
          aspect-ratio: 4/5;
          background: linear-gradient(135deg, var(--navy) 0%, #1a3470 100%);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.2);
          font-family: 'Cormorant Garamond', serif;
          font-size: 80px;
        }
        .founded-badge {
          position: absolute;
          bottom: -24px;
          right: -24px;
          z-index: 2;
          background: var(--gold);
          color: var(--navy);
          width: 120px;
          height: 120px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(212,160,23,0.4);
        }
        .founded-badge-year {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 700;
          line-height: 1;
        }
        .founded-badge-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 2px;
        }

        /* ── VISION BAND ── */
        .vision-band {
          background: var(--navy);
          padding: 100px 48px;
          position: relative;
          overflow: hidden;
        }
        .vision-band::before {
          content: '"';
          position: absolute;
          top: -40px;
          left: 48px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 400px;
          color: rgba(212,160,23,0.06);
          line-height: 1;
          pointer-events: none;
        }
        .vision-inner {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .vision-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 28px;
        }
        .vision-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(24px, 3.5vw, 40px);
          font-weight: 400;
          font-style: italic;
          color: white;
          line-height: 1.5;
          margin: 0 0 48px;
        }
        .vision-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: var(--gold);
          color: var(--navy);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 16px 32px;
          border-radius: 100px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .vision-cta:hover {
          background: #e8b820;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212,160,23,0.4);
        }

        /* ── VALUES ── */
        .values-section {
          padding: 120px 48px;
          background: white;
        }
        .values-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .values-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          margin-bottom: 72px;
          align-items: end;
        }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2px;
          background: var(--gold-light);
        }
        .value-card {
          background: white;
          padding: 40px 28px;
          transition: all 0.3s;
          cursor: default;
        }
        .value-card:hover {
          background: var(--navy);
        }
        .value-card:hover .value-label,
        .value-card:hover .value-desc {
          color: white;
        }
        .value-card:hover .value-icon {
          transform: scale(1.2);
        }
        .value-icon {
          font-size: 32px;
          margin-bottom: 20px;
          display: block;
          transition: transform 0.3s;
        }
        .value-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 12px;
          transition: color 0.3s;
        }
        .value-desc {
          font-size: 13px;
          line-height: 1.7;
          color: var(--warm-gray);
          transition: color 0.3s;
          font-weight: 300;
        }

        /* ── TEAM ── */
        .team-section {
          padding: 120px 48px;
          background: var(--cream);
        }
        .team-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .team-header {
          margin-bottom: 72px;
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        .team-card {
          background: white;
          border-radius: 4px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .team-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 64px rgba(15,31,77,0.12);
        }
        .team-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          background: linear-gradient(135deg, var(--navy), #1a3470);
        }
        .team-card-img-placeholder {
          width: 100%;
          aspect-ratio: 3/4;
          background: linear-gradient(160deg, var(--navy) 0%, #233d8f 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 64px;
          color: rgba(212,160,23,0.3);
        }
        .team-card-body {
          padding: 28px 28px 32px;
        }
        .team-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 700;
          color: var(--navy);
          margin: 0 0 4px;
        }
        .team-card-title {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold);
          margin: 0 0 16px;
        }
        .team-card-bio {
          font-size: 14px;
          line-height: 1.75;
          color: var(--warm-gray);
          font-weight: 300;
        }

        /* ── TESTIMONIALS ── */
        .testimonials-section {
          padding: 120px 48px;
          background: white;
        }
        .testimonials-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 72px;
        }
        .testimonial-card {
          padding: 40px;
          background: var(--cream);
          border-radius: 4px;
          position: relative;
          border-top: 3px solid var(--gold);
        }
        .testimonial-quote-mark {
          font-family: 'Cormorant Garamond', serif;
          font-size: 80px;
          color: var(--gold);
          line-height: 0.8;
          margin-bottom: 20px;
          display: block;
        }
        .testimonial-text {
          font-size: 15px;
          line-height: 1.8;
          color: var(--warm-gray);
          font-style: italic;
          font-weight: 300;
          margin-bottom: 28px;
        }
        .testimonial-author {
          font-size: 14px;
          font-weight: 600;
          color: var(--navy);
        }
        .testimonial-org {
          font-size: 12px;
          font-weight: 400;
          color: var(--warm-gray);
          margin-top: 2px;
        }

        /* ── PARTNERS ── */
        .partners-section {
          padding: 80px 48px;
          background: var(--navy);
          text-align: center;
        }
        .partners-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 12px;
        }
        .partners-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 700;
          color: white;
          margin: 0 0 56px;
        }
        .partners-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
          max-width: 900px;
          margin: 0 auto;
        }
        .partner-pill {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(212,160,23,0.25);
          color: rgba(255,255,255,0.7);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.05em;
          padding: 12px 24px;
          border-radius: 100px;
          transition: all 0.2s;
        }
        .partner-pill:hover {
          background: rgba(212,160,23,0.12);
          border-color: var(--gold);
          color: white;
        }

        /* ── CTA ── */
        .cta-section {
          padding: 120px 48px;
          background: var(--cream);
          text-align: center;
        }
        .cta-inner {
          max-width: 680px;
          margin: 0 auto;
        }
        .cta-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 700;
          color: var(--navy);
          line-height: 1.1;
          margin: 0 0 24px;
        }
        .cta-heading em {
          font-style: italic;
          color: var(--gold);
        }
        .cta-sub {
          font-size: 17px;
          font-weight: 300;
          color: var(--warm-gray);
          line-height: 1.7;
          margin: 0 0 48px;
        }
        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-primary-gold {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--gold);
          color: var(--navy);
          font-size: 15px;
          font-weight: 600;
          padding: 16px 36px;
          border-radius: 100px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-primary-gold:hover {
          background: #e8b820;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212,160,23,0.4);
        }
        .btn-outline-navy {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 2px solid var(--navy);
          color: var(--navy);
          font-size: 15px;
          font-weight: 600;
          padding: 16px 36px;
          border-radius: 100px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-outline-navy:hover {
          background: var(--navy);
          color: white;
          transform: translateY(-2px);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .story-section {
            grid-template-columns: 1fr;
            padding: 80px 24px;
            gap: 56px;
          }
          .values-header { grid-template-columns: 1fr; }
          .values-grid { grid-template-columns: repeat(2, 1fr); }
          .team-grid { grid-template-columns: 1fr; }
          .testimonials-grid { grid-template-columns: 1fr; }
          .hero-content { padding: 0 24px; }
          .vision-band,
          .values-section,
          .team-section,
          .testimonials-section,
          .partners-section,
          .cta-section { padding-left: 24px; padding-right: 24px; }
          .hero-stat-row { gap: 28px; }
        }

        @media (max-width: 600px) {
          .values-grid { grid-template-columns: 1fr; }
          .hero-title { font-size: 42px; }
          .founded-badge { width: 90px; height: 90px; right: 0; bottom: -16px; }
          .founded-badge-year { font-size: 22px; }
        }
      `}</style>

      <div className="about-page">

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-pattern" />
          <div className="hero-content">
            <div className="hero-eyebrow">Our Story</div>
            <h1 className="hero-title">
              Changing Lives,<br />
              <em>One Community</em><br />
              at a Time.
            </h1>
            <p className="hero-subtitle">
              Destiny Helpers Outreach Inc. is a 501(c)(3) nonprofit born from lived experience, rooted in Brooklyn, and dedicated to transforming youth and families through meaningful programs.
            </p>
            <div className="hero-stat-row">
              <div className="hero-stat">
                <div className="hero-stat-num">2019</div>
                <div className="hero-stat-label">Year Founded</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">6+</div>
                <div className="hero-stat-label">Active Programs</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">BK</div>
                <div className="hero-stat-label">Brooklyn, NY</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STORY ── */}
        <section style={{ background: "var(--cream)" }}>
          <div className="story-section">
            <div>
              <div className="section-label">Our Story</div>
              <h2 className="section-heading">A Beacon for <em>Positive Change</em></h2>
              <p className="body-text">
                Destiny Helpers Outreach Inc. is a 501(c)(3) organization based in Brooklyn, NY that envisions itself as a beacon for positive change and transformation.
              </p>
              <p className="body-text">
                After learning about the alarmingly high rates of teenage pregnancy, gang involvement, and homelessness across New York City communities, the need for a new type of leadership and meaningful youth and family programs became apparent.
              </p>
              <p className="body-text" style={{ marginTop: 16 }}>
                In 2019, while living in a homeless shelter, TrudyAnn Williams founded Destiny Helpers Outreach Inc. — officially incorporated on April 24th, 2024. Her story is not one of circumstance, but of conviction.
              </p>
              <div style={{ marginTop: 40 }}>
                <Link href="/blogs" className="btn-outline-navy">Read Our Blog →</Link>
              </div>
            </div>
            <div className="story-image-wrap">
              <div className="story-image-placeholder">✦</div>
              <div className="founded-badge">
                <div className="founded-badge-year">2019</div>
                <div className="founded-badge-label">Founded</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VISION BAND ── */}
        <section className="vision-band">
          <div className="vision-inner">
            <div className="vision-eyebrow">Our Vision</div>
            <p className="vision-text">
              "To become the principal Not-For-Profit Community Based Organization providing meaningful youth and family programs that produce positive change and transformation in the lives and communities we serve."
            </p>
            <Link href="/programs" className="vision-cta">
              Explore Our Programs →
            </Link>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="values-section">
          <div className="values-inner">
            <div className="values-header">
              <div>
                <div className="section-label">What We Stand For</div>
                <h2 className="section-heading">Our Core <em>Values</em></h2>
              </div>
              <p className="body-text">
                Every activity, project, and program at Destiny Helpers Outreach Inc. is guided by five foundational principles that define how we show up for our community.
              </p>
            </div>
            <div className="values-grid">
              {values.map((v) => (
                <div key={v.label} className="value-card">
                  <span className="value-icon">{v.icon}</span>
                  <div className="value-label">{v.label}</div>
                  <div className="value-desc">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="team-section">
          <div className="team-inner">
            <div className="team-header">
              <div className="section-label">The People Behind the Mission</div>
              <h2 className="section-heading">Meet Our <em>Team</em></h2>
            </div>
            <div className="team-grid">
              {team.map((member) => (
                <div key={member.name} className="team-card">
                  <div className="team-card-img-wrap">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="team-card-body">
                    <div className="team-card-name">{member.name}</div>
                    <div className="team-card-title">{member.title}</div>
                    <div className="team-card-bio">{member.bio}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="testimonials-section">
          <div className="testimonials-inner">
            <div className="section-label">Community Voices</div>
            <h2 className="section-heading">What People <em>Say</em></h2>
            <div className="testimonials-grid">
              {testimonials.map((t, i) => (
                <div key={i} className="testimonial-card">
                  <span className="testimonial-quote-mark">"</span>
                  <p className="testimonial-text">{t.quote}</p>
                  <div className="testimonial-author">{t.author}</div>
                  <div className="testimonial-org">{t.org}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PARTNERS ── */}
        <section className="partners-section">
          <div className="partners-eyebrow">We Are In Good Company</div>
          <h2 className="partners-heading">Our Partners</h2>
          <div className="partners-row">
            {partners.map((p) => (
              <div key={p} className="partner-pill">{p}</div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section">
          <div className="cta-inner">
            <div className="section-label" style={{ justifyContent: "center" }}>Join the Mission</div>
            <h2 className="cta-heading">
              Help Us Serve &amp; Empower <em>Future Generations</em>
            </h2>
            <p className="cta-sub">
              Join us in changing lives — one individual, one community at a time. Every donation and volunteer hour makes a real difference in Brooklyn and beyond.
            </p>
            <div className="cta-buttons">
              <Link href="/donate-now" className="btn-primary-gold">Donate Now</Link>
              <Link href="/volunteer-with-us" className="btn-outline-navy">Volunteer With Us</Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
