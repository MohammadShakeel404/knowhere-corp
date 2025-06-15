
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Brain, Zap } from 'lucide-react';

interface StatsProps {
  analytics: {
    totalInsights: number;
    insightsByType: Record<string, number>;
    averageConfidence: number;
    topCategories: string[];
  };
}

const BusinessDashboardStats: React.FC<StatsProps> = ({ analytics }) => {
  const statCards = [
    {
      title: 'Total Insights',
      value: analytics.totalInsights,
      icon: Brain,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Avg. Confidence',
      value: `${Math.round(analytics.averageConfidence * 100)}%`,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Analysis Reports',
      value: analytics.insightsByType.analysis || 0,
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Automation Ideas',
      value: analytics.insightsByType.automation || 0,
      icon: Zap,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white/60 text-sm font-medium">{stat.title}</h3>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
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
