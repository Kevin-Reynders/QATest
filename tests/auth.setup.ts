import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { acceptCookiesIfPresent } from '../fixtures/mainFixture';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const response = await page.goto('https://www.vtmgo.be/vtmgo'); //Specifically referring to this page for login flow
  await page.waitForTimeout(3000);
  await acceptCookiesIfPresent(page);
  await page.click('text=Inloggen'); //Click login button
  await page.fill('input[name="username"]', 'reynderskev@gmail.com'); //Fill in email
  await page.locator("[type=submit]").click(); //Click Ga verder ->
  await page.fill('input[name="password"]', 'Testingskills!1'); //Fill in password
  await page.locator("[type=submit]").click(); //Click Log in ->
  await page.waitForResponse('https://login.vtmgo.be/ssosession'); //Wait for the login response to ensure login is complete

  await page.context().storageState({ path: authFile });
});