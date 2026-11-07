import type { Project, ProjectImage } from '@/types/content';

// Independent concepts for fictional businesses; generated imagery is illustrative.
function photograph(project: string, alt: string) {
  const path = '/images/projects/' + project + '/cover';
  return {
    image: path + '-1600.webp',
    imageSrcSet:
      path +
      '-640.webp 640w, ' +
      path +
      '-960.webp 960w, ' +
      path +
      '-1600.webp 1600w',
    imageWidth: 1600,
    imageHeight: 1067,
    alt,
  };
}

function application(
  project: string,
  asset: string,
  label: string,
  caption: string,
  alt: string,
): ProjectImage {
  const path = '/images/projects/' + project + '/' + asset;
  return {
    src: path + '-1600.webp',
    srcSet:
      path +
      '-640.webp 640w, ' +
      path +
      '-960.webp 960w, ' +
      path +
      '-1600.webp 1600w',
    width: 1600,
    height: 1067,
    alt,
    label,
    caption,
    layout: 'wide',
  };
}

export const projects: Project[] = [
  {
    slug: 'northbound-travel',
    title: 'Northbound Travel',
    category: 'Websites',
    discipline: 'Travel retail · E-commerce concept',
    ...photograph(
      'northbound-travel',
      'Northbound Travel concept storefront on a laptop beside a practical navy carry-on in a working studio',
    ),
    description:
      'A straightforward online-store concept for a fictional luggage business. Clear product choices, practical details, and a visual identity that travels well.',
    challenge:
      'Make a varied luggage catalogue easy to browse without burying the practical details people need to compare products.',
    approach:
      'A simple black wordmark, navy product photography, and a clear shopping hierarchy create a consistent desktop and mobile direction. The study explores product discovery and presentation rather than a live store.',
    deliverables: [
      'Wordmark and visual direction',
      'Storefront and product-page concepts',
      'Responsive shopping interface studies',
      'Illustrative product and application photography',
    ],
    relatedServices: [
      'website-design-development',
      'ecommerce-development',
      'brand-identity-design',
    ],
    identity: {
      sector: 'Travel retail',
      headline: 'Clear choices. A consistent identity.',
      logo: '/images/projects/northbound-travel/logo.svg',
      logoAlt: 'Northbound Travel concept wordmark',
      logoDescription:
        'A compact, plain-speaking wordmark that stays readable on a screen, a woven label, or a paper hangtag.',
      typography:
        'A direct sans-serif hierarchy makes the product name, useful details, and next action easy to find.',
      palette: [
        { name: 'Navy', hex: '#202B3C' },
        { name: 'Ink', hex: '#202020' },
        { name: 'Paper', hex: '#F2F1ED' },
        { name: 'Grey', hex: '#A9AAA6' },
      ],
    },
    gallery: [
      application(
        'northbound-travel',
        'product',
        '01 / Product presentation',
        'Practical product details and a consistent photographic direction give the store a clear visual foundation.',
        'A Northbound Travel navy carry-on concept beside printed product drawings and fabric samples',
      ),
      application(
        'northbound-travel',
        'mobile',
        '02 / The mobile experience',
        'The same hierarchy adapted to a smaller screen, with room for the product and the information that helps people choose.',
        'Northbound Travel responsive store and product-page concepts shown on two smartphones with printed wireframes',
      ),
    ],
  },
  {
    slug: 'mason-and-reed',
    title: 'Mason & Reed',
    category: 'Branding',
    discipline: 'Furniture business · Brand identity concept',
    ...photograph(
      'mason-and-reed',
      'Mason and Reed furniture identity concept on a printed catalogue, business cards, and product specification sheet',
    ),
    description:
      'A practical identity concept for a fictional furniture business. A clear wordmark, a restrained palette, and printed materials that belong together.',
    challenge:
      'Create a recognisable identity that works across everyday business materials and product information without competing with the furniture.',
    approach:
      'A simple MR monogram and carefully spaced wordmark form the foundation. Muted sage, ordinary uncoated paper, and a consistent catalogue layout extend the identity into useful applications.',
    deliverables: [
      'Wordmark and MR monogram',
      'Colour and typography direction',
      'Catalogue and stationery concepts',
      'Showroom and material application studies',
    ],
    relatedServices: [
      'logo-design',
      'brand-identity-design',
      'brand-strategy-positioning',
    ],
    identity: {
      sector: 'Furniture & interiors',
      headline: 'An identity for everyday use.',
      logo: '/images/projects/mason-and-reed/logo.svg',
      logoAlt: 'Mason and Reed concept wordmark with an MR monogram',
      logoDescription:
        'An uncomplicated monogram keeps the identity compact while the spaced wordmark gives larger applications a calm, legible signature.',
      typography:
        'A practical sans-serif system connects the catalogue, specifications, stationery, and showroom signage.',
      palette: [
        { name: 'Sage', hex: '#929B7D' },
        { name: 'Charcoal', hex: '#262626' },
        { name: 'Paper', hex: '#EEEEE7' },
        { name: 'Stone', hex: '#B3B5AE' },
      ],
    },
    gallery: [
      application(
        'mason-and-reed',
        'showroom',
        '01 / A physical setting',
        'An imagined showroom application explores how the identity sits alongside the furniture without overwhelming the space.',
        'Mason and Reed concept signage in a modest furniture showroom with practical oak chairs',
      ),
      application(
        'mason-and-reed',
        'details',
        '02 / Printed details',
        'Catalogue information, material samples, and small brand applications follow the same restrained system.',
        'Mason and Reed catalogue details, care cards, wood samples, and a woven brand label',
      ),
    ],
  },
  {
    slug: 'fieldwork-supply',
    title: 'Fieldwork Supply',
    category: 'Websites',
    discipline: 'Homewares retail · Website concept',
    ...photograph(
      'fieldwork-supply',
      'Fieldwork Supply homewares-store concept on a laptop with a printed page wireframe',
    ),
    description:
      'A product-led store concept for a fictional homewares retailer, built around useful objects and straightforward browsing.',
    challenge:
      'Give a small everyday-product catalogue a clear structure and a consistent visual presentation.',
    approach:
      'A simple page hierarchy, quiet product imagery, and clear categories keep attention on the objects. Printed wireframes and the screen presentation illustrate the intended direction; no operating store is implied.',
    deliverables: [
      'Content and storefront structure',
      'Homepage design direction',
      'Product-grid interface study',
    ],
    relatedServices: ['website-design-development', 'ecommerce-development'],
  },
  {
    slug: 'bracken-studio',
    title: 'Bracken Studio',
    category: 'Branding',
    discipline: 'Architecture practice · Identity concept',
    ...photograph(
      'bracken-studio',
      'Bracken Studio architecture identity concept on stationery, presentation folders, and a folded floor plan',
    ),
    description:
      'A clear, restrained identity concept for a fictional architecture practice, expressed through practical printed materials.',
    challenge:
      'Create a visual identity that supports technical information and professional communication across different formats.',
    approach:
      'A compact typographic mark, black ink, and a fine green accent connect the folder, business card, and drawings. The work is an illustrative identity exploration.',
    deliverables: [
      'Wordmark and symbol direction',
      'Stationery and folder concepts',
      'Typography and application guidelines',
    ],
    relatedServices: [
      'logo-design',
      'brand-identity-design',
      'brand-strategy-positioning',
    ],
  },
  {
    slug: 'stockroom',
    title: 'Stockroom',
    category: 'Software',
    discipline: 'Order management · Product interface concept',
    ...photograph(
      'stockroom',
      'Stockroom order-management interface concept displayed on a desktop workstation',
    ),
    description:
      'An interface concept for a fictional order-management tool, focused on making day-to-day operational tasks easier to follow.',
    challenge:
      'Bring orders, inventory, and fulfilment status into a clear working interface without crowding the screen.',
    approach:
      'A stable navigation structure, legible table, and restrained status labels form the product direction. This is an interface study, not a shipped or validated software product.',
    deliverables: [
      'Task and information hierarchy',
      'Orders workspace interface',
      'Navigation and component direction',
    ],
    relatedServices: [
      'custom-software-development',
      'website-design-development',
    ],
  },
  {
    slug: 'cornerstone-coffee',
    title: 'Cornerstone Coffee',
    category: 'Creative production',
    discipline: 'Coffee retail · Packaging and advertising concept',
    ...photograph(
      'cornerstone-coffee',
      'Cornerstone Coffee packaging concept with kraft pouches, simple printed labels, and a takeaway cup',
    ),
    description:
      'A product-visual and packaging concept for a fictional neighbourhood coffee business, using a direct, everyday photographic approach.',
    challenge:
      'Build a recognisable visual direction that carries from a small package label to product advertising.',
    approach:
      'A straightforward wordmark and simple kraft-paper packaging establish the direction. The illustrative photograph explores how those details could work together in a practical commercial setting.',
    deliverables: [
      'Packaging visual direction',
      'Product advertising composition',
      'Brand application study',
    ],
    relatedServices: [
      'product-advertising-visuals',
      'brand-identity-design',
      'short-form-video-social-media-creatives',
    ],
  },
];
