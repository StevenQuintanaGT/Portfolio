// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
    shikiConfig: {
      // Same palette as the rest of the site
      theme: 'one-dark-pro',
      wrap: false,
    },
  },
});
