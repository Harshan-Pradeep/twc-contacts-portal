import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/secondaryLogo.png';
import LogoutIcon from '../assets/bx_log-out-circle.svg';

const HomePage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        // <div className="min-h-screen bg-gray-50 p-8">
        //   <div className="max-w-4xl mx-auto">
        //     <div className="bg-white rounded-lg shadow-lg p-6">
        //       <div className="flex justify-between items-center mb-6">
        //         <h1 className="text-2xl font-bold">Welcome</h1>
        //         <div className="space-x-4">
        //           <button
        //             onClick={() => navigate('/contacts/new')}
        //             className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        //           >
        //             Add New Contact
        //           </button>
        //           <button
        //             onClick={handleLogout}
        //             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        //           >
        //             Logout
        //           </button>
        //         </div>
        //       </div>
        //       <p className="mb-4">Welcome {user?.email}! You are now logged in.</p>
        //       <div className="mt-6">
        //         <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        //           <button
        //             onClick={() => navigate('/contacts/new')}
        //             className="p-4 border rounded-lg hover:bg-gray-50 text-left"
        //           >
        //             <h3 className="font-medium">Add New Contact</h3>
        //             <p className="text-sm text-gray-600">Create a new contact in your address book</p>
        //           </button>
        //           <button
        //             onClick={() => navigate('/contacts')}
        //             className="p-4 border rounded-lg hover:bg-gray-50 text-left"
        //           >
        //             <h3 className="font-medium">View All Contacts</h3>
        //             <p className="text-sm text-gray-600">Manage your existing contacts</p>
        //           </button>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <main className="background_home min-h-screen overflow-hidden">
            <section className="h-screen flex flex-col">
                <img src={Logo} className="w-[138px] h-[91px] mt-[72px] ml-[204px]"/>
                <div className="grow flex-col px-[204px] flex justify-center">
                    <div className="flex-col text-left text-white">
                        <div className="py-12">
                            <p className="inline font-FutuBold text-[50px] font-[700] leading-[73px]">
                                Welcome,<br />
                            </p>
                            <p className="inline font-FutuLight text-[35px] font-[400] leading-[55px]">
                                This is where your contacts will live. Click the button below to add a new contact.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/contacts/new')}
                            className="h-[50px] px-6 text-[25px] font-[400] leading-[50px] text-white bg-transparent hover:bg-transparent font-FutuLight rounded-full border border-white"
                        >
                            add your first contact
                        </button>
                    </div>
                </div>
                <div className="flex justify-end px-4 pb-4">
                    <button onClick={handleLogout} className="flex items-center gap-5 px-4 py-2 text-white rounded">
                        <img src={LogoutIcon} alt="Logout" /><span className="font-FutuBold text-[25px] font-[400] leading-[73px] underline">Logout</span>
                    </button>
                </div>
            </section>
        </main>
    );
};

export default HomePage;