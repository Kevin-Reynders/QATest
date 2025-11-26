import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { acceptCookiesIfPresent } from '../fixtures/mainFixture';
import { login } from '../fixtures/accountFixture';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const response = await page.goto('https://www.vtmgo.be/vtmgo'); //Specifically referring to this page for login flow
  await page.waitForTimeout(3000);
  await acceptCookiesIfPresent(page);
  await login(page);
  await page.context().storageState({ path: authFile });
});