import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import type { PortfolioPageId } from "@/types/portfolio";
import { extractYouTubeId, isCmsVideoPage } from "@/lib/cms";
import {
  createCmsEntry,
  deleteCmsEntry,
  resolveEntryDisplayUrl,
  uploadCmsImage,
} from "@/lib/cms-store";

const PAGE_IDS: PortfolioPageId[] = [
  "motion-reels",
  "ai-generative",
  "branding-visuals",
  "web-experiences",
];

function isPageId(value: unknown): value is PortfolioPageId {
  return typeof value === "string" && (PAGE_IDS as string[]).includes(value);
}

function parseTags(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== "string") return [];
  return raw
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

/** Creates one admin-uploaded portfolio entry: validates the category-specific required
 *  fields, uploads an image to Supabase Storage when one was given, inserts the row, and
 *  revalidates the affected /work/[category] page. Auth is enforced by proxy.ts on the whole
 *  /api/admin/:path* matcher, not re-checked here (same convention as /api/admin/toggle). */
export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const pageId = form.get("pageId");
  const groupId = form.get("groupId");
  const title = form.get("title");
  const description = form.get("description");
  const youtubeUrl = form.get("youtubeUrl");
  const liveUrl = form.get("liveUrl");
  const detailsText = form.get("detailsText");
  const tags = parseTags(form.get("tags"));
  const image = form.get("image");

  if (!isPageId(pageId)) {
    return NextResponse.json({ error: "Missing or invalid category." }, { status: 400 });
  }
  if (typeof title !== "string" || title.trim().length === 0) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  if (typeof groupId !== "string" || groupId.trim().length === 0) {
    return NextResponse.json({ error: "A section is required." }, { status: 400 });
  }

  let youtubeUrlValue: string | null = null;
  if (isCmsVideoPage(pageId)) {
    if (typeof youtubeUrl !== "string" || !extractYouTubeId(youtubeUrl)) {
      return NextResponse.json(
        { error: "A valid YouTube URL is required for this category." },
        { status: 400 }
      );
    }
    youtubeUrlValue = youtubeUrl.trim();
  }

  let imagePath: string | null = null;
  if (!isCmsVideoPage(pageId)) {
    if (!(image instanceof File) || image.size === 0) {
      return NextResponse.json(
        { error: "An image file is required for this category." },
        { status: 400 }
      );
    }
    try {
      imagePath = await uploadCmsImage(pageId, image);
    } catch (err) {
      return NextResponse.json(
        { error: err instanceof Error ? err.message : "Image upload failed." },
        { status: 500 }
      );
    }
  }

  let liveUrlValue: string | null = null;
  if (pageId === "web-experiences") {
    if (typeof liveUrl !== "string" || liveUrl.trim().length === 0) {
      return NextResponse.json(
        { error: "A live demo link is required for Web Experiences." },
        { status: 400 }
      );
    }
    try {
      liveUrlValue = new URL(liveUrl.trim()).toString();
    } catch {
      return NextResponse.json({ error: "The live demo link isn't a valid URL." }, { status: 400 });
    }
  } else if (typeof liveUrl === "string" && liveUrl.trim().length > 0) {
    liveUrlValue = liveUrl.trim();
  }

  try {
    const entry = await createCmsEntry({
      pageId,
      groupId: groupId.trim(),
      title: title.trim(),
      description: typeof description === "string" && description.trim() ? description.trim() : null,
      tags,
      youtubeUrl: youtubeUrlValue,
      imagePath,
      liveUrl: liveUrlValue,
      detailsText: typeof detailsText === "string" && detailsText.trim() ? detailsText.trim() : null,
    });

    revalidatePath(`/work/${pageId}`);

    return NextResponse.json({ ok: true, entry, imageUrl: resolveEntryDisplayUrl(entry) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to save the entry." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const pageId = searchParams.get("pageId");

  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  try {
    await deleteCmsEntry(id);
    if (isPageId(pageId)) revalidatePath(`/work/${pageId}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete the entry." },
      { status: 500 }
    );
  }
}
