
import { Navigation } from "@/components/Navigation";
import { ServiceCard } from "@/components/ServiceCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Share2, Megaphone, Code, Image, TrendingUp, Sparkles, CheckCircle, ArrowRight, Brain } from "lucide-react";
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

  const keyFeatures = [
    "One-click brand creation from business description",
    "Automated social media content generation and posting",
    "AI-powered ad copy and visual creation",
    "Full website development with source code",
    "SEO optimization and analytics",
    "Multi-platform integration and management",
    "Real-time performance tracking",
    "24/7 AI-powered customer support"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
            <Sparkles className="w-4 h-4 mr-1" />
            Complete Feature Suite
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-6">
            Everything You Need for <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Digital Marketing Success</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Our AI-powered platform provides comprehensive digital marketing solutions that work together seamlessly to grow your business.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Key Platform Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover what makes our AI marketing platform the most comprehensive solution available.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keyFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span className="text-white text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Experience All Features?
          </h3>
          <p className="text-xl text-gray-300 mb-10">
            Start your free trial today and see how our AI can transform your marketing efforts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-4">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 text-lg px-8 py-4">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">MarketingAI</span>
            </div>
            <div className="flex space-x-6 text-gray-400">
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; 2024 MarketingAI. All rights reserved. Transforming businesses with AI-powered marketing.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Features;
