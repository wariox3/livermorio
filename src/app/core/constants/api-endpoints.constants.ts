const AUTH = '/auth/seguridad';

export const API_ENDPOINTS = {
  auth: {
    login: `${AUTH}/login`,
    logout: `${AUTH}/logout`,
    me: `${AUTH}/me`,
  },
} as const;
