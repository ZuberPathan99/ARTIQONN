import { TextLink } from '@/components/common/Editorial';
import { pageMeta } from '@/lib/seo';

export const meta = () =>
  pageMeta(
    'Page not found',
    'This page could not be found. Explore ARTIQONN’s technology and design services.',
    '/404',
    true,
  );

export default function NotFound() {
  return (
    <section className="container error-page">
      <p className="eyebrow">404 / Page not found</p>
      <h1>A little off course.</h1>
      <p>
        This page may have moved, or the link may be incomplete.
        <br />
        Let’s get you back to familiar ground.
      </p>
      <TextLink to="/">Back to the homepage</TextLink>
    </section>
  );
}
