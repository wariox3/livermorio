# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
ng serve          # Dev server at http://localhost:4200 (uses proxy.conf.json)
ng build          # Production build → dist/
ng test           # Unit tests (Karma + Jasmine)
ng test --include="**/foo.spec.ts"  # Run a single test file
npm run lint      # ESLint + angular-eslint
npm run lint:fix  # ESLint auto-fix
npm run format    # Prettier format all src files
npm run format:check  # Prettier check (CI)
npm run test:ci   # Tests headless with coverage
npm run release   # Bump version + changelog (commit-and-tag-version)
```

Prettier is configured in `.prettierrc.json` (printWidth 100, singleQuote, angular HTML parser). ESLint is configured in `eslint.config.js` with angular-eslint + prettier. Husky runs lint-staged (eslint + prettier) on pre-commit and commitlint on commit-msg.

## Architecture

**Stack**: Angular 20 (standalone components, signals) + PrimeNG 20.4.0 + SemanticaPreset (extends Aura with navy/sky brand palette).

**App bootstrap**: `src/main.ts` → `appConfig` (`src/app/app.config.ts`) → `routes` (`src/app/app.routes.ts`). No NgModules — everything is standalone.

**Global providers** (in `app.config.ts`):

- `provideRouter` with `withComponentInputBinding()`
- `provideHttpClient` with `authInterceptor` (adds `withCredentials`) + `errorInterceptor` (manejo global de errores HTTP y token refresh)
- `providePrimeNG` with SemanticaPreset (extends Aura with navy/sky brand palette); dark mode toggled via `.dark-mode` CSS class

**Routing structure**:

```
/                   → redirects to /auth/login
/auth/login         → LoginComponent  (guarded by publicGuard: redirects authenticated users to /dashboard)
/dashboard/**       → ShellComponent  (guarded by authGuard: redirects unauthenticated to /auth/login?returnUrl=...)
  /dashboard/inicio → InicioComponent
```

**Feature layout** (`src/app/features/`):

- `auth/` — login, guards, auth service y modelos
- `dashboard/` — shell layout (navbar + sidebar) with child routes

**Core** (`src/app/core/`):

- `constants/api-endpoints.constants.ts` — endpoints de la API (`auth.login`, `auth.logout`, `auth.refresh`, `auth.me`)
- `constants/route-paths.constants.ts` — rutas de la app centralizadas
- `guards/auth.guard.ts` — redirects to `/auth/login?returnUrl=...` if not authenticated
- `guards/public.guard.ts` — redirects to `/dashboard` if already authenticated
- `interceptors/auth.interceptor.ts` — functional interceptor, adds `withCredentials: true` for HTTP-only cookies
- `interceptors/error.interceptor.ts` — manejo global de errores HTTP con toasts automáticos para: status 0 (conexión), 403 (acceso denegado), 429 (rate limit, toast warning), 500+ (error del servidor); ante 401 intenta refresh automático del token antes de cerrar sesión (patrón refresh + retry con cola de concurrencia). **No cubre 400/422** (errores de validación)
- `models/auth.model.ts` — re-exports de `features/auth/models`
- `services/base-http.service.ts` — servicio base genérico para operaciones CRUD estandarizadas
- `services/toast.service.ts` — servicio wrapper para notificaciones PrimeNG Toast
- `index.ts` — barrel exports del core

**Auth** (`src/app/features/auth/`):

- `services/auth.service.ts` — signal-based auth state; `currentUser` (readonly signal), `isAuthenticated` (computed); métodos: `login()`, `me()`, `refresh()`, `logout()`, `clearSession()`
- `models/auth.model.ts` — `LoginRequest`, `AuthResponse`, `Usuario`
- `login/` — componente standalone de login

**Dashboard shell** (`features/dashboard/shell/`):

- Signals: `drawerVisible` (mobile sidebar toggle), `currentUser` from `AuthService`
- Desktop: fixed sidebar (`<p-panelmenu>`) hidden below 768 px; hamburger button hidden above 768 px
- Mobile: `<p-drawer>` overlay opened by hamburger

**Autenticación**: HTTP-only cookies gestionadas por el backend. El `authInterceptor` agrega `withCredentials: true` a cada request. El `errorInterceptor` ante un 401 intenta `POST /auth/seguridad/refresh` para renovar las cookies; si falla, cierra sesión. Las requests a endpoints de auth (login, refresh, logout) no disparan el flujo de refresh para evitar loops. Se usa un patrón de cola con `BehaviorSubject` para que múltiples requests concurrentes con 401 solo disparen un único refresh.

**Environment**: `src/environments/environment.ts` sets `apiUrl: '/api'` (proxied to `https://api.semanticaapi.com.co` via `proxy.conf.json` in dev). Production and staging environments use direct API URL via file replacements in `angular.json`.

## Conventions

- All components are standalone; import PrimeNG modules directly in the component's `imports` array
- Use Angular signals (`signal`, `computed`) for local state; avoid `BehaviorSubject` for new code
- Use `inject()` inside the class body instead of constructor injection
- New feature routes go in a `<feature>.routes.ts` file and are lazy-loaded via `loadChildren` or `loadComponent` from `app.routes.ts`
- SCSS uses PrimeNG design tokens (`var(--p-surface-0)`, `var(--p-primary-color)`, etc.) for theming — avoid hardcoded colours
- **No duplicar toasts de error en componentes** — el `errorInterceptor` ya muestra toasts para errores de conexión (status 0), 403, 429 y 500+. En los callbacks `error` de los subscribe, solo manejar estado local (loading flags, etc.). Solo agregar `toastService.error()` manual para errores 400/422 si se necesita mostrar mensajes de validación específicos del backend
- Los toasts de éxito (`toastService.success()`) sí deben ir en los componentes ya que el interceptor no los maneja

## Next Steps

- Siempre usa buenas prácticas de programación
- Necesito que cuando crees textos no los pongas asi "Prueba para Ejemplo" sino "Prueba para ejemplo", etc.
- Escribe código limpio y mantenible
- Documenta el código de forma clara y concisa
- Sigue las convenciones del proyecto para la arquitectura y estructura de archivos
- Usa el mcp de context7 en caso de necesitar información adicional tanto para la version de angular como primeng
- Siempre piensa en el responsive design ya que es de suma importancia
