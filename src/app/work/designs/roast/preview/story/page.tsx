"use client";

/**
 * Roast — Story / About page
 * Origin story, sourcing philosophy, farm partnerships, roasting process, sustainability
 */

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RoastLayout, R, FH, FB, GrainOverlay, useIsMobile } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const roastingSteps = [
  {
    num: "01",
    title: "Green Sourcing",
    description: "We travel to origin countries 3–4 times a year, cupping hundreds of lots at washing stations and farm gates. We only buy coffees that score 84+ on the SCA scale. Every lot is traceable to the farm, the producer, and the harvest date.",
  },
  {
    num: "02",
    title: "Sample Roasting",
    description: "Before committing to a lot, we roast small 100g samples on our Ikawa Pro. We cup blind, score independently, and only green-light coffees that the whole team agrees on. No single palate decides.",
  },
  {
    num: "03",
    title: "Profile Development",
    description: "Each coffee gets a custom roast profile developed over 4–6 test batches on our Loring S35. We manipulate charge temperature, rate of rise, and development time to amplify the character the bean already has — never to mask it.",
  },
  {
    num: "04",
    title: "Quality Control",
    description: "Every production batch is cupped within 48 hours of roasting. We measure roast colour with a Tonino, check moisture content, and verify consistency against the reference profile. If a batch misses the mark, it doesn&apos;t ship.",
  },
];

const farmPartners = [
  { name: "Finca El Paraíso", location: "Huila, Colombia", producer: "Diego Samuel Bermúdez", relationship: "Since 2020", focus: "Experimental fermentation, thermal shock processing" },
  { name: "Konga Washing Station", location: "Gedeo, Ethiopia", producer: "Negusse Debela", relationship: "Since 2019", focus: "Raised-bed washed lots, single-varietal separation" },
  { name: "Finca Santa Lucia", location: "Mogiana, Brazil", producer: "Maria & João Carvalho", relationship: "Since 2021", focus: "Honey & natural processing, shade-grown Catuaí" },
];

