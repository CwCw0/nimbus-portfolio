import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Have a project in mind? Get in touch and I'll get back to you within 24 hours. Web design, branding, AI tools, and more.",
};

export default function ContactPage() {
  return <ContactContent />;
}
