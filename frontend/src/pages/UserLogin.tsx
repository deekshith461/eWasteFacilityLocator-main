import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';

const UserLogin = () => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password, 'user');
      } else {
        await register(formData, 'user');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-black py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-[#121212] p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <User className="h-12 w-12 text-[#3c9c1c]" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-white">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-gray-400">
            {isLogin ? 'Sign in to your account' : 'Register as a new user'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <Input
                label="Full Name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="bg-[#121212] text-white placeholder-gray-1000"
              />
              <Input
                label="Phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9999999999"
                className="mt-4 bg-[#121212] text-white placeholder-gray-500" // Ensure spacing is equal to other fields
              />
            </>
          )}
          
          <Input
            label="Email Address"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="bg-[#121212] text-white placeholder-gray-500"
          />
          
          <Input
            label="Password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="bg-[#121212] text-white placeholder-gray-500"
          />

          <Button className="w-full bg-[#3c9c1c]/100 hover:bg-[#3c9c1c]/70" disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#3c9c1c]/80 hover:text-[#3c9c1c]/60 text-sm font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

        <Link
          to="/login"
          className="flex items-center justify-center text-sm text-gray-400 hover:text-gray-300"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to account type selection
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
