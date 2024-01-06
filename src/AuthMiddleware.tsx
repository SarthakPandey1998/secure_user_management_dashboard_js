import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from './redux/store';

interface AuthMiddlewareProps {
  children: React.ReactNode; // Corrected type for children prop
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  var Email = localStorage.getItem("Email");

  // Your authentication logic here, for example:
  if (!isAuthenticated && !Email) {
    // Redirect to the login page or perform other actions
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthMiddleware;
