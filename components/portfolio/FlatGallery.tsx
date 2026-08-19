/** Simple responsive image grid — no grouping, no Details button, just images. */
export function FlatGallery({
  items,
}: {
  items: { id: string; title: string; image: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative aspect-square overflow-hidden rounded-xl border border-border bg-surface-inset"
        >
          {item.image ? (
            // eslint-disable-next-line @next/next/no-img-element -- images may be remote (e.g. YouTube) URLs
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-card to-transparent p-2 text-center text-xs text-muted">
              {item.title}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
