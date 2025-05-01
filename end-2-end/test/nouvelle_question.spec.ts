import { test, expect } from '@playwright/test';

test('accès à une nouvelle question après réponse', async ({ page }) => {
  await page.goto('https://rubrr.s3-main.oktopod.app/');
  await expect(page.getByRole('textbox')).toBeVisible();
  await page.getByRole('textbox').fill('ici on met la réponse');
  await page.getByRole('button', { name: 'Répondre' }).click();
  await expect(page.getByRole('link', { name: 'Nouvelle question' })).toBeVisible();
  await page.getByRole('link', { name: 'Nouvelle question' }).click();
  await expect(page.getByRole('textbox')).toBeVisible();
}); 