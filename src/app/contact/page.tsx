import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact — Start a Project",
  description: "Have a project in mind? Get in touch and I'll get back to you within 24 hours. Web design, branding, AI tools — let's build something.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Nimbus — Start a Project",
    description: "Have a project in mind? Get in touch and I'll respond within 24 hours.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
