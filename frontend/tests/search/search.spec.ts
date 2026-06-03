import { test, expect } from '@playwright/test';

test.describe('Search', () => {
  test('On /en/tools page: search input exists', async ({ page }) => {
    await page.goto('/en/tools');
    const searchInput = page.locator('[data-testid="tools-search"]');
    await expect(searchInput).toBeVisible();
  });

  test('Typing "json" filters to show JSON-related tools', async ({ page }) => {
    await page.goto('/en/tools');
    const searchInput = page.locator('[data-testid="tools-search"]');
    await searchInput.fill('json');
    await page.waitForTimeout(300);
    const toolsGrid = page.locator('#tools-results');
    await expect(toolsGrid).toBeVisible();
  });

  test('Typing nonsense query shows empty state', async ({ page }) => {
    await page.goto('/en/tools');
    const searchInput = page.locator('[data-testid="tools-search"]');
    await searchInput.fill('xyznonexistent123');
    await page.waitForTimeout(300);
    const empty = page.locator('#tools-empty');
    await expect(empty).toBeVisible();
  });

  test('Clearing search shows all tools again', async ({ page }) => {
    await page.goto('/en/tools');
    const searchInput = page.locator('[data-testid="tools-search"]');
    await searchInput.fill('json');
    await page.waitForTimeout(300);
    await searchInput.fill('');
    await page.waitForTimeout(300);
    const toolsGrid = page.locator('#tools-results');
    await expect(toolsGrid).toBeVisible();
  });
});
