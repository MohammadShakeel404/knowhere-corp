import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";

const Navigation = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-black/95 backdrop-blur-md fixed top-0 left-0 w-full z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          MarketingAI
        </Link>

      <div className="hidden md:flex items-center space-x-8">
        <Link to="/" className="text-white/80 hover:text-white transition-colors">
          Home
        </Link>
        <Link to="/features" className="text-white/80 hover:text-white transition-colors">
          Features
        </Link>
        <Link to="/ai" className="text-white/80 hover:text-white transition-colors">
          AI Technology
        </Link>
        <Link to="/ai-business" className="text-white/80 hover:text-white transition-colors">
          AI Business Manager
        </Link>
        <Link to="/pricing" className="text-white/80 hover:text-white transition-colors">
          Pricing
        </Link>
        <Link to="/about" className="text-white/80 hover:text-white transition-colors">
          About
        </Link>
        <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
          Contact
        </Link>
      </div>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/profile" className="text-white/60 hover:text-white transition-colors">
                Profile
              </Link>
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white/60 hover:text-white transition-colors">
                Log In
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        <Sheet>
          <SheetTrigger className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-black/95 backdrop-blur-md border-0">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Navigate through the application.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Link to="/" className="text-white/80 hover:text-white transition-colors block py-2">
                Home
              </Link>
              <Link to="/features" className="text-white/80 hover:text-white transition-colors block py-2">
                Features
              </Link>
              <Link to="/ai" className="text-white/80 hover:text-white transition-colors block py-2">
                AI Technology
              </Link>
              <Link to="/ai-business" className="text-white/80 hover:text-white transition-colors block py-2">
                AI Business Manager
              </Link>
              <Link to="/pricing" className="text-white/80 hover:text-white transition-colors block py-2">
                Pricing
              </Link>
              <Link to="/about" className="text-white/80 hover:text-white transition-colors block py-2">
                About
              </Link>
              <Link to="/contact" className="text-white/80 hover:text-white transition-colors block py-2">
                Contact
              </Link>
              {user ? (
                <>
                  <Link to="/profile" className="text-white/60 hover:text-white transition-colors block py-2">
                    Profile
                  </Link>
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 w-full justify-center" onClick={() => signOut()}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-white/60 hover:text-white transition-colors block py-2">
                    Log In
                  </Link>
                  <Link to="/signup">
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 w-full justify-center">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navigation;
