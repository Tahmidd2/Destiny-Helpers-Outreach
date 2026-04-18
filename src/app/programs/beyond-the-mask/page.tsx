"use client"

import Link from "next/link"
import { useEffect, useMemo, useState, type CSSProperties } from "react"

type CloudinaryImage = {
  public_id: string
  secure_url: string
  width: number
  height: number
}

const fallbackImages = {
  hero:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80&fit=crop&auto=format",
  educators:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80&fit=crop&auto=format",
  brotherhood:
    "https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?w=1200&q=80&fit=crop&auto=format",
  community:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80&fit=crop&auto=format",
}

const programCards = [
  {
    icon: "👩🏽‍🏫",
    accentClass: "program-card-teal",
    buttonClass: "program-button-teal",
    title: "Emotional Awareness for Educators",
    tagline: "Restoring the heart of those who serve others.",
    audience: ["Teachers", "School Staff", "Administrators", "Youth Workers"],
    description:
      "Educators carry more than lesson plans — they carry the emotional weight of their students, classrooms, and communities. This experience creates a restorative space for staff to pause, reflect, and reconnect.",
    outcomes: [
      "Increased emotional awareness",
      "Reduced stress through reflection",
      "Stronger staff connection",
      "Improved school culture",
    ],
    bestFor: ["PD Days", "Teacher Appreciation Month", "Wellness Initiatives"],
    cta: "Book for Your School",
    href: "#booking",
  },
  {
    icon: "🖤",
    accentClass: "program-card-gold",
    buttonClass: "program-button-gold",
    title: "Beyond the Mask: Brotherhood Edition",
    tagline: "Helping young men express, connect, and rise beyond expectations.",
    audience: ["Middle School", "High School", "Mentorship Programs", "Community Groups"],
    description:
      "Too often, young men are taught to hide what they feel. Brotherhood Edition creates a safe and empowering space where young men explore who they are beyond expectations and connect with mentors who see them.",
    outcomes: [
      "Increased self-expression",
      "Strengthened mentor relationships",
      "Improved confidence and identity",
      "Healthier emotional processing",
    ],
    bestFor: ["Schools", "After-School Programs", "Mentorship Initiatives"],
    cta: "Bring This to Your School",
    href: "#booking",
  },
  {
    icon: "🌍",
    accentClass: "program-card-brown",
    buttonClass: "program-button-brown",
    title: "Identity & Emotional Wellness Experience",
    tagline: "A space to be seen, heard, and understood.",
    audience: ["Community Orgs", "Families", "Youth Programs", "Corporate Wellness"],
    description:
      "We all wear masks — shaped by roles and expectations. This experience invites participants to explore the difference between how they show up and what they truly feel inside.",
    outcomes: [
      "Increased self-awareness",
      "Stronger communication",
      "Deeper connection",
      "Emotional clarity",
    ],
    bestFor: ["Community Centers", "Retreats", "Wellness Events", "Workshops"],
    cta: "Partner With Us",
    href: "#booking",
  },
]

const steps = [
  {
    icon: "🎭",
    title: "Explore",
    description: "Uncover what you carry beneath the surface",
  },
  {
    icon: "💬",
    title: "Express",
    description: "Share in a safe, guided environment",
  },
  {
    icon: "🔗",
    title: "Connect",
    description: "Build authentic relationships",
  },
  {
    icon: "🌱",
    title: "Grow",
    description: "Leave with clarity and renewed purpose",
  },
]

const testimonials = [
  {
    quote:
      "Beyond the Mask created a restorative pause for our staff. It gave us language for what we were carrying and space to reconnect with why we serve.",
    name: "School Wellness Lead",
    role: "Brooklyn Public School",
  },
  {
    quote:
      "I didn’t feel judged. I felt heard. It helped me realize I can talk about what I feel and still be strong.",
    name: "Student Participant",
    role: "Brotherhood Edition",
  },
  {
    quote:
      "Our families and youth left feeling seen, grounded, and connected. It was thoughtful, healing, and beautifully facilitated.",
    name: "Community Program Coordinator",
    role: "Youth & Family Partner",
  },
]

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.9 1.35a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 6.25A5.75 5.75 0 1 1 6.25 12 5.76 5.76 0 0 1 12 6.25Zm0 1.5A4.25 4.25 0 1 0 16.25 12 4.25 4.25 0 0 0 12 7.75Z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.24-1.46 1.49-1.46H16.7V4.96A23.7 23.7 0 0 0 14.1 4.8c-2.57 0-4.35 1.57-4.35 4.45V11H7v3h2.75v8h3.75Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.3 6.94 1.97 1.97 0 0 0 5.25 3Zm15.19 9.88c0-3.28-1.75-4.81-4.1-4.81a3.56 3.56 0 0 0-3.2 1.76V8.5H9.76c.04.88 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.13-.92a1.86 1.86 0 0 1 1.74-1.24c1.23 0 1.72.93 1.72 2.3V20h3.38Z" />
      </svg>
    ),
  },
]

