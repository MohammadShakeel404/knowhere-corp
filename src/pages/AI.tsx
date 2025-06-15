
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Sparkles, 
  Zap, 
  Target, 
  TrendingUp, 
  ArrowRight,
  Cpu,
  Network,
  Eye,
  Lightbulb,
  BarChart3,
  MessageSquare,
  CheckCircle,
  Users,
  Award
} from "lucide-react";

const AI = () => {
  const capabilities = [
    {
      icon: Brain,
      title: "Business Intelligence",
      description: "AI-powered insights that analyze your business data and provide strategic recommendations for growth.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Target,
      title: "Strategic Analysis",
      description: "Generate comprehensive business analysis with actionable insights tailored to your industry and goals.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Track key metrics and identify patterns that drive business success with AI-powered analytics.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Lightbulb,
      title: "Innovation Insights",
      description: "Discover new opportunities and optimize processes with intelligent automation recommendations.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "Growth Optimization",
      description: "Leverage predictive analytics to forecast trends and optimize your business strategy.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Users,
      title: "Customer Intelligence",
      description: "Understand customer behavior patterns and improve retention through AI-driven insights.",
      gradient: "from-teal-500 to-blue-500"
    }
  ];

  const features = [
    {
      icon: CheckCircle,
      title: "Instant Insights",
      description: "Get immediate AI-powered business insights"
    },
    {
      icon: Brain,
      title: "Smart Analysis",
      description: "Advanced algorithms analyze your business data"
    },
    {
      icon: Target,
      title: "Strategic Guidance",
      description: "Actionable recommendations for growth"
    },
    {
      icon: Award,
      title: "Performance Tracking",
      description: "Monitor and optimize key business metrics"
    }
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 backdrop-blur-xl mb-6 sm:mb-8 hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-500">
            <Cpu className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 text-purple-300" />
            <span className="text-sm text-purple-100 font-medium">AI Business Intelligence Platform</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extralight text-white mb-6 sm:mb-8 tracking-tight leading-none">
            AI Business
            <span className="block bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent font-light">
              Manager
            </span>
            <span className="block text-3xl sm:text-5xl md:text-7xl mt-2 sm:mt-4 text-gray-100">
              That Delivers Results
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed mb-8 sm:mb-12 px-4">
            Transform your business with AI that generates actionable insights, 
            predicts market trends, and creates strategic recommendations that drive growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link to="/ai-business">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white h-14 sm:h-16 px-8 sm:px-10 rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:scale-105 group shadow-2xl shadow-purple-500/30 border-0 w-full sm:w-auto">
                Start Generating Insights
                <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Link to="/features">
              <Button variant="outline" className="border-gray-400 text-gray-200 hover:bg-gray-800 hover:text-white h-14 sm:h-16 px-8 sm:px-10 rounded-full text-base sm:text-lg font-light transition-all duration-300 hover:scale-105 bg-transparent w-full sm:w-auto">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Features Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-4 sm:mb-6 tracking-tight">
              Why Choose Our AI Business Manager?
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
              Get instant access to powerful business intelligence tools
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-gray-700/50 backdrop-blur-xl hover:bg-gradient-to-br hover:from-gray-800/90 hover:to-gray-700/70 transition-all duration-500 hover:scale-105 group cursor-pointer hover:border-gray-600/60 text-center"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-white mb-2 group-hover:text-gray-100 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-300 font-light leading-relaxed group-hover:text-gray-200 transition-colors">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Link to="/ai-business">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white h-12 sm:h-14 px-6 sm:px-8 rounded-full text-sm sm:text-base font-medium transition-all duration-300 hover:scale-105 group shadow-xl shadow-purple-500/20 border-0">
                Try It Now - It's Free
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 ml-2 group-hover:rotate-12 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="py-16 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extralight text-white mb-6 sm:mb-8 tracking-tight">
              AI Business Capabilities
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              Our AI doesn't just analyze data—it transforms it into strategic 
              business insights that drive real results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {capabilities.map((capability, index) => (
              <Card 
                key={index} 
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-gray-700/50 backdrop-blur-xl hover:bg-gradient-to-br hover:from-gray-800/90 hover:to-gray-700/70 transition-all duration-500 hover:scale-105 group cursor-pointer hover:border-gray-600/60"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${capability.gradient} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <capability.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-white mb-3 sm:mb-4 group-hover:text-gray-100 transition-colors">
                    {capability.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed group-hover:text-gray-200 transition-colors">
                    {capability.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Statistics Section */}
      <section className="py-16 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900/30 to-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-extralight text-white mb-12 sm:mb-16 tracking-tight">
            AI Performance Metrics
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="group cursor-pointer">
              <div className="text-4xl sm:text-5xl md:text-7xl font-extralight bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                99.7%
              </div>
              <p className="text-base sm:text-lg text-gray-300 font-light">Accuracy Rate</p>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl sm:text-5xl md:text-7xl font-extralight bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                10x
              </div>
              <p className="text-base sm:text-lg text-gray-300 font-light">Faster Processing</p>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl sm:text-5xl md:text-7xl font-extralight bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <p className="text-base sm:text-lg text-gray-300 font-light">Continuous Learning</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-extralight text-white mb-6 sm:mb-8 tracking-tight leading-tight">
            Ready to Transform
            <span className="block bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Your Business?
            </span>
          </h3>
          <p className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            Start generating AI-powered business insights in minutes. No setup required.
          </p>
          <Link to="/ai-business">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white h-14 sm:h-16 px-10 sm:px-12 rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:scale-105 group shadow-2xl shadow-purple-500/30 border-0">
              Start Your AI Journey
              <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 ml-2 sm:ml-3 group-hover:rotate-12 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-light text-white">AI Business Manager</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-gray-400">
              <Link to="/about" className="hover:text-white transition-colors font-light">About</Link>
              <Link to="/contact" className="hover:text-white transition-colors font-light">Contact</Link>
              <Link to="/privacy" className="hover:text-white transition-colors font-light">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors font-light">Terms</Link>
            </div>
          </div>
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800 text-center text-gray-500">
            <p className="font-light">&copy; 2024 AI Business Manager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AI;
