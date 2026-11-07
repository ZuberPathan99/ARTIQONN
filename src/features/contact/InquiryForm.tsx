import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useSearchParams, Link } from 'react-router';
import { z } from 'zod';
import { ArrowUpRight, Check, LoaderCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { services } from '@/data/services';
import { site } from '@/config/site';

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your full name.')
    .max(120, 'Please keep your name under 120 characters.'),
  email: z.email('Please enter a valid email address.').max(254),
  company: z.string().trim().max(160, 'Please keep this under 160 characters.'),
  service: z
    .string()
    .refine(
      (value) =>
        value === 'not-sure' ||
        services.some((service) => service.slug === value),
      'Please select a service, or choose “Let’s figure it out”.',
    ),
  message: z
    .string()
    .trim()
    .min(
      20,
      'Tell us a little more about your project (at least 20 characters).',
    )
    .max(5000, 'Please keep your message under 5,000 characters.'),
});
type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function InquiryForm() {
  const [params] = useSearchParams();
  const selected = services.some(
    (service) => service.slug === params.get('service'),
  )
    ? params.get('service')!
    : '';
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle',
  );
  const [feedback, setFeedback] = useState('');
  const feedbackRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    // Static HTML has no query string; apply inquiry context after hydration.
    if (serviceRef.current) serviceRef.current.value = selected;
  }, [selected]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'sending') return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = schema.safeParse(Object.fromEntries(formData));
    setFeedback('');
    if (!result.success) {
      const nextErrors: Errors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof Errors;
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      });
      setErrors(nextErrors);
      setState('idle');
      form
        .querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)
        ?.focus();
      return;
    }
    setErrors({});
    if (!site.contactEnabled) {
      setState('error');
      setFeedback(
        'This preview cannot send inquiries yet. Your message has not been sent. Form handling will be available once the website is connected to Netlify Forms.',
      );
      return;
    }
    if (String(formData.get('bot-field') || '')) {
      setState('error');
      setFeedback(
        'Your inquiry could not be submitted. Please refresh the page and try again.',
      );
      return;
    }
    setState('sending');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const body = new URLSearchParams({
        'form-name': 'inquiry',
        'bot-field': '',
        ...result.data,
      });
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Submission was not accepted');
      setState('success');
      setFeedback(
        'Thank you for sharing your idea. Your inquiry has been submitted. We’ll review the details and reply to the email you provided.',
      );
      window.requestAnimationFrame(() => feedbackRef.current?.focus());
    } catch {
      setState('error');
      setFeedback(
        'Your inquiry could not be confirmed. Your details are still here. Please check your connection and try again.',
      );
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function errorProps(name: keyof Errors) {
    return {
      'aria-invalid': Boolean(errors[name]),
      'aria-describedby': errors[name] ? `${name}-error` : undefined,
    };
  }
  function errorMessage(name: keyof Errors) {
    return (
      errors[name] && (
        <p className="field-error" id={`${name}-error`}>
          {errors[name]}
        </p>
      )
    );
  }

  if (state === 'success')
    return (
      <div
        className="form-success"
        ref={feedbackRef}
        tabIndex={-1}
        role="status"
      >
        <span className="success-symbol">
          <Check size={30} strokeWidth={1.5} />
        </span>
        <p className="eyebrow">Conversation started</p>
        <h2>A good beginning.</h2>
        <p>{feedback}</p>
        <Button
          variant="outline"
          onClick={() => {
            setState('idle');
            setFeedback('');
          }}
        >
          Send another inquiry <ArrowUpRight size={17} />
        </Button>
      </div>
    );

  return (
    <form
      name="inquiry"
      method="POST"
      action="/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      noValidate
      onSubmit={handleSubmit}
      className="inquiry-form"
      aria-labelledby="inquiry-heading"
    >
      <header className="form-heading">
        <p className="eyebrow">Project inquiry</p>
        <h2 id="inquiry-heading">Tell us what you’re planning.</h2>
        <p>Share a few details below. We’ll take it from there.</p>
      </header>
      <input type="hidden" name="form-name" value="inquiry" />
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <Input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">
            Full name <span aria-hidden="true">*</span>
          </label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            required
            maxLength={120}
            {...errorProps('name')}
          />
          {errorMessage('name')}
        </div>
        <div className="form-field">
          <label htmlFor="email">
            Email address <span aria-hidden="true">*</span>
          </label>
          <Input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            maxLength={254}
            {...errorProps('email')}
          />
          {errorMessage('email')}
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="company">
            Company <span className="optional">(optional)</span>
          </label>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            placeholder="Your company"
            maxLength={160}
            {...errorProps('company')}
          />
          {errorMessage('company')}
        </div>
        <div className="form-field">
          <label htmlFor="service">
            What can we help with? <span aria-hidden="true">*</span>
          </label>
          <select
            ref={serviceRef}
            id="service"
            name="service"
            defaultValue={selected}
            required
            className="form-input"
            {...errorProps('service')}
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
            <option value="not-sure">Let’s figure it out</option>
          </select>
          {errorMessage('service')}
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="message">
          Tell us about your project <span aria-hidden="true">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="The idea, the challenge, the possibilities. We’re listening."
          rows={5}
          required
          minLength={20}
          maxLength={5000}
          {...errorProps('message')}
        />
        {errorMessage('message')}
      </div>
      <p className="form-privacy">
        By submitting, you agree that we may use your details to respond to this
        inquiry. Read our <Link to="/privacy">privacy notice</Link>.
      </p>
      <div className="form-submit-row">
        <Button type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? (
            <>
              Sending inquiry{' '}
              <LoaderCircle className="loading-icon" size={18} />
            </>
          ) : (
            <>
              Send your inquiry <ArrowUpRight size={19} />
            </>
          )}
        </Button>
        <span className="form-required">* Required fields</span>
      </div>
      <div ref={feedbackRef} aria-live="polite" aria-atomic="true">
        {feedback && (
          <p className="form-feedback" role="alert">
            {feedback}
          </p>
        )}
      </div>
      {!site.contactEnabled && (
        <p className="preview-notice">
          Preview mode — inquiries are not sent until Netlify Forms is enabled.
        </p>
      )}
    </form>
  );
}
