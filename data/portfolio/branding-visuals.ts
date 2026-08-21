import type { PortfolioPage } from "@/types/portfolio";
import { projects } from "@/data/projects";

const DIGICODE_IT_DIR =
  "/all-featured-portfolio/featurd-logo/Digicode-IT";

const RF_TEQ_DIR = "/all-featured-portfolio/featurd-logo/RF-TEQ";

const RELENTAIL_DIR = "/all-featured-portfolio/featurd-logo/Relentail";

// Folder is "LMT-Agro" (capital A); the files inside are "LMT-agro-" (lowercase a) — kept
// exactly as they exist on disk, since Vercel deploys to a case-sensitive filesystem.
const LMT_AGRO_DIR = "/all-featured-portfolio/featurd-logo/LMT-Agro";

// Path segment is "featurd-business-card" (missing the "e" in "featured") — kept exactly as it
// exists on disk, since Vercel deploys to a case-sensitive filesystem.
const PEST_CONTROL_DIR = "/all-featured-portfolio/featurd-business-card/pest-control";

// Folder and files both lowercase "lmt-co-" throughout — no case mismatch to flag. Note the
// card-face file is named "...-font.svg" (not "-front") on disk, kept exactly as-is.
const LMT_CO_DIR = "/all-featured-portfolio/featurd-business-card/lmt-co-business-card";

// Folder is "Front-Line" (capital L); the files inside use "Front-line-" (lowercase l in
// "line") — kept exactly as they exist on disk, since Vercel deploys to a case-sensitive
// filesystem.
const FRONT_LINE_DIR = "/all-featured-portfolio/featurd-business-card/Front-Line";

const DALLAS_DIR = "/all-featured-portfolio/featurd-business-card/dallas";
// The back-image PNG's real on-disk filename is genuinely malformed — doubled, not a typo of a
// clean name: "dallas-business-carddallas-business-card-back.png". Confirmed by directory
// listing, not assumed. Kept exactly as-is per instruction rather than silently renamed.
const DALLAS_BACK_PNG = `${DALLAS_DIR}/dallas-business-carddallas-business-card-back.png`;

const T_SHIRT_DIFFERENT_DIR = "/all-featured-portfolio/T-shirt/Different";
const T_SHIRT_MY_CITY_DIR = "/all-featured-portfolio/T-shirt/my-city-my-kicks";
const T_SHIRT_YOU_ONLY_FAIL_DIR = "/all-featured-portfolio/T-shirt/you-only-fail";
const T_SHIRT_DISCIPLINE_DIR = "/all-featured-portfolio/T-shirt/discipline";

const GAP_PRINT_DETAILS = [
  { label: "Printing Instruction", value: "GAP", type: "text" as const },
  { label: "Material / Paper Stock", value: "GAP", type: "text" as const },
  { label: "Brand Color", value: "GAP", type: "color" as const },
];

