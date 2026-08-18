"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supportsFinePointer } from "@/lib/utils";

const TOTAL_FRAMES = 300; // 5s @ 60fps demo timeline
const KEYFRAME_POSITIONS = [8, 22, 38, 50, 64, 78, 92];
const WAVEFORM_BARS = 28;

const EASE_PATH = "M10,50 C30,50 70,10 110,10";
const HOVER_PATH = "M10,50 C55,52 58,8 110,10";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function MotionWorkbench() {
  const [clock, setClock] = useState({ hh: 0, mm: 0, ss: 0, ff: 0 });
  const [scrub, setScrub] = useState<{ percent: number; frame: number } | null>(
    null
  );
  const [hoveringGraph, setHoveringGraph] = useState(false);

  const rafRef = useRef(0);
  const startRef = useRef(0);
  const lastFrameRef = useRef(-1);

  useEffect(() => {
    function tick(now: number) {
      if (!startRef.current) startRef.current = now;
      const elapsedMs = now - startRef.current;
      const totalFrames = Math.floor(elapsedMs / (1000 / 60));

      if (totalFrames !== lastFrameRef.current) {
        lastFrameRef.current = totalFrames;
        const ff = totalFrames % 60;
        const totalSeconds = Math.floor(totalFrames / 60);
        const ss = totalSeconds % 60;
        const mm = Math.floor(totalSeconds / 60) % 60;
        const hh = Math.floor(totalSeconds / 3600);
        setClock({ hh, mm, ss, ff });
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function handleTracksMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!supportsFinePointer()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.min(
      100,
      Math.max(0, ((e.clientX - rect.left) / rect.width) * 100)
    );
    setScrub({ percent, frame: Math.round((percent / 100) * TOTAL_FRAMES) });
  }

  const displayTimecode = scrub
    ? `${pad2(0)}:${pad2(0)}:${pad2(Math.floor(scrub.frame / 60) % 60)}:${pad2(scrub.frame % 60)}`
    : `${pad2(clock.hh)}:${pad2(clock.mm)}:${pad2(clock.ss)}:${pad2(clock.ff)}`;

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950/90 p-5 font-mono text-xs shadow-2xl">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
          </span>
          <span className="tabular-nums tracking-wider text-neutral-200">
            {displayTimecode}
          </span>
        </div>
        <div className="flex items-center gap-3 text-neutral-500">
          <span className="rounded border border-neutral-800 px-2 py-0.5">
            4K UHD
          </span>
          <span className="rounded border border-neutral-800 px-2 py-0.5">
            60.0 FPS
          </span>
        </div>
      </div>

      {/* Timeline tracks */}
      <div
        className="relative mt-4 space-y-3"
        onMouseMove={handleTracksMove}
        onMouseLeave={() => setScrub(null)}
      >
        <div>
          <TrackLabel color="bg-cyan-400" index="01" name="Remotion.Composition" />
          <div className="relative h-9 overflow-hidden rounded-md border border-neutral-800 bg-neutral-900/60">
            {KEYFRAME_POSITIONS.map((pos, i) => (
              <motion.span
                key={pos}
                className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-cyan-400"
                style={{ left: `${pos}%` }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <TrackLabel color="bg-indigo-400" index="02" name="Runway Gen-3 AI Pass" />
          <div className="relative flex h-9 items-center justify-between gap-[3px] overflow-hidden rounded-md border border-neutral-800 bg-neutral-900/60 px-2">
            {Array.from({ length: WAVEFORM_BARS }).map((_, i) => (
              <motion.span
                key={i}
                className="w-[2px] rounded-full bg-indigo-400"
                animate={{ scaleY: [0.2, 1, 0.35, 0.8, 0.2] }}
                transition={{
                  duration: 1 + (i % 5) * 0.15,
                  repeat: Infinity,
                  delay: i * 0.04,
                  ease: "easeInOut",
                }}
                style={{ height: "70%" }}
              />
            ))}
          </div>
        </div>

        <div>
          <TrackLabel color="bg-violet-400" index="03" name="WebGL Shader Engine" />
          <div className="relative flex h-9 items-center justify-center overflow-hidden rounded-md border border-neutral-800 bg-neutral-900/60">
            <svg viewBox="0 0 100 30" className="h-5 w-24" fill="none">
              <path
                d="M0,28 C25,28 45,2 100,2"
                stroke="#a78bfa"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <Playhead percent={scrub?.percent} />
      </div>

      {/* Bottom panel — bezier easing graph */}
      <div
        onMouseEnter={() => setHoveringGraph(true)}
        onMouseLeave={() => setHoveringGraph(false)}
        className="mt-4 rounded-lg border border-neutral-800 bg-neutral-900/60 p-3"
      >
        <svg viewBox="0 0 120 60" className="h-16 w-full" fill="none">
          <line x1="10" y1="10" x2="10" y2="50" stroke="#27272a" strokeWidth={1} />
          <line x1="10" y1="50" x2="110" y2="50" stroke="#27272a" strokeWidth={1} />
          <line
            x1="10"
            y1="50"
            x2="110"
            y2="10"
            stroke="#27272a"
            strokeWidth={1}
            strokeDasharray="2 2"
          />
          <motion.path
            initial={false}
            animate={{ d: hoveringGraph ? HOVER_PATH : EASE_PATH }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            stroke="#22d3ee"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </svg>
        <div className="mt-1 text-center text-[10px] text-neutral-500">
          <AnimatePresence mode="wait">
            <motion.span
              key={hoveringGraph ? "hover" : "default"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {hoveringGraph
                ? "spring(140, 18, 0.8)"
                : "cubic-bezier(0.16, 1, 0.3, 1)"}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function TrackLabel({
  color,
  index,
  name,
}: {
  color: string;
  index: string;
  name: string;
}) {
  return (
    <div className="mb-1.5 flex items-center gap-2 text-[10px] uppercase tracking-wider text-neutral-500">
      <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
      Track {index} · {name}
    </div>
  );
}

function Playhead({ percent }: { percent?: number }) {
  return (
    <AnimatePresence>
      {percent !== undefined && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none absolute inset-y-0 w-px bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
          style={{ left: `${percent}%` }}
        />
      )}
    </AnimatePresence>
  );
}
