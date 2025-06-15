
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
  AlertTriangle,
  Clock
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
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case 'high': return AlertTriangle;
      case 'medium': return TrendingUp;
      case 'low': return CheckCircle;
      default: return CheckCircle;
    }
  };

  const PriorityIcon = getPriorityIcon(insight.priority);

  return (
    <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-r ${typeConfig.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base md:text-lg text-gray-800 truncate">{typeConfig.label}</CardTitle>
              <p className="text-gray-500 text-xs flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {insight.timestamp.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {insight.category && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                {insight.category}
              </Badge>
            )}
            {insight.priority && (
              <Badge className={`${getPriorityColor(insight.priority)} text-xs`}>
                <PriorityIcon className="w-3 h-3 mr-1" />
                {insight.priority}
              </Badge>
            )}
            {insight.confidence && (
              <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                {Math.round(insight.confidence * 100)}%
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="prose prose-gray max-w-none">
          <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap bg-gray-50 p-3 rounded-lg border border-gray-200">
            {insight.content}
          </div>
        </div>

        {insight.actionItems && insight.actionItems.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-gray-800 font-semibold text-sm flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
              Action Items
            </h4>
            <div className="space-y-2">
              {insight.actionItems.map((item, index) => (
                <div key={index} className="flex items-start space-x-2 p-2 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-green-800 text-xs font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {insight.suggestions && insight.suggestions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-gray-800 font-semibold text-sm flex items-center">
              <Lightbulb className="w-4 h-4 mr-2 text-yellow-600" />
              Key Suggestions
            </h4>
            <div className="space-y-2">
              {insight.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-2 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-yellow-800 text-xs">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-gray-200">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSave(insight)}
              className="border-purple-200 text-purple-600 hover:bg-purple-50 flex-1 sm:flex-initial"
            >
              <Bookmark className="w-3 h-3 mr-1" />
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport(insight)}
              className="border-blue-200 text-blue-600 hover:bg-blue-50 flex-1 sm:flex-initial"
            >
              <Download className="w-3 h-3 mr-1" />
              Export
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            <Share2 className="w-3 h-3 mr-1" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessInsightCard;
