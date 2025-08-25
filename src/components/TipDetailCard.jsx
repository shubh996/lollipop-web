import React, { useRef, useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import LollipopSVG from "../assets/icons/lollipop.svg";

import { 
  Share, 
  Bookmark, 
  Flag, 
  Lock, 
  LockOpen, 
  ChevronDown, 
  ChevronUp,
  ExternalLink,
  FileText,
  Tag,
  Repeat,
  Package,
  TrendingUp,
  AlertCircle,
  Clock,
  PieChart,
  Zap,
  BarChart3,
  Smile,
  Activity,
  CheckCircle,
  Grid3X3,
  Droplets,
  DollarSign,
  Gauge,
  Building,
  Archive,
  AlertTriangle,
  Star,
  Trophy,
  Lightbulb,
  ChartLine,
  Loader2,
  HelpCircle,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import TradingViewWidget from './TradingViewWidget';

// Mock SVG components
const SVGIcon = ({ name, width = 20, height = 20, fill = "currentColor", className = "" }) => {
  const iconMap = {
    'lollipop': '🍭',
    'markets': '📊',
    'bulb': '💡',
    'ai': '🤖',
  };
  
  return (
    <span 
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width, height, fontSize: `${Math.min(width, height) * 0.8}px` }}
    >
      {iconMap[name] || '●'}
    </span>
  );
};

// Mock TradingView component
const TradingView = ({ height, width, symbol, compareSymbol, theme, onError }) => {
  return (
    <div 
      className={`w-full flex items-center justify-center border rounded ${
        theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300'
      }`}
      style={{ height: height * 0.53 }}
    >
      <TradingViewWidget symbol={symbol || 'AAPL'} compareSymbol={compareSymbol || 'MSFT'} />
    </div>
  );
};

// Field explanations and icons
const FIELD_EXPLANATIONS = {
  'Entry Price': 'The price at which the advisor suggests entering the position. This is the recommended buy price for the asset.',
  'Stop Loss': 'A stop loss is a pre-set price at which the position should be sold to limit potential losses. It helps manage risk.',
  'Duration': 'The expected holding period for this tip. It indicates how long the advisor expects the position to be held.',
  'Allocation': 'The suggested portion of your portfolio to allocate to this tip. Helps with diversification and risk management.',
  'Catalyst': 'A specific event or factor expected to drive the asset\'s price movement, such as earnings, news, or macro events.',
  'Valuation': 'The advisor\'s view on whether the asset is undervalued, overvalued, or fairly valued based on analysis.',
  'Sentiment': 'The overall market or advisor sentiment (bullish, bearish, neutral) regarding this asset.',
  'Technical': 'Technical analysis signals or patterns supporting this tip, such as moving averages, RSI, or chart patterns.',
  'Confidence': 'How confident the advisor is in this tip, usually on a scale or as a qualitative assessment.',
  'Diversification': 'How this tip fits into a diversified portfolio. Diversification helps reduce risk.',
  'Liquidity': 'How easily the asset can be bought or sold without affecting its price. High liquidity is generally preferred.',
  'Exp. Return': 'The expected return from this tip, based on the advisor\'s analysis and projections.',
  'Performance': 'Historical or expected performance of the asset or similar tips.',
  'Sector': 'The sector or industry to which the asset belongs, e.g., Technology, Healthcare.',
  'Holding': 'Indicates if the tip is a new buy, hold, or sell recommendation.',
  'Risk': 'The level of risk associated with this tip, such as low, medium, or high.',
  'Conviction': 'The strength of the advisor\'s belief in this tip, often based on research or experience.',
  'Win Rate': 'The historical success rate of similar tips or strategies.',
  'Strategy': 'The overall investment or trading strategy behind this tip, such as momentum, value, or growth.',
};

const FIELD_ICONS = {
  'Symbol': Tag,
  'Compared To': Repeat,
  'Asset Type': Package,
  'Entry Price': TrendingUp,
  'Stop Loss': AlertCircle,
  'Duration': Clock,
  'Allocation': PieChart,
  'Catalyst': Zap,
  'Valuation': BarChart3,
  'Sentiment': Smile,
  'Technical': Activity,
  'Confidence': CheckCircle,
  'Diversification': Grid3X3,
  'Liquidity': Droplets,
  'Exp. Return': DollarSign,
  'Performance': Gauge,
  'Sector': Building,
  'Holding': Archive,
  'Risk': AlertTriangle,
  'Conviction': Star,
  'Win Rate': Trophy,
  'Strategy': Lightbulb,
};

