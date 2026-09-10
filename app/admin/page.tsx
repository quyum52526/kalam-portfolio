import type { Metadata } from "next";
import { getFeaturedMap } from "@/lib/featured-store";
import { portfolioPages } from "@/lib/portfolio";
import { listCmsEntries, resolveEntryDisplayUrl } from "@/lib/cms-store";
import { AdminFeaturedBoard } from "@/components/admin/AdminFeaturedBoard";
import { AdminContentUploadForm } from "@/components/admin/AdminContentUploadForm";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Always reflect live pin state and CMS uploads on load — same reasoning as app/page.tsx and
// app/work/[category]/page.tsx's force-dynamic (see the comment there).
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [featuredMap, cmsEntries] = await Promise.all([getFeaturedMap(), listCmsEntries()]);

  const cmsEntriesWithUrl = cmsEntries.map((entry) => ({
    ...entry,
    imageUrl: resolveEntryDisplayUrl(entry),
  }));

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Admin</h1>
          <p className="mt-2 max-w-2xl text-muted">
            Upload new portfolio content below, or pin an existing item to the top of its
            section.
          </p>
        </div>
        <form action="/api/admin/logout" method="post">
          <button
            type="submit"
            className="rounded-full border border-border-strong px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-card"
          >
            Log out
          </button>
        </form>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Upload content</h2>
        <AdminContentUploadForm initialEntries={cmsEntriesWithUrl} pages={portfolioPages} />
      </section>

      <section className="mt-16 border-t border-border pt-10">
        <h2 className="text-xl font-semibold tracking-tight">Feature / Pin</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Turning Feature on pins an item to #1 in its own section, most-recently-pinned
          first. Turning it off returns the item to its default position.
        </p>
        <AdminFeaturedBoard pages={portfolioPages} initialMap={featuredMap} />
      </section>
    </main>
  );
}
