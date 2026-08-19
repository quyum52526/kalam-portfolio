import type { BrandBoard } from "@/types/portfolio";
import { fontRegistry } from "@/lib/fonts";
import { cn } from "@/lib/utils";

const SECTION_LABEL_CLASS =
  "text-[10px] font-medium uppercase tracking-[0.15em] text-muted";

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
    <div className="flex flex-col items-center gap-1.5">
      {src ? (
        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-white/5 p-2">
          {/* eslint-disable-next-line @next/next/no-img-element -- local public/ asset with a space in its folder name; next/image adds no benefit here */}
          <img src={src} alt={label} className="h-full w-full object-contain" />
        </div>
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-md border border-dashed border-border-strong">
          <span className="text-[9px] italic text-muted">To be added</span>
        </div>
      )}
      <p className="text-[9px] uppercase tracking-wider text-muted">{label}</p>
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
  const heroBg = darkestOf(board.palette);
  const heroText = readableOn(heroBg);

  return (
    <div className="text-xs">
      <h3 className="sr-only">{title}</h3>

      {/* Row 1 — Hero band: full lockup + tagline on the darkest palette colour. */}
      <div
        className="flex flex-col items-center justify-center gap-2 px-6 py-7"
        style={{ backgroundColor: heroBg }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- local public/ asset with a space in its folder name */}
        <img src={board.hero.image} alt={board.hero.alt} className="h-12 w-auto object-contain" />
        <p
          className="text-[10px] font-medium uppercase tracking-[0.3em]"
          style={{ color: heroText, opacity: 0.85 }}
        >
          {board.tagline}
        </p>
      </div>

      {/* Row 2 — Logo options (45%) | Palette (55%), flush against each other.
          Single column below md: a 45/55 split on a 375px screen is too cramped for the
          rotated-hex palette strip and the two logo thumbnails to stay legible. */}
      <div className="grid grid-cols-1 border-t border-border md:grid-cols-[45%_55%]">
        <div className="flex flex-col items-center justify-center gap-2 border-b border-border bg-navy-950 px-4 py-4 md:border-b-0 md:border-r">
          <p className={SECTION_LABEL_CLASS}>Logo Options</p>
          <div className="flex items-center gap-4">
            <LogoThumb src={board.logoOptions.icon} label="Icon" />
            <LogoThumb src={board.logoOptions.alternateLockup} label="Alternate" />
          </div>
        </div>
        <div className="flex">
          {board.palette.map((hex) => (
            <div
              key={hex}
              className="flex flex-1 items-end justify-center py-3"
              style={{ backgroundColor: hex }}
            >
              <span
                className="whitespace-nowrap text-[9px] font-medium tracking-widest [writing-mode:vertical-rl]"
                style={{ color: readableOn(hex), transform: "rotate(180deg)" }}
              >
                {hex}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3 — Fonts. Two specimens side by side on desktop; stacked on mobile so each
          alphabet specimen stays at a legible size instead of squeezing to half-width. */}
      <div className="grid grid-cols-1 border-t border-border md:grid-cols-2">
        {board.fonts.map((font, i) => {
          const loaded = fontRegistry[font.family];
          return (
            <div
              key={font.family}
              className={cn(
                "border-b border-border px-4 py-3 last:border-b-0 md:border-b-0",
                i === 0 && "md:border-r"
              )}
            >
              <p className={cn(loaded?.className, "text-lg font-semibold text-text-body")}>
                {font.family}
              </p>
              <p className={cn(SECTION_LABEL_CLASS, "mt-0.5")}>{font.usage}</p>
            </div>
          );
        })}
      </div>

      {/* Row 4 — Mood board (2x2) | Brand guide. Stacked on mobile. */}
      <div className="grid grid-cols-1 border-t border-border md:grid-cols-2">
        <div className="grid grid-cols-2 gap-px bg-border">
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
        <div className="border-t border-border bg-surface-inset px-4 py-3 md:border-l md:border-t-0">
          <p className="text-sm font-semibold text-text-body">Brand Guide</p>
          <p className="text-[10px] font-medium uppercase tracking-wider text-text-accent">
            Rules of Use
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-[11px] leading-snug text-text-body">
            {board.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
