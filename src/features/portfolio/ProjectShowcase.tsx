import { SectionLabel } from '@/components/common/Editorial';
import type { Project } from '@/types/content';

export function ProjectIdentity({ project }: { project: Project }) {
  const identity = project.identity;
  if (!identity) return null;
  return (
    <section
      className="identity-section section-light"
      aria-labelledby="identity-heading"
    >
      <div className="container">
        <div className="section-top">
          <SectionLabel number="02">The visual language</SectionLabel>
          <span className="eyebrow">{identity.sector}</span>
        </div>
        <div className="section-heading-row">
          <h2 id="identity-heading">{identity.headline}</h2>
          <p>
            A distinctive mark.
            <br />A world built around it.
          </p>
        </div>
        <div className="identity-board">
          <div
            className="identity-logo-panel"
            style={{
              backgroundColor: identity.palette.find((colour) =>
                ['Parchment', 'Ecru'].includes(colour.name),
              )?.hex,
            }}
          >
            <img
              src={identity.logo}
              width="800"
              height="520"
              alt={identity.logoAlt}
              loading="lazy"
            />
          </div>
          <div className="identity-palette" aria-label="Brand colour palette">
            {identity.palette.map((colour) => (
              <div className="identity-swatch" key={colour.hex}>
                <div style={{ backgroundColor: colour.hex }} />
                <p>
                  <span>{colour.name}</span>
                  <span>{colour.hex}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="identity-explanation">
          <div>
            <h3>A mark with a point of view.</h3>
            <p>{identity.logoDescription}</p>
          </div>
          <div>
            <h3>Room for the details.</h3>
            <p>{identity.typography}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectGallery({ project }: { project: Project }) {
  if (!project.gallery?.length) return null;
  return (
    <section
      className="container case-gallery-section"
      aria-labelledby="gallery-heading"
    >
      <div className="section-top">
        <SectionLabel number="03">The identity, out in the world</SectionLabel>
        <span className="eyebrow">Original concept applications</span>
      </div>
      <h2 id="gallery-heading" className="sr-only">
        {project.title} concept image gallery
      </h2>
      <div className="case-gallery">
        {project.gallery.map((image) => (
          <figure
            key={image.src}
            className={`case-gallery-item case-gallery-item--${image.layout || 'wide'}`}
          >
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes={
                image.layout === 'half'
                  ? '(max-width: 767px) 100vw, 50vw'
                  : '(max-width: 1680px) 92vw, 1500px'
              }
              width={image.width}
              height={image.height}
              alt={image.alt}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <p className="eyebrow">{image.label}</p>
              <p>{image.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="gallery-disclosure">
        Independent concept for a fictional brand. Application photographs and
        mockups are AI-generated illustrative artwork.
      </p>
    </section>
  );
}
