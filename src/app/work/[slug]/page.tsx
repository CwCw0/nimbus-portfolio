import { getCaseStudyBySlug, getNextProject, allCaseStudies } from "../../../data/caseStudies";
import CaseStudyContent from "./CaseStudyContent";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nimbusformastudio.com";

export async function generateStaticParams() {
  return allCaseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) {
    return {
      title: "Project Not Found",
      description: "This case study could not be found.",
    };
  }

  const url = `${siteUrl}/work/${slug}`;
  const description = `${study.heroDesc} — A case study by Nimbus Forma Studio.`;

  return {
    title: `${study.shortTitle} — Case Study`,
    description,
    keywords: [...study.tags, "case study", "web design", "Nimbus Forma Studio"],
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "article",
      url,
      title: `${study.title} — Nimbus Forma Studio`,
      description,
      images: study.heroImage
        ? [{ url: `${siteUrl}${study.heroImage}`, width: 1200, height: 630, alt: study.title }]
        : [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: study.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} — Nimbus Forma Studio`,
      description,
      images: study.heroImage ? [`${siteUrl}${study.heroImage}`] : [`${siteUrl}/opengraph-image`],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  const nextProject = getNextProject(slug);

  if (!caseStudy) {
    return (
      <CaseStudyContent
        caseStudy={null}
        nextProject={{ title: "Omnifood", slug: "omnifood" }}
      />
    );
  }

  return <CaseStudyContent caseStudy={caseStudy} nextProject={nextProject} />;
}
