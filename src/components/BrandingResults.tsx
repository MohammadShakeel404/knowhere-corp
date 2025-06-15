
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Palette, 
  Type, 
  Target, 
  TrendingUp, 
  Lightbulb, 
  CheckCircle,
  Download,
  Share2
} from 'lucide-react';

interface BrandingResultsProps {
  results: {
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
  };
}

const BrandingResults: React.FC<BrandingResultsProps> = ({ results }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'business-branding-strategy.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Your Brand Strategy</h2>
        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline" size="sm" className="rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Identity */}
        <Card className="border-0 shadow-lg rounded-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="w-5 h-5 text-blue-500" />
              Brand Identity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Mission Statement</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{results.brandIdentity.missionStatement}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Value Proposition</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{results.brandIdentity.valueProposition}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Brand Personality</h4>
              <div className="flex flex-wrap gap-2">
                {results.brandIdentity.brandPersonality.map((trait, index) => (
                  <Badge key={index} variant="secondary" className="rounded-lg">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Brand Voice</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{results.brandIdentity.brandVoice}</p>
            </div>
          </CardContent>
        </Card>

        {/* Visual Identity */}
        <Card className="border-0 shadow-lg rounded-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Palette className="w-5 h-5 text-purple-500" />
              Visual Identity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Color Palette</h4>
              <div className="flex gap-4 mb-3">
                <div className="flex flex-col items-center">
                  <div 
                    className="w-12 h-12 rounded-lg shadow-md border"
                    style={{ backgroundColor: results.visualIdentity.colorPalette.primary }}
                  ></div>
                  <span className="text-xs text-gray-600 mt-1">Primary</span>
                  <span className="text-xs font-mono">{results.visualIdentity.colorPalette.primary}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div 
                    className="w-12 h-12 rounded-lg shadow-md border"
                    style={{ backgroundColor: results.visualIdentity.colorPalette.secondary }}
                  ></div>
                  <span className="text-xs text-gray-600 mt-1">Secondary</span>
                  <span className="text-xs font-mono">{results.visualIdentity.colorPalette.secondary}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div 
                    className="w-12 h-12 rounded-lg shadow-md border"
                    style={{ backgroundColor: results.visualIdentity.colorPalette.accent }}
                  ></div>
                  <span className="text-xs text-gray-600 mt-1">Accent</span>
                  <span className="text-xs font-mono">{results.visualIdentity.colorPalette.accent}</span>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{results.visualIdentity.colorPalette.description}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                <Type className="w-4 h-4" />
                Typography
              </h4>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium">Primary: </span>
                  <span className="text-sm text-gray-700">{results.visualIdentity.typography.primary}</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Secondary: </span>
                  <span className="text-sm text-gray-700">{results.visualIdentity.typography.secondary}</span>
                </div>
                <p className="text-gray-700 text-sm">{results.visualIdentity.typography.description}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Logo Suggestions</h4>
              <ul className="space-y-1">
                {results.visualIdentity.logoSuggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Tactics */}
      <Card className="border-0 shadow-lg rounded-2xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Growth Tactics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.growthTactics.map((tactic, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-xl bg-gray-50/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{tactic.category}</h4>
                  <Badge className={`${getPriorityColor(tactic.priority)} text-xs`}>
                    {tactic.priority}
                  </Badge>
                </div>
                <ul className="space-y-2 mb-3">
                  {tactic.tactics.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-600">Timeline: {tactic.timeline}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Marketing Strategies */}
      <Card className="border-0 shadow-lg rounded-2xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Marketing Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(results.marketingStrategies).map(([category, strategies]) => (
              <div key={category}>
                <h4 className="font-medium text-gray-900 mb-3 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <ul className="space-y-2">
                  {strategies.map((strategy, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                      {strategy}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competitive Advantages */}
      <Card className="border-0 shadow-lg rounded-2xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5 text-orange-500" />
            Competitive Advantages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {results.competitiveAdvantages.map((advantage, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border border-gray-200 rounded-xl bg-gray-50/50">
                <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{advantage}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Plan */}
      <Card className="border-0 shadow-lg rounded-2xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle className="w-5 h-5 text-purple-500" />
            90-Day Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.actionPlan.map((phase, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{phase.phase}</h4>
                  <Badge variant="outline" className="text-xs">
                    {phase.duration}
                  </Badge>
                </div>
                <ul className="space-y-2">
                  {phase.tasks.map((task, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandingResults;
