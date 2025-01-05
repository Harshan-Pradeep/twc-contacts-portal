import { Gender } from "./gender.enum";

export type Contact = {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    gender: Gender;
    userId: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export type ContactFormData = {
    fullName: string;
    email: string;
    phoneNumber: string;
    gender: Gender;
  }