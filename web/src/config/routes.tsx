import { RouteObject } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ProtectedRoute from '../components/routing/ProtectedRoute';
import AuthLayout from '../components/layout/AuthLayout';
import AddContact from '../pages/AddContact';
import ContactsPage from '../pages/ContactsPage';
import HomePage from '../pages/HomePage';

// Public routes (no auth required)
export const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <AuthLayout><LoginPage /></AuthLayout>
  },
  {
    path: '/register',
    element: <AuthLayout><RegisterPage /></AuthLayout>
  }
];

// Protected routes (auth required)
export const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedRoute><HomePage /></ProtectedRoute>
  },
  {
    path: '/contacts',
    element: <ProtectedRoute><ContactsPage /></ProtectedRoute>
  },
  {
    path: '/contacts/new',
    element: <ProtectedRoute><AddContact /></ProtectedRoute>
  }
];