import { Locator, Page } from "@playwright/test";

export class SearchPage {
  readonly page: Page;

  // Search bar elements
  readonly modelDropdown: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  // Results
  readonly searchResults: Locator;
  readonly resultLinks: Locator;
  readonly noResultsMessage: Locator;

  // Model category links
  readonly modelLinks: Locator;

  constructor(page: Page) {
    this.page = page;

    // ✅ Model dropdown — select element in the search bar
    this.modelDropdown  = page.locator('select').first();

    // ✅ Search text input — text input next to the dropdown
    this.searchInput    = page.locator('input[type="text"]').first();

    // ✅ Search button
    this.searchButton   = page.getByRole('button', { name: 'Search' });

    // ✅ Results — links that appear after search
    this.searchResults     = page.locator('.search-results, .product-list, [class*="result"]');
    this.resultLinks       = page.locator('a[href*="/catalog/"]');
    this.noResultsMessage  = page.locator('text=No results');

    // ✅ Model links on homepage
    this.modelLinks = page.locator('a[href*="/catalog/"]');
  }

  // ─── Navigation ───────────────────────────────────────────────
  async goto() {
    await this.page.goto('/online-store.html');
    await this.page.waitForLoadState('networkidle');
  }

  // ─── Model Dropdown ───────────────────────────────────────────
  async selectModel(model: string) {
    await this.modelDropdown.waitFor({ state: 'visible', timeout: 10_000 });
    await this.modelDropdown.selectOption({ label: model });
  }

  async getSelectedModel(): Promise<string> {
    return await this.modelDropdown.inputValue();
  }

  // ─── Search ───────────────────────────────────────────────────
  async fillSearchInput(keyword: string) {
    await this.searchInput.waitFor({ state: 'visible', timeout: 10_000 });
    await this.searchInput.clear();
    await this.searchInput.fill(keyword);
  }

  async clickSearch() {
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchByKeyword(keyword: string) {
    await this.fillSearchInput(keyword);
    await this.clickSearch();
  }

  async searchByModelAndKeyword(model: string, keyword: string) {
    await this.selectModel(model);
    await this.fillSearchInput(keyword);
    await this.clickSearch();
  }

  async searchByModelOnly(model: string) {
    await this.selectModel(model);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // ─── Results ──────────────────────────────────────────────────
  async getResultCount(): Promise<number> {
    return await this.resultLinks.count();
  }

  async clickFirstResult() {
    await this.resultLinks.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickModelLink(model: string) {
    await this.page.locator(`a[href*="/catalog/${model.toLowerCase().replace(' ', '-')}"]`).first().click();
    await this.page.waitForLoadState('networkidle');
  }
}