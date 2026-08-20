"use client";

import Link from "next/link";
import { useState } from "react";
import type { WorkCategory } from "@/data/categories";
import type { PortfolioItem } from "@/types/portfolio";
import { ItemCard } from "@/components/portfolio/ItemCard";
import { DetailsModal } from "@/components/portfolio/DetailsModal";

/** One category's featured block for an "All" view (home page and /work): heading +
 *  description + "View all" link, then the given items from that category's top section
 *  (already flattened across sub-groups by the caller) — capped to `limit` items when
 *  given (home page passes 4), or shown in full when omitted (/work's "All" tab shows
 *  every top-section item). Uses the same ItemCard/DetailsModal as /work/[category]'s
 *  top section. Not built on PortfolioCategorySection — that component's heading is a
 *  bare category name with no slot for a description or a view-all link. */
export function HomeCategoryFeature({
  category,
  items,
  limit,
}: {
  category: WorkCategory;
  items: PortfolioItem[];
  limit?: number;
}) {
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const featured = typeof limit === "number" ? items.slice(0, limit) : items;

  return (
    <section className="mb-14">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {category.label}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            {category.description}
          </p>
        </div>
        {/* py-3 -my-3 brings the tappable height to 44px without shifting the
            text's visual position or the row's own height (negative margin cancels
            the added padding in the margin box). */}
        <Link
          href={`/work/${category.slug}`}
          className="-my-3 shrink-0 py-3 text-sm font-medium text-text-body transition-colors hover:text-foreground"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onOpenDetails={() => setSelected(item)}
          />
        ))}
      </div>

      <DetailsModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
