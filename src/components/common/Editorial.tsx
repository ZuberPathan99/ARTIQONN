import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';

export function TextLink({
  to,
  children,
  className = '',
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link to={to} className={`text-link ${className}`}>
      {children}
      <ArrowUpRight size={19} strokeWidth={1.5} />
    </Link>
  );
}

export function SectionLabel({
  number,
  children,
}: {
  number?: string;
  children: ReactNode;
}) {
  return (
    <div className="section-label">
      {number && <span>{number} /</span>}
      <span>{children}</span>
    </div>
  );
}

export function PageIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="container page-intro">
      <SectionLabel>{label}</SectionLabel>
      <h1>{title}</h1>
      <div className="page-intro-bottom">
        <span className="small-cross" aria-hidden="true">
          ✳
        </span>
        <p>{children}</p>
      </div>
    </div>
  );
}
