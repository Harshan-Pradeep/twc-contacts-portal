import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactService } from '../services/contactService';
import { Contact, ContactFormData } from '../types/contact.types';
import { ApiResponse } from '../services/contactService';

export const useContacts = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedContact, setEditedContact] = useState<Contact | null>(null);

  const { data, isLoading, error } = useQuery<ApiResponse<Contact[]>>({
    queryKey: ['contacts'],
    queryFn: contactService.getContacts
  });

  const createContact = useMutation({
    mutationFn: (data: ContactFormData) => contactService.createContact(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  const updateContact = useMutation({
    mutationFn: (data: Partial<Contact>) => {
      const { id, ...updateData } = data;
      return contactService.updateContact(id!, updateData as ContactFormData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      setEditingId(null);
      setEditedContact(null);
    },
  });

  const deleteContact = useMutation({
    mutationFn: contactService.deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  const handleEdit = (contact: Contact) => {
    setEditingId(contact.id);
    setEditedContact(contact);
  };

  const handleSave = async () => {
    if (editedContact) {
      try {
        await updateContact.mutateAsync(editedContact);
        return true;
      } catch (error) {
        console.error('Error updating contact:', error);
        return false;
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedContact(null);
  };

  const handleDelete = async (id: number) => {
      try {
        await deleteContact.mutateAsync(id);
        return true; 
      } catch (error) {
        console.error('Error deleting contact:', error);
        return false;
      }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof Contact
  ) => {
    if (editedContact) {
      setEditedContact({
        ...editedContact,
        [field]: e.target.value,
      });
    }
  };

  return {
    contacts: data?.data ?? [],
    isLoading,
    error,
    editingId,
    editedContact,
    createContact,
    updateContact,
    deleteContact,
    handleEdit,
    handleSave,
    handleCancel,
    handleDelete,
    handleInputChange,
  };
};