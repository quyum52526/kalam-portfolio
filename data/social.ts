import type { IconType } from "react-icons";
import { SiFacebook, SiYoutube, SiInstagram, SiTelegram } from "react-icons/si";
// react-icons/si (Simple Icons) has no LinkedIn glyph (dropped upstream); fa6 fills the gap.
import { FaLinkedinIn } from "react-icons/fa6";
import { linkedin } from "./contact";

export interface SocialLink {
  name: string;
  href: string;
  icon: IconType;
}

/** Single source of truth for social links — footer and any future component read from here. */
export const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/pretestdesign",
    icon: SiFacebook,
  },
  {
    name: "LinkedIn",
    // Reuses data/contact.ts's canonical LinkedIn URL rather than hardcoding a second copy.
    href: linkedin.href,
    icon: FaLinkedinIn,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@kalam-5252",
    icon: SiYoutube,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/kalam52526/",
    icon: SiInstagram,
  },
  {
    name: "Telegram",
    href: "https://t.me/kalam52526",
    icon: SiTelegram,
  },
];
