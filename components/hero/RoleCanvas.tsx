"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import {
  type Pt,
  type HeroCanvasRoleId,
  POINT_COUNT_DESKTOP,
  POINT_COUNT_MOBILE,
  LAYOUTS,
  ROLE_ACCENT_VAR,
  ROLE_LABELS,
  AI_NODE_COUNT,
  AI_COLUMNS,
  aiNodeColumn,
  aiVideoEdges,
  seededRandom,
  MOTION_KEY_COUNT,
  BRAND_SWATCH_COUNT,
} from "@/lib/hero/roleStates";

const MOBILE_BREAKPOINT = 768;
type Rgb = [number, number, number];

// Isometric card tilt. rx/ry/rz halve at 1024–1279px (the 2-column layout, less room) and drop
// to flat (0deg) below 1024px, matching the grid: single stacked column, no 3D transform there.
// Angle tuned by comparing 10/14/18deg screenshots — 14 was the best "natural, still premium" fit.
const CARD_RX_DEG = 14;
const CARD_RY_DEG = -16;
const CARD_RZ_DEG = 1.5;

function cardBaseAngles(width: number): { rx: number; ry: number; rz: number } {
  if (width >= 1280) return { rx: CARD_RX_DEG, ry: CARD_RY_DEG, rz: CARD_RZ_DEG };
  if (width >= 1024) return { rx: CARD_RX_DEG / 2, ry: CARD_RY_DEG / 2, rz: CARD_RZ_DEG / 2 };
  return { rx: 0, ry: 0, rz: 0 };
}

interface Killable {
  kill: () => void;
}

function resolveCssColor(varName: string): string {
  if (typeof window === "undefined") return "#22d3ee";
  const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return v || "#22d3ee";
}

