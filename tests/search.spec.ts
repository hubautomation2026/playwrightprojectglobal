import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";

test.describe("Search Tests - Skoda Parts Store", () => {
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    await searchPage.goto();
  });

  // ─── Search Input Tests ───────────────────────────────────────

  test("TC01 - Search input accepts text", async () => {
    await searchPage.fillSearchInput("brake pad");
    await expect(searchPage.searchInput).toHaveValue("brake pad");
  });


  // ─── Model Dropdown Tests ─────────────────────────────────────


  test("TC02 - Select model Octavia 3 from dropdown", async () => {
    await searchPage.selectModel("Octavia 3");
    await expect(searchPage.modelDropdown).toHaveValue(/octavia/i);
  });

  
  // ─── Combined Search Tests ────────────────────────────────────

  test("TC03 - Search by model and keyword", async ({ page }) => {
    await searchPage.searchByModelAndKeyword("Octavia 3", "brake");
    await expect(page).not.toHaveURL("about:blank");
  });

 

  // ─── Model Links Tests ────────────────────────────────────────


  test("TC04 - Clicking Octavia link navigates to Octavia catalog", async ({ page }) => {
    await page.locator('a[href*="/catalog/octavia.html"]').click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/octavia/i);
  });
  });