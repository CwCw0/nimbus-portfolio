'use client';

import Link from 'next/link';
import Image from 'next/image';
import RevealLine from '@/components/ui/RevealLine';
import FadeIn from '@/components/ui/FadeIn';
import Magnetic from '@/components/ui/Magnetic';
import type { VaultProduct } from '@/data/vault';

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

interface Props {
  product: VaultProduct;
  others: VaultProduct[];
}

export default function ProductShowcase({ product, others }: Props) {
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
          {/* Back link */}
          <FadeIn>
            <Link
              href="/vault"
              className="link-underline"
              style={{
                color: 'var(--fg-dim)',
                fontSize: 'var(--t-body-sm)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--sp-2)',
                marginBottom: 'var(--sp-10)',
              }}
            >
              &larr; Back to Vault
            </Link>
          </FadeIn>

          {/* Kind + Status */}
          <FadeIn delay={100}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--sp-4)',
                marginBottom: 'var(--sp-6)',
              }}
            >
              <span className="mono" style={{ color: 'var(--fg-faint)' }}>
                {product.kind}
              </span>
              <span
                style={{
                  width: 1,
                  height: 14,
                  background: 'var(--line-strong)',
                }}
              />
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--sp-2)',
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: statusColors[product.statusColor] || 'var(--fg-dim)',
                  }}
                />
                <span
                  className="mono"
                  style={{
                    color: statusColors[product.statusColor] || 'var(--fg-dim)',
                  }}
                >
                  {product.status}
                </span>
              </span>
            </div>
          </FadeIn>

          {/* Product name */}
          <RevealLine>
            <h1 className="display-xxl">{product.name}</h1>
          </RevealLine>
        </div>
      </section>

      {/* ── Mockup ── */}
      <section style={{ paddingBottom: 'var(--section-gap)', background: 'transparent' }}>
        <div className="container">
          <FadeIn>
            <div
              style={{
                aspectRatio: '16/9',
                borderRadius: 'var(--r-lg)',
                background: toneGradients[product.tone] || toneGradients.violet,
                border: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {product.image ? (
                <Image
                  src={product.image}
                  alt={`${product.name} — ${product.kind}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="100vw"
                />
              ) : (
                <span
                  className="mono"
                  style={{ color: 'var(--fg-faint)', fontSize: 10, letterSpacing: '0.15em' }}
                >
                  COMING SOON
                </span>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Description + Features ── */}
      <section style={{ paddingBottom: 'var(--section-gap)', background: 'transparent' }}>
        <div className="container">
          <div
            className="product-detail-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--sp-16)',
              alignItems: 'start',
            }}
          >
            {/* Description */}
            <FadeIn>
              <div>
                <span
                  className="mono"
                  style={{
                    color: 'var(--fg-faint)',
                    display: 'block',
                    marginBottom: 'var(--sp-6)',
                  }}
                >
                  About
                </span>
                <p
                  style={{
                    color: 'var(--fg-dim)',
                    lineHeight: 1.8,
                    fontSize: 'var(--t-body)',
                  }}
                >
                  {product.description}
                </p>
              </div>
            </FadeIn>

            {/* Features grid */}
            <FadeIn delay={200}>
              <div>
                <span
                  className="mono"
                  style={{
                    color: 'var(--fg-faint)',
                    display: 'block',
                    marginBottom: 'var(--sp-6)',
                  }}
                >
                  Features
                </span>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'var(--sp-4)',
                  }}
                >
                  {product.features.map((f) => (
                    <div
                      key={f}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'var(--sp-3)',
                        color: 'var(--fg-dim)',
                        fontSize: 'var(--t-body-sm)',
                      }}
                    >
                      <span style={{ color: 'var(--accent)', flexShrink: 0 }}>&rarr;</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 900px) {
            .product-detail-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ── Tech Stack ── */}
      <section style={{ paddingBottom: 'var(--section-gap)', background: 'transparent' }}>
        <div className="container">
          <FadeIn>
            <span
              className="mono"
              style={{
                color: 'var(--fg-faint)',
                display: 'block',
                marginBottom: 'var(--sp-6)',
              }}
            >
              Tech Stack
            </span>
            <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
              {product.stack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: 'var(--t-mono)',
                    letterSpacing: '0.08em',
                    padding: '6px 16px',
                    borderRadius: 'var(--r-pill)',
                    border: '1px solid var(--line-strong)',
                    color: 'var(--fg-dim)',
                    textTransform: 'uppercase',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTAs ── */}
      <section style={{ paddingBottom: 'var(--section-gap)', background: 'transparent' }}>
        <div className="container">
          <FadeIn>
            <div style={{ display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap' }}>
              {product.links.map((link) => (
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
                    <Link href={link.href} className="btn ghost">
                      {link.label}
                    </Link>
                  )}
                </Magnetic>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Other Products ── */}
      <section
        style={{
          padding: 'var(--section-gap) 0',
          background: 'transparent',
          borderTop: '1px solid var(--line)',
        }}
      >
        <div className="container">
          <div className="section-head">
            <span className="section-index">More</span>
            <span className="section-label">Other products</span>
          </div>

          <div
            className="other-products-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${others.length}, 1fr)`,
              gap: 'var(--sp-8)',
            }}
          >
            {others.map((other) => (
              <FadeIn key={other.slug}>
                <Link
                  href={`/vault/${other.slug}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--sp-4)',
                    textDecoration: 'none',
                    color: 'var(--fg)',
                    borderTop: '1px solid var(--line)',
                    paddingTop: 'var(--sp-6)',
                    transition: 'transform 0.3s var(--ease-out)',
                  }}
                >
                  {/* Mini mockup */}
                  <div
                    style={{
                      aspectRatio: '16/9',
                      borderRadius: 'var(--r-md)',
                      background: toneGradients[other.tone] || toneGradients.violet,
                      border: '1px solid var(--line)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {other.image ? (
                      <Image
                        src={other.image}
                        alt={`${other.name} — ${other.kind}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 900px) 100vw, 25vw"
                      />
                    ) : (
                      <span
                        className="mono"
                        style={{ color: 'var(--fg-faint)', fontSize: 10, letterSpacing: '0.15em' }}
                      >
                        COMING SOON
                      </span>
                    )}
                  </div>

                  <span className="mono" style={{ color: 'var(--fg-faint)' }}>
                    {other.kind}
                  </span>
                  <span className="display-sm">{other.name}</span>
                  <p
                    style={{
                      color: 'var(--fg-dim)',
                      fontSize: 'var(--t-body-sm)',
                      lineHeight: 1.6,
                    }}
                  >
                    {other.tagline}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 900px) {
            .other-products-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}
