
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trash2, 
  Download, 
  Share2, 
  Archive, 
  CheckSquare,
  Square
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface BulkInsightActionsProps {
  insights: AIInsight[];
  selectedInsights: string[];
  onSelectionChange: (selected: string[]) => void;
  onBulkDelete: (ids: string[]) => void;
  onBulkExport: (insights: AIInsight[]) => void;
}

const BulkInsightActions: React.FC<BulkInsightActionsProps> = ({
  insights,
  selectedInsights,
  onSelectionChange,
  onBulkDelete,
  onBulkExport
}) => {
  const { toast } = useToast();
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleSelectAll = () => {
    if (isAllSelected) {
      onSelectionChange([]);
      setIsAllSelected(false);
    } else {
      onSelectionChange(insights.map(insight => insight.id));
      setIsAllSelected(true);
    }
  };

  const handleBulkShare = () => {
    if (selectedInsights.length === 0) return;
    
    const selectedData = insights.filter(insight => selectedInsights.includes(insight.id));
    const shareText = selectedData.map(insight => 
      `${insight.type.toUpperCase()}: ${insight.content.substring(0, 100)}...`
    ).join('\n\n');
    
    if (navigator.share) {
      navigator.share({
        title: 'AI Business Insights',
        text: shareText
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to Clipboard",
        description: `${selectedInsights.length} insights copied to clipboard`,
      });
    }
  };

  const handleBulkArchive = () => {
    if (selectedInsights.length === 0) return;
    
    // In a real app, you'd implement archiving functionality
    toast({
      title: "Insights Archived",
      description: `${selectedInsights.length} insights have been archived`,
    });
    onSelectionChange([]);
  };

  if (insights.length === 0) return null;

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSelectAll}
            className="text-gray-600 hover:text-gray-900"
          >
            {isAllSelected ? (
              <CheckSquare className="w-4 h-4" />
            ) : (
              <Square className="w-4 h-4" />
            )}
            <span className="ml-2">
              {selectedInsights.length > 0 ? `${selectedInsights.length} selected` : 'Select all'}
            </span>
          </Button>

          {selectedInsights.length > 0 && (
            <Badge variant="secondary" className="rounded-lg">
              {selectedInsights.length} insights selected
            </Badge>
          )}
        </div>

        {selectedInsights.length > 0 && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkExport(insights.filter(i => selectedInsights.includes(i.id)))}
              className="rounded-xl"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkShare}
              className="rounded-xl"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkArchive}
              className="rounded-xl"
            >
              <Archive className="w-4 h-4 mr-2" />
              Archive
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkDelete(selectedInsights)}
              className="rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkInsightActions;
