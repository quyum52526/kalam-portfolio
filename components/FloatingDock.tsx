"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Home, LayoutGrid, Mail, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { emailPrimary } from "@/data/contact";

/** The mail icon still navigates to /contact (unchanged) — only its accessible label is
 *  sourced from data/contact.ts, so it never hardcodes a separate copy of the primary
 *  email address. */
const items: { href: string; label: string; icon: LucideIcon; ariaLabel?: string }[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/work", label: "Work", icon: LayoutGrid },
  {
    href: "/contact",
    label: "Contact",
    icon: Mail,
    ariaLabel: `Contact — ${emailPrimary.value}`,
  },
];

function DockItem({
  href,
  label,
  ariaLabel,
  Icon,
  active,
  mouseX,
}: {
  href: string;
  label: string;
  ariaLabel?: string;
  Icon: LucideIcon;
  active: boolean;
  mouseX: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Infinity;
    return value - (bounds.left + bounds.width / 2);
  });

  const scaleRaw = useTransform(distance, [-110, 0, 110], [1, 1.25, 1]);
  const scale = useSpring(scaleRaw, { stiffness: 300, damping: 20, mass: 0.4 });

  return (
    <Link
      href={href}
      aria-label={ariaLabel ?? label}
      aria-current={active ? "page" : undefined}
      className="group relative flex flex-col items-center"
    >
      <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border-subtle bg-navy-950 px-2 py-1 text-xs font-medium text-text-body opacity-0 shadow-md transition-opacity duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:opacity-100">
        {label}
      </span>

      <motion.div
        ref={ref}
        style={{ scale }}
        className={cn(
          "relative flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-[var(--dur-base)] ease-[var(--ease-out)]",
          active ? "bg-cyan-400/15 text-text-body" : "text-muted hover:text-text-body"
        )}
      >
        <Icon className="h-5 w-5" />
      </motion.div>

      <span
        className={cn(
          "mt-1 h-1 w-1 rounded-full transition-[background-color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out)]",
          active ? "bg-cyan-400 shadow-[0_0_8px_2px_rgba(var(--glow),0.6)]" : "bg-transparent"
        )}
      />
    </Link>
  );
}

export function FloatingDock() {
  const pathname = usePathname();
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.2 }}
      className="fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 md:block"
    >
      <div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-center gap-3 rounded-full border border-border-strong bg-navy-950/80 px-4 py-2.5 shadow-2xl [backdrop-filter:var(--blur-panel)] [-webkit-backdrop-filter:var(--blur-panel)]"
      >
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <DockItem
              key={item.href}
              href={item.href}
              label={item.label}
              ariaLabel={item.ariaLabel}
              Icon={item.icon}
              active={active}
              mouseX={mouseX}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
