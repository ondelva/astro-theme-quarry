// src/config.ts — single entry point for site settings. Everything site-specific lives here; never hardcode in components.
export const site = {
  name: 'Quarry',
  description: 'A marketing site for a developer tool, set like a printed technical reference.',
  url: 'https://example.com',
  locale: 'en', // BCP 47, e.g. 'en', 'ko'
  author: 'Ada Example', // Fictional demo company. Replace with your own
  defaultOgImage: '/og-default.png',
} as const;

export const nav = {
  header: [
    { label: 'How it works', href: '/#how' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Writing', href: '/blog' },
    { label: 'About', href: '/about' },
  ],
  // The header keeps one call to action to the right of the links above.
  cta: { label: 'Start free', href: '/pricing' },
  footer: [
    {
      title: 'Product',
      links: [
        { label: 'Pricing', href: '/pricing' },
        { label: 'Writing', href: '/blog' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
      ],
    },
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/', icon: 'lucide:github' },
    // Icons are Lucide names (https://lucide.dev/icons)
  ],
} as const;

export const seo = {
  titleTemplate: '%s · Quarry',
  twitterHandle: '',
  jsonLd: { type: 'Organization' as 'Person' | 'Organization', name: site.name },
};

export const blog = {
  postsPerPage: 10,
  showReadingTime: true,
};

export const contact = {
  // Where /contact posts. Any service that accepts a plain form POST works:
  // Formspree, Web3Forms, Basin. Replace the id; nothing else on the page changes.
  formEndpoint: 'https://formspree.io/f/your-form-id',
  email: 'hello@example.com', // shown beside the form for people who would rather write
  responseTime: 'Two working days, usually the same one.',
};

export const features = {
  darkMode: true,
  // The signature: numbered labels that stay in the left margin while a section
  // scrolls. Off puts the label inline above the section heading instead.
  marginalIndex: true,
  // A flag lands here when something reads it. One that controls nothing is worse
  // than no flag, because a buyer turns it on and waits.
};

export const analytics = {
  provider: null as null | 'plausible' | 'ga4' | 'umami',
  id: '',
  // Self-hosted Plausible or Umami: the origin serving the script, no trailing slash.
  // Empty means the hosted service. GA4 ignores it.
  host: '',
};
