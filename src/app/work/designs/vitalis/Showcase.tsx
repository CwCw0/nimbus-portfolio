"use client";
import Image from "next/image";
import PackageSection from "../PackageSection";
import TemplateNav from "../TemplateNav";
import { ArrowLeft, ArrowUpRight, Check, X } from "lucide-react";
import Link from "next/link";

const GUMROAD_URL = "";

export default function Showcase() {
  return (
        <div className="flex w-full flex-col overflow-x-hidden bg-(--ink-0)">
          <div className="flex items-center gap-2 px-16 pt-28 max-md:px-6 max-md:pt-24">
            <Link href="/work?view=lab" className="flex items-center gap-2 font-body text-sm text-(--fg-faint) transition-colors hover:text-(--fg)"><ArrowLeft className="h-4 w-4" /> Design Lab</Link>
            <span className="font-body text-xs text-(--fg-faint)">/</span>
            <span className="font-body text-xs text-(--fg-dim)">Vitalis</span>
          </div>

          <section className="w-full px-16 pt-12 pb-16 max-md:px-6">
            <div className="mx-auto max-w-250">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-(--accent-soft) px-3 py-1 font-body text-[10px] font-medium tracking-[2px] text-(--accent)">TEMPLATE</span>
                <span className="font-body text-[11px] text-(--fg-faint)">Healthcare & Wellness</span>
              </div>
              <h1 className="font-display tracking-[-3px] text-(--fg)" style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 1.02 }}>Vitalis</h1>
              <p className="mt-6 max-w-160 font-body text-lg leading-[1.75] text-(--fg-dim)" style={{ textWrap: 'balance' } as React.CSSProperties}>A warm, calming healthcare template that breaks free from clinical sterility. Soft greens, rounded elements, booking CTAs, trust indicators. For physio clinics, wellness centres, and medical practices.</p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                {["Next.js", "GSAP", "Tailwind"].map((t) => (<span key={t} className="border border-(--line) px-3 py-1 font-body text-[11px] text-(--fg-faint)">{t}</span>))}
              </div>
              <div className="mt-10 flex items-center gap-4">
                {GUMROAD_URL ? (
                  <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-(--accent) px-8 py-4 font-body text-sm font-semibold text-white">Get This Template <ArrowUpRight className="h-4 w-4" /></a>
                ) : (
                  <span className="flex items-center gap-2 bg-(--accent)/20 border border-(--accent)/30 px-8 py-4 font-body text-sm font-medium text-(--accent)">Coming Soon</span>
                )}
                <Link href="/work/designs/vitalis/preview" className="flex items-center gap-2 border border-(--line) px-8 py-4 font-body text-sm font-medium text-(--fg-dim) transition-all hover:border-(--accent-2)">Live Preview →</Link>
              </div>
            </div>
          </section>

          {/* Screenshot Gallery */}
          <section className="w-full px-16 pb-16 max-md:px-6">
            <div className="mx-auto max-w-250 flex flex-col gap-4">
              {/* Hero screenshot — full width */}
              <div className="overflow-hidden rounded-xl border border-(--line)">
                <Image
                  src="/images/templates/vitalis/hero.png"
                  alt="Vitalis homepage"
                  width={2000}
                  height={1200}
                  className="w-full object-cover"
                />
              </div>
              {/* Two-column row: inner page (wider) + mobile (narrower) */}
              <div className="grid gap-4" style={{ gridTemplateColumns: "2fr 1fr" }}>
                <div className="overflow-hidden rounded-xl border border-(--line)">
                  <Image
                    src="/images/templates/vitalis/inner.png"
                    alt="Vitalis inner page"
                    width={1400}
                    height={900}
                    className="w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-xl border border-(--line)">
                  <Image
                    src="/images/templates/vitalis/mobile.png"
                    alt="Vitalis mobile view"
                    width={600}
                    height={900}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="h-px w-full max-w-250 mx-auto bg-(--line)" />

          <section className="w-full px-16 py-24 max-md:px-6">
            <div className="mx-auto max-w-250">
              <div className="mb-16 flex items-center gap-4"><span className="font-body text-[10px] font-medium tracking-[4px] text-(--accent)">DESIGN CHOICES</span><div className="h-px flex-1 bg-(--line)" /></div>
              {[
                { num: "01", title: "Soft Green Palette", body: "Sage #3D8B70 on warm cream #FAFAF7 — communicates health, trust, calm. NOT the clinical blue/white that screams 'hospital.' Inspired by Parsley Health and Hims." },
                { num: "02", title: "Playfair Display + Plus Jakarta Sans", body: "Serif for headings (warmth, editorial weight), geometric sans for body (modern, readable). This pairing says 'premium wellness' — not 'WebMD.'" },
                { num: "03", title: "Rounded Everything", body: "12px+ border radius on all cards and buttons. Rounded corners feel approachable and safe — critical for healthcare where patients are anxious. Sharp edges feel corporate." },
                { num: "04", title: "Trust Indicators Everywhere", body: "Stats in the hero, 'Verified Clinic' floating badge, Google rating, years of experience. Healthcare visitors need trust signals immediately — they're making decisions about their body." },
                { num: "05", title: "Booking-First CTA", body: "Primary button is always 'Book Now' — not 'Learn More.' A healthcare site's #1 job is converting visitors to appointments. Every section pushes toward booking." },
              ].map((c) => (
                <div key={c.num} className="flex gap-12 border-b border-(--line) py-10 max-md:flex-col max-md:gap-4">
                  <span className="font-display text-(--accent) opacity-15 shrink-0" style={{ fontSize: 56, lineHeight: 1 }}>{c.num}</span>
                  <div className="flex-1"><h3 className="font-display text-[22px] tracking-[-0.5px] text-(--fg) mb-3">{c.title}</h3><p className="font-body text-[15px] leading-[1.75] text-(--fg-dim) max-w-160">{c.body}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section className="w-full px-16 py-24 max-md:px-6" style={{ background: "#0D0C14" }}>
            <div className="mx-auto max-w-250 grid grid-cols-2 gap-16 max-md:grid-cols-1">
              <div>
                <div className="mb-10 flex items-center gap-4"><span className="font-body text-[10px] font-medium tracking-[4px] text-(--accent)">WHAT&apos;S INCLUDED</span><div className="h-px flex-1 bg-(--line)" /></div>
                {["7 sections (Nav, Hero, Services, Why Us, Testimonials, Booking CTA, Footer)", "Rounded component library (cards, buttons, badges)", "Booking-first CTA hierarchy", "Trust indicators (stats, verified badge, ratings)", "Mobile-responsive with proper tap targets", "Accessible contrast ratios (WCAG AA)", "Next.js + Tailwind source"].map((item) => (
                  <div key={item} className="flex items-start gap-3 mb-4"><Check className="h-4 w-4 shrink-0 text-(--accent) mt-0.5" /><span className="font-body text-[14px] leading-[1.6] text-(--fg-dim)">{item}</span></div>
                ))}
              </div>
              <div>
                <div className="mb-10 flex items-center gap-4"><span className="font-body text-[10px] font-medium tracking-[4px] text-(--fg-faint)">EXCLUDED</span><div className="h-px flex-1 bg-(--line)" /></div>
                {["No patient portal (separate product, not a template feature)", "No HIPAA/PDPA compliance built-in (consult your legal team)", "No appointment system backend (integrate with Calendly, Acuity, etc.)", "No stock medical photos (use your own practitioners and clinic)"].map((item) => (
                  <div key={item} className="flex items-start gap-3 mb-4"><X className="h-4 w-4 shrink-0 text-(--fg-faint) mt-0.5" /><span className="font-body text-[14px] leading-[1.6] text-(--fg-dim)">{item}</span></div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full px-16 py-24 max-md:px-6" style={{ background: "#0D0C14" }}>
            <div className="mx-auto max-w-200 text-center flex flex-col items-center gap-8">
              <h2 className="font-display tracking-[-2px] text-(--fg)" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>Get Vitalis.</h2>
              {GUMROAD_URL ? (
                <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-(--accent) px-10 py-4 font-body text-base font-semibold text-white">Get This Template <ArrowUpRight className="h-4 w-4" /></a>
              ) : (
                <span className="flex items-center gap-2 bg-(--accent)/20 border border-(--accent)/30 px-10 py-4 font-body text-base font-medium text-(--accent)">Coming Soon</span>
              )}
              <p className="font-body text-[12px] text-(--fg-faint)">Or <Link href="/contact" className="text-(--accent) underline">hire me to customise it</Link> for your clinic.</p>
            </div>
          </section>

          <PackageSection />

          <TemplateNav current="vitalis" />
        </div>
  );
}
