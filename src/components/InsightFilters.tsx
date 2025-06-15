
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
    <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search insights by content, category, or type..."
                value={searchFilter}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-12 h-12 text-sm border-gray-200 focus:border-gray-400 focus:ring-gray-300 rounded-xl bg-gray-50 transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filter:</span>
            </div>
            <select
              value={typeFilter}
              onChange={(e) => onTypeChange(e.target.value)}
              className="px-5 py-3 border border-gray-200 rounded-xl text-sm font-medium bg-gray-50 focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none min-w-[150px] transition-all"
            >
              <option value="all">All Types</option>
              {analysisTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        {(searchFilter || typeFilter !== 'all') && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs text-gray-500 font-medium">Active filters:</span>
              {searchFilter && (
                <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200">
                  Search: "{searchFilter}"
                  <button
                    onClick={() => onSearchChange('')}
                    className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              {typeFilter !== 'all' && (
                <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200">
                  Type: {analysisTypes.find(t => t.value === typeFilter)?.label}
                  <button
                    onClick={() => onTypeChange('all')}
                    className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
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
