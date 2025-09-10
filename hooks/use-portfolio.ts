'use client';

import { useState, useEffect, useCallback } from 'react';
import { Stock } from '@/types/portfolio';
import { portfolioData } from '@/data/portfolio-data';
import { calculateStockMetrics } from '@/lib/portfolio-utils';

export function usePortfolio() {
  const [stocks, setStocks] = useState<Stock[]>(portfolioData);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStockPrices = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call with mock data
      setStocks(prevStocks => {
        const updatedStocks = prevStocks.map(stock => {
          // Generate realistic price movements
          const basePrice = stock.avgPrice;
          const volatility = 0.05; // 5% volatility
          const randomChange = (Math.random() - 0.5) * 2 * volatility;
          const currentPrice = basePrice * (1 + randomChange);
          const change = currentPrice - basePrice;
          const changePercent = (change / basePrice) * 100;

          return calculateStockMetrics({
            ...stock,
            currentPrice,
            change,
            changePercent,
            peRatio: Math.random() * 30 + 10, // Mock P/E ratio
            earnings: `₹${(Math.random() * 100 + 50).toFixed(0)}`,
          });
        });
        return updatedStocks;
      });

      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching stock prices:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchStockPrices();

    // Set up auto-refresh every 15 seconds
    const interval = setInterval(fetchStockPrices, 15000);

    return () => clearInterval(interval);
  }, []);

  return {
    stocks,
    loading,
    lastUpdated,
    refreshData: fetchStockPrices,
  };
}