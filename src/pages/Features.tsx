
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Palette, Share2, Megaphone, Code, Image, TrendingUp, Brain, ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const Features = () => {
  const services = [
    {
      icon: Palette,
      title: "AI Branding Suite",
      description: "Complete brand identity creation including logos, color schemes, typography, and brand guidelines - all from a simple prompt.",
      features: ["Logo Design", "Brand Guidelines", "Color Palettes", "Typography Selection"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Share2,
      title: "Social Media Automation",
      description: "Automated social media profile creation and content generation for all major platforms with intelligent scheduling.",
      features: ["Profile Setup", "Content Calendar", "Auto Posting", "Hashtag Optimization"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Megaphone,
      title: "AI Ad Creator",
      description: "Generate high-converting advertisements for Google, Facebook, Instagram, and other platforms with AI-optimized copy and visuals.",
      features: ["Ad Copy Generation", "Visual Creation", "A/B Testing", "Performance Optimization"],
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Code,
      title: "Website & App Builder",
      description: "Full-stack application and website development with complete source code, hosting setup, and deployment automation.",
      features: ["Custom Development", "Source Code", "Hosting Setup", "Mobile Responsive"],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Image,
      title: "Creative Studio",
      description: "AI-powered illustration, graphic design, and video creation for all your marketing materials and social content.",
      features: ["Illustrations", "Video Creation", "Graphic Design", "Animation"],
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: TrendingUp,
      title: "SEO Optimizer",
      description: "Comprehensive SEO analysis and optimization including keyword research, content optimization, and technical SEO.",
      features: ["Keyword Research", "Content Optimization", "Technical SEO", "Performance Tracking"],
      gradient: "from-teal-500 to-blue-500"
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
            <Sparkles className="w-4 h-4 mr-2 text-white/60" />
            <span className="text-sm text-white/80 font-light">Comprehensive Features</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extralight text-white mb-8 tracking-tight leading-none">
            Everything You Need to
            <span className="block bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              Scale Your Business
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            From brand creation to advanced analytics, our AI-powered platform provides 
            all the tools you need to build and grow your digital presence.
          </p>
        </div>
      </section>

      {/* Features Grid - Cuberto-style layout */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-6xl font-extralight text-white mb-8 tracking-tight leading-tight">
            Ready to Get
            <span className="block">Started?</span>
          </h3>
          <p className="text-xl text-white/50 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            Join thousands of businesses already using AI to transform their marketing
          </p>
          <Link to="/signup">
            <Button className="bg-white text-black hover:bg-white/90 h-14 px-12 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 group">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
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
              <span className="text-xl font-light text-white">Knowhere Corp</span>
            </div>
            <div className="flex space-x-8 text-white/60">
              <Link to="/about" className="hover:text-white transition-colors font-light">About</Link>
              <Link to="/contact" className="hover:text-white transition-colors font-light">Contact</Link>
              <Link to="/privacy" className="hover:text-white transition-colors font-light">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors font-light">Terms</Link>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/40">
            <p className="font-light">&copy; 2024 Knowhere Corp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Features;
