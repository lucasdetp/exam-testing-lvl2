import { test, expect } from '@playwright/test';

test('navigation entre les thèmes', async ({ page }) => {
  await page.goto('https://rubrr.s3-main.oktopod.app/');
  await expect(page.getByRole('link', { name: 'Backend' })).toBeVisible();
  await page.getByRole('link', { name: 'Backend' }).click();
  await expect(page.getByRole('link', { name: 'Conception BDD' })).toBeVisible();
  await page.getByRole('link', { name: 'Conception BDD' }).click();
}); 