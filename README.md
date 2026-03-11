# Semantica Portal

Portal de autogestión para empleados. Permite consultar y gestionar información laboral: comprobantes de pago, certificaciones, turnos, seguridad social, reclamos y más, desde un único lugar.

## Stack

| Tecnología | Versión                             |
| ---------- | ----------------------------------- |
| Angular    | 20 (standalone components, signals) |
| PrimeNG    | 20.4.0 (tema Aura)                  |
| Fuente     | Geist                               |

## Requisitos

- Node.js 22+
- Angular CLI 20
- Backend en `https://api.semanticaapi.com.co` (proxied en dev como `/api`)

## Comandos

```bash
npm start                              # Dev server → http://localhost:4200
npm run build                          # Build de producción → dist/
npm test                               # Tests unitarios (Karma + Jasmine)
npm run test:ci                        # Tests headless con coverage (CI)
npm run lint                           # Verificar linting
npm run lint:fix                       # Corregir linting automáticamente
npm run format                         # Formatear código
npm run format:check                   # Verificar formato sin modificar
npm run release                        # Bump de versión + changelog
```

## Estructura del proyecto

```
src/app/
├── app.config.ts            # Providers globales (router, HTTP, PrimeNG)
├── app.routes.ts            # Rutas raíz con lazy loading
├── core/
│   ├── guards/
│   │   ├── auth.guard.ts        # Redirige a /auth/login si no autenticado
│   │   └── public.guard.ts      # Redirige a /dashboard si ya autenticado
│   └── interceptors/
│       └── auth.interceptor.ts  # Agrega Bearer token a todas las peticiones
└── features/
    ├── landing/             # Página de inicio pública
    ├── auth/
    │   ├── login/           # Formulario de inicio de sesión
    │   ├── guards/          # Guards de autenticación
    │   ├── services/        # AuthService (signals, JWT en localStorage)
    │   └── models/          # LoginRequest, LoginResponse, User
    └── dashboard/
        ├── shell/           # Layout: navbar + sidebar + router-outlet
        ├── inicio/          # Página de bienvenida
        ├── pagos/
        ├── reclamos/
        ├── solicitudes/
        ├── capacitaciones/
        ├── certificado-laboral/
        ├── certificado-laboral-historico/
        ├── autorizacion-arma/
        ├── seguridad-social/
        └── turnos/
```

## Rutas

```
/                             → Landing (redirige a /auth/login si no autenticado)
/auth/login                   → Login
/dashboard/inicio             → Inicio  (requiere autenticación)
/dashboard/pagos              → Pagos
/dashboard/reclamos           → Reclamos
/dashboard/solicitudes        → Solicitudes
/dashboard/capacitaciones     → Capacitaciones
/dashboard/certificado-laboral           → Certificado Laboral
/dashboard/certificado-laboral-historico → Cert. Laboral Histórico
/dashboard/autorizacion-arma  → Autorización de Arma
/dashboard/seguridad-social   → Seguridad Social
/dashboard/turnos             → Turnos
```

Todas las rutas bajo `/dashboard` están protegidas por `authGuard`. Las rutas de `/auth` usan `publicGuard`.

## Autenticación

La autenticación se maneja mediante **JWT almacenado en localStorage**. El `AuthService` mantiene el estado del usuario en un signal (`currentUser`) y expone `isAuthenticated` como computed signal. El interceptor agrega el header `Authorization: Bearer <token>` a todas las peticiones.

## Environments

| Configuración | Archivo                  | API URL                           |
| ------------- | ------------------------ | --------------------------------- |
| Development   | `environment.ts`         | `/api` (proxy a la API real)      |
| Staging       | `environment.staging.ts` | `https://api.semanticaapi.com.co` |
| Production    | `environment.prod.ts`    | `https://api.semanticaapi.com.co` |

El proxy de desarrollo está configurado en `proxy.conf.json` y se activa automáticamente con `ng serve`.

## Convenciones

- Todos los componentes son **standalone** — no hay NgModules
- Estado local con **signals** (`signal`, `computed`) — no usar `BehaviorSubject` para código nuevo
- Inyección de dependencias con `inject()` en el cuerpo de la clase
- Nuevas rutas van en un archivo `<feature>.routes.ts` y se cargan lazy desde `app.routes.ts`
- SCSS usa design tokens de PrimeNG (`var(--p-surface-0)`, `var(--p-primary-color)`, etc.) — evitar colores hardcodeados
- Commits convencionales obligatorios (validados por Husky + commitlint)

## Documentación

| Documento                            | Contenido                                    |
| ------------------------------------ | -------------------------------------------- |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Flujo de trabajo, ramas, commits, PRs, hooks |
| [CLAUDE.md](./CLAUDE.md)             | Instrucciones para Claude Code               |
