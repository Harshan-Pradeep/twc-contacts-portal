import api from './api';
import { Contact, ContactFormData } from '../types/contact.types';

export interface ApiResponse<T> {
  data: T;
  metadata: {
    timestamp: string;
    path: string;
    statusCode: number;
  };
}

export const contactService = {
  getContacts: async () => {
    const response = await api.get<ApiResponse<Contact[]>>('/contacts');
    return response.data;
  },

  createContact: async (contact: ContactFormData) => {
    const response = await api.post<Contact>('/contacts', contact);
    return response.data;
  },

  updateContact: async (id: number, contact: ContactFormData) => {
    const filteredContact: ContactFormData = {
      fullName: contact.fullName,
      email: contact.email,
      phoneNumber: contact.phoneNumber,
      gender: contact.gender,
    };
  
    console.log("Filtered update data", filteredContact);
  
    const response = await api.put<Contact>(`/contacts/${id}`, filteredContact);
    return response.data;
  },

  deleteContact: async (id: number) => {
    await api.delete(`/contacts/${id}`);
  }
};