import type { IconType } from "react-icons";
import { SiFiverr, SiUpwork } from "react-icons/si";
import { workCategories } from "./categories";

export interface FooterLink {
  label: string;
  href: string;
  /** Inline brand icon, Hire Me column only. Omitted where no react-icons/si glyph exists. */
  icon?: IconType;
}

/** Short-form labels for the footer's Portfolio column — the full `label` in
 *  data/categories.ts ("Web Experiences") is too wide for a narrow column.
 *  Falls back to the full label if a category is added without an entry here. */
const FOOTER_CATEGORY_LABELS: Record<string, string> = {
  "ai-generative": "AI & Generative",
  "motion-reels": "Motion & Reels",
  "branding-visuals": "Branding",
  "web-experiences": "Web",
};

/** Column 2 — Portfolio. Routes derived from data/categories.ts so they can never drift. */
export const footerPortfolioLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  ...workCategories.map((category) => ({
    label: FOOTER_CATEGORY_LABELS[category.slug] ?? category.label,
    href: `/work/${category.slug}`,
  })),
  { label: "Contact", href: "/contact" },
];

/** Column 3 — Hire Me. External freelance-platform profiles.
 *  LinkedIn has no icon: react-icons/si dropped its LinkedIn glyph upstream (SiLinkedin doesn't
 *  exist in the installed version) — left icon-less rather than substituting a different pack. */
export const footerHireMeLinks: FooterLink[] = [
  { label: "Fiverr", href: "https://www.fiverr.com/kalam52526", icon: SiFiverr },
  {
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/~017a0f58caf2efb8d0",
    icon: SiUpwork,
  },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kalam52526/" },
];

/** Column 4 — Contact. Real protocol links (mailto / wa.me / t.me). */
export const footerContactLinks: FooterLink[] = [
  { label: "Email", href: "mailto:info@kalamcreative.com" },
  { label: "WhatsApp", href: "https://wa.me/8801962434901" },
  { label: "Telegram", href: "https://t.me/kalam52526" },
];
