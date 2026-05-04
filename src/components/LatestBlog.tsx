"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { blogPosts } from "../data/blog";

gsap.registerPlugin(ScrollTrigger);

const latest = blogPosts.slice(0, 3);

export default function LatestBlog() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const header = el.querySelector(".blog-header");
      if (header) {
        gsap.fromTo(
          header,
          { autoAlpha: 0, x: -40 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: header, start: "top 85%", once: true },
          }
        );
      }

      const cards = el.querySelectorAll(".blog-latest-card");
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: el.querySelector(".blog-grid"), start: "top 85%", once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-16 py-32 max-md:px-6 max-md:py-20"
      style={{ background: "#0D0C14" }}
    >
      <div className="mx-auto max-w-300">
        {/* Header */}
        <div className="blog-header mb-16 flex items-end justify-between max-md:mb-10 max-md:flex-col max-md:items-start max-md:gap-4">
          <div>
            <span className="font-body text-[11px] font-medium tracking-[3px] text-(--color-accent)">
              FROM THE BLOG
            </span>
            <h2
              className="mt-4 font-display tracking-[-2px] text-(--color-text-primary)"
              style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
            >
              Latest thoughts.
            </h2>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 font-body text-sm font-medium text-(--color-accent) transition-all hover:gap-3"
          >
            View all posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="blog-grid grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-md:grid-cols-1">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-latest-card group flex flex-col border border-(--color-border) bg-(--color-bg-card) transition-all duration-300 hover:-translate-y-1 hover:border-(--color-accent-border)"
            >
              <div
                className="relative overflow-hidden"
                style={{ height: "clamp(160px, 20vh, 220px)" }}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 px-2.5 py-1 backdrop-blur-sm">
                  <Clock className="h-3 w-3 text-white/70" />
                  <span className="font-body text-[10px] text-white/80">
                    {post.readTime}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-center gap-2.5">
                  <span className="bg-(--color-accent-subtle) px-2.5 py-0.5 font-body text-[10px] font-medium tracking-[1.5px] text-(--color-accent)">
                    {post.tag.toUpperCase()}
                  </span>
                  <span className="font-body text-[11px] text-(--color-text-subtle)">
                    {post.date}
                  </span>
                </div>

                <h3
                  className="font-display italic text-(--color-text-primary) transition-colors group-hover:text-(--color-accent)"
                  style={{
                    fontSize: "clamp(17px, 1.5vw, 21px)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.3px",
                  }}
                >
                  {post.title}
                </h3>

                <p className="font-body text-[13px] leading-[1.65] text-(--color-text-dim)">
                  {post.excerpt.slice(0, 100)}
                  {post.excerpt.length > 100 ? "..." : ""}
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
  );
}
