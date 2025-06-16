
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ProjectCreationForm from '@/components/ProjectCreationForm';
import ProjectsList from '@/components/ProjectsList';
import ProjectCodeEditor from '@/components/ProjectCodeEditor';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Globe, Smartphone, FileCode, Plus, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WebsiteDevelopmentService } from '@/services/WebsiteDevelopmentService';

interface Project {
  id: string;
  name: string;
  description: string;
  project_type: 'website' | 'web_app' | 'mobile_app' | 'landing_page';
  status: 'draft' | 'generating' | 'completed' | 'deployed' | 'archived';
  branding_data?: any;
  requirements?: any;
  generated_code?: any;
  deployment_config?: any;
  github_repo?: string;
  live_url?: string;
  created_at: string;
  updated_at: string;
}

const WebsiteDevelopment = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      loadProjects();
    }
  }, [user]);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const userProjects = await WebsiteDevelopmentService.getUserProjects();
      setProjects(userProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async (projectData: {
    name: string;
    description: string;
    project_type: 'website' | 'web_app' | 'mobile_app' | 'landing_page';
    requirements: any;
    branding_data?: any;
  }) => {
    try {
      setIsLoading(true);
      const newProject = await WebsiteDevelopmentService.createProject(projectData);
      setProjects(prev => [newProject, ...prev]);
      setSelectedProject(newProject);
      setActiveTab('editor');
      
      // Start code generation
      await generateProjectCode(newProject.id, projectData);
      
      toast({
        title: "Success!",
        description: "Project created successfully. Code generation started.",
      });
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateProjectCode = async (projectId: string, projectData: any) => {
    try {
      await WebsiteDevelopmentService.generateProjectCode(projectId, projectData);
      await loadProjects(); // Refresh projects to get updated status
      toast({
        title: "Code Generated!",
        description: "Your project code has been generated successfully.",
      });
    } catch (error) {
      console.error('Error generating code:', error);
      toast({
        title: "Error",
        description: "Failed to generate project code",
        variant: "destructive",
      });
    }
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setActiveTab('editor');
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setActiveTab('projects');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Code className="w-12 h-12 mx-auto mb-4 text-blue-500 animate-spin" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pt-20 sm:pt-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                AI Website & App Development
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Create complete websites and applications with AI-powered development and source code management
            </p>
          </div>

          {selectedProject ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  onClick={handleBackToProjects}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Projects</span>
                </Button>
                <h2 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h2>
              </div>
              
              <ProjectCodeEditor 
                project={selectedProject} 
                onProjectUpdate={loadProjects}
              />
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="projects" className="flex items-center space-x-2">
                  <FileCode className="w-4 h-4" />
                  <span>My Projects</span>
                </TabsTrigger>
                <TabsTrigger value="create" className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>New Project</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="space-y-6">
                <ProjectsList 
                  projects={projects}
                  isLoading={isLoading}
                  onProjectSelect={handleProjectSelect}
                  onProjectsUpdate={loadProjects}
                />
              </TabsContent>

              <TabsContent value="create" className="space-y-6">
                <ProjectCreationForm 
                  onCreateProject={handleCreateProject}
                  isLoading={isLoading}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteDevelopment;
