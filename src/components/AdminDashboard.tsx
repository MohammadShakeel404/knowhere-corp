
import React from 'react';
import { Users, Briefcase, TrendingUp, DollarSign, ArrowRight, Activity, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AdminDashboardProps {
  onTabChange: (tab: string) => void;
}

const AdminDashboard = ({ onTabChange }: AdminDashboardProps) => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12.3%',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      trend: 'up'
    },
    {
      title: 'Active Services',
      value: '156',
      change: '+8.7%',
      icon: Briefcase,
      color: 'from-green-500 to-green-600',
      trend: 'up'
    },
    {
      title: 'Monthly Growth',
      value: '23.4%',
      change: '+4.2%',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      trend: 'up'
    },
    {
      title: 'Revenue',
      value: '$48,921',
      change: '+15.8%',
      icon: DollarSign,
      color: 'from-orange-500 to-orange-600',
      trend: 'up'
    }
  ];

  const quickActions = [
    { id: 'users', title: 'Manage Users', description: 'Add, edit, or remove user accounts', icon: Users },
    { id: 'services', title: 'Configure Services', description: 'Set up and monitor AI services', icon: Briefcase },
    { id: 'analytics', title: 'View Analytics', description: 'Check performance metrics', icon: BarChart3 },
  ];

  const recentAlerts = [
    { type: 'warning', message: 'High API usage detected', time: '5 min ago' },
    { type: 'info', message: 'System maintenance scheduled', time: '1 hour ago' },
    { type: 'success', message: 'Backup completed successfully', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-lg text-blue-100 mb-6">
          Manage your platform with comprehensive tools and insights
        </p>
        <div className="flex items-center space-x-2 text-blue-100">
          <Activity className="w-5 h-5" />
          <span>System Status: All services operational</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index} 
              className="relative overflow-hidden bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-green-600 font-medium flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.change} from last month
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Quick Actions</span>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.id}
                    variant="outline"
                    className="w-full p-4 h-auto flex items-start space-x-3 hover:bg-gray-50"
                    onClick={() => onTabChange(action.id)}
                  >
                    <Icon className="w-5 h-5 mt-0.5 text-blue-500" />
                    <div className="text-left flex-1">
                      <div className="font-medium text-gray-900">{action.title}</div>
                      <div className="text-sm text-gray-500">{action.description}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <span>Recent Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'warning' ? 'bg-yellow-500' :
                    alert.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Overview */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { service: 'API Server', status: 'Operational', uptime: '99.9%', color: 'green' },
              { service: 'Database', status: 'Operational', uptime: '99.8%', color: 'green' },
              { service: 'AI Services', status: 'Operational', uptime: '99.7%', color: 'green' },
            ].map((service, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`w-4 h-4 bg-${service.color}-500 rounded-full mx-auto mb-3`}></div>
                <h3 className="font-semibold text-gray-900 mb-1">{service.service}</h3>
                <p className="text-sm text-gray-600 mb-1">{service.status}</p>
                <p className="text-xs text-gray-500">Uptime: {service.uptime}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
