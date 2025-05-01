import { test, expect } from '@playwright/test';

test('accès à la liste des questions et recherche', async ({ page }) => {
  await page.goto('https://rubrr.s3-main.oktopod.app/');
  await expect(page.getByRole('link', { name: 'Liste des questions' })).toBeVisible();
  await page.getByRole('link', { name: 'Liste des questions' }).click();
  await expect(page.getByRole('textbox')).toBeVisible();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('clé primaire');
  await page.getByRole('button', { name: 'Rechercher' }).click();
  await expect(page.getByRole('cell', { name: /voir/i }).first()).toBeVisible();
}); 