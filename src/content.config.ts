import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per project and language:
// src/content/projects/en/<name>.md and src/content/projects/es/<name>.md
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    problem: z.string(),
    result: z.string(),
    tools: z.array(z.string()),
    // Source code and live site/download. Each one shows as a button when set.
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    order: z.number().default(99),
    // Drafts stay hidden until you fill them in.
    draft: z.boolean().default(false),
  }),
});

// Articles and write-ups: src/content/blog/<slug>.md
// The file name is the URL: dns-cloudflare.md → /blog/dns-cloudflare/
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z
    .object({
      // Drafts may leave title and description empty while you write;
      // published articles must have both (checked below).
      title: z.string().nullish(),
      // Used for SEO, link previews and the blog list
      description: z.string().nullish(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      tags: z.array(z.string()).nullish().transform((tags) => tags ?? []),
      // Language the article is written in
      lang: z.enum(['es', 'en']).default('es'),
      // Drafts only show while running `npm run dev`, never in the published site
      draft: z.boolean().default(false),
    })
    .superRefine((data, ctx) => {
      if (data.draft) return;
      for (const field of ['title', 'description'] as const) {
        if (!data[field]?.trim()) {
          ctx.addIssue({
            code: 'custom',
            path: [field],
            message: `"${field}" is required to publish (set draft: true while it's empty)`,
          });
        }
      }
    })
    // Pages always get text: an empty draft title shows as "(sin título)" in `npm run dev`
    .transform((data) => ({
      ...data,
      title: data.title?.trim() || '(sin título)',
      description: data.description?.trim() ?? '',
    })),
});

export const collections = { projects, blog };
