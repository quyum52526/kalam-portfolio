import type { ProjectCategory } from "./projects";
import type { HeroCanvasRoleId } from "@/lib/hero/roleStates";

export interface WorkCategory {
  /** URL segment — lowercase, hyphenated, used in /work/[slug]. */
  slug: string;
  /** Full tab / page-h1 label. */
  label: string;
  /** Shortened label for the main nav, where the full label is too wide. */
  navLabel: string;
  /** One-line category description, used as the page's <p> intro and meta description. */
  description: string;
  /** Text color utility class for this category's accent, matched to the hero role pill. */
  accentClass: string;
  /** data/projects.ts Project["category"] this work category filters to. */
  projectCategory: ProjectCategory;
  /** Matching HeroSection role id, so "Explore Work" can deep-link per active role. */
  heroRoleId: HeroCanvasRoleId;
}

/** Single source of truth for the work taxonomy — tabs, routes, nav, and the
 *  hero's per-role "Explore Work" links all read from this array. */
export const workCategories: WorkCategory[] = [
  {
    slug: "ai-generative",
    label: "AI & Generative",
    navLabel: "AI & GENERATIVE",
    description:
      "Generative video pipelines and AI-assisted rendering — prompt-to-render workflows and AI compositing.",
    accentClass: "text-cyan-400",
    projectCategory: "ai-video",
    heroRoleId: "ai-video",
  },
  {
    slug: "motion-reels",
    label: "Motion & Reels",
    navLabel: "MOTION & REELS",
    description:
      "Motion graphics, edit systems, and short-form vertical reels — commercial promos, brand campaigns, and ad edits.",
    accentClass: "text-violet-400",
    projectCategory: "motion",
    heroRoleId: "motion",
  },
  {
    slug: "branding-visuals",
    label: "Branding & Visuals",
    navLabel: "BRANDING",
    description:
      "Identity systems, logo design, packaging, and print collateral built around a consistent visual language.",
    accentClass: "text-amber-400",
    projectCategory: "design",
    heroRoleId: "brand",
  },
  {
    slug: "web-experiences",
    label: "Web Experiences",
    navLabel: "WEB",
    description:
      "Sites and interfaces built in Next.js and React — designed, coded, animated, and shipped end to end.",
    accentClass: "text-emerald-400",
    projectCategory: "frontend",
    heroRoleId: "web-dev",
  },
];

export function getCategoryBySlug(slug: string): WorkCategory | undefined {
  return workCategories.find((category) => category.slug === slug);
}

export function getCategoryByHeroRole(
  roleId: HeroCanvasRoleId
): WorkCategory | undefined {
  return workCategories.find((category) => category.heroRoleId === roleId);
}
