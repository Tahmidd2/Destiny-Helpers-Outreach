"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useMemo, type KeyboardEvent as ReactKeyboardEvent } from "react";

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

interface GalleryProgramData {
  description: string;
  heroImage: string;
  photos: string[];
  folders: string[];
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

const galleryArchive = [
  { year: "2026", events: ["Beyond The Mask", "Medgar Evers Social Work Conference", "The Confidence Lens Project"] },
  { year: "2025", events: ["Back to School Resource Fair", "Non Profit of the Game"] },
  { year: "2024", events: ["EmpowerHer Picnic"] },
  { year: "2023", events: ["Miss Teen Brownsville"] },
  { year: "2022", events: ["Crowned In Her Story 2022", "Kingsborough 6th Walk Food Distribution Nov '22", "Miss Teen Brownsville 2022", "Nourish Your Community 2022", "Winter Wonderland '22"] },
  { year: "2021", events: ["Caribbean Outreach", "Community Engagement Events", "Power In Collaboration Brunch-Fundraiser"] },
  { year: "2020", events: ["Shelter Events"] }, // ← fixed
  { year: "2019", events: ["Miss Teen Brownsville 2019", "Shelter Holiday Giveback"] },
];

const galleryDescriptions: Record<string, string> = {
  "Beyond The Mask": "A transformative SEL & wellness experience.",
  "Medgar Evers Social Work Conference": "Moments of advocacy, learning, and collective care.",
  "The Confidence Lens Project": "Reflection, storytelling, and confidence captured in community.",
  "Back to School Resource Fair": "Students and families supported with joy, supplies, and community resources.",
  "Non Profit of the Game": "Celebrating impact, visibility, and service in the public eye.",
  "EmpowerHer Picnic": "Gathering girls and women for connection, affirmation, and celebration.",
  "Miss Teen Brownsville": "Leadership, confidence, and community pride on full display.",
  "Crowned In Her Story": "Honoring womanhood, transformation, and the power of testimony.",
  "Kingsborough 6th Walk Food Distribution Nov": "Serving families with dignity, nourishment, and practical support.",
  "Nourish Your Community": "Community care in action through food access and compassion.",
  "Winter Wonderland": "Seasonal joy, gifts, and moments of warmth for families.",
  "Caribbean Outreach": "Culture, connection, and outreach rooted in shared heritage.",
  "Community Engagement Events": "Bringing people together through fellowship, support, and belonging.",
  "Power In Collaboration Brunch-Fundraiser": "Building momentum for impact through partnership and generosity.",
  "Shelter Events": "Creating care-filled spaces for families navigating transition.",
  "Shelter Holiday Giveback": "Holiday support offered with love, dignity, and hope.",
};

function normalizeGalleryProgramName(eventName: string) {
  return eventName
    .replace(/\s+\d{4}$/u, "")
    .replace(/\s+'?\d{2}$/u, "")
    .trim();
}

function gallerySlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const GALLERY_DATA = galleryArchive.reduce<Record<string, GalleryProgramData>>((acc, yearBucket) => {
  yearBucket.events.forEach((eventName) => {
    const normalizedName = normalizeGalleryProgramName(eventName);
    const folderPath = `Pics/Videos/${yearBucket.year}/${eventName}`;

    if (!acc[normalizedName]) {
      acc[normalizedName] = {
        description:
          galleryDescriptions[normalizedName] ||
          "Years of service, celebration, and transformation captured in one story.",
        heroImage: "",
        photos: [],
        folders: [],
      };
    }

    if (!acc[normalizedName].folders.includes(folderPath)) {
      acc[normalizedName].folders.push(folderPath);
    }
  });

  return acc;
}, {});

const communityEventCards = [
  { title: "Crowned In Her Story", description: "Empowering women through storytelling and transformation experiences — celebrating every chapter of her journey.", icon: "👑", gradient: "#7C3AED, #1E3A8A" },
  { title: "Back to School Resource Fair", description: "Distributing backpacks filled with school supplies alongside food, music, activities, and resources for families.", icon: "🎒", gradient: "#1E3A8A, #D4A017" },
  { title: "Nourish Your Community", description: "Distributing warm Thanksgiving meals to migrant families and the broader community at key Brooklyn intersections.", icon: "🍽️", gradient: "#6B4F3B, #1E3A8A" },
  { title: "Winter Wonderland", description: "Spreading holiday joy by distributing gifts, food, and winter essentials to families across our community.", icon: "🎁", gradient: "#D4A017, #7C3AED" },
];

// ─── Gallery Hook ─────────────────────────────────────────────────────────────
function useProgramGalleryImages(galleryData: Record<string, GalleryProgramData>) {
  const [imagesByProgram, setImagesByProgram] = useState<Record<string, CloudinaryImage[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadImages() {
      setLoading(true);

      const entries = await Promise.all(
        Object.entries(galleryData).map(async ([programName, programData]) => {
          const folderResults = await Promise.all(
            programData.folders.map(async (folder) => {
              try {
                const response = await fetch(`/api/cloudinary?folder=${encodeURIComponent(folder)}`);
                const data = await response.json();
                return data.images || [];
              } catch {
                return [];
              }
            })
          );

          const combinedImages = folderResults
            .flat()
            .filter(
              (image, index, arr) =>
                arr.findIndex((entry) => entry.public_id === image.public_id) === index
            );

          return [programName, combinedImages] as const;
        })
      );

      if (!mounted) return;

      setImagesByProgram(Object.fromEntries(entries));
      setLoading(false);
    }

    loadImages();

    return () => {
      mounted = false;
    };
  }, [galleryData]);

  return { imagesByProgram, loading };
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function HomePage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [countersVisible, setCountersVisible] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState("All Programs");
  const [galleryPanelVisible, setGalleryPanelVisible] = useState(true);
  const [lightboxProgram, setLightboxProgram] = useState<string | null>(null);
  const [lightboxActiveIndex, setLightboxActiveIndex] = useState<number | null>(null);
  const countersRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const galleryTransitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { imagesByProgram, loading: galleryLoading } = useProgramGalleryImages(GALLERY_DATA);
  const galleryTabs = useMemo(() => ["All Programs", ...Object.keys(GALLERY_DATA)], []);
  const activeGalleryImages =
    activeGalleryTab === "All Programs" ? [] : imagesByProgram[activeGalleryTab] || [];

  useEffect(() => { setHeroVisible(true); }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setCountersVisible(true); }, { threshold: 0.3 });
    if (countersRef.current) observer.observe(countersRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const galleryItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-gallery-item]")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    galleryItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [activeGalleryTab, galleryPanelVisible, imagesByProgram]);

