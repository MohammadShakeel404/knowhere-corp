
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, Palette, Share2, Megaphone, Code, Image, TrendingUp, Zap, ArrowRight, Star, Users, Globe } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";

const Index = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-md bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">MarketingAI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white hover:text-purple-300">
                Features
              </Button>
              <Button variant="ghost" className="text-white hover:text-purple-300">
                Pricing
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <HeroSection />
      <StatsSection />

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Sparkles className="w-4 h-4 mr-1" />
              AI-Powered Services
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6">
              Everything Your Business Needs
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From branding to deployment, our AI handles every aspect of your digital marketing strategy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Automated Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30">
                <Zap className="w-4 h-4 mr-1" />
                Full Automation
              </Badge>
              <h3 className="text-3xl font-bold text-white mb-6">
                Connect. Describe. Watch Magic Happen.
              </h3>
              <p className="text-lg text-gray-300 mb-8">
                Simply connect your social media accounts, tell us your niche, and our AI will create and publish 
                engaging content across all platforms - reels, images, long-form posts - with optimized captions 
                and hashtags, completely hands-free.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <span className="text-white">Connect your social media accounts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <span className="text-white">Describe your business niche</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <span className="text-white">AI creates and publishes content automatically</span>
                </div>
              </div>
              <Button className="mt-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-lg px-8 py-3">
                Start Automation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">Content Pipeline</span>
                    <Badge className="bg-green-500/20 text-green-300">Active</Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Image className="w-5 h-5 text-blue-400" />
                        <span className="text-white text-sm">Instagram Reel</span>
                      </div>
                      <p className="text-gray-300 text-sm">Posted 2 hours ago • 1.2K views</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Share2 className="w-5 h-5 text-purple-400" />
                        <span className="text-white text-sm">LinkedIn Article</span>
                      </div>
                      <p className="text-gray-300 text-sm">Scheduled for tomorrow • 847 impressions</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Image className="w-5 h-5 text-pink-400" />
                        <span className="text-white text-sm">Facebook Post</span>
                      </div>
                      <p className="text-gray-300 text-sm">Publishing now • Engagement boost detected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Digital Marketing?
          </h3>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of businesses already using AI to scale their marketing efforts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-4">
              Start Free Trial
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 text-lg px-8 py-4">
              Watch Demo
            </Button>
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
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
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

export default Index;
