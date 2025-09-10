'use client';

import { RefreshCw, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RefreshIndicatorProps {
  loading: boolean;
  lastUpdated: Date | null;
  onRefresh: () => void;
}

export function RefreshIndicator({ loading, lastUpdated, onRefresh }: RefreshIndicatorProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-slate-600" />
          <span className="text-sm text-slate-700">
            Last updated: {lastUpdated ? formatTime(lastUpdated) : 'N/A'}
          </span>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Live</span>
          </div>
        </Badge>
      </div>
      
      <Button
        onClick={onRefresh}
        disabled={loading}
        variant="outline"
        size="sm"
        className="bg-white hover:bg-slate-50"
      >
        <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
        {loading ? 'Updating...' : 'Refresh'}
      </Button>
    </div>
  );
}