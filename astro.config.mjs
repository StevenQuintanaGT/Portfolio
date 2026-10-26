// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://msquintana.com',
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
