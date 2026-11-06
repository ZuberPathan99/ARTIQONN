import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import type { Project } from '@/types/content';

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <article className="project-card">
      <Link
        to={`/work/${project.slug}`}
        className="project-image-link"
        aria-label={`Independent concept: ${project.title}. Explore ${project.category.toLowerCase()} study.`}
      >
        <div className="project-image-wrap">
          <img
            src={project.image}
            srcSet={project.imageSrcSet}
            sizes="(max-width: 480px) calc(100vw - 44px), (max-width: 1680px) 45vw, 720px"
            width={project.imageWidth || 1200}
            height={project.imageHeight || 900}
            loading="lazy"
            decoding="async"
            alt={project.alt}
          />
          <span className="project-tag">Independent concept</span>
          <span className="project-open">
            <ArrowUpRight size={25} />
          </span>
        </div>
      </Link>
      <div className="project-caption">
        <div>
          <p className="project-discipline">{project.discipline}</p>
          <h3>
            <Link to={`/work/${project.slug}`}>{project.title}</Link>
          </h3>
        </div>
        <span className="project-number">0{index + 1}</span>
      </div>
    </article>
  );
}
