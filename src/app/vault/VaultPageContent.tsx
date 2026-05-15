'use client';

import Link from 'next/link';
import Image from 'next/image';
import RevealLine from '@/components/ui/RevealLine';
import FadeIn from '@/components/ui/FadeIn';
import Magnetic from '@/components/ui/Magnetic';
import { vaultProducts } from '@/data/vault';

const toneGradients: Record<string, string> = {
  violet: 'linear-gradient(135deg, rgba(124, 92, 252, 0.15), rgba(42, 26, 85, 0.08))',
  deep: 'linear-gradient(135deg, rgba(90, 63, 204, 0.15), rgba(26, 18, 51, 0.08))',
  ember: 'linear-gradient(135deg, rgba(252, 140, 92, 0.12), rgba(85, 42, 26, 0.08))',
};

const statusColors: Record<string, string> = {
  live: 'var(--accent)',
  beta: 'var(--accent-2)',
  alpha: 'var(--fg-dim)',
  dev: 'var(--fg-dim)',
  'coming-soon': 'var(--fg-faint)',
};

function isInternalTool(slug: string): boolean {
  return slug === 'forge';
}

export default function VaultPageContent() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          padding: 'clamp(120px, 16vw, 240px) 0 var(--section-gap)',
          background: 'transparent',
        }}
      >
        <div className="container">
          <RevealLine>
            <h1 className="display-xl">Things I&apos;m building.</h1>
          </RevealLine>
          <FadeIn delay={200}>
            <p
              style={{
                color: 'var(--fg-dim)',
                maxWidth: 640,
                marginTop: 'var(--sp-8)',
                lineHeight: 1.7,
              }}
            >
              Nimbus ships products, not just services. Each product below is
              something I designed, built, and maintain. Each one solves a real
              problem I care about.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Product Showcases ── */}
      {vaultProducts.map((product, i) => {
        const isEven = i % 2 === 1;
        const isComingSoon = product.statusColor === 'coming-soon';
        const isInternal = isInternalTool(product.slug);
        const tier = isInternal ? 'internal' : isComingSoon ? 'coming-soon' : 'live';

        return (
          <section
            key={product.slug}
            style={{
              padding: 'var(--section-gap) 0',
              background: 'transparent',
              opacity: isComingSoon ? 0.72 : 1,
              transition: 'opacity 0.3s ease',
            }}
          >
            <div className="container">
              <FadeIn>
                <div
                  className="vault-product-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'var(--sp-12)',
                    alignItems: 'center',
                  }}
                >
                  {/* Mockup area */}
                  <div
                    style={{
                      aspectRatio: '16/9',
                      borderRadius: 'var(--r-lg)',
                      background: toneGradients[product.tone] || toneGradients.violet,
                      border: `1px solid ${isComingSoon ? 'var(--line)' : 'var(--line)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      order: isEven ? 2 : 1,
                      position: 'relative',
                      overflow: 'hidden',
                      filter: isComingSoon ? 'grayscale(0.3)' : 'none',
                    }}
                  >
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={`${product.name} — ${product.kind}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 900px) 100vw, 50vw"
                      />
                    ) : (
                      <span
                        className="mono"
                        style={{ color: 'var(--fg-faint)', fontSize: 10, letterSpacing: '0.15em' }}
                      >
                        {isComingSoon ? 'COMING SOON' : isInternal ? 'INTERNAL' : 'PREVIEW'}
                      </span>
                    )}

                    {/* Coming Soon overlay badge on mockup */}
                    {isComingSoon && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(10, 10, 15, 0.45)',
                          backdropFilter: 'blur(2px)',
                        }}
                      >
                        <span
                          className="mono"
                          style={{
                            padding: '8px 20px',
                            borderRadius: 'var(--r-pill)',
                            border: '1px solid var(--line-strong)',
                            background: 'var(--glass-bg)',
                            color: 'var(--fg-dim)',
                            letterSpacing: '0.15em',
                            fontSize: 11,
                          }}
                        >
                          COMING SOON
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--sp-6)',
                      order: isEven ? 1 : 2,
                    }}
                  >
                    {/* Status badge row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: statusColors[product.statusColor] || 'var(--fg-dim)',
                          flexShrink: 0,
                        }}
                      />
                      <span className="mono" style={{ color: statusColors[product.statusColor] || 'var(--fg-dim)' }}>
                        {product.status}
                      </span>

                      {/* Extra badge for special tiers */}
                      {isComingSoon && (
                        <span
                          style={{
                            fontFamily: 'var(--f-mono)',
                            fontSize: 10,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            padding: '3px 10px',
                            borderRadius: 'var(--r-pill)',
                            border: '1px solid var(--line-strong)',
                            color: 'var(--fg-faint)',
                            background: 'var(--accent-soft)',
                          }}
                        >
                          Waitlist open
                        </span>
                      )}
                      {isInternal && (
                        <span
                          style={{
                            fontFamily: 'var(--f-mono)',
                            fontSize: 10,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            padding: '3px 10px',
                            borderRadius: 'var(--r-pill)',
                            border: '1px solid var(--line-strong)',
                            color: 'var(--fg-faint)',
                            background: 'rgba(124, 92, 252, 0.06)',
                          }}
                        >
                          Internal Tool
                        </span>
                      )}
                    </div>

                    {/* Kind */}
                    <span className="mono" style={{ color: 'var(--fg-faint)' }}>
                      {product.kind}
                    </span>

                    {/* Name */}
                    <h2 className="display-lg">{product.name}</h2>

                    {/* Description */}
                    <p style={{ color: 'var(--fg-dim)', lineHeight: 1.7 }}>
                      {product.description}
                    </p>

                    {/* Features */}
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--sp-2)',
                      }}
                    >
                      {product.features.map((f) => (
                        <li
                          key={f}
                          style={{
                            color: 'var(--fg-dim)',
                            fontSize: 'var(--t-body-sm)',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 'var(--sp-3)',
                          }}
                        >
                          <span style={{ color: isComingSoon ? 'var(--fg-faint)' : 'var(--accent)', flexShrink: 0 }}>&rarr;</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech stack chips */}
                    <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
                      {product.stack.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontFamily: 'var(--f-mono)',
                            fontSize: 'var(--t-mono)',
                            letterSpacing: '0.08em',
                            padding: '4px 12px',
                            borderRadius: 'var(--r-pill)',
                            border: '1px solid var(--line-strong)',
                            color: 'var(--fg-dim)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA — differentiated by tier */}
                    <div style={{ display: 'flex', gap: 'var(--sp-3)', marginTop: 'var(--sp-4)', flexWrap: 'wrap' }}>
                      {tier === 'live' && product.links.map((link) => (
                        <Magnetic key={link.label}>
                          {link.external ? (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn"
                            >
                              {link.label} <span aria-hidden="true">↗</span>
                            </a>
                          ) : (
                            <Link href={`/vault/${product.slug}`} className="btn ghost">
                              {link.label}
                            </Link>
                          )}
                        </Magnetic>
                      ))}

                      {tier === 'coming-soon' && (
                        <Link
                          href="/contact"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 'var(--sp-2)',
                            padding: '14px 32px',
                            borderRadius: 'var(--r-pill)',
                            border: '1.5px solid var(--accent)',
                            color: 'var(--accent)',
                            fontFamily: 'var(--f-body)',
                            fontSize: 'var(--t-body-sm)',
                            fontWeight: 500,
                            textDecoration: 'none',
                            transition: 'background 0.3s var(--ease-out), color 0.3s var(--ease-out)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--accent)';
                            e.currentTarget.style.color = 'var(--ink-0)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--accent)';
                          }}
                        >
                          Get Notified <span aria-hidden="true">↗</span>
                        </Link>
                      )}

                      {tier === 'internal' && (
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 'var(--sp-2)',
                            padding: '14px 32px',
                            borderRadius: 'var(--r-pill)',
                            border: '1.5px solid var(--line)',
                            color: 'var(--fg-faint)',
                            fontFamily: 'var(--f-body)',
                            fontSize: 'var(--t-body-sm)',
                            fontWeight: 500,
                            background: 'var(--accent-soft)',
                          }}
                        >
                          Internal use only
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <style jsx>{`
              @media (max-width: 900px) {
                .vault-product-row {
                  grid-template-columns: 1fr !important;
                }
                .vault-product-row > * {
                  order: unset !important;
                }
              }
            `}</style>
          </section>
        );
      })}

      {/* ── Bottom CTA ── */}
      <section style={{ padding: 'var(--section-gap) 0', background: 'transparent' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <FadeIn>
            <RevealLine>
              <h2 className="display-lg">Have a product idea?</h2>
            </RevealLine>
            <p
              style={{
                color: 'var(--fg-dim)',
                marginTop: 'var(--sp-6)',
                marginBottom: 'var(--sp-10)',
                maxWidth: 480,
                marginInline: 'auto',
                lineHeight: 1.7,
              }}
            >
              Let&apos;s build it together.
            </p>
            <Magnetic>
              <Link href="/contact" className="btn">
                Start a conversation &rarr;
              </Link>
            </Magnetic>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
