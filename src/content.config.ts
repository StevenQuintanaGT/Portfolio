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

export const collections = { projects };
