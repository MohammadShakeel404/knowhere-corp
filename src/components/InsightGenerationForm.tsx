
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

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-base">
          <Target className="w-4 h-4 mr-2" />
          Business Query
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700">
            Question *
          </label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="How can I improve customer retention?"
            className="min-h-[80px] text-sm resize-none"
            rows={3}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700">
            Context (Optional)
          </label>
          <Textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Additional business context..."
            className="text-sm resize-none"
            rows={2}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700">Type</label>
          <Select value={selectedType} onValueChange={(value: any) => setSelectedType(value)}>
            <SelectTrigger className="w-full h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {analysisTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center space-x-2">
                    <type.icon className="w-3 h-3" />
                    <span>{type.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button 
          onClick={handleSubmit}
          disabled={isLoading || !prompt.trim()}
          className="w-full h-9 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-3 h-3 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3 mr-2" />
              Generate Insight
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default InsightGenerationForm;
