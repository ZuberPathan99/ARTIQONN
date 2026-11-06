import { PageIntro, SectionLabel } from '@/components/common/Editorial';
import { pageMeta } from '@/lib/seo';

export const meta = () =>
  pageMeta(
    'About us',
    'ARTIQONN connects technology and creativity through thoughtful design, purposeful engineering, and attention to detail.',
    '/about',
  );

export default function About() {
  return (
    <>
      <PageIntro
        label="A shared perspective"
        title={
          <>
            Precision in thought.
            <br />
            <span className="muted">Freedom in creation.</span>
          </>
        }
      >
        We’re ARTIQONN. A technology and design company built around a simple
        belief: the best outcomes happen when creative thinking and engineering
        work together.
      </PageIntro>
      <section className="section-light">
        <div className="container about-manifesto section-space">
          <SectionLabel number="01">Who we are</SectionLabel>
          <h2>
            Different ways of thinking.
            <br />A common care for the work.
          </h2>
          <div className="manifesto-columns">
            <p>
              We bring software development, brand design, and creative
              production into one connected practice. Our work begins with
              understanding what matters to your business and the people it
              serves.
            </p>
            <p>
              We believe quality lives in the decisions you make along the way:
              the question you ask, the detail you notice, the interaction you
              refine. That’s the thinking we bring to every project.
            </p>
          </div>
          <div className="about-art" aria-hidden="true">
            <span>ART</span>
            <img
              src="/images/convergence.svg"
              alt=""
              width="680"
              height="680"
              loading="lazy"
            />
            <span>IQONN</span>
          </div>
        </div>
      </section>
      <section id="approach" className="container section-space">
        <div className="section-top">
          <SectionLabel number="02">The way we work</SectionLabel>
        </div>
        <div className="section-heading-row">
          <h2>
            Clear thinking.
            <br />
            <span className="muted">Considered making.</span>
          </h2>
          <p>
            A practical process.
            <br />A thoughtful result.
          </p>
        </div>
        <div className="values-grid">
          {[
            [
              '01',
              'Understand before we build.',
              'Listen closely, ask useful questions, and agree on what the project needs to achieve. A clear brief gives everyone a shared starting point.',
            ],
            [
              '02',
              'Make the right things simple.',
              'Turn requirements into a clear structure. Explore the visual direction, test the key journeys, and make choices that support the whole experience.',
            ],
            [
              '03',
              'Keep design and code connected.',
              'Build with the intended experience in mind. Review the work together at agreed milestones so that practical decisions stay aligned with the idea.',
            ],
            [
              '04',
              'Leave room for refinement.',
              'Check responsiveness, accessibility, and functionality. Work through the details, document the essentials, and prepare a considered handover.',
            ],
          ].map(([number, title, text]) => (
            <article key={number}>
              <span className="eyebrow">{number} /</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="container commitment">
        <SectionLabel number="03">Our commitment</SectionLabel>
        <p>
          Clarity in communication.
          <br />
          Care in execution.
          <br />
          <span className="muted">Respect for every detail.</span>
        </p>
      </section>
    </>
  );
}
