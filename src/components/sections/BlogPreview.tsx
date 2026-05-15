'use client';

import { useState } from 'react';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import ScrambleText from '@/components/ui/ScrambleText';
import { blogPosts } from '@/data/blog';

export default function BlogPreview() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section
      id="blog"
      style={{ padding: 'var(--section-gap) 0', background: 'transparent' }}
    >
      <div className="container">
        {/* Section head */}
        <div className="section-head">
          <span className="section-index">07 / Journal</span>
          <span className="section-label">Thoughts on building</span>
        </div>

        {/* Heading row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 'var(--sp-12)',
            flexWrap: 'wrap',
            gap: 'var(--sp-4)',
          }}
        >
          <h2 className="display-lg">Latest thoughts.</h2>
          <Link
            href="/blog"
            className="link-underline"
            style={{ color: 'var(--accent)', fontFamily: 'var(--f-body)', fontSize: 'var(--t-body-sm)' }}
          >
            View all posts →
          </Link>
        </div>

        {/* Rows */}
        <div style={{ borderTop: '1px solid var(--line)' }}>
          {posts.map((post, i) => (
            <BlogRow key={post.slug} post={post} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogRow({
  post,
  delay,
}: {
  post: (typeof blogPosts)[0];
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={delay}>
      <Link
        href={`/blog/${post.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="blog-row"
        style={{
          display: 'grid',
          textDecoration: 'none',
          color: 'var(--fg)',
          padding: 'var(--sp-6) var(--sp-3)',
          borderBottom: '1px solid var(--line)',
          transition: 'background 0.3s var(--ease-out), padding 0.3s var(--ease-out)',
          background: hovered ? 'var(--accent-soft)' : 'transparent',
          paddingLeft: hovered ? 'var(--sp-5)' : 'var(--sp-3)',
          paddingRight: hovered ? 'var(--sp-5)' : 'var(--sp-3)',
          alignItems: 'center',
          gap: 'var(--sp-6)',
        }}
      >
        {/* Left: pill + date */}
        <div className="blog-col-left" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
          <span
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: 'var(--t-mono)',
              letterSpacing: '0.08em',
              padding: '3px 10px',
              borderRadius: 'var(--r-pill)',
              border: '1px solid var(--line-strong)',
              color: 'var(--accent)',
              display: 'inline-flex',
              alignSelf: 'flex-start',
              gap: 'var(--sp-2)',
            }}
          >
            {post.readTime} · {post.tag}
          </span>
          <span className="mono" style={{ color: 'var(--fg-faint)' }}>{post.date}</span>
        </div>

        {/* Title */}
        <div className="blog-col-title">
          <ScrambleText text={post.title} className="display-md" />
        </div>

        {/* Subtitle */}
        <div className="blog-col-sub">
          <span className="body-sm" style={{ color: 'var(--fg-dim)' }}>{post.excerpt}</span>
        </div>

        {/* Arrow */}
        <div className="blog-col-arrow" style={{ textAlign: 'right' }}>
          <span
            style={{
              color: 'var(--accent)',
              fontFamily: 'var(--f-body)',
              fontSize: 'var(--t-body-sm)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--sp-2)',
              transition: 'transform 0.3s var(--ease-out)',
              transform: hovered ? 'translateX(8px)' : 'translateX(0)',
            }}
          >
            Read more →
          </span>
        </div>
      </Link>

      <style jsx>{`
        .blog-row {
          grid-template-columns: 220px 1fr 360px 100px;
        }
        @media (max-width: 1000px) {
          .blog-row {
            grid-template-columns: 1fr auto;
          }
          .blog-col-left,
          .blog-col-sub {
            display: none !important;
          }
        }
      `}</style>
    </FadeIn>
  );
}
