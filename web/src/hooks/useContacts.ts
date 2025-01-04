import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactService } from '../services/contactService';
import { ContactFormData } from '../types/contact.types';

export const useContacts = () => {
  const queryClient = useQueryClient();

  const contacts = useQuery({
    queryKey: ['contacts'],
    queryFn: () => contactService.getContacts()
  });

  const createContact = useMutation({
    mutationFn: (data: ContactFormData) => contactService.createContact(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  const updateContact = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ContactFormData }) => 
      contactService.updateContact(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  const deleteContact = useMutation({
    mutationFn: contactService.deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  return {
    contacts,
    createContact,
    updateContact,
    deleteContact,
  };
};