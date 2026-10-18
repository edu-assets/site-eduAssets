import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://eduassets.tech',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  // The CSP is `script-src 'self'`: never inline bundled scripts into the HTML.
  vite: { build: { assetsInlineLimit: 0 } },
  i18n: {
    defaultLocale: 'pt-br',
    locales: ['pt-br', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
