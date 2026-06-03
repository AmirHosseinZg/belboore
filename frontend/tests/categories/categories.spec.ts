import { test, expect } from '@playwright/test';

test.describe('Categories', () => {
  test('/en/categories page loads and shows category cards', async ({ page }) => {
    await page.goto('/en/categories');
    const cards = page.locator('.category-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('/en/categories/image loads and shows image tools', async ({ page }) => {
    await page.goto('/en/categories/image');
    await expect(page.locator('h1')).toContainText(/Image|ابزار/);
    const toolCards = page.locator('.tool-card');
    const count = await toolCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Category page has breadcrumb navigation', async ({ page }) => {
    await page.goto('/en/categories/image');
    const breadcrumb = page.locator('.breadcrumb');
    await expect(breadcrumb).toBeVisible();
  });
});
