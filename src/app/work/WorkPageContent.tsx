'use client';

import Link from 'next/link';
import Image from 'next/image';
import RevealLine from '@/components/ui/RevealLine';
import FadeIn from '@/components/ui/FadeIn';
import { projects } from '@/data/projects';

const toneGradients: Record<string, string> = {
  violet: 'linear-gradient(135deg, rgba(245, 240, 228, 0.12), rgba(40, 36, 28, 0.06))',
  deep: 'linear-gradient(135deg, rgba(140, 140, 140, 0.12), rgba(32, 29, 24, 0.06))',
  ember: 'linear-gradient(135deg, rgba(252, 140, 92, 0.10), rgba(85, 42, 26, 0.06))',
  ink: 'linear-gradient(135deg, rgba(25, 23, 19, 0.25), rgba(14, 13, 11, 0.12))',
};

export default function WorkPageContent() {

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


      {/* ── Case Studies ── */}
      {(
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
                          background: 'rgba(14, 13, 11, 0.75)',
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


    </>
  );
}
