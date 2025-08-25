
import React, { useState, useEffect } from 'react';
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { 
  Mail, 
  Twitter, 
  Instagram, 
  Linkedin, 
  FileText, 
  Eye, 
  Loader2,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import supabase from './lib/supabaseClient';



// Circular Progress Component
const CircularProgress = ({ value, size = 36 }) => {
  const radius = (size - 4) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  // Use dark shades for progress colors
  const getColor = (val) => {
    if (val >= 80) return '#166534'; // dark green
    if (val >= 60) return '#854d0e'; // dark yellow/brown
    return '#991b1b'; // dark red
  };

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="3"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(value)}
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="absolute text-xs font-bold text-gray-800">
        {Math.round(value)}
      </span>
    </div>
  );
};

// Time ago utility function
const timeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

// News Tab Component
function NewsTab({ name, theme, search }) {
  const [userTips, setUserTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) return;
    setLoading(true);

    const fetchTips = async () => {

        console.log('Fetching tips for:', name);

      try {
        const { data, error } = await supabase
          .from('investment_tips')
          .select('*')
          .eq('name', name)
          .order('created_at', { ascending: false });

          console.log('Supabase response:', data, error);
        
        if (error) {
          console.log('Supabase error:', error.message);
          setUserTips([]);
        } else {
            console.log('Fetched tips:', data);
          setUserTips(data || []);
        }
      } catch (err) {
        console.log('Fetch error:', err);
        setUserTips([]);
      }
      setLoading(false);
    };

    fetchTips();
  }, [name]);

  const handleTipClick = (tip) => {
    console.log('Navigate to tip:', tip);
  };

  const handleShowTotal = () => {
    alert(`Total News\n${userTips.length} investment tips from ${name}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="font-semibold">Loading tips...</span>
        </div>
      </div>
    );
  }

  // Table columns config for shadcn Table (Advisor column removed)
  const columns = [
    { key: 'time', label: 'Time', minWidth: 100 },
    { key: 'symbol', label: 'Symbol', minWidth: 90 },
    { key: 'performance', label: 'Performance', minWidth: 120 },
    { key: 'chart', label: 'Chart', minWidth: 80 },
    { key: 'winRate', label: 'Win Rate %', minWidth: 90 },
    { key: 'conviction', label: 'Conviction', minWidth: 110 },
    { key: 'holding', label: 'Holding', minWidth: 110 },
    { key: 'risk', label: 'Risk', minWidth: 110 },
    { key: 'entryPrice', label: 'Entry Price', minWidth: 110 },
    { key: 'stopLoss', label: 'Stop Loss', minWidth: 110 },
    { key: 'duration', label: 'Duration', minWidth: 110 },
    { key: 'allocation', label: 'Allocation', minWidth: 110 },
    { key: 'catalyst', label: 'Catalyst', minWidth: 110 },
    { key: 'valuation', label: 'Valuation', minWidth: 110 },
    { key: 'sentiment', label: 'Sentiment', minWidth: 110 },
    { key: 'technical', label: 'Technical', minWidth: 110 },
    { key: 'sector', label: 'Sector', minWidth: 110 },
  ];

  // Helper functions for badge/icon rendering
  // Use custom style for lighter badge backgrounds
  const getConvictionStyle = (conviction) => {
    switch (conviction) {
      case 'High': return { background: '#bbf7d0', color: '#166534' };
      case 'Medium': return { background: '#fef9c3', color: '#854d0e' };
      case 'Low': return { background: '#fecaca', color: '#991b1b' };
      default: return { background: '#f3f4f6', color: '#374151' };
    }
  };
  const getRiskStyle = (risk) => {
    switch (risk) {
      case 'Low': return { background: '#bbf7d0', color: '#166534' };
      case 'Medium': return { background: '#fef9c3', color: '#854d0e' };
      case 'High': return { background: '#fecaca', color: '#991b1b' };
      default: return { background: '#f3f4f6', color: '#374151' };
    }
  };
  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'Bullish': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'Bearish': return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'Neutral': return <Minus className="h-4 w-4 text-gray-600" />;
      default: return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  // Filter tips based on search input
  const filteredTips = search && search.trim().length > 0
    ? userTips.filter(tip => {
        const s = search.toLowerCase();
        return (
          (tip.symbol && tip.symbol.toLowerCase().includes(s)) ||
          (tip.tip && tip.tip.toLowerCase().includes(s)) ||
          (tip.sector && tip.sector.toLowerCase().includes(s)) ||
          (tip.name && tip.name.toLowerCase().includes(s))
        );
      })
    : userTips;

  const tableData = filteredTips.map((tip, tipIndex) => {
    const winRate = 65 + (tipIndex % 20);
    const conviction = ['High', 'Medium', 'Low'][tipIndex % 3];
    const holding = ['1D', '1W', 'Swing', 'Long-Term'][tipIndex % 4];
    const risk = ['Low', 'Medium', 'High'][tipIndex % 3];
    const score = 60 + (tipIndex % 40);
    return {
      advisor: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight:5 }}>
          <img src={tip.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'} alt={tip.name || 'Advisor'} style={{ width: 32, height: 32, borderRadius: '9999px', objectFit: 'cover' }} />
        </div>
      ),
      time: <span style={{ fontWeight: 500, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{timeAgo(tip.created_at)}</span>,
      symbol: <span style={{ fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{tip.symbol}</span>,
      performance: <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}><CircularProgress value={score} size={36} /></div>,
      chart: <Button variant="ghost" size="sm"  style={{ padding: 4, height: 32, width: 32, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}><Eye style={{ height: 16, width: 16 }} /></Button>,
      winRate: <span style={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{winRate}%</span>,
      conviction: <Badge style={{ ...getConvictionStyle(conviction), fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', border: 'none' , padding:5, paddingLeft:10, paddingRight:10}}>{conviction}</Badge>,
      holding: <span style={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{holding}</span>,
      risk: <Badge style={{ ...getRiskStyle(risk), fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', border: 'none' , padding:5, paddingLeft:10, paddingRight:10}}>{risk}</Badge>,
      entryPrice: <span style={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>${tip.entry_price}</span>,
      stopLoss: <span style={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>${tip.exit_price}</span>,
      duration: <span style={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{tip.target_duration}</span>,
      allocation: <span style={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{tip.allocation}</span>,
      catalyst: <span style={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{tip.catalyst}</span>,
      valuation: <span style={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{tip.valuation}</span>,
      sentiment: <div style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{getSentimentIcon(tip.sentiment)}<span style={{ fontWeight: 500, fontSize: '0.875rem' }}>{tip.sentiment}</span></div>,
      technical: <span style={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{tip.technical}</span>,
      sector: <span style={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{tip.sector}</span>,
      tipRaw: tip // for navigation
    };
  });

  // Import Table from shadcn/ui
  // import { Table, TableHeader, TableRow, TableCell, TableBody, TableFooter } from '@/components/ui/table';

  return (
    <div className="p-4 space-y-4">
      {/* Table rendering using shadcn Table */}
      <div style={{ overflowX: 'auto', borderRadius: 8, border: '1px solid #e5e7eb' }}>
        <table className="w-full min-w-[1200px]">
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              {columns.map(col => (
                <th key={col.key} style={{ minWidth: col.minWidth, padding: '12px 16px', textAlign: 'center', fontWeight: 700, borderRight: '1px solid #e5e7eb', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => {
              // Build URL params for tip detail page
              const params = new URLSearchParams({
                chart: row.tipRaw.chart,
                symbol: row.tipRaw.symbol,
                asset_type: row.tipRaw.asset_type,
                sector: row.tipRaw.sector,
                strategy: row.tipRaw.strategy,
                risk: row.tipRaw.risk,
                expected_return: row.tipRaw.expected_return,
                name: row.tipRaw.name,
                avatar: row.tipRaw.avatar,
                created_at: row.tipRaw.created_at,
              }).toString();
              return (
                <tr key={idx} className={idx % 2 ? 'bg-gray-50' : ''} style={{ cursor: 'pointer' }}
                  onClick={() => window.open(`/tip/${row.tipRaw.id}?${params}`, '_blank', 'noopener,noreferrer')}
                >
                  {columns.map(col => (
                    <td key={col.key} style={{ minWidth: col.minWidth, padding: '12px 16px', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center' }}>{row[col.key]}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr style={{ background: '#f9fafb' }}>
              <td style={{ minWidth: columns[0].minWidth, padding: '12px 16px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center' }}>Total</td>
              <td colSpan={columns.length - 1} style={{ textAlign: 'center', padding: '12px 16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <Button size="sm" variant="ghost" onClick={handleShowTotal}>{userTips.length} tips</Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground">
          Investment tips shared by {name}.
        </p>
      </div>
    </div>
  );
}

// Main Profile Screen Component
export default function ProfileScreen() {
  // Mock route params - replace with actual router params
  const name = 'Deepak Shah';
  const avatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face';
  const theme = 'default';



  const handleSocial = (type) => {
    switch (type) {
      case 'email':
        window.open('mailto:contact@example.com');
        break;
      case 'twitter':
        window.open('https://twitter.com/example');
        break;
      case 'instagram':
        window.open('https://instagram.com/example');
        break;
      case 'linkedin':
        window.open('https://linkedin.com/in/example');
        break;
      case 'website':
        alert(`Investment License\n${name} is a SEBI Registered Investment Advisor (RIA123456)\n\nLicense valid till 2027.`);
        break;
      default:
        break;
    }
  };

  // Tab state: 0 = Tip Search, 1 = Certifications/Advisor, 2 = Chat
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-background" style={{ position: 'relative', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'UberMove, UberMoveText, Arial, sans-serif', background: '#FFF' }}>
     
     
 


     
     
     
      {/* Top Bar: left avatar/name, center menubar, right search */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: 72,
        background: '#fafafa',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100,
        padding: '0 32px',
        boxSizing: 'border-box',
      }}>
        {/* Left: Avatar and Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src={avatar} alt={name} style={{ width: 38, height: 38, borderRadius: '9999px', objectFit: 'cover', marginRight: 0 }} />
          <span style={{ fontWeight: 700, fontSize: '1rem', color: '#222', fontFamily: 'UberMove, UberMoveText, Arial, sans-serif' }}>{name}</span>
        </div>
        {/* Center: Menubar */}
        <Menubar style={{ marginRight:-50 , paddingTop:20, paddingBottom:20, background: 'transparent', boxShadow: 'none', fontFamily: 'UberMove, UberMoveText, Arial, sans-serif', fontWeight: 600, fontSize: '1.05rem', color: '#444', display: 'flex', gap: '8px', borderRadius: 12, overflow: 'hidden' }}>
          <MenubarMenu >
            <MenubarTrigger style={{ background: activeTab === 0 ? '#f3f4f6' : 'transparent', color: activeTab === 0 ? '#222' : '#888',  cursor: 'pointer', padding: '0 18px', height: 30, borderRadius: activeTab === 0 ? '4px'  : '4px' , transition: 'background 0.2s' }} onClick={() => setActiveTab(0)}>Tip Search</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger style={{ background: activeTab === 1 ? '#f3f4f6' : 'transparent', color: activeTab === 1 ? '#222' : '#888',  cursor: 'pointer', padding: '0 18px', height: 30, borderRadius: activeTab === 1 ? '4px'  : '4px' , transition: 'background 0.2s' }} onClick={() => setActiveTab(1)}>Certifications & Advisor</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger style={{ background: activeTab === 2 ? '#f3f4f6' : 'transparent', color: activeTab === 2 ? '#222' : '#888', cursor: 'pointer', padding: '0 18px', height: 30, borderRadius: activeTab === 2 ? '4px'  : '4px' , transition: 'background 0.2s' }} onClick={() => setActiveTab(2)}>Chat</MenubarTrigger>
          </MenubarMenu>
        </Menubar>
        {/* Right: Search input (only for Tip Search tab) */}
        <div style={{ minWidth: 300, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight:-20 }}>
          {activeTab === 0 && (
            <div style={{ position: 'relative', width: 300 }}>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search tips..."
                style={{ fontFamily: 'UberMove, UberMoveText, Arial, sans-serif', fontSize: '1rem', padding: '8px 36px 8px 36px', borderRadius: 8, border: '1px solid #e5e7eb', width: '100%', background: '#FFF', color: '#444' }}
              />
              {/* Search icon */}
              <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#888', pointerEvents: 'none' }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
              {/* Loader (show when typing) */}
              {search.length > 0 && (
                <span style={{ position: 'absolute', right: 36, top: '50%', transform: 'translateY(-50%)', color: '#888' }}>
                  <Loader2 className="animate-spin" style={{ width: 18, height: 18 }} />
                </span>
              )}
              {/* Cancel button */}
              {search.length > 0 && (
                <button
                  onClick={() => setSearch("")}
                  style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                  aria-label="Clear search"
                >
                  <svg width="18" height="18" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              )}
            </div>
          )}
          
        </div>
      </div>


 


      {/* Main Content */}
      <div style={{ flex: '1 1 100%', width: '100%', minHeight: '100vh', marginTop: 72, overflowY: 'auto', fontFamily: 'UberMove, UberMoveText, Arial, sans-serif' }}>
        {activeTab === 0 && (
          <NewsTab name={name} theme={theme} search={search} />
        )}
        {activeTab === 1 && (
          <div style={{ maxWidth: 480, margin: '48px auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)', padding: '36px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, fontFamily: 'UberMove, UberMoveText, Arial, sans-serif' }}>
            <img src={avatar} alt={name} style={{ width: 90, height: 90, borderRadius: '9999px', objectFit: 'cover', marginBottom: 18 }} />
            <h2 style={{ fontWeight: 700, fontSize: '1.35rem', color: '#444', marginBottom: 6 }}>{name}</h2>
            <p style={{ fontSize: '1rem', color: '#888', marginBottom: 10 }}>566 Tips</p>
            <div style={{ fontSize: '1rem', color: '#444', marginBottom: 10 }}>SEBI Registered Investment Advisor (RIA123456)</div>
            <div style={{ fontSize: '0.95rem', color: '#888', marginBottom: 10 }}>License valid till 2027</div>
            <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
              <Button variant="ghost" size="icon" onClick={() => window.open('mailto:contact@example.com')} style={{ width: 38, height: 38, borderRadius: '9999px', border: '1px solid #e5e7eb', background: '#f7f8fa', color: '#444' }}>
                <Mail style={{ height: 18, width: 18, color: '#444' }} />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => window.open('https://twitter.com/example')} style={{ width: 38, height: 38, borderRadius: '9999px', border: '1px solid #e5e7eb', background: '#f7f8fa', color: '#444' }}>
                <Twitter style={{ height: 18, width: 18, color: '#444' }} />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => window.open('https://instagram.com/example')} style={{ width: 38, height: 38, borderRadius: '9999px', border: '1px solid #e5e7eb', background: '#f7f8fa', color: '#444' }}>
                <Instagram style={{ height: 18, width: 18, color: '#444' }} />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => window.open('https://linkedin.com/in/example')} style={{ width: 38, height: 38, borderRadius: '9999px', border: '1px solid #e5e7eb', background: '#f7f8fa', color: '#444' }}>
                <Linkedin style={{ height: 18, width: 18, color: '#444' }} />
              </Button>
            </div>
          </div>
        )}
        {activeTab === 2 && (
          <div style={{ maxWidth: 480, margin: '48px auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)', padding: '36px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, fontFamily: 'UberMove, UberMoveText, Arial, sans-serif' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1.2rem', color: '#444', marginBottom: 12 }}>Chat with Advisor</h2>
            <div style={{ width: '100%', minHeight: 180, background: '#f7f8fa', borderRadius: 12, marginBottom: 16, padding: 12, color: '#888', fontSize: '1rem', textAlign: 'left', fontFamily: 'UberMove, UberMoveText, Arial, sans-serif' }}>
              <div style={{ marginBottom: 8 }}><b>Advisor:</b> Hi! How can I help you today?</div>
              <div style={{ marginBottom: 8 }}><b>You:</b> ...</div>
            </div>
            <input type="text" placeholder="Type your message..." style={{ fontFamily: 'UberMove, UberMoveText, Arial, sans-serif', fontSize: '1rem', padding: '8px 16px', borderRadius: 8, border: '1px solid #e5e7eb', width: '100%', background: '#fff', color: '#444' }} />
            <Button variant="default" style={{ marginTop: 12, width: '100%', fontFamily: 'UberMove, UberMoveText, Arial, sans-serif', color: '#444' }}>Send</Button>
          </div>
        )}
      </div>
    </div>
  );
}