"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { ArchiveX, Command, File, Layers, Inbox, Send, Trash2, Plus, Lock, Clock, Shield, AlertTriangle, Flame, TrendingUp } from "lucide-react"
import { DollarSign, Zap, TrendingDown, ArrowUp, ArrowDown, ArrowRight, ArrowUpRight, ArrowDownLeft, Minus, Calendar, BarChart2, Newspaper, Globe } from "lucide-react";
import { MoreHorizontal, Cpu, Banknote, BatteryCharging, Heart, ShoppingCart } from "lucide-react";
// Use Lucide icons only
import { RefreshCcw, Gavel, Factory, Building, Activity } from 'lucide-react'
import { Droplets, Droplet, Sun } from "lucide-react";
import { ChartPie, Euro, Bitcoin, Repeat, FileText, Package, Laptop, Home, Landmark, Radio } from "lucide-react";
import { Handshake, Settings2, Book, BookOpen, BookText, MessageSquare, Gauge, Leaf, Wallet, GripHorizontal, Grip, Ellipsis, ArrowLeftRight, X } from "lucide-react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import supabase from '@/lib/supabaseClient';
import LollipopSVG from '../assets/icons/lollipop.svg';
import LollipopSVGWhite from '../assets/icons/lollipop-white.svg';

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

