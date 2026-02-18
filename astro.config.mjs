// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Vercel sets VERCEL_URL (e.g. your-project.vercel.app); use it for sitemap/canonical URLs
export default defineConfig({
  site: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://example.com',
  integrations: [sitemap()],
});
