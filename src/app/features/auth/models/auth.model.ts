export interface LoginRequest {
  email: string;
  password: string;
  client_type: 'api' | 'web';
}

/** Respuesta del backend; las cookies HTTP-only se setean automáticamente */
export interface AuthResponse {
  user: Usuario;
}

export interface Usuario {
  id: number;
  name: string;
  email: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}
