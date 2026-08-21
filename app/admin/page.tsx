import type { Metadata } from "next";
import { getFeaturedMap } from "@/lib/featured-store";
import { portfolioPages } from "@/lib/portfolio";
import { AdminFeaturedBoard } from "@/components/admin/AdminFeaturedBoard";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Always reflect live pin state on load — same reasoning as app/page.tsx and
// app/work/[category]/page.tsx's force-dynamic (see the comment there).
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const featuredMap = await getFeaturedMap();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Feature / Pin</h1>
          <p className="mt-2 max-w-2xl text-muted">
            Turning Feature on pins an item to #1 in its own section, most-recently-pinned
            first. Turning it off returns the item to its default position.
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

      <AdminFeaturedBoard pages={portfolioPages} initialMap={featuredMap} />
    </main>
  );
}
