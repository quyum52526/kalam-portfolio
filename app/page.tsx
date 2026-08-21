import HeroSection from "@/components/HeroSection";
import { FeaturedReel } from "@/components/FeaturedReel";
import { HomeFeaturedPicks, type HomeFeaturedPick } from "@/components/HomeFeaturedPicks";
import { HomeFeaturedWork } from "@/components/HomeFeaturedWork";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import StatsSection from "@/components/StatsSection";
import { portfolioPages } from "@/lib/portfolio";
import { getFeaturedMap } from "@/lib/featured-store";
import { pickPageTopFeatured } from "@/lib/featured";

// Feature/Pin state lives in Redis and can change at any time from /admin — see
// app/work/[category]/page.tsx for why force-dynamic (not ISR + revalidatePath alone) is
// what actually guarantees this page re-reads it on every request.
export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredMap = await getFeaturedMap();

  const picks = portfolioPages.reduce<HomeFeaturedPick[]>((acc, page) => {
    const pick = pickPageTopFeatured(page, featuredMap);
    if (pick) acc.push({ pageId: pick.pageId, item: pick.item });
    return acc;
  }, []);

  return (
    <>
      <HeroSection />

      <StatsSection />

      <MarqueeTicker />

      <FeaturedReel />

      <HomeFeaturedPicks picks={picks} />

      <HomeFeaturedWork featuredMap={featuredMap} />
    </>
  );
}
