
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  Zap, 
  PieChart,
  ArrowRight
} from 'lucide-react';

interface InsightTemplatesProps {
  onSelectTemplate: (prompt: string, context: string, type: 'analysis' | 'recommendation' | 'automation' | 'general') => void;
}

const InsightTemplates: React.FC<InsightTemplatesProps> = ({ onSelectTemplate }) => {
  const templates = [
    {
      title: "Revenue Analysis",
      description: "Analyze revenue trends and identify growth opportunities",
      prompt: "Analyze my business revenue trends and identify key growth opportunities",
      context: "Focus on quarterly performance, seasonal patterns, and market factors",
      type: "analysis" as const,
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      category: "Financial"
    },
    {
      title: "Customer Retention Strategy",
      description: "Develop strategies to improve customer loyalty and reduce churn",
      prompt: "Create a comprehensive customer retention strategy for my business",
      context: "Consider customer lifecycle, satisfaction metrics, and competitive advantages",
      type: "recommendation" as const,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      category: "Customer"
    },
    {
      title: "Cost Optimization",
      description: "Identify areas to reduce costs without compromising quality",
      prompt: "Analyze my business operations and identify cost optimization opportunities",
      context: "Review operational expenses, vendor relationships, and process efficiency",
      type: "analysis" as const,
      icon: DollarSign,
      color: "from-orange-500 to-red-500",
      category: "Financial"
    },
    {
      title: "Marketing ROI Analysis",
      description: "Evaluate marketing effectiveness and optimize spending",
      prompt: "Analyze my marketing ROI and suggest optimization strategies",
      context: "Consider different channels, campaign performance, and customer acquisition costs",
      type: "analysis" as const,
      icon: Target,
      color: "from-purple-500 to-pink-500",
      category: "Marketing"
    },
    {
      title: "Process Automation",
      description: "Identify processes that can be automated to increase efficiency",
      prompt: "Identify business processes that can be automated and suggest implementation approaches",
      context: "Focus on repetitive tasks, workflow bottlenecks, and technology solutions",
      type: "automation" as const,
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      category: "Operations"
    },
    {
      title: "Market Positioning",
      description: "Analyze market position and competitive advantages",
      prompt: "Analyze my market positioning and suggest competitive differentiation strategies",
      context: "Consider industry trends, competitor analysis, and unique value propositions",
      type: "recommendation" as const,
      icon: PieChart,
      color: "from-indigo-500 to-purple-500",
      category: "Strategy"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Quick Start Templates</h3>
        <p className="text-gray-600">Choose a template to generate insights faster</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {templates.map((template, index) => {
          const IconComponent = template.icon;
          return (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => onSelectTemplate(template.prompt, template.context, template.type)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${template.color} rounded-xl flex items-center justify-center shadow-md`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs px-2 py-1 rounded-lg">
                    {template.category}
                  </Badge>
                </div>

                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {template.title}
                </h4>
                
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {template.description}
                </p>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full group-hover:bg-gray-50 transition-colors rounded-xl text-sm"
                >
                  Use Template
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default InsightTemplates;
