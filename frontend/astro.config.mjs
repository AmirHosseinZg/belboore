import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://belboore.ir',
  integrations: [sitemap()],
});
