
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Sparkles } from 'lucide-react';

interface BusinessBrandingFormProps {
  onGenerate: (data: {
    businessName: string;
    industry: string;
    targetAudience: string;
    businessDescription: string;
    currentChallenges?: string;
    goals?: string;
  }) => void;
  isLoading: boolean;
}

const BusinessBrandingForm: React.FC<BusinessBrandingFormProps> = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    targetAudience: '',
    businessDescription: '',
    currentChallenges: '',
    goals: ''
  });

  const industries = [
    'Technology & Software',
    'Healthcare & Medical',
    'Finance & Banking',
    'Retail & E-commerce',
    'Food & Beverage',
    'Real Estate',
    'Education',
    'Manufacturing',
    'Consulting',
    'Marketing & Advertising',
    'Fashion & Beauty',
    'Travel & Tourism',
    'Fitness & Wellness',
    'Automotive',
    'Entertainment',
    'Non-Profit',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.industry || !formData.targetAudience || !formData.businessDescription) {
      return;
    }
    onGenerate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-0 bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-semibold text-gray-900 flex items-center justify-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          AI Business Branding Generator
        </CardTitle>
        <p className="text-gray-600 mt-2">
          Let AI create your complete brand identity and growth strategy
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="businessName" className="text-sm font-medium text-gray-700">
              Business Name *
            </Label>
            <Input
              id="businessName"
              placeholder="Enter your business name"
              value={formData.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              className="rounded-xl border-gray-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry" className="text-sm font-medium text-gray-700">
              Industry *
            </Label>
            <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
              <SelectTrigger className="rounded-xl border-gray-200 focus:border-blue-500">
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience" className="text-sm font-medium text-gray-700">
              Target Audience *
            </Label>
            <Input
              id="targetAudience"
              placeholder="e.g., Small business owners, millennials, tech professionals"
              value={formData.targetAudience}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
              className="rounded-xl border-gray-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessDescription" className="text-sm font-medium text-gray-700">
              Business Description *
            </Label>
            <Textarea
              id="businessDescription"
              placeholder="Describe what your business does, your unique selling points, and what makes you different"
              value={formData.businessDescription}
              onChange={(e) => handleInputChange('businessDescription', e.target.value)}
              className="rounded-xl border-gray-200 focus:border-blue-500 min-h-[100px] resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentChallenges" className="text-sm font-medium text-gray-700">
              Current Challenges (Optional)
            </Label>
            <Textarea
              id="currentChallenges"
              placeholder="What challenges is your business currently facing?"
              value={formData.currentChallenges}
              onChange={(e) => handleInputChange('currentChallenges', e.target.value)}
              className="rounded-xl border-gray-200 focus:border-blue-500 min-h-[80px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goals" className="text-sm font-medium text-gray-700">
              Business Goals (Optional)
            </Label>
            <Textarea
              id="goals"
              placeholder="What are your short-term and long-term business goals?"
              value={formData.goals}
              onChange={(e) => handleInputChange('goals', e.target.value)}
              className="rounded-xl border-gray-200 focus:border-blue-500 min-h-[80px] resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !formData.businessName || !formData.industry || !formData.targetAudience || !formData.businessDescription}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-xl font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Your Brand...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Brand & Strategy
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BusinessBrandingForm;
