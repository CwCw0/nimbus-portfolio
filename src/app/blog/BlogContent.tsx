"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import SmoothScroll from "../../components/SmoothScroll";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { blogPosts, categories } from "../../data/blog";

gsap.registerPlugin(ScrollTrigger);

const featuredPost = blogPosts[0];
const allPosts = blogPosts.slice(1);

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  const filteredPosts =
    activeCategory === "All Posts"
      ? allPosts
      : allPosts.filter((p) => p.tag === activeCategory);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cleanups: (() => void)[] = [];

    // Hero heading split
    const heading = headingRef.current;
    if (heading) {
      const split = new SplitType(heading, { types: "chars" });
      if (prefersReducedMotion) {
        gsap.set(split.chars || [], { opacity: 1, y: 0 });
      } else {
        gsap.set(split.chars || [], { opacity: 0, y: 50 });
        gsap.to(split.chars || [], {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.015,
          ease: "power3.out",
          delay: 0.3,
        });
      }
      cleanups.push(() => split.revert());
    }

    // Hero subtext
    const hero = heroRef.current;
    if (hero && !prefersReducedMotion) {
      const subs = hero.querySelectorAll(".hero-fade");
      gsap.set(subs, { opacity: 0, y: 30 });
      gsap.to(subs, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.5,
      });
    }

    // Grid cards
    const gridEl = gridRef.current;
    if (gridEl && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        const cards = gridEl.querySelectorAll(".blog-card");
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true,
              },
            }
          );
        });
      }, gridEl);
      cleanups.push(() => ctx.revert());
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <CustomCursor />
      <SmoothScroll>
      <div className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
        <Header />

        {/* Hero — Full viewport */}
        <section
          ref={heroRef}
          className="relative flex min-h-screen w-full flex-col items-center justify-center px-16 pt-24 pb-20 max-md:px-6 max-md:pt-20 max-md:pb-12"
        >
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[var(--color-text-primary)]"
            style={{ fontSize: "clamp(100px, 18vw, 300px)", opacity: 0.02, letterSpacing: "0.1em" }}
          >
            BLOG
          </span>

          <div className="relative z-10 flex flex-col items-center gap-8 text-center">
            <span className="hero-fade font-body text-[11px] font-medium tracking-[4px] text-[var(--color-accent)]">
              BLOG
            </span>
            <h1
              ref={headingRef}
              className="max-w-[800px] font-display tracking-[-2px] text-[var(--color-text-primary)]"
              style={{ fontSize: "clamp(32px, 5vw, 72px)", lineHeight: 1.1 }}
            >
              Thoughts on building.
            </h1>
          </div>
        </section>

        {/* Category Filters */}
        <section className="hero-fade w-full px-16 pb-10 max-md:px-6 max-md:overflow-x-auto">
          <div className="mx-auto flex max-w-[1200px] gap-3 max-md:w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 font-body text-[13px] font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[var(--color-accent)] text-white"
                    : "border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent-border)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Post */}
        <section className="w-full px-16 pb-16 max-md:px-6 max-md:pb-10">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group mx-auto flex max-w-[1200px] gap-0 border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-all duration-300 hover:border-[var(--color-accent-border)] max-md:flex-col"
          >
            <div className="relative w-[55%] overflow-hidden max-md:w-full" style={{ height: "clamp(260px, 35vh, 400px)" }}>
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-5 p-10 max-md:p-6">
              <div className="w-fit bg-[#7C5CFC18] px-3 py-1">
                <span className="font-body text-[10px] font-medium tracking-[2px] text-[var(--color-accent)]">
                  FEATURED
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-[var(--color-accent-subtle)] px-2.5 py-1 font-body text-[11px] font-medium text-[var(--color-accent)]">
                  {featuredPost.tag}
                </span>
                <span className="font-body text-xs text-[var(--color-text-subtle)]">
                  {featuredPost.date}
                </span>
              </div>
              <h2
                className="font-display tracking-[-1px] text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors"
                style={{ fontSize: "clamp(22px, 2.5vw, 32px)" }}
              >
                {featuredPost.title}
              </h2>
              <p className="font-body text-sm leading-[1.7] text-[var(--color-text-dim)]">
                {featuredPost.excerpt}
              </p>
              <span className="flex items-center gap-2 font-body text-sm font-medium text-[var(--color-accent)] transition-all group-hover:gap-3">
                Read article
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </section>

        {/* All Articles */}
        <section ref={gridRef} className="w-full px-16 pb-32 max-md:px-6 max-md:pb-16">
          <div className="mx-auto max-w-[1200px]">
            <span className="mb-10 block font-body text-[11px] font-medium tracking-[3px] text-[var(--color-text-muted)]">
              ALL ARTICLES
            </span>
            <div className="grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-md:grid-cols-1">
              {filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="blog-card group flex flex-col border border-[var(--color-border)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-border)]"
                >
                  <div className="relative overflow-hidden" style={{ height: "clamp(160px, 20vh, 220px)" }}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-3 p-6">
                    <div className="flex items-center gap-3">
                      <span className="bg-[var(--color-accent-subtle)] px-2.5 py-1 font-body text-[10px] font-medium text-[var(--color-accent)]">
                        {post.tag}
                      </span>
                      <span className="font-body text-[11px] text-[var(--color-text-subtle)]">
                        {post.date}
                      </span>
                    </div>
                    <h3 className="font-body text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-body text-[13px] leading-[1.6] text-[var(--color-text-dim)]">
                      {post.excerpt}
                    </p>
                    <span className="flex items-center gap-2 font-body text-sm font-medium text-[var(--color-accent)] transition-all group-hover:gap-3">
                      Read more
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
      </SmoothScroll>
    </>
  );
}
