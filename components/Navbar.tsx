"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { workCategories } from "@/data/categories";

const links = [
  { href: "/", label: "Home" },
  ...workCategories.map((category) => ({
    href: `/work/${category.slug}`,
    label: category.navLabel,
  })),
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on route change, on Escape, and lock page scroll while it's open.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.documentElement.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color] duration-[var(--dur-base)] ease-[var(--ease-out)]",
        mobileOpen
          ? "border-b border-border-subtle bg-navy-950"
          : scrolled
            ? "border-b border-border-subtle bg-navy-900/82 [backdrop-filter:var(--blur-panel)] [-webkit-backdrop-filter:var(--blur-panel)]"
            : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-[72px] md:px-8">
        <Link href="/" className="shrink-0">
          <Image
            src="/Brand Identity/kalam52526-logo-horizontal-dark.svg"
            alt="kalam52526"
            width={96}
            height={26}
            priority
            className="h-[22px] w-auto object-contain md:h-[26px]"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "font-accent shadow-[inset_0_-2px_0_transparent] py-1.5 text-[length:var(--size-label)] leading-[var(--line-label)] tracking-[var(--track-label)] uppercase transition-[color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out)]",
                    active
                      ? "font-bold text-text-body shadow-[inset_0_-2px_0_var(--cyan-400)]"
                      : "font-semibold text-muted hover:text-text-body hover:shadow-[inset_0_-2px_0_rgba(var(--glow),0.35)]"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center md:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5 text-text-body" />
          ) : (
            <span className="flex flex-col items-end gap-1.5">
              <span className="h-0.5 w-5 rounded-full bg-text-body" />
              <span className="h-0.5 w-3.5 rounded-full bg-cyan-400" />
            </span>
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-navy-950 md:hidden">
          <ul className="flex flex-col py-4 pb-6">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "font-display flex min-h-[52px] items-center gap-3 px-4 text-[length:var(--size-md)] leading-[var(--line-md)]",
                      active
                        ? "bg-surface-card font-extrabold text-text-body"
                        : "font-semibold text-muted"
                    )}
                  >
                    <span
                      className={cn(
                        "h-5 w-[3px] rounded-[2px]",
                        active ? "bg-cyan-400" : "bg-transparent"
                      )}
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
