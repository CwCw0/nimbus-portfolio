"use client";

import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import PackageSection from "../PackageSection";
import CustomCursor from "../../../../components/CustomCursor";
import SmoothScroll from "../../../../components/SmoothScroll";
import { ArrowLeft, ArrowUpRight, Check, X } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

const GUMROAD_URL = "";
const PRICE = "RM 399";
const PRICE_USD = "$89 USD";

const designChoices = [
  { num: "01", title: "Neo-Brutalist Language", body: "3px solid borders. Hard box shadows (4px offset, no blur). Zero border-radius. Raw, honest, impossible to ignore. In a sea of rounded corners and soft shadows, hard edges stop the scroll. Tony's Chocolonely pioneered this for e-commerce." },
  { num: "02", title: "Per-Product Color Theming", body: "Each product card has its own background tint. Inspired by Simply Chocolate (Awwwards SOTD) where each product lives in its own visual world. Users identify products by colour before reading the name — that's faster browsing." },
  { num: "03", title: "Space Grotesk — Chunky & Fun", body: "Bold, geometric, slightly playful heading font paired with Inter for body. Says 'we're serious about quality but we don't take ourselves seriously.' The typographic equivalent of showing up to a board meeting in a great t-shirt." },
  { num: "04", title: "Warm Cream Base", body: "#FFF8F0 — not pure white. Makes the entire site warmer and more inviting. Pure white feels clinical (Elevate uses it intentionally). E-commerce wants approachable. The warm base makes the coral accent #FF6B35 sing instead of clash." },
  { num: "05", title: "Personality in Every Pixel", body: "Feature strips, irreverent copy, emoji as visual system, floating decorative elements. Inspired by Liquid Death and Graza — brands where the design IS the brand. The template teaches clients what fun looks like." },
];

const uxDecisions = [
  { title: "Visible Add-to-Cart", body: "Every product card shows the button by default — not hidden behind hover. On mobile, hover doesn't exist. Any template that hides purchase buttons behind hover is losing mobile conversions." },
  { title: "Feature Strip", body: "Scrolling marquee communicates key selling points without taking page real estate. 'FREE SHIPPING · 100% NATURAL · NO WEIRD STUFF' — three value props absorbed in 2 seconds." },
  { title: "Review Personality", body: "Testimonials with real personality, not corporate speak. 'Bought one. Then bought twelve more.' signals to clients what authentic reviews sound like." },
];

const included = [
  "7 sections (Nav, Hero, Feature Strip, Products, Categories, Reviews, CTA, Footer)",
  "Per-product colour theming system",
  "Neo-brutalist component library (borders, shadows, offset elements)",
  "Product cards with integrated CTA — always visible, never hover-gated",
  "Category browsing section (most templates skip this entirely)",
  "Mobile-first: single column, full-width images, large tap targets",
  "Accessible focus states on all interactive elements",
  "Next.js + Tailwind source code",
];

const excluded = [
  "No infinite scroll — kills SEO, can't share specific pages",
  "No 'quick view' modals — break back button, confuse users",
  "No star ratings on listings — 3 reviews at 5 stars isn't social proof, it's noise",
  "No 'sale' red badges — they cheapen the brand. Discount with style instead",
  "No auto-playing product videos — respect user choice and battery",
];

