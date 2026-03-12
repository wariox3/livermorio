const AUTH = '/auth/seguridad';

export const API_ENDPOINTS = {
  auth: {
    login: `${AUTH}/login`,
    logout: `${AUTH}/logout`,
    refresh: `${AUTH}/refresh`,
    me: `${AUTH}/me`,
    forgotPassword: `${AUTH}/forgot-password`,
    resetPassword: `${AUTH}/reset-password`,
    register: '/auth/user/registrar',
  },
} as const;
