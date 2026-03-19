# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.0.2](https://github.com/tamerlantian/livermorio/compare/v0.0.1...v0.0.2) (2026-03-19)

### Features

- **auth:** add email verification page ([55b298c](https://github.com/tamerlantian/livermorio/commit/55b298c3750877fec0f26e51e4043d0d4b4cc22a))
- **auth:** add forgot-password and reset-password flow ([7818b41](https://github.com/tamerlantian/livermorio/commit/7818b415e5810164350521eb2dd42383f08bd113))
- **auth:** add user registration flow ([8839818](https://github.com/tamerlantian/livermorio/commit/8839818a3563529435ead16cbad4e730bf9ccf05))
- **auth:** update register form to match backend API ([1091b6d](https://github.com/tamerlantian/livermorio/commit/1091b6d1b08c3c54c75c0b3912aca5b1dd8c8074))
- **programacion-table:** merge cliente and puesto into full-width colspan row ([bdd43c5](https://github.com/tamerlantian/livermorio/commit/bdd43c5c5a6da421c8faa01a4aebac06e68f90db))
- **turnos:** expand turno color palette to 18 colors ([204f3b2](https://github.com/tamerlantian/livermorio/commit/204f3b22c7e7e353fcd456331ed19a31b84a2461))

### Bug Fixes

- **auth:** update register success to mention email verification ([b274ff0](https://github.com/tamerlantian/livermorio/commit/b274ff0330fcbcc3ada61862792278e0407b540a))
- **core:** extract backend error detail from API responses ([935f9fa](https://github.com/tamerlantian/livermorio/commit/935f9fa7e81d16a76ee0f79961368308cc94f06d))
- **turnos:** allow detail values to wrap on mobile instead of truncating ([0975013](https://github.com/tamerlantian/livermorio/commit/0975013c206a183819685f3a084b4446bf60999e))

### Refactoring

- **auth:** move auth components into pages/ subdirectory ([09407dd](https://github.com/tamerlantian/livermorio/commit/09407dddc4440ff7869a6928a12b501051c54644))
- **interceptor:** extract token refresh logic into TokenRefreshService ([c978cbf](https://github.com/tamerlantian/livermorio/commit/c978cbfe388537ccf38c3d1cf69221609aaa5403))
- **pagos:** move pagos-list into pages/ subdirectory ([500a5ee](https://github.com/tamerlantian/livermorio/commit/500a5ee06047b03eb56efc70753cf8294307f206))
- **turnos:** extract mock data to separate file and restore HTTP endpoint ([1823102](https://github.com/tamerlantian/livermorio/commit/1823102babb04e6b6336d97eda8b4ab4a524c6cf))
- **turnos:** extract turno-card and programacion-table components ([5c56422](https://github.com/tamerlantian/livermorio/commit/5c56422d29ecbed65d86955abc7599f941cdab0c))
- **turnos:** move shift code to header as hero badge ([d07e9d7](https://github.com/tamerlantian/livermorio/commit/d07e9d7e8b170cf6f7600337f8bb46b599e3f295))
- **turnos:** redesign calendar cells with color by puesto and cell tooltip ([7ad44f5](https://github.com/tamerlantian/livermorio/commit/7ad44f595e8e46c03f5ce9a479da48c3e6f2c599))

## [0.0.1](https://github.com/tamerlantian/livermorio/compare/v0.0.0...v0.0.1) (2026-03-12)

### Bug Fixes

- **interceptor:** add me endpoint to AUTH_SKIP_URLS to prevent redirect loop ([7174c2d](https://github.com/tamerlantian/livermorio/commit/7174c2d70cca6ee36bccd08333059fa7918302ef))

## 0.0.0 (2026-03-12)

### Features

- add architecture patterns skill for backend system design ([d823212](https://github.com/tamerlantian/livermorio/commit/d82321266c31f36a2236d88252e8b863cfda2854))
- add feature modules with placeholder list components and navigation ([a20cd5a](https://github.com/tamerlantian/livermorio/commit/a20cd5aac8808fbf873d935de0b5b1fa9725e569))
- add frontend and interface design skills for UI development ([78cc0a8](https://github.com/tamerlantian/livermorio/commit/78cc0a835d44f866096060da5360fb4d6935f4db))
- add SemanticaPreset with navy/sky brand palette and CSS variables ([813a398](https://github.com/tamerlantian/livermorio/commit/813a398dc1a51d23b690460c4816836126ac160f)), closes [#143049](https://github.com/tamerlantian/livermorio/issues/143049) [#77aad7](https://github.com/tamerlantian/livermorio/issues/77aad7)
- **auth:** add automatic token refresh on 401 responses ([9add517](https://github.com/tamerlantian/livermorio/commit/9add517ffb19f8062b1a6f251f861288a4ac5897))
- **core:** add BaseHttpService for standardized CRUD operations ([ca2f7b6](https://github.com/tamerlantian/livermorio/commit/ca2f7b660268c9dee73377a85fe53e10ef3fb4b8))
- **core:** add global error interceptor and toast service ([73a40ae](https://github.com/tamerlantian/livermorio/commit/73a40aeaf887fe6fa4e4f6be1894f673fb84ec42))
- **env:** add staging environment and API proxy for development ([8695ca7](https://github.com/tamerlantian/livermorio/commit/8695ca77c771d46057fb247c85ea7d7128ccccc1))
- implement dashboard shell with navigation and inicio page ([121955c](https://github.com/tamerlantian/livermorio/commit/121955c67c303c01808dee26eeb5239db598fe5f))
- **shared:** add reusable UI components ([0d7edb9](https://github.com/tamerlantian/livermorio/commit/0d7edb9a5c059d97397ad087373003cc146cc1b5))
- **shell:** replace text brand mark with Semantica Digital logo image ([3575398](https://github.com/tamerlantian/livermorio/commit/35753982a481d283bcbaa34bc85d33c6c5ef19f6))

### Bug Fixes

- **auth:** add name field to Usuario model ([1bb8dfc](https://github.com/tamerlantian/livermorio/commit/1bb8dfcd41d7dedc11c270339d2dd06dc5824d21))
- **auth:** validate returnUrl to prevent open redirect ([e77ed94](https://github.com/tamerlantian/livermorio/commit/e77ed94be406a5c6467edb09b217155eeaa43202))
- regenerate package-lock.json to include missing peer dependencies ([cd5fc4d](https://github.com/tamerlantian/livermorio/commit/cd5fc4d718f149f67709e489a0bb62ebceef7e40))
- update app.spec.ts to match current template ([ca0ca96](https://github.com/tamerlantian/livermorio/commit/ca0ca96da49559e9e7320f87c0f60c1c7d34f890))

### Refactoring

- **core:** extract API endpoints and route paths to constants ([7af753a](https://github.com/tamerlantian/livermorio/commit/7af753a2eab65566a26659b1f45fba167b18e678))
- **core:** move guards and model re-exports to core module ([f9cba5e](https://github.com/tamerlantian/livermorio/commit/f9cba5ec13dbc11359653ad5c6c0820bc0fb94d6))
- migrate auth from JWT localStorage to HTTP-only cookies ([abda54e](https://github.com/tamerlantian/livermorio/commit/abda54e18667e2740493b6d9e518ed5620a6b88d))
- migrate landing page from dark to light theme ([acb784c](https://github.com/tamerlantian/livermorio/commit/acb784cd5549affb101bface5a3f8d855e14cb94)), closes [#060d1](https://github.com/tamerlantian/livermorio/issues/060d1) [#f8](https://github.com/tamerlantian/livermorio/issues/f8) [#00e5a0](https://github.com/tamerlantian/livermorio/issues/00e5a0) [#059669](https://github.com/tamerlantian/livermorio/issues/059669)
- redesign login page with brand theme and improved layout ([20b2220](https://github.com/tamerlantian/livermorio/commit/20b22202b53146424314fc99d3543b2a3ef063d5))
- replace PrimeNG components with custom navbar styling ([9b0dac1](https://github.com/tamerlantian/livermorio/commit/9b0dac1f885ab785d7bcf55ece44d7c48d843f01))
- simplify landing page and add brand image assets ([fcaa43b](https://github.com/tamerlantian/livermorio/commit/fcaa43b8927fd1ff73520fbd46dc21180d27cc64))
- simplify mobile navbar by hiding user name and logout text ([9b4dfa8](https://github.com/tamerlantian/livermorio/commit/9b4dfa851a1f785a228892db50dfb609dda6b4f0))
- standardize page container styling across all feature modules ([fe312fd](https://github.com/tamerlantian/livermorio/commit/fe312fd2224f9fee5b66ad7bf16e5981b677653c))

### Documentation

- update CLAUDE.md and README to reflect HTTP-only cookie auth ([19b0b11](https://github.com/tamerlantian/livermorio/commit/19b0b11d604d431c54a0c343f25367d31026c210))
- update README and add CONTRIBUTING guide ([ab2486b](https://github.com/tamerlantian/livermorio/commit/ab2486b68eef2cdbdb3db83cff1a1ce124c5ae97))
- update README with project overview and architecture documentation ([a6c1c16](https://github.com/tamerlantian/livermorio/commit/a6c1c162394a09981f53f70a430fd76c54bd1a27))
