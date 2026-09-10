"use client";

import { useMemo, useRef, useState, type DragEvent } from "react";
import { AlertTriangle, Loader2, Trash2, UploadCloud } from "lucide-react";
import type { PortfolioPage, PortfolioPageId } from "@/types/portfolio";
import {
  extractYouTubeId,
  hasValidCmsMedia,
  isCmsVideoPage,
  resolveGroupForPage,
  type CmsEntryRow,
} from "@/lib/cms";
import { workCategories } from "@/data/categories";
import { cn } from "@/lib/utils";

export type CmsEntryWithUrl = CmsEntryRow & { imageUrl: string | null };

/** Sentinel select value for "type a new section name" — kept out of the id-space any real
 *  PortfolioCategory could have (those are always slugify()-shaped, never containing "__"). */
const CUSTOM_GROUP_VALUE = "__custom__";

const FIELD_CLASS =
  "w-full rounded-lg border border-border bg-surface-inset px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-border-strong";
const LABEL_CLASS = "text-xs font-medium uppercase tracking-wide text-muted";

/** The /admin content-upload CMS: a category selector that swaps in the right required fields
 *  (YouTube URL + live embed preview for the two video pages, an image dropzone for the two
 *  image pages, plus a live-URL field only for Web Experiences), a section selector (an
 *  existing PortfolioCategory group on the chosen page, or a typed custom name for a new one —
 *  see lib/cms.ts's resolveGroupForPage for how a typed name is matched against existing groups
 *  at render time), a shared title/description/tags/details section, and a per-page list of
 *  already-uploaded entries with delete. Posts multipart form data to /api/admin/content — a
 *  file upload can't go through JSON. */
