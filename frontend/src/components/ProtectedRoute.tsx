import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  type: 'user' | 'business';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, type }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.type !== type) {
    return <Navigate to={`/dashboard/${user.type}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;