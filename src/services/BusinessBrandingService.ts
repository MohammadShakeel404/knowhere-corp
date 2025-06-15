
interface BrandingRequest {
  businessName: string;
  industry: string;
  targetAudience: string;
  businessDescription: string;
  currentChallenges?: string;
  goals?: string;
}

interface BrandingResponse {
  brandIdentity: {
    missionStatement: string;
    valueProposition: string;
    brandPersonality: string[];
    brandVoice: string;
  };
  visualIdentity: {
    colorPalette: {
      primary: string;
      secondary: string;
      accent: string;
      description: string;
    };
    typography: {
      primary: string;
      secondary: string;
      description: string;
    };
    logoSuggestions: string[];
  };
  growthTactics: {
    category: string;
    tactics: string[];
    priority: 'high' | 'medium' | 'low';
    timeline: string;
  }[];
  marketingStrategies: {
    digitalMarketing: string[];
    contentMarketing: string[];
    socialMedia: string[];
    traditionalMarketing: string[];
  };
  competitiveAdvantages: string[];
  actionPlan: {
    phase: string;
    tasks: string[];
    duration: string;
  }[];
}

export class BusinessBrandingService {
  private static API_KEY_STORAGE_KEY = 'openai_api_key';
  private static BASE_URL = 'https://api.openai.com/v1/chat/completions';

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY) || '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';
  }

  static async generateBusinessBranding(request: BrandingRequest): Promise<BrandingResponse> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not found. Please configure your API key first.');
    }

    const systemPrompt = `You are an expert business branding consultant and growth strategist. Create comprehensive branding and growth strategies for businesses. Provide detailed, actionable recommendations that are specific to the industry and target audience.

Structure your response as a valid JSON object with the following format:
{
  "brandIdentity": {
    "missionStatement": "string",
    "valueProposition": "string", 
    "brandPersonality": ["trait1", "trait2", "trait3"],
    "brandVoice": "string"
  },
  "visualIdentity": {
    "colorPalette": {
      "primary": "#hexcode",
      "secondary": "#hexcode", 
      "accent": "#hexcode",
      "description": "string explaining color choices"
    },
    "typography": {
      "primary": "font name",
      "secondary": "font name",
      "description": "string explaining font choices"
    },
    "logoSuggestions": ["suggestion1", "suggestion2", "suggestion3"]
  },
  "growthTactics": [
    {
      "category": "string",
      "tactics": ["tactic1", "tactic2"],
      "priority": "high|medium|low",
      "timeline": "string"
    }
  ],
  "marketingStrategies": {
    "digitalMarketing": ["strategy1", "strategy2"],
    "contentMarketing": ["strategy1", "strategy2"], 
    "socialMedia": ["strategy1", "strategy2"],
    "traditionalMarketing": ["strategy1", "strategy2"]
  },
  "competitiveAdvantages": ["advantage1", "advantage2"],
  "actionPlan": [
    {
      "phase": "string",
      "tasks": ["task1", "task2"],
      "duration": "string"
    }
  ]
}`;

    const userPrompt = `Create a comprehensive branding and growth strategy for:

Business Name: ${request.businessName}
Industry: ${request.industry}
Target Audience: ${request.targetAudience}
Business Description: ${request.businessDescription}
${request.currentChallenges ? `Current Challenges: ${request.currentChallenges}` : ''}
${request.goals ? `Goals: ${request.goals}` : ''}

Focus on:
1. Brand identity that resonates with the target audience
2. Visual identity with specific color codes and font recommendations
3. Growth tactics specific to the industry
4. Marketing strategies across all channels
5. Competitive advantages
6. Actionable 90-day plan

Make recommendations specific to the ${request.industry} industry and ${request.targetAudience} target audience.`;

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
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 3000
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your OpenAI API key and try again.');
        }
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error('No response generated from AI. Please try again.');
      }

      // Parse the JSON response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from AI.');
      }

      const brandingData = JSON.parse(jsonMatch[0]);
      return brandingData;
    } catch (error) {
      console.error('Error generating business branding:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to generate business branding. Please try again.');
    }
  }
}
