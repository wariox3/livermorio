import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  Usuario,
} from '../models/auth.model';
import { environment } from '../../../../environments/environment';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints.constants';
import { ROUTE_PATHS } from '../../../core/constants/route-paths.constants';
import { TokenRefreshService } from '../../../core/services/token-refresh.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly tokenRefresh = inject(TokenRefreshService);

  private readonly _currentUser = signal<Usuario | null>(null);
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => !!this._currentUser());

  /**
   * Realiza el login del usuario.
   * El backend devuelve las cookies HTTP-only automáticamente.
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}${API_ENDPOINTS.auth.login}`, credentials)
      .pipe(
        tap((response) => {
          this._currentUser.set(response.user);
        }),
      );
  }

  /**
   * Obtiene el usuario autenticado usando la cookie HTTP-only vigente.
   * Retorna el usuario si la cookie es válida, o `null` si expiró.
   */
  me(): Observable<Usuario | null> {
    return this.http.get<Usuario>(`${environment.apiUrl}${API_ENDPOINTS.auth.me}`).pipe(
      tap((user) => {
        this._currentUser.set(user);
      }),
      catchError(() => {
        this._currentUser.set(null);
        return of(null);
      }),
    );
  }

  /**
   * Renueva las cookies HTTP-only llamando al endpoint de refresh.
   */
  refresh(): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}${API_ENDPOINTS.auth.refresh}`, {});
  }

  /**
   * Cierra la sesión del usuario. Limpia la sesión local primero
   * y notifica al backend como best-effort.
   */
  logout(): void {
    this.clearSession();
    this.http
      .post(`${environment.apiUrl}${API_ENDPOINTS.auth.logout}`, {})
      .pipe(catchError(() => of(null)))
      .subscribe();
  }

  /**
   * Envía un correo de recuperación de contraseña al email indicado.
   */
  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}${API_ENDPOINTS.auth.forgotPassword}`, {
      email,
    });
  }

  /**
   * Establece una nueva contraseña usando el token de recuperación.
   */
  resetPassword(token: string, password: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}${API_ENDPOINTS.auth.resetPassword}`, {
      token,
      password,
    });
  }

  /**
   * Registra un nuevo usuario en el sistema.
   */
  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${environment.apiUrl}${API_ENDPOINTS.auth.register}`,
      data,
    );
  }

  /**
   * Verifica la cuenta del usuario usando el token enviado por correo.
   */
  verifyEmail(token: string): Observable<void> {
    const params = new HttpParams().set('token', token);
    return this.http.get<void>(`${environment.apiUrl}${API_ENDPOINTS.auth.verifyEmail}`, {
      params,
    });
  }

  /**
   * Limpia la sesión local y redirige a login.
   * Expuesto públicamente para uso en el error interceptor.
   */
  clearSession(): void {
    this._currentUser.set(null);
    this.tokenRefresh.reset();
    this.router.navigate([ROUTE_PATHS.auth.login]);
  }
}
