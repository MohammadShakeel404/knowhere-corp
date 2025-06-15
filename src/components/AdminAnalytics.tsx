
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Users, Activity, TrendingUp, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminAnalytics = () => {
  const analyticsData = [
    { metric: 'Total API Calls', value: '1.2M', change: '+15.3%', period: 'This month' },
    { metric: 'Active Users', value: '2,847', change: '+8.7%', period: 'This month' },
    { metric: 'Response Time', value: '145ms', change: '-12.4%', period: 'Average' },
    { metric: 'Error Rate', value: '0.12%', change: '-45.2%', period: 'This month' },
  ];

  const topServices = [
    { name: 'AI Business Branding', requests: '1,247', percentage: 45 },
    { name: 'Business Analytics', requests: '856', percentage: 31 },
    { name: 'AI Assistant', requests: '654', percentage: 24 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-1">Track performance and usage metrics</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((item, index) => (
          <Card key={index} className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <BarChart className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  item.change.startsWith('+') ? 'bg-green-100 text-green-800' : 
                  item.change.startsWith('-') && item.metric === 'Response Time' ? 'bg-green-100 text-green-800' :
                  item.change.startsWith('-') && item.metric === 'Error Rate' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {item.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{item.value}</h3>
              <p className="text-sm text-gray-600 mb-1">{item.metric}</p>
              <p className="text-xs text-gray-500">{item.period}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Trends */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Usage Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
              <div className="text-center">
                <BarChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Usage analytics chart</p>
                <p className="text-sm text-gray-400">Detailed charts will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Services */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Top Services</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{service.name}</h4>
                    <p className="text-sm text-gray-500">{service.requests} requests</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                        style={{ width: `${service.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600 w-10">
                      {service.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Activity */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>User Activity Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">2,847</div>
              <div className="text-sm text-gray-600">Total Users</div>
              <div className="text-xs text-blue-500 mt-1">+12.3% this month</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">1,234</div>
              <div className="text-sm text-gray-600">Daily Active</div>
              <div className="text-xs text-green-500 mt-1">+8.7% this week</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
              <div className="text-sm text-gray-600">New Users Today</div>
              <div className="text-xs text-purple-500 mt-1">+15.2% from yesterday</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">4.2</div>
              <div className="text-sm text-gray-600">Avg Session Duration</div>
              <div className="text-xs text-orange-500 mt-1">+0.8 min this week</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
            <div className="text-center">
              <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Performance metrics dashboard</p>
              <p className="text-sm text-gray-400">Real-time performance data will be displayed here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
