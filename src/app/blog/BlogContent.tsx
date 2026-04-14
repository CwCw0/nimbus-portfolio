"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import SmoothScroll from "../../components/SmoothScroll";
import { ArrowRight, Clock } from "lucide-react";
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
        <div className="flex w-full flex-col overflow-x-hidden bg-(--color-bg-primary)">
          <Header />

          {/* Hero — Full viewport */}
          <section
            ref={heroRef}
            className="relative flex min-h-screen w-full flex-col items-center justify-center px-16 pt-24 pb-20 max-md:px-6 max-md:pt-20 max-md:pb-12"
          >
            {/* Ghost watermark */}
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-(--color-text-primary)"
              style={{ fontSize: "clamp(100px, 18vw, 300px)", opacity: 0.02, letterSpacing: "0.1em" }}
            >
              BLOG
            </span>

            <div className="relative z-10 flex flex-col items-center gap-8 text-center">
              <span className="hero-fade font-body text-[11px] font-medium tracking-[4px] text-(--color-accent)">
                PERSPECTIVES
              </span>

              <h1
                ref={headingRef}
                className="max-w-[820px] font-display tracking-[-2px] text-(--color-text-primary)"
                style={{ fontSize: "clamp(36px, 5.5vw, 76px)", lineHeight: 1.05 }}
              >
                Thoughts on building.
              </h1>

              <p className="hero-fade max-w-[540px] font-body text-[15px] leading-[1.75] text-(--color-text-dim)">
                Design craft, developer experience, and the honest lessons from
                building things people actually use. No filler — just perspective.
              </p>

              {/* Scroll hint */}
              <div className="hero-fade mt-4 flex flex-col items-center gap-2">
                <span className="font-body text-[10px] tracking-[3px] text-(--color-text-muted)">SCROLL</span>
                <div className="h-8 w-px bg-linear-to-b from-(--color-accent) to-transparent opacity-40" />
              </div>
            </div>
          </section>

          {/* Featured Post — Editorial */}
          <section className="w-full px-16 pb-0 max-md:px-6">
            <div className="mx-auto max-w-[1200px]">
              <div className="mb-6 flex items-center gap-4">
                <span className="font-body text-[10px] font-medium tracking-[4px] text-(--color-text-muted)">FEATURED</span>
                <div className="h-px flex-1 bg-(--color-border)" />
              </div>
            </div>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group mx-auto flex max-w-[1200px] border border-(--color-border) bg-(--color-bg-card) transition-all duration-500 hover:border-(--color-accent-border) max-lg:flex-col"
            >
              {/* Image — tall editorial */}
              <div className="relative w-[52%] overflow-hidden max-lg:w-full" style={{ minHeight: "clamp(300px, 45vh, 520px)" }}>
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/20 max-lg:bg-linear-to-b max-lg:from-transparent max-lg:to-black/30" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between gap-0 p-12 max-md:p-7">
                {/* Top meta */}
                <div className="flex items-center gap-3">
                  <span className="bg-(--color-accent-subtle) px-3 py-1 font-body text-[10px] font-medium tracking-[2px] text-(--color-accent)">
                    {featuredPost.tag.toUpperCase()}
                  </span>
                  <span className="font-body text-xs text-(--color-text-subtle)">{featuredPost.date}</span>
                  <span className="flex items-center gap-1.5 font-body text-xs text-(--color-text-muted)">
                    <Clock className="h-3 w-3" />
                    {featuredPost.readTime}
                  </span>
                </div>

                {/* Title — large display */}
                <div className="my-auto py-8">
                  <h2
                    className="font-display italic text-(--color-text-primary) transition-colors duration-300 group-hover:text-(--color-accent)"
                    style={{ fontSize: "clamp(26px, 3vw, 42px)", lineHeight: 1.1, letterSpacing: "-0.5px" }}
                  >
                    {featuredPost.title}
                  </h2>
                  <p className="mt-5 font-body text-[14px] leading-[1.75] text-(--color-text-dim)">
                    {featuredPost.excerpt}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between border-t border-(--color-border) pt-6">
                  <span className="flex items-center gap-2 font-body text-sm font-medium text-(--color-accent) transition-all group-hover:gap-3">
                    Read article
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <div className="h-px w-12 bg-(--color-accent) opacity-30 transition-all duration-300 group-hover:w-20 group-hover:opacity-60" />
                </div>
              </div>
            </Link>
          </section>

          {/* Category Filters */}
          <section className="w-full px-16 py-12 max-md:px-6 max-md:overflow-x-auto">
            <div className="mx-auto flex max-w-[1200px] items-center gap-3 max-md:w-max">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 font-body text-[12px] font-medium tracking-[1px] transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-(--color-accent) text-white"
                      : "border border-(--color-border) text-(--color-text-muted) hover:border-(--color-accent-border) hover:text-(--color-text-primary)"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* All Articles */}
          <section ref={gridRef} className="w-full px-16 pb-32 max-md:px-6 max-md:pb-16">
            <div className="mx-auto max-w-[1200px]">
              <div className="mb-10 flex items-center gap-4">
                <span className="font-body text-[10px] font-medium tracking-[4px] text-(--color-text-muted)">ALL ARTICLES</span>
                <div className="h-px flex-1 bg-(--color-border)" />
              </div>

              <div className="grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-md:grid-cols-1">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="blog-card group flex flex-col border border-(--color-border) bg-(--color-bg-card) transition-all duration-300 hover:-translate-y-1 hover:border-(--color-accent-border)"
                  >
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden" style={{ height: "clamp(180px, 22vh, 240px)" }}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Read time chip — overlaid on image */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 px-2.5 py-1 backdrop-blur-sm">
                        <Clock className="h-3 w-3 text-white/70" />
                        <span className="font-body text-[10px] text-white/80">{post.readTime}</span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <div className="flex items-center gap-2.5">
                        <span className="bg-(--color-accent-subtle) px-2.5 py-0.5 font-body text-[10px] font-medium tracking-[1.5px] text-(--color-accent)">
                          {post.tag.toUpperCase()}
                        </span>
                        <span className="font-body text-[11px] text-(--color-text-subtle)">{post.date}</span>
                      </div>

                      <h3
                        className="font-display italic text-(--color-text-primary) transition-colors group-hover:text-(--color-accent)"
                        style={{ fontSize: "clamp(17px, 1.5vw, 21px)", lineHeight: 1.2, letterSpacing: "-0.3px" }}
                      >
                        {post.title}
                      </h3>

                      <p className="font-body text-[13px] leading-[1.65] text-(--color-text-dim)">
                        {post.excerpt}
                      </p>

                      <span className="mt-auto flex items-center gap-2 pt-2 font-body text-sm font-medium text-(--color-accent) transition-all group-hover:gap-3">
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
