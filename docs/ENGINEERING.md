# eduassets-site — Engineering notes

Public landing page, articles, and an integrated documentation reader for eduAssets. This repository is independent from the application at [edu-assets/app-eduassets](https://github.com/edu-assets/app-eduassets): it does not share application code, state, components, or translation files.

## Domains

| Domain | Role |
|---|---|
| `eduassets.tech` | This site (landing page and `/articles/`). `www` redirects to the apex. |
| `app.eduassets.tech` | Interactive application, Guest Mode by default; served with `X-Robots-Tag: noindex`. |
| `api.eduassets.tech` | Backend API; this site does not call it. |
| `docs.eduassets.tech` | Public Markdown source fetched by the site reader. |

The site does not call the application API. The documentation reader fetches public Markdown from `https://docs.eduassets.tech`; `vercel.json` must allow this host in CSP `connect-src`. The frontend and backend CORS policies do not use this site as an API client.

## Stack

Astro static output, strict TypeScript, plain CSS, and MDX. Browser JavaScript is limited to interactions that require it, including the documentation reader.

## Structure

```text
src/
  pages/                         routes (/, /en/, /articles/, 404)
  layouts/                       BaseLayout: SEO, canonical, hreflang, Open Graph, JSON-LD
  features/landing/              landing sections
  features/landing/sections/Docs.astro       documentation section and dialog shell
  features/landing/sections/docs-modal.ts    client reader: load, search, TOC, links, sanitization
  features/articles/             article-specific components
  shared/components/              reusable components
  core/config/site.ts             site, app, repository, and docs URLs
  features/landing/content/       typed PT-BR/EN copy and documentation catalog
  styles/components/docs-modal.css reader layout and responsive states
  content/articles/               locale/slug MDX collection
  styles/                          base, component, and layout styles
scripts/sync-tokens.mjs
```

Features do not import other features. Landing copy follows the app's UI guidelines: descriptive titles, no marketing superlatives, no invented numbers, and no decorative cards.

## Design tokens

`src/styles/base/tokens.css` is generated from the app's `variables.css`:

```bash
npm run sync:tokens                       # expects the app repository next to this repo
node scripts/sync-tokens.mjs <path>       # or pass the file explicitly
```

Run the sync when the app's visual identity changes. If a third consumer appears or tokens drift, promote the tokens to a package.

## i18n

The landing page has static PT-BR (`/`) and English (`/en/`) routes. Articles are stored in locale folders; a new language needs a content folder and corresponding routes.

## Documentation reader

`Docs.astro` renders the bilingual catalog and dialog. Card titles and file paths live in `src/features/landing/content/{pt-br,en}.ts`; `technicalFiles` in `Docs.astro` controls which internal Markdown links remain inside the reader. `docs-modal.ts` fetches canonical files from `DOCS_BASE_URL` (`https://docs.eduassets.tech/docs`), shares in-flight requests and cached documents, renders with Marked, sanitizes HTML with DOMPurify, and builds document search and a table of contents. The dialog is keyboard-operable and uses responsive styles in `docs-modal.css`.

The reader is client-side JavaScript, not a zero-JavaScript page. The canonical Markdown remains in `edu-assets/docs-eduassets`; this site does not own another copy. If a document fails to load, the reader reports the error rather than displaying unsanitized content.

## Commands

```bash
npm run dev
npm run check
npm run build
npm run sync:tokens
npm run sync:icons -- <path-to-material-symbols-outlined.woff2>
```

`sync:icons` regenerates the local Material Symbols subset. Icons added dynamically by client code must also appear in the generator's explicit list; `content_copy` is included for the reader's generated code-copy buttons.

## Landing content and placeholders

Copy lives in `src/features/landing/content/{pt-br,en}.ts` (typed by `types.ts`); sections only render it. Anything not confirmed from the project is a visible `[PLACEHOLDER: ...]` string. Find them with:

```bash
grep -rn "PLACEHOLDER" src
```

### Replacing a screenshot placeholder

Drop the real capture in `src/assets/screenshots/` using a file name listed in that folder's README (`dashboard`, `emprestimos`, `dashboard-historico`, or `controle`). The `Screenshot` component finds it by name and replaces the placeholder. See `docs/ASTRO.md` for where each feature is edited.
