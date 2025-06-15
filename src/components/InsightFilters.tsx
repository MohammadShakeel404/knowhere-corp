
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

interface InsightFiltersProps {
  searchFilter: string;
  typeFilter: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  analysisTypes: Array<{ value: string; label: string; icon: any; color: string }>;
}

const InsightFilters: React.FC<InsightFiltersProps> = ({
  searchFilter,
  typeFilter,
  onSearchChange,
  onTypeChange,
  analysisTypes
}) => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-gray-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 min-w-0">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search insights by content, category, or type..."
                value={searchFilter}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-11 text-sm border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filter:</span>
            </div>
            <select
              value={typeFilter}
              onChange={(e) => onTypeChange(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 focus:outline-none min-w-[140px]"
            >
              <option value="all">All Types</option>
              {analysisTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        {(searchFilter || typeFilter !== 'all') && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-500">Active filters:</span>
              {searchFilter && (
                <span className="inline-flex items-center px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                  Search: "{searchFilter}"
                  <button
                    onClick={() => onSearchChange('')}
                    className="ml-1 text-indigo-500 hover:text-indigo-700"
                  >
                    ×
                  </button>
                </span>
              )}
              {typeFilter !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                  Type: {analysisTypes.find(t => t.value === typeFilter)?.label}
                  <button
                    onClick={() => onTypeChange('all')}
                    className="ml-1 text-purple-500 hover:text-purple-700"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InsightFilters;
