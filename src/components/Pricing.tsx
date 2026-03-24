"use client";

import { Check } from "lucide-react";
import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const tiers = [
  {
    name: "Starter",
    nameColor: "text-[var(--color-text-muted)]",
    price: "$2,500",
    period: "/ project",
    desc: "Perfect for freelancers and solopreneurs who need a polished web presence.",
    features: [
      "Landing page or portfolio site",
      "Basic SEO setup",
      "Mobile responsive design",
      "2 rounds of revisions",
    ],
    btnText: "Get Started",
    featured: false,
  },
  {
    name: "Growth",
    nameColor: "text-[var(--color-accent)]",
    price: "$5,000",
    period: "/ project",
    desc: "For startups and small businesses ready to scale with a full digital presence.",
    features: [
      "Multi-page website + blog",
      "Brand identity + UI/UX design",
      "SEO strategy + analytics",
      "AI chatbot integration",
      "Unlimited revisions",
    ],
    btnText: "Get Started",
    featured: true,
    badge: "Most Popular",
  },
  {
    name: "Contract",
    nameColor: "text-[var(--color-text-muted)]",
    price: "Custom",
    period: "/ month",
    desc: "Ongoing part-time dev contract. Dedicated hours each week, billed monthly.",
    features: [
      "10-20 hrs/week dedicated",
      "Full-stack dev + design",
      "Async communication",
      "Priority support + SLA",
    ],
    btnText: "Book a Call",
    featured: false,
  },
];

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref, ".pricing-card", 150);

  return (
    <section
      ref={ref}
      id="pricing"
      className="snap-section w-full bg-[var(--color-bg-secondary)] px-16 py-[100px] max-md:px-6 max-md:py-16"
    >
      <div className="mb-14 flex flex-col items-center gap-4">
        <span className="font-body text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
          05 / PRICING
        </span>
        <h2 className="font-display text-5xl tracking-[-1px] text-[var(--color-text-primary)] max-md:text-3xl">
          Simple, transparent pricing
        </h2>
        <p className="text-center font-body text-base text-[var(--color-text-dim)]">
          No hidden fees. No surprises. Pick the engagement model that fits your needs.
        </p>
      </div>

      <div className="flex w-full gap-5 max-md:flex-col">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`pricing-card flex flex-1 flex-col gap-7 border p-9 max-md:p-6 opacity-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_#7C5CFC10] ${
              t.featured
                ? "border-[#7C5CFC44] bg-gradient-to-b from-[var(--color-bg-card-alt)] to-[var(--color-bg-primary)]"
                : "border-[var(--color-border)] bg-[var(--color-bg-card)]"
            }`}
          >
            {t.badge && (
              <div className="w-fit bg-[#7C5CFC18] px-3 py-1">
                <span className="font-body text-[10px] font-medium tracking-[2px] text-[var(--color-accent)]">
                  {t.badge}
                </span>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <span className={`font-body text-sm font-semibold tracking-[1px] ${t.nameColor}`}>
                {t.name}
              </span>
              <div className="flex items-end gap-1">
                <span className="font-body text-4xl font-semibold tracking-[-1px] text-[var(--color-text-primary)]">
                  {t.price}
                </span>
                <span className="font-body text-sm text-[var(--color-text-dim)]">
                  {t.period}
                </span>
              </div>
              <p className="font-body text-sm leading-[1.6] text-[var(--color-text-dim)]">
                {t.desc}
              </p>
            </div>

            <div className="h-px w-full bg-[var(--color-border)]" />

            <div className="flex flex-col gap-3.5">
              {t.features.map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[var(--color-accent)]" />
                  <span className="font-body text-sm text-[var(--color-text-secondary)]">
                    {f}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="https://calendly.com/heyitsnimbus/30min"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex w-full items-center justify-center py-3.5 font-body text-sm font-semibold transition-all duration-300 hover:scale-[1.03] ${
                t.featured
                  ? "bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] text-white hover:shadow-[0_0_24px_#7C5CFC20]"
                  : "border border-[var(--color-border-light)] text-[var(--color-text-primary)] hover:border-[var(--color-accent-border)]"
              }`}
            >
              {t.btnText}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
