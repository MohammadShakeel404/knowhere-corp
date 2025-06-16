
-- Create the missing enums first
CREATE TYPE public.project_type AS ENUM ('website', 'web_app', 'mobile_app', 'landing_page');
CREATE TYPE public.project_status AS ENUM ('draft', 'generating', 'completed', 'deployed', 'archived');

-- Add missing columns to the projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS branding_data JSONB,
ADD COLUMN IF NOT EXISTS requirements JSONB,
ADD COLUMN IF NOT EXISTS generated_code JSONB,
ADD COLUMN IF NOT EXISTS deployment_config JSONB,
ADD COLUMN IF NOT EXISTS github_repo TEXT,
ADD COLUMN IF NOT EXISTS live_url TEXT;

-- First remove the default value, then change the type
ALTER TABLE public.projects ALTER COLUMN status DROP DEFAULT;
ALTER TABLE public.projects ALTER COLUMN status TYPE project_status USING 
  CASE 
    WHEN status = 'active' THEN 'draft'::project_status
    WHEN status = 'inactive' THEN 'archived'::project_status
    ELSE 'draft'::project_status
  END;

-- Update the project_type column to use the enum
ALTER TABLE public.projects 
ALTER COLUMN project_type TYPE project_type USING 
  CASE 
    WHEN project_type IS NULL OR project_type = '' THEN 'website'::project_type
    ELSE project_type::project_type
  END;

-- Set default values after the type changes
ALTER TABLE public.projects 
ALTER COLUMN project_type SET DEFAULT 'website'::project_type,
ALTER COLUMN status SET DEFAULT 'draft'::project_status;
