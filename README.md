# Skoda Parts — Playwright E2E Automation Suite
![Staging](https://github.com/hubautomation2026/playwrightprojectglobal/actions/workflows/playwright-staging.yml/badge.svg)
![Production](https://github.com/hubautomation2026/playwrightprojectglobal/actions/workflows/playwright-prod.yml/badge.svg)
![Playwright](https://img.shields.io/badge/Playwright-TypeScript-45ba4b?logo=playwright)
End-to-end test automation suite for [skoda-parts.com](https://www.skoda-parts.com) — an automotive spare parts e-commerce platform. Built with **Playwright + TypeScript**, following the Page Object Model pattern, with full CI/CD via GitHub Actions and multi-format reporting through Allure, HTML, and JSON.

---

## What This Project Tests

| Test Suite | File | Scenarios Covered |
|---|---|---|
| **Login** | `tests/login.spec.ts` | Valid login, invalid credentials, empty fields, boundary values |
| **Register** | `tests/register.spec.ts` | New user registration, duplicate email, field validation, password rules |
| **Search** | `tests/search.spec.ts` | Part number search, keyword search, no-results handling, search filters |

---

## Project Structure

```
playwrightprojectglobal/
├── .github/
│   └── workflows/
│       └── playwright.yml        ← GitHub Actions CI/CD pipeline
├── pages/
│   ├── LoginPage.ts              ← Login page actions and locators
│   ├── RegisterPage.ts           ← Registration page actions and locators
│   └── SearchPage.ts             ← Search page actions and locators
├── tests/
│   ├── login.spec.ts             ← Login test cases
│   ├── register.spec.ts          ← Registration test cases
│   └── search.spec.ts            ← Search test cases
├── test-data/
│   ├── login.data.ts             ← Login test data (valid, invalid, edge cases)
│   └── register.data.ts          ← Registration test data
├── fixtures/
│   └── pages.fixture.ts          ← Custom Playwright fixtures (page object injection)
├── utils/
│   └── helpers.ts                ← Shared utility functions
├── .env                          ← Local credentials — never committed
├── .gitignore
├── package.json
├── playwright.config.ts          ← Full Playwright configuration
└── tconfig.json
```

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Playwright | ^1.43.0 | Browser automation and test runner |
| TypeScript | 5.x | Strongly-typed test code |
| Allure Playwright | ^3.0.0 | Rich test reporting with steps and attachments |
| dotenv | ^16.6.1 | Environment variable management |
| GitHub Actions | — | CI/CD pipeline (automated on every push) |

---

## Key Features

- **Page Object Model** — all locators and actions encapsulated in page classes, tests stay clean and readable
- **Custom fixtures** — `pages.fixture.ts` injects page objects directly into tests, no manual instantiation
- **Separated test data** — test data in `/test-data` files, zero hardcoded values inside test specs
- **dotenv + GitHub Secrets** — credentials stored locally in `.env`, injected as secrets in CI/CD
- **Screenshot on failure** — auto-captured and attached to the Allure report on any test failure
- **Video recording** — full video recorded for every test run, stored in `test-results/`
- **Trace on retry** — Playwright trace captured automatically on the first retry for deep debugging
- **Multi-reporter** — Allure (interactive HTML), built-in HTML report, and JSON output simultaneously
- **CI/CD** — pipeline runs automatically on every push to `main`, generates and uploads the Allure report as a downloadable artifact

---

## Local Setup

### Prerequisites

- Node.js 18 or higher
- npm

### 1. Clone the repository

```bash
git clone https://github.com/hubautomation2026/playwrightprojectglobal.git
cd playwrightprojectglobal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install chromium --with-deps
```

### 4. Set up your `.env` file

Create a `.env` file in the project root:

```dotenv
BASE_URL=https://www.skoda-parts.com
VALID_EMAIL=your_email@example.com
VALID_PASSWORD=your_password
INVALID_EMAIL=wrong@example.com
INVALID_PASSWORD=wrongpassword123
```

> `.env` is listed in `.gitignore` — it is never committed to the repository.

---

## Running Tests

```bash
# Run all tests (headless — fastest)
npm test

# Run with browser visible
npm run test:headed

# Run with Playwright's interactive UI mode
npm run test:ui

# Run a specific suite
npm run test:login

# Debug mode (step through tests)
npm run test:debug

# Run on a specific browser
npm run test:chrome
npm run test:firefox
npm run test:safari
```

---

## Allure Report

```bash
# Run tests and open the Allure report in one command
npm run test:allure

# Or step by step:
npm test                    # run tests (generates allure-results/)
npm run allure:generate     # build the HTML report
npm run allure:open         # open in browser
```

The Allure report includes:
- Pass / fail / skip summary per suite
- Step-by-step breakdown of each test
- Screenshots attached on failure
- Video links for each test run
- Playwright trace viewer links on retried tests

---

## CI/CD — GitHub Actions

Every push to `main` automatically triggers the pipeline:

1. Checks out the code
2. Installs Node.js and project dependencies
3. Installs Playwright + Chromium browser
4. Injects GitHub Secrets as environment variables
5. Runs all Playwright tests
6. Generates the Allure HTML report
7. Uploads the report as a downloadable artifact (kept for 14 days)

### Downloading the report after a pipeline run

1. Go to the repo → **Actions** tab
2. Click the latest workflow run
3. Scroll to **Artifacts** → download `allure-report`
4. Open `index.html` in any browser

### Setting up GitHub Secrets

Go to: `Repository → Settings → Secrets and variables → Actions → New repository secret`

| Secret Name | Value |
|---|---|
| `BASE_URL` | `https://www.skoda-parts.com` |
| `VALID_EMAIL` | your test account email |
| `VALID_PASSWORD` | your test account password |
| `INVALID_EMAIL` | any invalid email |
| `INVALID_PASSWORD` | any wrong password |

---

## Playwright Configuration Highlights

```typescript
// playwright.config.ts
retries: process.env.CI ? 2 : 0,    // retries in CI only — no false local failures
workers: process.env.CI ? 1 : undefined,  // single worker in CI for stability
screenshot: 'only-on-failure',       // screenshots only when needed
video: 'on',                         // full video every run
trace: 'on-first-retry',             // trace only when something fails
```

---

## Author

**Nermeen Omar Eid**
QA Automation Engineer | 15+ years in software testing
[LinkedIn](https://linkedin.com/in/nermeen-omar-eid) · [GitHub](https://github.com/hubautomation2026)
