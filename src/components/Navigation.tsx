
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  // Check if user is admin
  const isAdmin = user?.email === 'admin@knowherecorp.com' || user?.user_metadata?.role === 'admin';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">K</span>
            </div>
            <span className="text-white font-semibold text-lg">Knowhere Corp</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link to="/ai" className="text-gray-300 hover:text-white transition-colors">
              AI Assistant
            </Link>
            <Link to="/ai-business" className="text-gray-300 hover:text-white transition-colors">
              Business AI
            </Link>
            <Link to="/ai-branding" className="text-gray-300 hover:text-white transition-colors">
              AI Branding
            </Link>
            <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link to="/admin" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                )}
                <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">
                  Profile
                </Link>
                <Button variant="outline" size="sm" className="text-gray-300 hover:text-white border-gray-500 hover:border-white transition-colors" onClick={signOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Log In
                </Link>
                <Link to="/signup" className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/95 rounded-lg mt-2">
              <Link
                to="/features"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                to="/ai"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                AI Assistant
              </Link>
              <Link
                to="/ai-business"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Business AI
              </Link>
              <Link
                to="/ai-branding"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                AI Branding
              </Link>
              <Link
                to="/pricing"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              {user ? (
                <div className="pt-4 border-t border-gray-700">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium flex items-center space-x-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Shield className="w-4 h-4" />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <Button variant="outline" size="sm" className="w-full mt-2 text-gray-300 hover:text-white border-gray-500 hover:border-white transition-colors" onClick={signOut}>
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="mt-3 space-y-2">
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="text-white bg-green-500 hover:bg-green-600 block px-3 py-2 rounded-md transition-colors text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
