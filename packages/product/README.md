# `@repo/product` — product details

Feature package for the **product information** area of the demo page: title, description, photo carousel, and reviews summary.

## What shoppers see

- Product title and optional badge
- Image carousel with multiple photos
- Star rating and review count
- Long-form description

Content is simulated for a **Nintendo Switch 2** listing (`PRODUCT_ID`: `nintendo-switch-2`).

## Boundaries

**Owns:**

- Product page data shape and mock API
- Loading skeleton and presentational view
- Package-scoped styles (`@repo/product/styles.css`)

**Does not own:**

- Price, installments, or add-to-cart (see [`@repo/buy-box`](../buy-box/README.md))
- Cart state (see [`@repo/cart`](../cart/README.md))
- Host layout (breadcrumb, header, footer)

## Public API

Consumers import **only** from `@repo/product` (not deep paths).

| Export | Description |
|--------|-------------|
| `<Product />` | Container: fetches on mount, shows skeleton then view |
| `productAPI` | Namespace for programmatic access |

Key `productAPI` symbols:

- `getProductPage(options?)` — simulated fetch; default `latencyMs: 300`
- `GetProductPageOptions`, `ProductPage`, `ProductPhoto`, `ProductReviews`
- `PRODUCT_ID`

Example:

```ts
import { Product, productAPI } from "@repo/product";

const page = await productAPI.getProductPage({ latencyMs: 0 });
```

## Implementation pattern

```
ProductContainer → useProductPage → ProductViewSkeleton | ProductView
                      ↓
                 getProductPage()
```

| Area | File |
|------|------|
| Mock API | [`src/api/product.ts`](src/api/product.ts) |
| Hook | [`src/components/use-product-page.ts`](src/components/use-product-page.ts) |
| Container / view | [`src/components/product-container.tsx`](src/components/product-container.tsx), [`product-view.tsx`](src/components/product-view.tsx) |
| Public entry | [`src/index.ts`](src/index.ts) |

Views and hooks are **not** exported from the package entry—only `<Product />` and `productAPI`.

## Simulated backend

`getProductPage` delays resolution to mimic network latency (default **300 ms**). Tests pass `{ latencyMs: 0 }` for instant results.

## Commands

From the **repo root** (recommended):

```sh
npm run build --workspace=@repo/product
npm run test --workspace=@repo/product
```

From this directory:

```sh
npm run build
npm run test
npm run dev    # watch tsc + Tailwind (via Turbo in monorepo)
```

## Host usage

[`apps/web`](../../apps/web/README.md) renders `<Product />` in the main content grid next to buy-box.

## See also

- [Root README](../../README.md)
- [`@repo/buy-box`](../buy-box/README.md)
- [`@repo/cart`](../cart/README.md)
- [`apps/web`](../../apps/web/README.md)
