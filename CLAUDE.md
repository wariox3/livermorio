# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
ng serve          # Dev server at http://localhost:4200
ng build          # Production build → dist/
ng test           # Unit tests (Karma + Jasmine)
ng test --include="**/foo.spec.ts"  # Run a single test file
```

Prettier is configured in `package.json` (printWidth 100, singleQuote, angular HTML parser). There is no lint script configured yet.

## Architecture

**Stack**: Angular 20 (standalone components, signals) + PrimeNG 20.4.0 + Aura theme.

**App bootstrap**: `src/main.ts` → `appConfig` (`src/app/app.config.ts`) → `routes` (`src/app/app.routes.ts`). No NgModules — everything is standalone.

**Global providers** (in `app.config.ts`):
- `provideRouter` with `withComponentInputBinding()`
- `provideHttpClient` with `authInterceptor` (attaches Bearer token from localStorage)
- `providePrimeNG` with Aura theme; dark mode toggled via `.dark-mode` CSS class

**Routing structure**:
```
/                   → redirects to /auth/login
/auth/login         → LoginComponent  (guarded by publicGuard: redirects authenticated users to /dashboard)
/dashboard/**       → ShellComponent  (guarded by authGuard: redirects unauthenticated to /auth/login?returnUrl=...)
  /dashboard/inicio → InicioComponent
```

**Feature layout** (`src/app/features/`):
- `auth/` — login page only
- `dashboard/` — shell layout (navbar + sidebar) with child routes

**Core** (`src/app/core/`):
- `services/auth.service.ts` — signal-based auth state; reads JWT from `localStorage` on init, decodes payload for `{ id, name, email }`; exposes `currentUser` (readonly signal) and `isAuthenticated` (computed)
- `guards/auth.guard.ts` — redirects to `/auth/login?returnUrl=...` if not authenticated
- `guards/public.guard.ts` — redirects to `/dashboard` if already authenticated
- `interceptors/auth.interceptor.ts` — functional interceptor, adds `Authorization: Bearer <token>` header
- `models/auth.model.ts` — `LoginRequest`, `LoginResponse`, `User`

**Dashboard shell** (`features/dashboard/shell/`):
- Signals: `drawerVisible` (mobile sidebar toggle), `currentUser` from `AuthService`
- Desktop: fixed sidebar (`<p-panelmenu>`) hidden below 768 px; hamburger button hidden above 768 px
- Mobile: `<p-drawer>` overlay opened by hamburger

**Environment**: `src/environments/environment.ts` sets `apiUrl: 'http://localhost:3000/api'`. The backend must be running locally for auth to work.

## Conventions

- All components are standalone; import PrimeNG modules directly in the component's `imports` array
- Use Angular signals (`signal`, `computed`) for local state; avoid `BehaviorSubject` for new code
- Use `inject()` inside the class body instead of constructor injection
- New feature routes go in a `<feature>.routes.ts` file and are lazy-loaded via `loadChildren` or `loadComponent` from `app.routes.ts`
- SCSS uses PrimeNG design tokens (`var(--p-surface-0)`, `var(--p-primary-color)`, etc.) for theming — avoid hardcoded colours

## Next Steps

- Siempre usa buenas prácticas de programación
- Escribe código limpio y mantenible
- Documenta el código de forma clara y concisa
- Sigue las convenciones del proyecto para la arquitectura y estructura de archivos
- Usa el mcp de context7 en caso de necesitar información adicional tanto para la version de angular como primeng
