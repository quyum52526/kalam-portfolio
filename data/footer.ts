import { SiTelegram } from "react-icons/si";
import { workCategories } from "./categories";
import type { ContactIcon } from "./contact";
import {
  emailPrimary,
  whatsapp,
  website,
  linkedin,
  fiverr,
  upwork,
} from "./contact";

export interface FooterLink {
  label: string;
  href: string;
  /** Inline brand icon, Hire Me / Contact columns only. */
  icon?: ContactIcon;
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

/** Column 3 — Hire Me. External freelance-platform profiles, sourced from
 *  data/contact.ts (single source of truth — see that file for the Fiverr/Upwork GAP
 *  notes). LinkedIn has no icon: react-icons/si dropped its LinkedIn glyph upstream
 *  (SiLinkedin doesn't exist in the installed version) — data/contact.ts's `linkedin`
 *  channel already carries the fa6 fallback icon instead. */
export const footerHireMeLinks: FooterLink[] = [fiverr, upwork, linkedin];

/** Column 4 — Contact. Email/WhatsApp/Website are the same data/contact.ts channels
 *  the Contact page and FloatingDock use — no separate hardcoded copies here. Telegram
 *  isn't part of that shared contact data (it's a social profile, already in the
 *  socialLinks row) — kept here as its own link, unchanged from before. */
export const footerContactLinks: FooterLink[] = [
  emailPrimary,
  whatsapp,
  website,
  { label: "Telegram", href: "https://t.me/kalam52526", icon: SiTelegram },
];
