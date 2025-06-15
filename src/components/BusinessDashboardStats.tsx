
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, TrendingUp, Brain, Zap, AlertTriangle, CheckCircle, Clock, Target } from 'lucide-react';

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
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      description: 'Generated insights'
    },
    {
      title: 'Avg. Confidence',
      value: `${Math.round(analytics.averageConfidence * 100)}%`,
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      description: 'AI confidence level'
    },
    {
      title: 'Analysis Reports',
      value: analytics.insightsByType.analysis || 0,
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      description: 'Business analyses'
    },
    {
      title: 'Automation Ideas',
      value: analytics.insightsByType.automation || 0,
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
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
        bgColor: 'bg-red-50',
        textColor: 'text-red-700',
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
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-700',
      description: 'Last 24 hours'
    });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.slice(0, 4).map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-600 text-xs font-medium mb-1 truncate">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
                  <p className="text-gray-500 text-xs truncate">{stat.description}</p>
                </div>
              </div>
              <div className={`mt-3 p-2 ${stat.bgColor} rounded-lg`}>
                <div className={`text-xs font-medium ${stat.textColor}`}>
                  Analytics Dashboard
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
