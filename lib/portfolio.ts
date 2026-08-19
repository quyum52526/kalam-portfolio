import type { PortfolioPage } from "@/types/portfolio";
import { aiGenerativePage } from "@/data/portfolio/ai-generative";
import { motionReelsPage } from "@/data/portfolio/motion-reels";
import { brandingVisualsPage } from "@/data/portfolio/branding-visuals";
import { webExperiencesPage } from "@/data/portfolio/web-experiences";

/** Single source of truth for the four portfolio pages — order matches
 *  data/categories.ts workCategories, so nav/tabs and this list stay in sync. */
export const portfolioPages: PortfolioPage[] = [
  aiGenerativePage,
  motionReelsPage,
  brandingVisualsPage,
  webExperiencesPage,
];

export function getPortfolioPageBySlug(slug: string): PortfolioPage | undefined {
  return portfolioPages.find((page) => page.id === slug);
}
