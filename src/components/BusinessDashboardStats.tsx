
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
      color: 'from-indigo-500 to-blue-600',
      bgColor: 'from-indigo-50 to-blue-50',
      borderColor: 'border-indigo-200',
    },
    {
      title: 'Avg Confidence',
      value: `${Math.round(analytics.averageConfidence * 100)}%`,
      icon: Target,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
    },
    {
      title: 'Analysis',
      value: analytics.insightsByType.analysis || 0,
      icon: BarChart3,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
    },
    {
      title: 'Automation',
      value: analytics.insightsByType.automation || 0,
      icon: Zap,
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50',
      borderColor: 'border-orange-200',
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className={`bg-gradient-to-br ${stat.bgColor} border ${stat.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
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
