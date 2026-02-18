import { getCaseStudyBySlug, getNextProject, allCaseStudies } from "../../../data/caseStudies";
import CaseStudyContent from "./CaseStudyContent";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return allCaseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: "Project Not Found" };
  return {
    title: study.shortTitle,
    description: study.heroDesc,
    openGraph: {
      title: study.title,
      description: study.heroDesc,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  const nextProject = getNextProject(slug);

  if (!caseStudy) {
    return <CaseStudyContent caseStudy={null} nextProject={{ title: "Omnifood", slug: "omnifood" }} />;
  }

  return <CaseStudyContent caseStudy={caseStudy} nextProject={nextProject} />;
}
