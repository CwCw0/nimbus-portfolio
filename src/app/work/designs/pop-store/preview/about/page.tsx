"use client";

/**
 * POP STORE — About Page
 *
 * Design language: Neo-brutalist. Spring physics (overshoot). Hard shadows that MOVE.
 * Rotated elements. Sticker/badge aesthetic. Zigzag timeline. Chaotic energy, tight grid.
 *
 * Layout: Oversized hero with rotating sticker badge → Zigzag origin story (not grid!) →
 * Horizontal scrolling stats marquee → Rotating value stickers → Scattered team polaroids
 *
 * NOT: generic cards with fade-up. NOT: centered headers. NOT: subtle hover lifts.
 */

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { PopLayout, P, BASE, useIsMobile } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const storyBeats = [
  { year: "2022", title: "THE KITCHEN ERA", body: "First batch made on a Tuesday night. Gave bottles to friends. One posted it on TikTok. 2M views later, we realized this might be a thing.", emoji: "🏠", color: P.coral },
  { year: "2023", title: "THE SELLOUT", body: "First official drop: 500 bottles. Sold out in 11 minutes. We cried. Then panicked. Then scaled.", emoji: "🚀", color: P.purple },
  { year: "2024", title: "GOING GLOBAL", body: "12 countries. 'Best New Brand' at the Global Beverage Awards. First office that wasn't someone's apartment.", emoji: "🌍", color: P.green },
  { year: "NOW", title: "THE FUTURE", body: "8 products. 50K+ customers. Still testing new flavors every week. The kitchen is just bigger now.", emoji: "💡", color: P.yellow },
];

const values = [
  { emoji: "🔥", title: "NO BORING STUFF", body: "If it doesn't make us excited, we don't make it.", color: P.coral, rotation: -3 },
  { emoji: "🌱", title: "REAL INGREDIENTS", body: "If grandma can't pronounce it, it's not in the bottle.", color: P.green, rotation: 2 },
  { emoji: "💜", title: "DESIGN = PRODUCT", body: "We spend as much time on the label as the liquid.", color: P.purple, rotation: -2 },
  { emoji: "✨", title: "SMALL BATCHES", body: "We'd rather sell out than water down.", color: P.yellow, rotation: 3 },
  { emoji: "🤝", title: "COMMUNITY FIRST", body: "Every flavor is voted on by the Pop fam.", color: P.coral, rotation: -1 },
  { emoji: "🌍", title: "PLANET FRIENDLY", body: "Recyclable. Carbon-neutral. The bar is low but we clear it.", color: P.green, rotation: 2 },
];

const team = [
  { name: "Alex Rivera", role: "Founder & Chief Taster", emoji: "🧑‍🍳", color: P.coral, rotation: -4 },
  { name: "Sam Chen", role: "Head of Flavor R&D", emoji: "🔬", color: P.purple, rotation: 3 },
  { name: "Jordan Blake", role: "Design Director", emoji: "🎨", color: P.yellow, rotation: -2 },
  { name: "Maya Patel", role: "Community Manager", emoji: "📱", color: P.green, rotation: 5 },
];

