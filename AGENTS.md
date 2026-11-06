# Project conventions

- Use React, Vite, strict TypeScript, Tailwind v4, React Router, and the established shadcn/ui patterns. Avoid adding UI libraries or production infrastructure without a concrete need.
- Keep the monochrome design tokens and typography in `src/styles/globals.css`. Use the existing layout and common components; keep feature code near the page that owns it.
- Keep content in typed local data files. Never invent clients, testimonials, credentials, awards, team members, founding dates, project outcomes, or statistics. Retain independent-concept labels until verified client content replaces the studies.
- Every new public route must have meaningful metadata and be included in static prerendering. Maintain proper 404 behavior and the generated sitemap.
- Keep configuration and contact information centralised. Never place secrets in browser environment variables.
- Forms must show success only after a successful response; preserve input on failure. Keep the static Netlify form definition aligned with every form field. Never use real inquiries for automated tests.
- Use semantic HTML, keyboard-operable controls, visible focus, appropriate intrinsic image dimensions, and reduced-motion support. Self-host fonts and avoid heavyweight animations or third-party tracking.
- Run `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm run build`, and relevant Playwright tests after changes. Test production output at representative mobile and desktop widths.
- Keep documentation current. Do not deploy, publish, push, or change external hosting settings without user authorisation.
