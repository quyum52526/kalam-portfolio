"use client";

import { useState, useTransition } from "react";
import type { PortfolioPage } from "@/types/portfolio";
import { type FeaturedMap, featuredKey, sortGroupItems } from "@/lib/featured";
import { cn } from "@/lib/utils";

/** The whole /admin toggle board: every portfolio page, every group within it, every item —
 *  each with a Feature button that pins/unpins it. Reorders live (via sortGroupItems, the
 *  same pure function the public site uses) so an owner sees the resulting #1/#2/... order
 *  immediately, not just an on/off state. */
export function AdminFeaturedBoard({
  pages,
  initialMap,
}: {
  pages: PortfolioPage[];
  initialMap: FeaturedMap;
}) {
  const [map, setMap] = useState(initialMap);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function toggle(pageId: string, groupId: string, itemId: string, on: boolean) {
    setError(null);
    const previousMap = map;
    const key = featuredKey(pageId, groupId, itemId);

    setMap((prev) => {
      const next = { ...prev };
      if (on) next[key] = Date.now();
      else delete next[key];
      return next;
    });

    startTransition(async () => {
      const res = await fetch("/api/admin/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageId, groupId, itemId, on }),
      });

      if (!res.ok) {
        setError("Couldn't save that change — reverted.");
        setMap(previousMap);
        return;
      }

      const data = await res.json();
      setMap(data.map as FeaturedMap);
    });
  }

  return (
    <div className="mt-10 space-y-12">
      {error && <p className="text-sm text-red-400">{error}</p>}

      {pages.map((page) => (
        <section key={page.id}>
          <h2 className="text-xl font-semibold tracking-tight">{page.label}</h2>

          {page.categories.map((group) => {
            const sorted = sortGroupItems(group.items, page.id, group.id, map);

            return (
              <div key={group.id} className="mt-5">
                <h3 className="text-sm font-medium text-muted">{group.name}</h3>
                <ul className="mt-2 divide-y divide-border">
                  {sorted.map((item, index) => {
                    const isFeatured = Boolean(
                      map[featuredKey(page.id, group.id, item.id)]
                    );

                    return (
                      <li
                        key={item.id}
                        className="flex items-center justify-between gap-4 py-3"
                      >
                        <span className="min-w-0 truncate text-sm">
                          {isFeatured ? `#${index + 1} · ` : ""}
                          {item.title}
                        </span>
                        <button
                          type="button"
                          disabled={pending}
                          onClick={() =>
                            toggle(page.id, group.id, item.id, !isFeatured)
                          }
                          className={cn(
                            "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50",
                            isFeatured
                              ? "bg-foreground text-background"
                              : "border border-border-strong hover:bg-surface-card"
                          )}
                        >
                          {isFeatured ? "Featured" : "Feature"}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </section>
      ))}
    </div>
  );
}
