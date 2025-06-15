
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, TrendingUp, Brain, Zap, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface StatsProps {
  analytics: {
    totalInsights: number;
    insightsByType: Record<string, number>;
    averageConfidence: number;
    topCategories: string[];
    priorityDistribution?: Record<string, number>;
    recentActivity?: number;
  };
}

const BusinessDashboardStats: React.FC<StatsProps> = ({ analytics }) => {
  if (analytics.totalInsights === 0) {
    return null;
  }

  const statCards = [
    {
      title: 'Total Insights',
      value: analytics.totalInsights,
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      description: 'Generated insights'
    },
    {
      title: 'Avg. Confidence',
      value: `${Math.round(analytics.averageConfidence * 100)}%`,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      description: 'AI confidence level'
    },
    {
      title: 'Analysis Reports',
      value: analytics.insightsByType.analysis || 0,
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500',
      description: 'Business analyses'
    },
    {
      title: 'Automation Ideas',
      value: analytics.insightsByType.automation || 0,
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      description: 'Process improvements'
    }
  ];

  // Add priority distribution if available
  if (analytics.priorityDistribution) {
    const highPriority = analytics.priorityDistribution.high || 0;
    if (highPriority > 0) {
      statCards.push({
        title: 'High Priority',
        value: highPriority,
        icon: AlertTriangle,
        color: 'from-red-500 to-pink-500',
        description: 'Urgent items'
      });
    }
  }

  // Add recent activity if available
  if (analytics.recentActivity !== undefined) {
    statCards.push({
      title: 'Recent Activity',
      value: analytics.recentActivity,
      icon: Clock,
      color: 'from-teal-500 to-blue-500',
      description: 'Last 24 hours'
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statCards.slice(0, 4).map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-xl hover:from-white/15 hover:to-white/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white/60 text-sm font-medium">{stat.title}</h3>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-white/40 text-xs">{stat.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default BusinessDashboardStats;