export function AdminContentUploadForm({
  initialEntries,
  pages,
}: {
  initialEntries: CmsEntryWithUrl[];
  pages: PortfolioPage[];
}) {
  const [entries, setEntries] = useState(initialEntries);
  const [pageId, setPageId] = useState<PortfolioPageId>("ai-generative");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [detailsText, setDetailsText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentPage = useMemo(() => pages.find((p) => p.id === pageId), [pages, pageId]);
  const availableGroups = currentPage?.categories ?? [];

  const [groupSelection, setGroupSelection] = useState<string>(
    () => availableGroups[0]?.id ?? CUSTOM_GROUP_VALUE
  );
  const [customGroup, setCustomGroup] = useState("");

  function handlePageChange(newPageId: PortfolioPageId) {
    setPageId(newPageId);
    const groups = pages.find((p) => p.id === newPageId)?.categories ?? [];
    setGroupSelection(groups[0]?.id ?? CUSTOM_GROUP_VALUE);
    setCustomGroup("");
  }

  const groupIdToSubmit =
    groupSelection === CUSTOM_GROUP_VALUE ? customGroup.trim() : groupSelection;
  const willCreateNewSection = useMemo(() => {
    if (!currentPage || !groupIdToSubmit) return false;
    return !resolveGroupForPage(currentPage, groupIdToSubmit).existing;
  }, [currentPage, groupIdToSubmit]);

  const isVideo = isCmsVideoPage(pageId);
  const videoId = useMemo(() => (youtubeUrl ? extractYouTubeId(youtubeUrl) : null), [youtubeUrl]);
  const imagePreviewUrl = useMemo(
    () => (imageFile ? URL.createObjectURL(imageFile) : null),
    [imageFile]
  );

  function resetForm() {
    setTitle("");
    setDescription("");
    setTags("");
    setYoutubeUrl("");
    setLiveUrl("");
    setDetailsText("");
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (file) setImageFile(file);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData();
    formData.set("pageId", pageId);
    formData.set("groupId", groupIdToSubmit);
    formData.set("title", title);
    formData.set("description", description);
    formData.set("tags", tags);
    formData.set("detailsText", detailsText);
    if (isVideo) {
      formData.set("youtubeUrl", youtubeUrl);
    } else if (imageFile) {
      formData.set("image", imageFile);
    }
    if (pageId === "web-experiences") {
      formData.set("liveUrl", liveUrl);
    }

    try {
      const res = await fetch("/api/admin/content", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }

      setEntries((prev) => [...prev, { ...data.entry, imageUrl: data.imageUrl }]);
      resetForm();
    } catch {
      setError("Network error — the entry wasn't saved.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(entry: CmsEntryWithUrl) {
    setDeletingId(entry.id);
    setError(null);

    try {
      const res = await fetch(
        `/api/admin/content?id=${entry.id}&pageId=${entry.page_id}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Couldn't delete that entry.");
        return;
      }
      setEntries((prev) => prev.filter((e) => e.id !== entry.id));
    } catch {
      setError("Network error — the entry wasn't deleted.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mt-10 space-y-10">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-border-strong bg-surface-card p-6"
      >
        <div>
          <label className={LABEL_CLASS} htmlFor="cms-category">
            Category
          </label>
          <select
            id="cms-category"
            value={pageId}
            onChange={(e) => handlePageChange(e.target.value as PortfolioPageId)}
            className={cn(FIELD_CLASS, "mt-1")}
          >
            {workCategories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="cms-group">
            Section
          </label>
          <select
            id="cms-group"
            value={groupSelection}
            onChange={(e) => setGroupSelection(e.target.value)}
            className={cn(FIELD_CLASS, "mt-1")}
          >
            {availableGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
            <option value={CUSTOM_GROUP_VALUE}>+ New section…</option>
          </select>
          {groupSelection === CUSTOM_GROUP_VALUE && (
            <input
              value={customGroup}
              onChange={(e) => setCustomGroup(e.target.value)}
              placeholder="New section name, e.g. Motion Graphics & Systems"
              required
              className={cn(FIELD_CLASS, "mt-2")}
            />
          )}
          {willCreateNewSection && (
            <p className="mt-1 text-xs text-muted">
              &ldquo;{groupIdToSubmit}&rdquo; doesn&apos;t match an existing section — a new one
              will be created.
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={LABEL_CLASS} htmlFor="cms-title">
              Title
            </label>
            <input
              id="cms-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={cn(FIELD_CLASS, "mt-1")}
            />
          </div>
          <div>
            <label className={LABEL_CLASS} htmlFor="cms-tags">
              Tags (comma separated)
            </label>
            <input
              id="cms-tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. branding, logo, motion"
              className={cn(FIELD_CLASS, "mt-1")}
            />
          </div>
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="cms-description">
            Description
          </label>
          <textarea
            id="cms-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className={cn(FIELD_CLASS, "mt-1 resize-y")}
          />
        </div>

        {isVideo ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={LABEL_CLASS} htmlFor="cms-youtube-url">
                YouTube URL
              </label>
              <input
                id="cms-youtube-url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://youtu.be/... or /shorts/..."
                required
                className={cn(FIELD_CLASS, "mt-1")}
              />
              {youtubeUrl && !videoId && (
                <p className="mt-1 text-xs text-red-400">
                  Couldn&apos;t read a video ID from that URL.
                </p>
              )}
            </div>

            <div>
              <p className={LABEL_CLASS}>Preview</p>
              <div
                className={cn(
                  "mt-1 flex items-center justify-center overflow-hidden rounded-lg bg-surface-inset",
                  pageId === "motion-reels" ? "aspect-[9/16] max-h-56 mx-auto w-auto" : "aspect-video w-full"
                )}
              >
                {videoId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                    title="YouTube preview"
                    className="h-full w-full"
                    allow="encrypted-media"
                  />
                ) : (
                  <span className="p-4 text-center text-xs text-muted">
                    Paste a YouTube URL to preview it here.
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className={LABEL_CLASS}>Image</p>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "mt-1 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-center transition-colors",
                dragActive ? "border-border-strong bg-surface-inset" : "border-border"
              )}
            >
              {imagePreviewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- local object URL preview, not a next/image candidate
                <img
                  src={imagePreviewUrl}
                  alt="Selected upload preview"
                  className="max-h-48 rounded-md object-contain"
                />
              ) : (
                <>
                  <UploadCloud className="h-6 w-6 text-muted" aria-hidden />
                  <p className="text-xs text-muted">
                    Drag an image here, or click to choose a file.
                  </p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                className="hidden"
              />
            </div>
          </div>
        )}

        {pageId === "web-experiences" && (
          <div>
            <label className={LABEL_CLASS} htmlFor="cms-live-url">
              Live demo link
            </label>
            <input
              id="cms-live-url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://..."
              required
              className={cn(FIELD_CLASS, "mt-1")}
            />
          </div>
        )}

        <div>
          <label className={LABEL_CLASS} htmlFor="cms-details">
            Additional details (optional)
          </label>
          <textarea
            id="cms-details"
            value={detailsText}
            onChange={(e) => setDetailsText(e.target.value)}
            rows={2}
            className={cn(FIELD_CLASS, "mt-1 resize-y")}
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity disabled:opacity-50"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          {submitting ? "Uploading…" : "Add to portfolio"}
        </button>
      </form>

      <div className="space-y-8">
        {workCategories.map((category) => {
          const pageEntries = entries.filter((e) => e.page_id === category.slug);
          if (pageEntries.length === 0) return null;

          return (
            <div key={category.slug}>
              <h3 className="text-sm font-medium text-muted">{category.label} — uploads</h3>
              <ul className="mt-2 divide-y divide-border">
                {pageEntries.map((entry) => {
                  const isBroken = !hasValidCmsMedia(entry);

                  return (
                  <li key={entry.id} className="flex items-center justify-between gap-4 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      {entry.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element -- Supabase Storage thumbnail, same pattern as ItemCard
                        <img
                          src={entry.imageUrl}
                          alt=""
                          className="h-10 w-10 shrink-0 rounded-md object-cover"
                        />
                      )}
                      <span className="min-w-0 truncate text-sm">{entry.title}</span>
                      {isBroken && (
                        <span
                          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] font-medium text-red-400"
                          title="Missing a valid YouTube URL or uploaded image — hidden from the public site until fixed or deleted."
                        >
                          <AlertTriangle className="h-3 w-3" aria-hidden />
                          Hidden — no media
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      disabled={deletingId === entry.id}
                      onClick={() => handleDelete(entry)}
                      className="shrink-0 rounded-full border border-border-strong p-2 text-red-400 transition-colors hover:bg-surface-card disabled:opacity-50"
                      aria-label={`Delete ${entry.title}`}
                    >
                      {deletingId === entry.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      ) : (
                        <Trash2 className="h-4 w-4" aria-hidden />
                      )}
                    </button>
                  </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
