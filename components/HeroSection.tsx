"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn, supportsFinePointer } from "@/lib/utils";
import { RoleCanvas } from "@/components/hero/RoleCanvas";
import type { HeroCanvasRoleId } from "@/lib/hero/roleStates";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const ROLE_CYCLE_MS = 4500;

interface Role {
  id: HeroCanvasRoleId;
  pill: string;
  title: string;
  description: string;
  image: string;
  textClass: string;
  bgClass: string;
}

const roles: Role[] = [
  {
    id: "ai-video",
    pill: "AI Video",
    title: "AI Video Engineer",
    description:
      "Generative video pipelines — prompt-to-render workflows with Runway, Midjourney, and custom AI compositing.",
    image: "/images for hero/kalam-profile-03.png",
    textClass: "text-cyan-400",
    bgClass: "bg-cyan-400",
  },
  {
    id: "motion",
    pill: "Motion",
    title: "Motion Specialist",
    description:
      "Motion graphics and edit systems built in After Effects, Cinema 4D, and Remotion for code-driven video.",
    image: "/images for hero/kalam-profile-02.png",
    textClass: "text-violet-400",
    bgClass: "bg-violet-600",
  },
  {
    id: "brand",
    pill: "Brand",
    title: "Brand Designer",
    description:
      "Identity systems, logo design, and print collateral built around a consistent, considered visual language.",
    image: "/images for hero/kalam-profile-01.png",
    textClass: "text-amber-400",
    bgClass: "bg-warning",
  },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -80 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function HeroSection() {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(20);
  const glowX = useSpring(mouseX, { stiffness: 60, damping: 22, mass: 0.6 });
  const glowY = useSpring(mouseY, { stiffness: 60, damping: 22, mass: 0.6 });
  const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(var(--glow),0.22), transparent 60%)`;

  const [activeIndex, setActiveIndex] = useState(0);
  const [autoCycling, setAutoCycling] = useState(true);
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeRole = roles[activeIndex];

  // ≥1280px only: the portrait's grid track is stretched (align-self:stretch) to match the
  // content row's height, but that row is much shorter than the section (min-h-svh). A plain
  // bottom:0 + percentage height therefore both anchors and sizes the image against the wrong
  // box — the row, not the section. Rather than restructure the grid/row to fill the section
  // (off-limits — layout is locked), measure the section/navbar directly and compute the image's
  // height + bottom offset so the head lands ~50px under the navbar and the feet land on the
  // section's true bottom edge — both via CSS vars the image reads. Portrait-only change.
  const HEAD_GAP_TARGET = 50;
  const PORTRAIT_MIN_H = 420;
  const PORTRAIT_MAX_H = 820;

  const sectionRef = useRef<HTMLElement>(null);
  const portraitTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updatePortraitSizing() {
      const track = portraitTrackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;
      if (window.innerWidth < 1280) {
        track.style.removeProperty("--portrait-bottom-offset");
        track.style.removeProperty("--portrait-height");
        return;
      }
      const trackBottom = track.getBoundingClientRect().bottom;
      const sectionBottom = section.getBoundingClientRect().bottom;
      const navbar = document.querySelector("header");
      const navbarBottom = navbar ? navbar.getBoundingClientRect().bottom : section.getBoundingClientRect().top;
      const bottomOffset = Math.max(0, Math.round(sectionBottom - trackBottom));
      track.style.setProperty("--portrait-bottom-offset", `${bottomOffset}px`);

      const desiredTop = navbarBottom + HEAD_GAP_TARGET;
      const desiredHeight = Math.round(sectionBottom - desiredTop);
      const clampedHeight = Math.min(PORTRAIT_MAX_H, Math.max(PORTRAIT_MIN_H, desiredHeight));
      track.style.setProperty("--portrait-height", `${clampedHeight}px`);
    }
    updatePortraitSizing();
    window.addEventListener("resize", updatePortraitSizing);
    return () => window.removeEventListener("resize", updatePortraitSizing);
  }, []);

  // Auto-cycles while `autoCycling` is true; pauses (without stopping) on hover/focus-within,
  // and stops permanently the first time the user picks a role manually.
  useEffect(() => {
    if (!autoCycling) return;
    timerRef.current = setInterval(() => {
      if (pausedRef.current) return;
      setActiveIndex((i) => (i + 1) % roles.length);
    }, ROLE_CYCLE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoCycling]);

  function selectRole(index: number) {
    setActiveIndex(index);
    setAutoCycling(false);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (!supportsFinePointer()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onFocus={() => {
        pausedRef.current = true;
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          pausedRef.current = false;
        }
      }}
      ref={sectionRef}
      className="relative min-h-svh overflow-hidden py-12"
    >
      <motion.div
        aria-hidden
        style={{ background: glowBackground }}
        className="absolute inset-0 -z-20"
      />

      {/* Blueprint grid + ambient glow */}
      <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.7) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <motion.div
          className="absolute -left-1/4 top-0 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.2),transparent_70%)] blur-3xl"
          animate={{ x: [0, 50, -20, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-10%] bottom-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.18),transparent_70%)] blur-3xl"
          animate={{ x: [0, -40, 20, 0], y: [0, -20, 20, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Ambient soft portrait, <1280px — full-section background layer behind everything. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-end justify-center xl:hidden"
      >
        <AnimatePresence mode="wait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            key={activeRole.id}
            src={activeRole.image}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="h-full max-h-[640px] w-auto object-contain object-bottom [mix-blend-mode:luminosity] [-webkit-mask-image:radial-gradient(ellipse_60%_75%_at_50%_38%,black_40%,transparent_88%)] [mask-image:radial-gradient(ellipse_60%_75%_at_50%_38%,black_40%,transparent_88%)]"
          />
        </AnimatePresence>
      </div>

      {/*
        Container: max-w-1440px, centred, fluid inline padding. Only the portrait and the
        background grid/glow above are allowed to extend past this — text and card never do.

        <1024px: single stacked column, no 3D transform, portrait stays the full-bleed background.
        1024–1279px: 2 columns (1fr text | 400px card), portrait still the full-bleed background.
        ≥1280px: 3 fixed/flexible tracks — 480px text | flexible portrait track | 440px card.
        Text and card hold their pixel widths at every width from here up; the portrait track is
        the only track that flexes. The portrait itself ignores its track's width entirely
        (max-width: none, centered via absolute positioning) and is allowed to bleed into the
        text/card columns above/behind them — that's why it needs its own real grid slot instead
        of being a free-floating overlay: at very wide viewports a section-centered overlay and a
        max-w-1440-capped grid drift apart, which is exactly what broke the 1366px layout.
      */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-x-10 gap-y-10 px-[clamp(24px,4vw,64px)] lg:grid-cols-[1fr_400px] xl:grid-cols-[480px_minmax(140px,1fr)_440px]">
        {/* Left column — kinetic typography, synced to the active role */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-navy-900/60 px-4 py-1.5 font-mono text-xs text-muted backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            MOTION ENGINE ACTIVE // 60 FPS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
            className="mt-6 font-display text-[clamp(2.5rem,3.6vw,4rem)] font-bold tracking-tight"
          >
            Abu Kalam Khandaker
          </motion.h1>

          <div className="mt-2 h-7 overflow-hidden sm:h-8">
            <AnimatePresence mode="wait">
              <motion.h2
                key={activeRole.id}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className={cn(
                  "text-xl font-medium sm:text-2xl",
                  activeRole.textClass
                )}
              >
                {activeRole.title}
              </motion.h2>
            </AnimatePresence>
          </div>

          <div className="mt-6 h-24 max-w-[46ch]">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeRole.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className="text-lg text-muted"
              >
                {activeRole.description}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Role selector pills */}
          <div className="mt-6 inline-flex gap-1 rounded-full border border-border bg-surface p-1">
            {roles.map((role, i) => (
              <button
                key={role.id}
                onClick={() => selectRole(i)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  i === activeIndex
                    ? "text-navy-900"
                    : "text-muted hover:text-text-body"
                )}
              >
                {i === activeIndex && (
                  <motion.span
                    layoutId="hero-role-pill"
                    className={cn("absolute inset-0 rounded-full", role.bgClass)}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{role.pill}</span>
              </button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: EASE_OUT }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <MagneticCta onClick={() => scrollToId("projects-grid")}>
              Explore Work <span aria-hidden>↓</span>
            </MagneticCta>
            <MagneticLink href="/contact">
              Let&apos;s Talk <span aria-hidden>↗</span>
            </MagneticLink>
          </motion.div>
        </div>

        {/* Portrait column, ≥1280px only — a real grid track (see container comment above),
            but the image itself ignores the track's width (max-w-none) and bleeds into the
            text/card columns behind them. Hidden below xl so it doesn't disturb the 2-col
            auto-placement at lg, where the portrait is the full-bleed background layer instead. */}
        <div
          aria-hidden
          ref={portraitTrackRef}
          className="pointer-events-none relative hidden overflow-visible xl:col-start-2 xl:block xl:self-stretch"
        >
          <AnimatePresence mode="wait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              key={activeRole.id}
              src={activeRole.image}
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              style={{ bottom: "calc(-1 * var(--portrait-bottom-offset, 0px))" }}
              className="pointer-events-none absolute left-1/2 z-[1] h-[var(--portrait-height,420px)] w-auto max-w-none -translate-x-1/2 object-contain object-bottom [mix-blend-mode:luminosity] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%),linear-gradient(to_bottom,black_0%,black_87%,transparent_100%)] [-webkit-mask-composite:source-in] [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%),linear-gradient(to_bottom,black_0%,black_87%,transparent_100%)] [mask-composite:intersect]"
            />
          </AnimatePresence>
        </div>

        {/* Card column — track 2 at lg (400px), track 3 at xl (440px); explicit col-start at xl
            since it's the 3rd DOM child but grid auto-placement already gets this right anyway —
            kept for clarity. z-[2], above the portrait. */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
          className="relative z-[2] xl:col-start-3"
        >
          <RoleCanvas role={activeRole.id} />
        </motion.div>
      </div>
    </section>
  );
}

function MagneticCta({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (!supportsFinePointer()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className="inline-flex h-12 items-center gap-2 rounded-full bg-text-body px-6 text-sm font-semibold text-navy-900 transition-opacity hover:opacity-90"
    >
      {children}
    </motion.button>
  );
}

function MagneticLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!supportsFinePointer()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-block">
      <Link
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="inline-flex h-12 items-center gap-2 rounded-full border border-border-strong px-6 text-sm font-semibold text-text-body transition-colors hover:bg-surface-card"
      >
        {children}
      </Link>
    </motion.div>
  );
}
