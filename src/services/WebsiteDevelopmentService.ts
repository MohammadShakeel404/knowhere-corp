
import { supabase } from '@/integrations/supabase/client';

interface ProjectData {
  name: string;
  description: string;
  project_type: 'website' | 'web_app' | 'mobile_app' | 'landing_page';
  requirements: any;
  branding_data?: any;
}

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

interface ProjectFile {
  id: string;
  file_path: string;
  file_content: string;
  file_type: string;
}

export class WebsiteDevelopmentService {
  static async createProject(projectData: ProjectData): Promise<Project> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          name: projectData.name,
          description: projectData.description,
          project_type: projectData.project_type,
          requirements: projectData.requirements,
          branding_data: projectData.branding_data,
          status: 'draft'
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  static async getUserProjects(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  static async getProject(projectId: string): Promise<Project> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  }

  static async updateProject(projectId: string, updates: Partial<Project>): Promise<void> {
    try {
      const { error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', projectId);

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  }

  static async deleteProject(projectId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }

  static async generateProjectCode(projectId: string, projectData: any): Promise<void> {
    try {
      // Update status to generating
      await this.updateProject(projectId, { status: 'generating' });

      // Call the edge function to generate code
      const { data, error } = await supabase.functions.invoke('generate-website-code', {
        body: {
          projectId,
          projectData
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      // Update project with generated code
      await this.updateProject(projectId, {
        status: 'completed',
        generated_code: data.generatedCode
      });

    } catch (error) {
      // Update status to draft if generation failed
      await this.updateProject(projectId, { status: 'draft' });
      console.error('Error generating project code:', error);
      throw error;
    }
  }

  static async getProjectFiles(projectId: string): Promise<ProjectFile[]> {
    try {
      const { data, error } = await supabase
        .from('project_files')
        .select('*')
        .eq('project_id', projectId)
        .order('file_path');

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching project files:', error);
      throw error;
    }
  }

  static async saveProjectFile(
    projectId: string,
    filePath: string,
    fileContent: string,
    fileType: string
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('project_files')
        .upsert({
          project_id: projectId,
          file_path: filePath,
          file_content: fileContent,
          file_type: fileType
        });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error saving project file:', error);
      throw error;
    }
  }

  static async downloadProject(projectId: string): Promise<void> {
    try {
      const { data, error } = await supabase.functions.invoke('download-project', {
        body: { projectId }
      });

      if (error) {
        throw new Error(error.message);
      }

      // Create and trigger download
      const blob = new Blob([data.zipFile], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${data.projectName}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading project:', error);
      throw error;
    }
  }

  static async deployProject(projectId: string): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke('deploy-project', {
        body: { projectId }
      });

      if (error) {
        throw new Error(error.message);
      }

      // Update project with deployment URL
      await this.updateProject(projectId, {
        status: 'deployed',
        live_url: data.deploymentUrl
      });

      return data.deploymentUrl;
    } catch (error) {
      console.error('Error deploying project:', error);
      throw error;
    }
  }
}
