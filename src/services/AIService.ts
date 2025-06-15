
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
}

export class AIService {
  private static API_KEY_STORAGE_KEY = 'openai_api_key';
  private static BASE_URL = 'https://api.openai.com/v1/chat/completions';

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
    console.log('OpenAI API key saved successfully');
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async testApiKey(apiKey: string): Promise<boolean> {
    try {
      const response = await fetch(this.BASE_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: 'Hello' }],
          max_tokens: 10
        }),
      });
      return response.ok;
    } catch (error) {
      console.error('Error testing API key:', error);
      return false;
    }
  }

  static async generateBusinessInsight(request: AIRequest): Promise<AIResponse> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not found. Please configure your API key.');
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
            { role: 'user', content: request.context ? `Context: ${request.context}\n\nRequest: ${request.prompt}` : request.prompt }
          ],
          temperature: 0.7,
          max_tokens: 1000
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to generate AI response');
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || 'No response generated';

      return {
        content,
        type: request.type || 'general',
        confidence: 0.85,
        suggestions: this.extractSuggestions(content)
      };
    } catch (error) {
      console.error('Error generating AI insight:', error);
      throw error;
    }
  }

  private static getSystemPrompt(type: string): string {
    const prompts = {
      analysis: `You are a business analyst AI. Provide detailed, data-driven analysis with actionable insights. Focus on trends, opportunities, and potential risks. Always include specific recommendations.`,
      recommendation: `You are a business strategy AI. Provide clear, actionable recommendations based on best practices. Prioritize suggestions by impact and feasibility.`,
      automation: `You are a business automation AI. Identify processes that can be automated, suggest tools and workflows, and provide implementation guidance.`,
      general: `You are a business management AI assistant. Provide helpful, professional advice for business operations, strategy, and decision-making.`
    };
    return prompts[type] || prompts.general;
  }

  private static extractSuggestions(content: string): string[] {
    const suggestions: string[] = [];
    const lines = content.split('\n');
    
    lines.forEach(line => {
      if (line.includes('•') || line.includes('-') || line.includes('1.') || line.includes('2.') || line.includes('3.')) {
        const cleaned = line.replace(/^[•\-\d\.]\s*/, '').trim();
        if (cleaned.length > 10) {
          suggestions.push(cleaned);
        }
      }
    });
    
    return suggestions.slice(0, 5); // Return top 5 suggestions
  }
}
