
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Shield, Bell, Database, Mail, Key, Save } from 'lucide-react';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'Knowhere Corp',
    adminEmail: 'admin@knowherecorp.com',
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    emailNotifications: true,
    maintenanceMode: false,
    apiRateLimit: 1000,
    autoBackup: true,
  });

  const handleSave = (section: string) => {
    console.log(`Saving ${section} settings:`, settings);
    // Here you would typically save to your backend
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-1">Configure platform settings and preferences</p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>General Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input 
                id="siteName" 
                value={settings.siteName}
                onChange={(e) => updateSetting('siteName', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input 
                id="adminEmail" 
                type="email"
                value={settings.adminEmail}
                onChange={(e) => updateSetting('adminEmail', e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-gray-500">Receive system notifications via email</p>
              </div>
              <Switch 
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                <p className="text-sm text-gray-500">Enable maintenance mode for updates</p>
              </div>
              <Switch 
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => updateSetting('maintenanceMode', checked)}
              />
            </div>
            <Button 
              onClick={() => handleSave('general')}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
            >
              <Save className="w-4 h-4 mr-2" />
              Save General Settings
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Security Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input 
                id="sessionTimeout" 
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
              <Input 
                id="maxLoginAttempts" 
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => updateSetting('maxLoginAttempts', parseInt(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="apiRateLimit">API Rate Limit (requests/hour)</Label>
              <Input 
                id="apiRateLimit" 
                type="number"
                value={settings.apiRateLimit}
                onChange={(e) => updateSetting('apiRateLimit', parseInt(e.target.value))}
                className="mt-1"
              />
            </div>
            <Button 
              onClick={() => handleSave('security')}
              className="w-full bg-gradient-to-r from-red-500 to-pink-600"
            >
              <Shield className="w-4 h-4 mr-2" />
              Update Security
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notification Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label>User Registration Alerts</Label>
                  <p className="text-sm text-gray-500">Get notified when new users register</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>System Alerts</Label>
                  <p className="text-sm text-gray-500">Critical system notifications</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Performance Alerts</Label>
                  <p className="text-sm text-gray-500">Service performance warnings</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Usage Reports</Label>
                  <p className="text-sm text-gray-500">Weekly usage summary emails</p>
                </div>
                <Switch />
              </div>
            </div>
            <Button 
              onClick={() => handleSave('notifications')}
              className="w-full bg-gradient-to-r from-green-500 to-teal-600"
            >
              <Bell className="w-4 h-4 mr-2" />
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>

        {/* Database & Backup */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>Database & Backup</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoBackup">Automatic Backups</Label>
                <p className="text-sm text-gray-500">Daily automated database backups</p>
              </div>
              <Switch 
                id="autoBackup"
                checked={settings.autoBackup}
                onCheckedChange={(checked) => updateSetting('autoBackup', checked)}
              />
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <Database className="w-4 h-4 mr-2" />
                Create Manual Backup
              </Button>
              <Button variant="outline" className="w-full">
                <Database className="w-4 h-4 mr-2" />
                Restore from Backup
              </Button>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Last Backup:</strong> Today at 3:00 AM
              </p>
              <p className="text-sm text-blue-600">
                Next scheduled backup: Tomorrow at 3:00 AM
              </p>
            </div>
            <Button 
              onClick={() => handleSave('database')}
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-600"
            >
              <Database className="w-4 h-4 mr-2" />
              Save Database Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* API Keys Section */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>API Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="openaiKey">OpenAI API Key</Label>
              <Input 
                id="openaiKey" 
                type="password"
                placeholder="sk-..."
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">Required for AI services</p>
            </div>
            <div>
              <Label htmlFor="supabaseKey">Supabase Service Key</Label>
              <Input 
                id="supabaseKey" 
                type="password"
                placeholder="sbp_..."
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">Database service configuration</p>
            </div>
          </div>
          <Button 
            onClick={() => handleSave('api')}
            className="mt-4 bg-gradient-to-r from-purple-500 to-indigo-600"
          >
            <Key className="w-4 h-4 mr-2" />
            Update API Configuration
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
