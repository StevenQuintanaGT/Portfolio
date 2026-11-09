// Lets blog posts use Obsidian's wikilink syntax. Runs as a Sätteri mdast plugin
// (astro.config.mjs), before Astro collects images, so converted images are optimized.
//
//   ![[02-img.png]]            → image from the post's own folder
//   ![[02-img.png|Login page]] → same image, with alt text ("|300" sizes are ignored)
//   [[other-post]]             → link to /blog/other-post/ (or /es/blog/…)
//   [[other-post#Step 2|text]] → link to a heading, with custom text
//
// A link to a note that isn't a blog post (e.g. your study notes) becomes plain text.
// An image that isn't next to the post stops the build with a clear message.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const WIKILINK = /(!?)\[\[([^\]|\n]+?)(?:\|([^\]\n]*))?\]\]/g;
const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif|svg)$/i;
const BLOG_DIR = path.resolve('src/content/blog');

// Same idea as Astro's heading ids: lowercase, accents kept, spaces → dashes
function headingSlug(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-');
}

// A post is either blog/<slug>.md or blog/<slug>/index.md
function postExists(slug) {
  return (
    fs.existsSync(path.join(BLOG_DIR, `${slug}.md`)) ||
    fs.existsSync(path.join(BLOG_DIR, slug, 'index.md'))
  );
}

function toImage(target, label, fileURL) {
  const file = target.trim();
  if (fileURL) {
    const dir = path.dirname(fileURLToPath(fileURL));
    if (!fs.existsSync(path.join(dir, file))) {
      throw new Error(
        `[wikilinks] "${file}" no está junto al artículo (${path.relative(process.cwd(), dir)}). ` +
          'Mueve la imagen a la carpeta del artículo.',
      );
    }
  }
  // "|300" or "|300x200" is an Obsidian size, not alt text
  const alt = label && !/^\d+(x\d+)?$/.test(label.trim()) ? label.trim() : path.parse(file).name;
  return { type: 'image', url: `./${encodeURI(file)}`, alt };
}

function toLink(target, label) {
  const [notePath, heading] = target.split('#');
  const slug = path.basename(notePath.trim()).replace(/\.md$/i, '');
  const text = label?.trim() || heading?.trim() || slug;
  if (!postExists(slug)) return { type: 'text', value: text };
  // Relative, so it stays in the same language: /blog/a/ → /blog/b/, /es/blog/a/ → /es/blog/b/
  const url = `../${slug}/${heading ? `#${headingSlug(heading)}` : ''}`;
  return { type: 'link', url, children: [{ type: 'text', value: text }] };
}

export const wikilinks = {
  name: 'obsidian-wikilinks',
  text(node, ctx) {
    if (!node.value.includes('[[')) return;

    const parts = [];
    let last = 0;
    for (const match of node.value.matchAll(WIKILINK)) {
      const [whole, bang, target, label] = match;
      if (match.index > last) parts.push({ type: 'text', value: node.value.slice(last, match.index) });
      if (bang && IMAGE_EXT.test(target.trim())) {
        parts.push(toImage(target, label, ctx.fileURL));
      } else {
        // Embedded notes (![[note]]) can't be shown on the site, so they link like [[note]]
        parts.push(toLink(target, label));
      }
      last = match.index + whole.length;
    }
    if (parts.length === 0) return;
    if (last < node.value.length) parts.push({ type: 'text', value: node.value.slice(last) });
    ctx.replaceNode(node, parts);
  },
};
