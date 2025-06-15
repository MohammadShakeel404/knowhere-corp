
-- Create the ai_insights table to store AI business insights
CREATE TABLE public.ai_insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  prompt TEXT NOT NULL,
  context TEXT,
  category TEXT,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')),
  confidence DECIMAL(3,2),
  suggestions TEXT[],
  action_items TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;

-- Create policies for ai_insights table
CREATE POLICY "Users can view their own insights" 
  ON public.ai_insights 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own insights" 
  ON public.ai_insights 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own insights" 
  ON public.ai_insights 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own insights" 
  ON public.ai_insights 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create an index for better performance
CREATE INDEX idx_ai_insights_user_id ON public.ai_insights(user_id);
CREATE INDEX idx_ai_insights_created_at ON public.ai_insights(created_at DESC);
