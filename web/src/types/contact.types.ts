export interface Contact {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    gender: 'Male' | 'Female';
    userId: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ContactFormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    gender: 'Male' | 'Female';
  }