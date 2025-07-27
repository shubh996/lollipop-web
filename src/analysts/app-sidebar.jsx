"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { ArchiveX, Command, File, Layers, Inbox, Send, Trash2, Plus, Lock, Clock, Shield, AlertTriangle, Flame, TrendingUp } from "lucide-react"
import { DollarSign, Zap, TrendingDown, ArrowUp, ArrowDown, ArrowRight, ArrowUpRight, ArrowDownLeft, Minus, Calendar, BarChart2, Newspaper, Globe } from "lucide-react";
import { MoreHorizontal, Cpu, Banknote, BatteryCharging, Heart, ShoppingCart } from "lucide-react";
// Use Lucide icons only
import { RefreshCcw, Gavel, Factory, Building, Activity } from 'lucide-react'
import { Droplets, Droplet, Sun } from "lucide-react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import supabase from '@/lib/supabaseClient';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"

function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return 'just now';
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }
  return 'just now';
}



function TradingViewWidget({ height, width, symbol, compareSymbol, isChatExpanded, theme, onError, onSymbolResolved }) {
  const container = useRef();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
    if (container.current) {
      container.current.innerHTML = '';
    }

    // TradingView widget config
    const widgetConfig = compareSymbol
      ? {
          autosize: true,
          symbol: symbol,
          timezone: "Etc/UTC",
          theme: "light",
          style: "2",
          locale: "en",
          withdateranges: true,
          range: "YTD",
          allow_symbol_change: true,
          compareSymbols: [
            {
              symbol: compareSymbol,
              position: "SameScale"
            }
          ],
          details: true,
          support_host: "https://www.tradingview.com"
        }
      : {
          autosize: true,
          symbol: symbol,
          timezone: "Etc/UTC",
          theme: "light",
          style: "2",
          locale: "en",
          withdateranges: true,
          range: "YTD",
          allow_symbol_change: true,
          details: true,
          support_host: "https://www.tradingview.com"
        };

    // Create script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify(widgetConfig);
    container.current.appendChild(script);

    // Listen for TradingView iframe load and try to extract the resolved symbol
    const timeout = setTimeout(() => {
      const iframe = container.current.querySelector('iframe');
      if (!iframe) {
        setHasError(true);
        if (onError) {
          onError({ symbol, compareSymbol });
        }
      } else {
        // Try to get the resolved symbol from the iframe's title (if available)
        // This is a workaround, as TradingView does not provide a public API for this
        setTimeout(() => {
          try {
            const title = iframe.getAttribute('title');
            if (title && onSymbolResolved) {
              // TradingView titles are like "TradingView Chart – RELIANCE"
              const match = title.match(/–\s*(.+)$/);
              if (match && match[1]) {
                onSymbolResolved(match[1]);
              }
            }
          } catch (e) {}
        }, 1000);
      }
    }, 3500);

    return () => clearTimeout(timeout);
  }, [symbol, compareSymbol, onError, onSymbolResolved]);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{
        height: height,
        width: width
      }}
    >
      {hasError && (
        <div style={{ color: 'red', padding: 16, textAlign: 'center', fontWeight: 600 }}>
          Failed to load TradingView chart. Please check the stock symbol(s).
        </div>
      )}
    </div>
  );
}

