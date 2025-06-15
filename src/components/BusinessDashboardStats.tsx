
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, TrendingUp, Brain, Zap, AlertTriangle, Target } from 'lucide-react';

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
      title: 'Insights',
      value: analytics.totalInsights,
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Confidence',
      value: `${Math.round(analytics.averageConfidence * 100)}%`,
      icon: Target,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Analysis',
      value: analytics.insightsByType.analysis || 0,
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Automation',
      value: analytics.insightsByType.automation || 0,
      icon: Zap,
      color: 'from-orange-500 to-red-500',
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="shadow-md border-0 bg-white hover:shadow-lg transition-all duration-200">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-600 text-xs font-medium mb-0 truncate">{stat.title}</h3>
                  <p className="text-lg font-bold text-gray-800">{stat.value}</p>
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
