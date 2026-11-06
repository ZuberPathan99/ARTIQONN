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
    '/work/still-objects',
    '/work/nomara',
    '/work/alder-and-form',
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
    '/work/still-objects',
    '/work/nomara',
    '/work/alder-and-form',
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
      '/services/ai-assisted-commercial-films',
      '/work/form-and-field',
      '/work/nomara',
      '/work/alder-and-form',
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
  await page.getByRole('button', { name: 'Software', exact: true }).click();
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
        .locator('img')
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
  for (const slug of ['nomara', 'alder-and-form']) {
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
  for (const image of await page.locator('img').all()) {
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
});
