"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CustomCursor from "../../../components/CustomCursor";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { useParams } from "next/navigation";
import { useCountUp } from "../../../hooks/useScrollReveal";

const caseStudies: Record<string, {
  breadcrumb: string;
  tags: string[];
  title: string;
  heroDesc: string;
  heroImage?: string;
  gallery?: string[];
  challenge: string;
  solution: string;
  liveUrl?: string;
  results: { value: string; label: string; color: string }[];
  nextProject: { title: string; slug: string };
}> = {
  omnifood: {
    breadcrumb: "Back to Work",
    tags: ["HTML/CSS", "Landing Page", "Responsive"],
    title: "Omnifood — Meal Subscription Landing Page",
    heroDesc:
      "A clean, modern landing page for a premium meal delivery subscription service. Designed to convert visitors into subscribers with clear messaging, social proof, and a seamless user flow.",
    heroImage: "/images/omnifood/hero.png",
    gallery: [
      "/images/omnifood/meals.png",
      "/images/omnifood/how-it-works.png",
      "/images/omnifood/testimonials.png",
      "/images/omnifood/pricing.png",
      "/images/omnifood/cta.png",
    ],
    challenge:
      "Design and build a high-converting landing page for a meal subscription service. The page needed to clearly communicate the value proposition, showcase meal quality, and guide users toward signing up — all while being fully responsive across every device.",
    solution:
      "Built a polished, responsive landing page with semantic HTML and modern CSS. The design features clear visual hierarchy, customer testimonials for social proof, transparent pricing tiers, a meal gallery, and a smooth user flow from hero to CTA.",
    liveUrl: "https://omnifood-cw.netlify.app/",
    results: [
      { value: "100%", label: "Responsive", color: "text-white" },
      { value: "5", label: "Page Sections", color: "text-[var(--color-accent)]" },
      { value: "2", label: "Pricing Tiers", color: "text-white" },
      { value: "4", label: "Testimonials", color: "text-[var(--color-accent)]" },
    ],
    nextProject: { title: "Coming Soon", slug: "" },
  },
};

