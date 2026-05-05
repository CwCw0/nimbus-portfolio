"use client";

/**
 * Roast — Locations page
 * 3 cafe locations with details, map placeholder, Visit Us CTA
 */

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RoastLayout, R, FH, FB, GrainOverlay, useIsMobile } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    name: "Downtown Flagship",
    address: "42 Roast Lane, Downtown District",
    city: "Portland, OR 97201",
    hours: { weekday: "Mon — Fri: 7:00am – 6:00pm", weekend: "Sat — Sun: 8:00am – 5:00pm" },
    phone: "(503) 555-0142",
    description: "Our original location and roastery. Floor-to-ceiling windows, a 25-seat bar facing the Loring roaster, and a brew bar serving all six single-origins as pour-over. This is where it all started — and where we still develop every roast profile.",
    features: ["Roastery on-site", "Brew bar", "Retail wall", "Wi-Fi"],
  },
  {
    name: "Uptown Studio",
    address: "118 Bean Street, Uptown Quarter",
    city: "Portland, OR 97209",
    hours: { weekday: "Mon — Fri: 7:00am – 5:00pm", weekend: "Sat — Sun: 8:00am – 4:00pm" },
    phone: "(503) 555-0118",
    description: "A quieter, more intimate space designed for focused work and long conversations. Exposed brick, communal tables, and a curated menu of espresso drinks and batch brew. The neighborhood&apos;s unofficial living room.",
    features: ["Quiet workspace", "Communal tables", "Pastry menu", "Wi-Fi"],
  },
  {
    name: "Harbour Kiosk",
    address: "7 Wharf Road, Harbour Front",
    city: "Portland, OR 97209",
    hours: { weekday: "Mon — Fri: 7:00am – 4:00pm", weekend: "Sat — Sun: 8:00am – 3:00pm" },
    phone: "(503) 555-0107",
    description: "A compact waterfront kiosk built for speed without sacrificing quality. Two-group espresso, cold brew on tap, and a rotating single-origin drip. Grab your coffee and walk the harbour trail.",
    features: ["Takeaway focus", "Cold brew tap", "Outdoor seating", "Dog friendly"],
  },
];

