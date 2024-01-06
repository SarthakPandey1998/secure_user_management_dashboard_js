// src/pages/SignUpPage.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthService } from '../services/AuthService';
import { setAuthentication, setUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  
  
 
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const userData = await AuthService.signUp(email, password, fullName);

      // Dispatch actions to update Redux store
      dispatch(setAuthentication(true));
      dispatch(setUser(userData));

      // Redirect to the dashboard page or perform other actions
    } catch (error: any) {
      if (error.message === 'Passwords do not match') {
        setPasswordError('Passwords do not match');
      } 
    
    else{
      console.error('SignUp Error:', error.message);
      // Handle signup error, e.g., show an error message to the user
    }
  }
    localStorage.setItem("Email",email);
    localStorage.setItem("Password",password);
    localStorage.setItem("FullName",fullName);
    navigate("/signin");
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
              Full Name:
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded-md"
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded-md"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded-md"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded-md"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        {passwordError && <p className="text-red-500">{passwordError}</p>}
        {/* {isAuthenticated && <p className="mt-4 text-green-500">Account created successfully!</p>} */}
      </div>
    </div>
  );
};

export default SignUpPage;
