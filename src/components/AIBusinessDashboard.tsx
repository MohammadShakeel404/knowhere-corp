
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Lightbulb, 
  BarChart3, 
  Download,
  Loader2,
  AlertCircle,
  RefreshCw,
  Plus,
  Sparkles
} from 'lucide-react';
import { SupabaseAIService } from '@/services/SupabaseAIService';
import { BusinessAnalyticsService } from '@/services/BusinessAnalyticsService';
import BusinessInsightCard from './BusinessInsightCard';
import BusinessDashboardStats from './BusinessDashboardStats';
import SupabaseStatus from './SupabaseStatus';
import InsightGenerationForm from './InsightGenerationForm';
import InsightFilters from './InsightFilters';
import AnalyticsOverview from './AnalyticsOverview';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

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

const AIBusinessDashboard: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const analysisTypes = [
    { value: 'analysis', label: 'Analysis', icon: BarChart3, color: 'from-blue-500 to-cyan-500' },
    { value: 'recommendation', label: 'Strategy', icon: Lightbulb, color: 'from-green-500 to-emerald-500' },
    { value: 'automation', label: 'Automation', icon: Brain, color: 'from-purple-500 to-pink-500' },
    { value: 'general', label: 'General', icon: Brain, color: 'from-orange-500 to-red-500' }
  ];

  // Load user insights on component mount
  useEffect(() => {
    if (user) {
      loadUserInsights();
    }
  }, [user]);

  const loadUserInsights = async () => {
    if (!user) return;
    
    setIsLoadingInsights(true);
    try {
      const savedInsights = await SupabaseAIService.getUserInsights();
      const transformedInsights: AIInsight[] = savedInsights.map(insight => ({
        id: insight.id,
        type: insight.type,
        content: insight.content,
        confidence: insight.confidence,
        suggestions: insight.suggestions,
        timestamp: new Date(insight.created_at),
        priority: insight.priority,
        category: insight.category,
        actionItems: insight.action_items
      }));
      setInsights(transformedInsights);
    } catch (error) {
      console.error('Error loading insights:', error);
      toast({
        title: "Error",
        description: "Failed to load your saved insights",
        variant: "destructive",
      });
    } finally {
      setIsLoadingInsights(false);
    }
  };

  const handleGenerateInsight = async (prompt: string, context: string, type: 'analysis' | 'recommendation' | 'automation' | 'general') => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to generate insights",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await SupabaseAIService.generateBusinessInsight({
        prompt,
        context: context || undefined,
        type
      });

      const newInsight: AIInsight = {
        id: response.id || BusinessAnalyticsService.generateInsightId(),
        type,
        content: response.content,
        confidence: response.confidence,
        suggestions: response.suggestions,
        timestamp: new Date(),
        category: response.category,
        priority: response.priority,
        actionItems: response.actionItems
      };

      setInsights(prev => [newInsight, ...prev]);
      
      toast({
        title: "AI Insight Generated",
        description: `Your ${type} insight has been generated and saved successfully`,
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

  const handleDeleteInsight = async (insight: AIInsight) => {
    try {
      await SupabaseAIService.deleteInsight(insight.id);
      setInsights(prev => prev.filter(i => i.id !== insight.id));
      toast({
        title: "Insight Deleted",
        description: "Insight has been deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete insight. Please try again.",
        variant: "destructive",
      });
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
      title: "Insight Already Saved",
      description: "This insight is automatically saved to your workspace",
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

  // Show login message if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">AI Business Manager</h2>
              <p className="text-gray-600 mb-6">Unlock intelligent insights for your business with AI-powered analysis</p>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200">
                <div className="flex items-center justify-center mb-2">
                  <Sparkles className="w-5 h-5 text-indigo-600 mr-2" />
                  <span className="text-sm font-semibold text-indigo-800">Sign in to get started</span>
                </div>
                <p className="text-xs text-indigo-700">
                  Generate insights, save them securely, and access your personalized business dashboard.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Business Manager
              </h1>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl">
                Transform your business with AI-powered insights and strategic recommendations
              </p>
            </div>
            <div className="flex-shrink-0">
              <SupabaseStatus />
            </div>
          </div>

          {/* Enhanced Stats */}
          {analytics.totalInsights > 0 && (
            <div className="mb-6">
              <BusinessDashboardStats analytics={analytics} />
            </div>
          )}
        </div>

        {/* Enhanced Tabs */}
        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-12 p-1 bg-white/70 backdrop-blur-sm border border-gray-200 shadow-sm">
            <TabsTrigger 
              value="generate" 
              className="flex items-center gap-2 py-3 px-4 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Generate</span>
            </TabsTrigger>
            <TabsTrigger 
              value="insights" 
              className="flex items-center gap-2 py-3 px-4 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">Insights</span>
              {insights.length > 0 && (
                <Badge variant="secondary" className="text-xs h-5 px-2">
                  {insights.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="flex items-center gap-2 py-3 px-4 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Generate Tab */}
          <TabsContent value="generate" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <InsightGenerationForm 
                onGenerate={handleGenerateInsight}
                isLoading={isLoading}
              />
            </div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Brain className="w-6 h-6 mr-3 text-indigo-600" />
                  Your Insights ({filteredInsights.length})
                </h2>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={loadUserInsights}
                    variant="outline"
                    size="sm"
                    disabled={isLoadingInsights}
                    className="h-9"
                  >
                    {isLoadingInsights ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                    <span className="ml-2 hidden sm:inline">Refresh</span>
                  </Button>
                  <Button
                    onClick={handleExportAll}
                    variant="outline"
                    size="sm"
                    className="h-9"
                  >
                    <Download className="w-4 h-4" />
                    <span className="ml-2 hidden sm:inline">Export All</span>
                  </Button>
                </div>
              </div>

              <InsightFilters
                searchFilter={searchFilter}
                typeFilter={typeFilter}
                onSearchChange={setSearchFilter}
                onTypeChange={setTypeFilter}
                analysisTypes={analysisTypes}
              />

              {isLoadingInsights ? (
                <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50">
                  <CardContent className="p-12 text-center">
                    <Loader2 className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-spin" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Loading insights...</h3>
                    <p className="text-gray-500">Please wait while we fetch your saved insights.</p>
                  </CardContent>
                </Card>
              ) : filteredInsights.length > 0 ? (
                <div className="grid gap-4 sm:gap-6">
                  {filteredInsights.map((insight) => (
                    <BusinessInsightCard
                      key={insight.id}
                      insight={insight}
                      typeConfig={getTypeConfig(insight.type)}
                      onExport={handleExportInsight}
                      onSave={handleSaveInsight}
                      onDelete={handleDeleteInsight}
                    />
                  ))}
                </div>
              ) : (
                <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50">
                  <CardContent className="p-12 text-center">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No insights found</h3>
                    <p className="text-gray-500 mb-4">
                      {searchFilter || typeFilter !== 'all' 
                        ? 'Try adjusting your search filters or generate new insights.'
                        : 'Generate your first AI insight to get started with intelligent business analysis.'
                      }
                    </p>
                    {!searchFilter && typeFilter === 'all' && (
                      <Button
                        onClick={() => document.querySelector('[value="generate"]')?.click()}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Generate First Insight
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsOverview />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIBusinessDashboard;
