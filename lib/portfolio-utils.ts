import { Stock, SectorSummary, PortfolioSummary } from '@/types/portfolio';

export function calculateStockMetrics(stock: Stock): Stock {
  if (!stock.currentPrice) return stock;

  const marketValue = stock.quantity * stock.currentPrice;
  const investment = stock.quantity * stock.avgPrice;
  const gainLoss = marketValue - investment;
  const gainLossPercent = (gainLoss / investment) * 100;

  return {
    ...stock,
    marketValue,
    gainLoss,
    gainLossPercent,
  };
}

export function groupBySector(stocks: Stock[]): SectorSummary[] {
  const sectors = new Map<string, Stock[]>();
  
  stocks.forEach(stock => {
    if (!sectors.has(stock.sector)) {
      sectors.set(stock.sector, []);
    }
    sectors.get(stock.sector)!.push(stock);
  });

  const totalPortfolioValue = stocks.reduce((sum, stock) => 
    sum + (stock.marketValue || 0), 0);

  return Array.from(sectors.entries()).map(([sector, sectorStocks]) => {
    const totalValue = sectorStocks.reduce((sum, stock) => 
      sum + (stock.marketValue || 0), 0);
    const totalGainLoss = sectorStocks.reduce((sum, stock) => 
      sum + (stock.gainLoss || 0), 0);
    const totalInvestment = sectorStocks.reduce((sum, stock) => 
      sum + (stock.quantity * stock.avgPrice), 0);
    const totalGainLossPercent = totalInvestment > 0 ? 
      (totalGainLoss / totalInvestment) * 100 : 0;
    const weight = totalPortfolioValue > 0 ? 
      (totalValue / totalPortfolioValue) * 100 : 0;

    return {
      sector,
      totalValue,
      totalGainLoss,
      totalGainLossPercent,
      weight,
      stocks: sectorStocks,
    };
  }).sort((a, b) => b.totalValue - a.totalValue);
}

export function calculatePortfolioSummary(stocks: Stock[]): PortfolioSummary {
  const totalValue = stocks.reduce((sum, stock) => 
    sum + (stock.marketValue || 0), 0);
  const totalInvestment = stocks.reduce((sum, stock) => 
    sum + (stock.quantity * stock.avgPrice), 0);
  const totalGainLoss = totalValue - totalInvestment;
  const totalGainLossPercent = totalInvestment > 0 ? 
    (totalGainLoss / totalInvestment) * 100 : 0;

  // Mock day change for demo
  const dayChange = totalValue * 0.012; // 1.2% mock change
  const dayChangePercent = 1.2;

  return {
    totalValue,
    totalInvestment,
    totalGainLoss,
    totalGainLossPercent,
    dayChange,
    dayChangePercent,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(percent: number): string {
  return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
}