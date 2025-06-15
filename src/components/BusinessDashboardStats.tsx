
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, TrendingUp, Brain, Zap, Target, Award } from 'lucide-react';

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
      color: 'from-gray-800 to-gray-900',
      bgColor: 'from-gray-50 to-gray-100',
      borderColor: 'border-gray-200',
    },
    {
      title: 'Avg Confidence',
      value: `${Math.round(analytics.averageConfidence * 100)}%`,
      icon: Target,
      color: 'from-gray-700 to-gray-800',
      bgColor: 'from-gray-50 to-gray-100',
      borderColor: 'border-gray-200',
    },
    {
      title: 'Analysis',
      value: analytics.insightsByType.analysis || 0,
      icon: BarChart3,
      color: 'from-gray-800 to-gray-900',
      bgColor: 'from-gray-50 to-gray-100',
      borderColor: 'border-gray-200',
    },
    {
      title: 'Automation',
      value: analytics.insightsByType.automation || 0,
      icon: Zap,
      color: 'from-gray-700 to-gray-800',
      bgColor: 'from-gray-50 to-gray-100',
      borderColor: 'border-gray-200',
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className={`bg-gradient-to-br ${stat.bgColor} border ${stat.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">{stat.title}</p>
                  <p className="text-3xl font-semibold text-gray-900 tracking-tight">{stat.value}</p>
                </div>
                <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
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
