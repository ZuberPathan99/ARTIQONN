import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { navigation, site } from '@/config/site';
import { Wordmark } from './SiteHeader';

export function SiteFooter() {
  const { pathname } = useLocation();
  return (
    <footer className="site-footer">
      {pathname !== '/contact' && (
        <div className="container contact-cta">
          <p className="eyebrow">
            <span className="status-dot" /> A good project starts with a
            conversation
          </p>
          <Link to="/contact" className="big-contact">
            Let’s make
            <br />
            something matter.
            <span className="contact-circle">
              <ArrowUpRight strokeWidth={1} />
            </span>
          </Link>
          <p>Have an idea in mind? We’d love to hear it.</p>
        </div>
      )}
      <div className="container footer-main">
        <div className="footer-brand">
          <Link className="brand-link" to="/" aria-label="ARTIQONN home">
            <Wordmark />
          </Link>
          <p>
            Technology & Design Company
            <br />
            Thoughtfully made. Down to the detail.
          </p>
          {site.email && (
            <a href={`mailto:${site.email}`}>
              {site.email} <ArrowUpRight size={14} />
            </a>
          )}
          {site.phone && (
            <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>
              {site.phone}
            </a>
          )}
        </div>
        <nav aria-label="Footer navigation">
          {navigation.map((item) => (
            <Link key={item.href} to={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="footer-note">
          <p>
            Independent thought.
            <br />
            Shared ambition.
            <br />
            Exceptional possibilities.
          </p>
          <button
            className="back-top"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
                  .matches
                  ? 'instant'
                  : 'smooth',
              })
            }
          >
            Back to top <ArrowUp size={16} />
          </button>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} ARTIQONN. All rights reserved.</span>
        <Link to="/privacy">Privacy notice</Link>
        <span>Technology meets creativity.</span>
      </div>
    </footer>
  );
}
