import { test, expect } from '@playwright/test';
import { loginPage } from '../pageElements/login';
import { mainPage } from '../pageElements/main';

test('Logging in on VTM GO', async ({ page }) => {
  await page.goto('https://www.vtmgo.be');
  await page.waitForTimeout(3000);
  //cookies
  try {
    await page.click(mainPage.cookiesAcceptButton, { timeout: 3000 });
  } catch (e) {
  //If cookies are not found, continue
  }
  await page.waitForTimeout(3000);
  await page.click(mainPage.loginButton); //Click login button
  await page.waitForTimeout(3000);
  await page.fill(loginPage.username, 'reynderskev@gmail.com'); //Fill in email
  await page.waitForTimeout(3000);
  await page.locator(loginPage.submitButton).click(); //Click Ga verder ->
  await page.waitForTimeout(3000);
  await page.fill(loginPage.password, 'Testingskills!1'); //Fill in password
  await page.waitForTimeout(3000);
  await page.locator(loginPage.submitButton).click(); //Click Log in ->
  // Continue with further checks as needed
});

test('Logging out on VTM GO', async ({ page }) => {
  await page.goto('https://www.vtmgo.be/');


});