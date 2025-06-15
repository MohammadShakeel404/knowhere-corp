
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Palette, Share2, Megaphone, Code, Image, TrendingUp, Brain, ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { Navigation } from "@/components/Navigation";
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
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-md px-6 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Comprehensive Features
          </Badge>
          <h1 className="text-5xl md:text-6xl font-light text-white mb-6">
            Everything You Need to
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              Scale Your Business
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto font-light">
            From brand creation to advanced analytics, our AI-powered platform provides 
            all the tools you need to build and grow your digital presence.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-light text-white mb-8">
            Ready to Get Started?
          </h3>
          <p className="text-xl text-white/60 mb-12 font-light">
            Join thousands of businesses already using AI to transform their marketing
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-black hover:bg-white/90 font-medium px-12 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8 bg-black">
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
              <a href="#" className="hover:text-white transition-colors font-light">Privacy</a>
              <a href="#" className="hover:text-white transition-colors font-light">Terms</a>
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

export default Features;
