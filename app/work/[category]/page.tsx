import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PortfolioPageId } from "@/types/portfolio";
import { workCategories, getCategoryBySlug } from "@/data/categories";
import { getFeaturedMap } from "@/lib/featured-store";
import { listCmsEntries, resolveEntryDisplayUrl } from "@/lib/cms-store";
import { cmsEntryToPortfolioItem, hasValidCmsMedia } from "@/lib/cms";
import { CategoryPageContent } from "@/components/portfolio/CategoryPageContent";

type Params = { category: string };

// Feature/Pin state lives in Redis and CMS uploads live in Supabase — both can change at any
// time from /admin without a redeploy — force-dynamic guarantees the reads below happen on
// every request rather than risking a stale cached fetch (revalidatePath alone doesn't reliably
// bust an arbitrary fetch's own Data Cache entry, only the route's render cache). Trades this
// route's static prerendering for correctness; both reads are single sub-50ms calls.
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

  const [featuredMap, cmsRows] = await Promise.all([
    getFeaturedMap(),
    listCmsEntries(category.slug as PortfolioPageId),
  ]);
  // Rows missing a real YouTube video / uploaded image (a manual DB edit, or data from before
  // app/api/admin/content/route.ts validated this at write time) are dropped here rather than
  // rendered as a broken card with no thumbnail — see hasValidCmsMedia's own comment.
  const cmsEntries = cmsRows.filter(hasValidCmsMedia).map((row) => ({
    groupId: row.group_id,
    item: cmsEntryToPortfolioItem(row, resolveEntryDisplayUrl(row)),
  }));

  return (
    <section className="mx-auto max-w-6xl px-6 pb-12 pt-28 sm:pt-32">
      <CategoryPageContent slug={category.slug} featuredMap={featuredMap} cmsEntries={cmsEntries} />
    </section>
  );
}
