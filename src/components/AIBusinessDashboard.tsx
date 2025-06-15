
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
  Bot,
  Menu,
  X
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
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="container mx-auto max-w-lg">
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                AI Business Manager
              </CardTitle>
              <p className="text-gray-600">Configure your OpenAI API key to get started</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">OpenAI API Key</label>
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="h-11"
                  onKeyPress={(e) => e.key === 'Enter' && handleApiKeySubmit()}
                />
              </div>
              <Button 
                onClick={handleApiKeySubmit}
                disabled={isTestingKey || !apiKey.trim()}
                className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {isTestingKey ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Validating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Initialize AI Manager
                  </>
                )}
              </Button>
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <p className="text-xs text-blue-700">
                  🔒 Your API key is stored locally and never shared.{' '}
                  <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                    Get your key here
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 space-y-6 max-w-7xl">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Business Manager
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Transform your business with AI-powered insights and strategic recommendations
          </p>
          <Button
            variant="outline"
            onClick={handleResetApiKey}
            size="sm"
            className="text-gray-600 border-gray-300 hover:bg-gray-50"
          >
            <Settings className="w-3 h-3 mr-2" />
            Change API Key
          </Button>
        </div>

        {/* Statistics Dashboard */}
        {insights.length > 0 && (
          <BusinessDashboardStats analytics={analytics} />
        )}

        {/* Analysis Type Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {analysisTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.value;
            return (
              <Card 
                key={type.value}
                className={`cursor-pointer transition-all duration-200 border-2 ${
                  isSelected 
                    ? 'border-blue-300 bg-gradient-to-br from-blue-50 to-purple-50 shadow-md' 
                    : 'border-gray-200 bg-white hover:border-blue-200 hover:shadow-sm'
                }`}
                onClick={() => setSelectedType(type.value as any)}
              >
                <CardContent className="p-4 text-center space-y-3">
                  <div className={`w-12 h-12 mx-auto bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center ${isSelected ? 'scale-105' : ''} transition-transform duration-200`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-800 text-sm">{type.label}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{type.description}</p>
                  </div>
                  {isSelected && (
                    <div className="flex items-center justify-center text-blue-600">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Input Section */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg pb-4">
            <CardTitle className="flex items-center text-lg">
              <Target className="w-5 h-5 mr-2" />
              Business Intelligence Query
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Business Question or Scenario *
              </label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., How can I improve customer retention in my SaaS business?"
                className="min-h-[100px] border-2 border-gray-200 focus:border-blue-500 transition-colors resize-none text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                Additional Context (Optional)
              </label>
              <Textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Provide context about your business, industry, size, challenges..."
                className="border-2 border-gray-200 focus:border-blue-500 transition-colors resize-none text-sm"
                rows={3}
              />
            </div>
            <Button 
              onClick={handleGenerateInsight}
              disabled={isLoading || !prompt.trim()}
              className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate AI Insight
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Insights Display */}
        {insights.length > 0 ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center">
                <Brain className="w-6 h-6 mr-2 text-blue-600" />
                AI Insights 
                <span className="ml-2 text-base text-blue-600">({filteredInsights.length})</span>
              </h2>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  variant="outline"
                  size="sm"
                  className="sm:hidden"
                >
                  <Menu className="w-4 h-4 mr-1" />
                  Filters
                </Button>
                <Button
                  onClick={handleExportAll}
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>

            {/* Filters */}
            <Card className={`bg-gray-50 border-gray-200 ${showMobileFilters ? 'block' : 'hidden sm:block'}`}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                      <Input
                        placeholder="Search insights..."
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        className="pl-10 border-gray-300 focus:border-blue-500 h-10"
                      />
                    </div>
                  </div>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none text-sm h-10"
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
              <div className="space-y-4">
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
                <CardContent className="p-8 text-center">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No matching insights found</h3>
                  <p className="text-gray-500 text-sm">Try adjusting your search filters or generate new insights.</p>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <Card className="border-2 border-dashed border-blue-300 bg-blue-50">
            <CardContent className="p-8 md:p-12 text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">Ready to Generate Your First Insight?</h3>
                <p className="text-gray-600 max-w-lg mx-auto text-sm md:text-base">
                  Ask any business question and get AI-powered analysis, recommendations, or automation suggestions.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-sm">
                <div className="flex items-center justify-center space-x-2 text-blue-600 bg-white rounded-lg p-3">
                  <TrendingUp className="w-4 h-4" />
                  <span>Market Analysis</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-blue-600 bg-white rounded-lg p-3">
                  <Zap className="w-4 h-4" />
                  <span>Process Optimization</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-blue-600 bg-white rounded-lg p-3">
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
