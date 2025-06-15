
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface InsightFiltersProps {
  searchFilter: string;
  typeFilter: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  analysisTypes: Array<{ value: string; label: string }>;
}

const InsightFilters: React.FC<InsightFiltersProps> = ({
  searchFilter,
  typeFilter,
  onSearchChange,
  onTypeChange,
  analysisTypes
}) => {
  return (
    <Card className="bg-gray-50 border-gray-200">
      <CardContent className="p-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-3 h-3 absolute left-2 top-2.5 text-gray-400" />
              <Input
                placeholder="Search insights..."
                value={searchFilter}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8 h-8 text-sm"
              />
            </div>
          </div>
          <select
            value={typeFilter}
            onChange={(e) => onTypeChange(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-md text-xs h-8"
          >
            <option value="all">All Types</option>
            {analysisTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightFilters;
