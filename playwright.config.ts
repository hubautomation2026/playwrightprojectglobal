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
    // ── Allure reporter ──────────────────────────────────────────────
    // Generates raw Allure results in allure-results/.
    // After the run, generate the HTML report with:
    //   npx allure generate allure-results --clean -o allure-report
    // Then open it with:
    //   npx allure open allure-report
    ['allure-playwright', {
      outputFolder: 'allure-results',
      // Attach screenshots, videos, and traces automatically
      attachmentsBaseURL: 'allure-results',
    }],

    // ── Built-in reporters ───────────────────────────────────────────
    ['html',  { outputFolder: 'reports/html-report', open: 'never' }],
    ['list'],
    ['json',  { outputFile: 'reports/test-results.json' }],
  ],

  use: {
    baseURL: 'https://www.skoda-parts.com',

    // ── Screenshots ──────────────────────────────────────────────────
    screenshot: 'only-on-failure',

    // ── Video recording — record and keep every test ─────────────────
    video: 'on',

    // ── Traces ───────────────────────────────────────────────────────
    trace: 'on-first-retry',

    viewport:          { width: 1280, height: 720 },
    actionTimeout:     10_000,
    navigationTimeout: 30_000,
  },

  timeout: 60_000,
  expect: { timeout: 10_000 },

  // ── Output dir for videos / screenshots / traces ─────────────────
  outputDir: 'test-results',

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});