  useEffect(() => {
    if (!lightboxProgram) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dialog = lightboxRef.current;
    const focusableElements = dialog
      ? Array.from(
          dialog.querySelectorAll<HTMLElement>(
            'button, [href], [tabindex]:not([tabindex="-1"])'
          )
        ).filter((element) => !element.hasAttribute("disabled"))
      : [];

    focusableElements[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxProgram(null);
        setLightboxActiveIndex(null);
        return;
      }

      if (lightboxActiveIndex !== null && event.key === "ArrowRight") {
        event.preventDefault();
        const photoCount = (imagesByProgram[lightboxProgram] || []).length;
        setLightboxActiveIndex((current) =>
          current === null ? 0 : (current + 1) % photoCount
        );
        return;
      }

      if (lightboxActiveIndex !== null && event.key === "ArrowLeft") {
        event.preventDefault();
        const photoCount = (imagesByProgram[lightboxProgram] || []).length;
        setLightboxActiveIndex((current) =>
          current === null ? 0 : (current - 1 + photoCount) % photoCount
        );
        return;
      }

      if (event.key !== "Tab" || focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [imagesByProgram, lightboxActiveIndex, lightboxProgram]);

  useEffect(() => {
    return () => {
      if (galleryTransitionTimeoutRef.current) {
        clearTimeout(galleryTransitionTimeoutRef.current);
      }
    };
  }, []);

  const switchGalleryTab = (tab: string) => {
    if (tab === activeGalleryTab) return;

    setGalleryPanelVisible(false);

    if (galleryTransitionTimeoutRef.current) {
      clearTimeout(galleryTransitionTimeoutRef.current);
    }

    galleryTransitionTimeoutRef.current = setTimeout(() => {
      setActiveGalleryTab(tab);
      setGalleryPanelVisible(true);
    }, 150);
  };

  const handleGalleryTabKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

    event.preventDefault();

    let nextIndex = index;

    if (event.key === "ArrowRight") nextIndex = (index + 1) % galleryTabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + galleryTabs.length) % galleryTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = galleryTabs.length - 1;

    tabRefs.current[nextIndex]?.focus();
    switchGalleryTab(galleryTabs[nextIndex]);
  };

