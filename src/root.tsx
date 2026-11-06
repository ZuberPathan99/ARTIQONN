import type { ReactNode } from 'react';
import { useEffect } from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLocation,
} from 'react-router';
import { LazyMotion, domAnimation, MotionConfig } from 'motion/react';
import type { Route } from './+types/root';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { TextLink } from '@/components/common/Editorial';
import { site } from '@/config/site';
import '@/styles/globals.css';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#080808" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="preload"
          href="/fonts/inter-latin-wght-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.getElementById('main-content')?.focus({ preventScroll: true });
  }, [pathname]);
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
        <SiteFooter />
        {site.origin && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: site.name,
                url: site.origin,
                description: site.descriptor,
                ...(site.email ? { email: site.email } : {}),
              }).replace(/</g, '\\u003c'),
            }}
          />
        )}
      </MotionConfig>
    </LazyMotion>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="container error-page">
        <p className="eyebrow">
          {notFound ? '404 / Page not found' : 'Something went wrong'}
        </p>
        <h1>{notFound ? 'A little off course.' : 'Let’s try that again.'}</h1>
        <p>
          {notFound
            ? 'This page may have moved, or the link may be incomplete.'
            : 'We couldn’t display this page. Please reload or return home.'}
        </p>
        <TextLink to="/">Back to the homepage</TextLink>
      </main>
      <SiteFooter />
    </>
  );
}
