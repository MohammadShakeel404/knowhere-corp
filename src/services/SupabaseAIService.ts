
import { supabase } from '@/integrations/supabase/client';

interface AIRequest {
  prompt: string;
  context?: string;
  type?: 'analysis' | 'recommendation' | 'automation' | 'general';
}

interface AIResponse {
  content: string;
  type: string;
  confidence?: number;
  suggestions?: string[];
  actionItems?: string[];
  category?: string;
  priority?: 'low' | 'medium' | 'high';
  id?: string;
}

interface SavedInsight {
  id: string;
  type: string;
  content: string;
  prompt: string;
  context?: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
  confidence?: number;
  suggestions?: string[];
  action_items?: string[];
  created_at: string;
  updated_at: string;
  user_id: string;
}

export class SupabaseAIService {
  static async generateBusinessInsight(request: AIRequest): Promise<AIResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-business-insights', {
        body: request
      });

      if (error) {
        throw new Error(error.message || 'Failed to generate insight');
      }

      return data;
    } catch (error) {
      console.error('Error generating AI insight:', error);
      throw error;
    }
  }

  static async getUserInsights(): Promise<SavedInsight[]> {
    try {
      // Use type assertion since TypeScript types haven't been regenerated yet
      const { data, error } = await (supabase as any)
        .from('ai_insights')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching user insights:', error);
      throw error;
    }
  }

  static async deleteInsight(id: string): Promise<void> {
    try {
      const { error } = await (supabase as any)
        .from('ai_insights')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error deleting insight:', error);
      throw error;
    }
  }

  static async updateInsight(id: string, updates: Partial<SavedInsight>): Promise<void> {
    try {
      const { error } = await (supabase as any)
        .from('ai_insights')
        .update(updates)
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error updating insight:', error);
      throw error;
    }
  }
}
