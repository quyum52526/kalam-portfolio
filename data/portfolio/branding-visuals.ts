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
          thumbnail: `${DIGICODE_IT_DIR}/digicode-it-logo-mockup.jpg`,
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
          id: "business-card-01",
          // Card reads "Arnaud DUJARRIER — Digital Learning consultant" — a personal
          // consulting practice, no separate business name. Was "Business Card Design 01"
          // (generic, indistinguishable from -02); renamed with the user's approval.
          title: "Arnaud Dujarrier",
          thumbnail: "/Graphics/business-ard-01.jpg",
          details: GAP_PRINT_DETAILS,
        },
        {
          id: "business-card-02",
          // Card's business name is "Weedy Good Tees" (owner: Jams Bean). Was "Business Card
          // Design 02" (generic, indistinguishable from -01); renamed with the user's approval.
          title: "Weedy Good Tees",
          thumbnail: "/Graphics/business-ard-02.jpg",
          details: GAP_PRINT_DETAILS,
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
      ],
    },
    {
      id: "t-shirt-design",
      name: "T-Shirt Design",
      items: [
        {
          id: "tshirt-design-01",
          title: "T-Shirt Design 01",
          thumbnail: "/Graphics/t-shirt-01.png",
          details: [
            { label: "Print Method", value: "GAP", type: "text" },
            { label: "Fabric Color", value: "GAP", type: "color" },
            { label: "Variations", value: "GAP", type: "image" },
          ],
        },
        {
          id: "tshirt-design-02",
          title: "T-Shirt Design 02",
          thumbnail: "/Graphics/t-shirt-02.jpg",
          details: [
            { label: "Print Method", value: "GAP", type: "text" },
            { label: "Fabric Color", value: "GAP", type: "color" },
            { label: "Variations", value: "GAP", type: "image" },
          ],
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