const defaultStudy = {
  breadcrumb: "Back to Work",
  tags: ["UI/UX Design", "Dashboard", "React"],
  title: "Project Coming Soon",
  heroDesc: "This case study is currently being written.",
  challenge: "Details coming soon.",
  solution: "Details coming soon.",
  results: [],
  nextProject: { title: "Omnifood", slug: "omnifood" },
};

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const caseStudy = caseStudies[slug] || defaultStudy;
  const resultsRef = useRef<HTMLElement>(null);
  useCountUp(resultsRef, ".count-up");

  return (
    <>
      <CustomCursor />
      <div className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
        <Header />

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 px-16 pt-8 max-md:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-inter text-sm text-[var(--color-text-muted)] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {caseStudy.breadcrumb}
          </Link>
        </div>

        {/* Case Hero */}
        <section className="snap-section w-full px-16 pt-12 pb-[60px] max-md:px-6">
          <div className="flex flex-col gap-6 max-w-[800px]">
            <div className="flex gap-2">
              {caseStudy.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[var(--color-accent-subtle)] px-3 py-1 font-inter text-[11px] font-medium text-[var(--color-accent)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-space-grotesk text-[48px] font-bold leading-[1.1] tracking-[-2px] text-white max-md:text-[32px]">
              {caseStudy.title}
            </h1>
            <p className="font-inter text-lg leading-[1.7] text-[var(--color-text-dim)] max-md:text-base">
              {caseStudy.heroDesc}
            </p>
          </div>
        </section>

        {/* Hero Image */}
        <section className="w-full px-16 pb-[80px] max-md:px-6">
          <div className="relative w-full overflow-hidden rounded-lg border border-[var(--color-border)] bg-[#F5F0EB]">
            {caseStudy.heroImage ? (
              <img
                src={caseStudy.heroImage}
                alt={caseStudy.title}
                className="h-[500px] w-full object-cover object-top max-md:h-[240px]"
              />
            ) : (
              <div className="flex h-[500px] w-full items-center justify-center bg-gradient-to-br from-[#7C5CFC12] to-[#7C5CFC06] max-md:h-[240px]">
                <span className="font-inter text-sm tracking-[2px] text-[var(--color-text-subtle)]">
                  PROJECT IMAGE
                </span>
              </div>
            )}
            {caseStudy.liveUrl && (
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 flex items-center gap-2 border border-[var(--color-accent-border)] bg-[var(--color-bg-primary)]/90 backdrop-blur-sm px-5 py-2.5 font-inter text-[13px] font-medium text-[var(--color-accent)] transition-all hover:bg-[var(--color-accent-subtle)]"
              >
                View Live Site
                <ArrowRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </section>

        {/* Overview */}
        <section className="snap-section w-full bg-[var(--color-bg-secondary)] px-16 py-[80px] max-md:px-6 max-md:py-16">
          <div className="flex gap-16 max-md:flex-col max-md:gap-10">
            <div className="flex flex-1 flex-col gap-5">
              <span className="font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
                THE CHALLENGE
              </span>
              <h3 className="font-space-grotesk text-[28px] font-bold tracking-[-1px] text-white">
                Challenge
              </h3>
              <p className="font-inter text-base leading-[1.8] text-[var(--color-text-dim)]">
                {caseStudy.challenge}
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-5">
              <span className="font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
                THE SOLUTION
              </span>
              <h3 className="font-space-grotesk text-[28px] font-bold tracking-[-1px] text-white">
                Solution
              </h3>
              <p className="font-inter text-base leading-[1.8] text-[var(--color-text-dim)]">
                {caseStudy.solution}
              </p>
            </div>
          </div>
        </section>

        {/* Results */}
        <section ref={resultsRef} className="snap-section w-full px-16 py-[80px] max-md:px-6 max-md:py-16">
          <div className="mb-10 flex flex-col gap-4">
            <span className="font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
              RESULTS
            </span>
            <h3 className="font-space-grotesk text-[28px] font-bold tracking-[-1px] text-white">
              The impact
            </h3>
          </div>
          <div className="flex gap-5 max-md:grid max-md:grid-cols-2 max-md:gap-4">
            {caseStudy.results.map((r) => (
              <div
                key={r.label}
                className="flex flex-1 flex-col gap-2 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-7"
              >
                <span
                  className={`count-up font-inter text-[40px] font-semibold tracking-[-1px] ${r.color}`}
                  data-target={r.value}
                >
                  {r.value.startsWith("+") ? "+0" : "0"}
                </span>
                <span className="font-inter text-sm text-[var(--color-text-dim)]">
                  {r.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="w-full px-16 pb-[80px] max-md:px-6">
          {caseStudy.gallery && caseStudy.gallery.length > 0 ? (
            <div className="flex flex-col gap-6">
              <div className="flex gap-6 max-md:flex-col">
                {caseStudy.gallery.slice(0, 2).map((src, i) => (
                  <div key={i} className="flex-1 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[#F5F0EB]">
                    <img src={src} alt={`${caseStudy.title} screenshot ${i + 1}`} className="h-[380px] w-full object-cover object-top max-md:h-[220px]" />
                  </div>
                ))}
              </div>
              {caseStudy.gallery.length > 2 && (
                <div className="flex gap-6 max-md:flex-col">
                  {caseStudy.gallery.slice(2, 4).map((src, i) => (
                    <div key={i} className="flex-1 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[#F5F0EB]">
                      <img src={src} alt={`${caseStudy.title} screenshot ${i + 3}`} className="h-[380px] w-full object-cover object-top max-md:h-[220px]" />
                    </div>
                  ))}
                </div>
              )}
              {caseStudy.gallery.length > 4 && (
                <div className="flex gap-6 max-md:flex-col">
                  {caseStudy.gallery.slice(4).map((src, i) => (
                    <div key={i} className={`overflow-hidden rounded-lg border border-[var(--color-border)] bg-[#F5F0EB] ${caseStudy.gallery!.slice(4).length === 1 ? "w-full" : "flex-1"}`}>
                      <img src={src} alt={`${caseStudy.title} screenshot ${i + 5}`} className="h-[380px] w-full object-cover object-top max-md:h-[220px]" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-6 max-md:flex-col">
              <div className="flex flex-1 h-[340px] items-center justify-center bg-gradient-to-br from-[#7C5CFC10] to-[#7C5CFC05] border border-[var(--color-border)]">
                <span className="font-inter text-sm tracking-[2px] text-[var(--color-text-subtle)]">GALLERY 1</span>
              </div>
              <div className="flex flex-1 h-[340px] items-center justify-center bg-gradient-to-br from-[#7C5CFC10] to-[#7C5CFC05] border border-[var(--color-border)]">
                <span className="font-inter text-sm tracking-[2px] text-[var(--color-text-subtle)]">GALLERY 2</span>
              </div>
            </div>
          )}
        </section>

        {/* Next Project */}
        {caseStudy.nextProject.slug ? (
          <section className="w-full border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-16 py-[60px] max-md:px-6">
            <Link
              href={`/work/${caseStudy.nextProject.slug}`}
              className="group flex items-center justify-between"
            >
              <div className="flex flex-col gap-2">
                <span className="font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-text-muted)]">
                  NEXT PROJECT
                </span>
                <span className="font-space-grotesk text-[32px] font-bold tracking-[-1px] text-white transition-colors group-hover:text-[var(--color-accent)] max-md:text-2xl">
                  {caseStudy.nextProject.title}
                </span>
              </div>
              <ArrowRight className="h-6 w-6 text-[var(--color-text-muted)] transition-all group-hover:translate-x-2 group-hover:text-[var(--color-accent)]" />
            </Link>
          </section>
        ) : (
          <section className="w-full border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-16 py-[60px] max-md:px-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <span className="font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-text-muted)]">
                  NEXT PROJECT
                </span>
                <span className="font-space-grotesk text-[32px] font-bold tracking-[-1px] text-[var(--color-text-dim)] max-md:text-2xl">
                  {caseStudy.nextProject.title}
                </span>
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}
