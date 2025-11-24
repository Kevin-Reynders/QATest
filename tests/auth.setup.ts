import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');


setup('authenticate', async ({ page }) => {
  const response = await page.goto('https://www.vtmgo.be/vtmgo'); //Specifically referring to this page for login flow
  console.log('Initial navigation status:', response?.status());
  await page.waitForTimeout(3000);
  await page.click('#pg-accept-btn'); //Accept cookies
  await page.waitForTimeout(3000);
  await page.click('text=Inloggen'); //Click login button
  await page.waitForTimeout(3000);
  await page.fill('input[name="username"]', 'reynderskev@gmail.com'); //Fill in email
  await page.waitForTimeout(3000);
  await page.locator("[type=submit]").click(); //Click Ga verder ->
  await page.waitForTimeout(3000);
  await page.fill('input[name="password"]', 'Testingskills!1'); //Fill in password
  await page.waitForTimeout(3000);
  await page.locator("[type=submit]").click(); //Click Log in ->
  await page.waitForResponse('https://login.vtmgo.be/ssosession'); //Wait for the login response to ensure login is complete

  await page.context().storageState({ path: authFile });
});