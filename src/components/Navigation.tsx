import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button"
import { Brain } from 'lucide-react';

const Navigation = () => {
  const { user, signOut, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-light text-white">Knowhere Corp</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-white/80 hover:text-white transition-colors font-light">
              Features
            </Link>
            <Link to="/ai-branding" className="text-white/80 hover:text-white transition-colors font-light">
              AI Branding
            </Link>
            <Link to="/website-development" className="text-white/80 hover:text-white transition-colors font-light">
              Web Development
            </Link>
            <Link to="/pricing" className="text-white/80 hover:text-white transition-colors font-light">
              Pricing
            </Link>
            <Link to="/about" className="text-white/80 hover:text-white transition-colors font-light">
              About
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin() && (
                  <Link 
                    to="/admin" 
                    className="text-white/80 hover:text-white transition-colors font-light flex items-center space-x-1"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                )}
                <Link to="/profile" className="text-white/80 hover:text-white transition-colors font-light">
                  Profile
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={handleSignOut}
                  className="text-white/80 hover:text-white font-light"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost" className="text-white/80 hover:text-white font-light">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-white text-black hover:bg-white/90 font-medium">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/95 backdrop-blur-md border-t border-white/10">
            <Link
              to="/features"
              className="block px-3 py-2 text-white/80 hover:text-white transition-colors font-light"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/ai-branding"
              className="block px-3 py-2 text-white/80 hover:text-white transition-colors font-light"
              onClick={() => setIsOpen(false)}
            >
              AI Branding
            </Link>
            <Link
              to="/website-development"
              className="block px-3 py-2 text-white/80 hover:text-white transition-colors font-light"
              onClick={() => setIsOpen(false)}
            >
              Web Development
            </Link>
            <Link
              to="/pricing"
              className="block px-3 py-2 text-white/80 hover:text-white transition-colors font-light"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-white/80 hover:text-white transition-colors font-light"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>

            {user ? (
              <>
                {isAdmin() && (
                  <Link 
                    to="/admin" 
                    className="block px-3 py-2 text-white/80 hover:text-white transition-colors font-light"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-white/80 hover:text-white transition-colors font-light"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-white/80 hover:text-white font-light"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-white/80 hover:text-white transition-colors font-light"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 text-white/80 hover:text-white transition-colors font-light"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
