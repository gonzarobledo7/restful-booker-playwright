import { expect, test } from '@playwright/test';

test.describe('Home page', { tag: '@smoke' }, () => {
  test('renders the hotel branding and the room list', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Restful-booker-platform demo');
    // The hero heading is built from the branding service, so it proves UI and API are wired.
    await expect(page.getByRole('heading', { level: 1, name: /^Welcome to / })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Our Rooms' })).toBeVisible();
  });
});
