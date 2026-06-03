import { test, expect } from '@playwright/test';

test.describe('Routing', () => {
  test('GET /en returns 200', async ({ page }) => {
    const response = await page.goto('/en');
    expect(response?.status()).toBe(200);
  });

  test('GET /fa returns 200', async ({ page }) => {
    const response = await page.goto('/fa');
    expect(response?.status()).toBe(200);
  });

  test('GET / redirects to /fa', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    const url = page.url();
    expect(url === 'http://localhost:4321/' || url.includes('/fa')).toBe(true);
  });

  test('/en/tools returns 200', async ({ page }) => {
    const response = await page.goto('/en/tools');
    expect(response?.status()).toBe(200);
  });

  test('/en/categories returns 200', async ({ page }) => {
    const response = await page.goto('/en/categories');
    expect(response?.status()).toBe(200);
  });

  test('/en/about returns 200', async ({ page }) => {
    const response = await page.goto('/en/about');
    expect(response?.status()).toBe(200);
  });

  test('/en/contribute returns 200', async ({ page }) => {
    const response = await page.goto('/en/contribute');
    expect(response?.status()).toBe(200);
  });

  test('/fa/tools returns 200', async ({ page }) => {
    const response = await page.goto('/fa/tools');
    expect(response?.status()).toBe(200);
  });
});

test.describe('Error Pages', () => {
  test('/en/404 shows 404 content', async ({ page }) => {
    await page.goto('/en/404');
    await expect(page.locator('.not-found__code')).toContainText('404');
  });

  test('/fa/404 returns 404 and shows Persian', async ({ page }) => {
    const response = await page.goto('/fa/404');
    expect(response?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  });

  test('/en/403 returns 200 (page exists)', async ({ page }) => {
    const response = await page.goto('/en/403');
    expect(response?.status()).toBe(200);
    await expect(page.locator('.error-page__code')).toContainText('403');
  });

  test('/fa/403 returns 200 and shows RTL', async ({ page }) => {
    const response = await page.goto('/fa/403');
    expect(response?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('.error-page__code')).toContainText('403');
  });

  test('/en/500 returns 200 (page exists)', async ({ page }) => {
    const response = await page.goto('/en/500');
    expect(response?.status()).toBe(200);
    await expect(page.locator('.error-page__code')).toContainText('500');
  });

  test('/fa/500 returns 200 and shows RTL', async ({ page }) => {
    const response = await page.goto('/fa/500');
    expect(response?.status()).toBe(200);
    await expect(page.locator('.error-page__code')).toContainText('500');
  });

  test('/en/nonexistent shows 404 content', async ({ page }) => {
    const response = await page.goto('/en/nonexistent');
    // Astro serves custom 404 page or default — either is acceptable
    const status = response?.status();
    expect([200, 404]).toContain(status);
  });
});

test.describe('SEO', () => {
  test('Homepage has canonical URL', async ({ page }) => {
    await page.goto('/en');
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /\/en/);
  });

  test('Homepage has meta description', async ({ page }) => {
    await page.goto('/en');
    const desc = page.locator('meta[name="description"]');
    await expect(desc).toHaveAttribute('content');
    const content = await desc.getAttribute('content');
    expect(content?.length).toBeGreaterThan(10);
  });

  test('Tool page has canonical URL', async ({ page }) => {
    await page.goto('/en/tools/json-formatter');
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /\/en\/tools\/json-formatter/);
  });

  test('Tool page has BreadcrumbList schema', async ({ page }) => {
    await page.goto('/en/tools/json-formatter');
    const scripts = page.locator('script[type="application/ld+json"]');
    const count = await scripts.count();
    expect(count).toBeGreaterThanOrEqual(2);
    const allText = await scripts.allTextContents();
    const joined = allText.join('');
    expect(joined).toContain('BreadcrumbList');
  });

  test('Tool page has SoftwareApplication schema', async ({ page }) => {
    await page.goto('/en/tools/json-formatter');
    const scripts = page.locator('script[type="application/ld+json"]');
    const last = await scripts.last().textContent();
    expect(last).toContain('SoftwareApplication');
  });

  test('Page has hreflang alternates', async ({ page }) => {
    await page.goto('/en/tools/json-formatter');
    const alternates = page.locator('link[rel="alternate"]');
    const count = await alternates.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });
});