function hexToRgb(hex: string): Rgb {
  const clean = hex.replace("#", "").trim();
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const int = parseInt(full, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

function rgba(rgb: Rgb, a: number): string {
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;
}

/** Single generative canvas: one shared point pool that physically morphs between three
 *  layouts (neural graph / keyframe timeline / bezier path) instead of swapping graphics. */
export function RoleCanvas({ role }: { role: HeroCanvasRoleId }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const pointsRef = useRef<Pt[]>([]);
  const pointCountRef = useRef(POINT_COUNT_DESKTOP);
  const edgesRef = useRef<[number, number][]>([]);
  const nearestNodeRef = useRef<number[]>([]);
  const barSpikeRef = useRef<number[]>([]);

  const nodeHitRef = useRef<Set<number>>(new Set());
  const diamondHitRef = useRef<Set<number>>(new Set());

  const pulseState = useRef({ p: 0 });
  const playheadState = useRef({ p: 0.1 });
  const brandDraw = useRef({ p: 0 });
  const swatchSettleRef = useRef<number[]>([0, 0, 0, 0]);

  const roleRef = useRef<HeroCanvasRoleId>(role);
  const sizeRef = useRef({ w: 0, h: 0 });
  const baseAnglesRef = useRef({ rx: CARD_RX_DEG, ry: CARD_RY_DEG });
  const rafIdRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const accentRgbRef = useRef<Record<HeroCanvasRoleId, Rgb>>({
    "ai-video": [34, 211, 238],
    motion: [167, 139, 250],
    brand: [245, 158, 11],
  });
  const paletteRgbRef = useRef<Rgb[]>([
    [245, 158, 11],
    [124, 58, 237],
    [34, 211, 238],
    [248, 250, 252],
  ]);
  const continuousRef = useRef<Killable[]>([]);
  const isFirstRoleRef = useRef(true);

  // ---- helpers — plain functions closing over the refs above, safe to redefine per render ----

  function killContinuous() {
    continuousRef.current.forEach((t) => t.kill());
    continuousRef.current = [];
  }

  function enterRole(roleId: HeroCanvasRoleId) {
    killContinuous();
    nodeHitRef.current.clear();
    diamondHitRef.current.clear();
    if (reducedMotionRef.current) return;

    if (roleId === "ai-video") {
      pulseState.current.p = 0;
      continuousRef.current.push(
        gsap.to(pulseState.current, {
          p: 1,
          duration: 2.2,
          repeat: -1,
          ease: "power2.inOut",
          onRepeat: () => nodeHitRef.current.clear(),
        })
      );
    } else if (roleId === "motion") {
      playheadState.current.p = 0.1;
      continuousRef.current.push(
        gsap.to(playheadState.current, {
          p: 0.9,
          duration: 3.2,
          repeat: -1,
          ease: "none",
          onRepeat: () => diamondHitRef.current.clear(),
        })
      );
    } else {
      brandDraw.current.p = 0;
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(brandDraw.current, { p: 1, duration: 1.6, ease: "power2.inOut" })
        .to(brandDraw.current, { p: 1, duration: 2 })
        .set(brandDraw.current, { p: 0 });
      continuousRef.current.push(tl);

      swatchSettleRef.current = swatchSettleRef.current.map(() => 0);
      for (let i = 0; i < BRAND_SWATCH_COUNT; i++) {
        const obj = { t: 0 };
        continuousRef.current.push(
          gsap.to(obj, {
            t: 1,
            duration: 1.2,
            delay: i * 0.15,
            ease: "power1.inOut",
            onUpdate: () => {
              swatchSettleRef.current[i] = obj.t;
            },
          })
        );
      }
    }
  }

  function applyLayout(roleId: HeroCanvasRoleId, w: number, h: number, animate: boolean) {
    const layout = LAYOUTS[roleId];
    const n = pointCountRef.current;
    const points = pointsRef.current;
    if (!w || !h || points.length === 0) return;

    if (roleId === "ai-video") {
      edgesRef.current = aiVideoEdges();
      const nodeTargets: { x: number; y: number }[] = [];
      for (let i = 0; i < AI_NODE_COUNT; i++) {
        const L = layout(i, n, w, h);
        nodeTargets.push(L ? { x: L.x, y: L.y } : { x: 0, y: 0 });
      }
      const nearest: number[] = [];
      for (let i = AI_NODE_COUNT; i < n; i++) {
        const L = layout(i, n, w, h);
        if (!L) {
          nearest.push(0);
          continue;
        }
        let best = 0;
        let bestDist = Infinity;
        for (let k = 0; k < nodeTargets.length; k++) {
          const dx = nodeTargets[k].x - L.x;
          const dy = nodeTargets[k].y - L.y;
          const d = dx * dx + dy * dy;
          if (d < bestDist) {
            bestDist = d;
            best = k;
          }
        }
        nearest.push(best);
      }
      nearestNodeRef.current = nearest;
    }

    const targets = points.map((_, i) => layout(i, n, w, h));

    if (animate) {
      gsap.to(points, {
        x: (i: number) => targets[i]?.x ?? points[i].x,
        y: (i: number) => targets[i]?.y ?? points[i].y,
        r: (i: number) => targets[i]?.r ?? 0,
        a: (i: number) => targets[i]?.a ?? 0,
        duration: 0.9,
        ease: "power3.inOut",
        stagger: { amount: 0.55, from: "random" },
        overwrite: true,
        onStart: () => {
          for (let i = 0; i < n; i++) {
            const t = targets[i];
            if (t) points[i].role = t.role;
          }
        },
      });
    } else {
      gsap.killTweensOf(points);
      for (let i = 0; i < n; i++) {
        const t = targets[i];
        if (!t) continue;
        points[i].x = t.x;
        points[i].y = t.y;
        points[i].r = t.r;
        points[i].a = t.a;
        points[i].role = t.role;
      }
    }
  }

  function drawAiVideo(c: CanvasRenderingContext2D, w: number, h: number, rgb: Rgb) {
    const points = pointsRef.current;
    const edges = edgesRef.current;
    const pulseP = reducedMotionRef.current ? 0.5 : pulseState.current.p;

    c.lineWidth = 1;
    for (let e = 0; e < edges.length; e++) {
      const [ai, bi] = edges[e];
      const A = points[ai];
      const B = points[bi];
      const midX = (A.x + B.x) / 2;
      const nearPulse = Math.abs(midX / w - pulseP) < 0.12;
      c.strokeStyle = nearPulse ? rgba(rgb, 0.7) : rgba(rgb, 0.12);
      c.beginPath();
      c.moveTo(A.x, A.y);
      c.lineTo(B.x, B.y);
      c.stroke();
    }

    if (!reducedMotionRef.current) {
      for (let col = 0; col < AI_COLUMNS.length; col++) {
        const colX = AI_COLUMNS[col].x;
        if (Math.abs(colX - pulseP) < 0.02 && !nodeHitRef.current.has(col)) {
          nodeHitRef.current.add(col);
          for (let i = 0; i < AI_NODE_COUNT; i++) {
            if (aiNodeColumn(i) === col) {
              const pt = points[i];
              const baseR = 3;
              gsap.fromTo(
                pt,
                { r: baseR * 1.8 },
                { r: baseR, duration: 0.5, ease: "elastic.out(1, 0.5)", overwrite: "auto" }
              );
            }
          }
        }
      }
    }

    for (let i = 0; i < AI_NODE_COUNT; i++) {
      const pt = points[i];
      c.fillStyle = rgba(rgb, pt.a);
      c.beginPath();
      c.arc(pt.x, pt.y, Math.max(0.1, pt.r), 0, Math.PI * 2);
      c.fill();
    }

    const nearest = nearestNodeRef.current;
    const now = performance.now() / 1000;
    for (let i = AI_NODE_COUNT; i < points.length; i++) {
      const pt = points[i];
      const driftX = Math.sin(now * 0.3 + pt.seed * 10) * 6;
      const driftY = Math.cos(now * 0.25 + pt.seed * 8) * 6;
      let dx = pt.x + driftX;
      let dy = pt.y + driftY;

      const ni = nearest[i - AI_NODE_COUNT];
      if (ni !== undefined && !reducedMotionRef.current) {
        const node = points[ni];
        const col = aiNodeColumn(ni);
        const closeness = Math.max(0, 1 - Math.abs(AI_COLUMNS[col].x - pulseP) / 0.18);
        const pull = closeness * 0.5;
        dx = dx + (node.x - dx) * pull;
        dy = dy + (node.y - dy) * pull;
      }

      c.fillStyle = rgba(rgb, pt.a);
      c.beginPath();
      c.arc(dx, dy, Math.max(0.1, pt.r), 0, Math.PI * 2);
      c.fill();
    }
  }

  function drawMotion(c: CanvasRenderingContext2D, w: number, h: number, rgb: Rgb) {
    const points = pointsRef.current;
    const playP = reducedMotionRef.current ? 0.5 : playheadState.current.p;
    const spikes = barSpikeRef.current;

    if (!reducedMotionRef.current) {
      c.strokeStyle = rgba(rgb, 0.9);
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(playP * w, 0);
      c.lineTo(playP * w, h);
      c.stroke();
    }

    for (let i = 0; i < MOTION_KEY_COUNT; i++) {
      const pt = points[i];
      const xf = pt.x / w;
      if (!reducedMotionRef.current && Math.abs(xf - playP) < 0.015 && !diamondHitRef.current.has(i)) {
        diamondHitRef.current.add(i);
        const baseR = 5;
        gsap.fromTo(
          pt,
          { r: baseR },
          { r: baseR * 1.7, duration: 0.35, ease: "back.out(3)", yoyo: true, repeat: 1, overwrite: "auto" }
        );

        const barCount = points.length - MOTION_KEY_COUNT;
        const order: number[] = [];
        for (let b = 0; b < barCount; b++) order.push(b);
        order.sort(
          (a, b) =>
            Math.abs(points[MOTION_KEY_COUNT + a].x - pt.x) -
            Math.abs(points[MOTION_KEY_COUNT + b].x - pt.x)
        );
        for (const bIdx of order.slice(0, 2)) {
          const targetIndex = MOTION_KEY_COUNT + bIdx;
          const spikeObj = { v: 2 };
          gsap.to(spikeObj, {
            v: 1,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
            onUpdate: () => {
              spikes[targetIndex] = spikeObj.v;
            },
          });
        }
      }

      c.save();
      c.translate(pt.x, pt.y);
      c.rotate(Math.PI / 4);
      c.fillStyle = rgba(rgb, pt.a);
      const s = pt.r;
      c.fillRect(-s, -s, s * 2, s * 2);
      c.restore();
    }

    const barBaseHeight = h * 0.18;
    for (let i = MOTION_KEY_COUNT; i < points.length; i++) {
      const pt = points[i];
      const bi = i - MOTION_KEY_COUNT;
      const seedWave =
        Math.sin(bi * 0.7) * 0.5 + Math.sin(bi * 1.9 + 1.2) * 0.3 + Math.sin(bi * 3.3 + 2.4) * 0.2;
      const wave = 0.35 + Math.abs(seedWave) * 0.65;
      const spike = spikes[i] ?? 1;
      const barH = barBaseHeight * wave * spike;
      c.fillStyle = rgba(rgb, pt.a);
      c.fillRect(pt.x - pt.r, pt.y - barH, pt.r * 2, barH);
    }
  }

  function drawBrand(c: CanvasRenderingContext2D, w: number, h: number, rgb: Rgb) {
    const points = pointsRef.current;
    const drawP = reducedMotionRef.current ? 1 : brandDraw.current.p;
    const pathCount = points.length - BRAND_SWATCH_COUNT;

    c.strokeStyle = "rgba(255,255,255,0.06)";
    c.lineWidth = 1;
    const cols = 6;
    for (let col = 1; col < cols; col++) {
      const x = (col / cols) * w;
      c.beginPath();
      c.moveTo(x, 0);
      c.lineTo(x, h);
      c.stroke();
    }
    const rows = 4;
    for (let rI = 1; rI < rows; rI++) {
      const y = (rI / rows) * h;
      c.beginPath();
      c.moveTo(0, y);
      c.lineTo(w, y);
      c.stroke();
    }

    for (let i = 0; i < pathCount; i++) {
      const pt = points[i];
      const t = pathCount <= 1 ? 0 : i / (pathCount - 1);
      if (t > drawP) continue;
      c.fillStyle = rgba(rgb, pt.a);
      c.beginPath();
      c.arc(pt.x, pt.y, Math.max(0.1, pt.r), 0, Math.PI * 2);
      c.fill();
    }

    const palette = paletteRgbRef.current;
    for (let si = 0; si < BRAND_SWATCH_COUNT; si++) {
      const pt = points[pathCount + si];
      if (!pt) continue;
      const settle = reducedMotionRef.current ? 1 : (swatchSettleRef.current[si] ?? 1);
      const finalColor = palette[si] ?? rgb;
      let color = finalColor;
      if (settle < 1) {
        const cycleIdx = Math.floor(settle * palette.length) % palette.length;
        color = palette[cycleIdx] ?? finalColor;
      }
      c.fillStyle = rgba(color, pt.a);
      c.beginPath();
      c.arc(pt.x, pt.y, Math.max(0.1, pt.r), 0, Math.PI * 2);
      c.fill();
    }
  }

  function drawFrame() {
    const c = ctxRef.current;
    const { w, h } = sizeRef.current;
    if (!c || !w || !h) return;
    c.clearRect(0, 0, w, h);
    const roleId = roleRef.current;
    const rgb = accentRgbRef.current[roleId];
    if (roleId === "ai-video") drawAiVideo(c, w, h, rgb);
    else if (roleId === "motion") drawMotion(c, w, h, rgb);
    else drawBrand(c, w, h, rgb);
  }

  function startLoop() {
    if (runningRef.current) return;
    runningRef.current = true;
    const tick = () => {
      if (!runningRef.current) return;
      drawFrame();
      rafIdRef.current = requestAnimationFrame(tick);
    };
    rafIdRef.current = requestAnimationFrame(tick);
  }

  function stopLoop() {
    runningRef.current = false;
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }

  // ---- mount: create the point pool once, wire up canvas sizing + observers ----
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    accentRgbRef.current = {
      "ai-video": hexToRgb(resolveCssColor(ROLE_ACCENT_VAR["ai-video"])),
      motion: hexToRgb(resolveCssColor(ROLE_ACCENT_VAR.motion)),
      brand: hexToRgb(resolveCssColor(ROLE_ACCENT_VAR.brand)),
    };
    paletteRgbRef.current = [
      hexToRgb(resolveCssColor("--warning")),
      hexToRgb(resolveCssColor("--violet-600")),
      hexToRgb(resolveCssColor("--cyan-400")),
      hexToRgb(resolveCssColor("--white-50")),
    ];

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mql.matches;

    // offsetWidth/Height, not getBoundingClientRect — the wrapper sits inside a CSS 3D
    // transform (rotateX/Y tilt), and getBoundingClientRect would return the rotated
    // on-screen bounding box instead of the element's true layout size, distorting the canvas.
    const initialWidth = wrap.offsetWidth || window.innerWidth;
    const n = initialWidth < MOBILE_BREAKPOINT ? POINT_COUNT_MOBILE : POINT_COUNT_DESKTOP;
    pointCountRef.current = n;
    pointsRef.current = Array.from({ length: n }, (_, i) => ({
      x: seededRandom(i * 2.1 + 1) * initialWidth,
      y: seededRandom(i * 3.7 + 5) * 300,
      r: 1,
      a: 0,
      role: "idle" as const,
      seed: seededRandom(i),
    }));
    barSpikeRef.current = new Array(n).fill(1);

    function resize() {
      const w = wrap!.offsetWidth;
      const h = wrap!.offsetHeight;
      // Bumped from the usual x2 cap: a canvas inside a CSS 3D transform gets resampled
      // by the compositor and goes soft, so the backing store needs extra headroom.
      const dpr = Math.min((window.devicePixelRatio || 1) * 1.5, 3);
      sizeRef.current = { w, h };
      canvas!.width = Math.max(1, Math.round(w * dpr));
      canvas!.height = Math.max(1, Math.round(h * dpr));
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      applyLayout(roleRef.current, w, h, false);
      drawFrame();
    }

    resize();

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const ro = new ResizeObserver(() => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
          if (!reducedMotionRef.current) startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: [0, 0.1, 1] }
    );
    io.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) stopLoop();
      else if (!reducedMotionRef.current) startLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onMotionPrefChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
      if (e.matches) {
        stopLoop();
        killContinuous();
        drawFrame();
      } else {
        enterRole(roleRef.current);
        startLoop();
      }
    };
    mql.addEventListener("change", onMotionPrefChange);

    enterRole(roleRef.current);
    if (!reducedMotionRef.current) startLoop();
    else drawFrame();

    return () => {
      stopLoop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      mql.removeEventListener("change", onMotionPrefChange);
      killContinuous();
      gsap.killTweensOf(pointsRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- role changes after mount: morph-tween into the new layout ----
  useEffect(() => {
    roleRef.current = role;
    if (isFirstRoleRef.current) {
      isFirstRoleRef.current = false;
      return;
    }

    const { w, h } = sizeRef.current;
    if (!w || !h) return;

    if (reducedMotionRef.current) {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.style.transition = "opacity 150ms ease";
        canvas.style.opacity = "0";
      }
      const id = setTimeout(() => {
        applyLayout(role, w, h, false);
        drawFrame();
        if (canvas) canvas.style.opacity = "1";
      }, 150);
      return () => clearTimeout(id);
    }

    applyLayout(role, w, h, true);
    enterRole(role);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  // ---- isometric tilt + pointer parallax — purely presentational, independent of the point system ----
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    function applyBaseAngles() {
      const { rx, ry, rz } = cardBaseAngles(window.innerWidth);
      baseAnglesRef.current = { rx, ry };
      el!.style.setProperty("--card-rx", `${rx}deg`);
      el!.style.setProperty("--card-ry", `${ry}deg`);
      el!.style.setProperty("--card-rz", `${rz}deg`);
    }
    applyBaseAngles();

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    function onResize() {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applyBaseAngles, 150);
    }
    window.addEventListener("resize", onResize);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || window.innerWidth < 1024) {
      return () => {
        window.removeEventListener("resize", onResize);
        if (resizeTimer) clearTimeout(resizeTimer);
      };
    }

    const setRx = gsap.quickTo(el, "--card-rx", { duration: 0.6, ease: "power2.out" });
    const setRy = gsap.quickTo(el, "--card-ry", { duration: 0.6, ease: "power2.out" });

    function onMove(e: MouseEvent) {
      if (window.innerWidth < 1024) return;
      const rect = el!.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setRx(baseAnglesRef.current.rx - py * 8);
      setRy(baseAnglesRef.current.ry + px * 8);
    }
    function onLeave() {
      setRx(baseAnglesRef.current.rx);
      setRy(baseAnglesRef.current.ry);
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="[--card-persp:1600px] [perspective:var(--card-persp)]">
      <div
        ref={wrapRef}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px]"
        style={{
          transformStyle: "preserve-3d",
          transform:
            "rotateX(var(--card-rx, 0deg)) rotateY(var(--card-ry, 0deg)) rotateZ(var(--card-rz, 0deg))",
          transformOrigin: "60% 50%",
          willChange: "transform",
          background: "var(--card-panel-bg)",
          boxShadow: "var(--card-shadow), var(--card-edge-light)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute bottom-4 left-5">
          <AnimatePresence mode="wait">
            <motion.span
              key={role}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="font-mono text-[11px] tracking-[0.08em] text-text-body/50"
            >
              {ROLE_LABELS[role]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
