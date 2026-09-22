// The one place that reads collections. Pages import from here rather than calling
// getCollection themselves, so the draft filter, the sort orders and the date format
// exist once: a filter copied into every page is a filter one page eventually forgets.
import { getCollection } from 'astro:content';
import { site } from '../config';

export const getPosts = async () =>
  (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

export const getPlans = async () =>
  (await getCollection('plans')).sort((a, b) => a.data.order - b.data.order);

// timeZone is not optional here. A front matter date parses as midnight UTC, and
// without this every reader west of Greenwich is shown the day before.
const dayFormat = new Intl.DateTimeFormat(site.locale, {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

export const formatDate = (date: Date) => dayFormat.format(date);

/** The machine-readable half of a <time> element. */
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

/** Minutes at 230 words per minute, rounded up to at least one. */
export const readingTime = (body = '') =>
  Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 230));

export const money = (amount: number, currency = 'USD') =>
  new Intl.NumberFormat(site.locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);

/** Every tag in use, most-used first, then alphabetical. Drafts are already filtered out. */
export const getTags = async () => {
  const counts = new Map<string, number>();
  for (const post of await getPosts())
    for (const tag of post.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...counts]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
};

/** Slug for a tag URL. Tags are free text, so they are not URL-safe on their own. */
export const tagSlug = (tag: string) => tag.toLowerCase().replace(/[^a-z0-9]+/g, '-');
