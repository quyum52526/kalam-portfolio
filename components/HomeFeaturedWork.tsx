"use client";

import { useState } from "react";
import { getCategoryBySlug } from "@/data/categories";
import type { PortfolioPageId } from "@/types/portfolio";
import { portfolioPages } from "@/lib/portfolio";
import type { FeaturedMap } from "@/lib/featured";
import { HomeWorkTabs } from "@/components/HomeWorkTabs";
import { HomeCategoryFeatureGrouped } from "@/components/portfolio/HomeCategoryFeatureGrouped";
import { CategoryPageContent } from "@/components/portfolio/CategoryPageContent";

/** "All Work" section order — deliberately not portfolioPages' own array order (see
 *  lib/portfolio.ts), and kept local rather than shared with app/work/page.tsx's
 *  identical-looking list since that page must stay untouched by this component. */
const ALL_WORK_ORDER: PortfolioPageId[] = [
  "branding-visuals",
  "ai-generative",
  "motion-reels",
  "web-experiences",
];

/** Home page work section: a chip bar (HomeWorkTabs) plus, below it:
 *  - "All Work" (activeSlug null): all four categories' featured/top sections
 *    (Branding → AI → Motion → Web) — each showing its first 2 top-section sub-groups
 *    (capped at 4 items each) with a "View all" link.
 *  - a single category chip: that category's COMPLETE /work/<slug> content (grouped
 *    top section with Details buttons, plus the bottom flat "All <Category> Work"
 *    grid), via the same CategoryPageContent the category page itself renders — no
 *    "View all" link needed since everything is already shown. */
export function HomeFeaturedWork({
  featuredMap,
}: {
  /** Optional — omit and every child renders in original data order, unchanged from
   *  before the Feature/Pin system existed. app/page.tsx fetches this server-side
   *  (lib/featured-store.ts) once and passes it down as a plain prop, since this
   *  component is a Client Component and can't read Redis itself. */
  featuredMap?: FeaturedMap;
}) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <HomeWorkTabs activeSlug={activeSlug} onSelect={setActiveSlug} />

      {activeSlug ? (
        <CategoryPageContent slug={activeSlug} featuredMap={featuredMap} />
      ) : (
        ALL_WORK_ORDER.map((id) => {
          const page = portfolioPages.find((p) => p.id === id);
          if (!page) return null;

          const category = getCategoryBySlug(page.id);
          if (!category) return null;

          return (
            <HomeCategoryFeatureGrouped
              key={page.id}
              category={category}
              groups={page.categories}
              featuredMap={featuredMap}
            />
          );
        })
      )}
    </section>
  );
}
