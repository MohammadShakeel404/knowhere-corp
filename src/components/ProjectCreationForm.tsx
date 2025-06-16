
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Globe, Smartphone, Monitor, FileText, Palette } from 'lucide-react';

interface ProjectCreationFormProps {
  onCreateProject: (projectData: {
    name: string;
    description: string;
    project_type: 'website' | 'web_app' | 'mobile_app' | 'landing_page';
    requirements: any;
    branding_data?: any;
  }) => Promise<void>;
  isLoading: boolean;
}

const ProjectCreationForm: React.FC<ProjectCreationFormProps> = ({
  onCreateProject,
  isLoading
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    project_type: 'website' as 'website' | 'web_app' | 'mobile_app' | 'landing_page',
    industry: '',
    target_audience: '',
    features: '',
    design_preferences: '',
    color_scheme: '',
    tech_preferences: ''
  });

  const projectTypes = [
    {
      value: 'website',
      label: 'Business Website',
      description: 'Multi-page website with CMS',
      icon: Globe
    },
    {
      value: 'web_app',
      label: 'Web Application', 
      description: 'Interactive web application',
      icon: Monitor
    },
    {
      value: 'mobile_app',
      label: 'Mobile App',
      description: 'Progressive Web App',
      icon: Smartphone
    },
    {
      value: 'landing_page',
      label: 'Landing Page',
      description: 'Single page conversion focused',
      icon: FileText
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const requirements = {
      industry: formData.industry,
      target_audience: formData.target_audience,
      features: formData.features.split('\n').filter(f => f.trim()),
      design_preferences: formData.design_preferences,
      tech_preferences: formData.tech_preferences
    };

    const branding_data = formData.color_scheme ? {
      color_scheme: formData.color_scheme
    } : undefined;

    await onCreateProject({
      name: formData.name,
      description: formData.description,
      project_type: formData.project_type,
      requirements,
      branding_data
    });
  };

  const selectedType = projectTypes.find(type => type.value === formData.project_type);

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Project Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Monitor className="w-5 h-5" />
              <span>Project Type</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div
                    key={type.value}
                    className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.project_type === type.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, project_type: type.value as any }))}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className={`w-6 h-6 ${
                        formData.project_type === type.value ? 'text-blue-500' : 'text-gray-400'
                      }`} />
                      <div>
                        <h3 className="font-medium text-gray-900">{type.label}</h3>
                        <p className="text-sm text-gray-500">{type.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="My Awesome Project"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of your project..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="industry">Industry/Niche</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                placeholder="e.g., E-commerce, Healthcare, Education"
              />
            </div>

            <div>
              <Label htmlFor="target_audience">Target Audience</Label>
              <Input
                id="target_audience"
                value={formData.target_audience}
                onChange={(e) => setFormData(prev => ({ ...prev, target_audience: e.target.value }))}
                placeholder="e.g., Small business owners, Tech enthusiasts"
              />
            </div>
          </CardContent>
        </Card>

        {/* Features & Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Features & Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="features">Required Features (one per line)</Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                placeholder="User authentication&#10;Contact form&#10;Blog section&#10;Payment integration"
                rows={5}
              />
            </div>

            <div>
              <Label htmlFor="tech_preferences">Technology Preferences (optional)</Label>
              <Input
                id="tech_preferences"
                value={formData.tech_preferences}
                onChange={(e) => setFormData(prev => ({ ...prev, tech_preferences: e.target.value }))}
                placeholder="e.g., React, Vue, Vanilla JS"
              />
            </div>
          </CardContent>
        </Card>

        {/* Design Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-5 h-5" />
              <span>Design Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="design_preferences">Design Style</Label>
              <Textarea
                id="design_preferences"
                value={formData.design_preferences}
                onChange={(e) => setFormData(prev => ({ ...prev, design_preferences: e.target.value }))}
                placeholder="e.g., Modern and minimalist, Professional corporate look, Creative and colorful"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="color_scheme">Color Scheme (optional)</Label>
              <Input
                id="color_scheme"
                value={formData.color_scheme}
                onChange={(e) => setFormData(prev => ({ ...prev, color_scheme: e.target.value }))}
                placeholder="e.g., Blue and white, Dark theme, Brand colors: #FF6B6B, #4ECDC4"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isLoading || !formData.name.trim()}
            className="px-8 py-3 text-lg"
          >
            {isLoading ? 'Creating Project...' : 'Create Project & Generate Code'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectCreationForm;
