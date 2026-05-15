"use client";

/**
 * Studio Noir — Shared components (Nav, Footer, Layout, constants)
 * Used across all pages in this template.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import PreviewBar from "../../PreviewBar";

export const F_HEAD = "'Bebas Neue', 'Impact', sans-serif";
export const F_BODY = "'DM Sans', 'Helvetica Neue', sans-serif";

export const C = {
  bg: "#0D0B08",
  bgAlt: "#141110",
  bgWarm: "#1A1612",
  text: "#EDE8DF",
  muted: "rgba(237,232,223,0.3)",
  dim: "rgba(237,232,223,0.55)",
  accent: "#C9A55A",
  accentGlow: "rgba(201,165,90,0.08)",
  border: "rgba(237,232,223,0.06)",
};

export const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');`;

const BASE = "/work/designs/studio-noir/preview";

export function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => { setMobile(window.innerWidth < 769); }, []);
  return mobile;
}

export function SNNav({ current }: { current: string }) {
  const isMobile = useIsMobile();
  const links = [
    { label: "Home", href: BASE },
    { label: "Work", href: `${BASE}/work` },
    { label: "About", href: `${BASE}/about` },
    { label: "Contact", href: `${BASE}/contact` },
  ];

  return (
    <nav style={{ position: "fixed", top: 44, left: 0, right: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "16px 20px" : "20px 48px", background: "rgba(13,11,8,0.9)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${C.border}` }}>
      <Link href={BASE} style={{ fontFamily: F_HEAD, fontSize: isMobile ? 16 : 20, color: C.text, letterSpacing: "0.12em", textDecoration: "none" }}>
        STUDIO<span style={{ color: C.accent }}>.</span>NOIR
      </Link>
      <div style={{ display: "flex", gap: isMobile ? 16 : 32, alignItems: "center" }}>
        {links.map((link) => (
          <Link key={link.label} href={link.href} style={{
            fontFamily: F_BODY, fontSize: isMobile ? 11 : 12, color: current === link.label ? C.accent : C.muted,
            textDecoration: "none", letterSpacing: 3, textTransform: "uppercase" as const, transition: "color 0.3s",
          }}>{link.label}</Link>
        ))}
      </div>
    </nav>
  );
}

export function SNFooter() {
  return (
    <footer style={{ padding: "32px 48px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: C.bg }}>
      <span style={{ fontFamily: F_BODY, fontSize: 11, color: C.muted }}>&copy; 2026 Studio Noir</span>
      <div style={{ display: "flex", gap: 24 }}>
        {["Dribbble", "Behance", "Instagram", "Twitter"].map((s) => (
          <a key={s} href="#" style={{ fontFamily: F_BODY, fontSize: 11, color: C.muted, textDecoration: "none" }}>{s}</a>
        ))}
      </div>
    </footer>
  );
}

export function SNLayout({ children, current }: { children: React.ReactNode; current: string }) {
  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{FONT_IMPORT}</style>
      <PreviewBar />
      <SNNav current={current} />
      {children}
      <SNFooter />
    </div>
  );
}
