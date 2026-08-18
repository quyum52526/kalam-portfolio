export type PointRole = "node" | "edge" | "key" | "bar" | "swatch" | "path" | "idle" | "tree-node";

export interface Pt {
  x: number;
  y: number;
  r: number;
  a: number;
  role: PointRole;
  seed: number;
}

export type HeroCanvasRoleId = "ai-video" | "motion" | "brand" | "web-dev";

export const POINT_COUNT_DESKTOP = 48;
export const POINT_COUNT_MOBILE = 24;

export type LayoutResult = { x: number; y: number; r: number; a: number; role: Pt["role"] };
export type Layout = (i: number, n: number, w: number, h: number) => LayoutResult | null;

/** Deterministic 0..1 pseudo-random value for a given index — stable across re-layouts,
 *  so a point's jitter/drift never re-rolls between renders. */
export function seededRandom(i: number): number {
  const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return s - Math.floor(s);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// ---- ai-video: three-column neural graph + diffusion noise ----
export const AI_COLUMNS: { x: number; count: number }[] = [
  { x: 0.18, count: 8 },
  { x: 0.5, count: 6 },
  { x: 0.82, count: 8 },
];
export const AI_NODE_COUNT = AI_COLUMNS.reduce((sum, c) => sum + c.count, 0); // 22

/** Which column (0/1/2) a node-role index belongs to. */
export function aiNodeColumn(i: number): number {
  let idx = i;
  for (let col = 0; col < AI_COLUMNS.length; col++) {
    if (idx < AI_COLUMNS[col].count) return col;
    idx -= AI_COLUMNS[col].count;
  }
  return AI_COLUMNS.length - 1;
}

export const aiVideoLayout: Layout = (i, _n, w, h) => {
  if (i < AI_NODE_COUNT) {
    let idx = i;
    let col = 0;
    while (idx >= AI_COLUMNS[col].count) {
      idx -= AI_COLUMNS[col].count;
      col += 1;
    }
    const { x: colX, count } = AI_COLUMNS[col];
    const t = count === 1 ? 0.5 : idx / (count - 1);
    const y = lerp(0.2, 0.8, t) + (seededRandom(i) - 0.5) * 0.04;
    return { x: colX * w, y: y * h, r: 3, a: 0.7, role: "node" };
  }
  // Diffusion noise — parked at a stable seeded position; drift + pull-to-node is draw-time only.
  const nx = seededRandom(i * 2.1 + 1);
  const ny = seededRandom(i * 3.7 + 5);
  return { x: nx * w, y: ny * h, r: 1, a: 0.25, role: "idle" };
};

/** Every (colIndex, colIndex+1) node pair — the fixed edge list, built once per state entry. */
export function aiVideoEdges(): [number, number][] {
  const edges: [number, number][] = [];
  let start = 0;
  for (let c = 0; c < AI_COLUMNS.length - 1; c++) {
    const aCount = AI_COLUMNS[c].count;
    const b0 = start + aCount;
    const bCount = AI_COLUMNS[c + 1].count;
    for (let a = 0; a < aCount; a++) {
      for (let b = 0; b < bCount; b++) {
        edges.push([start + a, b0 + b]);
      }
    }
    start += aCount;
  }
  return edges;
}

// ---- motion: keyframe diamonds + audio bars ----
export const MOTION_KEY_COUNT: number = 7;

export const motionLayout: Layout = (i, n, w, h) => {
  if (i < MOTION_KEY_COUNT) {
    const t = MOTION_KEY_COUNT === 1 ? 0.5 : i / (MOTION_KEY_COUNT - 1);
    const x = lerp(0.12, 0.88, t);
    return { x: x * w, y: 0.35 * h, r: 5, a: 0.8, role: "key" };
  }
  const barCount = n - MOTION_KEY_COUNT;
  const bi = i - MOTION_KEY_COUNT;
  const t = barCount <= 1 ? 0.5 : bi / (barCount - 1);
  const x = lerp(0.06, 0.94, t);
  return { x: x * w, y: 0.62 * h, r: 1.5, a: 0.6, role: "bar" };
};

// ---- brand: one self-drawing cubic bezier + palette swatches ----
export const BRAND_SWATCH_COUNT = 4;
export const BRAND_SWATCH_X = [0.2, 0.4, 0.6, 0.8] as const;

/** A single cubic bezier, normalised 0..1 — the classic ease-in-out S curve. */
export const BRAND_BEZIER = {
  p0: { x: 0.1, y: 0.68 },
  p1: { x: 0.3, y: 0.16 },
  p2: { x: 0.62, y: 0.16 },
  p3: { x: 0.9, y: 0.68 },
};

export function sampleBrandPath(t: number): { x: number; y: number } {
  const mt = 1 - t;
  const { p0, p1, p2, p3 } = BRAND_BEZIER;
  const x = mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x;
  const y = mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y;
  return { x, y };
}

export const brandLayout: Layout = (i, n, w, h) => {
  const pathCount = n - BRAND_SWATCH_COUNT;
  if (i < pathCount) {
    const t = pathCount <= 1 ? 0 : i / (pathCount - 1);
    const p = sampleBrandPath(t);
    return { x: p.x * w, y: p.y * h, r: 2, a: 0.9, role: "path" };
  }
  const si = i - pathCount;
  return { x: BRAND_SWATCH_X[si] * w, y: 0.78 * h, r: 14, a: 1, role: "swatch" };
};

// ---- web-dev: top-down component tree, right-angle elbow connectors ----
export const WEB_DEV_ROOT = { x: 0.5, y: 0.16 };
export const WEB_DEV_LEVEL2_X = [0.3, 0.7];
export const WEB_DEV_LEVEL2_Y = 0.38;
export const WEB_DEV_LEVEL3_X = [0.18, 0.4, 0.6, 0.82];
export const WEB_DEV_LEVEL3_Y = 0.58;
export const WEB_DEV_LEVEL4_COUNT = 8;
export const WEB_DEV_LEVEL4_Y = 0.78;
/** 1 root + 2 + 4 + 8 leaves. */
export const WEB_DEV_TREE_NODE_COUNT = 1 + WEB_DEV_LEVEL2_X.length + WEB_DEV_LEVEL3_X.length + WEB_DEV_LEVEL4_COUNT;

function webDevLevel4X(i: number): number {
  return lerp(0.12, 0.88, WEB_DEV_LEVEL4_COUNT <= 1 ? 0.5 : i / (WEB_DEV_LEVEL4_COUNT - 1));
}

export const webDevLayout: Layout = (i, _n, w, h) => {
  if (i === 0) {
    return { x: WEB_DEV_ROOT.x * w, y: WEB_DEV_ROOT.y * h, r: 6, a: 0.9, role: "tree-node" };
  }
  if (i <= WEB_DEV_LEVEL2_X.length) {
    const idx = i - 1;
    return { x: WEB_DEV_LEVEL2_X[idx] * w, y: WEB_DEV_LEVEL2_Y * h, r: 4.5, a: 0.85, role: "tree-node" };
  }
  const level3Start = 1 + WEB_DEV_LEVEL2_X.length;
  if (i < level3Start + WEB_DEV_LEVEL3_X.length) {
    const idx = i - level3Start;
    return { x: WEB_DEV_LEVEL3_X[idx] * w, y: WEB_DEV_LEVEL3_Y * h, r: 4, a: 0.8, role: "tree-node" };
  }
  const level4Start = level3Start + WEB_DEV_LEVEL3_X.length;
  if (i < level4Start + WEB_DEV_LEVEL4_COUNT) {
    const idx = i - level4Start;
    return { x: webDevLevel4X(idx) * w, y: WEB_DEV_LEVEL4_Y * h, r: 3, a: 0.75, role: "tree-node" };
  }
  // Leftover points -> dim "</>" tick marks, parked at a stable seeded position.
  const nx = seededRandom(i * 4.3 + 2);
  const ny = seededRandom(i * 5.9 + 7);
  return { x: nx * w, y: ny * h, r: 1, a: 0.15, role: "idle" };
};

/** Cascade depth for a tree-node index (0 = root, 1 = level2, 2 = level3, 3 = level4 leaves) —
 *  matches WebDevEdge.depth + 1, so a node "arrives" the instant its incoming edge finishes. */
export function webDevNodeDepth(i: number): number {
  if (i === 0) return 0;
  if (i <= WEB_DEV_LEVEL2_X.length) return 1;
  const level3Start = 1 + WEB_DEV_LEVEL2_X.length;
  if (i < level3Start + WEB_DEV_LEVEL3_X.length) return 2;
  return 3;
}

export interface WebDevEdge {
  from: number;
  to: number;
  /** 0 = root->level2, 1 = level2->level3, 2 = level3->level4 — drives the cascade reveal order. */
  depth: number;
}

/** Fixed parent/child index pairs for the tree (see webDevLayout for the index layout). */
export function webDevEdges(): WebDevEdge[] {
  const edges: WebDevEdge[] = [];
  const level2Start = 1;
  const level3Start = level2Start + WEB_DEV_LEVEL2_X.length;
  const level4Start = level3Start + WEB_DEV_LEVEL3_X.length;

  for (let i = 0; i < WEB_DEV_LEVEL2_X.length; i++) {
    edges.push({ from: 0, to: level2Start + i, depth: 0 });
  }
  // Each level-2 node fans out to 2 level-3 nodes (2 * 2 = 4).
  for (let i = 0; i < WEB_DEV_LEVEL3_X.length; i++) {
    const parent = level2Start + Math.floor(i / 2);
    edges.push({ from: parent, to: level3Start + i, depth: 1 });
  }
  // Each level-3 node fans out to 2 level-4 leaves (4 * 2 = 8).
  for (let i = 0; i < WEB_DEV_LEVEL4_COUNT; i++) {
    const parent = level3Start + Math.floor(i / 2);
    edges.push({ from: parent, to: level4Start + i, depth: 2 });
  }
  return edges;
}

export const LAYOUTS: Record<HeroCanvasRoleId, Layout> = {
  "ai-video": aiVideoLayout,
  motion: motionLayout,
  brand: brandLayout,
  "web-dev": webDevLayout,
};

/** Byte-exact per spec — resolved from these CSS custom properties at runtime (see globals.css):
 *  ai-video -> --cyan-400, motion -> --violet-400 (NOT --violet-600, contrast), brand -> --warning,
 *  web-dev -> --emerald-400. */
export const ROLE_ACCENT_VAR: Record<HeroCanvasRoleId, string> = {
  "ai-video": "--cyan-400",
  motion: "--violet-400",
  brand: "--warning",
  "web-dev": "--emerald-400",
};

export const ROLE_LABELS: Record<HeroCanvasRoleId, string> = {
  "ai-video": "NEURAL GRAPH",
  motion: "KEYFRAME TIMELINE",
  brand: "IDENTITY SYSTEM",
  "web-dev": "COMPONENT TREE",
};
