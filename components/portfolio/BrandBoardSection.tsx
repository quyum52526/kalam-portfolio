import type { BrandBoard } from "@/types/portfolio";
import { fontRegistry } from "@/lib/fonts";
import { cn } from "@/lib/utils";

// --- Board density controls -------------------------------------------------
// Every block below the hero band reads its spacing/type scale from these
// constants — tune density here, not by hunting through the JSX.
//
// The hero lockup is the one exception: it scales independently, and larger,
// since it must stay the single most prominent mark on the board. (It used to
// render smaller than the LOGO OPTIONS icon thumb — not a sizing-class bug,
// but because DIGICODEit-primary.svg's own viewBox was a 1000x1000 square
// while the actual lockup artwork is a ~750x135 strip through the middle of
// it, so `object-contain` was fitting the mostly-empty square, not the logo.
// Fixed at the source by tightening that SVG's viewBox to the real artwork
// bounding box — sizing classes alone couldn't have fixed a wrong intrinsic
// aspect ratio.)
//
// A second, related bug: sizing the hero purely by WIDTH (`w-[...] h-auto`)
// means its rendered HEIGHT is whatever each brand's own intrinsic aspect
// ratio implies at that width. That's invisible for a wide lockup like
// DigiCode's (cropped to ~840:225 at the source, above), but a brand whose
// source file is an uncropped square — e.g. RF-TEQ's Rfteq-logo-01.svg,
// viewBox 0 0 1200 1200, no crop applied — rendered at full width×height,
// i.e. ~3.7x taller than DigiCode's, blowing the hero band out to roughly
// half the modal. Fixed for every brand at once, not per item: the box's
// ASPECT RATIO is now fixed to DigiCode's own lockup ratio (840:225) rather
// than left to float with each image's own ratio, and `object-contain`
// scales the actual artwork to fit inside without cropping or distorting.
// A lockup already cropped to (near enough) that same wide ratio — like
// DigiCode's — fills the box edge to edge, so nothing changes. A
// differently-shaped lockup — like RF-TEQ's square — is letterboxed down to
// the same rendered height as every other brand instead of stretching the
// band to fit its own shape.
//
// The class string below must stay a static literal (not built via template
// interpolation) — Tailwind's build-time scanner greps source text for
// literal utility names, so an interpolated `aspect-[${x}]` wouldn't be
// found and its CSS would silently never be generated.
/** Hero lockup box: width scales with the band exactly as before (up to 86%,
 *  capped at 520px); height is now derived from that width via a fixed
 *  aspect ratio (DigiCode's own lockup ratio, 840:225) instead of from each
 *  logo's own intrinsic ratio. */
const HERO_LOCKUP_CLASS =
  "w-[86%] max-w-[520px] h-auto aspect-[840/225] object-contain";
/** Hero band's own padding — still shrinks along with everything else. */
const HERO_BAND_PADDING = "px-6 py-5";

/** Padding inside every secondary block (logo options, fonts, mood/guide). */
const BLOCK_PADDING = "px-3 py-2.5";
/** Colour-swatch strip's vertical padding (was py-3). */
const SWATCH_PADDING = "py-1.5";

/** Section-label / eyebrow text (LOGO OPTIONS, thumbnail captions, hex codes). */
const SECTION_LABEL_CLASS =
  "text-[8px] font-medium uppercase tracking-[0.12em] text-muted";
/** Font-specimen family name (e.g. "Montserrat"). */
const SPECIMEN_NAME_CLASS = "text-sm font-semibold text-text-body";
/** Brand-guide heading ("Brand Guide"). */
const GUIDE_HEADING_CLASS = "text-xs font-semibold text-text-body";
/** Brand-guide bulleted rules — body copy. */
const GUIDE_BODY_CLASS = "text-[10px] leading-snug text-text-body";

/** Logo-option thumbnail box size (was h-16 w-16). */
const LOGO_THUMB_SIZE = "h-11 w-11";
/** Mood-board grid's rendered width — caps tile size independent of the
 *  column's available width (was filling the full column). */
const MOOD_BOARD_MAX_WIDTH = "max-w-[220px]";

