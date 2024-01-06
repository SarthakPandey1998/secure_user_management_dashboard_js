// src/pages/DashboardPage.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  // Retrieve authentication status and user data from the Redux store
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userData = useSelector((state: RootState) => state.auth.user);
  var Email=localStorage.getItem("Email");
  var Password=localStorage.getItem("Password");
  var FullName=localStorage.getItem("FullName");
  const navigate = useNavigate();

  // if (!isAuthenticated  || !Email) {
  //   // If not authenticated or user data is not available, handle it accordingly
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <p className="text-red-500">Authentication failed. Please sign in.</p>
  //     </div>
  //   );
  // }
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  }
  return (       
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
        <p className="text-gray-600">This is your secure user management dashboard.</p>
      {userData && (
        <div>
          <p>Welcome, {userData.fullName}!</p>-
          <p>User Email: {userData.email}</p>
        </div>
      )}
      {Email && (
        <div>
          <p>Welcome, {FullName}!</p>
          <p>User Email: {Email}</p>
        </div>
      )}
        <div className="mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={logout}>
            Logout
          </button>
        </div>
    </div>
    </div>
  );
};

export default DashboardPage;
