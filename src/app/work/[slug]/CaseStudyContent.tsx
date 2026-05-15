'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import CustomCursor from '../../../components/CustomCursor';
import SmoothScroll from '../../../components/SmoothScroll';
import RevealLine from '../../../components/ui/RevealLine';
import FadeIn from '../../../components/ui/FadeIn';
import { projects } from '../../../data/projects';
import type { CaseStudy } from '../../../data/caseStudies';

const toneGradients: Record<string, string> = {
  violet: 'linear-gradient(135deg, rgba(124,92,252,0.15), rgba(124,92,252,0.04))',
  deep: 'linear-gradient(135deg, rgba(90,63,204,0.18), rgba(90,63,204,0.04))',
  ember: 'linear-gradient(135deg, rgba(252,140,60,0.15), rgba(252,140,60,0.04))',
  ink: 'linear-gradient(135deg, rgba(245,240,230,0.06), rgba(245,240,230,0.02))',
};

function toParagraphs(text: string): string[] {
  return text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
}

export default function CaseStudyContent({
  caseStudy,
  nextProject,
  prevProject,
}: {
  caseStudy: CaseStudy | null;
  nextProject: { title: string; slug: string };
  prevProject: { title: string; slug: string } | null;
}) {
  // Find matching project data for stats/tone
  const project = caseStudy
    ? projects.find((p) => p.slug === caseStudy.slug)
    : null;

  if (!caseStudy) {
    return (
      <>
        <CustomCursor />
        <div className="flex w-full flex-col overflow-x-hidden">
          <Header />
          <section className="container" style={{ padding: '200px 0', textAlign: 'center' }}>
            <h1 className="display-lg" style={{ color: 'var(--fg)' }}>Project not found</h1>
            <Link href="/work" className="body" style={{ color: 'var(--accent)', marginTop: 'var(--sp-6)', display: 'inline-block' }}>
              Back to Work
            </Link>
          </section>
          <Footer />
        </div>
      </>
    );
  }

  const challengeParas = toParagraphs(caseStudy.challenge);
  const solutionParas = toParagraphs(caseStudy.solution);
  const tone = project?.tone || 'violet';
  const gradient = toneGradients[tone] || toneGradients.violet;

  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <main className="flex w-full flex-col overflow-x-hidden">
          <Header />

          {/* ── Hero ── */}
          <section className="container" style={{ paddingTop: 'clamp(140px, 18vh, 200px)', paddingBottom: 'var(--sp-12)' }}>
            {/* Back link */}
            <FadeIn>
              <Link
                href="/work"
                className="body-sm"
                style={{
                  color: 'var(--fg-dim)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--sp-2)',
                  textDecoration: 'none',
                  marginBottom: 'var(--sp-12)',
                }}
              >
                <ArrowLeft style={{ width: 16, height: 16 }} />
                All projects
              </Link>
            </FadeIn>

            {/* Title */}
            <RevealLine>
              <h1 className="display-xxl" style={{ color: 'var(--fg)' }}>
                {caseStudy.shortTitle}
              </h1>
            </RevealLine>

            {/* Meta row */}
            <FadeIn delay={200}>
              <div
                className="mono"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--sp-4)',
                  flexWrap: 'wrap',
                  marginTop: 'var(--sp-8)',
                }}
              >
                {project && (
                  <>
                    <span style={{ color: 'var(--fg-dim)' }}>{project.type}</span>
                    <span style={{ color: 'var(--fg-faint)' }}>&middot;</span>
                    <span style={{ color: 'var(--fg-dim)' }}>{project.stack}</span>
                    <span style={{ color: 'var(--fg-faint)' }}>&middot;</span>
                    <span style={{ color: 'var(--fg-dim)' }}>{project.year}</span>
                  </>
                )}
                {caseStudy.status && (
                  <span
                    style={{
                      padding: '4px 14px',
                      borderRadius: 'var(--r-pill)',
                      border: caseStudy.status === 'in-development'
                        ? '1px solid rgba(245,158,11,0.3)'
                        : '1px solid var(--line-strong)',
                      color: caseStudy.status === 'in-development' ? '#fbbf24' : 'var(--fg-dim)',
                      fontSize: 'var(--t-mono)',
                    }}
                  >
                    {caseStudy.status === 'in-development' ? 'IN DEV' : caseStudy.status === 'live' ? 'LIVE' : caseStudy.status.toUpperCase()}
                  </span>
                )}
              </div>
            </FadeIn>
          </section>

          {/* ── Large mockup area ── */}
          <section className="container" style={{ paddingBottom: 'var(--sp-16)' }}>
            <FadeIn delay={300}>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  background: gradient,
                  border: '1px solid var(--line)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {caseStudy.heroImage ? (
                  <Image
                    src={caseStudy.heroImage}
                    alt={caseStudy.title}
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'top',
                    }}
                    sizes="100vw"
                    priority
                  />
                ) : (
                  <span className="mono" style={{ color: 'var(--fg-faint)' }}>
                    PROJECT MOCKUP
                  </span>
                )}
                {caseStudy.liveUrl && (
                  <a
                    href={caseStudy.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="body-sm"
                    style={{
                      position: 'absolute',
                      bottom: 'var(--sp-4)',
                      right: 'var(--sp-4)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 'var(--sp-2)',
                      padding: '10px 20px',
                      background: 'rgba(10,10,15,0.85)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid var(--line-strong)',
                      color: 'var(--accent)',
                      textDecoration: 'none',
                      borderRadius: 'var(--r-md)',
                      transition: 'background 0.3s var(--ease-out)',
                    }}
                  >
                    View Live
                    <ArrowRight style={{ width: 14, height: 14 }} />
                  </a>
                )}
              </div>
            </FadeIn>
          </section>

          {/* ── Tagline ── */}
          <section className="container" style={{ paddingBottom: 'var(--sp-16)' }}>
            <FadeIn delay={100}>
              <p
                style={{
                  fontFamily: 'var(--f-serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(20px, 2.5vw, 28px)',
                  lineHeight: 1.5,
                  color: 'var(--fg-dim)',
                  maxWidth: '720px',
                }}
              >
                {caseStudy.heroDesc}
              </p>
            </FadeIn>
          </section>

          {/* ── Stats row ── */}
          {project && project.stats.length > 0 && (
            <section className="container" style={{ paddingBottom: 'var(--section-gap)' }}>
              <FadeIn delay={150}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${project.stats.length}, 1fr)`,
                    gap: 'var(--sp-4)',
                  }}
                >
                  {project.stats.map(([label, value]) => (
                    <div
                      key={label}
                      style={{
                        padding: 'var(--sp-8)',
                        border: '1px solid var(--line)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--sp-2)',
                      }}
                    >
                      <span className="mono" style={{ color: 'var(--fg-faint)' }}>
                        {label}
                      </span>
                      <span className="display-md" style={{ color: 'var(--fg)' }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <style jsx>{`
                  @media (max-width: 640px) {
                    div[style*="grid-template-columns: repeat"] {
                      grid-template-columns: 1fr !important;
                    }
                  }
                `}</style>
              </FadeIn>
            </section>
          )}

          {/* ── Project details: Challenge + Solution ── */}
          {(challengeParas.length > 0 || solutionParas.length > 0) && (
            <section
              style={{
                borderTop: '1px solid var(--line)',
                borderBottom: '1px solid var(--line)',
                padding: 'var(--section-gap) 0',
              }}
            >
              <div className="container">
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'var(--sp-16)',
                    maxWidth: '1100px',
                  }}
                >
                  {/* Challenge */}
                  <FadeIn>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
                      <span className="mono" style={{ color: 'var(--accent)' }}>
                        THE CHALLENGE
                      </span>
                      {challengeParas.map((para, i) => (
                        <p
                          key={i}
                          style={{
                            fontFamily: i === 0 ? 'var(--f-body)' : 'var(--f-body)',
                            fontSize: i === 0 ? '17px' : 'var(--t-body-sm)',
                            fontWeight: i === 0 ? 500 : 400,
                            lineHeight: 1.7,
                            color: i === 0 ? 'var(--fg)' : 'var(--fg-dim)',
                          }}
                        >
                          {para}
                        </p>
                      ))}
                      {caseStudy.challengePoints && caseStudy.challengePoints.length > 0 && (
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', borderTop: '1px solid var(--line)', paddingTop: 'var(--sp-5)' }}>
                          {caseStudy.challengePoints.map((point, i) => (
                            <li
                              key={i}
                              className="body-sm"
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 'var(--sp-3)',
                                color: 'var(--fg-dim)',
                              }}
                            >
                              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', opacity: 0.6, flexShrink: 0, marginTop: 7 }} />
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </FadeIn>

                  {/* Solution */}
                  <FadeIn delay={150}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
                      <span className="mono" style={{ color: 'var(--accent)' }}>
                        THE APPROACH
                      </span>
                      {solutionParas.map((para, i) => (
                        <p
                          key={i}
                          style={{
                            fontFamily: 'var(--f-body)',
                            fontSize: i === 0 ? '17px' : 'var(--t-body-sm)',
                            fontWeight: i === 0 ? 500 : 400,
                            lineHeight: 1.7,
                            color: i === 0 ? 'var(--fg)' : 'var(--fg-dim)',
                          }}
                        >
                          {para}
                        </p>
                      ))}
                      {caseStudy.solutionHighlights && caseStudy.solutionHighlights.length > 0 && (
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', borderTop: '1px solid var(--line)', paddingTop: 'var(--sp-5)' }}>
                          {caseStudy.solutionHighlights.map((point, i) => (
                            <li
                              key={i}
                              className="body-sm"
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 'var(--sp-3)',
                                color: 'var(--fg-dim)',
                              }}
                            >
                              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: 7 }} />
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </FadeIn>
                </div>

                <style jsx>{`
                  @media (max-width: 768px) {
                    div[style*="grid-template-columns: 1fr 1fr"] {
                      grid-template-columns: 1fr !important;
                    }
                  }
                `}</style>
              </div>
            </section>
          )}

          {/* ── Tech stack chips ── */}
          {caseStudy.tags.length > 0 && (
            <section className="container" style={{ padding: 'var(--sp-16) 0' }}>
              <FadeIn>
                <span className="mono" style={{ color: 'var(--fg-faint)', display: 'block', marginBottom: 'var(--sp-6)' }}>
                  TECH STACK
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
                  {caseStudy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="body-sm"
                      style={{
                        padding: '8px 18px',
                        border: '1px solid var(--line-strong)',
                        borderRadius: 'var(--r-pill)',
                        color: 'var(--fg-dim)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </section>
          )}

          {/* ── Results ── */}
          {caseStudy.results.length > 0 && (
            <section
              style={{
                borderTop: '1px solid var(--line)',
                padding: 'var(--section-gap) 0',
              }}
            >
              <div className="container">
                <FadeIn>
                  <span className="mono" style={{ color: 'var(--accent)', display: 'block', marginBottom: 'var(--sp-4)' }}>
                    RESULTS
                  </span>
                  <h2 className="display-md" style={{ color: 'var(--fg)', marginBottom: 'var(--sp-12)' }}>
                    The impact
                  </h2>
                </FadeIn>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${Math.min(caseStudy.results.length, 4)}, 1fr)`,
                    gap: 'var(--sp-4)',
                  }}
                >
                  {caseStudy.results.map((r, i) => (
                    <FadeIn key={r.label} delay={i * 100}>
                      <div
                        style={{
                          padding: 'var(--sp-8)',
                          border: '1px solid var(--line)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 'var(--sp-2)',
                        }}
                      >
                        <span
                          className={`display-md ${r.color}`}
                          style={{ letterSpacing: '-0.02em' }}
                        >
                          {r.value}
                        </span>
                        <span className="body-sm" style={{ color: 'var(--fg-dim)' }}>
                          {r.label}
                        </span>
                      </div>
                    </FadeIn>
                  ))}
                </div>

                <style jsx>{`
                  @media (max-width: 640px) {
                    div[style*="grid-template-columns: repeat"] {
                      grid-template-columns: 1fr 1fr !important;
                    }
                  }
                `}</style>
              </div>
            </section>
          )}

          {/* ── Navigation: prev / next ── */}
          <section
            style={{
              borderTop: '1px solid var(--line)',
              padding: 'var(--sp-16) 0',
            }}
          >
            <div
              className="container"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {prevProject ? (
                <Link
                  href={`/work/${prevProject.slug}`}
                  className="group"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--sp-2)',
                    textDecoration: 'none',
                  }}
                >
                  <span className="mono" style={{ color: 'var(--fg-faint)' }}>
                    PREVIOUS
                  </span>
                  <span
                    className="display-sm"
                    style={{
                      color: 'var(--fg)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--sp-3)',
                      transition: 'color 0.3s var(--ease-out)',
                    }}
                  >
                    <ArrowLeft
                      className="transition-transform duration-300 group-hover:-translate-x-1"
                      style={{ width: 20, height: 20 }}
                    />
                    <span className="group-hover:text-(--accent) transition-colors duration-300">
                      {prevProject.title}
                    </span>
                  </span>
                </Link>
              ) : (
                <div />
              )}

              <Link
                href={`/work/${nextProject.slug}`}
                className="group"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: 'var(--sp-2)',
                  textDecoration: 'none',
                }}
              >
                <span className="mono" style={{ color: 'var(--fg-faint)' }}>
                  NEXT PROJECT
                </span>
                <span
                  className="display-sm"
                  style={{
                    color: 'var(--fg)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--sp-3)',
                    transition: 'color 0.3s var(--ease-out)',
                  }}
                >
                  <span className="group-hover:text-(--accent) transition-colors duration-300">
                    {nextProject.title}
                  </span>
                  <ArrowRight
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    style={{ width: 20, height: 20 }}
                  />
                </span>
              </Link>
            </div>
          </section>

          {/* ── CTA ── */}
          <section
            style={{
              borderTop: '1px solid var(--line)',
              padding: 'var(--sp-24) 0',
              textAlign: 'center',
            }}
          >
            <div className="container">
              <FadeIn>
                <p
                  style={{
                    fontFamily: 'var(--f-serif)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(22px, 3vw, 32px)',
                    lineHeight: 1.4,
                    color: 'var(--fg-dim)',
                    marginBottom: 'var(--sp-8)',
                  }}
                >
                  Have a similar project?
                </p>
                <Link href="/contact" className="btn">
                  Let&apos;s talk
                </Link>
              </FadeIn>
            </div>
          </section>

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
