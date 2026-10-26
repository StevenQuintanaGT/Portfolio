import { getCollection, type CollectionEntry } from 'astro:content';
import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Lang } from '../i18n/ui';

export type Post = CollectionEntry<'blog'>;

// Published posts, newest first. Drafts are included only in `npm run dev`
// (or when asked for explicitly) so you can preview them while writing.
export async function getPosts({ includeDrafts = import.meta.env.DEV } = {}) {
  const posts = await getCollection('blog', ({ data }) => includeDrafts || !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// "Redes y DNS" → "redes-y-dns"
export function tagSlug(tag: string) {
  return tag
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Every tag used by the given posts, keyed by slug, sorted alphabetically
export function getTags(posts: Post[]) {
  const tags = new Map<string, string>();
  for (const post of posts) {
    for (const tag of post.data.tags) tags.set(tagSlug(tag), tag);
  }
  return [...tags.entries()].sort((a, b) => a[1].localeCompare(b[1]));
}

// About 200 words per minute, at least 1 minute. Code blocks count too.
export function readingTime(post: Post) {
  const words = (post.body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(date: Date, lang: Lang) {
  // Frontmatter dates are parsed as UTC midnight, so format them in UTC too
  return new Intl.DateTimeFormat(lang, { dateStyle: 'long', timeZone: 'UTC' }).format(date);
}

// Blog URLs. English chrome lives at /blog, Spanish chrome at /es/blog.
export const blogUrl = (lang: Lang, path = '') => getRelativeLocaleUrl(lang, `blog/${path}`);
export const postUrl = (lang: Lang, post: Post) => blogUrl(lang, `${post.id}/`);
export const tagUrl = (lang: Lang, tag: string) => blogUrl(lang, `tags/${tagSlug(tag)}/`);
