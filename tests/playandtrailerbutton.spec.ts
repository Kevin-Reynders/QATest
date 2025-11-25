import { test, expect } from '@playwright/test';
import { acceptCookiesIfPresent } from '../fixtures/mainFixture';
import { programPage } from '../pageElements/programPage';

const linkeroever = "https://www.vtmgo.be/vtmgo/linkeroever~1146b3e3-78dc-4176-b335-ad4659b5346d"
const oneShot = "https://www.vtmgo.be/vtmgo/one-shot~7532d76f-d5e2-4a2a-8e6e-ac673a91125d"
const oneShotTrailer = "https://www.vtmgo.be/vtmgo/afspelen/a6274412-6d46-4a35-9596-47c5e898a08f";
const inTheLostLands = "https://www.vtmgo.be/vtmgo/in-the-lost-lands~83d4f32e-6a18-4332-9847-6e8ac3e7ada4"
const inTheLostLandsTrailer = "https://www.vtmgo.be/vtmgo/afspelen/20f1d3f0-af75-43d8-9cec-e912f0f5a226";

test.beforeEach(async ({ page }) => {
  // Assuming authentication is required for these tests
  await page.goto('https://www.vtmgo.be/vtmgo');
  await acceptCookiesIfPresent(page);
  await page.waitForURL('https://www.vtmgo.be/vtmgo'); //Added a waitForURL so the page has processed the acceptance of cookies before tests
});

test('Check if play button is visible and trailer button invisible for Linkeroever', async ({ page }) => {
    await page.goto(linkeroever);
    await page.waitForURL(linkeroever);
    await expect(page.locator(programPage.title)).toHaveText('Linkeroever'); //Checking on the hidden title if we're actually on the right page
    await expect(page.locator(programPage.watchNowButton)).toBeVisible();
    await expect(page.locator(programPage.trailerButton)).toBeHidden();
});

test('Check if play and trailer button is visible for One Shot', async ({ page }) => {
    await page.goto(oneShot);
    await page.waitForURL(oneShot);
    await expect(page.locator(programPage.title)).toHaveText('One Shot'); //Checking on the hidden title if we're actually on the right page
    await expect(page.locator(programPage.watchNowButton)).toBeVisible();
    await expect(page.locator(programPage.trailerButton)).toBeVisible();
    /*await page.locator(programPage.trailerButton).click();
    await page.waitForURL(oneShotTrailer);
    expect(page.url()).toBe(oneShotTrailer); Checking if the trailer links to a valid page*/
});

test('Check if play and trailer button is visible for In The Lost Lands', async ({ page }) => {
    await page.goto(inTheLostLands);
    await page.waitForURL(inTheLostLands);
    expect(page.locator(programPage.title)).toHaveText('In the Lost Lands'); //Checking on the hidden title if we're actually on the right page
    await expect(page.locator(programPage.watchNowButton)).toBeVisible();
    await expect(page.locator(programPage.trailerButton)).toBeVisible();
    /*await page.locator(programPage.trailerButton).click();
    await page.waitForURL(inTheLostLandsTrailer);
    expect(page.url()).toBe(inTheLostLandsTrailer); Checking if the trailer links to a valid page*/
});