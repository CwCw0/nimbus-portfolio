import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description: "Web design & development, brand identity, and AI tools & automation. End-to-end digital solutions with no agency overhead.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
