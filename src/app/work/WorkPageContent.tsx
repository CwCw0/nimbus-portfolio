'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RevealLine from '@/components/ui/RevealLine';
import FadeIn from '@/components/ui/FadeIn';
import { projects } from '@/data/projects';

const toneGradients: Record<string, string> = {
  violet: 'linear-gradient(135deg, rgba(124, 92, 252, 0.12), rgba(42, 26, 85, 0.06))',
  deep: 'linear-gradient(135deg, rgba(90, 63, 204, 0.12), rgba(26, 18, 51, 0.06))',
  ember: 'linear-gradient(135deg, rgba(252, 140, 92, 0.10), rgba(85, 42, 26, 0.06))',
  ink: 'linear-gradient(135deg, rgba(20, 18, 31, 0.25), rgba(10, 10, 15, 0.12))',
};

type View = 'cases' | 'lab';

export default function WorkPageContent() {
  const [view, setView] = useState<View>('cases');

  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          padding: 'clamp(120px, 16vw, 240px) 0 clamp(60px, 8vw, 120px)',
          background: 'transparent',
        }}
      >
        <div className="container">
          <RevealLine>
            <h1 className="display-xl">Selected Work.</h1>
          </RevealLine>
          <FadeIn delay={200}>
            <p
              style={{
                color: 'var(--fg-dim)',
                maxWidth: 580,
                marginTop: 'var(--sp-8)',
                lineHeight: 1.7,
              }}
            >
              Case studies and experiments from 2024&ndash;2026.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Toggle ── */}
      <section style={{ paddingBottom: 'var(--sp-12)', background: 'transparent' }}>
        <div className="container">
          <FadeIn delay={300}>
            <div
              style={{
                display: 'inline-flex',
                borderRadius: 'var(--r-pill)',
                border: '1px solid var(--line-strong)',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setView('cases')}
                style={{
                  padding: '10px 28px',
                  background: view === 'cases' ? 'var(--accent)' : 'transparent',
                  color: view === 'cases' ? 'var(--ink-0)' : 'var(--fg-dim)',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--f-body)',
                  fontSize: 'var(--t-body-sm)',
                  fontWeight: 500,
                  transition: 'background 0.3s var(--ease-out), color 0.3s var(--ease-out)',
                }}
              >
                Case Studies
              </button>
              <button
                onClick={() => setView('lab')}
                style={{
                  padding: '10px 28px',
                  background: view === 'lab' ? 'var(--accent)' : 'transparent',
                  color: view === 'lab' ? 'var(--ink-0)' : 'var(--fg-dim)',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--f-body)',
                  fontSize: 'var(--t-body-sm)',
                  fontWeight: 500,
                  transition: 'background 0.3s var(--ease-out), color 0.3s var(--ease-out)',
                }}
              >
                Design Lab
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Case Studies ── */}
      {view === 'cases' && (
        <section style={{ paddingBottom: 'var(--section-gap)', background: 'transparent' }}>
          <div className="container">
            <div
              className="work-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--sp-8)',
              }}
            >
              {projects.map((project, i) => (
                <FadeIn key={project.slug} delay={i * 120}>
                  <Link
                    href={`/work/${project.slug}`}
                    style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
                  >
                  <div
                    style={{
                      border: '1px solid var(--line)',
                      borderRadius: 'var(--r-lg)',
                      overflow: 'hidden',
                      background: 'var(--ink-2)',
                      transition: 'border-color 0.3s var(--ease-out), transform 0.3s var(--ease-out), box-shadow 0.4s var(--ease-out)',
                    }}
                    className="card-highlight"
                  >
                    {/* Project image */}
                    <div
                      style={{
                        aspectRatio: '16/10',
                        background: toneGradients[project.tone] || toneGradients.violet,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={`${project.title} — ${project.type}`}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 900px) 100vw, 50vw"
                        />
                      ) : (
                        <span
                          className="display-lg"
                          style={{ opacity: 0.06, userSelect: 'none' }}
                        >
                          {project.title}
                        </span>
                      )}

                      {/* Status badge */}
                      <span
                        style={{
                          position: 'absolute',
                          top: 'var(--sp-4)',
                          right: 'var(--sp-4)',
                          fontFamily: 'var(--f-mono)',
                          fontSize: 'var(--t-mono)',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          padding: '4px 10px',
                          borderRadius: 'var(--r-pill)',
                          border: '1px solid var(--line-strong)',
                          background: 'var(--glass-bg)',
                          backdropFilter: 'blur(8px)',
                          color: 'var(--fg-dim)',
                        }}
                      >
                        {project.status}
                      </span>
                    </div>

                    {/* Content */}
                    <div
                      style={{
                        padding: 'var(--sp-8)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--sp-4)',
                      }}
                    >
                      {/* Meta */}
                      <div
                        className="mono"
                        style={{ color: 'var(--fg-faint)' }}
                      >
                        {project.type} &middot; {project.stack} &middot;{' '}
                        {project.year}
                      </div>

                      {/* Title */}
                      <h2 className="display-md">{project.title}</h2>

                      {/* Tagline */}
                      <p
                        style={{
                          color: 'var(--fg-dim)',
                          lineHeight: 1.7,
                          fontSize: 'var(--t-body-sm)',
                        }}
                      >
                        {project.tagline.length > 140
                          ? project.tagline.slice(0, 140) + '...'
                          : project.tagline}
                      </p>

                      {/* CTA */}
                      <span
                        className="link-underline"
                        style={{
                          color: 'var(--accent)',
                          fontSize: 'var(--t-body-sm)',
                          fontWeight: 500,
                          marginTop: 'var(--sp-2)',
                          alignSelf: 'flex-start',
                        }}
                      >
                        View project <span aria-hidden="true">↗</span>
                      </span>
                    </div>
                  </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>

          <style jsx>{`
            @media (max-width: 900px) {
              .work-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </section>
      )}

      {/* ── Design Lab ── */}
      {view === 'lab' && (
        <section style={{ paddingBottom: 'var(--section-gap)', background: 'transparent' }}>
          <div className="container">
            {/* Section intro */}
            <FadeIn>
              <div style={{ marginBottom: 'var(--sp-12)' }}>
                <p style={{ color: 'var(--fg-dim)', maxWidth: 560, lineHeight: 1.7 }}>
                  6 production-quality web design templates, each with a distinct personality.
                  Next.js + GSAP animations, fully responsive, ready to ship.
                </p>
              </div>
            </FadeIn>

            {/* Template grid */}
            <div
              className="design-lab-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--sp-6)',
              }}
            >
              {[
                {
                  name: 'Studio Noir',
                  slug: 'studio-noir',
                  description: 'Dark creative studio — side nav, horizontal scroll, custom cursor',
                  price: '$79',
                  tag: 'Creative',
                  tone: 'ink',
                },
                {
                  name: 'Elevate',
                  slug: 'elevate',
                  description: 'Corporate SaaS — 3D tilt cards, gradient blob, clean structure',
                  price: '$69',
                  tag: 'SaaS',
                  tone: 'deep',
                },
                {
                  name: 'Pop Store',
                  slug: 'pop-store',
                  description: 'Neo-brutalist e-commerce — spring physics, bold typography',
                  price: '$89',
                  tag: 'E-Commerce',
                  tone: 'ember',
                },
                {
                  name: 'Vitalis',
                  slug: 'vitalis',
                  description: 'Healthcare & wellness — pill nav, soft rounded, trust-first',
                  price: '$79',
                  tag: 'Healthcare',
                  tone: 'deep',
                },
                {
                  name: 'Roast',
                  slug: 'roast',
                  description: 'Coffee & cafe editorial — parallax hero, warm textures',
                  price: '$75',
                  tag: 'F&B',
                  tone: 'ember',
                },
                {
                  name: 'Mono',
                  slug: 'mono',
                  description: 'Ultra-minimal portfolio — one font, zero noise, pure craft',
                  price: '$59',
                  tag: 'Portfolio',
                  tone: 'violet',
                },
              ].map((template, i) => (
                <FadeIn key={template.slug} delay={i * 80}>
                  <div
                    className="card-highlight"
                    style={{
                      border: '1px solid var(--line)',
                      borderRadius: 'var(--r-lg)',
                      overflow: 'hidden',
                      background: 'var(--ink-2)',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Colour swatch header */}
                    <div
                      style={{
                        height: 80,
                        background: toneGradients[template.tone] || toneGradients.violet,
                        display: 'flex',
                        alignItems: 'flex-end',
                        padding: 'var(--sp-3) var(--sp-5)',
                      }}
                    >
                      <span
                        className="mono"
                        style={{
                          fontSize: 10,
                          letterSpacing: '0.14em',
                          color: 'var(--fg-faint)',
                          padding: '3px 10px',
                          borderRadius: 'var(--r-pill)',
                          border: '1px solid var(--line-strong)',
                          background: 'var(--glass-bg)',
                        }}
                      >
                        {template.tag}
                      </span>
                    </div>

                    {/* Card body */}
                    <div
                      style={{
                        padding: 'var(--sp-6)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--sp-3)',
                        flex: 1,
                      }}
                    >
                      {/* Name + price row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--sp-3)' }}>
                        <h3 className="display-sm" style={{ fontSize: 'clamp(18px, 2vw, 22px)' }}>{template.name}</h3>
                        <span
                          style={{
                            fontFamily: 'var(--f-mono)',
                            fontSize: 'var(--t-mono)',
                            letterSpacing: '0.1em',
                            color: 'var(--accent)',
                            flexShrink: 0,
                          }}
                        >
                          {template.price}
                        </span>
                      </div>

                      {/* Description */}
                      <p
                        style={{
                          color: 'var(--fg-dim)',
                          fontSize: 'var(--t-body-sm)',
                          lineHeight: 1.6,
                          flex: 1,
                        }}
                      >
                        {template.description}
                      </p>

                      {/* CTA */}
                      <Link
                        href={`/work/designs/${template.slug}`}
                        className="btn ghost"
                        style={{ fontSize: 'var(--t-body-sm)', marginTop: 'var(--sp-2)', textAlign: 'center' }}
                      >
                        Preview template <span aria-hidden="true">↗</span>
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <style jsx>{`
            @media (max-width: 900px) {
              .design-lab-grid {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
            @media (max-width: 560px) {
              .design-lab-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </section>
      )}

    </>
  );
}
