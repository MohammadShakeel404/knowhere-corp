
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { Brain, ArrowLeft, Shield, Lock, Eye, Database } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/20 via-transparent to-neutral-900/20"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <Link to="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>
          
          <h1 className="text-5xl md:text-7xl font-extralight text-white mb-6 tracking-tight leading-none">
            Privacy
            <span className="block bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          
          <p className="text-xl text-white/50 max-w-2xl font-light leading-relaxed">
            Last updated: December 15, 2024
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-light text-white mb-4">Information We Collect</h2>
              <p className="text-white/60 font-light leading-relaxed">
                We collect information to provide better services to all our users — from figuring out basic stuff like which language you speak, to more complex things like which ads you’ll find most useful or the people who matter most to you online.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-light text-white mb-4">How We Use Your Information</h2>
              <p className="text-white/60 font-light leading-relaxed">
                We use the information we collect to customize our services for you, including providing recommendations, personalizing content, and showing you relevant ads.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-light text-white mb-4">Information Security</h2>
              <p className="text-white/60 font-light leading-relaxed">
                We work hard to protect [Client Company] and our users from unauthorized access to or unauthorized alteration, disclosure or destruction of information we hold.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-light text-white mb-4">Your Rights</h2>
              <p className="text-white/60 font-light leading-relaxed">
                You have the right to access, correct, or delete your personal information. You also have the right to object to or restrict certain processing of your information.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-8 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-light text-white">MarketingAI</span>
            </div>
            <div className="flex space-x-8 text-white/60">
              <Link to="/about" className="hover:text-white transition-colors font-light">About</Link>
              <Link to="/contact" className="hover:text-white transition-colors font-light">Contact</Link>
              <Link to="/privacy" className="hover:text-white transition-colors font-light">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors font-light">Terms</Link>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/40">
            <p className="font-light">&copy; 2024 MarketingAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;
