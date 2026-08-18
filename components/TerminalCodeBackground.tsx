"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TokenColor = "kw" | "fn" | "cm" | "val";

interface Token {
  t: string;
  c?: TokenColor;
}

const COLORS: Record<TokenColor, string> = {
  kw: "#38bdf8",
  fn: "#818cf8",
  cm: "#64748b",
  val: "#64748b",
};

const PLAIN_COLOR = "#94a3b8";

const LINES: Token[][] = [
  [
    { t: "const" },
    { t: " { fps, width, height } = " },
    { t: "useVideoConfig", c: "fn" },
    { t: "();" },
  ],
  [
    { t: "spring", c: "fn" },
    { t: "({ frame, fps: " },
    { t: "30", c: "val" },
    { t: ", config: { damping: " },
    { t: "18", c: "val" },
    { t: " } });" },
  ],
  [
    { t: "<" },
    { t: "Sequence", c: "kw" },
    { t: " from={" },
    { t: "0", c: "val" },
    { t: "} durationInFrames={" },
    { t: "90", c: "val" },
    { t: "}>" },
  ],
  [
    { t: "ffmpeg -i input.mov -c:v " },
    { t: "libx264", c: "kw" },
    { t: " -crf " },
    { t: "18", c: "val" },
    { t: " -preset slow output.mp4" },
  ],
  [
    { t: "ffmpeg -i in.mp4 -vf " },
    { t: '"scale=1920:-2"', c: "cm" },
    { t: " -c:a " },
    { t: "aac", c: "kw" },
    { t: " -b:a " },
    { t: "192k", c: "val" },
    { t: " out.mp4" },
  ],
  [
    { t: "ffprobe -v error -show_entries " },
    { t: "stream=width,height", c: "cm" },
    { t: " -of json input.mp4" },
  ],
  [
    { t: "sample", c: "fn" },
    { t: " = " },
    { t: "ddim_sampler", c: "fn" },
    { t: "(model, steps=" },
    { t: "50", c: "val" },
    { t: ", cfg_scale=" },
    { t: "7.5", c: "val" },
    { t: ")" },
  ],
  [
    { t: "noise = " },
    { t: "torch.randn_like", c: "fn" },
    { t: "(latents) * " },
    { t: "scheduler", c: "kw" },
    { t: ".init_noise_sigma" },
  ],
  [
    { t: "for", c: "kw" },
    { t: " t in " },
    { t: "scheduler.timesteps", c: "fn" },
    { t: ": latents = " },
    { t: "step", c: "fn" },
    { t: "(latents, t, noise_pred)" },
  ],
  [
    { t: "uniform", c: "kw" },
    { t: " float " },
    { t: "u_time", c: "val" },
    { t: ";" },
  ],
  [
    { t: "vec3", c: "kw" },
    { t: " col = " },
    { t: "0.5", c: "val" },
    { t: " + " },
    { t: "0.5", c: "val" },
    { t: " * " },
    { t: "cos", c: "fn" },
    { t: "(u_time + uv.xyx + vec3(0,2,4));" },
  ],
  [
    { t: "gl_FragColor", c: "fn" },
    { t: " = " },
    { t: "vec4", c: "fn" },
    { t: "(col, " },
    { t: "1.0", c: "val" },
    { t: ");" },
  ],
  [{ t: "// render pass — 24fps, linear color space", c: "cm" }],
  [{ t: "npx remotion render src/index.ts out/final.mp4" }],
  [
    { t: "with", c: "kw" },
    { t: " torch." },
    { t: "no_grad", c: "fn" },
    { t: "(): logits = model(x)" },
  ],
  [
    { t: "ffmpeg -f lavfi -i " },
    { t: '"color=black:s=1920x1080"', c: "cm" },
    { t: " -t " },
    { t: "5", c: "val" },
    { t: " bg.mp4" },
  ],
];

const MAX_BUFFER_LINES = 25;
const MIN_CHAR_DELAY_MS = 18;
const MAX_CHAR_DELAY_MS = 42;
const MIN_LINE_PAUSE_MS = 150;
const MAX_LINE_PAUSE_MS = 450;

function pickLineIndex(exclude: number) {
  if (LINES.length === 1) return 0;
  let next = Math.floor(Math.random() * LINES.length);
  while (next === exclude) next = Math.floor(Math.random() * LINES.length);
  return next;
}

function lineLength(tokens: Token[]) {
  return tokens.reduce((sum, t) => sum + t.t.length, 0);
}

function TypedLine({ tokens, typedLength }: { tokens: Token[]; typedLength: number }) {
  let remaining = typedLength;
  const segments: { text: string; color: string; key: number }[] = [];

  tokens.forEach((token, i) => {
    if (remaining <= 0) return;
    const slice = token.t.slice(0, remaining);
    remaining -= token.t.length;
    segments.push({
      text: slice,
      color: token.c ? COLORS[token.c] : PLAIN_COLOR,
      key: i,
    });
  });

  return (
    <>
      {segments.map((s) => (
        <span key={s.key} style={{ color: s.color }}>
          {s.text}
        </span>
      ))}
    </>
  );
}

let lineIdCounter = 0;

/** Dim vertical terminal — types out real production code line by line, scrolling upward. */
export function TerminalCodeBackground({ className }: { className?: string }) {
  const [completedLines, setCompletedLines] = useState<
    { id: number; tokens: Token[] }[]
  >([]);
  const [currentTokens, setCurrentTokens] = useState<Token[]>(LINES[0]);
  const [typedLength, setTypedLength] = useState(0);

  const currentIndexRef = useRef(0);
  const typedLengthRef = useRef(0);
  const rafRef = useRef(0);
  const lastCharTimeRef = useRef(0);
  const nextCharDelayRef = useRef(MIN_CHAR_DELAY_MS);
  const pauseUntilRef = useRef(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    function tick(now: number) {
      if (now < pauseUntilRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (now - lastCharTimeRef.current >= nextCharDelayRef.current) {
        lastCharTimeRef.current = now;
        nextCharDelayRef.current =
          MIN_CHAR_DELAY_MS +
          Math.random() * (MAX_CHAR_DELAY_MS - MIN_CHAR_DELAY_MS);

        const tokens = LINES[currentIndexRef.current];
        const totalLength = lineLength(tokens);
        const next = typedLengthRef.current + 1;
        typedLengthRef.current = next;

        if (next >= totalLength) {
          setCompletedLines((prev) =>
            [...prev, { id: lineIdCounter++, tokens }].slice(-MAX_BUFFER_LINES)
          );
          pauseUntilRef.current =
            now +
            MIN_LINE_PAUSE_MS +
            Math.random() * (MAX_LINE_PAUSE_MS - MIN_LINE_PAUSE_MS);

          const newIndex = pickLineIndex(currentIndexRef.current);
          currentIndexRef.current = newIndex;
          typedLengthRef.current = 0;
          setCurrentTokens(LINES[newIndex]);
          setTypedLength(0);
        } else {
          setTypedLength(next);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden opacity-30",
        className
      )}
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
      }}
    >
      <div className="flex h-full flex-col justify-end gap-0.5 px-4 py-2 font-mono text-[13px] leading-6 whitespace-pre">
        {completedLines.map((line) => (
          <motion.div
            key={line.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <TypedLine tokens={line.tokens} typedLength={lineLength(line.tokens)} />
          </motion.div>
        ))}
        <motion.div layout>
          <TypedLine tokens={currentTokens} typedLength={typedLength} />
          <motion.span
            aria-hidden
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
            style={{ color: "#38bdf8" }}
          >
            █
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}
