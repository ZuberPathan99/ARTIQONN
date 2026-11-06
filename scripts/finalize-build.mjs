import { copyFile, readFile, writeFile } from 'node:fs/promises';
import { loadEnv } from 'vite';

const directory = 'build/client';
const rawOrigin =
  process.env.VITE_SITE_URL ||
  loadEnv('production', process.cwd(), 'VITE_').VITE_SITE_URL ||
  process.env.URL ||
  '';
const origin = rawOrigin.replace(/\/$/, '');
if (origin && !/^https:\/\/[a-z\d.-]+(?::\d+)?$/i.test(origin))
  throw new Error('VITE_SITE_URL must be an HTTPS origin, without a path.');
const { globSync } = await import('node:fs');
const routes = globSync(`${directory}/**/index.html`)
  .map(
    (file) => file.slice(directory.length).replace(/\/index\.html$/, '') || '/',
  )
  .filter((route) => route !== '/404');
await writeFile(
  `${directory}/robots.txt`,
  origin
    ? `User-agent: *\nAllow: /\nDisallow: /contact-form.html\nDisallow: /404\nSitemap: ${origin}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n',
);
await writeFile(
  `${directory}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${origin ? routes.map((route) => `<url><loc>${origin}${route === '/' ? '' : route}</loc></url>`).join('') : ''}</urlset>\n`,
);
await copyFile(`${directory}/404/index.html`, `${directory}/404.html`);
const contactHtml = await readFile(`${directory}/contact/index.html`, 'utf8');
if (
  !contactHtml.includes('name="inquiry"') ||
  !contactHtml.includes('name="message"')
)
  throw new Error('The contact form is missing from pre-rendered HTML.');
console.log(
  `Verified ${routes.length} pre-rendered pages and the static inquiry form. ${origin ? 'Canonical origin: ' + origin : 'No public origin set; indexing is disabled for this build.'}`,
);
