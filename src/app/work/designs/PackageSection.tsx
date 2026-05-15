"use client";

import { Check, FileText, BookOpen, Palette, Shield, RefreshCw, Code, Smartphone, Search, Zap } from "lucide-react";

/**
 * Reusable "What You Get" section for all template showcase pages.
 * Shows the full package contents that buyers receive.
 */

const packageItems = [
  { icon: Code, title: "Full Source Code", desc: "Next.js + Tailwind + TypeScript. Every page, every component, every animation." },
  { icon: FileText, title: "4-5 Complete Pages", desc: "Home, About, Services/Work, Contact — and industry-specific pages. Not just a homepage." },
  { icon: Zap, title: "GSAP Animations", desc: "Real scroll-triggered animations on every section. Not CSS transitions — choreographed GSAP motion." },
  { icon: Smartphone, title: "Fully Responsive", desc: "Mobile-first design. Same quality on phone, tablet, and desktop. Tested across breakpoints." },
  { icon: Search, title: "SEO-Ready", desc: "Semantic HTML, proper heading hierarchy, metadata structure, Open Graph tags ready to configure." },
  { icon: BookOpen, title: "Customisation Guide", desc: "Step-by-step docs for changing colours, fonts, content, connecting a CMS, deploying to Vercel." },
  { icon: Palette, title: "Design Decisions Doc", desc: "Why every visual choice was made. Typography rationale, colour reasoning, animation philosophy." },
  { icon: Shield, title: "License for Everything", desc: "Use on unlimited personal and client projects. Modify however you want. You own your build." },
  { icon: RefreshCw, title: "Lifetime Updates", desc: "Buy once, receive all future updates. Framework upgrades, bug fixes, new features." },
];

const techStack = ["Next.js 16", "Tailwind CSS", "TypeScript", "GSAP ScrollTrigger", "SplitType", "Vercel-ready"];

export default function PackageSection() {
  return (
    <section className="w-full px-16 py-24 max-md:px-6 max-md:py-16" style={{ background: "#0A0A0E" }}>
      <div className="mx-auto max-w-250">
        <div className="mb-16 flex items-center gap-4">
          <span className="font-body text-[10px] font-medium tracking-[4px] text-(--accent)">WHAT YOU GET</span>
          <div className="h-px flex-1 bg-(--line)" />
        </div>

        {/* Package grid */}
        <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
          {packageItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex gap-4 border border-(--line) bg-(--ink-2) p-6 transition-all duration-300 hover:border-(--accent-2)">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-(--accent-soft)">
                  <Icon className="h-5 w-5 text-(--accent)" />
                </div>
                <div>
                  <h4 className="font-body text-[15px] font-semibold text-(--fg) mb-1">{item.title}</h4>
                  <p className="font-body text-[13px] leading-[1.6] text-(--fg-dim)">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech stack pills */}
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <span className="font-body text-[10px] font-medium tracking-[3px] text-(--fg-faint) mr-2">BUILT WITH</span>
          {techStack.map((tech) => (
            <span key={tech} className="border border-(--line) px-3 py-1.5 font-body text-[11px] text-(--fg-faint)">
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex items-center justify-between border-t border-(--line) pt-12 max-md:flex-col max-md:gap-8 max-md:items-start">
          <div>
            <p className="font-body text-[15px] font-medium text-(--fg)">One-time purchase. Lifetime updates. No subscription.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 bg-(--accent)/20 border border-(--accent)/30 px-8 py-4 font-body text-sm font-medium text-(--accent)">
              Coming Soon
            </span>
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-8 flex items-start gap-3 border border-(--line) bg-(--ink-2) p-5 max-w-160">
          <Check className="h-5 w-5 shrink-0 text-(--accent) mt-0.5" />
          <div>
            <span className="font-body text-[14px] font-semibold text-(--fg)">14-day refund guarantee</span>
            <p className="font-body text-[13px] text-(--fg-dim) mt-1">If the template doesn&apos;t work as described, email us for a full refund. No questions.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
