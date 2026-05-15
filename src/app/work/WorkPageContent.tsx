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
                          background: 'rgba(10, 10, 15, 0.75)',
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  marginBottom: 'var(--sp-12)',
                  gap: 'var(--sp-6)',
                  flexWrap: 'wrap',
                }}
              >
                <p style={{ color: 'var(--fg-dim)', maxWidth: 480, lineHeight: 1.7 }}>
                  Production-quality templates built with Next.js and GSAP.
                  Each one ships with animations, responsive layouts, and real code.
                </p>
                <span
                  className="mono"
                  style={{ color: 'var(--fg-faint)', fontSize: 'var(--t-mono)', letterSpacing: '0.12em' }}
                >
                  06 TEMPLATES
                </span>
              </div>
            </FadeIn>

            {/* Template grid — 2 columns, large image cards */}
            <div
              className="design-lab-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'var(--sp-6)',
              }}
            >
              {[
                {
                  name: 'Studio Noir',
                  slug: 'studio-noir',
                  description: 'Dark creative studio with horizontal scroll gallery, custom cursor, and cinematic animations',
                  price: '$79',
                  tag: 'Creative',
                  pages: '4 pages',
                },
                {
                  name: 'Elevate',
                  slug: 'elevate',
                  description: 'Corporate SaaS with 3D tilt cards, gradient blobs, and structured layouts',
                  price: '$69',
                  tag: 'SaaS',
                  pages: '5 pages',
                },
                {
                  name: 'Pop Store',
                  slug: 'pop-store',
                  description: 'Neo-brutalist e-commerce with spring physics, bold type, and playful interactions',
                  price: '$89',
                  tag: 'E-Commerce',
                  pages: '4 pages',
                },
                {
                  name: 'Vitalis',
                  slug: 'vitalis',
                  description: 'Healthcare and wellness with pill navigation, rounded forms, and trust-first design',
                  price: '$79',
                  tag: 'Healthcare',
                  pages: '4 pages',
                },
                {
                  name: 'Roast',
                  slug: 'roast',
                  description: 'Coffee and cafe editorial with parallax hero, warm textures, and rich photography',
                  price: '$75',
                  tag: 'F&B',
                  pages: '5 pages',
                },
                {
                  name: 'Mono',
                  slug: 'mono',
                  description: 'Ultra-minimal portfolio with one font, zero noise, and pure structural craft',
                  price: '$59',
                  tag: 'Portfolio',
                  pages: '4 pages',
                },
              ].map((template, i) => (
                <FadeIn key={template.slug} delay={i * 80}>
                  <Link
                    href={`/work/designs/${template.slug}`}
                    className="design-lab-card"
                    style={{
                      display: 'block',
                      textDecoration: 'none',
                      color: 'inherit',
                      border: '1px solid var(--line)',
                      borderRadius: 'var(--r-lg)',
                      overflow: 'hidden',
                      background: 'var(--ink-2)',
                      transition: 'border-color 0.4s var(--ease-out), transform 0.4s var(--ease-out), box-shadow 0.4s var(--ease-out)',
                    }}
                  >
                    {/* Screenshot */}
                    <div
                      style={{
                        position: 'relative',
                        aspectRatio: '16 / 9',
                        overflow: 'hidden',
                        background: 'var(--ink-1)',
                      }}
                    >
                      <Image
                        src={`/images/templates/${template.slug}/hero.png`}
                        alt={`${template.name} template preview`}
                        fill
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'top center',
                          transition: 'transform 0.6s var(--ease-out)',
                        }}
                        sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 45vw"
                        className="design-lab-card-img"
                      />
                      {/* Tag badge */}
                      <span
                        className="mono"
                        style={{
                          position: 'absolute',
                          top: 'var(--sp-4)',
                          left: 'var(--sp-4)',
                          fontSize: 10,
                          letterSpacing: '0.14em',
                          color: 'var(--fg-dim)',
                          padding: '4px 12px',
                          borderRadius: 'var(--r-pill)',
                          border: '1px solid var(--line-strong)',
                          background: 'rgba(10, 10, 15, 0.88)',
                        }}
                      >
                        {template.tag}
                      </span>
                    </div>

                    {/* Card body */}
                    <div
                      style={{
                        padding: 'var(--sp-6) var(--sp-6) var(--sp-5)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--sp-2)',
                      }}
                    >
                      {/* Name + price */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <h3
                          className="display-sm design-lab-card-title"
                          style={{ fontSize: 'clamp(18px, 2vw, 22px)' }}
                        >
                          {template.name}
                        </h3>
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
                        }}
                      >
                        {template.description}
                      </p>

                      {/* Footer meta */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: 'var(--sp-3)',
                          paddingTop: 'var(--sp-3)',
                          borderTop: '1px solid var(--line)',
                        }}
                      >
                        <span
                          className="mono"
                          style={{ color: 'var(--fg-faint)', fontSize: 'var(--t-mono)' }}
                        >
                          Next.js + GSAP &middot; {template.pages}
                        </span>
                        <span
                          style={{
                            color: 'var(--accent)',
                            fontSize: 'var(--t-body-sm)',
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          Preview <span aria-hidden="true">↗</span>
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
