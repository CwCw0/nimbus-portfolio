"use client";

/**
 * Roast — Contact page
 * Editorial split layout (massive heading left, form right),
 * grain texture, parallax background, newsletter with editorial styling.
 */

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RoastLayout, R, FH, FB, GrainOverlay, useIsMobile } from "../shared";

gsap.registerPlugin(ScrollTrigger);

export default function RoastContact() {
  const mainRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero heading — wipe from left
      const heroHeading = el.querySelector(".rs-contact-hero-heading");
      if (heroHeading) {
        gsap.fromTo(heroHeading, { clipPath: "inset(0 100% 0 0)" }, {
          clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "power3.inOut", delay: 0.3,
        });
      }

      // Form panel — curtain wipe from bottom
      const formPanel = el.querySelector(".rs-form-panel");
      if (formPanel) {
        gsap.fromTo(formPanel, { clipPath: "inset(100% 0 0 0)" }, {
          clipPath: "inset(0 0 0 0)", duration: 1.2, ease: "power3.inOut", delay: 0.8,
        });
      }

      // Parallax on background elements
      el.querySelectorAll(".rs-contact-parallax").forEach((item, i) => {
        gsap.to(item, {
          y: (i + 1) * -50,
          ease: "none",
          scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: 1.5 },
        });
      });

      // Info items stagger reveal
      el.querySelectorAll(".rs-info-item").forEach((item, i) => {
        gsap.fromTo(item, { x: -30, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 1 + i * 0.12,
        });
      });

      // Newsletter section — wipe reveal
      const newsletter = el.querySelector(".rs-newsletter-wipe");
      if (newsletter) {
        gsap.fromTo(newsletter, { clipPath: "inset(0 0 100% 0)" }, {
          clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power3.inOut",
          scrollTrigger: { trigger: newsletter, start: "top 80%", once: true },
        });
      }

      // FAQ items wipe
      el.querySelectorAll(".rs-faq-item").forEach((item, i) => {
        gsap.fromTo(item, { clipPath: "inset(0 100% 0 0)" }, {
          clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.inOut",
          delay: i * 0.1,
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <RoastLayout current="Contact">
      <div ref={mainRef}>
        {/* ═══ Hero — Editorial Split (heading left, form right) ═══ */}
        <section
          style={{
            minHeight: "100vh",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Left panel — massive heading + info */}
          <div
            style={{
              background: R.bgDark,
              padding: isMobile ? "120px 20px 60px" : "160px 64px 80px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <GrainOverlay opacity={0.05} />

            {/* Parallax decorative elements */}
            <div className="rs-contact-parallax" style={{ position: "absolute", top: "15%", right: "10%", width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${R.accentLight}08 0%, transparent 70%)` }} />
            <div className="rs-contact-parallax" style={{ position: "absolute", bottom: "20%", left: "-5%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${R.accent}05 0%, transparent 70%)` }} />

            {/* Ghosted watermark */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
              <span style={{ fontFamily: FH, fontSize: "clamp(120px, 18vw, 280px)", fontStyle: "italic", color: R.cream, opacity: 0.02, whiteSpace: "nowrap" }}>Hello</span>
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={{ fontFamily: FB, fontSize: 11, letterSpacing: 6, color: R.accentLight, fontWeight: 500, display: "block", marginBottom: 28 }}>GET IN TOUCH</span>

              <h1 className="rs-contact-hero-heading" style={{ fontFamily: FH, fontSize: "clamp(52px, 8vw, 100px)", fontWeight: 400, lineHeight: 0.95, color: R.cream, marginBottom: 36 }}>
                Let&apos;s talk<br /><em style={{ fontStyle: "italic", color: R.accentLight }}>coffee.</em>
              </h1>

              <p style={{ fontFamily: FB, fontSize: 16, color: "rgba(250,246,238,0.5)", lineHeight: 1.85, maxWidth: 400, marginBottom: 48 }}>
                Whether you&apos;re a wholesale buyer, a cafe owner looking for a roasting partner, or just want to say hello — we&apos;d love to hear from you.
              </p>

              {/* Contact info items */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {[
                  { label: "EMAIL", value: "hello@roastcoffee.co" },
                  { label: "PHONE", value: "+1 (503) 555-0142" },
                  { label: "WHOLESALE", value: "wholesale@roastcoffee.co" },
                  { label: "CAREERS", value: "jobs@roastcoffee.co" },
                ].map((item) => (
                  <div key={item.label} className="rs-info-item" style={{ borderLeft: `2px solid ${R.accentLight}30`, paddingLeft: 20 }}>
                    <span style={{ fontFamily: FB, fontSize: 10, letterSpacing: 3, color: "rgba(250,246,238,0.3)", display: "block", marginBottom: 4 }}>{item.label}</span>
                    <span style={{ fontFamily: FB, fontSize: 16, color: R.cream, fontWeight: 500 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel — form */}
          <div
            className="rs-form-panel"
            style={{
              background: R.bg,
              padding: isMobile ? "60px 20px 80px" : "160px 64px 80px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <span style={{ fontFamily: FB, fontSize: 11, letterSpacing: 5, color: R.accent, fontWeight: 700, display: "block", marginBottom: 32 }}>SEND A MESSAGE</span>

            <form style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {[
                { label: "NAME", placeholder: "Your name", type: "text" },
                { label: "EMAIL", placeholder: "your@email.com", type: "email" },
                { label: "SUBJECT", placeholder: "Wholesale / Partnership / General", type: "text" },
              ].map((field) => (
                <div key={field.label}>
                  <label style={{ fontFamily: FB, fontSize: 10, letterSpacing: 3, color: R.dim, display: "block", marginBottom: 10 }}>{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      borderBottom: `1px solid ${R.border}`,
                      padding: "14px 0",
                      fontFamily: FB,
                      fontSize: 16,
                      color: R.text,
                      outline: "none",
                      transition: "border-color 0.3s",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = R.accent)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = R.border)}
                  />
                </div>
              ))}

              <div>
                <label style={{ fontFamily: FB, fontSize: 10, letterSpacing: 3, color: R.dim, display: "block", marginBottom: 10 }}>MESSAGE</label>
                <textarea
                  placeholder="Tell us what&apos;s on your mind..."
                  rows={5}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    borderBottom: `1px solid ${R.border}`,
                    padding: "14px 0",
                    fontFamily: FB,
                    fontSize: 16,
                    color: R.text,
                    outline: "none",
                    resize: "vertical",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = R.accent)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = R.border)}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: "16px 44px",
                  background: R.accent,
                  color: R.cream,
                  border: "none",
                  fontFamily: FB,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  alignSelf: "flex-start",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(139,69,19,0.25)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                Send Message →
              </button>
            </form>
          </div>
        </section>

        {/* ═══ Newsletter — editorial style ═══ */}
        <section className="rs-newsletter-wipe" style={{ padding: isMobile ? "80px 20px" : "120px 64px", background: R.bgDark, position: "relative", overflow: "hidden" }}>
          <GrainOverlay opacity={0.05} />

          {/* Parallax background element */}
          <div className="rs-contact-parallax" style={{ position: "absolute", top: "-20%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${R.accentLight}05 0%, transparent 60%)` }} />

          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <span style={{ fontFamily: FB, fontSize: 11, letterSpacing: 6, color: R.accentLight, fontWeight: 500 }}>NEWSLETTER</span>
            <h2 style={{ fontFamily: FH, fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 400, color: R.cream, lineHeight: 1.1, marginTop: 16 }}>
              Fresh roasts, <em style={{ fontStyle: "italic", color: R.accentLight }}>first.</em>
            </h2>
            <p style={{ fontFamily: FB, fontSize: 16, color: "rgba(250,246,238,0.5)", lineHeight: 1.85, marginTop: 20, maxWidth: 480, margin: "20px auto 0" }}>
              New single-origin drops, behind-the-scenes roastery updates, and first access to limited releases. No spam, no fluff — just coffee.
            </p>

            {/* Email input — editorial style */}
            <div style={{ display: "flex", gap: 0, maxWidth: 480, margin: "40px auto 0", flexDirection: isMobile ? "column" : "row" }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: `1px solid rgba(250,246,238,0.15)`,
                  borderRight: isMobile ? `1px solid rgba(250,246,238,0.15)` : "none",
                  padding: "16px 20px",
                  fontFamily: FB,
                  fontSize: 15,
                  color: R.cream,
                  outline: "none",
                }}
              />
              <button
                style={{
                  padding: "16px 32px",
                  background: R.accentLight,
                  color: R.bgDark,
                  border: "none",
                  fontFamily: FB,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "opacity 0.3s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Subscribe
              </button>
            </div>

            <span style={{ fontFamily: FB, fontSize: 12, color: "rgba(250,246,238,0.25)", display: "block", marginTop: 16 }}>
              Join 2,400+ coffee people. Unsubscribe anytime.
            </span>
          </div>
        </section>

        {/* ═══ FAQ — editorial wipe reveals ═══ */}
        <section style={{ padding: isMobile ? "80px 20px" : "120px 64px", position: "relative" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr", gap: isMobile ? 32 : 80 }}>
              {/* Left heading */}
              <div>
                <span style={{ fontFamily: FB, fontSize: 11, letterSpacing: 5, color: R.accent, fontWeight: 700, display: "block", marginBottom: 16 }}>FAQ</span>
                <h2 style={{ fontFamily: FH, fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.15 }}>
                  Common <em style={{ fontStyle: "italic" }}>questions.</em>
                </h2>
              </div>

              {/* Right — FAQ items */}
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { q: "Do you ship internationally?", a: "Yes. We ship to 40+ countries via DHL Express. Most orders arrive within 5-7 business days." },
                  { q: "What&apos;s your wholesale minimum?", a: "5kg per order, any combination of origins. We offer custom white-label roasting from 20kg per SKU." },
                  { q: "Can I visit the roastery?", a: "Absolutely. Our Downtown Flagship has an open roastery — you can watch production roasting every weekday morning." },
                  { q: "How fresh is the coffee when it arrives?", a: "We roast to order every Tuesday and Thursday. Most domestic orders arrive within 2-3 days of roasting." },
                ].map((faq, i) => (
                  <div
                    key={i}
                    className="rs-faq-item"
                    style={{
                      padding: "28px 0",
                      borderBottom: `1px solid ${R.border}`,
                    }}
                  >
                    <h4 style={{ fontFamily: FH, fontSize: 20, fontWeight: 600, marginBottom: 10, color: R.text }}>{faq.q}</h4>
                    <p style={{ fontFamily: FB, fontSize: 14, color: R.muted, lineHeight: 1.8 }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Location quick reference ═══ */}
        <section style={{ padding: isMobile ? "60px 20px" : "80px 64px", background: R.cream, borderTop: `1px solid ${R.border}` }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 32 }}>
            {[
              { name: "Downtown Flagship", address: "42 Roast Lane", hours: "7am – 6pm daily" },
              { name: "Uptown Studio", address: "118 Bean Street", hours: "7am – 5pm daily" },
              { name: "Harbour Kiosk", address: "7 Wharf Road", hours: "7am – 4pm daily" },
            ].map((loc) => (
              <div key={loc.name} style={{ textAlign: "center" }}>
                <h4 style={{ fontFamily: FH, fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{loc.name}</h4>
                <span style={{ fontFamily: FB, fontSize: 13, color: R.muted, display: "block" }}>{loc.address}</span>
                <span style={{ fontFamily: FB, fontSize: 12, color: R.dim, display: "block", marginTop: 4 }}>{loc.hours}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </RoastLayout>
  );
}