function relativeLuminance(hex: string) {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const f = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

/** White or near-black, whichever reads better on the given hex fill. */
function readableOn(hex: string) {
  return relativeLuminance(hex) > 0.35 ? "#101418" : "#ffffff";
}

/** Darkest entry in the palette — used as the hero band fill instead of the literal brand blue,
 *  since the logo SVG's own icon fill IS that exact blue and would vanish into a same-color
 *  background. Computed by luminance rather than a fixed index so it stays correct regardless of
 *  palette order. */
function darkestOf(colors: string[]) {
  return colors.reduce((a, b) => (relativeLuminance(a) <= relativeLuminance(b) ? a : b));
}

function LogoThumb({
  src,
  label,
}: {
  src: string | null;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      {src ? (
        <div className={cn(LOGO_THUMB_SIZE, "flex items-center justify-center rounded-md bg-white/5 p-1.5")}>
          {/* eslint-disable-next-line @next/next/no-img-element -- local public/ asset with a space in its folder name; next/image adds no benefit here */}
          <img src={src} alt={label} className="h-full w-full object-contain" />
        </div>
      ) : (
        <div className={cn(LOGO_THUMB_SIZE, "flex items-center justify-center rounded-md border border-dashed border-border-strong")}>
          <span className="text-[8px] italic text-muted">To be added</span>
        </div>
      )}
      <p className={SECTION_LABEL_CLASS}>{label}</p>
    </div>
  );
}

export function BrandBoardSection({
  board,
  title,
}: {
  board: BrandBoard;
  title: string;
}) {
  const heroBg = board.heroBg ?? darkestOf(board.palette);
  const heroText = readableOn(heroBg);

  return (
    <div className="text-xs">
      <h3 className="sr-only">{title}</h3>

      {/* Row 1 — Hero band: full lockup + tagline on the darkest palette colour. The single
          largest element on the board — see HERO_LOCKUP_CLASS above. */}
      <div
        className={cn("flex flex-col items-center justify-center gap-2", HERO_BAND_PADDING)}
        style={{ backgroundColor: heroBg }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- local public/ asset with a space in its folder name */}
        <img src={board.hero.image} alt={board.hero.alt} className={HERO_LOCKUP_CLASS} />
        {board.tagline !== null && (
          <p
            className="text-[9px] font-medium uppercase tracking-[0.25em]"
            style={{ color: heroText, opacity: 0.85 }}
          >
            {board.tagline}
          </p>
        )}
      </div>

      {/* Row 1.5 — Commitment. Print/card boards only (e.g. Reliable Pest Control's verbatim
          mockup copy) — logo-identity boards don't set this and render nothing here. */}
      {board.commitment && (
        <div className={cn("border-t border-border", BLOCK_PADDING)}>
          <p className={cn(SECTION_LABEL_CLASS, "text-text-accent")}>Commitment</p>
          <p className={cn(GUIDE_BODY_CLASS, "mt-1")}>{board.commitment}</p>
        </div>
      )}

      {/* Row 2 — Logo options (45%) | Palette (55%), flush against each other, when logoOptions
          exists. Print/card boards omit logoOptions entirely (no "logo options" concept for a
          business card), so the palette strip takes the full row instead of sharing it.
          Single column below md: a 45/55 split on a 375px screen is too cramped for the
          rotated-hex palette strip and the two logo thumbnails to stay legible. */}
      <div className={cn("grid grid-cols-1 border-t border-border", board.logoOptions && "md:grid-cols-[45%_55%]")}>
        {board.logoOptions && (
          <div
            className={cn(
              "flex flex-col items-center justify-center gap-1.5 border-b border-border bg-navy-950 md:border-b-0 md:border-r",
              BLOCK_PADDING
            )}
          >
            <p className={SECTION_LABEL_CLASS}>Logo Options</p>
            <div className="flex items-center gap-3">
              <LogoThumb src={board.logoOptions.icon} label="Icon" />
              <LogoThumb src={board.logoOptions.alternateLockup} label="Alternate" />
            </div>
          </div>
        )}
        <div className="flex">
          {board.palette.map((hex) => (
            <div
              key={hex}
              className={cn("flex flex-1 items-end justify-center", SWATCH_PADDING)}
              style={{ backgroundColor: hex }}
            >
              <span
                className="whitespace-nowrap text-[8px] font-medium tracking-widest [writing-mode:vertical-rl]"
                style={{ color: readableOn(hex), transform: "rotate(180deg)" }}
              >
                {hex}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2.5 — Service pillars. Print/card boards only. */}
      {board.servicePillars && board.servicePillars.length > 0 && (
        <div
          className={cn(
            "flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-border bg-navy-950 text-center",
            BLOCK_PADDING
          )}
        >
          {board.servicePillars.map((pillar, i) => (
            <span key={pillar} className="flex items-center gap-4">
              {i > 0 && <span className="h-3 w-px bg-border-strong" aria-hidden="true" />}
              <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-text-body">
                {pillar}
              </span>
            </span>
          ))}
        </div>
      )}

      {/* Row 3 — Fonts. Logo-identity boards only; print/card boards omit fonts and skip this
          row. Two specimens side by side on desktop; stacked on mobile so each alphabet
          specimen stays at a legible size instead of squeezing to half-width. */}
      {board.fonts && board.fonts.length > 0 && (
        <div className="grid grid-cols-1 border-t border-border md:grid-cols-2">
          {board.fonts.map((font, i) => {
            const loaded = fontRegistry[font.family];
            return (
              <div
                key={font.family}
                className={cn(
                  BLOCK_PADDING,
                  "border-b border-border last:border-b-0 md:border-b-0",
                  i === 0 && "md:border-r"
                )}
              >
                <p className={cn(loaded?.className, SPECIMEN_NAME_CLASS)}>
                  {font.family}
                </p>
                <p className={cn(SECTION_LABEL_CLASS, "mt-0.5")}>{font.usage}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Row 4 — Mood board (2x2, size-capped) or card artwork | Brand guide or print specs.
          Stacked on mobile. Each cell picks whichever of its two possible fields the board set;
          logo-identity boards always set moodBoard + rules, print/card boards set cardArtwork +
          printSpecs instead, so this renders exactly as before for the four existing boards. */}
      <div className="grid grid-cols-1 border-t border-border md:grid-cols-2">
        {board.moodBoard && board.moodBoard.length > 0 ? (
          <div className={cn("flex items-center justify-center bg-surface-inset", BLOCK_PADDING)}>
            <div className={cn("grid w-full grid-cols-2 gap-px bg-border", MOOD_BOARD_MAX_WIDTH)}>
              {board.moodBoard.map((src, i) => (
                <div key={src} className="relative aspect-square overflow-hidden bg-surface-inset">
                  {/* eslint-disable-next-line @next/next/no-img-element -- local public/ asset with a space in its folder name */}
                  <img
                    src={src}
                    alt={`Mood board ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : board.cardArtwork ? (
          <div className={cn("flex items-center justify-center bg-surface-inset", BLOCK_PADDING)}>
            {/* eslint-disable-next-line @next/next/no-img-element -- local public/ asset with a space in its folder name */}
            <img
              src={board.cardArtwork}
              alt="Printed card artwork"
              loading="lazy"
              decoding="async"
              className="max-h-[220px] w-full object-contain"
            />
          </div>
        ) : null}
        {board.rules && board.rules.length > 0 ? (
          <div className={cn("border-t border-border bg-surface-inset md:border-l md:border-t-0", BLOCK_PADDING)}>
            <p className={GUIDE_HEADING_CLASS}>Brand Guide</p>
            <p className={cn(SECTION_LABEL_CLASS, "text-text-accent")}>
              Rules of Use
            </p>
            <ul className={cn("mt-1.5 list-disc space-y-0.5 pl-4", GUIDE_BODY_CLASS)}>
              {board.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
        ) : board.printSpecs && board.printSpecs.length > 0 ? (
          <div className={cn("border-t border-border bg-surface-inset md:border-l md:border-t-0", BLOCK_PADDING)}>
            <p className={GUIDE_HEADING_CLASS}>Print Specifications</p>
            <dl className="mt-1.5 space-y-1">
              {board.printSpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-baseline justify-between gap-2 border-b border-border/60 py-0.5 last:border-b-0"
                >
                  <dt className={cn(SECTION_LABEL_CLASS, "text-text-accent")}>{spec.label}</dt>
                  <dd className="text-[11px] font-semibold text-text-body">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
      </div>
    </div>
  );
}
