"use client";

/**
 * MONO — Shared components, constants, and layout
 *
 * One font: Syne. One accent: #FF3D00 (hover only).
 * Extreme minimalism. Zero decoration.
 */

import { useRef, useEffect, useState, ReactNode } from "react";
import PreviewBar from "../../PreviewBar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

/* ── Constants ──────────────────────────────── */

export const FONT = "'Syne', 'Helvetica Neue', sans-serif";

export const PALETTE = {
  bg: "#FAFAFA",
  text: "#111111",
  muted: "#999999",
  dim: "#CCCCCC",
  accent: "#FF3D00",
  border: "#EEEEEE",
};

export const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap";

export const BASE_PATH = "/work/designs/mono/preview";

export const projects = [
  { slug: "meridian", title: "Meridian", cat: "Brand Identity", year: "2026", shape: "\u25C6", client: "Meridian Labs", role: "Brand Strategy & Visual Identity", timeline: "8 weeks", description: "A complete brand system for a biotech startup moving from stealth to market. Identity, guidelines, and digital presence built from zero." },
  { slug: "atlas", title: "Atlas", cat: "Web Platform", year: "2025", shape: "\u25CB", client: "Atlas Ventures", role: "Design & Frontend Development", timeline: "12 weeks", description: "End-to-end design and development of a venture capital platform. Portfolio management, deal flow, and investor relations in one interface." },
  { slug: "onyx", title: "Onyx", cat: "Mobile App", year: "2026", shape: "\u25A1", client: "Onyx Health", role: "Product Design", timeline: "16 weeks", description: "A health tracking app stripped to essentials. No gamification, no streaks. Just clear data and actionable insight." },
  { slug: "prism", title: "Prism", cat: "Editorial", year: "2025", shape: "\u25B3", client: "Prism Magazine", role: "Art Direction & Layout", timeline: "6 weeks", description: "Editorial redesign for a digital-first architecture magazine. New grid system, typography scale, and reading experience." },
  { slug: "echo", title: "Echo", cat: "E-Commerce", year: "2024", shape: "\u25C7", client: "Echo Audio", role: "E-Commerce Design & Development", timeline: "10 weeks", description: "A direct-to-consumer storefront for premium audio equipment. Minimal catalog, maximum clarity." },
];

/* ── Hooks ───────────────────────────────────── */

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export function useLineDraw(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll(".mn-line-draw").forEach((line) => {
        gsap.set(line, { scaleX: 0, transformOrigin: "left" });
        gsap.to(line, {
          scaleX: 1,
          duration: 0.6,
          ease: "power2.inOut",
          scrollTrigger: { trigger: line, start: "top 90%", once: true },
        });
      });

      el.querySelectorAll(".mn-fade-up").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [containerRef]);
}

/* ── Nav ────────────────────────────────────── */

export function MonoNav() {
  const isMobile = useIsMobile();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const links = [
    { label: "Work", href: BASE_PATH },
    { label: "About", href: `${BASE_PATH}/about` },
    { label: "Contact", href: `${BASE_PATH}/contact` },
  ];

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
        padding: isMobile ? "20px 24px" : "24px 48px",
        background: "rgba(250,250,250,0.85)",
        backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${PALETTE.border}`,
      }}
    >
      <Link
        href={BASE_PATH}
        style={{
          fontFamily: FONT,
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: 8,
          color: PALETTE.text,
          textDecoration: "none",
        }}
      >
        MONO
      </Link>
      <div style={{ display: "flex", gap: isMobile ? 20 : 28 }}>
        {links.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            style={{
              fontFamily: FONT,
              fontSize: 13,
              color: hoveredLink === item.label ? PALETTE.text : PALETTE.muted,
              textDecoration: "none",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={() => setHoveredLink(item.label)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

/* ── Footer ─────────────────────────────────── */

export function MonoFooter() {
  const isMobile = useIsMobile();

  return (
    <>
      <footer
        style={{
          padding: isMobile ? "24px" : "28px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: `1px solid ${PALETTE.border}`,
        }}
      >
        <span style={{ fontFamily: FONT, fontSize: 12, color: PALETTE.dim }}>
          &copy; 2026
        </span>
        <span style={{ fontFamily: FONT, fontSize: 12, color: PALETTE.dim }}>
          Built with intention.
        </span>
      </footer>

      {/* Back to breakdown */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200 }}>
        <Link
          href="/work/designs/mono"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 18px",
            background: PALETTE.text,
            color: PALETTE.bg,
            fontFamily: FONT,
            fontSize: 11,
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: 1,
          }}
        >
          &larr; BREAKDOWN
        </Link>
      </div>
    </>
  );
}

/* ── Layout wrapper ─────────────────────────── */

export function MonoLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        background: PALETTE.bg,
        color: PALETTE.text,
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`@import url('${FONT_LINK}');`}</style>
      <PreviewBar />
      <MonoNav />
      <main style={{ paddingTop: 80 }}>{children}</main>
      <MonoFooter />
    </div>
  );
}

/* ── Section divider line ───────────────────── */

export function Divider({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      className="mn-line-draw"
      style={{
        height: 1,
        background: PALETTE.border,
        ...style,
      }}
    />
  );
}
