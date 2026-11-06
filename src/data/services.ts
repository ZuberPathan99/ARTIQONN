import type { Service, ServiceGroup } from '@/types/content';

export const serviceGroups: {
  title: ServiceGroup;
  number: string;
  introduction: string;
}[] = [
  {
    title: 'Technology & development',
    number: '01',
    introduction:
      'Thoughtful engineering. Built around the way your business works.',
  },
  {
    title: 'Branding & design',
    number: '02',
    introduction:
      'Distinctive identities and intuitive experiences, down to the smallest detail.',
  },
  {
    title: 'Creative production',
    number: '03',
    introduction:
      'Ideas brought into focus. Visual stories made for the right moment.',
  },
];

export const services: Service[] = [
  {
    slug: 'custom-software-development',
    title: 'Custom software development',
    group: 'Technology & development',
    description:
      'Purpose-built software that brings clarity to complex workflows and supports the way you operate.',
    deliverables: [
      'Requirements and technical discovery',
      'Application architecture',
      'Custom application development',
      'Testing and handover documentation',
    ],
    problem:
      'Off-the-shelf tools can leave gaps between how a team works and what its software allows. We begin with those gaps and define a practical, maintainable solution.',
  },
  {
    slug: 'web-application-development',
    title: 'Web application development',
    group: 'Technology & development',
    description:
      'Responsive, accessible web applications with carefully considered interfaces and dependable foundations.',
    deliverables: [
      'User flows and interface design',
      'Responsive frontend development',
      'API integration',
      'Quality assurance and deployment planning',
    ],
    problem:
      'Complex tasks deserve interfaces that feel simple. We map the essential journeys before choosing the technology that supports them.',
  },
  {
    slug: 'website-design-development',
    title: 'Website design & development',
    group: 'Technology & development',
    description:
      'Fast, distinctive websites that express your identity and make every visit feel considered.',
    deliverables: [
      'Content structure and wireframes',
      'Original visual design',
      'Responsive website development',
      'Technical SEO and performance checks',
    ],
    problem:
      'A website should make your business easy to understand. We connect content, design, and engineering to create a clear path from first impression to inquiry.',
  },
  {
    slug: 'business-software-erp',
    title: 'Business software & ERP solutions',
    group: 'Technology & development',
    description:
      'Connected business tools designed to make day-to-day operations easier to understand and manage.',
    deliverables: [
      'Workflow and requirements mapping',
      'Module and permission planning',
      'Custom business interfaces',
      'Integration and migration planning',
    ],
    problem:
      'Disconnected spreadsheets and repetitive tasks create friction. We work with your team to understand the process before designing the system.',
  },
  {
    slug: 'ecommerce-development',
    title: 'E-commerce development',
    group: 'Technology & development',
    description:
      'Considered shopping experiences that balance product storytelling with a straightforward path to purchase.',
    deliverables: [
      'Store experience design',
      'Product and collection templates',
      'Commerce platform integration',
      'Checkout and responsive testing',
    ],
    problem:
      'The best product story still needs a usable store. We bring product presentation, navigation, and purchasing journeys into one coherent experience.',
  },
  {
    slug: 'brand-identity-design',
    title: 'Brand identity design',
    group: 'Branding & design',
    description:
      'Visual identities with a clear point of view and the flexibility to work wherever your brand appears.',
    deliverables: [
      'Visual direction exploration',
      'Logo and identity system',
      'Typography and colour system',
      'Brand application guidelines',
    ],
    problem:
      'An inconsistent identity makes a business harder to recognise. We establish a visual foundation that keeps every touchpoint connected.',
  },
  {
    slug: 'visual-design',
    title: 'Visual design',
    group: 'Branding & design',
    description:
      'Precise compositions, expressive typography, and purposeful visual systems for digital and print.',
    deliverables: [
      'Art direction',
      'Layout and typography systems',
      'Campaign design assets',
      'Production-ready artwork',
    ],
    problem:
      'Good communication needs hierarchy and restraint. We organise the message and make its visual expression clear and distinctive.',
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX design',
    group: 'Branding & design',
    description:
      'Digital experiences shaped around real tasks, clear interactions, and the people who use them.',
    deliverables: [
      'Journey and task mapping',
      'Wireframes and interactive prototypes',
      'Interface design system',
      'Developer handoff',
    ],
    problem:
      'Friction often starts with unclear choices. We examine the user journey and turn complicated requirements into understandable interactions.',
  },
  {
    slug: 'digital-brand-assets',
    title: 'Digital brand assets',
    group: 'Branding & design',
    description:
      'A consistent family of digital assets that carries your identity across everyday brand touchpoints.',
    deliverables: [
      'Social media templates',
      'Presentation design elements',
      'Digital marketing assets',
      'Reusable asset guidelines',
    ],
    problem:
      'Daily communication should feel like it comes from the same company. We create usable assets that help teams keep their brand consistent.',
  },
  {
    slug: 'ai-assisted-commercial-films',
    title: 'AI-assisted commercial films',
    group: 'Creative production',
    description:
      'Commercial film concepts combining human art direction with carefully selected AI-assisted production tools.',
    deliverables: [
      'Concept and script development',
      'Storyboards and visual direction',
      'AI-assisted visual production',
      'Editing and delivery formats',
    ],
    problem:
      'A compelling film starts with an idea. We establish the story, scope, and production constraints before deciding where AI tools can contribute.',
  },
  {
    slug: 'product-advertising-creatives',
    title: 'Product advertising creatives',
    group: 'Creative production',
    description:
      'Product-focused visuals with considered art direction and a clear communication objective.',
    deliverables: [
      'Product visual direction',
      'Advertising compositions',
      'Platform-specific adaptations',
      'Final production assets',
    ],
    problem:
      'Product advertising needs to communicate the right detail quickly. We shape the composition around the product and its intended audience.',
  },
  {
    slug: 'social-media-advertising',
    title: 'Social media advertising creatives',
    group: 'Creative production',
    description:
      'Platform-aware creative assets that express your brand clearly in busy social environments.',
    deliverables: [
      'Creative concepts',
      'Static and motion asset planning',
      'Format and aspect-ratio adaptations',
      'Reusable campaign templates',
    ],
    problem:
      'A social campaign needs a coherent idea across different formats. We design a connected set of assets around the message and the platform.',
  },
  {
    slug: 'creative-visual-campaigns',
    title: 'Creative visual campaigns',
    group: 'Creative production',
    description:
      'Connected visual concepts that bring a single, distinctive idea to life across a campaign.',
    deliverables: [
      'Campaign concept and visual narrative',
      'Key visual development',
      'Cross-channel artwork',
      'Campaign asset guidelines',
    ],
    problem:
      'Scattered campaign assets can dilute an idea. We establish a central visual direction and translate it consistently across the required touchpoints.',
  },
];
