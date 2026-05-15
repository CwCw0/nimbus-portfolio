"use client";

import Image from "next/image";
import PackageSection from "../PackageSection";
import TemplateNav from "../TemplateNav";
import { ArrowLeft, ArrowUpRight, Check, X } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

/* ── REPLACE THIS with your Gumroad product URL when ready ── */
const GUMROAD_URL = "";

const designChoices = [
  {
    num: "01",
    title: "Two-Color Constraint",
    body: "Pitch black #050505 + single violet accent #7C5CFC. Every Awwwards SOTY in the studio category uses two colors maximum. When you remove colour variety, typography and spacing become the design. The eye has nowhere to hide.",
  },
  {
    num: "02",
    title: "Typography as Hero",
    body: "No hero image. No stock photography. The first thing you see is type — Instrument Serif at 120px. This says 'we're confident enough that we don't need imagery to make an impression.' It also loads instantly and scales perfectly.",
  },
  {
    num: "03",
    title: "120px+ Section Gaps",
    body: "Most templates cram sections at 40-60px. Studio Noir uses 140px. Premium design breathes. Monocle, Bloomberg, Wallpaper* — they all use generous whitespace. It communicates confidence without saying a word.",
  },
  {
    num: "04",
    title: "Vertical Project List",
    body: "Not a card grid — a vertical list. Each project gets a full-width row with hover-triggered image reveal. The pattern used by Dennis Snellenberg (Awwwards SOTD) and Locomotive (7x Agency of the Year). Scannable, dramatic, mobile-perfect.",
  },
  {
    num: "05",
    title: "Ghost Watermark",
    body: "The massive letter at 500px behind the hero — at 1.5% opacity. Adds depth and atmosphere without clutter. Creates a layered visual hierarchy that makes the page feel designed, not assembled.",
  },
];

const uxDecisions = [
  { title: "Sticky Navigation", body: "Fixed nav with section anchors. Transparent — doesn't compete with content. Users always know where they are." },
  { title: "Scroll-Triggered Reveals", body: "Every section has GSAP ScrollTrigger hooks. Characters stagger in, lines draw across, content fades up. Studies show scroll reveals increase time-on-page by 20-40%." },
  { title: "Marquee Section Breaker", body: "Scrolling text strip communicates capabilities at a glance and creates visual rhythm between hero and content sections." },
];

const included = [
  "6 sections (Hero, Marquee, Work, About, Services, Contact, Footer)",
  "Dark mode with carefully tuned opacity levels",
  "Responsive — same design intent on mobile, not a shrunken desktop",
  "Accessibility: proper contrast ratios, semantic HTML, skip-to-content",
  "Performance: zero external images in base — loads under 1 second",
  "GSAP class hooks on every section — animation-ready out of the box",
  "Next.js + Tailwind source code",
  "1-click Vercel deploy",
];

const excluded = [
  "No hamburger menu on desktop — never hide navigation from users who can see it",
  "No auto-playing video — performance killer, accessibility issue",
  "No parallax on mobile — drains battery, janky on touch",
  "No cookie banner — add your own if legally required, we don't bake tracking in",
];

