
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Palette, Share2, Megaphone, Code, Image, TrendingUp, Sparkles, Check } from "lucide-react";
import Navigation from "@/components/Navigation";

const ServiceDetails = () => {
  const { serviceSlug } = useParams();

  // Service data mapping
  const serviceData = {
    "ai-branding-suite": {
      icon: Palette,
      title: "AI Branding Suite",
      description: "Complete brand identity creation including logos, color schemes, typography, and brand guidelines - all from a simple prompt.",
      features: ["Logo Design", "Brand Guidelines", "Color Palettes", "Typography Selection"],
      gradient: "from-purple-500 to-pink-500",
      detailedFeatures: [
        "Professional logo design with multiple variations",
        "Comprehensive brand guidelines document",
        "Custom color palette with hex codes",
        "Typography recommendations and pairings",
        "Brand voice and messaging guidelines",
        "Social media brand kit"
      ],
      pricing: "$199/month",
      includes: "Unlimited logo variations, Brand guidelines PDF, Color palette export, Typography license"
    },
    "social-media-automation": {
      icon: Share2,
      title: "Social Media Automation",
      description: "Automated social media profile creation and content generation for all major platforms with intelligent scheduling.",
      features: ["Profile Setup", "Content Calendar", "Auto Posting", "Hashtag Optimization"],
      gradient: "from-blue-500 to-cyan-500",
      detailedFeatures: [
        "Automated profile setup across all platforms",
        "AI-generated content calendar",
        "Smart posting schedule optimization",
        "Hashtag research and optimization",
        "Cross-platform content adaptation",
        "Performance analytics and insights"
      ],
      pricing: "$149/month",
      includes: "5 social platforms, 30 posts/month, Analytics dashboard, Hashtag research"
    },
    "ai-ad-creator": {
      icon: Megaphone,
      title: "AI Ad Creator",
      description: "Generate high-converting advertisements for Google, Facebook, Instagram, and other platforms with AI-optimized copy and visuals.",
      features: ["Ad Copy Generation", "Visual Creation", "A/B Testing", "Performance Optimization"],
      gradient: "from-orange-500 to-red-500",
      detailedFeatures: [
        "AI-generated ad copy for multiple platforms",
        "Custom visual creation and optimization",
        "Automated A/B testing setup",
        "Performance tracking and optimization",
        "Budget optimization recommendations",
        "Campaign management dashboard"
      ],
      pricing: "$299/month",
      includes: "Unlimited ad variations, A/B testing, Performance analytics, Campaign optimization"
    },
    "website-and-app-builder": {
      icon: Code,
      title: "Website & App Builder",
      description: "Full-stack application and website development with complete source code, hosting setup, and deployment automation.",
      features: ["Custom Development", "Source Code", "Hosting Setup", "Mobile Responsive"],
      gradient: "from-green-500 to-emerald-500",
      detailedFeatures: [
        "Custom website and app development",
        "Complete source code ownership",
        "Automated hosting and deployment",
        "Mobile-responsive design",
        "SEO optimization built-in",
        "Ongoing maintenance and updates"
      ],
      pricing: "$499/month",
      includes: "Custom development, Source code, Hosting, SSL certificate, CDN"
    },
    "creative-studio": {
      icon: Image,
      title: "Creative Studio",
      description: "AI-powered illustration, graphic design, and video creation for all your marketing materials and social content.",
      features: ["Illustrations", "Video Creation", "Graphic Design", "Animation"],
      gradient: "from-indigo-500 to-purple-500",
      detailedFeatures: [
        "Custom AI-generated illustrations",
        "Professional video creation and editing",
        "Graphic design for all marketing materials",
        "Animation and motion graphics",
        "Brand-consistent visual assets",
        "High-resolution export options"
      ],
      pricing: "$249/month",
      includes: "Unlimited designs, Video creation, Animation, High-res exports"
    },
    "seo-optimizer": {
      icon: TrendingUp,
      title: "SEO Optimizer",
      description: "Comprehensive SEO analysis and optimization including keyword research, content optimization, and technical SEO.",
      features: ["Keyword Research", "Content Optimization", "Technical SEO", "Performance Tracking"],
      gradient: "from-teal-500 to-blue-500",
      detailedFeatures: [
        "Advanced keyword research and analysis",
        "Content optimization recommendations",
        "Technical SEO audit and fixes",
        "Performance tracking and reporting",
        "Competitor analysis",
        "Local SEO optimization"
      ],
      pricing: "$179/month",
      includes: "Keyword research, SEO audit, Content optimization, Monthly reports"
    }
  };

  const service = serviceData[serviceSlug as keyof typeof serviceData];

  if (!service) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Navigation />
        <div className="text-center">
          <h1 className="text-4xl font-light text-white mb-4">Service Not Found</h1>
          <Link to="/features">
            <Button className="bg-white text-black hover:bg-white/90">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Features
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { icon: Icon } = service;

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/features" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Features
          </Link>
          
          <div className="flex items-center space-x-6 mb-8">
            <div className={`w-20 h-20 bg-gradient-to-r ${service.gradient} rounded-3xl flex items-center justify-center`}>
              <Icon className="w-10 h-10 text-white" />
            </div>
            <div>
              <Badge className="mb-4 bg-white/10 text-white border-white/20 backdrop-blur-md px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Premium Service
              </Badge>
              <h1 className="text-4xl md:text-5xl font-light text-white leading-tight">
                {service.title}
              </h1>
            </div>
          </div>
          
          <p className="text-xl text-white/60 mb-12 font-light leading-relaxed">
            {service.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/signup">
              <Button className="bg-white text-black hover:bg-white/90 px-8 py-4 rounded-full text-lg font-medium">
                Get Started - {service.pricing}
              </Button>
            </Link>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-light">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Features List */}
            <div>
              <h2 className="text-3xl font-light text-white mb-8">What's Included</h2>
              <div className="space-y-4">
                {service.detailedFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                      <Check className="w-3 h-3 text-green-400" />
                    </div>
                    <span className="text-white/80 font-light leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Card */}
            <div>
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                <h3 className="text-2xl font-light text-white mb-4">Pricing</h3>
                <div className="mb-6">
                  <span className="text-4xl font-light text-white">{service.pricing}</span>
                  <span className="text-white/60 ml-2">per month</span>
                </div>
                <p className="text-white/70 mb-6 font-light leading-relaxed">
                  {service.includes}
                </p>
                <Link to="/signup" className="block">
                  <Button className="w-full bg-white text-black hover:bg-white/90 py-4 rounded-full text-lg font-medium">
                    Start Free Trial
                  </Button>
                </Link>
                <p className="text-white/50 text-sm text-center mt-4 font-light">
                  14-day free trial • No credit card required
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-light text-white mb-6">
            Ready to Get Started?
          </h3>
          <p className="text-xl text-white/60 mb-8 font-light">
            Join thousands of businesses already using our AI-powered services
          </p>
          <Link to="/signup">
            <Button className="bg-white text-black hover:bg-white/90 px-12 py-4 rounded-full text-lg font-medium">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetails;