export function AppSidebar({ posts = [], onSelectPost, selectedPost, user, onNewPost, creatingNewPost, newPost, onNewPostChange, onCancelNewPost, submitting, onSubmitNewPost, onSubmitNewPostAndNew, onNewPostImageUpload, onDeletePost, ...props }) {
  // Drawer open state for new post
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  // Sidebar navigation items (can be customized)
  const navMain = [
    {
      title: "Posts",
      url: "#",
      icon: Inbox,
      isActive: true,
    },
  ];
  const [activeItem, setActiveItem] = React.useState(navMain[0]);
  const { setOpen } = useSidebar();
  const [deletingId, setDeletingId] = React.useState(null);
  const [localPosts, setLocalPosts] = React.useState(posts);
  const [search, setSearch] = React.useState("");
  const [showTypeDropdown, setShowTypeDropdown] = useState("Buy");
  const [pendingType, setPendingType] = useState('');

  const [assestType, setAssetType] = useState('');


  React.useEffect(() => {
    setLocalPosts(posts);
  }, [posts]);

  // Filter posts by search (no headline/summary required)
  const filteredPosts = search.trim()
    ? localPosts.filter(
        (post) =>
          post.tip?.toLowerCase().includes(search.toLowerCase()) ||
          post.symbol?.toLowerCase().includes(search.toLowerCase())
      )
    : localPosts;

  async function handleDelete(postId) {
    const {data, error } = await supabase.from('investment_tips').delete().eq('id', postId);
    if (!error) {
      setLocalPosts((prev) => prev.filter((p) => p.id !== postId));
      if (selectedPost && selectedPost.id === postId && onSelectPost) {
        onSelectPost(null);
      }
      if (onDeletePost) onDeletePost(postId); // Notify parent to update posts
    } else {
      alert('Failed to delete post.');
    }
    setDeletingId(null);
  }



  // Show drawer and set type when a category is selected
  // When user selects a category, record asset_type and open drawer
  function handleTypeSelect(val) {
    setAssetType(val);
    newPost.asset_type = val;
    setShowTypeDropdown(false);
    setPendingType('');
    // Pass asset_type to parent (page.jsx) via onNewPost, or update newPost directly if managed here
    if (onNewPost) onNewPost('asset_type', val);
    setDrawerOpen(true);
  }

  // Required fields for validation
  const requiredFields = [
    { key: 'tip', label: 'Investment Tip' },
    { key: 'symbol', label: 'Symbol' },
    { key: 'holding', label: 'Holding' },
    { key: 'risk', label: 'Risk' },
    { key: 'conviction', label: 'Conviction' },
    { key: 'strategy', label: 'Strategy' },
    { key: 'sector', label: 'Sector' },
    { key: 'target_duration', label: 'Target Duration' },
    { key: 'expected_return', label: 'Expected Return' },
  ];

  // Validate required fields before submit
  function validateRequiredFields() {
    for (const field of requiredFields) {
      if (!newPost[field.key] || String(newPost[field.key]).trim() === "") {
        alert(`Please fill in the required field: ${field.label}`);
        return false;
      }
    }
    return true;
  }

  // Wrap submit handlers to check required fields
  function handleSubmitNewPostWrapper() {
    if (!validateRequiredFields()) return;
    if (onSubmitNewPost) onSubmitNewPost();
    setDrawerOpen(false);
  }
  function handleSubmitNewPostAndNewWrapper() {
    if (!validateRequiredFields()) return;
    if (onSubmitNewPostAndNew) onSubmitNewPostAndNew();
  }


   // Helper function to get display text for selected value (main part only)
  const getDisplayText = (value, options) => {
    const option = options.find(opt => opt.toLowerCase().replace(/\s/g, '_') === value);
    if (!option) return '';
    return parseOption(option).main;
  };

  const parseOption = (option) => {
    const match = option.match(/^(.+?)(?:\s*\((.+)\))?$/);
    return {
      main: match[1].trim(),
      subheadline: match[2] ? match[2].trim() : null,
    };
  };

  // Helper function to get display text for selected value (main part only)
  


const holdingOptions = [
  '1D', '2-3D', '1W', '1-4W', '1-3M', '3-6M', '6-12M', '12+M', 
  'Intraday', 'Short-Term', 'Swing', 'Mid-Term', 'Long-Term', 'Permanent'
];
const riskOptions = [
  'Very Low', 'Low', 'Medium', 'High', 'Very High', 'Speculative'
];
const convictionOptions = [
  'Speculative', 'Low', 'Moderate', 'Strong', 'Very Strong',
];
const strategyOptions = [

  'Growth', 'Value', 'Momentum', 'Income', 'Index', 'Arbitrage', 
  'Event-Driven', 'Contrarian', 'Quality', 'Blend', 'ESG', 'Thematic', 
  'Distressed', 'Macro'
];
const sentimentOptions = [
  'Very Bullish', 'Bullish', 'Neutral', 'Bearish', 'Very Bearish'
];
const sectorOptions = [
  'Tech', 'Finance', 'Healthcare', 'Energy', 'Consumer', 'Industrials', 
  'Real Estate', 'Utilities', 'Materials', 'Telecom', 'Staples', 
  'Discretionary', 'Infrastructure', 'Biotech', 'Clean Energy', 'Aerospace', 'Retail'
];
const targetDurationOptions = [
  '1W', '2W', '1M', '2M', '3M', '6M', '6-12M', '1-2Y', '2+Y', 'Indefinite'
];
const catalystOptions = [
  'Earnings', 'Fed Policy', 'Mergers', 'Product Launch', 'Regulation', 
  'Market Event', 'Analyst Upgrade', 'Buyback', 'Dividend Hike', 
  'Sector Rotation', 'Geopolitical', 'Innovation', 'Litigation', 'Supply Chain'
];
const valuationOptions = [
  'Low P/E (<15x)', 'Mid P/E (15–25x)', 'High P/E (>25x)', 
  'Low EV/EBITDA (<10x)', 'Mid EV/EBITDA (10–15x)', 'High EV/EBITDA (>15x)', 
  'Discounted Cash Flow (10%+ IRR)', 'PEG Ratio ~1.5', 
  'Low Price/Book (<2x)', 'Low Price/Sales (<2x)', 
  'High ROE (>15%)', 'Low Debt/Equity (<0.5)'
];

const technicalOptions = [
  'RSI Overbought 70', 'RSI Oversold 30', 'MACD Bullish', 'MACD Bearish', 
  'MA Crossover', 'ADX Trend 25', 'Bollinger Breakout', 'Fibonacci', 
  'Support Break', 'Resistance Break', 'Volume Spike', 'Stochastic 80', 
  'Stochastic 20', 'Ichimoku Buy', 'Ichimoku Sell', 'VWAP Bounce'
];

const diversificationOptions = [
  'Core', 'Satellite', 'Hedge', 'Tactical', 'Diversifier', 'Opportunistic', 'Balanced'
];
const liquidityOptions = [
  'High Large Cap', 'Medium Mid Cap', 'Low Small Cap', 'Micro Cap', 
  'High Volume', 'Low Volume', 'Illiquid'
];
const expectedReturnOptions = [
  '<5%', '5-10%', '10-20%', '20-30%', '30-50%', '50%+', 'Negative'
];
const performanceOptions = [
  'Strong Underperform', 'Underperform', 'Market', 'Outperform', 
  'Strong Outperform', 'Flat'
];

  return (
    <Sidebar style={{backgroundColor: "#FFF", flexDirection: "column", width: '100%'}}
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
     
    
        <div className="flex items-center justify-center p-2" style={{ borderBottom: '1px solid #eee', background: '#EEE', marginTop: -100 }}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="New Post">
                <Plus className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel style={{padding:5, backgroundColor:"#EEE", fontWeight:"bold", borderRadius:"5px", margin:5}}>Select Category</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleTypeSelect('stocks')}>
                <div className="flex items-center gap-2">
                  <Inbox className="w-4 h-4" />
                  <span>Stocks</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeSelect('derivatives')}>
                <div className="flex items-center gap-2">
                  <Command className="w-4 h-4" />
                  <span>Derivatives</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeSelect('indexes')}>
                <div className="flex items-center gap-2">
                  <File className="w-4 h-4" />
                  <span>Indexes</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeSelect('bonds')}>
                <div className="flex items-center gap-2">
                  <ArchiveX className="w-4 h-4" />
                  <span>Bonds</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeSelect('commodities')}>
                <div className="flex items-center gap-2">
                  <ArchiveX className="w-4 h-4" />
                  <span>Commodities</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeSelect('forex')}>
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  <span>Forex</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeSelect('equity')}>
                <div className="flex items-center gap-2">
                  <Inbox className="w-4 h-4" />
                  <span>Equity</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeSelect('mutualfunds')}>
                <div className="flex items-center gap-2">
                  <File className="w-4 h-4" />
                  <span>Mutual Funds</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeSelect('crypto')}>
                <div className="flex items-center gap-2">
                  <Command className="w-4 h-4" />
                  <span>Crypto</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
          </DropdownMenu>
        </div>

        
    

      {/* Drawer for new post form */}
      {drawerOpen && <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="left">
         <DrawerContent style={{ width: '30vw', height: '100%', overflowY: 'auto', background: '#fff', boxShadow: '2px 0 16px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid #eee', padding: 20, paddingTop: 10, paddingBottom: 0, position: 'relative' }}>
        <div style={{ fontWeight: 600, fontSize: 22, marginBottom: 4 }}>New Post</div>
        <div style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>Fill in the details to create a new post.</div>
        {newPost.asset_type && (
          <div style={{ fontSize: 13, color: '#1976d2', marginTop: 2, fontWeight: 500 }}>
            Asset Type: {newPost.asset_type.charAt(0).toUpperCase() + newPost.asset_type.slice(1)}
          </div>
        )}
      </div>
      <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20, marginTop: -20 }}>
        <div style={{ marginTop: 40 }}>
          <Label style={{ marginTop: 45, marginBottom: 10 }} htmlFor="tip">Investment Tip</Label>
          <Textarea id="tip" placeholder="Investment Tip" value={newPost.tip} onChange={e => onNewPostChange('tip', e.target.value)} style={{ marginTop: 4, height: "100%" }} />
        </div>



        {/* Entry, Exit, Stop Loss fields */}
        <div style={{ display: 'flex', gap: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
          <div style={{ flex: 1 }}>
            <Label style={{ marginTop: 20, marginBottom: 10 }} htmlFor="entry_price">Entry Point</Label>
            <Input id="entry_price" placeholder="e.g. 2500" value={newPost.entry_price || ''} onChange={e => onNewPostChange('entry_price', e.target.value)} style={{ marginTop: 4, width: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <Label style={{ marginTop: 20, marginBottom: 10 }} htmlFor="exit_price">Exit Point</Label>
            <Input id="exit_price" placeholder="e.g. 2800" value={newPost.exit_price || ''} onChange={e => onNewPostChange('exit_price', e.target.value)} style={{ marginTop: 4, width: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <Label style={{ marginTop: 20, marginBottom: 10 }} htmlFor="stop_loss">Stop Loss</Label>
            <Input id="stop_loss" placeholder="e.g. 2400" value={newPost.stop_loss || ''} onChange={e => onNewPostChange('stop_loss', e.target.value)} style={{ marginTop: 4, width: '100%' }} />
          </div>
        </div>
        {/* Company Name input above symbol */}
        <div style={{ display: 'flex', gap: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <div style={{ flex: 1 }}>
            <Label style={{ marginTop: 20, marginBottom: 10 }} htmlFor="company_name">Company Name</Label>
            <Input id="company_name" placeholder="e.g. Reliance Industries Ltd" value={newPost.company_name || ''} onChange={e => onNewPostChange('company_name', e.target.value)} style={{ marginTop: 4, width: '100%' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <div style={{ flex: 1 }}>
            <Label style={{ marginTop: 20, marginBottom: 10 }} htmlFor="symbol1">Symbol</Label>
            <Input id="symbol1" placeholder="e.g. RELIANCE" value={newPost.symbol} onChange={e => onNewPostChange('symbol', e.target.value)} style={{ marginTop: 4, width: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <Label style={{ marginTop: 20, marginBottom: 10 }} htmlFor="symbol2">Compare (optional)</Label>
            <Input id="symbol2" placeholder="e.g. TCS" value={newPost.compared} onChange={e => onNewPostChange('compared', e.target.value)} style={{ marginTop: 4, width: '100%' }} />
          </div>
        </div>
        {newPost.symbol && (
          <div style={{ marginTop: 20, paddingBottom: 20, height: '30vh', width: '100%' }}>
            <TradingViewWidget
              symbol={newPost.symbol}
              compareSymbol={newPost.compared}
              width="100%"
              height="25vh"
              onSymbolResolved={resolvedSymbol => {
                if (resolvedSymbol && resolvedSymbol !== newPost.symbol) {
                  onNewPostChange('symbol', resolvedSymbol);
                }
              }}
            />
          </div>
        )}
        <div style={{ marginTop: 20 }}>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Holding</Label>
          <Select value={newPost.holding} onValueChange={val => onNewPostChange('holding', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select holding period">{newPost.holding && getDisplayText(newPost.holding, holdingOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {holdingOptions.map(opt => {
                const { main, subheadline } = parseOption(opt);
                return (
                  <SelectItem key={opt} value={opt.toLowerCase().replace(/\s/g, '_')}>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" /> {main}
                      </div>
                      {subheadline && <span className="text-sm text-gray-500 ml-6">{subheadline}</span>}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 20, marginBottom: 10 }} htmlFor="conviction">Asset Type</Label>
<Select value={newPost.asset_type} onValueChange={val => onNewPostChange('asset_type', val)}>
  <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
    <SelectValue value={newPost.asset_type || assestType} onValueChange={val => onNewPostChange('asset_type', val)} placeholder="Select asset type">
    </SelectValue>    
  </SelectTrigger>
  <SelectContent>
    {['stocks', 'derivatives', 'indexes', 'bonds', 'commodities', 'forex', 'equity', 'mutualfunds', 'crypto'].map(opt => {
      const { main } = parseOption(opt);
      return (
        <SelectItem key={opt} value={opt}>
          <div className="flex items-center">
            {main === 'stocks' && <Inbox className="w-4 h-4 mr-2" />}
            {main === 'derivatives' && <Command className="w-4 h-4 mr-2" />}
            {main === 'indexes' && <File className="w-4 h-4 mr-2" />}
            {main === 'bonds' && <ArchiveX className="w-4 h-4 mr-2" />}
            {main === 'commodities' && <ArchiveX className="w-4 h-4 mr-2" />}
            {main === 'forex' && <Send className="w-4 h-4 mr-2" />}
            {main === 'equity' && <Inbox className="w-4 h-4 mr-2" />}
            {main === 'mutualfunds' && <File className="w-4 h-4 mr-2" />}
            {main === 'crypto' && <Command className="w-4 h-4 mr-2" />}
            {main.charAt(0).toUpperCase() + main.slice(1)}
          </div>
        </SelectItem>
      );
    })}
  </SelectContent>
</Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Risk</Label>
          <Select value={newPost.risk} onValueChange={val => onNewPostChange('risk', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select risk">{newPost.risk && getDisplayText(newPost.risk, riskOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {riskOptions.map(opt => {
                const { main, subheadline } = parseOption(opt);
                return (
                  <SelectItem key={opt} value={opt.toLowerCase().replace(/\s/g, '_')}>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        {main === 'Low' && <Shield className="w-4 h-4 mr-2" />}
                        {main === 'Medium' && <AlertTriangle className="w-4 h-4 mr-2" />}
                        {main === 'High' && <Flame className="w-4 h-4 mr-2" />}
                        {main}
                      </div>
                      {subheadline && <span className="text-sm text-gray-500 ml-6">{subheadline}</span>}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Conviction</Label>
          <Select value={newPost.conviction} onValueChange={val => onNewPostChange('conviction', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select conviction">{newPost.conviction && getDisplayText(newPost.conviction, convictionOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {convictionOptions.map(opt => {
            const { main, subheadline } = parseOption(opt);
                return (
                  <SelectItem key={opt} value={opt.toLowerCase().replace(/\s/g, '_')}>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        {main === 'Speculative' && <ArrowDown className="w-4 h-4 mr-2" />}
                        {main === 'Moderate' && <ArrowRight className="w-4 h-4 mr-2" />}
                        {main === 'Strong' && <ArrowUp className="w-4 h-4 mr-2" />}
                        {main}
                      </div>
                      {subheadline && <span className="text-sm text-gray-500 ml-6">{subheadline}</span>}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Strategy (Details)</Label>
          <Select value={newPost.strategy} onValueChange={val => onNewPostChange('strategy', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select strategy">{newPost.strategy && getDisplayText(newPost.strategy, strategyOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {strategyOptions.map(opt => {
                const { main, subheadline } = parseOption(opt);
                return (
                  <SelectItem key={opt} value={opt.toLowerCase().replace(/\s/g, '_')}>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        {main === 'Growth' && <TrendingUp className="w-4 h-4 mr-2" />}
                        {main === 'Value' && <TrendingDown className="w-4 h-4 mr-2" />}
                        {main === 'Momentum' && <Zap className="w-4 h-4 mr-2" />}
                        {main === 'Income' && <DollarSign className="w-4 h-4 mr-2" />}
                        {main === 'Index' && <Layers className="w-4 h-4 mr-2" />}
                        {main === 'Arbitrage' && <RefreshCcw className="w-4 h-4 mr-2" />}
                        {main}
                      </div>
                      {subheadline && <span className="text-sm text-gray-500 ml-6">{subheadline}</span>}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Sentiment</Label>
          <Select value={newPost.sentiment} onValueChange={val => onNewPostChange('sentiment', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select sentiment">{newPost.sentiment && getDisplayText(newPost.sentiment, sentimentOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {sentimentOptions.map(opt => (
                <SelectItem key={opt} value={opt.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex items-center">
                    {opt === 'Bullish' && <ArrowUpRight className="w-4 h-4 mr-2" />}
                    {opt === 'Neutral' && <Minus className="w-4 h-4 mr-2" />}
                    {opt === 'Bearish' && <ArrowDownLeft className="w-4 h-4 mr-2" />}
                    {opt}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Sector</Label>
          <Select value={newPost.sector} onValueChange={val => onNewPostChange('sector', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select sector">{newPost.sector && getDisplayText(newPost.sector, sectorOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {sectorOptions.map(opt => (
                <SelectItem key={opt} value={opt.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex items-center">
                    {opt === 'Technology' && <Cpu className="w-4 h-4 mr-2" />}
                    {opt === 'Financial Services' && <Banknote className="w-4 h-4 mr-2" />}
                    {opt === 'Healthcare' && <Heart className="w-4 h-4 mr-2" />}
                    {opt === 'Energy' && <BatteryCharging className="w-4 h-4 mr-2" />}
                    {opt === 'Consumer Goods' && <ShoppingCart className="w-4 h-4 mr-2" />}
                    {opt === 'Industrials' && <Factory className="w-4 h-4 mr-2" />}
                    {opt === 'Real Estate' && <Building className="w-4 h-4 mr-2" />}
                    {opt}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Target Duration</Label>
          <Select value={newPost.target_duration} onValueChange={val => onNewPostChange('target_duration', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select target duration">{newPost.target_duration && getDisplayText(newPost.target_duration, targetDurationOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {targetDurationOptions.map(opt => (
                <SelectItem key={opt} value={opt.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" /> {opt}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Catalyst</Label>
          <Select value={newPost.catalyst} onValueChange={val => onNewPostChange('catalyst', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select catalyst">{newPost.catalyst && getDisplayText(newPost.catalyst, catalystOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {catalystOptions.map(opt => (
                <SelectItem key={opt} value={opt.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex items-center">
                    {opt === 'Earnings Report' && <BarChart2 className="w-4 h-4 mr-2" />}
                    {opt === 'Federal Reserve Policy' && <Globe className="w-4 h-4 mr-2" />}
                    {opt === 'Mergers & Acquisitions' && <MoreHorizontal className="w-4 h-4 mr-2" />}
                    {opt === 'New Product Launch' && <ShoppingCart className="w-4 h-4 mr-2" />}
                    {opt === 'Regulatory Change' && <Gavel className="w-4 h-4 mr-2" />}
                    {opt === 'Market Event' && <Activity className="w-4 h-4 mr-2" />}
                    {opt}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Valuation</Label>
          <Select value={newPost.valuation} onValueChange={val => onNewPostChange('valuation', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select valuation">{newPost.valuation && getDisplayText(newPost.valuation, valuationOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {valuationOptions.map(opt => {
                const { main, subheadline } = parseOption(opt);
                return (
                  <SelectItem key={opt} value={opt.toLowerCase().replace(/\s/g, '_')}>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" /> {main}
                      </div>
                      {subheadline && <span className="text-sm text-gray-500 ml-6">{subheadline}</span>}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Technical</Label>
          <Select value={newPost.technical} onValueChange={val => onNewPostChange('technical', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select technical">{newPost.technical && getDisplayText(newPost.technical, technicalOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {technicalOptions.map(opt => {
                const { main, subheadline } = parseOption(opt);
                return (
                  <SelectItem key={opt} value={opt.toLowerCase().replace(/\s/g, '_')}>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" /> {main}
                      </div>
                      {subheadline && <span className="text-sm text-gray-500 ml-6">{subheadline}</span>}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Label style={{ marginTop: 40, marginBottom: 10 }}>Diversification</Label>
          <Select value={newPost.diversification} onValueChange={val => onNewPostChange('diversification', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select diversification">{newPost.diversification && getDisplayText(newPost.diversification, diversificationOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {diversificationOptions.map(opt => {
                const { main, subheadline } = parseOption(opt);
                return (
                  <SelectItem key={opt} value={opt.toLowerCase().replace(/\s/g, '_')}>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        {main === 'Core' && <Minus className="w-4 h-4 mr-2" />}
                        {main === 'Satellite' && <MoreHorizontal className="w-4 h-4 mr-2" />}
                        {main === 'Hedge' && <Layers className="w-4 h-4 mr-2" />}
                        {main}
                      </div>
                      {subheadline && <span className="text-sm text-gray-500 ml-6">{subheadline}</span>}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Liquidity</Label>
          <Select value={newPost.liquidity} onValueChange={val => onNewPostChange('liquidity', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select liquidity">{newPost.liquidity && getDisplayText(newPost.liquidity, liquidityOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {liquidityOptions.map(opt => {
                const { main, subheadline } = parseOption(opt);
                return (
                  <SelectItem key={opt} value={opt.toLowerCase().replace(/\s/g, '_')}>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        {main === 'High' && <Droplets className="w-4 h-4 mr-2" />}
                        {main === 'Medium' && <MoreHorizontal className="w-4 h-4 mr-2" />}
                        {main === 'Low' && <Minus className="w-4 h-4 mr-2" />}
                        {main}
                      </div>
                      {subheadline && <span className="text-sm text-gray-500 ml-6">{subheadline}</span>}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Expected Return</Label>
          <Select value={newPost.expected_return} onValueChange={val => onNewPostChange('expected_return', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select expected return">{newPost.expected_return && getDisplayText(newPost.expected_return, expectedReturnOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {expectedReturnOptions.map(opt => (
                <SelectItem key={opt} value={opt.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex items-center">
                    {opt === 'Up to 10%' && <TrendingDown className="w-4 h-4 mr-2" />}
                    {opt === '10-20%' && <Minus className="w-4 h-4 mr-2" />}
                    {opt === '20-30%' && <TrendingUp className="w-4 h-4 mr-2" />}
                    {opt === 'Above 30%' && <TrendingUp className="w-4 h-4 mr-2" />}
                    {opt}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Performance</Label>
          <Select value={newPost.performance} onValueChange={val => onNewPostChange('performance', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select performance">{newPost.performance && getDisplayText(newPost.performance, performanceOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {performanceOptions.map(opt => {
                const { main, subheadline } = parseOption(opt);
                return (
                  <SelectItem key={opt} value={opt.toLowerCase().replace(/\s/g, '_')}>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        {main === 'Underperforming' && <TrendingDown className="w-4 h-4 mr-2" />}
                        {main === 'Market Average' && <Minus className="w-4 h-4 mr-2" />}
                        {main === 'Outperforming' && <TrendingUp className="w-4 h-4 mr-2" />}
                        {main}
                      </div>
                      {subheadline && <span className="text-sm text-gray-500 ml-6">{subheadline}</span>}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div style={{ height: 80 }} />
      </div>
      <div style={{
        background: '#fff',
        boxShadow: '0 -2px 12px rgba(0,0,0,0.08)',
        display: 'flex',
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px 24px',
        zIndex: 1000
      }}>
        <Button variant="outline" onClick={() => { setDrawerOpen(false); if (onCancelNewPost) onCancelNewPost(); }} type="button">Cancel</Button>
        <Button variant="default" onClick={handleSubmitNewPostWrapper} disabled={submitting} type="button">{submitting ? 'Submitting...' : 'Submit'}</Button>
        <Button variant="secondary" onClick={handleSubmitNewPostAndNewWrapper} disabled={submitting} type="button">{submitting ? 'Submitting...' : 'Submit and New'}</Button>
      </div>
    </DrawerContent>
      </Drawer>}
      {/* End Drawer */}


      {/* Only show Sidebar when drawer is not open */}
      {!drawerOpen && (
        <div style={{ backgroundColor: "#FFF",  display: 'flex', flexDirection: 'column', height: '100%', width: "25vw" }}>
          {/* Header and search grouped together */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            borderBottom: '1px solid #eee',
            padding: 16,
           
             backgroundColor: "#FFF", 
          }}>
            <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ color: '#222', fontSize: 16, fontWeight: 500 }}>Tips</div>
            </div>
            <SidebarInput
              placeholder="Type to search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: 8,
                border: '1px solid #eee',
                borderRadius: 6,
                fontSize: 14,
                background: '#fafbfc',
                marginTop: 4,
                marginBottom: 2,
              }}
            />
          </div>
          {/* Post list */}
          <div style={{ flex: 1, overflowY: 'auto', background: '#fff', padding: 0, width: '100%' }}>
            <div style={{ padding: 0 }}>
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: 12,
                    borderBottom: '1px solid #eee',
                    padding: 16,
                    fontSize: 14,
                    lineHeight: 1.4,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    background: selectedPost?.id === post.id ? '#f1f5ff' : '#fff',
                    color: selectedPost?.id === post.id ? '#1a237e' : '#222',
                    fontWeight: selectedPost?.id === post.id ? 600 : 400,
                    transition: 'background 0.15s',
                  }}
                  onClick={() => {
                    
                    onSelectPost(post);
                   
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f5f7fa')}
                  onMouseLeave={e => (e.currentTarget.style.background = selectedPost?.id === post.id ? '#f1f5ff' : '#fff')}
                >
                  <Avatar style={{ width: 32, height: 32, marginRight: 8 }}>
                    {post.image_url ? (
                      <AvatarImage src={post.image_url} alt={post.symbol} />
                    ) : (
                      <AvatarFallback>{post.symbol?.[0] || '?'}</AvatarFallback>
                    )}
                  </Avatar>
                  <div style={{ width: '60%', textAlign: 'left' }}>
                    <div style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width:"95%" }}>{post.tip}</div>
                    <div style={{ fontSize: 12, color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{timeAgo(post.created_at)}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 , width: '20%', justifyContent: 'flex-start'}}>
                  <AlertDialog open={deletingId === post.id} onOpenChange={open => setDeletingId(open ? post.id : null)}>
                    <AlertDialogTrigger asChild>
                      <Button
  variant="ghost"
  size="icon"
  onClick={e => { e.stopPropagation(); setDeletingId(post.id); }}
  style={{
    padding: -1.4,
    minWidth: 0,
    background: '#fff', // ensure visible
    border: '1px solid #e53935',
    borderRadius: 4,
  }}
                      >
                        <Trash2 style={{ width: 15, height: 15, color: '#e53935' }} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Post?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this post? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeletingId(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(post.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Footer */}
          <div
            style={{
              padding: 12,
              borderTop: '1px solid #ccc',
              background: '#fafbfc',
              display: 'flex',
              alignItems: 'center',
              minHeight: 48,
            }}
          >
            <NavUser user={user} />
          </div>
        </div>
      )}


    </Sidebar>
  );
}
