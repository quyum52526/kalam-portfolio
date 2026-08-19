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
  /** Icon-only mark, no wordmark. Null if the asset folder didn't supply a distinct icon-only
   *  file — render as a GAP rather than reusing the hero (wordmark-bearing) image. */
  icon: string | null;
}

export interface BrandBoardPrintSpec {
  label: string;
  value: string;
}

/** Hero + palette are shared by every board; everything else is optional so one component can
 *  render both a logo-identity board (DigiCode IT, RF-TEQ, LMT Agro, Relentail — logoOptions,
 *  fonts, rules) and a print/card board (Reliable Pest Control — cardArtwork, commitment,
 *  servicePillars, printSpecs) without a second component. BrandBoardSection renders each
 *  optional section only when its data exists, so a board that omits a logo-identity field
 *  renders no differently than before this type was extended, and vice versa. */
export interface BrandBoard {
  /** Verbatim from the PDF. Null when the hero lockup image already bakes the tagline in as
   *  vector art — rendering it a second time as text would duplicate it (e.g. Relentail's
   *  Logo-01.svg includes "ENDURE THE CURRENT" in the artwork itself). */
  tagline: string | null;
  hero: { image: string; alt: string };
  /** Hero band background colour override. Omit to fall back to the darkest palette entry (by
   *  relative luminance) — the existing default, unchanged for any brand that doesn't set this.
   *  Set explicitly when a brand's mark fills its ink with that same darkest palette colour,
   *  which would otherwise render invisible against a same-colour computed background (e.g.
   *  Relentail's shell + wordmark are filled with #212120, its own darkest palette entry). */
  heroBg?: string;
  /** Logo-identity boards only. Omit entirely (not an empty object) for print/card boards that
   *  have no "logo options" concept — the whole LOGO OPTIONS block is skipped and the palette
   *  strip takes the full row width instead of sharing it 45/55. */
  logoOptions?: BrandBoardLogoOptions;
  /** Mood-board images, in the numeric order they were supplied. Logo-identity boards only. */
  moodBoard?: string[];
  /** Hex codes, verbatim from the source material's stated palette. */
  palette: string[];
  /** Logo-identity boards only. Omit to skip the Fonts row. */
  fonts?: BrandBoardFont[];
  /** Brand-guide rules, verbatim from the PDF — not paraphrased, none added. Logo-identity
   *  boards only; omit to skip the Brand Guide block (see printSpecs for the print equivalent). */
  rules?: string[];
  /** Print/card boards only. A single finished-artwork image (e.g. the printed card face(s)),
   *  rendered in place of the mood-board grid when moodBoard is omitted. */
  cardArtwork?: string;
  /** Print/card boards only. Verbatim copy from the source mockup — not paraphrased. */
  commitment?: string;
  /** Print/card boards only. Short service/feature labels, verbatim from the source mockup. */
  servicePillars?: string[];
  /** Print/card boards only. Rendered as a labelled spec list in place of the Brand Guide block
   *  when rules is omitted. */
  printSpecs?: BrandBoardPrintSpec[];
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
