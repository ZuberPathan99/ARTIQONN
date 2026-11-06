const configuredOrigin =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') || '';

export const site = {
  name: 'ARTIQONN',
  descriptor: 'Technology & Design Company',
  tagline: 'Technology Meets Creativity.',
  origin: configuredOrigin,
  email: import.meta.env.VITE_CONTACT_EMAIL || '',
  phone: import.meta.env.VITE_CONTACT_PHONE || '',
  contactEnabled: import.meta.env.VITE_CONTACT_ENABLED === 'true',
};

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
