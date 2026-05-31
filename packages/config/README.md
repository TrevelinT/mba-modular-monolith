# `@repo/config` — shared tooling

Internal workspace for **shared design tokens** and **TypeScript compiler presets**. It is not a runtime feature—no React components or business APIs.

## What it provides

| Export path | Contents |
|-------------|----------|
| `@repo/config/tailwind` | Shared CSS theme ([`tailwind/shared-styles.css`](tailwind/shared-styles.css)) — colors, spacing, typography tokens used across the demo |
| `@repo/config/typescript/base.json` | Base `tsconfig` fragments |
| `@repo/config/typescript/react-library.json` | Preset for feature packages (`product`, `buy-box`, `cart`) |
| `@repo/config/typescript/vite.json` | Preset for the Vite host app |

Feature packages and `apps/web` extend these configs in their local `tsconfig.json` files and import the shared Tailwind entry in their `styles.css`.

## Boundaries

**Owns:**

- Cross-cutting styling variables
- Reusable TypeScript strictness / module settings

**Does not own:**

- Product, offer, or cart behavior
- Application routing or layout

## Usage

In a package `package.json`:

```json
"devDependencies": {
  "@repo/config": "*"
}
```

In Tailwind source (example from a feature package):

```css
@import "@repo/config/tailwind";
```

There is no `build` script in this workspace—it is consumed at compile time by dependents.

## Commands

No package-specific scripts. Dependents pick up config when you build or type-check them from the repo root:

```sh
npm run build
npm run type-check
```

## See also

- [Root README](../../README.md)
- [`apps/web`](../../apps/web/README.md)
- Feature packages: [product](../product/README.md), [buy-box](../buy-box/README.md), [cart](../cart/README.md)
