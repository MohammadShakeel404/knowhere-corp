
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Target, Brain } from 'lucide-react';

const AnalyticsOverview: React.FC = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <BarChart3 className="w-4 h-4 text-blue-600" />
          Analytics Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800 mb-1 text-sm">Performance</h3>
            <p className="text-xs text-gray-600">Track business metrics</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
            <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800 mb-1 text-sm">Success Metrics</h3>
            <p className="text-xs text-gray-600">Monitor KPIs</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
            <Brain className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800 mb-1 text-sm">AI Insights</h3>
            <p className="text-xs text-gray-600">Data-driven decisions</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsOverview;
