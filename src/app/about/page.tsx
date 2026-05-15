import type { Metadata } from 'next';
import AboutPageContent from './AboutPageContent';

export const metadata: Metadata = {
  title: 'About — The Builder Behind Nimbus',
  description:
    'Founder of Nimbus Forma Studio in KL, Malaysia. Not just code — I build websites, branding, and AI tools for clients, and ship my own products.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Nimbus — The Builder Behind the Studio',
    description:
      'Building real software across healthtech, productivity, and gaming. Code, design, systems, business.',
    url: '/about',
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
