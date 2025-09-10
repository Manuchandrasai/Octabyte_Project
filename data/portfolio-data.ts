import { Stock } from '@/types/portfolio';

// Sample portfolio data based on common Indian stocks
export const portfolioData: Stock[] = [
  // Technology Sector
  {
    symbol: 'TCS.NS',
    name: 'Tata Consultancy Services',
    sector: 'Technology',
    quantity: 50,
    avgPrice: 3200,
  },
  {
    symbol: 'INFY.NS',
    name: 'Infosys Limited',
    sector: 'Technology',
    quantity: 75,
    avgPrice: 1450,
  },
  {
    symbol: 'WIPRO.NS',
    name: 'Wipro Limited',
    sector: 'Technology',
    quantity: 100,
    avgPrice: 420,
  },
  
  // Banking & Financial Services
  {
    symbol: 'HDFCBANK.NS',
    name: 'HDFC Bank Limited',
    sector: 'Banking',
    quantity: 80,
    avgPrice: 1580,
  },
  {
    symbol: 'ICICIBANK.NS',
    name: 'ICICI Bank Limited',
    sector: 'Banking',
    quantity: 60,
    avgPrice: 950,
  },
  {
    symbol: 'SBIN.NS',
    name: 'State Bank of India',
    sector: 'Banking',
    quantity: 120,
    avgPrice: 520,
  },
  
  // FMCG
  {
    symbol: 'HINDUNILVR.NS',
    name: 'Hindustan Unilever Limited',
    sector: 'FMCG',
    quantity: 40,
    avgPrice: 2400,
  },
  {
    symbol: 'ITC.NS',
    name: 'ITC Limited',
    sector: 'FMCG',
    quantity: 200,
    avgPrice: 420,
  },
  
  // Pharmaceuticals
  {
    symbol: 'SUNPHARMA.NS',
    name: 'Sun Pharmaceutical Industries',
    sector: 'Pharmaceuticals',
    quantity: 90,
    avgPrice: 1150,
  },
  {
    symbol: 'DRREDDY.NS',
    name: 'Dr. Reddys Laboratories',
    sector: 'Pharmaceuticals',
    quantity: 30,
    avgPrice: 5200,
  },
  
  // Automotive
  {
    symbol: 'MARUTI.NS',
    name: 'Maruti Suzuki India Limited',
    sector: 'Automotive',
    quantity: 25,
    avgPrice: 9800,
  },
  {
    symbol: 'TATAMOTORS.NS',
    name: 'Tata Motors Limited',
    sector: 'Automotive',
    quantity: 150,
    avgPrice: 480,
  },
  
  // Energy & Oil
  {
    symbol: 'RELIANCE.NS',
    name: 'Reliance Industries Limited',
    sector: 'Energy',
    quantity: 45,
    avgPrice: 2650,
  },
  {
    symbol: 'ONGC.NS',
    name: 'Oil and Natural Gas Corporation',
    sector: 'Energy',
    quantity: 200,
    avgPrice: 180,
  },
  
  // Metals & Mining
  {
    symbol: 'TATASTEEL.NS',
    name: 'Tata Steel Limited',
    sector: 'Metals',
    quantity: 100,
    avgPrice: 120,
  },
];