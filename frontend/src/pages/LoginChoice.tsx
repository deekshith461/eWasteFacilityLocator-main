import React from 'react';
import { Link } from 'react-router-dom';
import { User, Building2 } from 'lucide-react';

const LoginChoice = () => {
  return (
    <div className="h-screen pt-16 flex items-center justify-center bg-[#121212] overflow-hidden">
      <div className="max-w-4xl w-full mx-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-200">Choose Your Account Type</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Link
            to="/login/user"
            className="bg-[#1E1E1E] p-8 rounded-xl shadow-md hover:shadow-lg transition group"
          >
            <div className="flex flex-col items-center text-center">
              <User className="h-16 w-16 text-[#3c9c1c] mb-4 group-hover:scale-110 transition" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-100">Individual User</h3>
              <p className="text-gray-500">
                Recycle your e-waste, earn rewards, and schedule doorstep pickups
              </p>
            </div>
          </Link>

          <Link
            to="/login/business"
            className="bg-[#1E1E1E] p-8 rounded-xl shadow-md hover:shadow-lg transition group"
          >
            <div className="flex flex-col items-center text-center">
              <Building2 className="h-16 w-16 text-[#3c9c1c] mb-4 group-hover:scale-110 transition" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-100">Recycling Business</h3>
              <p className="text-gray-500">
                Manage your recycling center, process requests, and track operations
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginChoice;
