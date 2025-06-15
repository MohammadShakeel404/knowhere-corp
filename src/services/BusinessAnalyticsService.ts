interface AnalyticsData {
  totalInsights: number;
  insightsByType: Record<string, number>;
  averageConfidence: number;
  topCategories: string[];
  weeklyTrend: number[];
  priorityDistribution: Record<string, number>;
  recentActivity: number;
}

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

export class BusinessAnalyticsService {
  static generateAnalytics(insights: AIInsight[]): AnalyticsData {
    if (insights.length === 0) {
      return {
        totalInsights: 0,
        insightsByType: {},
        averageConfidence: 0,
        topCategories: [],
        weeklyTrend: Array(7).fill(0),
        priorityDistribution: {},
        recentActivity: 0
      };
    }

    const totalInsights = insights.length;
    
    // Count insights by type
    const insightsByType = insights.reduce((acc, insight) => {
      const type = insight.type || 'general';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate average confidence
    const averageConfidence = insights.reduce((sum, insight) => {
      return sum + (insight.confidence || 0);
    }, 0) / totalInsights;

    // Get top categories
    const categoryCount = insights.reduce((acc, insight) => {
      const category = insight.category || 'Uncategorized';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topCategories = Object.entries(categoryCount)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 5)
      .map(([category]) => category);

    // Generate weekly trend (last 7 days)
    const weeklyTrend = Array(7).fill(0);
    const now = new Date();
    
    insights.forEach(insight => {
      // Ensure timestamp is a Date object
      const timestamp = insight.timestamp instanceof Date ? insight.timestamp : new Date(insight.timestamp);
      const daysDiff = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff >= 0 && daysDiff < 7) {
        weeklyTrend[6 - daysDiff]++;
      }
    });

    // Priority distribution
    const priorityDistribution = insights.reduce((acc, insight) => {
      const priority = insight.priority || 'medium';
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Recent activity (last 24 hours)
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const recentActivity = insights.filter(insight => {
      const timestamp = insight.timestamp instanceof Date ? insight.timestamp : new Date(insight.timestamp);
      return timestamp > oneDayAgo;
    }).length;

    return {
      totalInsights,
      insightsByType,
      averageConfidence,
      topCategories,
      weeklyTrend,
      priorityDistribution,
      recentActivity
    };
  }

  static exportInsights(insights: AIInsight[]): string {
    if (insights.length === 0) {
      return 'No insights to export';
    }

    const data = insights.map(insight => {
      const timestamp = insight.timestamp instanceof Date ? insight.timestamp : new Date(insight.timestamp);
      return {
        timestamp: timestamp.toISOString(),
        type: insight.type || 'general',
        category: insight.category || 'Uncategorized',
        priority: insight.priority || 'medium',
        confidence: Math.round((insight.confidence || 0) * 100) + '%',
        content: insight.content.substring(0, 500) + (insight.content.length > 500 ? '...' : ''),
        suggestions: Array.isArray(insight.suggestions) ? insight.suggestions.join('; ') : 'None',
        actionItems: Array.isArray(insight.actionItems) ? insight.actionItems.join('; ') : 'None'
      };
    });

    const headers = ['Timestamp', 'Type', 'Category', 'Priority', 'Confidence', 'Content', 'Suggestions', 'Action Items'];
    const csvContent = [
      headers.join(','),
      ...data.map(row => Object.values(row).map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    return csvContent;
  }

  static categorizeInsight(content: string, type: string): { category: string; priority: 'low' | 'medium' | 'high' } {
    const contentLower = content.toLowerCase();
    
    // Priority determination
    const highPriorityKeywords = ['urgent', 'critical', 'immediate', 'crisis', 'risk', 'emergency', 'failure', 'loss'];
    const lowPriorityKeywords = ['maintain', 'monitor', 'consider', 'explore', 'optional', 'eventually', 'when possible'];
    
    let priority: 'low' | 'medium' | 'high' = 'medium';
    
    if (highPriorityKeywords.some(keyword => contentLower.includes(keyword))) {
      priority = 'high';
    } else if (lowPriorityKeywords.some(keyword => contentLower.includes(keyword))) {
      priority = 'low';
    }

    // Category determination based on content and type
    const categoryMappings: Record<string, { keywords: Record<string, string[]>; default: string }> = {
      analysis: {
        keywords: {
          'Financial Performance': ['revenue', 'profit', 'cost', 'budget', 'financial', 'roi', 'margin'],
          'Market Analysis': ['market', 'competition', 'competitor', 'industry', 'trend', 'customer'],
          'Operational Efficiency': ['process', 'operation', 'workflow', 'efficiency', 'productivity'],
          'Customer Analytics': ['customer', 'user', 'client', 'satisfaction', 'retention', 'churn']
        },
        default: 'Business Analysis'
      },
      recommendation: {
        keywords: {
          'Strategic Planning': ['strategy', 'plan', 'goal', 'vision', 'mission', 'roadmap'],
          'Process Improvement': ['improve', 'optimize', 'enhance', 'streamline', 'refine'],
          'Resource Allocation': ['resource', 'budget', 'staff', 'allocation', 'investment'],
          'Growth Strategy': ['growth', 'expand', 'scale', 'develop', 'increase']
        },
        default: 'Strategic Recommendation'
      },
      automation: {
        keywords: {
          'Workflow Optimization': ['workflow', 'process', 'automate', 'optimize', 'streamline'],
          'Technology Integration': ['technology', 'software', 'system', 'integration', 'tool'],
          'Process Automation': ['automation', 'automated', 'bot', 'ai', 'machine'],
          'Efficiency Enhancement': ['efficiency', 'productivity', 'performance', 'speed', 'time']
        },
        default: 'Process Automation'
      },
      general: {
        keywords: {
          'General Business': ['business', 'company', 'organization', 'management'],
          'Operations': ['operation', 'daily', 'routine', 'procedure'],
          'Planning': ['plan', 'schedule', 'timeline', 'milestone'],
          'Management': ['manage', 'lead', 'supervise', 'oversee']
        },
        default: 'General Business'
      }
    };

    const typeMapping = categoryMappings[type] || categoryMappings.general;
    
    // Find the best matching category based on keywords
    let bestCategory = typeMapping.default;
    let maxMatches = 0;

    Object.entries(typeMapping.keywords).forEach(([category, keywords]) => {
      const matches = keywords.filter(keyword => contentLower.includes(keyword)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        bestCategory = category;
      }
    });

    return { category: bestCategory, priority };
  }

  static generateInsightId(): string {
    return `insight_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
