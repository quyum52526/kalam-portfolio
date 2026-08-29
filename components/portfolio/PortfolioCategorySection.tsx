"use client";

import { useState } from "react";
import type { PortfolioCategory, PortfolioItem } from "@/types/portfolio";
import { ItemCard } from "@/components/portfolio/ItemCard";
import { DetailsModal } from "@/components/portfolio/DetailsModal";

/** Renders one category's heading + item grid + its own DetailsModal.
 *  Used in a .map() over page.categories — no per-category-specific code. */
export function PortfolioCategorySection({
  category,
}: {
  category: PortfolioCategory;
}) {
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  const isWebExperiences = category.id === "web-experiences";

  return (
    <section className="mb-14">
      <h2 className="mb-6 text-xl font-semibold tracking-tight sm:text-2xl">
        {category.name}
      </h2>
      <div
        className={
          isWebExperiences
            ? "grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            : "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }
      >
        {category.items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onOpenDetails={() => setSelected(item)}
            aspectRatio={category.aspectRatio}
          />
        ))}
      </div>

      <DetailsModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
