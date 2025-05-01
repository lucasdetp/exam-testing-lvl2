import { test, expect } from '@playwright/test';

test('accès à la liste complète des questions', async ({ page }) => {
  await page.goto('https://rubrr.s3-main.oktopod.app/');
  await expect(page.getByRole('link', { name: /plus de/i })).toBeVisible();
  await page.getByRole('link', { name: '✨ Plus de 712 questions' }).click();
  await expect(page.getByRole('textbox')).toBeVisible();
}); 