
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Target, 
  BarChart3,
  CheckCircle
} from 'lucide-react';

interface OnboardingTourProps {
  onComplete: () => void;
  onSkip: () => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to AI Business Manager",
      description: "Your intelligent business companion for generating insights, analyzing data, and making strategic decisions.",
      icon: Sparkles,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Generate AI Insights",
      description: "Ask questions about your business, get strategic recommendations, and discover automation opportunities.",
      icon: Target,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Track Your Progress",
      description: "All insights are automatically saved and organized. View analytics to understand your business patterns.",
      icon: BarChart3,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "You're All Set!",
      description: "Start by generating your first insight or explore existing analytics. Your business intelligence journey begins now.",
      icon: CheckCircle,
      color: "from-orange-500 to-red-500"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
        <CardContent className="p-8 text-center relative">
          <Button
            onClick={onSkip}
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </Button>

          <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${currentStepData.color} rounded-2xl flex items-center justify-center shadow-lg`}>
            <IconComponent className="w-8 h-8 text-white" />
          </div>

          <Badge variant="secondary" className="mb-4">
            Step {currentStep + 1} of {steps.length}
          </Badge>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {currentStepData.title}
          </h3>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {currentStepData.description}
          </p>

          <div className="flex items-center justify-between">
            <Button
              onClick={handlePrev}
              variant="outline"
              disabled={currentStep === 0}
              className="rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-gray-900' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingTour;
