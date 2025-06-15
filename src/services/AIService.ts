
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
}

export class AIService {
  private static API_KEY_STORAGE_KEY = 'openai_api_key';
  private static BASE_URL = 'https://api.openai.com/v1/chat/completions';
  private static DEFAULT_API_KEY = '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';

  static saveApiKey(apiKey: string): void {
    if (!apiKey || !apiKey.trim()) {
      throw new Error('API key cannot be empty');
    }
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey.trim());
    console.log('OpenAI API key saved successfully');
  }

  static getApiKey(): string | null {
    const stored = localStorage.getItem(this.API_KEY_STORAGE_KEY);
    return stored || this.DEFAULT_API_KEY;
  }

  static clearApiKey(): void {
    localStorage.removeItem(this.API_KEY_STORAGE_KEY);
  }

  static async testApiKey(apiKey: string): Promise<boolean> {
    if (!apiKey || !apiKey.trim()) {
      return false;
    }

    try {
      const response = await fetch(this.BASE_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey.trim()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: 'Hello' }],
          max_tokens: 10
        }),
      });

      if (response.status === 401) {
        return false;
      }

      return response.ok;
    } catch (error) {
      console.error('Error testing API key:', error);
      return false;
    }
  }

  static async generateBusinessInsight(request: AIRequest): Promise<AIResponse> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not found. Please configure your API key first.');
    }

    if (!request.prompt || !request.prompt.trim()) {
      throw new Error('Please provide a business question or scenario.');
    }

    const systemPrompt = this.getSystemPrompt(request.type || 'general');
    
    try {
      const response = await fetch(this.BASE_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { 
              role: 'user', 
              content: request.context ? 
                `Context: ${request.context}\n\nRequest: ${request.prompt}` : 
                request.prompt 
            }
          ],
          temperature: 0.7,
          max_tokens: 1500
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your OpenAI API key and try again.');
        }
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again in a moment.');
        }
        if (response.status === 500) {
          throw new Error('OpenAI service is temporarily unavailable. Please try again later.');
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error('No response generated from AI. Please try again.');
      }

      const suggestions = this.extractSuggestions(content);
      const actionItems = this.extractActionItems(content);

      return {
        content,
        type: request.type || 'general',
        confidence: Math.random() * 0.3 + 0.7, // Random confidence between 0.7-1.0
        suggestions,
        actionItems
      };
    } catch (error) {
      console.error('Error generating AI insight:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to generate AI insight. Please try again.');
    }
  }

  private static getSystemPrompt(type: string): string {
    const prompts = {
      analysis: `You are a senior business analyst AI. Provide detailed, data-driven analysis with actionable insights. Focus on identifying trends, opportunities, and potential risks. Structure your response with clear headings and bullet points. Always include specific, measurable recommendations and potential action items.`,
      
      recommendation: `You are a business strategy consultant AI. Provide clear, prioritized recommendations based on industry best practices. Structure your response with: 1) Executive Summary, 2) Key Recommendations (prioritized by impact and feasibility), 3) Implementation Steps, 4) Expected Outcomes. Be specific and actionable.`,
      
      automation: `You are a business process automation expert AI. Identify specific processes that can be automated, suggest appropriate tools and workflows, and provide detailed implementation guidance. Focus on ROI, efficiency gains, and practical implementation steps. Include technology recommendations and estimated timelines.`,
      
      general: `You are an experienced business management consultant AI. Provide helpful, professional advice for business operations, strategy, and decision-making. Structure your response clearly with actionable insights, potential challenges, and recommended next steps. Be practical and results-oriented.`
    };
    return prompts[type] || prompts.general;
  }

  private static extractSuggestions(content: string): string[] {
    const suggestions: string[] = [];
    const lines = content.split('\n');
    
    lines.forEach(line => {
      const cleanLine = line.trim();
      // Look for bullet points, numbered lists, or suggestion indicators
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

  private static extractActionItems(content: string): string[] {
    const actionItems: string[] = [];
    const lines = content.split('\n');
    
    lines.forEach(line => {
      const cleanLine = line.trim().toLowerCase();
      // Look for action-oriented language
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
}
