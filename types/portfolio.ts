export type DetailFieldType = "text" | "paragraph" | "color" | "image";

export interface DetailField {
  label: string;
  /** Text, hex code, image path, or multiple image paths (for variations). */
  value: string | string[];
  type: DetailFieldType;
}

export interface BrandBoardFont {
  /** Family name, verbatim from the brand-board PDF — used to look up lib/fonts.ts's registry. */
  family: string;
  /** Usage label, verbatim from the PDF, e.g. "HEADINGS · LOGOTYPE · LABELS". */
  usage: string;
}

export interface BrandBoardLogoOptions {
  /** A second full (icon + wordmark) lockup, distinct from the hero image. Null if the asset
   *  folder only supplied one full lockup — render as a GAP rather than reusing the hero image. */
  alternateLockup: string | null;
  /** Icon-only mark, no wordmark. */
  icon: string;
}

export interface BrandBoard {
  /** Verbatim from the PDF. */
  tagline: string;
  hero: { image: string; alt: string };
  logoOptions: BrandBoardLogoOptions;
  /** Mood-board images, in the numeric order they were supplied. */
  moodBoard: string[];
  /** Hex codes, verbatim from the PDF's stated palette. */
  palette: string[];
  fonts: BrandBoardFont[];
  /** Brand-guide rules, verbatim from the PDF — not paraphrased, none added. */
  rules: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  thumbnail: string;
  /** Fully dynamic — DetailsModal renders whatever is here. */
  details: DetailField[];
  /** Optional richer brand-board view (hero lockup, logo options, mood board, palette, fonts,
   *  rules) — DetailsModal renders this in addition to `details` when present. */
  brandBoard?: BrandBoard;
}

export interface PortfolioCategory {
  id: string;
  /** Shown as the section heading, e.g. "Logo Design". */
  name: string;
  items: PortfolioItem[];
}

/** Matches data/categories.ts workCategories[].slug — the real /work/[category] routes. */
export type PortfolioPageId =
  | "ai-generative"
  | "motion-reels"
  | "branding-visuals"
  | "web-experiences";

export interface PortfolioPage {
  id: PortfolioPageId;
  /** e.g. "Branding & Visuals" — used as the homepage "All" group heading. */
  label: string;
  /** Top section — unlimited length, fully data-driven. */
  categories: PortfolioCategory[];
  /** Bottom section — flat gallery of every item for this page. */
  allWork: { id: string; title: string; image: string }[];
}
