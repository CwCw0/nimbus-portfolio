import type { Metadata } from "next";
import LabContent from "./LabContent";

export const metadata: Metadata = {
  title: "Lab — Design Experiments & Templates",
  description:
    "The Lab is where ideas take shape. Website designs, UI concepts, and ready-to-use templates by Nimbus Forma Studio.",
  alternates: { canonical: "/lab" },
  openGraph: {
    title: "Lab — Nimbus Forma Studio",
    description:
      "Design experiments, website templates, and visual concepts. The creative playground of Nimbus Forma Studio.",
    url: "/lab",
  },
};

export default function LabPage() {
  return <LabContent />;
}
