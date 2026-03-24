import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';
import { ToastService } from '../services/toast.service';
import { TokenRefreshService } from '../services/token-refresh.service';
import { API_ENDPOINTS } from '../constants/api-endpoints.constants';

const AUTH_SKIP_URLS = [
  API_ENDPOINTS.auth.login,
  API_ENDPOINTS.auth.refresh,
  API_ENDPOINTS.auth.logout,
  API_ENDPOINTS.auth.me,
  API_ENDPOINTS.auth.forgotPassword,
  API_ENDPOINTS.auth.resetPassword,
  API_ENDPOINTS.auth.register,
  API_ENDPOINTS.auth.asociarEmpresa,
];

function isAuthUrl(url: string): boolean {
  return AUTH_SKIP_URLS.some((endpoint) => url.includes(endpoint));
}

export function handleConnectionError(
  toast: ToastService,
  error: HttpErrorResponse,
): Observable<never> {
  toast.error('Error de conexión', 'No se pudo conectar con el servidor.');
  return throwError(() => error);
}

export function handleUnauthorized(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  tokenRefresh: TokenRefreshService,
  error: HttpErrorResponse,
): Observable<HttpEvent<unknown>> {
  if (isAuthUrl(req.url)) {
    return throwError(() => error);
  }

  if (!tokenRefresh.refreshing) {
    tokenRefresh.startRefresh();

    return authService.refresh().pipe(
      switchMap(() => {
        tokenRefresh.completeRefresh();
        return next(req);
      }),
      catchError((refreshError) => {
        tokenRefresh.failRefresh();
        authService.clearSession();
        return throwError(() => refreshError);
      }),
    );
  }

  return tokenRefresh.waitForRefresh().pipe(
    switchMap((success) => {
      if (success) {
        return next(req);
      }
      return throwError(() => error);
    }),
  );
}

export function handleForbidden(toast: ToastService, error: HttpErrorResponse): Observable<never> {
  toast.error('Acceso denegado', 'No tienes permisos para realizar esta acción.');
  return throwError(() => error);
}

export function handleTooManyRequests(
  toast: ToastService,
  error: HttpErrorResponse,
): Observable<never> {
  const message =
    error.error?.error ?? 'Has excedido el límite de solicitudes. Intenta de nuevo más tarde.';
  toast.warn('Demasiadas solicitudes', message);
  return throwError(() => error);
}

export function handleServerError(
  toast: ToastService,
  error: HttpErrorResponse,
): Observable<never> {
  toast.error('Error del servidor', 'Ocurrió un error inesperado. Intenta de nuevo.');
  return throwError(() => error);
}
