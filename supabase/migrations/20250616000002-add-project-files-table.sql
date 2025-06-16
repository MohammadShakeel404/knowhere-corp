
-- Create project files table for source code management
CREATE TABLE public.project_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  file_path TEXT NOT NULL,
  file_content TEXT NOT NULL,
  file_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, file_path)
);

-- Enable RLS
ALTER TABLE public.project_files ENABLE ROW LEVEL SECURITY;

-- RLS policies for project files
CREATE POLICY "Users can view files of their own projects" 
  ON public.project_files 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = project_files.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage files of their own projects" 
  ON public.project_files 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = project_files.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_project_files_project_id ON public.project_files(project_id);
