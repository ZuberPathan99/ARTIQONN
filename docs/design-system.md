# Design direction

ARTIQONN uses a monochrome editorial identity: large, tightly tracked Inter Variable headings, restrained body copy, squared controls, thin rules, asymmetric composition, and generous space. A custom typographic wordmark and geometric convergence study connect the technology and creative disciplines without relying on purchased photography or animation-heavy visuals. The wordmark asterisk is decorative and does not claim trademark registration.

Tokens in `src/styles/globals.css` centralise the primary background (`#080808`), secondary surface (`#111111`), off-white type (`#f5f5f3`), secondary type (`#a3a3a3`), rules (`#292929`), and inverse paper (`#efefeb`). Spacing and display typography scale fluidly; content containers stop at 1680px.

Home moves from a typographic statement to company context, connected capabilities, original studies, the approach, and an inquiry invitation. Light editorial sections create changes in rhythm within the predominantly black website. Internal pages share the same introduction, labels, grids, and closing frame.

Motion is limited to slight viewport translations, button and image transitions, and the mobile menu entrance. Content is visible in server HTML. The system honours `prefers-reduced-motion` and uses native scrolling.

Navigation and form controls have visible focus states. Mobile navigation uses Radix Dialog for focus management, Escape dismissal, and background isolation. Contact inputs use visible labels and connected validation messages. Portfolio category state is retained in the URL and filter results are announced to assistive technology.

The sticky navigation has a transparent background with difference blending so its text adapts over dark and light content. Desktop navigation uses medium-weight 16px labels, with the mobile menu appearing below 960px to preserve comfortable spacing.

Nomara and Alder & Form extend the case-study template with an image-led presentation: campaign cover, brief, original vector identity, named colour swatches, typography direction, and responsive application galleries. Their image palettes belong to each concept; the surrounding site retains its monochrome identity. New mockup photography was created with built-in Imagegen and exported to responsive WebP files.

The portfolio artwork illustrates potential visual directions. Each card and study explicitly identifies its concept status, with no fictional clients or results.
