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
  /** "photo" swaps the hero box to a 4:5 portrait crop suited to a real product/garment
   *  photograph. Omit (defaults to the wide 840:225 logo-lockup box) for every existing board —
   *  unchanged for logo-identity and print/card boards, which all use vector/flat lockups. */
  heroLayout?: "photo";
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
  /** Print/card boards only. Finished-artwork image(s), rendered in place of the mood-board grid
   *  when moodBoard is omitted. A single string renders as one image (Reliable Pest Control); an
   *  array renders its first entry larger (a presentation/context shot, if supplied) followed by
   *  the rest in a small grid (individual card faces) — see Front Line Road Safety, which
   *  supplies a combined presentation photo plus its two separate card faces. */
  cardArtwork?: string | string[];
  /** Print/card boards only. Verbatim copy from the source mockup — not paraphrased. */
  commitment?: string;
  /** Print/card boards only. Short service/feature labels, verbatim from the source mockup. */
  servicePillars?: string[];
  /** Print/card boards only. Rendered as a labelled spec list in place of the Brand Guide block
   *  when rules is omitted. */
  printSpecs?: BrandBoardPrintSpec[];
  /** Apparel/product boards only. A generic labelled paragraph, rendered in the same slot and
   *  style as `commitment` but with a caller-supplied label instead of the fixed "Commitment"
   *  heading (that word doesn't fit a design-details blurb). Mutually exclusive with
   *  `commitment` — a board sets one or the other, never both. */
  description?: { label: string; body: string };
  /** Apparel/product boards only. A second contextual image (e.g. the design on a garment),
   *  distinct from the hero shot. Renders directly below the hero band, above everything else. */
  secondaryImage?: { label: string; image: string; alt: string };
  /** Apparel/product boards only. A second labelled spec list, distinct from `printSpecs` (which
   *  stays reserved for print/production specs) — e.g. design attributes like garment colours,
   *  orientation, typography. Renders as its own row, dl-styled identically to printSpecs. */
  designSpecs?: { label: string; items: BrandBoardPrintSpec[] };
}

export interface VideoSpec {
  label: string;
  value: string;
}

/** AI & Generative (and any future video-led) items only. A YouTube reel's fixed field set:
 *  click-to-play player, overview, a spec list, a pipeline/tools list, and an outbound "Watch
 *  on YouTube" link. Kept as its own type/component rather than folded into BrandBoard — a
 *  video reel isn't a "brand board" (no palette/lockup concept applies), and the player needs
 *  real interactive state (click-to-play), which BrandBoardSection's boards never have. */
export interface VideoBoard {
  /** YouTube video ID only (not a full URL) — used to build both the nocookie embed src and,
   *  combined with youtubeUrl below, kept separate so the embed domain can change independently
   *  of the canonical watch link. */
  videoId: string;
  /** Real title from the YouTube oEmbed API — used as the iframe's title attribute and the
   *  play-facade's alt/aria-label text. */
  videoTitle: string;
  /** Facade thumbnail shown before the user clicks play — the real YouTube thumbnail. */
  thumbnail: string;
  overview: string;
  specs: VideoSpec[];
  /** Tools/workflow steps, rendered as a bulleted list. */
  pipeline: string[];
  /** "portrait" swaps the player from the default width-driven 16:9 box to a height-driven 9:16
   *  box (capped, centered) suited to a vertical Short — a full-width 9:16 box at this modal's
   *  width would render ~1350px tall, well past a typical viewport. Omit (defaults to
   *  "landscape") for every existing video item. */
  orientation?: "landscape" | "portrait";
  /** Canonical https://youtu.be/... or https://www.youtube.com/watch?v=... link for the
   *  "Watch on YouTube" outbound link — deliberately not derived from videoId at render time,
   *  so a future item can point at a URL shape the ID alone wouldn't reconstruct. */
  youtubeUrl: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  thumbnail: string;
  /** Pin state for the Feature/Pin admin system — NOT set in the static data files.
   *  Populated at render time by lib/featured.ts from the KV-backed featured map, then
   *  read by sortItemsByFeatured() to order this item within its own PortfolioCategory
   *  group. Undefined (the state for every item until an owner pins it) means "not
   *  featured" — identical to today's unpinned rendering. */
  featuredAt?: number;
  /** Fully dynamic — DetailsModal renders whatever is here. */
  details: DetailField[];
  /** Optional richer brand-board view (hero lockup, logo options, mood board, palette, fonts,
   *  rules) — DetailsModal renders this in addition to `details` when present. */
  brandBoard?: BrandBoard;
  /** Optional video-reel view (player, overview, specs, pipeline, watch link). Mutually
   *  exclusive with `brandBoard` — DetailsModal checks videoBoard first. */
  videoBoard?: VideoBoard;
}

export interface PortfolioCategory {
  id: string;
  /** Shown as the section heading, e.g. "Logo Design". */
  name: string;
  items: PortfolioItem[];
  /** Card image area's aspect ratio for this group only. Omit for the default (1:1, square) —
   *  every existing group keeps that unless it explicitly opts in, e.g. T-Shirt Design's "4/5"
   *  for portrait garment photos, AI Video's "16/9" for video thumbnails, Short-Form Reels'
   *  "9/16" for vertical Shorts. Driven by data, not the group's name/id, so any future group
   *  can opt in the same way. */
  aspectRatio?: "1/1" | "4/5" | "16/9" | "9/16";
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
