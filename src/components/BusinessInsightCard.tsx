
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
  Clock,
  Trash2
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
  onDelete?: (insight: AIInsight) => void;
}

const BusinessInsightCard: React.FC<BusinessInsightCardProps> = ({
  insight,
  typeConfig,
  onExport,
  onSave,
  onDelete
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
    <Card className="shadow-md border-0 bg-white hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <div className={`w-8 h-8 bg-gradient-to-r ${typeConfig.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-sm text-gray-800 truncate">{typeConfig.label}</CardTitle>
              <p className="text-gray-500 text-xs flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {insight.timestamp.toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            {insight.category && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs px-1 py-0">
                {insight.category}
              </Badge>
            )}
            {insight.priority && (
              <Badge className={`${getPriorityColor(insight.priority)} text-xs px-1 py-0`}>
                <PriorityIcon className="w-2 h-2 mr-1" />
                {insight.priority}
              </Badge>
            )}
            {insight.confidence && (
              <Badge className="bg-green-50 text-green-700 border-green-200 text-xs px-1 py-0">
                {Math.round(insight.confidence * 100)}%
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-2 rounded-md border border-gray-200 max-h-32 overflow-y-auto">
          {insight.content}
        </div>

        {insight.actionItems && insight.actionItems.length > 0 && (
          <div className="space-y-1">
            <h4 className="text-gray-800 font-semibold text-xs flex items-center">
              <CheckCircle className="w-3 h-3 mr-1 text-green-600" />
              Actions
            </h4>
            <div className="space-y-1 max-h-20 overflow-y-auto">
              {insight.actionItems.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-start space-x-1 p-1 bg-green-50 rounded border border-green-200">
                  <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-green-800 text-xs">{item}</p>
                </div>
              ))}
              {insight.actionItems.length > 3 && (
                <p className="text-xs text-gray-500">+{insight.actionItems.length - 3} more items</p>
              )}
            </div>
          </div>
        )}

        {insight.suggestions && insight.suggestions.length > 0 && (
          <div className="space-y-1">
            <h4 className="text-gray-800 font-semibold text-xs flex items-center">
              <Lightbulb className="w-3 h-3 mr-1 text-yellow-600" />
              Suggestions
            </h4>
            <div className="space-y-1 max-h-20 overflow-y-auto">
              {insight.suggestions.slice(0, 2).map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-1 p-1 bg-yellow-50 rounded border border-yellow-200">
                  <div className="w-1 h-1 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-yellow-800 text-xs">{suggestion}</p>
                </div>
              ))}
              {insight.suggestions.length > 2 && (
                <p className="text-xs text-gray-500">+{insight.suggestions.length - 2} more suggestions</p>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-200">
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSave(insight)}
              className="border-purple-200 text-purple-600 hover:bg-purple-50 h-7 px-2 text-xs"
            >
              <Bookmark className="w-3 h-3 mr-1" />
              Saved
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport(insight)}
              className="border-blue-200 text-blue-600 hover:bg-blue-50 h-7 px-2 text-xs"
            >
              <Download className="w-3 h-3 mr-1" />
              Export
            </Button>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 text-gray-600 hover:bg-gray-50 h-7 px-2 text-xs"
            >
              <Share2 className="w-3 h-3 mr-1" />
              Share
            </Button>
            {onDelete && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(insight)}
                className="border-red-200 text-red-600 hover:bg-red-50 h-7 px-2 text-xs"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessInsightCard;
