"use client";

import { useState, useEffect, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
}

interface Program {
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface ImpactStat {
  number: string;
  label: string;
  icon: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const programs: Program[] = [
  { title: "Beyond The Mask", description: "Helping youth explore identity, emotional awareness, and self-expression in a safe and nurturing environment.", icon: "🎭", color: "#7C3AED" },
  { title: "The Confidence Lens Project", description: "Building confidence and self-image through reflection and storytelling — empowering youth to see their own brilliance.", icon: "📸", color: "#1E3A8A" },
  { title: "Project ICON", description: "Leadership and identity development for youth, cultivating the next generation of community changemakers.", icon: "⭐", color: "#D4A017" },
  { title: "Mr & Ms Teen Destiny Changer NYC", description: "Youth leadership and empowerment initiative celebrating the brilliance of young men and women across New York City.", icon: "👑", color: "#6B4F3B" },
  { title: "Ms. Teen Brownsville", description: "Community-based youth empowerment and leadership program rooted in the heart of Brownsville, Brooklyn.", icon: "🌟", color: "#1E3A8A" },
  { title: "Let's Get Artsy", description: "Creative arts and self-expression program where youth discover their voices through art, music, and creativity.", icon: "🎨", color: "#7C3AED" },
];

const impactStats: ImpactStat[] = [
  { number: "500+", label: "Youth Served", icon: "🌱" },
  { number: "200+", label: "Families Supported", icon: "🏠" },
  { number: "50+", label: "Community Events", icon: "🎉" },
  { number: "7+", label: "Years of Impact", icon: "📅" },
];

const galleryYears = [
  { year: "2026", events: ["Beyond The Mask", "Medgar Evers Social Work Conference", "The Confidence Lens Project"] },
  { year: "2025", events: ["Back to School Resource Fair", "Non Profit of the Game"] },
  { year: "2024", events: ["EmpowerHer Picnic"] },
  { year: "2023", events: ["Miss Teen Brownsville"] },
  { year: "2022", events: ["Crowned In Her Story 2022", "Kingsborough 6th Walk Food Distribution Nov '22", "Miss Teen Brownsville 2022", "Nourish Your Community 2022", "Winter Wonderland '22"] },
  { year: "2021", events: ["Caribbean Outreach", "Community Engagement Events", "Power In Collaboration Brunch-Fundraiser"] },
  { year: "2020", events: ["Shelter Events"] }, // ← fixed
  { year: "2019", events: ["Miss Teen Brownsville 2019", "Shelter Holiday Giveback"] },
];

const communityEventCards = [
  { title: "Crowned In Her Story", description: "Empowering women through storytelling and transformation experiences — celebrating every chapter of her journey.", icon: "👑", gradient: "#7C3AED, #1E3A8A" },
  { title: "Back to School Resource Fair", description: "Distributing backpacks filled with school supplies alongside food, music, activities, and resources for families.", icon: "🎒", gradient: "#1E3A8A, #D4A017" },
  { title: "Nourish Your Community", description: "Distributing warm Thanksgiving meals to migrant families and the broader community at key Brooklyn intersections.", icon: "🍽️", gradient: "#6B4F3B, #1E3A8A" },
  { title: "Winter Wonderland", description: "Spreading holiday joy by distributing gifts, food, and winter essentials to families across our community.", icon: "🎁", gradient: "#D4A017, #7C3AED" },
];

// ─── Gallery Hook ─────────────────────────────────────────────────────────────
function useGalleryImages(year: string, event: string) {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!year || !event) return;
    const folder = `Pics/Videos/${year}/${event}`;
    setLoading(true);
    setImages([]);
    fetch(`/api/cloudinary?folder=${encodeURIComponent(folder)}`)
      .then((res) => res.json())
      .then((data) => { setImages(data.images || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [year, event]);

  return { images, loading };
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function HomePage() {
  const [activeYear, setActiveYear] = useState("2026");
  const [activeEvent, setActiveEvent] = useState(galleryYears[0].events[0]);
  const [heroVisible, setHeroVisible] = useState(false);
  const [countersVisible, setCountersVisible] = useState(false);
  const countersRef = useRef<HTMLDivElement>(null);
  const { images: galleryImages, loading: galleryLoading } = useGalleryImages(activeYear, activeEvent);

  useEffect(() => { setHeroVisible(true); }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setCountersVisible(true); }, { threshold: 0.3 });
    if (countersRef.current) observer.observe(countersRef.current);
    return () => observer.disconnect();
  }, []);

  const handleYearChange = (year: string) => {
    setActiveYear(year);
    const yearData = galleryYears.find((y) => y.year === year);
    if (yearData?.events.length) setActiveEvent(yearData.events[0]);
  };

  const activeYearData = galleryYears.find((y) => y.year === activeYear);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        :root { --royal:#1E3A8A; --gold:#D4A017; --gold-light:#F5C842; --cream:#F9F6F1; --purple:#7C3AED; --brown:#6B4F3B; --dark:#0F1F4D; }
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--dark);overflow-x:hidden;}
        h1,h2,h3{font-family:'Playfair Display',serif;}

