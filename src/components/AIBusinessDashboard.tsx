
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
  Sparkles,
  Template,
  Info
} from 'lucide-react';
import { SupabaseAIService } from '@/services/SupabaseAIService';
import { BusinessAnalyticsService } from '@/services/BusinessAnalyticsService';
import BusinessInsightCard from './BusinessInsightCard';
import BusinessDashboardStats from './BusinessDashboardStats';
import InsightGenerationForm from './InsightGenerationForm';
import InsightFilters from './InsightFilters';
import AnalyticsOverview from './AnalyticsOverview';
import OnboardingTour from './OnboardingTour';
import InsightTemplates from './InsightTemplates';
import BulkInsightActions from './BulkInsightActions';
import KeyboardShortcuts from './KeyboardShortcuts';
import ErrorBoundary from './ErrorBoundary';
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
  const [activeTab, setActiveTab] = useState('generate');
  const [selectedInsights, setSelectedInsights] = useState<string[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const analysisTypes = [
    { value: 'analysis', label: 'Analysis', icon: BarChart3, color: 'from-blue-500 to-cyan-500' },
    { value: 'recommendation', label: 'Strategy', icon: Lightbulb, color: 'from-green-500 to-emerald-500' },
    { value: 'automation', label: 'Automation', icon: Brain, color: 'from-purple-500 to-pink-500' },
    { value: 'general', label: 'General', icon: Brain, color: 'from-orange-500 to-red-500' }
  ];

  // Check if user should see onboarding
  useEffect(() => {
    if (user) {
      const hasSeenOnboarding = localStorage.getItem('ai-business-onboarding-complete');
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
      }
      loadUserInsights();
    }
  }, [user]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('ai-business-onboarding-complete', 'true');
    setShowOnboarding(false);
    setActiveTab('generate');
    setShowTemplates(true);
  };

  const handleOnboardingSkip = () => {
    localStorage.setItem('ai-business-onboarding-complete', 'true');
    setShowOnboarding(false);
  };

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
      setShowTemplates(false); // Hide templates after generating
      
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
      setSelectedInsights(prev => prev.filter(id => id !== insight.id));
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

  const handleBulkDelete = async (ids: string[]) => {
    try {
      await Promise.all(ids.map(id => SupabaseAIService.deleteInsight(id)));
      setInsights(prev => prev.filter(i => !ids.includes(i.id)));
      setSelectedInsights([]);
      toast({
        title: "Insights Deleted",
        description: `${ids.length} insights have been deleted successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete insights. Please try again.",
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

  const handleBulkExport = (insightsToExport: AIInsight[]) => {
    try {
      const csvContent = BusinessAnalyticsService.exportInsights(insightsToExport);
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `insights-bulk-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "Insights Exported",
        description: `${insightsToExport.length} insights have been exported`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export insights. Please try again.",
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4 sm:p-6 pt-20 sm:pt-24">
        <div className="w-full max-w-lg">
          <Card className="shadow-2xl border-0 bg-white rounded-[2rem] overflow-hidden backdrop-blur-xl">
            <CardContent className="p-8 sm:p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-gray-900 to-gray-700 rounded-full flex items-center justify-center shadow-lg">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">AI Business Manager</h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">Unlock intelligent insights for your business with AI-powered analysis</p>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-gray-700 mr-2" />
                  <span className="text-sm font-medium text-gray-800">Sign in to get started</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
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
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-20 sm:pt-24">
        <KeyboardShortcuts
          onNewInsight={() => setActiveTab('generate')}
          onRefresh={loadUserInsights}
          onExportAll={handleExportAll}
        />

        {showOnboarding && (
          <OnboardingTour
            onComplete={handleOnboardingComplete}
            onSkip={handleOnboardingSkip}
          />
        )}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-gray-900 mb-4 sm:mb-6 tracking-tight">
                AI Business Manager
              </h1>
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4">
                Transform your business with AI-powered insights and strategic recommendations
              </p>
              
              {/* Quick tips */}
              <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                <Info className="w-4 h-4 mr-2" />
                <span>Tip: Use Ctrl+N for new insight, Ctrl+R to refresh</span>
              </div>
            </div>

            {/* Stats */}
            {analytics.totalInsights > 0 && (
              <div className="mb-8 sm:mb-12">
                <BusinessDashboardStats analytics={analytics} />
              </div>
            )}
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 sm:space-y-8">
            <div className="flex justify-center px-4">
              <TabsList className="grid w-full max-w-lg grid-cols-3 h-12 sm:h-14 p-1.5 bg-gray-100 backdrop-blur-sm border-0 shadow-sm rounded-2xl">
                <TabsTrigger 
                  value="generate" 
                  className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-md transition-all rounded-xl"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Generate</span>
                  <span className="sm:hidden">New</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="insights" 
                  className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-md transition-all rounded-xl"
                >
                  <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Insights</span>
                  {insights.length > 0 && (
                    <Badge variant="secondary" className="text-xs h-4 sm:h-5 px-1.5 sm:px-2 ml-1 rounded-full">
                      {insights.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-md transition-all rounded-xl"
                >
                  <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Analytics</span>
                  <span className="sm:hidden">Stats</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Generate Tab */}
            <TabsContent value="generate" className="space-y-6">
              <div className="max-w-4xl mx-auto px-2 sm:px-4">
                {showTemplates && insights.length === 0 ? (
                  <div className="space-y-8">
                    <InsightTemplates onSelectTemplate={handleGenerateInsight} />
                    <div className="text-center">
                      <Button
                        onClick={() => setShowTemplates(false)}
                        variant="outline"
                        className="rounded-xl"
                      >
                        <Template className="w-4 h-4 mr-2" />
                        Custom Insight Instead
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {insights.length > 0 && !showTemplates && (
                      <div className="text-center">
                        <Button
                          onClick={() => setShowTemplates(true)}
                          variant="outline"
                          className="rounded-xl mb-6"
                        >
                          <Template className="w-4 h-4 mr-2" />
                          Use Templates
                        </Button>
                      </div>
                    )}
                    <InsightGenerationForm 
                      onGenerate={handleGenerateInsight}
                      isLoading={isLoading}
                    />
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights" className="space-y-6">
              <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 flex items-center tracking-tight">
                      <Brain className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-gray-700" />
                      <span>Your Insights ({filteredInsights.length})</span>
                    </h2>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Button
                        onClick={loadUserInsights}
                        variant="outline"
                        size="sm"
                        disabled={isLoadingInsights}
                        className="h-9 sm:h-10 px-3 sm:px-4 rounded-xl border-gray-200 hover:bg-gray-50 transition-all text-xs sm:text-sm"
                      >
                        {isLoadingInsights ? (
                          <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                        ) : (
                          <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                        <span className="ml-1 sm:ml-2">Refresh</span>
                      </Button>
                      <Button
                        onClick={handleExportAll}
                        variant="outline"
                        size="sm"
                        className="h-9 sm:h-10 px-3 sm:px-4 rounded-xl border-gray-200 hover:bg-gray-50 transition-all text-xs sm:text-sm"
                      >
                        <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="ml-1 sm:ml-2">Export</span>
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
                </div>

                <BulkInsightActions
                  insights={filteredInsights}
                  selectedInsights={selectedInsights}
                  onSelectionChange={setSelectedInsights}
                  onBulkDelete={handleBulkDelete}
                  onBulkExport={handleBulkExport}
                />

                {isLoadingInsights ? (
                  <Card className="border-2 border-dashed border-gray-200 bg-gray-50/50 rounded-2xl">
                    <CardContent className="p-8 sm:p-12 text-center">
                      <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4 animate-spin" />
                      <h3 className="text-base sm:text-lg font-medium text-gray-600 mb-2">Loading insights...</h3>
                      <p className="text-sm text-gray-500">Please wait while we fetch your saved insights.</p>
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
                        isSelected={selectedInsights.includes(insight.id)}
                        onSelectionChange={(selected) => {
                          if (selected) {
                            setSelectedInsights(prev => [...prev, insight.id]);
                          } else {
                            setSelectedInsights(prev => prev.filter(id => id !== insight.id));
                          }
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="border-2 border-dashed border-gray-200 bg-gray-50/50 rounded-2xl">
                    <CardContent className="p-8 sm:p-12 text-center">
                      <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-base sm:text-lg font-medium text-gray-600 mb-2">No insights found</h3>
                      <p className="text-sm text-gray-500 mb-6 leading-relaxed px-4">
                        {searchFilter || typeFilter !== 'all' 
                          ? 'Try adjusting your search filters or generate new insights.'
                          : 'Generate your first AI insight to get started with intelligent business analysis.'
                        }
                      </p>
                      {!searchFilter && typeFilter === 'all' && (
                        <Button
                          onClick={() => setActiveTab('generate')}
                          className="bg-gray-900 hover:bg-gray-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all shadow-lg text-sm sm:text-base"
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
              <div className="px-2 sm:px-4">
                <AnalyticsOverview onNavigateToGenerate={() => setActiveTab('generate')} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AIBusinessDashboard;
