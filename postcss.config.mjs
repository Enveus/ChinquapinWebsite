/**
 * PostCSS pipeline.
 *
 * Tailwind v4 runs as a PostCSS plugin here (rather than the @tailwindcss/vite
 * plugin) to sidestep a rolldown-vite incompatibility in Astro 6. Astro picks
 * this file up automatically — no Vite wiring required.
 */
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
