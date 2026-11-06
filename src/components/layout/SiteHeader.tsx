import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowUpRight, X } from 'lucide-react';
import { navigation } from '@/config/site';
import { Button } from '@/components/ui/button';

export function Wordmark() {
  return (
    <span className="wordmark">
      ARTIQONN
      <span className="brand-dot" aria-hidden="true">
        ✳
      </span>
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand-link" to="/" aria-label="ARTIQONN home">
          <Wordmark />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink key={item.href} to={item.href} end={item.href === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Button asChild variant="outline" size="small" className="header-cta">
          <Link to="/contact">
            Let’s talk <ArrowUpRight size={16} />
          </Link>
        </Button>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button className="menu-trigger" aria-label="Open navigation">
              <svg
                width="26"
                height="20"
                viewBox="0 0 26 20"
                aria-hidden="true"
              >
                <path
                  d="M1 6h24M1 14h24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="menu-overlay" />
            <Dialog.Content
              className="mobile-menu"
              aria-describedby={undefined}
            >
              <div className="mobile-menu-top">
                <Dialog.Title className="wordmark">ARTIQONN</Dialog.Title>
                <Dialog.Close asChild>
                  <button className="menu-close" aria-label="Close navigation">
                    <X />
                  </button>
                </Dialog.Close>
              </div>
              <nav aria-label="Mobile navigation">
                {navigation.map((item, index) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    end={item.href === '/'}
                    onClick={() => setOpen(false)}
                  >
                    <span className="menu-index">0{index + 1}</span>
                    {item.label}
                    <ArrowUpRight />
                  </NavLink>
                ))}
              </nav>
              <p className="eyebrow">Technology meets creativity.</p>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
