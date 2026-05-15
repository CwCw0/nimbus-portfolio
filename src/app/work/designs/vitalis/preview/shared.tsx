"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PreviewBar from "../../PreviewBar";

/* ───── Fonts ───── */
export const FH = "'Playfair Display', Georgia, serif";
export const FB = "'Plus Jakarta Sans', 'Helvetica Neue', sans-serif";

/* ───── Palette ───── */
export const V = {
  bg: "#FAFAF7",
  bgSoft: "#F3F1EC",
  bgDark: "#1B2E2A",
  bgAccent: "#E8F0ED",
  text: "#1B2E2A",
  muted: "#6B7C76",
  dim: "#8A9A94",
  accent: "#3D8B70",
  accentLight: "#D4E8E0",
  warm: "#C4956A",
  border: "#E2DDD5",
  white: "#FFFFFF",
};

/* ───── Path helpers ───── */
const BASE = "/work/designs/vitalis/preview";

const navLinks = [
  { label: "Home", href: BASE },
  { label: "Services", href: `${BASE}/services` },
  { label: "About", href: `${BASE}/about` },
  { label: "Contact", href: `${BASE}/contact` },
];

/* ───── useIsMobile ───── */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 769);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

/* ───── Font Loader ───── */
export function VitalisFonts() {
  return (
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');`}</style>
  );
}

/* ───── VitalisNav ───── */
export function VitalisNav() {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: isMobile ? 44 : 60,
        left: isMobile ? 0 : "50%",
        right: isMobile ? 0 : "auto",
        transform: isMobile ? "none" : "translateX(-50%)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: isMobile ? 0 : 32,
        padding: isMobile ? "12px 20px" : "12px 32px",
        background: "rgba(250,250,247,0.9)",
        backdropFilter: "blur(20px)",
        borderRadius: isMobile ? 0 : 100,
        border: isMobile ? "none" : `1px solid ${V.border}`,
        borderBottom: isMobile ? `1px solid ${V.border}` : undefined,
        boxShadow: isMobile ? "none" : "0 4px 24px rgba(0,0,0,0.04)",
      }}
    >
      {/* Logo */}
      <Link
        href={BASE}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          textDecoration: "none",
          color: V.text,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: V.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: V.white }} />
        </div>
        <span style={{ fontFamily: FH, fontSize: 20, fontWeight: 400, fontStyle: "italic" }}>
          Vitalis
        </span>
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
                color: V.muted,
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = V.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = V.muted)}
            >
              {item.label}
            </Link>
          ))}
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
          <span
            style={{
              width: 22,
              height: 2,
              background: V.text,
              borderRadius: 1,
              transition: "all 0.3s",
              transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
            }}
          />
          <span
            style={{
              width: 22,
              height: 2,
              background: V.text,
              borderRadius: 1,
              transition: "all 0.3s",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              width: 22,
              height: 2,
              background: V.text,
              borderRadius: 1,
              transition: "all 0.3s",
              transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
            }}
          />
        </button>
      )}

      {/* CTA (desktop) */}
      {!isMobile && (
        <Link
          href={`${BASE}/contact`}
          style={{
            padding: "8px 24px",
            background: V.accent,
            color: V.white,
            fontFamily: FB,
            fontSize: 13,
            fontWeight: 600,
            borderRadius: 100,
            cursor: "pointer",
            transition: "transform 0.2s",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Book Now
        </Link>
      )}

      {/* Mobile overlay */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 94,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(250,250,247,0.97)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            zIndex: 99,
          }}
        >
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: FB,
                fontSize: 20,
                fontWeight: 600,
                color: V.text,
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={`${BASE}/contact`}
            onClick={() => setMenuOpen(false)}
            style={{
              padding: "14px 36px",
              background: V.accent,
              color: V.white,
              fontFamily: FB,
              fontSize: 15,
              fontWeight: 600,
              borderRadius: 100,
              textDecoration: "none",
              marginTop: 8,
            }}
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
}

/* ───── VitalisFooter ───── */
export function VitalisFooter() {
  const isMobile = useIsMobile();

  return (
    <>
      <footer
        style={{
          padding: isMobile ? "40px 20px" : "48px",
          background: V.bgDark,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? 28 : 0,
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: V.accent }} />
            <span style={{ fontFamily: FH, fontSize: 18, color: V.white, fontStyle: "italic" }}>
              Vitalis
            </span>
            <span
              style={{
                fontFamily: FB,
                fontSize: 12,
                color: "rgba(255,255,255,0.35)",
                marginLeft: 16,
              }}
            >
              &copy; 2026 Vitalis Wellness Clinic
            </span>
          </div>

          {/* Footer links */}
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {navLinks.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                style={{
                  fontFamily: FB,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = V.accentLight)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              >
                {s.label}
              </Link>
            ))}
            {["Privacy", "Terms"].map((s) => (
              <a
                key={s}
                href="#"
                style={{
                  fontFamily: FB,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = V.accentLight)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

/* ───── VitalisLayout ───── */
export function VitalisLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: V.bg,
        color: V.text,
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <VitalisFonts />
      <PreviewBar />
      <VitalisNav />
      <main style={{ paddingTop: 124 }}>{children}</main>
      <VitalisFooter />
    </div>
  );
}
