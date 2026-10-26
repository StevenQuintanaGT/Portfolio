import type { APIRoute } from 'astro';
import { site } from '../../config';
import { getPosts, type Post } from '../../lib/blog';
import { renderOgImage, type OgCard } from '../../lib/og';
import { ui, type Lang } from '../../i18n/ui';

// One preview image per page type, built as static PNGs:
//   /og/home-en.png  /og/home-es.png  /og/blog-en.png  /og/blog-es.png
//   /og/blog/<post-id>.png  (one per article)
export async function getStaticPaths() {
  const cards: { path: string; card: OgCard }[] = [];

  for (const lang of ['en', 'es'] as Lang[]) {
    cards.push({
      path: `home-${lang}`,
      card: { command: 'whoami', title: site.name, subtitle: ui[lang]['hero.role'] },
    });
    cards.push({
      path: `blog-${lang}`,
      card: { command: 'ls ~/blog', title: `Blog — ${site.name}`, subtitle: ui[lang]['blog.description'] },
    });
  }

  const posts: Post[] = await getPosts();
  for (const post of posts) {
    cards.push({
      path: `blog/${post.id}`,
      card: {
        command: `cat ${post.id}.md`,
        title: post.data.title,
        subtitle: post.data.description,
        tags: post.data.tags,
      },
    });
  }

  return cards.map(({ path, card }) => ({ params: { path }, props: { card } }));
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage(props.card as OgCard);
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