        .hero{min-height:100vh;background:linear-gradient(135deg,var(--royal) 0%,#0F1F4D 50%,#2D1B69 100%);position:relative;display:flex;align-items:center;overflow:hidden;}
        .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 70% 50%,rgba(212,160,23,.15) 0%,transparent 60%),radial-gradient(ellipse at 20% 80%,rgba(124,58,237,.2) 0%,transparent 50%);}
        .orb{position:absolute;border-radius:50%;filter:blur(80px);animation:float 8s ease-in-out infinite;pointer-events:none;}
        .orb-1{width:400px;height:400px;background:rgba(212,160,23,.12);top:-100px;right:-100px;}
        .orb-2{width:300px;height:300px;background:rgba(124,58,237,.15);bottom:50px;left:-80px;animation-delay:3s;}
        @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-30px);}}
        .hero-bar{position:absolute;width:6px;height:180px;background:linear-gradient(to bottom,var(--gold),transparent);left:48px;top:50%;transform:translateY(-50%);border-radius:3px;}
        .hero-content{position:relative;z-index:2;max-width:1200px;margin:0 auto;padding:0 48px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;width:100%;}
        .hero-label{display:inline-flex;align-items:center;gap:10px;background:rgba(212,160,23,.15);border:1px solid rgba(212,160,23,.4);border-radius:100px;padding:8px 20px;font-size:13px;font-weight:500;color:var(--gold-light);letter-spacing:.08em;text-transform:uppercase;margin-bottom:28px;opacity:0;transform:translateY(20px);transition:all .7s ease .2s;}
        .hero-label.visible{opacity:1;transform:translateY(0);}
        .hero-headline{font-size:clamp(42px,5vw,72px);font-weight:900;color:#fff;line-height:1.05;margin-bottom:24px;opacity:0;transform:translateY(30px);transition:all .8s ease .4s;}
        .hero-headline.visible{opacity:1;transform:translateY(0);}
        .hero-headline span{background:linear-gradient(135deg,var(--gold),var(--gold-light));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;display:block;}
        .hero-sub{font-size:18px;color:rgba(255,255,255,.75);line-height:1.7;max-width:480px;margin-bottom:44px;font-weight:300;opacity:0;transform:translateY(20px);transition:all .8s ease .6s;}
        .hero-sub.visible{opacity:1;transform:translateY(0);}
        .hero-buttons{display:flex;gap:16px;flex-wrap:wrap;opacity:0;transform:translateY(20px);transition:all .8s ease .8s;}
        .hero-buttons.visible{opacity:1;transform:translateY(0);}
        .btn-gold{background:linear-gradient(135deg,var(--gold),var(--gold-light));color:var(--dark);font-weight:700;font-size:15px;padding:16px 32px;border-radius:100px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:transform .2s,box-shadow .2s;box-shadow:0 4px 24px rgba(212,160,23,.4);}
        .btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(212,160,23,.5);}
        .btn-ghost{border:2px solid rgba(255,255,255,.4);color:white;font-weight:600;font-size:15px;padding:14px 28px;border-radius:100px;text-decoration:none;display:inline-flex;align-items:center;transition:all .2s;backdrop-filter:blur(10px);}
        .btn-ghost:hover{background:rgba(255,255,255,.1);border-color:white;transform:translateY(-2px);}
        .hero-visual{position:relative;opacity:0;transform:scale(.95);transition:all 1s ease .5s;}
        .hero-visual.visible{opacity:1;transform:scale(1);}
        .hero-image-frame{width:100%;aspect-ratio:4/5;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,.1);}
        .hero-image-frame img{width:100%;height:100%;object-fit:cover;opacity:.85;}
        .hero-badge{position:absolute;bottom:-24px;left:-24px;background:white;border-radius:16px;padding:20px 24px;box-shadow:0 20px 60px rgba(0,0,0,.3);min-width:180px;}
        .hero-badge-num{font-family:'Playfair Display',serif;font-size:36px;font-weight:900;color:var(--royal);}
        .hero-badge-label{font-size:13px;color:#666;font-weight:500;margin-top:2px;}
        .hero-badge-2{position:absolute;top:32px;right:-24px;background:linear-gradient(135deg,var(--royal),var(--purple));color:white;border-radius:16px;padding:16px 20px;box-shadow:0 20px 60px rgba(30,58,138,.4);}
        .hero-badge-2-text{font-size:14px;font-weight:600;}
        .hero-badge-2-sub{font-size:12px;opacity:.7;margin-top:2px;}

        .section-label{font-size:12px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--gold);margin-bottom:16px;display:flex;align-items:center;gap:12px;}
        .section-label::before{content:'';display:block;width:32px;height:2px;background:var(--gold);border-radius:2px;}
        .section-title{font-size:clamp(32px,4vw,52px);font-weight:900;line-height:1.1;color:var(--dark);margin-bottom:20px;}
        .section-subtitle{font-size:17px;color:#666;line-height:1.7;max-width:560px;font-weight:300;}

        .mission-section{background:var(--royal);padding:100px 48px;position:relative;overflow:hidden;}
        .mission-section::before{content:'"';position:absolute;font-family:'Playfair Display',serif;font-size:600px;color:rgba(255,255,255,.03);top:-100px;left:-50px;line-height:1;pointer-events:none;}
        .mission-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
        .mission-quote{font-family:'Playfair Display',serif;font-size:clamp(22px,2.5vw,36px);color:white;line-height:1.4;font-style:italic;}
        .mission-quote-mark{font-size:80px;color:var(--gold);line-height:.5;display:block;margin-bottom:16px;}
        .mission-body{color:rgba(255,255,255,.8);font-size:16px;line-height:1.8;font-weight:300;}
        .mission-pills{display:flex;flex-wrap:wrap;gap:10px;margin-top:32px;}
        .pill{background:rgba(212,160,23,.15);border:1px solid rgba(212,160,23,.35);color:var(--gold-light);border-radius:100px;padding:8px 20px;font-size:13px;font-weight:500;}

        .programs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:60px;}
        .program-card{background:white;border-radius:20px;padding:36px 32px;position:relative;overflow:hidden;transition:transform .3s,box-shadow .3s;border:1px solid rgba(0,0,0,.06);}
        .program-card:hover{transform:translateY(-6px);box-shadow:0 24px 60px rgba(0,0,0,.12);}
        .program-card-accent{position:absolute;top:0;left:0;right:0;height:4px;border-radius:20px 20px 0 0;}
        .program-icon{font-size:36px;margin-bottom:20px;display:block;}
        .program-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--dark);margin-bottom:12px;line-height:1.25;}
        .program-desc{font-size:14px;color:#777;line-height:1.7;}
        .program-link{margin-top:24px;display:inline-flex;align-items:center;gap:6px;font-size:14px;font-weight:600;text-decoration:none;transition:gap .2s;}
        .program-link:hover{gap:10px;}

        .gallery-section{background:var(--dark);padding:100px 0;}
        .gallery-inner{max-width:1200px;margin:0 auto;padding:0 48px;}
        .gallery-section .section-title{color:white;}
        .gallery-section .section-subtitle{color:rgba(255,255,255,.6);}
        .year-tabs{display:flex;gap:8px;margin-top:48px;flex-wrap:wrap;}
        .year-tab{padding:10px 24px;border-radius:100px;border:2px solid rgba(255,255,255,.15);color:rgba(255,255,255,.5);font-weight:600;font-size:15px;cursor:pointer;transition:all .2s;background:transparent;}
        .year-tab:hover{border-color:rgba(255,255,255,.4);color:rgba(255,255,255,.8);}
        .year-tab.active{background:var(--gold);border-color:var(--gold);color:var(--dark);}
        .gallery-layout{display:grid;grid-template-columns:260px 1fr;gap:32px;margin-top:32px;min-height:500px;}
        .event-list{display:flex;flex-direction:column;gap:8px;}
        .event-item{padding:14px 18px;border-radius:12px;border:1px solid rgba(255,255,255,.08);color:rgba(255,255,255,.6);font-size:14px;font-weight:500;cursor:pointer;transition:all .2s;line-height:1.4;background:transparent;text-align:left;}
        .event-item:hover{background:rgba(255,255,255,.06);color:white;}
        .event-item.active{background:rgba(212,160,23,.15);border-color:rgba(212,160,23,.4);color:var(--gold-light);}
        .gallery-images{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,220px);gap:12px;}
        .gallery-img-wrap{border-radius:16px;overflow:hidden;background:rgba(255,255,255,.05);position:relative;}
        .gallery-img-wrap:first-child{grid-column:1/3;}
        .gallery-img-wrap img{width:100%;height:100%;object-fit:cover;transition:transform .4s;}
        .gallery-img-wrap:hover img{transform:scale(1.04);}
        .gallery-placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;color:rgba(255,255,255,.25);font-size:13px;}
        .gallery-loading{display:flex;align-items:center;justify-content:center;width:100%;height:460px;grid-column:1/-1;color:rgba(255,255,255,.4);font-size:15px;gap:12px;}

        .events-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:32px;margin-top:60px;}
        .event-card{background:white;border-radius:24px;overflow:hidden;border:1px solid rgba(0,0,0,.06);transition:transform .3s,box-shadow .3s;}
        .event-card:hover{transform:translateY(-4px);box-shadow:0 20px 50px rgba(0,0,0,.1);}
        .event-card-img{height:220px;display:flex;align-items:center;justify-content:center;}
        .event-card-body{padding:28px;}
        .event-card-title{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:var(--dark);margin-bottom:10px;}
        .event-card-desc{font-size:14px;color:#777;line-height:1.7;}

        .impact-section{background:linear-gradient(135deg,var(--gold) 0%,#E8B820 100%);padding:100px 48px;}
        .impact-inner{max-width:1200px;margin:0 auto;}
        .impact-section .section-label{color:var(--royal);}
        .impact-section .section-label::before{background:var(--royal);}
        .impact-section .section-title{color:var(--dark);}
        .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:32px;margin-top:60px;}
        .stat-card{background:rgba(255,255,255,.3);backdrop-filter:blur(10px);border-radius:20px;padding:40px 32px;text-align:center;border:1px solid rgba(255,255,255,.4);transition:transform .3s;}
        .stat-card:hover{transform:translateY(-4px);}
        .stat-icon{font-size:40px;margin-bottom:16px;display:block;}
        .stat-number{font-family:'Playfair Display',serif;font-size:52px;font-weight:900;color:var(--dark);line-height:1;margin-bottom:8px;}
        .stat-label{font-size:15px;color:var(--brown);font-weight:600;}

        .involved-section{background:var(--cream);padding:100px 48px;}
        .involved-inner{max-width:1200px;margin:0 auto;}
        .involved-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:60px;}
        .involved-card{background:white;border-radius:20px;padding:40px 28px;text-align:center;border:1px solid rgba(0,0,0,.06);transition:transform .3s,box-shadow .3s;}
        .involved-card:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,0,0,.1);}
        .involved-icon{width:64px;height:64px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:28px;margin:0 auto 20px;}
        .involved-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--dark);margin-bottom:10px;}
        .involved-desc{font-size:14px;color:#888;line-height:1.6;margin-bottom:24px;}
        .btn-involved{display:inline-block;padding:12px 24px;border-radius:100px;font-size:14px;font-weight:700;text-decoration:none;transition:all .2s;}

        .cta-banner{background:var(--royal);padding:100px 48px;text-align:center;position:relative;overflow:hidden;}
        .cta-banner::before{content:'';position:absolute;width:600px;height:600px;border-radius:50%;background:rgba(212,160,23,.08);top:-200px;right:-200px;}
        .cta-banner::after{content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:rgba(124,58,237,.1);bottom:-150px;left:-100px;}
        .cta-inner{max-width:700px;margin:0 auto;position:relative;z-index:1;}
        .cta-banner .section-title{color:white;margin-bottom:20px;}
        .cta-banner .section-subtitle{color:rgba(255,255,255,.7);margin:0 auto 44px;}
        .cta-buttons{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;}
        .btn-gold-solid{background:linear-gradient(135deg,var(--gold),var(--gold-light));color:var(--dark);font-weight:700;font-size:16px;padding:18px 40px;border-radius:100px;text-decoration:none;transition:all .2s;box-shadow:0 4px 24px rgba(212,160,23,.4);}
        .btn-gold-solid:hover{transform:translateY(-2px);box-shadow:0 8px 40px rgba(212,160,23,.6);}
        .btn-white-outline{border:2px solid rgba(255,255,255,.4);color:white;font-weight:600;font-size:16px;padding:16px 36px;border-radius:100px;text-decoration:none;transition:all .2s;}
        .btn-white-outline:hover{background:rgba(255,255,255,.1);border-color:white;}

        @media(max-width:1024px){
          .hero-content{grid-template-columns:1fr;}
          .hero-visual{display:none;}
          .mission-inner{grid-template-columns:1fr;gap:40px;}
          .programs-grid{grid-template-columns:repeat(2,1fr);}
          .gallery-layout{grid-template-columns:1fr;}
          .event-list{flex-direction:row;flex-wrap:wrap;}
          .events-grid{grid-template-columns:1fr;}
          .stats-grid{grid-template-columns:repeat(2,1fr);}
          .involved-grid{grid-template-columns:repeat(2,1fr);}
        }
        @media(max-width:640px){
          .hero-content,.mission-section,.impact-section,.involved-section,.cta-banner{padding-left:24px;padding-right:24px;}
          .gallery-inner{padding:0 24px;}
          .programs-grid,.stats-grid,.involved-grid{grid-template-columns:1fr;}
          .gallery-images{grid-template-columns:repeat(2,1fr);grid-template-rows:auto;}
          .gallery-img-wrap:first-child{grid-column:1/3;}
        }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="hero-bar" />
        <div className="hero-content">
          <div>
            <div className={`hero-label ${heroVisible ? "visible" : ""}`}><span>✦</span> Destiny Helpers Outreach Inc.</div>
            <h1 className={`hero-headline ${heroVisible ? "visible" : ""}`}>Breaking Barriers.<span>Building Brighter Futures.</span></h1>
            <p className={`hero-sub ${heroVisible ? "visible" : ""}`}>Empowering underserved youth and families through mentorship, education, and compassionate community support — one life at a time.</p>
            <div className={`hero-buttons ${heroVisible ? "visible" : ""}`}>
              <a href="/programs" className="btn-gold">Explore Programs ↗</a>
              <a href="/donate-now" className="btn-ghost">Donate Now</a>
              <a href="/volunteer-with-us" className="btn-ghost">Get Involved</a>
            </div>
          </div>
          <div className={`hero-visual ${heroVisible ? "visible" : ""}`}>
            <div className="hero-image-frame">
              {/* TODO: Replace with a real Cloudinary image from your dashboard */}
              <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80" alt="Community youth" />
            </div>
            <div className="hero-badge"><div className="hero-badge-num">500+</div><div className="hero-badge-label">Youth Served</div></div>
            <div className="hero-badge-2"><div className="hero-badge-2-text">Brooklyn, NY</div><div className="hero-badge-2-sub">Serving since 2017</div></div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="mission-section">
        <div className="mission-inner">
          <div>
            <div className="mission-quote">
              <span className="mission-quote-mark">"</span>
              To empower underserved youth and their families to break barriers, discover purpose, and build brighter futures.
            </div>
          </div>
          <div>
            <div className="section-label" style={{ color: "rgba(212,160,23,0.9)" }}>Our Mission</div>
            <p className="mission-body">Destiny Helpers Outreach Inc. is a 501(c)(3) nonprofit rooted in Brooklyn, NY. We serve Black and brown youth, families, and underserved communities through mentorship, education, food security, creative expression, and community-driven programs that transform lives.</p>
            <p className="mission-body" style={{ marginTop: "16px" }}>We believe every young person carries purpose within them — and our work is to help them discover it, nurture it, and share it with the world.</p>
            <div className="mission-pills">
              {["Mentorship", "Education", "Food Security", "Youth Leadership", "Community Care"].map(p => <span key={p} className="pill">{p}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section style={{ padding: "100px 48px", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="section-label">What We Do</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px" }}>
          <h2 className="section-title">Our Programs</h2>
          <a href="/programs" className="btn-gold">View All Programs</a>
        </div>
        <p className="section-subtitle" style={{ marginTop: "16px" }}>Each program is designed to meet youth where they are — and help them grow into who they&apos;re meant to be.</p>
        <div className="programs-grid">
          {programs.map((p) => (
            <div className="program-card" key={p.title}>
              <div className="program-card-accent" style={{ background: p.color }} />
              <span className="program-icon">{p.icon}</span>
              <div className="program-title">{p.title}</div>
              <p className="program-desc">{p.description}</p>
              <a href="/programs" className="program-link" style={{ color: p.color }}>Learn More →</a>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-section">
        <div className="gallery-inner">
          <div className="section-label">Our Journey</div>
          <h2 className="section-title">Community in Action</h2>
          <p className="section-subtitle">Years of impact, memories, and transformation — captured in moments that tell our story.</p>
          <div className="year-tabs">
            {galleryYears.map(({ year }) => (
              <button key={year} className={`year-tab ${activeYear === year ? "active" : ""}`} onClick={() => handleYearChange(year)}>{year}</button>
            ))}
          </div>
          <div className="gallery-layout">
            <div className="event-list">
              {activeYearData?.events.map((event) => (
                <button key={event} className={`event-item ${activeEvent === event ? "active" : ""}`} onClick={() => setActiveEvent(event)}>{event}</button>
              ))}
            </div>
            <div className="gallery-images">
              {galleryLoading ? (
                <div className="gallery-loading">⏳ Loading photos...</div>
              ) : galleryImages.length > 0 ? (
                galleryImages.slice(0, 5).map((img, i) => (
                  <div className="gallery-img-wrap" key={img.public_id}>
                    <img src={img.secure_url} alt={`${activeEvent} ${i + 1}`} loading="lazy" />
                  </div>
                ))
              ) : (
                [0,1,2,3,4].map((i) => (
                  <div className="gallery-img-wrap" key={i}>
                    <div className="gallery-placeholder"><span style={{ fontSize: "28px", opacity: 0.4 }}>📸</span><span style={{ fontSize: "12px" }}>{activeEvent}</span></div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY EVENTS */}
      <section style={{ padding: "100px 48px", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="section-label">Community Events</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px" }}>
          <h2 className="section-title">Serving Our Community</h2>
          <a href="/events" className="btn-gold">See All Events</a>
        </div>
        <p className="section-subtitle" style={{ marginTop: "16px" }}>From holiday giveaways to resource fairs, we show up year-round with love and purpose.</p>
        <div className="events-grid">
          {communityEventCards.map((event) => (
            <div className="event-card" key={event.title}>
              <div className="event-card-img" style={{ background: `linear-gradient(135deg, ${event.gradient})` }}>
                <span style={{ fontSize: "64px" }}>{event.icon}</span>
              </div>
              <div className="event-card-body">
                <div className="event-card-title">{event.title}</div>
                <p className="event-card-desc">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IMPACT */}
      <div className="impact-section">
        <div className="impact-inner" ref={countersRef}>
          <div className="section-label">Our Impact</div>
          <h2 className="section-title">Real Change. Real Numbers.</h2>
          <p className="section-subtitle" style={{ color: "rgba(15,31,77,0.7)" }}>Every number represents a life touched, a family supported, and a community lifted.</p>
          <div className="stats-grid">
            {impactStats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <span className="stat-icon">{stat.icon}</span>
                <div className="stat-number" style={{ transform: countersVisible ? "scale(1)" : "scale(0.8)", opacity: countersVisible ? 1 : 0, transition: "all 0.6s ease" }}>{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GET INVOLVED */}
      <div className="involved-section">
        <div className="involved-inner">
          <div className="section-label">Join Us</div>
          <h2 className="section-title">Get Involved</h2>
          <p className="section-subtitle">There are many ways to support our mission. Every contribution creates ripples of change.</p>
          <div className="involved-grid">
            {[
              { icon: "🙌", title: "Volunteer", desc: "Lend your time and talents to our programs and community events.", label: "Volunteer With Us", href: "/volunteer-with-us", bg: "#EEF2FF", accent: "#1E3A8A" },
              { icon: "🤝", title: "Partner", desc: "Collaborate with us to expand our reach and deepen our community impact.", label: "Partner With Us", href: "/contact", bg: "#FDF4E7", accent: "#D4A017" },
              { icon: "💼", title: "Sponsor", desc: "Support a program or event and help us serve more youth and families.", label: "Sponsor a Program", href: "/contact", bg: "#F5F3FF", accent: "#7C3AED" },
              { icon: "❤️", title: "Donate", desc: "Your gift directly funds mentorship, resources, and community events.", label: "Donate Now", href: "/donate-now", bg: "#FFF7ED", accent: "#6B4F3B" },
            ].map((item) => (
              <div className="involved-card" key={item.title}>
                <div className="involved-icon" style={{ background: item.bg }}>{item.icon}</div>
                <div className="involved-title">{item.title}</div>
                <p className="involved-desc">{item.desc}</p>
                <a href={item.href} className="btn-involved" style={{ background: item.bg, color: item.accent }}>{item.label} →</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="cta-banner">
        <div className="cta-inner">
          <div className="section-label" style={{ justifyContent: "center", color: "rgba(212,160,23,0.9)" }}>Join the Movement</div>
          <h2 className="section-title">Be a Beacon of Hope for Future Generations</h2>
          <p className="section-subtitle">Join us and be part of shaping a future where every young person has the support, tools, and love they deserve.</p>
          <div className="cta-buttons">
            <a href="/donate-now" className="btn-gold-solid">Donate Now</a>
            <a href="/contact" className="btn-white-outline">Connect With Us</a>
          </div>
        </div>
      </section>
    </>
  );
}