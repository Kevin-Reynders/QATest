import { test, expect } from '@playwright/test';
import { loginPage } from '../pageElements/loginPage';
import { mainPage } from '../pageElements/mainPage';
import { acceptCookiesIfPresent } from '../fixtures/mainFixture';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.vtmgo.be/vtmgo');
  await acceptCookiesIfPresent(page);
  await page.waitForURL('https://www.vtmgo.be/vtmgo');
});

test('Logging in on VTM GO', async ({ page }) => {
  await page.goto('https://www.vtmgo.be/vtmgo');
  await page.click(mainPage.loginButton); //Click login button
  await page.waitForTimeout(5000); //Hardcoded a wait at the moment for loading, replacing later with proper check
  await page.fill(loginPage.username, 'reynderskev@gmail.com'); //Fill in email
  await page.locator(loginPage.submitButton).click(); //Click Ga verder ->
  await page.waitForTimeout(5000);
  await page.fill(loginPage.password, 'Testingskills!1'); //Fill in password
  await page.locator(loginPage.submitButton).click(); //Click Log in ->
  // Verify login was successful
  await expect(page.locator(mainPage.userDropdown)).toBeVisible();
  // Continue with further checks as needed
});

test('Logging out on VTM GO', async ({ page }) => {
  //I've tried using an auth file, so basically having a logged-in state here, but vtmgo blocks automated logins, which blocks this flow
  await page.goto('https://www.vtmgo.be/');
  await page.click(mainPage.userDropdown);
  await page.click(mainPage.logoutButton);
  await page.click(mainPage.logoutConfirmButton);
  await expect(page.locator(mainPage.loginButton)).toBeVisible();
  // Continue with further checks as needed
});