export default function RoastStory() {
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

      // Parallax image placeholders
      el.querySelectorAll(".rs-parallax").forEach((img) => {
        gsap.to(img, {
          y: -60,
          ease: "none",
          scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 1.5 },
        });
      });

      // Clip reveals
      el.querySelectorAll(".rs-clip").forEach((img) => {
        gsap.fromTo(img, { clipPath: "inset(0 0 100% 0)" }, {
          clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power3.inOut",
          scrollTrigger: { trigger: img, start: "top 80%", once: true },
        });
      });

      // Reveals
      el.querySelectorAll(".rs-rev").forEach((item) => {
        gsap.fromTo(item, { y: 35, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
      });

      // Roasting steps stagger
      el.querySelectorAll(".rs-step").forEach((step, i) => {
        gsap.fromTo(step, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.12,
          scrollTrigger: { trigger: step, start: "top 88%", once: true },
        });
      });

      // Farm partner cards
      el.querySelectorAll(".rs-farm").forEach((card, i) => {
        gsap.fromTo(card, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: i * 0.1,
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <RoastLayout current="Story">
      <div ref={mainRef}>
        {/* Hero */}
        <section
          style={{
            minHeight: "70vh",
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
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,24,20,0.95), rgba(28,24,20,0.4))" }} />
          <div style={{ position: "absolute", top: "45%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <span style={{ fontSize: 280, opacity: 0.03, fontFamily: FH, fontStyle: "italic", color: R.cream }}>Story</span>
          </div>

          <div style={{ position: "relative", zIndex: 1, maxWidth: 680 }}>
            <span className="rs-hero" style={{ fontFamily: FB, fontSize: 12, letterSpacing: 5, color: R.accentLight, fontWeight: 500, display: "block", marginBottom: 20 }}>OUR STORY</span>
            <h1 className="rs-hero" style={{ fontFamily: FH, fontSize: "clamp(48px, 7vw, 92px)", fontWeight: 400, lineHeight: 1.05, color: R.cream }}>
              From a kitchen scale to <em style={{ fontStyle: "italic", color: R.accentLight }}>three roasteries.</em>
            </h1>
            <p className="rs-hero" style={{ fontFamily: FB, fontSize: 17, color: "rgba(250,246,238,0.55)", marginTop: 20, maxWidth: 500, lineHeight: 1.8 }}>
              We started home-roasting in a studio apartment in 2018. One popcorn popper, one kitchen scale, and a stubborn belief that specialty coffee didn&apos;t have to be pretentious.
            </p>
          </div>
        </section>

        {/* Origin story — editorial split */}
        <section style={{ padding: isMobile ? "80px 20px" : "120px 48px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center" }}>
            {/* Image placeholder */}
            <div className="rs-clip" style={{ height: isMobile ? 300 : 500, background: R.bgCard, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <div className="rs-parallax" style={{ position: "absolute", inset: -40, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 120, opacity: 0.08 }}>🌱</span>
              </div>
            </div>

            <div>
              <span className="rs-rev" style={{ fontFamily: FB, fontSize: 12, letterSpacing: 5, color: R.accent, fontWeight: 700 }}>THE BEGINNING</span>
              <h2 className="rs-rev" style={{ fontFamily: FH, fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.15, marginTop: 16 }}>
                It started with a question: <em style={{ fontStyle: "italic" }}>why does specialty coffee feel so exclusive?</em>
              </h2>
              <p className="rs-rev" style={{ fontFamily: FB, fontSize: 16, color: R.muted, lineHeight: 1.85, marginTop: 20 }}>
                We were tired of the gatekeeping. The jargon-heavy menus. The baristas who made you feel ignorant for asking questions. Coffee should be welcoming, and the best way to make it welcoming was to start our own thing.
              </p>
              <p className="rs-rev" style={{ fontFamily: FB, fontSize: 16, color: R.muted, lineHeight: 1.85, marginTop: 14 }}>
                The first year was all trial and error — 200g batches on a modified bread oven, selling to friends, refining profiles on weekends. By year two, we had outgrown the apartment and moved into a shared commercial kitchen. By year three, we had our first proper roaster: a 12kg Probat.
              </p>
              <p className="rs-rev" style={{ fontFamily: FB, fontSize: 16, color: R.muted, lineHeight: 1.85, marginTop: 14 }}>
                Today we operate three locations and a central roastery, but the philosophy hasn&apos;t changed: make great coffee feel approachable.
              </p>
            </div>
          </div>
        </section>

        {/* Sourcing Philosophy — dark section */}
        <section style={{ padding: isMobile ? "80px 20px" : "120px 48px", background: R.bgDark, position: "relative", overflow: "hidden" }}>
          <GrainOverlay />
          <div style={{ position: "absolute", top: "50%", right: -80, transform: "translateY(-50%)", opacity: 0.03 }}>
            <span style={{ fontFamily: FH, fontSize: 360, fontStyle: "italic", color: R.cream }}>source</span>
          </div>

          <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div style={{ maxWidth: 560, marginBottom: 64 }}>
              <span className="rs-rev" style={{ fontFamily: FB, fontSize: 12, letterSpacing: 5, color: R.accentLight, fontWeight: 700 }}>SOURCING PHILOSOPHY</span>
              <h2 className="rs-rev" style={{ fontFamily: FH, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: R.cream, lineHeight: 1.12, marginTop: 16 }}>
                We don&apos;t buy <em style={{ fontStyle: "italic", color: R.accentLight }}>coffee.</em> We buy <em style={{ fontStyle: "italic", color: R.accentLight }}>relationships.</em>
              </h2>
              <p className="rs-rev" style={{ fontFamily: FB, fontSize: 16, color: "rgba(250,246,238,0.55)", lineHeight: 1.85, marginTop: 20 }}>
                Every coffee on our menu is directly traded. We visit farms, meet producers face-to-face, and negotiate prices that are transparent and well above commodity rates. Fair Trade sets a floor — we set a higher one.
              </p>
            </div>

            {/* Key stats */}
            <div className="rs-rev" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 24, marginBottom: 64 }}>
              {[
                { stat: "100%", label: "Direct Trade" },
                { stat: "84+", label: "SCA Score Minimum" },
                { stat: "6", label: "Origin Countries" },
                { stat: "2.4x", label: "Above C-Market Price" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center", padding: 24, border: "1px solid rgba(250,246,238,0.06)" }}>
                  <span style={{ fontFamily: FH, fontSize: 40, fontWeight: 400, fontStyle: "italic", color: R.accentLight, display: "block" }}>{s.stat}</span>
                  <span style={{ fontFamily: FB, fontSize: 12, color: "rgba(250,246,238,0.4)", letterSpacing: 2, marginTop: 8, display: "block" }}>{s.label.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Farm Partnerships */}
        <section style={{ padding: isMobile ? "80px 20px" : "120px 48px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <span className="rs-rev" style={{ fontFamily: FB, fontSize: 12, letterSpacing: 5, color: R.accent, fontWeight: 700 }}>FARM PARTNERSHIPS</span>
            <h2 className="rs-rev" style={{ fontFamily: FH, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.12, marginTop: 16, marginBottom: 48 }}>
              The people behind the <em style={{ fontStyle: "italic" }}>beans.</em>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {farmPartners.map((farm) => (
                <div
                  key={farm.name}
                  className="rs-farm"
                  style={{
                    borderTop: `1px solid ${R.border}`,
                    padding: isMobile ? "28px 0" : "40px 0",
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                    gap: isMobile ? 16 : 32,
                    alignItems: "start",
                    transition: "all 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.paddingLeft = "16px";
                    e.currentTarget.style.background = R.cream;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.paddingLeft = "0";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div>
                    <h3 style={{ fontFamily: FH, fontSize: 24, fontWeight: 600, marginBottom: 4 }}>{farm.name}</h3>
                    <span style={{ fontFamily: FB, fontSize: 13, color: R.dim }}>{farm.location}</span>
                  </div>
                  <div>
                    <span style={{ fontFamily: FB, fontSize: 12, letterSpacing: 2, color: R.dim, display: "block", marginBottom: 4 }}>PRODUCER</span>
                    <span style={{ fontFamily: FB, fontSize: 15, color: R.text }}>{farm.producer}</span>
                    <span style={{ fontFamily: FB, fontSize: 12, color: R.accent, display: "block", marginTop: 4 }}>{farm.relationship}</span>
                  </div>
                  <div>
                    <span style={{ fontFamily: FB, fontSize: 12, letterSpacing: 2, color: R.dim, display: "block", marginBottom: 4 }}>FOCUS</span>
                    <span style={{ fontFamily: FB, fontSize: 14, color: R.muted, lineHeight: 1.6 }}>{farm.focus}</span>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${R.border}` }} />
            </div>
          </div>
        </section>

        {/* Roasting Process */}
        <section style={{ padding: isMobile ? "80px 20px" : "120px 48px", background: R.bgCard }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <span className="rs-rev" style={{ fontFamily: FB, fontSize: 12, letterSpacing: 5, color: R.accent, fontWeight: 700 }}>THE PROCESS</span>
              <h2 className="rs-rev" style={{ fontFamily: FH, fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 400, lineHeight: 1.1, marginTop: 16 }}>
                How we <em style={{ fontStyle: "italic" }}>roast.</em>
              </h2>
              <p className="rs-rev" style={{ fontFamily: FB, fontSize: 16, color: R.muted, lineHeight: 1.8, marginTop: 16, maxWidth: 520, margin: "16px auto 0" }}>
                From green bean to finished bag, every step is deliberate. No shortcuts, no auto-pilots, no compromise on consistency.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 24 }}>
              {roastingSteps.map((step) => (
                <div
                  key={step.num}
                  className="rs-step"
                  style={{
                    padding: 32,
                    background: R.cream,
                    border: `1px solid ${R.border}`,
                    transition: "all 0.4s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 16px 48px rgba(28,24,20,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span style={{ fontFamily: FH, fontSize: 48, color: R.accent, opacity: 0.15, fontStyle: "italic", display: "block", marginBottom: 12 }}>{step.num}</span>
                  <h3 style={{ fontFamily: FH, fontSize: 24, fontWeight: 600, marginBottom: 12 }}>{step.title}</h3>
                  <p style={{ fontFamily: FB, fontSize: 14, color: R.muted, lineHeight: 1.8 }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sustainability */}
        <section style={{ padding: isMobile ? "80px 20px" : "120px 48px", background: R.bgDark, position: "relative", overflow: "hidden" }}>
          <GrainOverlay />
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center", position: "relative", zIndex: 1 }}>
            <div>
              <span className="rs-rev" style={{ fontFamily: FB, fontSize: 12, letterSpacing: 5, color: R.accentLight, fontWeight: 700 }}>SUSTAINABILITY</span>
              <h2 className="rs-rev" style={{ fontFamily: FH, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: R.cream, lineHeight: 1.12, marginTop: 16 }}>
                Coffee should be good for <em style={{ fontStyle: "italic", color: R.accentLight }}>everyone.</em>
              </h2>
              <p className="rs-rev" style={{ fontFamily: FB, fontSize: 16, color: "rgba(250,246,238,0.55)", lineHeight: 1.85, marginTop: 20 }}>
                We believe the specialty coffee industry has a responsibility to the communities that grow it. That&apos;s not a marketing line — it&apos;s the reason we exist.
              </p>
            </div>

            <div className="rs-rev" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { title: "Above-Market Pricing", body: "We pay a minimum of 2x the C-market price for every lot. For exceptional microlots, we pay significantly more — because the quality justifies it." },
                { title: "Carbon-Neutral Shipping", body: "All shipments are offset through verified carbon credits. We partner with local logistics to minimize last-mile emissions." },
                { title: "Compostable Packaging", body: "Our bags are made from plant-based PLA film and kraft paper. Fully home-compostable within 12 weeks." },
                { title: "Community Reinvestment", body: "5% of every bag sold goes to the Roast Foundation — funding water infrastructure and education projects in origin communities." },
              ].map((item, i) => (
                <div key={item.title} style={{ padding: "20px 0", borderBottom: i < 3 ? "1px solid rgba(250,246,238,0.06)" : "none" }}>
                  <h4 style={{ fontFamily: FH, fontSize: 20, fontWeight: 600, color: R.cream, marginBottom: 6 }}>{item.title}</h4>
                  <p style={{ fontFamily: FB, fontSize: 14, color: "rgba(250,246,238,0.45)", lineHeight: 1.7 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: isMobile ? "80px 20px" : "120px 48px", background: R.accent, textAlign: "center" }}>
          <h2 className="rs-rev" style={{ fontFamily: FH, fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 400, color: R.cream, lineHeight: 1.08 }}>
            Taste the <em style={{ fontStyle: "italic" }}>difference.</em>
          </h2>
          <p className="rs-rev" style={{ fontFamily: FB, fontSize: 16, color: "rgba(250,246,238,0.7)", marginTop: 16, maxWidth: 400, margin: "16px auto 0" }}>
            See what happens when coffee is sourced with care and roasted with soul.
          </p>
          <span
            className="rs-rev"
            style={{
              display: "inline-block",
              marginTop: 32,
              padding: "16px 44px",
              background: R.cream,
              color: R.accent,
              fontFamily: FB,
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Shop Coffee →
          </span>
        </section>
      </div>
    </RoastLayout>
  );
}
