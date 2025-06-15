
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { AIService } from '@/services/AIService';
import { BusinessAnalyticsService } from '@/services/BusinessAnalyticsService';
import BusinessInsightCard from '@/components/BusinessInsightCard';
import BusinessDashboardStats from '@/components/BusinessDashboardStats';
import { 
  Brain, 
  TrendingUp, 
  Lightbulb, 
  Zap, 
  BarChart3,
  Settings,
  MessageSquare,
  Loader2,
  Download,
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Sparkles,
  Target,
  Bot
} from 'lucide-react';

interface AIInsight {
  id: string;
  type: string;
  content: string;
  confidence?: number;
  suggestions?: string[];
  timestamp: Date;
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  actionItems?: string[];
}

const AIBusinessDashboard = () => {
  const { toast } = useToast();
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [prompt, setPrompt] = useState('');
  const [context, setContext] = useState('');
  const [selectedType, setSelectedType] = useState<'analysis' | 'recommendation' | 'automation' | 'general'>('general');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isKeyValid, setIsKeyValid] = useState(true);
  const [isTestingKey, setIsTestingKey] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const analysisTypes = [
    { value: 'analysis', label: 'Business Analysis', icon: BarChart3, color: 'from-blue-500 to-cyan-500', description: 'Data-driven insights and performance metrics' },
    { value: 'recommendation', label: 'Strategic Recommendations', icon: Lightbulb, color: 'from-green-500 to-emerald-500', description: 'Actionable strategies and next steps' },
    { value: 'automation', label: 'Process Automation', icon: Zap, color: 'from-purple-500 to-pink-500', description: 'Streamline workflows and operations' },
    { value: 'general', label: 'General Business', icon: MessageSquare, color: 'from-orange-500 to-red-500', description: 'General business guidance and advice' }
  ];

  // Check for existing API key on component mount
  useEffect(() => {
    const existingKey = AIService.getApiKey();
    if (existingKey) {
      setApiKey(existingKey);
      setIsKeyValid(true);
    }
  }, []);

  const handleApiKeySubmit = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Missing API Key",
        description: "Please enter your OpenAI API key",
        variant: "destructive",
      });
      return;
    }
    
    setIsTestingKey(true);
    try {
      const isValid = await AIService.testApiKey(apiKey);
      if (isValid) {
        AIService.saveApiKey(apiKey);
        setIsKeyValid(true);
        setShowApiKeyInput(false);
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
        description: "Failed to validate API key. Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsTestingKey(false);
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
        prompt: prompt.trim(),
        context: context.trim() || undefined,
        type: selectedType
      });

      const { category, priority } = BusinessAnalyticsService.categorizeInsight(response.content, selectedType);
      
      const newInsight: AIInsight = {
        id: BusinessAnalyticsService.generateInsightId(),
        type: selectedType,
        content: response.content,
        confidence: response.confidence,
        suggestions: response.suggestions,
        timestamp: new Date(),
        category,
        priority,
        actionItems: response.actionItems
      };

      setInsights(prev => [newInsight, ...prev]);
      setPrompt('');
      setContext('');
      
      toast({
        title: "AI Insight Generated",
        description: `Your ${selectedType} insight has been generated successfully`,
      });
    } catch (error) {
      console.error('Error generating insight:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate insight",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportInsight = (insight: AIInsight) => {
    try {
      const data = {
        id: insight.id,
        timestamp: insight.timestamp.toISOString(),
        type: insight.type,
        category: insight.category,
        priority: insight.priority,
        confidence: insight.confidence,
        content: insight.content,
        suggestions: insight.suggestions,
        actionItems: insight.actionItems
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `insight-${insight.id}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "Insight Exported",
        description: "Insight has been exported successfully",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export insight. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSaveInsight = (insight: AIInsight) => {
    // In a real app, this would save to a database
    toast({
      title: "Insight Saved",
      description: "Insight has been saved to your workspace",
    });
  };

  const handleExportAll = () => {
    if (insights.length === 0) {
      toast({
        title: "No Data",
        description: "No insights available to export",
        variant: "destructive",
      });
      return;
    }

    try {
      const csvContent = BusinessAnalyticsService.exportInsights(insights);
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `business-insights-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "All Insights Exported",
        description: "All insights have been exported to CSV",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export insights. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleResetApiKey = () => {
    AIService.clearApiKey();
    setApiKey('');
    setIsKeyValid(false);
    setShowApiKeyInput(true);
    toast({
      title: "API Key Reset",
      description: "API key has been cleared. Please enter a new one.",
    });
  };

  const getTypeConfig = (type: string) => {
    return analysisTypes.find(t => t.value === type) || analysisTypes[3];
  };

  const filteredInsights = insights.filter(insight => {
    const matchesSearch = !searchFilter || 
      insight.content.toLowerCase().includes(searchFilter.toLowerCase()) ||
      insight.category?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      insight.type.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesType = typeFilter === 'all' || insight.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const analytics = BusinessAnalyticsService.generateAnalytics(insights);

  // API Key Setup Screen
  if (!isKeyValid || showApiKeyInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  AI Business Manager
                </CardTitle>
                <p className="text-gray-600 text-lg">Configure your OpenAI API key to unlock powerful AI-driven business insights and recommendations</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700">OpenAI API Key</label>
                  <Input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="h-12 text-lg border-2 border-gray-200 focus:border-purple-500 transition-colors"
                    onKeyPress={(e) => e.key === 'Enter' && handleApiKeySubmit()}
                  />
                </div>
                <Button 
                  onClick={handleApiKeySubmit}
                  disabled={isTestingKey || !apiKey.trim()}
                  className="w-full h-12 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  {isTestingKey ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      Validating API Key...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-3" />
                      Initialize AI Manager
                    </>
                  )}
                </Button>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="text-sm text-blue-800 space-y-2">
                    <p className="font-semibold flex items-center">
                      <Bot className="w-4 h-4 mr-2" />
                      Get your API key:
                    </p>
                    <p>
                      Visit{' '}
                      <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline font-medium">
                        OpenAI Platform
                      </a>
                      {' '}to create your API key
                    </p>
                    <p className="text-xs text-blue-600">🔒 Your API key is stored locally and never shared with our servers.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Business Manager
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform your business operations with AI-powered insights, strategic recommendations, and automation opportunities
          </p>
          <Button
            variant="outline"
            onClick={handleResetApiKey}
            className="text-gray-600 border-gray-300 hover:bg-gray-50"
            size="sm"
          >
            <Settings className="w-4 h-4 mr-2" />
            Change API Key
          </Button>
        </div>

        {/* Statistics Dashboard */}
        {insights.length > 0 && (
          <BusinessDashboardStats analytics={analytics} />
        )}

        {/* Analysis Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analysisTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.value;
            return (
              <Card 
                key={type.value}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                  isSelected 
                    ? 'border-purple-300 bg-gradient-to-br from-purple-50 to-blue-50 shadow-md scale-105' 
                    : 'border-gray-200 bg-white hover:border-purple-200 hover:shadow-md'
                }`}
                onClick={() => setSelectedType(type.value as any)}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${type.color} rounded-2xl flex items-center justify-center shadow-lg ${isSelected ? 'scale-110' : ''} transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800">{type.label}</h3>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                  {isSelected && (
                    <div className="flex items-center justify-center text-purple-600">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Input Section */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center text-xl">
              <Target className="w-6 h-6 mr-3" />
              Business Intelligence Query
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Business Question or Scenario *
              </label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., How can I improve customer retention in my SaaS business? What are the key metrics I should track?"
                className="min-h-[120px] border-2 border-gray-200 focus:border-purple-500 transition-colors resize-none"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                Additional Context (Optional)
              </label>
              <Textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Provide additional context about your business, industry, size, current challenges, or specific situation..."
                className="border-2 border-gray-200 focus:border-purple-500 transition-colors resize-none"
              />
            </div>
            <Button 
              onClick={handleGenerateInsight}
              disabled={isLoading || !prompt.trim()}
              className="w-full h-12 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50"
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
          </CardContent>
        </Card>

        {/* Insights Display */}
        {insights.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Brain className="w-7 h-7 mr-3 text-purple-600" />
                AI Generated Insights 
                <span className="ml-2 text-lg text-purple-600">({filteredInsights.length})</span>
              </h2>
              <Button
                onClick={handleExportAll}
                variant="outline"
                className="border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </div>

            {/* Filters */}
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                      <Input
                        placeholder="Search insights..."
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        className="pl-10 border-gray-300 focus:border-purple-500"
                      />
                    </div>
                  </div>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:border-purple-500 focus:outline-none"
                  >
                    <option value="all">All Types</option>
                    {analysisTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            {filteredInsights.length > 0 ? (
              <div className="space-y-6">
                {filteredInsights.map((insight) => (
                  <BusinessInsightCard
                    key={insight.id}
                    insight={insight}
                    typeConfig={getTypeConfig(insight.type)}
                    onExport={handleExportInsight}
                    onSave={handleSaveInsight}
                  />
                ))}
              </div>
            ) : (
              <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
                <CardContent className="p-12 text-center">
                  <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No matching insights found</h3>
                  <p className="text-gray-500">Try adjusting your search filters or generate new insights.</p>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <Card className="border-2 border-dashed border-purple-300 bg-purple-50">
            <CardContent className="p-12 text-center space-y-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-lg">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-800">Ready to Generate Your First Insight?</h3>
                <p className="text-gray-600 text-lg max-w-lg mx-auto">
                  Ask any business question and get AI-powered analysis, recommendations, or automation suggestions tailored to your needs.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-sm">
                <div className="flex items-center justify-center space-x-2 text-purple-600 bg-white rounded-lg p-3">
                  <TrendingUp className="w-4 h-4" />
                  <span>Market Analysis</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-purple-600 bg-white rounded-lg p-3">
                  <Zap className="w-4 h-4" />
                  <span>Process Optimization</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-purple-600 bg-white rounded-lg p-3">
                  <Target className="w-4 h-4" />
                  <span>Strategic Planning</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AIBusinessDashboard;
