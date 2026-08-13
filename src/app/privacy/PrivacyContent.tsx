"use client";

import Link from "next/link";
import RevealLine from "@/components/ui/RevealLine";
import FadeIn from "@/components/ui/FadeIn";

const LAST_UPDATED = "25 May 2026";

const sections = [
  {
    id: "who-we-are",
    title: "1. Who We Are",
    content: (
      <>
        <p>
          Nimbus Forma Studio (SSM 202603095969) is a registered sole
          proprietorship based in Kuala Lumpur, Malaysia, providing web design,
          development, branding, and digital system services.
        </p>
        <p>
          For any enquiries regarding this policy or your personal data, contact
          us at{" "}
          <a href="mailto:heyitsnimbus@gmail.com" className="link-underline">
            heyitsnimbus@gmail.com
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "data-we-collect",
    title: "2. Data We Collect",
    content: (
      <>
        <p>We collect personal data only when you voluntarily provide it:</p>

        <h4>Contact Form</h4>
        <p>
          When you submit an enquiry through our contact form, we collect your
          name, email address, project type, budget range, and project details.
          This data is transmitted to and stored by{" "}
          <a
            href="https://formspree.io"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            Formspree
          </a>
          , our form processing service, and forwarded to our email for
          response.
        </p>

        <h4>Product Waitlist</h4>
        <p>
          When you join a product waitlist, we collect your email address and
          associate it with the product you expressed interest in. This data is
          processed through Formspree under the same conditions as the contact
          form.
        </p>

      </>
    ),
  },
  {
    id: "automatically-collected",
    title: "3. Automatically Collected Information",
    content: (
      <>
        <h4>Analytics</h4>
        <p>
          We use{" "}
          <a
            href="https://vercel.com/docs/analytics"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            Vercel Web Analytics
          </a>{" "}
          to understand how visitors use our site. This service collects
          aggregated, anonymised data including page views, referral sources,
          browser type, device type, and approximate geographic location
          (country level). Vercel Analytics does not use cookies and does not
          track individual users across sessions.
        </p>

        <h4>Font Delivery</h4>
        <p>
          We load typefaces from{" "}
          <a
            href="https://www.fontshare.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            Fontshare
          </a>{" "}
          and Google Fonts. When your browser requests these fonts, your IP
          address and browser information are transmitted to these services as
          part of standard HTTP requests. No additional tracking occurs through
          these services.
        </p>

        <h4>Local Storage</h4>
        <p>
          We store non-personal preferences on your device using your
          browser&apos;s localStorage:
        </p>
        <ul>
          <li>
            <strong>Theme preference</strong> — whether you selected light or
            dark mode
          </li>
          <li>
            <strong>Currency preference</strong> — MYR or USD for product
            pricing
          </li>
          <li>
            <strong>Intro animation state</strong> — whether the page intro has
            been shown
          </li>
        </ul>
        <p>
          This data never leaves your device, contains no personally
          identifiable information, and can be cleared at any time through your
          browser settings.
        </p>
      </>
    ),
  },
  {
    id: "purpose",
    title: "4. Purpose of Data Processing",
    content: (
      <>
        <p>
          In accordance with the Notice and Choice Principle under the PDPA, we
          process your personal data for the following purposes:
        </p>
        <ul>
          <li>To respond to your enquiries and project requests</li>
          <li>
            To notify you about product launches you have expressed interest in
          </li>
          <li>
            To improve our website performance and user experience through
            anonymised analytics
          </li>
          <li>To deliver content and services you have requested</li>
        </ul>
        <p>
          We do not use your data for marketing purposes unless you have
          explicitly opted in. We do not sell, rent, or trade your personal data
          to any third party.
        </p>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "5. Third-Party Data Sharing",
    content: (
      <>
        <p>
          We <strong>never sell</strong> your personal data. We only share your
          information with trusted third parties where necessary to operate this
          website:
        </p>
        <ul>
          <li>
            <strong>Form processing service</strong> — to receive and deliver
            your contact enquiries and waitlist signups to us
          </li>
          <li>
            <strong>Website hosting &amp; analytics</strong> — to serve this
            website and collect anonymised, aggregated performance data
          </li>
        </ul>
        <p>
          Some of these services may process your data outside of Malaysia. We
          have assessed each provider and believe they maintain adequate
          safeguards for the protection of your data in accordance with the
          PDPA.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "6. Data Retention",
    content: (
      <>
        <p>
          Contact form submissions and waitlist signups are retained for as long
          as necessary to fulfil the purpose for which they were collected:
        </p>
        <ul>
          <li>
            <strong>Contact enquiries</strong> — retained until the enquiry is
            resolved or for up to 24 months, whichever is sooner
          </li>
          <li>
            <strong>Waitlist signups</strong> — retained until the product
            launches and you are notified, or until you request removal
          </li>
          <li>
            <strong>Analytics data</strong> — aggregated and anonymised; no
            individual-level data is retained
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    title: "7. Security Measures",
    content: (
      <p>
        We implement appropriate technical measures to protect your data,
        including HTTPS encryption for all data in transit, Content Security
        Policy headers, strict transport security (HSTS), frame protection, XSS
        protection, and restricted permissions for browser APIs. Our hosting
        provider (Vercel) maintains SOC 2 Type II compliance. However, no method
        of electronic transmission or storage is completely secure, and we cannot
        guarantee absolute security.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "8. Your Rights Under the PDPA",
    content: (
      <>
        <p>
          Under the Malaysia Personal Data Protection Act 2010 and its 2024
          amendments, you have the right to:
        </p>
        <ul>
          <li>
            <strong>Access</strong> — request a copy of the personal data we
            hold about you
          </li>
          <li>
            <strong>Correction</strong> — request correction of inaccurate or
            incomplete data
          </li>
          <li>
            <strong>Withdrawal of consent</strong> — withdraw your consent for
            data processing at any time
          </li>
          <li>
            <strong>Deletion</strong> — request deletion of your personal data
            where it is no longer necessary for the purpose it was collected
          </li>
          <li>
            <strong>Data portability</strong> — request your data in a
            structured, commonly used format
          </li>
        </ul>
        <p>
          To exercise any of these rights, email us at{" "}
          <a href="mailto:heyitsnimbus@gmail.com" className="link-underline">
            heyitsnimbus@gmail.com
          </a>
          . We will respond to your request within 21 days as required by the
          PDPA.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "9. Children\u2019s Privacy",
    content: (
      <p>
        Our services are not directed at individuals under the age of 18. We do
        not knowingly collect personal data from children. If you believe a child
        has provided us with personal data, please contact us and we will
        promptly delete it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "10. Changes to This Policy",
    content: (
      <p>
        We may update this privacy policy from time to time to reflect changes
        in our practices or legal requirements. Any changes will be posted on
        this page with an updated revision date. We encourage you to review this
        policy periodically.
      </p>
    ),
  },
  {
    id: "contact",
    title: "11. Contact",
    content: (
      <>
        <p>
          If you have questions about this privacy policy or wish to exercise
          your data rights, contact:
        </p>
        <p>
          <strong>Nimbus Forma Studio</strong>
          <br />
          Kuala Lumpur, Malaysia
          <br />
          <a href="mailto:heyitsnimbus@gmail.com" className="link-underline">
            heyitsnimbus@gmail.com
          </a>
        </p>
      </>
    ),
  },
];

export default function PrivacyContent() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          padding: "clamp(120px, 16vw, 240px) 0 var(--sp-16)",
          background: "transparent",
        }}
      >
        <div className="container">
          <RevealLine>
            <h1 className="display-xl">Privacy Policy</h1>
          </RevealLine>
          <FadeIn delay={120}>
            <p
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: "var(--text-sm)",
                color: "var(--fg-dim)",
                marginTop: "var(--sp-4)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Last updated: {LAST_UPDATED}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Intro ── */}
      <section style={{ paddingBottom: "var(--sp-16)", background: "transparent" }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <FadeIn>
            <p
              style={{
                fontFamily: "var(--f-serif)",
                fontStyle: "italic",
                fontSize: "clamp(18px, 2.2vw, 24px)",
                lineHeight: 1.7,
                color: "var(--accent)",
              }}
            >
              Nimbus Forma Studio respects your privacy and is committed to
              protecting your personal data in accordance with the Malaysia
              Personal Data Protection Act 2010 (PDPA) and its 2024 amendments.
              This policy explains what data we collect, how we use it, and your
              rights.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Table of Contents ── */}
      <section style={{ paddingBottom: "var(--sp-16)", background: "transparent" }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <FadeIn>
            <nav
              aria-label="Policy sections"
              style={{
                border: "1px solid var(--line)",
                borderRadius: "var(--r-lg)",
                padding: "var(--sp-6)",
                background: "var(--glass-bg)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: "var(--text-xs)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--fg-dim)",
                  marginBottom: "var(--sp-4)",
                }}
              >
                Contents
              </p>
              <ol
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "var(--sp-2)",
                }}
              >
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="link-underline"
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--fg-dim)",
                      }}
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </FadeIn>
        </div>
      </section>

      {/* ── Sections ── */}
      <section
        style={{
          paddingBottom: "clamp(80px, 12vw, 160px)",
          background: "transparent",
        }}
      >
        <div className="container" style={{ maxWidth: 780 }}>
          {sections.map((s, i) => (
            <FadeIn key={s.id} delay={i < 3 ? i * 80 : 0}>
              <article
                id={s.id}
                className="privacy-section"
                style={{
                  marginBottom: "var(--sp-12)",
                  scrollMarginTop: 100,
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--f-display)",
                    fontSize: "clamp(20px, 2.5vw, 28px)",
                    fontWeight: 600,
                    marginBottom: "var(--sp-4)",
                    color: "var(--fg)",
                  }}
                >
                  {s.title}
                </h2>
                <div className="privacy-body">{s.content}</div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Back ── */}
      <section
        style={{
          paddingBottom: "var(--section-gap)",
          background: "transparent",
        }}
      >
        <div className="container" style={{ maxWidth: 780 }}>
          <FadeIn>
            <Link
              href="/"
              className="link-underline"
              style={{ color: "var(--fg-dim)" }}
            >
              &larr; Back to home
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
