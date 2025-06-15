
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { AIService } from '@/services/AIService';
import { 
  Brain, 
  TrendingUp, 
  Lightbulb, 
  Zap, 
  BarChart3,
  Settings,
  MessageSquare,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface AIInsight {
  id: string;
  type: string;
  content: string;
  confidence?: number;
  suggestions?: string[];
  timestamp: Date;
}

const AIBusinessDashboard = () => {
  const { toast } = useToast();
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [prompt, setPrompt] = useState('');
  const [context, setContext] = useState('');
  const [selectedType, setSelectedType] = useState<'analysis' | 'recommendation' | 'automation' | 'general'>('general');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(AIService.getApiKey() || '');
  const [isKeyValid, setIsKeyValid] = useState(false);

  const analysisTypes = [
    { value: 'analysis', label: 'Business Analysis', icon: BarChart3, color: 'from-blue-500 to-cyan-500' },
    { value: 'recommendation', label: 'Strategic Recommendations', icon: Lightbulb, color: 'from-green-500 to-emerald-500' },
    { value: 'automation', label: 'Process Automation', icon: Zap, color: 'from-purple-500 to-pink-500' },
    { value: 'general', label: 'General Business', icon: MessageSquare, color: 'from-orange-500 to-red-500' }
  ];

  const handleApiKeySubmit = async () => {
    if (!apiKey.trim()) return;
    
    setIsLoading(true);
    try {
      const isValid = await AIService.testApiKey(apiKey);
      if (isValid) {
        AIService.saveApiKey(apiKey);
        setIsKeyValid(true);
        toast({
          title: "Success",
          description: "OpenAI API key validated and saved successfully",
        });
      } else {
        toast({
          title: "Invalid API Key",
          description: "Please check your OpenAI API key and try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate API key",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateInsight = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Missing Input",
        description: "Please enter a business question or scenario",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await AIService.generateBusinessInsight({
        prompt,
        context,
        type: selectedType
      });

      const newInsight: AIInsight = {
        id: crypto.randomUUID(),
        type: selectedType,
        content: response.content,
        confidence: response.confidence,
        suggestions: response.suggestions,
        timestamp: new Date()
      };

      setInsights(prev => [newInsight, ...prev]);
      setPrompt('');
      
      toast({
        title: "AI Insight Generated",
        description: "Your business insight has been generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate insight",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeConfig = (type: string) => {
    return analysisTypes.find(t => t.value === type) || analysisTypes[3];
  };

  React.useEffect(() => {
    setIsKeyValid(!!AIService.getApiKey());
  }, []);

  if (!isKeyValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">AI Business Manager Setup</CardTitle>
              <p className="text-white/60">Enter your OpenAI API key to get started with AI-powered business insights</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">OpenAI API Key</label>
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                />
              </div>
              <Button 
                onClick={handleApiKeySubmit}
                disabled={isLoading || !apiKey.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Validating...
                  </>
                ) : (
                  <>
                    <Settings className="w-4 h-4 mr-2" />
                    Setup AI Manager
                  </>
                )}
              </Button>
              <p className="text-xs text-white/40 text-center">
                Get your API key from{' '}
                <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                  OpenAI Platform
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">AI Business Manager</h1>
          <p className="text-white/60">Leverage AI to optimize your business operations and strategy</p>
        </div>

        {/* Analysis Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {analysisTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card 
                key={type.value}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedType === type.value 
                    ? 'bg-gradient-to-br from-white/20 to-white/10 border-white/30 scale-105' 
                    : 'bg-gradient-to-br from-white/5 to-white/2 border-white/10 hover:from-white/10 hover:to-white/5'
                } backdrop-blur-xl`}
                onClick={() => setSelectedType(type.value as any)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-medium text-sm">{type.label}</h3>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Input Section */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              Business Intelligence Query
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Business Question or Scenario</label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., How can I improve customer retention in my SaaS business?"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Context (Optional)</label>
              <Textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Provide additional context about your business, industry, or specific situation..."
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
            <Button 
              onClick={handleGenerateInsight}
              disabled={isLoading || !prompt.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Insight...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Generate AI Insight
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Insights Display */}
        {insights.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">AI Generated Insights</h2>
            {insights.map((insight) => {
              const typeConfig = getTypeConfig(insight.type);
              const Icon = typeConfig.icon;
              
              return (
                <Card key={insight.id} className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${typeConfig.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-white">{typeConfig.label}</CardTitle>
                          <p className="text-white/60 text-sm">{insight.timestamp.toLocaleString()}</p>
                        </div>
                      </div>
                      {insight.confidence && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {Math.round(insight.confidence * 100)}% confidence
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="prose prose-invert max-w-none">
                      <p className="text-white/80 whitespace-pre-wrap">{insight.content}</p>
                    </div>
                    {insight.suggestions && insight.suggestions.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-white font-medium flex items-center">
                          <Lightbulb className="w-4 h-4 mr-2" />
                          Key Suggestions
                        </h4>
                        <div className="space-y-2">
                          {insight.suggestions.map((suggestion, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                              <p className="text-white/70 text-sm">{suggestion}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIBusinessDashboard;