export default function AboutPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [cartCount] = useState(0);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero elements: spring bounce in with overshoot
      el.querySelectorAll(".ps-hero-bounce").forEach((item, i) => {
        gsap.fromTo(item,
          { y: 120, opacity: 0, rotation: (i % 2 === 0 ? -8 : 8), scale: 0.7 },
          { y: 0, opacity: 1, rotation: 0, scale: 1, duration: 1, ease: "elastic.out(1, 0.5)", delay: 0.2 + i * 0.12 }
        );
      });

      // Rotating badge: continuous spin
      const badge = el.querySelector(".ps-spin-badge");
      if (badge) {
        gsap.to(badge, { rotation: 360, duration: 20, repeat: -1, ease: "none" });
      }

      // Story beats: zigzag entrances (alternate left/right)
      el.querySelectorAll(".ps-story-beat").forEach((beat, i) => {
        const fromX = i % 2 === 0 ? -100 : 100;
        gsap.fromTo(beat,
          { x: fromX, opacity: 0, rotation: i % 2 === 0 ? -5 : 5, scale: 0.85 },
          {
            x: 0, opacity: 1, rotation: 0, scale: 1,
            duration: 0.9, ease: "back.out(1.7)",
            scrollTrigger: { trigger: beat, start: "top 85%", once: true },
          }
        );
      });

      // Stats marquee: slide in from right
      const marquee = el.querySelector(".ps-stats-track");
      if (marquee) {
        gsap.to(marquee, {
          xPercent: -50, duration: 15, repeat: -1, ease: "none",
        });
      }

      // Value stickers: pop in with spring + slight rotation
      el.querySelectorAll(".ps-value-sticker").forEach((sticker, i) => {
        gsap.fromTo(sticker,
          { scale: 0, rotation: (i % 2 === 0 ? -15 : 15), opacity: 0 },
          {
            scale: 1, rotation: 0, opacity: 1,
            duration: 0.7, ease: "back.out(3)",
            delay: i * 0.08,
            scrollTrigger: { trigger: sticker, start: "top 90%", once: true },
          }
        );
      });

      // Team polaroids: scatter in from random directions
      el.querySelectorAll(".ps-polaroid").forEach((card, i) => {
        const directions = [
          { x: -80, y: 60 },
          { x: 60, y: -50 },
          { x: -50, y: -70 },
          { x: 70, y: 50 },
        ];
        const dir = directions[i % directions.length];
        gsap.fromTo(card,
          { x: dir.x, y: dir.y, rotation: (i % 2 === 0 ? -10 : 10), scale: 0.8, opacity: 0 },
          {
            x: 0, y: 0, rotation: 0, scale: 1, opacity: 1,
            duration: 0.8, ease: "back.out(1.5)",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <PopLayout cartCount={cartCount}>
      <div ref={mainRef}>
        {/* ═══ HERO — Oversized title with spinning sticker badge ═══ */}
        <section style={{
          padding: isMobile ? "60px 24px 80px" : "80px 40px 100px",
          maxWidth: 1000, margin: "0 auto",
          position: "relative",
          textAlign: "center",
        }}>
          {/* Spinning badge */}
          <div className="ps-spin-badge" style={{
            position: "absolute",
            top: isMobile ? 40 : 60,
            right: isMobile ? 20 : 60,
            width: isMobile ? 80 : 120,
            height: isMobile ? 80 : 120,
            borderRadius: "50%",
            background: P.yellow,
            border: P.border,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: isMobile ? 12 : 14,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.2,
            boxShadow: P.shadow,
          }}>
            EST.<br />2022
          </div>

          <span className="ps-hero-bounce" style={{
            display: "inline-block",
            padding: "10px 24px",
            background: P.coral,
            color: P.textLight,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12, fontWeight: 700, letterSpacing: 2,
            border: P.border, boxShadow: "3px 3px 0 #1A1A1A",
            marginBottom: 28,
          }}>
            THE ORIGIN STORY 📖
          </span>

          <h1 className="ps-hero-bounce" style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(48px, 10vw, 100px)",
            fontWeight: 700, lineHeight: 0.88, letterSpacing: "-0.03em",
          }}>
            WE STARTED IN<br />
            <span style={{ color: P.coral, fontStyle: "italic" }}>A KITCHEN.</span>
          </h1>

          <p className="ps-hero-bounce" style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 18, color: P.muted, lineHeight: 1.8,
            marginTop: 28, maxWidth: 500, marginLeft: "auto", marginRight: "auto",
          }}>
            Two friends, a blender, and one question: why does everything at the store taste like it was made by a committee?
          </p>
        </section>

        {/* ═══ STORY — Zigzag beats (not a grid!) ═══ */}
        <section style={{ padding: isMobile ? "0 24px 80px" : "0 40px 100px", maxWidth: 900, margin: "0 auto" }}>
          {storyBeats.map((beat, i) => (
            <div key={beat.year} className="ps-story-beat" style={{
              display: "flex",
              flexDirection: isMobile ? "column" : (i % 2 === 0 ? "row" : "row-reverse"),
              gap: isMobile ? 16 : 40,
              alignItems: "center",
              marginBottom: isMobile ? 48 : 64,
            }}>
              {/* Emoji + year block */}
              <div style={{
                minWidth: isMobile ? "100%" : 200,
                padding: "32px 24px",
                background: beat.color + "18",
                border: `3px solid ${beat.color}`,
                boxShadow: `6px 6px 0 ${beat.color}`,
                textAlign: "center",
                transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
              }}>
                <span style={{ fontSize: 48, display: "block" }}>{beat.emoji}</span>
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 32, fontWeight: 700, color: beat.color, display: "block", marginTop: 8,
                }}>{beat.year}</span>
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: isMobile ? 24 : 32, fontWeight: 700, marginBottom: 8,
                }}>{beat.title}</h3>
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 16, color: P.muted, lineHeight: 1.75,
                }}>{beat.body}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ═══ STATS — Infinite scrolling marquee ═══ */}
        <section style={{
          padding: "28px 0",
          background: P.text,
          overflow: "hidden",
          borderTop: P.border,
          borderBottom: P.border,
        }}>
          <div className="ps-stats-track" style={{
            display: "flex", gap: 60, whiteSpace: "nowrap", width: "fit-content",
          }}>
            {[...Array(2)].map((_, rep) => (
              <div key={rep} style={{ display: "flex", gap: 60 }}>
                {[
                  "2M+ BOTTLES SOLD 🍾",
                  "50K+ HAPPY CUSTOMERS 😍",
                  "0 ARTIFICIAL INGREDIENTS 🚫",
                  "127 FLAVORS TESTED 🧪",
                  "12 COUNTRIES 🌍",
                  "11 MIN FASTEST SELLOUT ⚡",
                ].map((stat) => (
                  <span key={stat + rep} style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 16, fontWeight: 700, color: P.textLight,
                    letterSpacing: 1,
                  }}>{stat}</span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ═��═ VALUES — Sticker grid (rotated, not aligned) ═══ */}
        <section style={{ padding: isMobile ? "80px 24px" : "100px 40px", background: P.text }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13, fontWeight: 700, color: P.coral, letterSpacing: 2,
              display: "block", marginBottom: 8,
            }}>WHAT WE STAND FOR</span>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 700,
              color: P.textLight, marginBottom: 48, letterSpacing: "-0.02em",
            }}>Our Values.</h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)",
              gap: 20,
            }}>
              {values.map((v) => (
                <div key={v.title} className="ps-value-sticker" style={{
                  padding: isMobile ? 20 : 28,
                  border: `3px solid ${v.color}`,
                  background: v.color + "15",
                  transform: `rotate(${v.rotation}deg)`,
                  transition: "all 0.15s",
                  cursor: "default",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = `rotate(0deg) translate(-4px, -4px)`;
                    e.currentTarget.style.boxShadow = `8px 8px 0 ${v.color}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `rotate(${v.rotation}deg)`;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span style={{ fontSize: 36, display: "block", marginBottom: 12 }}>{v.emoji}</span>
                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: isMobile ? 14 : 17, fontWeight: 700, color: P.textLight, marginBottom: 6,
                  }}>{v.title}</h3>
                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.55)",
                  }}>{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TEAM — Scattered polaroids ═══ */}
        <section style={{ padding: isMobile ? "80px 24px" : "100px 40px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: P.coral, letterSpacing: 2 }}>THE HUMANS</span>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 700, marginTop: 6, letterSpacing: "-0.02em",
              }}>Meet the Team.</h2>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: P.muted, marginTop: 8 }}>
                Small team. Big ambitions. Questionable Spotify playlists.
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
              gap: 20,
            }}>
              {team.map((t) => (
                <div key={t.name} className="ps-polaroid" style={{
                  background: "#fff",
                  border: P.border,
                  padding: "24px 16px 20px",
                  textAlign: "center",
                  transform: `rotate(${t.rotation}deg)`,
                  boxShadow: P.shadow,
                  transition: "all 0.15s",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "rotate(0deg) translate(-4px, -4px)";
                    e.currentTarget.style.boxShadow = P.shadowHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `rotate(${t.rotation}deg)`;
                    e.currentTarget.style.boxShadow = P.shadow;
                  }}
                >
                  {/* Emoji avatar */}
                  <div style={{
                    width: 72, height: 72, margin: "0 auto 12px",
                    background: t.color + "20", border: `2px solid ${t.color}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 36,
                  }}>{t.emoji}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700 }}>{t.name}</h3>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: P.muted, display: "block", marginTop: 4 }}>{t.role}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA — Bright, punchy ═══ */}
        <section style={{
          padding: isMobile ? "80px 24px" : "100px 40px",
          background: P.coral,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          borderTop: P.border,
        }}>
          <div style={{ position: "absolute", top: -30, left: "8%", fontSize: 120, opacity: 0.15 }}>🎉</div>
          <div style={{ position: "absolute", bottom: -30, right: "8%", fontSize: 120, opacity: 0.15 }}>🛒</div>

          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(40px, 8vw, 80px)", fontWeight: 700,
            color: P.textLight, lineHeight: 0.92, position: "relative", zIndex: 1,
          }}>
            ENOUGH READING.<br />START SIPPING.
          </h2>
          <Link href={`${BASE}/shop`} style={{
            display: "inline-block", marginTop: 32,
            padding: "18px 48px", background: P.text, color: P.textLight,
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700,
            textDecoration: "none", border: `3px solid ${P.textLight}`,
            position: "relative", zIndex: 1, transition: "all 0.12s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-3px, -3px)"; e.currentTarget.style.boxShadow = `6px 6px 0 ${P.textLight}`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translate(0,0)"; e.currentTarget.style.boxShadow = "none"; }}
          >SHOP THE DROP →</Link>
        </section>
      </div>
    </PopLayout>
  );
}
