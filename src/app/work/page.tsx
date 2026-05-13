import type { Metadata } from "next";
import { Suspense } from "react";
import WorkContent from "./WorkContent";

export const metadata: Metadata = {
  title: "Work — Projects & Case Studies | Web Design Malaysia",
  description: "Selected projects and case studies spanning web apps, SaaS platforms, health dashboards, productivity tools, and gaming communities. Built by Nimbus Forma Studio in KL, Malaysia.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Nimbus Work — Projects & Case Studies",
    description: "Case studies spanning web apps, SaaS platforms, health dashboards, productivity tools, and gaming communities.",
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <Suspense>
      <WorkContent />
    </Suspense>
  );
}
