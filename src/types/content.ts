export type ServiceGroup =
  'Technology & development' | 'Branding & design' | 'Creative production';

export interface Service {
  slug: string;
  title: string;
  group: ServiceGroup;
  description: string;
  deliverables: string[];
  problem: string;
}

export const projectCategories = [
  'All work',
  'Software',
  'Websites',
  'Branding',
  'UI/UX',
  'Creative production',
] as const;
export type ProjectCategory = Exclude<
  (typeof projectCategories)[number],
  'All work'
>;

export interface ProjectImage {
  src: string;
  srcSet?: string;
  alt: string;
  width: number;
  height: number;
  label: string;
  caption: string;
  layout?: 'wide' | 'half';
}

export interface ProjectIdentity {
  sector: string;
  headline: string;
  logo: string;
  logoAlt: string;
  logoDescription: string;
  typography: string;
  palette: { name: string; hex: string }[];
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  discipline: string;
  image: string;
  imageSrcSet?: string;
  imageWidth?: number;
  imageHeight?: number;
  alt: string;
  description: string;
  challenge: string;
  approach: string;
  deliverables: string[];
  relatedServices: string[];
  identity?: ProjectIdentity;
  gallery?: ProjectImage[];
}
