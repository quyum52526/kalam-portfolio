import { Montserrat, Open_Sans, Poppins, Raleway, Source_Serif_4 } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });
// Relentail's brand board prints this specimen's own name as "RALEWAY BOLD" — normalized to
// the registry key "Raleway" (the real Google Fonts family; "Bold" is a weight, not part of
// the family name) and loaded at weight 700 to honor the stated weight.
const raleway = Raleway({ subsets: ["latin"], weight: ["700"], display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });
// LMT Agro's brand board prints this specimen's own name as "Source Serif", no version number,
// but the classic "Source Serif Pro" family isn't in Google Fonts' current catalog — only
// "Source Serif 4" is. Registered under the registry key "Source Serif" (verbatim from the PDF)
// while loading the real available family, so the specimen isn't a browser fallback font.
const sourceSerif = Source_Serif_4({ subsets: ["latin"], weight: ["400"], display: "swap" });

/** Maps a brand-board font family name (as read from its PDF, e.g. BrandBoardFont.family) to a
 *  loaded next/font/google instance, so a font specimen can render in the real typeface instead
 *  of a fallback. Add an entry here when a new brand board introduces a family not yet listed. */
export const fontRegistry: Record<string, { className: string }> = {
  Montserrat: montserrat,
  "Open Sans": openSans,
  Raleway: raleway,
  Poppins: poppins,
  "Source Serif": sourceSerif,
};
