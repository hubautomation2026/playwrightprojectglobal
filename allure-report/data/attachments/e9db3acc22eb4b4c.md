# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Login Tests >> TC02 - Successful login with valid credentials
- Location: tests/login.spec.ts:26:6

# Error details

```
Error: expect(locator).not.toBeVisible() failed

Locator:  getByRole('link', { name: 'User login' })
Expected: not visible
Received: visible
Timeout:  10000ms

Call log:
  - Expect "not toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'User login' })
    14 × locator resolved to <a href="#" id="login-link">User login</a>
       - unexpected value "visible"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - paragraph [ref=e3]: "We, online-dily.cz s.r.o., company ID: 29116023, use cookies to analyze website traffic and deliver targeted advertising. Do you agree?"
    - generic [ref=e4]:
      - button "Yes, I agree" [ref=e5] [cursor=pointer]
      - button "I do not" [ref=e6] [cursor=pointer]
  - generic [ref=e7]:
    - generic [ref=e8]:
      - generic [ref=e9]:
        - banner [ref=e11]:
          - list [ref=e12]:
            - listitem [ref=e13]:
              - link "Store" [ref=e14] [cursor=pointer]:
                - /url: /online-store.html
            - listitem [ref=e15]:
              - link "Shipping and Delivery" [ref=e16] [cursor=pointer]:
                - /url: /delivery.html
            - listitem [ref=e17]:
              - link "Contact" [ref=e18] [cursor=pointer]:
                - /url: /contact.html
          - generic [ref=e20]:
            - combobox [ref=e21]:
              - option "all models" [selected]
              - option "105, 120, 130"
              - option "Citigo"
              - option "Elroq"
              - option "Enyaq"
              - option "Fabia"
              - option "Fabia 2"
              - option "Fabia 3"
              - option "Fabia 4"
              - option "Favorit"
              - option "Felicia"
              - option "Kamiq"
              - option "Karoq"
              - option "Kodiaq"
              - option "Kodiaq 2"
              - option "Octavia"
              - option "Octavia 2"
              - option "Octavia 3"
              - option "Octavia 4"
              - option "Rapid"
              - option "Roomster"
              - option "Scala"
              - option "Superb"
              - option "Superb 2"
              - option "Superb 3"
              - option "Superb 4"
              - option "Yeti"
            - textbox "gril" [ref=e22]
            - button "Search" [ref=e23] [cursor=pointer]:
              - strong [ref=e24]: Search
          - generic [ref=e25]:
            - heading "Shopping cart" [level=2] [ref=e26]
            - link "Shopping cart → Your cart is empty" [ref=e27] [cursor=pointer]:
              - /url: /shopping-cart.html
              - strong [ref=e28]: Shopping cart →
              - generic [ref=e29]: Your cart is empty
        - list [ref=e31]:
          - listitem [ref=e32]:
            - link "Skoda-Parts.com" [ref=e33] [cursor=pointer]:
              - /url: /
          - listitem [ref=e34]: User login
        - generic [ref=e35]:
          - heading "User login Skoda-Parts.com" [level=1] [ref=e36]:
            - generic [ref=e37]: User login
            - link "Skoda-Parts.com" [ref=e38] [cursor=pointer]:
              - /url: /
          - group [ref=e41]:
            - generic [ref=e42]:
              - paragraph [ref=e45]: Entered e-mail and password do not match.
              - generic [ref=e47]:
                - generic [ref=e48] [cursor=pointer]: "E-mail:"
                - textbox "E-mail:" [ref=e49]
              - generic [ref=e50]:
                - generic [ref=e51] [cursor=pointer]: "Password:"
                - textbox "Password:" [ref=e52]
              - link "Password forgotten?" [ref=e54] [cursor=pointer]:
                - /url: /forgot-password.html
              - generic [ref=e55]:
                - checkbox "log in automatically" [ref=e57]
                - text: log in automatically
              - button "Login" [ref=e59] [cursor=pointer]
              - link "No account yet? Sign up now!" [ref=e61] [cursor=pointer]:
                - /url: sign-up.html
        - link "Back to contents ⇑" [ref=e62] [cursor=pointer]:
          - /url: "#main-background"
      - navigation:
        - heading "Navigation" [level=2] [ref=e63]
        - list [ref=e64]:
          - listitem [ref=e65]:
            - link "User login" [ref=e66] [cursor=pointer]:
              - /url: "#"
          - listitem [ref=e67]:
            - link "Sign up" [ref=e68] [cursor=pointer]:
              - /url: /sign-up.html
        - generic [ref=e70] [cursor=pointer]: skoda-parts.com
        - generic [ref=e71]:
          - text: "+420 377 477 652 (Mo-Fr: 9AM-5PM CET) –"
          - link "info@skoda-parts.com" [ref=e72] [cursor=pointer]:
            - /url: mailto:info@skoda-parts.com
      - separator [ref=e73]
    - generic [ref=e74]:
      - contentinfo:
        - generic [ref=e76]:
          - heading "Contact" [level=2] [ref=e77]
          - list [ref=e78]:
            - listitem [ref=e79]:
              - generic [ref=e80]: "Phone:"
              - strong [ref=e81]: +420 377 477 652
            - listitem [ref=e82]:
              - generic [ref=e83]: "E-mail:"
              - strong [ref=e84]: info@skoda-parts.com
          - paragraph [ref=e85]:
            - link "More contacts →" [ref=e86] [cursor=pointer]:
              - /url: /contact.html
        - generic [ref=e88]:
          - heading "Helpful links" [level=2] [ref=e89]
          - list [ref=e90]:
            - listitem [ref=e91]:
              - link "Shipping and Delivery" [ref=e92] [cursor=pointer]:
                - /url: /delivery.html
            - listitem:
              - link:
                - /url: /.html
            - listitem [ref=e93]:
              - link "Terms and Conditions" [ref=e94] [cursor=pointer]:
                - /url: /terms-conditions.html
            - listitem [ref=e95]:
              - link "Privacy Policy" [ref=e96] [cursor=pointer]:
                - /url: /privacy-policy.html
        - generic [ref=e98]:
          - heading "Newsletter" [level=2] [ref=e99]
          - generic [ref=e101]:
            - textbox [ref=e102]
            - textbox [ref=e103]
            - button "OK" [ref=e104] [cursor=pointer]:
              - strong [ref=e105]: OK
        - generic [ref=e107]:
          - heading "Other sites" [level=2] [ref=e108]
          - list [ref=e109]:
            - listitem [ref=e110]:
              - link "skoda-dily.cz" [ref=e111] [cursor=pointer]:
                - /url: https://www.skoda-dily.cz
            - listitem [ref=e112]:
              - link "skoda-diely.sk" [ref=e113] [cursor=pointer]:
                - /url: https://www.skoda-diely.sk
          - paragraph [ref=e114]: © Skoda-Parts.com, 2005–2026
  - iframe [ref=e116]:
    - generic [active]:
      - button "Need a hand?" [ref=f4e2] [cursor=pointer]:
        - img [ref=f4e5]
        - generic [ref=f4e8]: Need a hand?
      - alert [ref=f4e9]
```

