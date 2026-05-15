'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RevealLine from '@/components/ui/RevealLine';
import RevealWords from '@/components/ui/RevealWords';
import FadeIn from '@/components/ui/FadeIn';
import { projects } from '@/data/projects';

const toneGradients: Record<string, string> = {
  violet: 'linear-gradient(135deg, rgba(124, 92, 252, 0.18), rgba(42, 26, 85, 0.30))',
  deep: 'linear-gradient(135deg, rgba(90, 63, 204, 0.18), rgba(26, 18, 51, 0.30))',
  ember: 'linear-gradient(135deg, rgba(252, 140, 92, 0.18), rgba(85, 42, 26, 0.30))',
  ink: 'linear-gradient(135deg, rgba(84, 80, 108, 0.18), rgba(20, 18, 31, 0.30))',
};

export default function Work() {
  return (
    <section
      id="work"
      style={{ padding: 'var(--section-gap) 0', background: 'transparent' }}
    >
      <div className="container">
        {/* Section head */}
        <div className="section-head">
          <span className="section-index">03 / Selected Work</span>
          <span className="section-label">Case studies · 2024–2026</span>
        </div>

        {/* Heading */}
        <RevealLine>
          <h2 className="display-lg">Case Studies.</h2>
        </RevealLine>

        {/* Pill grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'var(--sp-4)',
            marginTop: 'var(--sp-12)',
            marginBottom: 'var(--sp-16)',
          }}
          className="work-pill-grid"
        >
          {projects.map((p) => (
            <PillCard key={p.id} project={p} />
          ))}
        </div>

        {/* Stacked case studies */}
        {projects.map((p, idx) => (
          <CaseStudyRow key={p.id} project={p} index={idx} total={projects.length} />
        ))}

        {/* Bottom CTA */}
        <FadeIn>
          <div style={{ marginTop: 'var(--sp-16)', display: 'flex', justifyContent: 'center' }}>
            <Link href="/work" className="btn ghost">
              View all projects <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </FadeIn>
      </div>

      {/* responsive styles in globals.css under .work-pill-grid and .case-study-row */}
    </section>
  );
}

/* ─── Pill Card ─── */
function PillCard({ project: p }: { project: (typeof projects)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/work/${p.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        background: 'var(--ink-2)',
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--line)'}`,
        borderRadius: 'var(--r-md)',
        padding: 'var(--sp-5)',
        transition: 'border-color 0.3s var(--ease-out), transform 0.3s var(--ease-out)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      <span className="mono" style={{ color: 'var(--fg-faint)' }}>{p.id}</span>
      <p className="display-sm" style={{ margin: 'var(--sp-2) 0 var(--sp-1)' }}>{p.title}</p>
      <span className="mono" style={{ color: 'var(--fg-dim)' }}>
        {p.type} · {p.stack}
      </span>
      {p.status === 'IN DEV' && (
        <span
          style={{
            display: 'inline-block',
            marginLeft: 'var(--sp-2)',
            fontFamily: 'var(--f-mono)',
            fontSize: 'var(--t-mono)',
            letterSpacing: '0.1em',
            padding: '2px 8px',
            borderRadius: 'var(--r-pill)',
            background: 'var(--accent-soft)',
            color: 'var(--accent)',
          }}
        >
          IN DEV
        </span>
      )}
    </Link>
  );
}

/* ─── Stacked Case Study ─── */
function CaseStudyRow({
  project: p,
  index,
  total,
}: {
  project: (typeof projects)[0];
  index: number;
  total: number;
}) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const even = index % 2 === 0;

  // Parallax removed for performance — was causing scroll stutter
  // with 4 separate scroll listeners each calling getBoundingClientRect

  return (
    <div
      className="case-study-row"
      style={{
        minHeight: 'var(--case-study-min-height, 100vh)',
        display: 'grid',
        gridTemplateColumns: even ? '1fr 1fr' : '1fr 1fr',
        gap: 'var(--sp-12)',
        alignItems: 'center',
        padding: 'var(--sp-16) 0',
        borderTop: '1px solid var(--line)',
      }}
    >
      {/* Media */}
      <div style={{ order: even ? 1 : 2 }}>
        <div
          ref={mediaRef}
          style={{
            aspectRatio: '16 / 10',
            borderRadius: 'var(--r-lg)',
            background: toneGradients[p.tone] || toneGradients.violet,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {p.image && (
            <Image
              src={p.image}
              alt={`${p.title} — ${p.type}`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          )}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, transparent 60%, rgba(10, 10, 15, 0.6))',
            }}
          />
        </div>
      </div>

      {/* Body */}
      <div style={{ order: even ? 2 : 1 }}>
        {/* Meta */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--sp-3)',
            marginBottom: 'var(--sp-6)',
          }}
        >
          <span className="mono" style={{ color: 'var(--fg-faint)' }}>
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: 'var(--t-mono)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '3px 10px',
              borderRadius: 'var(--r-pill)',
              background: 'var(--accent-soft)',
              color: 'var(--accent)',
            }}
          >
            {p.status}
          </span>
        </div>

        {/* Title */}
        <RevealLine>
          <span className="display-lg" style={{ color: 'var(--fg)' }}>{p.title}</span>
        </RevealLine>

        {/* Tagline */}
        <p style={{
          margin: 'var(--sp-5) 0 var(--sp-8)',
          fontFamily: 'var(--f-serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(17px, 1.4vw, 22px)',
          lineHeight: 1.5,
          color: 'var(--fg)',
          opacity: 0.85,
          maxWidth: 520,
        }}>
          {p.tagline}
        </p>

        {/* Stats */}
        <div className="case-study-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--sp-4)', marginBottom: 'var(--sp-8)' }}>
          {p.stats.map(([label, value], i) => (
            <FadeIn key={label} delay={i * 120}>
              <div
                style={{
                  padding: 'var(--sp-4)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--r-sm)',
                }}
              >
                <span className="mono" style={{ color: 'var(--fg-faint)', display: 'block', marginBottom: 4 }}>
                  {label}
                </span>
                <span style={{ fontWeight: 600, color: 'var(--fg)' }}>{value}</span>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <Link href={`/work/${p.slug}`} className="btn ghost">
          Read case study <span aria-hidden="true">↗</span>
        </Link>
      </div>

    </div>
  );
}