export const brandingVisualsPage: PortfolioPage = {
  id: "branding-visuals",
  label: "Branding & Visuals",
  categories: [
    {
      id: "logo-design",
      name: "Logo Design",
      items: [
        {
          id: "digicode-it-logo",
          title: "DigiCode IT",
          thumbnail: `${DIGICODE_IT_DIR}/digicode-it-logo-mockup.png`,
          details: [
            {
              label: "Alternate Logo",
              value: `${DIGICODE_IT_DIR}/DIGICODEit-alternate.svg`,
              type: "image",
            },
            { label: "Brand Color", value: "#007BC4", type: "color" },
            { label: "Typography", value: "Montserrat / Open Sans", type: "text" },
            { label: "Complementary Background", value: "#EEF3F7", type: "color" },
          ],
          brandBoard: {
            tagline: "SOFTWARE · WEB · IT SOLUTIONS",
            hero: {
              image: `${DIGICODE_IT_DIR}/DIGICODEit-primary.svg`,
              alt: "DigiCode IT primary logo lockup",
            },
            logoOptions: {
              // No second full (icon + wordmark) lockup exists in the asset folder — only one
              // combined lockup (the primary) was supplied, plus the icon-only mark below.
              alternateLockup: null,
              icon: `${DIGICODE_IT_DIR}/DIGICODEit-alternate.svg`,
            },
            moodBoard: [
              `${DIGICODE_IT_DIR}/Mood board-01.jpg`,
              `${DIGICODE_IT_DIR}/Mood board-02.jpg`,
              `${DIGICODE_IT_DIR}/Mood board-03.jpg`,
              `${DIGICODE_IT_DIR}/Mood board-04.jpg`,
            ],
            // From the PDF's explicitly stated palette. The SVG's own fill colours (#007bc4,
            // #494e4a) are a subset of this and agree. Mood board-01.jpg separately prints its
            // own close-but-different swatches (#0077C8/#4A4D4D/#A6A6A6) — not used here since
            // the PDF is the designated palette source, but flagged as an unresolved discrepancy.
            palette: ["#007BC4", "#005A91", "#494E4A", "#101418", "#EEF3F7"],
            fonts: [
              { family: "Montserrat", usage: "HEADINGS · LOGOTYPE · LABELS" },
              { family: "Open Sans", usage: "BODY COPY · UI · DOCUMENTS" },
            ],
            rules: [
              "Icon alone at small sizes; full lockup everywhere else.",
              "Clear space around the mark equals one icon square.",
              "Blue leads, graphite supports, ink carries the text.",
              "Montserrat for headings, Open Sans for body. Nothing else.",
            ],
          },
        },
        {
          id: "rf-teq-logo",
          title: "RF-TEQ",
          thumbnail: `${RF_TEQ_DIR}/rftq-logo-mockup.jpeg`,
          details: [
            {
              label: "Alternate Logo",
              value: `${RF_TEQ_DIR}/Rfteq-logo-03.svg`,
              type: "image",
            },
            { label: "Brand Color", value: "#8CC63F", type: "color" },
            { label: "Typography", value: "UnisonPro / Open Sans", type: "text" },
            { label: "Complementary Background", value: "#F1F4EF", type: "color" },
          ],
          brandBoard: {
            tagline: "RADIO FREQUENCY TECHNIQUES",
            hero: {
              // Rfteq-logo-01.svg, not -05 — -05 is the all-graphite (#3d3d3d) full lockup,
              // which is IDENTICAL in luminance to darkestOf(palette) (#3D3D3D, this file's own
              // computed hero background) and would render invisible. -01 is the only lockup
              // with light-on-dark colouring (green "RF" + white "TEQ"), and its own baked-in
              // background rect happens to be the exact same #3d3d3d, so it seats with zero
              // seam. Trade-off: -01 also bakes in its own "RADIO FREQUENCY TECHNIQUES" caption,
              // so that line appears twice (once in the image, once as this board's own tagline
              // text below it) — accepted since the alternative is an invisible logo.
              image: `${RF_TEQ_DIR}/Rfteq-logo-01.svg`,
              alt: "RF-TEQ primary logo lockup",
            },
            logoOptions: {
              // Rfteq-logo-05.svg: icon + full "RFTEQ" wordmark (graphite, transparent) — a
              // genuine second full lockup, distinct from the hero. Rfteq-logo-04.svg (icon +
              // "RF" only, missing "TEQ") was left unused: it's a partial wordmark, not a full
              // one, and -05 already fills this slot more completely.
              alternateLockup: `${RF_TEQ_DIR}/Rfteq-logo-05.svg`,
              icon: `${RF_TEQ_DIR}/Rfteq-logo-03.svg`,
            },
            // brand-card.png is the only mood-board-suitable asset supplied for this brand
            // (the source PDF's own mood board section is empty placeholder tiles). The mood
            // board grid is built for four tiles (grid-cols-2); with a single image it renders
            // as one square tile in the left column with blank space to its right rather than
            // stretched across the block — left as-is since reshaping that grid for a
            // single-image case is shared BrandBoard layout logic, out of scope here.
            moodBoard: [`${RF_TEQ_DIR}/brand-card.png`],
            // From the PDF's stated palette. Cross-checked against the raw SVG fills/gradient
            // stops (#8fc740, #1a7f40, #217038, #3d3d3d, #fff) and they only partly agree: PDF
            // #8CC63F is a near-exact match to the SVG's gradient start #8fc740 (rounding-level
            // difference), and #3D3D3D matches exactly, but PDF #4F9843 and #248541 have no
            // close counterpart among the SVG's actual greens (#217038 solid, #1a7f40 gradient
            // end) — off by more than anti-aliasing. PDF used as the palette source (same as
            // the DigiCode precedent), discrepancy flagged rather than silently reconciled.
            palette: ["#8CC63F", "#4F9843", "#248541", "#3D3D3D", "#F1F4EF"],
            fonts: [
              // UnisonPro is not available via next/font/google (checked against Next's bundled
              // font-data.json — no match) — registered without a loaded font; the specimen
              // renders in the browser fallback rather than a substituted lookalike.
              { family: "UnisonPro", usage: "LOGOTYPE · HEADINGS · LABELS" },
              { family: "Open Sans", usage: "BODY COPY · UI · DOCUMENTS" },
            ],
            rules: [
              "Signal mark alone at small sizes; full lockup everywhere else.",
              "Clear space on all sides equals the height of the wave arcs.",
              "Green leads, graphite carries the text, off-white holds the page.",
              "UnisonPro for headings, Open Sans for body. Nothing else.",
            ],
          },
        },
        {
          id: "relentail-logo",
          title: "Relentail",
          thumbnail: `${RELENTAIL_DIR}/Relentail-Logo-Mockup.jpeg`,
          details: [
            {
              label: "Alternate Logo",
              value: `${RELENTAIL_DIR}/Relentail-Logo-03.svg`,
              type: "image",
            },
            { label: "Brand Color", value: "#206A73", type: "color" },
            { label: "Typography", value: "Minion Variable / Raleway", type: "text" },
            { label: "Complementary Background", value: "#FFFFFF", type: "color" },
          ],
          brandBoard: {
            // Visually confirmed: Relentail-Logo-01.svg bakes "ENDURE THE CURRENT" into the
            // artwork itself (below the wordmark). Rendering it again here would duplicate the
            // line, so the separate tagline text is dropped for this brand only — see
            // brandBoard.heroBg below for why the hero previously looked like it was missing
            // the wordmark and rendering the wrong file entirely; it wasn't.
            tagline: null,
            hero: {
              // Visually opened all four SVGs directly (not by filename/path-count) to confirm
              // this is the correct primary lockup: Logo-01 = turtle shell + flippers + tail
              // negative-space + "RELENTAIL" wordmark + "ENDURE THE CURRENT" tagline. Logo-02 is
              // a *different*, smaller mark (tail + waves only, no shell, no wordmark, tagline
              // baked in) — it was never wired into this slot, but on the previous dark hero
              // background Logo-01's shell and wordmark (both filled #212120) were invisible,
              // leaving only its own tail + waves visible — which reads identically to Logo-02
              // at a glance. That was a contrast bug (fixed via heroBg below), not a wrong file.
              // Content bounding box ~1047x931 within the 1200x1200 viewBox (aspect ~1.12:1,
              // near-square) — not the mostly-empty-canvas problem DigiCode's and RF-TEQ's
              // source files had, so no viewBox crop was needed. Verified against the hero-slot
              // sizing fix (fixed aspect-[840/225] box + object-contain): a near-square image
              // inside that wide box is height-bound, rendering narrower than DigiCode's/
              // RF-TEQ's wordmarks — expected, not a bug.
              image: `${RELENTAIL_DIR}/Relentail-Logo-01.svg`,
              alt: "Relentail primary logo lockup",
            },
            // Logo-01's shell + "RELENTAIL" wordmark are filled #212120 — this brand's own
            // darkest palette entry, and therefore also darkestOf(palette)'s computed default.
            // Same-colour-as-background is architectural here (the brand's own "ink" fill,
            // used consistently across all four provided files, all rect-less/transparent — no
            // asset swap sidesteps it the way RF-TEQ's alternate file did). Overridden to this
            // brand's own lightest palette entry, #FFFFFF (also the documented "Complementary
            // Background" above), which is exactly what the standalone SVG/PNG already render
            // against and reads with full contrast for every fill this brand uses.
            heroBg: "#FFFFFF",
            logoOptions: {
              // No second full (icon + wordmark) lockup exists — same as DigiCode's precedent.
              // Confirmed visually: Relentail-Logo-02.svg is tail + waves + tagline text (no
              // shell, no "RELENTAIL" wordmark) — a partial lockup with baked-in text, not a
              // clean icon and not a second full lockup either; excluded from both slots for
              // the same reason RF-TEQ's partial-wordmark file was excluded.
              alternateLockup: null,
              // Confirmed visually: Relentail-Logo-03.svg is the tail + waves mark alone (no
              // shell, no text) — matching the brand's own stated rule verbatim, "Tail mark
              // small, full lockup elsewhere." Relentail-Logo-04.svg is NOT a near-duplicate of
              // -03 as an earlier pass (going by path-count alone) concluded — opened directly,
              // it's the full turtle (shell + flippers + tail negative-space + waves, no text),
              // i.e. Logo-01's icon minus the wordmark. It doesn't match either named slot (not
              // the "tail mark" the rule describes, and not a wordmark lockup), so it's left
              // unused — a real gap in the available assets, not a guess forced into a slot.
              icon: `${RELENTAIL_DIR}/Relentail-Logo-03.svg`,
            },
            moodBoard: [`${RELENTAIL_DIR}/brand-card.png`],
            // From the PDF's stated palette. Cross-checked against the raw SVG fills (#1b233d,
            // #206a73, #212120, #231f20, #fff): #206A73, #212120, and #FFFFFF match exactly;
            // PDF's #164A50 and #8FB2B4 don't appear in any SVG fill, and the SVGs have two
            // near-black shades (#1b233d, #231f20) the PDF palette doesn't list — flagged, not
            // reconciled. brand-card.png (used for the mood board) shows a THIRD, unrelated
            // palette (#111111/#2A2A2A/#0D6B71/#4CA6AD/#FFFFFF) — also not used; PDF stays the
            // source per instruction.
            palette: ["#206A73", "#164A50", "#212120", "#8FB2B4", "#FFFFFF"],
            fonts: [
              // Minion Variable is not available via next/font/google (checked against Next's
              // bundled font-data.json — no match, and it's an Adobe-licensed font) —
              // registered without a loaded font; the specimen renders in the browser fallback.
              { family: "Minion Variable", usage: "WORDMARK · HEADINGS" },
              // PDF prints this specimen's own name as "RALEWAY BOLD" — normalized to "Raleway"
              // (see lib/fonts.ts) since "Bold" is a weight, not part of the family name.
              { family: "Raleway", usage: "TAGLINE · BODY · LABELS" },
            ],
            rules: [
              "Tail mark small, full lockup elsewhere.",
              "Clear space = height of the wave crest.",
              "Ink carries the shell, teal carries the water.",
              "Minion wordmark, Raleway everything else.",
            ],
          },
        },
        {
          id: "lmt-agro-logo",
          title: "LMT Agro",
          thumbnail: `${LMT_AGRO_DIR}/LMT-agro-logo-mockup.jpeg`,
          details: [
            // No separate icon-only or alternate-lockup file exists in the asset folder — only
            // one SVG/PNG pair was supplied, and it's the full lockup used in the hero slot
            // below. Rather than reuse that file here under a label implying a distinct asset,
            // this stays a GAP.
            { label: "Alternate Logo", value: "GAP", type: "image" },
            { label: "Brand Color", value: "#2A6B2C", type: "color" },
            { label: "Typography", value: "Poppins / Source Serif", type: "text" },
            { label: "Complementary Background", value: "#F6F4EA", type: "color" },
          ],
          brandBoard: {
            tagline: "FARMING TODAY, FEEDING TOMORROW",
            hero: {
              // LMT-agro-logo.svg — opened and visually confirmed: cow head + field icon +
              // "LMT AGRO" wordmark, i.e. the full primary lockup (matches the PDF's own
              // "LOGO ICONS" tile that includes the wordmark, not the icon-alone tile). No
              // tagline is baked into this artwork, unlike Relentail, so the board's separate
              // tagline text below is not a duplicate here and stays on.
              image: `${LMT_AGRO_DIR}/LMT-agro-logo.svg`,
              alt: "LMT Agro primary logo lockup",
            },
            // The mark's ink (navy cow head + wordmark, SVG fill #2b3252) sits almost exactly
            // on this brand's own darkest palette entry (#1E3159) — darkestOf(palette)'s
            // computed default — which would collide the same way Relentail's did. Overridden
            // to this brand's own lightest palette entry, #F6F4EA (verbatim from the PDF, and
            // also this item's "Complementary Background" above), which is the light-neutral
            // background the mark is actually designed against in the PDF's own logo tiles.
            heroBg: "#F6F4EA",
            logoOptions: {
              // Only one logo file was supplied for this brand — the full lockup already used
              // as the hero image. No second full lockup and no separate icon-only mark exist,
              // so both slots stay a real GAP (rendered as "To be added" placeholders) rather
              // than reusing the hero's wordmark-bearing file under either label.
              alternateLockup: null,
              icon: null,
            },
            moodBoard: [`${LMT_AGRO_DIR}/LMT-agro-brand-card.png`],
            // From the PDF's stated palette. Cross-checked against the raw SVG fills (#201d1e,
            // #2b3252, #2f612f, #89c040, #fae07e, #fff): #2b3252/#2f612f/#fae07e are close but
            // not exact matches to the PDF's #2B3357/#2A6B2C/#F2DE86 (off by a few hex steps —
            // rounding between the source file and the printed swatch, same pattern seen on
            // every other brand board so far). #fff (pure white, used for the cow's face patch)
            // isn't an exact match to the PDF's off-white #F6F4EA either. Two SVG fills have no
            // counterpart in the PDF palette at all: #201d1e (a near-black, used only for the
            // eye) and #89c040 (a second, lighter green not listed anywhere in the PDF's five
            // swatches) — flagged, not reconciled; PDF stays the palette source per precedent.
            palette: ["#1E3159", "#2B3357", "#2A6B2C", "#F2DE86", "#F6F4EA"],
            fonts: [
              { family: "Poppins", usage: "WORDMARK · HEADINGS · LABELS" },
              // PDF prints this specimen's own name as "Source Serif" with no version number —
              // see lib/fonts.ts for why it's loaded as the current "Source Serif 4" family.
              { family: "Source Serif", usage: "BODY COPY · DOCUMENTS" },
            ],
            rules: [
              "Field-and-cow mark alone at small sizes.",
              "Clear space = height of the cow's head.",
              "Navy carries the text, green and gold the fields.",
              "Poppins for headings, Source Serif for body.",
            ],
          },
        },
      ],
    },
    {
      id: "business-card-design",
      name: "Business Card Design",
      items: [
        {
          id: "lmt-co",
          title: "LMT CO",
          thumbnail: `${LMT_CO_DIR}/lmt-co-featurd-business-card.png`,
          details: [
            // Only one logo file was supplied — no separate alternate-lockup asset exists.
            { label: "Alternate Logo", value: "GAP", type: "image" },
            { label: "Brand Color", value: "#42C3E7", type: "color" },
            { label: "Typography", value: "GAP", type: "text" },
            { label: "Complementary Background", value: "#FFFFFF", type: "color" },
          ],
          brandBoard: {
            // No separate tagline text was supplied — the commitment paragraph below (given
            // verbatim in the task) fills that narrative role instead, same pattern as Reliable
            // Pest Control and Front Line Road Safety.
            tagline: null,
            hero: {
              // lmt-co-logo.svg — the only logo file: a navy-to-cyan gradient "LMT" mark plus
              // red-accented lettering, transparent background.
              image: `${LMT_CO_DIR}/lmt-co-logo.svg`,
              alt: "LMT CO primary logo lockup",
            },
            // The mark's own dark gradient stop (#16284f) is darkestOf(palette)'s computed
            // default and would collide with the navy swatch below — same failure class as
            // Relentail/LMT Agro/Front Line. No background rect is baked into the logo SVG
            // itself (fully transparent), so overridden to white rather than inventing a colour
            // the source material never specified.
            heroBg: "#FFFFFF",
            // Extracted directly from lmt-co-logo.svg's fill/stop-color attributes (grep'd, not
            // eyeballed) — its three distinct hues: navy gradient start #16284f, cyan gradient
            // end #42c3e7, and accent red #d12228. The two card-face SVGs
            // (lmt-co-business-card-font.svg, -back.svg) echo the same three families but with
            // minor hex drift per file — navy as #15294f/#2b3352, cyan as #43c5e8, red as
            // #d22328/#eb2127/#ed1c24 — none identical to the logo's own values or to each
            // other. Flagged, not reconciled; the logo's own fills are used as the source of
            // truth per the precedent set on every prior brand board here.
            palette: ["#16284F", "#42C3E7", "#D12228"],
            // Verbatim, as given.
            commitment:
              "Powering logistics, agriculture, and workforce solutions under one trusted name. We move, we grow, we supply.",
            servicePillars: ["LOGISTICS", "AGRO", "LABOR SUPPLY"],
            // Front and back card faces — SVG chosen over the also-available PNGs to match the
            // vector precedent set by every other card-face asset in this file (e.g. Front Line's
            // -back.svg/-front.svg).
            cardArtwork: [
              `${LMT_CO_DIR}/lmt-co-business-card-font.svg`,
              `${LMT_CO_DIR}/lmt-co-business-card-back.svg`,
            ],
            // COPIED DEFAULT FROM RELIABLE PEST CONTROL — not a confirmed real spec for this
            // brand. Placeholder until the actual print spec is supplied.
            printSpecs: [
              { label: "Size", value: "3.75 in × 2.25 in" },
              { label: "Paper", value: "300 GSM" },
              { label: "Colour Mode", value: "CMYK" },
              { label: "Finish", value: "Matt lamination" },
              { label: "Coating", value: "Spot UV" },
              { label: "Cut", value: "Round corner" },
            ],
          },
        },
        {
          id: "reliable-pest-control",
          title: "Reliable Pest Control",
          thumbnail: `${PEST_CONTROL_DIR}/pest-control-mockup.jpeg`,
          details: [
            { label: "Alternate Logo", value: "GAP", type: "image" },
            { label: "Brand Color", value: "#E07D2C", type: "color" },
            { label: "Typography", value: "GAP", type: "text" },
            { label: "Complementary Background", value: "#FFFFFF", type: "color" },
          ],
          brandBoard: {
            // No separate tagline text was supplied for this brand — the commitment paragraph
            // below fills that narrative role instead.
            tagline: null,
            hero: {
              // pest-control-logo.svg — the only logo file, orange-on-transparent wordmark +
              // bug mascot, no baked-in tagline or contact info.
              image: `${PEST_CONTROL_DIR}/pest-control-logo.svg`,
              alt: "Reliable Pest Control primary logo lockup",
            },
            // The mark is orange on white in its source presentation (confirmed by opening the
            // SVG directly — transparent background, reads cleanly against white). darkestOf(
            // palette) would otherwise pick #4A4D4D (the dark grey swatch), which the mark was
            // never designed against — overridden to keep the orange-on-white pairing intact.
            heroBg: "#FFFFFF",
            // This is a print/card project, not a logo-identity project — no logoOptions
            // (single logo file, no separate icon/alternate lockup), no fonts, no brand rules,
            // and no moodBoard (cardArtwork below takes that slot instead).
            // Verbatim from the mockup image, where these three hexes are printed directly next
            // to swatches. Cross-checked against the SVG's own fill values (below) — they don't
            // agree: the SVG's orange is #f37a20, a visibly different (brighter/more saturated)
            // orange than the mockup's stated #E07D2C. The two greys printed on the mockup
            // (#4A4D4D, #A6A6A6) don't appear anywhere in the logo SVG at all — the SVG's fill
            // list is only white (#fff) and orange (#f37a20), so the greys are evidently used
            // elsewhere in the identity (card background, service-pillar icons) rather than in
            // the mark itself. Flagged, not reconciled; the mockup's printed values are used
            // here per the same precedent as every prior brand board.
            palette: ["#E07D2C", "#4A4D4D", "#A6A6A6"],
            // Verbatim from the mockup's "COMMITMENT" block (reflowed from its narrow-column
            // line breaks into one paragraph; wording and punctuation unchanged).
            commitment:
              "Securing environments with advanced, integrated pest management. We inspect, we protect, we provide peace of mind.",
            // Verbatim labels from the mockup's three icon pillars.
            servicePillars: ["INSPECTION", "PROTECTION", "INTEGRATED SOLUTIONS"],
            cardArtwork: `${PEST_CONTROL_DIR}/pest-control-business-card.jpg`,
            printSpecs: [
              { label: "Size", value: "3.75 in × 2.25 in" },
              { label: "Paper", value: "300 GSM" },
              { label: "Colour Mode", value: "CMYK" },
              { label: "Finish", value: "Matt lamination" },
              { label: "Coating", value: "Spot UV" },
              { label: "Cut", value: "Round corner" },
            ],
          },
        },
        {
          id: "front-line-road-safety",
          title: "Front Line Road Safety",
          thumbnail: `${FRONT_LINE_DIR}/Front-line-mockup.jpeg`,
          details: [
            { label: "Alternate Logo", value: "GAP", type: "image" },
            { label: "Brand Color", value: "#F9D91E", type: "color" },
            { label: "Typography", value: "GAP", type: "text" },
            { label: "Complementary Background", value: "#0D0D0D", type: "color" },
          ],
          brandBoard: {
            // No separate tagline text on the mockup beyond the logo's own baked-in "ROAD
            // SAFETY" subtitle and the commitment paragraph below — same as Pest Control.
            tagline: null,
            hero: {
              // Front-line-logo.svg — the only logo file: "FRONT" (yellow) + "L|NE" (grey, with
              // a yellow divider bar) + "ROAD SAFETY" (grey), transparent background, no baked
              // contact info.
              image: `${FRONT_LINE_DIR}/Front-line-logo.svg`,
              alt: "Front Line Road Safety primary logo lockup",
            },
            // The logo's darker grey ("L|NE", #5b6670) has weak contrast against darkestOf(
            // palette)'s default (#4A4D4D, luminance ratio ~1.4 — close to invisible, the same
            // failure class as Relentail/LMT Agro). Overridden to #0D0D0D, sourced directly from
            // Front-line-business-card-front.svg's own background fill (.cls-7) rather than
            // invented — every one of the mark's three colours clears solid contrast against it
            // (yellow and light grey easily; the weak dark-grey case improves from ~1.4:1 to
            // ~3.6:1). This also matches how the identity is actually presented on its real
            // printed collateral, not just the marketing mockup's own dark gradient.
            heroBg: "#0D0D0D",
            // Verbatim from the mockup image's three swatches. Cross-checked against the actual
            // SVG fills across all three source files (logo.svg, business-card-front.svg,
            // business-card-back.svg — all consistent with each other): #ffd100, #a2a9ad,
            // #5b6670. None of the three mockup-printed hexes are close matches this time (unlike
            // every prior brand, where at least one swatch lined up closely) — #F9D91E vs #ffd100
            // differ by 30 in the blue channel alone, and neither grey (#4A4D4D, #C0C0C0) is
            // within a rounding distance of the SVGs' actual greys (#a2a9ad, #5b6670). Flagged,
            // not reconciled; the mockup's printed values are used per the same precedent as
            // every prior brand board.
            palette: ["#F9D91E", "#4A4D4D", "#C0C0C0"],
            // Verbatim from the mockup's "COMMITMENT" block (reflowed from its narrow-column
            // line breaks into one paragraph; wording, punctuation, and the repeated word
            // "engineered" unchanged).
            commitment:
              "Protecting road networks with advanced, engineered road safety systems. We analyze, we engineer, we provide engineered road environments.",
            // Verbatim labels from the mockup's three icon pillars.
            servicePillars: ["ROAD ASSESSMENT", "TRAFFIC PROTECTION", "INTEGRATED ROAD NETWORK SOLUTIONS"],
            // Three images exist; presenting all three rather than dropping any. Opened each
            // directly rather than trusting its filename — the file named "-front.svg" actually
            // contains the CONTACT/INFO side (name, title, phone, socials, address, on a
            // #0d0d0d background) and the file named "-back.svg" actually contains the
            // LOGO-ONLY brand side (large wordmark + address only, on a #282828 background) —
            // the opposite of normal business-card naming convention (front = brand face, back =
            // contact face). Ordered here by actual content, not filename: the combined
            // presentation photo first, then the logo-forward face (on-disk "-back.svg"), then
            // the contact/info face (on-disk "-front.svg").
            cardArtwork: [
              `${FRONT_LINE_DIR}/Front-line-business-card.jpg`,
              `${FRONT_LINE_DIR}/Front-line-business-card-back.svg`,
              `${FRONT_LINE_DIR}/Front-line-business-card-front.svg`,
            ],
            // The card-face SVGs' own viewBox (270×162, i.e. 1.667:1) matches the stated trim
            // size (3.75in × 2.25in, i.e. 1.667:1) exactly — no contradiction to flag.
            printSpecs: [
              { label: "Size", value: "3.75 in × 2.25 in" },
              { label: "Paper", value: "300 GSM" },
              { label: "Colour Mode", value: "CMYK" },
              { label: "Finish", value: "Matt lamination" },
              { label: "Coating", value: "Spot UV" },
              { label: "Cut", value: "Round corner" },
            ],
          },
        },
        {
          id: "dallas-safecracker",
          title: "Dallas Safecracker",
          thumbnail: `${DALLAS_DIR}/dallas-featurd-business-card.jpg`,
          details: [
            // No separate alternate-lockup asset — dallas-logo-white.png looks like a colour
            // variant by name, but opened directly it's a different, partial composition (just
            // the "SAFECRACKER" sub-wordmark + safe-dial icon, in black, missing the "DALLAS"
            // city-skyline mark entirely) — not usable as a full alternate lockup, so left GAP
            // rather than presented as one.
            { label: "Alternate Logo", value: "GAP", type: "image" },
            { label: "Brand Color", value: "#2F7C3E", type: "color" },
            { label: "Typography", value: "GAP", type: "text" },
            { label: "Complementary Background", value: "#FFFFFF", type: "color" },
          ],
          brandBoard: {
            tagline: null,
            hero: {
              // dallas-logo.png — the only complete lockup (green Dallas skyline badge +
              // "DALLAS" wordmark + integrated black/white safe-dial icon). No SVG version
              // exists for this file (unlike every other brand board here) — PNG used as-is.
              image: `${DALLAS_DIR}/dallas-logo.png`,
              alt: "Dallas Safecracker primary logo lockup",
            },
            // The safe-dial icon's own rim/pupil are near-black (#231f20, extracted below) —
            // colliding with darkestOf(palette)'s computed default the same way every prior
            // near-black-mark brand did. The source PNG's own canvas is white/transparent, so
            // overridden to white rather than inventing a colour.
            heroBg: "#FFFFFF",
            // No vector logo exists to extract fill values from directly. Extracted instead from
            // the two card-face SVGs' fill attributes (grep'd, not eyeballed) — front: #2f7c3e
            // (12x, the icon/name-accent green), #231f20 (6x, body text + divider line), #fff
            // (background). Back: #0d0d0d (background rect — a different near-black than the
            // front's #231f20, flagged not reconciled) and #fff (text). Cross-checked visually
            // against dallas-logo.png itself: green city-skyline badge, black/white safe-dial —
            // consistent with these three values, so used as the palette despite having no
            // direct-from-logo hex source.
            palette: ["#2F7C3E", "#231F20", "#FFFFFF"],
            // Verbatim, as given.
            commitment:
              "Fast, discreet lock and safe solutions when you need them most. We open, we secure, we protect.",
            servicePillars: ["LOCKOUT SERVICE", "SAFE CRACKING", "SECURITY SOLUTIONS"],
            // PNGs used for both faces, NOT the also-available SVGs (a deviation from the
            // SVG-preferred precedent set by Front Line/LMT CO) — both
            // dallas-business-card-front.svg and -back.svg embed their corner logo via
            // xlink:href="J:\BUSINESS CARD\BUSINES CARD\Dallas\logo.png", an absolute path on
            // the original designer's own Windows machine. That reference resolves nowhere
            // outside that machine, so rendering either SVG here would show the card with its
            // logo watermark missing. The PNGs are flattened exports with no such dependency.
            // Back-image filename is genuinely malformed on disk (doubled, not a typo) — see
            // DALLAS_BACK_PNG above; used verbatim per instruction rather than renamed.
            cardArtwork: [
              `${DALLAS_DIR}/dallas-business-card-font.png`,
              DALLAS_BACK_PNG,
            ],
            // COPIED DEFAULT FROM RELIABLE PEST CONTROL — not a confirmed real spec for this
            // brand. Placeholder until the actual print spec is supplied.
            printSpecs: [
              { label: "Size", value: "3.75 in × 2.25 in" },
              { label: "Paper", value: "300 GSM" },
              { label: "Colour Mode", value: "CMYK" },
              { label: "Finish", value: "Matt lamination" },
              { label: "Coating", value: "Spot UV" },
              { label: "Cut", value: "Round corner" },
            ],
          },
        },
      ],
    },
    {
      id: "t-shirt-design",
      name: "T-Shirt Design",
      // Garment photos are portrait — the default 1:1 square would crop them top/bottom. Both
      // items below now have a brandBoard, so ItemCard renders both with object-contain (not
      // object-cover) — neither thumbnail gets cropped, only letterboxed if its real ratio isn't
      // exactly 4:5 (my-city-my-kicks-mockup.jpg is 1728x2442, ~0.708 — it'll letterbox left/
      // right by ~5.8% each side; T-shirt-mockup.png is exactly 4:5, so it fills edge to edge).
      aspectRatio: "4/5",
      items: [
        {
          id: "my-city-my-kicks-tshirt",
          title: "My City My Kicks",
          thumbnail: `${T_SHIRT_MY_CITY_DIR}/my-city-my-kicks-mockup.jpg`,
          details: [
            { label: "Print Method", value: "Screen print", type: "text" },
            { label: "Fabric Color", value: "#F26722", type: "color" },
            {
              label: "Variations",
              value: [`${T_SHIRT_MY_CITY_DIR}/my-city-my-kicks.svg`],
              type: "image",
            },
          ],
          brandBoard: {
            tagline: null,
            heroLayout: "photo",
            hero: {
              image: `${T_SHIRT_MY_CITY_DIR}/my-city-my-kicks-mockup.jpg`,
              alt: '"My City My Kicks" t-shirt design on white and black tees, hanging',
            },
            // my-city-my-kicks.svg is a real, drawable file (27 flat-filled <path> elements,
            // no gradients/embedded images) — used directly, no PNG fallback needed. It has no
            // <text>/<tspan>/font-family at all: every letterform was converted to outline
            // paths before export, so there's no embedded-font risk (nothing depends on a
            // font being available) and, for the same reason, no live text node to read the
            // wording from — "CHATTOGRAM" / "my city my kicks" is read off the rendered
            // artwork, confirmed consistent across the flat art and both mockup shirts.
            secondaryImage: {
              label: "Garment Preview",
              // T-shirt-template.png here is byte-identical (checksum-verified) to the one in
              // the "Different" folder — still blank, no artwork composited. Reusing the hero
              // mockup photo again, same as "Different".
              image: `${T_SHIRT_MY_CITY_DIR}/my-city-my-kicks-mockup.jpg`,
              alt: '"My City My Kicks" design on a white tee, detail view',
            },
            // Hex values extracted from the SVG's own fill="" attributes (grep'd, not
            // eyeballed): #F26722 orange (16 of 27 paths — "CHATTOGRAM" + script text),
            // #010101 near-black (9 paths — skyline), #231F20 a second, very slightly
            // different near-black (1 path), #5EC7D0 teal (1 path — shoe accent stripe).
            // Unlike "Different", only one flat-artwork file was supplied here — no separate
            // dark-garment (white-ink) SVG/PNG exists, so these 4 hexes cover the light-garment
            // colourway only. The white-ink dark-garment version is visible in the mockup photo
            // (both shirts show the same teal accent; the headline/skyline/script switch from
            // orange+black to white) but isn't a separate sampleable file, so it's described in
            // the copy below rather than added here as an unverified swatch.
            palette: ["#F26722", "#010101", "#231F20", "#5EC7D0"],
            designSpecs: {
              label: "Design Details",
              items: [
                { label: "Design Name", value: "My City My Kicks" },
                { label: "Garment Colours", value: "Black, White" },
                { label: "Orientation", value: "Portrait (1:1.41)" },
                { label: "Typography", value: "Bold western slab + brush script" },
              ],
            },
            description: {
              label: "Design Details",
              body: 'A hometown streetwear graphic pairing "CHATTOGRAM" — set in a bold, ribboned western display face — with a hand-drawn harbour skyline (a tower with an observation deck, port cranes) silhouetted over a stylized sneaker outline in a constant teal accent stripe. "my city my kicks" runs beneath in a loose brush script. On light garments the print runs orange (headline + script) and black (skyline); on dark garments the headline, skyline, and script all switch to white while the teal accent stays the same.',
            },
            cardArtwork: `${T_SHIRT_MY_CITY_DIR}/my-city-my-kicks.svg`,
            // Print method, placement, print size, and DPI are not verifiable from the
            // supplied assets — reasonable working values, not confirmed production specs,
            // mirroring "Different"'s (near-identical artwork proportions: viewBox ratio
            // ~0.707 here vs ~0.708 there). Garment Colour Guidance is the one row here that
            // IS fact, derived from the SVG palette above plus the mockup photo.
            printSpecs: [
              { label: "Print Method", value: "Screen print" },
              { label: "Placement", value: "Full front, chest–torso" },
              { label: "Print Size", value: "≈11 in × 15.5 in" },
              {
                label: "Garment Colour Guidance",
                value: "Orange/black print on light garments · white print on dark garments (teal accent unchanged)",
              },
            ],
          },
        },
        {
          id: "different-tshirt",
          title: "Different",
          thumbnail: `${T_SHIRT_DIFFERENT_DIR}/T-shirt-mockup.png`,
          details: [
            { label: "Print Method", value: "Screen print", type: "text" },
            { label: "Fabric Color", value: "#000000", type: "color" },
            {
              label: "Variations",
              value: [
                `${T_SHIRT_DIFFERENT_DIR}/Different-black.png`,
                `${T_SHIRT_DIFFERENT_DIR}/Different-white.png`,
              ],
              type: "image",
            },
          ],
          brandBoard: {
            tagline: null,
            heroLayout: "photo",
            hero: {
              image: `${T_SHIRT_DIFFERENT_DIR}/T-shirt-mockup.png`,
              alt: '"Different" t-shirt design on white and black tees, hanging',
            },
            // Different-black.svg / Different-white.svg are both empty stub exports —
            // <svg viewBox="0 0 595.276 841.89"/>, zero drawable content, confirmed by
            // opening them directly. PNGs used for both artwork slots below instead.
            secondaryImage: {
              label: "Garment Preview",
              // T-shirt-template.png (the "blank template" asset) has no artwork composited
              // on it — opened directly, both shirts are bare, no design applied. There's no
              // separate rendered "design on a white tee" asset distinct from the hero photo,
              // so the same mockup photo is reused here; it already shows the design applied
              // to a white tee (the left-hand shirt in that shot).
              image: `${T_SHIRT_DIFFERENT_DIR}/T-shirt-mockup.png`,
              alt: '"Different" design on a white tee, detail view',
            },
            // Ink colours extracted by sampling raw pixel data (via sharp), not eyeballed —
            // the SVGs that would normally be the palette source are empty. Different-black.png:
            // #000000 covers 15.76% of the canvas (343,067px). Different-white.png: #FFFFFF
            // covers 15.70% (341,726px), plus a small #000000 accent at 0.03% (760px, the
            // vertical "others" word). Both files share an identical #FFF400 yellow
            // corner-bracket accent — the exact same pixel count (59,018px) in both files,
            // confirming it's the same shape/position, only the main ink recoloured.
            palette: ["#000000", "#FFFFFF", "#FFF400"],
            designSpecs: {
              label: "Design Details",
              items: [
                { label: "Design Name", value: "Different" },
                { label: "Garment Colours", value: "Black, White" },
                { label: "Orientation", value: "Portrait (1:1.41)" },
                { label: "Typography", value: "Bold italic display + grotesque sans" },
              ],
            },
            description: {
              label: "Design Details",
              body: 'A typographic streetwear graphic built around the word "Different" — set twice, once inside a rough diagonal-hatch stamp and once in a clean yellow-bordered box — bridging a short manifesto line at the top with the bold call-out "INSPIRES" at the bottom. Yellow corner-bracket rules frame the composition, echoing gig-poster and zine layouts. Ink swaps from black (on light garments) to white (on dark garments); the yellow accent and layout stay identical across both.',
            },
            cardArtwork: `${T_SHIRT_DIFFERENT_DIR}/Different-white.png`,
            // Print method, placement, print size, and DPI are not verifiable from the
            // supplied assets — reasonable working values, not confirmed production specs.
            // Garment Colour Guidance is the one row here that IS fact, derived directly from
            // the pixel analysis above.
            printSpecs: [
              { label: "Print Method", value: "Screen print" },
              { label: "Placement", value: "Full front, chest–torso" },
              { label: "Print Size", value: "≈11 in × 15.5 in" },
              {
                label: "Garment Colour Guidance",
                value: "Black ink on light garments · white ink on dark garments",
              },
            ],
          },
        },
        {
          id: "you-only-fail-tshirt",
          title: "You Only Fail",
          thumbnail: `${T_SHIRT_YOU_ONLY_FAIL_DIR}/you-only-fail-mockup.png`,
          details: [
            { label: "Print Method", value: "Screen print", type: "text" },
            { label: "Fabric Color", value: "#000000", type: "color" },
            {
              label: "Variations",
              value: [
                `${T_SHIRT_YOU_ONLY_FAIL_DIR}/you-only-fail-black.png`,
                `${T_SHIRT_YOU_ONLY_FAIL_DIR}/you-only-fail-white.png`,
                `${T_SHIRT_YOU_ONLY_FAIL_DIR}/you-only-fail-black.svg`,
                `${T_SHIRT_YOU_ONLY_FAIL_DIR}/you-only-fail-white.svg`,
              ],
              type: "image",
            },
          ],
          brandBoard: {
            tagline: null,
            heroLayout: "photo",
            hero: {
              image: `${T_SHIRT_YOU_ONLY_FAIL_DIR}/you-only-fail-mockup.png`,
              alt: '"You Only Fail" t-shirt design on white and black tees, hanging',
            },
            secondaryImage: {
              label: "Garment Preview",
              image: `${T_SHIRT_YOU_ONLY_FAIL_DIR}/you-only-fail-mockup.png`,
              alt: '"You Only Fail" design on a white tee, detail view',
            },
            palette: ["#000000", "#FFFFFF"],
            designSpecs: {
              label: "Design Details",
              items: [
                { label: "Design Name", value: "You Only Fail" },
                { label: "Garment Colours", value: "Black, White" },
                { label: "Orientation", value: "Portrait" },
                { label: "Typography", value: "Bold condensed display" },
              ],
            },
            description: {
              label: "Design Details",
              body: 'A motivational typographic graphic built around the message "FAILURE — YOU ONLY FAIL WHEN YOU STOP TRYING". The high-contrast composition is prepared in black-ink and white-ink colourways for light and dark garments.',
            },
            cardArtwork: `${T_SHIRT_YOU_ONLY_FAIL_DIR}/you-only-fail-white.png`,
            printSpecs: [
              { label: "Print Method", value: "Screen print" },
              { label: "Placement", value: "Full front, chest–torso" },
              { label: "Garment Colour Guidance", value: "Black ink on light garments · white ink on dark garments" },
            ],
          },
        },
        {
          id: "discipline-tshirt",
          title: "Discipline",
          thumbnail: `${T_SHIRT_DISCIPLINE_DIR}/discipline-mockup.png`,
          details: [
            { label: "Print Method", value: "Screen print", type: "text" },
            { label: "Fabric Color", value: "#000000", type: "color" },
            {
              label: "Variations",
              value: [
                `${T_SHIRT_DISCIPLINE_DIR}/discipline-black.png`,
                `${T_SHIRT_DISCIPLINE_DIR}/discipline-white.png`,
                `${T_SHIRT_DISCIPLINE_DIR}/discipline-black.svg`,
                `${T_SHIRT_DISCIPLINE_DIR}/discipline-white.svg`,
              ],
              type: "image",
            },
          ],
          brandBoard: {
            tagline: null,
            heroLayout: "photo",
            hero: {
              image: `${T_SHIRT_DISCIPLINE_DIR}/discipline-mockup.png`,
              alt: '"Discipline" t-shirt design on white and black tees, hanging',
            },
            secondaryImage: {
              label: "Garment Preview",
              image: `${T_SHIRT_DISCIPLINE_DIR}/discipline-mockup.png`,
              alt: '"Discipline" design on a white tee, detail view',
            },
            palette: ["#000000", "#FFFFFF"],
            designSpecs: {
              label: "Design Details",
              items: [
                { label: "Design Name", value: "Discipline" },
                { label: "Garment Colours", value: "Black, White" },
                { label: "Orientation", value: "Portrait" },
                { label: "Typography", value: "Bold condensed display" },
              ],
            },
            description: {
              label: "Design Details",
              body: 'A motivational typographic design built around the message "DISCIPLINE IS DOING WHAT YOU HATE TO DO, BUT ANYWAY". The artwork is prepared in black-ink and white-ink colourways for light and dark garments.',
            },
            cardArtwork: `${T_SHIRT_DISCIPLINE_DIR}/discipline-white.png`,
            printSpecs: [
              { label: "Print Method", value: "Screen print" },
              { label: "Placement", value: "Full front, chest–torso" },
              { label: "Garment Colour Guidance", value: "Black ink on light garments · white ink on dark garments" },
            ],
          },
        },
      ],
    },
    {
      id: "packaging-design",
      name: "Packaging Design",
      items: [
        {
          id: "moomilk-packaging",
          title: "MooMilk Packaging",
          thumbnail: "/Graphics/moomilk-packaging.jpeg",
          details: GAP_PRINT_DETAILS,
        },
      ],
    },
  ],
  allWork: projects
    .filter((p) => p.category === "design")
    .map((p) => ({
      id: p.id,
      title: p.title,
      image: p.thumbnailUrl || p.imageUrl || "",
    })),
};
