
import { Brain, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-light text-white">MarketingAI</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features">
              <Button variant="ghost" className={`text-white/80 hover:text-white font-light ${isActive('/features') ? 'text-white bg-white/10' : ''}`}>
                Features
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="ghost" className={`text-white/80 hover:text-white font-light ${isActive('/pricing') ? 'text-white bg-white/10' : ''}`}>
                Pricing
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" className={`text-white/80 hover:text-white font-light ${isActive('/about') ? 'text-white bg-white/10' : ''}`}>
                About
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" className={`text-white/80 hover:text-white font-light ${isActive('/contact') ? 'text-white bg-white/10' : ''}`}>
                Contact
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" className="text-white/80 hover:text-white font-light">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-white text-black hover:bg-white/90 font-medium rounded-full px-6">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10">
            <div className="px-4 py-6 space-y-4">
              <Link to="/features" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full text-white/80 hover:text-white font-light justify-start">
                  Features
                </Button>
              </Link>
              <Link to="/pricing" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full text-white/80 hover:text-white font-light justify-start">
                  Pricing
                </Button>
              </Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full text-white/80 hover:text-white font-light justify-start">
                  About
                </Button>
              </Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full text-white/80 hover:text-white font-light justify-start">
                  Contact
                </Button>
              </Link>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full text-white/80 hover:text-white font-light justify-start">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-white text-black hover:bg-white/90 font-medium">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
