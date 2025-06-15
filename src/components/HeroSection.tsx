import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Play } from "lucide-react";
import LottiePlayer from "@/components/LottiePlayer";
import mockAnimation from "./lottie/mock-cube-animation.json";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-black text-white px-0 py-0">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-black to-neutral-900"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl bg-purple-500 opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl bg-blue-500 opacity-20 animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto relative z-10 text-center py-32">
        <div className="max-w-6xl mx-auto">
          {/* Premium badge */}
          <div className="mb-8 inline-flex">
            <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-md px-6 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Marketing Suite
            </Badge>
          </div>
          
          {/* Main headline */}
          <h1 className="font-display font-light text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight mb-8">
            <span className="block text-white">Effortless</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
              AI Marketing
            </span>
            <span className="block text-white/80 text-4xl md:text-5xl lg:text-6xl mt-4">
              for Modern Businesses
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-12 max-w-4xl mx-auto">
            Transform your business with AI that creates brands, builds websites, 
            manages social media, and drives growth—all from simple prompts.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/90 font-medium px-12 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105"
            >
              Start for Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-md font-medium px-12 py-4 rounded-full text-lg transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
          
          {/* Enhanced Animation Section */}
          <div className="flex justify-center relative">
            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-purple-400/60 rounded-full animate-pulse delay-300"></div>
              <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-bounce delay-700"></div>
              <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-pink-400/50 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-cyan-400/60 rounded-full animate-bounce delay-500"></div>
            </div>
            
            {/* Main animation container */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-700"></div>
              
              {/* Orbiting elements */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                <div className="absolute -top-4 left-1/2 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transform -translate-x-1/2"></div>
                <div className="absolute top-1/2 -right-4 w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transform -translate-y-1/2"></div>
                <div className="absolute -bottom-4 left-1/2 w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full transform -translate-x-1/2"></div>
                <div className="absolute top-1/2 -left-4 w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transform -translate-y-1/2"></div>
              </div>
              
              <LottiePlayer
                animationData={mockAnimation as any}
                className="relative w-[280px] md:w-[400px] h-[280px] md:h-[400px] opacity-90 group-hover:scale-105 transition-transform duration-500"
                ariaLabel="AI Marketing Animation"
              />
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
