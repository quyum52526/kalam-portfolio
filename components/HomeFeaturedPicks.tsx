"use client";

import { useState } from "react";
import type { PortfolioItem, PortfolioPageId } from "@/types/portfolio";
import { ItemCard } from "@/components/portfolio/ItemCard";
import { DetailsModal } from "@/components/portfolio/DetailsModal";

export interface HomeFeaturedPick {
  pageId: PortfolioPageId;
  item: PortfolioItem;
}

/** Homepage "Featured" cross-section: up to one card per portfolio section (AI &
 *  Generative, Motion & Reels, Branding & Visuals, Web Experiences) — each section's
 *  current #1 pin, or that section's first item by default order when nothing's pinned
 *  yet (app/page.tsx computes `picks` via lib/featured.ts's pickPageTopFeatured, server-
 *  side, once). Distinct from HomeCategoryFeature/Grouped below it on the page, which
 *  show each section's own top items on their own row — this shows one pick from every
 *  section side by side. Renders nothing if every section came back empty (no portfolio
 *  data at all), rather than showing an empty heading. */
export function HomeFeaturedPicks({ picks }: { picks: HomeFeaturedPick[] }) {
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  if (picks.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16">
      <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted">
        Featured
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {picks.map(({ pageId, item }) => (
          <ItemCard
            key={`${pageId}-${item.id}`}
            item={item}
            onOpenDetails={() => setSelected(item)}
          />
        ))}
      </div>

      <DetailsModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
