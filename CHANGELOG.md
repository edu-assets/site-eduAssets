# Changelog — eduAssets site

## 1.2.0 — Product minor release status — 2026-11-12

- Synchronized the site release status (hero, footer, README) and package metadata with the product's official 1.2.0 release: self-service email password recovery, automatic API deployment after CI and HTTP 5xx alerting, recorded in the central bilingual changelog.
- Updated vulnerable transitive dependencies reported by `npm audit` (`undici`, `zod`, `fast-xml-parser`, `fast-uri`); `npm audit` now reports 0 vulnerabilities.

## 1.1.0 — Product minor release status — 2026-11-12

- Synchronized the site release status (hero, footer, README) and package metadata with the product's official 1.1.0 release: administrator password reset, network-resilient logout and continuous-operation tooling, recorded in the central bilingual changelog.
- The `security.txt` validity is now checked by the API repository's scheduled `Uptime` workflow, which alerts 30 days before `Expires`.

## 1.0.2 — Product patch status — 2026-11-12

- Synchronized the site package metadata with the product's official 1.0.2 patch release (frontend interface fixes recorded in the central bilingual changelog).
- Published `/.well-known/security.txt` (RFC 9116) with the vulnerability-disclosure contact, served as `text/plain` via Cloudflare Pages headers.

## 1.0.1 — Product patch status — 2026-10-28

- Synchronized the site release status and package metadata with the product's official 1.0.1 patch release. The site's 1.0.0 visual/content work remains unchanged; backend security fixes and production deployment evidence are recorded in the central bilingual changelog.

## 1.0.0 — Official release — 2026-10-28

- Clarified the project challenge and solution with stronger headings and adjacent icons; updated the database label to “Banco de dados”.
- Kept navigation labels on one line and shortened the author link to “Autor”.
- Rebuilt the technology stack cards with locally served technology logos in a shared SVG sprite.
- Grouped documentation links by purpose and balanced the responsive grids, centering incomplete rows where necessary.
- Added an optimized profile portrait, placed social links below the location, removed the repeated profile heading, and sized the profile card to its content.
- Updated the Portuguese and English site status to identify version 1.0 as official.

This entry records the site changes included in the 1.0 publication; it does not describe external hosting or service-health checks.
