import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['allure-playwright', {
      outputFolder: 'allure-results',   // only this line needed
    }],
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['list'],
    ['json', { outputFile: 'reports/test-results.json' }],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://www.skoda-parts.com',
    //       ↑ reads secret in CI, falls back to prod URL locally

    screenshot: 'only-on-failure',
    video: 'on',
    trace: 'on-first-retry',

    viewport:          { width: 1280, height: 720 },
    actionTimeout:     10_000,
    navigationTimeout: 30_000,
  },

  timeout: 60_000,
  expect: { timeout: 10_000 },
  outputDir: 'test-results',

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});