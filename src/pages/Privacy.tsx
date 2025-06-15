
import { Navigation } from "@/components/Navigation";
import { Brain } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Navigation />
      
      {/* Hero Section - Apple-style minimal */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/20 via-transparent to-neutral-900/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-extralight text-white mb-8 tracking-tight leading-none">
            Privacy
            <span className="block bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Last updated: December 15, 2024
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-12 backdrop-blur-xl">
            <div className="prose prose-lg prose-invert max-w-none">
              <div className="space-y-12">
                <div>
                  <h2 className="text-3xl font-light text-white mb-6">1. Introduction</h2>
                  <p className="text-white/70 font-light leading-relaxed">
                    MarketingAI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered marketing platform.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">2. Information We Collect</h2>
                  <h3 className="text-xl font-light text-white mb-4">Personal Information</h3>
                  <p className="text-white/70 font-light leading-relaxed mb-4">
                    We may collect personally identifiable information, such as:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-white/70 font-light">
                    <li>Name and contact information</li>
                    <li>Email address and phone number</li>
                    <li>Company and business information</li>
                    <li>Payment and billing information</li>
                    <li>Account credentials</li>
                  </ul>
                  
                  <h3 className="text-xl font-light text-white mb-4 mt-8">Usage Information</h3>
                  <p className="text-white/70 font-light leading-relaxed mb-4">
                    We automatically collect certain information when you use our service:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-white/70 font-light">
                    <li>Device information and browser type</li>
                    <li>IP address and location data</li>
                    <li>Usage patterns and preferences</li>
                    <li>Content created and campaigns generated</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">3. How We Use Your Information</h2>
                  <p className="text-white/70 font-light leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-white/70 font-light">
                    <li>Provide, operate, and maintain our services</li>
                    <li>Improve and personalize your experience</li>
                    <li>Process transactions and send billing information</li>
                    <li>Send administrative and marketing communications</li>
                    <li>Respond to customer service requests</li>
                    <li>Detect and prevent fraudulent activity</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">4. Information Sharing and Disclosure</h2>
                  <p className="text-white/70 font-light leading-relaxed mb-4">
                    We may share your information in the following situations:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-white/70 font-light">
                    <li>With service providers who assist in our operations</li>
                    <li>For business transfers or mergers</li>
                    <li>To comply with legal requirements</li>
                    <li>To protect our rights and safety</li>
                    <li>With your consent or at your direction</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">5. Data Security</h2>
                  <p className="text-white/70 font-light leading-relaxed">
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">6. Data Retention</h2>
                  <p className="text-white/70 font-light leading-relaxed">
                    We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">7. Your Privacy Rights</h2>
                  <p className="text-white/70 font-light leading-relaxed mb-4">
                    Depending on your location, you may have the following rights:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-white/70 font-light">
                    <li>Access to your personal information</li>
                    <li>Correction of inaccurate data</li>
                    <li>Deletion of your personal information</li>
                    <li>Restriction of processing</li>
                    <li>Data portability</li>
                    <li>Objection to processing</li>
                    <li>Withdrawal of consent</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">8. Cookies and Tracking Technologies</h2>
                  <p className="text-white/70 font-light leading-relaxed">
                    We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and deliver personalized content. You can control cookie settings through your browser preferences.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">9. Third-Party Services</h2>
                  <p className="text-white/70 font-light leading-relaxed">
                    Our service may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices of these third parties and encourage you to review their privacy policies.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">10. Children's Privacy</h2>
                  <p className="text-white/70 font-light leading-relaxed">
                    Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will take steps to delete the information.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">11. International Data Transfers</h2>
                  <p className="text-white/70 font-light leading-relaxed">
                    Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">12. Changes to This Privacy Policy</h2>
                  <p className="text-white/70 font-light leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-light text-white mb-6">13. Contact Us</h2>
                  <p className="text-white/70 font-light leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at:
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
              <Link to="/features" className="hover:text-white transition-colors font-light">Features</Link>
              <Link to="/pricing" className="hover:text-white transition-colors font-light">Pricing</Link>
              <Link to="/about" className="hover:text-white transition-colors font-light">About</Link>
              <Link to="/contact" className="hover:text-white transition-colors font-light">Contact</Link>
              <Link to="/terms" className="hover:text-white transition-colors font-light">Terms</Link>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/40">
            <p className="font-light">&copy; 2024 MarketingAI. All rights reserved. Transforming businesses with AI-powered marketing.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;
