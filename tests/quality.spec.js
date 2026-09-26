import { test, expect } from '@playwright/test';
import axe from 'axe-core';

const routes = [['home', '/'], ['treatments', '/treatments.html'], ['insurance', '/insurance.html'], ['height', '/height-session.html']];

async function runAxe(page) {
  await page.addScriptTag({ content: axe.source });
  return page.evaluate(async () => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }));
}

for (const [name, route] of routes) {
  test(`${name}: route renders with one visible H1`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
  });

  test(`${name}: no serious or critical accessibility violations`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    const result = await runAxe(page);
    const severe = result.violations.filter((item) => ['serious', 'critical'].includes(item.impact));
    expect(severe.map((item) => ({ id: item.id, targets: item.nodes.map((node) => node.target.join(" ")) }))).toEqual([]);
  });

  test(`${name}: page has no horizontal overflow on mobile`, async ({ page }) => {
    for (const width of [320, 390, 430]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      const sizes = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
      expect(sizes.scroll, `${width}px viewport overflowed`).toBeLessThanOrEqual(sizes.client + 1);
    }
  });

  test(`${name}: all content images load`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');
    const broken = await page.locator('img').evaluateAll((images) => images.filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.getAttribute('src')));
    expect(broken).toEqual([]);
  });

  test(`${name}: headings do not skip levels`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    const levels = await page.locator('h1,h2,h3,h4,h5,h6').evaluateAll((nodes) => nodes.map((node) => Number(node.tagName.slice(1))));
    const skips = levels.filter((level, index) => index > 0 && level > levels[index - 1] + 1);
    expect(skips).toEqual([]);
  });
}

test('document metadata and language are present', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle(/AayuTatva/);
  expect(await page.locator('html').getAttribute('lang')).toBe('en');
  expect(await page.locator('meta[name="description"]').getAttribute('content')).toContain('Ayurvedic');
});

test('brand fonts load and are applied consistently', async ({ page }) => {
  await page.goto('/height-session.html', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.fonts.ready);
  const families = await page.evaluate(() => ({ body: getComputedStyle(document.querySelector('.subpage')).fontFamily, heading: getComputedStyle(document.querySelector('h1')).fontFamily }));
  expect(families.body).toContain('DM Sans');
  expect(families.heading).toMatch(/Playfair Display|Georgia/);
});

test('key reading text uses at least 12px and comfortable line height', async ({ page }) => {
  await page.goto('/height-session.html', { waitUntil: 'domcontentloaded' });
  const failures = await page.locator('.growth-steps-visual p,.reviews-disclaimer,.form-privacy,.reading-cards small').evaluateAll((nodes) => nodes.map((node) => {
    const css = getComputedStyle(node);
    return { text: node.textContent.trim().slice(0, 45), size: parseFloat(css.fontSize), line: parseFloat(css.lineHeight) / parseFloat(css.fontSize) };
  }).filter((item) => item.size < 12 || item.line < 1.45));
  expect(failures, JSON.stringify(failures, null, 2)).toEqual([]);
});

test('primary mobile controls provide 44px touch targets', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const failures = await page.locator('.menu-toggle,.phone-head,.btn-primary,.review-carousel-controls button,.whatsapp').evaluateAll((nodes) => nodes.filter((node) => getComputedStyle(node).display !== 'none').map((node) => {
    const box = node.getBoundingClientRect(); return { label: node.getAttribute('aria-label') || node.textContent.trim(), width: box.width, height: box.height };
  }).filter((item) => item.width < 44 || item.height < 44));
  expect(failures, JSON.stringify(failures, null, 2)).toEqual([]);
});

test('form fields have labels, autocomplete, and required state', async ({ page }) => {
  await page.goto('/#booking', { waitUntil: 'domcontentloaded' });
  const fields = page.locator('#booking input,#booking select,#booking textarea');
  expect(await fields.count()).toBe(5);
  for (let i = 0; i < await fields.count(); i += 1) expect(await fields.nth(i).evaluate((field) => Boolean(field.closest('label')))).toBeTruthy();
  await expect(page.locator('#booking input[name="name"]')).toHaveAttribute('autocomplete', 'name');
  await expect(page.locator('#booking input[name="phone"]')).toHaveAttribute('autocomplete', 'tel');
  await expect(page.locator('#booking input[name="date"]')).toHaveAttribute('required', '');
});

