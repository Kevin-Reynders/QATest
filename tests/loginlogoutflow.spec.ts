import { test, expect } from '@playwright/test';
import { acceptCookiesIfPresent } from '../fixtures/mainFixture';
import { login, logout } from '../fixtures/accountFixture';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.vtmgo.be/vtmgo');
  await acceptCookiesIfPresent(page);
  await page.waitForURL('https://www.vtmgo.be/vtmgo');
});

test('Logging in and out on VTM GO', async ({ page }) => {
  await page.goto('https://www.vtmgo.be/');
  await login(page);
  await logout(page);
});