# Test source

```ts
  1  | /**
  2  |  * tests/login.spec.ts
  3  |  
  4  |  */
  5  | import { test, expect } from '../fixtures/pages.fixture';
  6  | import { LoginPage }  from '../pages/LoginPage';
  7  | import { validUser,invalidUsers } from '../test-data/login.data';
  8  | 
  9  | 
  10 | 
  11 | // ════════════════════════════════════════════════════════════════════
  12 | // 2. POSITIVE TEST — SUCCESSFUL LOGIN
  13 | // ════════════════════════════════════════════════════════════════════
  14 | test.describe("Login Tests", () => {
  15 |   let loginPage: LoginPage;
  16 | 
  17 |   test.beforeEach(async ({ page }) => {
  18 |     loginPage = new LoginPage(page);
  19 |     await loginPage.goto();
  20 |   });
  21 |   test("TC01 - Login fails with invalid password", async ({ page }) => {
  22 |     await loginPage.login(invalidUsers.wrongPassword);
  23 |     // Page should still show the login area or show an error
  24 |     await expect(page.getByRole('link', { name: 'User login' })).toBeVisible();
  25 |   });
  26 |  test("TC02 - Successful login with valid credentials", async ({ page }) => {
  27 |     await loginPage.login(validUser);
  28 | 
  29 |     // After login, "User login" link should disappear or user menu should appear
> 30 |     await expect(page.getByRole('link', { name: 'User login' })).not.toBeVisible();
     |                                                                      ^ Error: expect(locator).not.toBeVisible() failed
  31 |   });
  32 | 
  33 | 
  34 | 
  35 | 
  36 | 
  37 |  /* test("TC04 - Login fails with invalid email", async ({ page }) => {
  38 |     await loginPage.login({
  39 |       email: "invalid@notexist.com",
  40 |       password: process.env.VALID_PASSWORD!,
  41 |     });
  42 | 
  43 |     await expect(page.getByRole('link', { name: 'User login' })).toBeVisible();
  44 |   });
  45 | 
  46 |   test("TC05 - Login fails with empty email", async ({ page }) => {
  47 |     await loginPage.openLoginDropdown();
  48 |     await loginPage.fillPassword(process.env.VALID_PASSWORD!);
  49 |     await loginPage.clickLogin();
  50 | 
  51 |     // Email field should still be visible (form not submitted)
  52 |     await expect(loginPage.emailField).toBeVisible();
  53 |   });
  54 | 
  55 |   test("TC06 - Login fails with empty password", async ({ page }) => {
  56 |     await loginPage.openLoginDropdown();
  57 |     await loginPage.fillEmail(process.env.VALID_EMAIL!);
  58 |     await loginPage.clickLogin();
  59 | 
  60 |     await expect(loginPage.passwordField).toBeVisible();
  61 |   });
  62 | 
  63 |   test("TC07 - Login dropdown opens and closes", async ({ page }) => {
  64 |     // Open
  65 |     await loginPage.openLoginDropdown();
  66 |     await expect(loginPage.emailField).toBeVisible();
  67 | 
  68 |     // Click elsewhere to close
  69 |     await page.locator('body').click({ position: { x: 400, y: 400 } });
  70 |     await expect(loginPage.emailField).not.toBeVisible({ timeout: 5_000 });
  71 |   });*/
  72 | });
```