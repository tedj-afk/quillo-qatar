import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { CaseStudyView } from "@/app/components/case-study-view";
import { siteUrl } from "@/lib/site";

const suggestedProjects: Record<string, string> = {
  stackray: "helpmegrow",
  helpmegrow: "quillo",
  quillo: "stackray",
};

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {};
  }

  const title = `${project.name} Case Study | Shipped by Hippo`;
  const description = project.caseStudy.founderPain;
  const url = `/case-studies/${project.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${url}`,
      siteName: "Shipped by Hippo",
      type: "article",
      images: [{ url: "/og.png", width: 2400, height: 1260, type: "image/png", alt: "Shipped by Hippo — Great products deserve to be obvious." }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: "/og.png", alt: "Shipped by Hippo — Great products deserve to be obvious." }],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const suggestedIndex = projects.findIndex((item) => item.slug === suggestedProjects[slug]);
  const nextIndex = suggestedIndex === -1 ? (index + 1) % projects.length : suggestedIndex;
  return <CaseStudyView project={projects[index]} nextProject={projects[nextIndex]} nextIndex={nextIndex} projectCount={projects.length} />;
}
