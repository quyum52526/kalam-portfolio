import type { PortfolioPage } from "@/types/portfolio";
import { projects } from "@/data/projects";

const DATING_APP_AD_VIDEO_ID = "zhI1k2TdGPQ";
// maxresdefault.jpg confirmed live for this video (curl -I → 200, downloaded and verified as a
// real 1280x720 JPEG, not YouTube's ~8-10KB grey placeholder that some videos return with a
// false 200) — used directly, no hqdefault.jpg fallback needed.
const DATING_APP_AD_THUMBNAIL = `https://i.ytimg.com/vi/${DATING_APP_AD_VIDEO_ID}/maxresdefault.jpg`;

const TYPESCRIPT_VIDEO_ID = "L6zrC7gkVwI";
const TYPESCRIPT_VIDEO_THUMBNAIL = `https://i.ytimg.com/vi/${TYPESCRIPT_VIDEO_ID}/hqdefault.jpg`;

const HOME_GUARANTEE_VIDEO_ID = "jaETednE6p8";
const HOME_GUARANTEE_VIDEO_THUMBNAIL = `https://i.ytimg.com/vi/${HOME_GUARANTEE_VIDEO_ID}/hqdefault.jpg`;

const BNB_NTE_VIDEO_ID = "TN3taR07EUM";
const BNB_NTE_VIDEO_THUMBNAIL = `https://i.ytimg.com/vi/${BNB_NTE_VIDEO_ID}/hqdefault.jpg`;

const DIRT_BIKE_ADVENTURE_VIDEO_ID = "yyUo_-jOM80";
const DIRT_BIKE_ADVENTURE_VIDEO_THUMBNAIL = `https://i.ytimg.com/vi/${DIRT_BIKE_ADVENTURE_VIDEO_ID}/hqdefault.jpg`;

const FIVERR_GIG_INTRO_VIDEO_ID = "hm0U5f6BOnY";
const FIVERR_GIG_INTRO_VIDEO_THUMBNAIL = `https://i.ytimg.com/vi/${FIVERR_GIG_INTRO_VIDEO_ID}/hqdefault.jpg`;

const AI_VIDEO_WORKFLOW_VIDEO_ID = "caEnQ_cEnWw";
const AI_VIDEO_WORKFLOW_VIDEO_THUMBNAIL = `https://i.ytimg.com/vi/${AI_VIDEO_WORKFLOW_VIDEO_ID}/hqdefault.jpg`;

const NEW_AI_VIDEO_ID = "1MLkcrXVdnw";
const NEW_AI_VIDEO_THUMBNAIL = `https://i.ytimg.com/vi/${NEW_AI_VIDEO_ID}/hqdefault.jpg`;

const ANANTA_LOGO_ANIMATION_VIDEO_ID = "FzJZ3pWoOsA";
const ANANTA_LOGO_ANIMATION_VIDEO_THUMBNAIL = `https://i.ytimg.com/vi/${ANANTA_LOGO_ANIMATION_VIDEO_ID}/hqdefault.jpg`;

