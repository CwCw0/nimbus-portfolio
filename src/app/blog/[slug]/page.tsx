"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CustomCursor from "../../../components/CustomCursor";
import { ArrowLeft, ArrowRight, Twitter, Linkedin, Link2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

const tocItems = [
  "The Template Trap",
  "When Custom Makes Sense",
  "My Process",
  "The Results",
  "Final Thoughts",
];

const relatedPosts = [
  {
    slug: "building-accessible-web-apps",
    tag: "Development",
    date: "Jan 10, 2025",
    title: "Building Accessible Web Apps That Don’t Suck",
  },
  {
    slug: "core-web-vitals",
    tag: "SEO",
    date: "Dec 28, 2024",
    title: "Core Web Vitals: What Actually Matters in 2025",
  },
  {
    slug: "psychology-of-dark-ui",
    tag: "Design",
    date: "Nov 20, 2024",
    title: "The Psychology of Dark UI Design",
  },
];

export default function BlogPostPage() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(Math.min(100, Math.max(0, (scrolled / total) * 100)));

      const sections = el.querySelectorAll("h2");
      sections.forEach((section, i) => {
        const sRect = section.getBoundingClientRect();
        if (sRect.top < 200) setActiveSection(i);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <CustomCursor />
      <div className="reading-progress" style={{ width: `${progress}%` }} />
      <div className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
        <Header />

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 px-16 pt-8 max-md:px-6">
          <Link
            href="/blog"
            className="flex items-center gap-2 font-inter text-sm text-[var(--color-text-muted)] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        {/* Article Hero */}
        <section className="w-full px-16 pt-12 pb-8 max-md:px-6">
          <div className="flex flex-col gap-5 max-w-[800px]">
            <div className="flex items-center gap-3">
              <span className="bg-[var(--color-accent-subtle)] px-3 py-1 font-inter text-[11px] font-medium text-[var(--color-accent)]">
                Design
              </span>
              <span className="font-inter text-xs text-[var(--color-text-subtle)]">
                January 15, 2025
              </span>
              <span className="font-inter text-xs text-[var(--color-text-subtle)]">
                · 8 min read
              </span>
            </div>
            <h1 className="font-space-grotesk text-[48px] font-bold leading-[1.1] tracking-[-2px] text-white max-md:text-[28px]">
              Why I Stopped Using Templates and Started Building From Scratch
            </h1>
          </div>
        </section>

        {/* Hero Image */}
        <section className="w-full px-16 pb-12 max-md:px-6">
          <div className="flex h-[480px] w-full items-center justify-center bg-gradient-to-br from-[#7C5CFC12] to-[#7C5CFC06] border border-[var(--color-border)] max-md:h-[220px]">
            <span className="font-inter text-sm tracking-[2px] text-[var(--color-text-subtle)]">
              ARTICLE IMAGE
            </span>
          </div>
        </section>

        {/* Article Content + Sidebar */}
        <section ref={articleRef} className="w-full px-16 pb-[80px] max-md:px-6">
          <div className="flex gap-16 max-md:flex-col">
            {/* Article Body */}
            <article className="flex flex-1 flex-col gap-8 max-w-[720px]">
              <p className="font-inter text-base leading-[1.9] text-[var(--color-text-secondary)]">
                For the first few years of my career, templates were my best friend. They were fast, affordable, and got the job done. But over time, I noticed a pattern: every template project ended up taking just as long as building from scratch — because I was constantly fighting the template&apos;s structure to match the client&apos;s actual needs.
              </p>

              <h2 className="font-space-grotesk text-[28px] font-bold tracking-[-1px] text-white">
                The Template Trap
              </h2>
              <p className="font-inter text-base leading-[1.9] text-[var(--color-text-secondary)]">
                Templates promise speed. And they deliver — for the first 20% of the project. But the remaining 80% is where things get messy. You&apos;re overriding CSS, removing unwanted sections, and hacking around layout decisions that don&apos;t match your content. The &quot;quick start&quot; becomes a slow grind.
              </p>

              <h2 className="font-space-grotesk text-[28px] font-bold tracking-[-1px] text-white">
                When Custom Makes Sense
              </h2>
              <p className="font-inter text-base leading-[1.9] text-[var(--color-text-secondary)]">
                Custom doesn&apos;t mean over-engineered. It means purpose-built. Every component exists because the project needs it. Every style decision is intentional. The result is faster load times, easier maintenance, and a site that actually feels like the brand it represents.
              </p>

              <blockquote className="border-l-2 border-[var(--color-accent)] pl-6 font-inter text-lg italic leading-[1.8] text-[var(--color-text-muted)]">
                &quot;The best code is code you don&apos;t have to write. But the second best is code you wrote yourself and fully understand.&quot;
              </blockquote>

              <h2 className="font-space-grotesk text-[28px] font-bold tracking-[-1px] text-white">
                My Process
              </h2>
              <p className="font-inter text-base leading-[1.9] text-[var(--color-text-secondary)]">
                Here&apos;s how I approach custom builds now:
              </p>
              <ol className="flex flex-col gap-3 pl-6">
                <li className="font-inter text-base leading-[1.8] text-[var(--color-text-secondary)]">
                  <strong className="text-white">1. Content-first design</strong> — I start with the actual content, not a layout. The structure emerges from what needs to be communicated.
                </li>
                <li className="font-inter text-base leading-[1.8] text-[var(--color-text-secondary)]">
                  <strong className="text-white">2. Component library</strong> — I build a small, reusable set of components specific to the project. No bloat.
                </li>
                <li className="font-inter text-base leading-[1.8] text-[var(--color-text-secondary)]">
                  <strong className="text-white">3. Progressive enhancement</strong> — Start simple, add complexity only where it earns its place.
                </li>
              </ol>

              <h2 className="font-space-grotesk text-[28px] font-bold tracking-[-1px] text-white">
                The Results
              </h2>
              <p className="font-inter text-base leading-[1.9] text-[var(--color-text-secondary)]">
                Since making this shift, my projects load faster, score higher on Core Web Vitals, and my clients are consistently happier. The maintenance burden is lower because there&apos;s no template overhead. And frankly, the work is more enjoyable.
              </p>

              <h2 className="font-space-grotesk text-[28px] font-bold tracking-[-1px] text-white">
                Final Thoughts
              </h2>
              <p className="font-inter text-base leading-[1.9] text-[var(--color-text-secondary)]">
                Templates have their place — especially for prototyping and internal tools. But for client-facing work where brand identity and performance matter, building custom is almost always the better investment. The upfront cost is higher, but the long-term value is incomparable.
              </p>
            </article>

            {/* Sidebar */}
            <aside className="w-[280px] max-md:w-full">
              <div className="sticky top-24 flex flex-col gap-8">
                {/* TOC */}
                <div className="flex flex-col gap-4 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
                  <span className="font-inter text-xs font-semibold tracking-[1px] text-white">
                    TABLE OF CONTENTS
                  </span>
                  <div className="flex flex-col gap-3">
                    {tocItems.map((item, i) => (
                      <button
                        key={item}
                        className={`text-left font-inter text-[13px] transition-colors ${
                          activeSection === i
                            ? "text-[var(--color-accent)]"
                            : "text-[var(--color-text-dim)] hover:text-white"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="flex flex-col gap-4 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
                  <span className="font-inter text-xs font-semibold tracking-[1px] text-white">
                    SHARE
                  </span>
                  <div className="flex gap-3">
                    <button className="flex h-10 w-10 items-center justify-center border border-[var(--color-border)] transition-all hover:border-[var(--color-accent-border)]">
                      <Twitter className="h-4 w-4 text-[var(--color-text-muted)]" />
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center border border-[var(--color-border)] transition-all hover:border-[var(--color-accent-border)]">
                      <Linkedin className="h-4 w-4 text-[var(--color-text-muted)]" />
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center border border-[var(--color-border)] transition-all hover:border-[var(--color-accent-border)]">
                      <Link2 className="h-4 w-4 text-[var(--color-text-muted)]" />
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Divider */}
        <div className="mx-16 h-px bg-[var(--color-border)] max-md:mx-6" />

        {/* Author Bio */}
        <section className="w-full px-16 py-[60px] max-md:px-6">
          <div className="flex items-center gap-6 max-md:flex-col max-md:items-start">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)]">
              <span className="font-inter text-lg font-bold text-[#0A0A0B]">N</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-inter text-sm text-[var(--color-text-subtle)]">
                Written by
              </span>
              <span className="font-inter text-lg font-semibold text-white">
                Nimbus
              </span>
              <p className="font-inter text-sm text-[var(--color-text-dim)]">
                Developer, designer, and builder of digital things.
              </p>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="w-full bg-[var(--color-bg-secondary)] px-16 py-[80px] max-md:px-6 max-md:py-16">
          <span className="mb-8 block font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
            RELATED ARTICLES
          </span>
          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col border border-[var(--color-border)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-border)]"
              >
                <div className="flex h-[180px] items-center justify-center bg-gradient-to-br from-[#7C5CFC10] to-[#7C5CFC05]">
                  <span className="font-inter text-xs tracking-[2px] text-[var(--color-text-subtle)]">
                    IMAGE
                  </span>
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <div className="flex items-center gap-3">
                    <span className="bg-[var(--color-accent-subtle)] px-2.5 py-1 font-inter text-[10px] font-medium text-[var(--color-accent)]">
                      {post.tag}
                    </span>
                    <span className="font-inter text-[11px] text-[var(--color-text-subtle)]">
                      {post.date}
                    </span>
                  </div>
                  <h3 className="font-inter text-base font-semibold text-white group-hover:text-[var(--color-accent)] transition-colors">
                    {post.title}
                  </h3>
                  <span className="flex items-center gap-2 font-inter text-sm font-medium text-[var(--color-accent)]">
                    Read more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
