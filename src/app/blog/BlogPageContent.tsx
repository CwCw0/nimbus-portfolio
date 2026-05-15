'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import RevealLine from '../../components/ui/RevealLine';
import FadeIn from '../../components/ui/FadeIn';
import { blogPosts } from '../../data/blog';

export default function BlogPageContent() {
  const [active, setActive] = useState('All Posts');

  const categories = useMemo(() => {
    const tags = Array.from(new Set(blogPosts.map((p) => p.tag)));
    return ['All Posts', ...tags];
  }, []);

  const filtered = active === 'All Posts'
    ? blogPosts
    : blogPosts.filter((p) => p.tag === active);

  return (
    <>
      {/* ── Hero ── */}
      <section className="container pt-[clamp(140px,18vh,200px)] pb-(--sp-16)">
        <RevealLine>
          <h1 className="display-xl" style={{ color: 'var(--fg)' }}>
            Latest thoughts.
          </h1>
        </RevealLine>

        {/* Category pills */}
        <FadeIn delay={200}>
          <div className="mt-(--sp-10) flex flex-wrap gap-(--sp-2)">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="mono transition-all duration-300"
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--r-pill)',
                  border: active === cat ? '1px solid var(--accent)' : '1px solid var(--line-strong)',
                  background: active === cat ? 'var(--accent)' : 'transparent',
                  color: active === cat ? 'var(--ink-0)' : 'var(--fg-dim)',
                  cursor: 'pointer',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── Post list ── */}
      <section className="container pb-(--section-gap)">
        <div
          className="mb-(--sp-10)"
          style={{ borderTop: '1px solid var(--line)' }}
        />

        <div className="flex flex-col">
          {filtered.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 60}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block blog-row-link"
                style={{ borderBottom: '1px solid var(--line)', borderRadius: 'var(--r-md)', transition: 'background 0.3s ease' }}
              >
                <div className="blog-row-grid transition-colors duration-300" style={{ padding: '28px 0', borderRadius: 'var(--r-md)' }}>
                  {/* Date + category */}
                  <div className="blog-row-date flex flex-col gap-(--sp-3)">
                    <span
                      className="mono"
                      style={{ color: 'var(--fg-faint)' }}
                    >
                      {post.date}
                    </span>
                    <span
                      className="mono"
                      style={{
                        display: 'inline-block',
                        padding: '3px 10px',
                        border: '1px solid var(--line-strong)',
                        borderRadius: 'var(--r-pill)',
                        color: 'var(--fg-dim)',
                        width: 'fit-content',
                      }}
                    >
                      {post.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="display-md transition-colors duration-300"
                    style={{
                      color: 'var(--fg)',
                      fontSize: 'clamp(24px, 3vw, 38px)',
                    }}
                  >
                    <span className="group-hover:text-(--accent) transition-colors duration-300">
                      {post.title}
                    </span>
                  </h2>

                  {/* Excerpt */}
                  <p
                    className="blog-row-excerpt body-sm"
                    style={{
                      color: 'var(--fg-dim)',
                      maxWidth: '420px',
                    }}
                  >
                    {post.excerpt.length > 120
                      ? post.excerpt.slice(0, 120) + '...'
                      : post.excerpt}
                  </p>

                  {/* Read time + arrow */}
                  <div className="flex items-center gap-(--sp-4)">
                    <span className="mono" style={{ color: 'var(--fg-faint)' }}>
                      {post.readTime}
                    </span>
                    <ArrowRight
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      style={{ width: 18, height: 18, color: 'var(--fg-faint)' }}
                    />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        {filtered.length === 0 && (
          <FadeIn>
            <p
              className="body"
              style={{
                color: 'var(--fg-dim)',
                padding: 'var(--sp-16) 0',
                textAlign: 'center',
              }}
            >
              No posts in this category yet.
            </p>
          </FadeIn>
        )}
      </section>
    </>
  );
}
