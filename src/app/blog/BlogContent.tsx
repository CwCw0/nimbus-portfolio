"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import SmoothScroll from "../../components/SmoothScroll";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { blogPosts, categories } from "../../data/blog";

const featuredPost = blogPosts[0];
const allPosts = blogPosts.slice(1);

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const gridRef = useRef<HTMLElement>(null);
  useScrollReveal(gridRef, ".blog-card", 80);

  const filteredPosts =
    activeCategory === "All Posts"
      ? allPosts
      : allPosts.filter((p) => p.tag === activeCategory);

  return (
    <>
      <CustomCursor />
      <SmoothScroll>
      <div className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
        <Header />

        {/* Blog Hero */}
        <section className="snap-section w-full px-16 pt-[100px] pb-[60px] max-md:px-6 max-md:pt-16 max-md:pb-8">
          <div className="flex flex-col gap-6 max-w-[800px]">
            <span className="font-body text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
              BLOG
            </span>
            <h1 className="font-display text-[52px] leading-[1.1] tracking-[-2px] text-[var(--color-text-primary)] max-md:text-[32px]">
              Thoughts on learning, building, and growing as a developer.
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
        <section className="w-full px-16 pb-12 max-md:px-6">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group flex gap-8 border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-all duration-300 hover:border-[var(--color-accent-border)] max-md:flex-col"
          >
            <div className="relative w-[580px] h-[340px] overflow-hidden max-lg:w-[400px] max-md:w-full max-md:h-[200px]">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-4 p-8 max-md:p-6">
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
              <h2 className="font-display text-[28px] tracking-[-1px] text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors max-md:text-xl">
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
        <section ref={gridRef} className="w-full px-16 pb-[80px] max-md:px-6 max-md:pb-16">
          <span className="mb-8 block font-body text-[11px] font-medium tracking-[3px] text-[var(--color-text-muted)]">
            ALL ARTICLES
          </span>
          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="blog-card group flex flex-col border border-[var(--color-border)] opacity-0 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-border)]"
              >
                <div className="relative h-[200px] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
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
        </section>

        <Footer />
      </div>
      </SmoothScroll>
    </>
  );
}
