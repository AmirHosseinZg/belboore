import { test, expect } from '@playwright/test';

test.describe('i18n', () => {
  test('/fa has dir="rtl" on html element', async ({ page }) => {
    await page.goto('/fa');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('dir', 'rtl');
    await expect(html).toHaveAttribute('lang', 'fa');
  });

  test('/en has dir="ltr" on html element', async ({ page }) => {
    await page.goto('/en');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('dir', 'ltr');
    await expect(html).toHaveAttribute('lang', 'en');
  });

  test('Clicking language switch from /en navigates to /fa equivalent', async ({ page }) => {
    await page.goto('/en/tools');
    const langSwitch = page.locator('[data-testid="lang-switch"]');
    const href = await langSwitch.getAttribute('href');
    expect(href).toContain('/fa');
    await langSwitch.click();
    await expect(page).toHaveURL(/\/fa\/tools/);
  });

  test('/fa shows Persian text', async ({ page }) => {
    await page.goto('/fa');
    const logo = page.locator('.header__logo-text');
    await expect(logo).toContainText(/\u0628/); // Arabic/Persian character
  });
});
