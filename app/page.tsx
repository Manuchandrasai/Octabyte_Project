'use client';

import { PortfolioSummaryComponent } from '@/components/portfolio-summary';
import { SectorSummaryComponent } from '@/components/sector-summary';
import { StockTable } from '@/components/stock-table';
import { RefreshIndicator } from '@/components/refresh-indicator';
import { usePortfolio } from '@/hooks/use-portfolio';
import { groupBySector, calculatePortfolioSummary } from '@/lib/portfolio-utils';
import { BarChart3, TrendingUp, DollarSign, PieChart } from 'lucide-react';

export default function Home() {
  const { stocks, loading, lastUpdated, refreshData } = usePortfolio();
  
  const sectors = groupBySector(stocks);
  const portfolioSummary = calculatePortfolioSummary(stocks);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Portfolio Dashboard
              </h1>
              {/* <p className="text-slate-600">
                Real-time portfolio tracking with live market data
              </p> */}
            </div>
          </div>
          
          {/* Key Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              {/* <TrendingUp className="h-4 w-4 text-green-500" /> */}
              {/* <span>Real-time CMP</span> */}
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              {/* <PieChart className="h-4 w-4 text-blue-500" />
              <span>Sector Grouping</span> */}
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              {/* <DollarSign className="h-4 w-4 text-purple-500" />
              <span>P&L Tracking</span> */}
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              {/* <BarChart3 className="h-4 w-4 text-orange-500" />
              <span>Auto-refresh 15s</span> */}
            </div>
          </div>
        </div>

        {/* Refresh Indicator */}
        <RefreshIndicator
          loading={loading}
          lastUpdated={lastUpdated}
          onRefresh={refreshData}
        />

        {/* Portfolio Summary */}
        <PortfolioSummaryComponent summary={portfolioSummary} />

        {/* Sector Summary */}
        <SectorSummaryComponent sectors={sectors} />

        {/* Stock Table */}
        <StockTable sectors={sectors} />

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500">
          {/* <p>
            📊 Data from Yahoo Finance • 💹 P/E ratios from Google Finance • 
            🔒 Secure API integration
          </p> */}
        </div>
      </div>
    </div>
  );
}