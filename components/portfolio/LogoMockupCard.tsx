// Static isometric-tilt + drop-shadow treatment for a 3D logo plaque. Reuses the same tilt
// angles as the hero's 3D canvas card (components/hero/RoleCanvas.tsx's CARD_RX_DEG/
// CARD_RY_DEG/CARD_RZ_DEG, ≥1280px values) and the same shadow/panel tokens
// (--card-shadow/--card-edge-light/--card-panel-bg, app/globals.css) — not rebuilt from
// scratch. Unlike RoleCanvas, this tilt is fixed: a small dense grid tile doesn't need
// per-card pointer-tracked parallax, so there's no "use client"/JS here at all.
const CARD_RX_DEG = 14;
const CARD_RY_DEG = -16;
const CARD_RZ_DEG = 1.5;

export function LogoMockupCard({
  logo,
  bgColor,
  title,
}: {
  logo: string;
  bgColor: string;
  title: string;
}) {
  return (
    <div className="relative aspect-square [--card-persp:900px] [perspective:var(--card-persp)]">
      <div
        className="absolute inset-2 overflow-hidden rounded-xl border border-border-subtle"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${CARD_RX_DEG}deg) rotateY(${CARD_RY_DEG}deg) rotateZ(${CARD_RZ_DEG}deg)`,
          transformOrigin: "60% 50%",
          background: bgColor,
          boxShadow: "var(--card-shadow), var(--card-edge-light)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- local public/ SVG asset */}
        <img
          src={logo}
          alt={title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain p-4"
        />
      </div>
    </div>
  );
}
