"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import PreviewBar from "../../PreviewBar";

/* ── Palette & Constants ────────────────────────────────────────────── */
export const P = {
  bg: "#FFF8F0",
  text: "#1A1A1A",
  textLight: "#FFF8F0",
  muted: "#6B6B6B",
  coral: "#FF6B35",
  purple: "#8B5CF6",
  green: "#22C55E",
  yellow: "#FBBF24",
  border: "3px solid #1A1A1A",
  borderThin: "2px solid #1A1A1A",
  shadow: "4px 4px 0 #1A1A1A",
  shadowHover: "8px 8px 0 #1A1A1A",
};

export const BASE = "/work/designs/pop-store/preview";

/* ── Hook: isMobile ─────────────────────────────────────────────────── */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 769);
    const handler = () => setIsMobile(window.innerWidth < 769);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

/* ── Nav ────────────────────────────────────────────────────────────── */
export function PopNav({ cartCount = 0 }: { cartCount?: number }) {
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
        padding: "12px 40px",
        background: P.bg,
        borderBottom: P.border,
      }}
    >
      <Link
        href={BASE}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 26,
          fontWeight: 700,
          textDecoration: "none",
          color: P.text,
        }}
      >
        POP<span style={{ color: P.coral }}>.</span>
      </Link>

      <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
        {[
          { label: "Home", href: BASE },
          { label: "Shop", href: `${BASE}/shop` },
          { label: "About", href: `${BASE}/about` },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              color: P.text,
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = P.coral)}
            onMouseLeave={(e) => (e.currentTarget.style.color = P.text)}
          >
            {item.label}
          </Link>
        ))}

        <span
          style={{
            padding: "10px 24px",
            background: P.text,
            color: P.textLight,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            border: P.border,
            boxShadow: P.shadow,
            cursor: "pointer",
            transition: "all 0.12s",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translate(-2px, -2px)";
            e.currentTarget.style.boxShadow = "6px 6px 0 #1A1A1A";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translate(0, 0)";
            e.currentTarget.style.boxShadow = P.shadow;
          }}
        >
          Cart ({cartCount}) 🛒
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: -8,
                right: -8,
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: P.coral,
                border: "2px solid #1A1A1A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                color: "#fff",
                fontWeight: 800,
              }}
            >
              {cartCount}
            </span>
          )}
        </span>
      </div>
    </nav>
  );
}

/* ── Footer ─────────────────────────────────────────────────────────── */
export function PopFooter() {
  return (
    <footer
      style={{
        padding: "40px",
        background: P.text,
        borderTop: P.border,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 20,
      }}
    >
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 12,
          color: "rgba(255,255,255,0.35)",
        }}
      >
        &copy; 2026 Pop Store. Stay weird.
      </span>
      <div style={{ display: "flex", gap: 20 }}>
        {["TikTok", "Instagram", "Twitter"].map((s) => (
          <a
            key={s}
            href="#"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: "rgba(255,255,255,0.35)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = P.coral)}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
            }
          >
            {s}
          </a>
        ))}
      </div>
    </footer>
  );
}

/* ── Back-to-breakdown FAB ──────────────────────────────────────────── */
export function BreakdownFab() {
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200 }}>
      <Link
        href="/work/designs/pop-store"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 20px",
          background: P.coral,
          color: "#fff",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 11,
          fontWeight: 700,
          textDecoration: "none",
          border: P.borderThin,
          boxShadow: "3px 3px 0 #1A1A1A",
        }}
      >
        ← BREAKDOWN
      </Link>
    </div>
  );
}

/* ── Shared Layout Shell ────────────────────────────────────────────── */
export function PopLayout({
  children,
  cartCount = 0,
}: {
  children: ReactNode;
  cartCount?: number;
}) {
  return (
    <div
      style={{
        background: P.bg,
        color: P.text,
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <PreviewBar />
      <PopNav cartCount={cartCount} />
      <div style={{ paddingTop: 60 }}>{children}</div>
      <PopFooter />
    </div>
  );
}

/* ── Shared product data ────────────────────────────────────────────── */
export const allProducts = [
  { id: "the-original", name: "The Original", price: "$24", tag: "BESTSELLER", color: P.coral, emoji: "🔥", desc: "Where it all began. Our signature blend that started a movement. Bold, unapologetic, unreasonably good." },
  { id: "berry-blast", name: "Berry Blast", price: "$28", tag: "NEW DROP", color: P.purple, emoji: "🫐", desc: "A berry explosion that hits different. Mixed berries, zero regrets, maximum flavor." },
  { id: "green-machine", name: "Green Machine", price: "$26", tag: "FAN FAVORITE", color: P.green, emoji: "🥑", desc: "Green but make it taste amazing. Spinach, avocado, and some magic we can't legally disclose." },
  { id: "golden-hour", name: "Golden Hour", price: "$30", tag: "LIMITED", color: P.yellow, emoji: "✨", desc: "Turmeric, ginger, a sunset in a bottle. Only available while supplies last." },
  { id: "midnight-mango", name: "Midnight Mango", price: "$27", tag: "NEW DROP", color: P.coral, emoji: "🥭", desc: "Tropical vibes, midnight energy. Mango meets activated charcoal for a drink that looks as wild as it tastes." },
  { id: "lavender-haze", name: "Lavender Haze", price: "$29", tag: "BESTSELLER", color: P.purple, emoji: "💜", desc: "Calm down. No, literally. Lavender + chamomile + a little bit of zen in every sip." },
  { id: "citrus-punch", name: "Citrus Punch", price: "$25", tag: "FAN FAVORITE", color: P.yellow, emoji: "🍊", desc: "Four citrus fruits walk into a bottle. The punchline? You can't stop drinking it." },
  { id: "forest-floor", name: "Forest Floor", price: "$32", tag: "LIMITED", color: P.green, emoji: "🌿", desc: "Earthy, grounding, unapologetically mushroomy. Reishi, chaga, and lion's mane do their thing." },
];
