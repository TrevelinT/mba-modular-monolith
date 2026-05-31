# `web` — host application

Thin **host** for the modular monolith demo. It composes feature packages into one Vite app and owns only layout chrome—not product, offer, or cart business logic.

## What this app does

- Mounts **`<Product />`** and **`<BuyBox />`** in the main grid ([`src/components/App.tsx`](src/components/App.tsx))
- Mounts **`<Cart />`** in the header ([`src/components/Header.tsx`](src/components/Header.tsx))
- Renders host-owned UI: breadcrumb, logo, footer, global styles ([`src/styles.css`](src/styles.css))

## What this app deliberately does not do

- Wire cart state or callbacks between packages
- Fetch product or offer data (feature packages simulate that on mount)
- Import feature internals—only the public entry points below

Add-to-cart crosses package boundaries via **document pub/sub** (buy-box publishes, cart subscribes). See [packages/buy-box/README.md](../../packages/buy-box/README.md) and [packages/cart/README.md](../../packages/cart/README.md).

## Dependencies

| Package | Role in `web` |
|---------|----------------|
| [`@repo/product`](../../packages/product) | Product gallery and details |
| [`@repo/buy-box`](../../packages/buy-box) | Offer, quantity, add to cart |
| [`@repo/cart`](../../packages/cart) | Header cart |
| [`@repo/config`](../../packages/config) | Tailwind theme + TypeScript presets |

Import feature code only from package roots, for example:

```ts
import { Product } from "@repo/product";
import { BuyBox } from "@repo/buy-box";
import { Cart } from "@repo/cart";
```

## Scripts

| Script | Purpose |
|--------|---------|
| `dev` | Vite dev server |
| `build` | `tsc` + production bundle to `dist/` |
| `preview` | Serve `dist/` on port 5173 (used by CI E2E) |
| `test` | Vitest unit tests |
| `test:e2e` | Playwright (see below) |
| `test:e2e:ui` | Playwright UI mode (local only) |
| `test:e2e:update-snapshots` | Regenerate `@visual` baselines |

From the **repo root**, prefer `npm run dev` / `npm run build` / `npm run test:e2e` so Turbo builds workspace packages first.

Unit tests use Vitest. End-to-end tests use [Playwright](https://playwright.dev/) in a separate suite.

## E2E testing

Playwright drives the full app in a real browser against `http://localhost:5173`. Tests cover product page flows, cart pub/sub integration, and visual regression snapshots.

### Prerequisites

From the repo root, use the pinned Node version (see [`.nvmrc`](../../.nvmrc)) and install browser binaries once:

```sh
source ~/.nvm/nvm.sh && nvm use
cd apps/web
npx playwright install --with-deps
```

### Running

From the **repo root** (recommended — Turbo runs `build` first):

```sh
npm run test:e2e
npm run test:e2e:ui          # Playwright UI mode (interactive debug)
```

From **`apps/web`**:

```sh
npm run test:e2e
npm run test:e2e:ui
```

| Script | Where | Purpose |
|--------|-------|---------|
| `test:e2e` | root or `apps/web` | Headless run — same as CI (minus `CI=true` preview path locally) |
| `test:e2e:ui` | root or `apps/web` | Opens [Playwright UI mode](https://playwright.dev/docs/test-ui-mode): pick tests, watch, time-travel debug |
| `test:e2e:update-snapshots` | `apps/web` only | Regenerate `@visual` baselines (run after `npm run build` with `CI=true`) |

`test:e2e:ui` is for local development only — not used in CI. Root scripts delegate to Turbo, which builds workspace packages before starting Playwright in `web`.

### How the app is served

[`playwright.config.ts`](playwright.config.ts) starts a `webServer` automatically — no manual `npm run dev` required.

| Environment | Command | Bundle |
|-------------|---------|--------|
| Local | `npm run dev` | Vite dev server |
| CI (`CI=true`) | `npm run preview` | Production `dist/` via `vite preview --port 5173` |

Locally, an already-running dev server on port 5173 is reused (`reuseExistingServer: true`). On CI, preview always starts fresh against the built output.

To mimic CI locally:

```sh
npm run build
CI=true PLAYWRIGHT_HTML_OPEN=never npm run test:e2e
```

### Test layout

```
tests/
├── fixtures.ts              # Shared page fixture (navigates + waits for product heading)
├── seed.spec.ts               # Minimal entry point for agent/debug sessions
└── e2e/
    ├── product-page.spec.ts   # Product, cart, carousel flows
    └── failure-scenarios.spec.ts
```

Specs import `test` and `expect` from [`tests/fixtures.ts`](tests/fixtures.ts), which extends Playwright's base test with a pre-loaded product page.

### Functional vs visual tests

**Functional** tests use role-based locators (Portuguese a11y labels) and run on **Chromium, Firefox, and WebKit**.

**Visual** tests live in `@visual`-tagged `describe` blocks and use `expect(page).toHaveScreenshot(...)`. They run on **Chromium only** — Firefox and WebKit projects use `grepInvert: /@visual/`.

Before each snapshot, tests await `document.fonts.ready` to avoid flake from async Google Fonts.

### Visual regression baselines

Baselines are committed PNGs next to their spec file:

```
tests/e2e/product-page.spec.ts-snapshots/
  e2e-01-product-and-empty-cart-chromium-linux.png
  ...
tests/e2e/failure-scenarios.spec.ts-snapshots/
  e2e-fail-01-quantity-stays-at-minimum-chromium-linux.png
```

Playwright appends `{project}-{platform}` to snapshot names. CI runs on `ubuntu-latest`, so baselines must be generated on **Linux** (WSL counts).

**Update baselines** after an intentional UI change (never on CI):

```sh
npm run build
CI=true PLAYWRIGHT_HTML_OPEN=never npm run test:e2e:update-snapshots
git add tests/e2e/**/*-snapshots/
```

`test:e2e:update-snapshots` runs `playwright test --update-snapshots --grep @visual`. Always regenerate with `CI=true` so baselines match the production bundle CI serves via preview.

Snapshot settings in config: `animations: "disabled"`, `maxDiffPixelRatio: 0.01`, viewport `1280×720`.

### CI

CI uses two jobs — see the root [`README.md`](../../README.md#ci) for the full workflow. The **E2E Tests** job:

1. Waits on the **Build and Quality** job (`needs: build`)
2. Downloads the `web-dist` artifact into `apps/web/dist/`
3. Installs browsers from `apps/web`
4. Runs `npm run test:e2e --workspace=web` (not root `npm run test:e2e`) so Turbo does not rebuild
5. Sets `CI=true` and `PLAYWRIGHT_HTML_OPEN=never`; preview serves the downloaded production bundle

The Playwright HTML report is uploaded as an artifact on failure.

### Troubleshooting

**Port 5173 already in use (CI path):** Stop the existing dev/preview server, or kill the process on that port, then re-run. CI does not reuse an existing server.

**Snapshot mismatch locally but passes in CI (or vice versa):** Baselines were likely generated against the wrong server mode. Regenerate with `CI=true` after `npm run build`.

**Missing browsers:** Run `npx playwright install --with-deps` from `apps/web`.

## See also

- [Root README](../../README.md)
- [`@repo/product`](../../packages/product/README.md)
- [`@repo/buy-box`](../../packages/buy-box/README.md)
- [`@repo/cart`](../../packages/cart/README.md)
- [`@repo/config`](../../packages/config/README.md)
