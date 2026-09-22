# Changelog

All notable changes to this project are documented here. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.9.0] - 2026-09-22

First snapshot of the free edition, cut from Quarry Pro. The live demo and the screenshots
follow in 1.0.0.

### Added

- The marketing set: home, pricing, about, contact, the legal pages, 404.
- The marginal index: a numbered label that stays in the left margin while its section scrolls.
  Pure CSS — the number is a counter, so it is never typed.
- One measure (38rem) from the hero to the last post, and one accent colour on the numbers, the
  current position and the focus ring.
- The writing set: list, post, tags, feed, reading time.
- Pricing from one JSON file, three plans, no client JavaScript.
- Syntax colouring built from the theme's own tokens, so `pnpm check:contrast` can measure it.
- Dark mode, analytics (Plausible, GA4, Umami) behind a switch, `robots.txt`, the sitemap.
- `docs/customization.md`, `docs/content.md`, `docs/deploy.md`, and `AGENTS.md`.
