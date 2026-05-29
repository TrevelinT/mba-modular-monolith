# `Turborepo` Vite starter

This is a community-maintained example. If you experience a problem, please submit a pull request with a fix. GitHub Issues will be closed.

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e with-vite-react
```

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `web`: react [vite](https://vitejs.dev) ts app
- `@repo/cart`: a feature package used by `web` application
- `@repo/buy-box`: a feature package used by `web` application
- `@repo/product`: a feature package used by `web` application
- `@repo/config`: shared TypeScript presets and Tailwind theme tokens

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Biome](https://biomejs.dev/) for code linting and formatting

#### Type-check

```sh
npm run type-check
```

Runs `tsc --noEmit` across the monorepo via Turbo.

Note: `web` resolves workspace package types from `dist/*.d.ts`, so on a clean checkout you may need to run `npm run build` first.

## Troubleshooting

### `Cannot find native binding` / `@rolldown/binding-…` during build

**Symptom:** `npm run build` or `vite build` fails in `web` with `Cannot find native binding` or `Cannot find module '@rolldown/binding-…'`.

**Cause:** Vite 8 uses Rolldown, which needs a platform-specific native binding (e.g. `@rolldown/binding-linux-x64-gnu` on Linux/WSL). npm sometimes skips these optional dependencies in workspaces ([npm/cli#4828](https://github.com/npm/cli/issues/4828)).

**Fix:** From the repo root, with Node **24.15.0** (`nvm use` — see [`.nvmrc`](.nvmrc); Rolldown requires `^20.19.0 || >=22.12.0`):

```sh
rm -rf node_modules
npm ci
```

**Verify:** `node_modules/@rolldown/binding-<platform>` exists (e.g. `binding-linux-x64-gnu` on Linux x64).

**If it recurs:** Delete `package-lock.json` as well and run `npm install`. As a durable workaround, add the matching `@rolldown/binding-*` package to root `optionalDependencies` (version synced to Vite's pinned Rolldown).
