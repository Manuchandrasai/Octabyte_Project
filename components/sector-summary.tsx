'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dynamic from 'next/dynamic';
import { SectorSummary } from '@/types/portfolio';
import { formatCurrency, formatPercent } from '@/lib/portfolio-utils';

const Progress = dynamic(() => import('@/components/ui/progress').then(m => m.Progress), {
  ssr: false,
});

interface SectorSummaryProps {
  sectors: SectorSummary[];
}

const sectorColors = {
  Technology: 'bg-blue-500',
  Banking: 'bg-green-500',
  FMCG: 'bg-yellow-500',
  Pharmaceuticals: 'bg-purple-500',
  Automotive: 'bg-red-500',
  Energy: 'bg-orange-500',
  Metals: 'bg-gray-500',
};

export function SectorSummaryComponent({ sectors }: SectorSummaryProps) {
  return (
    <Card className="mb-6 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">
          Sector Allocation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sectors.map((sector) => {
            const isPositive = sector.totalGainLoss >= 0;
            const colorClass =
              sectorColors[sector.sector as keyof typeof sectorColors] || 'bg-gray-500';

            return (
              <div key={sector.sector} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${colorClass}`} />
                    <span className="font-medium text-slate-700">{sector.sector}</span>
                    <span className="text-sm text-slate-500">
                      ({sector.stocks.length} stocks)
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-slate-800">
                      {formatCurrency(sector.totalValue)}
                    </div>
                    <div
                      className={`text-sm ${
                        isPositive ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {formatPercent(sector.totalGainLossPercent)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={sector.weight} className="flex-1 h-2" />
                  <span className="text-sm text-slate-600 min-w-[3rem]">
                    {sector.weight.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
