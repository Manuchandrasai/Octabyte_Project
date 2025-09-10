export interface Stock {
  symbol: string;
  name: string;
  sector: string;
  quantity: number;
  avgPrice: number;
  currentPrice?: number;
  change?: number;
  changePercent?: number;
  marketValue?: number;
  gainLoss?: number;
  gainLossPercent?: number;
  peRatio?: number;
  earnings?: string;
  weight?: number;
}

export interface SectorSummary {
  sector: string;
  totalValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  weight: number;
  stocks: Stock[];
}

export interface PortfolioSummary {
  totalValue: number;
  totalInvestment: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  dayChange: number;
  dayChangePercent: number;
}