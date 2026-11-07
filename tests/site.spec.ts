import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('public pages pass automated WCAG 2.2 AA accessibility checks', async ({
  page,
}) => {
  for (const path of [
    '/',
    '/services',
    '/work',
    '/about',
    '/contact',
    '/services/website-design-development',
    '/work/fieldwork-supply',
    '/work/northbound-travel',
    '/work/mason-and-reed',
  ]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
        'wcag22a',
        'wcag22aa',
      ])
      .analyze();
    expect(
      results.violations,
      `${path}: ${JSON.stringify(results.violations.map((issue) => ({ id: issue.id, nodes: issue.nodes.map((node) => node.target) })))}`,
    ).toEqual([]);
  }
});

test('all page types have meaningful headings and route-specific titles', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const path of [
    '/',
    '/services',
    '/services/website-design-development',
    '/work',
    '/work/fieldwork-supply',
    '/work/northbound-travel',
    '/work/mason-and-reed',
    '/about',
    '/contact',
    '/privacy',
    '/missing-page',
  ]) {
    await page.goto(path);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('main h1')).not.toBeEmpty();
    await expect(page).toHaveTitle(/ARTIQONN/);
  }
  expect(errors).toEqual([]);
});

for (const width of [360, 375, 768, 1024, 1440, 1920]) {
  test(`representative pages fit a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 950 });
    for (const path of [
      '/',
      '/services',
      '/work',
      '/about',
      '/contact',
      '/services/commercial-video-production',
      '/work/bracken-studio',
      '/work/northbound-travel',
      '/work/mason-and-reed',
    ]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${path} overflows at ${width}px`,
      ).toBe(true);
    }
  });
}

test('the approved catalogue is consistent across pages, detail routes, and inquiries', async ({
  page,
}) => {
  const catalogue = [
    ['Website Design & Development', 'website-design-development'],
    ['E-commerce Development', 'ecommerce-development'],
    ['Custom Software Development', 'custom-software-development'],
    ['Support & Maintenance', 'support-maintenance'],
    ['Logo Design', 'logo-design'],
    ['Brand Identity Design', 'brand-identity-design'],
    ['Brand Strategy & Positioning', 'brand-strategy-positioning'],
    ['Product Advertising & Visuals', 'product-advertising-visuals'],
    [
      'Short-Form Video & Social Media Creatives',
      'short-form-video-social-media-creatives',
    ],
    ['Commercial Video Production', 'commercial-video-production'],
  ];
  for (const path of ['/', '/services']) {
    await page.goto(path);
    await expect(page.locator('.service-catalogue-link')).toHaveText(
      catalogue.map(([title]) => title),
    );
    await expect(page.locator('.service-catalogue-label')).toHaveText([
      '01 / Development',
      '02 / Branding & Design',
      '03 / Creative Production',
    ]);
    await expect(page.locator('.service-catalogue-group[open]')).toHaveCount(0);
    const groups = page.locator('.service-catalogue-group');
    for (let index = 0; index < 3; index++) {
      const group = groups.nth(index);
      await group.locator('summary').press('Enter');
      await expect(group).toHaveAttribute('open', '');
      await expect(page.locator('.service-catalogue-group[open]')).toHaveCount(
        1,
      );
      await expect(group.locator('.service-catalogue-link')).toHaveCount(
        index === 0 ? 4 : 3,
      );
      await expect(
        group.locator('.service-catalogue-link').first(),
      ).toBeVisible();
      await expect
        .poll(() =>
          group
            .locator('img')
            .evaluate(
              (image: HTMLImageElement) =>
                image.complete && image.naturalWidth > 0,
            ),
        )
        .toBe(true);
    }
    await groups.last().locator('summary').press('Space');
    await expect(page.locator('.service-catalogue-group[open]')).toHaveCount(0);
  }
  await page
    .locator('.service-catalogue-group')
    .first()
    .locator('summary')
    .click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.locator('.service-catalogue').screenshot({
    path: 'test-results/services-desktop.png',
    style: '.site-header { visibility: hidden !important; }',
  });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.locator('.service-catalogue').screenshot({
    path: 'test-results/services-mobile.png',
    style: '.site-header { visibility: hidden !important; }',
  });
  for (const [title, slug] of catalogue) {
    await page.goto(`/services/${slug}`);
    await expect(page.locator('main h1')).toHaveText(title);
  }
  await page.getByRole('link', { name: 'Discuss your project' }).click();
  await expect(page.getByLabel('What can we help with?')).toHaveValue(
    'commercial-video-production',
  );
  await expect(
    page.getByLabel('What can we help with?').locator('option'),
  ).toHaveText([
    'Select a service',
    ...catalogue.map(([title]) => title),
    'Let’s figure it out',
  ]);
  const removed = await page.goto('/services/ai-assisted-commercial-films');
  expect(removed?.status()).toBe(404);
  await expect(page.locator('main h1')).toHaveText('A little off course.');
});

