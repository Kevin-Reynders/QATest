import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';

const linkeroever = "https://www.vtmgo.be/vtmgo/linkeroever~1146b3e3-78dc-4176-b335-ad4659b5346d"
const oneShot = "https://www.vtmgo.be/vtmgo/one-shot~7532d76f-d5e2-4a2a-8e6e-ac673a91125d"
const inTheLostLands = "https://www.vtmgo.be/vtmgo/in-the-lost-lands~83d4f32e-6a18-4332-9847-6e8ac3e7ada4"

beforeEach(async ({ page }) => {
  // Assuming authentication is required for these tests
  await page.goto('https://www.vtmgo.be/vtmgo');
});

test('Check if play button is visible and trailer button invisible for Linkeroever', async ({ page }) => {
    await page.goto(linkeroever);

    
});

test('Check if play and trailer button is visible for One Shot', async ({ page }) => {
    await page.goto(oneShot);
});

test('Check if play and trailer button is visible for In The Lost Lands', async ({ page }) => {
    await page.goto(inTheLostLands);
});