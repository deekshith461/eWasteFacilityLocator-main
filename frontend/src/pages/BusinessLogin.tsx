import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';

const BusinessLogin = () => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    businessName: '',
    address: '',
    latitude: '',
    longitude: '',
    acceptedItems: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password, 'business');
      } else {
        await register(formData, 'business');
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
            <Building2 className="h-12 w-12 text-[#3c9c1c]" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-white">
            {isLogin ? 'Business Login' : 'Register Business'}
          </h2>
          <p className="mt-2 text-gray-300">
            {isLogin ? 'Access your recycling center dashboard' : 'Register your recycling center'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <Input
                label="Business Name"
                name="businessName"
                type="text"
                required
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Eco Recycling Solutions"
                className="bg-[#121212] text-white placeholder-gray-500 border border-gray-700"
              />
              <Input
                label="Business Address"
                name="address"
                type="text"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Green Street"
                className="bg-[#121212] text-white placeholder-gray-500 border border-gray-700"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Latitude"
                  name="latitude"
                  type="number"
                  step="any"
                  required
                  value={formData.latitude}
                  onChange={handleChange}
                  placeholder="40.7128"
                  className="bg-[#121212] text-white placeholder-gray-500 border border-gray-700"
                />
                <Input
                  label="Longitude"
                  name="longitude"
                  type="number"
                  step="any"
                  required
                  value={formData.longitude}
                  onChange={handleChange}
                  placeholder="-74.0060"
                  className="bg-[#121212] text-white placeholder-gray-500 border border-gray-700"
                />
              </div>
              <Input
                label="Accepted Items"
                name="acceptedItems"
                type="text"
                required
                value={formData.acceptedItems}
                onChange={handleChange}
                placeholder="Electronics, Batteries, etc."
                className="bg-[#121212] text-white placeholder-gray-500 border border-gray-700"
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
            placeholder="business@example.com"
            className="bg-[#121212] text-white placeholder-gray-500 border border-gray-700"
          />
          
          <Input
            label="Password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="bg-[#121212] text-white placeholder-gray-500 border border-gray-700"
          />

          <Button 
            className="w-full bg-[#3c9c1c]/100 hover:bg-[#3c9c1c]/70 text-white" 
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            {isLogin ? 'Sign In' : 'Register Business'}
          </Button>
        </form>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#3c9c1c]/80 hover:text-[#3c9c1c]/60 text-sm font-medium"
          >
            {isLogin ? "Don't have an account? Register" : 'Already registered? Sign in'}
          </button>
        </div>

        <Link
          to="/login"
          className="flex items-center justify-center text-sm text-gray-400 hover:text-gray-300 mt-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to account type selection
        </Link>
      </div>
    </div>
  );
};

export default BusinessLogin;