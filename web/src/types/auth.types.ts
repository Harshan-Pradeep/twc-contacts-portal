export type User = {
    email: string;
    isGoogleAccount?: boolean;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials extends LoginCredentials {
    confirmPassword: string;
  }