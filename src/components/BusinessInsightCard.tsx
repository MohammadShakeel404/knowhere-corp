
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  Download, 
  Trash2, 
  Clock, 
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Minus,
  ChevronDown,
  ChevronRight,
  CheckSquare,
  Square
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

interface TypeConfig {
  value: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

interface BusinessInsightCardProps {
  insight: AIInsight;
  typeConfig: TypeConfig;
  onSave?: (insight: AIInsight) => void;
  onExport?: (insight: AIInsight) => void;
  onDelete?: (insight: AIInsight) => void;
  isSelected?: boolean;
  onSelectionChange?: (selected: boolean) => void;
}

const BusinessInsightCard: React.FC<BusinessInsightCardProps> = ({
  insight,
  typeConfig,
  onSave,
  onExport,
  onDelete,
  isSelected = false,
  onSelectionChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = typeConfig.icon;

  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <Minus className="w-4 h-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden ${
      isSelected ? 'ring-2 ring-gray-900 shadow-lg' : ''
    }`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {onSelectionChange && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSelectionChange(!isSelected)}
                className="p-1 h-auto"
              >
                {isSelected ? (
                  <CheckSquare className="w-4 h-4 text-gray-900" />
                ) : (
                  <Square className="w-4 h-4 text-gray-400" />
                )}
              </Button>
            )}
            
            <div className={`w-10 h-10 bg-gradient-to-r ${typeConfig.color} rounded-xl flex items-center justify-center shadow-md`}>
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <Badge variant="secondary" className="text-xs px-2 py-1 rounded-lg">
                  {typeConfig.label}
                </Badge>
                {insight.category && (
                  <Badge variant="outline" className="text-xs px-2 py-1 rounded-lg">
                    {insight.category}
                  </Badge>
                )}
                {insight.priority && (
                  <Badge 
                    variant="outline" 
                    className={`text-xs px-2 py-1 rounded-lg border ${getPriorityColor(insight.priority)}`}
                  >
                    <span className="flex items-center">
                      {getPriorityIcon(insight.priority)}
                      <span className="ml-1 capitalize">{insight.priority}</span>
                    </span>
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                <span>{formatTimestamp(insight.timestamp)}</span>
                {insight.confidence && (
                  <>
                    <TrendingUp className="w-3 h-3 ml-3 mr-1" />
                    <span>{Math.round(insight.confidence * 100)}% confidence</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 h-auto text-gray-400 hover:text-gray-600"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          <div>
            <p className="text-gray-700 leading-relaxed">
              {isExpanded ? insight.content : truncateContent(insight.content)}
            </p>
          </div>

          {isExpanded && (
            <div className="space-y-4 pt-4 border-t border-gray-100">
              {insight.suggestions && insight.suggestions.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">Suggestions:</h4>
                  <ul className="space-y-1">
                    {insight.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {insight.actionItems && insight.actionItems.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">Action Items:</h4>
                  <ul className="space-y-1">
                    {insight.actionItems.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              {!isExpanded && insight.content.length > 200 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(true)}
                  className="text-xs h-7 px-3 rounded-lg text-gray-600 hover:text-gray-900"
                >
                  Read More
                </Button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {onSave && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSave(insight)}
                  className="h-8 px-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <Save className="w-3 h-3 mr-1" />
                  <span className="text-xs">Save</span>
                </Button>
              )}
              
              {onExport && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onExport(insight)}
                  className="h-8 px-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <Download className="w-3 h-3 mr-1" />
                  <span className="text-xs">Export</span>
                </Button>
              )}
              
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(insight)}
                  className="h-8 px-3 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  <span className="text-xs">Delete</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessInsightCard;
