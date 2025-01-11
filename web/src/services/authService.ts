import api from './api';
import { LoginCredentials, RegisterCredentials, User } from '../types/auth.types';
import { BASE_URL } from '../constants';

export const authService = {
  login: (credentials: LoginCredentials) => 
    api.post<User>('/auth/login', credentials),

  register: (credentials: RegisterCredentials) =>
    api.post('/auth/register', {
      email: credentials.email,
      password: credentials.password
    }),

  logout: () => 
    api.post('/auth/logout'),

  getCurrentUser: () => 
    api.get<User>('/auth/profile'),

  googleLogin: () => {
    window.location.href = `${BASE_URL}/auth/google`;
  }
};