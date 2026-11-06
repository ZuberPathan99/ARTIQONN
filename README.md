# ARTIQONN

An original monochrome website for ARTIQONN, a Technology & Design Company.

## Local development

Use Node.js 22.13 or newer on the Node 22 release line, or Node 24+ (Node 22 is configured for Netlify).

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. If your shell uses an older Node version, switch to Node 22 before installing or running the project.

```sh
npm run typecheck
npm run lint
npm run format:check
npm run build
npm run preview
npm test
```

`npm run preview` serves the production build at http://127.0.0.1:4173. It serves the generated 404 page for unknown URLs and deliberately rejects form submissions. `npm test` builds and starts its own production preview, runs Playwright with installed Google Chrome, and stops the server afterward. The tests mock form requests; they never send a real inquiry. Use `npx playwright install chromium` and remove `channel: 'chrome'` from the Playwright config if Chrome is unavailable.

## Stack and architecture

- React 19, strict TypeScript, and Vite.
- React Router framework mode with static prerendering and automatic route splitting.
- Tailwind CSS v4 and an original, centralised design system.
- Customised shadcn/ui button and input patterns; Radix Dialog handles accessible mobile navigation.
- Lucide icons and Motion with reduced-motion support.
- Zod validation and Netlify Forms integration; no production application server or database.

`src/root.tsx` is the document and shared layout. `src/routes.ts` declares routes. `src/pages/` composes pages; `src/features/` contains portfolio and contact behavior. Typed services and studies live in `src/data/`, shared components in `src/components/`, configuration in `src/config/site.ts`, and global tokens and responsive styles in `src/styles/globals.css`.

The build generates HTML for the home, services, work, about, contact, privacy, all 13 service pages, all six concept pages, and a 404 page. The output is `build/client`. The server-rendering entry is used only during builds and development; React Router removes the server build for static deployment. All published routes have static HTML, so Netlify serves direct visits without a runtime server. Unknown URLs return the generated 404 page with HTTP 404.

## Content and artwork

The six portfolio entries are **original independent concepts**, clearly labelled on cards and detail pages. They do not represent real clients, completed commissions, shipped products, or business results. Nomara (travel and e-commerce) and Alder & Form (furniture branding) include original logos, colour palettes, and extended galleries of AI-generated application images. Replace or extend `src/data/projects.ts` with verified project information and authorised assets when available. The software filter intentionally has an informative empty state.

All artwork was created for this site. Portfolio SVGs scale without multiple resolution variants. The hero uses prioritised responsive WebP exports to reduce mobile decoding and rendering work; its original SVG is retained as editable source. Offscreen portfolio artwork is lazy-loaded. Inter Variable Latin is self-hosted as one WOFF2 file, with its SIL Open Font License in `public/fonts/OFL.txt`.

The new concept photographs are stored in `public/images/projects/nomara/` and `public/images/projects/alder-and-form/`, with responsive 640px, 960px, and 1600px WebP versions. `scripts/prepare-brand-images.mjs` creates these exports from selected originals. The built-in Imagegen prompt set is recorded in `docs/brand-image-prompts.json`. Reference agency assets are used only for visual research and are not included in the site.

`npm run assets:generate` regenerates the original graphics and responsive WebP exports, copies Inter from Fontsource, and renders a PNG social preview. These generated assets are included as source files, so an ordinary build does not need to regenerate them. Image processing dependencies are used only during development.

## Netlify deployment

No deployment or remote repository push is performed automatically. To launch when authorised:

1. Connect this repository to Netlify. The build command and publish directory are configured in `netlify.toml`.
2. Set a verified `VITE_SITE_URL` HTTPS origin, or use Netlify's automatically supplied `URL`. Canonicals, social metadata, robots.txt, sitemap.xml, and organisation structured data use this origin. Builds with no origin deliberately disable indexing and omit invented URLs.
3. Configure verified public contact details through `VITE_CONTACT_EMAIL` and `VITE_CONTACT_PHONE`, if desired. Empty values are omitted from the UI.
4. Enable **Forms → Enable form detection** in Netlify before deploying. Set `VITE_CONTACT_ENABLED=true` in the Netlify build environment. `public/contact-form.html` and the prerendered contact form expose all field names to Netlify's build scanner.
5. Deploy, submit a real test inquiry, and verify receipt in Netlify Forms. Configure form notification recipients in Netlify. Local automated tests verify the UI and request format, not actual Netlify delivery.
6. Confirm company contact information, the privacy notice and retention arrangements, domain ownership, and approved portfolio content before public launch.

Do not place secrets in `VITE_*` variables: they are public browser configuration. Copy `.env.example` to `.env` for local settings if needed. Honeypot spam protection is included; Netlify's form spam processing applies after hosting is enabled.

Security and caching headers are configured in `netlify.toml`. The CSP permits inline scripts because React Router serialises hydration data into inline scripts. There are no analytics, tracking scripts, remote fonts, or autoplay video.

## Verification and practical limits

Playwright covers all page types, layout widths from 360px to 1920px, portfolio filtering and URL persistence, mobile focus trapping and Escape behavior, form validation, mocked success and server failure, image loading, reduced motion, and automated axe accessibility checks. The build checks the static form definition and generates robots.txt and sitemap.xml.

Automated accessibility checks supplement manual review; they do not certify WCAG conformance. Real Core Web Vitals and Lighthouse scores depend on the deployed host, device, and connection and should be measured after deployment. Business details, live form receipt, and actual client case studies remain launch tasks.

The development-only `minimatch` override selects a patched version for ESLint and TypeScript tooling. Reassess it when those packages adopt the fix upstream.
