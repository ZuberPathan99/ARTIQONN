import { PageIntro } from '@/components/common/Editorial';
import { site } from '@/config/site';
import { pageMeta } from '@/lib/seo';

export const meta = () =>
  pageMeta(
    'Privacy notice',
    'How information submitted through the ARTIQONN website is used, and how to contact us about an inquiry.',
    '/privacy',
  );

export default function Privacy() {
  return (
    <>
      <PageIntro label="Website information" title="Privacy notice.">
        A straightforward explanation of the information this website collects
        and how it is used.
      </PageIntro>
      <article className="container legal-copy">
        <h2>Information you choose to share</h2>
        <p>
          The inquiry form asks for your name, email address, service interest,
          and project description. Company name is optional. Please avoid
          including passwords, payment information, or other sensitive personal
          information.
        </p>
        <h2>How inquiries are used</h2>
        <p>
          Information submitted through this form is used to review and respond
          to your inquiry and discuss a possible project. Submitting an inquiry
          does not subscribe you to a mailing list.
        </p>
        <h2>Form processing and hosting</h2>
        <p>
          When this site is deployed on Netlify with form handling enabled,
          inquiries are processed and stored through Netlify Forms. Netlify also
          processes technical request information as part of hosting and
          protecting the website. Its processing is described in the{' '}
          <a
            href="https://www.netlify.com/privacy/"
            target="_blank"
            rel="noreferrer"
          >
            Netlify privacy policy (opens in a new tab)
          </a>
          .
        </p>
        <h2>Cookies and analytics</h2>
        <p>
          This implementation does not add advertising trackers, analytics
          scripts, or non-essential cookies. Hosting infrastructure may process
          technical information required to serve and secure requests.
        </p>
        <h2>Questions about your information</h2>
        <p>
          {site.email ? (
            <>
              To ask about information you have shared or request its deletion,
              contact <a href={`mailto:${site.email}`}>{site.email}</a>.
            </>
          ) : (
            <>
              Use the contact form and include “Privacy request” in your
              message. Provide enough context to identify your earlier inquiry,
              without including sensitive information.
            </>
          )}
        </p>
        <p className="muted">
          This notice describes the current website implementation. Business
          ownership details, retention arrangements, and any
          jurisdiction-specific disclosures should be confirmed before public
          launch.
        </p>
      </article>
    </>
  );
}
