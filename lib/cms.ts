import type {
  DetailField,
  PortfolioCategory,
  PortfolioItem,
  PortfolioPage,
  PortfolioPageId,
  VideoBoard,
} from "@/types/portfolio";

/** The two video-led pages take a YouTube URL instead of an image upload. Kept as a literal
 *  union (not derived from PortfolioPageId) so a switch/if over it is exhaustive-checkable. */
export const CMS_VIDEO_PAGES: PortfolioPageId[] = ["motion-reels", "ai-generative"];
export const CMS_IMAGE_PAGES: PortfolioPageId[] = ["branding-visuals", "web-experiences"];

export function isCmsVideoPage(pageId: PortfolioPageId): boolean {
  return CMS_VIDEO_PAGES.includes(pageId);
}

/** One row from the `cms_entries` Supabase table (see supabase/schema.sql) — the admin-uploaded
 *  counterpart to the static data/portfolio/*.ts items. Deliberately flat/nullable rather than
 *  a discriminated union: Supabase returns plain rows, and the category-specific "which fields
 *  are required" rule is enforced once, at write time, in app/api/admin/content/route.ts. */
export interface CmsEntryRow {
  id: string;
  page_id: PortfolioPageId;
  /** Free text naming the PortfolioCategory group this item belongs to on its page — either an
   *  existing group's id/name (chosen from the admin form's dropdown) or a brand-new custom
   *  section name typed there. Resolved against the page's actual groups at render time by
   *  resolveGroupForPage below, not treated as a foreign key. */
  group_id: string;
  title: string;
  description: string | null;
  tags: string[];
  youtube_url: string | null;
  image_path: string | null;
  live_url: string | null;
  details_text: string | null;
  created_at: string;
}

/** Extracts the 11-character YouTube video ID from any of the URL shapes the admin form
 *  accepts: youtu.be/<id>, youtube.com/watch?v=<id>, youtube.com/shorts/<id>, and
 *  youtube.com/embed/<id> — with or without extra query params (e.g. Shorts' `?feature=share`).
 *  Returns null for anything else so the caller can reject the form input. */
export function extractYouTubeId(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, "").replace(/^m\./, "");

  if (host === "youtu.be") {
    return parsed.pathname.slice(1).split("/")[0] || null;
  }

  if (host === "youtube.com" || host === "music.youtube.com") {
    if (parsed.pathname === "/watch") return parsed.searchParams.get("v");
    const shortsMatch = parsed.pathname.match(/^\/shorts\/([^/]+)/);
    if (shortsMatch) return shortsMatch[1];
    const embedMatch = parsed.pathname.match(/^\/embed\/([^/]+)/);
    if (embedMatch) return embedMatch[1];
  }

  return null;
}

/** hqdefault.jpg (not maxresdefault.jpg) — guaranteed to exist for every YouTube upload, unlike
 *  maxresdefault which 404s for older/lower-resolution videos. CMS entries have no human
 *  verifying the thumbnail live (see data/portfolio's per-video verification comments), so the
 *  universally-safe size is the right default here. */
