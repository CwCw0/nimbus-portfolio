import type { Metadata } from 'next';
import ContactPageContent from './ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact — Start a Project',
  description:
    'Have a project in mind? Web design, branding, AI tools. Based in Kuala Lumpur, working worldwide. Get in touch within 24 hours.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Nimbus — Start a Project',
    description: "Have a project in mind? Tell me what you need. I'll tell you how I'd build it.",
    url: '/contact',
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
