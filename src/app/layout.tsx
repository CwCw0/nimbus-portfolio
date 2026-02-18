import type { Metadata } from "next";
import { Inter, Space_Grotesk, Poppins, DM_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Nimbus — Creative Studio | Websites, Branding & AI Tools",
    template: "%s | Nimbus",
  },
  description:
    "Nimbus is a creative studio specializing in websites, branding, UI/UX, SEO and AI-powered tools for freelancers, startups and growing businesses.",
  keywords: ["web development", "branding", "UI/UX design", "SEO", "AI tools", "creative studio", "freelance developer"],
  authors: [{ name: "Nimbus" }],
  creator: "Nimbus",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Nimbus",
    title: "Nimbus — Creative Studio | Websites, Branding & AI Tools",
    description:
      "Nimbus is a creative studio specializing in websites, branding, UI/UX, SEO and AI-powered tools for freelancers, startups and growing businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nimbus — Creative Studio",
    description:
      "Websites, branding, UI/UX, SEO and AI-powered tools for freelancers, startups and growing businesses.",
  },
  robots: {
    index: true,
    follow: true,
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
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${poppins.variable} ${dmMono.variable} h-full antialiased`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#0A0A0B]">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
