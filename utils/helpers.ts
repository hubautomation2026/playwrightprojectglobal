/**
 * utils/helpers.ts
 *
 * Shared utility functions used across test suites.
 *
 * Includes:
 *  - Allure step / attachment helpers (allureStep, attachScreenshot, attachText)
 *  - Video recording helpers (startVideoRecording, stopAndAttachVideo)
 *  - Existing waitForPageIdle, takeScreenshot, debugPause
 */

import { Page, TestInfo } from '@playwright/test';
import * as allure from 'allure-js-commons';
import * as fs from 'fs';

// ─── Page / Network ────────────────────────────────────────────────────────────

/**
 * Wait for a page to fully settle (no pending network requests).
 */
export async function waitForPageIdle(page: Page, timeout = 5_000) {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Take a labelled screenshot saved to reports/screenshots/<name>.png.
 * Also attaches the PNG to the current Allure report step (if Allure is active).
 */
export async function takeScreenshot(page: Page, name: string) {
  const filePath = `reports/screenshots/${name}.png`;

  // Ensure the directory exists
  fs.mkdirSync('reports/screenshots', { recursive: true });

  const buffer = await page.screenshot({ path: filePath, fullPage: true });

  // Attach to Allure report
  await allure.attachment(name, buffer, 'image/png');

  return filePath;
}

/**
 * Pause execution — use only for debugging, not in CI tests.
 */
export async function debugPause(page: Page) {
  if (process.env.CI) return; // never pause on CI
  await page.pause();
}

// ─── Allure Step Helpers ────────────────────────────────────────────────────────

/**
 * Wrap any async work in a named Allure step.
 *
 * Usage:
 *   await allureStep('Fill login form', async () => {
 *     await page.fill('#email', user.email);
 *     await page.fill('#password', user.password);
 *   });
 */
export async function allureStep<T>(
  name: string,
  fn: () => Promise<T>,
): Promise<T> {
  return allure.step(name, fn);
}

/**
 * Attach a plain-text string to the current Allure report.
 * Useful for logging request payloads, API responses, etc.
 */
export async function attachText(label: string, content: string) {
  await allure.attachment(label, Buffer.from(content, 'utf-8'), 'text/plain');
}

/**
 * Attach a JSON value (object / array) to the current Allure report.
 */
export async function attachJSON(label: string, data: unknown) {
  const json = JSON.stringify(data, null, 2);
  await allure.attachment(label, Buffer.from(json, 'utf-8'), 'application/json');
}

/**
 * Attach an existing file (e.g. a downloaded CSV or PDF) to the Allure report.
 */
export async function attachFile(
  label: string,
  filePath: string,
  mimeType = 'application/octet-stream',
) {
  const buffer = fs.readFileSync(filePath);
  await allure.attachment(label, buffer, mimeType);
}

// ─── Video Recording Helpers ───────────────────────────────────────────────────

/**
 * Attach the test video (recorded by Playwright) to the Allure report.
 *
 * Call this inside an afterEach / test teardown AFTER the page is closed,
 * because Playwright finalises the video file only when the page (or context)
 * is closed.
 *
 * Usage (inside a test):
 *   test.afterEach(async ({ page }, testInfo) => {
 *     await attachVideoToAllure(page, testInfo);
 *   });
 */
export async function attachVideoToAllure(page: Page, testInfo: TestInfo) {
  // video() resolves to null when video recording is disabled
  const videoPath = await page.video()?.path();

  if (!videoPath) return;

  // Wait until the file actually exists (Playwright may still be writing it)
  await waitForFile(videoPath, 10_000);

  const buffer = fs.readFileSync(videoPath);
  const label  = `Video — ${testInfo.title}`;

  await allure.attachment(label, buffer, 'video/webm');
}

/**
 * Attach the Playwright trace zip to the Allure report (call after test ends).
 * Playwright writes traces to testInfo.outputPath('trace.zip').
 */
export async function attachTraceToAllure(testInfo: TestInfo) {
  const tracePath = testInfo.outputPath('trace.zip');
  if (!fs.existsSync(tracePath)) return;

  const buffer = fs.readFileSync(tracePath);
  await allure.attachment('Playwright Trace', buffer, 'application/zip');
}

// ─── Internal Utilities ────────────────────────────────────────────────────────

/**
 * Poll until a file exists on disk, up to `timeoutMs`.
 * Playwright writes videos asynchronously; give it a moment.
 */
async function waitForFile(filePath: string, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (!fs.existsSync(filePath)) {
    if (Date.now() > deadline) {
      throw new Error(`Timed out waiting for file: ${filePath}`);
    }
    await new Promise(resolve => setTimeout(resolve, 200));
  }
}