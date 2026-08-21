import { getCategoryBySlug } from "@/data/categories";
import { getPortfolioPageBySlug } from "@/lib/portfolio";
import { applyFeaturedToPage, type FeaturedMap } from "@/lib/featured";
import { PortfolioCategorySection } from "@/components/portfolio/PortfolioCategorySection";
import { FlatGallery } from "@/components/portfolio/FlatGallery";

/** Single source of truth for one category's full page content: heading + description,
 *  its top section (grouped, with Details buttons on each item), and its bottom flat
 *  "All <Category> Work" grid — exactly what /work/<slug> renders below its WorkTabs
 *  nav. Used by /work/[category]/page.tsx (server-rendered) and by the home page's
 *  per-category chip view (client-rendered) — see that file for why no "use client" is
 *  needed here for either context. Callers own 404-handling (next/navigation's
 *  notFound()) before rendering this; that API only makes sense at a route boundary,
 *  which the home page's button-driven chip view isn't. Both call sites only ever pass
 *  a slug from the fixed workCategories list, so the null-guard below is a defensive
 *  fallback, not a real code path.
 *
 *  `featuredMap` is optional and purely additive: omit it (or pass nothing) and this
 *  renders exactly as before the Feature/Pin system existed. When passed, it's already-
 *  fetched data (lib/featured-store.ts's KV read happens in the caller, once, server-side)
 *  — applying it here is pure sorting, which is why this component can stay synchronous
 *  and keep working from both a Server Component and a "use client" one. */
export function CategoryPageContent({
  slug,
  featuredMap,
}: {
  slug: string;
  featuredMap?: FeaturedMap;
}) {
  const category = getCategoryBySlug(slug);
  if (!category) return null;

  const rawPortfolioPage = getPortfolioPageBySlug(slug);
  const portfolioPage =
    rawPortfolioPage && featuredMap
      ? applyFeaturedToPage(rawPortfolioPage, featuredMap)
      : rawPortfolioPage;

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {category.label}
      </h1>
      <p className="mt-3 max-w-2xl text-muted">{category.description}</p>

      {portfolioPage && (
        <>
          <div className="mt-12">
            {portfolioPage.categories.map((cat) => (
              <PortfolioCategorySection key={cat.id} category={cat} />
            ))}
          </div>

          <div className="mt-4">
            <h2 className="mb-6 text-xl font-semibold tracking-tight sm:text-2xl">
              All {category.label} Work
            </h2>
            <FlatGallery items={portfolioPage.allWork} />
          </div>
        </>
      )}
    </>
  );
}
