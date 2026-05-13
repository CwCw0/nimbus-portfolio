import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact — Start a Project | Nimbus Forma Studio Malaysia",
  description: "Have a project in mind? Web design, branding, AI tools — based in KL, Malaysia, working worldwide. Get in touch and I'll respond within 24 hours.",
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
