import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('pages/Home.tsx'),
  route('services', 'pages/Services.tsx'),
  route('services/:slug', 'pages/ServiceDetail.tsx'),
  route('work', 'pages/Work.tsx'),
  route('work/:slug', 'pages/ProjectDetail.tsx'),
  route('about', 'pages/About.tsx'),
  route('contact', 'pages/Contact.tsx'),
  route('privacy', 'pages/Privacy.tsx'),
  route('*', 'pages/NotFound.tsx'),
] satisfies RouteConfig;
