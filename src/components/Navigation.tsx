import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";

const Navigation: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        toast({
          title: "Sign Out Failed",
          description: error.message || "Failed to sign out",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Signed Out",
          description: "You have been successfully signed out."
        });
        navigate('/');
      }
    } catch (err) {
      console.error('Sign out error:', err);
      toast({
        title: "Sign Out Failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  return (
    <nav className="bg-black/70 backdrop-blur-md fixed top-0 left-0 w-full z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="font-semibold text-xl text-white">Knowhere Corp</span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`transition-colors ${
                location.pathname === "/" ? "text-blue-300" : "text-gray-300 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/features"
              className={`transition-colors ${
                location.pathname === "/features" ? "text-blue-300" : "text-gray-300 hover:text-white"
              }`}
            >
              Features
            </Link>
            <Link
              to="/ai"
              className={`transition-colors ${
                location.pathname === "/ai" ? "text-blue-300" : "text-gray-300 hover:text-white"
              }`}
            >
              AI
            </Link>
            <Link
              to="/ai-business"
              className={`transition-colors ${
                location.pathname === "/ai-business" ? "text-blue-300" : "text-gray-300 hover:text-white"
              }`}
            >
              AI Manager
            </Link>
            <Link
              to="/pricing"
              className={`transition-colors ${
                location.pathname === "/pricing" ? "text-blue-300" : "text-gray-300 hover:text-white"
              }`}
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className={`transition-colors ${
                location.pathname === "/about" ? "text-blue-300" : "text-gray-300 hover:text-white"
              }`}
            >
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" className="text-gray-300 hover:text-white transition-colors">
                    Profile
                  </Button>
                </Link>
                <Button 
                  onClick={handleSignOut} 
                  variant="outline" 
                  className="border-gray-400 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-300 hover:text-white transition-colors">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline" className="border-gray-400 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="hover:bg-gray-800 text-gray-300 hover:text-white">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-black border-r border-gray-800 text-white">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    Navigate through the application
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <Link to="/" className="hover:text-blue-300 transition-colors block py-2">
                    Home
                  </Link>
                  <Link to="/features" className="hover:text-blue-300 transition-colors block py-2">
                    Features
                  </Link>
                  <Link to="/ai" className="hover:text-blue-300 transition-colors block py-2">
                    AI
                  </Link>
                  <Link to="/ai-business" className="hover:text-blue-300 transition-colors block py-2">
                    AI Manager
                  </Link>
                  <Link to="/pricing" className="hover:text-blue-300 transition-colors block py-2">
                    Pricing
                  </Link>
                  <Link to="/about" className="hover:text-blue-300 transition-colors block py-2">
                    About
                  </Link>
                  {user ? (
                    <>
                      <Link to="/profile" className="hover:text-blue-300 transition-colors block py-2">
                        Profile
                      </Link>
                      <Button 
                        onClick={handleSignOut} 
                        variant="outline" 
                        className="border-gray-400 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors w-full"
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="hover:text-blue-300 transition-colors block py-2">
                        Log In
                      </Link>
                      <Link to="/signup" className="hover:text-blue-300 transition-colors block py-2">
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
