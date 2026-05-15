'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import FadeIn from '../../../components/ui/FadeIn';
import RevealLine from '../../../components/ui/RevealLine';
import { getPostBySlug, getRelatedPosts } from '../../../data/blog';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function BlogPostContent({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const articleRef = useRef<HTMLElement>(null);

  const handleScroll = useCallback(() => {
    const el = articleRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const total = el.scrollHeight - window.innerHeight;
    const scrolled = -rect.top;
    setProgress(Math.min(100, Math.max(0, (scrolled / total) * 100)));

    const sections = el.querySelectorAll('h2[id]');
    sections.forEach((section, i) => {
      const sRect = section.getBoundingClientRect();
      if (sRect.top < 200) setActiveSection(i);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (!post) {
    return (
      <section className="container" style={{ padding: '200px 0', textAlign: 'center' }}>
        <h1 className="display-lg" style={{ color: 'var(--fg)' }}>Post not found</h1>
        <Link href="/blog" className="body" style={{ color: 'var(--accent)', marginTop: 32, display: 'inline-block' }}>
          Back to Blog
        </Link>
      </section>
    );
  }

  const related = getRelatedPosts(post.relatedSlugs);
  const hasToc = post.tocItems.length > 0;

  return (
    <>
      {/* Reading progress bar */}
      <div className="reading-progress" style={{ width: `${progress}%` }} />

      {/* ── Post header ── */}
      <section className="container" style={{ paddingTop: 'clamp(120px, 16vh, 180px)' }}>
        <FadeIn>
          <Link
            href="/blog"
            style={{
              color: 'var(--fg-dim)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none',
              marginBottom: 80,
              fontFamily: 'var(--f-body)',
              fontSize: 'var(--t-body-sm)',
            }}
          >
            <ArrowLeft style={{ width: 16, height: 16 }} />
            All posts
          </Link>
        </FadeIn>

        <FadeIn delay={100}>
          <div
            className="mono"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
              marginBottom: 24,
            }}
          >
            <span
              style={{
                padding: '4px 14px',
                border: '1px solid var(--line-strong)',
                borderRadius: 999,
                color: 'var(--fg-dim)',
              }}
            >
              {post.tag}
            </span>
            <span style={{ color: 'var(--fg-faint)' }}>{post.date}</span>
            <span style={{ color: 'var(--fg-faint)' }}>{post.readTime}</span>
          </div>
        </FadeIn>

        <RevealLine delay={150}>
          <h1
            className="display-lg"
            style={{ color: 'var(--fg)', maxWidth: 900, marginBottom: 32 }}
          >
            {post.title}
          </h1>
        </RevealLine>

        <FadeIn delay={250}>
          <p
            style={{
              fontFamily: 'var(--f-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(18px, 2vw, 22px)',
              lineHeight: 1.6,
              color: 'var(--fg-dim)',
              maxWidth: 720,
              marginBottom: 64,
            }}
          >
            {post.excerpt}
          </p>
        </FadeIn>

        <div style={{ borderTop: '1px solid var(--line)', marginBottom: 64 }} />
      </section>

      {/* ── Content + TOC ── */}
      <section ref={articleRef} className="container" style={{ paddingBottom: 'var(--section-gap)' }}>
        <div className="blog-post-grid" data-has-toc={hasToc ? 'true' : undefined}>
          {/* Article body */}
          <article style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 720 }}>
            {post.content.map((block, i) => {
              if (block.type === 'p') {
                return (
                  <p
                    key={i}
                    style={{
                      fontFamily: 'var(--f-body)',
                      fontSize: 18,
                      lineHeight: 1.85,
                      color: 'var(--fg)',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {block.text}
                  </p>
                );
              }

              if (block.type === 'h2') {
                const id = slugify(block.text);
                return (
                  <h2
                    key={i}
                    id={id}
                    className="display-sm"
                    style={{ color: 'var(--fg)', marginTop: 48, marginBottom: 8 }}
                  >
                    {block.text}
                  </h2>
                );
              }

              if (block.type === 'quote') {
                return (
                  <blockquote
                    key={i}
                    style={{
                      borderLeft: '2px solid var(--accent)',
                      paddingLeft: 24,
                      margin: '24px 0',
                      fontFamily: 'var(--f-serif)',
                      fontStyle: 'italic',
                      fontSize: 20,
                      lineHeight: 1.7,
                      color: 'var(--fg-dim)',
                    }}
                  >
                    &ldquo;{block.text}&rdquo;
                  </blockquote>
                );
              }

              if (block.type === 'ol' && block.items) {
                return (
                  <ol
                    key={i}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 16,
                      paddingLeft: 24,
                      listStyleType: 'decimal',
                    }}
                  >
                    {block.items.map((item, j) => {
                      const parts = item.split('**');
                      return (
                        <li
                          key={j}
                          style={{
                            fontFamily: 'var(--f-body)',
                            fontSize: 17,
                            lineHeight: 1.8,
                            color: 'var(--fg)',
                          }}
                        >
                          {parts.map((part, k) =>
                            k % 2 === 1 ? (
                              <strong key={k} style={{ color: 'var(--fg)', fontWeight: 600 }}>
                                {part}
                              </strong>
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

          {/* TOC sidebar */}
          {hasToc && (
            <aside className="blog-post-toc">
              <div style={{ position: 'sticky', top: 120, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span className="mono" style={{ color: 'var(--fg-faint)', marginBottom: 8 }}>
                  ON THIS PAGE
                </span>
                {post.tocItems.map((item, i) => {
                  const targetId = slugify(item);
                  return (
                    <button
                      key={item}
                      onClick={() => {
                        const el = document.getElementById(targetId);
                        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      style={{
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        padding: '4px 0 4px 12px',
                        fontFamily: 'var(--f-body)',
                        fontSize: 'var(--t-body-sm)',
                        lineHeight: 1.4,
                        color: activeSection === i ? 'var(--accent)' : 'var(--fg-faint)',
                        cursor: 'pointer',
                        transition: 'color 0.3s var(--ease-out)',
                        borderLeft: activeSection === i ? '2px solid var(--accent)' : '2px solid transparent',
                      }}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </aside>
          )}
        </div>
      </section>

      {/* ── Related posts ── */}
      {related.length > 0 && (
        <section style={{ borderTop: '1px solid var(--line)', padding: 'var(--section-gap) 0' }}>
          <div className="container">
            <FadeIn>
              <span className="mono" style={{ color: 'var(--fg-faint)', marginBottom: 48, display: 'block' }}>
                RELATED POSTS
              </span>
            </FadeIn>

            <div className="blog-related-grid">
              {related.map((rPost, i) => (
                <FadeIn key={rPost.slug} delay={i * 100}>
                  <Link
                    href={`/blog/${rPost.slug}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 16,
                      padding: 32,
                      border: '1px solid var(--line)',
                      textDecoration: 'none',
                      transition: 'border-color 0.3s var(--ease-out)',
                    }}
                    className="blog-related-card"
                  >
                    <span className="mono" style={{ color: 'var(--fg-faint)' }}>
                      {rPost.tag} &middot; {rPost.date}
                    </span>
                    <h3
                      className="display-sm"
                      style={{ color: 'var(--fg)', transition: 'color 0.3s var(--ease-out)' }}
                    >
                      {rPost.title}
                    </h3>
                    <span
                      style={{
                        fontFamily: 'var(--f-body)',
                        fontSize: 'var(--t-body-sm)',
                        color: 'var(--fg-dim)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginTop: 'auto',
                      }}
                    >
                      Read post
                      <ArrowRight style={{ width: 14, height: 14 }} />
                    </span>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Footer CTA ── */}
      <section style={{ borderTop: '1px solid var(--line)', padding: '96px 0', textAlign: 'center' }}>
        <div className="container">
          <FadeIn>
            <p
              style={{
                fontFamily: 'var(--f-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(22px, 3vw, 32px)',
                lineHeight: 1.4,
                color: 'var(--fg-dim)',
                marginBottom: 32,
              }}
            >
              Enjoyed this? Let&apos;s work together.
            </p>
            <Link href="/contact" className="btn">
              Start a conversation
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