export default function PopStoreShowcase() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    const cleanups: (() => void)[] = [];
    const heading = headingRef.current;
    if (heading) {
      const split = new SplitType(heading, { types: "chars" });
      gsap.set(split.chars || [], { opacity: 0, y: 40 });
      gsap.to(split.chars || [], { opacity: 1, y: 0, duration: 0.5, stagger: 0.02, ease: "power3.out", delay: 0.3 });
      cleanups.push(() => split.revert());
    }
    const hero = heroRef.current;
    if (hero) {
      const subs = hero.querySelectorAll(".showcase-fade");
      gsap.set(subs, { opacity: 0, y: 30 });
      gsap.to(subs, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.5 });
    }
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <div className="flex w-full flex-col overflow-x-hidden bg-(--color-bg-primary)">
          <Header />
          <div className="flex items-center gap-2 px-16 pt-28 max-md:px-6 max-md:pt-24">
            <Link href="/work" className="flex items-center gap-2 font-body text-sm text-(--color-text-muted) transition-colors hover:text-(--color-text-primary)">
              <ArrowLeft className="h-4 w-4" /> Back to Work
            </Link>
          </div>

          <section ref={heroRef} className="w-full px-16 pt-12 pb-16 max-md:px-6">
            <div className="mx-auto max-w-250">
              <div className="flex items-center gap-3 mb-6">
                <span className="showcase-fade bg-(--color-accent-subtle) px-3 py-1 font-body text-[10px] font-medium tracking-[2px] text-(--color-accent)">TEMPLATE</span>
                <span className="showcase-fade font-body text-[11px] text-(--color-text-muted)">Fun E-Commerce</span>
              </div>
              <h1 ref={headingRef} className="font-display tracking-[-3px] text-(--color-text-primary)" style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 1.02 }}>Pop Store</h1>
              <p className="showcase-fade mt-6 max-w-160 font-body text-lg leading-[1.75] text-(--color-text-dim) max-md:text-base">
                A bold, personality-driven e-commerce template for brands that refuse to be boring. Neo-brutalist grid, per-product colour theming, chunky type, and attitude in every pixel.
              </p>
              <div className="showcase-fade mt-8 flex flex-wrap items-center gap-6">
                {["Next.js", "GSAP", "Tailwind"].map((t) => (
                  <span key={t} className="border border-(--color-border) px-3 py-1 font-body text-[11px] text-(--color-text-muted)">{t}</span>
                ))}
                <span className="font-body text-[13px] text-(--color-text-muted)">|</span>
                <span className="font-body text-[13px] font-medium text-(--color-text-primary)">{PRICE}</span>
                <span className="font-body text-[12px] text-(--color-text-muted)">{PRICE_USD}</span>
              </div>
              <div className="showcase-fade mt-10 flex items-center gap-4">
                {GUMROAD_URL ? (
                  <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-(--color-accent) px-8 py-4 font-body text-sm font-semibold text-white transition-all hover:scale-[1.03]">Get This Template <ArrowUpRight className="h-4 w-4" /></a>
                ) : (
                  <span className="flex items-center gap-2 bg-(--color-accent)/20 border border-(--color-accent)/30 px-8 py-4 font-body text-sm font-medium text-(--color-accent)">Coming Soon</span>
                )}
                <Link href="/work/designs/pop-store/preview" className="flex items-center gap-2 border border-(--color-border) px-8 py-4 font-body text-sm font-medium text-(--color-text-secondary) transition-all hover:border-(--color-accent-border)">Live Preview →</Link>
              </div>
            </div>
          </section>

          <div className="h-px w-full max-w-250 mx-auto bg-(--color-border)" />

          <section className="w-full px-16 py-24 max-md:px-6 max-md:py-16">
            <div className="mx-auto max-w-250">
              <div className="mb-16 flex items-center gap-4">
                <span className="font-body text-[10px] font-medium tracking-[4px] text-(--color-accent)">DESIGN CHOICES</span>
                <div className="h-px flex-1 bg-(--color-border)" />
              </div>
              <div className="flex flex-col gap-0">
                {designChoices.map((c) => (
                  <div key={c.num} className="flex gap-12 border-b border-(--color-border) py-10 max-md:flex-col max-md:gap-4">
                    <span className="font-display text-(--color-accent) opacity-15 shrink-0" style={{ fontSize: 56, lineHeight: 1 }}>{c.num}</span>
                    <div className="flex-1">
                      <h3 className="font-display text-[22px] tracking-[-0.5px] text-(--color-text-primary) mb-3">{c.title}</h3>
                      <p className="font-body text-[15px] leading-[1.75] text-(--color-text-dim) max-w-160">{c.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full px-16 py-24 max-md:px-6 max-md:py-16" style={{ background: "#0D0C14" }}>
            <div className="mx-auto max-w-250">
              <div className="mb-16 flex items-center gap-4">
                <span className="font-body text-[10px] font-medium tracking-[4px] text-(--color-accent)">UX DECISIONS</span>
                <div className="h-px flex-1 bg-(--color-border)" />
              </div>
              <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1">
                {uxDecisions.map((ux) => (
                  <div key={ux.title} className="flex flex-col gap-4 border border-(--color-border) p-8">
                    <h3 className="font-display text-lg text-(--color-text-primary)">{ux.title}</h3>
                    <p className="font-body text-[14px] leading-[1.7] text-(--color-text-dim)">{ux.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full px-16 py-24 max-md:px-6 max-md:py-16">
            <div className="mx-auto max-w-250 grid grid-cols-2 gap-16 max-md:grid-cols-1">
              <div>
                <div className="mb-10 flex items-center gap-4">
                  <span className="font-body text-[10px] font-medium tracking-[4px] text-(--color-accent)">WHAT&apos;S INCLUDED</span>
                  <div className="h-px flex-1 bg-(--color-border)" />
                </div>
                <div className="flex flex-col gap-4">
                  {included.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Check className="h-4 w-4 shrink-0 text-(--color-accent) mt-0.5" />
                      <span className="font-body text-[14px] leading-[1.6] text-(--color-text-secondary)">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-10 flex items-center gap-4">
                  <span className="font-body text-[10px] font-medium tracking-[4px] text-(--color-text-muted)">DELIBERATELY EXCLUDED</span>
                  <div className="h-px flex-1 bg-(--color-border)" />
                </div>
                <div className="flex flex-col gap-4">
                  {excluded.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <X className="h-4 w-4 shrink-0 text-(--color-text-muted) mt-0.5" />
                      <span className="font-body text-[14px] leading-[1.6] text-(--color-text-dim)">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="w-full px-16 py-16 max-md:px-6 max-md:py-10" style={{ background: "#0D0C14" }}>
            <div className="mx-auto max-w-250 text-center">
              <span className="font-body text-[10px] font-medium tracking-[4px] text-(--color-accent) mb-6 block">WHO THIS IS FOR</span>
              <p className="mx-auto max-w-160 font-body text-lg leading-[1.75] text-(--color-text-dim)">
                DTC brands, food & beverage, lifestyle products, streetwear, indie cosmetics, pet brands, craft goods — any brand with personality that wants their store to feel like their brand, not a Shopify default.
              </p>
            </div>
          </section>

          <section className="w-full px-16 py-16 max-md:px-6">
            <div className="mx-auto max-w-250">
              <span className="font-body text-[10px] font-medium tracking-[4px] text-(--color-text-muted) mb-8 block">DESIGN REFERENCES</span>
              <div className="flex flex-wrap gap-4">
                {["tonyschocolonely.com", "simplychocolate.com", "liquiddeath.com", "graza.co", "snif.co"].map((ref) => (
                  <span key={ref} className="border border-(--color-border) px-4 py-2 font-body text-[13px] text-(--color-text-muted)">{ref}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full px-16 py-24 max-md:px-6 max-md:py-16" style={{ background: "#0D0C14" }}>
            <div className="mx-auto max-w-200 text-center flex flex-col items-center gap-8">
              <h2 className="font-display tracking-[-2px] text-(--color-text-primary)" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>Get Pop Store.</h2>
              <p className="max-w-125 font-body text-[15px] leading-[1.75] text-(--color-text-dim)">Source code for an e-commerce template with more personality than most brands.</p>
              <div className="flex items-center gap-6">
                <span className="font-display text-[32px] text-(--color-text-primary)">{PRICE}</span>
                <span className="font-body text-sm text-(--color-text-muted)">{PRICE_USD}</span>
              </div>
              {GUMROAD_URL ? (
                <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-(--color-accent) px-10 py-4 font-body text-base font-semibold text-white transition-all hover:scale-[1.03]">Buy on Gumroad <ArrowUpRight className="h-4 w-4" /></a>
              ) : (
                <span className="flex items-center gap-2 bg-(--color-accent)/20 border border-(--color-accent)/30 px-10 py-4 font-body text-base font-medium text-(--color-accent)">Coming Soon</span>
              )}
              <p className="font-body text-[12px] text-(--color-text-muted)">Or <Link href="/contact" className="text-(--color-accent) underline">hire me to customise it</Link> for your brand.</p>
            </div>
          </section>

          <PackageSection price={PRICE} priceUsd={PRICE_USD} />

          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}
