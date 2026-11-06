import type { Config } from '@react-router/dev/config';
import { services } from './src/data/services';
import { projects } from './src/data/projects';

export default {
  appDirectory: 'src',
  ssr: false,
  prerender: [
    '/',
    '/services',
    '/work',
    '/about',
    '/contact',
    '/privacy',
    '/404',
    ...services.map((service) => `/services/${service.slug}`),
    ...projects.map((project) => `/work/${project.slug}`),
  ],
} satisfies Config;
