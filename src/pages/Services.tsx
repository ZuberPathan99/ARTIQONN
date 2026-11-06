import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { PageIntro, SectionLabel } from '@/components/common/Editorial';
import { serviceGroups, services } from '@/data/services';
import { pageMeta } from '@/lib/seo';

export const meta = () =>
  pageMeta(
    'Services',
    'Explore ARTIQONN’s software development, website design, brand identity, UI/UX, and creative production services.',
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
        Technology, design, and creative production. Connected disciplines that
        take your idea from first thought to final detail.
      </PageIntro>
      <div className="container services-groups">
        {serviceGroups.map((group, index) => (
          <section
            id={String(index + 1)}
            className="service-group"
            key={group.title}
          >
            <div className="service-group-intro">
              <SectionLabel number={group.number}>Our expertise</SectionLabel>
              <h2>{group.title}</h2>
              <p>{group.introduction}</p>
            </div>
            <div>
              {services
                .filter((service) => service.group === group.title)
                .map((service) => (
                  <Link
                    key={service.slug}
                    className="service-detail-link"
                    to={`/services/${service.slug}`}
                  >
                    <div>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                    <ArrowUpRight strokeWidth={1.5} />
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
