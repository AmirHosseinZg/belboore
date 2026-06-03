import { test, expect } from '@playwright/test';

test.describe('Live Tools', () => {
  test.describe('JSON Formatter', () => {
    test('page loads with workspace', async ({ page }) => {
      await page.goto('/en/tools/json-formatter');
      await expect(page.locator('.workspace')).toBeVisible();
    });

    test('Format button exists', async ({ page }) => {
      await page.goto('/en/tools/json-formatter');
      await expect(page.locator('#json-format')).toBeVisible();
    });

    test('invalid JSON shows error', async ({ page }) => {
      await page.goto('/en/tools/json-formatter');
      await page.locator('#json-input').fill('{invalid}');
      await page.locator('#json-format').click();
      await expect(page.locator('#json-error')).toBeVisible();
    });

    test('valid JSON formats correctly', async ({ page }) => {
      await page.goto('/en/tools/json-formatter');
      await page.locator('#json-input').fill('{"hello":"world"}');
      await page.locator('#json-format').click();
      await expect(page.locator('#json-output')).toContainText('"hello"');
    });
  });

  test.describe('Base64 Encoder', () => {
    test('page loads with workspace', async ({ page }) => {
      await page.goto('/en/tools/base64-encoder');
      await expect(page.locator('.workspace')).toBeVisible();
    });

    test('Encode and Decode buttons exist', async ({ page }) => {
      await page.goto('/en/tools/base64-encoder');
      await expect(page.locator('#b64-encode')).toBeVisible();
      await expect(page.locator('#b64-decode')).toBeVisible();
    });
  });

  test.describe('Password Generator', () => {
    test('page loads with workspace', async ({ page }) => {
      await page.goto('/en/tools/password-generator');
      await expect(page.locator('.workspace')).toBeVisible();
    });

    test('generate creates a password', async ({ page }) => {
      await page.goto('/en/tools/password-generator');
      await page.locator('#pw-generate').click();
      const display = page.locator('#pw-display');
      await expect(display).toBeVisible();
      const text = await display.textContent();
      expect(text?.trim().length).toBeGreaterThanOrEqual(6);
    });

    test('length slider and checkboxes exist', async ({ page }) => {
      await page.goto('/en/tools/password-generator');
      await expect(page.locator('#pw-length')).toBeVisible();
      await expect(page.locator('#pw-uppercase')).toBeVisible();
      await expect(page.locator('#pw-lowercase')).toBeVisible();
      await expect(page.locator('#pw-numbers')).toBeVisible();
    });
  });

  test.describe('UUID Generator', () => {
    test('page loads with workspace', async ({ page }) => {
      await page.goto('/en/tools/uuid-generator');
      await expect(page.locator('.workspace')).toBeVisible();
    });

    test('generate creates UUIDs', async ({ page }) => {
      await page.goto('/en/tools/uuid-generator');
      await page.locator('#uuid-generate').click();
      const output = page.locator('#uuid-output');
      await expect(output).not.toBeEmpty();
      const text = await output.textContent();
      expect(text).toContain('-');
    });

    test('count input exists', async ({ page }) => {
      await page.goto('/en/tools/uuid-generator');
      await expect(page.locator('#uuid-count')).toBeVisible();
    });
  });

  test.describe('Case Converter', () => {
    test('page loads with workspace', async ({ page }) => {
      await page.goto('/en/tools/case-converter');
      await expect(page.locator('.workspace')).toBeVisible();
    });

    test('uppercase converts text correctly', async ({ page }) => {
      await page.goto('/en/tools/case-converter');
      await page.locator('#cc-input').fill('hello world');
      await page.locator('#cc-upper').click();
      await expect(page.locator('#cc-output')).toContainText('HELLO WORLD');
    });
  });

  test.describe('Word Counter', () => {
    test('page loads with workspace', async ({ page }) => {
      await page.goto('/en/tools/word-counter');
      await expect(page.locator('.workspace')).toBeVisible();
    });

    test('typing text updates word count', async ({ page }) => {
      await page.goto('/en/tools/word-counter');
      await page.locator('#wc-input').fill('hello world test');
      await page.waitForTimeout(500);
      await expect(page.locator('#wc-words')).toContainText('3');
    });
  });

  test.describe('Color Converter', () => {
    test('page loads with workspace', async ({ page }) => {
      await page.goto('/en/tools/color-converter');
      await expect(page.locator('.workspace')).toBeVisible();
    });

    test('shows default color values', async ({ page }) => {
      await page.goto('/en/tools/color-converter');
      await expect(page.locator('#cc-hex')).toContainText(/3b82f6/i);
    });

    test('convert button exists', async ({ page }) => {
      await page.goto('/en/tools/color-converter');
      await expect(page.locator('#cc-convert')).toBeVisible();
    });
  });

  test.describe('URL Encoder', () => {
    test('page loads with workspace', async ({ page }) => {
      await page.goto('/en/tools/url-encoder');
      await expect(page.locator('.workspace')).toBeVisible();
    });

    test('encode component produces encoded output', async ({ page }) => {
      await page.goto('/en/tools/url-encoder');
      await page.locator('#url-input').fill('hello world');
      await page.locator('#url-encode-comp').click();
      await expect(page.locator('#url-output')).toContainText('hello%20world');
    });
  });

  test.describe('Hash Generator', () => {
    test('page loads with workspace', async ({ page }) => {
      await page.goto('/en/tools/hash-generator');
      await expect(page.locator('.workspace')).toBeVisible();
    });

    test('generates MD5 hash', async ({ page }) => {
      await page.goto('/en/tools/hash-generator');
      await page.locator('#hg-input').fill('test');
      await page.locator('#hg-algo').selectOption('MD5');
      await page.waitForTimeout(500);
      const output = page.locator('#hg-output');
      const text = await output.textContent();
      expect(text?.length).toBeGreaterThan(0);
    });

    test('algo selector exists', async ({ page }) => {
      await page.goto('/en/tools/hash-generator');
      await expect(page.locator('#hg-algo')).toBeVisible();
    });
  });

  test.describe('Timestamp Converter', () => {
    test('page loads with workspace', async ({ page }) => {
      await page.goto('/en/tools/time-converter');
      await expect(page.locator('.workspace')).toBeVisible();
    });

    test('has timestamp input', async ({ page }) => {
      await page.goto('/en/tools/time-converter');
      await expect(page.locator('#tc-ts')).toBeVisible();
    });

    test('has date input', async ({ page }) => {
      await page.goto('/en/tools/time-converter');
      await expect(page.locator('#tc-date')).toBeVisible();
    });
  });

  test.describe('Unit Converter', () => {
    test('page loads with workspace', async ({ page }) => {
      await page.goto('/en/tools/unit-converter');
      await expect(page.locator('.workspace')).toBeVisible();
    });

    test('has category selector and unit inputs', async ({ page }) => {
      await page.goto('/en/tools/unit-converter');
      await expect(page.locator('#uc-category')).toBeVisible();
      await expect(page.locator('#uc-from-val')).toBeVisible();
      await expect(page.locator('#uc-from-unit')).toBeVisible();
      await expect(page.locator('#uc-to-unit')).toBeVisible();
    });

    test('conversion result updates', async ({ page }) => {
      await page.goto('/en/tools/unit-converter');
      await page.locator('#uc-from-val').fill('1');
      await page.waitForTimeout(500);
      const result = page.locator('#uc-to-result');
      await expect(result).toBeVisible();
    });
  });

  test.describe('Lorem Ipsum', () => {
    test('page loads with workspace', async ({ page }) => {
      await page.goto('/en/tools/lorem-ipsum');
      await expect(page.locator('.workspace')).toBeVisible();
    });

    test('generates paragraphs', async ({ page }) => {
      await page.goto('/en/tools/lorem-ipsum');
      await page.locator('#li-generate').click();
      await expect(page.locator('#li-output')).not.toBeEmpty();
    });
  });

  test.describe('Line Sorter', () => {
    test('page loads with workspace', async ({ page }) => {
      await page.goto('/en/tools/line-sorter');
      await expect(page.locator('.workspace')).toBeVisible();
    });

    test('sorts lines alphabetically', async ({ page }) => {
      await page.goto('/en/tools/line-sorter');
      await page.locator('#ls-input').fill('c\na\nb');
      await page.locator('#ls-order').selectOption('alpha-asc');
      await page.locator('#ls-sort').click();
      await expect(page.locator('#ls-output')).toContainText('a');
    });
  });
});
