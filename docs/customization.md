# Customization

Everything site-specific lives in `src/config.ts` and `src/styles/theme.css`. You should not have
to open a component for any of the changes below.

## Site identity

`src/config.ts`, the `site` object:

- `name` — the wordmark in the header, the footer, and every page title. It is set type, not an
  image: change the word here and the typeface sets it.
- `description` — the meta description, the feed, and the fallback share card.
- `url` — your production URL. Set it before you deploy: canonical links, the feed, the sitemap
  and `robots.txt` all print absolute URLs from it.
- `locale` — a BCP 47 tag. It is the `lang` attribute, and it decides how dates and prices are
  formatted (`Intl`). The words the theme prints are English, in the components.
- `author` — the fallback byline on a post, and the name in the JSON-LD.
- `defaultOgImage` — the share card for every page. `public/og-default.png` ships with the theme,
  set in the theme's own faces; replace that file, or point this at another 1200×630 one.

## Footer credit

The footer carries one line crediting the theme: `Quarry theme by Ondelva`, linking to the theme
repository. It is a plain link in `src/components/common/Footer.astro` — delete it if you would
rather not have it. Keeping it is how other people find the theme. Quarry Pro ships without it.

## Navigation, footer and social links

`src/config.ts`, the `nav` object:

- `nav.header` — the links in the sticky bar. Four is what fits a phone beside the wordmark and
  the icons; a fifth wraps.
- `nav.cta` — the one button to the right of the links. One, not two.
- `nav.footer` — groups, each a `title` and a list of `links`.
- `nav.social` — icon links. `icon` is a Lucide name (`lucide:github`, see lucide.dev/icons). Your
  own SVG goes in `src/icons/` and is referenced by its filename without the extension.

## Colours and other tokens

`src/styles/theme.css` is your override file. Every token and its default is in
`src/styles/tokens.css` — read that file, do not edit it. Declarations in `theme.css` are
unlayered, so they win without specificity tricks:

```css
:root {
  --primary: light-dark(#8c1f2f, #e08792);
  --content-width: 42rem;
}
```

Colours use `light-dark(<light>, <dark>)`. Overriding with a plain colour changes both modes at
once. The tokens worth knowing:

- `--background`, `--surface`, `--foreground`, `--muted`, `--faint`, `--border` — paper, ink, and
  the two greys between them. `--surface` is the tint on code blocks and panels;
  `--faint` is every mono label: rail numbers, filenames, breadcrumbs, dates.
- `--primary`, `--primary-hover`, `--on-primary`, `--focus-ring` — the one accent. It carries the
  rail numbers, the current position and the focus ring, and nothing else. There is no second
  accent by design; a coloured section background is not the instrument this theme plays.
- `--danger` — invalid fields and their messages, and the `flag` line in a section rail.
- `--code-comment`, `--code-keyword`, `--code-string`, `--code-number`, `--code-function` — five
  scopes and the ink. The syntax colours are tokens rather than an imported Shiki theme, which is
  what lets the blocks follow light and dark with the rest of the page and be measured for
  contrast like everything else.
- `--content-width` (38rem — the one measure, from the hero to the last post), `--wide-width`
  (the page container), `--rail-width` and `--rail-gap` (the left margin the index lives in).
  `--shell-width` is computed from the last three and is not a knob.
- `--radius` (3px), `--transition-fast`.

Change a colour and run `pnpm check:contrast`. It measures every text token on every background,
light and dark, against WCAG AA and prints the ratios. Add a token to one of the two lists at the
top of `scripts/check-contrast.mjs` and it is measured from then on. A palette of your own can
live in a `src/styles/tokens-<name>.css` beside the defaults and `@import`ed at the top of
`theme.css`; the check picks it up and measures it too.

## Dark mode

`features.darkMode` prints the toggle in the header. The colours themselves are `light-dark()`
pairs in the tokens, and the switch only writes `data-theme` on `<html>` plus a `localStorage`
entry, so there is no `dark:` variant to write and no second palette to keep in sync. Turn the
flag off and the site follows the operating system.

## Webfonts

`fonts:` in `astro.config.mjs`. Two faces, both OFL and both self-hosted by the fontsource
provider: Public Sans on `--font-body` and JetBrains Mono on `--font-mono`. `--font-heading`
points at `--font-body`, because headings here differ by weight, not by face.

To swap a face, change `name` in that block to another fontsource family and keep the
`cssVariable`. Load the weights you actually use — 400, 500 and 600 for the body, 400 and 500 for
the mono — and keep the preloads in `src/layouts/Base.astro` pointing at faces that exist. Do not
link an external font CDN; the point of the provider is that nothing leaves your domain.

For a system stack instead, override `--font-body` in `theme.css` and delete the block.

## The marginal index

The signature: a numbered label that stays in the left margin while its section scrolls.
`features.marginalIndex = false` drops the label inline above the section heading instead, and
nothing else about the page changes.

A section is one `<Section>` (`src/components/common/Section.astro`) inside a `.rail` container:

```astro
<Section label="How it works" id="how" class="mt-24">
  …
</Section>
```

- The number is a CSS counter over the sections in that container, so it is never typed and never
  out of date. `numbered={false}` prints the label without one.
- `note` is a second line in the rail — a date, a version, a count — and `flag` is the same line
  in `--danger`.
- `as` is the label's element. It is a `<p>` by default. Where the label _is_ the outline of the
  page, make it `as="h2"` and let the section's own `###` follow it in order; do not set it to a
  heading where the section title is not part of the outline.

Below 900px the label moves above its section on every page, whatever the flag says.

## Blog

`src/config.ts`, the `blog` object:

- `postsPerPage` — page size for `/blog` and the tag pages.
- `showReadingTime` — the "6 min" in the byline. Minutes at 230 words, rounded up.

## Pricing

The plans are content, not markup: `src/content/plans.json`, one object per plan, `order` top to
bottom. See [content.md](content.md) for the fields. `/pricing` sets them and adds nothing of its
own but the billing questions, which are page copy because they are about billing rather than
about any one plan.

## Contact form

`src/config.ts`, the `contact` object. `formEndpoint` is where `/contact` posts: any service that
takes a plain form POST works — Formspree, Web3Forms, Basin. Replace the id and nothing else on
the page changes. `email` is printed beside the form for people who would rather write, and
`responseTime` is the sentence under it.

## MDX

`.mdx` is enabled for content, so a post can hold a component of your own. `pnpm format` does not
touch `src/content/**/*.mdx` (see `.prettierignore`): Prettier's Markdown printer reflows a fenced
code block that sits inside a JSX element and turns it into one line. Set those files by hand.

## Analytics

`src/config.ts`, the `analytics` object. Nothing is loaded until both `provider` and `id` are set,
so the default build ships no third-party script. `provider` is `'plausible'`, `'ga4'` or
`'umami'`; `host` points at your own origin for a self-hosted Plausible or Umami and is ignored by
GA4. The tag is rendered by `src/components/common/Analytics.astro`, at the end of `<head>`.

If you turn it on, say so on `/privacy`: the page as shipped states that no analytics script is
loaded.

## SEO

`src/config.ts`, the `seo` object: `titleTemplate` (`%s` is the page title), `twitterHandle`, and
`jsonLd`, which is the publisher block — `type` is `'Organization'` or `'Person'`. Everything else
in `<head>` is `src/components/common/SEO.astro`; pages pass a title and a description, and the
rest is derived.

## Favicon

`public/favicon.svg` and `public/favicon.ico`. Both are referenced from `Base.astro`.
