"use client";

/**
 * Roast — Shared components (Nav, Footer, Layout, constants)
 * Used across all sub-pages in this template.
 *
 * Fonts: Cormorant Garamond (serif heading, italic) + Karla (body)
 * Palette: Warm earthy cream & coffee tones — editorial magazine feel
 */

import { useEffect, useState } from "react";
import Link from "next/link";

/* ───── Typography ───── */
export const FH = "'Cormorant Garamond', Georgia, serif";
export const FB = "'Karla', 'Helvetica Neue', sans-serif";

/* ───── Palette ───── */
export const R = {
  bg: "#F5F0E8",
  bgDark: "#1C1814",
  bgCard: "#EDE7DB",
  cream: "#FAF6EE",
  text: "#1C1814",
  muted: "#7A7062",
  dim: "#9A9082",
  accent: "#8B4513",
  accentLight: "#D4A574",
  border: "#D8D0C4",
};

export const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Karla:wght@400;500;700&display=swap');`;

/* ───── Grain texture overlay (reusable) ───── */
export const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

/* ───── Path helpers ───── */
const BASE = "/work/designs/roast/preview";

const navLinks = [
  { label: "Home", href: BASE },
  { label: "Coffee", href: `${BASE}/coffee` },
  { label: "Story", href: `${BASE}/story` },
  { label: "Locations", href: `${BASE}/locations` },
  { label: "Contact", href: `${BASE}/contact` },
];

/* ───── useIsMobile ───── */
export function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => { setMobile(window.innerWidth < 769); }, []);
  return mobile;
}

/* ───── GrainOverlay ───── */
export function GrainOverlay({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        backgroundImage: GRAIN_SVG,
        backgroundRepeat: "repeat",
        backgroundSize: "128px",
        pointerEvents: "none",
      }}
    />
  );
}

/* ───── RoastNav ───── */
export function RoastNav({ current }: { current: string }) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "16px 20px" : "18px 48px",
        background: "rgba(28,24,20,0.5)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Logo */}
      <Link href={BASE} style={{ fontFamily: FH, fontSize: 28, fontWeight: 400, fontStyle: "italic", color: R.cream, textDecoration: "none" }}>
        Roast
      </Link>

      {/* Desktop links */}
      {!isMobile && (
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                fontFamily: FB,
                fontSize: 13,
                color: current === item.label ? R.cream : "rgba(250,246,238,0.6)",
                textDecoration: "none",
                fontWeight: current === item.label ? 700 : 500,
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = R.cream)}
              onMouseLeave={(e) => {
                if (current !== item.label) e.currentTarget.style.color = "rgba(250,246,238,0.6)";
              }}
            >
              {item.label}
            </Link>
          ))}
          <span
            style={{
              padding: "10px 24px",
              background: R.accentLight,
              color: R.bgDark,
              fontFamily: FB,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Order Online
          </span>
        </div>
      )}

      {/* Mobile hamburger */}
      {isMobile && (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            padding: 4,
          }}
        >
          <span style={{ width: 22, height: 2, background: R.cream, borderRadius: 1, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none" }} />
          <span style={{ width: 22, height: 2, background: R.cream, borderRadius: 1, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: 22, height: 2, background: R.cream, borderRadius: 1, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none" }} />
        </button>
      )}

      {/* Mobile overlay */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 56,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(28,24,20,0.97)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
            zIndex: 199,
          }}
        >
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: FH,
                fontSize: 28,
                fontStyle: "italic",
                fontWeight: current === item.label ? 600 : 400,
                color: current === item.label ? R.accentLight : R.cream,
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          ))}
          <span
            style={{
              padding: "14px 36px",
              background: R.accentLight,
              color: R.bgDark,
              fontFamily: FB,
              fontSize: 14,
              fontWeight: 700,
              marginTop: 12,
            }}
          >
            Order Online
          </span>
        </div>
      )}
    </nav>
  );
}

/* ───── RoastFooter ───── */
export function RoastFooter() {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Back to breakdown button */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200 }}>
        <Link
          href="/work/designs/roast"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 20px",
            background: R.accent,
            color: R.cream,
            fontFamily: FB,
            fontSize: 12,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          ← Breakdown
        </Link>
      </div>

      <footer
        style={{
          padding: isMobile ? "48px 20px" : "60px 48px",
          background: R.bgDark,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <GrainOverlay opacity={0.03} />
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr 1fr",
            gap: isMobile ? 32 : 24,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Brand */}
          <div>
            <span style={{ fontFamily: FH, fontSize: 32, fontStyle: "italic", color: R.cream, display: "block", marginBottom: 12 }}>Roast</span>
            <p style={{ fontFamily: FB, fontSize: 13, color: "rgba(250,246,238,0.4)", lineHeight: 1.7, maxWidth: 220 }}>
              Specialty coffee roasted with intention. Farm to cup, every step matters.
            </p>
          </div>

          {/* Pages */}
          <div>
            <span style={{ fontFamily: FB, fontSize: 11, letterSpacing: 3, color: R.accentLight, fontWeight: 700, display: "block", marginBottom: 16 }}>PAGES</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} style={{ fontFamily: FB, fontSize: 13, color: "rgba(250,246,238,0.45)", textDecoration: "none", transition: "color 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = R.cream)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,246,238,0.45)")}
                >{link.label}</Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <span style={{ fontFamily: FB, fontSize: 11, letterSpacing: 3, color: R.accentLight, fontWeight: 700, display: "block", marginBottom: 16 }}>FOLLOW</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Instagram", "Twitter", "Facebook", "TikTok"].map((s) => (
                <a key={s} href="#" style={{ fontFamily: FB, fontSize: 13, color: "rgba(250,246,238,0.45)", textDecoration: "none", transition: "color 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = R.cream)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,246,238,0.45)")}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <span style={{ fontFamily: FB, fontSize: 11, letterSpacing: 3, color: R.accentLight, fontWeight: 700, display: "block", marginBottom: 16 }}>HOURS</span>
            <p style={{ fontFamily: FB, fontSize: 13, color: "rgba(250,246,238,0.45)", lineHeight: 1.7 }}>
              Mon — Fri: 7am – 6pm<br />
              Sat — Sun: 8am – 5pm
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            borderTop: "1px solid rgba(250,246,238,0.08)",
            paddingTop: 24,
            marginTop: 48,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            position: "relative",
            zIndex: 1,
          }}
        >
          <span style={{ fontFamily: FB, fontSize: 12, color: "rgba(250,246,238,0.25)" }}>&copy; 2026 Roast Coffee Co. All rights reserved.</span>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy", "Terms", "Accessibility"].map((s) => (
              <a key={s} href="#" style={{ fontFamily: FB, fontSize: 11, color: "rgba(250,246,238,0.25)", textDecoration: "none" }}>{s}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

/* ───── RoastLayout ───── */
export function RoastLayout({ children, current }: { children: React.ReactNode; current: string }) {
  return (
    <div style={{ background: R.bg, color: R.text, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{FONT_IMPORT}</style>
      <RoastNav current={current} />
      {children}
      <RoastFooter />
    </div>
  );
}
