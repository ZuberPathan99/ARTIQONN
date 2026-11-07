import type { Service, ServiceGroup } from '@/types/content';

export const serviceGroups: {
  title: ServiceGroup;
  number: string;
  image: string;
  imageAlt: string;
  introduction: string;
}[] = [
  {
    title: 'Development',
    number: '01',
    image: '/images/projects/stockroom/cover',
    imageAlt:
      'A practical order-management interface shown on a desktop workstation, an original software concept',
    introduction:
      'Websites, online stores, and software shaped around the way your business works.',
  },
  {
    title: 'Branding & Design',
    number: '02',
    image: '/images/projects/mason-and-reed/cover',
    imageAlt:
      'Mason and Reed concept identity applied to printed furniture catalogues and stationery',
    introduction:
      'A clear identity, a recognisable mark, and a direction that connects every touchpoint.',
  },
  {
    title: 'Creative Production',
    number: '03',
    image: '/images/projects/cornerstone-coffee/cover',
    imageAlt:
      'Cornerstone Coffee packaging and product advertising concept photographed on a café counter',
    introduction:
      'Product visuals, films, and social content with a clear idea behind every frame.',
  },
];

export const services: Service[] = [
  {
    slug: 'website-design-development',
    title: 'Website Design & Development',
    group: 'Development',
    description:
      'Distinctive, responsive websites that connect a clear brand story with a fast, accessible experience.',
    deliverables: [
      'Content structure and page planning',
      'Original interface and responsive design',
      'Website development and integration',
      'Accessibility, performance, and launch checks',
    ],
    problem:
      'A website needs to explain your business clearly and make the next step easy. We bring content, design, and development together around that journey.',
  },
  {
    slug: 'ecommerce-development',
    title: 'E-commerce Development',
    group: 'Development',
    description:
      'Considered online stores that bring product storytelling, intuitive browsing, and purchasing into one experience.',
    deliverables: [
      'Store structure and shopping journeys',
      'Product and collection page design',
      'Commerce platform and payment integration',
      'Checkout and responsive testing',
    ],
    problem:
      'An online store needs to balance the product story with practical shopping decisions. We shape the browsing and purchase journey around the catalogue and the people using it.',
  },
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    group: 'Development',
    description:
      'Purpose-built software designed around your business processes, everyday tasks, and practical requirements.',
    deliverables: [
      'Requirements and workflow discovery',
      'Application architecture and interface planning',
      'Custom development and integrations',
      'Testing and handover documentation',
    ],
    problem:
      'Disconnected tools and manual work can make straightforward tasks complicated. We start with the process and define a maintainable solution around the way your team operates.',
  },
  {
    slug: 'support-maintenance',
    title: 'Support & Maintenance',
    group: 'Development',
    description:
      'Ongoing care for websites and software, with agreed support scope, updates, and technical improvements.',
    deliverables: [
      'Technical review and support planning',
      'Dependency and compatibility updates',
      'Issue investigation and bug fixes',
      'Agreed content, performance, and usability improvements',
    ],
    problem:
      'Digital products need attention after launch. We review the existing setup and agree on a realistic maintenance scope, priorities, and working arrangements.',
  },
  {
    slug: 'logo-design',
    title: 'Logo Design',
    group: 'Branding & Design',
    description:
      'Distinctive wordmarks and symbols that give your business a clear and recognisable visual signature.',
    deliverables: [
      'Visual discovery and concept directions',
      'Wordmark and symbol exploration',
      'Refinement and format variations',
      'Production-ready logo files and usage guidance',
    ],
    problem:
      'A logo has to work across different sizes, materials, and contexts. We develop a clear visual idea and refine it into a practical, flexible mark.',
  },
  {
    slug: 'brand-identity-design',
    title: 'Brand Identity Design',
    group: 'Branding & Design',
    description:
      'Connected visual identities that bring your logo, typography, colour, and applications into one coherent system.',
    deliverables: [
      'Visual direction and identity concepts',
      'Logo, typography, and colour system',
      'Core brand application designs',
      'Brand guidelines and asset handover',
    ],
    problem:
      'Inconsistent touchpoints make a brand harder to recognise. We create a shared visual foundation that keeps everyday communication connected.',
  },
  {
    slug: 'brand-strategy-positioning',
    title: 'Brand Strategy & Positioning',
    group: 'Branding & Design',
    description:
      'A clear direction for how your brand expresses its purpose, connects with its audience, and finds its place.',
    deliverables: [
      'Brand and audience discovery',
      'Market and competitor context review',
      'Positioning and messaging direction',
      'Brand personality and communication principles',
    ],
    problem:
      'A visual identity needs a clear idea behind it. We work with you to understand the audience, the business, and the perspective that should guide your communication.',
  },
  {
    slug: 'product-advertising-visuals',
    title: 'Product Advertising & Visuals',
    group: 'Creative Production',
    description:
      'Product-focused imagery and advertising concepts shaped by deliberate art direction and a clear message.',
    deliverables: [
      'Product concept and art direction',
      'Advertising compositions and visual treatments',
      'Campaign format adaptations',
      'Production-ready visual assets',
    ],
    problem:
      'Product advertising needs to focus attention on the right detail. We shape the visual idea around the product, the audience, and the intended placement.',
  },
  {
    slug: 'short-form-video-social-media-creatives',
    title: 'Short-Form Video & Social Media Creatives',
    group: 'Creative Production',
    description:
      'Short videos and social assets designed to carry a consistent brand idea across everyday digital channels.',
    deliverables: [
      'Content concepts and short-form scripts',
      'Storyboards and visual direction',
      'Video editing and social creative assets',
      'Platform-specific formats and delivery files',
    ],
    problem:
      'Social content needs to communicate quickly while still feeling like your brand. We develop a connected direction and adapt it to the required platforms and formats.',
  },
  {
    slug: 'commercial-video-production',
    title: 'Commercial Video Production',
    group: 'Creative Production',
    description:
      'Commercial film concepts and production shaped around a clear story, considered visuals, and the right delivery format.',
    deliverables: [
      'Concept, script, and production planning',
      'Storyboards and art direction',
      'Video production and editing',
      'Sound, colour, and final format delivery',
    ],
    problem:
      'A commercial film needs a purposeful story and an achievable production plan. We agree on the message, approach, and scope before moving into production.',
  },
];
