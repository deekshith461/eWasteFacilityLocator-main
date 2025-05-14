import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  name: string;
  type: 'user' | 'business';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'user' | 'business') => Promise<void>;
  register: (data: any, type: 'user' | 'business') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string, type: 'user' | 'business') => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Assuming successful login
      const user = {
        id: '1',
        email,
        name: type === 'user' ? 'John Doe' : 'EcoRecycle Solutions',
        type
      };
      setUser(user);
      toast.success('Successfully logged in!');
      navigate(type === 'user' ? '/dashboard/user' : '/dashboard/business');
    } catch (error) {
      toast.error('An error occurred during login');
      throw error;
    }
  }, [navigate]);

  const register = useCallback(async (data: any, type: 'user' | 'business') => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = {
        id: '1',
        email: data.email,
        name: data.name || data.businessName,
        type
      };
      setUser(user);
      toast.success('Registration successful!');
      navigate(type === 'user' ? '/dashboard/user' : '/dashboard/business');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      throw error;
    }
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
