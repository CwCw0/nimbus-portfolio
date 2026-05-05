"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { PopLayout, P, BASE, useIsMobile } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    emoji: "🔥",
    title: "No Boring Stuff",
    body: "If it doesn't make us excited, we don't make it. Every product starts with the question: would we actually buy this?",
    color: P.coral,
  },
  {
    emoji: "🌱",
    title: "Real Ingredients",
    body: "If your grandma can't pronounce it, it's not going in the bottle. We use whole, real, actual food. Revolutionary concept, we know.",
    color: P.green,
  },
  {
    emoji: "💜",
    title: "Design Is the Product",
    body: "We spend as much time on the label as the liquid. Because you drink with your eyes first. We said what we said.",
    color: P.purple,
  },
  {
    emoji: "✨",
    title: "Small Batches, Big Energy",
    body: "We'd rather sell out than water down. Every batch is crafted in limited runs so quality never takes a back seat.",
    color: P.yellow,
  },
  {
    emoji: "🤝",
    title: "Community First",
    body: "We built this brand with our customers, not for them. Every new flavor is voted on by the Pop fam. Democracy tastes good.",
    color: P.coral,
  },
  {
    emoji: "🌍",
    title: "Planet-Friendly",
    body: "Recyclable packaging, carbon-neutral shipping, and a genuine effort to not ruin the planet. The bar is low but we're clearing it.",
    color: P.green,
  },
];

const team = [
  { name: "Alex Rivera", role: "Founder & Chief Taster", emoji: "🧑‍🍳", color: P.coral },
  { name: "Sam Chen", role: "Head of Flavor R&D", emoji: "🔬", color: P.purple },
  { name: "Jordan Blake", role: "Design Director", emoji: "🎨", color: P.yellow },
  { name: "Maya Patel", role: "Community Manager", emoji: "📱", color: P.green },
];

const stats = [
  { number: "2M+", label: "Bottles Sold", emoji: "🍾" },
  { number: "50K+", label: "Happy Customers", emoji: "😍" },
  { number: "0", label: "Artificial Ingredients", emoji: "🚫" },
  { number: "127", label: "Flavors Tested", emoji: "🧪" },
];