// Master filter configuration with icons and descriptions
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
    { name: 'Mutual Funds', Icon: ChartPie, desc: 'Professionally managed investment pools' },
    { name: 'REITs', Icon: Home, desc: 'Real estate investment trusts' },
    { name: 'Options', Icon: Settings2, desc: 'Call and put option contracts' },
    { name: 'Futures', Icon: ArrowRight, desc: 'Future delivery contracts for assets' },
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
    { name: 'Value', color: '#a855f7', Icon: DollarSign, desc: 'Buy undervalued assets trading below intrinsic value' },
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
    { label: '0-5%', min: 0, max: 5, icon: TrendingUp, desc: 'Conservative returns, capital preservation focused' },
    { label: '5-10%', min: 5, max: 10, icon: TrendingUp, desc: 'Moderate returns, balanced risk-reward' },
    { label: '10-15%', min: 10, max: 15, icon: TrendingUp, desc: 'Good returns above market average' },
    { label: '15-20%', min: 15, max: 20, icon: TrendingUp, desc: 'Strong returns with higher risk' },
    { label: '20-30%', min: 20, max: 30, icon: TrendingUp, desc: 'High returns, significant risk involved' },
    { label: '30-40%', min: 30, max: 40, icon: TrendingUp, desc: 'Very high returns, substantial risk' },
    { label: '40-50%', min: 40, max: 50, icon: TrendingUp, desc: 'Exceptional returns, major risk exposure' },
    { label: '50%+', min: 50, max: Infinity, icon: TrendingUp, desc: 'Extreme returns, speculative investments' },
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
  conviction: [
    { name: 'Speculative', Icon: ArrowDown, desc: 'Weak conviction, just a hunch' },
    { name: 'Low', Icon: ArrowDown, desc: 'Low conviction, not very confident' },
    { name: 'Moderate', Icon: ArrowRight, desc: 'Moderate conviction, some confidence' },
    { name: 'Strong', Icon: ArrowUp, desc: 'Strong conviction, confident' },
    { name: 'Very Strong', Icon: ArrowUp, desc: 'Very strong conviction, highly confident' },
  ]
};



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
  
  // Function to add proper spacing to camelCase strings
  function addSpacing(text) {
    if (!text) return '';
    return text
      // Add space before numbers that follow letters
      .replace(/([a-zA-Z])(\d)/g, '$1 $2')
      // Add space before capital letters that follow lowercase letters
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // Handle special cases for common patterns
      .replace(/([a-zA-Z])([\/&])/g, '$1 $2')
      .replace(/([\/&])([a-zA-Z])/g, '$1 $2');
  }


  return (
    <Sidebar style={{backgroundColor: "#FFF", flexDirection: "column", width: '100%'}}
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
     
    
        <div className="flex items-center justify-center p-2" style={{ borderBottom: '1px solid #eee', background: '#EEE', marginTop: -100 }}>
          <Button 
            variant="outline" 
            size="icon" 
            aria-label="New Post"
            onClick={() => setDrawerOpen(true)}
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        
    

      {/* Drawer for new post form */}
      {drawerOpen && <><Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="left">
         <DrawerContent className="w-[32vw] h-full overflow-y-auto bg-background border-none">
          {/* Header */}
          <div className="flex flex-col items-center justify-center py-6 bg-background border-b">
            <img src={LollipopSVG} alt="Lollipop" className="w-12 h-12 mb-2" />
            <div className="text-center">
              <h1 className="text-xl font-bold text-foreground">LOLLIPOP</h1>
              <p className="text-sm text-muted-foreground">Advisor Tip Upload</p>
            </div>
            {newPost.asset_type && (
              <div className="text-sm text-primary font-medium mt-1">
                Asset Type: {newPost.asset_type.charAt(0).toUpperCase() + newPost.asset_type.slice(1)}
              </div>
            )}
          </div>
          {/* What You Get section */}
          <div className="mx-6 mt-6 p-4 bg-muted/30 rounded-lg border">
            <h3 className="font-semibold text-sm text-primary text-center mb-3">What You Get</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="font-medium text-sm">Share actionable investment insights</span>
              </li>
              <li className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-blue-500" />
                <span className="font-medium text-sm">Reach thousands of investors</span>
              </li>
              <li className="flex items-center gap-3">
                <BarChart2 className="h-4 w-4 text-yellow-500" />
                <span className="font-medium text-sm">Track your tip performance</span>
              </li>
              <li className="flex items-center gap-3">
                <Leaf className="h-4 w-4 text-cyan-500" />
                <span className="font-medium text-sm">Build your advisor reputation</span>
              </li>
            </ul>
          </div>
      {/* Section separator for readability */}
      <div style={{ height: 18 }} />
      <div className="p-6 space-y-6">
        {/* Investment Idea Section */}
        <div className="bg-card border rounded-lg">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-base">Investment Idea</h2>
            <p className="text-sm text-muted-foreground">Describe your main investment thesis or recommendation.</p>
          </div>
          <div className="p-4">
            <Label htmlFor="tip">Investment Tip</Label>
            <Textarea id="tip" placeholder="Investment Tip" value={newPost.tip} onChange={e => onNewPostChange('tip', e.target.value)} className="mt-2" />
          </div>
          <div className="border-t p-3 text-xs text-muted-foreground">
            Be clear and concise. Investors rely on your expertise.
          </div>
        </div>
        {/* Trade Details Section */}
        <div className="bg-card border rounded-lg">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-base">Trade Details</h2>
            <p className="text-sm text-muted-foreground">Specify entry, exit, and stop loss for your tip.</p>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="entry_price">Entry Point</Label>
                <Input id="entry_price" placeholder="e.g. 2500" value={newPost.entry_price || ''} onChange={e => onNewPostChange('entry_price', e.target.value)} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="exit_price">Exit Point</Label>
                <Input id="exit_price" placeholder="e.g. 2800" value={newPost.exit_price || ''} onChange={e => onNewPostChange('exit_price', e.target.value)} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="stop_loss">Stop Loss</Label>
                <Input id="stop_loss" placeholder="e.g. 2400" value={newPost.stop_loss || ''} onChange={e => onNewPostChange('stop_loss', e.target.value)} className="mt-2" />
              </div>
            </div>
          </div>
          <div className="border-t p-3 text-xs text-muted-foreground">
            These help investors understand your risk management.
          </div>
        </div>
        {/* Asset Information Section */}
        <div className="bg-card border rounded-lg">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-base">Asset Information</h2>
            <p className="text-sm text-muted-foreground">Company name and symbol details.</p>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <Label htmlFor="company_name">Company Name</Label>
              <Input id="company_name" placeholder="e.g. Reliance Industries Ltd" value={newPost.company_name || ''} onChange={e => onNewPostChange('company_name', e.target.value)} className="mt-2" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="symbol1">Symbol</Label>
                <Input id="symbol1" placeholder="e.g. RELIANCE" value={newPost.symbol} onChange={e => onNewPostChange('symbol', e.target.value)} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="symbol2">Compare (optional)</Label>
                <Input id="symbol2" placeholder="e.g. TCS" value={newPost.compared} onChange={e => onNewPostChange('compared', e.target.value)} className="mt-2" />
              </div>
            </div>
            {newPost.symbol && (
              <div className="mt-4 h-[30vh] w-full">
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
          </div>
          <div className="border-t p-3 text-xs text-muted-foreground">
            Add a symbol for chart preview and comparison.
          </div>
        </div>

        {/* Investment Strategy Section */}
        <div className="bg-card border rounded-lg">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-base">Investment Strategy</h2>
            <p className="text-sm text-muted-foreground">Define your investment approach and risk parameters.</p>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <Label>Holding Period</Label>
              <Select value={newPost.holding} onValueChange={val => onNewPostChange('holding', val)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select holding period" />
                </SelectTrigger>
                <SelectContent>
                  {MASTER_FILTERS.holding.map(opt => (
                    <SelectItem key={opt.name} value={opt.name.toLowerCase().replace(/\s/g, '_')}>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <opt.Icon className="w-4 h-4 mr-2" />
                          {addSpacing(opt.name)}
                        </div>
                        <span className="text-sm text-muted-foreground ml-6">{opt.desc}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Asset Type</Label>
              <Select value={newPost.asset_type} onValueChange={val => onNewPostChange('asset_type', val)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select asset type" />
                </SelectTrigger>
                <SelectContent>
                  {MASTER_FILTERS.assets.map(opt => (
                    <SelectItem key={opt.name} value={opt.name.toLowerCase().replace(/\s/g, '_')}>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <opt.Icon className="w-4 h-4 mr-2" />
                          {opt.name}
                        </div>
                        <span className="text-xs text-muted-foreground ml-6">{opt.desc}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Risk Level</Label>
                <Select value={newPost.risk} onValueChange={val => onNewPostChange('risk', val)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select risk" />
                  </SelectTrigger>
                  <SelectContent>
                    {MASTER_FILTERS.risk.map(opt => (
                      <SelectItem key={opt.name} value={opt.name.toLowerCase().replace(/\s/g, '_')}>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <opt.Icon className="w-4 h-4 mr-2" />
                            {opt.name}
                          </div>
                          <span className="text-xs text-muted-foreground ml-6">{opt.desc}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Conviction</Label>
                <Select value={newPost.conviction} onValueChange={val => onNewPostChange('conviction', val)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select conviction" />
                  </SelectTrigger>
                  <SelectContent>
                    {MASTER_FILTERS.conviction.map(opt => (
                      <SelectItem key={opt.name} value={opt.name.toLowerCase().replace(/\s/g, '_')}>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <opt.Icon className="w-4 h-4 mr-2" />
                            {opt.name}
                          </div>
                          <span className="text-xs text-muted-foreground ml-6">{opt.desc}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Strategy</Label>
              <Select value={newPost.strategy} onValueChange={val => onNewPostChange('strategy', val)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select strategy" />
                </SelectTrigger>
                <SelectContent>
                  {MASTER_FILTERS.strategies.map(opt => (
                    <SelectItem key={opt.name} value={opt.name.toLowerCase().replace(/\s/g, '_')}>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <opt.Icon className="w-4 h-4 mr-2" />
                          {opt.name}
                        </div>
                        <span className="text-xs text-muted-foreground ml-6">{opt.desc}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Sentiment</Label>
                <Select value={newPost.sentiment} onValueChange={val => onNewPostChange('sentiment', val)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select sentiment" />
                  </SelectTrigger>
                  <SelectContent>
                    {MASTER_FILTERS.sentiments.map(opt => (
                      <SelectItem key={opt.name} value={opt.name.toLowerCase().replace(/\s/g, '_')}>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <opt.Icon className="w-4 h-4 mr-2" />
                            {opt.name}
                          </div>
                          <span className="text-xs text-muted-foreground ml-6">{opt.desc}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Sector</Label>
                <Select value={newPost.sector} onValueChange={val => onNewPostChange('sector', val)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {MASTER_FILTERS.sectors.map(opt => (
                      <SelectItem key={opt.name} value={opt.name.toLowerCase().replace(/\s/g, '_')}>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <opt.Icon className="w-4 h-4 mr-2" />
                            {opt.name}
                          </div>
                          <span className="text-xs text-muted-foreground ml-6">{opt.desc}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Target Duration</Label>
              <Select value={newPost.target_duration} onValueChange={val => onNewPostChange('target_duration', val)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select target duration" />
                </SelectTrigger>
                <SelectContent>
                  {MASTER_FILTERS.duration.map(opt => (
                    <SelectItem key={opt.name} value={opt.name.toLowerCase().replace(/\s/g, '_')}>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <opt.Icon className="w-4 h-4 mr-2" />
                          {opt.name}
                        </div>
                        <span className="text-xs text-muted-foreground ml-6">{opt.desc}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="border-t p-3 text-xs text-muted-foreground">
            These settings help categorize and filter your investment tip.
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-background p-4">
        <div className="flex justify-center gap-3">
          <Button variant="outline" onClick={() => { setDrawerOpen(false); if (onCancelNewPost) onCancelNewPost(); }} type="button">Cancel</Button>
          <Button variant="default" onClick={handleSubmitNewPostWrapper} disabled={submitting} type="button">{submitting ? 'Submitting...' : 'Submit'}</Button>
          <Button variant="secondary" onClick={handleSubmitNewPostAndNewWrapper} disabled={submitting} type="button">{submitting ? 'Submitting...' : 'Submit and New'}</Button>
        </div>
      </div>
    </DrawerContent>
  </Drawer></>}
        <div style={{ display: 'flex', gap: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <div style={{ flex: 1 }}>
            <Label style={{ marginTop: 20, marginBottom: 10 }} htmlFor="company_name">Company Name</Label>
            <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
              The full name of the company you are posting about.
            </span>
            <Input id="company_name" placeholder="e.g. Reliance Industries Ltd" value={newPost.company_name || ''} onChange={e => onNewPostChange('company_name', e.target.value)} style={{ marginTop: 4, width: '100%' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <div style={{ flex: 1 }}>
            <Label style={{ marginTop: 20, marginBottom: 10 }} htmlFor="symbol1">Symbol</Label>
            <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
              The ticker symbol for the company or asset (e.g. RELIANCE).
            </span>
            <Input id="symbol1" placeholder="e.g. RELIANCE" value={newPost.symbol} onChange={e => onNewPostChange('symbol', e.target.value)} style={{ marginTop: 4, width: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <Label style={{ marginTop: 20, marginBottom: 10 }} htmlFor="symbol2">Compare (optional)</Label>
            <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
              Optionally, add a second symbol to compare performance.
            </span>
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
          <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
            How long you plan to hold this position.
          </span>
          <Select value={newPost.holding} onValueChange={val => onNewPostChange('holding', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select holding period">{newPost.holding && getDisplayText(newPost.holding, holdingOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {MASTER_FILTERS.holding.map(opt => (
                <SelectItem key={opt.name} value={opt.name.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <opt.Icon className="w-4 h-4 mr-2" />
                      {addSpacing(opt.name)}
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{opt.desc}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 20, marginBottom: 10 }} htmlFor="conviction">Asset Type</Label>

<span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
  Select the type of asset for your tip. This helps categorize your post and show relevant fields.
</span>
<Select value={newPost.asset_type} onValueChange={val => onNewPostChange('asset_type', val)}>
  <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
    <SelectValue value={newPost.asset_type || assestType} onValueChange={val => onNewPostChange('asset_type', val)} placeholder="Select asset type">
    </SelectValue>    
  </SelectTrigger>
  <SelectContent>
    {MASTER_FILTERS.assets.map(opt => (
      <SelectItem key={opt.name} value={opt.name.toLowerCase().replace(/\s/g, '_')}>
        <div className="flex flex-col">
          <div className="flex items-center">
            <opt.Icon className="w-4 h-4 mr-2" />
            {opt.name}
          </div>
          <span style={{ fontSize: 12, color: '#888', marginLeft: 28 }}>{opt.desc}</span>
        </div>
      </SelectItem>
    ))}
  </SelectContent>
</Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Risk</Label>
          <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
            How risky is this investment idea?
          </span>
          <Select value={newPost.risk} onValueChange={val => onNewPostChange('risk', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select risk">{newPost.risk && getDisplayText(newPost.risk, riskOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {MASTER_FILTERS.risk.map(opt => (
                <SelectItem key={opt.name} value={opt.name.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <opt.Icon className="w-4 h-4 mr-2" />
                      {opt.name}
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{opt.desc}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Conviction</Label>
          <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
            How strongly do you believe in this idea?
          </span>
          <Select value={newPost.conviction} onValueChange={val => onNewPostChange('conviction', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select conviction">{newPost.conviction && getDisplayText(newPost.conviction, convictionOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {MASTER_FILTERS.conviction.map(opt => (
                <SelectItem key={opt.name} value={opt.name.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <opt.Icon className="w-4 h-4 mr-2" />
                      {opt.name}
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{opt.desc}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Strategy (Details)</Label>
          <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
            What is your investment strategy for this tip?
          </span>
          <Select value={newPost.strategy} onValueChange={val => onNewPostChange('strategy', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select strategy">{newPost.strategy && getDisplayText(newPost.strategy, strategyOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {MASTER_FILTERS.strategies.map(opt => (
                <SelectItem key={opt.name} value={opt.name.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <opt.Icon className="w-4 h-4 mr-2" />
                      {opt.name}
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{opt.desc}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Sentiment</Label>
          <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
            What is your market sentiment for this tip?
          </span>
          <Select value={newPost.sentiment} onValueChange={val => onNewPostChange('sentiment', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select sentiment">{newPost.sentiment && getDisplayText(newPost.sentiment, sentimentOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {MASTER_FILTERS.sentiments.map(opt => (
                <SelectItem key={opt.name} value={opt.name.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <opt.Icon className="w-4 h-4 mr-2" />
                      {opt.name}
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{opt.desc}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Sector</Label>
          <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
            Which sector does this tip belong to?
          </span>
          <Select value={newPost.sector} onValueChange={val => onNewPostChange('sector', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select sector">{newPost.sector && getDisplayText(newPost.sector, sectorOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {MASTER_FILTERS.sectors.map(opt => (
                <SelectItem key={opt.name} value={opt.name.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <opt.Icon className="w-4 h-4 mr-2" />
                      {opt.name}
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{opt.desc}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Target Duration</Label>
          <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
            How long do you expect to hold this position?
          </span>
          <Select value={newPost.target_duration} onValueChange={val => onNewPostChange('target_duration', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select target duration">{newPost.target_duration && getDisplayText(newPost.target_duration, targetDurationOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {MASTER_FILTERS.duration.map(opt => (
                <SelectItem key={opt.name} value={opt.name.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <opt.Icon className="w-4 h-4 mr-2" />
                      {opt.name}
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{opt.desc}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Catalyst</Label>
          <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
            What event or factor could drive this idea?
          </span>
          <Select value={newPost.catalyst} onValueChange={val => onNewPostChange('catalyst', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select catalyst">{newPost.catalyst && getDisplayText(newPost.catalyst, catalystOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {[
                { key: 'Earnings', desc: 'Company earnings report.' },
                { key: 'Fed Policy', desc: 'Central bank policy change.' },
                { key: 'Mergers', desc: 'Mergers or acquisitions.' },
                { key: 'Product Launch', desc: 'New product launch.' },
                { key: 'Regulation', desc: 'Regulatory change.' },
                { key: 'Market Event', desc: 'Major market event.' },
                { key: 'Analyst Upgrade', desc: 'Analyst rating upgrade.' },
                { key: 'Buyback', desc: 'Company share buyback.' },
                { key: 'Dividend Hike', desc: 'Increase in dividend payout.' },
                { key: 'Sector Rotation', desc: 'Shift in sector focus.' },
                { key: 'Geopolitical', desc: 'Geopolitical event.' },
                { key: 'Innovation', desc: 'New innovation.' },
                { key: 'Litigation', desc: 'Legal action.' },
                { key: 'Supply Chain', desc: 'Supply chain disruption.' }
              ].map(opt => (
                <SelectItem key={opt.key} value={opt.key.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      {opt.key === 'Earnings' && <BarChart2 className="w-4 h-4 mr-2" />}
                      {opt.key === 'Fed Policy' && <Globe className="w-4 h-4 mr-2" />}
                      {opt.key === 'Mergers' && <MoreHorizontal className="w-4 h-4 mr-2" />}
                      {opt.key === 'Product Launch' && <ShoppingCart className="w-4 h-4 mr-2" />}
                      {opt.key === 'Regulation' && <Gavel className="w-4 h-4 mr-2" />}
                      {opt.key === 'Market Event' && <Activity className="w-4 h-4 mr-2" />}
                      {opt.key === 'Analyst Upgrade' && <TrendingUp className="w-4 h-4 mr-2" />}
                      {opt.key === 'Buyback' && <RefreshCcw className="w-4 h-4 mr-2" />}
                      {opt.key === 'Dividend Hike' && <DollarSign className="w-4 h-4 mr-2" />}
                      {opt.key === 'Sector Rotation' && <ArrowRight className="w-4 h-4 mr-2" />}
                      {opt.key === 'Geopolitical' && <Globe className="w-4 h-4 mr-2" />}
                      {opt.key === 'Innovation' && <Zap className="w-4 h-4 mr-2" />}
                      {opt.key === 'Litigation' && <Gavel className="w-4 h-4 mr-2" />}
                      {opt.key === 'Supply Chain' && <Layers className="w-4 h-4 mr-2" />}
                      {opt.key}
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{opt.desc}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Valuation</Label>
          <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
            How is this asset valued?
          </span>
          <Select value={newPost.valuation} onValueChange={val => onNewPostChange('valuation', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select valuation">{newPost.valuation && getDisplayText(newPost.valuation, valuationOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {[
                { key: 'Low P/E (<15x)', desc: 'Low price-to-earnings ratio.' },
                { key: 'Mid P/E (15–25x)', desc: 'Medium price-to-earnings ratio.' },
                { key: 'High P/E (>25x)', desc: 'High price-to-earnings ratio.' },
                { key: 'Low EV/EBITDA (<10x)', desc: 'Low enterprise value to EBITDA.' },
                { key: 'Mid EV/EBITDA (10–15x)', desc: 'Medium enterprise value to EBITDA.' },
                { key: 'High EV/EBITDA (>15x)', desc: 'High enterprise value to EBITDA.' },
                { key: 'Discounted Cash Flow (10%+ IRR)', desc: 'Discounted cash flow analysis.' },
                { key: 'PEG Ratio ~1.5', desc: 'Price/earnings to growth ratio.' },
                { key: 'Low Price/Book (<2x)', desc: 'Low price-to-book ratio.' },
                { key: 'Low Price/Sales (<2x)', desc: 'Low price-to-sales ratio.' },
                { key: 'High ROE (>15%)', desc: 'High return on equity.' },
                { key: 'Low Debt/Equity (<0.5)', desc: 'Low debt-to-equity ratio.' }
              ].map(opt => (
                <SelectItem key={opt.key} value={opt.key.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      {opt.key === 'Low P/E (<15x)' && <TrendingDown className="w-4 h-4 mr-2" />}
                      {opt.key === 'Mid P/E (15–25x)' && <Minus className="w-4 h-4 mr-2" />}
                      {opt.key === 'High P/E (>25x)' && <TrendingUp className="w-4 h-4 mr-2" />}
                      {opt.key === 'Low EV/EBITDA (<10x)' && <TrendingDown className="w-4 h-4 mr-2" />}
                      {opt.key === 'Mid EV/EBITDA (10–15x)' && <Minus className="w-4 h-4 mr-2" />}
                      {opt.key === 'High EV/EBITDA (>15x)' && <TrendingUp className="w-4 h-4 mr-2" />}
                      {opt.key === 'Discounted Cash Flow (10%+ IRR)' && <BarChart2 className="w-4 h-4 mr-2" />}
                      {opt.key === 'PEG Ratio ~1.5' && <Activity className="w-4 h-4 mr-2" />}
                      {opt.key === 'Low Price/Book (<2x)' && <TrendingDown className="w-4 h-4 mr-2" />}
                      {opt.key === 'Low Price/Sales (<2x)' && <TrendingDown className="w-4 h-4 mr-2" />}
                      {opt.key === 'High ROE (>15%)' && <TrendingUp className="w-4 h-4 mr-2" />}
                      {opt.key === 'Low Debt/Equity (<0.5)' && <Shield className="w-4 h-4 mr-2" />}
                      {opt.key}
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{opt.desc}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Technical</Label>
          <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
            What technical indicator or signal supports your idea?
          </span>
          <Select value={newPost.technical} onValueChange={val => onNewPostChange('technical', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select technical">{newPost.technical && getDisplayText(newPost.technical, technicalOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {[
                { key: 'RSI Overbought 70', desc: 'Relative Strength Index above 70.' },
                { key: 'RSI Oversold 30', desc: 'Relative Strength Index below 30.' },
                { key: 'MACD Bullish', desc: 'MACD bullish crossover.' },
                { key: 'MACD Bearish', desc: 'MACD bearish crossover.' },
                { key: 'MA Crossover', desc: 'Moving average crossover.' },
                { key: 'ADX Trend 25', desc: 'ADX trend strength above 25.' },
                { key: 'Bollinger Breakout', desc: 'Bollinger Bands breakout.' },
                { key: 'Fibonacci', desc: 'Fibonacci retracement levels.' },
                { key: 'Support Break', desc: 'Support level broken.' },
                { key: 'Resistance Break', desc: 'Resistance level broken.' },
                { key: 'Volume Spike', desc: 'Unusual volume spike.' },
                { key: 'Stochastic 80', desc: 'Stochastic oscillator above 80.' },
                { key: 'Stochastic 20', desc: 'Stochastic oscillator below 20.' },
                { key: 'Ichimoku Buy', desc: 'Ichimoku cloud buy signal.' },
                { key: 'Ichimoku Sell', desc: 'Ichimoku cloud sell signal.' },
                { key: 'VWAP Bounce', desc: 'VWAP bounce signal.' }
              ].map(opt => (
                <SelectItem key={opt.key} value={opt.key.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      {opt.key === 'RSI Overbought 70' && <TrendingUp className="w-4 h-4 mr-2" />}
                      {opt.key === 'RSI Oversold 30' && <TrendingDown className="w-4 h-4 mr-2" />}
                      {opt.key === 'MACD Bullish' && <TrendingUp className="w-4 h-4 mr-2" />}
                      {opt.key === 'MACD Bearish' && <TrendingDown className="w-4 h-4 mr-2" />}
                      {opt.key === 'MA Crossover' && <ArrowUpRight className="w-4 h-4 mr-2" />}
                      {opt.key === 'ADX Trend 25' && <Activity className="w-4 h-4 mr-2" />}
                      {opt.key === 'Bollinger Breakout' && <ArrowUp className="w-4 h-4 mr-2" />}
                      {opt.key === 'Fibonacci' && <Layers className="w-4 h-4 mr-2" />}
                      {opt.key === 'Support Break' && <ArrowDown className="w-4 h-4 mr-2" />}
                      {opt.key === 'Resistance Break' && <ArrowUp className="w-4 h-4 mr-2" />}
                      {opt.key === 'Volume Spike' && <BarChart2 className="w-4 h-4 mr-2" />}
                      {opt.key === 'Stochastic 80' && <TrendingUp className="w-4 h-4 mr-2" />}
                      {opt.key === 'Stochastic 20' && <TrendingDown className="w-4 h-4 mr-2" />}
                      {opt.key === 'Ichimoku Buy' && <TrendingUp className="w-4 h-4 mr-2" />}
                      {opt.key === 'Ichimoku Sell' && <TrendingDown className="w-4 h-4 mr-2" />}
                      {opt.key === 'VWAP Bounce' && <RefreshCcw className="w-4 h-4 mr-2" />}
                      {opt.key}
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{opt.desc}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label style={{ marginTop: 40, marginBottom: 10 }}>Diversification</Label>
          <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
            How does this position fit into your overall portfolio?
          </span>
          <Select value={newPost.diversification} onValueChange={val => onNewPostChange('diversification', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select diversification">{newPost.diversification && getDisplayText(newPost.diversification, diversificationOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {[
                { key: 'Core', desc: 'Main part of your portfolio.' },
                { key: 'Satellite', desc: 'Smaller, supporting position.' },
                { key: 'Hedge', desc: 'Position to offset risk.' },
                { key: 'Tactical', desc: 'Short-term tactical position.' },
                { key: 'Diversifier', desc: 'Adds diversification.' },
                { key: 'Opportunistic', desc: 'Opportunistic trade.' },
                { key: 'Balanced', desc: 'Balanced position.' }
              ].map(opt => (
                <SelectItem key={opt.key} value={opt.key.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      {opt.key === 'Core' && <Shield className="w-4 h-4 mr-2" />}
                      {opt.key === 'Satellite' && <MoreHorizontal className="w-4 h-4 mr-2" />}
                      {opt.key === 'Hedge' && <Layers className="w-4 h-4 mr-2" />}
                      {opt.key === 'Tactical' && <Zap className="w-4 h-4 mr-2" />}
                      {opt.key === 'Diversifier' && <ArrowRight className="w-4 h-4 mr-2" />}
                      {opt.key === 'Opportunistic' && <TrendingUp className="w-4 h-4 mr-2" />}
                      {opt.key === 'Balanced' && <Minus className="w-4 h-4 mr-2" />}
                      {opt.key}
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{opt.desc}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Liquidity</Label>
          <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
            How easily can this asset be bought or sold?
          </span>
          <Select value={newPost.liquidity} onValueChange={val => onNewPostChange('liquidity', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select liquidity">{newPost.liquidity && getDisplayText(newPost.liquidity, liquidityOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {[
                { key: 'High Large Cap', desc: 'Very liquid, easy to trade.' },
                { key: 'Medium Mid Cap', desc: 'Moderately liquid.' },
                { key: 'Low Small Cap', desc: 'Less liquid, harder to trade.' },
                { key: 'Micro Cap', desc: 'Very illiquid.' },
                { key: 'High Volume', desc: 'High trading volume.' },
                { key: 'Low Volume', desc: 'Low trading volume.' },
                { key: 'Illiquid', desc: 'Difficult to buy or sell.' }
              ].map(opt => (
                <SelectItem key={opt.key} value={opt.key.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      {opt.key === 'High Large Cap' && <Droplets className="w-4 h-4 mr-2" />}
                      {opt.key === 'Medium Mid Cap' && <MoreHorizontal className="w-4 h-4 mr-2" />}
                      {opt.key === 'Low Small Cap' && <Minus className="w-4 h-4 mr-2" />}
                      {opt.key === 'Micro Cap' && <Droplet className="w-4 h-4 mr-2" />}
                      {opt.key === 'High Volume' && <Activity className="w-4 h-4 mr-2" />}
                      {opt.key === 'Low Volume' && <BarChart2 className="w-4 h-4 mr-2" />}
                      {opt.key === 'Illiquid' && <Lock className="w-4 h-4 mr-2" />}
                      {opt.key}
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{opt.desc}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Expected Return</Label>
          <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
            What return do you expect from this idea?
          </span>
          <Select value={newPost.expected_return} onValueChange={val => onNewPostChange('expected_return', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select expected return">{newPost.expected_return && getDisplayText(newPost.expected_return, expectedReturnOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {[
                { key: '<5%', desc: 'Less than 5% expected return.' },
                { key: '5-10%', desc: '5-10% expected return.' },
                { key: '10-20%', desc: '10-20% expected return.' },
                { key: '20-30%', desc: '20-30% expected return.' },
                { key: '30-50%', desc: '30-50% expected return.' },
                { key: '50%+', desc: 'More than 50% expected return.' },
                { key: 'Negative', desc: 'Expecting a loss.' }
              ].map(opt => (
                <SelectItem key={opt.key} value={opt.key.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      {opt.key === '<5%' && <TrendingDown className="w-4 h-4 mr-2" />}
                      {opt.key === '5-10%' && <Minus className="w-4 h-4 mr-2" />}
                      {opt.key === '10-20%' && <TrendingUp className="w-4 h-4 mr-2" />}
                      {opt.key === '20-30%' && <TrendingUp className="w-4 h-4 mr-2" />}
                      {opt.key === '30-50%' && <ArrowUp className="w-4 h-4 mr-2" />}
                      {opt.key === '50%+' && <ArrowUpRight className="w-4 h-4 mr-2" />}
                      {opt.key === 'Negative' && <TrendingDown className="w-4 h-4 mr-2" />}
                      {opt.key}
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{opt.desc}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Performance</Label>
          <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
            How do you expect this idea to perform relative to the market?
          </span>
          <Select value={newPost.performance} onValueChange={val => onNewPostChange('performance', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select performance">{newPost.performance && getDisplayText(newPost.performance, performanceOptions)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {[
                { key: 'Strong Underperform', desc: 'Expected to do much worse than market.' },
                { key: 'Underperform', desc: 'Expected to do worse than market.' },
                { key: 'Market', desc: 'Expected to match market performance.' },
                { key: 'Outperform', desc: 'Expected to do better than market.' },
                { key: 'Strong Outperform', desc: 'Expected to do much better than market.' },
                { key: 'Flat', desc: 'No expected movement.' }
              ].map(opt => (
                <SelectItem key={opt.key} value={opt.key.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      {opt.key === 'Strong Underperform' && <TrendingDown className="w-4 h-4 mr-2" />}
                      {opt.key === 'Underperform' && <ArrowDownLeft className="w-4 h-4 mr-2" />}
                      {opt.key === 'Market' && <Minus className="w-4 h-4 mr-2" />}
                      {opt.key === 'Outperform' && <ArrowUpRight className="w-4 h-4 mr-2" />}
                      {opt.key === 'Strong Outperform' && <TrendingUp className="w-4 h-4 mr-2" />}
                      {opt.key === 'Flat' && <ArrowRight className="w-4 h-4 mr-2" />}
                      {opt.key}
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{opt.desc}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* New Missing Fields */}
          <Label style={{ marginTop: 40, marginBottom: 10 }}>Regions</Label>
          <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
            Which geographic region is this investment focused on?
          </span>
          <Select value={newPost.regions} onValueChange={val => onNewPostChange('regions', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {[
                { key: 'North America', desc: 'United States, Canada, Mexico' },
                { key: 'Europe', desc: 'European markets and companies' },
                { key: 'Asia Pacific', desc: 'Asian markets including Japan, China, India' },
                { key: 'Emerging Markets', desc: 'Developing market economies' },
                { key: 'Global', desc: 'Worldwide or multi-regional exposure' },
                { key: 'Domestic', desc: 'Local/home market only' },
                { key: 'China', desc: 'China-focused investments' },
                { key: 'India', desc: 'India-focused investments' },
                { key: 'Japan', desc: 'Japan-focused investments' }
              ].map(opt => (
                <SelectItem key={opt.key} value={opt.key.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      {opt.key}
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{opt.desc}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label style={{ marginTop: 40, marginBottom: 10 }}>Valuation Metrics</Label>
          <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
            Which valuation metric best describes this investment?
          </span>
          <Select value={newPost.valuation_metrics} onValueChange={val => onNewPostChange('valuation_metrics', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select valuation metric" />
            </SelectTrigger>
            <SelectContent>
              {[
                { key: 'P/E Ratio', desc: 'Price to earnings ratio analysis' },
                { key: 'EV/EBITDA', desc: 'Enterprise value to EBITDA multiple' },
                { key: 'PEG Ratio', desc: 'Price/earnings to growth ratio' },
                { key: 'Price/Book', desc: 'Price to book value ratio' },
                { key: 'Price/Sales', desc: 'Price to sales ratio' },
                { key: 'DCF', desc: 'Discounted cash flow valuation' },
                { key: 'Free Cash Flow Yield', desc: 'Free cash flow relative to market cap' },
                { key: 'Dividend Yield', desc: 'Annual dividend relative to price' }
              ].map(opt => (
                <SelectItem key={opt.key} value={opt.key.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <BarChart2 className="w-4 h-4 mr-2" />
                      {opt.key}
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{opt.desc}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label style={{ marginTop: 40, marginBottom: 10 }}>Growth Metrics</Label>
          <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
            What growth metric supports this investment thesis?
          </span>
          <Select value={newPost.growth_metrics} onValueChange={val => onNewPostChange('growth_metrics', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select growth metric" />
            </SelectTrigger>
            <SelectContent>
              {[
                { key: 'Revenue Growth', desc: 'Strong revenue growth trajectory' },
                { key: 'Earnings Growth', desc: 'Consistent earnings growth' },
                { key: 'User Growth', desc: 'Growing user base or customer count' },
                { key: 'Market Share Growth', desc: 'Expanding market share' },
                { key: 'Margin Expansion', desc: 'Improving profit margins' },
                { key: 'ROE Growth', desc: 'Improving return on equity' },
                { key: 'Cash Flow Growth', desc: 'Growing free cash flow' },
                { key: 'Book Value Growth', desc: 'Increasing book value per share' }
              ].map(opt => (
                <SelectItem key={opt.key} value={opt.key.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      {opt.key}
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{opt.desc}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label style={{ marginTop: 40, marginBottom: 10 }}>Technical Indicators</Label>
          <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
            Which technical indicator supports this trade?
          </span>
          <Select value={newPost.technical_indicators} onValueChange={val => onNewPostChange('technical_indicators', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select technical indicator" />
            </SelectTrigger>
            <SelectContent>
              {[
                { key: 'RSI', desc: 'Relative Strength Index signal' },
                { key: 'MACD', desc: 'MACD crossover or divergence' },
                { key: 'Moving Averages', desc: 'Moving average crossover or support' },
                { key: 'Bollinger Bands', desc: 'Bollinger Band squeeze or breakout' },
                { key: 'Support/Resistance', desc: 'Key support or resistance levels' },
                { key: 'Volume', desc: 'Volume confirmation or spike' },
                { key: 'Momentum', desc: 'Momentum indicators' },
                { key: 'Trend Lines', desc: 'Trend line breaks or confirmations' }
              ].map(opt => (
                <SelectItem key={opt.key} value={opt.key.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <Activity className="w-4 h-4 mr-2" />
                      {opt.key}
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{opt.desc}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label style={{ marginTop: 40, marginBottom: 10 }}>ESG Ratings</Label>
          <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
            Environmental, Social, and Governance factors consideration.
          </span>
          <Select value={newPost.esg_ratings} onValueChange={val => onNewPostChange('esg_ratings', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select ESG rating" />
            </SelectTrigger>
            <SelectContent>
              {[
                { key: 'ESG Leader', desc: 'Strong ESG practices and leadership' },
                { key: 'ESG Positive', desc: 'Good ESG score and practices' },
                { key: 'ESG Neutral', desc: 'Average ESG considerations' },
                { key: 'ESG Improving', desc: 'Improving ESG practices' },
                { key: 'ESG Concern', desc: 'Some ESG concerns or risks' },
                { key: 'Not Applicable', desc: 'ESG not relevant for this investment' }
              ].map(opt => (
                <SelectItem key={opt.key} value={opt.key.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <Leaf className="w-4 h-4 mr-2" />
                      {opt.key}
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{opt.desc}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label style={{ marginTop: 40, marginBottom: 10 }}>Analysis Type</Label>
          <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
            What type of analysis supports this investment idea?
          </span>
          <Select value={newPost.analysis_type} onValueChange={val => onNewPostChange('analysis_type', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select analysis type" />
            </SelectTrigger>
            <SelectContent>
              {[
                { key: 'Fundamental', desc: 'Based on fundamental analysis' },
                { key: 'Technical', desc: 'Based on technical analysis' },
                { key: 'Quantitative', desc: 'Data-driven quantitative analysis' },
                { key: 'Macro', desc: 'Macroeconomic analysis' },
                { key: 'Event Driven', desc: 'Based on specific events or catalysts' },
                { key: 'Sentiment', desc: 'Market sentiment analysis' },
                { key: 'Hybrid', desc: 'Combination of multiple analysis types' }
              ].map(opt => (
                <SelectItem key={opt.key} value={opt.key.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {opt.key}
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{opt.desc}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label style={{ marginTop: 40, marginBottom: 10 }}>Volatility</Label>
          <span style={{ fontSize: 13, color: '#888', marginBottom: 8, display: 'block' }}>
            Expected volatility level for this investment.
          </span>
          <Select value={newPost.volatility} onValueChange={val => onNewPostChange('volatility', val)}>
            <SelectTrigger style={{ marginTop: 4, width: '100%' }}>
              <SelectValue placeholder="Select volatility level" />
            </SelectTrigger>
            <SelectContent>
              {[
                { key: 'Very Low', desc: 'Minimal price fluctuations expected' },
                { key: 'Low', desc: 'Below average volatility' },
                { key: 'Moderate', desc: 'Average market volatility' },
                { key: 'High', desc: 'Above average volatility' },
                { key: 'Very High', desc: 'Significant price swings expected' },
                { key: 'Extreme', desc: 'Highly volatile with major price moves' }
              ].map(opt => (
                <SelectItem key={opt.key} value={opt.key.toLowerCase().replace(/\s/g, '_')}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <Activity className="w-4 h-4 mr-2" />
                      {opt.key}
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{opt.desc}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div style={{ height: 80 }} />
     
   
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
        </div>
    </DrawerContent>
      </Drawer></>}
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
