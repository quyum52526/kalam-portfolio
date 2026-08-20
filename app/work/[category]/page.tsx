import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { workCategories, getCategoryBySlug } from "@/data/categories";
import { WorkTabs } from "@/components/WorkTabs";
import { CategoryPageContent } from "@/components/portfolio/CategoryPageContent";

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

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <WorkTabs activeSlug={category.slug} />

      <CategoryPageContent slug={category.slug} />
    </section>
  );
}
