import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Welcome</h1>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/contacts/new')}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Add New Contact
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
          <p className="mb-4">Welcome {user?.email}! You are now logged in.</p>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/contacts/new')}
                className="p-4 border rounded-lg hover:bg-gray-50 text-left"
              >
                <h3 className="font-medium">Add New Contact</h3>
                <p className="text-sm text-gray-600">Create a new contact in your address book</p>
              </button>
              <button
                onClick={() => navigate('/contacts')}
                className="p-4 border rounded-lg hover:bg-gray-50 text-left"
              >
                <h3 className="font-medium">View All Contacts</h3>
                <p className="text-sm text-gray-600">Manage your existing contacts</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;