import { useParams, Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import type { Route } from './+types/ProjectDetail';
import {
  PageIntro,
  SectionLabel,
  TextLink,
} from '@/components/common/Editorial';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/features/portfolio/ProjectCard';
import {
  ProjectGallery,
  ProjectIdentity,
} from '@/features/portfolio/ProjectShowcase';
import { pageMeta } from '@/lib/seo';
import NotFound from './NotFound';

export const meta = ({ params }: Route.MetaArgs) => {
  const project = projects.find((item) => item.slug === params.slug);
  return project
    ? pageMeta(
        `${project.title} — Independent concept`,
        project.description,
        `/work/${project.slug}`,
      )
    : pageMeta(
        'Study not found',
        'The requested study could not be found.',
        '/404',
        true,
      );
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <NotFound />;
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  return (
    <>
      <PageIntro
        label={`${project.category} / Independent concept`}
        title={project.title}
      >
        {project.description}
      </PageIntro>
      <div
        className={`container project-detail-hero${project.identity ? ' project-detail-hero--featured' : ''}`}
      >
        <img
          src={project.image}
          srcSet={project.imageSrcSet}
          sizes="(max-width: 1680px) 92vw, 1500px"
          width={project.imageWidth || 1200}
          height={project.imageHeight || 900}
          alt={project.alt}
          fetchPriority="high"
        />
        <p className="portfolio-note">
          {project.identity
            ? 'Independent concept · Fictional brand · AI-generated application imagery'
            : 'Original ARTIQONN design exploration. No client affiliation or commissioned work.'}
        </p>
      </div>
      <section className="container detail-two-column section-space">
        <div>
          <SectionLabel number="01">The study</SectionLabel>
          <dl className="project-facts">
            <dt>Discipline</dt>
            <dd>{project.discipline}</dd>
            {project.identity && (
              <>
                <dt>Sector</dt>
                <dd>{project.identity.sector}</dd>
              </>
            )}
            <dt>Status</dt>
            <dd>Illustrative concept</dd>
            <dt>Created for</dt>
            <dd>ARTIQONN studio exploration</dd>
          </dl>
        </div>
        <div className="case-study-copy">
          <h2>The question.</h2>
          <p>{project.challenge}</p>
          <h2>The exploration.</h2>
          <p>{project.approach}</p>
          <h2>The output.</h2>
          <ul>
            {project.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="concept-note">
            This is a visual direction, not a shipped product. There are no
            client results, performance metrics, or testimonials associated with
            this study.
          </p>
        </div>
      </section>
      <ProjectIdentity project={project} />
      <ProjectGallery project={project} />
      <section className="work-section">
        <div className="container">
          <div className="section-top">
            <SectionLabel number={project.gallery ? '04' : '02'}>
              Keep exploring
            </SectionLabel>
            <TextLink to="/work">Back to the collection</TextLink>
          </div>
          <div className="project-grid">
            <ProjectCard project={next} index={(index + 1) % projects.length} />
            <Link to="/contact" className="project-inquiry">
              <p className="eyebrow">Your idea could be next</p>
              <h2>
                Let’s explore
                <br />
                the possibilities.
              </h2>
              <span className="text-link">
                Talk to us <ArrowUpRight />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
