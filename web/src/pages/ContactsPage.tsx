import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import ContactsTable from '../components/contacts/ContactsTable';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/secondaryLogo.png';
import LogoutIcon from '../assets/bx_log-out-circle.svg';
import { useContacts } from '../hooks/useContacts';
import { useState } from 'react';
import PopupModel from '../components/common/PopupModel';

const ContactsPage = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [popup, setPopup] = useState<{
        isVisible: boolean;
        type: 'delete' | 'deleteSuccess' | 'saveSuccess';
        contactToDelete?: { id: number; name: string };
    }>({
        isVisible: false,
        type: 'delete',
    });

    const {
        contacts,
        isLoading,
        error,
        editingId,
        editedContact,
        handleEdit,
        handleSave,
        handleCancel,
        handleDelete,
        handleInputChange,
    } = useContacts();

    const handleDeleteClick = (contact: { id: number; fullName: string }) => {
        setPopup({
            isVisible: true,
            type: 'delete',
            contactToDelete: { id: contact.id, name: contact.fullName }
        });
    };

    const handleDeleteConfirm = async () => {
        if (popup.contactToDelete) {
            const success = await handleDelete(popup.contactToDelete.id);
            if (success) {
                setPopup({ isVisible: true, type: 'deleteSuccess' });
            }
        }
    };

    const handleSaveClick = async () => {
        const success = await handleSave();
        if (success) {
            setPopup({ isVisible: true, type: 'saveSuccess' });
        }
    };

    const handlePopupClose = () => {
        setPopup(prev => ({
            isVisible: false,
            type: prev.type
        }));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
                <div className="text-xl">Loading contacts...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
                <div className="text-xl text-red-600">Error loading contacts</div>
            </div>
        );
    }

    return (
        <main className="background_home min-h-screen flex flex-col">
            <img src={Logo} alt="Logo" className="w-[138px] h-[91px] mt-[72px] ml-[204px]" />

            <div className="grow flex-col px-[204px] flex justify-center">
                <div className="flex gap-1 flex-col">
                    <div className="mb-20 lg:mb-[23px] flex flex-col lg:flex-row justify-between h-16 items-center">
                        <h2 className="mb-6 lg:my-[23px] text-slate-50 md:text-5xl font-bold leading-8 font-FutuBold">
                            Contacts
                        </h2>
                        <div className="text-white">{user?.email}</div>
                        <Button
                            onClick={() => navigate('/contacts/new')}
                            className="h-[50px] px-6 text-[25px] font-[400] leading-[50px] text-white bg-transparent hover:bg-transparent font-FutuLight rounded-full border border-white"
                        >
                            add new contact
                        </Button>
                    </div>

                    <div className="bg-white md:rounded-3xl w-full md:px-4 py-4 text-primary h-[45vh] overflow-y-auto">
                        <ContactsTable
                            contacts={contacts}
                            editingId={editingId}
                            editedContact={editedContact}
                            onEdit={handleEdit}
                            onSave={handleSaveClick}
                            onCancel={handleCancel}
                            onDelete={handleDeleteClick}
                            onInputChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
            <button
                onClick={() => {
                    logout();
                    navigate('/login');
                }}
                className="absolute bottom-4 right-4 flex items-center gap-5 px-4 py-2 text-white rounded"
            >
                <img src={LogoutIcon} alt="Logout" />
                <span className="font-FutuBold text-[25px] font-[400] leading-[73px] underline">
                    Logout
                </span>
            </button>
            <PopupModel
                isVisible={popup.isVisible}
                type={popup.type}
                contactName={popup.contactToDelete?.name}
                onConfirm={popup.type === 'delete' ? handleDeleteConfirm : handlePopupClose}
                onCancel={handlePopupClose}
            />
        </main>
    );
};

export default ContactsPage;