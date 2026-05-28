# Chinquapin Ridge Philanthropic — website

Source for [chinquapin.foundation](https://chinquapin.foundation). Built with
Astro 6 + Tailwind v4, hosted on Cloudflare Pages. Push to `main` deploys to
production; PRs get preview URLs automatically.

For project context, conventions, brand guidance, and guardrails, read
[CLAUDE.md](./CLAUDE.md) first.

## Local development

Requires **Node 22.12+** (see `.nvmrc`).

```sh
npm install
npm run dev      # http://localhost:4321
npm run check    # type-check + content schema validation
npm run build    # produces dist/
npm run preview  # serve the built site locally
```

## Deploy

Cloudflare Pages is wired to this repo via Git integration. The build command
is `npm run build`, the output directory is `dist`, and the Node version comes
from `.nvmrc`. No manual deploy step.
