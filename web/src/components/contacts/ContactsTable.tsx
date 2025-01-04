import React from 'react';
import { Contact } from '../../types/contact.types';
import Button from '../common/Button';

interface ContactsTableProps {
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
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    // <div className="overflow-x-auto">
    //   <table className="min-w-full divide-y divide-gray-200">
    //     <thead className="bg-gray-50">
    //       <tr>
    //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //           Full Name
    //         </th>
    //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //           Email
    //         </th>
    //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //           Phone Number
    //         </th>
    //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //           Gender
    //         </th>
    //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //           Created At
    //         </th>
    //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //           Actions
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody className="bg-white divide-y divide-gray-200">
    //       {contacts.map((contact) => (
    //         <tr key={contact.id} className="hover:bg-gray-50">
    //           <td className="px-6 py-4 whitespace-nowrap">
    //             {editingId === contact.id ? (
    //               <input
    //                 type="text"
    //                 value={editedContact?.fullName}
    //                 onChange={(e) => onInputChange(e, 'fullName')}
    //                 className="w-full border rounded px-2 py-1"
    //               />
    //             ) : (
    //               contact.fullName
    //             )}
    //           </td>
    //           <td className="px-6 py-4 whitespace-nowrap">
    //             {editingId === contact.id ? (
    //               <input
    //                 type="email"
    //                 value={editedContact?.email}
    //                 onChange={(e) => onInputChange(e, 'email')}
    //                 className="w-full border rounded px-2 py-1"
    //               />
    //             ) : (
    //               contact.email
    //             )}
    //           </td>
    //           <td className="px-6 py-4 whitespace-nowrap">
    //             {editingId === contact.id ? (
    //               <input
    //                 type="text"
    //                 value={editedContact?.phoneNumber}
    //                 onChange={(e) => onInputChange(e, 'phoneNumber')}
    //                 className="w-full border rounded px-2 py-1"
    //               />
    //             ) : (
    //               contact.phoneNumber || '-'
    //             )}
    //           </td>
    //           <td className="px-6 py-4 whitespace-nowrap">
    //             {editingId === contact.id ? (
    //               <select
    //                 value={editedContact?.gender}
    //                 onChange={(e) => onInputChange(e, 'gender')}
    //                 className="w-full border rounded px-2 py-1"
    //               >
    //                 <option value="Male">Male</option>
    //                 <option value="Female">Female</option>
    //               </select>
    //             ) : (
    //               contact.gender
    //             )}
    //           </td>
    //           <td className="px-6 py-4 whitespace-nowrap">
    //             {formatDate(contact.createdAt)}
    //           </td>
    //           <td className="px-6 py-4 whitespace-nowrap">
    //             <div className="flex space-x-4">
    //               {editingId === contact.id ? (
    //                 <>
    //                   <button
    //                     onClick={onSave}
    //                     className="text-green-600 hover:text-green-900"
    //                   >
    //                     Save
    //                   </button>
    //                   <button
    //                     onClick={onCancel}
    //                     className="text-gray-600 hover:text-gray-900"
    //                   >
    //                     Cancel
    //                   </button>
    //                 </>
    //               ) : (
    //                 <button
    //                   onClick={() => onEdit(contact)}
    //                   className="text-indigo-600 hover:text-indigo-900"
    //                 >
    //                   Edit
    //                 </button>
    //               )}
    //               <button
    //                 onClick={() => onDelete(contact.id)}
    //                 className="text-red-600 hover:text-red-900"
    //               >
    //                 Delete
    //               </button>
    //             </div>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
    <table className="w-full text-sm text-left text-[#083F46]">
      <thead className="text-[#083F46] uppercase bg-white">
        <tr>
          <th className="px-6 py-3">Full Name</th>
          <th className="px-6 py-3">Email</th>
          <th className="px-6 py-3">Phone</th>
          <th className="px-6 py-3">Gender</th>
          <th className="px-6 py-3">Created At</th>
          <th className="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <tr key={contact.id} className="hover:bg-gray-50">
            <td className="px-6 py-4">
              {editingId === contact.id ? (
                <input
                  type="text"
                  value={editedContact?.fullName}
                  onChange={(e) => onInputChange(e, 'fullName')}
                  className="w-full border rounded px-2 py-1"
                />
              ) : (
                contact.fullName
              )}
            </td>
            <td className="px-6 py-4">
              {editingId === contact.id ? (
                <input
                  type="email"
                  value={editedContact?.email}
                  onChange={(e) => onInputChange(e, 'email')}
                  className="w-full border rounded px-2 py-1"
                />
              ) : (
                contact.email
              )}
            </td>
            <td className="px-6 py-4">
              {editingId === contact.id ? (
                <input
                  type="text"
                  value={editedContact?.phoneNumber}
                  onChange={(e) => onInputChange(e, 'phoneNumber')}
                  className="w-full border rounded px-2 py-1"
                />
              ) : (
                contact.phoneNumber || '-'
              )}
            </td>
            <td className="px-6 py-4">
              {editingId === contact.id ? (
                <select
                  value={editedContact?.gender}
                  onChange={(e) => onInputChange(e, 'gender')}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                contact.gender
              )}
            </td>
            <td className="px-6 py-4">{formatDate(contact.createdAt)}</td>
            <td className="px-6 py-4">
              <div className="flex space-x-4">
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
                  <button
                    onClick={() => onEdit(contact)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => onDelete(contact.id)}
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
  );
};

export default ContactsTable;