
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-white/10 backdrop-blur-md bg-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-brand-purple to-brand-yellow rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">MarketingAI</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/features">
              <Button variant="ghost" className={`text-white hover:text-purple-300 ${isActive('/features') ? 'bg-white/10' : ''}`}>
                Features
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="ghost" className={`text-white hover:text-purple-300 ${isActive('/pricing') ? 'bg-white/10' : ''}`}>
                Pricing
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" className={`text-white hover:text-purple-300 ${isActive('/about') ? 'bg-white/10' : ''}`}>
                About
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" className={`text-white hover:text-purple-300 ${isActive('/contact') ? 'bg-white/10' : ''}`}>
                Contact
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:text-purple-300">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-brand-purple to-brand-yellow hover:from-purple-600 hover:to-yellow-600">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
