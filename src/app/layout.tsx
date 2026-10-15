import type { Metadata } from "next";
import { Wix_Madefor_Text } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import ClientShell from "@/components/ClientShell";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const madefor = Wix_Madefor_Text({
  variable: "--font-madefor",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nimbusformastudio.com";

export const metadata: Metadata = {
  title: {
    default: "nmbs. — Nimbus Forma Studio",
    template: "%s | nmbs.",
  },
  description:
    "I make businesses run smoother — custom operations systems, internal dashboards, workflow automation, and AI assistants trained on your own data. Custom-coded by Nimbus Forma Studio, Kuala Lumpur. Built with intention.",
  keywords: ["internal ops dashboard", "AI knowledge assistant", "AI workflow automation", "business system builder Malaysia", "custom dashboard developer", "Next.js developer Malaysia", "freelance web developer KL", "web development", "AI integration", "Nimbus Forma Studio"],
  authors: [{ name: "Nimbus Forma Studio" }],
  creator: "Nimbus Forma Studio",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: siteUrl,
    siteName: "Nimbus Forma Studio",
    title: "nmbs. — Nimbus Forma Studio",
    description:
      "I make businesses run smoother — custom operations systems, internal dashboards, workflow automation, and AI assistants trained on your own data. Custom-coded by Nimbus Forma Studio, Kuala Lumpur. Built with intention.",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Nimbus Forma Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "nmbs. — Nimbus Forma Studio",
    description:
      "Websites, branding, UI/UX, SEO and AI-powered tools for freelancers, startups and growing businesses. Built with intention.",
    images: [`${siteUrl}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />

        {/* Geo targeting — Malaysia primary, global reach */}
        <meta name="geo.region" content="MY" />
        <meta name="geo.placename" content="Kuala Lumpur" />
        <meta name="geo.position" content="3.1390;101.6869" />
        <meta name="ICBM" content="3.1390, 101.6869" />

        {/* Language targeting */}
        <link rel="alternate" hrefLang="en" href={siteUrl} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />

        {/* Google Search Console verification */}
        {process.env.NEXT_PUBLIC_GSC_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GSC_VERIFICATION} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": `${siteUrl}/#person`,
                  name: "Nimbus Forma Studio",
                  url: siteUrl,
                  email: "heyitsnimbus@gmail.com",
                  sameAs: ["https://github.com/CwCw0"],
                  jobTitle: "Founder, Nimbus Forma Studio",
                  knowsAbout: ["Internal Ops Dashboards", "AI Knowledge Assistants", "AI Workflow Automation", "Web Development", "Next.js", "React", "TypeScript", "Supabase"],
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: "Nimbus Forma Studio",
                  description: "Creative studio specializing in websites, branding, UI/UX, SEO and AI-powered tools. Built with intention.",
                  publisher: { "@id": `${siteUrl}/#person` },
                },
                {
                  "@type": "ProfessionalService",
                  "@id": `${siteUrl}/#business`,
                  name: "Nimbus Forma Studio",
                  description: "Creative studio specializing in websites, branding, UI/UX, SEO and AI-powered tools for freelancers, startups and growing businesses. Built with intention.",
                  url: siteUrl,
                  email: "heyitsnimbus@gmail.com",
                  priceRange: "$$",
                  areaServed: [
                    { "@type": "Country", name: "Malaysia" },
                    { "@type": "Place", name: "Worldwide" },
                  ],
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Kuala Lumpur",
                    addressCountry: "MY",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 3.1390,
                    longitude: 101.6869,
                  },
                  serviceType: ["Internal Ops Dashboard", "AI Knowledge Assistant", "AI Workflow Automation", "Web Development"],
                  founder: { "@id": `${siteUrl}/#person` },
                  sameAs: ["https://github.com/CwCw0"],
                },
              ],
            }),
          }}
        />
      </head>
      <body
        data-theme="dark"
        data-strings="on"
        data-grain="true"
        className={`${madefor.variable} h-full antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-999 focus:bg-(--accent) focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:rounded-sm"
        >
          Skip to content
        </a>

        <ClientShell>
          <Nav />
          <main id="main-content" style={{ position: 'relative', zIndex: 1 }}>
            {children}
          </main>
          <Footer />
        </ClientShell>
        <Analytics />
      </body>
    </html>
  );
}
