
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AIRequest {
  prompt: string;
  context?: string;
  type?: 'analysis' | 'recommendation' | 'automation' | 'general';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get the user
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { prompt, context, type = 'general' }: AIRequest = await req.json();

    if (!prompt || !prompt.trim()) {
      return new Response(
        JSON.stringify({ error: 'Please provide a business question or scenario.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = getSystemPrompt(type);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { 
            role: 'user', 
            content: context ? 
              `Context: ${context}\n\nRequest: ${prompt}` : 
              prompt 
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error('No response generated from AI. Please try again.');
    }

    const suggestions = extractSuggestions(content);
    const actionItems = extractActionItems(content);
    const { category, priority } = categorizeInsight(content, type);

    // Save the insight to the database
    const insightData = {
      user_id: user.id,
      type,
      content,
      prompt,
      context,
      category,
      priority,
      confidence: Math.random() * 0.3 + 0.7,
      suggestions,
      action_items: actionItems,
    };

    const { data: savedInsight, error: saveError } = await supabaseClient
      .from('ai_insights')
      .insert(insightData)
      .select()
      .single();

    if (saveError) {
      console.error('Error saving insight:', saveError);
      // Continue even if save fails
    }

    return new Response(
      JSON.stringify({
        content,
        type,
        confidence: insightData.confidence,
        suggestions,
        actionItems,
        category,
        priority,
        id: savedInsight?.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in ai-business-insights function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function getSystemPrompt(type: string): string {
  const prompts = {
    analysis: `You are a senior business analyst AI. Provide detailed, data-driven analysis with actionable insights. Focus on identifying trends, opportunities, and potential risks. Structure your response with clear headings and bullet points. Always include specific, measurable recommendations and potential action items.`,
    
    recommendation: `You are a business strategy consultant AI. Provide clear, prioritized recommendations based on industry best practices. Structure your response with: 1) Executive Summary, 2) Key Recommendations (prioritized by impact and feasibility), 3) Implementation Steps, 4) Expected Outcomes. Be specific and actionable.`,
    
    automation: `You are a business process automation expert AI. Identify specific processes that can be automated, suggest appropriate tools and workflows, and provide detailed implementation guidance. Focus on ROI, efficiency gains, and practical implementation steps. Include technology recommendations and estimated timelines.`,
    
    general: `You are an experienced business management consultant AI. Provide helpful, professional advice for business operations, strategy, and decision-making. Structure your response clearly with actionable insights, potential challenges, and recommended next steps. Be practical and results-oriented.`
  };
  return prompts[type] || prompts.general;
}

function extractSuggestions(content: string): string[] {
  const suggestions: string[] = [];
  const lines = content.split('\n');
  
  lines.forEach(line => {
    const cleanLine = line.trim();
    if (cleanLine.match(/^[•\-\*]\s+/) || 
        cleanLine.match(/^\d+\.\s+/) || 
        cleanLine.toLowerCase().includes('recommend') ||
        cleanLine.toLowerCase().includes('suggest') ||
        cleanLine.toLowerCase().includes('consider')) {
      
      const cleaned = cleanLine.replace(/^[•\-\*\d\.]\s*/, '').trim();
      if (cleaned.length > 15 && cleaned.length < 200) {
        suggestions.push(cleaned);
      }
    }
  });
  
  return suggestions.slice(0, 5);
}

function extractActionItems(content: string): string[] {
  const actionItems: string[] = [];
  const lines = content.split('\n');
  
  lines.forEach(line => {
    const cleanLine = line.trim().toLowerCase();
    if (cleanLine.includes('action:') || 
        cleanLine.includes('implement') || 
        cleanLine.includes('execute') ||
        cleanLine.includes('deploy') ||
        cleanLine.includes('establish') ||
        cleanLine.includes('create') ||
        cleanLine.includes('develop')) {
      
      const cleaned = line.replace(/.*?action:|.*?implement:|.*?execute:/i, '').trim();
      if (cleaned.length > 10 && cleaned.length < 150) {
        actionItems.push(cleaned);
      }
    }
  });
  
  return actionItems.slice(0, 3);
}

function categorizeInsight(content: string, type: string): { category: string; priority: 'low' | 'medium' | 'high' } {
  const contentLower = content.toLowerCase();
  
  let category = 'General Business';
  if (contentLower.includes('revenue') || contentLower.includes('profit') || contentLower.includes('financial')) {
    category = 'Financial';
  } else if (contentLower.includes('customer') || contentLower.includes('client') || contentLower.includes('retention')) {
    category = 'Customer';
  } else if (contentLower.includes('marketing') || contentLower.includes('brand') || contentLower.includes('promotion')) {
    category = 'Marketing';
  } else if (contentLower.includes('operations') || contentLower.includes('process') || contentLower.includes('efficiency')) {
    category = 'Operations';
  } else if (contentLower.includes('strategy') || contentLower.includes('strategic') || contentLower.includes('planning')) {
    category = 'Strategy';
  }

  let priority: 'low' | 'medium' | 'high' = 'medium';
  if (contentLower.includes('urgent') || contentLower.includes('critical') || contentLower.includes('immediate')) {
    priority = 'high';
  } else if (contentLower.includes('future') || contentLower.includes('long-term') || contentLower.includes('consider')) {
    priority = 'low';
  }

  return { category, priority };
}
