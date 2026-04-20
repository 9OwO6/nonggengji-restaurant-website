/**
 * Customer reviews are loaded from ./customer-reviews.json (single source of truth).
 * Replace that file with your real Google Maps exports — do not auto-translate entries.
 * Each item has its own `language`: "en" | "zh"; UI filters by the active site language.
 */
import customerReviews from './customer-reviews.json';

export const GOOGLE_MAPS_REVIEW_URL =
  'https://www.google.com/maps/place/%E5%86%9C%E8%80%95%E8%AE%B0%C2%B7%E6%B9%98%E5%8D%97%E8%8F%9C/@49.1834402,-123.1387836,17z/data=!3m1!5s0x5486752899ffa27d:0x343d9e198ceccfca!4m14!1m5!8m4!1e1!2s101141081058858148760!3m1!1e1!3m7!1s0x5486750025a4b1cf:0xb46d87a9b48a9dcd!8m2!3d49.1834367!4d-123.1362087!9m1!1b1!16s%2Fg%2F11wv3lfwjc?hl=en&entry=ttu';

export type CustomerReviewEntry = {
  id: string;
  language: 'en' | 'zh';
  name: string;
  dateLabel: string;
  text: string;
  reviewCount?: string;
  photoThumbs?: string[];
};

const allReviews = customerReviews as CustomerReviewEntry[];

export function getReviewsForLanguage(lang: 'en' | 'zh'): CustomerReviewEntry[] {
  return allReviews.filter((r) => r.language === lang && r.text.trim().length > 0);
}

/** Local calendar date for "daily" rotation (visitor's timezone). */
export function getLocalDateKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function mulberryNext() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Pick a deterministic random subset for the given calendar day.
 * Same dayKey → same picks for everyone; different day → different shuffle.
 */
export function pickDailyRandomReviews(
  pool: CustomerReviewEntry[],
  dayKey: string,
  count = 3
): CustomerReviewEntry[] {
  if (pool.length === 0) return [];
  if (pool.length <= count) return [...pool];
  const seed = hashString(`${dayKey}|reviews-v1`);
  const rand = mulberry32(seed);
  const indices = Array.from({ length: pool.length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = indices[i]!;
    indices[i] = indices[j]!;
    indices[j] = tmp;
  }
  return indices.slice(0, count).map((i) => pool[i]!);
}
