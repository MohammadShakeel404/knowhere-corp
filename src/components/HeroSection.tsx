import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Play } from "lucide-react";
import LottiePlayer from "@/components/LottiePlayer";
import mockAnimation from "./lottie/mock-cube-animation.json";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden min-h-[70vh] flex items-center bg-white text-brand-purple px-0 py-0">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-brand-purple/[0.08] via-brand-yellow/[0.06] to-brand-purple/[0.10]"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[32rem] h-[32rem] rounded-full blur-[160px] bg-brand-purple opacity-10 pointer-events-none"></div>
      </div>
      <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 py-24">
        <div className="w-full md:w-1/2 flex flex-col items-start md:items-start animate-fade-in">
          <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-tight tracking-tighter bg-gradient-to-r from-brand-purple to-brand-yellow text-transparent bg-clip-text mb-6 drop-shadow-[0_10px_10px_rgba(93,58,183,0.1)]">
            Effortless AI Marketing for <span className="whitespace-nowrap">Modern Businesses</span>
          </h1>
          <p className="text-brand-purple text-lg md:text-xl font-medium mb-8 max-w-xl leading-relaxed opacity-80">
            Instantly create a powerful brand, social presence, campaigns, website, SEO and more—just by describing your business. As simple as using prompts.
          </p>
          <div className="flex gap-4 mt-2">
            <button className="bg-brand-purple hover:bg-brand-yellow hover:text-brand-purple text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition duration-300">
              Start for Free
            </button>
            <button className="bg-transparent border border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
              Watch Demo
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end animate-fade-in delay-200">
          <LottiePlayer
            animationData={mockAnimation as any}
            className="w-[340px] md:w-[420px] h-[340px] md:h-[420px] drop-shadow-xl"
            ariaLabel="Animated branding illustration"
          />
        </div>
      </div>
    </section>
  );
};
