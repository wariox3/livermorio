export interface LoginRequest {
  email: string;
  password: string;
  client_type: 'api' | 'web';
  captcha_token?: string;
}

/** Respuesta del backend; las cookies HTTP-only se setean automáticamente */
export interface AuthResponse {
  user: Usuario;
}

export interface Usuario {
  id: number;
  name: string;
  email: string;
  role: string;
  empleado_id: number | null;
}

export interface AsociarEmpresaRequest {
  usuario_id: number;
  tenant_id: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nombres: string;
  apellidos: string;
  numero_identificacion: string;
  captcha_token?: string;
}

export interface RegisteredUser {
  id: number;
  email: string;
  role: string;
  tenant_id: number;
  nombres: string;
  apellidos: string;
  numero_identificacion: string;
  is_verified: boolean;
}

export interface RegisterResponse {
  user: RegisteredUser;
  verification_link: string;
}
