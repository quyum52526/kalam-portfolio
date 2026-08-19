import { Montserrat, Open_Sans } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

/** Maps a brand-board font family name (as read from its PDF, e.g. BrandBoardFont.family) to a
 *  loaded next/font/google instance, so a font specimen can render in the real typeface instead
 *  of a fallback. Add an entry here when a new brand board introduces a family not yet listed. */
export const fontRegistry: Record<string, { className: string }> = {
  Montserrat: montserrat,
  "Open Sans": openSans,
};
