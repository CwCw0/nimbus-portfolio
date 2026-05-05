"use client";

/**
 * Roast — Coffee / Menu page
 * Full single-origin selection with filter by process type, subscription CTA
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
    notes: "Jasmine, bergamot, raw honey",
    price: "$22",
    description: "From the birthplace of coffee. This lot is meticulously washed at the Konga station, producing a tea-like clarity with intense florals. A quintessential Ethiopian cup.",
  },
  {
    name: "Colombia Huila",
    origin: "Huila, Colombia",
    altitude: "1,650 – 1,900m",
    process: "Natural",
    notes: "Cherry, dark chocolate, caramel",
    price: "$19",
    description: "Dried whole-cherry on raised beds for 21 days. The natural process amplifies the fruit-forward sweetness typical of Huila&apos;s volcanic soil.",
  },
  {
    name: "Guatemala Antigua",
    origin: "Antigua, Guatemala",
    altitude: "1,500 – 1,700m",
    process: "Washed",
    notes: "Blood orange, brown sugar, walnut",
    price: "$20",
    description: "Grown in the shadow of Volcán de Agua. Clean washed processing lets the terroir speak — rich, balanced, with a satisfying nutty finish.",
  },
  {
    name: "Kenya Nyeri AA",
    origin: "Nyeri County, Kenya",
    altitude: "1,700 – 1,900m",
    process: "Washed",
    notes: "Blackcurrant, grapefruit, tomato",
    price: "$24",
    description: "Kenya AA grade, double-washed with a 72-hour fermentation. The trademark bright acidity and complex fruit character that Kenyan coffees are celebrated for.",
  },
  {
    name: "Brazil Mogiana",
    origin: "São Paulo, Brazil",
    altitude: "900 – 1,100m",
    process: "Honey",
    notes: "Milk chocolate, hazelnut, dried fig",
    price: "$17",
    description: "Honey-processed at Fazenda Santa Lucia. The partial mucilage removal creates a rounded sweetness with creamy body — an exceptional daily drinker.",
  },
  {
    name: "Costa Rica Tarrazú",
    origin: "Tarrazú, Costa Rica",
    altitude: "1,400 – 1,800m",
    process: "Honey",
    notes: "Peach, marzipan, maple",
    price: "$21",
    description: "Yellow honey process from the legendary Tarrazú highlands. Silky body, stone-fruit sweetness, and a clean lingering finish. One of our favourite lots this season.",
  },
];

const processTypes = ["All", "Washed", "Natural", "Honey"];

export default function RoastCoffee() {
  const mainRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const filteredCoffees = activeFilter === "All"
    ? coffees
    : coffees.filter((c) => c.process === activeFilter);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero text
      const heroEls = el.querySelectorAll(".rs-hero");
      gsap.set(heroEls, { y: 40, opacity: 0 });
      gsap.to(heroEls, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power2.out", delay: 0.3 });

      // Coffee cards
      el.querySelectorAll(".rs-coffee-card").forEach((card, i) => {
        gsap.fromTo(card, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: i * 0.1,
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
      });

      // Reveals
      el.querySelectorAll(".rs-rev").forEach((item) => {
        gsap.fromTo(item, { y: 35, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Re-animate cards on filter change
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    el.querySelectorAll(".rs-coffee-card").forEach((card, i) => {
      gsap.fromTo(card, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: i * 0.08,
      });
    });
  }, [activeFilter]);

  return (
    <RoastLayout current="Coffee">
      <div ref={mainRef}>
        {/* Hero */}
        <section
          style={{
            minHeight: "60vh",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: isMobile ? "120px 20px 60px" : "160px 48px 80px",
            background: R.bgDark,
            overflow: "hidden",
          }}
        >
          <GrainOverlay />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,24,20,0.95), rgba(28,24,20,0.5))" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <span style={{ fontSize: 300, opacity: 0.03, fontFamily: FH, fontStyle: "italic", color: R.cream }}>Coffee</span>
          </div>

          <div style={{ position: "relative", zIndex: 1, maxWidth: 680 }}>
            <span className="rs-hero" style={{ fontFamily: FB, fontSize: 12, letterSpacing: 5, color: R.accentLight, fontWeight: 500, display: "block", marginBottom: 20 }}>CURRENT SELECTION</span>
            <h1 className="rs-hero" style={{ fontFamily: FH, fontSize: "clamp(48px, 7vw, 88px)", fontWeight: 400, lineHeight: 1.05, color: R.cream }}>
              What&apos;s <em style={{ fontStyle: "italic", color: R.accentLight }}>roasting.</em>
            </h1>
            <p className="rs-hero" style={{ fontFamily: FB, fontSize: 17, color: "rgba(250,246,238,0.55)", marginTop: 20, maxWidth: 480, lineHeight: 1.8 }}>
              Six single-origin lots, sourced direct from producers we know by name. Each roasted to highlight the character of its terroir.
            </p>
          </div>
        </section>

        {/* Filter bar */}
        <section style={{ padding: isMobile ? "40px 20px 0" : "60px 48px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontFamily: FB, fontSize: 12, letterSpacing: 3, color: R.dim, fontWeight: 500, marginRight: 8 }}>FILTER:</span>
            {processTypes.map((type) => (
              <button
                key={type}
                onClick={() => { setActiveFilter(type); setExpandedCard(null); }}
                style={{
                  padding: "8px 20px",
                  background: activeFilter === type ? R.accent : "transparent",
                  color: activeFilter === type ? R.cream : R.muted,
                  border: `1px solid ${activeFilter === type ? R.accent : R.border}`,
                  fontFamily: FB,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== type) {
                    e.currentTarget.style.borderColor = R.accent;
                    e.currentTarget.style.color = R.accent;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== type) {
                    e.currentTarget.style.borderColor = R.border;
                    e.currentTarget.style.color = R.muted;
                  }
                }}
              >
                {type}
              </button>
            ))}
            <span style={{ fontFamily: FB, fontSize: 13, color: R.dim, marginLeft: "auto" }}>
              {filteredCoffees.length} coffee{filteredCoffees.length !== 1 ? "s" : ""}
            </span>
          </div>
        </section>

        {/* Coffee cards */}
        <section style={{ padding: isMobile ? "40px 20px 80px" : "48px 48px 120px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 28 }}>
              {filteredCoffees.map((c) => {
                const isExpanded = expandedCard === c.name;
                return (
                  <div
                    key={c.name}
                    className="rs-coffee-card"
                    onClick={() => setExpandedCard(isExpanded ? null : c.name)}
                    style={{
                      background: R.cream,
                      border: `1px solid ${isExpanded ? R.accentLight : R.border}`,
                      overflow: "hidden",
                      transition: "all 0.4s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.boxShadow = "0 20px 56px rgba(28,24,20,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Image placeholder with parallax feel */}
                    <div style={{ height: 200, background: R.bgCard, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: `1px solid ${R.border}`, position: "relative", overflow: "hidden" }}>
                      <span style={{ fontFamily: FH, fontSize: 64, color: R.accent, opacity: 0.08, fontStyle: "italic", position: "absolute" }}>
                        {c.origin.split(",")[1]?.trim() || c.origin}
                      </span>
                      <div style={{ position: "absolute", top: 12, right: 12, padding: "4px 12px", background: R.accent, fontFamily: FB, fontSize: 11, color: R.cream, fontWeight: 700 }}>{c.process}</div>
                    </div>

                    <div style={{ padding: 28 }}>
                      {/* Header row */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                        <h3 style={{ fontFamily: FH, fontSize: 24, fontWeight: 600, lineHeight: 1.2 }}>{c.name}</h3>
                        <span style={{ fontFamily: FB, fontSize: 20, fontWeight: 700, color: R.accent }}>{c.price}</span>
                      </div>

                      {/* Origin details */}
                      <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                        <span style={{ fontFamily: FB, fontSize: 12, color: R.dim }}>{c.origin}</span>
                        <span style={{ fontFamily: FB, fontSize: 12, color: R.dim }}>|</span>
                        <span style={{ fontFamily: FB, fontSize: 12, color: R.dim }}>{c.altitude}</span>
                      </div>

                      {/* Tasting notes */}
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                        {c.notes.split(", ").map((note) => (
                          <span key={note} style={{ padding: "4px 12px", background: R.bgCard, fontFamily: FB, fontSize: 11, color: R.muted, fontWeight: 500 }}>{note}</span>
                        ))}
                      </div>

                      {/* Expandable description */}
                      <div style={{ maxHeight: isExpanded ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                        <p style={{ fontFamily: FB, fontSize: 14, color: R.muted, lineHeight: 1.75, paddingTop: 12, borderTop: `1px solid ${R.border}` }}>
                          {c.description}
                        </p>
                      </div>

                      <span style={{ fontFamily: FB, fontSize: 12, color: R.accent, fontWeight: 500, marginTop: 8, display: "inline-block" }}>
                        {isExpanded ? "Less" : "Read more"} {isExpanded ? "−" : "+"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Brewing Guide Teaser */}
        <section style={{ padding: isMobile ? "80px 20px" : "120px 48px", background: R.bgDark, position: "relative", overflow: "hidden" }}>
          <GrainOverlay />
          <div style={{ position: "absolute", top: "50%", right: -100, transform: "translateY(-50%)", opacity: 0.03 }}>
            <span style={{ fontFamily: FH, fontSize: 400, fontStyle: "italic", color: R.cream }}>brew</span>
          </div>

          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 64, alignItems: "center", position: "relative", zIndex: 1 }}>
            <div>
              <span className="rs-rev" style={{ fontFamily: FB, fontSize: 12, letterSpacing: 5, color: R.accentLight, fontWeight: 700 }}>BREWING GUIDE</span>
              <h2 className="rs-rev" style={{ fontFamily: FH, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: R.cream, lineHeight: 1.12, marginTop: 16 }}>
                Every bean has a <em style={{ fontStyle: "italic", color: R.accentLight }}>perfect brew.</em>
              </h2>
              <p className="rs-rev" style={{ fontFamily: FB, fontSize: 16, color: "rgba(250,246,238,0.55)", lineHeight: 1.85, marginTop: 20, maxWidth: 440 }}>
                We include a brew card with every bag — ratio, temperature, grind size, and timing for pour-over, AeroPress, French press, and espresso.
              </p>
            </div>

            <div className="rs-rev" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { method: "Pour Over", ratio: "1:16", temp: "96°C", time: "3:30" },
                { method: "AeroPress", ratio: "1:12", temp: "85°C", time: "2:00" },
                { method: "French Press", ratio: "1:15", temp: "93°C", time: "4:00" },
                { method: "Espresso", ratio: "1:2", temp: "93°C", time: "0:28" },
              ].map((m) => (
                <div key={m.method} style={{ padding: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(250,246,238,0.06)" }}>
                  <span style={{ fontFamily: FB, fontSize: 13, color: R.accentLight, fontWeight: 700, display: "block", marginBottom: 10 }}>{m.method}</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontFamily: FB, fontSize: 12, color: "rgba(250,246,238,0.45)" }}>Ratio: {m.ratio}</span>
                    <span style={{ fontFamily: FB, fontSize: 12, color: "rgba(250,246,238,0.45)" }}>Temp: {m.temp}</span>
                    <span style={{ fontFamily: FB, fontSize: 12, color: "rgba(250,246,238,0.45)" }}>Time: {m.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subscription CTA */}
        <section style={{ padding: isMobile ? "80px 20px" : "120px 48px", textAlign: "center" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <span className="rs-rev" style={{ fontFamily: FB, fontSize: 12, letterSpacing: 5, color: R.accent, fontWeight: 700 }}>SUBSCRIPTION</span>
            <h2 className="rs-rev" style={{ fontFamily: FH, fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 400, lineHeight: 1.1, marginTop: 16 }}>
              Never run out of <em style={{ fontStyle: "italic" }}>good coffee.</em>
            </h2>
            <p className="rs-rev" style={{ fontFamily: FB, fontSize: 16, color: R.muted, lineHeight: 1.8, marginTop: 20 }}>
              Choose your frequency. We roast to order every Tuesday and Thursday, and ship within 24 hours. Pause or cancel anytime — no contracts, no commitments.
            </p>

            <div className="rs-rev" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20, marginTop: 40 }}>
              {[
                { name: "Explorer", freq: "Monthly", bags: "1 bag", price: "$18/mo", desc: "A new single-origin each month, chosen by our roasters." },
                { name: "Enthusiast", freq: "Bi-Weekly", bags: "2 bags", price: "$32/mo", desc: "Two bags per month — one familiar, one adventurous. Our most popular plan." },
                { name: "Devotee", freq: "Weekly", bags: "4 bags", price: "$56/mo", desc: "Fresh coffee every week. For those who take their brew seriously." },
              ].map((plan) => (
                <div
                  key={plan.name}
                  style={{
                    padding: 28,
                    background: R.cream,
                    border: `1px solid ${plan.name === "Enthusiast" ? R.accent : R.border}`,
                    textAlign: "left",
                    transition: "all 0.4s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 16px 48px rgba(28,24,20,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {plan.name === "Enthusiast" && (
                    <span style={{ position: "absolute", top: -1, right: 16, padding: "4px 12px", background: R.accent, fontFamily: FB, fontSize: 10, color: R.cream, fontWeight: 700, letterSpacing: 1 }}>POPULAR</span>
                  )}
                  <h3 style={{ fontFamily: FH, fontSize: 22, fontWeight: 600, marginBottom: 4 }}>{plan.name}</h3>
                  <span style={{ fontFamily: FB, fontSize: 12, color: R.dim }}>{plan.freq} · {plan.bags}</span>
                  <p style={{ fontFamily: FB, fontSize: 24, fontWeight: 700, color: R.accent, margin: "16px 0 12px" }}>{plan.price}</p>
                  <p style={{ fontFamily: FB, fontSize: 13, color: R.muted, lineHeight: 1.7 }}>{plan.desc}</p>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: 20,
                      padding: "10px 24px",
                      background: plan.name === "Enthusiast" ? R.accent : "transparent",
                      color: plan.name === "Enthusiast" ? R.cream : R.accent,
                      border: `1px solid ${R.accent}`,
                      fontFamily: FB,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                  >
                    Subscribe
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </RoastLayout>
  );
}
