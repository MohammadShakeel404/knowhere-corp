
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, LucideIcon } from "lucide-react";

interface ServiceCardProps {
  service: {
    icon: LucideIcon;
    title: string;
    description: string;
    features: string[];
    gradient: string;
  };
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const { icon: Icon, title, description, features, gradient } = service;

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group cursor-pointer hover:scale-105 hover:shadow-2xl">
      <CardHeader>
        <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-white text-xl mb-2">{title}</CardTitle>
        <CardDescription className="text-gray-300 text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className={`w-2 h-2 bg-gradient-to-r ${gradient} rounded-full`}></div>
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:text-purple-300 hover:bg-white/5 group p-0"
        >
          Explore Service
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
        </Button>
      </CardContent>
    </Card>
  );
};
