
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
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
  MessageSquare
} from "lucide-react";

const AI = () => {
  const capabilities = [
    {
      icon: Brain,
      title: "Advanced Neural Networks",
      description: "State-of-the-art AI models trained on vast datasets to understand marketing nuances and consumer behavior patterns.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "AI-powered audience segmentation that identifies and targets your ideal customers with surgical precision.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Eye,
      title: "Predictive Analytics",
      description: "Forecast market trends, customer behavior, and campaign performance before you launch.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Lightbulb,
      title: "Creative Intelligence",
      description: "Generate compelling content, designs, and campaigns that resonate with your target audience.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: BarChart3,
      title: "Real-time Optimization",
      description: "Continuously optimize campaigns in real-time based on performance data and market changes.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: MessageSquare,
      title: "Natural Language Processing",
      description: "Understand and generate human-like content that connects with your audience on an emotional level.",
      gradient: "from-teal-500 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-xl mb-8 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 transition-all duration-500">
            <Cpu className="w-5 h-5 mr-3 text-purple-400" />
            <span className="text-sm text-white/80 font-light">Powered by Advanced AI</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-extralight text-white mb-8 tracking-tight leading-none">
            Artificial
            <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Intelligence
            </span>
            <span className="block text-6xl md:text-8xl mt-4">
              That Works
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-white/50 max-w-4xl mx-auto font-light leading-relaxed mb-12">
            Experience the future of marketing with AI that understands your business, 
            predicts customer behavior, and creates campaigns that convert.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white h-16 px-10 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 group shadow-2xl shadow-purple-500/25">
                Experience AI Now
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Link to="/features">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-16 px-10 rounded-full text-lg font-light transition-all duration-300 hover:scale-105">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-extralight text-white mb-8 tracking-tight">
              AI Capabilities
            </h2>
            <p className="text-xl text-white/50 max-w-3xl mx-auto font-light leading-relaxed">
              Our AI doesn't just automate tasks—it thinks, learns, and evolves 
              to deliver results that exceed human capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <Card 
                key={index} 
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 backdrop-blur-xl hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5 transition-all duration-500 hover:scale-105 group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${capability.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <capability.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-light text-white mb-4 group-hover:text-white/90 transition-colors">
                    {capability.title}
                  </h3>
                  <p className="text-white/60 font-light leading-relaxed group-hover:text-white/70 transition-colors">
                    {capability.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Statistics Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl md:text-6xl font-extralight text-white mb-16 tracking-tight">
            AI Performance Metrics
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group cursor-pointer">
              <div className="text-6xl md:text-8xl font-extralight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                99.7%
              </div>
              <p className="text-xl text-white/60 font-light">Accuracy Rate</p>
            </div>
            <div className="group cursor-pointer">
              <div className="text-6xl md:text-8xl font-extralight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                10x
              </div>
              <p className="text-xl text-white/60 font-light">Faster Processing</p>
            </div>
            <div className="group cursor-pointer">
              <div className="text-6xl md:text-8xl font-extralight bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <p className="text-xl text-white/60 font-light">Continuous Learning</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-5xl md:text-7xl font-extralight text-white mb-8 tracking-tight leading-tight">
            Ready to Harness
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AI Power?
            </span>
          </h3>
          <p className="text-xl text-white/50 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            Join the AI revolution and transform your marketing with intelligence that never sleeps
          </p>
          <Link to="/signup">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white h-16 px-12 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 group shadow-2xl shadow-purple-500/25">
              Start AI Journey
              <Sparkles className="w-6 h-6 ml-3 group-hover:rotate-12 transition-transform duration-300" />
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

export default AI;
