
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, MessageSquare, Brain, ArrowRight, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours."
    });
    setFormData({ name: "", email: "", company: "", subject: "", message: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "info.knowherecorp@gmail.com",
      description: "Send us an email anytime",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+917470712404",
      description: "Mon-Fri from 8am to 6pm IST",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Bhilai, CG, INDIA, 490020",
      description: "Come say hello at our office",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "< 24 hours",
      description: "Average response time",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Navigation />
      
      {/* Hero Section - Apple-style minimal */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/20 via-transparent to-neutral-900/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8 hover:bg-white/10 transition-all duration-500">
            <MessageSquare className="w-4 h-4 mr-2 text-white/60" />
            <span className="text-sm text-white/80 font-light">Let's connect</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extralight text-white mb-8 tracking-tight leading-none">
            Get in
            <span className="block bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Ready to transform your business?
            <br />
            We're here to help you succeed.
          </p>
        </div>
      </section>

      {/* Contact Grid - Cuberto-style layout */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
                  Connect with us
                </h2>
                <p className="text-lg text-white/60 font-light leading-relaxed">
                  Choose your preferred way to reach out. 
                  We're committed to responding within 24 hours.
                </p>
              </div>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index} 
                    className="group cursor-pointer"
                  >
                    <div className="flex items-start space-x-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${info.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-white mb-1 group-hover:text-white/80 transition-colors duration-300">
                          {info.title}
                        </h3>
                        <p className="text-white font-light mb-1 group-hover:text-white/90 transition-colors duration-300">
                          {info.value}
                        </p>
                        <p className="text-sm text-white/50 font-light">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl">
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-light text-white mb-3 tracking-tight">
                    Send us a message
                  </h3>
                  <p className="text-white/60 font-light">
                    Tell us about your project and we'll get back to you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-white/80 font-light text-sm">Name</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="bg-white/5 border-white/10 text-white placeholder-white/40 h-12 rounded-2xl focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/80 font-light text-sm">Email</Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="bg-white/5 border-white/10 text-white placeholder-white/40 h-12 rounded-2xl focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white/80 font-light text-sm">Company</Label>
                    <Input
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder-white/40 h-12 rounded-2xl focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                      placeholder="Your company"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white/80 font-light text-sm">Subject</Label>
                    <Select onValueChange={(value) => handleInputChange("subject", value)}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-2xl focus:border-white/30 focus:bg-white/10">
                        <SelectValue placeholder="What can we help you with?" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 border-white/10 backdrop-blur-xl">
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="demo">Request Demo</SelectItem>
                        <SelectItem value="pricing">Pricing Questions</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white/80 font-light text-sm">Message</Label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder-white/40 min-h-[120px] rounded-2xl focus:border-white/30 focus:bg-white/10 transition-all duration-300 resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-white text-black hover:bg-white/90 h-14 rounded-2xl text-lg font-medium transition-all duration-300 hover:scale-[1.02] group"
                  >
                    <span>Send Message</span>
                    <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-white/[0.02] to-white/[0.04] border border-white/10 rounded-3xl p-12 backdrop-blur-xl">
            <h3 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">
              Enterprise Solutions
            </h3>
            <p className="text-lg text-white/60 mb-8 font-light max-w-2xl mx-auto leading-relaxed">
              Building something bigger? Our enterprise team specializes in 
              custom AI solutions for large organizations.
            </p>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 h-12 px-8 rounded-full font-medium transition-all duration-300 hover:scale-105 group">
              Contact Enterprise Sales
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
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
              <a href="#" className="hover:text-white transition-colors font-light">Privacy</a>
              <a href="#" className="hover:text-white transition-colors font-light">Terms</a>
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

export default Contact;
