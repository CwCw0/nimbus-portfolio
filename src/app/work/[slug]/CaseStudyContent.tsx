'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
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

function toParagraphs(text?: string): string[] {
  if (!text) return [];
  return text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
}

function StatusChip({ caseStudy }: { caseStudy: CaseStudy }) {
  if (!caseStudy.status && !caseStudy.statusLabel) return null;
  const inProgress = caseStudy.status === 'in-development';
  const internal = Boolean(caseStudy.statusLabel) && caseStudy.status === 'live';
  const label =
    caseStudy.statusLabel ??
    (caseStudy.status === 'in-development'
      ? 'IN DEV'
      : caseStudy.status === 'live'
        ? 'LIVE'
        : caseStudy.status?.toUpperCase());
  return (
    <span
      className="mono"
      style={{
        padding: '5px 14px',
        borderRadius: 'var(--r-pill)',
        border: inProgress
          ? '1px solid rgba(245,158,11,0.3)'
          : internal
            ? '1px solid rgba(124,92,252,0.35)'
            : '1px solid var(--line-strong)',
        color: inProgress ? '#fbbf24' : internal ? 'var(--accent-2)' : 'var(--fg-dim)',
        fontSize: 'var(--t-mono)',
        letterSpacing: '0.08em',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────
   Proof format — 6 sections, screenshots carry the page.
   Activated when caseStudy.story is present.
   ──────────────────────────────────────────────────────────── */
function ProofCaseStudy({
  caseStudy,
  meta,
  nextProject,
  prevProject,
}: {
  caseStudy: CaseStudy;
  meta: { type: string; stack: string; year: string } | null;
  nextProject: { title: string; slug: string };
  prevProject: { title: string; slug: string } | null;
}) {
  return (
    <div className="flex w-full flex-col overflow-x-hidden">
      {/* ── 1+2. Hero: title, dek, meta, image — one continuous block ── */}
      <section className="container" style={{ paddingTop: 'clamp(120px, 15vh, 170px)', paddingBottom: 'var(--sp-16)' }}>
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
              marginBottom: 'var(--sp-10)',
            }}
          >
            <ArrowLeft style={{ width: 16, height: 16 }} />
            All projects
          </Link>
        </FadeIn>

        <FadeIn>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--sp-5)',
              flexWrap: 'wrap',
              marginBottom: 'var(--sp-4)',
            }}
          >
            {caseStudy.clientLogo && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                <span className="mono" style={{ color: 'var(--fg-faint)', letterSpacing: '0.12em' }}>
                  FOR
                </span>
                <Image
                  src={caseStudy.clientLogo.src}
                  alt={caseStudy.clientLogo.alt}
                  width={Math.round(34 * (caseStudy.clientLogo.width / caseStudy.clientLogo.height))}
                  height={34}
                  style={{ opacity: 0.92 }}
                />
              </span>
            )}
            <StatusChip caseStudy={caseStudy} />
          </div>
        </FadeIn>

        <RevealLine>
          <h1 className="display-lg" style={{ color: 'var(--fg)', maxWidth: '16ch' }}>
            {caseStudy.shortTitle}
          </h1>
        </RevealLine>

        {/* Dek — replaces the old standalone tagline section */}
        <FadeIn delay={150}>
          <p
            style={{
              fontFamily: 'var(--f-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(19px, 2.2vw, 26px)',
              lineHeight: 1.55,
              color: 'var(--fg-dim)',
              maxWidth: '58ch',
              marginTop: 'var(--sp-6)',
            }}
          >
            {caseStudy.heroDesc}
          </p>
        </FadeIn>

        {/* Meta row — from caseStudy.meta, single mono line */}
        {meta && (
          <FadeIn delay={250}>
            <div
              className="mono"
              style={{
                display: 'flex',
                alignItems: 'center',
                columnGap: 'var(--sp-4)',
                rowGap: 'var(--sp-2)',
                flexWrap: 'wrap',
                marginTop: 'var(--sp-8)',
                color: 'var(--fg-dim)',
              }}
            >
              <span>{meta.type}</span>
              <span style={{ color: 'var(--fg-faint)' }}>&middot;</span>
              <span>{meta.stack}</span>
              <span style={{ color: 'var(--fg-faint)' }}>&middot;</span>
              <span>{meta.year}</span>
            </div>
          </FadeIn>
        )}

        {/* Hero screenshot — same block, no separate scroll stop */}
        {caseStudy.heroImage && (
          <FadeIn delay={300}>
            <div style={{ marginTop: 'var(--sp-12)' }}>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16 / 10',
                  border: '1px solid var(--line)',
                  overflow: 'hidden',
                  position: 'relative',
                  background: 'var(--ink-1)',
                }}
              >
                <Image
                  src={caseStudy.heroImage}
                  alt={caseStudy.title}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                  sizes="100vw"
                  priority
                />
              </div>
              {caseStudy.heroCaption && (
                <p
                  className="body-sm"
                  style={{
                    color: 'var(--fg-faint)',
                    marginTop: 'var(--sp-3)',
                    maxWidth: '80ch',
                    lineHeight: 1.6,
                  }}
                >
                  {caseStudy.heroCaption}
                </p>
              )}
            </div>
          </FadeIn>
        )}
      </section>

      {/* ── 3. The story — one paragraph, no essay ── */}
      {caseStudy.story && (
        <section
          style={{
            borderTop: '1px solid var(--line)',
            padding: 'var(--sp-20) 0',
          }}
        >
          <div className="container">
            <FadeIn>
              <span className="mono" style={{ color: 'var(--accent)', display: 'block', marginBottom: 'var(--sp-6)' }}>
                THE STORY
              </span>
              <p
                style={{
                  fontFamily: 'var(--f-body)',
                  fontSize: 'clamp(17px, 1.4vw, 19px)',
                  fontWeight: 450,
                  lineHeight: 1.75,
                  color: 'var(--fg)',
                  maxWidth: '68ch',
                }}
              >
                {caseStudy.story}
              </p>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── 4. Proof grid — screenshots ARE the content ── */}
      {caseStudy.proofGrid && caseStudy.proofGrid.length > 0 && (
        <section
          style={{
            borderTop: '1px solid var(--line)',
            padding: 'var(--sp-20) 0',
          }}
        >
          <div className="container">
            <FadeIn>
              <span className="mono" style={{ color: 'var(--accent)', display: 'block', marginBottom: 'var(--sp-3)' }}>
                THE SYSTEM, ON SCREEN
              </span>
              {caseStudy.proofDisclosure && (
                <p
                  className="body-sm"
                  style={{
                    fontFamily: 'var(--f-serif)',
                    fontStyle: 'italic',
                    color: 'var(--fg-dim)',
                    marginBottom: 'var(--sp-8)',
                    maxWidth: '70ch',
                  }}
                >
                  {caseStudy.proofDisclosure}
                </p>
              )}
            </FadeIn>

            <div
              className="proof-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--sp-8)',
                marginTop: caseStudy.proofDisclosure ? 0 : 'var(--sp-6)',
              }}
            >
              {caseStudy.proofGrid.map((tile, i) => (
                <FadeIn key={tile.src} delay={i * 100}>
                  <a
                    href={tile.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    style={{ display: 'block', textDecoration: 'none' }}
                    aria-label={`${tile.alt} — open full size`}
                  >
                    <div
                      style={{
                        width: '100%',
                        aspectRatio: '3 / 2',
                        border: '1px solid var(--line)',
                        overflow: 'hidden',
                        position: 'relative',
                        background: 'var(--ink-1)',
                        transition: 'border-color 0.4s var(--ease-out)',
                      }}
                      className="group-hover:border-(--line-strong)"
                    >
                      <Image
                        src={tile.src}
                        alt={tile.alt}
                        fill
                        className="transition-transform duration-700 group-hover:scale-[1.015]"
                        style={{ objectFit: 'cover', objectPosition: 'top left' }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <p
                      className="body-sm"
                      style={{
                        color: 'var(--fg-dim)',
                        marginTop: 'var(--sp-3)',
                        lineHeight: 1.6,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'var(--sp-2)',
                      }}
                    >
                      <ArrowUpRight
                        className="shrink-0 opacity-40 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ width: 14, height: 14, marginTop: 3, color: 'var(--accent-2)' }}
                      />
                      {tile.caption}
                    </p>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>

          <style jsx>{`
            @media (max-width: 768px) {
              :global(.proof-grid) {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </section>
      )}

      {/* ── 5. What's actually under it — facts, not narrative ── */}
      {caseStudy.underIt && caseStudy.underIt.length > 0 && (
        <section
          style={{
            borderTop: '1px solid var(--line)',
            padding: 'var(--sp-20) 0',
          }}
        >
          <div className="container">
            <FadeIn>
              <span className="mono" style={{ color: 'var(--accent)', display: 'block', marginBottom: 'var(--sp-8)' }}>
                WHAT&apos;S ACTUALLY UNDER IT
              </span>
            </FadeIn>
            <ul style={{ display: 'flex', flexDirection: 'column', maxWidth: '82ch' }}>
              {caseStudy.underIt.map((point, i) => (
                <FadeIn key={i} delay={i * 60}>
                  <li
                    className="body"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--sp-4)',
                      color: 'var(--fg-dim)',
                      lineHeight: 1.65,
                      padding: 'var(--sp-4) 0',
                      borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        opacity: 0.7,
                        flexShrink: 0,
                        marginTop: 9,
                      }}
                    />
                    {point}
                  </li>
                </FadeIn>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── 6. Status + price + CTA — one closing block ── */}
      {caseStudy.closing && (
        <section
          style={{
            borderTop: '1px solid var(--line)',
            padding: 'var(--sp-24) 0',
          }}
        >
          <div className="container">
            <FadeIn>
              <p
                className="body"
                style={{
                  color: 'var(--fg-dim)',
                  lineHeight: 1.7,
                  maxWidth: '68ch',
                }}
              >
                {caseStudy.closing.body}
              </p>
              {caseStudy.closing.priceLine && (
                <p
                  style={{
                    fontFamily: 'var(--f-serif)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(20px, 2.4vw, 28px)',
                    color: 'var(--fg)',
                    marginTop: 'var(--sp-8)',
                  }}
                >
                  {caseStudy.closing.priceLine}
                </p>
              )}
              <div style={{ marginTop: 'var(--sp-10)' }}>
                <Link href={caseStudy.closing.ctaHref} className="btn">
                  {caseStudy.closing.ctaLabel}
                  <ArrowRight style={{ width: 15, height: 15, marginLeft: 8, display: 'inline' }} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      <PrevNextNav nextProject={nextProject} prevProject={prevProject} />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Prev / next — shared by both formats
   ──────────────────────────────────────────────────────────── */
function PrevNextNav({
  nextProject,
  prevProject,
}: {
  nextProject: { title: string; slug: string };
  prevProject: { title: string; slug: string } | null;
}) {
  return (
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
  );
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
  // Find matching project data for stats/tone (legacy format)
  const project = caseStudy
    ? projects.find((p) => p.slug === caseStudy.slug)
    : null;

  if (!caseStudy) {
    return (
      <section className="container" style={{ padding: '200px 0', textAlign: 'center' }}>
        <h1 className="display-lg" style={{ color: 'var(--fg)' }}>Project not found</h1>
        <Link href="/work" className="body" style={{ color: 'var(--accent)', marginTop: 'var(--sp-6)', display: 'inline-block' }}>
          Back to Work
        </Link>
      </section>
    );
  }

  // Proof format: story present → 6-section screenshot-led layout
  if (caseStudy.story) {
    const meta =
      caseStudy.meta ??
      (project ? { type: project.type, stack: project.stack, year: project.year } : null);
    return (
      <ProofCaseStudy
        caseStudy={caseStudy}
        meta={meta}
        nextProject={nextProject}
        prevProject={prevProject}
      />
    );
  }

  const challengeParas = toParagraphs(caseStudy.challenge);
  const solutionParas = toParagraphs(caseStudy.solution);
  const tone = project?.tone || 'violet';
  const gradient = toneGradients[tone] || toneGradients.violet;
  const results = caseStudy.results ?? [];

  return (
    <div className="flex w-full flex-col overflow-x-hidden">

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
                <StatusChip caseStudy={caseStudy} />
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
          {results.length > 0 && (
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
                    gridTemplateColumns: `repeat(${Math.min(results.length, 4)}, 1fr)`,
                    gap: 'var(--sp-4)',
                  }}
                >
                  {results.map((r, i) => (
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

          <PrevNextNav nextProject={nextProject} prevProject={prevProject} />

    </div>
  );
}
