"use client";

import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import { supportsFinePointer } from "@/lib/utils";
import { MotionWorkbench } from "@/components/MotionWorkbench";

const subtitleWords = ["Motion", "Systems", "&", "Code-Driven", "Video"];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.4 },
  },
};

const word: Variants = {
  hidden: { y: "120%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { type: "spring", stiffness: 160, damping: 20, mass: 0.7 },
  },
};

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

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (!supportsFinePointer()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden px-6 py-24"
    >
      <motion.div
        aria-hidden
        style={{ background: glowBackground }}
        className="absolute inset-0 -z-10"
      />

      {/* Blueprint grid + ambient glow */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
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

      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-2">
        {/* Left column — identity */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-4 py-1.5 font-mono text-xs text-muted backdrop-blur-sm"
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
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-display text-5xl font-bold tracking-tight sm:text-6xl"
          >
            Abu Kalam
          </motion.h1>

          <motion.p
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-2 text-xl font-medium text-text-accent sm:text-2xl"
          >
            {subtitleWords.map((w, i) => (
              <span key={i} className="mr-[0.3em] inline-block overflow-hidden last:mr-0">
                <motion.span variants={word} className="inline-block">
                  {w}
                </motion.span>
              </span>
            ))}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-md text-lg text-muted"
          >
            Bridging motion design and creative code with Remotion, AI
            generative pipelines, and high-performance WebGL/Framer
            interactions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <MagneticCta onClick={() => scrollToId("projects-grid")}>
              Explore All Work <span aria-hidden>↓</span>
            </MagneticCta>
            <MagneticLink href="/contact">
              Contact / Inquire <span aria-hidden>↗</span>
            </MagneticLink>
          </motion.div>
        </div>

        {/* Right column — interactive motion workbench HUD */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <MotionWorkbench />
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
