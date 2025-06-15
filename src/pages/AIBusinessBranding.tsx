
import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import BusinessBrandingForm from '@/components/BusinessBrandingForm';
import BrandingResults from '@/components/BrandingResults';
import { BusinessBrandingService } from '@/services/BusinessBrandingService';

const AIBusinessBranding = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [brandingResults, setBrandingResults] = useState(null);

  const handleGenerateBranding = async (formData: {
    businessName: string;
    industry: string;
    targetAudience: string;
    businessDescription: string;
    currentChallenges?: string;
    goals?: string;
  }) => {
    setIsLoading(true);
    try {
      const results = await BusinessBrandingService.generateBusinessBranding(formData);
      setBrandingResults(results);
      toast({
        title: "Success!",
        description: "Your business branding and growth strategy has been generated.",
      });
    } catch (error) {
      console.error('Error generating branding:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate branding strategy",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setBrandingResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pt-20 sm:pt-24">
        <div className="max-w-7xl mx-auto">
          {!brandingResults ? (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                  AI Business Branding
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Get a complete brand identity and growth strategy tailored to your business niche
                </p>
              </div>
              
              <BusinessBrandingForm 
                onGenerate={handleGenerateBranding}
                isLoading={isLoading}
              />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center">
                <button
                  onClick={handleStartOver}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm mb-4"
                >
                  ← Generate New Strategy
                </button>
              </div>
              
              <BrandingResults results={brandingResults} />
            </div>
          )}
        </div>
      </div>
      
      <Toaster />
    </div>
  );
};

export default AIBusinessBranding;
