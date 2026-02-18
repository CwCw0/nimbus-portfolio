"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CustomCursor from "../../../components/CustomCursor";
import { ArrowLeft, ArrowRight, Twitter, Linkedin, Link2, Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { getPostBySlug, getRelatedPosts } from "../../../data/blog";

export default function BlogPostContent({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);

  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

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

  if (!post) {
    return (
      <>
        <CustomCursor />
        <div className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
          <Header />
          <section className="flex flex-col items-center justify-center gap-6 px-16 py-[200px] max-md:px-6">
            <h1 className="font-space-grotesk text-[48px] font-bold text-white">Post not found</h1>
            <Link href="/blog" className="font-inter text-[var(--color-accent)] hover:underline">
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
      <main id="main-content" className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
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
                {post.tag}
              </span>
              <span className="font-inter text-xs text-[var(--color-text-subtle)]">
                {post.date}
              </span>
              <span className="font-inter text-xs text-[var(--color-text-subtle)]">
                · {post.readTime}
              </span>
            </div>
            <h1 className="font-space-grotesk text-[48px] font-bold leading-[1.1] tracking-[-2px] text-white max-md:text-[28px]">
              {post.title}
            </h1>
          </div>
        </section>

        {/* Hero Image */}
        <section className="w-full px-16 pb-12 max-md:px-6">
          <div className="w-full overflow-hidden border border-[var(--color-border)]">
            <img
              src={post.image}
              alt={post.title}
              className="h-[480px] w-full object-cover max-md:h-[220px]"
            />
          </div>
        </section>

        {/* Article Content + Sidebar */}
        <section ref={articleRef} className="w-full px-16 pb-[80px] max-md:px-6">
          <div className="flex gap-16 max-md:flex-col">
            {/* Article Body */}
            <article className="flex flex-1 flex-col gap-8 max-w-[720px]">
              {post.content.map((block, i) => {
                if (block.type === "p") {
                  return (
                    <p key={i} className="font-inter text-base leading-[1.9] text-[var(--color-text-secondary)]">
                      {block.text}
                    </p>
                  );
                }
                if (block.type === "h2") {
                  return (
                    <h2 key={i} className="font-space-grotesk text-[28px] font-bold tracking-[-1px] text-white">
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <blockquote key={i} className="border-l-2 border-[var(--color-accent)] pl-6 font-inter text-lg italic leading-[1.8] text-[var(--color-text-muted)]">
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
                          <li key={j} className="font-inter text-base leading-[1.8] text-[var(--color-text-secondary)]">
                            {parts.map((part, k) =>
                              k % 2 === 1 ? (
                                <strong key={k} className="text-white">{part}</strong>
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
            <aside className="w-[280px] max-md:w-full">
              <div className="sticky top-24 flex flex-col gap-8">
                {/* TOC */}
                <div className="flex flex-col gap-4 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
                  <span className="font-inter text-xs font-semibold tracking-[1px] text-white">
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
        <div className="mx-16 h-px bg-[var(--color-border)] max-md:mx-6" />

        {/* Author Bio */}
        <section className="w-full px-16 py-[60px] max-md:px-6">
          <div className="flex items-center gap-6 max-md:flex-col max-md:items-start">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)]">
              <span className="font-inter text-lg font-bold text-[#0A0A0B]">D</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-inter text-sm text-[var(--color-text-subtle)]">
                Written by
              </span>
              <span className="font-inter text-lg font-semibold text-white">
                Dee
              </span>
              <p className="font-inter text-sm text-[var(--color-text-dim)]">
                Builder. Founder of Nimbus. Always learning, always shipping.
              </p>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="w-full bg-[var(--color-bg-secondary)] px-16 py-[80px] max-md:px-6 max-md:py-16">
            <span className="mb-8 block font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
              RELATED ARTICLES
            </span>
            <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
              {related.map((rPost) => (
                <Link
                  key={rPost.slug}
                  href={`/blog/${rPost.slug}`}
                  className="group flex flex-col border border-[var(--color-border)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-border)]"
                >
                  <div className="h-[180px] overflow-hidden">
                    <img
                      src={rPost.image}
                      alt={rPost.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-3 p-6">
                    <div className="flex items-center gap-3">
                      <span className="bg-[var(--color-accent-subtle)] px-2.5 py-1 font-inter text-[10px] font-medium text-[var(--color-accent)]">
                        {rPost.tag}
                      </span>
                      <span className="font-inter text-[11px] text-[var(--color-text-subtle)]">
                        {rPost.date}
                      </span>
                    </div>
                    <h3 className="font-inter text-base font-semibold text-white group-hover:text-[var(--color-accent)] transition-colors">
                      {rPost.title}
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
        )}

        <Footer />
      </main>
    </>
  );
}
