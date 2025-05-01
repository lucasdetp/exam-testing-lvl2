import { test, expect } from '@playwright/test';

test('recherche et consultation d\'une question', async ({ page }) => {
  await page.goto('https://rubrr.s3-main.oktopod.app/');
  await page.getByRole('link', { name: '✨ Plus de 712 questions' }).click();
  await expect(page.getByRole('textbox')).toBeVisible();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('primaire');
  await page.getByRole('button', { name: 'Rechercher' }).click();
  await expect(page.getByRole('cell', { name: 'Voir' }).first()).toBeVisible();
  await page.getByRole('cell', { name: 'Voir' }).first().click();
}); 