const timeAgo = (dateString) => {
  const now = new Date();
  const created = new Date(dateString);
  const diffMs = now.getTime() - created.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
};

// Mock tip data
const mockTip = {
  id: '1',
  tip: 'Strong bullish momentum expected in tech stocks this week with potential for 15-20% gains',
  symbol: 'AAPL',
  asset_type: 'Equity',
  sector: 'Technology',
  strategy: 'Bullish',
  risk: 'Medium',
  expected_return: '15%',
  name: 'John Doe',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  created_at: new Date().toISOString(),
  compared: 'SPY',
  entry_price: '$150.00',
  exit_price: '$140.00',
  target_duration: '2-3 weeks',
  allocation: '5-10%',
  catalyst: 'Q4 Earnings',
  valuation: 'Undervalued',
  sentiment: 'Bullish',
  technical: 'Breaking resistance',
  confidence: 'High',
  diversification: 'Tech exposure',
  liquidity: 'High',
  performance: 'Outperforming',
  holding: 'Buy',
  conviction: 'Strong',
  win_rate: '68%',
  successRate: '68%'
};

const mockUserData = {
  id: 'user1',
  credits: 25,
  unlockedTips: []
};

function FundamentalTabContent({ tip, isDarkTheme, onlyCards = false }) {
  // Example sources data (replace with real data as needed)
  const sources = [
    { type: 'url', label: 'Company Website', value: 'https://example.com' },
    { type: 'url', label: 'News Article', value: 'https://news.com/article' },
    { type: 'document', label: 'Research PDF', value: 'Q2-2025-Research.pdf' },
  ];

  // Menubar with share, bookmark, report
  const Menubar = () => (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-4 px-3 py-2 flex items-center justify-end gap-2">
      <Button variant="ghost" size="sm" onClick={handleBookmark} disabled={bookmarkLoading}>
        {bookmarkLoading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : bookmarkFilled ? (
          <Bookmark size={20} fill="currentColor" />
        ) : (
          <Bookmark size={20} />
        )}
      </Button>
      <Button variant="ghost" size="sm" onClick={handleReport}>
        <Flag size={20} />
      </Button>
      <Button variant="ghost" size="sm" onClick={handleShare}>
        <Share size={20} />
      </Button>
    </div>
  );

  // Sources card
  const SourcesSection = () => (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-4">
      <div className="px-5 py-3 border-b rounded-t-2xl bg-gray-50">
        <span className="font-bold text-lg">Sources</span>
      </div>
      <div className="px-5 py-4 divide-y">
        {sources.map((source, idx) => (
          <div key={idx} className="flex items-center py-2 gap-3">
            <div>
              {source.type === 'url' ? (
                <ExternalLink size={16} className="opacity-70" />
              ) : (
                <FileText size={16} className="opacity-70" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{source.label}</p>
              <p className="text-xs text-muted-foreground truncate">{source.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  const [infoSheetOpen, setInfoSheetOpen] = useState(false);
  const [sheetLabel, setSheetLabel] = useState('');
  const [sheetValue, setSheetValue] = useState('');
  const [sheetExplanation, setSheetExplanation] = useState('');
  const [bookmarkFilled, setBookmarkFilled] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  // Table fields
  const fields = [
    { key: 'symbol', label: 'Symbol' },
    { key: 'compared', label: 'Compared To' },
    { key: 'asset_type', label: 'Asset Type' },
    { key: 'entry_price', label: 'Entry Price' },
    { key: 'exit_price', label: 'Stop Loss' },
    { key: 'target_duration', label: 'Duration' },
    { key: 'allocation', label: 'Allocation' },
    { key: 'catalyst', label: 'Catalyst' },
    { key: 'valuation', label: 'Valuation' },
    { key: 'sentiment', label: 'Sentiment' },
    { key: 'technical', label: 'Technical' },
    { key: 'confidence', label: 'Confidence' },
    { key: 'diversification', label: 'Diversification' },
    { key: 'liquidity', label: 'Liquidity' },
    { key: 'expected_return', label: 'Exp. Return' },
    { key: 'performance', label: 'Performance' },
    { key: 'sector', label: 'Sector' },
    { key: 'holding', label: 'Holding' },
    { key: 'risk', label: 'Risk' },
    { key: 'conviction', label: 'Conviction' },
    { key: 'win_rate', label: 'Win Rate' },
    { key: 'strategy', label: 'Strategy' },
  ];

  const handleBookmark = async () => {
    setBookmarkLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBookmarkFilled(!bookmarkFilled);
      setBookmarkLoading(false);
    }, 500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Investment Tip',
          text: tip?.tip || 'Check out this investment tip!',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleReport = () => {
    if (window.confirm('Are you sure you want to report this tip?')) {
      alert('Thank you for reporting. Our team will review this tip.');
    }
  };

  // Reusable section components
  const InvestmentTipSection = () => (
    <div className="mb-4 pb-4 border-b">
      <div className="flex items-center gap-3 mb-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src={tip?.avatar} alt={tip?.name} />
          <AvatarFallback>{tip?.name?.[0]}</AvatarFallback>
        </Avatar>
        <span className="font-semibold text-base">{tip?.name}</span>
        <span className="text-xs text-muted-foreground ml-2">{timeAgo(tip?.created_at)}</span>
      </div>
      <div>
        <p className="text-[15px] leading-snug mb-2">{tip?.tip || 'No data available'}</p>
      </div>
    </div>
  );


if (onlyCards) {
    return (
      <div style={{  gap: '16px'}}>
        {/* Advisor Card */}
        <div style={{background:'#fff',borderRadius:16,border:'1px solid #e5e7eb',boxShadow:'0 1px 4px rgba(0,0,0,0.03)',marginBottom:12}}>
          <div style={{padding:5, paddingLeft:15, borderBottom:'1px solid #e5e7eb', borderTopLeftRadius:16, borderTopRightRadius:16, background:'#f3f3f3', textAlign:'center'}}>
            <span style={{fontWeight:700,fontSize:13.4, textAlign:'center', display:'block'}}>Investment Advisor</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8,padding:'12px 16px'}}>
            <Avatar style={{width:32,height:32}}>
              <AvatarImage src={tip?.avatar} alt={tip?.name} />
              <AvatarFallback>{tip?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div style={{fontWeight:600,fontSize:14}}>{tip?.name}</div>
              <div style={{fontSize:12,color:'#6b7280'}}>SEBI Registered</div>
            </div>
          </div>
        </div>
        {/* Investment Tip Card */}
        <div style={{background:'#fff',borderRadius:16,border:'1px solid #e5e7eb',boxShadow:'0 1px 4px rgba(0,0,0,0.03)',marginBottom:12}}>
          <div style={{padding:5, paddingLeft:15, borderBottom:'1px solid #e5e7eb', borderTopLeftRadius:16, borderTopRightRadius:16, background:'#f3f3f3', textAlign:'center'}}>
            <span style={{fontWeight:700,fontSize:13.4, textAlign:'center', display:'block'}}>Investment Tip</span>
          </div>
          <div style={{padding:'12px 16px'}}>
            <div style={{fontSize:14,fontWeight:500,marginBottom:4,lineHeight:1.5}}>{tip?.tip}</div>
            <div style={{fontSize:12,color:'#9ca3af',fontWeight:500,marginTop:4}}>{timeAgo(tip?.created_at)}</div>
          </div>
        </div>
        {/* Trade Config Table Card */}
        <div style={{background:'#fff',borderRadius:16,border:'1px solid #e5e7eb',boxShadow:'0 1px 4px rgba(0,0,0,0.03)',marginBottom:12}}>
          <div style={{padding:5, paddingBottom:7.5, paddingLeft:15, borderBottom:'1px solid #e5e7eb', borderTopLeftRadius:16, borderTopRightRadius:16, background:'#f3f3f3', textAlign:'center'}}>
            <span style={{fontWeight:700,fontSize:13.4, textAlign:'center', display:'block'}}>Investment Configuration</span>
          </div>
          

          <div>
            {fields.map(({ key, label }) => {
              const value = tip[key];
              if (value === undefined || value === null || value === '') return null;
              const displayValue = String(value)
                .replace(/_/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
              const IconComponent = FIELD_ICONS[label] || HelpCircle;
              return (
                <div key={key} style={{display:'flex',alignItems:'center',padding:10,borderBottom:'1px solid #f3f4f6'}}>
                  <span style={{display:'flex',alignItems:'center',gap:6,color:'#374151',minWidth:100}}>
                    <IconComponent size={15} style={{opacity:0.7}} />
                    <span style={{fontSize:12,fontWeight:500}}>{label}</span>
                  </span>
                  <span style={{marginLeft:'auto',fontSize:12,fontWeight:label==='Diversification'?700:500}}>{displayValue}</span>
                </div>
              );
            })}
          </div>
        </div>
        {/* Sources Card */}
        <div style={{background:'#fff',borderRadius:16,border:'1px solid #e5e7eb',boxShadow:'0 1px 4px rgba(0,0,0,0.03)',marginBottom:12}}>
          <div style={{padding:5, paddingLeft:15, borderBottom:'1px solid #e5e7eb', borderTopLeftRadius:16, borderTopRightRadius:16, background:'#f3f3f3', textAlign:'center'}}>
            <span style={{fontWeight:700,fontSize:13.4, textAlign:'center', display:'block'}}>Sources</span>
          </div>
          <div style={{padding:'12px 16px'}}>
            {sources.map((source, idx) => (
              <div key={idx} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 0',borderBottom:idx!==sources.length-1?'1px solid #f3f4f6':'none'}}>
                <div>
                  {source.type === 'url' ? (
                    <ExternalLink size={14} style={{opacity:0.7}} />
                  ) : (
                    <FileText size={14} style={{opacity:0.7}} />
                  )}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{fontSize:13,fontWeight:500,margin:0,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{source.label}</p>
                  <p style={{fontSize:12,color:'#6b7280',margin:0,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{source.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Menubar Card */}
          <div style={{background:'#fff',borderRadius:16,border:'1px solid #e5e7eb',boxShadow:'0 1px 4px rgba(0,0,0,0.03)',marginBottom:12,padding:'4px 8px',display:'flex',alignItems:'center',justifyContent:'flex-end',gap:6}}>
          <Menubar />
        </div>
        {/* Info Sheet (unchanged) */}
        <Sheet open={infoSheetOpen} onOpenChange={setInfoSheetOpen}>
          <SheetContent side="bottom" style={{height:234}}>
            <SheetHeader style={{textAlign:'center'}}>
              <SheetTitle>{sheetLabel}</SheetTitle>
            </SheetHeader>
            <div style={{marginTop:16,textAlign:'center'}}>
              {sheetExplanation && (
                <p style={{fontSize:14,opacity:0.7}}>{sheetExplanation}</p>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }
  // fallback: original single column for mobile/legacy
  return (
    <div className="w-full max-w-md mx-auto p-2">
      {/* Menubar Card */}
      <Menubar />
      {/* TradingView Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-4 overflow-hidden">
        <div className="px-5 py-3 border-b rounded-t-2xl bg-gray-50">
          <span className="font-bold text-lg">Chart</span>
        </div>
        <div className="px-2 pt-4 pb-4">
          <TradingView
            height={220}
            width={'100%'}
            symbol={tip?.symbol}
            compareSymbol={tip?.compared}
            theme={isDarkTheme ? 'dark' : 'light'}
            onError={(e) => console.error('TradingView error:', e)}
          />
        </div>
      </div>
      {/* Advisor Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-4">
        <div className="px-5 py-3 border-b rounded-t-2xl bg-gray-50">
          <span className="font-bold text-lg">Investment Advisor</span>
        </div>
        <div className="flex items-center gap-3 px-5 py-4">
          <Avatar className="w-9 h-9">
            <AvatarImage src={tip?.avatar} alt={tip?.name} />
            <AvatarFallback>{tip?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-base">{tip?.name}</div>
            <div className="text-xs text-muted-foreground">SEBI Registered</div>
          </div>
        </div>
      </div>
      {/* Investment Tip Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-4">
        <div className="px-5 py-3 border-b rounded-t-2xl bg-gray-50">
          <span className="font-bold text-lg">Investment Tip</span>
        </div>
        <div className="px-5 py-4">
          <div className="text-base font-medium mb-2" style={{lineHeight:1.5}}>{tip?.tip}</div>
          <div className="text-sm text-gray-400 font-medium mt-2">{timeAgo(tip?.created_at)}</div>
        </div>
      </div>
      {/* Trade Config Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-4">
        <div className="px-5 py-3 border-b rounded-t-2xl bg-gray-50 flex items-center">
          <span className="font-bold text-lg">Label</span>
          <span className="ml-auto font-bold text-lg">Value</span>
        </div>
        <div className="divide-y">
          {fields.map(({ key, label }) => {
            const value = tip[key];
            if (value === undefined || value === null || value === '') return null;
            const displayValue = String(value)
              .replace(/_/g, ' ')
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(' ');
            const IconComponent = FIELD_ICONS[label] || HelpCircle;
            return (
              <div key={key} className="flex items-center px-5 py-3">
                <span className="flex items-center gap-2 text-gray-700 min-w-[120px]">
                  <IconComponent size={18} className="opacity-70" />
                  <span className="text-base font-medium">{label}</span>
                </span>
                <span className={
                  'ml-auto text-base' +
                  (label === 'Diversification' ? ' font-bold' : '')
                }>
                  {displayValue}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Sources Card */}
      <SourcesSection />
      {/* Info Sheet (unchanged) */}
      <Sheet open={infoSheetOpen} onOpenChange={setInfoSheetOpen}>
        <SheetContent side="bottom" className="h-[234px]">
          <SheetHeader className="text-center">
            <SheetTitle>{sheetLabel}</SheetTitle>
          </SheetHeader>
          <div className="mt-4 text-center">
            {sheetExplanation && (
              <p className="text-sm opacity-70">{sheetExplanation}</p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
       
}

export default function TipDetailCard({ tip: propTip, userData: propUserData, credits: propCredits, isDarkTheme: propIsDarkTheme }) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [tip, setTip] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Try to get tip data from URL parameters
    const tipData = searchParams.get('data');
    if (tipData) {
      try {
        let parsedTip;
        
        // Check if it's already an object
        if (typeof tipData === 'object' && tipData !== null) {
          parsedTip = tipData;
        } else {
          // Try parsing as JSON first before decoding
          try {
            parsedTip = JSON.parse(tipData);
          } catch {
            // If direct JSON parse fails, try decoding first
            try {
              const decodedString = decodeURIComponent(tipData);
              parsedTip = JSON.parse(decodedString);
            } catch (decodeError) {
              // If both parsing attempts fail, try a more lenient decode
              try {
                // Replace problematic characters and try parsing again
                const cleanedString = tipData.replace(/[^-_.!~*'()a-zA-Z0-9;/?:@&=+$,]/g, '');
                const decodedString = decodeURIComponent(cleanedString);
                parsedTip = JSON.parse(decodedString);
              } catch {
                throw new Error('Could not parse tip data in any format');
              }
            }
          }
        }

        if (parsedTip && typeof parsedTip === 'object') {
          setTip(parsedTip);
          setError(null);
        } else {
          throw new Error('Invalid tip data structure');
        }
      } catch (error) {
        console.error('Error parsing tip data:', error);
        setError('Could not load tip data. Please try again.');
      }
    } else if (propTip) {
      // Use props if available
      setTip(propTip);
      setError(null);
    } else {
      setError('No tip data available');
    }
  }, [searchParams, propTip]);

  const [isDarkTheme, setIsDarkTheme] = useState(propIsDarkTheme || false);
  const [loadingUnlock, setLoadingUnlock] = useState(false);
  const [credits, setCredits] = useState(propCredits || (propUserData?.credits || 0));
  const [userData, setUserData] = useState(propUserData || { unlockedTips: [] });

  // Handle loading and error states
  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }
  
  if (!tip) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center p-4">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading tip details...</p>
        </div>
      </div>
    );
  }
  
  // Rest of your existing component code
  const isPaywalled = (tip) => {
    if (!tip?.created_at) return false;
    const now = new Date();
    const created = new Date(tip.created_at);
    return (now.getTime() - created.getTime()) < 24 * 60 * 60 * 1000;
  };

  const handleUnlock = async () => {
    if (!userData?.credits && !credits) {
      alert('Insufficient credits. You have no credits left to unlock tips.');
      return;
    }
    
    setLoadingUnlock(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUnlockedTips = [...(userData?.unlockedTips || []), tip.id];
      const newCredits = credits - 1;
      
      setUserData({ ...userData, unlockedTips: newUnlockedTips, credits: newCredits });
      setCredits(newCredits);
    } catch (err) {
      alert('Failed to unlock tip');
      console.error('Unlock error:', err);
    } finally {
      setLoadingUnlock(false);
    }
  };

  const isLocked = isPaywalled(tip) && !userData?.unlockedTips?.includes(tip.id);

  if (isLocked) {
    // ...existing code for unlock screen...
    return (
      <div className={isDarkTheme ? 'dark' : ''}>
        <div className="min-h-screen bg-background text-foreground">
          {/* ...existing code for unlock screen... */}
          <div className="flex flex-col min-h-screen">
            <div className="flex-1 p-6 flex flex-col justify-between">
              {/* Header */}
              <div className="text-center space-y-4">
                <Lock size={30} className="mx-auto text-primary" />
                <h2 className="text-lg font-bold">Why is this tip locked?</h2>
                <p className="text-sm opacity-70 max-w-md mx-auto">
                  Tips are locked for 24 hours after posting to support our expert advisors and platform.
                </p>
                {/* Tip Preview Card */}
                <Card className="p-4 bg-muted/50 shadow-sm max-w-md mx-auto">
                  <button className="flex flex-col items-center space-y-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={tip?.avatar} alt={tip?.name} />
                        <AvatarFallback>{tip?.name?.[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-bold">{tip?.name}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <SVGIcon name="bulb" width={16} height={16} />
                        <span>SEBI Registered</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ChartLine size={16} />
                        <span>{tip?.successRate || '52%'} Success Rate</span>
                      </div>
                    </div>
                  </button>
                  <Separator className="mb-4" />
                  <div className="text-left space-y-2">
                    <h4 className="text-sm font-bold">{tip?.symbol || tip?.asset_type}</h4>
                    <p className="text-xs opacity-70 line-clamp-2">{tip?.tip}</p>
                  </div>
                  <Separator className="mt-4 mb-4" />
                  {/* Cost Breakdown */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold">Unlock Cost Breakdown</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img src={LollipopSVG} alt="Lollipop" style={{ width: 17, height: 17 }} />
                          <span>Base unlock for all tips</span>
                        </div>
                        <span className="font-bold">1</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            <img src={LollipopSVG} alt="Lollipop" style={{ width: 17, height: 17 }} /><img src={LollipopSVG} alt="Lollipop" style={{ width: 17, height: 17 }} />
                          </div>
                          <span>SEBI Registered Advisor</span>
                        </div>
                        <span className="font-bold">2</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            <img src={LollipopSVG} alt="Lollipop" style={{ width: 17, height: 17 }} />
                            <img src={LollipopSVG} alt="Lollipop" style={{ width: 17, height: 17 }} />
                          </div>
                          <span>High Win Rate</span>
                        </div>
                        <span className="font-bold">2</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <img src={LollipopSVG} alt="Lollipop" style={{ width: 17, height: 17 }} />
                        ))}
                      </div>
                      <span className="text-base font-bold">5</span>
                    </div>
                  </div>
                </Card>
              </div>
              {/* CTA */}
              <div className="text-center space-y-3">
                <Button 
                  size="lg" 
                  className="w-full/3"
                  onClick={handleUnlock}
                  disabled={loadingUnlock}
                >
                  {loadingUnlock ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Unlocking...
                    </>
                  ) : (
                    'Unlock Now'
                  )}
                </Button>
                <p className="text-sm">You have {credits} Lollipops left</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2-column layout: left 75% chart, right 25% scrollable for all other cards
  return (
    <div style={{minHeight:'100vh',background:'#f9fafb',
    color:'#111',display:'flex', margin:-10, marginTop:0,
    flexDirection:'row',width:'100vw',height:'100vh'}}>
      
      
      
      {/* Left: Chart (70%) */}
        <div style={{height:'100%', width:'75%',maxWidth:'75vw',display:'flex',flexDirection:'column',justifyContent:'center',padding:8, marginLeft:10}}>
          {/* Chart Card (end to end, big) */}
          <div style={{background:'#fff',borderRadius:16,border:'1px solid #e5e7eb',boxShadow:'0 1px 4px rgba(0,0,0,0.03)',overflow:'hidden',height:'100%',display:'flex',flexDirection:'column'}}>
            <div style={{padding:10, borderBottom:'1px solid #e5e7eb', borderTopLeftRadius:16, borderTopRightRadius:16, background:'#f3f3f3', textAlign:'center'}}>
              <span style={{fontWeight:700,fontSize:13.4, textAlign:'center', display:'block'}}>Chart</span>
            </div>
            <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',margin:-2,marginTop:-5}}>
              <TradingView
                height={window.innerHeight * 1.75}
                width={'100%'}
                symbol={tip?.symbol}
                compareSymbol={tip?.compared}
                theme={isDarkTheme ? 'dark' : 'light'}
                onError={(e) => console.error('TradingView error:', e)}
              />
            </div>
          </div>
        </div>
 
      {/* Right: Scrollable Cards (30%) */}
      <div style={{width:'30vw',maxWidth:500,minWidth:320,height:'100vh',overflowY:'auto',background:'#f9fafb',borderLeft:'1px solid #f3f4f6',display:'flex',flexDirection:'column',padding:10,gap:16}}>
        <FundamentalTabContent tip={tip} isDarkTheme={isDarkTheme} onlyCards />
      </div>



    </div>
  );
}