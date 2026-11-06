import { useSearchParams } from 'react-router';
import { PageIntro } from '@/components/common/Editorial';
import { ProjectCard } from '@/features/portfolio/ProjectCard';
import { projects } from '@/data/projects';
import { projectCategories } from '@/types/content';
import { pageMeta } from '@/lib/seo';

export const meta = () =>
  pageMeta(
    'Work & explorations',
    'Explore original ARTIQONN design concepts across websites, branding, interfaces, and creative production. All studies are clearly identified as independent concepts.',
    '/work',
  );

export default function Work() {
  const [params, setParams] = useSearchParams();
  const category =
    projectCategories.find((item) => item === params.get('category')) ||
    'All work';
  const filtered = projects.filter(
    (project) => category === 'All work' || project.category === category,
  );
  return (
    <>
      <PageIntro
        label="The studio collection"
        title={
          <>
            A thought.
            <br />
            <span className="muted">Made tangible.</span>
          </>
        }
      >
        Original design explorations across digital experiences, identities, and
        visual storytelling. A window into how we think and what we could create
        together.
      </PageIntro>
      <section
        className="container portfolio-section"
        aria-label="Design explorations"
      >
        <div
          className="project-filters"
          role="group"
          aria-label="Filter explorations by category"
        >
          {projectCategories.map((item) => (
            <button
              key={item}
              aria-pressed={category === item}
              onClick={() =>
                setParams(item === 'All work' ? {} : { category: item }, {
                  preventScrollReset: true,
                })
              }
            >
              {item}
              {item === 'All work' && (
                <sup>{projects.length.toString().padStart(2, '0')}</sup>
              )}
            </button>
          ))}
        </div>
        <p className="portfolio-note">
          Independent concepts · Illustrative artwork · No client affiliation
        </p>
        <p className="sr-only" role="status">
          {filtered.length}{' '}
          {filtered.length === 1 ? 'exploration' : 'explorations'} shown
        </p>
        {filtered.length ? (
          <div className="project-grid">
            {filtered.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={projects.indexOf(project)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">↗</span>
            <h2>A space for what’s next.</h2>
            <p>
              There are no published software projects here yet. Explore another
              discipline, or tell us what you’re planning.
            </p>
            <button
              className="text-link"
              onClick={() => setParams({}, { preventScrollReset: true })}
            >
              View all explorations <span aria-hidden="true">↗</span>
            </button>
          </div>
        )}
        <p className="work-disclaimer">
          These original studies illustrate visual directions. They are not
          completed client projects, validated products, or evidence of business
          results.
        </p>
      </section>
    </>
  );
}
