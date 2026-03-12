import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
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
];

function isAuthUrl(url: string): boolean {
  return AUTH_SKIP_URLS.some((endpoint) => url.includes(endpoint));
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const toast = inject(ToastService);
  const tokenRefresh = inject(TokenRefreshService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 0) {
        toast.error('Error de conexión', 'No se pudo conectar con el servidor.');
        return throwError(() => error);
      }

      if (error.status === HttpStatusCode.Unauthorized) {
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

      if (error.status === HttpStatusCode.Forbidden) {
        toast.error('Acceso denegado', 'No tienes permisos para realizar esta acción.');
        return throwError(() => error);
      }

      if (error.status >= 500) {
        toast.error('Error del servidor', 'Ocurrió un error inesperado. Intenta de nuevo.');
      }

      return throwError(() => error);
    }),
  );
};
