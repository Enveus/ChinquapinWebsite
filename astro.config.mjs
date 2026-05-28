import { defineConfig } from 'astro/config';

// Pure static output. Cloudflare Pages serves `dist/` directly — no adapter
// is required for a fully static site. When we add Server Islands or any
// dynamic route, install `@astrojs/cloudflare` and set `adapter: cloudflare()`
// alongside `output: 'static'` (islands) or `output: 'server'` (full SSR).
//
// Tailwind v4 is wired through PostCSS (see postcss.config.mjs) rather than
// the @tailwindcss/vite plugin — the Vite plugin has a known incompatibility
// with the rolldown-vite that ships in Astro 6 (Missing field `tsconfigPaths`).
export default defineConfig({
  site: 'https://chinquapin.foundation',
  output: 'static',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