export function youtubeThumbnail(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

/** True when a row has the media it needs to render as a real card: a YouTube URL that actually
 *  yields a video ID for the two video pages, or an uploaded image for the two image pages.
 *  The write-time validation in app/api/admin/content/route.ts should make an invalid row
 *  impossible going forward, but a row can still end up this way from a manual edit in Supabase
 *  Studio (e.g. someone blanking youtube_url or image_path directly) or from data created
 *  before that validation existed — see the app/work/[category]/page.tsx caller, which filters
 *  on this before merging, so a broken row disappears from the public grid entirely instead of
 *  rendering ItemCard's "No preview" grey box. Pure — safe to call from a Server or Client
 *  Component (the admin list uses it too, to flag a broken entry instead of silently omitting
 *  it — an admin still needs to see it to fix or delete it). */
export function hasValidCmsMedia(row: CmsEntryRow): boolean {
  if (isCmsVideoPage(row.page_id)) {
    return Boolean(row.youtube_url && extractYouTubeId(row.youtube_url));
  }
  return Boolean(row.image_path);
}

/** Maps one Supabase row into the same PortfolioItem shape the static data/portfolio/*.ts
 *  files produce, so it can flow through ItemCard / DetailsModal / VideoBoardSection unchanged.
 *  `imageUrl` is the already-resolved Supabase Storage public URL for image-category rows
 *  (resolved by the caller via lib/supabase.ts's getPublicImageUrl — kept out of this function
 *  so it stays a pure, client-importable mapper). */
export function cmsEntryToPortfolioItem(row: CmsEntryRow, imageUrl: string | null): PortfolioItem {
  const details: DetailField[] = [];
  if (row.tags.length > 0) {
    details.push({ label: "Tags", value: row.tags.join(", "), type: "text" });
  }
  if (row.details_text) {
    details.push({ label: "Details", value: row.details_text, type: "paragraph" });
  }

  const videoId = row.youtube_url ? extractYouTubeId(row.youtube_url) : null;
  const isVideo = isCmsVideoPage(row.page_id);

  let videoBoard: VideoBoard | undefined;
  if (isVideo && videoId && row.youtube_url) {
    videoBoard = {
      videoId,
      videoTitle: row.title,
      thumbnail: youtubeThumbnail(videoId),
      overview: row.description ?? "",
      specs: [],
      pipeline: [],
      orientation: row.page_id === "motion-reels" ? "portrait" : "landscape",
      youtubeUrl: row.youtube_url,
    };
  }

  return {
    id: `cms-${row.id}`,
    title: row.title,
    description: row.description ?? undefined,
    thumbnail: videoBoard ? videoBoard.thumbnail : (imageUrl ?? ""),
    details,
    videoBoard,
    liveUrl: row.live_url ?? undefined,
  };
}

/** One admin-uploaded item paired with the raw `group_id` its row was saved with — the input
 *  shape mergeCmsItemsIntoPage below expects. Kept separate from CmsEntryRow so callers that
 *  already mapped the row to a PortfolioItem (e.g. app/work/[category]/page.tsx) don't need to
 *  pass the whole row back down just for this one field. */
export interface CmsItemForMerge {
  groupId: string;
  item: PortfolioItem;
}

/** Turns a typed/selected group value into URL-safe, non-empty text for a brand-new group's id
 *  — e.g. "Motion Graphics & Systems" -> "motion-graphics-systems". Falls back to "section" for
 *  input that's entirely punctuation/whitespace, so a new group never ends up with an empty id. */
export function slugify(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "section";
}

/** Resolves the admin form's `group_id` free text to an actual group on the page: an exact id
 *  match (the normal case — the form's dropdown sends an existing group's id), then a
 *  case-insensitive name match (so typing "Logo Design" lands in the existing group even if it
 *  wasn't picked from the dropdown), and only otherwise treats it as a brand-new section, per
 *  "if an item's subgroup doesn't match an existing group, only then create a section using
 *  that subgroup's name." Pure — safe to call from a Server or Client Component (the admin form
 *  uses this too, to preview which case a typed name will hit).
 *
 *  `groupValue` accepts null/undefined defensively — a pre-migration Supabase row (created
 *  before the group_id column existed) or a not-yet-initialized form field can hand this an
 *  empty value, and that should degrade to a sane default rather than throwing on
 *  `.trim()` of a non-string. Empty/missing input, and the literal placeholder text "default"
 *  (some DB tools — e.g. Supabase Studio's "Default Value" column-editor field — insert that
 *  verbatim if someone fills it in without realizing it's the field's placeholder, not a
 *  literal default they need to type), both resolve to the page's first existing group — so an
 *  item never vanishes into a stray "default"-named section just because it has no real group
 *  set — or, for a page with no groups at all, a generic "General" section. Only an explicitly
 *  typed, non-empty, non-"default" name creates a brand-new section. */
export function resolveGroupForPage(
  page: PortfolioPage,
  groupValue: string | null | undefined
): { id: string; name: string; existing: boolean } {
  const trimmed = (groupValue || "").trim();
  const isUnset = trimmed === "" || trimmed.toLowerCase() === "default";

  if (isUnset) {
    const firstGroup = page.categories[0];
    if (firstGroup) return { id: firstGroup.id, name: firstGroup.name, existing: true };
    return { id: "general", name: "General", existing: false };
  }

  const byId = page.categories.find((category) => category.id === trimmed);
  if (byId) return { id: byId.id, name: byId.name, existing: true };

  const byName = page.categories.find(
    (category) => category.name.toLowerCase() === trimmed.toLowerCase()
  );
  if (byName) return { id: byName.id, name: byName.name, existing: true };

  return { id: slugify(trimmed), name: trimmed, existing: false };
}

/** Merges admin-uploaded items into the page's actual static groups — into an existing group
 *  (by id, e.g. "logo-design") when the item's `groupId` matches one, or into a newly created
 *  group (named after whatever the admin typed) otherwise. A no-op (returns `page` unchanged)
 *  when there's nothing to merge, so every existing render path behaves exactly as before this
 *  system existed until an admin actually uploads something. Pure — safe to call from a Server
 *  or Client Component. Replaces the earlier design of always appending one fixed "New
 *  Uploads" group regardless of what the admin actually picked. */
export function mergeCmsItemsIntoPage(page: PortfolioPage, entries: CmsItemForMerge[]): PortfolioPage {
  if (entries.length === 0) return page;

  const categories = page.categories.map((category) => ({
    ...category,
    items: [...category.items],
  }));
  const newGroups = new Map<string, PortfolioCategory>();

  for (const { groupId, item } of entries) {
    const resolved = resolveGroupForPage(page, groupId);
    const existingCategory = categories.find((category) => category.id === resolved.id);

    if (existingCategory) {
      existingCategory.items.push(item);
      continue;
    }

    const pendingGroup = newGroups.get(resolved.id);
    if (pendingGroup) {
      pendingGroup.items.push(item);
    } else {
      newGroups.set(resolved.id, { id: resolved.id, name: resolved.name, items: [item] });
    }
  }

  return { ...page, categories: [...categories, ...newGroups.values()] };
}
