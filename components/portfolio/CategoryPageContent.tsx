import { getCategoryBySlug } from "@/data/categories";
import { getPortfolioPageBySlug } from "@/lib/portfolio";
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
 *  fallback, not a real code path. */
export function CategoryPageContent({ slug }: { slug: string }) {
  const category = getCategoryBySlug(slug);
  if (!category) return null;

  const portfolioPage = getPortfolioPageBySlug(slug);

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
