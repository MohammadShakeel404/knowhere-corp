
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  service: {
    icon: LucideIcon;
    title: string;
    description: string;
    features: string[];
    gradient: string;
  };
  index: number;
}

export const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const { icon: Icon, title, description, features } = service;
  
  // Convert title to URL-friendly slug
  const serviceSlug = title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');

  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl blur-xl group-hover:from-white/10 group-hover:to-white/5 transition-all duration-500"></div>
      <Card className="relative bg-white/[0.02] border-white/10 backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-500 group cursor-pointer rounded-3xl overflow-hidden">
        <CardHeader className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <span className="text-white/40 text-sm font-mono">0{index + 1}</span>
          </div>
          
          <CardTitle className="text-white text-2xl font-light mb-4 leading-tight">
            {title}
          </CardTitle>
          <CardDescription className="text-white/60 text-base leading-relaxed font-light">
            {description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8 pt-0">
          <div className="space-y-3 mb-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                <span className="text-white/70 text-sm font-light">{feature}</span>
              </div>
            ))}
          </div>
          
          <Link to={`/services/${serviceSlug}`}>
            <Button 
              variant="ghost" 
              className="text-white/80 hover:text-white hover:bg-white/10 group/btn p-0 h-auto font-light"
            >
              Explore Service
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
