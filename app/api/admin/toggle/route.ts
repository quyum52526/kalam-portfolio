import { NextResponse } from "next/server";
import { setFeatured } from "@/lib/featured-store";

/** Toggles one item's pin and persists it. No revalidation needed here — the home page,
 *  /work/[category], and /admin are all force-dynamic (see the comments on those routes),
 *  so they re-read Redis on every request and pick this up immediately, with no redeploy or
 *  cache-busting step. Auth is enforced by proxy.ts on the whole /api/admin/:path* matcher,
 *  not re-checked here. */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const { pageId, groupId, itemId, on } = body ?? {};

  if (
    typeof pageId !== "string" ||
    typeof groupId !== "string" ||
    typeof itemId !== "string" ||
    typeof on !== "boolean"
  ) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const map = await setFeatured(pageId, groupId, itemId, on);

  return NextResponse.json({ ok: true, map });
}
