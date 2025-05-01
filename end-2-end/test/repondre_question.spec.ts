import { test, expect } from '@playwright/test';

test('répondre à une question', async ({ page }) => {
  await page.goto('https://rubrr.s3-main.oktopod.app/');
  await expect(page.getByRole('textbox')).toBeVisible();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('ici on met la réponse');
  await page.getByRole('button', { name: 'Répondre' }).click();
  await expect(page.locator('text=La réponse est trop courte')).not.toBeVisible();
}); 