test('mobile menu traps focus, supports Escape, and closes after navigation', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Open navigation' });
  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  for (let index = 0; index < 9; index++) {
    await page.keyboard.press('Tab');
    expect(
      await page.evaluate(() =>
        Boolean(document.activeElement?.closest('[role="dialog"]')),
      ),
    ).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Services' })
    .click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('portfolio filtering is reflected in the URL and supports empty results', async ({
  page,
}) => {
  await page.goto('/work');
  await expect(page.locator('.project-card')).toHaveCount(6);
  await page.getByRole('button', { name: 'Branding', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(2);
  await expect(page).toHaveURL(/category=Branding/);
  await page.reload();
  await expect(page.locator('.project-card')).toHaveCount(2);
  await page.getByRole('button', { name: 'UI/UX', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'A space for what’s next.' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'View all explorations' }).click();
  await expect(page.locator('.project-card')).toHaveCount(6);
});

async function fillInquiry(page: Page) {
  await page.getByLabel('Full name').fill('Test Visitor');
  await page.getByLabel('Email address').fill('test@example.com');
  await page
    .getByLabel('What can we help with?')
    .selectOption('website-design-development');
  await page
    .getByLabel('Tell us about your project')
    .fill('We are planning a considered website for a new design practice.');
}

test('contact form reports validation errors and focuses the first field', async ({
  page,
}) => {
  await page.goto('/contact');
  await expect(
    page.locator('input[name="budget"], select[name="budget"]'),
  ).toHaveCount(0);
  await page.getByRole('button', { name: 'Send your inquiry' }).click();
  await expect(page.getByText('Please enter your full name.')).toBeVisible();
  await expect(page.getByLabel('Full name')).toBeFocused();
  await expect(page.getByLabel('Email address')).toHaveAttribute(
    'aria-invalid',
    'true',
  );
});

test('inquiry success appears only after a successful server response', async ({
  page,
}) => {
  await page.goto('/contact?service=website-design-development');
  await expect(page.getByLabel('What can we help with?')).toHaveValue(
    'website-design-development',
  );
  await fillInquiry(page);
  let body = '';
  await page.route('http://127.0.0.1:4173/', async (route) => {
    if (route.request().method() !== 'POST') return route.continue();
    body = route.request().postData() || '';
    await route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: 'Accepted by mocked Netlify Forms',
    });
  });
  await page.getByRole('button', { name: 'Send your inquiry' }).click();
  await expect(
    page.getByRole('heading', { name: 'A good beginning.' }),
  ).toBeVisible();
  expect(body).toContain('form-name=inquiry');
  expect(body).toContain('test%40example.com');
  expect(new URLSearchParams(body).has('budget')).toBe(false);
  await page.getByRole('button', { name: 'Send another inquiry' }).click();
  await expect(page.getByLabel('Full name')).toHaveValue('');
});

test('failed inquiry preserves input and never displays success', async ({
  page,
}) => {
  await page.goto('/contact');
  await fillInquiry(page);
  await page.route('http://127.0.0.1:4173/', async (route) =>
    route.request().method() === 'POST'
      ? route.fulfill({ status: 503, body: 'Unavailable' })
      : route.continue(),
  );
  await page.getByRole('button', { name: 'Send your inquiry' }).click();
  await expect(page.getByRole('alert')).toContainText('could not be confirmed');
  await expect(page.getByLabel('Full name')).toHaveValue('Test Visitor');
  await expect(
    page.getByRole('heading', { name: 'A good beginning.' }),
  ).toHaveCount(0);
});

test('original artwork loads and the homepage respects reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('.project-card').last().scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator('img:visible')
        .evaluateAll((images) =>
          images.every((image) => image.complete && image.naturalWidth > 0),
        ),
    )
    .toBe(true);
  expect(
    await page
      .locator('.project-image-wrap img')
      .first()
      .evaluate((image) => getComputedStyle(image).transitionDuration),
  ).toBe('1e-05s');
});

test('new concept case studies contain complete, working image galleries', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const slug of ['northbound-travel', 'mason-and-reed']) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`/work/${slug}`);
    await expect(page.locator('.case-gallery-item')).toHaveCount(2);
    await expect(page.locator('.identity-swatch')).toHaveCount(4);
    await expect(page.locator('.gallery-disclosure')).toContainText(
      'fictional brand',
    );
    for (const image of await page.locator('main img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (element: HTMLImageElement) =>
              element.complete && element.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `test-results/${slug}-desktop.png`,
      fullPage: true,
    });
    await page.setViewportSize({ width: 375, height: 812 });
    await page.screenshot({
      path: `test-results/${slug}-mobile.png`,
      fullPage: true,
    });
  }
});

test('capture desktop and mobile designs', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  for (const image of await page.locator('img:visible').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (element: HTMLImageElement) =>
            element.complete && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: 'test-results/home-desktop.png',
    fullPage: true,
  });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({
    path: 'test-results/home-mobile.png',
    fullPage: true,
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/contact');
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: 'test-results/contact-desktop.png',
    fullPage: true,
  });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/contact');
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: 'test-results/contact-mobile.png',
    fullPage: true,
  });
});
