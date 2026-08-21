import { Redis } from "@upstash/redis";
import type { FeaturedMap } from "@/lib/featured";
import { featuredKey } from "@/lib/featured";

const STORE_KEY = "portfolio:featured-state";

let client: Redis | null = null;

/** Lazily built so importing this module never throws at build/import time (e.g. before the
 *  Redis integration is provisioned) — callers only see an error when they actually try to
 *  read/write. Accepts either the KV_REST_API_* names Vercel's Redis integration injects or
 *  the underlying UPSTASH_REDIS_REST_* names, since either can end up in the environment
 *  depending on how the integration was added. */
function getClient(): Redis {
  if (client) return client;

  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error(
      "Redis isn't configured — set KV_REST_API_URL/KV_REST_API_TOKEN (or " +
        "UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN) from your Vercel Redis integration."
    );
  }

  client = new Redis({ url, token });
  return client;
}

/** Reads the whole featured-state map in one round trip. Returns {} — "nothing pinned", not
 *  an error — both when the key hasn't been written yet and, deliberately, when Redis isn't
 *  reachable or configured at all, so every page keeps rendering its default order instead of
 *  failing the request if the store has a bad moment. Server-only: uses a private REST token,
 *  never import this from a Client Component. */
export async function getFeaturedMap(): Promise<FeaturedMap> {
  try {
    const map = await getClient().get<FeaturedMap>(STORE_KEY);
    return map ?? {};
  } catch {
    return {};
  }
}

/** Read-modify-write against the single stored map — fine at this dataset's size (a few dozen
 *  items across all four sections) and low write frequency (one owner, clicking a toggle).
 *  Not safe against concurrent writers racing each other, which doesn't apply here. */
export async function setFeatured(
  pageId: string,
  groupId: string,
  itemId: string,
  on: boolean
): Promise<FeaturedMap> {
  const redisClient = getClient();
  const current = (await redisClient.get<FeaturedMap>(STORE_KEY)) ?? {};
  const key = featuredKey(pageId, groupId, itemId);

  const next = { ...current };
  if (on) {
    next[key] = Date.now();
  } else {
    delete next[key];
  }

  await redisClient.set(STORE_KEY, next);
  return next;
}
