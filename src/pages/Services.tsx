import { PageIntro } from '@/components/common/Editorial';
import { ServiceCatalogue } from '@/features/services/ServiceCatalogue';
import { pageMeta } from '@/lib/seo';

export const meta = () =>
  pageMeta(
    'Services',
    'Explore ARTIQONN’s development, branding and design, and creative production services, from websites and software to identities and commercial video.',
    '/services',
  );

export default function Services() {
  return (
    <>
      <PageIntro
        label="Our capabilities"
        title={
          <>
            Built to work.
            <br />
            <span className="muted">Designed to matter.</span>
          </>
        }
      >
        Development, branding and design, and creative production. Connected
        disciplines that take your idea from first thought to final detail.
      </PageIntro>
      <div className="container services-groups">
        <h2 className="sr-only">Our services</h2>
        <ServiceCatalogue />
      </div>
    </>
  );
}
