import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Bucket the admin content-upload CMS stores branding/web-experiences images in. Created via
 *  supabase/schema.sql — public read (so ItemCard's plain <img> can load it directly, same as
 *  the static site's other remote thumbnails), writes only via the service-role key below. */
export const CMS_BUCKET = "cms-uploads";

let client: SupabaseClient | null = null;

/** Lazily built so importing this module never throws at build/import time (e.g. before the
 *  Supabase project is provisioned) — callers only see an error when they actually try to read/
 *  write. Uses the service-role key, not the anon key: every write is already gated behind
 *  proxy.ts's admin-cookie check, so there's no separate end-user auth layer for Supabase Row
 *  Level Security to enforce. Server-only — never import this from a Client Component. */
export function getSupabaseClient(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase isn't configured — set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY " +
        "(Project Settings → API in your Supabase dashboard)."
    );
  }

  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}

export function getPublicImageUrl(path: string): string {
  return getSupabaseClient().storage.from(CMS_BUCKET).getPublicUrl(path).data.publicUrl;
}
