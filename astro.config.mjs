// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { wikilinks } from './src/lib/wikilinks.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://msquintana.com',
  integrations: [
    // sitemap-index.xml for Google Search Console, with en/es alternates per page
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es' },
      },
    }),
  ],
  // English lives at "/", Spanish at "/es/"
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    // Astro's default Markdown processor, plus Obsidian ![[image]] and [[note]] support
    processor: satteri({ mdastPlugins: [wikilinks] }),
    shikiConfig: {
      // Same palette as the rest of the site
      theme: 'one-dark-pro',
      wrap: false,
    },
  },
});
