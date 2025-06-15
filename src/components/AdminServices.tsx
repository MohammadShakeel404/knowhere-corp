
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Settings, BarChart } from 'lucide-react';

const AdminServices = () => {
  const services = [
    { 
      id: 1, 
      name: 'AI Business Branding', 
      description: 'Generate comprehensive brand identity and growth strategies',
      status: 'Active',
      usage: '1,247 requests',
      performance: '98.5%'
    },
    { 
      id: 2, 
      name: 'Business Analytics', 
      description: 'Advanced analytics and insights for business growth',
      status: 'Active',
      usage: '856 requests',
      performance: '99.2%'
    },
    { 
      id: 3, 
      name: 'AI Assistant', 
      description: 'General purpose AI assistant for various tasks',
      status: 'Maintenance',
      usage: '2,134 requests',
      performance: '97.8%'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  service.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {service.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{service.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Usage:</span>
                  <span className="font-medium">{service.usage}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Performance:</span>
                  <span className="font-medium text-green-600">{service.performance}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="w-4 h-4 mr-1" />
                  Configure
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <BarChart className="w-4 h-4 mr-1" />
                  Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
