"use client";

/**
 * Roast — Coffee Menu page
 * Horizontal scroll carousel, parallax bean illustrations,
 * wipe-in category sections, hover tilt on origin cards.
 */

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RoastLayout, R, FH, FB, GrainOverlay, useIsMobile } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const coffees = [
  {
    name: "Ethiopia Yirgacheffe",
    origin: "Gedeo, Ethiopia",
    altitude: "1,900 – 2,200m",
    process: "Washed",
    notes: ["Jasmine", "Bergamot", "Raw honey"],
    price: "$22",
    roast: "Light",
    description: "From the birthplace of coffee. Meticulously washed at the Konga station, producing a tea-like clarity with intense florals.",
  },
  {
    name: "Colombia Huila",
    origin: "Huila, Colombia",
    altitude: "1,650 – 1,900m",
    process: "Natural",
    notes: ["Cherry", "Dark chocolate", "Caramel"],
    price: "$19",
    roast: "Medium",
    description: "Dried whole-cherry on raised beds for 21 days. The natural process amplifies fruit-forward sweetness typical of Huila.",
  },
  {
    name: "Guatemala Antigua",
    origin: "Antigua, Guatemala",
    altitude: "1,500 – 1,700m",
    process: "Washed",
    notes: ["Blood orange", "Brown sugar", "Walnut"],
    price: "$20",
    roast: "Medium",
    description: "Grown in the shadow of Volcán de Agua. Clean washed processing lets the terroir speak — rich, balanced, satisfying.",
  },
  {
    name: "Kenya Nyeri AA",
    origin: "Nyeri County, Kenya",
    altitude: "1,700 – 1,900m",
    process: "Washed",
    notes: ["Blackcurrant", "Grapefruit", "Tomato"],
    price: "$24",
    roast: "Light",
    description: "Double-washed with a 72-hour fermentation. The trademark bright acidity and complex fruit character of Kenyan coffees.",
  },
  {
    name: "Brazil Mogiana",
    origin: "São Paulo, Brazil",
    altitude: "900 – 1,100m",
    process: "Honey",
    notes: ["Milk chocolate", "Hazelnut", "Dried fig"],
    price: "$17",
    roast: "Medium-Dark",
    description: "Honey-processed at Fazenda Santa Lucia. Partial mucilage removal creates rounded sweetness with creamy body.",
  },
  {
    name: "Costa Rica Tarrazú",
    origin: "Tarrazú, Costa Rica",
    altitude: "1,400 – 1,800m",
    process: "Honey",
    notes: ["Peach", "Marzipan", "Maple"],
    price: "$21",
    roast: "Light-Medium",
    description: "Yellow honey process from the legendary Tarrazú highlands. Silky body, stone-fruit sweetness, clean lingering finish.",
  },
];

const categories = [
  { label: "Light Roasts", desc: "Bright acidity, floral & fruity notes, tea-like body. Best for pour-over.", filter: "Light" },
  { label: "Medium Roasts", desc: "Balanced sweetness, chocolate & nut notes, rounded body. Versatile brewing.", filter: "Medium" },
  { label: "Honey Process", desc: "Silky body, stone-fruit sweetness, complex sugars. Our specialty.", filter: "Honey" },
];

