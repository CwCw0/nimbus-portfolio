import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services — Web Design, Branding & AI Tools",
  description: "Web design & development from $2,500, brand identity from $2,000, and custom AI tools from $5,000. End-to-end digital solutions with no agency overhead.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Nimbus Services — Web Design, Branding & AI Tools",
    description: "End-to-end digital solutions: web design, brand identity, and AI tools. No agency overhead, transparent pricing.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
