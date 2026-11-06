# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this is

`cwf-lite` is a lightweight, modern CSS framework (no JS runtime for consumers).
Source lives entirely under [`style/`](style/) as plain CSS, authored with
[`postcss-each`](https://github.com/outpunk/postcss-each) loops and native CSS
`@layer`s (`cwf-bases`, `cwf-utilities`, `cwf-modules`). Vite bundles
`style/style.css` (entered via [`main.js`](main.js)) into `dist/index.css` /
`dist/index.js`, prepending a banner comment built from `package.json`
metadata (see [`vite.config.js`](vite.config.js)).

- `style/bases/` – element-level resets and defaults (html, body, typography, grid…)
- `style/utilities/` – single-purpose utility classes (margin, padding, display…),
  each generated across the breakpoint scale (`xs`, `sm`, `md`, `rg`, `lg`, `xl`)
  via `@each` loops over `$(count)`-style placeholders
- `style/modules/` – composite UI components (button, card, alert, nav…), using
  BEM-ish `__element` naming (e.g. `card__body`)

There is no runtime JavaScript logic to speak of — `main.js` only imports the
CSS entry point. Treat this as a CSS-output project: correctness means "the
built CSS contains the right selectors and is valid," not "the JS does the
right thing."

## Commands

```bash
npm run dev            # vite dev server at :3006
npm run build          # vite build -> dist/
npm test               # pretest runs `npm run build`, then vitest run
npm run test:watch     # vitest in watch mode (does NOT rebuild automatically)
npm run lint           # eslint .
npm run lint:fix
npm run format         # prettier --write .
npm run format:check
```

`npm test` always rebuilds first (`pretest` script) so the test suite reflects
current source. If you edit CSS and only run `test:watch`, rebuild manually
(`npm run build`) first or the tests will check stale `dist/` output.

## Tests

Tests live in [`test/`](test/) and run against the **built** `dist/index.css`
/ `dist/index.js`, not the raw `style/*.css` source — this is deliberate,
since the thing that matters is what postcss-each and Vite actually emit.

- `test/build.test.js` — build artifacts exist, contain the version/license
  banner matching `package.json`, are valid parseable CSS, and have no
  leftover unprocessed `@each` / `$(...)` template syntax or raw `@import`s
  (a strong signal the postcss-each/Vite pipeline is broken).
- `test/css-contract.test.js` — spot-checks that representative selectors
  from every base/module/utility category survived the build, including
  breakpoint-prefixed variants (`.margin--md-4`) and the full `0–9` spacing
  scale.

When adding a new utility or module, add its signature class(es) to the
relevant contract test rather than creating a new test file per class.

## Conventions

- New utilities should follow the existing `@each` + `$(placeholder)` pattern
  and be wired into the breakpoint `@media` blocks already present in each
  file (see [`style/utilities/margin.css`](style/utilities/margin.css) as the
  canonical example).
- Keep every new top-level stylesheet inside the correct `@layer` and `@import`
  it from the matching `bases.css` / `utilities.css` / `modules.css` index.
- Run `npm run format` and `npm run lint` before committing — CI enforces both.
- Bump `package.json` version and `CHANGELOG.md` for anything intended to be
  published; `release.yml` publishes to npm and cuts a GitHub release on `v*`
  tags.

## CI

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every push/PR
to `master`: install, lint, format check, build, test. Treat a red CI run as
blocking — don't add code that only passes locally without `npm ci` from a
clean checkout.
