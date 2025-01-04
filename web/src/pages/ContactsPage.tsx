import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import ContactsTable from '../components/contacts/ContactsTable';
import { useContactsPage } from '../hooks/useContactsPage';
import Logo from '../assets/secondaryLogo.png';
import { useAuth } from '../hooks/useAuth';
import LogoutIcon from '../assets/bx_log-out-circle.svg';

const ContactsPage = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    
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
    } = useContactsPage();

    const handleLogout = () => {
        logout();
        navigate('/login');
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
        // <main className="background_home min-h-screen overflow-hidden">
        //     <img src={Logo} className="w-[138px] h-[91px] mt-[72px] ml-[204px]" />

        //   <div className="max-w-7xl mx-auto">
        //   <Button
        //           onClick={() => navigate('/contacts/new')}
        //           className="bg-indigo-600 text-white hover:bg-indigo-700"
        //         >
        //           Add New Contact
        //         </Button>
        //     <div className="bg-white rounded-lg shadow p-6">
        //       <div className="flex justify-between items-center mb-6">
        //       <h2 className="mb-6 lg:my-[23px] text-slate-50 md:text-5xl font-bold leading-8 font-FutuBold flex text-center items-center justify-center">
        //             Contacts
        //           </h2>

        //       </div>

        //       <ContactsTable
        //         contacts={contacts}
        //         editingId={editingId}
        //         editedContact={editedContact}
        //         onEdit={handleEdit}
        //         onSave={handleSave}
        //         onCancel={handleCancel}
        //         onDelete={handleDelete}
        //         onInputChange={handleInputChange}
        //       />
        //     </div>
        //   </div>
        // </main>
        <main className="background_home min-h-screen flex flex-col">
            <img src={Logo} className="w-[138px] h-[91px] mt-[72px] ml-[204px]"/>
            <div className="grow flex-col px-[204px] flex justify-center">
                <div className="flex gap-1 flex-col">
                    <div className="mb-20 lg:mb-[23px] flex flex-col lg:flex-row justify-between h-16 items-center">
                        <h2 className="mb-6 lg:my-[23px] text-slate-50 md:text-5xl font-bold leading-8 font-FutuBold flex text-center items-center justify-center">
                            Contacts
                        </h2>
                        <h2>{user?.email}</h2>
                        <div>
                            <Button
                                onClick={() => navigate('/contacts/new')}
                                className="h-[50px] px-6 text-[25px] font-[400] leading-[50px] text-white bg-transparent hover:bg-transparent font-FutuLight rounded-full border border-white"
                            >
                                add new contact
                            </Button>
                        </div>
                    </div>
                    <div className="bg-white md:rounded-3xl w-full md:px-4 py-4 text-primary h-[45vh] overflow-y-auto">
                        <ContactsTable
                            contacts={contacts}
                            editingId={editingId}
                            editedContact={editedContact}
                            onEdit={handleEdit}
                            onSave={handleSave}
                            onCancel={handleCancel}
                            onDelete={handleDelete}
                            onInputChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-4 right-4">
                <button onClick={handleLogout} className="flex items-center gap-5 px-4 py-2 text-white rounded">
                    <img src={LogoutIcon} alt="Logout" />
                    <span className="font-FutuBold text-[25px] font-[400] leading-[73px] underline">
                        Logout
                    </span>
                </button>
            </div>
        </main>

    );
};

export default ContactsPage;