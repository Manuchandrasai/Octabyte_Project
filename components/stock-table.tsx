'use client';

import React from 'react';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { SectorSummary } from '@/types/portfolio';
import { formatCurrency, formatPercent } from '@/lib/portfolio-utils';

interface StockTableProps {
  sectors: SectorSummary[];
}

export function StockTable({ sectors }: StockTableProps) {
  const [expandedSectors, setExpandedSectors] = useState<Set<string>>(
    new Set(sectors.map(s => s.sector))
  );

  const toggleSector = (sector: string) => {
    const newExpanded = new Set(expandedSectors);
    if (newExpanded.has(sector)) {
      newExpanded.delete(sector);
    } else {
      newExpanded.add(sector);
    }
    setExpandedSectors(newExpanded);
  };

  const sectorColors = {
    Technology: 'bg-blue-100 text-blue-800 border-blue-200',
    Banking: 'bg-green-100 text-green-800 border-green-200',
    FMCG: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Pharmaceuticals: 'bg-purple-100 text-purple-800 border-purple-200',
    Automotive: 'bg-red-100 text-red-800 border-red-200',
    Energy: 'bg-orange-100 text-orange-800 border-orange-200',
    Metals: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  return (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">
          Portfolio Holdings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="font-semibold text-slate-700">Stock</TableHead>
                <TableHead className="font-semibold text-slate-700">Qty</TableHead>
                <TableHead className="font-semibold text-slate-700">Avg Price</TableHead>
                <TableHead className="font-semibold text-slate-700">CMP</TableHead>
                <TableHead className="font-semibold text-slate-700">Change</TableHead>
                <TableHead className="font-semibold text-slate-700">Market Value</TableHead>
                <TableHead className="font-semibold text-slate-700">P&L</TableHead>
                <TableHead className="font-semibold text-slate-700">P/E</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sectors.map((sector) => (
                <React.Fragment key={sector.sector}>
                  <TableRow className="bg-slate-50 hover:bg-slate-100 border-t-2">
                    <TableCell colSpan={8}>
                      <Button
                        variant="ghost"
                        onClick={() => toggleSector(sector.sector)}
                        className="flex items-center space-x-2 p-0 h-auto font-semibold text-slate-800"
                      >
                        {expandedSectors.has(sector.sector) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <Badge 
                          variant="outline" 
                          className={sectorColors[sector.sector as keyof typeof sectorColors] || 'bg-gray-100 text-gray-800'}
                        >
                          {sector.sector}
                        </Badge>
                        <span className="text-sm text-slate-600">
                          {formatCurrency(sector.totalValue)} • {formatPercent(sector.totalGainLossPercent)}
                        </span>
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedSectors.has(sector.sector) &&
                    sector.stocks.map((stock) => {
                      const isPositive = (stock.gainLoss || 0) >= 0;
                      const isPricePositive = (stock.change || 0) >= 0;
                      
                      return (
                        <TableRow 
                          key={stock.symbol} 
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <TableCell>
                            <div>
                              <div className="font-medium text-slate-800">{stock.name}</div>
                              <div className="text-sm text-slate-500">{stock.symbol}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-700">{stock.quantity}</TableCell>
                          <TableCell className="text-slate-700">
                            {formatCurrency(stock.avgPrice)}
                          </TableCell>
                          <TableCell className="text-slate-700">
                            {stock.currentPrice ? formatCurrency(stock.currentPrice) : '-'}
                          </TableCell>
                          <TableCell>
                            {stock.change !== undefined ? (
                              <div className={`flex items-center space-x-1 ${
                                isPricePositive ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {isPricePositive ? (
                                  <TrendingUp className="h-3 w-3" />
                                ) : (
                                  <TrendingDown className="h-3 w-3" />
                                )}
                                <span className="text-sm font-medium">
                                  {formatPercent(stock.changePercent || 0)}
                                </span>
                              </div>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell className="font-medium text-slate-800">
                            {stock.marketValue ? formatCurrency(stock.marketValue) : '-'}
                          </TableCell>
                          <TableCell>
                            {stock.gainLoss !== undefined ? (
                              <div className={`${
                                isPositive ? 'text-green-600' : 'text-red-600'
                              }`}>
                                <div className="font-medium">
                                  {formatCurrency(stock.gainLoss)}
                                </div>
                                <div className="text-sm">
                                  {formatPercent(stock.gainLossPercent || 0)}
                                </div>
                              </div>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell className="text-slate-700">
                            {stock.peRatio ? stock.peRatio.toFixed(1) : '-'}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}