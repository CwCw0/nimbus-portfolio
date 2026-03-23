"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CustomCursor from "../../../components/CustomCursor";
import SmoothScroll from "../../../components/SmoothScroll";
import { ArrowLeft, ArrowRight, Twitter, Linkedin, Link2, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import { getPostBySlug, getRelatedPosts } from "../../../data/blog";

export default function BlogPostContent({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);

  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const fullUrl = typeof window !== "undefined" ? window.location.href : "";

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(post?.title || "")}`,
      "_blank"
    );
  };

  const shareOnLinkedin = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
      "_blank"
    );
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading || !post) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const split = new SplitType(heading, { types: "chars" });
    if (prefersReducedMotion) {
      gsap.set(split.chars || [], { opacity: 1, y: 0 });
    } else {
      gsap.set(split.chars || [], { opacity: 0, y: 40 });
      gsap.to(split.chars || [], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.015,
        ease: "power3.out",
        delay: 0.2,
      });
    }

    return () => split.revert();
  }, [post]);

  if (!post) {
    return (
      <>
        <CustomCursor />
        <div className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
          <Header />
          <section className="flex flex-col items-center justify-center gap-6 px-16 py-[200px] max-md:px-6">
            <h1 className="font-display text-[48px] text-[var(--color-text-primary)]">Post not found</h1>
            <Link href="/blog" className="font-body text-[var(--color-accent)] hover:underline">
              Back to Blog
            </Link>
          </section>
          <Footer />
        </div>
      </>
    );
  }

  const related = getRelatedPosts(post.relatedSlugs);

  return (
    <>
      <CustomCursor />
      <div className="reading-progress" style={{ width: `${progress}%` }} />
      <SmoothScroll>
      <main id="main-content" className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
        <Header />

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 px-16 pt-8 max-md:px-6">
          <Link
            href="/blog"
            className="flex items-center gap-2 font-body text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        {/* Article Hero — centered, dramatic */}
        <section className="w-full px-16 pt-12 pb-8 max-md:px-6">
          <div className="mx-auto flex flex-col items-center gap-6 text-center max-w-[800px]">
            <div className="flex items-center gap-3">
              <span className="bg-[var(--color-accent-subtle)] px-3 py-1 font-body text-[11px] font-medium text-[var(--color-accent)]">
                {post.tag}
              </span>
              <span className="font-body text-xs text-[var(--color-text-subtle)]">
                {post.date}
              </span>
              <span className="font-body text-xs text-[var(--color-text-subtle)]">
                · {post.readTime}
              </span>
            </div>
            <h1
              ref={headingRef}
              className="font-display tracking-[-2px] text-[var(--color-text-primary)]"
              style={{ fontSize: "clamp(32px, 5vw, 64px)", lineHeight: 1.1 }}
            >
              {post.title}
            </h1>
          </div>
        </section>

        {/* Hero Image */}
        <section className="w-full px-16 pb-12 max-md:px-6">
          <div className="mx-auto max-w-[1000px] relative w-full overflow-hidden border border-[var(--color-border)]" style={{ height: "clamp(240px, 40vh, 500px)" }}>
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Article Content + Sidebar */}
        <section ref={articleRef} className="w-full px-16 pb-20 max-md:px-6">
          <div className="mx-auto flex max-w-[1000px] gap-16 max-md:flex-col">
            {/* Article Body */}
            <article className="flex flex-1 flex-col gap-8 max-w-[680px]">
              {post.content.map((block, i) => {
                if (block.type === "p") {
                  return (
                    <p key={i} className="font-body text-base leading-[1.9] text-[var(--color-text-secondary)]">
                      {block.text}
                    </p>
                  );
                }
                if (block.type === "h2") {
                  return (
                    <h2 key={i} className="font-display text-[28px] tracking-[-1px] text-[var(--color-text-primary)]">
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <blockquote key={i} className="border-l-2 border-[var(--color-accent)] pl-6 font-body text-lg italic leading-[1.8] text-[var(--color-text-muted)]">
                      &quot;{block.text}&quot;
                    </blockquote>
                  );
                }
                if (block.type === "ol" && block.items) {
                  return (
                    <ol key={i} className="flex flex-col gap-3 pl-6">
                      {block.items.map((item, j) => {
                        const parts = item.split("**");
                        return (
                          <li key={j} className="font-body text-base leading-[1.8] text-[var(--color-text-secondary)]">
                            {parts.map((part, k) =>
                              k % 2 === 1 ? (
                                <strong key={k} className="text-[var(--color-text-primary)]">{part}</strong>
                              ) : (
                                <span key={k}>{part}</span>
                              )
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  );
                }
                return null;
              })}
            </article>

            {/* Sidebar */}
            <aside className="w-[260px] max-md:w-full">
              <div className="sticky top-24 flex flex-col gap-8">
                {/* TOC */}
                <div className="flex flex-col gap-4 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
                  <span className="font-body text-xs font-semibold tracking-[1px] text-[var(--color-text-primary)]">
                    TABLE OF CONTENTS
                  </span>
                  <div className="flex flex-col gap-3">
                    {post.tocItems.map((item, i) => (
                      <button
                        key={item}
                        onClick={() => {
                          const headings = articleRef.current?.querySelectorAll("h2");
                          if (headings?.[i]) {
                            headings[i].scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }}
                        className={`text-left font-body text-[13px] transition-colors ${
                          activeSection === i
                            ? "text-[var(--color-accent)]"
                            : "text-[var(--color-text-dim)] hover:text-[var(--color-text-primary)]"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="flex flex-col gap-4 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
                  <span className="font-body text-xs font-semibold tracking-[1px] text-[var(--color-text-primary)]">
                    SHARE
                  </span>
                  <div className="flex gap-3">
                    <button onClick={shareOnTwitter} className="flex h-10 w-10 items-center justify-center border border-[var(--color-border)] transition-all hover:border-[var(--color-accent-border)]">
                      <Twitter className="h-4 w-4 text-[var(--color-text-muted)]" />
                    </button>
                    <button onClick={shareOnLinkedin} className="flex h-10 w-10 items-center justify-center border border-[var(--color-border)] transition-all hover:border-[var(--color-accent-border)]">
                      <Linkedin className="h-4 w-4 text-[var(--color-text-muted)]" />
                    </button>
                    <button onClick={copyLink} className="flex h-10 w-10 items-center justify-center border border-[var(--color-border)] transition-all hover:border-[var(--color-accent-border)]">
                      {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Link2 className="h-4 w-4 text-[var(--color-text-muted)]" />}
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Divider */}
        <div className="mx-auto h-px w-full max-w-[1000px] bg-[var(--color-border)]" />

        {/* Author Bio */}
        <section className="w-full px-16 py-16 max-md:px-6 max-md:py-10">
          <div className="mx-auto flex max-w-[1000px] items-center gap-6 max-md:flex-col max-md:items-start">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)]">
              <span className="font-body text-lg font-bold text-white">D</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-body text-sm text-[var(--color-text-subtle)]">
                Written by
              </span>
              <span className="font-body text-lg font-semibold text-[var(--color-text-primary)]">
                Dee
              </span>
              <p className="font-body text-sm text-[var(--color-text-dim)]">
                Builder. Founder of Nimbus. Always learning, always shipping.
              </p>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="w-full bg-[#0D0C14] px-16 py-24 max-md:px-6 max-md:py-16">
            <div className="mx-auto max-w-[1200px]">
              <span className="mb-10 block font-body text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
                RELATED ARTICLES
              </span>
              <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
                {related.map((rPost) => (
                  <Link
                    key={rPost.slug}
                    href={`/blog/${rPost.slug}`}
                    className="group flex flex-col border border-[var(--color-border)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-border)]"
                  >
                    <div className="relative overflow-hidden" style={{ height: "clamp(140px, 18vh, 200px)" }}>
                      <Image
                        src={rPost.image}
                        alt={rPost.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col gap-3 p-6">
                      <div className="flex items-center gap-3">
                        <span className="bg-[var(--color-accent-subtle)] px-2.5 py-1 font-body text-[10px] font-medium text-[var(--color-accent)]">
                          {rPost.tag}
                        </span>
                        <span className="font-body text-[11px] text-[var(--color-text-subtle)]">
                          {rPost.date}
                        </span>
                      </div>
                      <h3 className="font-body text-base font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                        {rPost.title}
                      </h3>
                      <span className="flex items-center gap-2 font-body text-sm font-medium text-[var(--color-accent)]">
                        Read more
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </main>
      </SmoothScroll>
    </>
  );
}
