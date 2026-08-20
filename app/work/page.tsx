import type { Metadata } from "next";
import type { PortfolioPageId } from "@/types/portfolio";
import { WorkTabs } from "@/components/WorkTabs";
import { getCategoryBySlug } from "@/data/categories";
import { HomeCategoryFeature } from "@/components/portfolio/HomeCategoryFeature";
import { portfolioPages } from "@/lib/portfolio";

/** Section order for this page only — deliberately not the same order as
 *  data/categories.ts / lib/portfolio.ts's portfolioPages, which also drives the
 *  homepage's featured blocks (kept in AI & Generative-first order there). Chip order
 *  (WorkTabs) and /work/[category] routes both come from data/categories.ts directly
 *  and are unaffected by this list. */
const ALL_TAB_ORDER: PortfolioPageId[] = [
  "branding-visuals",
  "ai-generative",
  "motion-reels",
  "web-experiences",
];

const orderedPortfolioPages = ALL_TAB_ORDER.map((id) =>
  portfolioPages.find((page) => page.id === id)
).filter((page) => page !== undefined);

export const metadata: Metadata = {
  title: "Work",
  description:
    "AI video, motion & reels, branding & visuals, and web experiences — the full body of work.",
  openGraph: {
    title: "Abu Kalam — Work",
    description:
      "AI video, motion & reels, branding & visuals, and web experiences — the full body of work.",
  },
};

export default function WorkPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <WorkTabs />

      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        All Work
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Every project, across AI video, motion, branding, and web.
      </p>

      <div className="mt-12">
        {orderedPortfolioPages.map((page) => {
          const category = getCategoryBySlug(page.id);
          if (!category) return null;

          const items = page.categories.flatMap((c) => c.items);

          return (
            <HomeCategoryFeature key={page.id} category={category} items={items} />
          );
        })}
      </div>
    </section>
  );
}
