# Playwright Automation Framework (TypeScript)

A scalable, platform-agnostic (Web & Mobile) test automation framework built on **Playwright** and **TypeScript**. Designed around **SOLID principles**, clean **Dependency Injection (DI)**, and a modular **Manager/Factory architecture** to support enterprise-scale test suites.

---

## 🏗️ Core Architecture & Design Patterns

* **Factory Pattern (`PageFactory`):** Centralizes cross-platform page instantiation, dynamically handling Web and Mobile implementations.
* **Manager Pattern (`PageManager`):** Acts as a lazy-loading application container, preventing fixture bloat by initializing page objects on demand through a unified custom fixture container.
* **Multi-Reporting Strategy:** Dynamically switches visual reporting dashboards (`monocart`, `saucelabs`, or `builtin`) via environment variables while maintaining a custom thread-safe text logger (`CustomReporter.ts`) for file-based execution logging.

---

## 📁 Project Structure

```text
Playwright.Automation.Framework/
├── .github/
│   └── workflows/
│       └── playwright.yml         # GitHub Actions CI/CD pipeline
├── base/
│   └── BasePage.ts                # Abstract base class providing wrapper methods for browser actions
├── config/
│   ├── env.dev.json               # Development environment configuration
│   └── env.prod.json              # Production environment configuration
├── fixtures/
│   └── custom-fixtures.ts         # Custom Playwright DI extensions and page fixture setup
├── framework/
│   ├── core/
│   │   ├── ConfigManager.ts       # Environment configuration and orchestration
│   │   ├── DataRepository.ts      # Test data management and fixture loading
│   │   ├── PageFactory.ts         # Cross-platform page selector
│   │   └── PageManager.ts         # Lazy-loaded page container
│   └── logging/
│       └── Logger.ts              # Framework console and file logging utility
├── pages/
│   └── web/
│       └── LoginPage.ts           # Web Page Object Model implementations
├── reporting/
│   ├── CustomReporter.ts          # Thread-safe text log file generator
│   └── IReporterAdapter.ts        # Abstract reporter adapter contract
├── tests/
│   ├── example.spec.ts            # Example template test specification
│   └── login.spec.ts              # Login test specification suite
├── utils/
│   └── Utilities.ts               # Shared helper and utility functions
├── .gitignore
├── framework_readme.md            # Framework documentation reference
├── package.json
├── package-lock.json
├── playwright.config.ts           # Central Playwright runner configuration
└── playwright-report/             # Native HTML report output directory
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18 or higher)
* **npm**

### Installation
Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd Playwright.Automation.Framework
npm install
```

Install Playwright browsers and system dependencies:
```bash
npx playwright install --with-deps
```

---

## ⚙️ Configuration & Execution

The framework utilizes the `REPORT_VENDOR` environment variable to determine which visual reporting dashboard to attach alongside your custom text logs.

### Local Test Execution Commands

* **Run with Monocart Dashboard + Custom Text Logs:**
  ```bash
  REPORT_VENDOR=monocart npx playwright test
  ```

* **Run with Built-in Playwright HTML Report + Custom Text Logs:**
  ```bash
  REPORT_VENDOR=builtin npx playwright test
  ```

* **Run with Sauce Labs Cloud Reporting:**
  ```bash
  REPORT_VENDOR=saucelabs npx playwright test
  ```

* **Run in Headed Mode:**
  ```bash
  npx playwright test --headed
  ```

---

## 💻 Writing Tests

Tests leverage Playwright's native test runner extended with the custom `pages` fixture container, providing type-safe, lazy-loaded access to all page objects.

```typescript
// tests/login.spec.ts
import { test, expect } from '../fixtures/custom-fixtures';

test('User can log in successfully', async ({ pages }) => {
  await pages.loginPage.navigate();
  await pages.loginPage.enterCredentials('admin', 'password');
  await pages.loginPage.clickLogin();

  await pages.homePage.verifyDashboardLoaded();
});
```

---

## 📊 Reporting Architecture

1. **Terminal Output:** Standard list stream tracking real-time test progress.
2. **Text Log Files (`CustomReporter.ts`):** Captures worker console output and stores timestamped logs under `reports/logs/execution-*.log`.
3. **Visual Dashboards:** Renders rich HTML reports via **Monocart**, **Sauce Labs**, or Playwright's native **HTML** reporter.

---

## 🤖 CI/CD Pipeline (GitHub Actions)

The framework includes a pre-configured workflow (`.github/workflows/playwright.yml`) that triggers on push or pull requests, installs dependencies, executes tests with your selected reporting vendor, and saves execution reports and text logs as downloadable build artifacts.