export default function AboutPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [cartCount] = useState(0);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero text entrance
      el.querySelectorAll(".ps-about-hero").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.4)",
            delay: 0.15 + i * 0.1,
          }
        );
      });

      // Value cards
      el.querySelectorAll(".ps-value-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, rotation: i % 2 === 0 ? -2 : 2, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.4)",
            delay: i * 0.08,
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          }
        );
      });

      // Team cards
      el.querySelectorAll(".ps-team-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.4)",
            delay: i * 0.1,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });

      // Stats
      el.querySelectorAll(".ps-stat").forEach((stat, i) => {
        gsap.fromTo(
          stat,
          { y: 50, opacity: 0, scale: 0.85 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: i * 0.12,
            scrollTrigger: { trigger: stat, start: "top 88%", once: true },
          }
        );
      });

      // Story sections
      el.querySelectorAll(".ps-story-block").forEach((block, i) => {
        gsap.fromTo(
          block,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: block, start: "top 88%", once: true },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <PopLayout cartCount={cartCount}>
      <div ref={mainRef}>
        {/* Hero */}
        <section
          style={{
            padding: isMobile ? "60px 24px 80px" : "80px 40px 100px",
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <span
            className="ps-about-hero"
            style={{
              display: "inline-block",
              padding: "10px 24px",
              background: P.coral,
              color: P.textLight,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 2,
              border: P.border,
              boxShadow: "3px 3px 0 #1A1A1A",
              marginBottom: 28,
            }}
          >
            THE ORIGIN STORY
          </span>

          <h1
            className="ps-about-hero"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(44px, 8vw, 80px)",
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
            }}
          >
            WE STARTED IN
            <br />
            <span style={{ color: P.coral, fontStyle: "italic" }}>A KITCHEN.</span>
          </h1>

          <p
            className="ps-about-hero"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 18,
              color: P.muted,
              lineHeight: 1.8,
              marginTop: 28,
              maxWidth: 560,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Two friends, a blender, and a simple question: why does everything at
            the store taste like it was made by a committee? We set out to make
            products with actual personality. Four years later, here we are.
          </p>
        </section>

        {/* Brand story blocks */}
        <section
          style={{
            padding: "0 40px 80px",
            maxWidth: 1000,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 24,
            }}
          >
            <div
              className="ps-story-block"
              style={{
                padding: 36,
                border: P.border,
                background: P.coral + "12",
                boxShadow: P.shadow,
              }}
            >
              <span style={{ fontSize: 44, display: "block", marginBottom: 16 }}>
                🏠
              </span>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                The Kitchen Era (2022)
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: P.muted,
                }}
              >
                First batch made on a Tuesday night. Gave bottles to friends. One of
                them posted it on TikTok. 2 million views later, we realized this
                might be a thing.
              </p>
            </div>

            <div
              className="ps-story-block"
              style={{
                padding: 36,
                border: P.border,
                background: P.purple + "12",
                boxShadow: P.shadow,
              }}
            >
              <span style={{ fontSize: 44, display: "block", marginBottom: 16 }}>
                🚀
              </span>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                The Sellout (2023)
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: P.muted,
                }}
              >
                First official drop: 500 bottles. Sold out in 11 minutes. We cried.
                Then panicked. Then scaled. Got a real facility. Hired actual humans.
                Still cried sometimes.
              </p>
            </div>

            <div
              className="ps-story-block"
              style={{
                padding: 36,
                border: P.border,
                background: P.green + "12",
                boxShadow: P.shadow,
              }}
            >
              <span style={{ fontSize: 44, display: "block", marginBottom: 16 }}>
                🌍
              </span>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                Going Global (2024)
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: P.muted,
                }}
              >
                Launched in 12 countries. Won &ldquo;Best New Brand&rdquo; at the
                Global Beverage Awards. Got our first office that wasn&apos;t someone&apos;s
                apartment. Big moves.
              </p>
            </div>

            <div
              className="ps-story-block"
              style={{
                padding: 36,
                border: P.border,
                background: P.yellow + "12",
                boxShadow: P.shadow,
              }}
            >
              <span style={{ fontSize: 44, display: "block", marginBottom: 16 }}>
                💡
              </span>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                Today &amp; Tomorrow
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: P.muted,
                }}
              >
                8 products, 50K+ customers, and still testing new flavors every
                week. The mission hasn&apos;t changed: make stuff you actually want to
                buy. The kitchen is just bigger now.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section
          style={{
            padding: "80px 40px",
            background: P.text,
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: P.coral,
                letterSpacing: 2,
                display: "block",
                marginBottom: 8,
              }}
            >
              WHAT WE STAND FOR
            </span>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 700,
                color: P.textLight,
                marginBottom: 44,
                letterSpacing: "-0.02em",
              }}
            >
              Our Values.
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: 20,
              }}
            >
              {values.map((v) => (
                <div
                  key={v.title}
                  className="ps-value-card"
                  style={{
                    padding: 28,
                    border: `3px solid ${v.color}`,
                    background: v.color + "12",
                    transition: "all 0.15s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translate(-4px, -4px)";
                    e.currentTarget.style.boxShadow = `8px 8px 0 ${v.color}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translate(0, 0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span style={{ fontSize: 36, display: "block", marginBottom: 14 }}>
                    {v.emoji}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 19,
                      fontWeight: 700,
                      color: P.textLight,
                      marginBottom: 10,
                    }}
                  >
                    {v.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats — Why Us */}
        <section style={{ padding: "80px 40px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: P.coral,
                  letterSpacing: 2,
                }}
              >
                THE PROOF
              </span>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(36px, 5vw, 56px)",
                  fontWeight: 700,
                  marginTop: 6,
                  letterSpacing: "-0.02em",
                }}
              >
                Why Pop?
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(2, 1fr)"
                  : "repeat(4, 1fr)",
                gap: 20,
              }}
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="ps-stat"
                  style={{
                    padding: 32,
                    border: P.border,
                    boxShadow: P.shadow,
                    textAlign: "center",
                    background: P.bg,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translate(-4px, -4px)";
                    e.currentTarget.style.boxShadow = P.shadowHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translate(0, 0)";
                    e.currentTarget.style.boxShadow = P.shadow;
                  }}
                >
                  <span style={{ fontSize: 36, display: "block", marginBottom: 10 }}>
                    {s.emoji}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 40,
                      fontWeight: 700,
                      display: "block",
                      color: P.coral,
                    }}
                  >
                    {s.number}
                  </span>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13,
                      color: P.muted,
                      marginTop: 4,
                      display: "block",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section
          style={{
            padding: "80px 40px",
            background: P.text,
          }}
        >
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: P.coral,
                  letterSpacing: 2,
                }}
              >
                THE HUMANS
              </span>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(36px, 5vw, 52px)",
                  fontWeight: 700,
                  color: P.textLight,
                  marginTop: 6,
                  letterSpacing: "-0.02em",
                }}
              >
                Meet the Team.
              </h2>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 16,
                  color: "rgba(255,255,255,0.45)",
                  marginTop: 12,
                  maxWidth: 460,
                  marginLeft: "auto",
                  marginRight: "auto",
                  lineHeight: 1.7,
                }}
              >
                Small team, big ambitions, questionable Spotify playlists. These are
                the people making the magic happen.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
                gap: 20,
              }}
            >
              {team.map((t) => (
                <div
                  key={t.name}
                  className="ps-team-card"
                  style={{
                    border: `3px solid ${t.color}`,
                    background: t.color + "10",
                    textAlign: "center",
                    padding: "36px 20px",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translate(-4px, -4px)";
                    e.currentTarget.style.boxShadow = `8px 8px 0 ${t.color}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translate(0, 0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span style={{ fontSize: 56, display: "block", marginBottom: 16 }}>
                    {t.emoji}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 18,
                      fontWeight: 700,
                      color: P.textLight,
                    }}
                  >
                    {t.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13,
                      color: "rgba(255,255,255,0.4)",
                      display: "block",
                      marginTop: 4,
                    }}
                  >
                    {t.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            padding: "100px 40px",
            background: P.coral,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -30,
              left: "10%",
              fontSize: 130,
              opacity: 0.12,
            }}
          >
            🎉
          </div>
          <div
            style={{
              position: "absolute",
              bottom: -30,
              right: "10%",
              fontSize: 130,
              opacity: 0.12,
            }}
          >
            🛒
          </div>

          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(40px, 7vw, 80px)",
              fontWeight: 700,
              color: P.textLight,
              lineHeight: 0.92,
              position: "relative",
              zIndex: 1,
            }}
          >
            ENOUGH READING.
            <br />
            START SIPPING.
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 17,
              color: "rgba(255,255,255,0.8)",
              marginTop: 20,
              maxWidth: 400,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.7,
              position: "relative",
              zIndex: 1,
            }}
          >
            Free shipping over $50. No subscriptions. No nonsense.
          </p>
          <Link
            href={`${BASE}/shop`}
            style={{
              display: "inline-block",
              marginTop: 32,
              padding: "18px 48px",
              background: P.text,
              color: P.textLight,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              textDecoration: "none",
              border: `3px solid ${P.textLight}`,
              cursor: "pointer",
              position: "relative",
              zIndex: 1,
              transition: "all 0.12s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translate(-3px, -3px)";
              e.currentTarget.style.boxShadow = `6px 6px 0 ${P.textLight}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translate(0, 0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            SHOP THE DROP →
          </Link>
        </section>
      </div>
    </PopLayout>
  );
}
