import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Recycle, MapPin, LogIn, User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Handle navbar visibility
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      // Handle background transparency
      setIsScrolled(currentScrollY > 50);
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 transform ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    } ${isScrolled ? 'bg-black/30 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity group">
            <Recycle className="h-8 w-8 text-white transition-transform duration-300 group-hover:rotate-180" />
            <span className="font-bold text-xl text-white">EcoRecycle</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-white px-4 py-2 rounded-lg hover:bg-[#3c9c1c]/35 transition-all duration-300"
            >
              Home
            </Link>
            <Link 
              to="/centers" 
              className="flex items-center space-x-1 text-white px-4 py-2 rounded-lg hover:bg-[#3c9c1c]/35 transition-all duration-300"
            >
              <MapPin className="h-4 w-4" />
              <span>Recycling Centers</span>
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to={`/dashboard/${user.type}`}
                  className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg hover:bg-[#3c9c1c]/35 transition-all duration-300"
                >
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="border-white text-white hover:bg-[#3c9c1c]/20 transition-all duration-300 rounded-lg"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 text-white px-4 py-2 rounded-lg hover:bg-[#3c9c1c]/35 transition-all duration-300"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:bg-[#3c9c1c]/20 p-2 rounded-lg transition-all duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/70 backdrop-blur-md">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link 
              to="/" 
              className="text-white w-full text-center px-4 py-2 hover:bg-[#3c9c1c]/20 transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/centers" 
              className="flex items-center justify-center space-x-1 text-white w-full px-4 py-2 hover:bg-[#3c9c1c]/20 transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              <MapPin className="h-4 w-4" />
              <span>Recycling Centers</span>
            </Link>
            {user ? (
              <div className="flex flex-col items-center space-y-4 w-full">
                <Link 
                  to={`/dashboard/${user.type}`}
                  className="flex items-center justify-center space-x-2 text-white w-full px-4 py-2 hover:bg-[#3c9c1c]/20 transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="border-white text-white hover:bg-[#3c9c1c]/20 transition-all duration-300 w-3/4"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="flex items-center justify-center space-x-1 text-white w-full px-4 py-2 hover:bg-[#3c9c1c]/20 transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;