// src/pages/SignInPage.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthService } from '../services/AuthService';
import { setAuthentication, setUser } from '../redux/authSlice';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const SignInPage: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [exist, setExist] = useState(false);
  var Email=localStorage.getItem("Email");
  var Password=localStorage.getItem("Password");
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userData = await AuthService.signIn(email, password);
      console.log('SignIn Result:', userData);

      // Dispatch actions to update Redux store
      dispatch(setAuthentication(true));
      dispatch(setUser(userData));

      // Add redirection or other logic after successful sign-in
    } catch (error: any) {
      console.error('SignIn Error:', error.message);
      // Handle error, e.g., show an error message to the user
    }
    finally{
    if((localStorage.length) && email===Email && password===Password){
      setExist(true);
    }
  }
  };
  useEffect(() => {
    if (exist) {
      navigate('/dashboard');
    }
  }, [exist]);


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSignIn}>
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
          <button
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
            type="submit"
          >
            Sign In
          </button>
        </form>
        {isAuthenticated || exist && <p className="mt-4 text-green-500">Successfully signed in!</p>}
      </div>
    </div>
  );
};

export default SignInPage;
