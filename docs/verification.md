# Verification record

Verified locally on 7 November 2026 against the production static build.

| Check                                    | Result                                                                                                             |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| TypeScript strict checks and route types | Passed                                                                                                             |
| ESLint                                   | Passed                                                                                                             |
| Prettier                                 | Passed                                                                                                             |
| Production build                         | Passed; 22 content pages plus the 404 page prerendered                                                             |
| Playwright                               | 17 tests passed                                                                                                    |
| Layouts                                  | No horizontal overflow on representative pages at 360, 375, 768, 1024, 1440, and 1920px                            |
| Automated accessibility                  | No axe violations for WCAG 2 / 2.1 / 2.2 A and AA tags on nine representative pages                                |
| Mobile navigation                        | Focus trapping, Escape dismissal, focus restoration, and link dismissal passed                                     |
| Portfolio                                | Filtering, URL persistence, category empty state, and artwork loading passed                                       |
| Inquiry form                             | Validation, first-error focus, service preselection, mocked success, and failed-response input preservation passed |
| Reduced motion                           | Verified                                                                                                           |
| Dependency installation audit            | Zero reported vulnerabilities, including development dependencies                                                  |

The initial mobile Lighthouse baseline, before the expanded galleries and navigation update, measured **96 performance, 100 accessibility, and 100 best practices** against the local compressed production preview. Largest Contentful Paint was **2.7 seconds**, Total Blocking Time **0ms**, and Cumulative Layout Shift **0**. The decorative hero uses responsive WebP exports to reduce SVG paint work and transfer size. The measured LCP remains slightly above the 2.5-second target and should be reassessed on the final host. These are local lab measurements, not real-user Core Web Vitals or an INP measurement.

Desktop and mobile home screenshots are generated in `test-results/home-desktop.png` and `test-results/home-mobile.png`. Playwright's HTML report is in `playwright-report/`. These generated test artifacts are excluded from Git.

The current collection uses ten documentary-style generated images across Northbound Travel, Mason & Reed, Fieldwork Supply, Bracken Studio, Stockroom, and Cornerstone Coffee. All active portfolio covers have been replaced, and the two extended case studies have matching application galleries and vector identities. Both galleries passed image loading, accessibility, route, and six-width layout checks. Their desktop and mobile screenshots are in `test-results/northbound-travel-*.png` and `test-results/mason-and-reed-*.png`. The transparent navigation uses medium-size desktop type and a small decorative logo asterisk.

The service catalogue contains the ten approved offerings under Development, Branding & Design, and Creative Production. Each category is a keyboard-operable dropdown that reveals its image and service links. Browser checks verify exclusive opening, closing with the keyboard, category image loading, the same ordered list on Home and Services, all ten detail routes, matching inquiry options and service preselection, and a 404 response for a removed offering. Catalogue screenshots are in `test-results/services-desktop.png` and `test-results/services-mobile.png`.

The redesigned inquiry form uses a defined panel and bordered input fields. Budget has been removed from the visible UI, Zod schema, Netlify static definition, and privacy notice. Mocked submissions verify that no budget value is transmitted. Contact screenshots are in `test-results/contact-desktop.png` and `test-results/contact-mobile.png`; a fresh 375px Chrome view confirmed no horizontal overflow. Footer contact links use the user-provided email `hello@artiqonn.com` and Instagram handle `@artiqonn`, with corresponding icons.

The build emits harmless third-party Zod comment-annotation warnings; they do not fail compilation. React Router also displays migration guidance for its next major version during builds.

The default build has form submission and indexing disabled until configured. Before launch, set the verified HTTPS origin and business contact details, enable Netlify form detection and `VITE_CONTACT_ENABLED`, verify actual inquiry receipt, review business-specific privacy disclosures, and replace independent concepts with approved client work when available. No live form submission or production deployment was performed as part of these checks.
