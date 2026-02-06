"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const categories = [
  "All Posts",
  "Design",
  "Development",
  "SEO & Growth",
  "AI Tools",
  "Process",
];

const featuredPost = {
  slug: "why-i-stopped-using-templates",
  tag: "Design",
  date: "January 15, 2025",
  title: "Why I Stopped Using Templates and Started Building From Scratch",
  excerpt:
    "Templates are convenient. But after years of bending them to fit client needs, I realized starting from scratch wasn’t just faster — it was better for everyone.",
};

const posts = [
  {
    slug: "building-accessible-web-apps",
    tag: "Development",
    date: "Jan 10, 2025",
    title: "Building Accessible Web Apps That Don’t Suck",
    excerpt:
      "Accessibility isn’t a checkbox. Here’s how I bake it into every project from day one.",
  },
  {
    slug: "core-web-vitals",
    tag: "SEO",
    date: "Dec 28, 2024",
    title: "Core Web Vitals: What Actually Matters in 2025",
    excerpt:
      "Google keeps changing the goalposts. Here’s what really moves the needle on performance.",
  },
  {
    slug: "ai-to-ship-faster",
    tag: "AI Tools",
    date: "Dec 15, 2024",
    title: "How I Use AI to Ship 3x Faster",
    excerpt:
      "From code generation to design iteration, here’s my AI-powered workflow.",
  },
  {
    slug: "solo-dev-workflow",
    tag: "Process",
    date: "Dec 2, 2024",
    title: "My Solo Dev Workflow: Tools, Habits & Systems",
    excerpt:
      "How I stay productive, organized and sane as a one-person studio.",
  },
  {
    slug: "psychology-of-dark-ui",
    tag: "Design",
    date: "Nov 20, 2024",
    title: "The Psychology of Dark UI Design",
    excerpt:
      "Why dark interfaces feel premium and how to design them without sacrificing readability.",
  },
  {
    slug: "freelance-pricing",
    tag: "Growth",
    date: "Nov 8, 2024",
    title: "Freelance Pricing: How I Stopped Undercharging",
    excerpt:
      "The mindset shifts and pricing frameworks that tripled my project rates.",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const gridRef = useRef<HTMLElement>(null);
  useScrollReveal(gridRef, ".blog-card", 80);

  const filteredPosts =
    activeCategory === "All Posts"
      ? posts
      : posts.filter((p) => p.tag === activeCategory);

  return (
    <>
      <CustomCursor />
      <div className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
        <Header />

        {/* Blog Hero */}
        <section className="snap-section w-full px-16 pt-[100px] pb-[60px] max-md:px-6 max-md:pt-16 max-md:pb-8">
          <div className="flex flex-col gap-6 max-w-[800px]">
            <span className="font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
              BLOG
            </span>
            <h1 className="font-space-grotesk text-[52px] font-bold leading-[1.1] tracking-[-2px] text-white max-md:text-[32px]">
              Thoughts on design, development, and building online.
            </h1>
          </div>
        </section>

        {/* Category Filters */}
        <section className="w-full px-16 pb-10 max-md:px-6 max-md:overflow-x-auto">
          <div className="flex gap-3 max-md:w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 font-inter text-[13px] font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[var(--color-accent)] text-[#0A0A0B]"
                    : "border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent-border)] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Post */}
        <section className="w-full px-16 pb-12 max-md:px-6">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group flex gap-8 border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-all duration-300 hover:border-[var(--color-accent-border)] max-md:flex-col"
          >
            <div className="flex h-[340px] w-[580px] items-center justify-center bg-gradient-to-br from-[#7C5CFC12] to-[#7C5CFC06] max-md:w-full max-md:h-[200px]">
              <span className="font-inter text-sm tracking-[2px] text-[var(--color-text-subtle)]">
                FEATURED IMAGE
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-4 p-8 max-md:p-6">
              <div className="w-fit bg-[#7C5CFC18] px-3 py-1">
                <span className="font-inter text-[10px] font-medium tracking-[2px] text-[var(--color-accent)]">
                  FEATURED
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-[var(--color-accent-subtle)] px-2.5 py-1 font-inter text-[11px] font-medium text-[var(--color-accent)]">
                  {featuredPost.tag}
                </span>
                <span className="font-inter text-xs text-[var(--color-text-subtle)]">
                  {featuredPost.date}
                </span>
              </div>
              <h2 className="font-space-grotesk text-[28px] font-bold tracking-[-1px] text-white group-hover:text-[var(--color-accent)] transition-colors max-md:text-xl">
                {featuredPost.title}
              </h2>
              <p className="font-inter text-sm leading-[1.7] text-[var(--color-text-dim)]">
                {featuredPost.excerpt}
              </p>
              <span className="flex items-center gap-2 font-inter text-sm font-medium text-[var(--color-accent)] transition-all group-hover:gap-3">
                Read article
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </section>

        {/* All Articles */}
        <section ref={gridRef} className="w-full px-16 pb-[80px] max-md:px-6 max-md:pb-16">
          <span className="mb-8 block font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-text-muted)]">
            ALL ARTICLES
          </span>
          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="blog-card group flex flex-col border border-[var(--color-border)] opacity-0 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-border)]"
              >
                <div className="flex h-[200px] items-center justify-center bg-gradient-to-br from-[#7C5CFC10] to-[#7C5CFC05]">
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
                  <h3 className="font-inter text-lg font-semibold text-white group-hover:text-[var(--color-accent)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="font-inter text-[13px] leading-[1.6] text-[var(--color-text-dim)]">
                    {post.excerpt}
                  </p>
                  <span className="flex items-center gap-2 font-inter text-sm font-medium text-[var(--color-accent)] transition-all group-hover:gap-3">
                    Read more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 flex justify-center">
            <button className="flex items-center gap-2 border border-[var(--color-border)] px-8 py-3.5 font-inter text-sm font-medium text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[var(--color-accent-border)] hover:text-white">
              Load More Articles
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
