"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Programs",
    href: "/programs",
    dropdown: [
      { label: "Beyond The Mask", href: "/programs/beyond-the-mask" },
      { label: "The Confidence Lens Project", href: "/programs/confidence-lens" },
      { label: "Project ICON", href: "/programs/project-icon" },
      { label: "Mr & Ms Teen Destiny Changer NYC", href: "/programs/teen-destiny-changer" },
      { label: "Ms. Teen Brownsville", href: "/programs/teen-brownsville" },
      { label: "Let's Get Artsy", href: "/programs/lets-get-artsy" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "About Us", href: "/about" },
  { label: "Blogs", href: "/blogs" },
  { label: "Help", href: "/help" },
  { label: "Donate Now!", href: "/donate-now" },
  { label: "Volunteer With Us!", href: "/volunteer-with-us" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const programs = navLinks.find((l) => l.label === "Programs");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
          background: white;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        .navbar.scrolled {
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        }
        .nav-top {
          border-bottom: 1px solid rgba(0,0,0,0.06);
          padding: 8px 48px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #666;
        }
        .nav-top a { color: #666; text-decoration: none; transition: color 0.2s; }
        .nav-top a:hover { color: #1E3A8A; }
        .nav-main {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .nav-logo img {
          height: 48px;
          width: auto;
        }
        .nav-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 15px;
          color: #1E3A8A;
          font-weight: 700;
          line-height: 1.2;
          max-width: 140px;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: 'DM Sans', sans-serif;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-link-item { position: relative; }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 12px;
          font-size: 14px;
          font-weight: 500;
          color: #333;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s;
          white-space: nowrap;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }
        .nav-link:hover { color: #1E3A8A; background: rgba(30,58,138,0.06); }
        .nav-link.donate { color: #1E3A8A; font-weight: 700; }
        .nav-link.donate:hover { background: rgba(30,58,138,0.08); }
        .nav-link.volunteer { color: #7C3AED; font-weight: 600; }
        .nav-link.volunteer:hover { background: rgba(124,58,237,0.08); }

        /* Programs trigger: link + chevron side by side */
        .programs-trigger {
          display: flex;
          align-items: center;
          gap: 0;
        }
        .programs-link {
          display: flex;
          align-items: center;
          padding: 8px 8px 8px 12px;
          font-size: 14px;
          font-weight: 500;
          color: #333;
          text-decoration: none;
          border-radius: 8px 0 0 8px;
          transition: all 0.2s;
          white-space: nowrap;
          font-family: 'DM Sans', sans-serif;
        }
        .programs-link:hover { color: #1E3A8A; background: rgba(30,58,138,0.06); }
        .programs-chevron-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 8px;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 0 8px 8px 0;
          transition: all 0.2s;
          color: #333;
        }
        .programs-chevron-btn:hover { color: #1E3A8A; background: rgba(30,58,138,0.06); }

        .nav-chevron {
          width: 14px;
          height: 14px;
          transition: transform 0.2s;
        }
        .nav-chevron.open { transform: rotate(180deg); }
        .dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: white;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 16px;
          padding: 8px;
          min-width: 260px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
          opacity: 0;
          transform: translateY(-8px);
          pointer-events: none;
          transition: all 0.2s ease;
        }
        .dropdown.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }
        .dropdown-link {
          display: block;
          padding: 10px 16px;
          font-size: 14px;
          color: #444;
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.15s;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
        }
        .dropdown-link:hover {
          background: rgba(30,58,138,0.06);
          color: #1E3A8A;
          padding-left: 20px;
        }
        .nav-cta {
          background: #D4A017;
          color: #0F1F4D !important;
          font-weight: 700 !important;
          padding: 10px 22px !important;
          border-radius: 100px !important;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }
        .nav-cta:hover {
          background: #E8B820;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(212,160,23,0.4);
          color: #0F1F4D !important;
          background-color: #E8B820 !important;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }
        .hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #1E3A8A;
          border-radius: 2px;
          transition: all 0.3s;
        }
        .mobile-menu {
          display: none;
          flex-direction: column;
          padding: 16px 24px 24px;
          border-top: 1px solid rgba(0,0,0,0.06);
          gap: 2px;
          font-family: 'DM Sans', sans-serif;
        }
        .mobile-menu.open { display: flex; }
        .mobile-link {
          padding: 12px 16px;
          font-size: 15px;
          font-weight: 500;
          color: #333;
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.15s;
        }
        .mobile-link:hover { background: rgba(30,58,138,0.06); color: #1E3A8A; }

        /* Mobile Programs section with toggle */
        .mobile-programs-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 10px;
          transition: all 0.15s;
        }
        .mobile-programs-header:hover { background: rgba(30,58,138,0.06); }
        .mobile-programs-link {
          flex: 1;
          padding: 12px 16px;
          font-size: 15px;
          font-weight: 500;
          color: #333;
          text-decoration: none;
        }
        .mobile-programs-toggle {
          padding: 12px 16px;
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          display: flex;
          align-items: center;
        }
        .mobile-programs-toggle:hover { color: #1E3A8A; }
        .mobile-programs-sub {
          display: flex;
          flex-direction: column;
          gap: 0;
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s ease;
        }
        .mobile-programs-sub.open {
          max-height: 400px;
        }
        .mobile-section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #999;
          padding: 12px 16px 4px;
        }
        .mobile-sub-link {
          padding: 10px 16px 10px 28px;
          font-size: 14px;
          color: #555;
          text-decoration: none;
          border-radius: 8px;
          display: block;
          transition: all 0.15s;
        }
        .mobile-sub-link:hover { background: rgba(30,58,138,0.06); color: #1E3A8A; }
        .mobile-cta {
          margin-top: 12px;
          background: #D4A017;
          color: #0F1F4D;
          font-weight: 700;
          font-size: 15px;
          padding: 14px 24px;
          border-radius: 100px;
          text-align: center;
          text-decoration: none;
          display: block;
        }

        @media (max-width: 1024px) {
          .nav-links { display: none; }
          .nav-top { display: none; }
          .hamburger { display: flex; }
          .nav-main { padding: 0 24px; }
        }
      `}</style>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        {/* Top bar */}
        <div className="nav-top">
          <a href="mailto:info@destinyhelpers.org">info@destinyhelpers.org</a>
          <span>|</span>
          <a href="tel:+1234567890">Brooklyn, NY</a>
          <a href="/sign-in">Sign In</a>
        </div>

        {/* Main nav */}
        <div className="nav-main">
          <Link href="/" className="nav-logo">
            <img src="/Destiny-Helpers-Outreach-Inc.png" alt="Destiny Helpers Outreach" />
          </Link>

          <ul className="nav-links">
            <li className="nav-link-item">
              <Link href="/" className="nav-link">Home</Link>
            </li>

            {/* Programs: link is clickable, chevron toggles dropdown on hover */}
            <li
              className="nav-link-item"
              onMouseEnter={() => setProgramsOpen(true)}
              onMouseLeave={() => setProgramsOpen(false)}
            >
              <div className="programs-trigger">
                <Link href="/programs" className="programs-link">
                  Programs
                </Link>
                <button
                  className="programs-chevron-btn"
                  aria-label="Toggle programs menu"
                  onFocus={() => setProgramsOpen(true)}
                  onBlur={() => setProgramsOpen(false)}
                >
                  <svg
                    className={`nav-chevron ${programsOpen ? "open" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div className={`dropdown ${programsOpen ? "open" : ""}`}>
                {programs?.dropdown?.map((item) => (
                  <Link key={item.href} href={item.href} className="dropdown-link">
                    {item.label}
                  </Link>
                ))}
              </div>
            </li>

            <li><Link href="/events" className="nav-link">Events</Link></li>
            <li><Link href="/about" className="nav-link">About Us</Link></li>
            <li><Link href="/blogs" className="nav-link">Blogs</Link></li>
            <li><Link href="/help" className="nav-link">Help</Link></li>
            <li><Link href="/donate-now" className="nav-link donate">Donate Now!</Link></li>
            <li><Link href="/volunteer-with-us" className="nav-link volunteer">Volunteer With Us!</Link></li>
            <li>
              <Link href="/contact" className="nav-cta">Contact Us</Link>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span style={{ transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
          <Link href="/" className="mobile-link" onClick={() => setMobileOpen(false)}>
            Home
          </Link>

          {/* Mobile Programs with separate link + toggle */}
          <div className="mobile-programs-header">
            <Link
              href="/programs"
              className="mobile-programs-link"
              onClick={() => setMobileOpen(false)}
            >
              Programs
            </Link>
            <button
              className="mobile-programs-toggle"
              onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
              aria-label="Toggle programs submenu"
            >
              <svg
                className={`nav-chevron ${mobileProgramsOpen ? "open" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className={`mobile-programs-sub ${mobileProgramsOpen ? "open" : ""}`}>
            {programs?.dropdown?.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mobile-sub-link"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link href="/events" className="mobile-link" onClick={() => setMobileOpen(false)}>Events</Link>
          <Link href="/about" className="mobile-link" onClick={() => setMobileOpen(false)}>About Us</Link>
          <Link href="/blogs" className="mobile-link" onClick={() => setMobileOpen(false)}>Blogs</Link>
          <Link href="/help" className="mobile-link" onClick={() => setMobileOpen(false)}>Help</Link>
          <Link
            href="/donate-now"
            className="mobile-link"
            onClick={() => setMobileOpen(false)}
            style={{ color: "#1E3A8A", fontWeight: 700 }}
          >
            Donate Now!
          </Link>
          <Link
            href="/volunteer-with-us"
            className="mobile-link"
            onClick={() => setMobileOpen(false)}
            style={{ color: "#7C3AED", fontWeight: 600 }}
          >
            Volunteer With Us!
          </Link>
          <Link href="/contact" className="mobile-cta" onClick={() => setMobileOpen(false)}>
            Contact Us
          </Link>
        </div>
      </nav>

      {/* Spacer so content doesn't hide under fixed nav */}
      <div style={{ height: "108px" }} />
    </>
  );
}