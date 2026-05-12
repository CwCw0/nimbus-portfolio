import type { Metadata } from "next";
import { Instrument_Serif, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import PageLoader from "../components/PageLoader";
import ScrollProgress from "../components/ScrollProgress";
import GrainOverlay from "../components/GrainOverlay";
import TabTitle from "../components/TabTitle";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nimbusformastudio.com";

export const metadata: Metadata = {
  title: {
    default: "Nimbus Forma Studio — Built with intention.",
    template: "%s | Nimbus Forma Studio",
  },
  description:
    "Nimbus Forma Studio is a creative studio specializing in websites, branding, UI/UX, SEO and AI-powered tools for freelancers, startups and growing businesses. Built with intention.",
  keywords: ["web design Malaysia", "freelance web developer KL", "website designer Kuala Lumpur", "Next.js developer Malaysia", "branding agency Malaysia", "UI/UX design", "AI tools", "web development", "React developer", "creative studio Malaysia", "Nimbus Forma Studio"],
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
    title: "Nimbus Forma Studio — Built with intention.",
    description:
      "Nimbus Forma Studio is a creative studio specializing in websites, branding, UI/UX, SEO and AI-powered tools for freelancers, startups and growing businesses. Built with intention.",
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
    title: "Nimbus Forma Studio",
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

        {/* Google Search Console verification — replace content value after setup */}
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
                  knowsAbout: ["Web Development", "UI/UX Design", "Brand Identity", "AI Tools", "Next.js", "React", "TypeScript", "Tailwind CSS"],
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
                  telephone: "+60128890318",
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
                  serviceType: ["Web Design", "Web Development", "Brand Identity", "UI/UX Design", "AI Tools & Automation", "SEO", "Branding"],
                  founder: { "@id": `${siteUrl}/#person` },
                  sameAs: ["https://github.com/CwCw0"],
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${instrumentSerif.variable} ${outfit.variable} h-full antialiased font-body`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white">
          Skip to content
        </a>
        <PageLoader />
        <ScrollProgress />
        <GrainOverlay />
        <TabTitle />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
