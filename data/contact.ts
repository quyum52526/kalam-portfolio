import type { ComponentType } from "react";
import { Mail, Globe } from "lucide-react";
import { SiWhatsapp, SiFiverr, SiUpwork } from "react-icons/si";
// react-icons/si has no LinkedIn glyph (dropped upstream); fa6 fills the gap — same
// precedent as data/social.ts.
import { FaLinkedinIn } from "react-icons/fa6";

/** Common shape both lucide-react and react-icons components satisfy, so a single
 *  ContactChannel type can mix generic icons (Mail, Globe) with brand icons
 *  (WhatsApp, Fiverr, Upwork, LinkedIn) without a library-specific type. Exported so
 *  other files rendering these channels' icons (e.g. data/footer.ts's FooterLink) can
 *  reuse the same shape instead of redeclaring it. */
export type ContactIcon = ComponentType<{ size?: number; "aria-hidden"?: boolean }>;

export interface ContactChannel {
  id: string;
  /** Visible label, e.g. "Email" or "WhatsApp". */
  label: string;
  /** Visible display text, e.g. "info@kalamcreative.com" or "+880 1962-434901". */
  value: string;
  href: string;
  icon: ContactIcon;
}

/** Single source of truth for every real contact method — the Contact page, the
 *  Footer, and the FloatingDock all read from here instead of hardcoding their own
 *  copies of these emails/numbers/URLs. */
export const emailPrimary: ContactChannel = {
  id: "email-primary",
  label: "Email",
  value: "info@kalamcreative.com",
  href: "mailto:info@kalamcreative.com",
  icon: Mail,
};

export const emailSecondary: ContactChannel = {
  id: "email-secondary",
  label: "Email (secondary)",
  value: "quyum52526@gmail.com",
  href: "mailto:quyum52526@gmail.com",
  icon: Mail,
};

export const whatsapp: ContactChannel = {
  id: "whatsapp",
  label: "WhatsApp",
  value: "+880 1962-434901",
  href: "https://wa.me/8801962434901",
  icon: SiWhatsapp,
};

export const website: ContactChannel = {
  id: "website",
  label: "Website",
  value: "kalamcreative.com",
  href: "https://kalamcreative.com",
  icon: Globe,
};

export const linkedin: ContactChannel = {
  id: "linkedin",
  label: "LinkedIn",
  value: "linkedin.com/in/kalam52526",
  href: "https://linkedin.com/in/kalam52526",
  icon: FaLinkedinIn,
};

/** GAP — Fiverr URL not yet confirmed by the site owner; using the value supplied. */
export const fiverr: ContactChannel = {
  id: "fiverr",
  label: "Fiverr",
  value: "fiverr.com/kalam52526",
  href: "https://www.fiverr.com/kalam52526",
  icon: SiFiverr,
};

/** GAP — Upwork URL not yet confirmed by the site owner; using the value supplied.
 *  Note: this replaces a different Upwork URL previously hardcoded in data/footer.ts
 *  (https://www.upwork.com/freelancers/~017a0f58caf2efb8d0, an Upwork internal-ID-style
 *  link) — flagged back to the site owner rather than silently dropped. */
export const upwork: ContactChannel = {
  id: "upwork",
  label: "Upwork",
  value: "upwork.com/freelancers/abukalamkhandaker",
  href: "https://www.upwork.com/freelancers/abukalamkhandaker",
  icon: SiUpwork,
};

/** Primary contact methods, in display order. */
export const primaryContactChannels: ContactChannel[] = [
  emailPrimary,
  emailSecondary,
  whatsapp,
  website,
];

/** Freelance/social profile links, in display order. */
export const profileContactChannels: ContactChannel[] = [linkedin, fiverr, upwork];
