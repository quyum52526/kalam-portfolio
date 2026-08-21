import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { workCategories, getCategoryBySlug } from "@/data/categories";
import { getFeaturedMap } from "@/lib/featured-store";
import { WorkTabs } from "@/components/WorkTabs";
import { CategoryPageContent } from "@/components/portfolio/CategoryPageContent";

type Params = { category: string };

// Feature/Pin state lives in Redis and can change at any time from /admin without a
// redeploy — force-dynamic guarantees getFeaturedMap() below is re-read on every request
// rather than risking a stale cached fetch (revalidatePath alone doesn't reliably bust an
// arbitrary fetch's own Data Cache entry, only the route's render cache). Trades this
// route's static prerendering for correctness; the KV read is a single sub-50ms call.
export const dynamic = "force-dynamic";

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

  const featuredMap = await getFeaturedMap();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <WorkTabs activeSlug={category.slug} />

      <CategoryPageContent slug={category.slug} featuredMap={featuredMap} />
    </section>
  );
}
