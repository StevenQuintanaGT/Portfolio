import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../config';
import { getPosts, postUrl } from '../lib/blog';

// Published articles only, even while running `npm run dev`
export async function GET(context: APIContext) {
  const posts = await getPosts({ includeDrafts: false });

  return rss({
    title: `${site.name} — Blog`,
    description: 'Networking, infrastructure and security write-ups · Redes, infraestructura y seguridad.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      categories: post.data.tags,
      // Each article links to the version of the blog in its own language
      link: postUrl(post.data.lang, post),
    })),
  });
}
