import type { Metadata } from "next";
import ChangelogPageContent from "./ChangelogPageContent";

export const metadata: Metadata = {
  title: "Dev Log — What\u2019s New",
  description:
    "Patch notes, feature updates, and bug fixes across all Nimbus Forma Studio products. See what\u2019s shipping.",
  alternates: { canonical: "/changelog" },
  openGraph: {
    title: "Dev Log — Nimbus Forma Studio",
    description:
      "Live development updates for Forge, Koji, and every product in the Vault.",
    url: "/changelog",
  },
};

export default function ChangelogPage() {
  return <ChangelogPageContent />;
}
