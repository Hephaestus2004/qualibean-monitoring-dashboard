
import React from 'react';
import Card from './common/Card';

const Users: React.FC = () => {
  return (
    <Card>
      <div className="text-center py-16">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.975 5.975 0 0112 13a5.975 5.975 0 013 5.197M15 21a6 6 0 00-9-5.197" /></svg>
        <h2 className="mt-2 text-xl font-bold text-text-primary">User Management</h2>
        <p className="mt-1 text-text-secondary">This section is for administrators only. Here you can add, remove, and manage user roles.</p>
        <button className="mt-6 px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors">
          Add New User
        </button>
      </div>
    </Card>
  );
};

export default Users;
