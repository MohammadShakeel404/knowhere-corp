import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from '@/pages/Index';
import Features from '@/pages/Features';
import AI from '@/pages/AI';
import Pricing from '@/pages/Pricing';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';
import AIBusiness from '@/pages/AIBusiness';
import AIBusinessBranding from '@/pages/AIBusinessBranding';
import ServiceDetails from '@/pages/ServiceDetails';
import Admin from '@/pages/Admin';
import WebsiteDevelopment from '@/pages/WebsiteDevelopment';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/features" element={<Features />} />
              <Route path="/services/:serviceSlug" element={<ServiceDetails />} />
              <Route path="/ai" element={<AI />} />
              <Route path="/ai-business" element={<AIBusiness />} />
              <Route path="/ai-branding" element={<AIBusinessBranding />} />
              <Route path="/website-development" element={<WebsiteDevelopment />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
