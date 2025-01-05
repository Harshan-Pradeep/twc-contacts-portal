import React from 'react';
import { Contact } from '../../types/contact.types';
import EditIcon from '../../assets/material-symbols_edit-rounded.svg';
import DeleteIcon from '../../assets/material-symbols_delete-outline.svg';

type ContactsTableProps = {
  contacts: Contact[];
  editingId: number | null;
  editedContact: Contact | null;
  onEdit: (contact: Contact) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof Contact) => void;
}

const ContactsTable: React.FC<ContactsTableProps> = ({
  contacts,
  editingId,
  editedContact,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onInputChange,
}) => {
  const renderEditableField = (
    contact: Contact,
    field: keyof Contact,
    type: string = 'text'
  ) => {
    if (editingId !== contact.id) {
      return field === 'phoneNumber' && !contact[field] ? '-' : contact[field];
    }

    if (field === 'gender') {
      return (
        <select
          value={editedContact?.gender}
          onChange={(e) => onInputChange(e, 'gender')}
          className="w-full border rounded px-2 py-1"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      );
    }

    return (
      <input
        type={type}
        value={editedContact?.[field]}
        onChange={(e) => onInputChange(e, field)}
        className="w-full border rounded px-2 py-1"
      />
    );
  };

  return (
    // CHANGE: Simplified div structure while maintaining necessary classes
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
      <table className="w-full text-sm text-left text-[#083F46]">
        <thead className="text-[#083F46] bg-white">
          <tr>
            <th className="px-6 py-3">full name</th>
            <th className="px-6 py-3">gender</th>
            <th className="px-6 py-3">e-mail</th>
            <th className="px-6 py-3">phone number</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} className="hover:bg-gray-50">
              {/* CHANGE: Using renderEditableField function instead of repeated code */}
              <td className="px-6 py-4">{renderEditableField(contact, 'fullName')}</td>
              <td className="px-6 py-4">{renderEditableField(contact, 'gender')}</td>
              <td className="px-6 py-4">{renderEditableField(contact, 'email', 'email')}</td>
              <td className="px-6 py-4">{renderEditableField(contact, 'phoneNumber')}</td>
              <td className="px-6 py-4">
                <div className="flex space-x-4">
                  {/* CHANGE: Simplified button structure and removed image imports */}
                  {editingId === contact.id ? (
                    <>
                      <button
                        onClick={onSave}
                        className="text-green-600 hover:text-green-900"
                      >
                        Save
                      </button>
                      <button
                        onClick={onCancel}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button onClick={() => onEdit(contact)}>
                      <img src={EditIcon} alt="Edit" width={23} height={24} />
                    </button>
                  )}
                  <button onClick={() => onDelete(contact.id)}>
                    <img src={DeleteIcon} alt="Edit" width={23} height={24} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsTable;