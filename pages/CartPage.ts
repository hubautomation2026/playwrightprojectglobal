import { Locator, Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  // ── Product page locators ──────────────────────────────────────────
  readonly quantityDecrease:  Locator;   // [-] button
  readonly quantityIncrease:  Locator;   // [+] button
  readonly quantityInput:     Locator;   // the number input field between [-] and [+]
  readonly buyButton:         Locator;   // "Buy" button on product page

  // ── Cart page locators ────────────────────────────────────────────
  readonly cartLink:          Locator;   // "Shopping cart →" link in header
  readonly cartEmptyMessage:  Locator;   // "Your cart is empty" text
  readonly cartItemRows:      Locator;   // all product rows in the cart table
  readonly cartTotalPrice:    Locator;   // total price at the bottom of cart
  readonly checkoutButton:    Locator;   // "Order" / checkout button in cart
  readonly continueShoppingLink: Locator;

  // ── Cart item-level locators (scoped per row) ─────────────────────
  // Used in methods that target a specific row — see removeItemByIndex()

  constructor(page: Page) {
    this.page = page;

    // Product page
    this.quantityDecrease   = page.locator('a').filter({ hasText: '-' }).first();
    this.quantityIncrease   = page.locator('a').filter({ hasText: '+' }).first();
    this.quantityInput      = page.locator('input[type="text"]').first();
    this.buyButton          = page.getByRole('button', { name: 'Buy' });

    // Cart page
    this.cartLink           = page.getByRole('link', { name: /Shopping cart/i });
    this.cartEmptyMessage   = page.getByRole('heading', { name: 'Your cart is empty' });
    this.cartItemRows       = page.locator('table tr').filter({ has: page.locator('td') });
    this.cartTotalPrice     = page.locator('.cart-total, .total').last();
    this.checkoutButton     = page.getByRole('link', { name: 'Order cart items'});
    this.continueShoppingLink = page.getByRole('link', { name: 'Continue shopping'});
  
  }

  // ── Navigation ─────────────────────────────────────────────────────

  /**
   * Go directly to a product page by its URL path
   * e.g. goToProduct('/spare-part/1j0129620-air-filter-bosch-22154.html')
   */
  async goToProduct(productPath: string) {
    await this.page.goto(productPath);
    await this.page.waitForLoadState('networkidle');
  }

  async goToCart() {
    await this.page.goto('/shopping-cart.html');
    await this.page.waitForLoadState('networkidle');
  }

  // ── Product page actions ───────────────────────────────────────────

  /**
   * Set quantity using the [+] button — clicks it (n-1) times
   * Default quantity is 1, so to get qty 3 we click [+] twice
   */
  async setQuantity(qty: number) {
    if (qty <= 0) return;
    const clickCount = qty - 1;  // default is already 1
    for (let i = 0; i < clickCount; i++) {
      await this.quantityIncrease.click();
      await this.page.waitForTimeout(300);  // small pause — the counter updates via JS
    }
  }

  /** Read the current quantity shown in the input field */
  async getCurrentQuantity(): Promise<number> {
    const value = await this.quantityInput.inputValue();
    return parseInt(value, 10);
  }

  /** Add current product to cart */
  async addToCart() {
    await this.buyButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /** Set quantity then add to cart — convenience wrapper */
  async setQuantityAndAddToCart(qty: number) {
    await this.setQuantity(qty);
    await this.addToCart();
  }

  // ── Cart page actions ─────────────────────────────────────────────

  /** Get number of product rows in the cart */
  async getCartItemCount(): Promise<number> {
    return await this.cartItemRows.count();
  }

  /** Check if cart shows the "empty" message */
  async isCartEmpty(): Promise<boolean> {
    return await this.cartEmptyMessage.isVisible();
  }

  /**
   * Update quantity of an item already in the cart.
   * Finds the quantity input in the nth row (0-indexed) and fills it.
   */
  async updateCartItemQuantity(rowIndex: number, newQty: number) {
    const row = this.cartItemRows.nth(rowIndex);
    const qtyInput = row.locator('input[type="text"], input[type="number"]');
    await qtyInput.clear();
    await qtyInput.fill(String(newQty));
    // Some carts need an Enter or a blur to trigger the update
    await qtyInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Remove an item from the cart by clicking its remove/delete link.
   * Row index is 0-based.
   */
  async removeCartItem(rowIndex: number) {
    const row = this.cartItemRows.nth(rowIndex);
    const removeBtn = row.locator('a').filter({ hasText: /remove|delete|×|✕/i });
    await removeBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  /** Click the checkout / Order button */
  async proceedToCheckout() {
    await this.checkoutButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /** Read the cart total text (e.g. "10,54 €") */
  async getCartTotal(): Promise<string> {
    return (await this.cartTotalPrice.textContent() || '').trim();
  }
}