export default function RoastCoffee() {
  const mainRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [tilt, setTilt] = useState<{ [key: string]: { x: number; y: number } }>({});

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero title curtain reveal
      const heroTitle = el.querySelector(".rs-hero-curtain");
      if (heroTitle) {
        gsap.fromTo(heroTitle, { clipPath: "inset(0 0 100% 0)" }, {
          clipPath: "inset(0 0 0% 0)", duration: 1.4, ease: "power3.inOut", delay: 0.3,
        });
      }

      // Hero subtitle
      const heroSub = el.querySelector(".rs-hero-sub");
      if (heroSub) {
        gsap.fromTo(heroSub, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1, ease: "power2.out", delay: 1 });
      }

      // Horizontal scroll carousel (desktop only)
      if (!isMobile) {
        const scrollContainer = el.querySelector(".rs-h-scroll");
        const scrollInner = el.querySelector(".rs-h-scroll-inner");
        if (scrollContainer && scrollInner) {
          const totalWidth = (scrollInner as HTMLElement).scrollWidth - (scrollContainer as HTMLElement).offsetWidth;
          gsap.to(scrollInner, {
            x: -totalWidth,
            ease: "none",
            scrollTrigger: {
              trigger: scrollContainer,
              start: "top 10%",
              end: () => `+=${totalWidth}`,
              scrub: 1.2,
              pin: true,
              anticipatePin: 1,
            },
          });
        }
      }

      // Category wipe-ins
      el.querySelectorAll(".rs-cat-wipe").forEach((section) => {
        gsap.fromTo(section, { clipPath: "inset(0 100% 0 0)" }, {
          clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.inOut",
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
        });
      });

      // Parallax bean illustrations
      el.querySelectorAll(".rs-bean-parallax").forEach((bean, i) => {
        gsap.to(bean, {
          y: (i % 2 === 0 ? -60 : -40),
          rotation: (i % 2 === 0 ? 15 : -10),
          ease: "none",
          scrollTrigger: { trigger: bean, start: "top bottom", end: "bottom top", scrub: 2 },
        });
      });

      // Bottom section reveal
      el.querySelectorAll(".rs-wipe-up").forEach((item) => {
        gsap.fromTo(item, { clipPath: "inset(100% 0 0 0)" }, {
          clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power3.inOut",
          scrollTrigger: { trigger: item, start: "top 80%", once: true },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [isMobile]);

  const handleTilt = (name: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt((prev) => ({ ...prev, [name]: { x, y } }));
  };

  const resetTilt = (name: string) => {
    setTilt((prev) => ({ ...prev, [name]: { x: 0, y: 0 } }));
  };

  return (
    <RoastLayout current="Coffee">
      <div ref={mainRef}>
        {/* ═══ Hero ═══ */}
        <section
          style={{
            height: "70vh",
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            padding: isMobile ? "0 20px 60px" : "0 64px 80px",
            background: R.bgDark,
            overflow: "hidden",
          }}
        >
          <GrainOverlay opacity={0.05} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,24,20,0.95) 0%, rgba(28,24,20,0.4) 100%)" }} />

          {/* Floating bean shapes */}
          <div className="rs-bean-parallax" style={{ position: "absolute", top: "20%", right: "15%", width: 80, height: 40, borderRadius: "50%", background: R.accentLight, opacity: 0.04 }} />
          <div className="rs-bean-parallax" style={{ position: "absolute", top: "50%", left: "10%", width: 60, height: 30, borderRadius: "50%", background: R.accent, opacity: 0.05 }} />
          <div className="rs-bean-parallax" style={{ position: "absolute", bottom: "30%", right: "30%", width: 100, height: 50, borderRadius: "50%", background: R.accentLight, opacity: 0.03 }} />

          <div style={{ position: "relative", zIndex: 2, maxWidth: 700 }}>
            <span style={{ fontFamily: FB, fontSize: 11, letterSpacing: 6, color: R.accentLight, fontWeight: 500, display: "block", marginBottom: 24 }}>CURRENT SELECTION</span>
            <h1 className="rs-hero-curtain" style={{ fontFamily: FH, fontSize: "clamp(52px, 8vw, 96px)", fontWeight: 400, lineHeight: 1.0, color: R.cream }}>
              What&apos;s <em style={{ fontStyle: "italic", color: R.accentLight }}>roasting.</em>
            </h1>
            <p className="rs-hero-sub" style={{ fontFamily: FB, fontSize: 17, color: "rgba(250,246,238,0.5)", marginTop: 24, maxWidth: 460, lineHeight: 1.85 }}>
              Six single-origin lots, sourced direct from producers we know by name. Scroll to explore.
            </p>
          </div>
        </section>

        {/* ═══ Horizontal Scroll Carousel (Desktop) / Vertical Cards (Mobile) ═══ */}
        {!isMobile ? (
          <section className="rs-h-scroll" style={{ height: "100vh", position: "relative", overflow: "hidden", background: R.bg }}>
            <div className="rs-h-scroll-inner" ref={scrollRef} style={{ display: "flex", gap: 40, padding: "80px 64px", height: "100%", alignItems: "center", width: "fit-content" }}>
              {coffees.map((coffee) => {
                const t = tilt[coffee.name] || { x: 0, y: 0 };
                return (
                  <div
                    key={coffee.name}
                    onMouseMove={(e) => handleTilt(coffee.name, e)}
                    onMouseLeave={() => resetTilt(coffee.name)}
                    style={{
                      width: 380,
                      minWidth: 380,
                      background: R.cream,
                      border: `1px solid ${R.border}`,
                      overflow: "hidden",
                      transition: "box-shadow 0.4s",
                      transform: `perspective(800px) rotateY(${t.x}deg) rotateX(${t.y}deg)`,
                      boxShadow: t.x !== 0 ? "0 24px 64px rgba(28,24,20,0.12)" : "none",
                    }}
                  >
                    {/* Top image area */}
                    <div style={{ height: 200, background: R.bgDark, position: "relative", overflow: "hidden" }}>
                      <GrainOverlay opacity={0.04} />
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: FH, fontSize: 80, fontStyle: "italic", color: R.accentLight, opacity: 0.08 }}>{coffee.origin.split(",")[1]?.trim()}</span>
                      </div>
                      <div style={{ position: "absolute", top: 16, right: 16, padding: "5px 14px", background: R.accent, fontFamily: FB, fontSize: 10, color: R.cream, fontWeight: 700, letterSpacing: 1 }}>{coffee.process.toUpperCase()}</div>
                      <div style={{ position: "absolute", bottom: 16, left: 16, padding: "5px 14px", background: "rgba(250,246,238,0.1)", backdropFilter: "blur(8px)", fontFamily: FB, fontSize: 10, color: R.cream, fontWeight: 500, letterSpacing: 1 }}>{coffee.roast.toUpperCase()}</div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: 28 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                        <h3 style={{ fontFamily: FH, fontSize: 24, fontWeight: 600, lineHeight: 1.2 }}>{coffee.name}</h3>
                        <span style={{ fontFamily: FH, fontSize: 28, fontWeight: 400, fontStyle: "italic", color: R.accent }}>{coffee.price}</span>
                      </div>
                      <span style={{ fontFamily: FB, fontSize: 12, color: R.dim, display: "block", marginBottom: 4 }}>{coffee.origin} · {coffee.altitude}</span>

                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "16px 0" }}>
                        {coffee.notes.map((note) => (
                          <span key={note} style={{ padding: "4px 12px", background: `${R.accent}10`, border: `1px solid ${R.accent}20`, fontFamily: FB, fontSize: 11, color: R.accent, fontWeight: 500 }}>{note}</span>
                        ))}
                      </div>

                      <p style={{ fontFamily: FB, fontSize: 13, color: R.muted, lineHeight: 1.75 }}>{coffee.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Scroll hint */}
            <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 48, height: 2, background: R.accent, opacity: 0.4 }} />
              <span style={{ fontFamily: FB, fontSize: 11, color: R.dim, letterSpacing: 3 }}>SCROLL TO EXPLORE</span>
              <div style={{ width: 48, height: 2, background: R.accent, opacity: 0.4 }} />
            </div>
          </section>
        ) : (
          <section style={{ padding: "60px 20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {coffees.map((coffee) => (
                <div key={coffee.name} style={{ background: R.cream, border: `1px solid ${R.border}`, overflow: "hidden" }}>
                  <div style={{ height: 160, background: R.bgDark, position: "relative", overflow: "hidden" }}>
                    <GrainOverlay opacity={0.04} />
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: FH, fontSize: 60, fontStyle: "italic", color: R.accentLight, opacity: 0.08 }}>{coffee.origin.split(",")[1]?.trim()}</span>
                    </div>
                    <div style={{ position: "absolute", top: 12, right: 12, padding: "4px 12px", background: R.accent, fontFamily: FB, fontSize: 10, color: R.cream, fontWeight: 700 }}>{coffee.process.toUpperCase()}</div>
                  </div>
                  <div style={{ padding: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <h3 style={{ fontFamily: FH, fontSize: 22, fontWeight: 600 }}>{coffee.name}</h3>
                      <span style={{ fontFamily: FH, fontSize: 24, fontStyle: "italic", color: R.accent }}>{coffee.price}</span>
                    </div>
                    <span style={{ fontFamily: FB, fontSize: 12, color: R.dim }}>{coffee.origin} · {coffee.altitude}</span>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "14px 0" }}>
                      {coffee.notes.map((note) => (
                        <span key={note} style={{ padding: "3px 10px", background: `${R.accent}10`, fontFamily: FB, fontSize: 10, color: R.accent }}>{note}</span>
                      ))}
                    </div>
                    <p style={{ fontFamily: FB, fontSize: 13, color: R.muted, lineHeight: 1.75 }}>{coffee.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══ Category Sections with Wipe-In ═══ */}
        <section style={{ padding: isMobile ? "80px 20px" : "120px 64px", background: R.bgDark, position: "relative", overflow: "hidden" }}>
          <GrainOverlay opacity={0.04} />

          {/* Large ghosted text */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <span style={{ fontFamily: FH, fontSize: "clamp(150px, 20vw, 300px)", fontStyle: "italic", color: R.cream, opacity: 0.02, whiteSpace: "nowrap" }}>Categories</span>
          </div>

          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div style={{ marginBottom: 64 }}>
              <span style={{ fontFamily: FB, fontSize: 11, letterSpacing: 6, color: R.accentLight, fontWeight: 500 }}>BY CATEGORY</span>
              <h2 style={{ fontFamily: FH, fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 400, color: R.cream, lineHeight: 1.1, marginTop: 16 }}>
                Find your <em style={{ fontStyle: "italic", color: R.accentLight }}>profile.</em>
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 32 : 48 }}>
              {categories.map((cat, i) => (
                <div
                  key={cat.label}
                  className="rs-cat-wipe"
                  style={{
                    padding: isMobile ? "28px 20px" : "40px 48px",
                    background: "rgba(250,246,238,0.03)",
                    borderLeft: `3px solid ${R.accentLight}`,
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
                    gap: isMobile ? 16 : 48,
                    alignItems: "center",
                  }}
                >
                  <div>
                    <span style={{ fontFamily: FH, fontSize: 48, fontStyle: "italic", color: R.accentLight, opacity: 0.3 }}>{String(i + 1).padStart(2, "0")}</span>
                    <h3 style={{ fontFamily: FH, fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 600, color: R.cream, marginTop: 8 }}>{cat.label}</h3>
                  </div>
                  <div>
                    <p style={{ fontFamily: FB, fontSize: 15, color: "rgba(250,246,238,0.55)", lineHeight: 1.8, marginBottom: 16 }}>{cat.desc}</p>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      {coffees.filter((c) => cat.filter === "Honey" ? c.process === "Honey" : c.roast.includes(cat.filter)).map((c) => (
                        <span key={c.name} style={{ padding: "6px 16px", border: "1px solid rgba(250,246,238,0.1)", fontFamily: FB, fontSize: 12, color: R.accentLight, fontWeight: 500 }}>{c.name}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Subscription CTA ═══ */}
        <section className="rs-wipe-up" style={{ padding: isMobile ? "80px 20px" : "120px 64px", background: R.accent, textAlign: "center", position: "relative", overflow: "hidden" }}>
          <GrainOverlay opacity={0.06} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <span style={{ fontFamily: FB, fontSize: 11, letterSpacing: 6, color: "rgba(250,246,238,0.6)", fontWeight: 500 }}>SUBSCRIPTION</span>
            <h2 style={{ fontFamily: FH, fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 400, color: R.cream, lineHeight: 1.05, marginTop: 16 }}>
              Never run out of <em style={{ fontStyle: "italic" }}>good coffee.</em>
            </h2>
            <p style={{ fontFamily: FB, fontSize: 16, color: "rgba(250,246,238,0.7)", marginTop: 20, maxWidth: 460, margin: "20px auto 0", lineHeight: 1.8 }}>
              Roasted to order every Tuesday and Thursday. Shipped within 24 hours. Pause or cancel anytime.
            </p>

            <div style={{ display: "flex", gap: isMobile ? 12 : 20, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}>
              {[
                { plan: "Explorer", price: "$18/mo", note: "1 bag monthly" },
                { plan: "Enthusiast", price: "$32/mo", note: "2 bags bi-weekly" },
                { plan: "Devotee", price: "$56/mo", note: "4 bags weekly" },
              ].map((s) => (
                <div
                  key={s.plan}
                  style={{
                    padding: "24px 28px",
                    background: "rgba(250,246,238,0.1)",
                    border: "1px solid rgba(250,246,238,0.15)",
                    minWidth: 160,
                    textAlign: "center",
                    transition: "all 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(250,246,238,0.15)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(250,246,238,0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span style={{ fontFamily: FH, fontSize: 20, fontWeight: 600, color: R.cream, display: "block" }}>{s.plan}</span>
                  <span style={{ fontFamily: FB, fontSize: 22, fontWeight: 700, color: R.cream, display: "block", margin: "8px 0 4px" }}>{s.price}</span>
                  <span style={{ fontFamily: FB, fontSize: 11, color: "rgba(250,246,238,0.5)" }}>{s.note}</span>
                </div>
              ))}
            </div>

            <span
              style={{
                display: "inline-block",
                marginTop: 36,
                padding: "16px 48px",
                background: R.cream,
                color: R.accent,
                fontFamily: FB,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.2)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Start Subscription →
            </span>
          </div>
        </section>
      </div>
    </RoastLayout>
  );
}
