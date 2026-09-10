import { randomUUID } from "crypto";
import type { PortfolioPageId } from "@/types/portfolio";
import { CMS_BUCKET, getPublicImageUrl, getSupabaseClient } from "@/lib/supabase";
import type { CmsEntryRow } from "@/lib/cms";

const TABLE = "cms_entries";

/** Server-only: uses the Supabase service-role key via lib/supabase.ts, never import this from
 *  a Client Component. Mirrors lib/featured-store.ts's shape (thin CRUD wrapper, no caching —
 *  this dataset is small and low-write-frequency, same "one owner" assumption). Swallows all
 *  errors and returns [] — same reasoning as getFeaturedMap: a page hydrating its initial list
 *  should degrade to "no CMS uploads yet" rather than fail the request if Supabase isn't
 *  configured yet or has a bad moment. Writes (createCmsEntry, deleteCmsEntry) do not do this —
 *  those need to surface real errors to the admin form. */
export async function listCmsEntries(pageId?: PortfolioPageId): Promise<CmsEntryRow[]> {
  try {
    let query = getSupabaseClient()
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: true });

    if (pageId) query = query.eq("page_id", pageId);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  } catch {
    return [];
  }
}

export interface CreateCmsEntryInput {
  pageId: PortfolioPageId;
  groupId: string;
  title: string;
  description: string | null;
  tags: string[];
  youtubeUrl: string | null;
  imagePath: string | null;
  liveUrl: string | null;
  detailsText: string | null;
}

export async function createCmsEntry(input: CreateCmsEntryInput): Promise<CmsEntryRow> {
  const { data, error } = await getSupabaseClient()
    .from(TABLE)
    .insert({
      page_id: input.pageId,
      group_id: input.groupId,
      title: input.title,
      description: input.description,
      tags: input.tags,
      youtube_url: input.youtubeUrl,
      image_path: input.imagePath,
      live_url: input.liveUrl,
      details_text: input.detailsText,
    })
    .select("*")
    .single();

  if (error) throw new Error(`Failed to create CMS entry: ${error.message}`);
  return data;
}

export async function deleteCmsEntry(id: string): Promise<void> {
  const client = getSupabaseClient();

  const { data: existing } = await client
    .from(TABLE)
    .select("image_path")
    .eq("id", id)
    .single();

  const { error } = await client.from(TABLE).delete().eq("id", id);
  if (error) throw new Error(`Failed to delete CMS entry: ${error.message}`);

  if (existing?.image_path) {
    // Best-effort — an orphaned storage object is harmless clutter, not worth failing the
    // delete over if this second call has a bad moment.
    await client.storage.from(CMS_BUCKET).remove([existing.image_path]).catch(() => {});
  }
}

/** Uploads one admin-picked image to the cms-uploads bucket under `<pageId>/<uuid>-<name>` and
 *  returns the storage path (not the public URL — lib/supabase.ts's getPublicImageUrl resolves
 *  that on read, so the DB only stores the stable path). */
export async function uploadCmsImage(pageId: PortfolioPageId, file: File): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
  const path = `${pageId}/${randomUUID()}-${safeName}`;

  const { error } = await getSupabaseClient()
    .storage.from(CMS_BUCKET)
    .upload(path, file, { contentType: file.type || "application/octet-stream" });

  if (error) throw new Error(`Failed to upload image: ${error.message}`);
  return path;
}

/** Resolves a row's uploaded image to its public URL for display (admin list, API responses).
 *  null for video-category rows, which have no image_path. */
export function resolveEntryDisplayUrl(row: CmsEntryRow): string | null {
  return row.image_path ? getPublicImageUrl(row.image_path) : null;
}
