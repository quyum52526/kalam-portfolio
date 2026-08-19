"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { DetailField, PortfolioItem } from "@/types/portfolio";
import { cn } from "@/lib/utils";
import { BrandBoardSection } from "./BrandBoardSection";

function isGap(value: string | string[]) {
  return Array.isArray(value) ? value.every((v) => v === "GAP") : value === "GAP";
}

function DetailFieldRow({ field }: { field: DetailField }) {
  if (isGap(field.value)) {
    return (
      <div className="border-t border-border py-3 first:border-t-0 first:pt-0">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          {field.label}
        </p>
        <p className="mt-1 text-sm italic text-muted">To be added</p>
      </div>
    );
  }

  const value = field.value as string | string[];

  return (
    <div className="border-t border-border py-3 first:border-t-0 first:pt-0">
      <p className="text-xs font-medium uppercase tracking-wider text-muted">
        {field.label}
      </p>

      {field.type === "paragraph" && (
        <p className="mt-1 text-sm leading-relaxed text-text-body">{value as string}</p>
      )}

      {field.type === "text" && (
        <p className="mt-1 text-sm text-text-body">{value as string}</p>
      )}

      {field.type === "color" && (
        <div className="mt-1 flex items-center gap-2">
          <span
            className="h-5 w-5 rounded-full border border-border-strong"
            style={{ backgroundColor: value as string }}
          />
          <span className="text-sm text-text-body">{value as string}</span>
        </div>
      )}

      {field.type === "image" && (
        <div className="mt-2 flex flex-wrap gap-2">
          {(Array.isArray(value) ? value : [value]).map((src, i) => (
            <div
              key={i}
              className="relative h-20 w-20 overflow-hidden rounded-lg border border-border bg-surface-inset"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- detail images may be remote URLs */}
              <img
                src={src}
                alt={`${field.label} ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function DetailsModal({
  item,
  onClose,
}: {
  item: PortfolioItem | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-surface-inset/70 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "relative w-full overflow-hidden rounded-2xl border border-border bg-background",
              item.brandBoard ? "max-w-3xl" : "max-w-lg"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 rounded-full bg-surface-inset/50 p-2 text-text-body transition-colors hover:bg-surface-inset/70"
            >
              <X className="h-4 w-4" />
            </button>

            {item.brandBoard ? (
              <div className="max-h-[85vh] overflow-y-auto">
                <BrandBoardSection board={item.brandBoard} title={item.title} />
              </div>
            ) : (
              <>
                {item.thumbnail && item.thumbnail !== "GAP" && (
                  <div className="relative aspect-video w-full bg-surface-inset">
                    {/* eslint-disable-next-line @next/next/no-img-element -- thumbnails may be remote URLs */}
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                  </div>
                )}

                <div className="max-h-[70vh] overflow-y-auto p-6">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <div className="mt-4">
                    {item.details.map((field, i) => (
                      <DetailFieldRow key={i} field={field} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
