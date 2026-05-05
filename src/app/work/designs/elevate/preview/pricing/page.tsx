"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ElevateLayout, E } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Starter",
    price: "0",
    period: "forever",
    desc: "For small teams getting started.",
    features: [
      "Up to 5 team members",
      "3 active projects",
      "Basic analytics",
      "Community support",
      "1 GB storage",
      "API access (100 req/min)",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "29",
    period: "per user/mo",
    desc: "For growing teams that need more power.",
    features: [
      "Unlimited team members",
      "Unlimited projects",
      "Advanced analytics & reports",
      "Priority support (< 4 hr)",
      "50 GB storage",
      "API access (unlimited)",
      "Custom workflows",
      "SSO with SAML",
    ],
    cta: "Start 14-Day Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored pricing",
    desc: "For organizations with complex needs.",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "99.99% uptime SLA",
      "SOC 2 Type II report",
      "SCIM provisioning",
      "Custom integrations",
      "On-premise deployment option",
      "Audit log & compliance tools",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const faqData = [
  {
    q: "Can I switch plans at any time?",
    a: "Absolutely. Upgrade or downgrade whenever you want. If you upgrade mid-cycle, we prorate the difference. If you downgrade, the change applies at the next billing period.",
  },
  {
    q: "Is there a free trial for Pro?",
    a: "Yes. Every Pro plan comes with a 14-day free trial. No credit card required. You get access to every Pro feature during the trial.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and wire transfer for Enterprise plans. All payments are processed securely through Stripe.",
  },
  {
    q: "What happens to my data if I downgrade?",
    a: "Your data is never deleted. If you exceed the limits of your new plan, you won't be able to create new projects until you're within limits, but existing data remains accessible.",
  },
  {
    q: "Do you offer discounts for nonprofits or startups?",
    a: "Yes. We offer 50% off Pro plans for registered nonprofits and early-stage startups (under $5M in funding). Contact our sales team to apply.",
  },
];

export default function PricingPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 769);
  }, []);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero
      el.querySelectorAll(".pr-hero-anim").forEach((node, i) => {
        gsap.fromTo(
          node,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: i * 0.12, ease: "power3.out" }
        );
      });

      // Pricing cards
      el.querySelectorAll(".pr-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });

      // FAQ items
      el.querySelectorAll(".pr-faq").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 90%", once: true },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <ElevateLayout>
      <div ref={pageRef}>
        {/* Hero */}
        <section
          style={{
            padding: isMobile ? "100px 20px 60px" : "140px 48px 80px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(${E.border} 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
              opacity: 0.5,
            }}
          />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
            <span
              className="pr-hero-anim"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: E.accent,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              Pricing
            </span>
            <h1
              className="pr-hero-anim"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? 36 : "clamp(40px, 5vw, 60px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginTop: 16,
              }}
            >
              Simple, transparent{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                pricing.
              </span>
            </h1>
            <p
              className="pr-hero-anim"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? 16 : 19,
                color: E.textMuted,
                marginTop: 20,
                lineHeight: 1.7,
              }}
            >
              Start free. Scale as you grow. No hidden fees, no surprises.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section style={{ padding: isMobile ? "20px 20px 80px" : "20px 48px 120px" }}>
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: 24,
              alignItems: "stretch",
            }}
          >
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="pr-card"
                style={{
                  padding: 36,
                  background: plan.highlighted ? E.bgDark : E.bgSoft,
                  color: plan.highlighted ? "#FFFFFF" : E.text,
                  border: plan.highlighted
                    ? `2px solid ${E.accent}`
                    : `1px solid ${E.border}`,
                  borderRadius: 18,
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = plan.highlighted
                    ? `0 20px 60px rgba(59,130,246,0.25)`
                    : `0 12px 40px ${E.accentGlow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {plan.highlighted && (
                  <div
                    style={{
                      position: "absolute",
                      top: -1,
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      padding: "4px 16px",
                      background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
                      borderRadius: 20,
                      fontFamily: "Inter, sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: 0.5,
                    }}
                  >
                    MOST POPULAR
                  </div>
                )}

                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  {plan.name}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    color: plan.highlighted ? "rgba(255,255,255,0.6)" : E.textMuted,
                    marginBottom: 24,
                  }}
                >
                  {plan.desc}
                </p>

                <div style={{ marginBottom: 28 }}>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: plan.price === "Custom" ? 36 : 48,
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {plan.price === "Custom" ? "Custom" : `$${plan.price}`}
                  </span>
                  {plan.price !== "Custom" && (
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 14,
                        color: plan.highlighted ? "rgba(255,255,255,0.5)" : E.textMuted,
                        marginLeft: 6,
                      }}
                    >
                      /{plan.period}
                    </span>
                  )}
                  {plan.price === "Custom" && (
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 14,
                        color: plan.highlighted ? "rgba(255,255,255,0.5)" : E.textMuted,
                        display: "block",
                        marginTop: 4,
                      }}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 14,
                        color: plan.highlighted ? "rgba(255,255,255,0.8)" : E.textMuted,
                        padding: "8px 0",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        borderBottom: `1px solid ${
                          plan.highlighted ? "rgba(255,255,255,0.08)" : E.border
                        }`,
                      }}
                    >
                      <span style={{ color: "#22C55E", fontSize: 14, fontWeight: 700 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: 28 }}>
                  {plan.name === "Enterprise" ? (
                    <Link
                      href="/work/designs/elevate/preview/contact"
                      style={{
                        display: "block",
                        padding: "14px 0",
                        textAlign: "center",
                        background: plan.highlighted
                          ? `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`
                          : E.text,
                        color: "#fff",
                        fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        fontWeight: 600,
                        borderRadius: 10,
                        cursor: "pointer",
                        textDecoration: "none",
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      {plan.cta}
                    </Link>
                  ) : (
                    <span
                      style={{
                        display: "block",
                        padding: "14px 0",
                        textAlign: "center",
                        background: plan.highlighted
                          ? `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`
                          : E.text,
                        color: "#fff",
                        fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        fontWeight: 600,
                        borderRadius: 10,
                        cursor: "pointer",
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      {plan.cta}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Comparison */}
        <section
          style={{
            padding: isMobile ? "60px 20px" : "100px 48px",
            background: E.bgSoft,
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: isMobile ? 28 : 36,
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                }}
              >
                Compare plans in detail.
              </h2>
            </div>
            <div
              style={{
                borderRadius: 16,
                border: `1px solid ${E.border}`,
                overflow: "hidden",
                background: E.bg,
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr 1fr 1fr 1fr" : "2fr 1fr 1fr 1fr",
                  padding: "16px 24px",
                  background: E.bgSoft,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: E.textMuted,
                  borderBottom: `1px solid ${E.border}`,
                }}
              >
                <span>Feature</span>
                <span style={{ textAlign: "center" }}>Starter</span>
                <span style={{ textAlign: "center", color: E.accent }}>Pro</span>
                <span style={{ textAlign: "center" }}>Enterprise</span>
              </div>
              {[
                { feature: "Team members", starter: "5", pro: "Unlimited", enterprise: "Unlimited" },
                { feature: "Projects", starter: "3", pro: "Unlimited", enterprise: "Unlimited" },
                { feature: "Storage", starter: "1 GB", pro: "50 GB", enterprise: "Unlimited" },
                { feature: "API rate limit", starter: "100/min", pro: "Unlimited", enterprise: "Unlimited" },
                { feature: "Analytics", starter: "Basic", pro: "Advanced", enterprise: "Custom" },
                { feature: "Support", starter: "Community", pro: "Priority", enterprise: "Dedicated" },
                { feature: "SSO / SAML", starter: "—", pro: "✓", enterprise: "✓" },
                { feature: "Audit logs", starter: "—", pro: "—", enterprise: "✓" },
                { feature: "Uptime SLA", starter: "—", pro: "99.9%", enterprise: "99.99%" },
              ].map((row, i, arr) => (
                <div
                  key={row.feature}
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr 1fr 1fr 1fr" : "2fr 1fr 1fr 1fr",
                    padding: "13px 24px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    borderBottom: i < arr.length - 1 ? `1px solid ${E.border}` : "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = E.bgSoft)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span style={{ fontWeight: 500 }}>{row.feature}</span>
                  <span style={{ textAlign: "center", color: E.textMuted }}>{row.starter}</span>
                  <span
                    style={{
                      textAlign: "center",
                      color: row.pro === "✓" ? "#22C55E" : E.text,
                      fontWeight: row.pro === "Unlimited" ? 600 : 400,
                    }}
                  >
                    {row.pro}
                  </span>
                  <span
                    style={{
                      textAlign: "center",
                      color: row.enterprise === "✓" ? "#22C55E" : E.text,
                      fontWeight: row.enterprise === "Unlimited" || row.enterprise === "Custom" ? 600 : 400,
                    }}
                  >
                    {row.enterprise}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: isMobile ? "80px 20px" : "120px 48px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: E.accent,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                }}
              >
                FAQ
              </span>
              <h2
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: isMobile ? 28 : 36,
                  fontWeight: 800,
                  marginTop: 12,
                  letterSpacing: "-0.025em",
                }}
              >
                Questions? Answered.
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {faqData.map((faq, i) => (
                <div
                  key={i}
                  className="pr-faq"
                  style={{
                    border: `1px solid ${openFaq === i ? E.accent : E.border}`,
                    borderRadius: 14,
                    overflow: "hidden",
                    transition: "border-color 0.3s",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%",
                      padding: "18px 24px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 15,
                      fontWeight: 600,
                      color: E.text,
                      textAlign: "left",
                    }}
                  >
                    {faq.q}
                    <span
                      style={{
                        fontSize: 18,
                        color: E.textMuted,
                        transition: "transform 0.3s",
                        transform: openFaq === i ? "rotate(45deg)" : "rotate(0)",
                        flexShrink: 0,
                        marginLeft: 16,
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: openFaq === i ? 200 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.35s ease",
                    }}
                  >
                    <p
                      style={{
                        padding: "0 24px 18px",
                        fontFamily: "Inter, sans-serif",
                        fontSize: 14,
                        color: E.textMuted,
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            padding: isMobile ? "60px 20px" : "100px 48px",
            background: E.bgDark,
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? 28 : "clamp(32px, 4vw, 48px)",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "-0.03em",
              }}
            >
              Still deciding?{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Talk to us.
              </span>
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 16,
                color: "rgba(255,255,255,0.55)",
                marginTop: 16,
                lineHeight: 1.7,
              }}
            >
              Our team will walk you through the platform and help you find the right plan.
            </p>
            <Link
              href="/work/designs/elevate/preview/contact"
              style={{
                display: "inline-block",
                padding: "16px 44px",
                background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
                color: "#fff",
                fontFamily: "Inter, sans-serif",
                fontSize: 16,
                fontWeight: 700,
                borderRadius: 10,
                textDecoration: "none",
                marginTop: 32,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Schedule a Demo
            </Link>
          </div>
        </section>
      </div>
    </ElevateLayout>
  );
}
