
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  CheckCircle, 
  Download, 
  Share2, 
  Bookmark,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface AIInsight {
  id: string;
  type: string;
  content: string;
  confidence?: number;
  suggestions?: string[];
  timestamp: Date;
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  actionItems?: string[];
}

interface BusinessInsightCardProps {
  insight: AIInsight;
  typeConfig: any;
  onExport: (insight: AIInsight) => void;
  onSave: (insight: AIInsight) => void;
}

const BusinessInsightCard: React.FC<BusinessInsightCardProps> = ({
  insight,
  typeConfig,
  onExport,
  onSave
}) => {
  const Icon = typeConfig.icon;
  
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-r ${typeConfig.color} rounded-lg flex items-center justify-center`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-white">{typeConfig.label}</CardTitle>
              <p className="text-white/60 text-sm">{insight.timestamp.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {insight.priority && (
              <Badge className={getPriorityColor(insight.priority)}>
                {insight.priority === 'high' && <AlertTriangle className="w-3 h-3 mr-1" />}
                {insight.priority === 'medium' && <TrendingUp className="w-3 h-3 mr-1" />}
                {insight.priority === 'low' && <CheckCircle className="w-3 h-3 mr-1" />}
                {insight.priority} priority
              </Badge>
            )}
            {insight.confidence && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle className="w-3 h-3 mr-1" />
                {Math.round(insight.confidence * 100)}% confidence
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="prose prose-invert max-w-none">
          <p className="text-white/80 whitespace-pre-wrap">{insight.content}</p>
        </div>

        {insight.actionItems && insight.actionItems.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-white font-medium flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Action Items
            </h4>
            <div className="space-y-2">
              {insight.actionItems.map((item, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-white/70 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {insight.suggestions && insight.suggestions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-white font-medium flex items-center">
              <Lightbulb className="w-4 h-4 mr-2" />
              Key Suggestions
            </h4>
            <div className="space-y-2">
              {insight.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-white/70 text-sm">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSave(insight)}
              className="text-white/70 border-white/20 hover:bg-white/10"
            >
              <Bookmark className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport(insight)}
              className="text-white/70 border-white/20 hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-white/70 border-white/20 hover:bg-white/10"
          >
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessInsightCard;