export default function RoastLocations() {
  const mainRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero text
      const heroEls = el.querySelectorAll(".rs-hero");
      gsap.set(heroEls, { y: 40, opacity: 0 });
      gsap.to(heroEls, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power2.out", delay: 0.3 });

      // Parallax on image placeholders
      el.querySelectorAll(".rs-parallax").forEach((img) => {
        gsap.to(img, {
          y: -50,
          ease: "none",
          scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 1.5 },
        });
      });

      // Location cards
      el.querySelectorAll(".rs-loc-card").forEach((card, i) => {
        gsap.fromTo(card, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: i * 0.15,
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

  return (
    <RoastLayout current="Locations">
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
          <div style={{ position: "absolute", top: "45%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <span style={{ fontSize: 260, opacity: 0.03, fontFamily: FH, fontStyle: "italic", color: R.cream }}>Visit</span>
          </div>

          <div style={{ position: "relative", zIndex: 1, maxWidth: 680 }}>
            <span className="rs-hero" style={{ fontFamily: FB, fontSize: 12, letterSpacing: 5, color: R.accentLight, fontWeight: 500, display: "block", marginBottom: 20 }}>OUR LOCATIONS</span>
            <h1 className="rs-hero" style={{ fontFamily: FH, fontSize: "clamp(48px, 7vw, 88px)", fontWeight: 400, lineHeight: 1.05, color: R.cream }}>
              Three locations. <em style={{ fontStyle: "italic", color: R.accentLight }}>One standard.</em>
            </h1>
            <p className="rs-hero" style={{ fontFamily: FB, fontSize: 17, color: "rgba(250,246,238,0.55)", marginTop: 20, maxWidth: 480, lineHeight: 1.8 }}>
              Each space is different, but the coffee is identical — roasted at our central roastery and delivered fresh daily.
            </p>
          </div>
        </section>

        {/* Location Cards */}
        <section style={{ padding: isMobile ? "80px 20px" : "120px 48px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: isMobile ? 48 : 64 }}>
            {locations.map((loc, idx) => (
              <div
                key={loc.name}
                className="rs-loc-card"
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : idx % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
                  gap: isMobile ? 24 : 48,
                  alignItems: "center",
                }}
              >
                {/* Image placeholder — alternating left/right on desktop */}
                <div
                  style={{
                    height: isMobile ? 260 : 420,
                    background: R.bgCard,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    order: isMobile ? 0 : idx % 2 === 1 ? 2 : 0,
                    border: `1px solid ${R.border}`,
                  }}
                >
                  <div className="rs-parallax" style={{ position: "absolute", inset: -30, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: FH, fontSize: 140, opacity: 0.05, fontStyle: "italic", color: R.accent }}>{String(idx + 1).padStart(2, "0")}</span>
                  </div>
                  <span style={{ position: "absolute", bottom: 16, left: 16, padding: "6px 14px", background: R.accent, fontFamily: FB, fontSize: 11, color: R.cream, fontWeight: 700, letterSpacing: 1 }}>
                    {loc.features[0].toUpperCase()}
                  </span>
                </div>

                {/* Info */}
                <div style={{ padding: isMobile ? 0 : "0 16px" }}>
                  <h2 style={{ fontFamily: FH, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, lineHeight: 1.15, marginBottom: 12 }}>{loc.name}</h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
                    <span style={{ fontFamily: FB, fontSize: 14, color: R.text }}>{loc.address}</span>
                    <span style={{ fontFamily: FB, fontSize: 14, color: R.dim }}>{loc.city}</span>
                    <span style={{ fontFamily: FB, fontSize: 14, color: R.accent, fontWeight: 500 }}>{loc.phone}</span>
                  </div>

                  <p style={{ fontFamily: FB, fontSize: 15, color: R.muted, lineHeight: 1.8, marginBottom: 20 }}>{loc.description}</p>

                  {/* Hours */}
                  <div style={{ padding: 20, background: R.cream, border: `1px solid ${R.border}`, marginBottom: 16 }}>
                    <span style={{ fontFamily: FB, fontSize: 11, letterSpacing: 3, color: R.dim, display: "block", marginBottom: 10, fontWeight: 500 }}>HOURS</span>
                    <p style={{ fontFamily: FB, fontSize: 14, color: R.text, lineHeight: 1.7 }}>
                      {loc.hours.weekday}<br />{loc.hours.weekend}
                    </p>
                  </div>

                  {/* Features */}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {loc.features.map((f) => (
                      <span key={f} style={{ padding: "5px 14px", background: R.bgCard, fontFamily: FB, fontSize: 12, color: R.muted, fontWeight: 500 }}>{f}</span>
                    ))}
                  </div>

                  <span
                    style={{
                      display: "inline-block",
                      marginTop: 24,
                      padding: "12px 28px",
                      background: R.accent,
                      color: R.cream,
                      fontFamily: FB,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(139,69,19,0.25)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    Get Directions →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Map Placeholder */}
        <section style={{ position: "relative" }}>
          <div
            style={{
              height: isMobile ? 300 : 450,
              background: R.bgCard,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              borderTop: `1px solid ${R.border}`,
              borderBottom: `1px solid ${R.border}`,
            }}
          >
            <span style={{ fontSize: 48, opacity: 0.15 }}>📍</span>
            <span style={{ fontFamily: FB, fontSize: 12, letterSpacing: 4, color: R.dim, fontWeight: 500 }}>INTERACTIVE MAP</span>
            <p style={{ fontFamily: FB, fontSize: 14, color: R.muted, maxWidth: 300, textAlign: "center", lineHeight: 1.6 }}>
              Map integration placeholder — Google Maps or Mapbox embed would render here.
            </p>
          </div>

          {/* Location pins on "map" */}
          {!isMobile && (
            <>
              {[
                { label: "Downtown", left: "30%", top: "35%" },
                { label: "Uptown", left: "55%", top: "25%" },
                { label: "Harbour", left: "72%", top: "55%" },
              ].map((pin) => (
                <div
                  key={pin.label}
                  style={{
                    position: "absolute",
                    left: pin.left,
                    top: pin.top,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: R.accent, boxShadow: `0 0 0 4px ${R.accentLight}` }} />
                  <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: R.accent, background: R.cream, padding: "2px 8px", whiteSpace: "nowrap" }}>{pin.label}</span>
                </div>
              ))}
            </>
          )}
        </section>

        {/* Visit Us CTA */}
        <section style={{ padding: isMobile ? "80px 20px" : "120px 48px", background: R.bgDark, position: "relative", overflow: "hidden", textAlign: "center" }}>
          <GrainOverlay />
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="rs-rev" style={{ fontFamily: FB, fontSize: 12, letterSpacing: 5, color: R.accentLight, fontWeight: 700 }}>VISIT US</span>
            <h2 className="rs-rev" style={{ fontFamily: FH, fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 400, color: R.cream, lineHeight: 1.08, marginTop: 16 }}>
              Your next great cup is <em style={{ fontStyle: "italic", color: R.accentLight }}>around the corner.</em>
            </h2>
            <p className="rs-rev" style={{ fontFamily: FB, fontSize: 16, color: "rgba(250,246,238,0.55)", marginTop: 20, maxWidth: 440, margin: "20px auto 0", lineHeight: 1.8 }}>
              Walk in. No reservation needed, no pretension at the door. Just well-made coffee, served by people who care.
            </p>

            <div className="rs-rev" style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 36, flexWrap: "wrap" }}>
              <span
                style={{
                  padding: "14px 36px",
                  background: R.accentLight,
                  color: R.bgDark,
                  fontFamily: FB,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(212,165,116,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                Order Ahead
              </span>
              <span
                style={{
                  padding: "14px 32px",
                  border: "1px solid rgba(250,246,238,0.2)",
                  color: R.cream,
                  fontFamily: FB,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = R.accentLight)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(250,246,238,0.2)")}
              >
                View Full Menu
              </span>
            </div>
          </div>
        </section>
      </div>
    </RoastLayout>
  );
}
