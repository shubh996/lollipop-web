import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import supabase from '@/lib/supabaseClient';
import TickerTape from './components/TickerTape';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { toast } from "sonner";

import { 
  Search, 
  RefreshCw, 
  Info, 
  Sun, 
  Moon, 
  Bell, 
  User,
  Settings,
  TrendingUp, 
  TrendingDown, 
  Minus, 
  ArrowLeftRight, 
  Gauge, 
  Leaf, 
  Banknote, 
  Wallet, 
  Shield, 
  Coins,
  GripHorizontal, 
  Grip, 
  Ellipsis,
  Lock,
  LogOut,
  LogIn,
  LockOpen,
  ArrowRight,
  Loader2,
  X,
  ChartPie,
  Euro,
  PieChart,
  Bitcoin,
  Repeat,
  FileText,
  Package,
  Laptop,
  Cpu,
  Heart,
  Zap,
  ShoppingCart,
  Factory,
  Home,
  Landmark,
  AlertTriangle,
  UserCheck,
  GraduationCap,
  Radio,
  
  MoonIcon as Dark,
  Handshake,
  Settings2,
  Globe,
  Phone,
  Mail,
  Book,
  BookOpen,
  BookText,
  Calendar,
  Clock,
  Droplet,
  MessageSquare,
  ArrowUp,
  ArrowDown,
  Plus,
  Eye,
  LockIcon,
  EyeIcon,
  ArrowLeft,
  ArrowUpRight,
  Award,
  ShieldCheck,
  ShieldAlert,
  Briefcase,
  BarChart2,
  Target,
  ChevronDown,
  MoreHorizontal,
  Gavel,
  RefreshCcw,
  Activity,
  Layers,
  ArrowDownLeft,
  Share2,
  Building,
  DollarSign,
  Calculator,
  BarChart3,
  Droplets,
  Shuffle,
  Trophy,
  LineChart,
  Columns,
  Hash,
  Infinity,
  CheckCircle,
  Users,
  Smartphone,
  Rocket,
  PlusCircle,
  ChevronRight,
  LockOpenIcon,
  HelpCircle,
  Map,
  PlayCircle,
  Lightbulb,
  Sparkles,
  Building2,
  BarChart,
  Hourglass,
  Grid,
  Gem
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from '@/components/ui/badge';
import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/card';
import TipDetailCard from './components/TipDetailCard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Menubar, MenubarContent,MenubarSeparator, MenubarItem, MenubarMenu, MenubarTrigger, MenubarCheckboxItem, MenubarSub, MenubarSubContent, MenubarSubTrigger } from '@/components/ui/menubar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { mockNewsData } from './mockNewsData';

import LollipopSVG from './assets/icons/lollipop.svg';
import LollipopSVGWhite from './assets/icons/lollipop-white.svg';
import ShubhProfile from './assets/icons/shubh_king.jpg';
import TradingViewWidget from './components/TradingViewWidget';
// LollipopSVG: Main branding icon for the app


// Lucide Icon component wrapper
const LucideIcon = ({ Icon, size = 20, className = "" }) => {
// LucideIcon: Wrapper for Lucide icons used in filter UI
  // Fallback to Ellipsis if Icon is not a valid React component
  const ValidIcon = typeof Icon === 'function' ? Icon : Icon;
  return <ValidIcon size={size} className={className} />;
};

// Master filter configuration
const MASTER_FILTERS = {
assets: [
  { name: 'Equity', Icon: ChartPie, desc: 'Individual company stocks and shares' },
  { name: 'Forex', Icon: Euro, desc: 'Foreign exchange currency pairs' },
  { name: 'ETF', Icon: Handshake, desc: 'Exchange-traded funds tracking indexes or sectors' },
  { name: 'Crypto', Icon: Bitcoin, desc: 'Digital currencies and blockchain tokens' },
  { name: 'F&O', Icon: Repeat, desc: 'Futures and options derivatives' },
  { name: 'Indexes', Icon: FileText, desc: 'Market index benchmarks and trackers' },
  { name: 'Bonds', Icon: Cpu, desc: 'Government and corporate debt securities' },
  { name: 'Commodities', Icon: Package, desc: 'Physical goods like gold, oil, agricultural products' },
  { name: 'Mutual Funds', Icon: PieChart, desc: 'Professionally managed investment pools' },
  { name: 'REITs', Icon: Home, desc: 'Real estate investment trusts' },
  { name: 'PMS', Icon: Briefcase, desc: 'Portfolio Management Services for HNIs' },
  { name: 'AIFs', Icon: Layers, desc: 'Alternative Investment Funds across categories' },
  { name: 'NBFC Products', Icon: Banknote, desc: 'Structured credit and financing-linked investments' },
  { name: 'ULIPs', Icon: Shield, desc: 'Unit linked insurance-based investments' },
  { name: 'Retirement Funds', Icon: Hourglass, desc: 'Pension, provident and retirement-focused schemes' },
  { name: 'Private Equity', Icon: Building2, desc: 'Unlisted company and startup investments' },
  { name: 'Hedge Funds', Icon: BarChart, desc: 'Actively managed alternative strategies' },
  { name: 'Structured Products', Icon: Grid, desc: 'Capital protected or market-linked structures' },
  { name: 'SGBs', Icon: Gem, desc: 'Sovereign gold bonds backed by the government' },
  { name: 'Insurance-Linked', Icon: Heart, desc: 'Endowment, term-linked and risk-insurance assets' }
],

  sectors: [
    { name: 'Technology', Icon: Laptop, desc: 'Software, hardware, and tech services companies' },
    { name: 'Finance', Icon: Cpu, desc: 'Banks, insurance, and financial services' },
    { name: 'Healthcare', Icon: Heart, desc: 'Pharmaceuticals, medical devices, and healthcare providers' },
    { name: 'Energy', Icon: Zap, desc: 'Oil, gas, renewable energy, and utilities' },
    { name: 'Retail', Icon: ShoppingCart, desc: 'Consumer retail and e-commerce companies' },
    { name: 'Industrials', Icon: Factory, desc: 'Manufacturing, aerospace, and industrial equipment' },
    { name: 'Estate', Icon: Home, desc: 'Real estate development and property companies' },
    { name: 'Infrastructure', Icon: Landmark, desc: 'Transportation, utilities, and infrastructure projects' },
    { name: 'Consumer Staples', Icon: ShoppingCart, desc: 'Essential goods like food, beverages, household items' },
    { name: 'Consumer Discretionary', Icon: Heart, desc: 'Non-essential goods like luxury items, entertainment' },
    { name: 'Utilities', Icon: Zap, desc: 'Electric, gas, water, and waste management services' },
    { name: 'Materials', Icon: Package, desc: 'Basic materials, chemicals, and mining companies' },
    { name: 'Communication Services', Icon: Radio, desc: 'Telecom, media, and entertainment companies' },
    { name: 'Telecommunications', Icon: Radio, desc: 'Phone, internet, and communication infrastructure' },
  ],
  sentiments: [
    { name: 'Bullish', color: '#22c55e', Icon: TrendingUp, desc: 'Expect prices to rise, positive outlook' },
    { name: 'Bearish', color: '#f87171', Icon: TrendingDown, desc: 'Expect prices to fall, negative outlook' },
    { name: 'Neutral', color: '#EEE', Icon: Minus, desc: 'No strong directional bias, sideways movement' },
    { name: 'Optimistic', color: '#22c55e', Icon: TrendingUp, desc: 'Generally positive about market conditions' },
    { name: 'Pessimistic', color: '#f87171', Icon: TrendingDown, desc: 'Generally negative about market conditions' },
    { name: 'Cautious', color: '#fbbf24', Icon: AlertTriangle, desc: 'Careful approach due to uncertainty' },
  ],
  strategies: [
    { name: 'Momentum', color: '#6366f1', Icon: Gauge, desc: 'Buy assets showing strong price trends and momentum' },
    { name: 'Growth', color: '#0ea5e9', Icon: Leaf, desc: 'Invest in companies with high growth potential' },
    { name: 'Value', color: '#a855f7', icon: Banknote, desc: 'Buy undervalued assets trading below intrinsic value' },
    { name: 'Income', color: '#eab308', Icon: Wallet, desc: 'Focus on dividend-paying assets for regular income' },
    { name: 'Defensive', color: '#ef4444', Icon: Shield, desc: 'Conservative approach to preserve capital' },
    { name: 'Speculative', color: '#ef4444', Icon: AlertTriangle, desc: 'High-risk, high-reward investment approach' },
    { name: 'Contrarian', color: '#6366f1', Icon: ArrowLeftRight, desc: 'Go against popular market sentiment' },
    { name: 'Swing Trading', color: '#0ea5e9', Icon: ArrowLeftRight, desc: 'Short-term trades lasting days to weeks' },
    { name: 'Day Trading', color: '#fbbf24', Icon: Gauge, desc: 'Buy and sell within the same trading day' },
    { name: 'Position Trading', color: '#a855f7', Icon: Leaf, desc: 'Long-term trades lasting months to years' },
    { name: 'Scalping', color: '#6366f1', Icon: Zap, desc: 'Very short-term trades lasting minutes' },
    { name: 'Trend Following', color: '#22c55e', Icon: TrendingUp, desc: 'Follow established market trends' },
    { name: 'Mean Reversion', color: '#f87171', Icon: ArrowLeftRight, desc: 'Bet on prices returning to average levels' },
  ],
  risk: [
    { name: 'Low', Icon: Ellipsis, desc: 'Conservative investments with minimal risk of loss' },
    { name: 'Medium', Icon: GripHorizontal, desc: 'Moderate risk with balanced return potential' },
    { name: 'High', Icon: Grip, desc: 'Aggressive investments with significant risk' },
    { name: 'Very Low', Icon: Minus, desc: 'Extremely safe investments like government bonds' },
    { name: 'Very High', Icon: AlertTriangle, desc: 'Speculative investments with potential for major losses' },
  ],
  expectedReturn: [
    { name: '<5%', min: 0, max: 5, Icon: TrendingDown, desc: 'Less than 5% expected return.' },
    { name: '5-10%', min: 5, max: 10, Icon: Minus, desc: '5-10% expected return.' },
    { name: '10-15%', min: 10, max: 20, Icon: TrendingUp, desc: '10-20% expected return.' },
        { name: '15-20%', min: 10, max: 20, Icon: TrendingUp, desc: '10-20% expected return.' },
    
    { name: '20-30%', min: 20, max: 30, Icon: TrendingUp, desc: '20-30% expected return.' },
    { name: '30-50%', min: 30, max: 50, Icon: ArrowUp, desc: '30-50% expected return.' },
    { name: '50%+', min: 50, max: Infinity, Icon: ArrowUp, desc: '50%+ expected return.' },

    { name: 'Negative', min: -Infinity, max: 0, Icon: TrendingDown, desc: 'Expecting a loss.' },
  ],
  marketCap: [
    { name: 'Nano Cap', Icon: Minus, desc: 'Very small companies under $50M market cap' },
    { name: 'Micro Cap', Icon: GripHorizontal, desc: 'Small companies $50M-$300M market cap' },
    { name: 'Small Cap', Icon: Grip, desc: 'Companies $300M-$2B market cap' },
    { name: 'Mid Cap', Icon: Gauge, desc: 'Companies $2B-$10B market cap' },
    { name: 'Large Cap', Icon: Landmark, desc: 'Major companies $10B-$200B market cap' },
    { name: 'Mega Cap', Icon: Factory, desc: 'Largest companies over $200B market cap' },
  ],
  dividendYield: [
    { name: '0-1%', min: 0, max: 1, icon: Banknote, desc: 'Very low dividend yield, growth-focused companies' },
    { name: '1-2%', min: 1, max: 2, icon: Banknote, desc: 'Low dividend yield, growth-focused companies' },
    { name: '2-3%', min: 2, max: 3, icon: Banknote, desc: 'Moderate dividend yield, balanced approach' },
    { name: '3-5%', min: 3, max: 5, icon: Banknote, desc: 'Good dividend yield, income-focused' },
    { name: '5-10%', min: 5, max: 10, icon: Banknote, desc: 'High dividend yield, strong income generation' },
    { name: '10%+', min: 10, max: Infinity, icon: Banknote, desc: 'Exceptional dividend yield, possible risks' },
  ],
  holding: [
    { name: 'Intraday', Icon: Zap, desc: 'Buy and sell within the same trading day' },
    { name: '1W', Icon: Calendar, desc: 'Hold position for one week' },
    { name: 'Short Term', Icon: Gauge, desc: 'Hold positions for short period (1-4 weeks)' },
    { name: 'Swing', Icon: ArrowLeftRight, desc: 'Swing trading positions (few days to weeks)' },
    { name: 'Long Term', Icon: Leaf, desc: 'Long-term investment (months to years)' },
    { name: 'Position', Icon: Calendar, desc: 'Hold positions for months' },
  ],
  duration: [
    { name: '1D', Icon: Zap, desc: 'One day duration' },
    { name: '2D', Icon: Zap, desc: 'Two days duration' },
    { name: '3D', Icon: Zap, desc: 'Three days duration' },
    { name: '4-7D', Icon: Gauge, desc: 'Four to seven days duration' },
    { name: '1W', Icon: Calendar, desc: 'One week duration' },
    { name: '2W', Icon: Calendar, desc: 'Two weeks duration' },
    { name: '1M', Icon: ArrowLeftRight, desc: 'One month duration' },
    { name: '2-3M', Icon: ArrowLeftRight, desc: 'Two to three months duration' },
    { name: '3-6M', Icon: Calendar, desc: 'Three to six months duration' },
    { name: '6-12M', Icon: Calendar, desc: 'Six months to one year duration' },
    { name: '1Y+', Icon: Leaf, desc: 'More than one year duration' },
  ],
  regions: [
    { name: 'North America', Icon: Globe, desc: 'United States, Canada, Mexico' },
    { name: 'Europe', Icon: Globe, desc: 'European markets and companies' },
    { name: 'Asia Pacific', Icon: Globe, desc: 'Asian markets including Japan, China, India' },
    { name: 'Emerging Markets', Icon: TrendingUp, desc: 'Developing market economies' },
    { name: 'Global', Icon: Globe, desc: 'Worldwide or multi-regional exposure' },
    { name: 'Domestic', Icon: Home, desc: 'Local/home market only' },
    { name: 'China', Icon: Globe, desc: 'China-focused investments' },
    { name: 'India', Icon: Globe, desc: 'India-focused investments' },
    { name: 'Japan', Icon: Globe, desc: 'Japan-focused investments' },
  ],
  valuationMetrics: [
    { name: 'P/E Ratio', Icon: BarChart2, desc: 'Price to earnings ratio analysis' },
    { name: 'EV/EBITDA', Icon: BarChart2, desc: 'Enterprise value to EBITDA multiple' },
    { name: 'PEG Ratio', Icon: BarChart2, desc: 'Price/earnings to growth ratio' },
    { name: 'Price/Book', Icon: BarChart2, desc: 'Price to book value ratio' },
    { name: 'Price/Sales', Icon: BarChart2, desc: 'Price to sales ratio' },
    { name: 'DCF', Icon: BarChart2, desc: 'Discounted cash flow valuation' },
    { name: 'Free Cash Flow Yield', Icon: BarChart2, desc: 'Free cash flow relative to market cap' },
    { name: 'Dividend Yield', icon: Banknote, desc: 'Annual dividend relative to price' },
  ],
  growthMetrics: [
    { name: 'Revenue Growth', Icon: TrendingUp, desc: 'Strong revenue growth trajectory' },
    { name: 'Earnings Growth', Icon: TrendingUp, desc: 'Consistent earnings growth' },
    { name: 'User Growth', Icon: TrendingUp, desc: 'Growing user base or customer count' },
    { name: 'Market Share Growth', Icon: TrendingUp, desc: 'Expanding market share' },
    { name: 'Margin Expansion', Icon: TrendingUp, desc: 'Improving profit margins' },
    { name: 'ROE Growth', Icon: TrendingUp, desc: 'Improving return on equity' },
    { name: 'Cash Flow Growth', Icon: TrendingUp, desc: 'Growing free cash flow' },
    { name: 'Book Value Growth', Icon: TrendingUp, desc: 'Increasing book value per share' },
  ],
  technicalIndicators: [
    { name: 'RSI', Icon: Activity, desc: 'Relative Strength Index signal' },
    { name: 'MACD', Icon: Activity, desc: 'MACD crossover or divergence' },
    { name: 'Moving Averages', Icon: Activity, desc: 'Moving average crossover or support' },
    { name: 'Bollinger Bands', Icon: Activity, desc: 'Bollinger Band squeeze or breakout' },
    { name: 'Support/Resistance', Icon: Activity, desc: 'Key support or resistance levels' },
    { name: 'Volume', Icon: BarChart2, desc: 'Volume confirmation or spike' },
    { name: 'Momentum', Icon: Activity, desc: 'Momentum indicators' },
    { name: 'Trend Lines', Icon: Activity, desc: 'Trend line breaks or confirmations' },
  ],
  esgRatings: [
    { name: 'ESG Leader', Icon: Leaf, desc: 'Strong ESG practices and leadership' },
    { name: 'ESG Positive', Icon: Leaf, desc: 'Good ESG score and practices' },
    { name: 'ESG Neutral', Icon: GripHorizontal, desc: 'Average ESG considerations' },
    { name: 'ESG Improving', Icon: TrendingUp, desc: 'Improving ESG practices' },
    { name: 'ESG Concern', Icon: AlertTriangle, desc: 'Some ESG concerns or risks' },
    { name: 'Not Applicable', Icon: Minus, desc: 'ESG not relevant for this investment' },
  ],
  analysisType: [
    { name: 'Fundamental', Icon: BookOpen, desc: 'Based on fundamental analysis' },
    { name: 'Technical', Icon: BookOpen, desc: 'Based on technical analysis' },
    { name: 'Quantitative', Icon: BookOpen, desc: 'Data-driven quantitative analysis' },
    { name: 'Macro', Icon: BookOpen, desc: 'Macroeconomic analysis' },
    { name: 'Event Driven', Icon: BookOpen, desc: 'Based on specific events or catalysts' },
    { name: 'Sentiment', Icon: BookOpen, desc: 'Market sentiment analysis' },
    { name: 'Hybrid', Icon: BookOpen, desc: 'Combination of multiple analysis types' },
  ],
  volatility: [
    { name: 'Very Low', Icon: Activity, desc: 'Minimal price fluctuations expected' },
    { name: 'Low', Icon: Activity, desc: 'Below average volatility' },
    { name: 'Moderate', Icon: Activity, desc: 'Average market volatility' },
    { name: 'High', Icon: Activity, desc: 'Above average volatility' },
    { name: 'Very High', Icon: Activity, desc: 'Significant price swings expected' },
    { name: 'Extreme', Icon: AlertTriangle, desc: 'Highly volatile with major price moves' },
  ],
  liquidity: [
    { name: 'High Large Cap', Icon: Droplet, desc: 'Very liquid, easy to trade.' },
    { name: 'Medium Mid Cap', Icon: MoreHorizontal, desc: 'Moderately liquid.' },
    { name: 'Low Small Cap', Icon: Minus, desc: 'Less liquid, harder to trade.' },
    { name: 'Micro Cap', Icon: Droplet, desc: 'Very illiquid.' },
    { name: 'High Volume', Icon: Activity, desc: 'High trading volume.' },
    { name: 'Low Volume', Icon: BarChart2, desc: 'Low trading volume.' },
    { name: 'Illiquid', Icon: Lock, desc: 'Difficult to buy or sell.' },
  ],
  conviction: [
    { name: 'Speculative', Icon: ArrowDown, desc: 'Weak conviction, just a hunch' },
    { name: 'Low', Icon: ArrowDown, desc: 'Low conviction, not very confident' },
    { name: 'Moderate', Icon: ArrowRight, desc: 'Moderate conviction, some confidence' },
    { name: 'Strong', Icon: ArrowUp, desc: 'Strong conviction, confident' },
    { name: 'Very Strong', Icon: ArrowUp, desc: 'Very strong conviction, highly confident' },
  ],
  catalyst: [
    { name: 'Earnings', Icon: BarChart2, desc: 'Company earnings report.' },
    { name: 'Fed Policy', Icon: Globe, desc: 'Central bank policy change.' },
    { name: 'Mergers', Icon: MoreHorizontal, desc: 'Mergers or acquisitions.' },
    { name: 'Product Launch', Icon: ShoppingCart, desc: 'New product launch.' },
    { name: 'Regulation', Icon: Gavel, desc: 'Regulatory change.' },
    { name: 'Market Event', Icon: Activity, desc: 'Major market event.' },
    { name: 'Analyst Upgrade', Icon: TrendingUp, desc: 'Analyst rating upgrade.' },
    { name: 'Buyback', Icon: RefreshCcw, desc: 'Company share buyback.' },
    { name: 'Dividend Hike', icon: Banknote, desc: 'Increase in dividend payout.' },
    { name: 'Sector Rotation', Icon: ArrowRight, desc: 'Shift in sector focus.' },
    { name: 'Geopolitical', Icon: Globe, desc: 'Geopolitical event.' },
    { name: 'Innovation', Icon: Zap, desc: 'New innovation.' },
    { name: 'Litigation', Icon: Gavel, desc: 'Legal action.' },
    { name: 'Supply Chain', Icon: Layers, desc: 'Supply chain disruption.' },
  ],
  valuation: [
    { name: 'Low P/E (<15x)', Icon: TrendingDown, desc: 'Low price-to-earnings ratio.' },
    { name: 'Mid P/E (15–25x)', Icon: Minus, desc: 'Medium price-to-earnings ratio.' },
    { name: 'High P/E (>25x)', Icon: TrendingUp, desc: 'High price-to-earnings ratio.' },
    { name: 'Low EV/EBITDA (<10x)', Icon: TrendingDown, desc: 'Low enterprise value to EBITDA.' },
    { name: 'Mid EV/EBITDA (10–15x)', Icon: Minus, desc: 'Medium enterprise value to EBITDA.' },
    { name: 'High EV/EBITDA (>15x)', Icon: TrendingUp, desc: 'High enterprise value to EBITDA.' },
    { name: 'Discounted Cash Flow (10%+ IRR)', Icon: BarChart2, desc: 'Discounted cash flow analysis.' },
    { name: 'PEG Ratio ~1.5', Icon: Activity, desc: 'Price/earnings to growth ratio.' },
    { name: 'Low Price/Book (<2x)', Icon: TrendingDown, desc: 'Low price-to-book ratio.' },
    { name: 'Low Price/Sales (<2x)', Icon: TrendingDown, desc: 'Low price-to-sales ratio.' },
    { name: 'High ROE (>15%)', Icon: TrendingUp, desc: 'High return on equity.' },
    { name: 'Low Debt/Equity (<0.5)', Icon: Shield, desc: 'Low debt-to-equity ratio.' },
  ],
  technical: [
    { name: 'RSI Overbought 70', Icon: TrendingUp, desc: 'Relative Strength Index above 70.' },
    { name: 'RSI Oversold 30', Icon: TrendingDown, desc: 'Relative Strength Index below 30.' },
    { name: 'MACD Bullish', Icon: TrendingUp, desc: 'MACD bullish crossover.' },
    { name: 'MACD Bearish', Icon: TrendingDown, desc: 'MACD bearish crossover.' },
    { name: 'MA Crossover', Icon: ArrowUpRight, desc: 'Moving average crossover.' },
    { name: 'ADX Trend 25', Icon: Activity, desc: 'ADX trend strength above 25.' },
    { name: 'Bollinger Breakout', Icon: ArrowUp, desc: 'Bollinger Bands breakout.' },
    { name: 'Fibonacci', Icon: Layers, desc: 'Fibonacci retracement levels.' },
    { name: 'Support Break', Icon: ArrowDown, desc: 'Support level broken.' },
    { name: 'Resistance Break', Icon: ArrowUp, desc: 'Resistance level broken.' },
    { name: 'Volume Spike', Icon: BarChart2, desc: 'Unusual volume spike.' },
    { name: 'Stochastic 80', Icon: TrendingUp, desc: 'Stochastic oscillator above 80.' },
    { name: 'Stochastic 20', Icon: TrendingDown, desc: 'Stochastic oscillator below 20.' },
    { name: 'Ichimoku Buy', Icon: TrendingUp, desc: 'Ichimoku cloud buy signal.' },
    { name: 'Ichimoku Sell', Icon: TrendingDown, desc: 'Ichimoku cloud sell signal.' },
    { name: 'VWAP Bounce', Icon: RefreshCcw, desc: 'VWAP bounce signal.' },
  ],
  diversification: [
    { name: 'Core', Icon: Shield, desc: 'Main part of your portfolio.' },
    { name: 'Satellite', Icon: MoreHorizontal, desc: 'Smaller, supporting position.' },
    { name: 'Hedge', Icon: Layers, desc: 'Position to offset risk.' },
    { name: 'Tactical', Icon: Zap, desc: 'Short-term tactical position.' },
    { name: 'Diversifier', Icon: ArrowRight, desc: 'Adds diversification.' },
    { name: 'Opportunistic', Icon: TrendingUp, desc: 'Opportunistic trade.' },
    { name: 'Balanced', Icon: Minus, desc: 'Balanced position.' },
  ],
  performance: [
    { name: 'Strong Underperform', Icon: TrendingDown, desc: 'Expected to do much worse than market.' },
    { name: 'Underperform', Icon: ArrowDownLeft, desc: 'Expected to do worse than market.' },
    { name: 'Market', Icon: Minus, desc: 'Expected to match market performance.' },
    { name: 'Outperform', Icon: ArrowUpRight, desc: 'Expected to do better than market.' },
    { name: 'Strong Outperform', Icon: TrendingUp, desc: 'Expected to do much better than market.' },
    { name: 'Flat', Icon: ArrowRight, desc: 'No expected movement.' },
  ]
};



const timeAgo = (dateString) => {
// Utility: timeAgo for tip timestamps
  const now = new Date();
  const created = new Date(dateString);
  const diffMs = now.getTime() - created.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
};

const InfoRow = ({ icon, label, value, valueComponent, isMobile }) => (
  <div className="flex items-start gap-3">
    <div className="flex-shrink-0 w-5 h-5 text-muted-foreground">{icon}</div>
    <div className="flex-1">
      <div className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-muted-foreground`}>{label}</div>
      {valueComponent || <div className={`font-semibold ${isMobile ? 'text-xs' : 'text-sm'}`}>{value}</div>}
    </div>
  </div>
);

export default function TipScreen() {


  // State for all tips fetched from Supabase
  const [allTips, setAllTips] = useState([]);
  const [loadingTips, setLoadingTips] = useState(true);

  useEffect(() => {
    async function fetchTips() {
      setLoadingTips(true);
      const { data, error } = await supabase
        .from('investment_tips')
        .select('*');
      if (error) {
        console.error('Error fetching tips:', error);
        setAllTips([]);
      } else {
        setAllTips(data || []);
      }
      setLoadingTips(false);
    }
    fetchTips();
  }, []);
  // --- State Hooks ---

  // Theme state
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Wallet and unlock state
  const [wallet, setWallet] = useState(25);
  const [unlockedTips, setUnlockedTips] = useState([]);
  const [userData, setUserData] = useState({  });
  // Fetch current user from Supabase
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    async function fetchUser() {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (!user || error) {
        setIsLoggedIn(false);
        setUserData({});
        return;
      }
      
      setIsLoggedIn(true);
      // Fetch user profile from 'users' table
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      if (userProfile && !profileError) {
        setUserData({
          id: userProfile.id,
          name: userProfile.name,
          avatar: userProfile.profile_photo_url || userProfile.avatar,
          credits: userProfile.credits ?? 0,
          email: userProfile.email,
          sebi_registered: userProfile.sebi_registered || false
        });
        setUnlockedTips(userProfile.unlockedTips || []);
      } else {
        setIsLoggedIn(false);
        setUserData({});
      }
    }
    fetchUser();
  }, []);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const tableContainerRef = useRef(null);

  // Filter states
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState([]);
  const [selectedSector, setSelectedSector] = useState([]);
  const [selectedSentiment, setSelectedSentiment] = useState([]);
  const [selectedStrategies, setSelectedStrategies] = useState([]);
  const [selectedRisk, setSelectedRisk] = useState([]);
  const [selectedExpectedReturn, setSelectedExpectedReturn] = useState([]);
  const [selectedMarketCap, setSelectedMarketCap] = useState([]);
  const [selectedDividendYield, setSelectedDividendYield] = useState([]);
  const [selectedHolding, setSelectedHolding] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState([]);
  const[selectedHoldingDuration, setSelectedHoldingDuration] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedValuationMetrics, setSelectedValuationMetrics] = useState([]);
  const [selectedGrowthMetrics, setSelectedGrowthMetrics] = useState([]);
  const [selectedTechnicalIndicators, setSelectedTechnicalIndicators] = useState([]);
  const [selectedEsgRatings, setSelectedEsgRatings] = useState([]);
  const [selectedAnalysisType, setSelectedAnalysisType] = useState([]);
  const [selectedVolatility, setSelectedVolatility] = useState([]);
  const [selectedLiquidity, setSelectedLiquidity] = useState([]);
  const [selectedConviction, setSelectedConviction] = useState([]);
  const [selectedCatalyst, setSelectedCatalyst] = useState([]);
  const [selectedValuation, setSelectedValuation] = useState([]);
  const [selectedTechnical, setSelectedTechnical] = useState([]);
  const [selectedDiversification, setSelectedDiversification] = useState([]);
  const [selectedPerformance, setSelectedPerformance] = useState([]);

  // UI states
  const [visibleCount, setVisibleCount] = useState(25);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [showOnlyFree, setShowOnlyFree] = useState(false);
  const [showOnlySebi, setShowOnlySebi] = useState(false);
  const [infoSheetOpen, setInfoSheetOpen] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);
  const [mobileTipSheetOpen, setMobileTipSheetOpen] = useState(false);
  const [selectedTipForMobile, setSelectedTipForMobile] = useState(null);
  const [tipDetailModalOpen, setTipDetailModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [columnSelectorOpen, setColumnSelectorOpen] = useState(false);
  
  // Mobile-specific states
  const [showSymbolSheet, setShowSymbolSheet] = useState(false);
  const [selectedSymbolForMobile, setSelectedSymbolForMobile] = useState(null);
  const [showPaywallSheet, setShowPaywallSheet] = useState(false);
  const [selectedPaywallTip, setSelectedPaywallTip] = useState(null);
  const [showAdvisorSheet, setShowAdvisorSheet] = useState(false);
  const [selectedAdvisorForMobile, setSelectedAdvisorForMobile] = useState(null);
  const [showMobileAlertSheet, setShowMobileAlertSheet] = useState(false);
  const [showMobileUserSheet, setShowMobileUserSheet] = useState(false);
  
  // Information Sheet for explanations
  const [showInfoSheet, setShowInfoSheet] = useState(false);
  const [infoSheetData, setInfoSheetData] = useState(null);
  
  // Platform Information Sheet
  const [showPlatformInfoSheet, setShowPlatformInfoSheet] = useState(false);

  // App Walkthrough State
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [walkthroughStep, setWalkthroughStep] = useState(0);
  const [highlightPosition, setHighlightPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [cardPosition, setCardPosition] = useState({ top: '50%', left: '50%' });

  // Welcome Sheet State
  const [showWelcomeSheet, setShowWelcomeSheet] = useState(false);
  
  // Check if user has seen welcome sheet before
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('lollipop-welcome-seen');
    if (!hasSeenWelcome) {
      setShowWelcomeSheet(true);
    }
  }, []);

  // Walkthrough Steps Configuration
  const walkthroughSteps = [
    {
      target: () => {
        const isMobileDevice = window.innerWidth < 768;
        if (isMobileDevice) {
          // On mobile, if search is not open, target the search button, otherwise target the search input
          const searchOpen = document.querySelector('[data-walkthrough="search"]');
          return '[data-walkthrough="search"]';
        } else {
          // On desktop, target the search input directly
          return '[data-walkthrough="search"]';
        }
      },
      title: "Search & Discovery",
      icon: <Search size={16} className="text-secondary" />,
      content: "Try typing in the search box! Search for stocks like 'AAPL' or 'Tesla', or look for specific advisors. Click the search input to see it in action.",
      position: "bottom",
      action: "interact",
      interactive: true
    },
    {
      target: () => {
        // Use device-specific filter target
        const isMobileDevice = window.innerWidth < 768;
        if (isMobileDevice) {
          return '[data-walkthrough="filters"]'; // Mobile filter button
        } else {
          // For desktop, check if there are filter badges first
          const filterBadges = document.querySelector('[data-walkthrough="filters-desktop"]');
          if (filterBadges && filterBadges.children.length > 0) {
            return '[data-walkthrough="filters-desktop"]'; // Desktop filter badges
          } else {
            return '[data-walkthrough="filters"]'; // Mobile filter button (used on desktop too when no filters)
          }
        }
      },
      title: "Smart Filters",
      icon: <Target size={16} className="text-secondary"/>,
      content: () => {
        const isMobileDevice = window.innerWidth < 768;
        if (isMobileDevice) {
          return "Click the filters button to explore different investment categories. Try filtering by asset type, risk level, or expected returns to find what matches your strategy.";
        } else {
          return "Click the filters button to explore different investment categories. On desktop, applied filters will appear as badges above the table. Try filtering by asset type, risk level, or expected returns.";
        }
      },
      position: "bottom",
      action: "interact",
      interactive: true
    },
    {
      target: '[data-walkthrough="table-header"]',
      title: "Investment Tips Table",
      icon: <BarChart2 size={16} className="text-secondary"/>,
      content: "This table shows all available investment tips. You can sort columns by clicking on the headers. Each row contains detailed information about investment opportunities.",
      position: "bottom",
      action: "highlight"
    },
    {
      target: '[data-walkthrough="advisor-column"]',
      title: "Advisor Information",
      icon: <UserCheck size={16} className="text-secondary"/>,
      content: "Click on any advisor's name to view their profile, track record, and credentials. All advisors are SEBI-registered professionals with verified performance.",
      position: "right",
      action: "interact",
      interactive: true
    },
    {
      target: '[data-walkthrough="symbol-column"]',
      title: "Stock Symbols & Charts",
      icon: <TrendingUp size={16} className="text-secondary"/>,
      content: "Click on any stock symbol to view real-time charts and technical analysis. Hover over symbols to see live price data and trends.",
      position: "right",
      action: "interact",
      interactive: true
    },
    {
      target: '[data-walkthrough="investment-column"]',
      title: "Invesmtment Tips",
      icon: <Lock size={16} className="text-secondary"/>,
      content: "Investment Advisors give very detailed tips with 20 parameters, inorder to make well informed decisions in trading.",
      position: "left",
      action: "interact",
      interactive: true
    },
    {
      target: '[data-walkthrough="credits-display"]',
      title: "Your Lollipop Credits",
      icon: <Coins size={16} className="text-secondary"/>,
      content: "Your available credits are shown here. Click to view your credit balance and purchase more credits to unlock premium investment tips with detailed analysis.",
      position: "bottom",
      action: "highlight"
    },
    {
      target: '[data-walkthrough="theme-toggle"]',
      title: "Theme Toggle",
      icon: <Moon size={16} className="text-secondary"/>,
      content: "Click to switch between light and dark themes for comfortable viewing in any lighting condition. Try it now!",
      position: "left",
      action: "interact",
      interactive: true
    }
  ];

    // Add walkthrough animations
  useEffect(() => {
    if (showWalkthrough) {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes walkthroughPulse {
          0%, 100% {
            border-color: rgb(59, 130, 246);
            box-shadow: 
              0 0 0 1px rgba(59, 130, 246, 0.3),
              0 0 20px rgba(59, 130, 246, 0.6),
              inset 0 0 20px rgba(59, 130, 246, 0.1);
          }
          50% {
            border-color: rgb(99, 102, 241);
            box-shadow: 
              0 0 0 1px rgba(99, 102, 241, 0.4),
              0 0 30px rgba(99, 102, 241, 0.8),
              inset 0 0 30px rgba(99, 102, 241, 0.2);
          }
        }
      `;
      document.head.appendChild(style);
      return () => document.head.removeChild(style);
    }
  }, [showWalkthrough]);

  // Walkthrough Functions
  const calculateElementPosition = (selector) => {
    const element = document.querySelector(selector);
    if (!element) {
      console.warn('Walkthrough: Element not found for selector:', selector);
      return null;
    }
    
    // Check if element is visible
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      console.warn('Walkthrough: Element has no dimensions:', selector, rect);
      return null;
    }
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    const position = {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
      width: rect.width,
      height: rect.height,
      centerX: rect.left + scrollLeft + rect.width / 2,
      centerY: rect.top + scrollTop + rect.height / 2
    };
    
    console.log('Walkthrough: Element position calculated for', selector, position);
    return position;
  };

  const calculateCardPosition = (elementPosition, step) => {
    if (!elementPosition) return { top: '50%', left: '50%' };
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const cardWidth = 450; // Approximate card width
    const cardHeight = 300; // Approximate card height
    const padding = 20;
    
    let top, left;
    
    switch (step.position) {
      case 'top':
        top = Math.max(padding, elementPosition.top - cardHeight - padding);
        left = Math.max(padding, Math.min(viewportWidth - cardWidth - padding, elementPosition.centerX - cardWidth / 2));
        break;
      case 'bottom':
        top = Math.min(viewportHeight - cardHeight - padding, elementPosition.top + elementPosition.height + padding);
        left = Math.max(padding, Math.min(viewportWidth - cardWidth - padding, elementPosition.centerX - cardWidth / 2));
        break;
      case 'left':
        top = Math.max(padding, Math.min(viewportHeight - cardHeight - padding, elementPosition.centerY - cardHeight / 2));
        left = Math.max(padding, elementPosition.left - cardWidth - padding);
        break;
      case 'right':
        top = Math.max(padding, Math.min(viewportHeight - cardHeight - padding, elementPosition.centerY - cardHeight / 2));
        left = Math.min(viewportWidth - cardWidth - padding, elementPosition.left + elementPosition.width + padding);
        break;
      default:
        // Center position
        top = (viewportHeight - cardHeight) / 2;
        left = (viewportWidth - cardWidth) / 2;
    }
    
    return { top: `${top}px`, left: `${left}px` };
  };

  const updateWalkthroughPositions = () => {
    const currentStep = walkthroughSteps[walkthroughStep];
    if (!currentStep) return;
    
    // Resolve dynamic target if it's a function
    const target = typeof currentStep.target === 'function' ? currentStep.target() : currentStep.target;
    
    console.log('Walkthrough: Updating positions for step', walkthroughStep, 'target:', target);
    
    const elementPosition = calculateElementPosition(target);
    if (elementPosition) {
      setHighlightPosition(elementPosition);
      setCardPosition(calculateCardPosition(elementPosition, currentStep));
    } else {
      // Retry after a short delay
      setTimeout(() => {
        console.log('Walkthrough: Retrying position calculation for', target);
        const retryPosition = calculateElementPosition(target);
        if (retryPosition) {
          setHighlightPosition(retryPosition);
          setCardPosition(calculateCardPosition(retryPosition, currentStep));
        } else {
          console.warn('Walkthrough: Failed to find element after retry:', target);
          // Set default positions
          setHighlightPosition({ top: 0, left: 0, width: 0, height: 0 });
          setCardPosition({ top: '50%', left: '50%' });
        }
      }, 500);
    }
  };

  const startWalkthrough = () => {
    // On desktop, show welcome dialog first
    if (!isMobile) {
      setShowWelcomeSheet(true);
      return;
    }
    
    // On mobile, start walkthrough directly
    startWalkthroughDirectly();
  };

  const nextWalkthroughStep = () => {
    if (walkthroughStep < walkthroughSteps.length - 1) {
      const nextStepIndex = walkthroughStep + 1;
      // If advancing to the profile step, open the profile sheet first
      if (nextStepIndex === walkthroughSteps.length - 1) { // Last step is profile step
        const isMobileDevice = window.innerWidth < 768;
        if (isMobileDevice) {
          if (typeof setShowMobileUserSheet === 'function') setShowMobileUserSheet(true);
        } else {
          // If you have a desktop profile sheet, open it here
          // Example: if (typeof setShowProfileSheet === 'function') setShowProfileSheet(true);
        }
      }
      setWalkthroughStep(nextStepIndex);
    } else {
      endWalkthrough();
    }
  };

  const previousWalkthroughStep = () => {
    if (walkthroughStep > 0) {
      setWalkthroughStep(walkthroughStep - 1);
    }
  };

  const handleInteractiveClick = (event) => {
    if (!showWalkthrough) return;
    
    const currentStep = walkthroughSteps[walkthroughStep];
    if (!currentStep || !currentStep.interactive) return;
    
    // Resolve dynamic target if it's a function
    const target = typeof currentStep.target === 'function' ? currentStep.target() : currentStep.target;
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    // Check if the clicked element is the highlighted element or its child
    if (targetElement.contains(event.target) || targetElement === event.target) {
      // Prevent default behavior for walkthrough
      event.preventDefault();
      event.stopPropagation();
      
      // Add visual feedback
      const originalStyle = {
        backgroundColor: targetElement.style.backgroundColor,
        transform: targetElement.style.transform,
        transition: targetElement.style.transition
      };
      
      targetElement.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
      targetElement.style.transform = 'scale(1.02)';
      targetElement.style.transition = 'all 0.2s ease';
      
      setTimeout(() => {
        targetElement.style.backgroundColor = originalStyle.backgroundColor;
        targetElement.style.transform = originalStyle.transform;
        targetElement.style.transition = originalStyle.transition;
      }, 300);
      
      // Auto-advance to next step after interaction
      setTimeout(() => {
        nextWalkthroughStep();
      }, 600);
    }
  };

  const endWalkthrough = () => {
    setShowWalkthrough(false);
    setWalkthroughStep(0);
    toast("Walkthrough completed! You're ready to start investing.", {
      duration: 4000,
      position: "top-center",
      icon: <CheckCircle size={16} className="text-green-600" />,
    });
  };

  // Auto-scroll to highlighted element and update positions
  useEffect(() => {
    if (showWalkthrough && walkthroughSteps[walkthroughStep]) {
      const currentStep = walkthroughSteps[walkthroughStep];
      const target = typeof currentStep.target === 'function' ? currentStep.target() : currentStep.target;
      const targetElement = document.querySelector(target);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Update positions after scroll animation
        setTimeout(updateWalkthroughPositions, 800);
      }
    }
  }, [walkthroughStep, showWalkthrough]);

  // Handle window resize for walkthrough
  useEffect(() => {
    if (showWalkthrough) {
      const handleResize = () => {
        updateWalkthroughPositions();
      };
      
      const handleKeydown = (event) => {
        switch (event.key) {
          case 'ArrowRight':
          case 'Space':
            event.preventDefault();
            nextWalkthroughStep();
            break;
          case 'ArrowLeft':
            event.preventDefault();
            previousWalkthroughStep();
            break;
          case 'Escape':
            event.preventDefault();
            endWalkthrough();
            break;
        }
      };
      
      // Add click listener for interactive elements
      document.addEventListener('click', handleInteractiveClick, true);
      document.addEventListener('keydown', handleKeydown);
      window.addEventListener('resize', handleResize);
      
      return () => {
        document.removeEventListener('click', handleInteractiveClick, true);
        document.removeEventListener('keydown', handleKeydown);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [showWalkthrough, walkthroughStep]);

  // Welcome Sheet Functions
  const startWalkthroughDirectly = () => {
    setShowWalkthrough(true);
    setWalkthroughStep(0);
    
    // Debug: Check if all target elements exist
    console.log('Walkthrough: Starting walkthrough, checking all target elements...');
    walkthroughSteps.forEach((step, index) => {
      const target = typeof step.target === 'function' ? step.target() : step.target;
      const element = document.querySelector(target);
      console.log(`Step ${index + 1} (${step.title}): Element found:`, !!element, element);
      if (element) {
        console.log('Element details:', {
          tagName: element.tagName,
          className: element.className,
          id: element.id,
          rect: element.getBoundingClientRect()
        });
      }
    });
    
    // Update positions after a brief delay
    setTimeout(updateWalkthroughPositions, 100);
  };

  const handleStartWalkthrough = () => {
    localStorage.setItem('lollipop-welcome-seen', 'true');
    setShowWelcomeSheet(false);
    startWalkthroughDirectly();
    toast("Welcome to Lollipop! Let's explore the platform together.", {
      duration: 3000,
      position: "top-center",
      icon: <PlayCircle size={16} className="text-primary" />,
    });
  };

  const handleSkipWalkthrough = () => {
    setShowWelcomeSheet(false);
    toast("You can start the walkthrough anytime using the Guide button.", {
      duration: 3000,
      position: "top-center",
      icon: <HelpCircle size={16} className="text-muted-foreground" />,
    });
  };

  const handleNeverShowAgain = () => {
    localStorage.setItem('lollipop-welcome-seen', 'true');
    setShowWelcomeSheet(false);
    toast("Welcome message disabled. You can always access the guide from the toolbar.", {
      duration: 4000,
      position: "top-center", 
      icon: <X size={16} className="text-muted-foreground" />,
    });
  };

  // Information data for different elements
  const informationData = {
    asset: {
      title: "Asset Classes",
      iconComponent: <Briefcase size={20} className="text-primary" />,
      description: "Understanding different types of investment assets and their characteristics",
      content: [
        {
          section: "What are Asset Classes?",
          text: "Asset classes are categories of investments that have similar characteristics and behave similarly in the marketplace. They are subject to the same laws and regulations."
        },
        {
          section: "Main Asset Classes",
          items: [
            { name: "Equities (Stocks)", desc: "Ownership shares in companies that can provide capital appreciation and dividends" },
            { name: "Bonds", desc: "Debt securities that provide regular income through interest payments" },
            { name: "Commodities", desc: "Physical goods like gold, oil, agricultural products that hedge against inflation" },
            { name: "Real Estate", desc: "Property investments including REITs and direct real estate ownership" },
            { name: "Cash & Cash Equivalents", desc: "Highly liquid, low-risk investments like savings accounts and money market funds" },
            { name: "Cryptocurrencies", desc: "Digital assets that offer high growth potential but with significant volatility" }
          ]
        },
        {
          section: "Why Asset Classes Matter",
          text: "Different asset classes perform differently under various market conditions. Diversifying across asset classes helps reduce overall portfolio risk while potentially enhancing returns."
        }
      ],
      footer: "Choose asset classes that align with your investment goals, risk tolerance, and time horizon."
    },
    sentiment: {
      title: "Investment Sentiment",
      iconComponent: <TrendingUp size={20} className="text-primary" />,
      description: "How market sentiment affects investment decisions and outcomes",
      content: [
        {
          section: "What is Investment Sentiment?",
          text: "Investment sentiment represents the overall attitude and outlook of investors toward a particular security, sector, or market. It reflects the collective psychology driving buying and selling decisions."
        },
        {
          section: "Sentiment Types",
          items: [
            { name: "Bullish", desc: "Optimistic outlook expecting prices to rise, encouraging buying activity" },
            { name: "Bearish", desc: "Pessimistic outlook expecting prices to fall, encouraging selling or short positions" },
            { name: "Neutral", desc: "Balanced view with no strong directional bias, wait-and-see approach" }
          ]
        },
        {
          section: "Factors Influencing Sentiment",
          items: [
            { name: "Economic Indicators", desc: "GDP growth, employment rates, inflation data" },
            { name: "Company Performance", desc: "Earnings reports, revenue growth, management guidance" },
            { name: "Market Events", desc: "Geopolitical events, policy changes, market volatility" },
            { name: "Technical Analysis", desc: "Chart patterns, trading volumes, price movements" }
          ]
        }
      ],
      footer: "Understanding sentiment helps in timing investments and managing risk effectively."
    },
    risk: {
      title: "Investment Risk Levels",
      iconComponent: <AlertTriangle size={20} className="text-primary" />,
      description: "Understanding different risk levels and their implications for your investments",
      content: [
        {
          section: "What is Investment Risk?",
          text: "Investment risk refers to the probability of losing some or all of the original investment. Higher risk investments typically offer the potential for higher returns, but also greater potential losses."
        },
        {
          section: "Risk Categories",
          items: [
            { name: "Low Risk", desc: "Conservative investments with minimal chance of loss but lower return potential (e.g., government bonds, savings accounts)" },
            { name: "Medium Risk", desc: "Balanced investments with moderate risk and return potential (e.g., diversified mutual funds, blue-chip stocks)" },
            { name: "High Risk", desc: "Aggressive investments with significant potential for both gains and losses (e.g., growth stocks, emerging markets)" },
            { name: "Very High Risk", desc: "Speculative investments with extreme volatility (e.g., penny stocks, cryptocurrency, options trading)" }
          ]
        },
        {
          section: "Risk Management Strategies",
          items: [
            { name: "Diversification", desc: "Spread investments across different assets to reduce overall risk" },
            { name: "Asset Allocation", desc: "Balance portfolio between different risk levels based on goals" },
            { name: "Regular Review", desc: "Monitor and adjust investments based on changing circumstances" }
          ]
        }
      ],
      footer: "Always invest according to your risk tolerance and financial goals."
    },
    returns: {
      title: "Expected Returns",
      iconComponent: <BarChart2 size={20} className="text-primary" />,
      description: "Understanding how investment returns work and what to expect",
      content: [
        {
          section: "What are Investment Returns?",
          text: "Investment returns represent the profit or loss generated by an investment over a specific period. Returns can come from capital appreciation, dividends, interest, or other income sources."
        },
        {
          section: "Types of Returns",
          items: [
            { name: "Capital Gains", desc: "Profit from selling an investment for more than you paid" },
            { name: "Dividends", desc: "Regular payments from companies to shareholders" },
            { name: "Interest", desc: "Fixed payments from bonds and other debt instruments" },
            { name: "Total Return", desc: "Combination of capital gains and income generated" }
          ]
        },
        {
          section: "Return Expectations",
          items: [
            { name: "Conservative (3-5%)", desc: "Low-risk investments like bonds and savings accounts" },
            { name: "Moderate (6-8%)", desc: "Balanced portfolios with mixed asset allocation" },
            { name: "Aggressive (9-12%)", desc: "Growth-focused investments with higher risk" },
            { name: "Speculative (Varies)", desc: "High-risk investments with unpredictable returns" }
          ]
        }
      ],
      footer: "Past performance doesn't guarantee future results. Consider your time horizon and risk tolerance."
    },
    conviction: {
      title: "Investment Conviction",
      iconComponent: <Target size={20} className="text-primary" />,
      description: "Understanding advisor confidence levels and investment conviction",
      content: [
        {
          section: "What is Investment Conviction?",
          text: "Investment conviction represents the level of confidence an advisor or analyst has in their investment recommendation. It indicates how strongly they believe in the potential success of the investment."
        },
        {
          section: "Conviction Levels",
          items: [
            { name: "High Conviction", desc: "Strong confidence based on thorough analysis and favorable conditions" },
            { name: "Medium Conviction", desc: "Moderate confidence with some uncertainty or mixed signals" },
            { name: "Low Conviction", desc: "Limited confidence due to unclear outlook or high uncertainty" }
          ]
        },
        {
          section: "Factors Affecting Conviction",
          items: [
            { name: "Research Quality", desc: "Depth and accuracy of fundamental and technical analysis" },
            { name: "Market Conditions", desc: "Overall market environment and sector-specific trends" },
            { name: "Track Record", desc: "Historical performance of similar recommendations" },
            { name: "Risk Assessment", desc: "Understanding of potential downside and risk factors" }
          ]
        }
      ],
      footer: "Higher conviction doesn't guarantee success, but indicates stronger analyst confidence."
    },
    filters: {
      title: "Investment Filters",
      iconComponent: <Search size={20} className="text-primary" />,
      description: "How to use filters to find the perfect investment opportunities",
      content: [
        {
          section: "What are Investment Filters?",
          text: "Investment filters help you narrow down the vast universe of investment opportunities to find those that match your specific criteria, goals, and preferences."
        },
        {
          section: "Available Filter Categories",
          items: [
            { name: "Asset Classes", desc: "Filter by investment types like stocks, bonds, commodities, crypto" },
            { name: "Risk Levels", desc: "Choose investments based on your risk tolerance" },
            { name: "Expected Returns", desc: "Filter by potential return ranges that match your goals" },
            { name: "Geographic Regions", desc: "Focus on specific markets or global diversification" },
            { name: "Sectors", desc: "Target specific industries or economic sectors" },
            { name: "Investment Strategies", desc: "Find investments matching your preferred approach" }
          ]
        },
        {
          section: "How to Use Filters Effectively",
          items: [
            { name: "Start Broad", desc: "Begin with basic criteria like risk tolerance and time horizon" },
            { name: "Layer Filters", desc: "Add additional filters one by one to refine results" },
            { name: "Regular Review", desc: "Adjust filters as your goals and circumstances change" },
            { name: "Save Combinations", desc: "Keep track of filter combinations that work well for you" }
          ]
        }
      ],
      footer: "Effective filtering helps you focus on opportunities that align with your investment strategy."
    },
    search: {
      title: "Search Functionality",
      iconComponent: <Search size={20} className="text-primary" />,
      description: "How to effectively search and find specific investment tips",
      content: [
        {
          section: "Smart Search Features",
          text: "Our search function allows you to quickly find specific investments, advisors, companies, or topics across all available tips and recommendations."
        },
        {
          section: "What You Can Search For",
          items: [
            { name: "Company Names", desc: "Search for specific companies like 'Apple', 'Tesla', 'Microsoft'" },
            { name: "Stock Symbols", desc: "Find investments by ticker symbols like 'AAPL', 'TSLA', 'MSFT'" },
            { name: "Advisor Names", desc: "Look up tips from specific investment advisors" },
            { name: "Investment Themes", desc: "Search for topics like 'AI', 'renewable energy', 'blockchain'" },
            { name: "Asset Types", desc: "Find specific asset classes or investment types" }
          ]
        },
        {
          section: "Search Tips",
          items: [
            { name: "Use Partial Terms", desc: "Don't need to spell out full names - partial matches work too" },
            { name: "Try Synonyms", desc: "Use different terms if your first search doesn't yield results" },
            { name: "Combine with Filters", desc: "Use search together with filters for more precise results" },
            { name: "Clear and Retry", desc: "Clear search terms to see all results again" }
          ]
        }
      ],
      footer: "Search is your fastest way to find specific investment opportunities or information."
    },
    columns: {
      title: "Table Columns Guide",
      iconComponent: <Columns size={20} className="text-primary" />,
      description: "Understanding what each column in the tips table represents",
      content: [
        {
          section: "Column Explanations",
          text: "Each column provides specific information about investment tips to help you make informed decisions."
        },
        {
          section: "Available Columns",
          items: [
            { name: "Time", desc: "When the tip was published or last updated" },
            { name: "Advisor", desc: "The investment professional providing the recommendation" },
            { name: "Asset", desc: "The type of investment or asset class" },
            { name: "Symbol", desc: "Stock ticker or investment identifier" },
            { name: "Returns", desc: "Expected return percentage or range" },
            { name: "Risk", desc: "Risk level assessment for the investment" },
            { name: "Holding Period", desc: "Recommended time to hold the investment" },
            { name: "Sentiment", desc: "Overall market sentiment (Bullish/Bearish/Neutral)" },
            { name: "Conviction", desc: "Advisor's confidence level in the recommendation" }
          ]
        },
        {
          section: "Customizing Your View",
          items: [
            { name: "Column Selection", desc: "Choose which columns to display based on your needs" },
            { name: "Mobile Optimization", desc: "Columns automatically adjust for mobile viewing" },
            { name: "Click for Details", desc: "Click on column headers or values for detailed explanations" }
          ]
        }
      ],
      footer: "Customize your table view to focus on the information most important to your investment decisions."
    },
    symbol: {
      title: "Investment Symbols & Tickers",
      iconComponent: <Hash size={20} className="text-primary" />,
      description: "Understanding stock symbols, tickers, and investment identifiers",
      content: [
        {
          section: "What are Investment Symbols?",
          text: "Investment symbols (also called tickers) are unique identifiers used to represent publicly traded securities on exchanges. They make it easy to identify and trade specific investments."
        },
        {
          section: "Types of Symbols",
          items: [
            { name: "Stock Tickers", desc: "3-4 letter codes for publicly traded companies (e.g., AAPL for Apple, TSLA for Tesla)" },
            { name: "ETF Symbols", desc: "Exchange-traded fund identifiers (e.g., SPY for S&P 500 ETF, QQQ for Nasdaq ETF)" },
            { name: "Index Symbols", desc: "Market index identifiers (e.g., ^GSPC for S&P 500, ^DJI for Dow Jones)" },
            { name: "Crypto Symbols", desc: "Cryptocurrency identifiers (e.g., BTC for Bitcoin, ETH for Ethereum)" },
            { name: "Currency Pairs", desc: "Foreign exchange pairs (e.g., EUR/USD, GBP/JPY)" }
          ]
        },
        {
          section: "How to Use Symbols",
          items: [
            { name: "Research", desc: "Use symbols to quickly find financial data and news" },
            { name: "Trading", desc: "Enter symbols when placing buy/sell orders" },
            { name: "Tracking", desc: "Monitor performance using portfolio tracking tools" },
            { name: "Analysis", desc: "Compare different investments using their symbols" }
          ]
        }
      ],
      footer: "Symbols are your gateway to accessing detailed information and trading any investment."
    },
    holding: {
      title: "Investment Holding Periods",
      iconComponent: <Clock size={20} className="text-primary" />,
      description: "Understanding recommended holding periods and investment time horizons",
      content: [
        {
          section: "What is a Holding Period?",
          text: "The holding period is the recommended length of time an investor should hold an investment before considering selling. It aligns with the investment strategy and expected timeline for achieving returns."
        },
        {
          section: "Common Holding Periods",
          items: [
            { name: "Short-term (< 1 year)", desc: "Day trading, swing trading, or tactical positions for quick gains" },
            { name: "Medium-term (1-3 years)", desc: "Positions based on business cycles, sector rotations, or specific catalysts" },
            { name: "Long-term (3-5+ years)", desc: "Buy-and-hold strategies focused on fundamental growth and compounding" },
            { name: "Very Long-term (10+ years)", desc: "Retirement investing, wealth building, and generational wealth strategies" }
          ]
        },
        {
          section: "Factors Affecting Holding Period",
          items: [
            { name: "Investment Strategy", desc: "Growth vs value vs income strategies have different time horizons" },
            { name: "Market Conditions", desc: "Bull or bear markets may affect optimal holding periods" },
            { name: "Personal Goals", desc: "Retirement, house purchase, or education funding timelines" },
            { name: "Tax Implications", desc: "Long-term capital gains tax benefits after 1 year" }
          ]
        }
      ],
      footer: "Align your holding period with your investment goals and risk tolerance for optimal results."
    },
    time: {
      title: "Investment Timing & Timestamps",
      iconComponent: <Calendar size={20} className="text-primary" />,
      description: "Understanding when investment tips were published and their relevance",
      content: [
        {
          section: "Why Timing Matters",
          text: "The publication time of investment tips is crucial for understanding their relevance, market context, and potential impact on your investment decisions."
        },
        {
          section: "Time-Related Factors",
          items: [
            { name: "Market Conditions", desc: "Tips published during different market phases have varying relevance" },
            { name: "News Events", desc: "Recent tips may reflect latest earnings, announcements, or market developments" },
            { name: "Seasonal Trends", desc: "Some investments perform better at certain times of year" },
            { name: "Economic Cycles", desc: "Tips may be more or less relevant based on current economic conditions" }
          ]
        },
        {
          section: "How to Use Timing Information",
          items: [
            { name: "Freshness Check", desc: "Prioritize recent tips for current market conditions" },
            { name: "Historical Context", desc: "Use older tips to understand long-term advisor track record" },
            { name: "Trend Analysis", desc: "Look for patterns in advisor recommendations over time" },
            { name: "Event Correlation", desc: "Connect tip timing with market events and outcomes" }
          ]
        }
      ],
      footer: "Consider the timing context of investment tips alongside their content for better decision-making."
    },
    advisor: {
      title: "Investment Advisors (RIAs)",
      iconComponent: <User size={20} className="text-primary" />,
      description: "Understanding the professionals behind investment recommendations",
      content: [
        {
          section: "Who are Investment Advisors?",
          text: "Investment advisors are licensed professionals who provide investment recommendations based on research, analysis, and market expertise. They help investors make informed decisions."
        },
        {
          section: "Types of Advisors",
          items: [
            { name: "Registered Investment Advisors (RIAs)", desc: "Fiduciary duty to act in client's best interest" },
            { name: "Wealth Managers", desc: "Comprehensive financial planning and investment management" },
            { name: "Research Analysts", desc: "Specialists who analyze specific securities, sectors, or markets" },
            { name: "Portfolio Managers", desc: "Professionals who manage investment portfolios and strategies" },
            { name: "Financial Planners", desc: "Holistic approach to financial goals and investment planning" }
          ]
        },
        {
          section: "Evaluating Advisor Recommendations",
          items: [
            { name: "Track Record", desc: "Historical performance and accuracy of past recommendations" },
            { name: "Expertise Area", desc: "Specialization in specific sectors, asset classes, or strategies" },
            { name: "Research Quality", desc: "Depth and thoroughness of analysis supporting recommendations" },
            { name: "Risk Assessment", desc: "How well they identify and communicate potential risks" },
            { name: "Communication Style", desc: "Clarity and transparency in explaining investment rationale" }
          ]
        }
      ],
      footer: "Research the advisor's background and track record before following their investment recommendations."
    },
    investment: {
      title: "Investment Ideas & Trade Configuration",
      iconComponent: <Briefcase size={20} className="text-primary" />,
      description: "Understanding our comprehensive investment approach and what we offer",
      content: [
        {
          section: "What We Offer",
          text: "Our investment platform provides complete trade configurations with detailed analysis, entry/exit strategies, risk management, and professional guidance to help you make informed investment decisions."
        },
        {
          section: "Trade Configuration Components",
          items: [
            { name: "Entry Price Analysis", desc: "Optimal entry points based on technical and fundamental analysis" },
            { name: "Exit Price Targets", desc: "Clear profit-taking levels and price targets for each investment" },
            { name: "Stop Loss Protection", desc: "Risk management with predefined stop-loss levels to limit downside" },
            { name: "Position Sizing Guidance", desc: "Recommended allocation percentages based on risk tolerance" },
            { name: "Holding Period Strategy", desc: "Time horizon recommendations from intraday to long-term investing" },
            { name: "Market Timing Insights", desc: "When to enter and exit based on market conditions and catalysts" }
          ]
        },
        {
          section: "Investment Strategy Components",
          items: [
            { name: "Research & Analysis", desc: "Fundamental and technical analysis to identify opportunities" },
            { name: "Risk Assessment", desc: "Understanding potential downside and risk factors" },
            { name: "Sector Analysis", desc: "Industry-specific insights and sector rotation strategies" },
            { name: "Catalyst Identification", desc: "Key events and triggers that can drive price movements" },
            { name: "Valuation Metrics", desc: "Price-to-earnings, DCF analysis, and other valuation methods" },
            { name: "Technical Indicators", desc: "Chart patterns, momentum indicators, and technical signals" }
          ]
        },
        {
          section: "Professional Advisory Services",
          items: [
            { name: "SEBI Registered Advisors", desc: "Licensed professionals with verified credentials and track records" },
            { name: "Performance Tracking", desc: "Transparent success rates and historical performance data" },
            { name: "Personalized Recommendations", desc: "Tips tailored to your risk profile and investment goals" },
            { name: "Real-time Updates", desc: "Market updates and strategy adjustments as conditions change" },
            { name: "Educational Content", desc: "Learning resources to improve your investment knowledge" },
            { name: "Portfolio Guidance", desc: "Comprehensive portfolio construction and diversification advice" }
          ]
        }
      ],
      footer: "Our complete trade configuration approach helps you invest with confidence and clarity."
    }
  };

  // Comprehensive platform information
  const platformInformationData = {
    title: "Shubh's Story",
    iconComponent: <img src={ShubhProfile} alt="Shubh Jain" className="w-30 h-22 object-cover object-top rounded-full" style={{objectPosition: 'center 0%'}} />,
    description: "How Lollipop transformed a retail trader's journey from losses to profits",
    content: [
      {
        section: "Chapter 1: The Struggle",
        text: "Meet Shubh, a 28-year-old software engineer from Mumbai who started trading with ₹2 lakh savings. Like millions of retail traders, he was searching for reliable trading signals...",
        items: [
          {
            name: "Instagram Addiction",
            desc: "Followed 50+ trading 'gurus' posting Lamborghini photos and fake P&L screenshots. Paid ₹15,000 for courses that taught nothing."
          },
          {
            name: "Telegram Chaos",
            desc: "Joined 20+ signal groups with 10,000+ members. Messages flooded his phone 24/7 with zero explanation."
          },
          {
            name: "The Damage",
            desc: "Lost ₹1.2 lakh in 6 months. Win rate: 23%. No way to verify any guru's actual performance. Felt completely lost."
          }
        ]
      },
      {
        section: "Chapter 2: The Discovery",
        text: "Frustrated and nearly broke, Shubh discovered Lollipop through a friend's recommendation. Initially skeptical, he decided to investigate...",
        items: [
          {
            name: "First Impression",
            desc: "Unlike flashy Instagram pages, Lollipop showed real track records. Verified SEBI-registered advisors with publicly auditable performance data - no hiding losses or fake screenshots."
          },
          {
            name: "Risk-Free Exploration",
            desc: "Browsed hundreds of signals for free. Every advisor's credentials, SEBI registrations, and complete performance histories were transparent and verifiable."
          },
          {
            name: "The Lightbulb Moment",
            desc: "Found advisors with 68% win rates and verified 2-year track records. Real regulatory compliance, not marketing gimmicks."
          }
        ]
      },
      {
        section: "Chapter 3: The Marketplace",
        text: "Shubham realized this wasn't just another signal service - it was a completely different model. A marketplace that gave him freedom, choice, and global access.",
        items: [
          {
            name: "Freedom from Lock-ins",
            desc: "No monthly subscriptions or advisor lock-ins like Telegram groups. Choose any advisor, any signal, any time. Complete flexibility over his trading decisions."
          },
          {
            name: "Global Access",
            desc: "Access to verified advisors from across the globe, not just one local 'guru'. Multiple strategies, markets, and expertise levels all in one platform."
          },
          {
            name: "SEBI Verified Transparency",
            desc: "Every advisor's track record was publicly auditable through SEBI registration. No more trusting fake screenshots - actual regulatory oversight."
          },
          {
            name: "Your Mission, Your Choice",
            desc: "Instead of being tied to one advisor's agenda, Shubham could align with his own investment mission. Pick advisors based on his goals, not their marketing."
          }
        ]
      },
      {
        section: "Chapter 4: The First Step",
        text: "Shubh decided to test Lollipop with his remaining ₹80,000. He bought 10 Lollipop credits for ₹500 to unlock his first premium signal...",
        items: [
          {
            name: "Smart Selection",
            desc: "Chose advisor 'TechAnalyst_Pro' with 71% win rate and ₹15 lakh average position size. SEBI registered with 500+ successful calls."
          },
          {
            name: "Premium Unlock",
            desc: "Spent 3 Lollipops to unlock complete analysis: entry ₹245, target ₹285, stop-loss ₹225. Detailed 15-minute research included."
          },
          {
            name: "First Success",
            desc: "Stock hit target in 12 days. ₹15,000 investment became ₹18,400. First profitable trade in months with clear reasoning."
          }
        ]
      },
      {
        section: "Chapter 4: The First Step",
        text: "Shubham decided to test Lollipop with his remaining ₹80,000. He bought 10 Lollipop credits for ₹500 to unlock his first premium signal...",
        items: [
          {
            name: "Smart Selection",
            desc: "Chose advisor 'TechAnalyst_Pro' with 71% win rate and ₹15 lakh average position size. SEBI registered with 500+ successful calls."
          },
          {
            name: "Premium Unlock",
            desc: "Spent 3 Lollipops to unlock complete analysis: entry ₹245, target ₹285, stop-loss ₹225. Detailed 15-minute research included."
          },
          {
            name: "First Success",
            desc: "Stock hit target in 12 days. ₹15,000 investment became ₹18,400. First profitable trade in months with clear reasoning."
          }
        ]
      },
      {
        section: "Chapter 5: Building Confidence",
        text: "Success breeds success. Shubh started following 3 verified advisors and developed a systematic approach to signal selection...",
        items: [
          {
            name: "Track Record Focus",
            desc: "Only followed advisors with 65%+ win rates and minimum 6-month verified history. No exceptions for flashy marketing."
          },
          {
            name: "Credit Management",
            desc: "Bought 50 Lollipops monthly, spending only on signals that matched his risk profile and market outlook."
          },
          {
            name: "Learning Process",
            desc: "Read detailed analysis in each unlocked signal. Started understanding why trades worked or failed."
          }
        ]
      },
      {
        section: "Chapter 6: The Transformation",
        text: "6 months later, Shubh's trading completely transformed. From losing money to consistent profits through verified signals...",
        items: [
          {
            name: "Performance Metrics",
            desc: "Win rate improved to 64%. Portfolio grew from ₹80,000 to ₹1.45 lakh. Average monthly returns: 12%."
          },
          {
            name: "Skill Development",
            desc: "Learned technical analysis, risk management, and position sizing from premium signal explanations."
          },
          {
            name: "Peace of Mind",
            desc: "No more FOMO trades or sleepless nights. Every trade backed by verified advisor's detailed research."
          }
        ]
      },
      {
        section: "The Lollipop Flow",
        text: "Here's exactly how Lollipop works - the system that transformed Shubh from a losing trader to a profitable one:",
        items: [
          {
            name: "Step 1: Browse & Research",
            desc: "Explore thousands of signals • Check advisor track records • Filter by performance metrics • All completely free"
          },
          {
            name: "Step 2: Verify & Select",
            desc: "View SEBI registrations • Analyze win rates • Check average returns • Read previous signal outcomes"
          },
          {
            name: "Step 3: Buy Credits",
            desc: "Purchase Lollipop credits • No subscriptions • Pay per signal • Credits never expire"
          },
          {
            name: "Step 4: Unlock Signals",
            desc: "Spend 1-5 credits per signal • Get complete trade setup • Entry, exit, stop-loss • Detailed analysis included"
          },
          {
            name: "Step 5: Execute Trades",
            desc: "Take parameters to your broker • Place trades with confidence • Follow advisor's risk management • Track performance"
          },
          {
            name: "Step 6: Learn & Grow",
            desc: "Monitor results • Learn from analysis • Build trading skills • Gradually reduce dependency on signals"
          }
        ]
      }
    ]
  };

  // Helper function to get meaningful icons for different sections
  const getSectionIcon = (sectionTitle, index) => {
    const sectionIcons = {
      "What are Asset Classes?": <Briefcase size={14} className="text-primary" />,
      "Main Asset Classes": <Layers size={14} className="text-primary" />,
      "Why Asset Classes Matter": <Target size={14} className="text-primary" />,
      "What is Investment Sentiment?": <TrendingUp size={14} className="text-primary" />,
      "Sentiment Types": <BarChart2 size={14} className="text-primary" />,
      "Factors Influencing Sentiment": <Activity size={14} className="text-primary" />,
      "What is Investment Risk?": <AlertTriangle size={14} className="text-primary" />,
      "Risk Categories": <Shield size={14} className="text-primary" />,
      "Risk Management Strategies": <ShieldCheck size={14} className="text-primary" />,
      "What are Investment Returns?": <BarChart2 size={14} className="text-primary" />,
      "Types of Returns": <DollarSign size={14} className="text-primary" />,
      "Return Expectations": <TrendingUp size={14} className="text-primary" />,
      "What is Investment Conviction?": <Target size={14} className="text-primary" />,
      "Conviction Levels": <Gauge size={14} className="text-primary" />,
      "Factors Affecting Conviction": <Award size={14} className="text-primary" />,
      "What are Investment Filters?": <Search size={14} className="text-primary" />,
      "Available Filter Categories": <Layers size={14} className="text-primary" />,
      "How to Use Filters Effectively": <Settings size={14} className="text-primary" />,
      "Smart Search Features": <Search size={14} className="text-primary" />,
      "What You Can Search For": <Hash size={14} className="text-primary" />,
      "Search Tips": <Zap size={14} className="text-primary" />,
      "Column Explanations": <Columns size={14} className="text-primary" />,
      "Available Columns": <BarChart3 size={14} className="text-primary" />,
      "Customizing Your View": <Settings2 size={14} className="text-primary" />,
      "What are Investment Symbols?": <Hash size={14} className="text-primary" />,
      "Types of Symbols": <Package size={14} className="text-primary" />,
      "How to Use Symbols": <ArrowRight size={14} className="text-primary" />,
      "What is a Holding Period?": <Clock size={14} className="text-primary" />,
      "Common Holding Periods": <Calendar size={14} className="text-primary" />,
      "Factors Affecting Holding Period": <RefreshCw size={14} className="text-primary" />,
      "Why Timing Matters": <Calendar size={14} className="text-primary" />,
      "Time-Related Factors": <Activity size={14} className="text-primary" />,
      "How to Use Timing Information": <Clock size={14} className="text-primary" />,
      "Who are Investment Advisors?": <User size={14} className="text-primary" />,
      "Types of Advisors": <UserCheck size={14} className="text-primary" />,
      "Evaluating Advisor Recommendations": <Award size={14} className="text-primary" />,
      "What are Investment Ideas?": <Briefcase size={14} className="text-primary" />,
      "Types of Investment Ideas": <Layers size={14} className="text-primary" />,
      "Investment Strategy Components": <Target size={14} className="text-primary" />,
      
      // Platform Information Icons
      "Our Mission": <Target size={14} className="text-primary" />,
      "Our Vision": <Eye size={14} className="text-primary" />,
      "The Problem We're Solving": <AlertTriangle size={14} className="text-primary" />,
      "How We're Solving It": <CheckCircle size={14} className="text-primary" />,
      "Why Some Tips Are Paid": <DollarSign size={14} className="text-primary" />,
      "How to Unlock Premium Tips": <LockOpen size={14} className="text-primary" />,
      "How to Evaluate Advisor Trustworthiness": <ShieldCheck size={14} className="text-primary" />,
      "How to Place a Trade Using Our Platform": <TrendingUp size={14} className="text-primary" />,
      "Platform Features Deep Dive": <Settings2 size={14} className="text-primary" />,
      "What Makes Us Different": <Award size={14} className="text-primary" />
    };
    
    return sectionIcons[sectionTitle] || <Info size={14} className="text-primary" />;
  };

  // Helper function to get meaningful icons for different items
  const getItemIcon = (itemName, index) => {
    const itemIcons = {
      // Asset Classes
      "Equities (Stocks)": <TrendingUp size={12} className="text-blue-600" />,
      "Bonds": <Shield size={12} className="text-green-600" />,
      "Commodities": <Coins size={12} className="text-yellow-600" />,
      "Real Estate": <Home size={12} className="text-purple-600" />,
      "Cash & Cash Equivalents": <DollarSign size={12} className="text-gray-600" />,
      "Cryptocurrencies": <Bitcoin size={12} className="text-orange-600" />,
      
      // Sentiment Types
      "Bullish": <TrendingUp size={12} className="text-green-600" />,
      "Bearish": <TrendingDown size={12} className="text-red-600" />,
      "Neutral": <Minus size={12} className="text-gray-600" />,
      
      // Risk Categories
      "Low Risk": <Shield size={12} className="text-green-600" />,
      "Medium Risk": <Gauge size={12} className="text-yellow-600" />,
      "High Risk": <AlertTriangle size={12} className="text-orange-600" />,
      "Very High Risk": <Zap size={12} className="text-red-600" />,
      
      // Return Types
      "Capital Gains": <TrendingUp size={12} className="text-green-600" />,
      "Dividends": <DollarSign size={12} className="text-blue-600" />,
      "Interest": <Coins size={12} className="text-purple-600" />,
      "Total Return": <BarChart2 size={12} className="text-primary" />,
      
      // Conviction Levels
      "High Conviction": <Target size={12} className="text-green-600" />,
      "Medium Conviction": <Gauge size={12} className="text-yellow-600" />,
      "Low Conviction": <AlertTriangle size={12} className="text-orange-600" />,
      
      // Filter Categories
      "Asset Classes": <Briefcase size={12} className="text-blue-600" />,
      "Risk Levels": <Shield size={12} className="text-red-600" />,
      "Expected Returns": <TrendingUp size={12} className="text-green-600" />,
      "Geographic Regions": <Globe size={12} className="text-purple-600" />,
      "Sectors": <Building size={12} className="text-orange-600" />,
      "Investment Strategies": <Target size={12} className="text-pink-600" />,
      
      // Search Categories
      "Company Names": <Building size={12} className="text-blue-600" />,
      "Stock Symbols": <Hash size={12} className="text-green-600" />,
      "Advisor Names": <User size={12} className="text-purple-600" />,
      "Investment Themes": <Layers size={12} className="text-orange-600" />,
      "Asset Types": <Package size={12} className="text-pink-600" />,
      
      // Column Types
      "Time": <Clock size={12} className="text-blue-600" />,
      "Advisor": <User size={12} className="text-green-600" />,
      "Asset": <Briefcase size={12} className="text-purple-600" />,
      "Symbol": <Hash size={12} className="text-orange-600" />,
      "Returns": <TrendingUp size={12} className="text-pink-600" />,
      "Risk": <Shield size={12} className="text-red-600" />,
      "Holding Period": <Clock size={12} className="text-blue-600" />,
      "Sentiment": <Activity size={12} className="text-green-600" />,
      "Conviction": <Target size={12} className="text-purple-600" />,
      
      // Symbol Types
      "Stock Tickers": <BarChart2 size={12} className="text-blue-600" />,
      "ETF Symbols": <Package size={12} className="text-green-600" />,
      "Index Symbols": <PieChart size={12} className="text-purple-600" />,
      "Crypto Symbols": <Bitcoin size={12} className="text-orange-600" />,
      "Currency Pairs": <ArrowLeftRight size={12} className="text-pink-600" />,
      
      // Holding Periods
      "Short-term (< 1 year)": <Zap size={12} className="text-red-600" />,
      "Medium-term (1-3 years)": <Clock size={12} className="text-yellow-600" />,
      "Long-term (3-5+ years)": <Calendar size={12} className="text-green-600" />,
      "Very Long-term (10+ years)": <Infinity size={12} className="text-blue-600" />,
      
      // Advisor Types
      "Registered Investment Advisors (RIAs)": <ShieldCheck size={12} className="text-blue-600" />,
      "Wealth Managers": <Briefcase size={12} className="text-green-600" />,
      "Research Analysts": <Search size={12} className="text-purple-600" />,
      "Portfolio Managers": <BarChart2 size={12} className="text-orange-600" />,
      "Financial Planners": <Calculator size={12} className="text-pink-600" />,
      
      // Investment Strategies  
      "Value Investing": <DollarSign size={12} className="text-green-600" />,
      "Growth Investing": <TrendingUp size={12} className="text-blue-600" />,
      "Income Investing": <Coins size={12} className="text-purple-600" />,
      "Momentum Investing": <Zap size={12} className="text-orange-600" />,
      "Contrarian Investing": <RefreshCw size={12} className="text-red-600" />,
      "Thematic Investing": <Layers size={12} className="text-pink-600" />,
      
      // Strategy Components
      "Research & Analysis": <Search size={12} className="text-blue-600" />,
      "Risk Assessment": <Shield size={12} className="text-red-600" />,
      "Position Sizing": <Gauge size={12} className="text-green-600" />,
      "Entry & Exit Strategy": <ArrowLeftRight size={12} className="text-purple-600" />,
      "Portfolio Integration": <Package size={12} className="text-orange-600" />,
      "Monitoring Plan": <Activity size={12} className="text-pink-600" />,
      
      // Platform Information Item Icons
      "Information Asymmetry": <TrendingDown size={12} className="text-red-600" />,
      "Fragmented Advice": <Shuffle size={12} className="text-orange-600" />,
      "Lack of Transparency": <EyeIcon size={12} className="text-red-600" />,
      "High Barriers to Entry": <Lock size={12} className="text-red-600" />,
      "No Standardization": <Layers size={12} className="text-orange-600" />,
      "Trust Issues": <AlertTriangle size={12} className="text-red-600" />,
      
      "Centralized Discovery Platform": <Search size={12} className="text-green-600" />,
      "Complete Transparency": <Eye size={12} className="text-green-600" />,
      "Standardized Information": <CheckCircle size={12} className="text-green-600" />,
      "Professional Verification": <ShieldCheck size={12} className="text-green-600" />,
      "Performance Tracking": <BarChart2 size={12} className="text-green-600" />,
      "Educational Resources": <BookOpen size={12} className="text-green-600" />,
      
      "Quality Assurance": <Award size={12} className="text-blue-600" />,
      "Advisor Incentive": <DollarSign size={12} className="text-green-600" />,
      "Resource Investment": <Building size={12} className="text-purple-600" />,
      "Risk Management": <Shield size={12} className="text-red-600" />,
      "Exclusive Insights": <Zap size={12} className="text-yellow-600" />,
      "Timely Updates": <RefreshCw size={12} className="text-blue-600" />,
      
      "Lollipop Credits": <Coins size={12} className="text-yellow-600" />,
      "Pricing Structure": <Calculator size={12} className="text-blue-600" />,
      "Credit Purchase": <ShoppingCart size={12} className="text-green-600" />,
      "Instant Access": <Zap size={12} className="text-purple-600" />,
      "Bulk Discounts": <Package size={12} className="text-orange-600" />,
      "Refund Policy": <RefreshCw size={12} className="text-green-600" />,
      
      "Track Record Analysis": <BarChart3 size={12} className="text-blue-600" />,
      "Success Rate Metrics": <TrendingUp size={12} className="text-green-600" />,
      "SEBI Registration": <ShieldCheck size={12} className="text-green-600" />,
      "Professional Background": <GraduationCap size={12} className="text-purple-600" />,
      "Tip Quality Assessment": <Award size={12} className="text-blue-600" />,
      "Consistency Check": <Activity size={12} className="text-orange-600" />,
      "Community Feedback": <MessageSquare size={12} className="text-pink-600" />,
      "Response to Market Changes": <RefreshCw size={12} className="text-blue-600" />,
      
      "Discovery Phase": <Search size={12} className="text-blue-600" />,
      "Evaluation Phase": <Eye size={12} className="text-green-600" />,
      "Decision Making": <Target size={12} className="text-purple-600" />,
      "Unlock Premium Content": <LockOpen size={12} className="text-orange-600" />,
      "Execute Through Your Broker": <TrendingUp size={12} className="text-green-600" />,
      "Monitor Performance": <Activity size={12} className="text-blue-600" />,
      "Follow Updates": <Bell size={12} className="text-yellow-600" />,
      "Learn and Improve": <BookOpen size={12} className="text-purple-600" />,
      
      // Shubham's Story Icons
      "Instagram Addiction": <Smartphone size={12} className="text-red-600" />,
      "Telegram Chaos": <MessageSquare size={12} className="text-red-600" />,
      "The Damage": <TrendingDown size={12} className="text-red-600" />,
      
      "First Impression": <Eye size={12} className="text-blue-600" />,
      "Risk-Free Exploration": <Search size={12} className="text-green-600" />,
      "The Lightbulb Moment": <Zap size={12} className="text-yellow-600" />,
      
      "Freedom from Lock-ins": <LockOpen size={12} className="text-green-600" />,
      "Global Access": <Globe size={12} className="text-blue-600" />,
      "SEBI Verified Transparency": <ShieldCheck size={12} className="text-green-600" />,
      "Your Mission, Your Choice": <Target size={12} className="text-purple-600" />,
      
      "Smart Selection": <Target size={12} className="text-blue-600" />,
      "Premium Unlock": <LockOpen size={12} className="text-green-600" />,
      "First Success": <CheckCircle size={12} className="text-green-600" />,
      
      "Track Record Focus": <BarChart2 size={12} className="text-blue-600" />,
      "Credit Management": <Coins size={12} className="text-yellow-600" />,
      "Learning Process": <BookOpen size={12} className="text-purple-600" />,
      
      "Performance Metrics": <TrendingUp size={12} className="text-green-600" />,
      "Skill Development": <GraduationCap size={12} className="text-blue-600" />,
      "Peace of Mind": <Heart size={12} className="text-green-600" />,
      
      "Step 1: Browse & Research": <Search size={12} className="text-blue-600" />,
      "Step 2: Verify & Select": <ShieldCheck size={12} className="text-green-600" />,
      "Step 3: Buy Credits": <ShoppingCart size={12} className="text-yellow-600" />,
      "Step 4: Unlock Signals": <LockOpen size={12} className="text-orange-600" />,
      "Step 5: Execute Trades": <TrendingUp size={12} className="text-green-600" />,
      "Step 6: Learn & Grow": <Trophy size={12} className="text-purple-600" />,
      
      "Advanced Search": <Search size={12} className="text-blue-600" />,
      "Smart Filters": <Settings size={12} className="text-green-600" />,
      "Categorization System": <Layers size={12} className="text-purple-600" />,
      "Real-time Data": <Activity size={12} className="text-orange-600" />,
      "Mobile Optimization": <Smartphone size={12} className="text-pink-600" />,
      "Portfolio Tools": <Briefcase size={12} className="text-blue-600" />,
      "Educational Content": <BookOpen size={12} className="text-green-600" />,
      "Community Features": <Users size={12} className="text-purple-600" />,
      
      "Complete Transparency": <Eye size={12} className="text-green-600" />,
      "Professional Standards": <Award size={12} className="text-blue-600" />,
      "Educational Focus": <GraduationCap size={12} className="text-purple-600" />,
      "Technology Integration": <Zap size={12} className="text-orange-600" />,
      "Regulatory Compliance": <ShieldCheck size={12} className="text-green-600" />,
      "Customer-First Approach": <Heart size={12} className="text-pink-600" />
    };
    
    return itemIcons[itemName] || <ArrowRight size={12} className="text-muted-foreground" />;
  };

  // Helper function to get footer text for sections
  const getSectionFooter = (sectionTitle) => {
    const sectionFooters = {
      "What are Asset Classes?": "Foundation of portfolio construction",
      "Main Asset Classes": "Diversification across asset types",
      "Why Asset Classes Matter": "Risk reduction through diversification",
      "What is Investment Sentiment?": "Market psychology drives decisions",
      "Sentiment Types": "Direction determines strategy",
      "Factors Influencing Sentiment": "Multiple data points shape outlook",
      "What is Investment Risk?": "Higher risk, higher potential return",
      "Risk Categories": "Match risk to your tolerance",
      "Risk Management Strategies": "Systematic approach to risk control",
      "What are Investment Returns?": "Returns come in multiple forms",
      "Types of Returns": "Understand all return sources",
      "Return Expectations": "Align expectations with risk level",
      "What is Investment Conviction?": "Confidence drives position size",
      "Conviction Levels": "Higher conviction, larger positions",
      "Factors Affecting Conviction": "Quality research builds confidence",
      "What are Investment Filters?": "Filters narrow down opportunities",
      "Available Filter Categories": "Multiple ways to slice data",
      "How to Use Filters Effectively": "Systematic filtering approach",
      "Smart Search Features": "Powerful search across all data",
      "What You Can Search For": "Find exactly what you need",
      "Search Tips": "Optimize your search strategy",
      "Column Explanations": "Each column tells a story",
      "Available Columns": "Customize your data view",
      "Customizing Your View": "Tailor interface to your needs",
      "What are Investment Symbols?": "Universal investment language",
      "Types of Symbols": "Different markets, different formats",
      "How to Use Symbols": "Symbols unlock detailed information",
      "What is a Holding Period?": "Time horizon affects strategy",
      "Common Holding Periods": "Match timeframe to goals",
      "Factors Affecting Holding Period": "Multiple variables influence timing",
      "Why Timing Matters": "Context affects relevance",
      "Time-Related Factors": "Market timing considerations",
      "How to Use Timing Information": "Leverage timing for better decisions",
      "Who are Investment Advisors?": "Professional expertise matters",
      "Types of Advisors": "Different specializations available",
      "Evaluating Advisor Recommendations": "Due diligence is essential",
      "What are Investment Ideas?": "Opportunities require research",
      "Types of Investment Ideas": "Multiple strategies available",
      "Investment Strategy Components": "Systematic approach essential",
      
      // Platform Information Footers
      "Our Mission": "Democratizing professional investment advice",
      "Our Vision": "Building the world's most trusted investment platform",
      "The Problem We're Solving": "Addressing key challenges in retail investing", 
      "How We're Solving It": "Technology-driven solutions for modern investors",
      "Why Some Tips Are Paid": "Quality comes with investment in research",
      "How to Unlock Premium Tips": "Simple credit system for accessing premium content",
      "How to Evaluate Advisor Trustworthiness": "Multiple verification methods ensure quality",
      "How to Place a Trade Using Our Platform": "End-to-end investment process guidance",
      "Platform Features Deep Dive": "Comprehensive tools for smart investing",
      "What Makes Us Different": "Transparency, education, and technology combined"
    };
    
    return sectionFooters[sectionTitle] || "Important investment consideration";
  };

  // Helper function to get footer text for items
  const getItemFooter = (itemName) => {
    const itemFooters = {
      // Asset Classes
      "Equities (Stocks)": "Growth potential with volatility",
      "Bonds": "Steady income with lower risk",
      "Commodities": "Inflation hedge with cyclicality",
      "Real Estate": "Tangible assets with income",
      "Cash & Cash Equivalents": "Liquidity with low returns",
      "Cryptocurrencies": "High potential, high risk",
      
      // Sentiment Types
      "Bullish": "Optimism drives buying",
      "Bearish": "Pessimism drives selling",
      "Neutral": "Balanced market view",
      
      // Risk Categories
      "Low Risk": "Stability over growth",
      "Medium Risk": "Balanced risk-reward",
      "High Risk": "Growth over stability",
      "Very High Risk": "Speculation territory",
      
      // And more...
      "Capital Gains": "Buy low, sell high",
      "Dividends": "Regular income stream",
      "Interest": "Fixed income payments",
      "Total Return": "Complete picture",
      
      "High Conviction": "Strong research backing",
      "Medium Conviction": "Moderate confidence",
      "Low Conviction": "Limited certainty",
      
      "Short-term (< 1 year)": "Quick turnaround",
      "Medium-term (1-3 years)": "Balanced timeframe",
      "Long-term (3-5+ years)": "Patient capital",
      "Very Long-term (10+ years)": "Generational wealth",
      
      // Investment Strategies
      "Value Investing": "Buy cheap, sell fair",
      "Growth Investing": "Pay for potential",
      "Income Investing": "Cash flow focus",
      "Momentum Investing": "Ride the trend",
      "Contrarian Investing": "Zigging when others zag",
      "Thematic Investing": "Future-focused approach",
      
      // Strategy Components
      "Research & Analysis": "Knowledge is power",
      "Risk Assessment": "Know the downside",
      "Position Sizing": "Size matters",
      "Entry & Exit Strategy": "Timing is crucial",
      "Portfolio Integration": "Fit the puzzle",
      "Monitoring Plan": "Stay vigilant"
    };
    
    return itemFooters[itemName] || "Consider carefully";
  };

  // Function to open information sheet
  const openInfoSheet = (type, additionalData = {}) => {
    const data = informationData[type];
    if (data) {
      setInfoSheetData({ ...data, ...additionalData });
      setShowInfoSheet(true);
    }
  };

  // Available columns configuration
  const availableColumns = [
    { key: 'time', label: 'Time', minWidth: 'min-w-[100px]' },
    { key: 'advisor', label: 'Researcher', minWidth: 'min-w-[180px]' },
    { key: 'asset', label: 'Asset', minWidth: 'min-w-[120px]' },
    { key: 'symbol', label: 'Symbol', minWidth: 'min-w-[90px]' },
    { key: 'return', label: 'Returns', minWidth: 'min-w-[120px]' },
    { key: 'risk', label: 'Risk', minWidth: 'min-w-[110px]' },
    { key: 'holding', label: 'Holding', minWidth: 'min-w-[110px]' },
    { key: 'sentiment', label: 'Sentiment', minWidth: 'min-w-[110px]' },
    { key: 'investment', label: 'Research', minWidth: 'min-w-[80px]' },
    { key: 'sector', label: 'Sector', minWidth: 'min-w-[120px]' },
    { key: 'strategy', label: 'Strategy', minWidth: 'min-w-[130px]' },
    { key: 'conviction', label: 'Conviction', minWidth: 'min-w-[110px]' },
    { key: 'entry', label: 'Entry Price', minWidth: 'min-w-[100px]' },
    { key: 'exit', label: 'Exit Price', minWidth: 'min-w-[100px]' },
    { key: 'stop', label: 'Stop Loss', minWidth: 'min-w-[100px]' },
    { key: 'duration', label: 'Duration', minWidth: 'min-w-[100px]' },
    { key: 'allocation', label: 'Allocation', minWidth: 'min-w-[100px]' },
    { key: 'catalyst', label: 'Catalyst', minWidth: 'min-w-[120px]' },
    { key: 'valuation', label: 'Valuation', minWidth: 'min-w-[120px]' },
    { key: 'technical', label: 'Technical', minWidth: 'min-w-[120px]' },
    // Additional columns for missing filter types
    { key: 'marketCap', label: 'Market Cap', minWidth: 'min-w-[120px]' },
    { key: 'dividendYield', label: 'Dividend Yield', minWidth: 'min-w-[120px]' },
    { key: 'region', label: 'Region', minWidth: 'min-w-[100px]' },
    { key: 'growthMetrics', label: 'Growth Metrics', minWidth: 'min-w-[140px]' },
    { key: 'esgRatings', label: 'ESG Rating', minWidth: 'min-w-[110px]' },
    { key: 'analysisType', label: 'Analysis Type', minWidth: 'min-w-[130px]' },
    { key: 'volatility', label: 'Volatility', minWidth: 'min-w-[110px]' },
    { key: 'liquidity', label: 'Liquidity', minWidth: 'min-w-[110px]' },
    { key: 'diversification', label: 'Diversification', minWidth: 'min-w-[140px]' },
    { key: 'performance', label: 'Performance', minWidth: 'min-w-[120px]' }
  ];

  // Default selected columns (current 9 columns)
  const [selectedColumns, setSelectedColumns] = useState([
    'time', 'investment', 'advisor', 'symbol', 'return', 'asset', 'risk', 'holding', 'sentiment'
  ]);

  // Map filter keys to table column keys
  const filterKeyToColumnKey = {
    assets: 'asset',
    sectors: 'sector',
    sentiments: 'sentiment',
    strategies: 'strategy',
    risk: 'risk',
    expectedReturn: 'return',
    marketCap: 'marketCap',
    dividendYield: 'dividendYield',
    holding: 'holding',
    duration: 'duration',
    regions: 'region',
    valuationMetrics: 'valuation',
    growthMetrics: 'growthMetrics',
    technicalIndicators: 'technical',
    esgRatings: 'esgRatings',
    analysisType: 'analysisType',
    volatility: 'volatility',
    liquidity: 'liquidity',
    conviction: 'conviction',
    catalyst: 'catalyst',
    // Remove duplicate mappings - these filters will use the above mappings
    // valuation: 'valuation', (already mapped by valuationMetrics)
    // technical: 'technical', (already mapped by technicalIndicators)
    diversification: 'diversification',
    performance: 'performance',
  };

  // Auto-add columns for selected filter categories
  useEffect(() => {
    let newColumns = [...selectedColumns];
    Object.entries({
      assets: selectedAsset,
      sectors: selectedSector,
      sentiments: selectedSentiment,
      strategies: selectedStrategies,
      risk: selectedRisk,
      expectedReturn: selectedExpectedReturn,
      marketCap: selectedMarketCap,
      dividendYield: selectedDividendYield,
      holding: selectedHolding,
      duration: selectedDuration,
      regions: selectedRegions,
      valuationMetrics: selectedValuationMetrics,
      growthMetrics: selectedGrowthMetrics,
      technicalIndicators: selectedTechnicalIndicators,
      esgRatings: selectedEsgRatings,
      analysisType: selectedAnalysisType,
      volatility: selectedVolatility,
      liquidity: selectedLiquidity,
      conviction: selectedConviction,
      catalyst: selectedCatalyst,
      diversification: selectedDiversification,
      performance: selectedPerformance,
    }).forEach(([key, arr]) => {
      if (arr && arr.length > 0) {
        const colKey = filterKeyToColumnKey[key];
        if (colKey && !newColumns.includes(colKey)) {
          newColumns.push(colKey);
        }
      }
    });
    
    // Handle additional filters that map to same columns
    if (selectedValuation.length > 0 && !newColumns.includes('valuation')) {
      newColumns.push('valuation');
    }
    if (selectedTechnical.length > 0 && !newColumns.includes('technical')) {
      newColumns.push('technical');
    }
    
    // Remove duplicates
    newColumns = Array.from(new Set(newColumns));
    setSelectedColumns(newColumns);
  }, [
    selectedAsset,
    selectedSector,
    selectedSentiment,
    selectedStrategies,
    selectedRisk,
    selectedExpectedReturn,
    selectedMarketCap,
    selectedDividendYield,
    selectedHolding,
    selectedDuration,
    selectedRegions,
    selectedValuationMetrics,
    selectedGrowthMetrics,
    selectedTechnicalIndicators,
    selectedEsgRatings,
    selectedAnalysisType,
    selectedVolatility,
    selectedLiquidity,
    selectedConviction,
    selectedCatalyst,
    selectedDiversification,
    selectedPerformance,
    selectedValuation,
    selectedTechnical
  ]);

  // Mock tips data
  const tipsData = allTips;

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  // --- Search Debounce ---
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 200);
    return () => clearTimeout(handler);
  }, [search]);

  // Helper functions
  const normalize = (str) => (str || '').toLowerCase().replace(/\s+/g, '').trim();
  // --- Helper functions ---
  
  const toCamelCase = (str) => {
    if (!str) return '';
    return str
      .replace(/(?:^|\s|_|-)([a-z])/g, (_, c) => c ? c.toUpperCase() : '')
      .replace(/\s+/g, '');
  };

  // Helper function to add proper spacing to filter names
  const addSpacing = (str) => {
    if (!str) return '';
    return str
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase
      .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Add space between consecutive uppercase letters
      .replace(/([a-z])([0-9])/g, '$1 $2') // Add space between letters and numbers
      .replace(/([0-9])([a-z])/g, '$1 $2') // Add space between numbers and letters
      .replace(/([&])([A-Z])/g, '$1 $2') // Add space after ampersand
      .replace(/(\w)(\/)/g, '$1 $2') // Add space before slash
      .replace(/(\/)/g, ' / ') // Add spaces around slash
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
  };

  const isPaywalled = (tip) => {
  // --- Tip Paywall Logic ---
    if (!tip?.created_at) return false;
    const now = new Date();
    const created = new Date(tip.created_at);
    return (now.getTime() - created.getTime()) < 24 * 60 * 60 * 1000;
  };

  const isUnlocked = (tip) => {
    return unlockedTips.includes(tip.id);
  };

  // Function to render table cell content dynamically
  const renderTableCell = (tip, columnKey, idx, isMobile = false) => {
    const getLevelStyle = (level, type) => {
      if (type === 'conviction') {
        if (level === 'High') return isDarkTheme ? { background: '#166534', color: '#bbf7d0' } : { background: '#bbf7d0', color: '#166534' };
        if (level === 'Medium') return isDarkTheme ? { background: '#854d0e', color: '#fef9c3' } : { background: '#fef9c3', color: '#854d0e' };
        if (level === 'Low') return isDarkTheme ? { background: '#991b1b', color: '#fecaca' } : { background: '#fecaca', color: '#991b1b' };
      }
      if (type === 'risk') {
        if (level === 'Low') return isDarkTheme ? { background: '#166534', color: '#bbf7d0' } : { background: '#bbf7d0', color: '#166534' };
        if (level === 'Medium') return isDarkTheme ? { background: '#854d0e', color: '#fef9c3' } : { background: '#fef9c3', color: '#854d0e' };
        if (level === 'High') return isDarkTheme ? { background: '#991b1b', color: '#fecaca' } : { background: '#fecaca', color: '#991b1b' };
      }
      return {};
    };

    const baseClasses = isMobile ? "px-3 py-3 border-b border-border min-h-[44px]" : "px-4 py-2 border-r border-b border-border text-center whitespace-nowrap h-12 overflow-hidden text-ellipsis font-light text-[13.5px]";
    const cellClasses = `${baseClasses} ${isMobile ? 'text-sm' : ''}`;

    switch (columnKey) {
      case 'time':
        return (
          <td key={columnKey} className={isMobile ? 'min-w-[80px] px-3 py-3 border-b border-border text-sm' : cellClasses}>
            {timeAgo(tip.created_at)}
          </td>
        );
      case 'advisor':
        // Calculate paywall status for advisor clicks
        const created = new Date(tip.created_at);
        const now = new Date();
        const diffMs = now.getTime() - created.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        const paywalled = diffHours < 24;
        const unlocked = isUnlocked(tip);
        
        if (isMobile) {
          return (
            <td key={columnKey} className={cellClasses} data-walkthrough="advisor-column">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1 flex items-center gap-1 w-full justify-start hover:bg-muted/50" 
                onClick={() => {
                  console.log('Mobile advisor clicked:', tip.advisor_name, tip);
                  setSelectedAdvisorForMobile(tip);
                  setShowAdvisorSheet(true);
                  console.log('Set states - selectedAdvisorForMobile:', tip, 'showAdvisorSheet:', true);
                }}
                onDoubleClick={() => {
                  // Double-click to directly view all tips from this advisor
                  handleViewAllTips(tip.advisor_name);
                }}
                title={`Tap to view ${tip.advisor_name}'s profile, double-tap to view all tips`}
              >
                <img src={tip.advisor_avatar} alt={tip.advisor_name} className="w-5 h-5 rounded-full flex-shrink-0" />
                <span className="font-light text-[13.5px] truncate">{tip.advisor_name}</span>
                <ArrowUpRight size={14} style={{color: !isDarkTheme ? '#555' : '#A9A9A9'}} className="text-primary ml-1" />
              </Button>
            </td>
          );
        } else {
          return (
            <td key={columnKey} className="min-w-[180px] px-4 py-2 border-r border-b border-border text-center h-12" data-walkthrough="advisor-column">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div 
                      className="flex items-center justify-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer hover:bg-muted/50 rounded-md p-1 transition-colors"
                      onClick={() => {
                        console.log('Advisor clicked:', tip.advisor_name, tip);
                        if (paywalled && !unlocked) {
                          console.log('Showing paywall sheet');
                          setSelectedPaywallTip(tip);
                          setShowPaywallSheet(true);
                        } else {
                          console.log('Showing advisor sheet');
                          setSelectedAdvisorForMobile(tip);
                          setShowAdvisorSheet(true);
                           setSelectedAdvisorForMobile(tip);
                        setShowAdvisorSheet(true);
                        }
                      }}
                      onDoubleClick={() => {
                        // Double-click to directly view all tips from this advisor
                        handleViewAllTips(tip.advisor_name);
                      }}
                      title={`Click to view ${tip.advisor_name}'s profile, double-click to view all tips`}
                    >
                      <img src={tip.advisor_avatar} alt={tip.advisor_name} className="w-6 h-6 rounded-xl flex-shrink-0" />
                      <span className="font-light text-[13.5px] whitespace-nowrap overflow-hidden text-ellipsis">{tip.advisor_name}</span>
                      <ArrowUpRight size={14} className="text-muted-foreground" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="p-0 border-2 border-black dark:border-black shadow-lg bg-white dark:bg-background rounded-lg overflow-hidden">
                    <div className="flex h-10 w-72">
                      <div className="flex-1 p-1.5 bg-green-50 dark:bg-green-950/20 border-r border-green-200 dark:border-green-800 border-dashed flex flex-col justify-center items-center min-w-0">
                        <div className="text-[10px] text-gray-600 dark:text-muted-foreground text-center">Win Rate</div>
                        <div className="text-xs font-bold text-gray-900 dark:text-foreground whitespace-nowrap overflow-hidden text-ellipsis text-center">
                          {tip.advisor_win_rate ? `${(tip.advisor_win_rate * 100).toFixed(0)}%` : tip.win_rate ? `${(tip.win_rate * 100).toFixed(0)}%` : '68%'}
                        </div>
                      </div>
                      <div className="flex-1 p-1.5 bg-blue-50 dark:bg-blue-950/20 border-r border-blue-200 dark:border-blue-800 border-dashed flex flex-col justify-center items-center min-w-0">
                        <div className="text-[10px] text-gray-600 dark:text-muted-foreground text-center">Tips</div>
                        <div className="text-xs font-bold text-gray-900 dark:text-foreground whitespace-nowrap overflow-hidden text-ellipsis text-center">
                          {tip.advisor_total_tips || '150+'}
                        </div>
                      </div>
                      <div className="flex-1 p-1.5 bg-purple-50 dark:bg-purple-950/20 flex flex-col justify-center items-center min-w-0">
                        <div className="text-[10px] text-gray-600 dark:text-muted-foreground text-center">Researcher</div>
                        <div className="text-xs font-bold text-gray-900 dark:text-foreground whitespace-nowrap overflow-hidden text-ellipsis text-center">
                          {tip.advisor_sebi_registered || tip.sebi_registered ? 'SEBI RIA' : 'Educational'}
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </td>
          );
        }
      
      case 'asset':
        return (
          <td key={columnKey} className={cellClasses}>
            {!isMobile ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer hover:opacity-80 transition-opacity font-medium">
                      {tip.asset}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="p-0 border-2 border-black dark:border-black shadow-lg bg-white dark:bg-background rounded-lg overflow-hidden">
                    <div className="flex h-10 w-48">
                      <div className="flex-1 p-1.5 bg-cyan-50 dark:bg-cyan-950/20 border-r border-cyan-200 dark:border-cyan-800 border-dashed flex flex-col justify-center min-w-0">
                        <div className="text-[10px] text-gray-600 dark:text-muted-foreground">Market Cap</div>
                        <div className="text-xs font-bold text-gray-900 dark:text-foreground whitespace-nowrap overflow-hidden text-ellipsis">{tip.market_cap || 'Large Cap'}</div>
                      </div>
                      <div className="flex-1 p-1.5 bg-indigo-50 dark:bg-indigo-950/20 flex flex-col justify-center min-w-0">
                        <div className="text-[10px] text-gray-600 dark:text-muted-foreground">Sector</div>
                        <div className="text-xs font-bold text-gray-900 dark:text-foreground whitespace-nowrap overflow-hidden text-ellipsis">{tip.sector || 'Technology'}</div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              tip.asset
            )}
          </td>
        );
      
      case 'symbol':
        if (isMobile) {
          return (
            <td key={columnKey} className={`${cellClasses} font-medium`} data-walkthrough="symbol-column">
              <Button variant="ghost" size="sm" className="p-1 pl-2 pr-2 flex items-center gap-1.5" onClick={() => {
                setSelectedSymbolForMobile(tip.symbol);
                setShowSymbolSheet(true);
              }}>
                <span className="font-light text-[13.5px]">{tip.symbol}</span>
                <BarChart2 size={12} className="text-muted-foreground opacity-60" />
              </Button>
            </td>
          );
        } else {
          return (
            <td key={columnKey} className="min-w-[90px] px-4 py-2 border-r border-b border-border text-center whitespace-nowrap h-12 overflow-hidden text-ellipsis font-light text-[13.5px]" data-walkthrough="symbol-column">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-1 px-2 flex items-center justify-center gap-1.5 mx-auto" 
                    onClick={(e) => { 
                      const tipData = encodeURIComponent(JSON.stringify({
                        id: tip.id,
                        created_at: tip.created_at,
                        name: tip.advisor_name,
                        avatar: tip.advisor_avatar,
                        symbol: tip.symbol,
                        performance: tip.score || 60,
                        win_rate: tip.win_rate || 65,
                        conviction: tip.conviction || 'Medium',
                        holding: tip.holding || 'Swing',
                        risk: tip.risk || 'Medium',
                        entry_price: tip.entry_price,
                        exit_price: tip.exit_price,
                        target_duration: tip.duration,
                        allocation: tip.allocation,
                        catalyst: tip.catalyst,
                        valuation: tip.valuation,
                        sentiment: tip.sentiment,
                        technical: tip.technical,
                        sector: tip.sector,
                        ...tip
                      }));
                      window.open(`/tip?data=${tipData}`, '_blank');
                    }}
                  >
                    <span className="font-light text-[13.5px]">{tip.symbol}</span>
                    <BarChart2 size={12} className="text-muted-foreground opacity-60" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent 
                align="center" side="right" sideOffset={5} 
                className="p-0 border-2 border-black dark:border-black shadow-lg bg-white dark:bg-background rounded-lg overflow-hidden">
                  <div className="w-[400px] h-[250px]">
                    {/* TradingView Chart Container */}
                    <div className="w-full h-full bg-background rounded-lg overflow-hidden">
                      <TradingViewWidget
                        symbol={tip?.symbol}
                        theme={isDarkTheme ? 'dark' : 'light'}
                        height={250}
                        width={400}
                      />
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </td>
          );
        }
      
      case 'return':
        return (
          <td key={columnKey} className={isMobile ? `${cellClasses} font-medium` : cellClasses}>
            {!isMobile ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer hover:opacity-80 transition-opacity font-medium">
                      {tip.expected_return}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="p-0 border-2 border-black dark:border-black shadow-lg bg-white dark:bg-background rounded-lg overflow-hidden">
                    <div className="flex h-10 w-48">
                      <div className="flex-1 p-1.5 bg-blue-50 dark:bg-blue-950/20 border-r border-blue-200 dark:border-blue-800 border-dashed flex flex-col justify-center min-w-0">
                        <div className="text-[10px] text-gray-600 dark:text-muted-foreground">Duration</div>
                        <div className="text-xs font-bold text-gray-900 dark:text-foreground whitespace-nowrap overflow-hidden text-ellipsis">{tip.duration || 'TBD'}</div>
                      </div>
                      <div className="flex-1 p-1.5 bg-orange-50 dark:bg-orange-950/20 flex flex-col justify-center min-w-0">
                        <div className="text-[10px] text-gray-600 dark:text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis">Portfolio Allocation</div>
                        <div className="text-xs font-bold text-gray-900 dark:text-foreground whitespace-nowrap overflow-hidden text-ellipsis">{tip.portfolio_allocation || tip.allocation || '5-10%'}</div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              tip.expected_return
            )}
          </td>
        );
      
      case 'risk':
        return (
          <td key={columnKey} className={isMobile ? cellClasses : "min-w-[110px] px-4 py-2 border-r border-b border-border text-center h-12"}>
            {!isMobile ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge 
                      style={getLevelStyle(tip.risk || 'Medium', 'risk')} 
                      className="font-[13.5px] font-light border-none px-2.5 py-0.5 whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      {tip.risk || 'Medium'}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="p-0 border-2 border-black dark:border-black shadow-lg bg-white dark:bg-background rounded-lg overflow-hidden">
                    <div className="flex h-10 w-48">
                      <div className="flex-1 p-1.5 bg-blue-50 dark:bg-blue-950/20 border-r border-blue-200 dark:border-blue-800 border-dashed flex flex-col justify-center min-w-0">
                        <div className="text-[10px] text-gray-600 dark:text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis">Advisor Conviction</div>
                        <div className="text-xs font-bold text-gray-900 dark:text-foreground whitespace-nowrap overflow-hidden text-ellipsis">{tip.conviction || 'High'}</div>
                      </div>
                      <div className="flex-1 p-1.5 bg-green-50 dark:bg-green-950/20 flex flex-col justify-center min-w-0">
                        <div className="text-[10px] text-gray-600 dark:text-muted-foreground">Win Rate</div>
                        <div className="text-xs font-bold text-gray-900 dark:text-foreground whitespace-nowrap overflow-hidden text-ellipsis">{tip.advisor_win_rate ? `${(tip.advisor_win_rate * 100).toFixed(0)}%` : tip.win_rate ? `${(tip.win_rate * 100).toFixed(0)}%` : '68%'}</div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Badge 
                style={getLevelStyle(tip.risk || 'Medium', 'risk')} 
                className="font-medium border-none px-1 py-0.5 text-xs whitespace-nowrap"
              >
                {tip.risk || 'Medium'}
              </Badge>
            )}
          </td>
        );
      
      case 'holding':
        return (
          <td key={columnKey} className={cellClasses}>
            {!isMobile ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer hover:opacity-80 transition-opacity font-medium">
                      {tip.holding}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="p-0 border-2 border-black dark:border-black shadow-lg bg-white dark:bg-background rounded-lg overflow-hidden">
                    <div className="flex h-10 w-48">
                      <div className="flex-1 p-1.5 bg-blue-50 dark:bg-blue-950/20 border-r border-blue-200 dark:border-blue-800 border-dashed flex flex-col justify-center min-w-0">
                        <div className="text-[10px] text-gray-600 dark:text-muted-foreground">Duration</div>
                        <div className="text-xs font-bold text-gray-900 dark:text-foreground whitespace-nowrap overflow-hidden text-ellipsis">{tip.duration || tip.holding || 'Medium Term'}</div>
                      </div>
                      <div className="flex-1 p-1.5 bg-orange-50 dark:bg-orange-950/20 flex flex-col justify-center min-w-0">
                        <div className="text-[10px] text-gray-600 dark:text-muted-foreground">Strategy</div>
                        <div className="text-xs font-bold text-gray-900 dark:text-foreground whitespace-nowrap overflow-hidden text-ellipsis">{tip.strategy || 'Swing Trading'}</div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              tip.holding
            )}
          </td>
        );
      
      case 'sentiment':
        return (
          <td key={columnKey} className={cellClasses}>
            {!isMobile ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer hover:opacity-80 transition-opacity font-medium">
                      {tip.sentiment}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="p-0 border-2 border-black dark:border-black shadow-lg bg-white dark:bg-background rounded-lg overflow-hidden">
                    <div className="flex h-10 w-48">
                      <div className="flex-1 p-1.5 bg-emerald-50 dark:bg-emerald-950/20 border-r border-emerald-200 dark:border-emerald-800 border-dashed flex flex-col justify-center min-w-0">
                        <div className="text-[10px] text-gray-600 dark:text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis">Technical Analysis</div>
                        <div className="text-xs font-bold text-gray-900 dark:text-foreground whitespace-nowrap overflow-hidden text-ellipsis">{tip.technical || 'Bullish'}</div>
                      </div>
                      <div className="flex-1 p-1.5 bg-rose-50 dark:bg-rose-950/20 flex flex-col justify-center min-w-0">
                        <div className="text-[10px] text-gray-600 dark:text-muted-foreground">Volatility</div>
                        <div className="text-xs font-bold text-gray-900 dark:text-foreground whitespace-nowrap overflow-hidden text-ellipsis">{tip.volatility || 'Medium'}</div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              tip.sentiment
            )}
          </td>
        );
      
      case 'investment': {
        // Paywall logic: show lock icon if tip is less than 25 hours old and not unlocked
        const created = new Date(tip.created_at);
        const now = new Date();
        const diffMs = now.getTime() - created.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        const paywalled = diffHours < 24;
        const unlocked = isUnlocked(tip);
        return (
          <td key={columnKey} className={isMobile ? "px-2 py-2 border-b border-border text-center" : "min-w-[80px] px-4 py-2 border-r border-b border-border text-center h-12"} >
            <div className="flex items-center justify-center gap-1">
              <span>{tip.investment }</span>
              {paywalled && !unlocked ? (
                isMobile ? (
                  <span onClick={() => {
                    setSelectedPaywallTip(tip);
                    setShowPaywallSheet(true);
                  }}>
                    <Lock size={16} className="ml-1 text-muted-foreground cursor-pointer" />
                  </span>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span 
                          className="cursor-pointer"
                          onClick={(e) => {
                            // Use a timeout to distinguish between single and double clicks
                            if (e.detail === 1) {
                              // Single click - set a timeout
                              setTimeout(() => {
                                if (e.target.dataset.preventClick !== 'true') {
                                  setSelectedPaywallTip(tip);
                                  setShowPaywallSheet(true);
                                }
                              }, 250);
                            } else if (e.detail === 2) {
                              // Double click - prevent single click and execute unlock
                              e.target.dataset.preventClick = 'true';
                              setTimeout(() => {
                                e.target.dataset.preventClick = 'false';
                              }, 300);
                              
                              e.stopPropagation();
                              e.preventDefault();
                              
                              const actualCost = calculateActualCost(tip, userData);
                              if (isLoggedIn && userData?.credits >= actualCost) {
                                handleUnlockTip(tip).then((unlockSuccess) => {
                                  if (unlockSuccess) {
                                    // Unlock successful - open the tip sheet directly
                                    toast("Tip unlocked successfully! ✨", {
                                      duration: 4000,
                                      position: "top-center",
                                    });
                                    // Open the tip sheet
                                    setSelectedTipForMobile(tip);
                                    setMobileTipSheetOpen(true);
                                  }
                                });
                              } else if (!isLoggedIn) {
                                toast("Please login to unlock tips", {
                                  duration: 3000,
                                  position: "top-center",
                                });
                              } else {
                                const actualCost = calculateActualCost(tip, userData);
                                toast(`Not enough Lollipops! You need ${actualCost} Lollipops to unlock this tip.`, {
                                  duration: 3000,
                                  position: "top-center",
                                });
                              }
                            }
                          }}
                        >
                          <Lock size={16} className="ml-1 text-muted-foreground hover:text-foreground transition-colors" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-sm p-0 border-2 border-black dark:border-black shadow-lg bg-white dark:bg-background">
                        <div className="p-4 space-y-4">
                          {/* Header */}
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-primary/10 flex items-center justify-center p-1.5">
                              <Lock size={14} className="text-blue-600 dark:text-primary" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-gray-900 dark:text-foreground">Premium Investment Access</div>
                              <div className="text-xs text-gray-600 dark:text-muted-foreground">
                                Unlock professional-grade insights
                              </div>
                            </div>
                          </div>

                          {/* Unlock Requirements Section */}
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground">Unlock Requirements</h4>
                              <p className="text-xs text-gray-600 dark:text-muted-foreground mt-1 leading-relaxed">
                                Investment credits needed to access this premium tip
                              </p>
                            </div>
                            
                            <div className="space-y-2">
                              {(() => {
                                const isAdvisorSebiRegistered = tip.advisor_sebi_registered || tip.sebi_registered;
                                const isUserSebiRegistered = userData?.sebi_registered || false;
                                const successRate = tip.successRate || tip.success_rate || '74';
                                
                                // Dynamic pricing structure based on user SEBI status
                                const pricingComponents = [];
                                
                                // Base cost (always 1)
                                pricingComponents.push({
                                  title: "Base unlock",
                                  description: "Standard credit for accessing investment tips",
                                  cost: 1,
                                  iconCount: 1
                                });
                                
                                // SEBI registration premium (show for all users when advisor is SEBI registered)
                                if (isAdvisorSebiRegistered) {
                                  pricingComponents.push({
                                    title: "SEBI Registered Advisor",
                                    description: isUserSebiRegistered 
                                      ? "Premium for SEBI registered advisors (waived for SEBI users)" 
                                      : "Premium for tips from SEBI registered advisors",
                                    cost: 2,
                                    iconCount: 2
                                  });
                                }
                                
                                // Win Rate (always 2 credits)
                                pricingComponents.push({
                                  title: `${successRate || 76}% Win Rate`,
                                  description: `Advisors with win rate of >50%`,
                                  cost: 2,
                                  iconCount: 2
                                });
                                
                                return pricingComponents.map((component, index) => (
                                  <div key={index} className="p-2.5 rounded-lg border bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                                    <div className="flex items-center justify-between text-xs mb-1">
                                      <div className="flex items-center gap-2">
                                        <div className="flex gap-0.5">
                                          {[...Array(component.iconCount)].map((_, i) => (
                                            <img key={i} src={isDarkTheme ? LollipopSVGWhite : LollipopSVG} alt="Lollipop" className="w-3.5 h-3.5" />
                                          ))}
                                        </div>
                                        <span className="text-gray-700 dark:text-foreground">{component.title}</span>
                                      </div>
                                      <span className="font-bold text-gray-900 dark:text-foreground">{component.cost}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-muted-foreground leading-relaxed">
                                      {component.description}
                                    </p>
                                  </div>
                                ));
                              })()}
                              
                              <div className="p-3 rounded-lg border bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 border-green-300 dark:border-green-700">
                                {(() => {
                                  const actualCost = calculateActualCost(tip, userData);
                                  const isUserSebiRegistered = userData?.sebi_registered || false;
                                  const isAdvisorSebiRegistered = tip.advisor_sebi_registered || tip.sebi_registered;
                                  const showingSebiRow = isUserSebiRegistered && isAdvisorSebiRegistered;
                                  
                                  return (
                                    <>
                                      <div className="flex items-center justify-between font-medium">
                                        <div className="flex flex-col gap-1">
                                          <div className="flex gap-0.5">
                                            {[...Array(actualCost)].map((_, i) => (
                                              <img key={i} src={isDarkTheme ? LollipopSVGWhite : LollipopSVG} alt="Lollipop" className="w-3.5 h-3.5" />
                                            ))}
                                          </div>
                                          <span className="text-xs text-gray-700 dark:text-foreground">
                                            Your Cost
                                          </span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                          <span className="text-sm font-bold text-green-600">{actualCost} Lollipops</span>
                                          {showingSebiRow && (
                                            <span className="text-xs text-gray-500 line-through">5 Lollipops</span>
                                          )}
                                        </div>
                                      </div>
                                      <p className="text-xs text-gray-600 dark:text-muted-foreground leading-relaxed mt-1">
                                        {showingSebiRow 
                                          ? `SEBI users get 2 credit discount (shown above) for final cost of 3 credits` 
                                          : "Complete cost to unlock this premium investment tip"
                                        }
                                      </p>
                                    </>
                                  );
                                })()}
                                
                                <div className="mt-2.5 pt-2.5 border-t border-green-200 dark:border-green-700">
                                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-muted-foreground">
                                    <span>{isLoggedIn ? "Your Available Credits" : "Login Required"}</span>
                                    <span className="font-medium text-gray-900 dark:text-foreground">
                                      {isLoggedIn ? `${userData?.credits || 0} Lollipops` : "-- Lollipops"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Unlock Button */}
                            <div className="pt-2">
                              {isLoggedIn ? (
                                <Button 
                                  className="w-full font-medium text-xs h-8"
                                  size="sm"
                                  variant={userData?.credits >= calculateActualCost(tip, userData) ? "default" : "outline"}
                                  onClick={async (e) => {
                                    e.stopPropagation();
                                    const actualCost = calculateActualCost(tip, userData);
                                    if (userData?.credits >= actualCost) {
                                      const unlockSuccess = await handleUnlockTip(tip);
                                      if (unlockSuccess) {
                                        // Close tooltip and open tip sheet
                                        setSelectedTipForMobile(tip);
                                        setMobileTipSheetOpen(true);
                                        toast("Tip unlocked successfully!", {
                                          duration: 3000,
                                          position: "top-center",
                                        });
                                      }
                                    } else {
                                      toast(`Not enough Lollipops! You need ${requiredLollipops} Lollipops to unlock this tip.`, {
                                        duration: 3000,
                                        position: "top-center",
                                      });
                                    }
                                  }}
                                  disabled={userData?.credits < calculateActualCost(tip, userData)}
                                >
                                  <div className="flex items-center justify-center gap-1.5">
                                    {userData?.credits >= calculateActualCost(tip, userData) ? (
                                      <>
                                        <LockOpenIcon className="w-3 h-3" />
                                        <span>Unlock Investment Tip</span>
                                      </>
                                    ) : (
                                      <>
                                        <Lock className="w-3 h-3" />
                                        <span>Insufficient Credits</span>
                                      </>
                                    )}
                                  </div>
                                </Button>
                              ) : (
                                <Button 
                                  className="w-full font-medium text-xs h-8"
                                  size="sm"
                                  variant="default"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.location.href = '/login';
                                  }}
                                >
                                  <div className="flex items-center justify-center gap-1.5">
                                    <LogIn className="w-3 h-3" />
                                    <span>Login to Unlock</span>
                                  </div>
                                </Button>
                              )}
                            </div>
                            
                            <div className="pt-2 border-t border-gray-200 dark:border-border/50">
                              <p className="text-xs text-gray-500 dark:text-muted-foreground text-center">
                                Double-click lock icon to directly unlock the tip
                              </p>
                            </div>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              ) : (
                isMobile ? (
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => {
                    setSelectedTipForMobile(tip);
                    setMobileTipSheetOpen(true);
                  }}>
                    <Info size={12} />
                  </Button>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => {
                            setSelectedTipForMobile(tip);
                            setMobileTipSheetOpen(true);
                          }}
                        >
                          <Info size={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="p-0 border-2 border-black dark:border-black shadow-lg bg-white dark:bg-background rounded-lg overflow-hidden">
                        <div>
                          <div className="grid grid-cols-2 h-20 w-64">
                            <div className="p-1.5 bg-green-50 dark:bg-green-950/20 border-r border-green-200 dark:border-green-800 border-dashed border-b border-green-200 dark:border-green-800 flex flex-col justify-center items-center min-w-0">
                              <div className="text-[10px] text-gray-600 dark:text-muted-foreground text-center">Entry Price</div>
                              <div className="text-xs font-bold text-gray-900 dark:text-foreground whitespace-nowrap overflow-hidden text-ellipsis text-center">${tip.entry_price || 'TBD'}</div>
                            </div>
                            <div className="p-1.5 bg-red-50 dark:bg-red-950/20 border-b border-red-200 dark:border-red-800 flex flex-col justify-center items-center min-w-0">
                              <div className="text-[10px] text-gray-600 dark:text-muted-foreground text-center">Exit Price</div>
                              <div className="text-xs font-bold text-gray-900 dark:text-foreground whitespace-nowrap overflow-hidden text-ellipsis text-center">${tip.exit_price || tip.target_price || 'TBD'}</div>
                            </div>
                            <div className="p-1.5 bg-blue-50 dark:bg-blue-950/20 border-r border-blue-200 dark:border-blue-800 border-dashed flex flex-col justify-center items-center min-w-0">
                              <div className="text-[10px] text-gray-600 dark:text-muted-foreground text-center">Duration</div>
                              <div className="text-xs font-bold text-gray-900 dark:text-foreground whitespace-nowrap overflow-hidden text-ellipsis text-center">{tip.duration || tip.holding || 'Swing'}</div>
                            </div>
                            <div className="p-1.5 bg-orange-50 dark:bg-orange-950/20 flex flex-col justify-center items-center min-w-0">
                              <div className="text-[10px] text-gray-600 dark:text-muted-foreground text-center">Stop Loss</div>
                              <div className="text-xs font-bold text-gray-900 dark:text-foreground whitespace-nowrap overflow-hidden text-ellipsis text-center">${tip.stop_loss || 'TBD'}</div>
                            </div>
                          </div>
                          <div className="px-2 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-black-800 dark:border-black-700">
                            <div className="text-[9px] text-gray-500 dark:text-gray-400 text-center">
                              {tip.advisor_sebi_registered || tip.sebi_registered ? 'Investment Advice by SEBI Registered Advisor' : 'Independent research shared for educational purposes.'}
                            </div>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              )}
            </div>
          </td>
        );
      }
      
      // Additional columns
      case 'sector':
        return (
          <td key={columnKey} className={cellClasses}>
            {tip.sector }
          </td>
        );
      
      case 'strategy':
        return (
          <td key={columnKey} className={cellClasses}>
            {tip.strategy }
          </td>
        );
      
      case 'conviction':
        return (
          <td key={columnKey} className={isMobile ? cellClasses : "min-w-[110px] px-4 py-2 border-r border-b border-border text-center h-12"}>
            <Badge 
              style={getLevelStyle(tip.conviction || 'Medium', 'conviction')} 
              className={isMobile ? "font-medium border-none px-1 py-0.5 text-xs whitespace-nowrap" : "font-[13.5px] font-light border-none px-2.5 py-0.5 whitespace-nowrap"}
            >
              {tip.conviction || 'Medium'}
            </Badge>
          </td>
        );
      
      case 'entry':
        return (
          <td key={columnKey} className={cellClasses}>
            ${tip.entry_price }
          </td>
        );
      
      case 'exit':
        return (
          <td key={columnKey} className={cellClasses}>
            ${tip.exit_price }
          </td>
        );
      
      case 'stop':
        return (
          <td key={columnKey} className={cellClasses}>
            ${tip.stop_loss }
          </td>
        );
      
      case 'duration':
        return (
          <td key={columnKey} className={cellClasses}>
            {tip.duration }
          </td>
        );
      
      case 'allocation':
        return (
          <td key={columnKey} className={cellClasses}>
            {tip.allocation }
          </td>
        );
      
      case 'catalyst':
        return (
          <td key={columnKey} className={cellClasses}>
            {tip.catalyst }
          </td>
        );
      
      case 'valuation':
        return (
          <td key={columnKey} className={cellClasses}>
            {tip.valuation }
          </td>
        );
      
      case 'technical':
        return (
          <td key={columnKey} className={cellClasses}>
            {tip.technical }
          </td>
        );
      
      case 'marketCap':
        return (
          <td key={columnKey} className={cellClasses}>
            {tip.market_cap || tip.marketCap || '-'}
          </td>
        );
      
      case 'dividendYield':
        return (
          <td key={columnKey} className={cellClasses}>
            {tip.dividend_yield || tip.dividendYield || '-'}
          </td>
        );
      
      case 'region':
        return (
          <td key={columnKey} className={cellClasses}>
            {tip.region || tip.geography || '-'}
          </td>
        );
      
      case 'growthMetrics':
        return (
          <td key={columnKey} className={cellClasses}>
            {tip.growth_metric || tip.growthMetrics || '-'}
          </td>
        );
      
      case 'esgRatings':
        return (
          <td key={columnKey} className={cellClasses}>
            {tip.esg_rating || tip.esgRating || '-'}
          </td>
        );
      
      case 'analysisType':
        return (
          <td key={columnKey} className={cellClasses}>
            {tip.analysis_type || tip.analysisType || '-'}
          </td>
        );
      
      case 'volatility':
        return (
          <td key={columnKey} className={cellClasses}>
            {tip.volatility || '-'}
          </td>
        );
      
      case 'liquidity':
        return (
          <td key={columnKey} className={cellClasses}>
            {tip.liquidity || '-'}
          </td>
        );
      
      case 'diversification':
        return (
          <td key={columnKey} className={cellClasses}>
            {tip.diversification || '-'}
          </td>
        );
      
      case 'performance':
        return (
          <td key={columnKey} className={cellClasses}>
            {tip.performance || tip.expected_performance || '-'}
          </td>
        );
      
      default:
        return (
          <td key={columnKey} className={cellClasses}>
            {tip[columnKey] || '-'}
          </td>
        );
    }
  };

  // Unlock tip handler
  // Helper function to calculate actual cost based on user's SEBI status
  const calculateActualCost = (tip, userData) => {
    const isAdvisorSebiRegistered = tip.advisor_sebi_registered || tip.sebi_registered;
    const isUserSebiRegistered = userData?.sebi_registered || false;
    
    // If advisor is SEBI registered
    if (isAdvisorSebiRegistered) {
      // SEBI users get discount: 5 - 2 = 3 credits
      // Non-SEBI users pay full: 5 credits
      return isUserSebiRegistered ? 3 : 5;
    }
    
    // Non-SEBI advisor tips: 3 credits for everyone (1 base + 2 win rate)
    return 3;
  };

  const handleUnlockTip = async (tip) => {
    // If not logged in, redirect to login
    if (!userData || !userData.id) {
      window.location.href = '/login';
      return false;
    }
    // Check if already unlocked
    if (isUnlocked(tip)) {
      return true;
    }
    // Calculate actual cost based on user's SEBI status
    const actualCost = calculateActualCost(tip, userData);
    // Check if user has enough credits
    if ((userData.credits || 0) < actualCost) {
      alert(`Not enough Lollipops to unlock this tip. Required: ${actualCost}, Available: ${userData.credits || 0}`);
      return false;
    }
    // Deduct credits and update Supabase
    const newCredits = (userData.credits || 0) - actualCost;
    const { data: updateData, error: updateError } = await supabase
      .from('users')
      .update({ credits: newCredits })
      .eq('id', userData.id)
      .select()
      .single();
    
    if (updateError) {
      console.error('Error updating user credits:', updateError);
      alert('Failed to update credits. Please try again.');
      return false;
    }
  const baseClasses = isMobile ? "px-2 py-2 border-b border-border text-center" : "px-4 py-2 border-r border-b border-border text-center whitespace-nowrap h-12 overflow-hidden text-ellipsis font-light text-[13.5px]";
    const currentUnlocked = Array.isArray(updateData.unlockedTips) ? updateData.unlockedTips : [];
    const updatedUnlocked = currentUnlocked.includes(tip.id) ? currentUnlocked : [...currentUnlocked, tip.id];
    const { data: unlockData, error: unlockError } = await supabase
      .from('users')
      .update({ unlockedTips: updatedUnlocked })
      .eq('id', userData.id)
      .select()
      .single();
    if (unlockError) {
      console.error('Error updating unlocked_tips:', unlockError);
      alert('Failed to unlock tip. Please try again.');
      return false;
    }
    // Update local state atomically
    setUserData(prev => ({ ...prev, credits: newCredits, unlocked_tips: updatedUnlocked }));
    setUnlockedTips(prev => prev.includes(tip.id) ? prev : [...prev, tip.id]);
    return true;
  };

  // Filtered tips logic

  const filteredTips = useMemo(() => {
  // --- Filtered Tips Logic ---
    // Helper for string match
    const matchString = (a, b) => {
      if (!a || !b) return false;
      return a.trim().toLowerCase() === b.trim().toLowerCase();
    };

    // Helper for array filter
    const filterArray = (selected, value) => {
      if (!selected || selected.length === 0) return true;
      return selected.some(sel => matchString(sel, value));
    };

    // Helper for range filter
    const filterRange = (selected, value, config) => {
      if (!selected || selected.length === 0) return true;
      return selected.some(label => {
        const range = config.find(r => r.name === label);
        if (!range || value === null) return false;
        
        // Handle the boundary conditions correctly:
        // >= lowerLimit AND < upperLimit (except for highest range which includes upperLimit)
        if (range.max === Infinity) {
          return value >= range.min;
        } else {
          return value >= range.min && value < range.max;
        }
      });
    };

    // Main filter logic
    let tips = tipsData.filter(tip => {
      if (showOnlyFree) {
        const tipDate = new Date(tip.created_at);
        const now = new Date();
        const hoursDiff = (now - tipDate) / (1000 * 60 * 60);
        if (hoursDiff < 24) return false;
      }

      if (showOnlySebi) {
        const isSebiRegistered = tip.advisor_sebi_registered || tip.sebi_registered;
        if (!isSebiRegistered) return false;
      }

      // Parse numbers for range filters
      const parseReturnValue = (returnStr) => {
        if (!returnStr) return null;
        const str = String(returnStr).toLowerCase();
        
        // Handle range formats like "25%-30%" or "20-25%"
        if (str.includes('-')) {
          const parts = str.split('-');
          if (parts.length === 2) {
            // Use the lower bound of the range for filtering
            const lowerBound = parseFloat(parts[0].replace(/[^\d.]/g, ''));
            return isNaN(lowerBound) ? null : lowerBound;
          }
        }
        
        // Handle single values like "30%" or "25"
        const singleValue = parseFloat(str.replace(/[^\d.]/g, ''));
        return isNaN(singleValue) ? null : singleValue;
      };
      
      const tipReturn = parseReturnValue(tip.expected_return || tip.expectedReturn || tip.return);
      const tipDividend = tip.dividend_yield ? parseFloat(tip.dividend_yield) : null;
      const tipSalesGrowth = tip.sales_growth ? parseFloat(tip.sales_growth) : null;
      const tipEarningsGrowth = tip.earnings_growth ? parseFloat(tip.earnings_growth) : null;

      // Apply all filters strictly
      return (
        filterArray(selectedAsset, tip.asset) &&
        filterArray(selectedSector, tip.sector) &&
        filterArray(selectedSentiment, tip.sentiment) &&
        filterArray(selectedStrategies, tip.strategy) &&
        filterArray(selectedRisk, tip.risk) &&
        filterRange(selectedExpectedReturn, tipReturn, MASTER_FILTERS.expectedReturn) &&
        filterArray(selectedMarketCap, tip.market_cap || tip.marketCap) &&
        filterRange(selectedDividendYield, tipDividend, MASTER_FILTERS.dividendYield) &&
        filterArray(selectedHolding, tip.holding) &&
        filterArray(selectedDuration, tip.duration) &&
        filterArray(selectedRegions, tip.region) &&
        filterArray(selectedValuationMetrics, tip.valuationMetric) &&
        filterArray(selectedGrowthMetrics, tip.growth_metric || tip.growthMetric) &&
        filterArray(selectedTechnicalIndicators, tip.technical_indicators || tip.technicalIndicator) &&
        filterArray(selectedEsgRatings, tip.esg_rating || tip.esgRating) &&
        filterArray(selectedAnalysisType, tip.analysis_type || tip.analysisType) &&
        filterArray(selectedVolatility, tip.volatility) &&
        filterArray(selectedLiquidity, tip.liquidity) &&
        filterArray(selectedConviction, tip.conviction) &&
        filterArray(selectedCatalyst, tip.catalyst) &&
        filterArray(selectedValuation, tip.valuation) &&
        filterArray(selectedTechnical, tip.technical) &&
        filterArray(selectedDiversification, tip.diversification) &&
        filterArray(selectedPerformance, tip.performance)
      );
    });

    // Search filter
    if (debouncedSearch.trim() !== '') {
      const q = debouncedSearch.trim().toLowerCase();
      tips = tips.filter(tip => {
        return [
          tip.tip,
          tip.advisor_name,
          tip.symbol,
          tip.asset,
          tip.sector,
          tip.sentiment,
          tip.strategy,
          tip.risk,
          tip.expected_return,
          tip.market_cap || tip.marketCap,
          tip.dividend_yield,
          tip.holding,
          tip.duration,
          tip.region,
          tip.valuationMetric,
          tip.sales_growth,
          tip.earnings_growth,
          tip.technicalIndicator,
          tip.esgRating,
          tip.analysisType,
          tip.volatility,
          tip.liquidity,
          tip.conviction,
          tip.catalyst,
          tip.valuation,
          tip.technical,
          tip.diversification,
          tip.performance
        ].some(field => field && String(field).toLowerCase().includes(q));
      });
    }
    return tips.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [tipsData, selectedAsset, selectedSector, selectedSentiment, selectedStrategies, selectedRisk, selectedExpectedReturn, selectedMarketCap, selectedDividendYield, selectedHolding, selectedDuration, selectedRegions, selectedValuationMetrics, selectedGrowthMetrics, selectedTechnicalIndicators, selectedEsgRatings, selectedAnalysisType, selectedVolatility, selectedLiquidity, selectedConviction, selectedCatalyst, selectedValuation, selectedTechnical, selectedDiversification, selectedPerformance, debouncedSearch, showOnlyFree, showOnlySebi]);

  // REMOVED: old visibleTips for pagination fix

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(25);
  }, [filteredTips.length]);

  // Filter handlers
  const toggleFilter = (filterArray, setFilter, value) => {
  // --- Filter Handlers ---
    if (filterArray.includes(value)) {
      setFilter(filterArray.filter(x => x !== value));
    } else {
      setFilter([...filterArray, value]);
    }
  };

  const removeFilter = (filterArray, setFilter, value) => {
    setFilter(filterArray.filter(x => x !== value));
  };


    const renderFilterCarousel = (data, selected, onSelect, renderItem) => (
  // --- Filter Carousel Component ---
    <div style={{marginLeft:-15}}  className="mt-4 mb-4">
      <div className="w-full flex flex-wrap gap-4 p-1">
        {data?.map((item, idx) => {
          const value = item.label || item.name;
          const isSelected = selected.includes(value);
          return (
            <>
            <Button
              key={value || idx}
              className="flex-shrink-0"
              onClick={() => onSelect(value)}
              variant={'ghost'}
              style={{marginRight:-30, marginBottom:10, marginTop:30}}
            >
              {renderItem(item, isSelected)}
            </Button>
            </>
          );
        })}
      </div>
    </div>
  );

  // Components

    // Profile edit modal state
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhoto, setEditPhoto] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    setEditName(userData.name || "");
    // If user is logged in and missing name or avatar, open profile edit popover
    if (userData.id && (!userData.name || !userData.avatar)) {
      setShowProfileEdit(true);
    }
  }, [userData.name, userData.avatar, userData.id]);

  const handleProfileUpdate = async () => {
    setEditLoading(true);
    let photoUrl = userData.avatar;
    if (editPhoto) {
      // Upload photo to Supabase storage
      const fileExt = editPhoto.name.split('.').pop();
      const fileName = `${userData.id}_${Date.now()}.${fileExt}`;
      const { data, error } = await supabase.storage.from('post-images').upload(fileName, editPhoto);
      if (!error && data) {
        const publicUrlObj = supabase.storage.from('post-images').getPublicUrl(data.path);
        photoUrl = publicUrlObj.data.publicUrl;
      } else {
        console.error('Error uploading photo:', error);
      }
    }
    const { data: updateData, error: updateError } = await supabase.from('users').update({ name: editName, profile_photo_url: photoUrl }).eq('id', userData.id);
    setUserData({ ...userData, name: editName, avatar: photoUrl });
    setEditLoading(false);
    setShowProfileEdit(false);
  };

  const ProfileEditPopover = () => {
    if (!showProfileEdit) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className={`rounded-lg p-6 w-[340px] shadow-lg ${isDarkTheme ? 'bg-zinc-900 text-white' : 'bg-white text-black'}` }>
          <div className={`font-bold text-lg mb-2 text-center ${isDarkTheme ? 'text-white' : 'text-black'}`}>Complete Your Profile</div>
          <div className="flex flex-col gap-3">
            <label className={`text-sm font-medium ${isDarkTheme ? 'text-white' : 'text-black'}`}>Name</label>
            <span className={`text-xs mb-1 ${isDarkTheme ? 'text-zinc-300' : 'text-gray-600'}`}>Your name will be displayed on your profile and helps personalize your experience. Please enter your full name so we can address you properly and show it to other users if needed.</span>
            <input
              type="text"
              value={editName}
              onChange={e => setEditName(e.target.value)}
              className={`border px-2 py-1 rounded ${isDarkTheme ? 'bg-zinc-800 text-white border-zinc-700' : 'bg-gray-100 text-black border-gray-300'}`}
              autoFocus
            />
            <label className={`text-sm font-medium mt-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Profile Photo</label>
            <span className={`text-xs mb-1 ${isDarkTheme ? 'text-zinc-300' : 'text-gray-600'}`}>Your profile photo helps others recognize you and adds a personal touch to your account. Please upload a clear image of yourself or an avatar you prefer. This is required for account security and community trust.</span>
            <input
              type="file"
              accept="image/*"
              onChange={e => setEditPhoto(e.target.files[0])}
              className={`border px-2 py-1 rounded ${isDarkTheme ? 'bg-zinc-800 text-white border-zinc-700' : 'bg-gray-100 text-black border-gray-300'}`}
            />
            {editPhoto && (
              <img src={URL.createObjectURL(editPhoto)} alt="Preview" className="w-16 h-16 rounded-full mt-2 mx-auto" />
            )}
            <div className={`text-xs mt-2 mb-2 ${isDarkTheme ? 'text-yellow-300' : 'text-yellow-700'}`}>Completing your profile is necessary to use all features and interact with the community. Your information is kept private and secure.</div>
            <div className="flex gap-2 mt-4 justify-center">
              <Button
                size="sm"
                className={`px-4 py-1 rounded font-semibold border transition-colors duration-150 ${isDarkTheme ? 'bg-black text-white border-zinc-700 hover:bg-zinc-900' : 'bg-white text-black border-gray-300 hover:bg-gray-100'}`}
                style={{ boxShadow: isDarkTheme ? '0 1px 4px #222' : '0 1px 4px #EEE' }}
                onClick={handleProfileUpdate}
                disabled={editLoading}
              >
                {editLoading ? 'Updating...' : 'Update'}
              </Button>
              <Button
                size="sm"
                className={`px-4 py-1 rounded ${isDarkTheme ? 'bg-zinc-700 text-white' : 'bg-gray-300 text-black'}`}
                onClick={() => setShowProfileEdit(false)}
                disabled={editLoading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const HeaderBar = () => (
  // --- Header Bar ---
    <div className="mt-[-5px] flex items-center justify-between p-4 border-b border-border">
      
      
      
      {/* Left: LollipopIcon SVG icon and app name */}
      {<div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/60 transition-colors cursor-pointer"
          onClick={() => setShowPlatformInfoSheet(true)}
        >
          <img src={ isDarkTheme ? LollipopSVGWhite :  LollipopSVG} alt="Lollipop" className="w-5 h-5" />
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1">
              <span style={{letterSpacing: '1.2px', fontSize:16}} className="font-bold text-lg tracking-tight">LOLLIPOP</span>
              <Info size={16} className="text-muted-foreground" />
            </div>
            <span className="text-xs text-muted-foreground -mt-1">Investment Tips Marketplace</span>
          </div>
        </Button>
      </div>}




      {/* Center: Desktop always shows search input, mobile shows icon toggle */}
        
        <div className="h-[3vh] relative flex items-center w-[80%] max-w-[20%] ml-20" data-walkthrough="search">
          {/* Desktop: always show search input */}
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground block">
            {search && debouncedSearch !== search ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Search size={16} />
            )}
          </span>
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search tips…"
            className="pl-9 pr-[search ? 9 : 8] w-full text-sm py-1 border-border rounded"
            autoFocus={search && true}
            style={{ height: '150%' }}
          />

          {search && (
            <Button
              className="absolute left-[85%] top-1/2 -translate-y-1/2 text-muted-foreground bg-transparent border-none cursor-pointer p-0 m-0"
              onClick={() => setSearch('')}
              tabIndex={-1}
              aria-label="Clear search"
            >
              <X size={16} />
            </Button>
          )}
          
        </div>
    



      {/* Right: User controls */}
      <div className="flex items-center gap-2">
        <div className="hidden">
            {searchOpen ? (
              <div className="relative flex items-start w-full">
                <Input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search tipsdfsdfs…"
                  className="pl-9 pr-8 w-full text-sm py-2 rounded border-border"
                  autoFocus
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Search size={18} />
                </span>
                {search && (
                  <Button
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground bg-transparent border-none cursor-pointer"
                    onClick={() => setSearch('')}
                    tabIndex={-1}
                  >
                    
                  </Button>
                )}
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { setSearchOpen(true); setSearch(''); }}
                data-walkthrough="search"
              >
                <Search size={17.5} />
              </Button>
            )}
          </div>
        {searchOpen ? null : (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={showOnlyFree ? "default" : "outline"}
                    size="sm"
                    className="flex items-center gap-1.5 px-3 rounded-full"
                    onClick={() => setShowOnlyFree(!showOnlyFree)}
                  >
                    <LockOpen size={16} />
                    <span className="text-xs">Only Free Tips</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-sm p-0 border-2 border-black dark:border-black shadow-lg bg-white dark:bg-background">
                  <div className="p-4 space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-950 flex items-center justify-center p-1.5">
                        <LockOpen size={14} className="text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-foreground">Free Investment Tips</div>
                        <div className="text-xs text-gray-600 dark:text-muted-foreground">
                          Access investment insights without spending credits
                        </div>
                      </div>
                    </div>


                     
                      
                      <div className="p-3 rounded-lg border bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 border-green-300 dark:border-green-700">
                        <div className="flex items-center justify-between font-medium">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <LockOpen size={14} className="text-green-600 dark:text-green-400" />
                              <span className="text-xs text-gray-700 dark:text-foreground">Free Access Mode</span>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-green-600 dark:text-green-400">No Cost</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-muted-foreground leading-relaxed mt-1">
                          {showOnlyFree ? 'Will be showing only free tips (24+ hours old)' : 'Filter to show only free tips to conserve your credits'}
                        </p>
                        <div className="mt-2 pt-2 border-t border-green-200 dark:border-green-600">
                          <p className="text-xs text-gray-500 dark:text-muted-foreground italic">
                            Click on the button to apply the filter
                          </p>
                        </div>
                      </div>

{/* Separator */}
                                            <div className="border-t border-gray-200 dark:border-border/50"></div>


                    {/* Free Tips Information Section */}
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground">How Accessing Tips Work</h4>
                        <p className="text-xs text-gray-600 dark:text-muted-foreground mt-1 leading-relaxed">
                          Premium tips become free after 24 hours, allowing broader access to investment insights
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="p-2.5 rounded-lg border bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <div className="flex items-center gap-2">
                              <Clock size={12} className="text-green-600 dark:text-green-400" />
                              <span className="text-gray-700 dark:text-foreground font-medium">24-Hour Free Release</span>
                            </div>
                            <span className="text-xs text-green-600 dark:text-green-400 font-bold">✓ FREE</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-muted-foreground leading-relaxed">
                            Premium tips automatically become free after 24 hours - no credits required
                          </p>
                        </div>
                        
                        <div className="p-2.5 rounded-lg border bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <div className="flex items-center gap-2">
                              <img src={isDarkTheme ? LollipopSVGWhite : LollipopSVG} alt="Lollipop" className="w-3 h-3" />
                              <span className="text-gray-700 dark:text-foreground font-medium">Premium Tips (Instant Access)</span>
                            </div>
                            <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">LOLLIPOPS</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-muted-foreground leading-relaxed">
                            Use lollipop credits to unlock premium tips immediately for real-time trading
                          </p>
                        </div>
                      </div>
                      
                     
                    </div>
                    
                    <div className=" border-gray-200 dark:border-border/50">
                      <p className="text-xs text-gray-500 dark:text-muted-foreground text-center">
                        Great for learning and budget-conscious investors
                      </p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={showOnlySebi ? "default" : "outline"}
                    size="sm"
                    className="flex items-center gap-1.5 px-3 rounded-full"
                    onClick={() => setShowOnlySebi(!showOnlySebi)}
                  >
                    <Shield size={16} />
                    <span className="text-xs">Only SEBI RIAs</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-sm p-0 border-2 border-black dark:border-black shadow-lg bg-white dark:bg-background">
                  <div className="p-4 space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center p-1.5">
                        <Shield size={14} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-foreground">SEBI Registered Investment Advisors</div>
                        <div className="text-xs text-gray-600 dark:text-muted-foreground">
                          Filter by regulatory compliance and trust
                        </div>
                      </div>
                    </div>


                      <div className="p-3 rounded-lg border bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 border-green-300 dark:border-green-700">
                        <div className="flex items-center justify-between font-medium">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <Shield size={14} className="text-green-600 dark:text-green-400" />
                              <span className="text-xs text-gray-700 dark:text-foreground">SEBI RIA Filter</span>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-green-600 dark:text-green-400">Highest Trust</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-muted-foreground leading-relaxed mt-1">
                          {showOnlySebi ? 'Currently showing only SEBI RIAs - highest regulatory compliance' : 'Filter to show only SEBI registered advisors for maximum trust and legal protection'}
                        </p>
                        <div className="mt-2 pt-2 border-t border-green-200 dark:border-green-600">
                          <p className="text-xs text-gray-500 dark:text-muted-foreground italic">
                            Click on the button to apply the filter
                          </p>
                        </div>
                      </div>
                      
                      {/* Separator */}
                      <div className="border-t border-gray-200 dark:border-border/50"></div>
                      

                    {/* SEBI Information Section */}
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground">Types of Advisors on Platform</h4>
                        <p className="text-xs text-gray-600 dark:text-muted-foreground mt-1 leading-relaxed">
                          We have different categories of investment professionals with varying credentials
                        </p>
                      </div>
                    



                        
                      <div className="space-y-2">
                        <div className="p-2.5 rounded-lg border bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <div className="flex items-center gap-2">
                              <Shield size={12} className="text-green-600 dark:text-green-400" />
                              <span className="text-gray-700 dark:text-foreground font-medium">SEBI Registered Investment Advisors (RIAs)</span>
                            </div>
                            <span className="text-xs text-green-600 dark:text-green-400 font-bold">✓ LICENSED</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-muted-foreground leading-relaxed">
                            Licensed professionals with fiduciary duty, regulatory oversight, and professional indemnity insurance
                          </p>
                        </div>
                        
                        <div className="p-2.5 rounded-lg border bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <div className="flex items-center gap-2">
                              <BookOpen size={12} className="text-blue-600 dark:text-blue-400" />
                              <span className="text-gray-700 dark:text-foreground font-medium">Independent Researchers & Analysts</span>
                            </div>
                            <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">EDUCATIONAL</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-muted-foreground leading-relaxed">
                            Market researchers and analysts sharing educational insights for learning purposes
                          </p>
                        </div>
                      </div>
                      
                    </div>
                    
                    <div className="border-gray-200 dark:border-border/50">
                      <p className="text-xs text-gray-500 dark:text-muted-foreground text-center">
                        SEBI RIAs offer highest trust with regulatory oversight and legal protection
                      </p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center border border-border rounded-full w-[30px] h-[30px] justify-center"
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              data-walkthrough="theme-toggle"
            >
              {isDarkTheme ? <Sun size={17.5} /> : <Moon size={17.5} />}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center border border-border rounded-full w-[30px] h-[30px] justify-center"
              onClick={() => setShowMobileAlertSheet(true)}
            >
              <Bell size={17.5} />
            </Button>
            <div data-walkthrough="credits-display" className="relative">
              {userData && userData.id ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center border border-border rounded-full w-[30px] h-[30px] justify-center p-0"
                  onClick={() => setShowMobileUserSheet(true)}
                >
                  {userData.avatar ? (
                    <img 
                      src={userData.avatar} 
                      alt={userData.name} 
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <User size={17.5} />
                  )}
                </Button>
              ) : (
                <Button
                  className="flex items-center border border-border rounded-full w-[30px] h-[30px] justify-center"
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = '/login'}
                >
                  <User size={17.5} />
                </Button>
              )}
            </div>
          </>
        )}
      </div>


      
    </div>
  );

  // When a tip is clicked, open drawer and set selectedTip
  const handleTipClick = (tip) => {
    // Open tip details in a new tab with a unique URL (e.g., /tip/{tip.id})
    if (tip && tip.id) {
      window.open(`/tip/${encodeURIComponent(tip.id)}`, '_blank', 'noopener,noreferrer');
    }
    // Optionally, you can still setSelectedTip(tip) if you want to keep the current tab behavior
    // setSelectedTip(tip);
  };

  // Function to view all tips for a specific advisor
  const handleViewAllTips = (advisorName) => {
    // Clear all filters first
    setSelectedAsset([]);
    setSelectedSector([]);
    setSelectedSentiment([]);
    setSelectedStrategies([]);
    setSelectedRisk([]);
    setSelectedExpectedReturn([]);
    setSelectedMarketCap([]);
    setSelectedDividendYield([]);
    setSelectedHolding([]);
    setSelectedDuration([]);
    setSelectedRegions([]);
    setSelectedValuationMetrics([]);
    setSelectedGrowthMetrics([]);
    setSelectedTechnicalIndicators([]);
    setSelectedEsgRatings([]);
    setSelectedAnalysisType([]);
    setSelectedVolatility([]);
    setSelectedLiquidity([]);
    setSelectedConviction([]);
    setSelectedCatalyst([]);
    setSelectedValuation([]);
    setSelectedTechnical([]);
    setSelectedDiversification([]);
    setSelectedPerformance([]);
    setShowOnlyFree(false);
    setShowOnlySebi(false);
    
    // Set search to advisor name
    setSearch(advisorName);
    
    // Close any open sheets
    setShowAdvisorSheet(false);
    setShowPaywallSheet(false);
    
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Show a toast notification
    toast(`Showing all tips from ${advisorName}`, {
      duration: 3000,
      description: `Found tips from this advisor. Use the search bar to explore other advisors.`,
    });
  };

  const filterCategories = [
    { key: 'assets', title: 'Assets', icon: ChartPie, selected: selectedAsset, setSelected: setSelectedAsset },
    { key: 'sectors', title: 'Sector', icon: Laptop, selected: selectedSector, setSelected: setSelectedSector },
    { key: 'sentiments', title: 'Sentiment', icon: TrendingUp, selected: selectedSentiment, setSelected: setSelectedSentiment },
    { key: 'strategies', title: 'Strategies', icon: Gauge, selected: selectedStrategies, setSelected: setSelectedStrategies },
    { key: 'risk', title: 'Risk', icon: AlertTriangle, selected: selectedRisk, setSelected: setSelectedRisk },
    { key: 'expectedReturn', title: 'Returns', icon: TrendingUp, selected: selectedExpectedReturn, setSelected: setSelectedExpectedReturn },
    { key: 'marketCap', title: 'Market Cap', icon: Building, selected: selectedMarketCap, setSelected: setSelectedMarketCap },
    { key: 'holding', title: 'Holding', icon: Calendar, selected: selectedHolding, setSelected: setSelectedHolding },
    { key: 'duration', title: 'Duration', icon: Clock, selected: selectedDuration, setSelected: setSelectedDuration },
    { key: 'dividendYield', title: 'Dividend Yield', icon: Banknote, selected: selectedDividendYield, setSelected: setSelectedDividendYield },
    { key: 'regions', title: 'Regions', icon: Globe, selected: selectedRegions, setSelected: setSelectedRegions },
    { key: 'valuationMetrics', title: 'Valuation Metrics', icon: Calculator, selected: selectedValuationMetrics, setSelected: setSelectedValuationMetrics },
    { key: 'growthMetrics', title: 'Growth', icon: Leaf, selected: selectedGrowthMetrics, setSelected: setSelectedGrowthMetrics },
    { key: 'technicalIndicators', title: 'Technical Indicators', icon: BarChart3, selected: selectedTechnicalIndicators, setSelected: setSelectedTechnicalIndicators },
    { key: 'esgRatings', title: 'ESG', icon: Leaf, selected: selectedEsgRatings, setSelected: setSelectedEsgRatings },
    { key: 'analysisType', title: 'Analysis', icon: FileText, selected: selectedAnalysisType, setSelected: setSelectedAnalysisType },
    { key: 'volatility', title: 'Volatility', icon: Activity, selected: selectedVolatility, setSelected: setSelectedVolatility },
    { key: 'liquidity', title: 'Liquidity', icon: Droplets, selected: selectedLiquidity, setSelected: setSelectedLiquidity },
    { key: 'conviction', title: 'Conviction', icon: Shield, selected: selectedConviction, setSelected: setSelectedConviction },
    { key: 'catalyst', title: 'Catalyst', icon: Zap, selected: selectedCatalyst, setSelected: setSelectedCatalyst },
    { key: 'valuation', title: 'Valuations', icon: Target, selected: selectedValuation, setSelected: setSelectedValuation },
    { key: 'technical', title: 'Technicals', icon: LineChart, selected: selectedTechnical, setSelected: setSelectedTechnical },
    { key: 'diversification', title: 'Diversification', icon: Shuffle, selected: selectedDiversification, setSelected: setSelectedDiversification },
    { key: 'performance', title: 'Performance', icon: Trophy, selected: selectedPerformance, setSelected: setSelectedPerformance },
  ];

  // Split filter categories into main (first 9) and additional (rest)
  const mainFilterCategories = filterCategories.slice(0, 9);
  const additionalFilterCategories = filterCategories.slice(9);

  // Responsive pagination and load more logic
  const [displayedTips, setDisplayedTips] = React.useState([]);
  const [isMobile, setIsMobile] = React.useState(false);
  
  useEffect(() => {
    function updateLayout() {
      const w = window.innerWidth;
      const isMobileView = w < 1024; // lg breakpoint
      setIsMobile(isMobileView);
    }
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // Update displayed tips when filteredTips changes (start with 20 tips)
  useEffect(() => {
    setDisplayedTips(filteredTips.slice(0, 20));
  }, [filteredTips]);

  // Infinite scroll handler for both mobile and desktop
  useEffect(() => {
    const handleScroll = () => {
      if (loadingMore) return;
      
      const container = tableContainerRef.current;
      if (!container) return;
      
      const { scrollTop, scrollHeight, clientHeight } = container;
      const nearBottom = scrollTop + clientHeight >= scrollHeight - 100; // 100px threshold
      
      if (nearBottom && displayedTips.length < filteredTips.length) {
        setLoadingMore(true);
        
        // Show toast for desktop
        if (!isMobile) {
          toast("Loading more tips...", {
            duration: 1000,
            position: "bottom-right",
            icon: <Loader2 size={16} className="animate-spin" />,
          });
        }
        
        // Simulate loading delay for smooth UX
        setTimeout(() => {
          const nextBatch = Math.min(displayedTips.length + 15, filteredTips.length);
          setDisplayedTips(filteredTips.slice(0, nextBatch));
          setLoadingMore(false);
        }, 500);
      }
    };

    const container = tableContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile, loadingMore, displayedTips.length, filteredTips.length, filteredTips]);

  return (
    <div className={isDarkTheme ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground overflow-x-hidden font-[UberMove,UberMoveText]">
      {/* Additional content can go here */}
        {/* Header: show on desktop, else show grey background bar */}
        <div>
          <div className="hidden lg:block">
            <HeaderBar />
          </div>


          {/* Mobile Header Bar - Brand on first line, search/filter on next line */}
          <div className="lg:hidden sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
            {/* First line: Brand and right-side icons */}
            <div className="flex items-center justify-between pr-4 py-2">
              <Button
                variant="ghost"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/60 transition-colors cursor-pointer flex-shrink-0"
                onClick={() => setShowPlatformInfoSheet(true)}
              >
                <img src={isDarkTheme ? LollipopSVGWhite : LollipopSVG} alt="Lollipop" className="w-6 h-6" />
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1">
                    <span style={{letterSpacing: '1px', fontSize: 16}} className="font-bold tracking-tight">LOLLIPOP</span>
                    <Info size={14} className="text-muted-foreground mb-1" />
                  </div>
                  <span className="text-xs text-muted-foreground -mt-1">Investment Tips Marketplace</span>
                </div>
              </Button>
              <div className="flex items-center gap-1">
                {/* Theme Toggle Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2.5 h-10 w-10 rounded-full hover:bg-muted/80 transition-colors"
                  onClick={() => setIsDarkTheme(!isDarkTheme)}
                  aria-label="Toggle theme"
                >
                  {isDarkTheme ? <Sun size={18} /> : <Moon size={18} />}
                </Button>
                {/* Bell/Notifications Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2.5 h-10 w-10 rounded-full hover:bg-muted/80 transition-colors"
                  onClick={() => setShowMobileAlertSheet(true)}
                  aria-label="Notifications"
                >
                  <Bell size={18} />
                </Button>
                {/* User Profile Button */}
                <Button data-walkthrough="credits-display"
                  variant="ghost"
                  size="sm"
                  className="p-2.5 h-10 w-10 rounded-full hover:bg-muted/80 transition-colors"
                  onClick={() => {
                    if (!userData || !userData.id) {
                      window.location.href = '/login';
                    } else {
                      setShowMobileUserSheet(true);
                    }
                  }}
                  aria-label="Profile"
                >
                  {userData?.avatar ? (
                    <img 
                      src={userData.avatar} 
                      alt={userData.name} 
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <User size={18} />
                  )}
                </Button>
              </div>
            </div>
            {/* Second line: Search Bar and Filter Icon */}
            <div className="flex items-center gap-2 px-2 pb-3 pt-0">
              <div className="flex-1 flex items-center">
                <div className="relative w-full">
                  <Input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search tips, symbols, advisors, etc ..."
                    className="pl-10 pr-10 pt-5 pb-5 w-full text-sm border-border rounded-md bg-background shadow-sm"
                    autoFocus={searchOpen}
                    data-walkthrough="search"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer hover:text-primary transition-colors" onClick={() => openInfoSheet('search')}>
                    {search && debouncedSearch !== search ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Search size={16} />
                    )}
                  </span>
                  {search && (
                    <Button
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground bg-transparent hover:bg-muted/50 rounded-full p-1 h-7 w-7"
                      onClick={() => setSearch('')}
                      tabIndex={-1}
                      aria-label="Clear search"
                    >
                      <X size={14} />
                    </Button>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="p-2.5 h-10 w-10 rounded-full hover:bg-muted/80 transition-colors relative flex-shrink-0"
                onClick={() => setFilterSheetOpen(true)}
                aria-label="Filters"
                data-walkthrough="filters"
              >
                <Settings2 size={40} className='w-20 h-30' style={{width: '22.5px', height: '22.5px'}}/>
                {/* Active filters indicator */}
                {(selectedAsset.length > 0 || selectedSector.length > 0 || selectedSentiment.length > 0 || 
                  selectedStrategies.length > 0 || selectedRisk.length > 0 || selectedExpectedReturn.length > 0 || 
                  selectedMarketCap.length > 0 || selectedDividendYield.length > 0 || selectedHolding.length > 0 || selectedDuration.length > 0 || 
                  selectedRegions.length > 0 || selectedValuationMetrics.length > 0 || selectedGrowthMetrics.length > 0 || 
                  selectedTechnicalIndicators.length > 0 || selectedEsgRatings.length > 0 || selectedAnalysisType.length > 0 || 
                  selectedVolatility.length > 0 || selectedLiquidity.length > 0 || selectedConviction.length > 0 || 
                  selectedCatalyst.length > 0 || selectedValuation.length > 0 || selectedTechnical.length > 0 || 
                  selectedDiversification.length > 0 || selectedPerformance.length > 0) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background"></div>
                )}
              </Button>
            </div>

            {/* Mobile Filter Sheet */}
            <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
              <SheetContent side="right" className="max-h-[100vh] w-full lg:w-[35vw] overflow-hidden flex flex-col">
                {/* Header */}
                <SheetHeader className="pb-4 border-b border-border">
                  <SheetTitle className="flex items-center gap-2">
                    <Settings2 size={20} />
                    Filters & Categories
                  </SheetTitle>
                  <SheetDescription className="text-left">
                    Customize your investment tips feed with precise filtering options
                  </SheetDescription>
                </SheetHeader>
                
                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 space-y-4">
                    {/* Main Filter Categories */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Primary Filters
                      </h3>
                      
                      <div className="space-y-3">
                        {mainFilterCategories.map(cat => (
                          <div key={cat.key} className="p-3 rounded-lg border border-border bg-muted/30">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <cat.icon size={16} className="text-primary" />
                                <span className="font-medium text-sm">{cat.title}</span>
                              </div>
                              {cat.selected.length > 0 && (
                                <Badge variant="default" className="text-xs">
                                  {cat.selected.length} selected
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {(MASTER_FILTERS[cat.key] || []).map(item => {
                                const value = item.label || item.name;
                                const ItemIcon = item.Icon || item.icon;
                                const isSelected = cat.selected.includes(value);
                                return (
                                  <Button
                                    key={value}
                                    variant={isSelected ? 'default' : 'outline'}
                                    size="sm"
                                    className="flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                                    onClick={() => toggleFilter(cat.selected, cat.setSelected, value)}
                                  >
                                    {ItemIcon && <ItemIcon className="h-3 w-3" />}
                                    <span>{addSpacing(value)}</span>
                                  </Button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Advanced Filter Categories */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Advanced Filters
                      </h3>
                      
                      <div className="space-y-3">
                        {additionalFilterCategories.map(cat => (
                          <div key={cat.key} className="p-3 rounded-lg border border-border bg-muted/30">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <cat.icon size={16} className="text-secondary-foreground" />
                                <span className="font-medium text-sm">{cat.title}</span>
                              </div>
                              {cat.selected.length > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                  {cat.selected.length} selected
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {(MASTER_FILTERS[cat.key] || []).map(item => {
                                const value = item.label || item.name;
                                const ItemIcon = item.Icon || item.icon;
                                const isSelected = cat.selected.includes(value);
                                return (
                                  <Button
                                    key={value}
                                    variant={isSelected ? 'default' : 'outline'}
                                    size="sm"
                                    className="flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                                    onClick={() => toggleFilter(cat.selected, cat.setSelected, value)}
                                  >
                                    {ItemIcon && <ItemIcon className="h-3 w-3" />}
                                    <span>{addSpacing(value)}</span>
                                  </Button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Active Filters Summary */}
                    {(mainFilterCategories.some(cat => cat.selected.length > 0) || additionalFilterCategories.some(cat => cat.selected.length > 0)) && (
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                          Active Filters
                        </h3>
                        
                        <div className="p-4 rounded-lg border border-dashed border-border bg-muted/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Target size={16} className="text-primary" />
                            <span className="font-medium text-sm">
                              {[...mainFilterCategories, ...additionalFilterCategories].reduce((sum, cat) => sum + cat.selected.length, 0)} filters applied
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">
                            Your feed is customized based on the selected criteria above.
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => {
                              // Clear all filters
                              [...mainFilterCategories, ...additionalFilterCategories].forEach(cat => {
                                cat.setSelected([]);
                              });
                              toast("All filters cleared", {
                                duration: 2000,
                                position: "top-center",
                              });
                            }}
                          >
                            <X size={14} className="mr-2" />
                            Clear All Filters
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Filter Actions */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Quick Actions
                      </h3>
                      
                      <Button
                        variant="outline"
                        className="w-full justify-start p-3 h-auto rounded-xl border border-border hover:bg-muted/50"
                        onClick={() => {
                          setShowOnlyFree(!showOnlyFree);
                          setFilterSheetOpen(false);
                        }}
                      >
                        <LockOpen size={16} className="mr-3" />
                        <div className="text-left">
                          <div className="font-medium text-sm">
                            {showOnlyFree ? 'Show All Tips' : 'Only Free Tips'}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {showOnlyFree ? 'Include premium tips in results' : 'Show tips older than 24 hours only'}
                          </div>
                        </div>
                        <ArrowUpRight size={14} className="ml-auto text-muted-foreground" />
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full justify-start p-3 h-auto rounded-xl border border-border hover:bg-muted/50"
                        onClick={() => {
                          setShowOnlySebi(!showOnlySebi);
                          setFilterSheetOpen(false);
                        }}
                      >
                        <Shield size={16} className="mr-3" />
                        <div className="text-left">
                          <div className="font-medium text-sm">
                            {showOnlySebi ? 'Show All Advisors' : 'Only SEBI RIAs'}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {showOnlySebi ? 'Include all advisor types in results' : 'Show tips from SEBI registered advisors only'}
                          </div>
                        </div>
                        <ArrowUpRight size={14} className="ml-auto text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Footer */}
                <div className="p-4 border-t border-border bg-muted/20">
                  <div className="text-xs text-center text-muted-foreground">
                    Personalize your investment journey with smart filtering
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Mobile Search Input (expandable) */}
            {searchOpen && (
              <div className="px-4 pb-4 border-b border-border bg-muted/20" data-walkthrough="search">
                <div className="relative">
                  <Input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search tips, symbols, advisors..."
                    className="pl-10 pr-10 w-full text-sm border-border rounded-xl bg-background shadow-sm"
                    autoFocus
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {search && debouncedSearch !== search ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Search size={16} />
                    )}
                  </span>
                  {search && (
                    <Button
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground bg-transparent hover:bg-muted/50 rounded-full p-1 h-7 w-7"
                      onClick={() => setSearch('')}
                      tabIndex={-1}
                      aria-label="Clear search"
                    >
                      <X size={14} />
                    </Button>
                  )}
                </div>
                {search && debouncedSearch && (
                  <div className="mt-2 text-xs text-muted-foreground text-center">
                    {filteredTips.length} {filteredTips.length === 1 ? 'result' : 'results'} found for "{search}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>



        <style>{`
          /* Custom thin scrollbar for all columns */
          .patla-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #cbd5e1 #f3f4f6;
          }
          .patla-scrollbar::-webkit-scrollbar {
            width: 6px;
            background: #f3f4f6;
          }
          .patla-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }
        `}</style>

        

        <div className="hidden lg:flex items-center p-4 justify-center gap-4 sticky top-0 bg-background z-20"> 
          {/* Search icon and expandable input */}
          {/* {!searchOpen ? (
            <Button
              className="bg-transparent border-none cursor-pointer p-1.5 mr-2 flex items-center"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
            >
              <Search size={17.5} />
            </Button>
          ) : (
            <div className="relative flex items-center min-w-[220px] max-w-[320px] w-[260px] mr-2">
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search tips…"
                className="pl-9 pr-9 w-full text-sm border-border rounded"
                autoFocus
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground block">
                {search && debouncedSearch !== search ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Search size={18} />
                )}
              </span>
              {search && (
                <Button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground bg-transparent border-none cursor-pointer p-0 m-0"
                  onClick={() => setSearch('')}
                  tabIndex={-1}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </Button>
              )}
              <Button
                className="absolute right-[search ? 8 : 2] top-1/2 -translate-y-1/2 text-muted-foreground bg-transparent border-none cursor-pointer p-0 m-0"
                onClick={() => setSearchOpen(false)}
                tabIndex={-1}
                aria-label="Close search"
              >
                <X size={16} />
              </Button>
            </div>
          )} */}
          <Menubar data-walkthrough={"filters-desktop"} style={{height:"6vh", justifyContent:"center"}} className="w-fit mx-auto bg-background border-border">
            {/* Main filter categories (first 8) */}
            {mainFilterCategories.map((cat) => (
              <MenubarMenu key={cat.key}>
                <MenubarTrigger style={{padding:10, marginRight:-2.5}} className="focus:bg-muted hover:bg-muted data-[state=open]:bg-muted">
                  <cat.icon className="mr-2 h-4 w-4" />
                  {cat.title}
                </MenubarTrigger>
                <MenubarContent className="bg-background border-border max-h-[50vh] overflow-hidden relative">
                  <div className="max-h-[50vh] overflow-y-auto">
                    {(MASTER_FILTERS[cat.key] || []).map((item) => {
                      const value = item.label || item.name;
                      const ItemIcon = item.Icon || item.icon;
                      return (
                        <MenubarCheckboxItem
                          key={value}
                          checked={cat.selected.includes(value)}
                          onCheckedChange={() => toggleFilter(cat.selected, cat.setSelected, value)}
                          className="focus:bg-muted hover:bg-muted data-[state=checked]:bg-muted flex-col items-start py-1.5 px-2 h-auto relative"
                        >
                          <div className="flex items-center w-full justify-between">
                            <div className="flex items-center">
                              {ItemIcon && <ItemIcon className="mr-1.5 h-3.5 w-3.5" />}
                              <span className="font-medium text-sm">{addSpacing(value)}</span>
                            </div>
                            {cat.selected.includes(value) && (
                              <div className="w-4 h-4 rounded-sm bg-primary flex items-center justify-center ml-2">
                                <svg className="w-2.5 h-2.5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                          {item.desc && (
                            <div className="text-xs text-muted-foreground mt-0.5 ml-5 leading-tight">
                              {item.desc}
                            </div>
                          )}
                        </MenubarCheckboxItem>
                      );
                    })}
                  </div>
                  {/* Scroll indicator - only show if content is scrollable */}
                  {MASTER_FILTERS[cat.key].length > 6 && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none flex items-end justify-center pb-1">
                      <ChevronDown className="h-4 w-4 text-muted-foreground animate-bounce" />
                    </div>
                  )}
                </MenubarContent>
              </MenubarMenu>
            ))}

            {/* "More" submenu for additional filters */}
            <MenubarMenu>
              <MenubarTrigger style={{padding:10, marginRight:-2.5}} className="focus:bg-muted hover:bg-muted data-[state=open]:bg-muted">
                <MoreHorizontal className="mr-2 h-4 w-4" />
                More
                {additionalFilterCategories.some(cat => cat.selected && cat.selected.length > 0) && (
                  <span className="ml-1 text-xs text-pink-500">•</span>
                )}
              </MenubarTrigger>
              <MenubarContent className="bg-background border-border w-56">
                {additionalFilterCategories.map((cat) => (
                  <MenubarSub key={cat.key}>
                    <MenubarSubTrigger className={`${
                      cat.selected && cat.selected.length > 0 
                        ? 'text-pink-500 font-medium' 
                        : 'text-gray-700'
                    }`}>
                      <cat.icon className="mr-2 h-4 w-4" />
                      {cat.title}
                      {cat.selected && cat.selected.length > 0 && (
                        <span className="ml-1 text-xs">({cat.selected.length})</span>
                      )}
                    </MenubarSubTrigger>
                    <MenubarSubContent className="bg-background border-border max-h-[50vh] overflow-hidden relative">
                      <div className="max-h-[50vh] overflow-y-auto">
                        {(MASTER_FILTERS[cat.key] || []).map((item) => {
                          const value = item.label || item.name;
                          const ItemIcon = item.Icon || item.icon;
                          return (
                            <MenubarCheckboxItem
                              key={value}
                              checked={cat.selected.includes(value)}
                              onCheckedChange={() => toggleFilter(cat.selected, cat.setSelected, value)}
                              className="focus:bg-muted hover:bg-muted data-[state=checked]:bg-muted flex-col items-start py-1.5 px-2 h-auto relative"
                            >
                              <div className="flex items-center w-full justify-between">
                                <div className="flex items-center">
                                  {ItemIcon && <ItemIcon className="mr-1.5 h-3.5 w-3.5" />}
                                  <span className="font-medium text-sm">{addSpacing(value)}</span>
                                </div>
                                {cat.selected.includes(value) && (
                                  <div className="w-4 h-4 rounded-sm bg-primary flex items-center justify-center ml-2">
                                    <svg className="w-2.5 h-2.5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              {item.desc && (
                                <div className="text-xs text-muted-foreground mt-0.5 ml-5 leading-tight">
                                  {item.desc}
                                </div>
                              )}
                            </MenubarCheckboxItem>
                          );
                        })}
                      </div>
                      {/* Scroll indicator - only show if content is scrollable */}
                      {MASTER_FILTERS[cat.key].length > 6 && (
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none flex items-end justify-center pb-1">
                          <ChevronDown className="h-4 w-4 text-muted-foreground animate-bounce" />
                        </div>
                      )}
                    </MenubarSubContent>
                  </MenubarSub>
                ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

        </div>

        {/* Table view for tips (from profile screen) */}
        <div className="w-full lg:m-2.5 lg:mt-0 flex flex-col">
          
          
          {/* Active Filters Display */}
          {(selectedAsset.length > 0 || selectedSector.length > 0 || selectedSentiment.length > 0 || 
            selectedStrategies.length > 0 || selectedRisk.length > 0 || selectedExpectedReturn.length > 0 || 
            selectedMarketCap.length > 0 || selectedDividendYield.length > 0 || selectedHolding.length > 0 || selectedDuration.length > 0 || 
            selectedRegions.length > 0 || selectedValuationMetrics.length > 0 || selectedGrowthMetrics.length > 0 || 
            selectedTechnicalIndicators.length > 0 || selectedEsgRatings.length > 0 || selectedAnalysisType.length > 0 || 
            selectedVolatility.length > 0 || selectedLiquidity.length > 0 || selectedConviction.length > 0 || 
            selectedCatalyst.length > 0 || selectedValuation.length > 0 || selectedTechnical.length > 0 || 
            selectedDiversification.length > 0 || selectedPerformance.length > 0 || (search && search.trim() !== '')) && (
            <div 
              className={`${isMobile ? 'mx-4 mb-4' : 'mx-0 mb-4 mr-5'} p-4 border border-border rounded-xl sticky lg:top-[72px] top-0 z-[19] bg-background/95 backdrop-blur-sm shadow-sm`}
              data-walkthrough="filters-desktop"
            >
              <div className="flex flex-wrap gap-2">
                {/* Show search query as a filter tag if present */}
                {search && search.trim() !== '' && (
                  <Badge 
                    variant="secondary" 
                    className={`cursor-pointer ${isMobile ? 'h-8 text-xs' : 'h-8'} rounded-full px-3`}
                    onClick={() => openInfoSheet('search')}
                  >
                    <Search size={12} className="mr-1" />
                    {search}
                    <Button 
                      className="ml-2 p-0 h-4 w-4 rounded-full hover:bg-destructive/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearch('');
                      }}
                      size="sm"
                      variant="ghost"
                    >
                      <X size={10} />
                    </Button>
                  </Badge>
                )}
                
                {/* Asset Filters */}
                {selectedAsset.map(filter => (
                  <Badge key={filter} variant="outline" className={`cursor-pointer ${isMobile ? 'h-8 text-xs' : 'h-8'} rounded-full px-3 border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100`}>
                    <ChartPie size={12} className="mr-1" />
                    {filter}
                    <Button 
                      className="ml-2 p-0 h-4 w-4 rounded-full hover:bg-destructive/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFilter(selectedAsset, setSelectedAsset, filter);
                      }}
                      size="sm"
                      variant="ghost"
                    >
                      <X size={10} />
                    </Button>
                  </Badge>
                ))}
                
                {/* Sector Filters */}
                {selectedSector.map(filter => (
                  <Badge key={filter} variant="outline" className={`cursor-pointer ${isMobile ? 'h-8 text-xs' : 'h-8'} rounded-full px-3 border-green-200 text-green-700 bg-green-50 hover:bg-green-100`}>
                    <Laptop size={12} className="mr-1" />
                    {filter}
                    <Button 
                      className="ml-2 p-0 h-4 w-4 rounded-full hover:bg-destructive/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFilter(selectedSector, setSelectedSector, filter);
                      }}
                      size="sm"
                      variant="ghost"
                    >
                      <X size={10} />
                    </Button>
                  </Badge>
                ))}
                
                {/* Sentiment Filters */}
                {selectedSentiment.map(filter => (
                  <Badge key={filter} variant="outline" className={`cursor-pointer ${isMobile ? 'h-8 text-xs' : 'h-8'} rounded-full px-3 border-purple-200 text-purple-700 bg-purple-50 hover:bg-purple-100`}>
                    <TrendingUp size={12} className="mr-1" />
                    {filter}
                    <Button 
                      className="ml-2 p-0 h-4 w-4 rounded-full hover:bg-destructive/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFilter(selectedSentiment, setSelectedSentiment, filter);
                      }}
                      size="sm"
                      variant="ghost"
                    >
                      <X size={10} />
                    </Button>
                  </Badge>
                ))}
                
                {/* All Other Filters - comprehensive with consistent styling */}
                {[
                  { filters: selectedStrategies, setter: setSelectedStrategies, label: 'Strategy', icon: Gauge, colorClass: 'border-orange-200 text-orange-700 bg-orange-50 hover:bg-orange-100' },
                  { filters: selectedRisk, setter: setSelectedRisk, label: 'Risk', icon: AlertTriangle, colorClass: 'border-red-200 text-red-700 bg-red-50 hover:bg-red-100' },
                  { filters: selectedExpectedReturn, setter: setSelectedExpectedReturn, label: 'Return', icon: TrendingUp, colorClass: 'border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100' },
                  { filters: selectedMarketCap, setter: setSelectedMarketCap, label: 'Market Cap', icon: Building, colorClass: 'border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100' },
                  { filters: selectedDividendYield, setter: setSelectedDividendYield, label: 'Dividend', icon: Banknote, colorClass: 'border-green-200 text-green-700 bg-green-50 hover:bg-green-100' },
                  { filters: selectedHolding, setter: setSelectedHolding, label: 'Holding', icon: Calendar, colorClass: 'border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100' },
                  { filters: selectedDuration, setter: setSelectedDuration, label: 'Duration', icon: Clock, colorClass: 'border-pink-200 text-pink-700 bg-pink-50 hover:bg-pink-100' },
                  { filters: selectedRegions, setter: setSelectedRegions, label: 'Region', icon: Globe, colorClass: 'border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100' },
                  { filters: selectedValuationMetrics, setter: setSelectedValuationMetrics, label: 'Valuation', icon: Calculator, colorClass: 'border-violet-200 text-violet-700 bg-violet-50 hover:bg-violet-100' },
                  { filters: selectedGrowthMetrics, setter: setSelectedGrowthMetrics, label: 'Growth', icon: ArrowUpRight, colorClass: 'border-teal-200 text-teal-700 bg-teal-50 hover:bg-teal-100' },
                  { filters: selectedTechnicalIndicators, setter: setSelectedTechnicalIndicators, label: 'Technical', icon: BarChart3, colorClass: 'border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100' },
                  { filters: selectedEsgRatings, setter: setSelectedEsgRatings, label: 'ESG', icon: Leaf, colorClass: 'border-lime-200 text-lime-700 bg-lime-50 hover:bg-lime-100' },
                  { filters: selectedAnalysisType, setter: setSelectedAnalysisType, label: 'Analysis', icon: FileText, colorClass: 'border-gray-200 text-gray-700 bg-gray-50 hover:bg-gray-100' },
                  { filters: selectedVolatility, setter: setSelectedVolatility, label: 'Volatility', icon: Activity, colorClass: 'border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100' },
                  { filters: selectedLiquidity, setter: setSelectedLiquidity, label: 'Liquidity', icon: Droplets, colorClass: 'border-sky-200 text-sky-700 bg-sky-50 hover:bg-sky-100' },
                  { filters: selectedConviction, setter: setSelectedConviction, label: 'Conviction', icon: Shield, colorClass: 'border-cyan-200 text-cyan-700 bg-cyan-50 hover:bg-cyan-100' },
                  { filters: selectedCatalyst, setter: setSelectedCatalyst, label: 'Catalyst', icon: Zap, colorClass: 'border-yellow-200 text-yellow-700 bg-yellow-50 hover:bg-yellow-100' },
                  { filters: selectedValuation, setter: setSelectedValuation, label: 'Value', icon: Target, colorClass: 'border-fuchsia-200 text-fuchsia-700 bg-fuchsia-50 hover:bg-fuchsia-100' },
                  { filters: selectedTechnical, setter: setSelectedTechnical, label: 'Tech Analysis', icon: LineChart, colorClass: 'border-purple-200 text-purple-700 bg-purple-50 hover:bg-purple-100' },
                  { filters: selectedDiversification, setter: setSelectedDiversification, label: 'Diversification', icon: Shuffle, colorClass: 'border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100' },
                  { filters: selectedPerformance, setter: setSelectedPerformance, label: 'Performance', icon: Trophy, colorClass: 'border-orange-200 text-orange-700 bg-orange-50 hover:bg-orange-100' },
                ].map(({ filters, setter, label, icon: Icon, colorClass }) => 
                  filters.map(filter => (
                    <Badge key={`${label}-${filter}`} variant="outline" className={`cursor-pointer ${isMobile ? 'h-8 text-xs' : 'h-8'} rounded-full px-3 ${colorClass}`}>
                      <Icon size={12} className="mr-1" />
                      {filter}
                      <Button 
                        className="ml-2 p-0 h-4 w-4 rounded-full hover:bg-destructive/20"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFilter(filters, setter, filter);
                        }}
                        size="sm"
                        variant="ghost"
                      >
                        <X size={10} />
                      </Button>
                    </Badge>
                  ))
                )}
                
                {/* Clear All Filters button */}
                {(selectedAsset.length > 0 || selectedSector.length > 0 || selectedSentiment.length > 0 || 
                  selectedStrategies.length > 0 || selectedRisk.length > 0 || selectedExpectedReturn.length > 0 || 
                  selectedMarketCap.length > 0 || selectedDividendYield.length > 0 || selectedHolding.length > 0 || selectedDuration.length > 0 || 
                  selectedRegions.length > 0 || selectedValuationMetrics.length > 0 || selectedGrowthMetrics.length > 0 || 
                  selectedTechnicalIndicators.length > 0 || selectedEsgRatings.length > 0 || selectedAnalysisType.length > 0 || 
                  selectedVolatility.length > 0 || selectedLiquidity.length > 0 || selectedConviction.length > 0 || 
                  selectedCatalyst.length > 0 || selectedValuation.length > 0 || selectedTechnical.length > 0 || 
                  selectedDiversification.length > 0 || selectedPerformance.length > 0) && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setSelectedAsset([]);
                      setSelectedSector([]);
                      setSelectedSentiment([]);
                      setSelectedStrategies([]);
                      setSelectedRisk([]);
                      setSelectedExpectedReturn([]);
                      setSelectedMarketCap([]);
                      setSelectedDividendYield([]);
                      setSelectedHolding([]);
                      setSelectedDuration([]);
                      setSelectedRegions([]);
                      setSelectedValuationMetrics([]);
                      setSelectedGrowthMetrics([]);
                      setSelectedTechnicalIndicators([]);
                      setSelectedEsgRatings([]);
                      setSelectedAnalysisType([]);
                      setSelectedVolatility([]);
                      setSelectedLiquidity([]);
                      setSelectedConviction([]);
                      setSelectedCatalyst([]);
                      setSelectedValuation([]);
                      setSelectedTechnical([]);
                      setSelectedDiversification([]);
                      setSelectedPerformance([]);
                    }}
                    className={`ml-auto rounded-full ${isMobile ? 'h-8 text-xs' : 'h-8'} px-4 border-destructive/30 text-destructive hover:bg-destructive/10`}
                  >
                    <X size={12} className="mr-1" />
                    Clear all
                  </Button>
                )}
              </div>
              
              {/* Results summary */}
              <div className="mt-3 text-xs text-muted-foreground text-center">
                {filteredTips.length} {filteredTips.length === 1 ? 'tip' : 'tips'} match your criteria
              </div>
            </div>
          )}

          <div 
            ref={tableContainerRef}
            className="lg:rounded-lg border border-border lg:max-h-[calc(100vh-92px)] max-h-[calc(100vh-60px)] overflow-y-auto bg-background shadow-sm" 
            style={{ marginLeft: isMobile ? '0' : '2vw', marginRight: isMobile ? '0' : '2vw' }}
          >
            <table className={`w-full ${isMobile ? '' : 'min-w-[1000px]'}`}>
              <thead style={{ position: 'sticky', top: 0, zIndex: 18 }} className={`${isMobile ? 'bg-muted/90 backdrop-blur-sm' : 'bg-muted'} border-border`} data-walkthrough="table-header">
                {isMobile ? (
                  <tr className="bg-muted/90 backdrop-blur-sm">
                    {selectedColumns.map((colKey) => {
                      const col = availableColumns.find(c => c.key === colKey);
                      const clickableColumns = ['asset', 'risk', 'return', 'sentiment', 'conviction', 'symbol', 'holding', 'time', 'advisor', 'investment'];
                      const isClickable = clickableColumns.includes(colKey);
                      
                      return (
                        <th 
                          key={colKey} 
                          className={`px-3 py-4 ${colKey === 'investment' ? 'text-center' : 'text-left'} font-semibold text-xs text-muted-foreground uppercase tracking-wide border-b border-border ${isClickable ? 'cursor-pointer hover:text-primary transition-colors' : ''}`}
                          onClick={isClickable ? () => openInfoSheet(colKey === 'return' ? 'returns' : colKey) : undefined}
                        >
                          {col?.label}
                        </th>
                      );
                    })}
                  </tr>
                ) : (
                  <tr  className="bg-muted">
                    {selectedColumns.map((colKey) => {
                      const col = availableColumns.find(c => c.key === colKey);
                      const clickableColumns = ['asset', 'risk', 'return', 'sentiment', 'conviction', 'symbol', 'holding', 'time', 'advisor', 'investment'];
                      const isClickable = clickableColumns.includes(colKey);
                      
                      return (
                        <th 
                          data-walkthrough={ col.label == "Investment" ? "investment-column" : undefined }

                          key={colKey} 
                          className={`${col?.minWidth} px-4 py-3 text-center font-bold border-r border-border text-sm ${isClickable ? 'cursor-pointer hover:text-primary transition-colors' : ''}`}
                          onClick={isClickable ? () => openInfoSheet(colKey === 'return' ? 'returns' : colKey) : undefined}
                        >
                          {col?.label}
                        </th>
                      );
                    })}
                  </tr>
                )}
              </thead>
              <tbody className={isMobile ? 'divide-y divide-border' : ''}>
                {displayedTips.length === 0 ? (
                  <tr>
                    <td colSpan={selectedColumns.length} className={`text-center ${isMobile ? 'p-12' : 'p-8'} text-muted-foreground`}>
                      <div className="flex flex-col items-center gap-3">
                        <Search size={32} className="text-muted-foreground/50" />
                        <div className="text-sm font-medium">No results found</div>
                        <div className="text-xs text-muted-foreground">Try adjusting your filters or search terms</div>
                      </div>
                    </td>
                  </tr>
                ) : displayedTips.map((tip, idx) => (
                    <tr
                    key={tip.id || idx} className={`${isMobile ? 'hover:bg-muted/30 transition-colors' : idx % 2 ? 'bg-muted/5' : ''}`}>
                      {selectedColumns.map((colKey) => renderTableCell(tip, colKey, idx, isMobile))}
                    </tr>
                ))}
              </tbody>
            </table>
            
            {/* Loading Indicator */}
            {loadingMore && (
              <div className="sticky bottom-0 left-0 right-0 flex items-center justify-center py-4 border-t-2 border-primary/20 bg-background/95 backdrop-blur-sm shadow-lg z-10">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <div className="relative">
                    <Loader2 size={18} className="animate-spin text-primary" />
                    <div className="absolute inset-0 animate-ping">
                      <Loader2 size={18} className="text-primary/20" />
                    </div>
                  </div>
                  <span className="text-foreground">Loading more tips...</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        <Sheet open={mobileTipSheetOpen} onOpenChange={setMobileTipSheetOpen}>
          <SheetContent side="right" className="max-h-[100vh] w-full lg:w-[50%] overflow-y-auto">
            {selectedTipForMobile && (
              <div className="space-y-6 p-2">
                {/* Header - Dual Template */}
                <div className="p-2 border-b border-border">
                  {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? (
                    // SEBI Registered Advisor Template - Professional Advisory
                    <>
                      <div className="flex items-center gap-3 text-lg font-semibold mb-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Target size={20} className="text-primary" />
                        </div>
                        Investment Advisory
                      </div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        Copy this exact configuration to achieve the projected results. Professional analysis with precise entry, exit, and risk parameters for {selectedTipForMobile.symbol}.
                      </div>
                    </>
                  ) : (
                    // Researcher Template - Educational Content
                    <>
                      <div className="flex items-center gap-3 text-lg font-semibold mb-3">
                        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                          <BookOpen size={20} className="text-blue-600" />
                        </div>
                        Investment Research
                      </div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        Educational analysis for learning purposes. Study these price levels and market dynamics to understand potential {selectedTipForMobile.symbol} opportunities.
                      </div>
                    </>
                  )}
                </div>
                  

                  {/* Live Chart Section */}
                  <div className="space-y-4 p-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                      <BarChart2 size={14} />
                      Live Chart Analysis
                    </h3>
                    
                    <div className="rounded-xl border border-border bg-card overflow-hidden">
                      {/* Header */}
                      <div className="px-4 py-3 bg-muted/40 border-b border-border">
                        <div className="flex items-center gap-2">
                          <Activity size={16} className="text-blue-600" />
                          <span className="text-sm font-medium">Real-time Price Chart</span>
                        </div>
                      </div>
                      
                      {/* Chart Content */}
                      <div className="p-0">
                        <div className="overflow-hidden border border-border">
                          <div style={{ height: '320px', width: '100%' , margin:-1}}>
                            <TradingViewWidget
                              symbol={selectedTipForMobile?.symbol}
                              theme={'light'}
                              height={"100%"}
                              width="100%"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Footer */}
                      <div className="px-4 py-2 bg-muted/20 border-t border-border">
                        <div className="text-xs text-muted-foreground text-center">
                          Interactive chart with technical indicators and market data
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Investment Strategy Section - Dual Template */}
                  <div className="space-y-4 p-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                      <BookOpen size={14} />
                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Investment Strategy' : 'Research Analysis'}
                    </h3>
                    
                    <div className="rounded-xl border border-border bg-card overflow-hidden">
                      {/* Header */}
                      <div className="px-4 py-3 bg-muted/40 border-b border-border">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-blue-600" />
                            <span className="text-sm font-medium">Asset Overview</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {selectedTipForMobile.asset}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-4 space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <div className="text-xs text-muted-foreground">Symbol</div>
                            <div className="font-bold text-sm text-primary">{selectedTipForMobile.symbol}</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs text-muted-foreground">Sector</div>
                            <div className="font-semibold text-sm">{selectedTipForMobile.sector}</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs text-muted-foreground">
                              {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Trade Style' : 'Study Period'}
                            </div>
                            <div className="font-semibold text-sm">{selectedTipForMobile.holding || 'Swing'}</div>
                          </div>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border">
                          <div className="flex items-start gap-2 mb-2">
                            <BookOpen size={14} className="text-primary mt-0.5" />
                            <span className="text-sm font-medium">
                              {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Investment Thesis' : 'Research Findings'}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground leading-relaxed">
                            {selectedTipForMobile.tip}
                          </div>
                        </div>
                      </div>
                      
                      {/* Footer */}
                      <div className="px-4 py-2 bg-muted/20 border-t border-border">
                        <div className="text-xs text-muted-foreground text-center">
                          {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered 
                            ? 'Professional investment advisory with actionable trade setup' 
                            : 'Educational research for learning - not direct investment advice'
                          }
                        </div>
                      </div>
                    </div>
                  </div>                    {/* Trade Configuration Section - Dual Template */}
                    <div className="space-y-4  p-2">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                        <Target size={14} />
                        {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Trade Configuration' : 'Price Analysis'}
                      </h3>
                      
                      {/* Price Targets Card */}
                      <div className="rounded-xl border border-border bg-card overflow-hidden">
                        <div className="px-4 py-3 bg-muted/40 border-b border-border">
                          <div className="flex items-center gap-2">
                            <Target size={16} className="text-green-600" />
                            <span className="text-sm font-medium">
                              {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Price Targets' : 'Price Levels Study'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="grid grid-cols-3 gap-4">
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200 cursor-pointer hover:bg-green-100 transition-colors">
                                  <div className="text-xs text-green-700 mb-1">
                                    {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Entry Point' : 'Study Level'}
                                  </div>
                                  <div className="font-bold text-lg text-green-700">${selectedTipForMobile.entry_price}</div>
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 p-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <Target size={16} className="text-green-600" />
                                    <h4 className="font-semibold text-sm">
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Entry Price' : 'Entry Analysis'}
                                    </h4>
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered 
                                      ? 'The optimal price level to enter this investment based on technical and fundamental analysis. This represents the best risk-reward entry point identified by the advisor.'
                                      : 'Study this price level as a potential entry point based on technical and fundamental analysis. This represents an interesting risk-reward level for educational purposes.'
                                    }
                                  </p>
                                  <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                    <strong>
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Recommended Entry:' : 'Study Level:'}
                                    </strong> ${selectedTipForMobile.entry_price}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                            
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors">
                                  <div className="text-xs text-blue-700 mb-1">
                                    {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Target Price' : 'Price Target Study'}
                                  </div>
                                  <div className="font-bold text-lg text-blue-700">${selectedTipForMobile.exit_price}</div>
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 p-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <Target size={16} className="text-blue-600" />
                                    <h4 className="font-semibold text-sm">
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Target Price' : 'Target Analysis'}
                                    </h4>
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered 
                                      ? 'The price level where you should consider taking profits. This target is based on valuation analysis, technical resistance levels, and expected price appreciation.'
                                      : 'Study this price level as a potential profit-taking area. This target represents valuation analysis, technical resistance levels, and expected price appreciation for learning purposes.'
                                    }
                                  </p>
                                  <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                    <strong>
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Profit Target:' : 'Target Study:'}
                                    </strong> ${selectedTipForMobile.exit_price}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                            
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="text-center p-3 rounded-lg bg-red-50 border border-red-200 cursor-pointer hover:bg-red-100 transition-colors">
                                  <div className="text-xs text-red-700 mb-1">
                                    {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Stop Loss' : 'Risk Level Study'}
                                  </div>
                                  <div className="font-bold text-lg text-red-700">${selectedTipForMobile.stop_loss}</div>
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 p-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <Shield size={16} className="text-red-600" />
                                    <h4 className="font-semibold text-sm">
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Stop Loss' : 'Risk Analysis'}
                                    </h4>
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered 
                                      ? 'The price level where you should exit to limit losses if the investment moves against you. This is a crucial risk management tool to protect your capital.'
                                      : 'Study this price level as a potential risk management point. This represents where losses might be limited if the investment moves unfavorably, for educational analysis.'
                                    }
                                  </p>
                                  <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                    <strong>
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Risk Limit:' : 'Risk Study:'}
                                    </strong> ${selectedTipForMobile.stop_loss}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                        
                        <div className="px-4 py-2 bg-muted/20 border-t border-border">
                          <div className="text-xs text-muted-foreground text-center">
                            {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered 
                              ? 'Execute trades at these precise price levels for optimal results' 
                              : 'Study these price levels to understand market dynamics and risk-reward scenarios'
                            }
                          </div>
                        </div>
                      </div>

                      {/* Position Management Card - Dual Template */}
                      <div className="rounded-xl border border-border bg-card overflow-hidden">
                        <div className="px-4 py-3 bg-muted/40 border-b border-border">
                          <div className="flex items-center gap-2">
                            <PieChart size={16} className="text-purple-600" />
                            <span className="text-sm font-medium">
                              {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Position Management' : 'Portfolio Study'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="grid grid-cols-3 gap-4">
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="text-center p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                                  <div className="text-xs text-muted-foreground mb-1">
                                    {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Expected Return' : 'Return Analysis'}
                                  </div>
                                  <div className="font-bold text-sm text-green-600">{selectedTipForMobile.expected_return}</div>
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 p-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <TrendingUp size={16} className="text-green-600" />
                                    <h4 className="font-semibold text-sm">
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Expected Return' : 'Return Analysis'}
                                    </h4>
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered 
                                      ? 'The anticipated percentage return if the investment reaches its target price. This is calculated based on the difference between entry and exit prices.'
                                      : 'Study this anticipated percentage return if the price reaches its target level. This calculation is based on the difference between entry and exit prices for educational analysis.'
                                    }
                                  </p>
                                  <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                    <strong>
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Projected Return:' : 'Study Return:'}
                                    </strong> {selectedTipForMobile.expected_return}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                            
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="text-center p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                                  <div className="text-xs text-muted-foreground mb-1">
                                    {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Portfolio Allocation' : 'Allocation Study'}
                                  </div>
                                  <div className="font-bold text-sm">{selectedTipForMobile.allocation}%</div>
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 p-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <PieChart size={16} className="text-purple-600" />
                                    <h4 className="font-semibold text-sm">
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Portfolio Allocation' : 'Allocation Study'}
                                    </h4>
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered 
                                      ? 'The recommended percentage of your total portfolio to allocate to this investment. This is based on the risk level and expected returns of the position.'
                                      : 'Study this suggested percentage allocation for educational purposes. This is based on risk level analysis and expected returns for learning about portfolio construction.'
                                    }
                                  </p>
                                  <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                    <strong>
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Recommended Allocation:' : 'Study Allocation:'}
                                    </strong> {selectedTipForMobile.allocation}%
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                            
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="text-center p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                                  <div className="text-xs text-muted-foreground mb-1">
                                    {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Investment Duration' : 'Duration Study'}
                                  </div>
                                  <div className="font-bold text-sm">{selectedTipForMobile.duration}</div>
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 p-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-blue-600" />
                                    <h4 className="font-semibold text-sm">
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Investment Duration' : 'Duration Analysis'}
                                    </h4>
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered 
                                      ? 'The recommended time period to hold this investment. This duration is based on the fundamental analysis and expected time for the investment thesis to play out.'
                                      : 'Study this suggested time period for educational analysis. This duration represents the fundamental analysis timeframe and expected period for the thesis to develop.'
                                    }
                                  </p>
                                  <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                    <strong>
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Hold Period:' : 'Study Period:'}
                                    </strong> {selectedTipForMobile.duration}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                        
                        <div className="px-4 py-2 bg-muted/20 border-t border-border">
                          <div className="text-xs text-muted-foreground text-center">
                            {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered 
                              ? 'Follow allocation guidelines for risk-adjusted returns' 
                              : 'Study allocation concepts for educational understanding of risk management'
                            }
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Market Intelligence Section - Dual Template */}
                    <div className="space-y-4 p-2">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                        <BarChart2 size={14} />
                        {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Market Intelligence' : 'Market Research'}
                      </h3>
                      
                      {/* Fundamental & Technical Analysis Card */}
                      <div className="rounded-xl border border-border bg-card overflow-hidden">
                        <div className="px-4 py-3 bg-muted/40 border-b border-border">
                          <div className="flex items-center gap-2">
                            <Activity size={16} className="text-orange-600" />
                            <span className="text-sm font-medium">
                              {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Fundamental & Technical Analysis' : 'Analysis Study'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-4 space-y-4">
                          {/* Primary Analysis Grid - 2x3 layout */}
                          <div className="grid grid-cols-2 gap-3">
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="p-3 rounded-lg bg-muted/30 border border-dashed border-border cursor-pointer hover:bg-muted/50 transition-colors">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-muted-foreground">Key Catalyst</span>
                                    <Zap size={12} className="text-yellow-600" />
                                  </div>
                                  <div className="font-medium text-sm">{selectedTipForMobile.catalyst}</div>
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 p-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <Zap size={16} className="text-yellow-600" />
                                    <h4 className="font-semibold text-sm">
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Investment Catalyst' : 'Catalyst Study'}
                                    </h4>
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered 
                                      ? 'The key event or factor that is expected to drive the price movement. Catalysts can include earnings reports, product launches, regulatory changes, or market events that create investment opportunities.'
                                      : 'Study this key event or factor that could potentially drive price movement. Catalysts include earnings reports, product launches, regulatory changes, or market events for educational analysis.'
                                    }
                                  </p>
                                  <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                    <strong>
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Key Driver:' : 'Study Driver:'}
                                    </strong> {selectedTipForMobile.catalyst}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                            
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="p-3 rounded-lg bg-muted/30 border border-dashed border-border cursor-pointer hover:bg-muted/50 transition-colors">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-muted-foreground">
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Valuation Method' : 'Valuation Study'}
                                    </span>
                                    <DollarSign size={12} className="text-green-600" />
                                  </div>
                                  <div className="font-medium text-sm">{selectedTipForMobile.valuation}</div>
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 p-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <DollarSign size={16} className="text-green-600" />
                                    <h4 className="font-semibold text-sm">
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Valuation Analysis' : 'Valuation Study'}
                                    </h4>
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered 
                                      ? 'The method used to determine if the investment is fairly valued, undervalued, or overvalued. This includes metrics like P/E ratios, DCF analysis, or comparative valuation methods.'
                                      : 'Study the method used to analyze if an investment appears fairly valued, undervalued, or overvalued. Learn about metrics like P/E ratios, DCF analysis, or comparative valuation methods.'
                                    }
                                  </p>
                                  <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                    <strong>
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Valuation Approach:' : 'Study Approach:'}
                                    </strong> {selectedTipForMobile.valuation}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                            
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="p-3 rounded-lg bg-muted/30 border border-dashed border-border cursor-pointer hover:bg-muted/50 transition-colors">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-muted-foreground">
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Technical Setup' : 'Technical Study'}
                                    </span>
                                    <Activity size={12} className="text-blue-600" />
                                  </div>
                                  <div className="font-medium text-sm">{selectedTipForMobile.technical}</div>
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 p-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <Activity size={16} className="text-blue-600" />
                                    <h4 className="font-semibold text-sm">
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Technical Analysis' : 'Technical Study'}
                                    </h4>
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered 
                                      ? 'The technical indicators and chart patterns that support this investment decision. This includes trend analysis, support/resistance levels, and momentum indicators.'
                                      : 'Study the technical indicators and chart patterns for educational purposes. Learn about trend analysis, support/resistance levels, and momentum indicators.'
                                    }
                                  </p>
                                  <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                    <strong>
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Technical Signal:' : 'Study Signal:'}
                                    </strong> {selectedTipForMobile.technical}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                            
                            {selectedTipForMobile.esg_rating && (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <div className="p-3 rounded-lg bg-muted/30 border border-dashed border-border cursor-pointer hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-xs text-muted-foreground">
                                        {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'ESG Rating' : 'ESG Study'}
                                      </span>
                                      <Leaf size={12} className="text-green-600" />
                                    </div>
                                    <div className="font-medium text-sm">{selectedTipForMobile.esg_rating}</div>
                                  </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4">
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <Leaf size={16} className="text-green-600" />
                                      <h4 className="font-semibold text-sm">
                                        {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'ESG Rating' : 'ESG Analysis'}
                                      </h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered 
                                        ? 'Environmental, Social, and Governance (ESG) rating measures the company\'s sustainability practices, social responsibility, and corporate governance quality. Higher ratings indicate better ESG practices.'
                                        : 'Study Environmental, Social, and Governance (ESG) factors for educational purposes. Learn how sustainability practices, social responsibility, and corporate governance quality are measured and analyzed.'
                                      }
                                    </p>
                                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                      <strong>
                                        {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'ESG Score:' : 'Study Score:'}
                                      </strong> {selectedTipForMobile.esg_rating}
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            )}
                            
                            {selectedTipForMobile.strategy && (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <div className="p-3 rounded-lg bg-muted/30 border border-dashed border-border cursor-pointer hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-xs text-muted-foreground">
                                        {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Strategy' : 'Strategy Study'}
                                      </span>
                                      <Target size={12} className="text-indigo-600" />
                                    </div>
                                    <div className="font-medium text-sm">{selectedTipForMobile.strategy}</div>
                                  </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4">
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <Target size={16} className="text-indigo-600" />
                                      <h4 className="font-semibold text-sm">
                                        {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Investment Strategy' : 'Strategy Analysis'}
                                      </h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered 
                                        ? 'The investment approach or strategy used for this recommendation. This could include value investing, growth investing, momentum trading, or other systematic approaches.'
                                        : 'Study the investment approach or strategy for educational purposes. Learn about value investing, growth investing, momentum trading, or other systematic approaches.'
                                      }
                                    </p>
                                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                      <strong>
                                        {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Strategy Type:' : 'Study Type:'}
                                      </strong> {selectedTipForMobile.strategy}
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            )}
                          </div>
                        </div>
                        
                        <div className="px-4 py-2 bg-muted/20 border-t border-border">
                          <div className="text-xs text-muted-foreground text-center">
                            {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered 
                              ? 'Core fundamental and technical analysis factors' 
                              : 'Educational analysis of fundamental and technical factors'
                            }
                          </div>
                        </div>
                      </div>

                      {/* Other Important Metrics Card - Dual Template */}
                      <div className="rounded-xl border border-border bg-card overflow-hidden">
                        <div className="px-4 py-3 bg-muted/40 border-b border-border">
                          <div className="flex items-center gap-2">
                            <LineChart size={16} className="text-purple-600" />
                            <span className="text-sm font-medium">
                              {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Market Snapshot' : 'Market Study'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-4 space-y-4">
                          {/* First Row - Volatility, Liquidity, Region */}
                          <div className="grid grid-cols-3 gap-3">
                            {selectedTipForMobile.volatility && (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <div className="text-center p-3 rounded-lg bg-muted/30 border border-dashed border-border cursor-pointer hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center justify-center mb-2">
                                      <Activity size={14} className="text-orange-600" />
                                    </div>
                                    <div className="text-xs text-muted-foreground mb-1">Volatility</div>
                                    <div className="font-medium text-xs">{selectedTipForMobile.volatility}</div>
                                  </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4">
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <Activity size={16} className="text-orange-600" />
                                      <h4 className="font-semibold text-sm">
                                        {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Price Volatility' : 'Volatility Study'}
                                      </h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered 
                                        ? 'Measures how much the price is expected to fluctuate. Higher volatility means larger price swings, which can create both opportunities and risks.'
                                        : 'Study how much the price might fluctuate for educational purposes. Learn how volatility creates price swings that represent both opportunities and risks.'
                                      }
                                    </p>
                                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                      <strong>
                                        {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Volatility Level:' : 'Study Level:'}
                                      </strong> {selectedTipForMobile.volatility}
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            )}
                            
                            {selectedTipForMobile.liquidity && (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <div className="text-center p-3 rounded-lg bg-muted/30 border border-dashed border-border cursor-pointer hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center justify-center mb-2">
                                      <Droplet size={14} className="text-cyan-600" />
                                    </div>
                                    <div className="text-xs text-muted-foreground mb-1">
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Liquidity' : 'Liquidity Study'}
                                    </div>
                                    <div className="font-medium text-xs">{selectedTipForMobile.liquidity}</div>
                                  </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4">
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <Droplet size={16} className="text-cyan-600" />
                                      <h4 className="font-semibold text-sm">
                                        {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Market Liquidity' : 'Liquidity Analysis'}
                                      </h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                      {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered 
                                        ? 'Shows how easily you can buy or sell this investment without significantly affecting its price. Higher liquidity means faster execution and tighter spreads.'
                                        : 'Study how easily one might buy or sell this investment for educational purposes. Learn how liquidity affects execution speed and price spreads.'
                                      }
                                    </p>
                                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                      <strong>
                                        {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Liquidity Level:' : 'Study Level:'}
                                      </strong> {selectedTipForMobile.liquidity}
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            )}
                            
                            {selectedTipForMobile.region && (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <div className="text-center p-3 rounded-lg bg-muted/30 border border-dashed border-border cursor-pointer hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center justify-center mb-2">
                                      <Globe size={14} className="text-green-600" />
                                    </div>
                                    <div className="text-xs text-muted-foreground mb-1">Region</div>
                                    <div className="font-medium text-xs">{selectedTipForMobile.region}</div>
                                  </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4">
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <Globe size={16} className="text-green-600" />
                                      <h4 className="font-semibold text-sm">Geographic Region</h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                      Indicates the primary geographic market or region where this investment operates or has exposure. This affects currency risk, regulatory environment, and economic cycles.
                                    </p>
                                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                      <strong>Primary Region:</strong> {selectedTipForMobile.region}
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            )}
                          </div>
                          
                          {/* Second Row - Market Cap, Performance, Dividend Yield */}
                          <div className="grid grid-cols-3 gap-3">
                            {selectedTipForMobile.market_cap && (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <div className="text-center p-3 rounded-lg bg-muted/30 border border-dashed border-border cursor-pointer hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center justify-center mb-2">
                                      <Building size={14} className="text-purple-600" />
                                    </div>
                                    <div className="text-xs text-muted-foreground mb-1">Market Cap</div>
                                    <div className="font-medium text-xs">{selectedTipForMobile.market_cap}</div>
                                  </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4">
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <Building size={16} className="text-purple-600" />
                                      <h4 className="font-semibold text-sm">Market Capitalization</h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                      The total market value of a company's outstanding shares. Market cap categories (Small, Mid, Large, Mega) indicate company size and typically correlate with risk and growth potential.
                                    </p>
                                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                      <strong>Company Size:</strong> {selectedTipForMobile.market_cap}
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            )}
                            
                            {selectedTipForMobile.performance && (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <div className="text-center p-3 rounded-lg bg-muted/30 border border-dashed border-border cursor-pointer hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center justify-center mb-2">
                                      <Trophy size={14} className="text-yellow-600" />
                                    </div>
                                    <div className="text-xs text-muted-foreground mb-1">Performance</div>
                                    <div className="font-medium text-xs">{selectedTipForMobile.performance}</div>
                                  </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4">
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <Trophy size={16} className="text-yellow-600" />
                                      <h4 className="font-semibold text-sm">Expected Performance</h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                      Shows the expected performance relative to the broader market or benchmark. This helps set expectations for how the investment might perform compared to alternatives.
                                    </p>
                                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                      <strong>Performance Outlook:</strong> {selectedTipForMobile.performance}
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            )}
                            
                            {selectedTipForMobile.dividend_yield && (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <div className="text-center p-3 rounded-lg bg-muted/30 border border-dashed border-border cursor-pointer hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center justify-center mb-2">
                                      <DollarSign size={14} className="text-green-600" />
                                    </div>
                                    <div className="text-xs text-muted-foreground mb-1">Dividend Yield</div>
                                    <div className="font-medium text-xs">{selectedTipForMobile.dividend_yield}</div>
                                  </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4">
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <DollarSign size={16} className="text-green-600" />
                                      <h4 className="font-semibold text-sm">Dividend Yield</h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                      The annual dividend payment as a percentage of the current stock price. This provides regular income and can be a sign of company stability and profitability.
                                    </p>
                                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                      <strong>Current Yield:</strong> {selectedTipForMobile.dividend_yield}
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            )}
                          </div>
                          
                          {/* Third Row - Diversification, Growth Metrics, Holding Period */}
                          <div className="grid grid-cols-3 gap-3">
                            {selectedTipForMobile.diversification && (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <div className="text-center p-3 rounded-lg bg-muted/30 border border-dashed border-border cursor-pointer hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center justify-center mb-2">
                                      <Shuffle size={14} className="text-blue-600" />
                                    </div>
                                    <div className="text-xs text-muted-foreground mb-1">Diversification</div>
                                    <div className="font-medium text-xs">{selectedTipForMobile.diversification}</div>
                                  </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4">
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <Shuffle size={16} className="text-blue-600" />
                                      <h4 className="font-semibold text-sm">Portfolio Diversification</h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                      This indicates how this investment fits within your overall portfolio strategy. It shows whether this is a core holding, satellite position, or hedge against other investments.
                                    </p>
                                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                      <strong>Current Strategy:</strong> {selectedTipForMobile.diversification}
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            )}
                            
                            {selectedTipForMobile.growth_metric && (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <div className="text-center p-3 rounded-lg bg-muted/30 border border-dashed border-border cursor-pointer hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center justify-center mb-2">
                                      <TrendingUp size={14} className="text-blue-600" />
                                    </div>
                                    <div className="text-xs text-muted-foreground mb-1">Growth</div>
                                    <div className="font-medium text-xs">{selectedTipForMobile.growth_metric}</div>
                                  </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4">
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <TrendingUp size={16} className="text-blue-600" />
                                      <h4 className="font-semibold text-sm">Growth Analysis</h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                      Key growth indicators including revenue growth, earnings growth, user growth, or market share expansion. This shows the company's trajectory and future potential.
                                    </p>
                                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                      <strong>Growth Indicator:</strong> {selectedTipForMobile.growth_metric}
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            )}
                            
                            {selectedTipForMobile.holding_period && (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <div className="text-center p-3 rounded-lg bg-muted/30 border border-dashed border-border cursor-pointer hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center justify-center mb-2">
                                      <Calendar size={14} className="text-teal-600" />
                                    </div>
                                    <div className="text-xs text-muted-foreground mb-1">Holding Period</div>
                                    <div className="font-medium text-xs">{selectedTipForMobile.holding_period}</div>
                                  </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4">
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <Calendar size={16} className="text-teal-600" />
                                      <h4 className="font-semibold text-sm">Holding Period</h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                      The recommended timeframe for holding this investment. This could range from intraday trading to long-term buy-and-hold strategies based on the investment thesis.
                                    </p>
                                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                      <strong>Hold Duration:</strong> {selectedTipForMobile.holding_period}
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            )}
                          </div>
                        </div>
                        
                        <div className="px-4 py-2 bg-muted/20 border-t border-border">
                          <div className="text-xs text-muted-foreground text-center">
                            Additional metrics for comprehensive investment analysis
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Risk & Confidence Assessment */}
                    <div className="space-y-4  p-2">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                        <Shield size={14} />
                        Risk Assessment
                      </h3>
                      
                      <div className="rounded-xl border border-border bg-card overflow-hidden">
                        <div className="px-4 py-3 bg-muted/40 border-b border-border">
                          <div className="flex items-center gap-2">
                            <Shield size={16} className="text-red-600" />
                            <span className="text-sm font-medium">Risk & Confidence Metrics</span>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="text-center p-4 rounded-lg border border-border bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors">
                                  <Shield size={20} className="mx-auto mb-2 text-muted-foreground" />
                                  <div className="text-xs text-muted-foreground mb-2">Risk Level</div>
                                  <Badge 
                                    variant="outline" 
                                    className={`text-sm font-medium px-3 py-1 ${
                                      selectedTipForMobile.risk === 'High' 
                                        ? 'border-red-500 text-red-600 bg-red-50'
                                        : selectedTipForMobile.risk === 'Medium' 
                                          ? 'border-yellow-500 text-yellow-600 bg-yellow-50'
                                          : 'border-green-500 text-green-600 bg-green-50'
                                    }`}
                                  >
                                    {selectedTipForMobile.risk}
                                  </Badge>
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 p-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <Shield size={16} className="text-red-600" />
                                    <h4 className="font-semibold text-sm">Risk Level</h4>
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    The overall risk assessment for this investment. Higher risk typically means greater potential for both gains and losses. Consider your risk tolerance before investing.
                                  </p>
                                  <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                    <strong>Risk Rating:</strong> {selectedTipForMobile.risk}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                            
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="text-center p-4 rounded-lg border border-border bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors">
                                  <Award size={20} className="mx-auto mb-2 text-muted-foreground" />
                                  <div className="text-xs text-muted-foreground mb-2">Conviction</div>
                                  <Badge 
                                    variant="outline" 
                                    className={`text-sm font-medium px-3 py-1 ${
                                      selectedTipForMobile.conviction === 'Strong' 
                                        ? 'border-green-500 text-green-600 bg-green-50'
                                        : selectedTipForMobile.conviction === 'Moderate' 
                                          ? 'border-yellow-500 text-yellow-600 bg-yellow-50'
                                          : 'border-blue-500 text-blue-600 bg-blue-50'
                                    }`}
                                  >
                                    {selectedTipForMobile.conviction}
                                  </Badge>
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 p-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <Award size={16} className="text-green-600" />
                                    <h4 className="font-semibold text-sm">Advisor Conviction</h4>
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    The level of confidence the advisor has in this recommendation. Higher conviction indicates stronger belief in the investment thesis and analysis.
                                  </p>
                                  <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                    <strong>Confidence Level:</strong> {selectedTipForMobile.conviction}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                          
                          <Popover>
                            <PopoverTrigger asChild>
                              <div className="mt-4 p-3 rounded-lg bg-muted/30 border border-dashed border-border cursor-pointer hover:bg-muted/50 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs text-muted-foreground">Market Sentiment</span>
                                  <TrendingUp size={12} className="text-primary" />
                                </div>
                                <Badge variant="outline" className="text-sm bg-background">
                                  {selectedTipForMobile.sentiment}
                                </Badge>
                              </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-4">
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <TrendingUp size={16} className="text-primary" />
                                  <h4 className="font-semibold text-sm">Market Sentiment</h4>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  The overall market outlook for this investment. Sentiment reflects the general mood and expectations of investors and can influence short-term price movements.
                                </p>
                                <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                  <strong>Current Sentiment:</strong> {selectedTipForMobile.sentiment}
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div className="px-4 py-2 bg-muted/20 border-t border-border">
                          <div className="text-xs text-muted-foreground text-center">
                            Risk-adjusted strategy with clear confidence indicators
                          </div>
                        </div>
                      </div>
                    </div>

                  

                      {/* Advisor Information Section - Dual Template */}
                    <div className="space-y-4 p-2">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                        <User size={14} />
                        {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Investment Advisor' : 'Research Analyst'}
                      </h3>
                      
                      <div className="rounded-xl border border-border bg-card overflow-hidden">
                        {/* Header */}
                        <div className="px-4 py-3 bg-muted/40 border-b border-border">
                          <div className="flex items-center gap-2">
                            <ShieldCheck size={16} className="text-green-600" />
                            <span className="text-sm font-medium">
                              {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Professional Credentials' : 'Research Credentials'}
                            </span>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-4">
                          <div className="flex items-start gap-4 mb-4 relative group cursor-pointer hover:bg-muted/30 rounded-lg p-3 -m-3 transition-colors"
                            onClick={() => {
                              setSelectedAdvisorForMobile(selectedTipForMobile);
                              setShowAdvisorSheet(true);
                              setSelectedTipForMobile(null);
                            }}
                          >
                            <img 
                              src={selectedTipForMobile.advisor_avatar} 
                              alt={selectedTipForMobile.advisor_name} 
                              className="w-14 h-14 rounded-full border-2 border-border shadow-sm" 
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-base text-foreground mb-1">
                                {selectedTipForMobile.advisor_name}
                              </div>
                              <div className="text-sm text-muted-foreground mb-2">
                                {selectedTipForMobile.advisor_title || (selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Certified Financial Advisor' : 'Research Analyst')}
                              </div>
                              {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? (
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                  <ShieldCheck size={12} className="mr-1" />
                                  SEBI Registered
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                  <BookOpen size={12} className="mr-1" />
                                  Research Analyst
                                </Badge>
                              )}
                            </div>
                            <ArrowUpRight 
                              size={16} 
                              className="absolute top-2 right-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary" 
                              title="View advisor profile"
                            />
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div 
                              className="text-center p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors relative group"
                              onClick={() => {
                                handleViewAllTips(selectedTipForMobile.advisor_name || selectedTipForMobile.advisor_name);
                                setSelectedTipForMobile(null);
                              }}
                            >
                              <div className="font-bold text-lg text-primary">{selectedTipForMobile.advisor_total_tips || '127'}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Total Tips' : 'Research Posts'}
                              </div>
                              <ArrowUpRight 
                                size={14} 
                                className="absolute top-2 right-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-primary" 
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent the main div click
                                  setSelectedAdvisorForMobile(selectedTipForMobile);
                                  setShowAdvisorSheet(true);
                                  setSelectedTipForMobile(null);
                                }}
                                title="View advisor profile"
                              />
                            </div>
                            <div className="text-center p-3 rounded-lg bg-muted/30">
                              <div className="font-bold text-lg text-green-600">{selectedTipForMobile.advisor_win_rate *100 || selectedTipForMobile.win_rate*100 || '84'}%</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? 'Success Rate' : 'Accuracy Rate'}
                              </div>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-muted/30">
                              <div className="font-bold text-lg text-blue-600">{selectedTipForMobile.experience || '7'}+</div>
                              <div className="text-xs text-muted-foreground mt-1">Years Exp</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="px-4 py-2 bg-muted/20 border-t border-border">
                          <div className="text-xs text-muted-foreground text-center">
                            {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered 
                              ? 'Verified professional with proven track record' 
                              : 'Educational researcher with market analysis expertise'
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                
                {/* Footer - Dual Template */}
                <div className="py-4 border-t  bg-muted/20 ">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? (
                      <>
                        <Target size={14} className="text-primary" />
                        <span className="text-sm font-medium">Professional Investment Advisory</span>
                      </>
                    ) : (
                      <>
                        <BookOpen size={14} className="text-blue-600" />
                        <span className="text-sm font-medium">Educational Research Content</span>
                      </>
                    )}
                  </div>
                  <div className="text-xs text-center text-muted-foreground leading-relaxed">
                    {selectedTipForMobile.advisor_sebi_registered || selectedTipForMobile.sebi_registered ? (
                      <>
                        This configuration is designed for optimal risk-adjusted returns.<br />
                        <span className="font-medium">Always conduct your own due diligence before investing.</span>
                      </>
                    ) : (
                      <>
                        This content is for educational research and learning purposes only.<br />
                        <span className="font-medium">Not financial advice - consult a qualified advisor before investing.</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>

        

        {/* Info Sheet */}
        <Sheet open={infoSheetOpen} onOpenChange={setInfoSheetOpen}>
          <SheetContent side="bottom" className="h-[48vh]">
            <SheetHeader>
              <SheetTitle className="text-center text-primary">
                How to use LollipopIcons to unlock tips
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col items-center justify-center space-y-6 mt-6">
              {/* Visual flow */}
              <div className="flex items-center justify-center space-x-4">
                <Lock size={32} />
                <ArrowRight size={28} />
                <img src={LollipopSVG} alt="Lollipop" className="w-9 h-9 text-primary" />
                <ArrowRight size={28} />
                <LockOpen size={32} className="text-primary" />
              </div>
              {/* Explanations */}
              <div className="space-y-4 text-center max-w-md">
                <p className="text-base font-medium">
                  <span className="text-primary">Locked tips</span> show a LollipopIcon icon. 
                  Tap the unlock button and 1 LollipopIcon will be used to reveal the tip instantly.
                </p>
                <p className="text-sm opacity-80">
                  You can earn LollipopIcons by engaging with the app or purchase them directly. 
                  Your available LollipopIcons are shown in your wallet/profile.
                </p>
                <p className="text-sm opacity-80">
                  Once unlocked, tips remain accessible in your account forever.
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Column Selector Sheet */}
        <Sheet open={columnSelectorOpen} onOpenChange={setColumnSelectorOpen}>
          <SheetContent side="right" className="w-[400px]">
            <SheetHeader>
              <SheetTitle>Select Columns</SheetTitle>
              <SheetDescription>
                Choose up to 8 columns to display in the table.
              </SheetDescription>
            </SheetHeader>
            
            <div className="mt-6 space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Selected: {selectedColumns.length}/8 columns
              </div>
              
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {availableColumns.map((column) => (
                  <div key={column.key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={column.key}
                      checked={selectedColumns.includes(column.key)}
                      onChange={(e) => {
                        if (e.target.checked && selectedColumns.length < 8) {
                          setSelectedColumns([...selectedColumns, column.key]);
                        } else if (!e.target.checked) {
                          setSelectedColumns(selectedColumns.filter(col => col !== column.key));
                        }
                      }}
                      disabled={!selectedColumns.includes(column.key) && selectedColumns.length >= 8}
                      className="rounded border-border"
                    />
                    <label 
                      htmlFor={column.key} 
                      className={`text-sm cursor-pointer ${
                        !selectedColumns.includes(column.key) && selectedColumns.length >= 8 
                          ? 'text-muted-foreground' 
                          : 'text-foreground'
                      }`}
                    >
                      {column.label}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedColumns(['time', 'advisor', 'asset', 'symbol', 'return', 'risk', 'holding', 'sentiment']);
                  }}
                >
                  Reset to Default
                </Button>
                <Button 
                  size="sm"
                  onClick={() => setColumnSelectorOpen(false)}
                  className="ml-auto"
                >
                  Apply Changes
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

        <ProfileEditPopover />

        {/* Mobile Symbol Chart Sheet */}
        <Sheet open={showSymbolSheet && !!selectedSymbolForMobile} onOpenChange={(open) => !open && setShowSymbolSheet(false)}>
          <SheetContent side="right" className="lg:hidden max-h-[100vh] min-w-[100vw] p-0 flex flex-col">
            {/* Enhanced Header */}
            <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center">
                    <ChartPie size={16} className="text-foreground" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">{selectedSymbolForMobile}</div>
                    <div className="text-xs text-muted-foreground">Interactive Chart</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSymbolSheet(false)}
                  className="w-8 h-8 p-0 rounded-full"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-16">
              <div className="p-4 space-y-4">
                {/* Chart Container */}
                <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                  <div className="p-3 border-b border-border bg-muted/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="font-medium text-sm">Live Chart</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock size={12} />
                        <span>Real-time data</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-[50vh] bg-background">
                    <TradingViewWidget
                      symbol={selectedSymbolForMobile}
                      theme={isDarkTheme ? 'dark' : 'light'}
                      height={"50vh"}
                      width={'100%'}
                    />
                  </div>
                </div>

                {/* Quick Actions Section */}
                <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap size={16} className="text-muted-foreground" />
                    <span className="font-semibold text-sm">Quick Actions</span>
                  </div>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-between gap-3 h-14 px-4 py-3"
                      onClick={() => {
                        // Add to watchlist functionality
                        toast.success(`${selectedSymbolForMobile} added to watchlist`);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center">
                          <Eye size={14} className="text-foreground" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-sm">Add to Watchlist</div>
                          <div className="text-xs text-muted-foreground">Track this symbol</div>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-muted-foreground flex-shrink-0" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full justify-between gap-3 h-14 px-4 py-3"
                      onClick={() => {
                        // View related tips functionality
                        setSearch(selectedSymbolForMobile);
                        setShowSymbolSheet(false);
                        toast.success(`Searching tips for ${selectedSymbolForMobile}`);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center">
                          <Search size={14} className="text-foreground" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-sm">Find Related Tips</div>
                          <div className="text-xs text-muted-foreground">Search tips for this symbol</div>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-muted-foreground flex-shrink-0" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full justify-between gap-3 h-14 px-4 py-3"
                      onClick={() => {
                        // Share chart functionality
                        if (navigator.share) {
                          navigator.share({
                            title: `${selectedSymbolForMobile} Chart`,
                            text: `Check out the chart for ${selectedSymbolForMobile}`,
                            url: window.location.href
                          });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          toast.success('Chart link copied to clipboard');
                        }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center">
                          <Share2 size={14} className="text-foreground" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-sm">Share Chart</div>
                          <div className="text-xs text-muted-foreground">Share with others</div>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-muted-foreground flex-shrink-0" />
                    </Button>
                  </div>
                </div>

                {/* Chart Features Section */}
                <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Settings size={16} className="text-muted-foreground" />
                    <span className="font-semibold text-sm">Chart Features</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp size={14} className="text-green-500" />
                        <span className="text-xs font-medium">Technical Analysis</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Advanced indicators and tools</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart2 size={14} className="text-blue-500" />
                        <span className="text-xs font-medium">Multiple Timeframes</span>
                      </div>
                      <p className="text-xs text-muted-foreground">From 1m to yearly charts</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Activity size={14} className="text-purple-500" />
                        <span className="text-xs font-medium">Volume Analysis</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Price and volume correlation</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <ArrowLeftRight size={14} className="text-orange-500" />
                        <span className="text-xs font-medium">Compare Stocks</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Side-by-side comparison</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Footer */}
            <div className="sticky bottom-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border p-3">
              <div className="text-center text-xs text-muted-foreground">
                Zoom, pan, and apply technical indicators directly on the chart
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Mobile Paywall Info Sheet */}
        <Sheet open={showPaywallSheet && !!selectedPaywallTip} onOpenChange={(open) => !open && setShowPaywallSheet(false)}>
          <SheetContent side="right" className="max-h-[100vh] w-full lg:w-[35vw] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-4 p-4 border-b border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center p-2">
                <Lock size={20} className="text-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">Premium Investment Access</div>
                <div className="text-sm text-muted-foreground">
                  Unlock professional-grade investment insights
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Unlock Requirements Section */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Unlock Requirements</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    Investment credits needed to access this premium tip
                  </p>
                </div>
                
                <div className="space-y-3">
                  {(() => {
                    const requiredLollipops = selectedPaywallTip?.lollipopsRequired || 3;
                    const isSebiRegistered = selectedPaywallTip?.advisor_sebi_registered || selectedPaywallTip?.sebi_registered;
                    const successRate = parseInt(selectedPaywallTip?.successRate || selectedPaywallTip?.success_rate || '0');
                    
                    // Dynamic pricing structure
                    const pricingComponents = [];
                    let totalCost = 0;
                    
                    // Base cost (always 1)
                    pricingComponents.push({
                      title: "Base unlock",
                      description: "Standard credit for accessing investment tips",
                      cost: 1,
                      iconCount: 1
                    });
                    totalCost += 1;
                    
                    // SEBI registration premium
                    if (isSebiRegistered && requiredLollipops > 1) {
                      const sebiCost = Math.min(2, requiredLollipops - totalCost);
                      if (sebiCost > 0) {
                        pricingComponents.push({
                          title: "SEBI Registered",
                          description: "Premium for tips from SEBI registered advisors",
                          cost: sebiCost,
                          iconCount: sebiCost
                        });
                        totalCost += sebiCost;
                      }
                    }
                    
                    // High performance premium
                    if (successRate > 65 && totalCost < requiredLollipops) {
                      const performanceCost = Math.min(2, requiredLollipops - totalCost);
                      if (performanceCost > 0) {
                        pricingComponents.push({
                          title: `${selectedPaywallTip?.successRate || successRate + '%'} Success Rate`,
                          description: "Extra charge for high-performing advisor recommendations",
                          cost: performanceCost,
                          iconCount: performanceCost
                        });
                        totalCost += performanceCost;
                      }
                    }
                    
                    // Additional premium if still under required amount
                    if (totalCost < requiredLollipops) {
                      const remainingCost = requiredLollipops - totalCost;
                      const winRate = selectedPaywallTip?.successRate || selectedPaywallTip?.success_rate || '0';
                      pricingComponents.push({
                        title: `${winRate || 72}% Win Rate`,
                        description: `Advisors with win rates above 50% qualify for premium pricing.`,
                        cost: remainingCost,
                        iconCount: remainingCost
                      });
                    }
                    
                    return pricingComponents.map((component, index) => (
                      <div key={index} className="p-3 rounded-lg border bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              {[...Array(component.iconCount)].map((_, i) => (
                                <img key={i} src={isDarkTheme ? LollipopSVGWhite : LollipopSVG} alt="Lollipop" className="w-4 h-4" />
                              ))}
                            </div>
                            <span>{component.title}</span>
                          </div>
                          <span className="font-medium">{component.cost}</span>
                        </div>
                        {component.description && (
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            {component.description}
                          </p>
                        )}
                      </div>
                    ));
                  })()}
                  
                  <div className="p-4 rounded-lg border bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 border-green-300 dark:border-green-700">
                    <div className="flex items-center justify-between font-medium">
                      <div className="flex-col items-center gap-2">
                        <div className="flex gap-1">
                          {[...Array(selectedPaywallTip?.lollipopsRequired || 3)].map((_, i) => (
                            <img key={i} src={isDarkTheme ? LollipopSVGWhite : LollipopSVG} alt="Lollipop" className="w-4 h-4" />
                          ))}
                        </div>
                        <span>Total Investment</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">{selectedPaywallTip?.lollipopsRequired || 3} Lollipops</span>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-700">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span>{isLoggedIn ? "Your Available Credits" : "Login Required"}</span>
                        <span className="font-medium text-foreground">
                          {isLoggedIn ? `${userData?.credits || 0} Lollipops` : "-- Lollipops"}
                        </span>
                      </div>
                      
                      {/* Unlock Button */}
                      <div className="mt-6">
                        {isLoggedIn ? (
                          <Button 
                            className="w-full font-medium relative"
                            size="lg"
                            variant={userData?.credits >= (selectedPaywallTip?.lollipopsRequired || 3) ? "default" : "outline"}
                            onClick={async () => {
                              const requiredLollipops = selectedPaywallTip?.lollipopsRequired || 3;
                              if (userData?.credits >= requiredLollipops) {
                                const unlockSuccess = await handleUnlockTip(selectedPaywallTip);
                                if (unlockSuccess) {
                                  setShowPaywallSheet(false);
                                  // Open the tip sheet immediately after unlocking
                                  setSelectedTipForMobile(selectedPaywallTip);
                                  setMobileTipSheetOpen(true);
                                  toast("Tip unlocked successfully!", {
                                    duration: 3000,
                                    position: "top-center",
                                  });
                                }
                              } else {
                                toast(`Not enough Lollipops! You need ${requiredLollipops} Lollipops to unlock this tip.`, {
                                  duration: 3000,
                                  position: "top-center",
                                });
                              }
                            }}
                            disabled={userData?.credits < (selectedPaywallTip?.lollipopsRequired || 3)}
                          >
                            <div className="flex items-center justify-center gap-2">
                              {userData?.credits >= (selectedPaywallTip?.lollipopsRequired || 3) ? (
                                <>
                                  <LockOpenIcon className="w-4 h-4" />
                                  <span>Unlock Investment Tip</span>
                                </>
                              ) : (
                                <>
                                  <Lock className="w-4 h-4" />
                                  <span>Insufficient Credits</span>
                                </>
                              )}
                            </div>
                          </Button>
                        ) : (
                          <Button 
                            className="w-full font-medium"
                            size="lg"
                            variant="default"
                            onClick={() => {
                              window.location.href = '/login';
                            }}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <LogIn className="w-4 h-4" />
                              <span>Login to Unlock</span>
                            </div>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="border-t border-border/50"></div>

              {/* Meet Your Advisor Section */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Meet Your Advisor</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    Professional credentials and track record
                  </p>
                </div>
                
                <div className="p-3 rounded-lg border bg-muted/30 dark:bg-muted/10 border-border mb-4 relative">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted/50 dark:bg-muted/20 flex items-center justify-center">
                      <img src={selectedPaywallTip?.advisor_avatar || UserCheck} alt="Advisor" className="text-foreground rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-base text-foreground mb-1">
                        {selectedPaywallTip?.advisor_name || 'Professional Advisor'}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {selectedPaywallTip?.advisor_title || 'Certified Financial Advisor'}
                      </div>
                      {selectedPaywallTip?.advisor_sebi_registered && (
                        <Badge variant="outline" className="text-xs bg-muted/30 text-foreground border-border">
                          <ShieldCheck size={12} className="mr-1" />
                          SEBI Registered
                        </Badge>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedAdvisorForMobile(selectedPaywallTip);
                      setShowAdvisorSheet(true);
                    }}
                    className="absolute top-2 right-2 p-1 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors"
                    title="View full advisor profile"
                  >
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-3 rounded-lg bg-muted/20 dark:bg-muted/10 border border-border relative cursor-pointer hover:bg-muted/30 dark:hover:bg-muted/20 transition-colors"
                    onClick={() => {
                      // Filter table to show only this advisor's tips
                      const advisorName = selectedPaywallTip?.advisor_name || 'Professional Advisor';
                      handleViewAllTips(advisorName);
                      // Close the paywall sheet
                      setShowPaywallSheet(false);
                    }}
                  >
                    <div className="font-bold text-lg text-foreground">{selectedPaywallTip?.advisor_total_tips || '127'}</div>
                    <div className="text-xs text-muted-foreground mt-1">Total Tips</div>
                    <ArrowUpRight className="w-3 h-3 text-foreground absolute top-1 right-1 opacity-60" />
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/20 dark:bg-muted/10 border border-border">
                    <div className="font-bold text-lg text-foreground">{selectedPaywallTip?.advisor_win_rate*100 || selectedPaywallTip?.win_rate*100 || '84'}%</div>
                    <div className="text-xs text-muted-foreground mt-1">Success Rate</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/20 dark:bg-muted/10 border border-border">
                    <div className="font-bold text-lg text-foreground">{selectedPaywallTip?.advisor_experience || '7'}+</div>
                    <div className="text-xs text-muted-foreground mt-1">Years Exp</div>
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="border-t border-border/50"></div>

              {/* What You're Unlocking Section */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">What You're Unlocking</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    Premium content with detailed analysis and risk management
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border bg-muted/20 dark:bg-muted/10 border-border">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-md bg-muted/30 dark:bg-muted/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Target className="w-4 h-4 text-foreground/70" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-foreground mb-1">
                          Professional Analysis
                        </div>
                        <div className="text-xs text-muted-foreground leading-relaxed break-words">
                          Complete breakdown with entry points, stop loss, and target prices
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border bg-muted/20 dark:bg-muted/10 border-border">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-md bg-muted/30 dark:bg-muted/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <BarChart2 className="w-4 h-4 text-foreground/70" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-foreground mb-1">
                          Risk Management Plan
                        </div>
                        <div className="text-xs text-muted-foreground leading-relaxed break-words">
                          Detailed risk assessment and portfolio allocation recommendations
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Footer */}
                <div className="border-t bg-background p-4 mt-6">
                  <div className="text-center text-xs text-muted-foreground">
                    <p>Unlock exclusive insights from professional advisors</p>
                    <p className="mt-1">Premium content • Expert analysis • Market strategies</p>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Advisor Info Sheet */}
        <Sheet 
          open={showAdvisorSheet && !!selectedAdvisorForMobile} 
          onOpenChange={(open) => {
            console.log('Advisor sheet onOpenChange:', open, 'showAdvisorSheet:', showAdvisorSheet, 'selectedAdvisorForMobile:', selectedAdvisorForMobile);
            !open && setShowAdvisorSheet(false);
          }}
        >
          <SheetContent side="right" className="max-h-[100vh] w-full lg:w-[45vw] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-4 p-4 border-b border-border">
              <img 
                src={selectedAdvisorForMobile?.advisor_avatar} 
                alt={selectedAdvisorForMobile?.advisor_name} 
                className="w-12 h-12 rounded-xl object-cover border-2 border-border shadow-sm" 
              />
              <div>
                <div className="text-xl font-bold text-foreground">{selectedAdvisorForMobile?.advisor_name}</div>
                <div className="text-sm text-muted-foreground">
                  Professional investment advisor profile
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {/* Professional Background Section */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Professional Background</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        Educational background, certifications, and market experience
                      </p>
                    </div>
                
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg border bg-muted/20 dark:bg-muted/10 border-border">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-md bg-muted/30 dark:bg-muted/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                            <User className="w-4 h-4 text-foreground/70" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm text-foreground mb-1">
                              Professional Title
                            </div>
                            <div className="text-xs text-muted-foreground leading-relaxed break-words">
                              {selectedAdvisorForMobile?.advisor_title || 'Investment Advisor'}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg border bg-muted/20 dark:bg-muted/10 border-border">
                          <div className="text-xs text-muted-foreground">Age</div>
                          <div className="font-semibold text-sm text-foreground">{selectedAdvisorForMobile?.advisor_age || 'N/A'} years</div>
                        </div>
                        <div className="p-3 rounded-lg border bg-muted/20 dark:bg-muted/10 border-border">
                          <div className="text-xs text-muted-foreground">Experience</div>
                          <div className="font-semibold text-sm text-foreground">{selectedAdvisorForMobile?.advisor_experience || 'N/A'} years</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="border-t border-border/50"></div>

                  {/* Regulatory Compliance Section */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Regulatory Compliance</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        SEBI registration and regulatory standards compliance
                      </p>
                    </div>
                    
                    {selectedAdvisorForMobile?.advisor_sebi_registered ? (
                      <div className="p-4 rounded-lg border bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                        <div className="flex items-center gap-3 mb-2">
                          <ShieldCheck size={20} className="text-green-600" />
                          <span className="font-medium text-sm text-green-700 dark:text-green-400">SEBI Registered Advisor</span>
                        </div>
                        <div className="text-xs text-green-600 dark:text-green-400 leading-relaxed break-words">
                          This advisor is registered with the Securities and Exchange Board of India (SEBI), ensuring compliance with regulatory standards and professional ethics.
                        </div>
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 mt-2">
                          <ShieldCheck size={12} className="mr-1" />
                          Verified & Compliant
                        </Badge>
                      </div>
                    ) : (
                      <div className="p-4 rounded-lg border bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
                        <div className="flex items-center gap-3 mb-2">
                          <ShieldAlert size={20} className="text-amber-600" />
                          <span className="font-medium text-sm text-amber-700 dark:text-amber-400">Independent Advisor</span>
                        </div>
                        <div className="text-xs text-amber-600 dark:text-amber-400 leading-relaxed break-words">
                          This advisor operates independently and may not be SEBI registered. Please verify credentials independently.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Separator */}
                  <div className="border-t border-border/50"></div>

                  {/* Performance Track Record Section */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Performance Track Record</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        Track record and success metrics
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 rounded-lg border bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                            <Award size={16} className="text-green-600 dark:text-green-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-muted-foreground">Win Rate</div>
                            <div className="font-bold text-lg text-green-600 dark:text-green-400 break-words">
                              {selectedAdvisorForMobile?.advisor_win_rate*100 || selectedAdvisorForMobile?.win_rate*100 || 'N/A'}%
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Success rate of recommendations
                        </div>
                      </div>
                      
                      <div 
                        className="p-4 rounded-lg border bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors relative group"
                        onClick={() => {
                          handleViewAllTips(selectedAdvisorForMobile?.advisor_name || selectedAdvisorForMobile?.advisor_name);
                          setSelectedAdvisorForMobile(null);
                          setShowAdvisorSheet(false);
                        }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                            <BarChart2 size={16} className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-muted-foreground">Tips</div>
                            <div className="font-bold text-lg text-blue-600 dark:text-blue-400 break-words">
                              {selectedAdvisorForMobile?.advisor_total_tips || '676'}
                            </div>
                          </div>
                          <ArrowUpRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2" />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Investment tips shared
                        </div>
                      </div>
                    </div>

                    {/* View All Tips Button */}
                    <Button
                      variant="default"
                      className="w-full justify-start p-4 h-auto rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm relative group"
                      onClick={() => {
                        handleViewAllTips(selectedAdvisorForMobile?.advisor_name);
                        setSelectedAdvisorForMobile(null);
                        setShowAdvisorSheet(false);
                      }}
                    >
                      <Eye size={20} className="mr-4 flex-shrink-0" />
                      <div className="text-left flex-1 min-w-0">
                        <div className="font-medium">View All Tips</div>
                        <div className="text-xs text-primary-foreground/80 break-words">See complete tips track record</div>
                      </div>
                      <ArrowUpRight size={16} className="text-primary-foreground/80 absolute top-2 right-2" />
                    </Button>
                  </div>

                  {/* Separator */}
                  <div className="border-t border-border/50"></div>

                  {/* Connect & Engage Section */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Connect & Engage</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        Ways to connect and follow this advisor
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start p-4 h-auto rounded-xl border border-border hover:bg-muted/50 relative group"
                        onClick={() => {
                          toast("Follow feature coming soon!", {
                            duration: 2000,
                            position: "top-center",
                          });
                        }}
                      >
                        <User size={20} className="mr-4 flex-shrink-0" />
                        <div className="text-left flex-1 min-w-0">
                          <div className="font-medium">Follow Advisor</div>
                          <div className="text-xs text-muted-foreground break-words">Get notified about new tips and updates</div>
                          <Badge variant="secondary" className="text-xs px-2 py-1 mt-2 bg-orange-100 text-orange-600 border-orange-200 w-fit">
                            Coming Soon
                          </Badge>
                        </div>
                        <PlusCircle size={16} className="text-muted-foreground absolute top-10 right-2" />
                      </Button>

                      <div className="grid grid-cols-3 gap-2 mt-1">
                        <Button
                          variant="outline"
                          className="flex flex-col items-center justify-center p-3 h-auto rounded-xl border border-border hover:bg-muted/50 relative group"
                          onClick={() => {
                            toast("Call feature coming soon!", {
                              duration: 2000,
                              position: "top-center",
                            });
                          }}
                        >
                          <Phone size={18} className="mb-1" />
                          <div className="text-xs font-medium">Call</div>
                        </Button>

                        <Button
                          variant="outline"
                          className="flex flex-col items-center justify-center p-3 h-auto rounded-xl border border-border hover:bg-muted/50 relative group"
                          onClick={() => {
                            toast("Email feature coming soon!", {
                              duration: 2000,
                              position: "top-center",
                            });
                          }}
                        >
                          <Mail size={18} className="mb-1" />
                          <div className="text-xs font-medium">Email</div>
                        </Button>

                        <Button
                          variant="outline"
                          className="flex flex-col items-center justify-center p-3 h-auto rounded-xl border border-border hover:bg-muted/50 relative group"
                          onClick={() => {
                            toast("Website feature coming soon!", {
                              duration: 2000,
                              position: "top-center",
                            });
                          }}
                        >
                          <Globe size={18} className="mb-1" />
                          <div className="text-xs font-medium">Website</div>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="border-t bg-background p-4 mt-6">
                    <div className="text-center text-xs text-muted-foreground">
                      <p>Professional advisor profiles and expertise</p>
                      <p className="mt-1">Verified credentials • Market insights • Investment strategies</p>
                    </div>
                  </div>
</div>
              
          </SheetContent>
        </Sheet>

        {/* Mobile Alert/Notifications Sheet */}
        <Sheet open={showMobileAlertSheet} onOpenChange={setShowMobileAlertSheet}>
          <SheetContent side="right" className="max-h-[100vh] w-full lg:w-[35vw] overflow-hidden flex flex-col">
            {/* Header */}
            <SheetHeader className="pb-4 border-b border-border">
              <SheetTitle className="flex items-center gap-2">
                <Bell size={20} />
                Notifications & Alerts
              </SheetTitle>
              <SheetDescription className="text-left">
                Stay updated with market movements, tip updates, and personalized alerts
              </SheetDescription>
            </SheetHeader>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-4">
                {/* Alert Categories */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Alert Types
                  </h3>
                  
                  <div className="space-y-2">
                    {/* Market Alerts */}
                    <div className="p-3 rounded-lg border border-border bg-muted/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp size={16} className="text-green-500" />
                          <span className="font-medium text-sm">Market Alerts</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Get notified about significant market movements, breakouts, and sector rotations
                      </p>
                    </div>

                    {/* Tip Updates */}
                    <div className="p-3 rounded-lg border border-border bg-muted/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle size={16} className="text-orange-500" />
                          <span className="font-medium text-sm">Tip Updates</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Updates on your unlocked tips, price targets hit, and advisor recommendations
                      </p>
                    </div>

                    {/* Portfolio Alerts */}
                    <div className="p-3 rounded-lg border border-border bg-muted/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <BarChart2 size={16} className="text-blue-500" />
                          <span className="font-medium text-sm">Portfolio Alerts</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Track performance of your followed tips and get exit signal notifications
                      </p>
                    </div>

                    {/* New Advisor Tips */}
                    <div className="p-3 rounded-lg border border-border bg-muted/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-purple-500" />
                          <span className="font-medium text-sm">Advisor Alerts</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        New tips from your favorite advisors and SEBI registered professionals
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Recent Activity
                  </h3>
                  
                  <div className="p-4 rounded-lg border border-dashed border-border bg-muted/20 text-center">
                    <Bell size={24} className="mx-auto mb-2 text-muted-foreground" />
                    <div className="text-sm font-medium mb-1">No New Notifications</div>
                    <div className="text-xs text-muted-foreground">
                      We'll notify you here when there are updates on your tips, market alerts, or new content from your followed advisors.
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Settings
                  </h3>
                  
                  <Button
                    variant="outline"
                    className="w-full justify-start p-3 h-auto rounded-xl border border-border hover:bg-muted/50"
                    onClick={() => {
                      // Future: Navigate to notification settings
                      toast("Notification settings coming soon!", {
                        duration: 2000,
                        position: "top-center",
                      });
                    }}
                  >
                    <Settings size={16} className="mr-3" />
                    <div className="text-left">
                      <div className="font-medium text-sm">Notification Preferences</div>
                      <div className="text-xs text-muted-foreground">Customize your alert settings</div>
                    </div>
                    <ArrowUpRight size={14} className="ml-auto text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-border bg-muted/20">
              <div className="text-xs text-center text-muted-foreground">
                Stay connected to never miss important market opportunities
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Mobile User Profile Sheet */}
        <Sheet open={showMobileUserSheet} onOpenChange={setShowMobileUserSheet}>
          <SheetContent side="right" className="max-h-[100vh] w-full lg:w-[35vw] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-4 p-4 border-b border-border">
              {userData?.avatar ? (
                <img 
                  src={userData.avatar} 
                  alt={userData.name} 
                  className="w-12 h-12 rounded-full border-2 border-border shadow-sm"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
              )}
              <div>
                <div className="text-xl font-bold text-foreground">
                  {userData?.name || 'User Profile'}
                </div>
                <div className="text-sm text-muted-foreground">
                  Manage your account and settings
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {userData && userData.id ? (
                <>
                  {/* Account Balance Section */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Account Balance</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        Your Lollipop credits to unlock premium investment tips from SEBI registered advisors
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg border bg-gradient-to-br from-primary/5 to-primary/10">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <img src={isDarkTheme ? LollipopSVGWhite : LollipopSVG} alt="Lollipop" className="w-8 h-8" data-walkthrough="lollipop-mobile" />
                        <div className="text-center" >
                          <div className="text-3xl font-bold text-primary">{userData.credits || 0}</div>
                          <div className="text-sm text-muted-foreground">Lollipops Available</div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground text-center mb-3 px-2 leading-relaxed break-words">
                        Each Lollipop is used to unlock premium tips with detailed analysis and target prices
                      </div>
                      
                      <Button
                        variant="default"
                        className="w-full relative rounded p-2 h-10"
                        onClick={() => {
                          window.open('https://wa.me/918939350442?text=Hi%20I%20want%20to%20recharge%20my%20Lollipops', '_blank');
                          setShowMobileUserSheet(false);
                        }}
                      >
                        <Plus size={16} className="mr-2" />
                        Recharge Credits
                        <ArrowUpRight size={14} className="absolute top-21 right-2 opacity-60" />
                      </Button>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="border-t border-border/50"></div>

                  {/* Profile Management Section */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Profile Management</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        Manage your personal information and investment preferences
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start p-6 h-auto relative rounded-xl"
                        onClick={() => {
                          setShowProfileEdit(true);
                          setShowMobileUserSheet(false);
                        }}
                      >
                        <User size={16} className="mr-3 flex-shrink-0" />
                        <div className="text-left flex-1 min-w-0">
                          <div className="font-medium">Edit Profile</div>
                          <div className="text-xs text-muted-foreground break-words">Update name, email, and investment goals</div>
                        </div>
                        <Settings size={14} className="absolute top-8 right-5 opacity-60" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="w-full justify-start p-6 h-auto relative rounded-xl"
                        onClick={() => {
                          window.location.href = 'mailto:shubh@1qr.co.in';
                          setShowMobileUserSheet(false);
                        }}
                      >
                        <MessageSquare size={16} className="mr-3 flex-shrink-0" />
                        <div className="text-left flex-1 min-w-0">
                          <div className="font-medium">Contact Support</div>
                          <div className="text-xs text-muted-foreground break-words">Get help with account or investment questions</div>
                        </div>
                        <ArrowUpRight size={14} className="absolute top-8 right-5 opacity-60" />
                      </Button>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="border-t border-border/50"></div>

                  {/* Professional Tools Section */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Professional Tools</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        Access advanced tools for registered investment advisors
                      </p>
                    </div>
                    
                    <Button
                      variant="outline"
                      className="w-full justify-start p-6 h-auto relative rounded-xl"
                      onClick={() => {
                        window.location.href = '/dashboard';
                        setShowMobileUserSheet(false);
                      }}
                    >
                      <Briefcase size={16} className="mr-3 flex-shrink-0" />
                      <div className="text-left flex-1 min-w-0">
                        <div className="font-medium">RIA Dashboard</div>
                        <div className="text-xs text-muted-foreground break-words">Upload tips, manage subscribers, track analytics</div>
                      </div>
                      <ArrowUpRight size={14} className="absolute top-8 right-5 opacity-60" />
                    </Button>
                  </div>

                  {/* Separator */}
                  <div className="border-t border-border/50"></div>

                  {/* Account Security Section */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Account Security</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        Secure session management to keep your investment data safe
                      </p>
                    </div>
                    
                    <div className="p-3 rounded-lg border bg-muted/50">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield size={14} className="flex-shrink-0" />
                        <span className="break-words">Logged in as: {userData?.email || 'Verified User'}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 ml-5 break-words">
                        Your session is encrypted and auto-expires for security
                      </div>
                    </div>
                    
                    <Button
                      variant="destructive"
                      className="w-full bg-red-500 hover:bg-red-200 text-white border-0 relative rounded mt-3"
                      onClick={async () => {
                        try {
                          // Sign out from Supabase
                          await supabase.auth.signOut();
                          
                          // Clear local storage
                          localStorage.removeItem('sb-bhgqrtskwqjhlhbpnqjz-auth-token');
                          localStorage.clear(); // Clear all local storage for complete logout
                          
                          // Redirect to login
                          window.location.href = '/login';
                        } catch (error) {
                          console.error('Error signing out:', error);
                          // Fallback - still clear local storage and redirect
                          localStorage.clear();
                          window.location.href = '/login';
                        }
                      }}
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out Securely
                      <Shield size={14} className="absolute top-2 right-2 opacity-60" />
                    </Button>
                    
                    <div className="text-xs text-muted-foreground text-center break-words">
                      Always sign out when using shared devices
                    </div>
                  </div>
                </>
              ) : (
                /* Not Logged In State */
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">Welcome to Lollipop</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed break-words">
                      Join thousands of investors accessing premium tips from SEBI registered advisors
                    </p>
                  </div>
                  
                  {/* Separator */}
                  <div className="border-t border-border/50"></div>
                  
                  <div className="p-4 rounded-lg border bg-primary/5">
                    <h4 className="font-medium text-foreground mb-2">What you'll get:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Premium investment tips from certified advisors</li>
                      <li>• Real-time market alerts and notifications</li>
                      <li>• Detailed analysis with entry/exit points</li>
                      <li>• Portfolio tracking and performance insights</li>
                    </ul>
                  </div>
                  
                  {/* Separator */}
                  <div className="border-t border-border/50"></div>
                  
                  <div className="space-y-3">
                    <Button
                      variant="default"
                      className="w-full py-3 relative"
                      onClick={() => {
                        window.location.href = '/login';
                        setShowMobileUserSheet(false);
                      }}
                    >
                      <LogIn size={16} className="mr-2" />
                      Sign In to Your Account
                      <ArrowUpRight size={14} className="absolute top-2 right-2 opacity-60" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full py-3 relative"
                      onClick={() => {
                        window.location.href = '/login';
                        setShowMobileUserSheet(false);
                      }}
                    >
                      <User size={16} className="mr-2" />
                      Create New Account
                      <Plus size={14} className="absolute top-2 right-2 opacity-60" />
                    </Button>
                  </div>
                  
                  <div className="text-xs text-muted-foreground text-center leading-relaxed break-words">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Information Explanation Sheet */}
        <Sheet open={showInfoSheet} onOpenChange={setShowInfoSheet}>
          <SheetContent side="right" className="max-h-[100vh] w-full lg:w-[45vw] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-4 p-4 border-b border-border bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center p-2">
                {infoSheetData?.iconComponent}
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">{infoSheetData?.title}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Your learning journey to master {infoSheetData?.title?.toLowerCase()}
                </div>
              </div>
            </div>

            {/* Timeline Learning Journey */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-green-400"></div>
                
                {/* Learning Steps */}
                <div className="space-y-6">
                  {infoSheetData?.content?.map((section, index) => (
                    <div key={index} className="relative flex items-start gap-4">
                   
                      
                      {/* Content Card */}
                      <div className="flex-1 bg-card rounded-xl border border-border p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                            index === 1 ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' :
                            index === 2 ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' :
                            'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {index + 1} of {infoSheetData?.content?.length}
                          </span>
                        </div>
                        
                        <h3 className={`text-lg font-bold mb-3 ${
                          index === 0 ? 'text-blue-600 dark:text-blue-400' :
                          index === 1 ? 'text-purple-600 dark:text-purple-400' :
                          index === 2 ? 'text-indigo-600 dark:text-indigo-400' :
                          'text-green-600 dark:text-green-400'
                        }`}>
                          {section.section}
                        </h3>
                        
                        {section.text && (
                          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                            {section.text}
                          </p>
                        )}
                        
                        {section.items && (
                          <div className="space-y-3">
                            {section.items.map((item, itemIndex) => (
                              <div key={itemIndex} className={`p-3 rounded-lg border ${
                                index === 0 ? 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800' :
                                index === 1 ? 'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800' :
                                index === 2 ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800' :
                                'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                              }`}>
                                <div className="flex items-start gap-3">
                                  <div className={`w-6 h-6 rounded-md flex items-center justify-center mt-0.5 ${
                                    index === 0 ? 'bg-blue-100 dark:bg-blue-900' :
                                    index === 1 ? 'bg-purple-100 dark:bg-purple-900' :
                                    index === 2 ? 'bg-indigo-100 dark:bg-indigo-900' :
                                    'bg-green-100 dark:bg-green-900'
                                  }`}>
                                    <div className={`w-4 h-4 ${
                                      index === 0 ? 'text-blue-600 dark:text-blue-400' :
                                      index === 1 ? 'text-purple-600 dark:text-purple-400' :
                                      index === 2 ? 'text-indigo-600 dark:text-indigo-400' :
                                      'text-green-600 dark:text-green-400'
                                    }`}>
                                      {getItemIcon(item.name, itemIndex)}
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium text-sm text-foreground mb-1">
                                      {item.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground leading-relaxed">
                                      {item.desc}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Progress indicator */}
                        <div className="mt-4 pt-3 border-t border-border/50">
                          <div className="flex items-center gap-2">
                            <CheckCircle className={`w-4 h-4 ${
                              index === 0 ? 'text-blue-600' :
                              index === 1 ? 'text-purple-600' :
                              index === 2 ? 'text-indigo-600' :
                              'text-green-600'
                            }`} />
                            <span className="text-xs text-muted-foreground">
                              {index === infoSheetData?.content?.length - 1 ? 
                                'You\'ve mastered this concept!' : 
                                'Learning step completed'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Completion Badge */}
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded border border-green-200 dark:border-green-800">
                    <Award className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">
                      Congratulations! You've completed this learning journey
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Platform Information Sheet */}
        <Sheet open={showPlatformInfoSheet} onOpenChange={setShowPlatformInfoSheet}>
          <SheetContent side="right" className="max-h-[100vh] w-full lg:w-[50vw] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-4 p-4 border-b border-border bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
              <div className="rounded-xl flex items-center justify-center">
                {platformInformationData?.iconComponent}
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">Shubh's Investment Discovery Journey</div>
                <div className="text-sm text-muted-foreground mt-1">
                  From ₹2L losses to profitable trading in 8 months
                </div>
              </div>
            </div>

            {/* Timeline Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-400 via-yellow-400 to-green-400"></div>
                
                {/* Timeline Items */}
                <div className="space-y-8">
                  
                  {/* Chapter 1: The Struggle */}
                  <div className="relative flex items-start gap-4">
                    <div className="relative z-10 w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 border-4 border-red-400 flex items-center justify-center">
                      <TrendingDown className="w-8 h-8 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-1 bg-card rounded-xl border border-border p-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">6 months ago</span>
                      </div>
                      <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">The Struggle Begins</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Software engineer from Mumbai starts trading with ₹2 lakh savings. Gets trapped in fake guru ecosystem.
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                          <Smartphone className="w-5 h-5 text-red-500 mt-0.5" />
                          <div>
                            <div className="font-medium text-sm">Instagram Addiction</div>
                            <div className="text-xs text-muted-foreground">Followed 50+ trading 'gurus' with Lamborghini photos. Paid ₹15,000 for useless courses.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                          <MessageSquare className="w-5 h-5 text-red-500 mt-0.5" />
                          <div>
                            <div className="font-medium text-sm">Telegram Chaos</div>
                            <div className="text-xs text-muted-foreground">20+ signal groups flooding phone 24/7 with zero explanation or verification.</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-100 dark:bg-red-900 rounded-lg border border-red-200 dark:border-red-800">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                            <span className="font-bold text-sm">The Damage</span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-red-600">-₹1.2L</div>
                            <div className="text-xs text-muted-foreground">23% win rate</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chapter 2: The Discovery */}
                  <div className="relative flex items-start gap-4">
                    <div className="relative z-10 w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900 border-4 border-yellow-400 flex items-center justify-center">
                      <Search className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div className="flex-1 bg-card rounded-xl border border-border p-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">4 months ago</span>
                      </div>
                      <h3 className="text-lg font-bold text-yellow-600 dark:text-yellow-400 mb-2">Discovery of Lollipop</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Friend recommends Lollipop. Skeptical but desperate, Shubh investigates this new platform.
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                          <ShieldCheck className="w-5 h-5 text-yellow-600 mt-0.5" />
                          <div>
                            <div className="font-medium text-sm">Real Transparency</div>
                            <div className="text-xs text-muted-foreground">SEBI-registered advisors with auditable track records. No fake screenshots or hidden losses.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                          <BarChart3 className="w-5 h-5 text-yellow-600 mt-0.5" />
                          <div>
                            <div className="font-medium text-sm">Verified Performance</div>
                            <div className="text-xs text-muted-foreground">Public performance data, win rates, and historical results - everything verifiable.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chapter 3: First Investment */}
                  <div className="relative flex items-start gap-4">
                    <div className="relative z-10 w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 border-4 border-blue-400 flex items-center justify-center">
                      <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 bg-card rounded-xl border border-border p-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">3 months ago</span>
                      </div>
                      <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">First Investment</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Takes the leap with remaining ₹80,000. Buys first premium signal for detailed analysis.
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Coins className="w-5 h-5 text-blue-600" />
                            <span className="font-medium text-sm">First Purchase</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-sm">10 Credits</div>
                            <div className="text-xs text-muted-foreground">₹500</div>
                          </div>
                        </div>
                        <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-sm">TCS Signal Details</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div>
                              <div className="text-muted-foreground">Entry</div>
                              <div className="font-bold text-green-600">₹245</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Target</div>
                              <div className="font-bold text-blue-600">₹285</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Stop Loss</div>
                              <div className="font-bold text-red-600">₹225</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chapter 4: Building Confidence */}
                  <div className="relative flex items-start gap-4">
                    <div className="relative z-10 w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 border-4 border-green-400 flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1 bg-card rounded-xl border border-border p-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">2 months ago</span>
                      </div>
                      <h3 className="text-lg font-bold text-green-600 dark:text-green-400 mb-2">Building Confidence</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Smart approach: buying 50 credits monthly, only investing in signals matching his risk profile.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg text-center">
                          <div className="text-2xl font-bold text-green-600">67%</div>
                          <div className="text-xs text-muted-foreground">Win Rate</div>
                        </div>
                        <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg text-center">
                          <div className="text-2xl font-bold text-green-600">+₹45K</div>
                          <div className="text-xs text-muted-foreground">Profits</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chapter 5: Transformation */}
                  <div className="relative flex items-start gap-4">
                    <div className="relative z-10 w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900 border-4 border-emerald-400 flex items-center justify-center">
                      <Award className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1 bg-card rounded-xl border border-border p-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Today</span>
                      </div>
                      <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">The Transformation</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        From losing trader to profitable investor. Disciplined approach with verified professionals.
                      </p>
                      <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-emerald-600">₹2.8L</div>
                            <div className="text-xs text-muted-foreground">Current Portfolio</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-emerald-600">+78%</div>
                            <div className="text-xs text-muted-foreground">Total Returns</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                            No more fake gurus. Only verified, profitable signals.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            
            {/* App Walkthrough Button */}
            <div className="p-4 border-t border-border bg-muted/20 space-y-2">
              <Button 
                onClick={() => {
                  setShowPlatformInfoSheet(false);
                  // Start the app walkthrough immediately
                  setTimeout(() => {
                    startWalkthroughDirectly();
                  }, 300); // Small delay to let the sheet close
                }}
                className="w-full"
                size="lg"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                App Walkthrough
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* App Walkthrough Overlay */}
        {showWalkthrough && (
          <div className="fixed inset-0 z-[9999]">
            {/* Create spotlight effect with 4 overlay rectangles */}
            {highlightPosition.width > 0 ? (
              <>
                {/* Top overlay */}
                <div 
                  className="absolute bg-black/70 backdrop-blur-sm pointer-events-none"
                  style={{
                    top: 0,
                    left: 0,
                    right: 0,
                    height: Math.max(0, highlightPosition.top - 8)
                  }}
                />
                
                {/* Bottom overlay */}
                <div 
                  className="absolute bg-black/70 backdrop-blur-sm pointer-events-none"
                  style={{
                    top: highlightPosition.top + highlightPosition.height + 8,
                    left: 0,
                    right: 0,
                    bottom: 0
                  }}
                />
                
                {/* Left overlay */}
                <div 
                  className="absolute bg-black/70 backdrop-blur-sm pointer-events-none"
                  style={{
                    top: Math.max(0, highlightPosition.top - 8),
                    left: 0,
                    width: Math.max(0, highlightPosition.left - 8),
                    height: highlightPosition.height + 16
                  }}
                />
                
                {/* Right overlay */}
                <div 
                  className="absolute bg-black/70 backdrop-blur-sm pointer-events-none"
                  style={{
                    top: Math.max(0, highlightPosition.top - 8),
                    left: highlightPosition.left + highlightPosition.width + 8,
                    right: 0,
                    height: highlightPosition.height + 16
                  }}
                />
                
                {/* Highlight border around the element */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: highlightPosition.top - 4,
                    left: highlightPosition.left - 4,
                    width: highlightPosition.width + 8,
                    height: highlightPosition.height + 8,
                    border: '3px solid rgb(59, 130, 246)',
                    borderRadius: '8px',
                    boxShadow: `
                      0 0 20px rgba(59, 130, 246, 0.6),
                      inset 0 0 20px rgba(59, 130, 246, 0.1)
                    `,
                    transition: 'all 0.3s ease-in-out',
                    animation: 'walkthroughPulse 2s infinite'
                  }}
                />
              </>
            ) : (
              /* Fallback full overlay if no element found */
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            )}

            {/* Walkthrough Card */}
            <div 
              className="absolute w-full max-w-md transition-all duration-500 ease-out z-[10002] pointer-events-auto"
              style={{
                top: cardPosition.top,
                left: cardPosition.left,
                transform: cardPosition.top === '50%' ? 'translate(-50%, -50%)' : 'none'
              }}
            >
              <Card className="bg-background border-2 border-primary shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg">
                        {walkthroughSteps[walkthroughStep]?.icon || (
                          <span className="font-bold text-sm">{walkthroughStep + 1}</span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg font-semibold">{walkthroughSteps[walkthroughStep]?.title}</CardTitle>
                        </div>
                        <div className="text-xs text-muted-foreground font-medium">
                          Step {walkthroughStep + 1} of {walkthroughSteps.length}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={endWalkthrough} className="hover:bg-destructive/10">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {typeof walkthroughSteps[walkthroughStep]?.content === 'function' 
                      ? walkthroughSteps[walkthroughStep].content() 
                      : walkthroughSteps[walkthroughStep]?.content}
                  </p>
                  
                  {/* Interactive indicator */}
                  {walkthroughSteps[walkthroughStep]?.interactive ? (
                    <div className="flex items-center gap-2 text-xs text-primary font-medium bg-primary/10 rounded-lg p-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      Click the highlighted element to continue or use Next button
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                      Element highlighted for reference
                    </div>
                  )}
                  
                  {/* Progress bar */}
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${((walkthroughStep + 1) / walkthroughSteps.length) * 100}%` }}
                    />
                  </div>

                  {/* Keyboard shortcuts */}
                  <div className="text-xs text-muted-foreground flex items-center justify-center gap-4 pt-1">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1 py-0.5 bg-muted rounded text-xs">←</kbd>
                      <kbd className="px-1 py-0.5 bg-muted rounded text-xs">→</kbd>
                      Navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Esc</kbd>
                      Exit
                    </span>
                  </div>
                  
                  {/* Navigation buttons */}
                  <div className="flex justify-between gap-3 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={previousWalkthroughStep}
                      disabled={walkthroughStep === 0}
                      className="min-w-[80px]"
                    >
                      <ArrowLeft className="w-3 h-3 mr-1" />
                      Previous
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={endWalkthrough} className="text-muted-foreground hover:text-foreground">
                        Skip Tour
                      </Button>
                      <Button size="sm" onClick={nextWalkthroughStep} className="min-w-[80px]">
                        {walkthroughStep === walkthroughSteps.length - 1 ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Finish
                          </>
                        ) : (
                          <>
                            Next
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Click outside to close - only on overlay areas */}
            <div 
              className="absolute inset-0 pointer-events-auto" 
              onClick={(e) => {
                // Only close if clicking on the overlay, not on highlighted element or card
                const clickedElement = e.target;
                const isOverlay = clickedElement.classList.contains('bg-black/70') || 
                                clickedElement === e.currentTarget;
                if (isOverlay) {
                  endWalkthrough();
                }
              }}
              style={{ cursor: 'pointer' }}
            />
          </div>
        )}

        {/* Welcome Component - Dialog on Desktop, Sheet on Mobile */}
        {isMobile ? (
          // Mobile Sheet
          <Sheet open={showWelcomeSheet} onOpenChange={setShowWelcomeSheet}>
          <SheetContent 
            side="bottom" 
            className="max-h-[60vh] border-0 bg-background shadow-2xl p-0 overflow-hidden"
            closeButton={false}
          >
            <div className="relative h-full flex flex-col">
              <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                {/* Header */}
                <div className="flex-shrink-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <img src={LollipopSVG} alt="Lollipop" className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          Welcome to Lollipop!
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Your intelligent investment companion
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Discover expert investment tips from SEBI Registered Investment Advisors and make informed decisions with our comprehensive platform. 
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs text-primary bg-primary/10 rounded-lg p-3">
                      <PlayCircle size={14} className="text-primary flex-shrink-0" />
                      <span>
                        Our interactive walkthrough will show you all the key features in just 2 minutes.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex-shrink-0 mt-6">
                  <div className="flex flex-col gap-3">
                    <Button 
                      onClick={handleStartWalkthrough}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 h-14 p-3"
                      size="lg"
                    >
                      <PlayCircle size={16} className="mr-2" />
                      Start Walkthrough
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={handleSkipWalkthrough}
                      className="flex-1 border-border hover:bg-muted/60 h-14 p-3"
                      size="lg"
                    >
                      <ArrowRight size={16} className="mr-2" />
                      Skip for Now
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      onClick={handleNeverShowAgain}
                      className="text-muted-foreground hover:text-foreground hover:bg-muted/60 text-xs h-12"
                      size="sm"
                    >
                      Don't show again
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        ) : (
          // Desktop Dialog
          <Dialog open={showWelcomeSheet} onOpenChange={setShowWelcomeSheet}>
            <DialogContent className="sm:max-w-md bg-background border border-border shadow-2xl">
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <img src={LollipopSVG} alt="Lollipop" className="w-5 h-5" />
                  </div>
                  <div>
                    <DialogTitle className="text-lg font-semibold text-foreground">
                      Welcome to Lollipop!
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground">
                      Your intelligent investment companion
                    </p>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-4">
                {/* Content */}
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Discover expert investment tips from SEBI Registered Investment Advisors and make informed decisions with our comprehensive platform. 
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-primary bg-primary/10 rounded-lg p-3">
                    <PlayCircle size={14} className="text-primary flex-shrink-0" />
                    <span>
                      Our interactive walkthrough will show you all the key features in just 2 minutes.
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-2">
                  <Button 
                    onClick={handleStartWalkthrough}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 h-12 p-3"
                  >
                    <PlayCircle size={16} className="mr-2" />
                    Start Walkthrough
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={handleSkipWalkthrough}
                      className="flex-1 border-border hover:bg-muted/60 h-10 p-3"
                    >
                      <ArrowRight size={16} className="mr-2" />
                      Skip for Now
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      onClick={handleNeverShowAgain}
                      className="text-muted-foreground hover:text-foreground hover:bg-muted/60 text-xs h-10"
                      size="sm"
                    >
                      Don't show again
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        
 
    </div>
  );
}