import { useParams } from 'react-router';
import { Check, ArrowUpRight } from 'lucide-react';
import type { Route } from './+types/ServiceDetail';
import {
  PageIntro,
  SectionLabel,
  TextLink,
} from '@/components/common/Editorial';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/features/portfolio/ProjectCard';
import { pageMeta } from '@/lib/seo';
import NotFound from './NotFound';

export const meta = ({ params }: Route.MetaArgs) => {
  const service = services.find((item) => item.slug === params.slug);
  return service
    ? pageMeta(service.title, service.description, `/services/${service.slug}`)
    : pageMeta(
        'Service not found',
        'The requested service could not be found.',
        '/404',
        true,
      );
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);
  if (!service) return <NotFound />;
  const related = projects.filter((project) =>
    project.relatedServices.includes(service.slug),
  );
  return (
    <>
      <PageIntro label={service.group} title={service.title}>
        {service.description}
      </PageIntro>
      <section className="section-light">
        <div className="container detail-two-column section-space">
          <SectionLabel number="01">The right starting point</SectionLabel>
          <div>
            <h2>
              A clear problem.
              <br />A purposeful solution.
            </h2>
            <p className="large-copy">{service.problem}</p>
            <Button asChild className="mt-8">
              <Link to={`/contact?service=${service.slug}`}>
                Discuss your project <ArrowUpRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="container detail-two-column section-space">
        <div>
          <SectionLabel number="02">What we can deliver</SectionLabel>
          <p className="section-aside">
            Scope is agreed together, based on your requirements and priorities.
          </p>
        </div>
        <div className="deliverables-list">
          {service.deliverables.map((item) => (
            <div key={item}>
              <Check size={20} strokeWidth={1.5} />
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="container detail-two-column section-space top-border">
        <SectionLabel number="03">Our approach</SectionLabel>
        <div>
          <h2>
            Start with understanding.
            <br />
            <span className="muted">Finish with the details.</span>
          </h2>
          <p className="large-copy">
            We define the requirements with you, develop a clear direction, and
            review the work at agreed milestones. Design and implementation stay
            connected throughout, with time set aside for testing and
            refinement.
          </p>
          <TextLink to="/about#approach">More about how we work</TextLink>
        </div>
      </section>
      {related.length > 0 && (
        <section className="work-section">
          <div className="container">
            <div className="section-top">
              <SectionLabel number="04">Related explorations</SectionLabel>
              <TextLink to="/work">All studies</TextLink>
            </div>
            <div className="project-grid">
              {related.slice(0, 2).map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}
      <div className="container detail-back">
        <TextLink to="/services">Back to all services</TextLink>
      </div>
    </>
  );
}
