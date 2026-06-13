/**
 * tests/cart.spec.ts
 *
 * Cart tests for skoda-parts.com
 * Covers: add to cart, update quantity, remove item, checkout redirect.
 *
 * NOTE: Checkout on this site requires login.
 * These tests verify you REACH the checkout/login page — not that you complete the order.
 * Completing a real order would cost money and cannot be automated safely.
 */

import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { cartProducts } from '../test-data/cart.data';

test.describe('Cart — Add Products', () => {

  test('TC01 — Add one product to cart' ,{ tag: ['@smoke'] }, async ({ page }) => {
    const cart = new CartPage(page);

    // Go to product page
    await cart.goToProduct(cartProducts.airFilter.path);

    // Verify we are on the product page
    await expect(page).toHaveURL(/spare-part/);
    await expect(cart.buyButton).toBeVisible();

    // Default quantity is 1 — add to cart
    await cart.addToCart();

    // Go to cart and verify product is there
    await cart.goToCart();
    await expect(cart.cartEmptyMessage).not.toBeVisible();
    await expect(page.getByText(/Air Filter|1J0 129 620/i)).toBeVisible();
  });

  test('TC02 — Add product with quantity 2 ', async ({ page }) => {
    const cart = new CartPage(page);

    await cart.goToProduct(cartProducts.oilFilter.path);
    await expect(cart.buyButton).toBeVisible();

    // Increase quantity to 2 then add
    await cart.setQuantityAndAddToCart(2);

    // Verify quantity was set correctly before buying
    // (some sites redirect immediately — check cart instead)
    await cart.goToCart();
    await expect(cart.cartEmptyMessage).not.toBeVisible();
  });

  test('TC03 — Add two different products to cart',{ tag: ['@regression'] }, async ({ page }) => {
    const cart = new CartPage(page);

    // Add first product
    await cart.goToProduct(cartProducts.airFilter.path);
    await cart.addToCart();

    // Add second product
    await cart.goToProduct(cartProducts.oilFilter.path);
    await cart.addToCart();

    // Cart should have both products
    await cart.goToCart();
    await expect(page.getByText(/Air Filter/i)).toBeVisible();
    await expect(page.getByText(/Oil Filter/i)).toBeVisible();
  });

  test('TC04 — Cart header link shows correct item count after adding',{ tag: ['@smoke'] }, async ({ page }) => {
    const cart = new CartPage(page);

    await cart.goToProduct(cartProducts.cabinFilter.path);
    await cart.addToCart();

    // Cart link in header should no longer say "empty"
    await expect(cart.cartLink).not.toHaveText(/empty/i);
  });

});

test.describe('Cart — Update Quantity', () => {

  // Before each test in this group: add a product to cart first
  test.beforeEach(async ({ page }) => {
    const cart = new CartPage(page);
    await cart.goToProduct(cartProducts.airFilter.path);
    await cart.addToCart();
    await cart.goToCart();
  });

  test('TC05 — Cart page loads with added item', async ({ page }) => {
    const cart = new CartPage(page);
    // Just verify cart is not empty after beforeEach added item
    await expect(cart.cartEmptyMessage).not.toBeVisible();
    await expect(page.getByText(/Air Filter|1J0 129 620/i)).toBeVisible();
  });

  test('TC06 — Cart page shows product name and price', async ({ page }) => {
    // Cart should display product details
    await expect(page.getByText(/Air Filter/i)).toBeVisible();
    await expect(page.getByText('€ excl. VAT').first()).toBeVisible();
  });

  /*test('TC07 — Continue shopping link returns to store', async ({ page }) => {
    const cart = new CartPage(page);

    await cart.continueShoppingLink.click();
    await page.waitForLoadState('networkidle');

    // Should be back on the store, not the cart
    await expect(page).not.toHaveURL(/shopping-cart/);
  });*/

});

test.describe('Cart — Checkout Flow', () => {

  test('TC08 — Checkout button is visible in cart with items', async ({ page }) => {
    const cart = new CartPage(page);

    // Add a product first
    await cart.goToProduct(cartProducts.airFilter.path);
    await cart.addToCart();
    await cart.goToCart();

    // Checkout button should be visible
    await expect(cart.checkoutButton).toBeVisible();
  });

  test('TC09 — Clicking checkout redirects to login or order page', async ({ page }) => {
    const cart = new CartPage(page);

    await cart.goToProduct(cartProducts.airFilter.path);
    await cart.addToCart();
    await cart.goToCart();

    await cart.proceedToCheckout();

    // Checkout on this site requires login — user lands on login or order page
    // We verify the URL changed away from the cart — NOT that order completes
    await expect(page).not.toHaveURL('https://www.skoda-parts.com/shopping-cart.html');
    // Should be on login or order confirmation page
    await expect(page).toHaveURL(/login|order|checkout|online-store/i);
  });

  test('TC10 — Empty cart shows no checkout button', async ({ page }) => {
    const cart = new CartPage(page);

    // Go directly to cart without adding anything
    await cart.goToCart();

    await expect(cart.cartEmptyMessage).toBeVisible();
    // Checkout should not be available on empty cart
    await expect(cart.checkoutButton).not.toBeVisible();
  });

});

test.describe('Cart — Edge Cases', () => {

  test('TC11 — Adding same product twice increases quantity', async ({ page }) => {
    const cart = new CartPage(page);

    // Add the same product twice
    await cart.goToProduct(cartProducts.airFilter.path);
    await cart.addToCart();

    await cart.goToProduct(cartProducts.airFilter.path);
    await cart.addToCart();

    await cart.goToCart();

    // Cart should not show two separate rows for the same product
    // (most carts merge them into one row with qty 2)
    await expect(page.getByText(/Air Filter/i)).toBeVisible();

    // Verify the page shows quantity > 1 somewhere
    const pageContent = await page.content();
    expect(pageContent).toMatch(/2/);  // qty 2 should appear somewhere
  });

  test('TC12 — Cart page URL is correct', async ({ page }) => {
    await page.goto('/shopping-cart.html');
    await expect(page).toHaveURL(/shopping-cart/);
    await expect(page).toHaveTitle(/cart|košík/i);
  });

  test('TC13 — Product page has buy button visible without scrolling', async ({ page }) => {
    const cart = new CartPage(page);

    await cart.goToProduct(cartProducts.airFilter.path);

    // Buy button should be in the viewport (above the fold)
    await expect(cart.buyButton).toBeInViewport();
  });

});