test('preferred appointment date cannot be in the past', async ({ page }) => {
  await page.goto('/#booking', { waitUntil: 'domcontentloaded' });
  expect(await page.locator('input[name="date"]').getAttribute('min')).toBe(new Date().toISOString().split('T')[0]);
});

test('keyboard focus is clearly visible', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.keyboard.press('Tab');
  const focus = await page.evaluate(() => { const element = document.activeElement; const css = getComputedStyle(element); return { tag: element.tagName, outline: parseFloat(css.outlineWidth), shadow: css.boxShadow }; });
  expect(focus.tag).not.toBe('BODY');
  expect(focus.outline > 0 || focus.shadow !== 'none').toBeTruthy();
});

test('reduced-motion preference suppresses transitions and animations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const duration = await page.locator('.treatment-card').first().evaluate((node) => { const css = getComputedStyle(node); return { animation: css.animationDuration, transition: css.transitionDuration }; });
  expect(parseFloat(duration.animation)).toBeLessThanOrEqual(0.02);
  expect(parseFloat(duration.transition)).toBeLessThanOrEqual(0.02);
});

test('hero carousel manual controls work', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.image-note')).toContainText('01 / 03');
  await page.getByRole('button', { name: 'Show image 3' }).click();
  await expect(page.locator('.image-note')).toContainText('03 / 03');
});

test('review carousel buttons move the review rail', async ({ page }) => {
  await page.goto('/#reviews', { waitUntil: 'domcontentloaded' });
  const rail = page.locator('#review-rail');
  const before = await rail.evaluate((node) => node.scrollLeft);
  await page.getByRole('button', { name: 'Scroll reviews right' }).click();
  await page.waitForTimeout(500);
  expect(await rail.evaluate((node) => node.scrollLeft)).toBeGreaterThan(before);
});

test('doctor portraits use intentional centered crops', async ({ page }) => {
  await page.goto('/#doctors', { waitUntil: 'domcontentloaded' });
  const positions = await page.locator('.doctor-portrait img').evaluateAll((images) => images.map((img) => getComputedStyle(img).objectPosition));
  expect(positions).toHaveLength(2);
  expect(positions.every((value) => value.startsWith('50%'))).toBeTruthy();
});

test('insurance page shows six insurer logos and no placeholder language', async ({ page }) => {
  await page.goto('/insurance.html', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.insurer-tile')).toHaveCount(6);
  await expect(page.locator('.insurer-tile img')).toHaveCount(6);
  expect((await page.locator('body').innerText()).toLowerCase()).not.toMatch(/sample|testing|placeholder/);
});

test('NABH accreditation image is visible and loaded', async ({ page }) => {
  await page.goto('/insurance.html', { waitUntil: 'domcontentloaded' });
  const logo = page.locator('.nabh-badge img');
  await expect(logo).toBeVisible();
  expect(await logo.evaluate((img) => img.naturalWidth)).toBeGreaterThan(40);
});

test('height page has doctor, growth graphic, five reviews, and registration form', async ({ page }) => {
  await page.goto('/height-session.html', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.height-doctor-photo img')).toHaveAttribute('alt', /Manish/);
  await expect(page.locator('.height-spine-graphic svg')).toBeVisible();
  await expect(page.locator('.height-review-card')).toHaveCount(5);
  await expect(page.locator('#register form')).toBeVisible();
});

test('external new-tab links prevent opener access', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const unsafe = await page.locator('a[target="_blank"]').evaluateAll((links) => links.filter((link) => !/noopener|noreferrer/.test(link.rel)).map((link) => link.href));
  expect(unsafe).toEqual([]);
});

test('phone and WhatsApp contact links use valid destinations', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  expect(await page.locator('a[href^="tel:"]').count()).toBeGreaterThanOrEqual(3);
  await expect(page.locator('a.whatsapp')).toHaveAttribute('href', 'https://wa.me/918856031282');
});

test('desktop and mobile navigation expose essential actions', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('link', { name: 'Treatments', exact: true })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.menu-toggle')).toBeVisible();
  await page.locator('.menu-toggle').click();
  await expect(page.getByRole('link', { name: 'Cashless care' })).toBeVisible();
  await expect(page.locator('.nav').getByRole('link', { name: /Book consultation/ })).toBeVisible();
});

test('no console errors occur while rendering all routes', async ({ page }) => {
  const errors = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', (error) => errors.push(error.message));
  for (const [, route] of routes) await page.goto(route, { waitUntil: 'domcontentloaded' });
  expect(errors).toEqual([]);
});
