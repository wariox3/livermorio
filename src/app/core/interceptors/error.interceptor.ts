import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';
import { ToastService } from '../services/toast.service';
import { API_ENDPOINTS } from '../constants/api-endpoints.constants';

let isRefreshing = false;
const refreshSubject$ = new BehaviorSubject<boolean | null>(null);

const AUTH_SKIP_URLS = [
  API_ENDPOINTS.auth.login,
  API_ENDPOINTS.auth.refresh,
  API_ENDPOINTS.auth.logout,
  API_ENDPOINTS.auth.me,
];

function isAuthUrl(url: string): boolean {
  return AUTH_SKIP_URLS.some((endpoint) => url.includes(endpoint));
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const toast = inject(ToastService);

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

        if (!isRefreshing) {
          isRefreshing = true;
          refreshSubject$.next(null);

          return authService.refresh().pipe(
            switchMap(() => {
              isRefreshing = false;
              refreshSubject$.next(true);
              return next(req);
            }),
            catchError((refreshError) => {
              isRefreshing = false;
              refreshSubject$.next(false);
              authService.clearSession();
              return throwError(() => refreshError);
            }),
          );
        }

        return refreshSubject$.pipe(
          filter((result) => result !== null),
          take(1),
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
