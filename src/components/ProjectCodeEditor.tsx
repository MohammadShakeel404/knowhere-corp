
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileCode, Download, ExternalLink, Github, Play, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WebsiteDevelopmentService } from '@/services/WebsiteDevelopmentService';

interface Project {
  id: string;
  name: string;
  description: string;
  project_type: 'website' | 'web_app' | 'mobile_app' | 'landing_page';
  status: 'draft' | 'generating' | 'completed' | 'deployed' | 'archived';
  generated_code?: any;
  github_repo?: string;
  live_url?: string;
}

interface ProjectFile {
  id: string;
  file_path: string;
  file_content: string;
  file_type: string;
}

interface ProjectCodeEditorProps {
  project: Project;
  onProjectUpdate: () => void;
}

const ProjectCodeEditor: React.FC<ProjectCodeEditorProps> = ({
  project,
  onProjectUpdate
}) => {
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadProjectFiles();
  }, [project.id]);

  const loadProjectFiles = async () => {
    try {
      setIsLoading(true);
      const projectFiles = await WebsiteDevelopmentService.getProjectFiles(project.id);
      setFiles(projectFiles);
      if (projectFiles.length > 0 && !selectedFile) {
        setSelectedFile(projectFiles[0]);
      }
    } catch (error) {
      console.error('Error loading project files:', error);
      toast({
        title: "Error",
        description: "Failed to load project files",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadProject = async () => {
    try {
      await WebsiteDevelopmentService.downloadProject(project.id);
      toast({
        title: "Success",
        description: "Project downloaded successfully",
      });
    } catch (error) {
      console.error('Error downloading project:', error);
      toast({
        title: "Error",
        description: "Failed to download project",
        variant: "destructive",
      });
    }
  };

  const handleDeployProject = async () => {
    try {
      setIsLoading(true);
      const deploymentUrl = await WebsiteDevelopmentService.deployProject(project.id);
      onProjectUpdate();
      toast({
        title: "Success",
        description: "Project deployed successfully",
      });
    } catch (error) {
      console.error('Error deploying project:', error);
      toast({
        title: "Error",
        description: "Failed to deploy project",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'html':
      case 'css':
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return FileCode;
      default:
        return FileCode;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: 'bg-gray-100 text-gray-800',
      generating: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      deployed: 'bg-purple-100 text-purple-800',
      archived: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{project.name}</CardTitle>
              <p className="text-gray-600 mt-1">{project.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              {getStatusBadge(project.status)}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadProject}
                  disabled={files.length === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                {project.status === 'completed' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDeployProject}
                    disabled={isLoading}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Deploy
                  </Button>
                )}
                {project.live_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(project.live_url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Site
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Code Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* File Tree */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Project Files</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : files.length === 0 ? (
              <p className="text-gray-500 text-sm">No files generated yet</p>
            ) : (
              <div className="space-y-1">
                {files.map((file) => {
                  const Icon = getFileIcon(file.file_type);
                  return (
                    <div
                      key={file.id}
                      className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors ${
                        selectedFile?.id === file.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedFile(file)}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium truncate">
                        {file.file_path.split('/').pop()}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Code Viewer */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedFile ? selectedFile.file_path : 'Select a file'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedFile ? (
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto max-h-96">
                <pre className="text-sm">
                  <code>{selectedFile.file_content}</code>
                </pre>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <FileCode className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Select a file to view its contents</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectCodeEditor;