export default function StudioNoirShowcase() {
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
        <div className="flex w-full flex-col overflow-x-hidden bg-(--ink-0)">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 px-16 pt-28 max-md:px-6 max-md:pt-24">
            <Link href="/work?view=lab" className="flex items-center gap-2 font-body text-sm text-(--fg-faint) transition-colors hover:text-(--fg)">
              <ArrowLeft className="h-4 w-4" />
              Design Lab
            </Link>
            <span className="font-body text-xs text-(--fg-faint)">/</span>
            <span className="font-body text-xs text-(--fg-dim)">Studio Noir</span>
          </div>

          {/* Hero */}
          <section ref={heroRef} className="w-full px-16 pt-12 pb-16 max-md:px-6">
            <div className="mx-auto max-w-250">
              <div className="flex items-center gap-3 mb-6">
                <span className="showcase-fade bg-(--accent-soft) px-3 py-1 font-body text-[10px] font-medium tracking-[2px] text-(--accent)">TEMPLATE</span>
                <span className="showcase-fade font-body text-[11px] text-(--fg-faint)">Dark Creative Studio</span>
              </div>

              <h1 ref={headingRef} className="font-display tracking-[-3px] text-(--fg)" style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 1.02 }}>
                Studio Noir
              </h1>

              <p className="showcase-fade mt-6 max-w-160 font-body text-lg leading-[1.75] text-(--fg-dim) max-md:text-base" style={{ textWrap: 'balance' } as React.CSSProperties}>
                A cinematic, animation-heavy website template for creative studios and design agencies.
                Pitch-black canvas, single violet accent, oversized editorial typography, GSAP-ready scroll animations.
              </p>

              {/* Meta row */}
              <div className="showcase-fade mt-8 flex flex-wrap items-center gap-6">
                {["Next.js", "GSAP", "Tailwind", "Lenis"].map((t) => (
                  <span key={t} className="border border-(--line) px-3 py-1 font-body text-[11px] text-(--fg-faint)">{t}</span>
                ))}
              </div>

              {/* CTA */}
              <div className="showcase-fade mt-10 flex items-center gap-4">
                {GUMROAD_URL ? (
                  <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-(--accent) px-8 py-4 font-body text-sm font-semibold text-white transition-all hover:scale-[1.03]">
                    Get This Template <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : (
                  <span className="flex items-center gap-2 bg-(--accent)/20 border border-(--accent)/30 px-8 py-4 font-body text-sm font-medium text-(--accent)">
                    Coming Soon
                  </span>
                )}
                <Link href="/work/designs/studio-noir/preview" className="flex items-center gap-2 border border-(--line) px-8 py-4 font-body text-sm font-medium text-(--fg-dim) transition-all hover:border-(--accent-2)">
                  Live Preview →
                </Link>
              </div>
            </div>
          </section>

          {/* Screenshot Gallery */}
          <section className="w-full px-16 pb-16 max-md:px-6">
            <div className="mx-auto max-w-250 flex flex-col gap-4">
              {/* Hero screenshot — full width */}
              <div className="overflow-hidden rounded-xl border border-(--line)">
                <Image
                  src="/images/templates/studio-noir/hero.png"
                  alt="Studio Noir homepage"
                  width={2000}
                  height={1200}
                  className="w-full object-cover"
                />
              </div>
              {/* Two-column row: inner page (wider) + mobile (narrower) */}
              <div className="grid gap-4" style={{ gridTemplateColumns: "2fr 1fr" }}>
                <div className="overflow-hidden rounded-xl border border-(--line)">
                  <Image
                    src="/images/templates/studio-noir/inner.png"
                    alt="Studio Noir inner page"
                    width={1400}
                    height={900}
                    className="w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-xl border border-(--line)">
                  <Image
                    src="/images/templates/studio-noir/mobile.png"
                    alt="Studio Noir mobile view"
                    width={600}
                    height={900}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="h-px w-full max-w-250 mx-auto bg-(--line)" />

          {/* Design Choices */}
          <section className="w-full px-16 py-24 max-md:px-6 max-md:py-16">
            <div className="mx-auto max-w-250">
              <div className="mb-16 flex items-center gap-4">
                <span className="font-body text-[10px] font-medium tracking-[4px] text-(--accent)">DESIGN CHOICES</span>
                <div className="h-px flex-1 bg-(--line)" />
              </div>

              <div className="flex flex-col gap-0">
                {designChoices.map((choice) => (
                  <div key={choice.num} className="flex gap-12 border-b border-(--line) py-10 max-md:flex-col max-md:gap-4">
                    <span className="font-display text-(--accent) opacity-15 shrink-0" style={{ fontSize: 56, lineHeight: 1 }}>{choice.num}</span>
                    <div className="flex-1">
                      <h3 className="font-display text-[22px] tracking-[-0.5px] text-(--fg) mb-3">{choice.title}</h3>
                      <p className="font-body text-[15px] leading-[1.75] text-(--fg-dim) max-w-160">{choice.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* UX Decisions */}
          <section className="w-full px-16 py-24 max-md:px-6 max-md:py-16" style={{ background: "#0D0C14" }}>
            <div className="mx-auto max-w-250">
              <div className="mb-16 flex items-center gap-4">
                <span className="font-body text-[10px] font-medium tracking-[4px] text-(--accent)">UX DECISIONS</span>
                <div className="h-px flex-1 bg-(--line)" />
              </div>

              <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1">
                {uxDecisions.map((ux) => (
                  <div key={ux.title} className="flex flex-col gap-4 border border-(--line) p-8">
                    <h3 className="font-display text-lg text-(--fg)">{ux.title}</h3>
                    <p className="font-body text-[14px] leading-[1.7] text-(--fg-dim)">{ux.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* What's Included / Excluded */}
          <section className="w-full px-16 py-24 max-md:px-6 max-md:py-16">
            <div className="mx-auto max-w-250">
              <div className="grid grid-cols-2 gap-16 max-md:grid-cols-1">
                {/* Included */}
                <div>
                  <div className="mb-10 flex items-center gap-4">
                    <span className="font-body text-[10px] font-medium tracking-[4px] text-(--accent)">WHAT&apos;S INCLUDED</span>
                    <div className="h-px flex-1 bg-(--line)" />
                  </div>
                  <div className="flex flex-col gap-4">
                    {included.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <Check className="h-4 w-4 shrink-0 text-(--accent) mt-0.5" />
                        <span className="font-body text-[14px] leading-[1.6] text-(--fg-dim)">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Excluded */}
                <div>
                  <div className="mb-10 flex items-center gap-4">
                    <span className="font-body text-[10px] font-medium tracking-[4px] text-(--fg-faint)">DELIBERATELY EXCLUDED</span>
                    <div className="h-px flex-1 bg-(--line)" />
                  </div>
                  <div className="flex flex-col gap-4">
                    {excluded.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <X className="h-4 w-4 shrink-0 text-(--fg-faint) mt-0.5" />
                        <span className="font-body text-[14px] leading-[1.6] text-(--fg-dim)">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Who This Is For */}
          <section className="w-full px-16 py-16 max-md:px-6 max-md:py-10" style={{ background: "#0D0C14" }}>
            <div className="mx-auto max-w-250 text-center">
              <span className="font-body text-[10px] font-medium tracking-[4px] text-(--accent) mb-6 block">WHO THIS IS FOR</span>
              <p className="mx-auto max-w-160 font-body text-lg leading-[1.75] text-(--fg-dim)" style={{ textWrap: 'balance' } as React.CSSProperties}>
                Creative studios, design agencies, freelance designers, photographers, architects —
                anyone whose work speaks for itself and needs a canvas that doesn&apos;t compete with it.
              </p>
            </div>
          </section>

          {/* References */}
          <section className="w-full px-16 py-16 max-md:px-6 max-md:py-10">
            <div className="mx-auto max-w-250">
              <span className="font-body text-[10px] font-medium tracking-[4px] text-(--fg-faint) mb-8 block">DESIGN REFERENCES</span>
              <div className="flex flex-wrap gap-4">
                {["unseen.co", "locomotive.ca", "obys.agency", "dennissnellenberg.com", "aristidebenoist.com"].map((ref) => (
                  <span key={ref} className="border border-(--line) px-4 py-2 font-body text-[13px] text-(--fg-faint)">{ref}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Get Template CTA */}
          <section className="w-full px-16 py-24 max-md:px-6 max-md:py-16" style={{ background: "#0D0C14" }}>
            <div className="mx-auto max-w-200 text-center flex flex-col items-center gap-8">
              <h2 className="font-display tracking-[-2px] text-(--fg)" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
                Get Studio Noir.
              </h2>
              <p className="max-w-125 font-body text-[15px] leading-[1.75] text-(--fg-dim)" style={{ textWrap: 'balance' } as React.CSSProperties}>
                Source code, documentation, and a design that stands apart from every template marketplace. Built by one person who cares about every pixel.
              </p>
              {GUMROAD_URL ? (
                <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-(--accent) px-10 py-4 font-body text-base font-semibold text-white transition-all hover:scale-[1.03]">
                  Get This Template <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <span className="flex items-center gap-2 bg-(--accent)/20 border border-(--accent)/30 px-10 py-4 font-body text-base font-medium text-(--accent)">
                  Coming Soon
                </span>
              )}
              <p className="font-body text-[12px] text-(--fg-faint)">
                Or <Link href="/contact" className="text-(--accent) underline">hire me to customise it</Link> for your brand.
              </p>
            </div>
          </section>

          <PackageSection />

          <TemplateNav current="studio-noir" />
        </div>
  );
}
