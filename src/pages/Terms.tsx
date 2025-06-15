
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { Brain, ArrowLeft, Shield, FileText, Users, Globe } from "lucide-react";

const Terms = () => {
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
            Terms of
            <span className="block bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              Service
            </span>
          </h1>
          
          <p className="text-xl text-white/50 max-w-2xl font-light leading-relaxed">
            Last updated: December 15, 2024
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-12 backdrop-blur-xl">
            <div className="prose prose-lg prose-invert max-w-none">
              <div className="space-y-12">
                <div>
                  <h2 className="text-3xl font-light text-white mb-6">1. Acceptance of Terms</h2>
                  <p className="text-white/70 font-light leading-relaxed">
                    By accessing and using MarketingAI's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">2. Description of Service</h2>
                  <p className="text-white/70 font-light leading-relaxed">
                    MarketingAI provides AI-powered marketing automation tools including but not limited to brand creation, social media management, advertisement generation, website development, and SEO optimization services.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">3. User Accounts</h2>
                  <p className="text-white/70 font-light leading-relaxed mb-4">
                    To access certain features of our service, you may be required to create an account. You agree to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-white/70 font-light">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain the security of your password</li>
                    <li>Accept all risks of unauthorized access to your account</li>
                    <li>Notify us immediately of any unauthorized use</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">4. Acceptable Use</h2>
                  <p className="text-white/70 font-light leading-relaxed mb-4">
                    You agree not to use the service to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-white/70 font-light">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe upon intellectual property rights</li>
                    <li>Transmit harmful, offensive, or inappropriate content</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Generate content that promotes illegal activities</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">5. Intellectual Property</h2>
                  <p className="text-white/70 font-light leading-relaxed">
                    Content created through our AI tools belongs to you, subject to our underlying technology rights. MarketingAI retains all rights to our platform, algorithms, and proprietary technology.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">6. Payment Terms</h2>
                  <p className="text-white/70 font-light leading-relaxed">
                    Subscription fees are billed in advance on a monthly or annual basis. All payments are non-refundable except as required by law or as specifically stated in our refund policy.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">7. Privacy</h2>
                  <p className="text-white/70 font-light leading-relaxed">
                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">8. Limitation of Liability</h2>
                  <p className="text-white/70 font-light leading-relaxed">
                    MarketingAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">9. Termination</h2>
                  <p className="text-white/70 font-light leading-relaxed">
                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">10. Changes to Terms</h2>
                  <p className="text-white/70 font-light leading-relaxed">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">11. Contact Information</h2>
                  <p className="text-white/70 font-light leading-relaxed">
                    If you have any questions about these Terms of Service, please contact us at:
                    <br />
                    Email: info.knowherecorp@gmail.com
                    <br />
                    Phone: +917470712404
                    <br />
                    Address: Bhilai, CG, INDIA, 490020
                  </p>
                </div>
              </div>
            </div>
          </div>
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

export default Terms;
