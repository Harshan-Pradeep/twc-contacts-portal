// src/pages/ContactsPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';

interface Contact {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface ContactsResponse {
  data: Contact[];
  metadata: {
    timestamp: string;
    path: string;
    statusCode: number;
  };
}

const ContactsPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedContact, setEditedContact] = useState<Contact | null>(null);

  // Fetch contacts
  const { data: response, isLoading, error } = useQuery<ContactsResponse>({
    queryKey: ['contacts'],
    queryFn: () => api.get('/contacts').then((res) => res.data),
  });

  // Update contact mutation
  const updateContact = useMutation({
    mutationFn: (data: Partial<Contact>) => {
      // Extract only the fields we want to send to backend
      const { fullName, email, phoneNumber, gender } = data;
      return api.put(`/contacts/${data.id}`, {
        fullName,
        email,
        phoneNumber,
        gender
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      setEditingId(null);
      setEditedContact(null);
    },
  });

  // Delete contact mutation
  const deleteContact = useMutation({
    mutationFn: (id: number) => api.delete(`/contacts/${id}`),
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
      } catch (error) {
        console.error('Error updating contact:', error);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedContact(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContact.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof Contact) => {
    if (editedContact) {
      setEditedContact({
        ...editedContact,
        [field]: e.target.value,
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="text-xl">Loading contacts...</div>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="text-xl text-red-600">Error loading contacts</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Contacts</h2>
            <button
              onClick={() => navigate('/contacts/new')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add New Contact
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {response?.data.map((contact: Contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === contact.id ? (
                        <input
                          type="text"
                          value={editedContact?.fullName}
                          onChange={(e) => handleInputChange(e, 'fullName')}
                          className="w-full border rounded px-2 py-1"
                        />
                      ) : (
                        contact.fullName
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === contact.id ? (
                        <input
                          type="email"
                          value={editedContact?.email}
                          onChange={(e) => handleInputChange(e, 'email')}
                          className="w-full border rounded px-2 py-1"
                        />
                      ) : (
                        contact.email
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === contact.id ? (
                        <input
                          type="text"
                          value={editedContact?.phoneNumber}
                          onChange={(e) => handleInputChange(e, 'phoneNumber')}
                          className="w-full border rounded px-2 py-1"
                        />
                      ) : (
                        contact.phoneNumber || '-'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === contact.id ? (
                        <select
                          value={editedContact?.gender}
                          onChange={(e) => handleInputChange(e, 'gender')}
                          className="w-full border rounded px-2 py-1"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      ) : (
                        contact.gender
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(contact.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-4">
                        {editingId === contact.id ? (
                          <>
                            <button
                              onClick={handleSave}
                              className="text-green-600 hover:text-green-900"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEdit(contact)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;