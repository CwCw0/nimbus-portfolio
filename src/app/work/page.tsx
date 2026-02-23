import type { Metadata } from "next";
import WorkContent from "./WorkContent";

export const metadata: Metadata = {
  title: "Work — Projects & Case Studies",
  description: "Selected projects and case studies spanning web apps, SaaS platforms, health dashboards, productivity tools, and gaming communities.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Nimbus Work — Projects & Case Studies",
    description: "Case studies spanning web apps, SaaS platforms, health dashboards, productivity tools, and gaming communities.",
    url: "/work",
  },
};

export default function WorkPage() {
  return <WorkContent />;
}