function getImageUrl(images: CloudinaryImage[], index: number, fallback: string) {
  return images[index]?.secure_url || fallback
}

export default function BeyondTheMaskPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [navSolid, setNavSolid] = useState(false)
  const [cloudinaryImages, setCloudinaryImages] = useState<CloudinaryImage[]>([])
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [pauseTestimonials, setPauseTestimonials] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [statsAnimated, setStatsAnimated] = useState(false)
  const [stats, setStats] = useState({ pathways: 0, ageRange: 0, formats: 0 })

  useEffect(() => {
    fetch(`/api/cloudinary?folder=${encodeURIComponent("Pics/Videos/2026/Beyond The Mask")}`)
      .then((response) => response.json())
      .then((data) => setCloudinaryImages(data.images || []))
      .catch(() => setCloudinaryImages([]))
  }, [])

  useEffect(() => {
    const handleScroll = () => setNavSolid(window.scrollY > 30)
    const mediaQuery = window.matchMedia("(max-width: 767px)")
    const updateMobile = () => setIsMobile(mediaQuery.matches)

    handleScroll()
    updateMobile()

    window.addEventListener("scroll", handleScroll)
    mediaQuery.addEventListener("change", updateMobile)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      mediaQuery.removeEventListener("change", updateMobile)
    }
  }, [])

  useEffect(() => {
    if (!isMobile || pauseTestimonials) {
      return
    }

    const interval = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length)
    }, 3000)

    return () => window.clearInterval(interval)
  }, [isMobile, pauseTestimonials])

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
    const statsSection = document.querySelector<HTMLElement>("[data-stats-section]")

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18 }
    )

    revealElements.forEach((element) => revealObserver.observe(element))

    let statsFrame = 0

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || statsAnimated) {
            return
          }

          setStatsAnimated(true)
          const duration = 1200
          const startTime = performance.now()

          const animate = (timestamp: number) => {
            const progress = Math.min((timestamp - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)

            setStats({
              pathways: Math.round(3 * eased),
              ageRange: Math.round(12 * eased),
              formats: Math.round(2 * eased),
            })

            if (progress < 1) {
              statsFrame = window.requestAnimationFrame(animate)
            }
          }

          statsFrame = window.requestAnimationFrame(animate)
          statsObserver.disconnect()
        })
      },
      { threshold: 0.35 }
    )

    if (statsSection) {
      statsObserver.observe(statsSection)
    }

    return () => {
      revealObserver.disconnect()
      statsObserver.disconnect()
      window.cancelAnimationFrame(statsFrame)
    }
  }, [statsAnimated])

  const imageSet = useMemo(
    () => ({
      hero: getImageUrl(cloudinaryImages, 0, fallbackImages.hero),
      educators: getImageUrl(cloudinaryImages, 1, fallbackImages.educators),
      brotherhood: getImageUrl(cloudinaryImages, 2, fallbackImages.brotherhood),
      community: getImageUrl(cloudinaryImages, 3, fallbackImages.community),
    }),
    [cloudinaryImages]
  )

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        :root {
          --color-black: #1C1C1C;
          --color-gold: #C8A96A;
          --color-brown: #6B4F3B;
          --color-cream: #F5F1E8;
          --color-teal: #4A7C7A;
          --color-navy: #1F2A44;
          --surface-white: #FFFCF6;
          --muted-text: #675E54;
          --shadow-soft: 0 18px 40px rgba(20, 20, 20, 0.08);
          --shadow-deep: 0 28px 70px rgba(20, 20, 20, 0.16);
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          color: var(--color-black);
          background: var(--color-cream);
        }

        img {
          max-width: 100%;
          display: block;
        }

        a,
        button {
          -webkit-tap-highlight-color: transparent;
        }

        .mask-page {
          overflow-x: hidden;
          background: var(--color-cream);
        }

        .shell {
          width: min(1180px, calc(100% - 2.5rem));
          margin: 0 auto;
        }

        .section {
          padding: clamp(4.5rem, 7vw, 7rem) 0;
        }

        .heading-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 1rem;
        }

        .heading-eyebrow::before {
          content: "";
          width: 2.5rem;
          height: 1px;
          background: currentColor;
        }

        .display-title,
        .section-title,
        .card-title,
        .step-title,
        .stat-value,
        .testimonial-title,
        .footer-logo {
          font-family: 'Playfair Display', serif;
        }

        .section-title {
          font-size: clamp(2.2rem, 4vw, 3.7rem);
          line-height: 1.08;
          margin: 0;
          color: var(--color-black);
        }

        .section-copy {
          font-size: clamp(1rem, 1.4vw, 1.08rem);
          line-height: 1.8;
          color: var(--muted-text);
        }

        .button-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .button,
        .nav-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 0.95rem 1.45rem;
          border-radius: 999px;
          border: 1px solid transparent;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 700;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
          cursor: pointer;
        }

        .button:hover,
        .nav-cta:hover {
          transform: scale(1.03);
        }

        .button:focus-visible,
        .nav-link:focus-visible,
        .nav-cta:focus-visible,
        .mobile-toggle:focus-visible,
        .social-link:focus-visible,
        .carousel-dot:focus-visible {
          outline: 3px solid rgba(200, 169, 106, 0.45);
          outline-offset: 3px;
        }

        .button-gold,
        .nav-cta {
          background: var(--color-gold);
          color: var(--color-black);
          box-shadow: 0 10px 30px rgba(200, 169, 106, 0.24);
        }

        .button-outline-gold {
          border-color: rgba(200, 169, 106, 0.85);
          color: var(--color-gold);
          background: transparent;
        }

        .button-outline-cream {
          border-color: rgba(245, 241, 232, 0.7);
          color: var(--color-cream);
          background: transparent;
        }

        .button-outline-navy {
          border-color: rgba(31, 42, 68, 0.22);
          color: var(--color-navy);
          background: transparent;
        }

        .button-teal {
          background: var(--color-teal);
          color: white;
        }

        .button-brown {
          background: var(--color-brown);
          color: white;
        }

        .navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          transition: background 0.25s ease, box-shadow 0.25s ease, backdrop-filter 0.25s ease;
        }

        .navbar.is-solid {
          background: rgba(28, 28, 28, 0.82);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
          backdrop-filter: blur(12px);
        }

        .nav-shell {
          width: min(1240px, calc(100% - 2rem));
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 88px;
          gap: 1rem;
        }

        .nav-logo {
          text-decoration: none;
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.35rem, 2vw, 1.75rem);
          font-weight: 700;
          letter-spacing: 0.02em;
          color: var(--color-gold);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.4rem;
        }

        .nav-link {
          color: var(--color-cream);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .nav-link:hover {
          color: var(--color-gold);
        }

        .mobile-toggle {
          display: none;
          width: 48px;
          height: 48px;
          border-radius: 999px;
          border: 1px solid rgba(245, 241, 232, 0.22);
          background: rgba(255, 255, 255, 0.08);
          color: var(--color-cream);
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .mobile-toggle span,
        .mobile-toggle span::before,
        .mobile-toggle span::after {
          display: block;
          width: 18px;
          height: 2px;
          border-radius: 99px;
          background: currentColor;
          position: relative;
          transition: transform 0.2s ease, opacity 0.2s ease;
          content: "";
        }

        .mobile-toggle span::before {
          position: absolute;
          top: -6px;
        }

        .mobile-toggle span::after {
          position: absolute;
          top: 6px;
        }

        .mobile-toggle.is-open span {
          background: transparent;
        }

        .mobile-toggle.is-open span::before {
          transform: translateY(6px) rotate(45deg);
        }

        .mobile-toggle.is-open span::after {
          transform: translateY(-6px) rotate(-45deg);
        }

        .mobile-drawer {
          display: none;
        }

        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          background-size: cover;
          background-position: center;
        }

        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(rgba(28, 28, 28, 0.74), rgba(28, 28, 28, 0.74));
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          width: min(920px, calc(100% - 2rem));
          padding: 6rem 0 5rem;
        }

        .display-title {
          margin: 0;
          font-size: clamp(3.2rem, 9vw, 6.5rem);
          line-height: 0.94;
          color: var(--color-gold);
        }

        .hero-subtitle {
          margin: 1.25rem auto 0;
          max-width: 850px;
          font-size: clamp(1.45rem, 3vw, 2rem);
          line-height: 1.3;
          color: var(--color-cream);
          font-family: 'Playfair Display', serif;
          font-weight: 600;
        }

        .hero-copy {
          margin: 1.5rem auto 0;
          max-width: 760px;
          font-size: clamp(1rem, 1.7vw, 1.15rem);
          line-height: 1.8;
          color: rgba(245, 241, 232, 0.9);
        }

        .hero-actions {
          justify-content: center;
          margin-top: 2.2rem;
        }

        .scroll-indicator {
          position: absolute;
          left: 50%;
          bottom: 2rem;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          border-radius: 999px;
          border: 1px solid rgba(245, 241, 232, 0.24);
          background: rgba(255, 255, 255, 0.06);
          color: var(--color-cream);
          text-decoration: none;
          animation: floatArrow 2s ease-in-out infinite;
        }

        @keyframes floatArrow {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }

        .quote-banner {
          background: var(--color-navy);
          color: var(--color-cream);
          text-align: center;
          padding: 2.6rem 0;
        }

        .quote-rule {
          width: min(720px, 82%);
          height: 1px;
          margin: 0 auto;
          background: rgba(200, 169, 106, 0.78);
        }

        .quote-text {
          width: min(900px, calc(100% - 2rem));
          margin: 1.4rem auto;
          font-size: clamp(1.18rem, 2.1vw, 1.6rem);
          line-height: 1.8;
          font-style: italic;
          color: #f4e2bb;
          font-family: 'Playfair Display', serif;
        }

        .programs-header {
          text-align: center;
          margin-bottom: 3.4rem;
        }

        .programs-title {
          color: var(--color-gold);
        }

        .programs-subtitle {
          margin-top: 1rem;
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--muted-text);
        }

        .program-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.6rem;
        }

        .program-card {
          position: relative;
          background: var(--surface-white);
          border-radius: 26px;
          padding: 1.55rem 1.5rem 1.65rem;
          box-shadow: var(--shadow-soft);
          border: 1px solid rgba(31, 42, 68, 0.08);
          transition: transform 0.24s ease, box-shadow 0.24s ease;
          overflow: hidden;
        }

        .program-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-deep);
        }

        .program-accent {
          position: absolute;
          inset: 0 0 auto 0;
          height: 6px;
        }

        .program-card-teal .program-accent {
          background: var(--color-teal);
        }

        .program-card-gold .program-accent {
          background: var(--color-gold);
        }

        .program-card-brown .program-accent {
          background: var(--color-brown);
        }

        .program-icon {
          margin-top: 1rem;
          font-size: 2rem;
        }

        .card-title {
          margin: 1rem 0 0;
          font-size: clamp(1.7rem, 2vw, 2rem);
          line-height: 1.15;
          color: var(--color-black);
        }

        .card-tagline {
          margin-top: 0.65rem;
          font-size: 1rem;
          line-height: 1.7;
          font-style: italic;
          color: var(--muted-text);
        }

        .pill-row,
        .tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          margin-top: 1rem;
        }

        .pill,
        .tag {
          display: inline-flex;
          align-items: center;
          min-height: 36px;
          padding: 0.45rem 0.8rem;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .pill {
          background: rgba(31, 42, 68, 0.06);
          color: var(--color-navy);
        }

        .tag {
          background: rgba(200, 169, 106, 0.12);
          color: var(--color-brown);
        }

        .program-description {
          margin-top: 1.2rem;
          font-size: 0.98rem;
          line-height: 1.85;
          color: var(--muted-text);
        }

        .program-outcomes {
          margin: 1.3rem 0 0;
          padding: 0;
          list-style: none;
        }

        .program-outcomes li {
          position: relative;
          padding-left: 1.55rem;
          margin-top: 0.75rem;
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--color-black);
        }

        .program-outcomes li::before {
          content: "✓";
          position: absolute;
          left: 0;
          top: 0.05rem;
          color: var(--color-gold);
          font-weight: 800;
        }

        .program-footer {
          margin-top: 1.45rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .program-best-for {
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-brown);
        }

        .program-button {
          width: fit-content;
          min-width: 200px;
        }

        .program-button-teal {
          background: var(--color-teal);
          color: white;
        }

        .program-button-gold {
          background: var(--color-gold);
          color: var(--color-black);
        }

        .program-button-brown {
          background: var(--color-brown);
          color: white;
        }

        .expect-section {
          background: var(--color-cream);
        }

        .expect-header {
          text-align: center;
          margin-bottom: 3.2rem;
        }

        .steps {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1.2rem;
        }

        .steps::before {
          content: "";
          position: absolute;
          left: 12%;
          right: 12%;
          top: 42px;
          border-top: 2px dashed rgba(200, 169, 106, 0.7);
        }

        .step {
          position: relative;
          text-align: center;
          padding: 0 0.8rem;
        }

        .step-icon {
          position: relative;
          z-index: 1;
          width: 84px;
          height: 84px;
          margin: 0 auto 1rem;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(200, 169, 106, 0.9), rgba(74, 124, 122, 0.95));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          box-shadow: 0 14px 30px rgba(31, 42, 68, 0.12);
        }

        .step-title {
          margin: 0;
          font-size: 1.65rem;
          color: var(--color-navy);
        }

        .step-copy {
          margin-top: 0.65rem;
          font-size: 0.98rem;
          line-height: 1.7;
          color: var(--muted-text);
        }

        .impact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border-radius: 30px;
          overflow: hidden;
          box-shadow: var(--shadow-soft);
          background: white;
        }

        .impact-image {
          min-height: 520px;
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .impact-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(200, 169, 106, 0.24), rgba(31, 42, 68, 0.18));
        }

        .impact-content {
          padding: clamp(2rem, 5vw, 4rem);
          background: white;
        }

        .impact-overline {
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-gold);
        }

        .impact-stats {
          margin-top: 2rem;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }

        .impact-stat {
          border-radius: 22px;
          padding: 1.1rem 1rem;
          background: rgba(31, 42, 68, 0.04);
          border: 1px solid rgba(31, 42, 68, 0.07);
        }

        .stat-value {
          margin: 0;
          font-size: clamp(2rem, 3vw, 2.8rem);
          color: var(--color-navy);
          line-height: 1;
        }

        .stat-label {
          margin-top: 0.45rem;
          font-size: 0.84rem;
          line-height: 1.5;
          font-weight: 700;
          color: var(--muted-text);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .testimonials-section {
          background: var(--color-navy);
          color: var(--color-cream);
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .testimonials-header .section-title {
          color: var(--color-gold);
        }

        .testimonial-track {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.4rem;
        }

        .testimonial-card {
          background: var(--surface-white);
          color: var(--color-black);
          border-radius: 26px;
          padding: 1.7rem;
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.18);
        }

        .testimonial-stars {
          color: var(--color-gold);
          letter-spacing: 0.1em;
          font-size: 1rem;
        }

        .testimonial-text {
          margin-top: 1rem;
          font-size: 1rem;
          line-height: 1.9;
          color: var(--muted-text);
        }

        .testimonial-name {
          margin-top: 1.35rem;
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--color-navy);
        }

        .testimonial-role {
          margin-top: 0.35rem;
          font-size: 0.88rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-brown);
        }

        .testimonial-dots {
          display: none;
        }

        .cta-section {
          background: linear-gradient(135deg, var(--color-black), var(--color-navy));
          color: white;
          text-align: center;
        }

        .cta-section .section-title {
          color: var(--color-gold);
        }

        .cta-copy {
          width: min(720px, 100%);
          margin: 1.2rem auto 0;
          color: rgba(245, 241, 232, 0.88);
          font-size: 1.02rem;
          line-height: 1.85;
        }

        .cta-actions {
          justify-content: center;
          margin-top: 2rem;
        }

        .footer {
          background: #111111;
          color: rgba(245, 241, 232, 0.82);
          padding-top: 3.5rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.9fr 0.9fr 1fr;
          gap: 1.8rem;
          padding-bottom: 2.6rem;
        }

        .footer-logo {
          font-size: 1.75rem;
          color: var(--color-gold);
          margin: 0 0 0.9rem;
        }

        .footer-tagline,
        .footer-copy,
        .footer-note,
        .footer-contact a,
        .footer-contact span {
          font-size: 0.96rem;
          line-height: 1.8;
          color: rgba(245, 241, 232, 0.72);
        }

        .footer-heading {
          margin: 0 0 1rem;
          font-size: 0.86rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-gold);
          font-weight: 800;
        }

        .footer-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.75rem;
        }

        .footer-list a,
        .footer-contact a {
          text-decoration: none;
          color: rgba(245, 241, 232, 0.78);
        }

        .social-row {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.15rem;
        }

        .social-link {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(245, 241, 232, 0.16);
          background: rgba(255, 255, 255, 0.05);
          color: var(--color-cream);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .social-link:hover {
          transform: translateY(-2px);
          border-color: rgba(200, 169, 106, 0.72);
        }

        .social-link svg {
          width: 18px;
          height: 18px;
          fill: currentColor;
        }

        .footer-bottom {
          border-top: 1px solid rgba(245, 241, 232, 0.12);
          padding: 1.2rem 0 1.5rem;
          text-align: center;
          font-size: 0.88rem;
          color: rgba(245, 241, 232, 0.56);
        }

        [data-reveal] {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        [data-reveal].is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .button,
          .nav-cta,
          .program-card,
          .social-link,
          [data-reveal],
          .scroll-indicator {
            transition: none;
            animation: none;
          }
        }

        @media (max-width: 1024px) {
          .program-grid,
          .testimonial-track,
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }

          .impact-grid {
            grid-template-columns: 1fr;
          }

          .impact-image {
            min-height: 340px;
          }

          .steps {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            row-gap: 2rem;
          }

          .steps::before {
            display: none;
          }
        }

        @media (max-width: 760px) {
          .nav-links {
            display: none;
          }

          .mobile-toggle {
            display: inline-flex;
          }

          .mobile-drawer {
            display: grid;
            gap: 0.8rem;
            padding: 0 1rem 1rem;
            background: rgba(28, 28, 28, 0.94);
            backdrop-filter: blur(12px);
            border-top: 1px solid rgba(245, 241, 232, 0.08);
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.28s ease, padding-top 0.28s ease;
          }

          .mobile-drawer.is-open {
            max-height: 360px;
            padding-top: 1rem;
          }

          .mobile-drawer a {
            min-height: 44px;
            display: flex;
            align-items: center;
            color: var(--color-cream);
            text-decoration: none;
            font-weight: 600;
          }

          .program-grid,
          .steps,
          .impact-stats,
          .footer-grid {
            grid-template-columns: 1fr;
          }

          .testimonial-viewport {
            overflow: hidden;
          }

          .testimonial-track {
            display: flex;
            gap: 0;
            transform: translateX(calc(var(--slide-index, 0) * -100%));
            transition: transform 0.45s ease;
          }

          .testimonial-card {
            flex: 0 0 100%;
          }

          .testimonial-dots {
            display: flex;
            justify-content: center;
            gap: 0.65rem;
            margin-top: 1.2rem;
          }

          .carousel-dot {
            width: 12px;
            height: 12px;
            border-radius: 999px;
            border: 0;
            background: rgba(245, 241, 232, 0.3);
            cursor: pointer;
          }

          .carousel-dot.is-active {
            background: var(--color-gold);
          }

          .shell,
          .nav-shell {
            width: min(100% - 1.25rem, 100%);
          }

          .section {
            padding: 4.5rem 0;
          }

          .hero-inner {
            padding: 5.5rem 0 4rem;
          }

          .hero-actions,
          .cta-actions {
            flex-direction: column;
          }

          .button,
          .nav-cta {
            width: 100%;
          }
        }
      `}</style>

      <div className="mask-page">
        <nav className={`navbar ${navSolid ? "is-solid" : ""}`} aria-label="Primary">
          <div className="nav-shell">
            <Link href="/programs/beyond-the-mask" className="nav-logo">
              Beyond the Mask™
            </Link>

            <div className="nav-links">
              <Link href="/" className="nav-link">
                Home
              </Link>
              <Link href="/programs" className="nav-link">
                Programs
              </Link>
              <Link href="/about" className="nav-link">
                About
              </Link>
              <a href="#booking" className="nav-link">
                Book Now
              </a>
              <a href="#booking" className="nav-cta">
                Book an Experience
              </a>
            </div>

            <button
              type="button"
              className={`mobile-toggle ${menuOpen ? "is-open" : ""}`}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
            >
              <span />
            </button>
          </div>

          <div className={`mobile-drawer ${menuOpen ? "is-open" : ""}`}>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link href="/programs" onClick={() => setMenuOpen(false)}>
              Programs
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <a href="#booking" onClick={() => setMenuOpen(false)}>
              Book Now
            </a>
            <a href="#booking" className="nav-cta" onClick={() => setMenuOpen(false)}>
              Book an Experience
            </a>
          </div>
        </nav>

        <main>
          <section
            className="hero"
            style={{ backgroundImage: `url(${imageSet.hero})` }}
          >
            <div className="hero-inner" data-reveal>
              <h1 className="display-title">Beyond the Mask™</h1>
              <h2 className="hero-subtitle">
                A Signature Social-Emotional Learning & Wellness Program
              </h2>
              <p className="hero-copy">
                Helping individuals explore what they carry, express what they feel, and
                step into who they&apos;re becoming.
              </p>
              <div className="button-row hero-actions">
                <a href="#programs" className="button button-outline-gold">
                  Explore Our Programs
                </a>
                <a href="#booking" className="button button-gold">
                  Book an Experience
                </a>
              </div>
            </div>

            <a href="#power-statement" className="scroll-indicator" aria-label="Scroll to the next section">
              ↓
            </a>
          </section>

          <section id="power-statement" className="quote-banner">
            <div className="quote-rule" />
            <div className="quote-text">
              Beyond the Mask is not just a workshop — it is a transformative experience
              designed to create safe spaces for reflection, emotional awareness, and
              connection across diverse communities.
            </div>
            <div className="quote-rule" />
          </section>

          <section id="programs" className="section">
            <div className="shell">
              <header className="programs-header" data-reveal>
                <div className="heading-eyebrow" style={{ justifyContent: "center" }}>
                  Signature Pathways
                </div>
                <h2 className="section-title programs-title">Our Programs</h2>
                <p className="programs-subtitle">
                  Three distinct pathways. One transformative mission.
                </p>
              </header>

              <div className="program-grid">
                {programCards.map((card, index) => (
                  <article
                    key={card.title}
                    className={`program-card ${card.accentClass}`}
                    data-reveal
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="program-accent" />
                    <div className="program-icon" aria-hidden="true">
                      {card.icon}
                    </div>
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-tagline">{card.tagline}</p>

                    <div className="pill-row" aria-label={`${card.title} audience types`}>
                      {card.audience.map((item) => (
                        <span key={item} className="pill">
                          {item}
                        </span>
                      ))}
                    </div>

                    <p className="program-description">{card.description}</p>

                    <ul className="program-outcomes">
                      {card.outcomes.map((outcome) => (
                        <li key={outcome}>{outcome}</li>
                      ))}
                    </ul>

                    <div className="program-footer">
                      <div>
                        <div className="program-best-for">Best For</div>
                        <div className="tag-row">
                          {card.bestFor.map((item) => (
                            <span key={item} className="tag">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <a href={card.href} className={`button program-button ${card.buttonClass}`}>
                        {card.cta}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section expect-section">
            <div className="shell">
              <header className="expect-header" data-reveal>
                <div className="heading-eyebrow" style={{ justifyContent: "center" }}>
                  Guided Experience
                </div>
                <h2 className="section-title">What to Expect</h2>
              </header>

              <div className="steps">
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    className="step"
                    data-reveal
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="step-icon" aria-hidden="true">
                      {step.icon}
                    </div>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-copy">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section">
            <div className="shell">
              <div className="impact-grid" data-stats-section>
                <div
                  className="impact-image"
                  style={{ backgroundImage: `url(${imageSet.community})` }}
                  aria-label="Participants in community connection and mentorship moments"
                  role="img"
                />

                <div className="impact-content" data-reveal>
                  <div className="impact-overline">Our Impact</div>
                  <h2 className="section-title" style={{ marginTop: "0.85rem" }}>
                    More Than a Workshop
                  </h2>
                  <p className="section-copy" style={{ marginTop: "1.1rem" }}>
                    Beyond the Mask™ helps schools and organizations create intentional
                    spaces where people can slow down, acknowledge what they carry, and
                    reconnect with themselves and one another.
                  </p>
                  <p className="section-copy">
                    Whether the room is filled with educators, young men, or community
                    members, the experience is designed to honor lived reality while making
                    room for clarity, emotional literacy, and real belonging.
                  </p>

                  <div className="impact-stats">
                    <div className="impact-stat">
                      <p className="stat-value">{stats.pathways}</p>
                      <div className="stat-label">Unique Pathways</div>
                    </div>
                    <div className="impact-stat">
                      <p className="stat-value">{stats.ageRange > 0 ? `K–${stats.ageRange}` : "K–12"}</p>
                      <div className="stat-label">All Ages Welcome</div>
                    </div>
                    <div className="impact-stat">
                      <p className="stat-value">{stats.formats}</p>
                      <div className="stat-label">School & Community Ready</div>
                    </div>
                  </div>

                  <div className="button-row" style={{ marginTop: "2rem" }}>
                    <Link href="/programs" className="button button-outline-navy">
                      See All Programs
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section testimonials-section">
            <div className="shell">
              <header className="testimonials-header" data-reveal>
                <div className="heading-eyebrow" style={{ justifyContent: "center", color: "var(--color-gold)" }}>
                  Shared Reflections
                </div>
                <h2 className="section-title">Voices from the Experience</h2>
              </header>

              <div
                className="testimonial-viewport"
                onMouseEnter={() => setPauseTestimonials(true)}
                onMouseLeave={() => setPauseTestimonials(false)}
              >
                <div
                  className="testimonial-track"
                  style={{ ["--slide-index" as string]: activeTestimonial } as CSSProperties}
                >
                  {testimonials.map((item) => (
                    <article key={item.quote} className="testimonial-card" data-reveal>
                      <div className="testimonial-stars" aria-label="5 out of 5 stars">
                        ★★★★★
                      </div>
                      <p className="testimonial-text">{item.quote}</p>
                      <div className="testimonial-name">{item.name}</div>
                      <div className="testimonial-role">{item.role}</div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="testimonial-dots" aria-label="Testimonial carousel controls">
                {testimonials.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    className={`carousel-dot ${activeTestimonial === index ? "is-active" : ""}`}
                    aria-label={`Show testimonial ${index + 1}`}
                    onClick={() => setActiveTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </section>

          <section id="booking" className="section cta-section">
            <div className="shell" data-reveal>
              <div className="heading-eyebrow" style={{ justifyContent: "center", color: "var(--color-gold)" }}>
                Bring It In
              </div>
              <h2 className="section-title">
                Ready to Bring Beyond the Mask™ to Your Community?
              </h2>
              <p className="cta-copy">
                Whether you&apos;re a school, organization, or community leader — we&apos;ll
                meet you where you are with a grounded, elevated experience designed for the
                people you serve.
              </p>
              <div className="button-row cta-actions">
                <Link href="/contact" className="button button-gold">
                  Book an Experience
                </Link>
                <Link href="/contact" className="button button-outline-cream">
                  Contact Us
                </Link>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="shell footer-grid">
            <div>
              <h2 className="footer-logo">Beyond the Mask™</h2>
              <p className="footer-tagline">
                A safe, grounded, and elevated emotional wellness experience rooted in
                community, reflection, and transformation.
              </p>
              <div className="social-row">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="social-link"
                    aria-label={item.label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="footer-heading">Quick Links</h3>
              <ul className="footer-list">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/programs">Programs</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <a href="#booking">Book Now</a>
                </li>
              </ul>
            </div>

            <div className="footer-contact">
              <h3 className="footer-heading">Contact</h3>
              <div>
                <a href="mailto:info@destinyhelpersoutreach.org">
                  info@destinyhelpersoutreach.org
                </a>
              </div>
              <div>
                <a href="tel:+16313526615">631-352-6615</a>
              </div>
            </div>

            <div>
              <h3 className="footer-heading">About the Program</h3>
              <p className="footer-note">
                A program by Destiny Helpers Outreach Inc. created to support emotional
                awareness, honest reflection, and deeper connection.
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            © 2025 Beyond the Mask™ | All Rights Reserved
          </div>
        </footer>
      </div>
    </>
  )
}
