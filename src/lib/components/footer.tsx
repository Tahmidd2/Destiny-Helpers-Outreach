"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .footer { background: #0F1F4D; font-family: 'DM Sans', sans-serif; }

        .footer-top {
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 60px 48px;
          max-width: 1300px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 48px;
        }

        .footer-brand-logo { height: 64px; width: auto; margin-bottom: 20px; }
        .footer-brand-desc {
          font-size: 14px;
          color: rgba(255,255,255,0.55);
          line-height: 1.8;
          font-weight: 300;
          margin-bottom: 24px;
        }
        .footer-socials { display: flex; gap: 10px; }
        .footer-social-btn {
          width: 38px; height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: all 0.2s;
          font-size: 15px;
        }
        .footer-social-btn:hover {
          background: rgba(212,160,23,0.15);
          border-color: rgba(212,160,23,0.4);
          color: #D4A017;
          transform: translateY(-2px);
        }

        .footer-col-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          color: white;
          margin-bottom: 20px;
          font-weight: 700;
        }
        .footer-col-links { display: flex; flex-direction: column; gap: 10px; }
        .footer-col-link {
          font-size: 14px;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: all 0.2s;
          font-weight: 400;
          display: flex; align-items: center; gap: 6px;
        }
        .footer-col-link:hover { color: #D4A017; padding-left: 4px; }

        .footer-contact-item {
          display: flex; align-items: flex-start; gap: 12px;
          margin-bottom: 16px;
        }
        .footer-contact-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(212,160,23,0.12);
          border: 1px solid rgba(212,160,23,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 15px; flex-shrink: 0;
        }
        .footer-contact-label {
          font-size: 11px; color: rgba(255,255,255,0.35);
          text-transform: uppercase; letter-spacing: 0.1em;
          margin-bottom: 3px; font-weight: 600;
        }
        .footer-contact-value {
          font-size: 14px; color: rgba(255,255,255,0.7);
          text-decoration: none; transition: color 0.2s;
        }
        .footer-contact-value:hover { color: #D4A017; }

        .footer-mid {
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 32px 48px;
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .footer-mid-label {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
        }
        .footer-donate-btn {
          background: linear-gradient(135deg, #D4A017, #F5C842);
          color: #0F1F4D;
          font-weight: 700;
          font-size: 14px;
          padding: 12px 28px;
          border-radius: 100px;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 4px 20px rgba(212,160,23,0.3);
        }
        .footer-donate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(212,160,23,0.5);
        }

        .footer-bottom {
          padding: 20px 48px;
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer-copy {
          font-size: 13px;
          color: rgba(255,255,255,0.3);
        }
        .footer-copy a { color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; }
        .footer-copy a:hover { color: #D4A017; }
        .footer-legal { display: flex; gap: 20px; }
        .footer-legal a {
          font-size: 13px;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-legal a:hover { color: rgba(255,255,255,0.7); }

        .footer-gold-bar {
          height: 4px;
          background: linear-gradient(90deg, #D4A017, #F5C842, #D4A017);
        }

        @media (max-width: 1024px) {
          .footer-top { grid-template-columns: 1fr 1fr; gap: 40px; padding: 48px 24px; }
          .footer-mid { padding: 24px; }
          .footer-bottom { padding: 20px 24px; }
        }
        @media (max-width: 640px) {
          .footer-top { grid-template-columns: 1fr; padding: 40px 24px; }
          .footer-mid { flex-direction: column; align-items: flex-start; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
          .footer-legal { flex-wrap: wrap; gap: 12px; }
        }
      `}</style>

      <footer className="footer">
        {/* Main footer grid */}
        <div className="footer-top">

          {/* Brand col */}
          <div>
            <img src="/Destiny-Helpers-Outreach-Inc.png" alt="Destiny Helpers Outreach Inc" className="footer-brand-logo" />
            <p className="footer-brand-desc">
              Empowering young people and their families to break barriers, discover their purpose, and build brighter futures through mentorship, education, and compassionate community support
            </p>
            <div className="footer-socials">
              <a href="https://x.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="X / Twitter">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="YouTube">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="TikTok">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="footer-col-title">Quick Links</div>
            <div className="footer-col-links">
              <Link href="/" className="footer-col-link">→ Home</Link>
              <Link href="/about" className="footer-col-link">→ About Us</Link>
              <Link href="/programs" className="footer-col-link">→ Programs</Link>
              <Link href="/events" className="footer-col-link">→ Events</Link>
              <Link href="/blogs" className="footer-col-link">→ Blogs</Link>
              <Link href="/help" className="footer-col-link">→ Help</Link>
              <Link href="/volunteer-with-us" className="footer-col-link">→ Volunteer With Us</Link>
              <Link href="/donate-now" className="footer-col-link">→ Donate Now</Link>
            </div>
          </div>

          {/* Programs */}
          <div>
            <div className="footer-col-title">Our Programs</div>
            <div className="footer-col-links">
              <Link href="/programs/beyond-the-mask" className="footer-col-link">→ Beyond The Mask</Link>
              <Link href="/programs/confidence-lens" className="footer-col-link">→ The Confidence Lens Project</Link>
              <Link href="/programs/project-icon" className="footer-col-link">→ Project ICON</Link>
              <Link href="/programs/teen-destiny-changer" className="footer-col-link">→ Mr & Ms Teen Destiny Changer NYC</Link>
              <Link href="/programs/teen-brownsville" className="footer-col-link">→ Ms. Teen Brownsville</Link>
              <Link href="/programs/lets-get-artsy" className="footer-col-link">→ Let's Get Artsy</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-col-title">Contact Us</div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">📞</div>
              <div>
                <div className="footer-contact-label">Call Us</div>
                <a href="tel:+16313526615" className="footer-contact-value">+1 (631) 352-6615</a>
              </div>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">✉️</div>
              <div>
                <div className="footer-contact-label">Email Us</div>
                <a href="mailto:info@destinyhelpersoutreach.org" className="footer-contact-value">info@destinyhelpersoutreach.org</a>
              </div>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">📍</div>
              <div>
                <div className="footer-contact-label">Location</div>
                <span className="footer-contact-value">Brooklyn, NY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Donate CTA strip */}
        <div className="footer-mid">
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "white", fontWeight: 700, marginBottom: "4px" }}>
              Support Our Mission
            </div>
            <div className="footer-mid-label">Every dollar helps us serve more youth and families in Brooklyn.</div>
          </div>
          <a href="/donate-now" className="footer-donate-btn">Donate Now ↗</a>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} Destiny Helpers Outreach Inc. All rights reserved. · 501(c)(3) Nonprofit ·{" "}
          </div>
          <div className="footer-legal">
            <Link href="/privacy-policy" className="footer-legal a">Privacy Policy</Link>
            <Link href="/terms-of-service" className="footer-legal a">Terms of Service</Link>
            <Link href="/contact" className="footer-legal a">Contact</Link>
          </div>
        </div>

        {/* Gold bar */}
        <div className="footer-gold-bar" />
      </footer>
    </>
  );
}