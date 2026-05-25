import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { changelog } from "@/data/changelog";
import ChangelogDetailContent from "./ChangelogDetailContent";

export function generateStaticParams() {
  return changelog.map((entry) => ({ slug: entry.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const entry = changelog.find((e) => e.slug === params.slug);
  if (!entry) return {};
  return {
    title: `${entry.product} ${entry.version} — ${entry.title}`,
    description: entry.summary,
    alternates: { canonical: `/changelog/${entry.slug}` },
    openGraph: {
      title: `${entry.product} ${entry.version} — ${entry.title}`,
      description: entry.summary,
      url: `/changelog/${entry.slug}`,
    },
  };
}

export default function ChangelogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const entry = changelog.find((e) => e.slug === params.slug);
  if (!entry) notFound();
  return <ChangelogDetailContent entry={entry} />;
}
