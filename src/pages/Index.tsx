
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, Palette, Share2, Megaphone, Code, Image, TrendingUp, Zap, ArrowRight, Star, Users, Globe } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen bg-black">
      <Navigation />

      <HeroSection />
      <StatsSection />

      {/* Services Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-md px-6 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Services
            </Badge>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              Everything Your Business Needs
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto font-light">
              From branding to deployment, our AI handles every aspect of your digital marketing strategy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Automated Content Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-500/30 backdrop-blur-md px-6 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Full Automation
              </Badge>
              <h3 className="text-4xl md:text-5xl font-light text-white mb-8">
                Connect. Describe. <br />
                <span className="text-white/60">Watch Magic Happen.</span>
              </h3>
              <p className="text-lg text-white/70 mb-12 font-light leading-relaxed">
                Simply connect your social media accounts, tell us your niche, and our AI will create and publish 
                engaging content across all platforms - reels, images, long-form posts - with optimized captions 
                and hashtags, completely hands-free.
              </p>
              <div className="space-y-6 mb-12">
                {[
                  "Connect your social media accounts",
                  "Describe your business niche", 
                  "AI creates and publishes content automatically"
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-green-500/20 backdrop-blur-md rounded-full flex items-center justify-center border border-green-500/30">
                      <span className="text-green-300 font-medium text-sm">{index + 1}</span>
                    </div>
                    <span className="text-white/80 font-light">{step}</span>
                  </div>
                ))}
              </div>
              <Link to="/signup">
                <Button className="bg-white text-black hover:bg-white/90 font-medium px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105">
                  Start Automation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-light">Content Pipeline</span>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Active</Badge>
                  </div>
                  <div className="space-y-4">
                    {[
                      { icon: Image, platform: "Instagram Reel", status: "Posted 2 hours ago • 1.2K views", color: "blue" },
                      { icon: Share2, platform: "LinkedIn Article", status: "Scheduled for tomorrow • 847 impressions", color: "purple" },
                      { icon: Image, platform: "Facebook Post", status: "Publishing now • Engagement boost detected", color: "pink" }
                    ].map((item, index) => (
                      <div key={index} className="bg-white/[0.02] rounded-2xl p-4 border border-white/5">
                        <div className="flex items-center space-x-3 mb-2">
                          <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                          <span className="text-white text-sm font-light">{item.platform}</span>
                        </div>
                        <p className="text-white/60 text-sm font-light">{item.status}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-light text-white mb-8">
            Ready to Transform Your <br />
            <span className="text-white/60">Digital Marketing?</span>
          </h3>
          <p className="text-xl text-white/60 mb-12 font-light">
            Join thousands of businesses already using AI to scale their marketing efforts
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 font-medium px-12 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105">
                Start Free Trial
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-md font-light px-12 py-4 rounded-full text-lg">
              Watch Demo
            </Button>
          </div>
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
            <p className="font-light">&copy; 2024 MarketingAI. All rights reserved. Transforming businesses with AI-powered marketing.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
