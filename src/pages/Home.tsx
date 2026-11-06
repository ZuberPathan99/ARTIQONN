import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Fingerprint,
  Aperture,
} from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { SectionLabel, TextLink } from '@/components/common/Editorial';
import { Reveal } from '@/components/motion/Reveal';
import { ProjectCard } from '@/features/portfolio/ProjectCard';
import { projects } from '@/data/projects';
import { serviceGroups } from '@/data/services';
import { pageMeta } from '@/lib/seo';

export const meta = () =>
  pageMeta(
    'Technology Meets Creativity.',
    'ARTIQONN is a technology and design company creating thoughtful software, distinctive identities, and considered digital experiences.',
    '/',
  );

const capabilities = [
  {
    icon: Code2,
    title: 'Technology & development',
    description:
      'From the first line of code to the final interaction. Software and websites built with purpose.',
    tags: ['Software development', 'Web experiences', 'E-commerce'],
  },
  {
    icon: Fingerprint,
    title: 'Branding & design',
    description:
      'A clear idea. A distinctive identity. Design that connects who you are with how people experience you.',
    tags: ['Brand identities', 'UI/UX design', 'Visual systems'],
  },
  {
    icon: Aperture,
    title: 'Creative production',
    description:
      'Art direction and considered visual storytelling that bring a different perspective to your brand.',
    tags: ['Commercial films', 'Advertising creatives', 'Visual campaigns'],
  },
];

export default function Home() {
  return (
    <>
      <section className="container hero" aria-labelledby="hero-title">
        <div className="hero-eyebrow">
          <p className="eyebrow">
            <span className="status-dot" /> Technology & Design Company
          </p>
          <span className="hero-edition">
            Independent minds. Connected disciplines.
          </span>
        </div>
        <div className="hero-stage">
          <h1 id="hero-title">
            <span>Technology</span>
            <span className="hero-meets">
              Meets
              <span className="hero-heading-line" aria-hidden="true" />
            </span>
            <span>
              Creativity<span className="hero-period">.</span>
            </span>
          </h1>
          <div className="hero-art">
            <img
              src="/images/convergence-640.webp"
              srcSet="/images/convergence-320.webp 320w, /images/convergence-480.webp 480w, /images/convergence-640.webp 640w, /images/convergence-1280.webp 1280w"
              sizes="(max-width: 480px) calc(52vw - 23px), (max-width: 767px) 47vw, (max-width: 1680px) 42vw, 700px"
              alt=""
              width="680"
              height="680"
              fetchPriority="high"
            />
            <div className="art-coordinate">
              <span>FIG. 01 — CONVERGENCE</span>
              <span>ART × ENGINEERING</span>
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#introduction" className="scroll-cue">
            <span className="scroll-circle">
              <ArrowDown size={18} />
            </span>
            <span>Explore what’s possible</span>
          </a>
          <div className="hero-description">
            <p>
              Thoughtful technology. Distinctive design.
              <br />
              We bring them together to build
              <br className="desktop-break" /> what comes next.
            </p>
            <Button asChild variant="ghost">
              <Link to="/contact">
                Start a conversation <ArrowUpRight size={19} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section id="introduction" className="intro-section section-light">
        <div className="container">
          <div className="intro-grid">
            <SectionLabel number="01">The ARTIQONN perspective</SectionLabel>
            <Reveal>
              <h2>
                Good ideas deserve
                <br />
                exceptional execution.
              </h2>
              <div className="intro-copy">
                <p>
                  We’re a technology and design company bringing engineering
                  precision and creative thinking to the same table.
                </p>
                <p>
                  From the systems behind your business to the identity people
                  remember, we make every detail count.
                </p>
              </div>
              <TextLink to="/about">A little more about us</TextLink>
            </Reveal>
          </div>
          <div className="principle-strip">
            <span>Built with purpose.</span>
            <span>Designed with intention.</span>
            <span>Refined down to the detail.</span>
          </div>
        </div>
      </section>
      <section
        className="container section-space"
        aria-labelledby="services-heading"
      >
        <div className="section-top">
          <SectionLabel number="02">What we do</SectionLabel>
          <TextLink to="/services">Explore our services</TextLink>
        </div>
        <Reveal>
          <div className="section-heading-row">
            <h2 id="services-heading">
              Different disciplines.
              <br />
              <span className="muted">One considered approach.</span>
            </h2>
            <p>
              Strategy, design, and development.
              <br />
              Connected from the beginning.
            </p>
          </div>
        </Reveal>
        <div className="capability-list">
          {capabilities.map((item, index) => (
            <Link
              key={item.title}
              to={`/services#${index + 1}`}
              className="capability-row"
            >
              <span className="capability-number">0{index + 1}</span>
              <item.icon
                className="capability-icon"
                size={28}
                strokeWidth={1.25}
              />
              <h3>{item.title}</h3>
              <div className="capability-description">
                <p>{item.description}</p>
                <span>{item.tags.join(' / ')}</span>
              </div>
              <ArrowUpRight className="capability-arrow" strokeWidth={1.25} />
            </Link>
          ))}
        </div>
      </section>
      <section className="work-section" aria-labelledby="work-heading">
        <div className="container">
          <div className="section-top">
            <SectionLabel number="03">In the studio</SectionLabel>
            <TextLink to="/work">Explore all studies</TextLink>
          </div>
          <div className="section-heading-row">
            <h2 id="work-heading">Ideas made visible.</h2>
            <p>
              A selection of independent concepts.
              <br />A glimpse into our creative thinking.
            </p>
          </div>
          <div className="project-grid home-project-grid">
            {projects.slice(0, 2).map((project, index) => (
              <Reveal key={project.slug}>
                <ProjectCard project={project} index={index} />
              </Reveal>
            ))}
          </div>
          <p className="work-disclaimer">
            Original design explorations. These are illustrative concepts, not
            commissioned client projects.
          </p>
        </div>
      </section>
      <section
        className="container section-space approach-section"
        aria-labelledby="approach-heading"
      >
        <div>
          <SectionLabel number="04">How we think</SectionLabel>
          <h2 id="approach-heading">
            Consider every angle.
            <br />
            <span className="muted">Care about every detail.</span>
          </h2>
          <p className="approach-intro">
            The best work comes from asking the right questions, making
            deliberate choices, and leaving room to refine.
          </p>
          <TextLink to="/about#approach">Get to know our approach</TextLink>
        </div>
        <div className="approach-steps">
          {[
            [
              'Understand',
              'Listen first. Get close to your business, your people, and the problem worth solving.',
            ],
            [
              'Define & design',
              'Find the direction. Turn insight into a clear plan and a thoughtful visual language.',
            ],
            [
              'Build & connect',
              'Bring the idea to life with deliberate engineering and attention to the whole experience.',
            ],
            [
              'Refine & deliver',
              'Test the details. Make it better. Deliver something that’s ready for the real world.',
            ],
          ].map(([title, description], index) => (
            <div key={title} className="approach-step">
              <span>0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="discipline-strip" aria-hidden="true">
        {serviceGroups.map((group) => (
          <span key={group.title}>
            {group.title}
            <span className="strip-star">✳</span>
          </span>
        ))}
      </div>
    </>
  );
}
