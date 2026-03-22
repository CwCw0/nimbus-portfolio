import type { Metadata } from "next";
import { Instrument_Serif, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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
  weight: ["200", "300", "400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nimbus-studio-1.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Nimbus — Creative Studio | Websites, Branding & AI Tools",
    template: "%s | Nimbus",
  },
  description:
    "Nimbus is a creative studio specializing in websites, branding, UI/UX, SEO and AI-powered tools for freelancers, startups and growing businesses.",
  keywords: ["web development", "branding", "UI/UX design", "SEO", "AI tools", "creative studio", "freelance developer", "Next.js developer", "React developer", "web designer"],
  authors: [{ name: "Nimbus" }],
  creator: "Nimbus",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Nimbus",
    title: "Nimbus — Creative Studio | Websites, Branding & AI Tools",
    description:
      "Nimbus is a creative studio specializing in websites, branding, UI/UX, SEO and AI-powered tools for freelancers, startups and growing businesses.",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Nimbus — Creative Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nimbus — Creative Studio",
    description:
      "Websites, branding, UI/UX, SEO and AI-powered tools for freelancers, startups and growing businesses.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": `${siteUrl}/#person`,
                  name: "Nimbus",
                  url: siteUrl,
                  email: "heyitsnimbus@gmail.com",
                  sameAs: ["https://github.com/CwCw0"],
                  jobTitle: "Freelance Web Developer & Creative Studio Founder",
                  knowsAbout: ["Web Development", "UI/UX Design", "Brand Identity", "AI Tools", "Next.js", "React", "TypeScript", "Tailwind CSS"],
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: "Nimbus",
                  description: "Creative studio specializing in websites, branding, UI/UX, SEO and AI-powered tools",
                  publisher: { "@id": `${siteUrl}/#person` },
                },
                {
                  "@type": "ProfessionalService",
                  "@id": `${siteUrl}/#business`,
                  name: "Nimbus",
                  description: "Creative studio specializing in websites, branding, UI/UX, SEO and AI-powered tools for freelancers, startups and growing businesses.",
                  url: siteUrl,
                  email: "heyitsnimbus@gmail.com",
                  priceRange: "$$",
                  areaServed: "Worldwide",
                  serviceType: ["Web Design", "Web Development", "Brand Identity", "AI Tools & Automation", "SEO"],
                  founder: { "@id": `${siteUrl}/#person` },
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
