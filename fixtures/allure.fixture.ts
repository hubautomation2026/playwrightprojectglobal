/**
 * fixtures/allure.fixture.ts
 *
 * Extends the base Playwright `test` with automatic Allure video + screenshot
 * attachment after every test.
 *
 * Usage — replace your imports in any spec file:
 *
 *   // Before
 *   import { test, expect } from '@playwright/test';
 *
 *   // After
 *   import { test, expect } from '../fixtures/allure.fixture';
 *
 * That's it.  Video (webm) and, on failure, a screenshot PNG are automatically
 * attached to the Allure result for every test in that suite.
 */

import { test as base, expect } from '@playwright/test';
import {
  attachVideoToAllure,
  attachTraceToAllure,
  takeScreenshot,
} from '../utils/helpers';

export { expect };

export const test = base.extend({
  // Override the built-in `page` fixture to hook teardown
  page: async ({ page }, use, testInfo) => {
    // ── Run the test ───────────────────────────────────────────────
    await use(page);

    // ── Teardown — runs after every test ──────────────────────────

    // 1. Attach the recorded video to Allure for every test —
    //    passed, failed, or skipped.
    await attachVideoToAllure(page, testInfo);

    // 2. On failure, grab an extra labelled screenshot
    if (testInfo.status !== testInfo.expectedStatus) {
      await takeScreenshot(page, `FAILED_${testInfo.title.replace(/\s+/g, '_')}`);
    }

    // 3. Attach trace zip (written by Playwright on retry / first-retry config)
    await attachTraceToAllure(testInfo);
  },
});