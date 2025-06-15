
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Target, Brain, Zap, Users, Award, Lightbulb } from 'lucide-react';

interface AnalyticsOverviewProps {
  onNavigateToGenerate?: () => void;
}

const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({ onNavigateToGenerate }) => {
  return (
    <div className="space-y-4">
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
            <BarChart3 className="w-5 h-6 text-blue-600" />
            Business Intelligence Overview
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Comprehensive analytics and insights for data-driven decision making
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2 text-sm">Performance Analytics</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Track key business metrics, monitor growth trends, and identify performance patterns
              </p>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2 text-sm">Strategic Goals</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Monitor KPIs, track goal achievement, and measure strategic initiative success
              </p>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2 text-sm">AI-Powered Insights</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Leverage machine learning for predictive analytics and intelligent recommendations
              </p>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-100 hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2 text-sm">Process Automation</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Identify automation opportunities and optimize workflow efficiency
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="w-5 h-5 text-blue-600" />
              Customer Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-blue-800">Customer Segmentation</span>
                <span className="text-xs text-blue-600">Advanced</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-green-800">Retention Analysis</span>
                <span className="text-xs text-green-600">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium text-purple-800">Behavioral Patterns</span>
                <span className="text-xs text-purple-600">Real-time</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Award className="w-5 h-5 text-purple-600" />
              Business Excellence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium text-purple-800">Quality Metrics</span>
                <span className="text-xs text-purple-600">Optimized</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                <span className="text-sm font-medium text-indigo-800">Competitive Analysis</span>
                <span className="text-xs text-indigo-600">Updated</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                <span className="text-sm font-medium text-pink-800">Innovation Index</span>
                <span className="text-xs text-pink-600">Growing</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-yellow-300" />
                <h3 className="text-xl font-bold">Ready to Transform Your Business?</h3>
              </div>
              <p className="text-blue-100 text-base">
                Generate AI-powered insights to unlock new opportunities and drive strategic growth.
              </p>
            </div>
            <button
              onClick={onNavigateToGenerate}
              className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg hover:shadow-xl text-sm"
            >
              Start Generating Insights
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsOverview;