export const aiGenerativePage: PortfolioPage = {
  id: "ai-generative",
  label: "AI & Generative",
  categories: [
    {
      id: "ai-video",
      // ASSUMED — propose "AI Video" as the group name; confirm or rename.
      name: "AI Video",
      // Video thumbnails are 16:9 — the default 1:1 square would crop them top/bottom.
      aspectRatio: "16/9",
      items: [
        {
          id: "ananta-event-entertainment-logo-animation",
          title: "Ananta Event & Entertainment — Logo Animation Reveal | Motion Graphics Portfolio",
          thumbnail: ANANTA_LOGO_ANIMATION_VIDEO_THUMBNAIL,
          details: [
            { label: "Format", value: "16:9 video", type: "text" },
            { label: "Platform", value: "YouTube", type: "text" },
          ],
          videoBoard: {
            videoId: ANANTA_LOGO_ANIMATION_VIDEO_ID,
            videoTitle:
              "Ananta Event & Entertainment — Logo Animation Reveal | Motion Graphics Portfolio",
            thumbnail: ANANTA_LOGO_ANIMATION_VIDEO_THUMBNAIL,
            overview:
              "A logo animation reveal for Ananta Event & Entertainment, presenting the identity through motion graphics and a polished visual finish.",
            specs: [
              { label: "Aspect Ratio", value: "16:9" },
              { label: "Format", value: "MP4, YouTube upload" },
            ],
            pipeline: [
              "Logo identity preparation for motion",
              "Motion graphics animation and reveal timing",
              "Final edit and polish for a branded presentation",
            ],
            youtubeUrl: `https://youtu.be/${ANANTA_LOGO_ANIMATION_VIDEO_ID}`,
          },
        },
        {
          id: "new-ai-video",
          title: "They All Use AI — Simple AI Explainer Series | Motion Graphics Portfolio (Module 3/90)",
          thumbnail: NEW_AI_VIDEO_THUMBNAIL,
          details: [
            { label: "Format", value: "16:9 video", type: "text" },
            { label: "Platform", value: "YouTube", type: "text" },
          ],
          videoBoard: {
            videoId: NEW_AI_VIDEO_ID,
            videoTitle:
              "They All Use AI — Simple AI Explainer Series | Motion Graphics Portfolio (Module 3/90)",
            thumbnail: NEW_AI_VIDEO_THUMBNAIL,
            overview:
              "An AI-generated video project showcasing generative visual storytelling and production craft.",
            specs: [
              { label: "Aspect Ratio", value: "16:9" },
              { label: "Format", value: "MP4, YouTube upload" },
            ],
            pipeline: [
              "AI-assisted visual development",
              "Generative video production and shot selection",
              "Final edit and pacing for a polished presentation",
            ],
            youtubeUrl: `https://youtu.be/${NEW_AI_VIDEO_ID}`,
          },
        },
        {
          id: "ai-video-workflow-breakdown",
          title: "From Prompt to Premium: AI Video Workflow Breakdown (Veo3 + CapCut)",
          thumbnail: AI_VIDEO_WORKFLOW_VIDEO_THUMBNAIL,
          details: [
            { label: "Format", value: "16:9 video", type: "text" },
            { label: "Platform", value: "YouTube", type: "text" },
          ],
          videoBoard: {
            videoId: AI_VIDEO_WORKFLOW_VIDEO_ID,
            videoTitle:
              "From Prompt to Premium: AI Video Workflow Breakdown (Veo3 + CapCut) — Under 2 Hours",
            thumbnail: AI_VIDEO_WORKFLOW_VIDEO_THUMBNAIL,
            overview:
              "A practical breakdown of an AI video workflow, following the process from prompt development to a polished final edit using Veo3 and CapCut.",
            specs: [
              { label: "Aspect Ratio", value: "16:9" },
              { label: "Format", value: "MP4, YouTube upload" },
            ],
            pipeline: [
              "Prompt development and AI video generation with Veo3",
              "Shot selection and sequence assembly",
              "Final edit, pacing, and captions in CapCut",
            ],
            youtubeUrl: `https://youtu.be/${AI_VIDEO_WORKFLOW_VIDEO_ID}`,
          },
        },
        {
          id: "fiverr-gig-intro",
          title: "Fiverr Gig Intro — Professional Video Editor & Motion Graphics Showreel",
          thumbnail: FIVERR_GIG_INTRO_VIDEO_THUMBNAIL,
          details: [
            { label: "Format", value: "16:9 video", type: "text" },
            { label: "Platform", value: "YouTube", type: "text" },
          ],
          videoBoard: {
            videoId: FIVERR_GIG_INTRO_VIDEO_ID,
            videoTitle:
              "Fiverr Gig Intro — Professional Video Editor & Motion Graphics Showreel",
            thumbnail: FIVERR_GIG_INTRO_VIDEO_THUMBNAIL,
            overview:
              "A professional Fiverr gig introduction presenting video editing, motion graphics, and showreel work in a concise portfolio format.",
            specs: [
              { label: "Aspect Ratio", value: "16:9" },
              { label: "Format", value: "MP4, YouTube upload" },
            ],
            pipeline: [
              "Video editing and showreel sequencing",
              "Motion graphics and branded presentation",
              "Portfolio-focused pacing for a freelance service intro",
            ],
            youtubeUrl: `https://youtu.be/${FIVERR_GIG_INTRO_VIDEO_ID}`,
          },
        },
        {
          id: "dirt-bike-adventure-edit",
          title: "Dirt Bike Adventure Edit — Off-Road Forest Trails, Cliff Jumps & Beach Rides",
          thumbnail: DIRT_BIKE_ADVENTURE_VIDEO_THUMBNAIL,
          details: [
            { label: "Format", value: "16:9 video", type: "text" },
            { label: "Platform", value: "YouTube", type: "text" },
          ],
          videoBoard: {
            videoId: DIRT_BIKE_ADVENTURE_VIDEO_ID,
            videoTitle:
              "Dirt Bike Adventure Edit — Off-Road Forest Trails, Cliff Jumps & Beach Rides",
            thumbnail: DIRT_BIKE_ADVENTURE_VIDEO_THUMBNAIL,
            overview:
              "An energetic dirt-bike adventure edit moving through off-road forest trails, cliff jumps, and beach rides with a cinematic, action-focused pace.",
            specs: [
              { label: "Aspect Ratio", value: "16:9" },
              { label: "Format", value: "MP4, YouTube upload" },
            ],
            pipeline: [
              "Adventure footage selection and sequencing",
              "Action-focused edit with cinematic pacing",
              "Colour and sound treatment for an immersive ride experience",
            ],
            youtubeUrl: `https://youtu.be/${DIRT_BIKE_ADVENTURE_VIDEO_ID}`,
          },
        },
        {
          id: "dating-app-ad",
          // Exact title from the YouTube oEmbed API (fetched live, not guessed) — short enough
          // to use verbatim as the card label (36 characters, one line at normal card widths).
          title: "The hardest part of a dating app ad",
          thumbnail: DATING_APP_AD_THUMBNAIL,
          details: [
            { label: "Format", value: "16:9 video", type: "text" },
            { label: "Platform", value: "YouTube", type: "text" },
          ],
          videoBoard: {
            videoId: DATING_APP_AD_VIDEO_ID,
            videoTitle: "The hardest part of a dating app ad",
            thumbnail: DATING_APP_AD_THUMBNAIL,
            // ASSUMED — I haven't watched the video; this is inferred from the title and the
            // channel's own name ("Abu Kalam Khandaker's Perspective," a commentary-style
            // channel, not a raw reel) rather than verified content.
            overview:
              "A behind-the-scenes look at producing a short-form dating-app advertisement — the creative and technical challenge of making an ad concept land in just a few seconds. Part of an ongoing series on AI-assisted video production.",
            specs: [
              // ASSUMED — duration and format aren't available from the oEmbed response.
              { label: "Duration", value: "0:30" },
              // FACT — maxresdefault.jpg downloaded and measured at 1280x720.
              { label: "Aspect Ratio", value: "16:9" },
              { label: "Format", value: "MP4, YouTube upload" },
            ],
            // ASSUMED — the specific tools/workflow aren't verifiable from the video's public
            // metadata; a reasonable draft for an AI-video-engineer's own reel.
            pipeline: [
              "AI-assisted generative video (prompt-to-render)",
              "Edited and paced in a non-linear editor",
              "Colour graded for a punchy, high-contrast social feed look",
            ],
            // FACT — canonical short link, matches the video ID above.
            youtubeUrl: `https://youtu.be/${DATING_APP_AD_VIDEO_ID}`,
          },
        },
        {
          id: "typescript-branded-video-workflow",
          title: "TypeScript workflow that generates multiple branded videos automatically",
          thumbnail: TYPESCRIPT_VIDEO_THUMBNAIL,
          details: [
            { label: "Format", value: "16:9 video", type: "text" },
            { label: "Platform", value: "YouTube", type: "text" },
          ],
          videoBoard: {
            videoId: TYPESCRIPT_VIDEO_ID,
            videoTitle: "TypeScript workflow that generates multiple branded videos automatically",
            thumbnail: TYPESCRIPT_VIDEO_THUMBNAIL,
            overview:
              "A TypeScript-powered workflow for generating multiple branded videos automatically, showing how reusable code can connect content, visual identity, and video production at scale.",
            specs: [
              { label: "Aspect Ratio", value: "16:9" },
              { label: "Format", value: "MP4, YouTube upload" },
            ],
            pipeline: [
              "TypeScript automation and reusable video components",
              "Branded content generation from structured inputs",
              "Automated rendering of multiple video outputs",
            ],
            youtubeUrl: `https://youtu.be/${TYPESCRIPT_VIDEO_ID}`,
          },
        },
        {
          id: "first-home-guarantee-explainer",
          title: "First Home Guarantee Explained: Buy a Home with Just 5% Deposit (2026 Scheme)",
          thumbnail: HOME_GUARANTEE_VIDEO_THUMBNAIL,
          details: [
            { label: "Format", value: "16:9 video", type: "text" },
            { label: "Platform", value: "YouTube", type: "text" },
          ],
          videoBoard: {
            videoId: HOME_GUARANTEE_VIDEO_ID,
            videoTitle: "First Home Guarantee Explained: Buy a Home with Just 5% Deposit (2026 Scheme)",
            thumbnail: HOME_GUARANTEE_VIDEO_THUMBNAIL,
            overview:
              "An explanatory video breaking down the First Home Guarantee and how eligible buyers may purchase a home with a 5% deposit under the 2026 scheme.",
            specs: [
              { label: "Aspect Ratio", value: "16:9" },
              { label: "Format", value: "MP4, YouTube upload" },
            ],
            pipeline: [
              "Research-led explainer structure",
              "Scripted educational video production",
              "Branded editing and visual pacing for clear communication",
            ],
            youtubeUrl: `https://youtu.be/${HOME_GUARANTEE_VIDEO_ID}`,
          },
        },
        {
          id: "bnb-nte-pancakeswap-tutorial",
          title: "How to Swap BNB for NTE Token on PancakeSwap | Step-by-Step MetaMask Tutorial",
          thumbnail: BNB_NTE_VIDEO_THUMBNAIL,
          details: [
            { label: "Format", value: "16:9 video", type: "text" },
            { label: "Platform", value: "YouTube", type: "text" },
          ],
          videoBoard: {
            videoId: BNB_NTE_VIDEO_ID,
            videoTitle: "How to Swap BNB for NTE Token on PancakeSwap | Step-by-Step MetaMask Tutorial",
            thumbnail: BNB_NTE_VIDEO_THUMBNAIL,
            overview:
              "A step-by-step tutorial showing how to swap BNB for NTE Token on PancakeSwap using MetaMask, presented as a clear crypto onboarding walkthrough.",
            specs: [
              { label: "Aspect Ratio", value: "16:9" },
              { label: "Format", value: "MP4, YouTube upload" },
            ],
            pipeline: [
              "Screen-recorded product walkthrough",
              "Step-by-step instructional scripting",
              "Branded editing with clear on-screen guidance",
            ],
            youtubeUrl: `https://youtu.be/${BNB_NTE_VIDEO_ID}`,
          },
        },
      ],
    },
  ],
  allWork: projects
    .filter((p) => p.category === "ai-video")
    .map((p) => ({
      id: p.id,
      title: p.title,
      image: p.thumbnailUrl || p.imageUrl || "",
    })),
};
