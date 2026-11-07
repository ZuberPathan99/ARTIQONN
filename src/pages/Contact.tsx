import { ArrowUpRight } from 'lucide-react';
import { PageIntro, SectionLabel } from '@/components/common/Editorial';
import { InquiryForm } from '@/features/contact/InquiryForm';
import { site } from '@/config/site';
import { pageMeta } from '@/lib/seo';

export const meta = () =>
  pageMeta(
    'Start a conversation',
    'Tell ARTIQONN about your next software, website, branding, or creative project. Start a thoughtful conversation about what comes next.',
    '/contact',
  );

export default function Contact() {
  return (
    <div className="contact-page">
      <PageIntro
        label="Let’s talk"
        title={
          <>
            Every possibility
            <br />
            starts with <span className="muted">hello.</span>
          </>
        }
      >
        A new idea, a complex challenge, or a fresh direction. Tell us what you
        have in mind, and let’s find the right way forward.
      </PageIntro>
      <section className="container contact-layout">
        <aside>
          <SectionLabel number="01">Your next chapter</SectionLabel>
          <h2>
            Big ambitions.
            <br />
            Thoughtful beginnings.
          </h2>
          <p>
            You don’t need a perfect brief. A little context about your business
            and what you’re hoping to create is a good place to start.
          </p>
          {site.email && (
            <a className="text-link" href={`mailto:${site.email}`}>
              {site.email}
              <ArrowUpRight size={18} />
            </a>
          )}
          {site.phone && (
            <a
              className="text-link"
              href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}
            >
              {site.phone}
              <ArrowUpRight size={18} />
            </a>
          )}
          <div className="contact-next">
            <p className="eyebrow">What happens next?</p>
            <p>
              We review your inquiry, understand the essentials, and get in
              touch to discuss scope and fit.
            </p>
          </div>
        </aside>
        <InquiryForm />
      </section>
    </div>
  );
}
