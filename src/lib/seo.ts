import { site } from '@/config/site';

export function pageMeta(
  title: string,
  description: string,
  path: string,
  noindex = false,
) {
  const fullTitle =
    title === site.tagline ? `ARTIQONN — ${title}` : `${title} — ARTIQONN`;
  const url = site.origin ? `${site.origin}${path === '/' ? '' : path}` : '';
  return [
    { title: fullTitle },
    { name: 'description', content: description },
    {
      name: 'robots',
      content: !site.origin || noindex ? 'noindex, nofollow' : 'index, follow',
    },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: site.name },
    { name: 'twitter:card', content: 'summary_large_image' },
    ...(url
      ? [
          { tagName: 'link' as const, rel: 'canonical', href: url },
          { property: 'og:url', content: url },
          {
            property: 'og:image',
            content: `${site.origin}/images/social-preview.png`,
          },
          { property: 'og:image:width', content: '1200' },
          { property: 'og:image:height', content: '630' },
          {
            property: 'og:image:alt',
            content: 'ARTIQONN — Technology Meets Creativity.',
          },
          {
            name: 'twitter:image',
            content: `${site.origin}/images/social-preview.png`,
          },
        ]
      : []),
  ];
}
