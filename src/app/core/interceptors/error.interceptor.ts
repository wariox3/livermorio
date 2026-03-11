import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';
import { ToastService } from '../services/toast.service';

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
        authService.clearSession();
        return throwError(() => error);
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
