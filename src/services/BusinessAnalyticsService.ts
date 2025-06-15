
interface AnalyticsData {
  totalInsights: number;
  insightsByType: Record<string, number>;
  averageConfidence: number;
  topCategories: string[];
  weeklyTrend: number[];
}

export class BusinessAnalyticsService {
  static generateAnalytics(insights: any[]): AnalyticsData {
    const totalInsights = insights.length;
    
    const insightsByType = insights.reduce((acc, insight) => {
      acc[insight.type] = (acc[insight.type] || 0) + 1;
      return acc;
    }, {});

    const averageConfidence = insights.reduce((sum, insight) => {
      return sum + (insight.confidence || 0);
    }, 0) / totalInsights || 0;

    const categories = insights.map(i => i.category).filter(Boolean);
    const topCategories = [...new Set(categories)].slice(0, 5);

    // Generate mock weekly trend data
    const weeklyTrend = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10));

    return {
      totalInsights,
      insightsByType,
      averageConfidence,
      topCategories,
      weeklyTrend
    };
  }

  static exportInsights(insights: any[]): string {
    const data = insights.map(insight => ({
      timestamp: insight.timestamp.toISOString(),
      type: insight.type,
      confidence: insight.confidence,
      content: insight.content.substring(0, 200) + '...',
      suggestions: insight.suggestions?.join('; ') || '',
      actionItems: insight.actionItems?.join('; ') || ''
    }));

    const headers = ['Timestamp', 'Type', 'Confidence', 'Content', 'Suggestions', 'Action Items'];
    const csvContent = [
      headers.join(','),
      ...data.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n');

    return csvContent;
  }

  static categorizeInsight(content: string, type: string): { category: string; priority: 'low' | 'medium' | 'high' } {
    const lowPriorityKeywords = ['maintain', 'monitor', 'consider', 'explore'];
    const highPriorityKeywords = ['urgent', 'critical', 'immediate', 'crisis', 'risk'];
    
    const contentLower = content.toLowerCase();
    
    let priority: 'low' | 'medium' | 'high' = 'medium';
    
    if (highPriorityKeywords.some(keyword => contentLower.includes(keyword))) {
      priority = 'high';
    } else if (lowPriorityKeywords.some(keyword => contentLower.includes(keyword))) {
      priority = 'low';
    }

    const categories = {
      analysis: ['Financial Performance', 'Market Analysis', 'Competitive Intelligence', 'Customer Analytics'],
      recommendation: ['Strategic Planning', 'Process Improvement', 'Resource Allocation', 'Growth Strategy'],
      automation: ['Workflow Optimization', 'Technology Integration', 'Process Automation', 'Efficiency Enhancement'],
      general: ['General Business', 'Operations', 'Management', 'Planning']
    };

    const categoryList = categories[type] || categories.general;
    const category = categoryList[Math.floor(Math.random() * categoryList.length)];

    return { category, priority };
  }
}
