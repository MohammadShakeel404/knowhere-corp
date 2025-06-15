
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Target,
  Loader2,
  Sparkles,
  BarChart3, 
  Lightbulb, 
  Zap, 
  MessageSquare
} from 'lucide-react';

interface InsightGenerationFormProps {
  onGenerate: (prompt: string, context: string, type: 'analysis' | 'recommendation' | 'automation' | 'general') => void;
  isLoading: boolean;
}

const InsightGenerationForm: React.FC<InsightGenerationFormProps> = ({
  onGenerate,
  isLoading
}) => {
  const [prompt, setPrompt] = useState('');
  const [context, setContext] = useState('');
  const [selectedType, setSelectedType] = useState<'analysis' | 'recommendation' | 'automation' | 'general'>('general');

  const analysisTypes = [
    { value: 'analysis', label: 'Analysis', icon: BarChart3, color: 'from-blue-500 to-cyan-500' },
    { value: 'recommendation', label: 'Strategy', icon: Lightbulb, color: 'from-green-500 to-emerald-500' },
    { value: 'automation', label: 'Automation', icon: Zap, color: 'from-purple-500 to-pink-500' },
    { value: 'general', label: 'General', icon: MessageSquare, color: 'from-orange-500 to-red-500' }
  ];

  const handleSubmit = () => {
    if (prompt.trim()) {
      onGenerate(prompt.trim(), context.trim(), selectedType);
      setPrompt('');
      setContext('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-xl font-bold text-gray-800">
          <Target className="w-6 h-6 mr-3 text-indigo-600" />
          Ask Your Business Question
        </CardTitle>
        <p className="text-gray-600 text-sm">
          Describe your business challenge or question for AI-powered insights
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 flex items-center">
            Question *
            <span className="text-xs text-gray-500 ml-2 font-normal">
              (Ctrl+Enter to submit)
            </span>
          </label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="e.g., How can I improve customer retention rates? What are the key factors affecting my sales performance?"
            className="min-h-[100px] text-sm resize-none border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
            rows={4}
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700">
            Additional Context
            <span className="text-xs text-gray-500 ml-2 font-normal">(Optional)</span>
          </label>
          <Textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="e.g., E-commerce business, 50+ employees, B2B focus, recent market changes..."
            className="text-sm resize-none border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
            rows={3}
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700">Insight Type</label>
          <Select value={selectedType} onValueChange={(value: any) => setSelectedType(value)}>
            <SelectTrigger className="w-full h-11 border-gray-200 focus:border-indigo-300 focus:ring-indigo-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg">
              {analysisTypes.map((type) => (
                <SelectItem key={type.value} value={type.value} className="focus:bg-indigo-50">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center`}>
                      <type.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="font-medium">{type.label}</span>
                      <p className="text-xs text-gray-500">
                        {type.value === 'analysis' && 'Data-driven insights and metrics'}
                        {type.value === 'recommendation' && 'Strategic suggestions and action plans'}
                        {type.value === 'automation' && 'Process optimization and efficiency'}
                        {type.value === 'general' && 'Comprehensive business guidance'}
                      </p>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleSubmit}
          disabled={isLoading || !prompt.trim()}
          className="w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-3 animate-spin" />
              Generating AI Insight...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-3" />
              Generate AI Insight
            </>
          )}
        </Button>

        {prompt.trim() && (
          <div className="text-xs text-gray-500 text-center">
            <span className="font-medium">Tip:</span> The more specific your question, the better the AI insight will be.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InsightGenerationForm;