  const allProgramsCards = galleryTabs
    .filter((tab) => tab !== "All Programs")
    .map((programName) => ({
      name: programName,
      description: GALLERY_DATA[programName].description,
      image: imagesByProgram[programName]?.[0],
    }));

  const activeLightboxImages = lightboxProgram ? imagesByProgram[lightboxProgram] || [] : [];
  const bentoImages = activeGalleryImages.slice(0, 5);
  const hiddenImageCount = Math.max(activeGalleryImages.length - 5, 0);

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

        .gallery-section{background:var(--dark);padding:100px 0;position:relative;overflow:hidden;}
        .gallery-inner{max-width:1200px;margin:0 auto;padding:0 48px;}
        .gallery-section .section-title{color:white;}
        .gallery-section .section-subtitle{color:rgba(255,255,255,.68);}
        .gallery-tabs-shell{position:relative;margin-top:44px;}
        .gallery-tabs-shell::before,.gallery-tabs-shell::after{content:'';position:absolute;top:0;bottom:0;width:42px;pointer-events:none;opacity:0;transition:opacity .2s;}
        .gallery-tabs-shell::before{left:0;background:linear-gradient(90deg,var(--dark),rgba(15,31,77,0));}
        .gallery-tabs-shell::after{right:0;background:linear-gradient(270deg,var(--dark),rgba(15,31,77,0));}
        .gallery-tabs{display:flex;gap:12px;justify-content:center;overflow-x:auto;scrollbar-width:none;padding-bottom:6px;}
        .gallery-tabs::-webkit-scrollbar{display:none;}
        .gallery-tab{flex:0 0 auto;padding:12px 22px;border-radius:999px;border:1px solid rgba(200,169,106,.65);background:transparent;color:var(--gold);font-size:14px;font-weight:700;cursor:pointer;transition:all .2s ease;}
        .gallery-tab:hover{background:var(--gold);color:#1C1C1C;}
        .gallery-tab.active{background:#C8A96A;color:#1C1C1C;border-color:#C8A96A;}
        .gallery-panel{margin-top:34px;opacity:1;transform:translateY(0);transition:opacity .25s ease,transform .25s ease;min-height:420px;}
        .gallery-panel.is-hidden{opacity:0;transform:translateY(10px);}
        .gallery-all-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;}
        .program-mosaic-card{position:relative;border:none;border-radius:18px;overflow:hidden;aspect-ratio:4/3;cursor:pointer;background:rgba(255,255,255,.05);box-shadow:0 4px 24px rgba(0,0,0,.4);text-align:left;}
        .program-mosaic-card img,.bento-photo img,.lightbox-grid-item img,.lightbox-featured img{width:100%;height:100%;object-fit:cover;transition:transform .3s ease;}
        .program-mosaic-card::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(28,28,28,.08) 0%,rgba(28,28,28,.8) 100%);transition:background .25s ease;}
        .program-mosaic-card:hover::after{background:linear-gradient(180deg,rgba(28,28,28,.02) 0%,rgba(28,28,28,.68) 100%);}
        .program-mosaic-card:hover img,.bento-photo:hover img,.lightbox-grid-item:hover img{transform:scale(1.05);}
        .program-mosaic-copy{position:absolute;left:22px;right:22px;bottom:20px;z-index:2;padding-left:16px;border-left:4px solid #C8A96A;}
        .program-mosaic-name{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:var(--gold);line-height:1.2;margin-bottom:6px;}
        .program-mosaic-desc{font-size:14px;line-height:1.55;color:rgba(249,246,241,.88);}
        .program-mosaic-cta{margin-top:10px;font-size:13px;font-weight:700;color:#F5F1E8;opacity:0;transform:translateY(8px);transition:all .2s ease;}
        .program-mosaic-card:hover .program-mosaic-cta{opacity:1;transform:translateY(0);}
        .gallery-empty{display:flex;align-items:center;justify-content:center;border-radius:18px;border:1px dashed rgba(200,169,106,.35);background:rgba(255,255,255,.04);min-height:260px;color:rgba(255,255,255,.56);font-size:15px;text-align:center;padding:24px;}
        .bento-gallery{display:grid;grid-template-columns:1.35fr .82fr .82fr;grid-template-rows:repeat(3,190px);gap:14px;}
        .bento-photo{position:relative;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.4);background:rgba(255,255,255,.05);}
        .bento-photo-1{grid-column:1/3;grid-row:1/3;}
        .bento-photo-2{grid-column:3/4;grid-row:1/2;}
        .bento-photo-3{grid-column:3/4;grid-row:2/3;}
        .bento-photo-4{grid-column:1/2;grid-row:3/4;}
        .bento-photo-5{grid-column:2/4;grid-row:3/4;}
        .bento-meta{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-bottom:20px;flex-wrap:wrap;}
        .bento-program-title{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:var(--gold);}
        .bento-program-desc{font-size:15px;line-height:1.7;color:rgba(249,246,241,.78);max-width:640px;margin-top:8px;}
        .view-more-btn{padding:12px 20px;border-radius:999px;border:1px solid rgba(200,169,106,.65);background:transparent;color:var(--gold);font-size:14px;font-weight:700;cursor:pointer;transition:all .2s ease;}
        .view-more-btn:hover{background:#C8A96A;color:#1C1C1C;}
        .gallery-lightbox{position:fixed;inset:0;z-index:80;background:rgba(28,28,28,.95);display:flex;align-items:center;justify-content:center;padding:32px;}
        .gallery-lightbox-inner{width:min(1180px,100%);max-height:100%;display:flex;flex-direction:column;gap:22px;outline:none;}
        .lightbox-header{display:flex;align-items:center;justify-content:space-between;gap:16px;color:#F5F1E8;}
        .lightbox-title{font-family:'Playfair Display',serif;font-size:30px;color:var(--gold);}
        .lightbox-close,.lightbox-nav{width:48px;height:48px;border-radius:999px;border:1px solid rgba(245,241,232,.24);background:rgba(255,255,255,.06);color:#F5F1E8;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s ease;}
        .lightbox-close:hover,.lightbox-nav:hover{background:rgba(255,255,255,.14);}
        .lightbox-grid{columns:3 240px;column-gap:14px;overflow:auto;padding-right:4px;}
        .lightbox-grid-item{break-inside:avoid;margin-bottom:14px;border:none;padding:0;background:none;cursor:pointer;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.4);}
        .lightbox-grid-item img{display:block;aspect-ratio:4/3;}
        .lightbox-featured-wrap{display:flex;align-items:center;justify-content:center;gap:18px;}
        .lightbox-featured{flex:1;max-width:900px;border-radius:16px;overflow:hidden;box-shadow:0 18px 48px rgba(0,0,0,.45);background:#111;}
        .lightbox-featured img{max-height:70vh;}
        .lightbox-counter{color:rgba(245,241,232,.76);font-size:14px;}
        @media (prefers-reduced-motion:no-preference){
          .gallery-tab,.program-mosaic-card,.program-mosaic-card::after,.program-mosaic-card img,.program-mosaic-cta,.bento-photo img,.lightbox-grid-item img,.gallery-panel,[data-gallery-item]{transition-duration:.2s;}
          [data-gallery-item]{opacity:0;transform:translateY(22px);transition:opacity .45s ease,transform .45s ease;}
          [data-gallery-item].is-visible{opacity:1;transform:translateY(0);}
        }
        @media (prefers-reduced-motion:reduce){
          .gallery-panel,[data-gallery-item]{transition:none !important;animation:none !important;opacity:1 !important;transform:none !important;}
        }

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
          .gallery-all-grid{grid-template-columns:repeat(2,minmax(0,1fr));}
          .bento-gallery{grid-template-columns:1fr 1fr;grid-template-rows:repeat(4,180px);}
          .bento-photo-1{grid-column:1/3;grid-row:1/3;}
          .bento-photo-2{grid-column:1/2;grid-row:3/4;}
          .bento-photo-3{grid-column:2/3;grid-row:3/4;}
          .bento-photo-4{grid-column:1/2;grid-row:4/5;}
          .bento-photo-5{grid-column:2/3;grid-row:4/5;}
          .events-grid{grid-template-columns:1fr;}
          .stats-grid{grid-template-columns:repeat(2,1fr);}
          .involved-grid{grid-template-columns:repeat(2,1fr);}
        }
        @media(max-width:640px){
          .hero-content,.mission-section,.impact-section,.involved-section,.cta-banner{padding-left:24px;padding-right:24px;}
          .gallery-inner{padding:0 24px;}
          .programs-grid,.stats-grid,.involved-grid{grid-template-columns:1fr;}
          .gallery-tabs{justify-content:flex-start;padding-right:28px;}
          .gallery-tabs-shell::before,.gallery-tabs-shell::after{opacity:1;}
          .gallery-all-grid,.bento-gallery{grid-template-columns:1fr;}
          .bento-gallery{grid-template-rows:none;}
          .bento-photo-1,.bento-photo-2,.bento-photo-3,.bento-photo-4,.bento-photo-5{grid-column:auto;grid-row:auto;aspect-ratio:4/3;}
          .lightbox-grid{columns:1 100%;}
          .lightbox-featured-wrap{gap:10px;}
          .lightbox-nav{width:42px;height:42px;}
        }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="hero-bar" />
        <div className="hero-content">
          <div>

            <div className={`hero-label ${heroVisible ? "visible" : ""}`}><span>✦</span> Destiny Helpers Outreach Inc.</div>
            <h1 className={`hero-headline ${heroVisible ? "visible" : ""}`}>Breaking Barriers.<span>Building Brighter Futures.</span></h1>
            <p className={`hero-sub ${heroVisible ? "visible" : ""}`}>Empowering underserved youth and their families to break barriers, discover purpose, and build brighter futures through mentorship, education, food security, and community-driven programs that transform lives.</p>
            <div className={`hero-buttons ${heroVisible ? "visible" : ""}`}>
              <Link href="/programs" className="btn-gold">Explore Programs ↗</Link>
              <Link href="/donate-now" className="btn-ghost">Donate Now</Link>
              <Link href="/volunteer-with-us" className="btn-ghost">Get Involved</Link>
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
          <Link href="/programs" className="btn-gold">View All Programs</Link>
        </div>
        <p className="section-subtitle" style={{ marginTop: "16px" }}>Each program is designed to meet youth where they are — and help them grow into who they&apos;re meant to be.</p>
        <div className="programs-grid">
          {programs.map((p) => (
            <div className="program-card" key={p.title}>
              <div className="program-card-accent" style={{ background: p.color }} />
              <span className="program-icon">{p.icon}</span>
              <div className="program-title">{p.title}</div>
              <p className="program-desc">{p.description}</p>
              <Link href="/programs" className="program-link" style={{ color: p.color }}>Learn More →</Link>
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
          <div className="gallery-tabs-shell">
            <div className="gallery-tabs" role="tablist" aria-label="Community in Action program tabs">
              {galleryTabs.map((tab, index) => (
                <button
                  key={tab}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  role="tab"
                  aria-selected={activeGalleryTab === tab}
                  aria-controls={`gallery-panel-${gallerySlug(tab)}`}
                  id={`gallery-tab-${gallerySlug(tab)}`}
                  tabIndex={activeGalleryTab === tab ? 0 : -1}
                  className={`gallery-tab ${activeGalleryTab === tab ? "active" : ""}`}
                  onClick={() => switchGalleryTab(tab)}
                  onKeyDown={(event) => handleGalleryTabKeyDown(event, index)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div
            className={`gallery-panel ${galleryPanelVisible ? "" : "is-hidden"}`}
            role="tabpanel"
            id={`gallery-panel-${gallerySlug(activeGalleryTab)}`}
            aria-labelledby={`gallery-tab-${gallerySlug(activeGalleryTab)}`}
          >
            {activeGalleryTab === "All Programs" ? (
              galleryLoading && allProgramsCards.every((card) => !card.image) ? (
                <div className="gallery-empty">Loading program collections...</div>
              ) : (
                <div className="gallery-all-grid">
                  {allProgramsCards.map((programCard, index) => (
                    <button
                      key={programCard.name}
                      type="button"
                      className="program-mosaic-card"
                      onClick={() => switchGalleryTab(programCard.name)}
                      data-gallery-item
                      style={{ transitionDelay: `${index * 60}ms` }}
                    >
                      {programCard.image ? (
                        <img
                          src={programCard.image.secure_url}
                          alt={`${programCard.name} community gallery preview`}
                          loading="lazy"
                        />
                      ) : (
                        <div className="gallery-empty" style={{ minHeight: "100%", border: "none" }}>
                          Photos coming soon
                        </div>
                      )}
                      <div className="program-mosaic-copy">
                        <div className="program-mosaic-name">{programCard.name}</div>
                        <div className="program-mosaic-desc">{programCard.description}</div>
                        <div className="program-mosaic-cta">View Program →</div>
                      </div>
                    </button>
                  ))}
                </div>
              )
            ) : activeGalleryImages.length === 0 && !galleryLoading ? (
              <div className="gallery-empty">Photos for {activeGalleryTab} are being gathered.</div>
            ) : (
              <>
                <div className="bento-meta">
                  <div>
                    <div className="bento-program-title">{activeGalleryTab}</div>
                    <div className="bento-program-desc">{GALLERY_DATA[activeGalleryTab].description}</div>
                  </div>
                  {hiddenImageCount > 0 ? (
                    <button
                      type="button"
                      className="view-more-btn"
                      onClick={() => {
                        setLightboxProgram(activeGalleryTab);
                        setLightboxActiveIndex(null);
                      }}
                    >
                      View More ({hiddenImageCount})
                    </button>
                  ) : null}
                </div>
                <div className="bento-gallery">
                  {bentoImages.map((img, index) => (
                    <button
                      key={img.public_id}
                      type="button"
                      className={`bento-photo bento-photo-${index + 1}`}
                      onClick={() => {
                        setLightboxProgram(activeGalleryTab);
                        setLightboxActiveIndex(index);
                      }}
                      data-gallery-item
                      style={{ transitionDelay: `${index * 60}ms` }}
                    >
                      <img
                        src={img.secure_url}
                        alt={`${activeGalleryTab} community photo ${index + 1}`}
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      {lightboxProgram ? (
        <div className="gallery-lightbox" role="presentation" onClick={() => {
          setLightboxProgram(null);
          setLightboxActiveIndex(null);
        }}>
          <div
            className="gallery-lightbox-inner"
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-label="Photo gallery"
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="lightbox-header">
              <div>
                <div className="lightbox-title">{lightboxProgram}</div>
                <div className="lightbox-counter">
                  {lightboxActiveIndex === null
                    ? `${activeLightboxImages.length} photos`
                    : `${lightboxActiveIndex + 1} of ${activeLightboxImages.length}`}
                </div>
              </div>
              <button
                type="button"
                className="lightbox-close"
                aria-label="Close photo gallery"
                onClick={() => {
                  setLightboxProgram(null);
                  setLightboxActiveIndex(null);
                }}
              >
                ✕
              </button>
            </div>

            {lightboxActiveIndex === null ? (
              <div className="lightbox-grid">
                {activeLightboxImages.map((img, index) => (
                  <button
                    key={img.public_id}
                    type="button"
                    className="lightbox-grid-item"
                    onClick={() => setLightboxActiveIndex(index)}
                  >
                    <img
                      src={img.secure_url}
                      alt={`${lightboxProgram} gallery image ${index + 1}`}
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="lightbox-featured-wrap">
                <button
                  type="button"
                  className="lightbox-nav"
                  aria-label="Previous image"
                  onClick={() =>
                    setLightboxActiveIndex(
                      (lightboxActiveIndex - 1 + activeLightboxImages.length) %
                        activeLightboxImages.length
                    )
                  }
                >
                  ←
                </button>
                <div className="lightbox-featured">
                  <img
                    src={activeLightboxImages[lightboxActiveIndex].secure_url}
                    alt={`${lightboxProgram} featured photo ${lightboxActiveIndex + 1}`}
                  />
                </div>
                <button
                  type="button"
                  className="lightbox-nav"
                  aria-label="Next image"
                  onClick={() =>
                    setLightboxActiveIndex(
                      (lightboxActiveIndex + 1) % activeLightboxImages.length
                    )
                  }
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* COMMUNITY EVENTS */}
      <section style={{ padding: "100px 48px", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="section-label">Community Events</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px" }}>
          <h2 className="section-title">Serving Our Community</h2>
          <Link href="/events" className="btn-gold">See All Events</Link>
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
                <Link href={item.href} className="btn-involved" style={{ background: item.bg, color: item.accent }}>{item.label} →</Link>
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
            <Link href="/donate-now" className="btn-gold-solid">Donate Now</Link>
            <Link href="/contact" className="btn-white-outline">Connect With Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
