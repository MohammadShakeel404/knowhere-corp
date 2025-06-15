
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
  Trash2,
  ChevronDown,
  ChevronUp
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
  const [isExpanded, setIsExpanded] = React.useState(false);
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

  const shouldTruncateContent = insight.content.length > 200;
  const displayContent = shouldTruncateContent && !isExpanded 
    ? insight.content.substring(0, 200) + '...' 
    : insight.content;

  return (
    <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className={`w-12 h-12 bg-gradient-to-r ${typeConfig.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base text-gray-800 font-bold">{typeConfig.label} Insight</CardTitle>
              <p className="text-gray-500 text-sm flex items-center mt-1">
                <Clock className="w-3 h-3 mr-1" />
                {insight.timestamp.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {insight.category && (
              <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200 text-xs px-2 py-1 font-medium">
                {insight.category}
              </Badge>
            )}
            {insight.priority && (
              <Badge className={`${getPriorityColor(insight.priority)} text-xs px-2 py-1 font-medium border`}>
                <PriorityIcon className="w-3 h-3 mr-1" />
                {insight.priority.toUpperCase()}
              </Badge>
            )}
            {insight.confidence && (
              <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200 text-xs px-2 py-1 font-medium">
                {Math.round(insight.confidence * 100)}% confidence
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="relative">
          <div className="text-gray-700 leading-relaxed bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200">
            {displayContent}
          </div>
          {shouldTruncateContent && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 p-0 h-auto"
            >
              {isExpanded ? (
                <>
                  Show less <ChevronUp className="w-4 h-4 ml-1" />
                </>
              ) : (
                <>
                  Read more <ChevronDown className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          )}
        </div>

        {insight.actionItems && insight.actionItems.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-gray-800 font-bold text-sm flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
              Action Items
            </h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {insight.actionItems.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-green-800 text-sm font-medium">{item}</p>
                </div>
              ))}
              {insight.actionItems.length > 3 && (
                <p className="text-sm text-gray-500 ml-5">
                  +{insight.actionItems.length - 3} more action items
                </p>
              )}
            </div>
          </div>
        )}

        {insight.suggestions && insight.suggestions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-gray-800 font-bold text-sm flex items-center">
              <Lightbulb className="w-4 h-4 mr-2 text-yellow-600" />
              Strategic Suggestions
            </h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {insight.suggestions.slice(0, 2).map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-yellow-800 text-sm font-medium">{suggestion}</p>
                </div>
              ))}
              {insight.suggestions.length > 2 && (
                <p className="text-sm text-gray-500 ml-5">
                  +{insight.suggestions.length - 2} more suggestions
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSave(insight)}
              className="border-purple-200 text-purple-600 hover:bg-purple-50 h-9 px-3 text-sm font-medium"
            >
              <Bookmark className="w-4 h-4 mr-2" />
              Saved
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport(insight)}
              className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 h-9 px-3 text-sm font-medium"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 text-gray-600 hover:bg-gray-50 h-9 px-3 text-sm font-medium"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            {onDelete && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(insight)}
                className="border-red-200 text-red-600 hover:bg-red-50 h-9 px-3 text-sm font-medium"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessInsightCard;
