"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import PreviewBar from "../../PreviewBar";

/* ───── Palette ───── */
export const E = {
  bg: "#FFFFFF",
  bgSoft: "#F8FAFC",
  bgDark: "#0F172A",
  text: "#0F172A",
  textMuted: "#64748B",
  textDim: "#94A3B8",
  accent: "#3B82F6",
  accentLight: "#DBEAFE",
  accentGlow: "rgba(59,130,246,0.15)",
  border: "#E2E8F0",
  gradient1: "#3B82F6",
  gradient2: "#8B5CF6",
};

/* ───── Path helpers ───── */
const BASE = "/work/designs/elevate/preview";

const navLinks = [
  { label: "Home", href: BASE },
  { label: "Features", href: `${BASE}/features` },
  { label: "Pricing", href: `${BASE}/pricing` },
  { label: "About", href: `${BASE}/about` },
  { label: "Contact", href: `${BASE}/contact` },
];

/* ───── ElevateNav ───── */
export function ElevateNav() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 769);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "14px 20px" : "14px 48px",
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderBottom: `1px solid ${E.border}`,
      }}
    >
      {/* Logo */}
      <Link
        href={BASE}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
          color: E.text,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
            borderRadius: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontFamily: "Inter, sans-serif",
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          E
        </div>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 17, fontWeight: 700 }}>
          Elevate
        </span>
      </Link>

      {/* Desktop links */}
      {!isMobile && (
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: E.textMuted,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = E.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = E.textMuted)}
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
              background: E.text,
              borderRadius: 1,
              transition: "all 0.3s",
              transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
            }}
          />
          <span
            style={{
              width: 22,
              height: 2,
              background: E.text,
              borderRadius: 1,
              transition: "all 0.3s",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              width: 22,
              height: 2,
              background: E.text,
              borderRadius: 1,
              transition: "all 0.3s",
              transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
            }}
          />
        </button>
      )}

      {/* CTA (desktop only) */}
      {!isMobile && (
        <Link
          href={`${BASE}/contact`}
          style={{
            padding: "8px 20px",
            background: E.text,
            color: "#fff",
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            fontWeight: 600,
            borderRadius: 6,
            cursor: "pointer",
            transition: "transform 0.2s",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          Get Started
        </Link>
      )}

      {/* Mobile overlay */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 59,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255,255,255,0.97)",
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
                fontFamily: "Inter, sans-serif",
                fontSize: 20,
                fontWeight: 600,
                color: E.text,
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
              padding: "12px 32px",
              background: E.text,
              color: "#fff",
              fontFamily: "Inter, sans-serif",
              fontSize: 15,
              fontWeight: 600,
              borderRadius: 8,
              textDecoration: "none",
              marginTop: 8,
            }}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}

/* ───── ElevateFooter ───── */
export function ElevateFooter() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 769);
  }, []);

  return (
    <>
      <footer
        style={{
          padding: isMobile ? "36px 20px" : "48px",
          borderTop: `1px solid ${E.border}`,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? 28 : 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 22,
              height: 22,
              background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
              borderRadius: 5,
            }}
          />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700 }}>
            Elevate
          </span>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              color: E.textDim,
              marginLeft: 16,
            }}
          >
            © 2026 Elevate Inc. All rights reserved.
          </span>
        </div>
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
          {navLinks.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                color: E.textDim,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = E.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = E.textDim)}
            >
              {s.label}
            </Link>
          ))}
          {["Privacy", "Terms"].map((s) => (
            <a
              key={s}
              href="#"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                color: E.textDim,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = E.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = E.textDim)}
            >
              {s}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}

/* ───── ElevateLayout ───── */
export function ElevateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: E.bg,
        color: E.text,
        minHeight: "100vh",
        overflowX: "hidden",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <PreviewBar />
      <ElevateNav />
      <main style={{ paddingTop: 60 }}>{children}</main>
      <ElevateFooter />
    </div>
  );
}
