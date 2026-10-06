# eduassets-site — Engineering notes

Public landing page and articles for eduAssets. This repository is **independent** from the app
(`dasilva-thiago/edu-assets`): no shared code, state, components, or translation files.

## Domains

| Domain | Role |
|---|---|
| `eduassets.tech` | This site (landing + `/articles/`). `www` redirects (301) to the apex. |
| `app.eduassets.tech` | Interactive app, Guest Mode by default. Served with `X-Robots-Tag: noindex`. |
| `api.eduassets.tech` | Backend API. Not used by this site. |

The site must never call the API, so the CSP has no `connect-src` and the backend `CORS_ORIGIN` does not list it.

## Stack

Astro (static output) + TypeScript (strictest) + plain CSS + MDX. JavaScript only where an interaction needs it.

## Structure

```
src/
  pages/            routes only (/, /en/, /articles/, 404)
  layouts/          BaseLayout: SEO, canonical, hreflang, Open Graph, JSON-LD
  features/landing  landing sections (one responsibility per file)
  features/articles article-specific components
  shared/components used by 3+ places (rule of three)
  core/             config (site.ts), seo, i18n
  content/articles/ <locale>/<slug>.mdx  (collection schema in src/content.config.ts)
  styles/           base (fonts, tokens, reset), components, layout
  assets/           images processed by astro:assets
scripts/sync-tokens.mjs
```

Features do not import other features. Landing copy follows the app's UI guidelines: descriptive titles, no
marketing superlatives, no invented numbers, no decorative cards.

## Design tokens

`src/styles/base/tokens.css` is **generated** from the app's `variables.css`:

```bash
npm run sync:tokens                       # expects ../edu-assets next to this repo
node scripts/sync-tokens.mjs <path>       # or pass the file explicitly
```

Run it when the app's visual identity changes. If a third consumer appears or tokens drift, promote this
to a package.

## i18n

Static routes: pt-BR at `/`, English at `/en/`. Articles are stored per locale folder so new languages
only add a folder and routes.

## Commands

`npm run dev` · `npm run build` · `npm run check` · `npm run sync:tokens`

CI and Lighthouse budgets are intentionally deferred until the first visual version is done.
