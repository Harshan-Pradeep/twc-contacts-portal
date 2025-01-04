import api from './api';
import { LoginCredentials, RegisterCredentials, User } from '../types/auth.types';

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
    window.location.href = `http://localhost:3003/auth/google`;
  }
};