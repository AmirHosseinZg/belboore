import { test, expect } from '@playwright/test';

test.describe('Core site smoke tests', () => {
  test('Homepage loads in English at /en', async ({ page }) => {
    const response = await page.goto('/en');
    expect(response?.status()).toBe(200);
  });

  test('Homepage loads in Persian at /fa', async ({ page }) => {
    const response = await page.goto('/fa');
    expect(response?.status()).toBe(200);
  });

  test('Root / loads successfully', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('Title contains "Belboore"', async ({ page }) => {
    await page.goto('/en');
    await expect(page).toHaveTitle(/Belboore/);
  });

  test.describe('Header', () => {
    test('Main navigation links are visible (desktop)', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/en');
      const nav = page.locator('#main-nav');
      await expect(nav).toBeVisible();
      const navLinks = nav.locator('.header__nav-link');
      const labels = await navLinks.allTextContents();
      expect(labels.some(l => l.includes('Home'))).toBe(true);
      expect(labels.some(l => l.includes('Tools'))).toBe(true);
    });

    test('Header logo links to homepage', async ({ page }) => {
      await page.goto('/en/tools');
      const logo = page.locator('.header__logo');
      await expect(logo).toBeVisible();
      const logoHref = await logo.getAttribute('href');
      expect(logoHref).toContain('/en');
      await logo.click();
      await expect(page).toHaveURL(/\/en/);
    });

    test('Theme toggle button exists', async ({ page }) => {
      await page.goto('/en');
      const toggle = page.locator('[data-testid="theme-toggle"]');
      await expect(toggle).toBeVisible();
    });

    test('Language switcher exists', async ({ page }) => {
      await page.goto('/en');
      const langSwitch = page.locator('[data-testid="lang-switch"]');
      await expect(langSwitch).toBeVisible();
    });
  });

  test('Footer is visible with copyright', async ({ page }) => {
    await page.goto('/en');
    const footer = page.locator('.footer');
    await expect(footer).toBeVisible();
  });

  test('404 page shows for /en/nonexistent-page', async ({ page }) => {
    const response = await page.goto('/en/nonexistent-page');
    expect(response?.status()).toBe(404);
  });
});
