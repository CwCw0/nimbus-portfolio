import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { changelog } from "@/data/changelog";
import ChangelogDetailContent from "./ChangelogDetailContent";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return changelog.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = changelog.find((e) => e.slug === slug);
  if (!entry) return {};
  return {
    title: `${entry.product} ${entry.version} — ${entry.title}`,
    description: entry.summary,
    alternates: { canonical: `/changelog/${slug}` },
    openGraph: {
      title: `${entry.product} ${entry.version} — ${entry.title}`,
      description: entry.summary,
      url: `/changelog/${slug}`,
    },
  };
}

export default async function ChangelogDetailPage({ params }: Props) {
  const { slug } = await params;
  const entry = changelog.find((e) => e.slug === slug);
  if (!entry) notFound();
  return <ChangelogDetailContent entry={entry} />;
}
