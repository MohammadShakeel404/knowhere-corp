
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Play } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center">
          <Badge className="mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Next-Generation AI Marketing Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Transform Your Business with
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> AI Marketing</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            One platform, infinite possibilities. Create brands, build websites, generate content, 
            manage social media, and scale your business - all powered by advanced AI and simple prompts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-10 py-4 shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
              Start Building Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 text-lg px-10 py-4 backdrop-blur-sm">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Hero Visual */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-6 border border-purple-500/30">
                  <div className="text-purple-300 text-sm font-medium mb-2">Brand Creation</div>
                  <div className="text-white font-semibold">Logo designed ✓</div>
                  <div className="text-gray-300 text-sm mt-1">Brand guidelines generated</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-6 border border-blue-500/30">
                  <div className="text-blue-300 text-sm font-medium mb-2">Content Pipeline</div>
                  <div className="text-white font-semibold">47 posts scheduled ✓</div>
                  <div className="text-gray-300 text-sm mt-1">Cross-platform publishing</div>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-6 border border-green-500/30">
                  <div className="text-green-300 text-sm font-medium mb-2">Website Built</div>
                  <div className="text-white font-semibold">Deployed & Live ✓</div>
                  <div className="text-gray-300 text-sm mt-1">Source code provided</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
