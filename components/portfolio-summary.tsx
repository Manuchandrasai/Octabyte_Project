'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { PortfolioSummary } from '@/types/portfolio';
import { formatCurrency, formatPercent } from '@/lib/portfolio-utils';

interface PortfolioSummaryProps {
  summary: PortfolioSummary;
}

export function PortfolioSummaryComponent({ summary }: PortfolioSummaryProps) {
  const isPositive = summary.totalGainLoss >= 0;
  const isDayPositive = summary.dayChange >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700">
            Total Portfolio Value
          </CardTitle>
          <div className="h-4 w-4 text-blue-600 flex items-center justify-center text-xs font-bold">₹</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">
            {formatCurrency(summary.totalValue)}
          </div>
          <p className="text-xs text-blue-600 mt-1">
            Investment: {formatCurrency(summary.totalInvestment)}
          </p>
        </CardContent>
      </Card>

      <Card className={`bg-gradient-to-br ${
        isPositive 
          ? 'from-green-50 to-green-100 border-green-200' 
          : 'from-red-50 to-red-100 border-red-200'
      }`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium ${
            isPositive ? 'text-green-700' : 'text-red-700'
          }`}>
            Total Gain/Loss
          </CardTitle>
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${
            isPositive ? 'text-green-900' : 'text-red-900'
          }`}>
            {formatCurrency(summary.totalGainLoss)}
          </div>
          <p className={`text-xs mt-1 ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {formatPercent(summary.totalGainLossPercent)}
          </p>
        </CardContent>
      </Card>

      <Card className={`bg-gradient-to-br ${
        isDayPositive 
          ? 'from-emerald-50 to-emerald-100 border-emerald-200' 
          : 'from-orange-50 to-orange-100 border-orange-200'
      }`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium ${
            isDayPositive ? 'text-emerald-700' : 'text-orange-700'
          }`}>
            Day Change
          </CardTitle>
          {isDayPositive ? (
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-orange-600" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${
            isDayPositive ? 'text-emerald-900' : 'text-orange-900'
          }`}>
            {formatCurrency(summary.dayChange)}
          </div>
          <p className={`text-xs mt-1 ${
            isDayPositive ? 'text-emerald-600' : 'text-orange-600'
          }`}>
            {formatPercent(summary.dayChangePercent)}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-700">
            Portfolio Diversity
          </CardTitle>
          <PieChart className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-900">
            {Math.round((summary.totalValue / summary.totalInvestment) * 100) || 0}%
          </div>
          <p className="text-xs text-purple-600 mt-1">
            Return Ratio
          </p>
        </CardContent>
      </Card>
    </div>
  );
}