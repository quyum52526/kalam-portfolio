import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { workCategories, getCategoryBySlug } from "@/data/categories";
import { projects } from "@/data/projects";
import { WorkTabs } from "@/components/WorkTabs";
import { MotionVideoGrid } from "@/components/MotionVideoGrid";

type Params = { category: string };

export function generateStaticParams() {
  return workCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.label,
    description: category.description,
    openGraph: {
      title: `Abu Kalam — ${category.label}`,
      description: category.description,
    },
  };
}

export default async function WorkCategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryProjects = projects.filter(
    (project) => project.category === category.projectCategory
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <WorkTabs activeSlug={category.slug} />

      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {category.label}
      </h1>
      <p className="mt-3 max-w-2xl text-muted">{category.description}</p>

      <div className="mt-12">
        <MotionVideoGrid projects={categoryProjects} />
      </div>
    </section>
  );
}
