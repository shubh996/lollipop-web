import { useEffect, useState, useRef } from "react";
import supabase from "@/lib/supabaseClient";
import { formatDistanceToNow } from "date-fns";
import TradingViewWidget from "@/components/TradingViewWidget";
import { 
  Search, 
  RefreshCw, 
  Info, 
  Sun, 
  Moon, 
  Bell, 
  User,
  TrendingUp, 
  TrendingDown, 
  Minus, 
  ArrowLeft,
  Loader2,
  X,
  Plus,
  Eye,
  Lock,
  Trash,
  MessageSquare,
  ArrowUpRight,
  Calendar,
  Clock,
  BarChart2,
  Target,
  ChevronDown,
  MoreHorizontal,
  Activity,
  Building,
  DollarSign,
  Shield,
  Briefcase,
  Package,
  Laptop,
  AlertTriangle,
  Gauge,
  Globe,
  FileText,
  Leaf,
  Droplets,
  Shuffle,
  Trophy,
  
  Zap,
  Calculator,
  Banknote,
  Upload,
  Settings,
  Edit2,
  Save,
  Building2,
  MapPin,
  PieChart,
  Award,
  LogIn,
  Lightbulb,
  Rocket,
  Percent,
  GitBranch,
  Home,
  Users,
  Factory,
  ExternalLink,
  Radio,
  Speaker,
  Settings2,
  Unlock,
  TrendingUp as TrendingUpIcon,
  BarChart3,
 
  Gift,
  Star,
  Crown,
  Gem,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Download,
  BookOpen,
  ArrowDown,
  ArrowUp,
  LogOut,
  Headphones,
  ChevronRight,
  UserPlus,
  Heart,
  Check,

} from "lucide-react";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Card, CardTitle, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

import LollipopSVG from '../assets/icons/lollipop.svg';
import LollipopSVGWhite from '../assets/icons/lollipop-white.svg';

// Master filter configuration inspired by TipScreen
const MASTER_FILTERS = {
  assets: [
    { name: 'Equity', Icon: BarChart2, desc: 'Individual company stocks and shares' },
    { name: 'Forex', Icon: DollarSign, desc: 'Foreign exchange currency pairs' },
    { name: 'ETF', Icon: Package, desc: 'Exchange-traded funds tracking indexes or sectors' },
    { name: 'Crypto', Icon: Shield, desc: 'Digital currencies and blockchain tokens' },
    { name: 'F&O', Icon: Target, desc: 'Futures and options derivatives' },
    { name: 'Bonds', Icon: Shield, desc: 'Government and corporate debt securities' },
    { name: 'Commodities', Icon: Package, desc: 'Physical goods like gold, oil, agricultural products' },
    { name: 'REITs', Icon: Home, desc: 'Real estate investment trusts' },
    { name: 'Mutual Funds', Icon: PieChart, desc: 'Professionally managed investment funds' },
    { name: 'Index Funds', Icon: BarChart2, desc: 'Funds tracking market indexes' },
  ],
  sectors: [
    { name: 'Technology', Icon: Laptop, desc: 'Software, hardware, and tech services companies' },
    { name: 'Finance', Icon: Building, desc: 'Banks, insurance, and financial services' },
    { name: 'Healthcare', Icon: Plus, desc: 'Pharmaceuticals, medical devices, and healthcare providers' },
    { name: 'Energy', Icon: Zap, desc: 'Oil, gas, renewable energy, and utilities' },
    { name: 'Consumer', Icon: Users, desc: 'Consumer retail and e-commerce companies' },
    { name: 'Industrials', Icon: Factory, desc: 'Manufacturing, aerospace, and industrial equipment' },
    { name: 'Real Estate', Icon: Home, desc: 'Property investments and development' },
    { name: 'Utilities', Icon: Zap, desc: 'Electric, gas, water, and waste management services' },
    { name: 'Materials', Icon: Package, desc: 'Basic materials, chemicals, and mining companies' },
    { name: 'Telecommunications', Icon: Radio, desc: 'Phone, internet, and communication infrastructure' },
    { name: 'Consumer Discretionary', Icon: Users, desc: 'Non-essential consumer goods and services' },
    { name: 'Consumer Staples', Icon: Package, desc: 'Essential consumer goods and services' },
  ],
  risk: [
    { name: 'Very Low', Icon: Shield, desc: 'Extremely safe investments like government bonds' },
    { name: 'Low', Icon: Shield, desc: 'Conservative investments with minimal risk of loss' },
    { name: 'Medium', Icon: Gauge, desc: 'Moderate risk with balanced return potential' },
    { name: 'High', Icon: AlertTriangle, desc: 'Aggressive investments with significant risk' },
    { name: 'Very High', Icon: AlertTriangle, desc: 'Speculative investments with potential for major losses' },
  ],
  strategies: [
    { name: 'Growth', Icon: TrendingUp, desc: 'Invest in companies with high growth potential' },
    { name: 'Value', Icon: Banknote, desc: 'Buy undervalued assets trading below intrinsic value' },
    { name: 'Momentum', Icon: Gauge, desc: 'Buy assets showing strong price trends and momentum' },
    { name: 'Income', Icon: DollarSign, desc: 'Focus on dividend-paying assets for regular income' },
    { name: 'Defensive', Icon: Shield, desc: 'Conservative approach to preserve capital' },
    { name: 'Contrarian', Icon: RefreshCw, desc: 'Go against popular market sentiment' },
    { name: 'Swing Trading', Icon: Activity, desc: 'Short to medium-term trading strategy' },
    { name: 'Position Trading', Icon: Target, desc: 'Long-term position holding strategy' },
  ],
  conviction: [
    { name: 'Speculative', Icon: AlertTriangle, desc: 'Weak conviction, just a hunch' },
    { name: 'Low', Icon: Minus, desc: 'Low conviction, not very confident' },
    { name: 'Moderate', Icon: Target, desc: 'Moderate conviction, some confidence' },
    { name: 'Strong', Icon: Award, desc: 'Strong conviction, confident' },
    { name: 'Very Strong', Icon: Trophy, desc: 'Very strong conviction, highly confident' },
  ],
  sentiment: [
    { name: 'Very Bullish', Icon: TrendingUp, desc: 'Extremely positive outlook' },
    { name: 'Bullish', Icon: TrendingUp, desc: 'Positive outlook' },
    { name: 'Neutral', Icon: Minus, desc: 'Balanced outlook' },
    { name: 'Bearish', Icon: TrendingDown, desc: 'Negative outlook' },
    { name: 'Very Bearish', Icon: TrendingDown, desc: 'Extremely negative outlook' },
  ],
  holding: [
    { name: 'Intraday', Icon: Clock, desc: 'Same day trading' },
    { name: '1W', Icon: Calendar, desc: 'One week holding period' },
    { name: '1M', Icon: Calendar, desc: 'One month holding period' },
    { name: '3M', Icon: Calendar, desc: 'Three months holding period' },
    { name: '6M', Icon: Calendar, desc: 'Six months holding period' },
    { name: '1Y', Icon: Calendar, desc: 'One year holding period' },
    { name: 'Long-Term', Icon: Calendar, desc: 'More than one year' },
  ],
  regions: [
    { name: 'India', Icon: Globe, desc: 'Indian markets' },
    { name: 'US', Icon: Globe, desc: 'United States markets' },
    { name: 'Europe', Icon: Globe, desc: 'European markets' },
    { name: 'Asia', Icon: Globe, desc: 'Asian markets' },
    { name: 'Global', Icon: Globe, desc: 'International markets' },
    { name: 'Emerging Markets', Icon: Globe, desc: 'Developing countries markets' },
  ],
  marketCap: [
    { name: 'Large Cap', Icon: Building, desc: 'Companies with market cap > ₹20,000 Cr' },
    { name: 'Mid Cap', Icon: Building, desc: 'Companies with market cap ₹5,000-20,000 Cr' },
    { name: 'Small Cap', Icon: Building, desc: 'Companies with market cap < ₹5,000 Cr' },
    { name: 'Micro Cap', Icon: Building, desc: 'Very small companies' },
  ],
  analysisType: [
    { name: 'Fundamental', Icon: FileText, desc: 'Based on company fundamentals' },
    { name: 'Technical', Icon: LineChart, desc: 'Based on price and volume patterns' },
    { name: 'Quantitative', Icon: Calculator, desc: 'Based on mathematical models' },
    { name: 'Macro', Icon: Globe, desc: 'Based on macroeconomic factors' },
    { name: 'Event-Driven', Icon: Zap, desc: 'Based on specific events or catalysts' },
  ],
};

export default function Page() {
  // Chart selection state
  const [selectedChart, setSelectedChart] = useState('winRate');
  // Active menu tab state
  const [activeTab, setActiveTab] = useState('analytics');
  // State management
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', profile_photo_url: '' });
  const [isUploading, setIsUploading] = useState(false);
  
  // Profile edit states (similar to TipScreen.jsx)
  const [editName, setEditName] = useState("");
  const [editPhoto, setEditPhoto] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const fileInputRef = useRef(null);
  
  // Search and filters
  const [search, setSearch] = useState("");
  const [showExpandedSearch, setShowExpandedSearch] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [selectedRisk, setSelectedRisk] = useState([]);
  const [selectedStrategies, setSelectedStrategies] = useState([]);
  const [selectedConviction, setSelectedConviction] = useState([]);
  const [showOnlyRecent, setShowOnlyRecent] = useState(false);
  
  // Active position filters
  const [selectedPositionStatus, setSelectedPositionStatus] = useState([]);
  const [selectedPositionDuration, setSelectedPositionDuration] = useState([]);
  const [selectedPerformance, setSelectedPerformance] = useState([]);
  const [showActivePositionsSheet, setShowActivePositionsSheet] = useState(false);
  
  // UI states
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // Initialize theme from localStorage or default to system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [showNewTipForm, setShowNewTipForm] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);
  const [showTipDetails, setShowTipDetails] = useState(false);
  const [showFiltersSheet, setShowFiltersSheet] = useState(false);
  const [editingTip, setEditingTip] = useState(null);
  const [selectedStatSheet, setSelectedStatSheet] = useState(null);
  const [showFullScreenChart, setShowFullScreenChart] = useState(false);
  const [chartSymbol, setChartSymbol] = useState(null);
  const [chartPeriod, setChartPeriod] = useState('3months');
  const [hoveredMetric, setHoveredMetric] = useState(null);
  
  // Notification state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'tip_performance',
      title: 'Your AAPL tip is performing well!',
      message: 'Your Apple Inc. investment tip has gained 8.5% since publication.',
      time: '2 hours ago',
      read: false,
      icon: 'trending-up',
      color: 'green'
    },
    {
      id: 2,
      type: 'new_follower',
      title: 'New follower',
      message: 'Rajesh Kumar started following your investment tips.',
      time: '4 hours ago',
      read: false,
      icon: 'user-plus',
      color: 'blue'
    },
    {
      id: 3,
      type: 'tip_liked',
      title: 'Tip received likes',
      message: '15 users liked your TSLA investment analysis.',
      time: '6 hours ago',
      read: true,
      icon: 'heart',
      color: 'red'
    },
    {
      id: 4,
      type: 'verification',
      title: 'Verification update',
      message: 'Your SEBI registration documents are under review.',
      time: '1 day ago',
      read: true,
      icon: 'shield-check',
      color: 'orange'
    },
    {
      id: 5,
      type: 'system',
      title: 'Platform update',
      message: 'New advanced charting features are now available.',
      time: '2 days ago',
      read: true,
      icon: 'info',
      color: 'purple'
    }
  ]);
  
  // New tip form state
  const [newTip, setNewTip] = useState({
    // Core tip information
    tip: '',
    symbol: '',
    asset: '',
    sector: '',
    
    // Advisor information (will be populated from user profile)
    advisor_name: '',
    advisor_avatar: '',
    advisor_sebi_registered: false,
    
    // Investment analysis
    sentiment: '',
    strategy: '',
    risk: '',
    expected_return: '',
    holding: '',
    duration: '',
    conviction: '',
    
    // Market data
    market_cap: '',
    dividend_yield: '',
    region: '',
    volatility: '',
    liquidity: '',
    win_rate: '',
    allocation: '',
    
    // Valuation metrics
    valuation_metric: '',
    growth_metric: '',
    valuation: '',
    
    // Technical analysis
    technical_indicator: '',
    technical: '',
    
    // ESG and other ratings
    esg_rating: '',
    analysis_type: '',
    
    // Investment thesis
    catalyst: '',
    diversification: '',
    performance: '',
    
    // Price targets
    entry_price: '',
    exit_price: '',
    stop_loss: '',
  });
  const [submitting, setSubmitting] = useState(false);

  // Initialize and fetch data
  useEffect(() => {
    console.log("🚀 [USE_EFFECT] Starting fetchUserAndPosts...");
    
    async function fetchUserAndPosts() {
      console.log("📋 [FETCH_USER_POSTS] Function started");
      console.log("⏳ [LOADING] Setting loading to true");
      setLoading(true);
      
      console.log("🔐 [AUTH] Getting user from Supabase auth...");
      const { data: authData } = await supabase.auth.getUser();
      console.log("🔐 [AUTH] Auth data received:", authData);
      console.log("👤 [USER] Setting user:", authData.user);
      setUser(authData.user);
      
      if (authData.user) {
        console.log("✅ [USER_EXISTS] User is authenticated, user ID:", authData.user.id);
        
        // Fetch user profile
        console.log("📊 [PROFILE] Fetching user profile from database...");
        const { data: profileData } = await supabase
          .from('users')
          .select('profile_photo_url, name, email')
          .eq('id', authData.user.id)
          .single();
        
        console.log("📊 [PROFILE] Profile data received:", profileData);
        console.log("📊 [PROFILE] Setting profile state:", profileData);
        setProfile(profileData);
        
        // Check if profile setup is needed
        console.log("🔍 [PROFILE_CHECK] Checking if profile setup is needed...");
        console.log("🔍 [PROFILE_CHECK] Profile name:", profileData?.name);
        console.log("🔍 [PROFILE_CHECK] Profile photo URL:", profileData?.profile_photo_url);
        
        if (!profileData?.name || !profileData?.profile_photo_url) {
          console.log("⚠️ [PROFILE_SETUP] Profile incomplete, showing setup dialog");
          setShowProfileSetup(true);
          const formData = {
            name: profileData?.name || '',
            profile_photo_url: profileData?.profile_photo_url || ''
          };
          console.log("📝 [PROFILE_FORM] Setting profile form data:", formData);
          setProfileForm(formData);
        } else {
          console.log("✅ [PROFILE_COMPLETE] Profile is complete, no setup needed");
        }
        
        // Fetch user's tips
        console.log("💡 [TIPS] Fetching user's investment tips...");
        console.log("💡 [TIPS] Query parameters - user_id:", authData.user.id);
        const { data: postsData } = await supabase
          .from("investment_tips")
          .select("*")
          .eq("user_id", authData.user.id)
          .order("created_at", { ascending: false });
        
        console.log("💡 [TIPS] Tips data received:", postsData);
        console.log("💡 [TIPS] Number of tips found:", postsData?.length || 0);
        console.log("💡 [TIPS] Setting posts state:", postsData || []);
        setPosts(postsData || []);
      } else {
        console.log("❌ [NO_USER] No authenticated user found");
        console.log("❌ [NO_USER] Setting profile to null");
        setProfile(null);
        console.log("❌ [NO_USER] Setting posts to empty array");
        setPosts([]);
      }
      
      console.log("⏳ [LOADING] Setting loading to false");
      setLoading(false);
      console.log("✅ [FETCH_USER_POSTS] Function completed successfully");
    }
    
    fetchUserAndPosts();
    console.log("🏁 [USE_EFFECT] fetchUserAndPosts function called");
  }, []);

  // Theme persistence effect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
      
      // Apply theme to document root for global CSS custom properties
      if (isDarkTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDarkTheme]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  // Filter posts based on search and filters
  useEffect(() => {
    console.log("🔍 [FILTER_EFFECT] Starting filter effect...");
    console.log("🔍 [FILTER_EFFECT] Total posts:", posts.length);
    console.log("🔍 [FILTER_EFFECT] Search term:", search);
    console.log("🔍 [FILTER_EFFECT] Selected assets:", selectedAssets);
    console.log("🔍 [FILTER_EFFECT] Selected sectors:", selectedSectors);
    console.log("🔍 [FILTER_EFFECT] Selected risk:", selectedRisk);
    console.log("🔍 [FILTER_EFFECT] Selected strategies:", selectedStrategies);
    console.log("🔍 [FILTER_EFFECT] Selected conviction:", selectedConviction);
    console.log("🔍 [FILTER_EFFECT] Show only recent:", showOnlyRecent);
    
    let filtered = [...posts];
    console.log("🔍 [FILTER_EFFECT] Initial filtered array length:", filtered.length);

    // Search filter
    if (search.trim()) {
      console.log("🔍 [SEARCH_FILTER] Applying search filter...");
      const searchTerm = search.toLowerCase();
      console.log("🔍 [SEARCH_FILTER] Search term (lowercase):", searchTerm);
      
      const beforeSearch = filtered.length;
      filtered = filtered.filter(tip => 
        tip.tip?.toLowerCase().includes(searchTerm) ||
        tip.symbol?.toLowerCase().includes(searchTerm) ||
        tip.sector?.toLowerCase().includes(searchTerm) ||
        tip.strategy?.toLowerCase().includes(searchTerm)
      );
      console.log("🔍 [SEARCH_FILTER] Posts after search filter:", filtered.length, "(was", beforeSearch, ")");
    }

    // Asset filter
    if (selectedAssets.length > 0) {
      console.log("🔍 [ASSET_FILTER] Applying asset filter...");
      const beforeAsset = filtered.length;
      filtered = filtered.filter(tip => selectedAssets.includes(tip.asset));
      console.log("🔍 [ASSET_FILTER] Posts after asset filter:", filtered.length, "(was", beforeAsset, ")");
    }

    // Sector filter
    if (selectedSectors.length > 0) {
      console.log("🔍 [SECTOR_FILTER] Applying sector filter...");
      const beforeSector = filtered.length;
      filtered = filtered.filter(tip => selectedSectors.includes(tip.sector));
      console.log("🔍 [SECTOR_FILTER] Posts after sector filter:", filtered.length, "(was", beforeSector, ")");
    }

    // Risk filter
    if (selectedRisk.length > 0) {
      console.log("🔍 [RISK_FILTER] Applying risk filter...");
      const beforeRisk = filtered.length;
      filtered = filtered.filter(tip => selectedRisk.includes(tip.risk));
      console.log("🔍 [RISK_FILTER] Posts after risk filter:", filtered.length, "(was", beforeRisk, ")");
    }

    // Strategy filter
    if (selectedStrategies.length > 0) {
      console.log("🔍 [STRATEGY_FILTER] Applying strategy filter...");
      const beforeStrategy = filtered.length;
      filtered = filtered.filter(tip => selectedStrategies.includes(tip.strategy));
      console.log("🔍 [STRATEGY_FILTER] Posts after strategy filter:", filtered.length, "(was", beforeStrategy, ")");
    }

    // Conviction filter
    if (selectedConviction.length > 0) {
      console.log("🔍 [CONVICTION_FILTER] Applying conviction filter...");
      const beforeConviction = filtered.length;
      filtered = filtered.filter(tip => selectedConviction.includes(tip.conviction));
      console.log("🔍 [CONVICTION_FILTER] Posts after conviction filter:", filtered.length, "(was", beforeConviction, ")");
    }

    // Recent filter (last 7 days)
    if (showOnlyRecent) {
      console.log("🔍 [RECENT_FILTER] Applying recent filter (last 7 days)...");
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      console.log("🔍 [RECENT_FILTER] Seven days ago date:", sevenDaysAgo);
      
      const beforeRecent = filtered.length;
      filtered = filtered.filter(tip => new Date(tip.created_at) > sevenDaysAgo);
      console.log("🔍 [RECENT_FILTER] Posts after recent filter:", filtered.length, "(was", beforeRecent, ")");
    }

    // Active position status filter
    if (selectedPositionStatus.length > 0) {
      console.log("🔍 [POSITION_STATUS_FILTER] Applying position status filter...");
      const beforePositionStatus = filtered.length;
      filtered = filtered.filter(tip => {
        // Simulate position status based on tip properties
        const tipDate = new Date(tip.created_at);
        const daysSinceCreated = Math.floor((new Date() - tipDate) / (1000 * 60 * 60 * 24));
        
        let positionStatus;
        if (tip.conviction === 'Very Strong' || tip.conviction === 'Strong') {
          positionStatus = daysSinceCreated < 30 ? 'active' : 'closed';
        } else if (tip.conviction === 'Medium') {
          positionStatus = daysSinceCreated < 7 ? 'pending' : 'watching';
        } else {
          positionStatus = 'watching';
        }
        
        return selectedPositionStatus.includes(positionStatus);
      });
      console.log("🔍 [POSITION_STATUS_FILTER] Posts after position status filter:", filtered.length, "(was", beforePositionStatus, ")");
    }

    // Position duration filter
    if (selectedPositionDuration.length > 0) {
      console.log("🔍 [POSITION_DURATION_FILTER] Applying position duration filter...");
      const beforeDuration = filtered.length;
      filtered = filtered.filter(tip => {
        const tipDate = new Date(tip.created_at);
        const daysSinceCreated = Math.floor((new Date() - tipDate) / (1000 * 60 * 60 * 24));
        
        let duration;
        if (daysSinceCreated < 30) duration = 'short-term';
        else if (daysSinceCreated < 180) duration = 'medium-term';
        else duration = 'long-term';
        
        return selectedPositionDuration.includes(duration);
      });
      console.log("🔍 [POSITION_DURATION_FILTER] Posts after duration filter:", filtered.length, "(was", beforeDuration, ")");
    }

    // Performance filter
    if (selectedPerformance.length > 0) {
      console.log("🔍 [PERFORMANCE_FILTER] Applying performance filter...");
      const beforePerformance = filtered.length;
      filtered = filtered.filter(tip => {
        // Simulate performance based on conviction and time
        const tipDate = new Date(tip.created_at);
        const daysSinceCreated = Math.floor((new Date() - tipDate) / (1000 * 60 * 60 * 24));
        
        let performance;
        if (tip.conviction === 'Very Strong') {
          performance = daysSinceCreated > 14 ? 'profitable' : 'break-even';
        } else if (tip.conviction === 'Strong') {
          performance = daysSinceCreated > 7 ? 'profitable' : 'break-even';
        } else if (tip.conviction === 'Medium') {
          performance = Math.random() > 0.5 ? 'break-even' : 'loss';
        } else {
          performance = 'loss';
        }
        
        return selectedPerformance.includes(performance);
      });
      console.log("🔍 [PERFORMANCE_FILTER] Posts after performance filter:", filtered.length, "(was", beforePerformance, ")");
    }

    console.log("🔍 [FILTER_EFFECT] Final filtered posts:", filtered.length);
    console.log("🔍 [FILTER_EFFECT] Filtered posts array:", filtered);
    console.log("🔍 [FILTER_EFFECT] Setting filteredPosts state...");
    setFilteredPosts(filtered);
    console.log("🔍 [FILTER_EFFECT] Filter effect completed");
  }, [posts, search, selectedAssets, selectedSectors, selectedRisk, selectedStrategies, selectedConviction, showOnlyRecent, selectedPositionStatus, selectedPositionDuration, selectedPerformance]);

  // Chart data generation function
  const getChartData = () => {
    const baseValue = posts.length > 0 ? posts.length * 10 : 50;
    
    if (chartPeriod === '7days') {
      return [
        { date: 'Aug 25', mobile: Math.floor(baseValue * 1.2), desktop: Math.floor(baseValue * 0.8) },
        { date: 'Aug 26', mobile: Math.floor(baseValue * 1.1), desktop: Math.floor(baseValue * 0.9) },
        { date: 'Aug 27', mobile: Math.floor(baseValue * 1.4), desktop: Math.floor(baseValue * 0.7) },
        { date: 'Aug 28', mobile: Math.floor(baseValue * 1.3), desktop: Math.floor(baseValue * 0.8) },
        { date: 'Aug 29', mobile: Math.floor(baseValue * 1.5), desktop: Math.floor(baseValue * 0.9) },
        { date: 'Aug 30', mobile: Math.floor(baseValue * 1.7), desktop: Math.floor(baseValue * 1.1) },
        { date: 'Aug 31', mobile: Math.floor(baseValue * 1.6), desktop: Math.floor(baseValue * 1.0) },
      ];
    }
    
    if (chartPeriod === '30days') {
      const data = [];
      for (let i = 1; i <= 30; i++) {
        const date = new Date(2025, 7, i); // August 2025
        const dateStr = `Aug ${i}`;
        const variation = Math.sin(i * 0.3) * 0.3 + Math.random() * 0.2;
        data.push({
          date: dateStr,
          mobile: Math.floor(baseValue * (1.2 + variation)),
          desktop: Math.floor(baseValue * (0.8 + variation * 0.5))
        });
      }
      return data;
    }
    
    // 3 months data
    const months = ['Jun', 'Jul', 'Aug'];
    const data = [];
    months.forEach((month, monthIndex) => {
      const daysInMonth = monthIndex === 0 ? 30 : monthIndex === 1 ? 31 : 31;
      for (let day = 2; day <= daysInMonth; day += 6) { // Every 6 days for density
        const variation = Math.sin(day * 0.2 + monthIndex * 2) * 0.4 + Math.random() * 0.3;
        data.push({
          date: `${month} ${day}`,
          mobile: Math.floor(baseValue * (1.1 + variation)),
          desktop: Math.floor(baseValue * (0.7 + variation * 0.6))
        });
      }
    });
    return data;
  };

  // Win Rate Chart data generation function
  const getWinRateChartData = () => {
    const baseTrades = posts.length > 0 ? Math.max(posts.length, 5) : 5;
    const baseRevenue = 45000; // Fixed dummy revenue base
    const baseTipsUnlocked = 52; // Fixed dummy tips unlocked base  
    const baseLollipopPoints = 3200; // Fixed dummy lollipop points base
    
    // Normalization factors for consistent percentage scaling
    const maxRevenue = baseRevenue * 1.5; // Max expected revenue
    const maxTipsUnlocked = baseTipsUnlocked * 1.2; // Max expected tips
    const maxLollipopPoints = baseLollipopPoints * 1.2; // Max expected points
    
    const normalizeToPercentage = (value, max) => Math.min((value / max) * 100, 100);
    
    const createDataPoint = (date, successRate, revenueRaw, tipsUnlockedRaw, lollipopPointsRaw) => ({
      date,
      // Raw values for tooltip display
      successRateRaw: successRate,
      revenueRaw,
      tipsUnlockedRaw,
      lollipopPointsRaw,
      // Normalized percentage values for chart visualization
      successRate, // Already in percentage
      revenue: normalizeToPercentage(revenueRaw, maxRevenue),
      tipsUnlocked: normalizeToPercentage(tipsUnlockedRaw, maxTipsUnlocked),
      lollipopPoints: normalizeToPercentage(lollipopPointsRaw, maxLollipopPoints)
    });
    
    if (chartPeriod === '7days') {
      return [
        createDataPoint(
          'Aug 25', 60, 
          Math.floor(baseRevenue * 0.8),
          Math.floor(baseTipsUnlocked * 0.85),
          Math.floor(baseLollipopPoints * 0.7)
        ),
        createDataPoint(
          'Aug 26', 70,
          Math.floor(baseRevenue * 0.9),
          Math.floor(baseTipsUnlocked * 0.9),
          Math.floor(baseLollipopPoints * 0.8)
        ),
        createDataPoint(
          'Aug 27', 80,
          Math.floor(baseRevenue * 1.2),
          Math.floor(baseTipsUnlocked * 0.95),
          Math.floor(baseLollipopPoints * 0.9)
        ),
        createDataPoint(
          'Aug 28', 50,
          Math.floor(baseRevenue * 0.6),
          Math.floor(baseTipsUnlocked * 0.8),
          Math.floor(baseLollipopPoints * 0.6)
        ),
        createDataPoint(
          'Aug 29', 90,
          Math.floor(baseRevenue * 1.5),
          Math.floor(baseTipsUnlocked * 1.0),
          Math.floor(baseLollipopPoints * 1.1)
        ),
        createDataPoint(
          'Aug 30', 70,
          Math.floor(baseRevenue * 1.1),
          Math.floor(baseTipsUnlocked * 0.95),
          Math.floor(baseLollipopPoints * 0.95)
        ),
        createDataPoint(
          'Aug 31', 80,
          Math.floor(baseRevenue * 1.3),
          Math.floor(baseTipsUnlocked * 1.0),
          Math.floor(baseLollipopPoints * 1.0)
        ),
      ];
    }
    
    if (chartPeriod === '30days') {
      const data = [];
      for (let i = 1; i <= 30; i++) {
        const dateStr = `Aug ${i}`;
        const successRate = 60 + Math.sin(i * 0.2) * 20 + (Math.random() - 0.5) * 10;
        const revenueMultiplier = 0.8 + Math.sin(i * 0.15) * 0.4 + Math.random() * 0.3;
        const unlockedMultiplier = 0.8 + Math.sin(i * 0.18) * 0.2 + Math.random() * 0.2;
        const pointsMultiplier = 0.6 + Math.sin(i * 0.1) * 0.3 + Math.random() * 0.4;
        
        const revenueRaw = Math.floor(baseRevenue * revenueMultiplier);
        const tipsUnlockedRaw = Math.floor(baseTipsUnlocked * unlockedMultiplier);
        const lollipopPointsRaw = Math.floor(baseLollipopPoints * pointsMultiplier);
        const successRateValue = Math.max(30, Math.min(90, successRate));
        
        data.push({
          date: dateStr,
          // Raw values for tooltip
          successRateRaw: successRateValue,
          revenueRaw,
          tipsUnlockedRaw,
          lollipopPointsRaw,
          // Normalized percentage values for chart
          successRate: successRateValue,
          revenue: normalizeToPercentage(revenueRaw, maxRevenue),
          tipsUnlocked: normalizeToPercentage(tipsUnlockedRaw, maxTipsUnlocked),
          lollipopPoints: normalizeToPercentage(lollipopPointsRaw, maxLollipopPoints)
        });
      }
      return data;
    }
    
    // 3 months data
    const months = ['Jun', 'Jul', 'Aug'];
    const data = [];
    months.forEach((month, monthIndex) => {
      const daysInMonth = monthIndex === 0 ? 30 : monthIndex === 1 ? 31 : 31;
      for (let day = 2; day <= daysInMonth; day += 6) { // Every 6 days for density
        const successRate = 65 + Math.sin(day * 0.15 + monthIndex) * 15 + (Math.random() - 0.5) * 10;
        const revenueMultiplier = 0.7 + Math.sin(day * 0.1 + monthIndex * 2) * 0.5 + Math.random() * 0.4;
        const unlockedMultiplier = 0.75 + Math.sin(day * 0.08 + monthIndex) * 0.25 + Math.random() * 0.2;
        const pointsMultiplier = 0.5 + Math.sin(day * 0.06 + monthIndex * 0.8) * 0.4 + Math.random() * 0.5;
        
        const revenueRaw = Math.floor(baseRevenue * revenueMultiplier);
        const tipsUnlockedRaw = Math.floor(baseTipsUnlocked * unlockedMultiplier);
        const lollipopPointsRaw = Math.floor(baseLollipopPoints * pointsMultiplier);
        const successRateValue = Math.max(30, Math.min(90, successRate));
        
        data.push({
          date: `${month} ${day}`,
          // Raw values for tooltip
          successRateRaw: successRateValue,
          revenueRaw,
          tipsUnlockedRaw,
          lollipopPointsRaw,
          // Normalized percentage values for chart
          successRate: successRateValue,
          revenue: normalizeToPercentage(revenueRaw, maxRevenue),
          tipsUnlocked: normalizeToPercentage(tipsUnlockedRaw, maxTipsUnlocked),
          lollipopPoints: normalizeToPercentage(lollipopPointsRaw, maxLollipopPoints)
        });
      }
    });
    return data;
  };

  // Get win rate statistics
  const getWinRateStats = () => {
    const chartData = getWinRateChartData();
    const avgSuccessRate = chartData.reduce((sum, item) => sum + item.successRate, 0) / chartData.length;
    const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);
    
    // For backward compatibility with existing successful/failed calculations
    const totalTrades = posts.length > 0 ? posts.length * 5 : 25; // Simulate trade count
    const successful = Math.floor((avgSuccessRate / 100) * totalTrades);
    const failed = totalTrades - successful;
    
    return {
      successful: successful,
      failed: failed,
      winRate: Math.round(avgSuccessRate),
      totalRevenue: totalRevenue
    };
  };

  // Profile image upload handler
  const handleProfileImageUpload = async (e) => {
    console.log("🖼️ [IMAGE_UPLOAD] Starting profile image upload...");
    console.log("🖼️ [IMAGE_UPLOAD] Event target:", e.target);
    
    const file = e.target.files[0];
    console.log("🖼️ [IMAGE_UPLOAD] Selected file:", file);
    
    if (!file) {
      console.log("❌ [IMAGE_UPLOAD] No file selected, returning");
      return;
    }
    
    console.log("📁 [IMAGE_UPLOAD] File details:");
    console.log("📁 [IMAGE_UPLOAD] - Name:", file.name);
    console.log("📁 [IMAGE_UPLOAD] - Size:", file.size, "bytes");
    console.log("📁 [IMAGE_UPLOAD] - Type:", file.type);
    console.log("📁 [IMAGE_UPLOAD] - Last modified:", new Date(file.lastModified));
    
    console.log("⏳ [IMAGE_UPLOAD] Setting isUploading to true");
    setIsUploading(true);
    
    try {
      const fileName = `${Date.now()}_${file.name}`;
      console.log("📝 [IMAGE_UPLOAD] Generated filename:", fileName);
      
      console.log("☁️ [STORAGE] Uploading to Supabase storage...");
      console.log("☁️ [STORAGE] Bucket: post-images");
      console.log("☁️ [STORAGE] Filename:", fileName);
      
      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(fileName, file);
      
      console.log("☁️ [STORAGE] Upload completed");
      console.log("☁️ [STORAGE] Upload error (if any):", uploadError);
      
      if (uploadError) {
        console.log("❌ [STORAGE] Upload failed, throwing error");
        throw uploadError;
      }
      
      console.log("✅ [STORAGE] Upload successful, getting public URL...");
      const { data: { publicUrl } } = supabase.storage
        .from('post-images')
        .getPublicUrl(fileName);
      
      console.log("🔗 [URL] Public URL generated:", publicUrl);
      
      console.log("📋 [FORM_UPDATE] Updating profile form with new image URL");
      console.log("📋 [FORM_UPDATE] Current profile form:", profileForm);
      
      setProfileForm(prev => {
        const updatedForm = {
          ...prev,
          profile_photo_url: publicUrl
        };
        console.log("📋 [FORM_UPDATE] Updated profile form:", updatedForm);
        return updatedForm;
      });
      
      console.log("🎉 [IMAGE_UPLOAD] Image upload completed successfully!");
    } catch (error) {
      console.log("❌ [IMAGE_UPLOAD] Error occurred during upload:");
      console.error('Error uploading image:', error);
      console.log("❌ [IMAGE_UPLOAD] Error message:", error.message);
      console.log("❌ [IMAGE_UPLOAD] Error code:", error.code);
      console.log("❌ [IMAGE_UPLOAD] Error details:", error.details);
      console.log("🚨 [IMAGE_UPLOAD] Showing error toast");
      toast.error('Failed to upload image');
    } finally {
      console.log("⏳ [IMAGE_UPLOAD] Setting isUploading to false");
      setIsUploading(false);
      console.log("🏁 [IMAGE_UPLOAD] Image upload process completed");
    }
  };

  // Profile submit handler
  const handleProfileSubmit = async (e) => {
    console.log("👤 [PROFILE_SUBMIT] Starting profile submission...");
    console.log("👤 [PROFILE_SUBMIT] Event:", e);
    
    e.preventDefault();
    console.log("👤 [PROFILE_SUBMIT] Default prevented");
    
    console.log("👤 [PROFILE_SUBMIT] Current profileForm state:", profileForm);
    console.log("👤 [PROFILE_SUBMIT] Name:", profileForm.name);
    console.log("👤 [PROFILE_SUBMIT] Name trimmed:", profileForm.name.trim());
    console.log("👤 [PROFILE_SUBMIT] Profile photo URL:", profileForm.profile_photo_url);
    
    console.log("🔍 [VALIDATION] Checking name field...");
    if (!profileForm.name.trim()) {
      console.log("❌ [VALIDATION] Name validation failed - empty name");
      toast.error('Please enter your name');
      return;
    }
    console.log("✅ [VALIDATION] Name validation passed");
    
    console.log("🔍 [VALIDATION] Checking profile photo URL...");
    if (!profileForm.profile_photo_url) {
      console.log("❌ [VALIDATION] Photo validation failed - no photo URL");
      toast.error('Please upload a profile picture');
      return;
    }
    console.log("✅ [VALIDATION] Photo validation passed");
    
    try {
      console.log("💾 [PROFILE_UPDATE] Starting database update...");
      console.log("💾 [PROFILE_UPDATE] User ID:", user.id);
      
      const updateData = {
        id: user.id,
        name: profileForm.name.trim(),
        profile_photo_url: profileForm.profile_photo_url,
      };
      
      console.log("💾 [PROFILE_UPDATE] Update data:", updateData);
      console.log("💾 [PROFILE_UPDATE] Upserting to users table...");
      
      const { error } = await supabase
        .from('users')
        .upsert(updateData, {
          onConflict: 'id'
        });
      
      console.log("💾 [PROFILE_UPDATE] Database operation completed");
      console.log("💾 [PROFILE_UPDATE] Error (if any):", error);
      
      if (error) {
        console.log("❌ [PROFILE_UPDATE] Database error occurred, throwing...");
        throw error;
      }
      
      console.log("✅ [PROFILE_UPDATE] Database update successful!");
      console.log("📋 [STATE_UPDATE] Updating profile state...");
      console.log("📋 [STATE_UPDATE] Current profile:", profile);
      
      const newProfileData = {
        ...profile,
        name: profileForm.name.trim(),
        profile_photo_url: profileForm.profile_photo_url
      };
      
      console.log("📋 [STATE_UPDATE] New profile data:", newProfileData);
      setProfile(newProfileData);
      
      console.log("🔄 [UI_UPDATE] Closing profile setup dialog");
      setShowProfileSetup(false);
      
      console.log("🎉 [SUCCESS] Showing success toast");
      toast.success('Profile updated successfully');
      
      console.log("✅ [PROFILE_SUBMIT] Profile submission completed successfully");
    } catch (error) {
      console.log("❌ [PROFILE_SUBMIT] Error occurred during submission:");
      console.error('Error updating profile:', error);
      console.log("❌ [PROFILE_SUBMIT] Error message:", error.message);
      console.log("❌ [PROFILE_SUBMIT] Error code:", error.code);
      console.log("❌ [PROFILE_SUBMIT] Error details:", error.details);
      console.log("🚨 [PROFILE_SUBMIT] Showing error toast");
      toast.error('Failed to update profile');
    }
    
    console.log("🏁 [PROFILE_SUBMIT] Profile submission process completed");
  };

  // New tip form handlers
  const handleNewTipChange = (field, value) => {
    setNewTip(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitNewTip = async () => {
    console.log("🚀 [TIP_SUBMIT] Starting tip submission process...");
    console.log("📝 [TIP_SUBMIT] Current newTip state:", newTip);
    
    console.log("🔍 [VALIDATION] Checking required fields...");
    console.log("🔍 [VALIDATION] Symbol:", newTip.symbol);
    console.log("🔍 [VALIDATION] Tip:", newTip.tip);
    
    if (!newTip.symbol || !newTip.tip) {
      console.log("❌ [VALIDATION] Validation failed - missing required fields");
      console.log("❌ [VALIDATION] Symbol present:", !!newTip.symbol);
      console.log("❌ [VALIDATION] Tip present:", !!newTip.tip);
      toast.error('Please fill in required fields (Symbol and Investment Tip)');
      return;
    }

    console.log("✅ [VALIDATION] Validation passed");
    console.log("⏳ [SUBMIT] Setting submitting state to true");
    setSubmitting(true);
    
    console.log("📊 [USER_CHECK] Current user:", user);
    console.log("📊 [USER_CHECK] User ID:", user?.id);
    console.log("📊 [PROFILE_CHECK] Current profile:", profile);
    console.log("📊 [PROFILE_CHECK] Profile photo URL:", profile?.profile_photo_url);
    console.log("📊 [PROFILE_CHECK] Profile name:", profile?.name);
    console.log("📊 [PROFILE_CHECK] User metadata photo:", user?.user_metadata?.profile_photo_url);
    console.log("📊 [PROFILE_CHECK] User metadata name:", user?.user_metadata?.name);
    
    const tipData = {
      ...newTip,
      user_id: user.id,
      advisor_name: profile?.name || user?.user_metadata?.name || '',
      advisor_avatar: profile?.profile_photo_url || user?.user_metadata?.profile_photo_url || '',
      advisor_sebi_registered: profile?.sebi_registered || false,
      created_at: new Date().toISOString(),
    };

    console.log("📋 [TIP_DATA] Final tip data to be inserted:", tipData);
    console.log("📋 [TIP_DATA] User ID:", tipData.user_id);
    console.log("📋 [TIP_DATA] Avatar URL:", tipData.avatar);
    console.log("📋 [TIP_DATA] Name:", tipData.name);
    console.log("📋 [TIP_DATA] Created at:", tipData.created_at);
    console.log("📋 [TIP_DATA] Symbol:", tipData.symbol);
    console.log("📋 [TIP_DATA] Tip content:", tipData.tip);

    console.log("💾 [DATABASE] Inserting tip into Supabase...");
    const { data, error } = await supabase.from('investment_tips').insert([tipData]);
    
    console.log("💾 [DATABASE] Insert operation completed");
    console.log("💾 [DATABASE] Returned data:", data);
    console.log("💾 [DATABASE] Error (if any):", error);
    
    if (!error) {
      console.log("✅ [SUCCESS] Tip inserted successfully!");
      console.log("📋 [STATE_UPDATE] Adding tip to posts state...");
      console.log("📋 [STATE_UPDATE] Current posts length:", posts.length);
      
      setPosts(prev => {
        const newPosts = [tipData, ...prev];
        console.log("📋 [STATE_UPDATE] New posts array length:", newPosts.length);
        console.log("📋 [STATE_UPDATE] New posts array:", newPosts);
        return newPosts;
      });
      
      console.log("🔄 [UI_RESET] Closing form dialog");
      setShowNewTipForm(false);
      
      const resetTipData = {
        // Core tip information
        tip: '',
        symbol: '',
        asset: '',
        sector: '',
        
        // Advisor information (will be populated from user profile)
        advisor_name: '',
        advisor_avatar: '',
        advisor_sebi_registered: false,
        
        // Investment analysis
        sentiment: '',
        strategy: '',
        risk: '',
        expected_return: '',
        holding: '',
        duration: '',
        conviction: '',
        
        // Market data
        market_cap: '',
        dividend_yield: '',
        region: '',
        volatility: '',
        liquidity: '',
        win_rate: '',
        allocation: '',
        
        // Valuation metrics
        valuation_metric: '',
        growth_metric: '',
        valuation: '',
        
        // Technical analysis
        technical_indicator: '',
        technical: '',
        
        // ESG and other ratings
        esg_rating: '',
        analysis_type: '',
        
        // Investment thesis
        catalyst: '',
        diversification: '',
        performance: '',
        
        // Price targets
        entry_price: '',
        exit_price: '',
        stop_loss: '',
      };
      
      console.log("🔄 [UI_RESET] Resetting newTip form to:", resetTipData);
      setNewTip(resetTipData);
      
      console.log("🎉 [SUCCESS] Showing success toast");
      toast.success('Tip created successfully!');
    } else {
      console.log("❌ [ERROR] Failed to insert tip");
      console.log("❌ [ERROR] Error details:", error);
      console.log("❌ [ERROR] Error message:", error.message);
      console.log("❌ [ERROR] Error code:", error.code);
      console.log("❌ [ERROR] Error details:", error.details);
      console.log("🚨 [ERROR] Showing error toast");
      toast.error('Failed to create tip');
    }
    
    console.log("⏳ [SUBMIT] Setting submitting state to false");
    setSubmitting(false);
    console.log("🏁 [TIP_SUBMIT] Tip submission process completed");
  };

  // Delete tip handler
  const handleDeleteTip = async (tip) => {
    if (!confirm('Are you sure you want to delete this tip?')) return;
    
    const { error } = await supabase
      .from('investment_tips')
      .delete()
      .eq('id', tip.id);
    
    if (!error) {
      setPosts(prev => prev.filter(p => p.id !== tip.id));
      toast.success('Tip deleted successfully');
    } else {
      toast.error('Failed to delete tip');
    }
  };

  // Filter toggle helper
  const toggleFilter = (filterArray, setFilter, value) => {
    if (filterArray.includes(value)) {
      setFilter(filterArray.filter(x => x !== value));
    } else {
      setFilter([...filterArray, value]);
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedAssets([]);
    setSelectedSectors([]);
    setSelectedRisk([]);
    setSelectedStrategies([]);
    setSelectedConviction([]);
    setShowOnlyRecent(false);
    setSearch('');
  };

  // Clear active position filters
  const clearActivePositionFilters = () => {
    setSelectedPositionStatus([]);
    setSelectedPositionDuration([]);
    setSelectedPerformance([]);
  };

  // Get active filter count
  const getActiveFilterCount = () => {
    return selectedAssets.length + selectedSectors.length + selectedRisk.length + 
           selectedStrategies.length + selectedConviction.length + (showOnlyRecent ? 1 : 0);
  };

  // Profile edit functionality (similar to TipScreen.jsx)
  useEffect(() => {
    setEditName(profile?.name || "");
  }, [profile?.name]);

  const handleProfileUpdate = async () => {
    setEditLoading(true);
    let photoUrl = profile?.profile_photo_url;
    
    if (editPhoto) {
      // Upload photo to Supabase storage
      const fileExt = editPhoto.name.split('.').pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;
      const { data, error } = await supabase.storage.from('post-images').upload(fileName, editPhoto);
      if (!error && data) {
        const publicUrlObj = supabase.storage.from('post-images').getPublicUrl(data.path);
        photoUrl = publicUrlObj.data.publicUrl;
      } else {
        console.error('Error uploading photo:', error);
        toast.error('Failed to upload photo');
        setEditLoading(false);
        return;
      }
    }

    // Update profile in database
    const { data: updateData, error: updateError } = await supabase
      .from('users')
      .update({ name: editName, profile_photo_url: photoUrl })
      .eq('id', user.id);

    if (!updateError) {
      // Update local state
      setProfile({ ...profile, name: editName, profile_photo_url: photoUrl });
      toast.success('Profile updated successfully!');
      setShowProfileSetup(false);
      setEditPhoto(null);
    } else {
      console.error('Error updating profile:', updateError);
      toast.error('Failed to update profile');
    }
    
    setEditLoading(false);
  };

  return (
    <div className={isDarkTheme ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 dark:from-black dark:via-black dark:to-gray-900/30 text-foreground transition-colors duration-300">
        
        {/* Account Settings Sheet */}
        <Sheet open={showProfileSetup} onOpenChange={setShowProfileSetup}>
          <SheetContent side="right" className="p-0 w-full sm:w-[500px] md:w-[600px] overflow-y-auto bg-background dark:bg-card border-l border-border">
            {/* Enhanced Header */}
            <div className="sticky top-0 z-10 bg-background/95 dark:bg-card/95 backdrop-blur-md border-b border-border/50">
              <div className="p-4 sm:p-6 pb-3 sm:pb-4">
                <div className="flex items-center justify-between">
                  <SheetTitle className="flex items-center gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl shadow-sm">
                      <Settings size={20} className="sm:size-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-bold">Account Settings</div>
                      <div className="text-xs sm:text-sm text-muted-foreground font-normal">Manage your profile, verification, and preferences</div>
                    </div>
                  </SheetTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowProfileSetup(false)}
                    className="h-8 w-8 p-0 rounded-lg hover:bg-muted"
                  >
                    <X size={16} className="text-muted-foreground" />
                  </Button>
                </div>
                
                {/* Progress Indicator */}
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/30">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${profile?.name ? 'bg-green-500' : 'bg-muted-foreground/30'}`}></div>
                      <span className={profile?.name ? 'text-green-600 dark:text-green-400' : ''}>Profile Info</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${profile?.sebi_registered ? 'bg-green-500' : 'bg-muted-foreground/30'}`}></div>
                      <span className={profile?.sebi_registered ? 'text-green-600 dark:text-green-400' : ''}>SEBI Verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${profile?.id_verified ? 'bg-green-500' : 'bg-muted-foreground/30'}`}></div>
                      <span className={profile?.id_verified ? 'text-green-600 dark:text-green-400' : ''}>ID Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
              {/* Section 1: Profile Information */}
              <Card className="border border-border/50 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <User size={18} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Profile Information</CardTitle>
                      <p className="text-sm text-muted-foreground">Basic details displayed on your profile</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Photo */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Profile Photo
                    </h4>
                    <div className="flex items-start gap-6 p-4 bg-muted/30 rounded-xl border border-border/30">
                      {profile?.profile_photo_url ? (
                        <Avatar className="h-20 w-20 ring-4 ring-primary/20 shadow-lg">
                          <AvatarImage src={profile.profile_photo_url} />
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-bold text-xl">
                            {(profile?.name || 'U').charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-lg">
                          <User size={32} className="text-primary" />
                        </div>
                      )}
                      <div className="flex-1 space-y-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => setEditPhoto(e.target.files[0])}
                          className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 border border-border rounded-lg"
                        />
                        <p className="text-xs text-muted-foreground">Upload JPG, PNG (max 5MB). This photo will be visible to other users.</p>
                        {editPhoto && (
                          <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                            <img src={URL.createObjectURL(editPhoto)} alt="Preview" className="w-12 h-12 rounded-lg object-cover shadow-sm" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-green-700 dark:text-green-300">New photo ready</p>
                              <p className="text-xs text-green-600 dark:text-green-400">{editPhoto.name}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Full Name
                      </h4>
                      <Input
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        placeholder="Enter your full name"
                        className="bg-background/50 border-border focus:border-primary h-11"
                      />
                      <p className="text-xs text-muted-foreground">This name appears on your investment tips and profile</p>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        Email Address
                      </h4>
                      <Input
                        value={profile?.email || user?.email}
                        disabled
                        className="bg-muted/30 text-muted-foreground cursor-not-allowed h-11"
                      />
                      <p className="text-xs text-muted-foreground">Email cannot be changed. Contact support if needed.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 2: Account Verification */}
              <Card className="border border-border/50 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <ShieldCheck size={18} className="text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Account Verification</CardTitle>
                      <p className="text-sm text-muted-foreground">Verify your identity and credentials</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* SEBI Registration */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        SEBI Registration Certificate
                      </h4>
                      {profile?.sebi_registered && (
                        <Badge className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
                          <ShieldCheck size={12} className="mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-200/50 dark:border-blue-800/50 space-y-4">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="w-full text-sm file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 border border-blue-200 dark:border-blue-800 rounded-lg bg-white dark:bg-blue-950/30"
                      />
                      <div className="flex items-start gap-3 p-3 bg-blue-100/50 dark:bg-blue-900/20 rounded-lg">
                        <Info size={16} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                          <p className="font-medium">SEBI Registration Benefits:</p>
                          <ul className="text-xs space-y-1 ml-4">
                            <li>• Verified advisor badge on your profile</li>
                            <li>• Higher visibility and trust for your tips</li>
                            <li>• Access to premium analytics features</li>
                            <li>• Priority customer support</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Government ID */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        Government ID Verification
                      </h4>
                      {profile?.id_verified && (
                        <Badge className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
                          <ShieldCheck size={12} className="mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="p-4 bg-orange-50/50 dark:bg-orange-900/10 rounded-xl border border-orange-200/50 dark:border-orange-800/50 space-y-4">
                      <select className="w-full p-3 border border-orange-200 dark:border-orange-800 rounded-lg bg-white dark:bg-orange-950/30 text-foreground">
                        <option>Select ID Type</option>
                        <option>Aadhaar Card</option>
                        <option>PAN Card</option>
                        <option>Passport</option>
                        <option>Driving License</option>
                        <option>Voter ID</option>
                      </select>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="w-full text-sm file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 border border-orange-200 dark:border-orange-800 rounded-lg bg-white dark:bg-orange-950/30"
                      />
                      <div className="flex items-start gap-3 p-3 bg-orange-100/50 dark:bg-orange-900/20 rounded-lg">
                        <ShieldAlert size={16} className="text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-orange-700 dark:text-orange-300 space-y-2">
                          <p className="font-medium">ID Verification Required For:</p>
                          <ul className="text-xs space-y-1 ml-4">
                            <li>• Publishing investment tips</li>
                            <li>• Receiving payments and rewards</li>
                            <li>• Account security and compliance</li>
                            <li>• Accessing advanced features</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Documents */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Additional Verification (Optional)
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-purple-50/50 dark:bg-purple-900/10 rounded-xl border border-purple-200/50 dark:border-purple-800/50">
                        <label className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2 block">Bank Statement</label>
                        <input
                          type="file"
                          accept=".pdf"
                          className="w-full text-xs file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-purple-100 file:text-purple-700 border border-purple-200 dark:border-purple-800 rounded-lg bg-white dark:bg-purple-950/30"
                        />
                        <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">Recent bank statement (PDF only)</p>
                      </div>
                      <div className="p-4 bg-purple-50/50 dark:bg-purple-900/10 rounded-xl border border-purple-200/50 dark:border-purple-800/50">
                        <label className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2 block">Professional Certificate</label>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="w-full text-xs file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-purple-100 file:text-purple-700 border border-purple-200 dark:border-purple-800 rounded-lg bg-white dark:bg-purple-950/30"
                        />
                        <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">CFA, FRM, etc. (PDF, JPG, PNG)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 3: Account Preferences */}
              <Card className="border border-border/50 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Settings2 size={18} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Account Preferences</CardTitle>
                      <p className="text-sm text-muted-foreground">Customize your experience and privacy settings</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "Email Notifications",
                      description: "Receive updates about your tips, performance, and account activity",
                      defaultChecked: true,
                      color: "text-blue-600"
                    },
                    {
                      title: "Public Profile",
                      description: "Make your profile and investment tips visible to other users",
                      defaultChecked: true,
                      color: "text-green-600"
                    },
                    {
                      title: "Show Investment Performance",
                      description: "Display your tip success rate and performance metrics publicly",
                      defaultChecked: false,
                      color: "text-orange-600"
                    },
                    {
                      title: "Allow Direct Messages",
                      description: "Let other users send you direct messages about your tips",
                      defaultChecked: false,
                      color: "text-purple-600"
                    }
                  ].map((preference, index) => (
                    <div key={index} className="flex items-start justify-between p-4 bg-muted/20 rounded-xl border border-border/30 hover:bg-muted/30 transition-colors">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 ${preference.color.replace('text-', 'bg-')} rounded-full`}></div>
                          <p className="text-sm font-medium text-foreground">{preference.title}</p>
                        </div>
                        <p className="text-xs text-muted-foreground ml-4">{preference.description}</p>
                      </div>
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 text-primary border-2 border-border rounded focus:ring-primary/20" 
                        defaultChecked={preference.defaultChecked}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Footer */}
            <div className="sticky bottom-0 bg-background/95 dark:bg-card/95 backdrop-blur-md border-t border-border/50">
              <div className="p-4 sm:p-6 space-y-4">
                {/* Account Status Summary */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-muted-foreground">Profile Complete</span>
                    </div>
                    {profile?.sebi_registered && (
                      <div className="flex items-center gap-1">
                        <ShieldCheck size={12} className="text-green-500" />
                        <span className="text-green-600 dark:text-green-400">SEBI Verified</span>
                      </div>
                    )}
                  </div>
                  <span className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleProfileUpdate}
                    disabled={editLoading}
                    className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg h-11 sm:h-12"
                  >
                    {editLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save All Changes
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowProfileSetup(false)}
                    disabled={editLoading}
                    className="sm:flex-none px-6 sm:px-8 h-11 sm:h-12 border-2"
                  >
                    Cancel
                  </Button>
                </div>
                
                {/* Help Text */}
                <p className="text-xs text-muted-foreground text-center">
                  Changes will be saved to your account. <a href="#" className="text-primary hover:underline">Need help?</a>
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Notifications Sheet */}
        <Sheet open={showNotifications} onOpenChange={setShowNotifications}>
          <SheetContent side="right" className="p-0 w-full sm:w-[400px] md:w-[450px] overflow-y-auto bg-background dark:bg-card border-l border-border">
            {/* Enhanced Header */}
            <div className="sticky top-0 z-10 bg-background/95 dark:bg-card/95 backdrop-blur-md border-b border-border/50">
              <div className="p-4 sm:p-6 pb-3 sm:pb-4">
                <div className="flex items-center justify-between">
                  <SheetTitle className="flex items-center gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500/20 to-blue-400/10 rounded-xl shadow-sm">
                      <Bell size={20} className="sm:size-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-bold">Notifications</div>
                      <div className="text-sm text-muted-foreground font-normal">
                        {notifications.filter(n => !n.read).length} unread notifications
                      </div>
                    </div>
                  </SheetTitle>
                  <div className="flex items-center gap-2">
                    {notifications.filter(n => !n.read).length > 0 && (
                      <div className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs font-medium rounded-full border border-red-200 dark:border-red-800">
                        {notifications.filter(n => !n.read).length} new
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNotifications(false)}
                      className="h-8 w-8 p-0 rounded-lg hover:bg-muted"
                    >
                      <X size={16} className="text-muted-foreground" />
                    </Button>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/30">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
                    <div>
                      <div className="text-sm font-semibold text-foreground">{notifications.length}</div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-red-600 dark:text-red-400">{notifications.filter(n => !n.read).length}</div>
                      <div className="text-xs text-muted-foreground">Unread</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-green-600 dark:text-green-400">{notifications.filter(n => n.type === 'tip_performance').length}</div>
                      <div className="text-xs text-muted-foreground">Tips</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">{notifications.filter(n => n.type === 'system').length}</div>
                      <div className="text-xs text-muted-foreground">System</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                  }}
                  className="text-xs"
                >
                  Mark all as read
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                >
                  Settings
                </Button>
              </div>

              {/* Notifications List */}
              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell size={48} className="mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No notifications yet</p>
                    <p className="text-xs text-muted-foreground mt-1">You'll see updates about your tips and account here</p>
                  </div>
                ) : (
                  notifications.map((notification) => {
                    const getIcon = (iconType) => {
                      switch (iconType) {
                        case 'trending-up': return <TrendingUp size={16} />;
                        case 'user-plus': return <UserPlus size={16} />;
                        case 'heart': return <Heart size={16} />;
                        case 'shield-check': return <ShieldCheck size={16} />;
                        case 'info': return <Info size={16} />;
                        default: return <Bell size={16} />;
                      }
                    };

                    const getColorClasses = (color) => {
                      switch (color) {
                        case 'green':
                          return {
                            bg: 'bg-green-100 dark:bg-green-900/20',
                            icon: 'text-green-600 dark:text-green-400',
                            border: 'border-green-200 dark:border-green-800'
                          };
                        case 'blue':
                          return {
                            bg: 'bg-blue-100 dark:bg-blue-900/20',
                            icon: 'text-blue-600 dark:text-blue-400',
                            border: 'border-blue-200 dark:border-blue-800'
                          };
                        case 'red':
                          return {
                            bg: 'bg-red-100 dark:bg-red-900/20',
                            icon: 'text-red-600 dark:text-red-400',
                            border: 'border-red-200 dark:border-red-800'
                          };
                        case 'orange':
                          return {
                            bg: 'bg-orange-100 dark:bg-orange-900/20',
                            icon: 'text-orange-600 dark:text-orange-400',
                            border: 'border-orange-200 dark:border-orange-800'
                          };
                        case 'purple':
                          return {
                            bg: 'bg-purple-100 dark:bg-purple-900/20',
                            icon: 'text-purple-600 dark:text-purple-400',
                            border: 'border-purple-200 dark:border-purple-800'
                          };
                        default:
                          return {
                            bg: 'bg-gray-100 dark:bg-gray-900/20',
                            icon: 'text-gray-600 dark:text-gray-400',
                            border: 'border-gray-200 dark:border-gray-800'
                          };
                      }
                    };

                    const colorClasses = getColorClasses(notification.color);

                    return (
                      <div 
                        key={notification.id}
                        className={`
                          p-4 rounded-xl border transition-all duration-200 cursor-pointer hover:shadow-md
                          ${!notification.read 
                            ? 'bg-primary/5 border-primary/20 shadow-sm' 
                            : 'bg-muted/20 border-border/30'
                          }
                        `}
                        onClick={() => {
                          setNotifications(prev => 
                            prev.map(n => 
                              n.id === notification.id ? { ...n, read: true } : n
                            )
                          );
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${colorClasses.bg} ${colorClasses.border} border`}>
                            <div className={colorClasses.icon}>
                              {getIcon(notification.icon)}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock size={10} />
                              {notification.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Notification Categories */}
              {notifications.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-border/30">
                  <h4 className="text-sm font-semibold text-foreground">Notification Types</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { type: 'Tip Performance', icon: <TrendingUp size={14} />, count: notifications.filter(n => n.type === 'tip_performance').length },
                      { type: 'New Followers', icon: <UserPlus size={14} />, count: notifications.filter(n => n.type === 'new_follower').length },
                      { type: 'Tip Interactions', icon: <Heart size={14} />, count: notifications.filter(n => n.type === 'tip_liked').length },
                      { type: 'System Updates', icon: <Info size={14} />, count: notifications.filter(n => n.type === 'system').length },
                    ].map((category, index) => (
                      <div key={index} className="p-3 bg-muted/20 rounded-lg border border-border/30">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="text-muted-foreground">{category.icon}</div>
                          <span className="text-xs font-medium text-foreground">{category.type}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{category.count} notifications</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Footer */}
            <div className="sticky bottom-0 bg-background/95 dark:bg-card/95 backdrop-blur-md border-t border-border/50">
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                {/* Notification Settings */}
                <div className="space-y-3">
                  <h5 className="text-sm font-semibold text-foreground">Notification Preferences</h5>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      <Settings2 size={12} className="mr-1" />
                      Settings
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      <Bell size={12} className="mr-1" />
                      Manage
                    </Button>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="default"
                    size="sm" 
                    onClick={() => {
                      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                    }}
                    className="flex-1 h-9 sm:h-10"
                    disabled={notifications.filter(n => !n.read).length === 0}
                  >
                    <Check size={14} className="mr-2" />
                    Mark All Read
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm" 
                    onClick={() => setShowNotifications(false)}
                    className="px-6 h-10"
                  >
                    Close
                  </Button>
                </div>
                
                {/* Status Info */}
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Stay updated with your investment tips and account activity
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last synced: {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Header */}
        <header className="w-full bg-background border-b-1 dark:border-b-1/2 border-#000/100 dark:border-#222/10 dark:from-card/95 dark:via-secondary/98 dark:to-card/95  sticky top-0 z-40 transition-all duration-300">
          <div className="w-full px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Left: Logo */}
              <div className="flex items-center gap-3">
                <div className="p-2  from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl border border-primary/15 dark:border-primary/25 hover:scale-105 transition-all duration-200">
                  <img src={isDarkTheme ? LollipopSVGWhite : LollipopSVG} alt="Lollipop" className="w-7 h-7" />
                </div>
                <div className="space-y-0">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent tracking-tight">LOLLIPOP</h1>
                  <p className="text-xs text-muted-foreground font-medium">Investment Analytics Dashboard</p>
                </div>
              </div>

              {/* Center: Navigation Menubar */}
              <div className="flex-1 flex justify-center">
             {/* New tip button */}
                <Button 
                  onClick={() => setShowNewTipForm(true)} 
                  variant="outline"
                  className={"border border-2 border-dashed border-muted-foreground/50 hover:border-primary/30"}
                >
                  <Plus size={14} />
                  <span className="hidden sm:inline">New Tip</span>
                </Button>
                
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                
                
                {/* Clear filters button (when active) */}
                {getActiveFilterCount() > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearAllFilters}
                    className="h-9 bg-background/50 dark:bg-secondary/50 border border-border/50 dark:border-border/70 hover:bg-destructive/10 hover:border-destructive/40 hover:text-destructive transition-all duration-200 rounded-xl px-3 font-medium text-xs"
                  >
                    <X size={12} className="mr-1" />
                    Clear ({getActiveFilterCount()})
                  </Button>
                )}

                

                {/* Theme Toggle */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleTheme}
                        className="h-9 w-9 p-0 rounded-xl bg-background/50 dark:bg-secondary/50 border border-border/50 dark:border-border/70 hover:border-primary/30 hover:bg-primary/5 hover:scale-105 transition-all duration-200"
                      >
                        {isDarkTheme ? (
                          <Sun size={16} className="text-yellow-500 dark:text-yellow-400" />
                        ) : (
                          <Moon size={16} className="text-muted-foreground dark:text-muted-foreground" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs p-0 bg-background/95 dark:bg-card/95 backdrop-blur-md border-2 border-border dark:border-border">
                      <div className="px-4 py-3">
                        <div className="text-sm font-semibold text-foreground mb-1">
                          Switch to {isDarkTheme ? 'Light' : 'Dark'} Mode
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Toggle between light and dark themes
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Notifications */}
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-9 w-9 p-0 rounded-xl bg-background/50 dark:bg-secondary/50 border border-border/50 dark:border-border/70 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                    onClick={() => setShowNotifications(true)}
                  >
                    <Bell size={16} className="text-muted-foreground hover:text-foreground" />
                  </Button>
                  {/* Notification Badge */}
                  {notifications.filter(n => !n.read).length > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {notifications.filter(n => !n.read).length}
                    </div>
                  )}
                </div>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-2 bg-background/50 dark:bg-secondary/50 border border-border/50 dark:border-border/70 rounded-2xl p-1.5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-pointer">
                      {profile?.profile_photo_url ? (
                        <Avatar className="h-7 w-7 ring-2 ring-primary/20 dark:ring-primary/30">
                          <AvatarImage src={profile.profile_photo_url} />
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 text-primary font-bold text-xs">
                            {(profile?.name || 'U').charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 flex items-center justify-center">
                          <User size={16} className="text-primary" />
                        </div>
                      )}
                      <div className="hidden sm:block">
                        <p className="text-xs font-semibold text-foreground leading-tight">{profile?.name || 'User'}</p>
                        <p className="text-xs text-muted-foreground leading-tight">{(profile?.email || user?.email)?.slice(0, 15)}...</p>
                      </div>
                      <ChevronDown size={12} className="text-muted-foreground ml-1" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 p-0 bg-background/95 dark:bg-card/95 backdrop-blur-md border-2 border-border dark:border-border shadow-xl rounded-2xl">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-border/50">
                      <div className="flex items-center gap-3">
                        {profile?.profile_photo_url ? (
                          <Avatar className="h-10 w-10 ring-2 ring-primary/20 dark:ring-primary/30">
                            <AvatarImage src={profile.profile_photo_url} />
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 text-primary font-bold">
                              {(profile?.name || 'U').charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 flex items-center justify-center">
                            <User size={20} className="text-primary" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{profile?.name || 'User'}</p>
                          <p className="text-xs text-muted-foreground truncate">{profile?.email || user?.email}</p>
                          {profile?.sebi_registered && (
                            <Badge variant="secondary" className="mt-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
                              <ShieldCheck size={10} className="mr-1" />
                              SEBI Registered
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Navigation Options */}
                    <div className="py-2">
                      <DropdownMenuItem 
                        className="px-4 py-3 hover:bg-muted/50 cursor-pointer rounded-xl mx-2"
                        onClick={() => setShowProfileSetup(true)}
                      >
                        <Settings size={16} className="mr-3 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">Account Settings</div>
                          <div className="text-xs text-muted-foreground">Manage your profile and preferences</div>
                        </div>
                        <ChevronRight size={14} className="text-muted-foreground" />
                      </DropdownMenuItem>

                      <DropdownMenuItem className="px-4 py-3 hover:bg-muted/50 cursor-pointer rounded-xl mx-2">
                        <Headphones size={16} className="mr-3 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">Contact Support</div>
                          <div className="text-xs text-muted-foreground">Get help from our team</div>
                        </div>
                        <ChevronRight size={14} className="text-muted-foreground" />
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="mx-2" />

                      <DropdownMenuItem className="px-4 py-3 hover:bg-destructive/10 text-destructive hover:text-destructive cursor-pointer rounded-xl mx-2">
                        <LogOut size={16} className="mr-3" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">Sign Out</div>
                          <div className="text-xs opacity-70">Logout from your account</div>
                        </div>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

        
          </div>
        </header>
        <main className="container mx-auto mx-[-10px] py-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center space-y-4">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">Loading your investment tips...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Analytics Tab Content */}
              {activeTab === 'analytics' && (
                <>
                  {/* Win Rate Performance Chart */}
                  <div>
                <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg">
                  {/* Header Section */}
                  <CardHeader className="pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      {/* Left Side - Win Rate Information */}
                      <div className="flex-1">
                        {/* Title and Main Win Rate */}
                        
                        
                        {/* Metrics Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                         

                          {/* Win Rate Card */}
                          <div
                            className={`bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-4 w-full cursor-pointer ${selectedChart === 'winRate' ? 'ring-2 ring-green-400' : ''}`}
                            onClick={() => setSelectedChart('winRate')}
                          >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
                              <div className="flex items-center gap-2">
                                <BarChart3 className="w-4 h-4 text-green-500" />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Win Rate</span>
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Performance</div>
                            </div>
                            
                            {/* Content */}
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                  {Math.round((getWinRateStats().successful / Math.max(getWinRateStats().successful + getWinRateStats().failed, 1)) * 100)}%
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Current Rate</div>
                              </div>
                              {/* Mini Chart */}
                              <div className="w-16 h-10">
                                <ChartContainer
                                  config={{
                                    success: {
                                      label: "Success",
                                      color: "#10B981",
                                    },
                                  }}
                                  className="h-full w-full"
                                >
                                  <AreaChart
                                    data={[
                                      { day: "1", success: 65 + Math.random() * 10 },
                                      { day: "2", success: 70 + Math.random() * 10 },
                                      { day: "3", success: 68 + Math.random() * 10 },
                                      { day: "4", success: 75 + Math.random() * 10 },
                                      { day: "5", success: 72 + Math.random() * 10 },
                                    ]}
                                    margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
                                  >
                                    <Area
                                      dataKey="success"
                                      type="monotone"
                                      fill="#10B981"
                                      stroke="#10B981"
                                      strokeWidth={1}
                                      dot={false}
                                    />
                                  </AreaChart>
                                </ChartContainer>
                              </div>
                            </div>

                          </div>
                          
                          {/* Revenue Card */}
                          <div
                            className={`bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-4 w-full cursor-pointer ${selectedChart === 'revenue' ? 'ring-2 ring-red-400' : ''}`}
                            onClick={() => setSelectedChart('revenue')}
                          >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
                              <div className="flex items-center gap-2">
                                <Banknote className="w-4 h-4 text-red-500" />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Revenue</span>
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Earnings</div>
                            </div>
                            
                            {/* Content */}
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                  ₹{(() => {
                                    const totalRevenue = posts.reduce((acc, tip) => acc + (parseFloat(tip.revenue) || 0), 0);
                                    return (totalRevenue / 1000).toFixed(1);
                                  })()}k
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total Earned</div>
                              </div>
                              {/* Mini Chart */}
                              <div className="w-16 h-10">
                                <ChartContainer
                                  config={{
                                    revenue: {
                                      label: "Revenue",
                                      color: "#EF4444",
                                    },
                                  }}
                                  className="h-full w-full"
                                >
                                  <AreaChart
                                    data={[
                                      { day: "1", revenue: 800 + Math.random() * 400 },
                                      { day: "2", revenue: 1200 + Math.random() * 600 },
                                      { day: "3", revenue: 950 + Math.random() * 500 },
                                      { day: "4", revenue: 1400 + Math.random() * 700 },
                                      { day: "5", revenue: 1100 + Math.random() * 550 },
                                    ]}
                                    margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
                                  >
                                    <Area
                                      dataKey="revenue"
                                      type="monotone"
                                      fill="#EF4444"
                                      stroke="#EF4444"
                                      strokeWidth={1}
                                      dot={false}
                                    />
                                  </AreaChart>
                                </ChartContainer>
                              </div>
                            </div>
                          </div>

                     

                          {/* Total Tips Card */}
                          <div
                            className={`bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-4 w-full cursor-pointer ${selectedChart === 'tips' ? 'ring-2 ring-purple-400' : ''}`}
                            onClick={() => setSelectedChart('tips')}
                          >
                            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-purple-500" />
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Total Tips</span>
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Count</div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                  {posts.length || 52}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total Published</div>
                              </div>
                              <div className="w-16 h-10">
                                <ChartContainer
                                  config={{
                                    tips: {
                                      label: "Tips",
                                      color: "#8B5CF6",
                                    },
                                  }}
                                  className="h-full w-full"
                                >
                                  <AreaChart
                                    data={[
                                      { day: "1", tips: 35 + Math.random() * 10 },
                                      { day: "2", tips: 42 + Math.random() * 12 },
                                      { day: "3", tips: 39 + Math.random() * 11 },
                                      { day: "4", tips: 45 + Math.random() * 13 },
                                      { day: "5", tips: posts.length || 52 },
                                    ]}
                                    margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
                                  >
                                    <Area
                                      dataKey="tips"
                                      type="monotone"
                                      fill="#8B5CF6"
                                      stroke="#8B5CF6"
                                      strokeWidth={1}
                                      dot={false}
                                    />
                                  </AreaChart>
                                </ChartContainer>
                              </div>
                            </div>
                          </div>

                          {/* Lollipop Points Card */}
                          <div
                            className={`bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-4 w-full cursor-pointer ${selectedChart === 'lollipop' ? 'ring-2 ring-orange-400' : ''}`}
                            onClick={() => setSelectedChart('lollipop')}
                          >
                            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
                              <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-orange-500" />
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Lollipop Points</span>
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Rewards</div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                  {(() => {
                                    const totalPoints = posts.reduce((acc, tip) => acc + (parseInt(tip.points) || 0), 0);
                                    return totalPoints || 2470;
                                  })()}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total Points</div>
                              </div>
                              <div className="w-16 h-10">
                                <ChartContainer
                                  config={{
                                    points: {
                                      label: "Points",
                                      color: "#F97316",
                                    },
                                  }}
                                  className="h-full w-full"
                                >
                                  <AreaChart
                                    data={[
                                      { day: "1", points: 2400 + Math.random() * 300 },
                                      { day: "2", points: 2650 + Math.random() * 350 },
                                      { day: "3", points: 2750 + Math.random() * 400 },
                                      { day: "4", points: 2820 + Math.random() * 420 },
                                      { day: "5", points: 2470 + Math.random() * 450 },
                                    ]}
                                    margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
                                  >
                                    <Area
                                      dataKey="points"
                                      type="monotone"
                                      fill="#F97316"
                                      stroke="#F97316"
                                      strokeWidth={1}
                                      dot={false}
                                    />
                                  </AreaChart>
                                </ChartContainer>
                              </div>
                            </div>
                          </div>
                         
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Chart Content */}
                  <CardContent className="pb-0">
                    
                    <div className="flex justify-end mb-4">
                      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                        <button
                          onClick={() => setChartPeriod('3months')}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                            chartPeriod === '3months'
                              ? 'bg-white dark:bg-black text-gray-900 dark:text-white shadow-sm'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          Last 3 months
                        </button>
                        <button
                          onClick={() => setChartPeriod('30days')}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                            chartPeriod === '30days'
                              ? 'bg-white dark:bg-black text-gray-900 dark:text-white shadow-sm'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          Last 30 days
                        </button>
                        <button
                          onClick={() => setChartPeriod('7days')}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                            chartPeriod === '7days'
                              ? 'bg-white dark:bg-black text-gray-900 dark:text-white shadow-sm'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          Last 7 days
                        </button>
                      </div>
                    </div>

    
    
    <div className="h-[250px] w-full pt-10">
                      <ChartContainer
                        config={
                          selectedChart === 'winRate'
                            ? {
                                successRate: {
                                  label: 'Win Rate',
                                  color: '#10B981',
                                },
                              }
                            : selectedChart === 'revenue'
                            ? {
                                revenue: {
                                  label: 'Revenue',
                                  color: '#EF4444',
                                },
                              }
                            : selectedChart === 'tips'
                            ? {
                                tipsUnlocked: {
                                  label: 'Total Tips',
                                  color: '#8B5CF6',
                                },
                              }
                            : {
                                lollipopPoints: {
                                  label: 'Lollipop Points',
                                  color: '#F97316',
                                },
                              }
                        }
                        className="h-full w-full"
                      >
                        <AreaChart
                          data={
                            selectedChart === 'winRate'
                              ? getWinRateChartData()
                              : selectedChart === 'revenue'
                              ? getWinRateChartData().map(d => ({ ...d, revenue: d.revenue }))
                              : selectedChart === 'tips'
                              ? getWinRateChartData().map(d => ({ ...d, tipsUnlocked: d.tipsUnlocked }))
                              : getWinRateChartData().map(d => ({ ...d, lollipopPoints: d.lollipopPoints }))
                          }
                          margin={{
                            top: 10,
                            right: 15,
                            left: 15,
                            bottom: 0,
                          }}
                        >
                          <defs>
                            <linearGradient id="colorSuccessRate" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0.2}/>
                            </linearGradient>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#EF4444" stopOpacity={0.05}/>
                            </linearGradient>
                            <linearGradient id="colorTipsUnlocked" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.5}/>
                              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="colorLollipopPoints" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#F97316" stopOpacity={0.5}/>
                              <stop offset="95%" stopColor="#F97316" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            className="text-xs text-gray-500 dark:text-gray-400"
                            interval={chartPeriod === '3months' ? 6 : chartPeriod === '30days' ? 3 : 0}
                          />
                          <YAxis hide />
                          <ChartTooltip 
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                // Get the correct data and styling based on selected chart
                                let value, displayText, color;
                                
                                if (selectedChart === 'winRate') {
                                  const successRate = payload.find(p => p.dataKey === 'successRate')?.value || 0;
                                  value = `${Math.round(successRate)}%`;
                                  displayText = 'Win Rate';
                                  color = 'bg-green-500';
                                } else if (selectedChart === 'revenue') {
                                  const revenueValue = payload.find(p => p.dataKey === 'revenue')?.value || 0;
                                  const rawRevenue = payload[0]?.payload?.revenueRaw || revenueValue * 450; // Approximate raw value
                                  value = `₹${(rawRevenue / 1000).toFixed(1)}k`;
                                  displayText = 'Revenue';
                                  color = 'bg-red-500';
                                } else if (selectedChart === 'tips') {
                                  const tipsValue = payload.find(p => p.dataKey === 'tipsUnlocked')?.value || 0;
                                  const rawTips = payload[0]?.payload?.tipsUnlockedRaw || Math.round(tipsValue * 0.52); // Approximate raw value
                                  value = rawTips.toString();
                                  displayText = 'Tips Unlocked';
                                  color = 'bg-purple-500';
                                } else if (selectedChart === 'lollipop') {
                                  const pointsValue = payload.find(p => p.dataKey === 'lollipopPoints')?.value || 0;
                                  const rawPoints = payload[0]?.payload?.lollipopPointsRaw || Math.round(pointsValue * 32); // Approximate raw value
                                  value = rawPoints.toString();
                                  displayText = 'Lollipop Points';
                                  color = 'bg-orange-500';
                                }
                                
                                return (
                                  <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg min-w-[160px] overflow-hidden">
                                    {/* Tooltip Content */}
                                    <div className="p-4 space-y-3">
                                      <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                          <div className={`w-3 h-3 rounded-full ${color}`} />
                                          <span className="text-sm text-gray-600 dark:text-gray-400">{displayText}</span>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                          {value}
                                        </span>
                                      </div>
                                    </div>
                                    
                                    {/* Tooltip Footer */}
                                    <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-t border-gray-200 dark:border-gray-600">
                                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                        {label}
                                      </p>
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          {selectedChart === 'winRate' && (
                            <Area
                              dataKey="successRate"
                              type="monotone"
                              stroke="#10B981"
                              strokeWidth={3}
                              fill="url(#colorSuccessRate)"
                              dot={false}
                              activeDot={{
                                r: 4,
                                fill: '#10B981',
                                stroke: '#ffffff',
                                strokeWidth: 2,
                              }}
                            />
                          )}
                          {selectedChart === 'revenue' && (
                            <Area
                              dataKey="revenue"
                              type="monotone"
                              stroke="#EF4444"
                              strokeWidth={3}
                              fill="url(#colorRevenue)"
                              dot={false}
                              activeDot={{
                                r: 4,
                                fill: '#EF4444',
                                stroke: '#ffffff',
                                strokeWidth: 2,
                              }}
                            />
                          )}
                          {selectedChart === 'tips' && (
                            <Area
                              dataKey="tipsUnlocked"
                              type="monotone"
                              stroke="#8B5CF6"
                              strokeWidth={3}
                              fill="url(#colorTipsUnlocked)"
                              dot={false}
                              activeDot={{
                                r: 4,
                                fill: '#8B5CF6',
                                stroke: '#ffffff',
                                strokeWidth: 2,
                              }}
                            />
                          )}
                          {selectedChart === 'lollipop' && (
                            <Area
                              dataKey="lollipopPoints"
                              type="monotone"
                              stroke="#F97316"
                              strokeWidth={3}
                              fill="url(#colorLollipopPoints)"
                              dot={false}
                              activeDot={{
                                r: 4,
                                fill: '#F97316',
                                stroke: '#ffffff',
                                strokeWidth: 2,
                              }}
                            />
                          )}
                        </AreaChart>
                      </ChartContainer>
                    </div>

                  </CardContent>

                </Card>
              </div>

              {/* Tips list */}
              <div className="space-y-4 pt-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    Investment Tips 
                    {filteredPosts.length !== posts.length && (
                      <span className="text-muted-foreground ml-2">
                        ({filteredPosts.length} of {posts.length})
                      </span>
                    )}
                  </h2>
                  <div className="flex items-center gap-2">

                     {/* Expandable Search */}
                    <div className="flex items-center gap-2">
                      {showExpandedSearch ? (
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                            <Input
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                              placeholder="Search tips..."
                              className="pl-10 pr-10 w-64 h-9 bg-background/80 dark:bg-secondary/80 border border-border/50 dark:border-border/70 rounded-xl text-sm"
                              autoFocus
                            />
                            {search && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 rounded-lg hover:bg-destructive/10 hover:text-destructive"
                                onClick={() => setSearch('')}
                              >
                                <X size={14} />
                              </Button>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowExpandedSearch(false)}
                            className="h-9 w-9 p-0 rounded-xl hover:bg-muted/50"
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowExpandedSearch(true)}
                          className="h-9 w-9 p-0 rounded-xl bg-background/50 dark:bg-secondary/50 border border-border/50 dark:border-border/70 hover:bg-primary/10 hover:border-primary/40 transition-all duration-200"
                        >
                          <Search size={16} className="text-primary" />
                        </Button>
                      )}
                    </div>
                    
                    {/* Filters */}
                <Sheet open={showFiltersSheet} onOpenChange={setShowFiltersSheet}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings2 size={16} className="mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:w-96">
                    <SheetHeader>
                      <SheetTitle>Filter Tips</SheetTitle>
                      <SheetDescription>
                        Use filters to find specific types of investment tips.
                      </SheetDescription>
                    </SheetHeader>
                    
                    <ScrollArea className="h-[calc(100vh-120px)] mt-6">
                      <div className="space-y-6">
                        {/* Recent filter */}
                        <div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="recent"
                              checked={showOnlyRecent}
                              onChange={(e) => setShowOnlyRecent(e.target.checked)}
                              className="rounded"
                            />
                            <Label htmlFor="recent">Show only recent tips (last 7 days)</Label>
                          </div>
                        </div>

                        {/* Assets filter */}
                        <div>
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <BarChart2 size={16} />
                            Asset Classes
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {MASTER_FILTERS.assets.map((asset) => (
                              <TooltipProvider key={asset.name}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant={selectedAssets.includes(asset.name) ? "default" : "outline"}
                                      size="sm"
                                      className="justify-start text-xs h-8"
                                      onClick={() => toggleFilter(selectedAssets, setSelectedAssets, asset.name)}
                                    >
                                      <asset.Icon size={14} className="mr-1" />
                                      {asset.name}
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="left">
                                    <p className="max-w-xs">{asset.desc}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                          </div>
                        </div>

                        {/* Sectors filter */}
                        <div>
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <Building size={16} />
                            Sectors
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {MASTER_FILTERS.sectors.map((sector) => (
                              <TooltipProvider key={sector.name}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant={selectedSectors.includes(sector.name) ? "default" : "outline"}
                                      size="sm"
                                      className="justify-start text-xs h-8"
                                      onClick={() => toggleFilter(selectedSectors, setSelectedSectors, sector.name)}
                                    >
                                      <sector.Icon size={14} className="mr-1" />
                                      {sector.name}
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="left">
                                    <p className="max-w-xs">{sector.desc}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                          </div>
                        </div>

                        {/* Risk filter */}
                        <div>
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <Shield size={16} />
                            Risk Levels
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {MASTER_FILTERS.risk.map((risk) => (
                              <TooltipProvider key={risk.name}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant={selectedRisk.includes(risk.name) ? "default" : "outline"}
                                      size="sm"
                                      className="justify-start text-xs h-8"
                                      onClick={() => toggleFilter(selectedRisk, setSelectedRisk, risk.name)}
                                    >
                                      <risk.Icon size={14} className="mr-1" />
                                      {risk.name}
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="left">
                                    <p className="max-w-xs">{risk.desc}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                          </div>
                        </div>

                        {/* Strategies filter */}
                        <div>
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <Target size={16} />
                            Strategies
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {MASTER_FILTERS.strategies.map((strategy) => (
                              <TooltipProvider key={strategy.name}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant={selectedStrategies.includes(strategy.name) ? "default" : "outline"}
                                      size="sm"
                                      className="justify-start text-xs h-8"
                                      onClick={() => toggleFilter(selectedStrategies, setSelectedStrategies, strategy.name)}
                                    >
                                      <strategy.Icon size={14} className="mr-1" />
                                      {strategy.name}
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="left">
                                    <p className="max-w-xs">{strategy.desc}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                          </div>
                        </div>

                        {/* Conviction filter */}
                        <div>
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <Zap size={16} />
                            Conviction Levels
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {MASTER_FILTERS.conviction.map((conviction) => (
                              <Button
                                key={conviction}
                                variant={selectedConviction.includes(conviction) ? "default" : "outline"}
                                size="sm"
                                className="justify-start text-xs h-8"
                                onClick={() => toggleFilter(selectedConviction, setSelectedConviction, conviction)}
                              >
                                {conviction}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                    
                    <div className="flex gap-2 pt-4 border-t">
                      <Button variant="outline" onClick={clearAllFilters} className="flex-1">
                        Clear All
                      </Button>
                      <Button onClick={() => setShowFiltersSheet(false)} className="flex-1">
                        Apply Filters
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>

                    {/* Active Position Filters */}
                    <Sheet open={showActivePositionsSheet} onOpenChange={setShowActivePositionsSheet}>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Activity size={16} className="mr-2" />
                          Active Positions
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-full sm:w-96">
                        <SheetHeader>
                          <SheetTitle>Active Position Filters</SheetTitle>
                          <SheetDescription>
                            Filter tips based on their current market position status.
                          </SheetDescription>
                        </SheetHeader>
                        
                        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
                          <div className="space-y-6">
                            {/* Position Status */}
                            <div>
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Activity size={16} />
                                Position Status
                              </h4>
                              <div className="space-y-2">
                                {[
                                  { value: 'active', label: 'Active Positions', desc: 'Tips with open market positions' },
                                  { value: 'closed', label: 'Closed Positions', desc: 'Tips with completed positions' },
                                  { value: 'pending', label: 'Pending Entry', desc: 'Tips waiting for entry signals' },
                                  { value: 'watching', label: 'Watch List', desc: 'Tips under observation' }
                                ].map((status) => (
                                  <TooltipProvider key={status.value}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant={selectedPositionStatus.includes(status.value) ? "default" : "outline"}
                                          size="sm"
                                          className="justify-start text-xs h-8 w-full"
                                          onClick={() => toggleFilter(selectedPositionStatus, setSelectedPositionStatus, status.value)}
                                        >
                                          <Activity size={14} className="mr-2" />
                                          {status.label}
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent side="left">
                                        <p className="max-w-xs">{status.desc}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                ))}
                              </div>
                            </div>

                            {/* Time Frame */}
                            <div>
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Clock size={16} />
                                Position Duration
                              </h4>
                              <div className="space-y-2">
                                {[
                                  { value: 'short-term', label: 'Short-term (< 1 month)', desc: 'Positions held for less than a month' },
                                  { value: 'medium-term', label: 'Medium-term (1-6 months)', desc: 'Positions held for 1-6 months' },
                                  { value: 'long-term', label: 'Long-term (> 6 months)', desc: 'Positions held for more than 6 months' }
                                ].map((duration) => (
                                  <TooltipProvider key={duration.value}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant={selectedPositionDuration.includes(duration.value) ? "default" : "outline"}
                                          size="sm"
                                          className="justify-start text-xs h-8 w-full"
                                          onClick={() => toggleFilter(selectedPositionDuration, setSelectedPositionDuration, duration.value)}
                                        >
                                          <Clock size={14} className="mr-2" />
                                          {duration.label}
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent side="left">
                                        <p className="max-w-xs">{duration.desc}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                ))}
                              </div>
                            </div>

                            {/* Performance Filter */}
                            <div>
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <TrendingUp size={16} />
                                Performance
                              </h4>
                              <div className="space-y-2">
                                {[
                                  { value: 'profitable', label: 'Profitable', desc: 'Positions currently in profit' },
                                  { value: 'break-even', label: 'Break-even', desc: 'Positions at entry price' },
                                  { value: 'loss', label: 'In Loss', desc: 'Positions currently at loss' }
                                ].map((performance) => (
                                  <TooltipProvider key={performance.value}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant={selectedPerformance.includes(performance.value) ? "default" : "outline"}
                                          size="sm"
                                          className="justify-start text-xs h-8 w-full"
                                          onClick={() => toggleFilter(selectedPerformance, setSelectedPerformance, performance.value)}
                                        >
                                          <TrendingUp size={14} className="mr-2" />
                                          {performance.label}
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent side="left">
                                        <p className="max-w-xs">{performance.desc}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                ))}
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                        
                        <div className="flex gap-2 pt-4 border-t">
                          <Button variant="outline" onClick={clearActivePositionFilters} className="flex-1">
                            Clear All
                          </Button>
                          <Button onClick={() => setShowActivePositionsSheet(false)} className="flex-1">
                            Apply Filters
                          </Button>
                        </div>
                      </SheetContent>
                    </Sheet>

                   
                    
                    <Button variant="outline" size="sm">
                      <ArrowUpRight size={16} className="mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCw size={16} className="mr-2" />
                      Refresh
                    </Button>
                  </div>
                </div>

                {filteredPosts.length === 0 ? (
                  <Card className="text-center py-12 bg-gradient-to-br from-background to-muted/20 dark:from-card/50 dark:to-secondary/30 border-2 border-border dark:border-border">
                    <CardContent>
                      {posts.length === 0 ? (
                        <div className="space-y-4">
                          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 rounded-full flex items-center justify-center">
                            <MessageSquare className="w-8 h-8 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">No tips yet</h3>
                            <p className="text-muted-foreground">Create your first investment tip to get started.</p>
                          </div>
                          <Button 
                            onClick={() => setShowNewTipForm(true)}
                            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Create Your First Tip
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/20 rounded-full flex items-center justify-center">
                            <Search className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">No tips match your filters</h3>
                            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                          </div>
                          <Button 
                            variant="outline" 
                            onClick={clearAllFilters}
                            className="border-2 border-border dark:border-border hover:bg-primary/10 hover:border-primary/50"
                          >
                            Clear All Filters
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader className="bg-primary/10 dark:bg-primary/20">
                        <TableRow>
                          <TableHead className="w-[120px] font-semibold text-primary">Time</TableHead>
                          <TableHead className="w-[100px] font-semibold text-primary">Symbol</TableHead>
                          <TableHead className="w-[120px] font-semibold text-primary">Asset Class</TableHead>
                          <TableHead className="w-[100px] font-semibold text-primary text-center">Revenue</TableHead>
                          <TableHead className="w-[80px] font-semibold text-primary text-center">Views</TableHead>
                          <TableHead className="w-[80px] font-semibold text-primary text-center">Unlocks</TableHead>
                          <TableHead className="w-[100px] font-semibold text-foreground bg-muted/70 dark:bg-muted/90 text-center">Success</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPosts.map((tip) => (
                          <TableRow 
                            key={tip.id} 
                            className="hover:bg-muted/50 cursor-pointer"
                            onClick={() => {
                              setSelectedTip(tip);
                              setShowTipDetails(true);
                            }}
                          >
                            <TableCell className="text-sm text-muted-foreground">
                              {tip.created_at && formatDistanceToNow(new Date(tip.created_at), { addSuffix: true })}
                            </TableCell>
                            <TableCell className="font-medium">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="text-primary font-semibold cursor-help hover:text-primary/80 transition-colors">
                                      {tip.symbol}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent side="right" className="p-0 bg-background/95 dark:bg-card/95 backdrop-blur-md border w-120 h-64">
                                    <div className="w-full h-full">
                                      <TradingViewWidget
                                        symbol={tip.symbol}
                                        width="100%"
                                        height="100%"
                                        theme={ !isDarkTheme ? "dark" :  "light"}
                                      />
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className="text-xs">
                                {tip.asset_class || tip.sector || 'Equity'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="flex items-center justify-center gap-1 cursor-help">
                                      <img src={'/lollipop.svg'} alt="Lollipop" className="h-3 w-3" />
                                      <span className="font-medium text-sm">{tip.lollipop_cost || 0}</span>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom" className="p-0 bg-background/95 dark:bg-card/95 backdrop-blur-md border w-48">
                                    <div className="text-center px-4 py-2">
                                      <div className="text-xs text-muted-foreground mb-1">Total Revenue</div>
                                      <div className="text-lg font-bold text-green-600 dark:text-green-400">₹{((tip.lollipop_cost || 0) * 10).toLocaleString()}</div>
                                    </div>
                                    <div className="px-4 py-1 bg-muted/20 border-t text-center">
                                      <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                                        1 <img src={'/lollipop.svg'} alt="Lollipop" className="h-3 w-3" /> = ₹10
                                      </div>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Eye size={12} className="text-muted-foreground" />
                                <span className="font-medium">{tip.views || 0}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Unlock size={12} className="text-muted-foreground" />
                                <span className="font-medium">{tip.unlocks || 0}</span>
                              </div>
                            </TableCell>
                            <TableCell className="bg-muted/70 dark:bg-muted/90 border-l border-border/40">
                              <div className="flex items-center justify-center gap-1">
                                {tip.win_rate ? (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <div className="flex items-center gap-1 cursor-help">
                                          <Target size={12} className="text-muted-foreground" />
                                          <span className="font-medium text-sm">{tip.win_rate}%</span>
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent side={"left"} className="max-w-xs p-0 bg-background/95 dark:bg-card/95 backdrop-blur-md border-2 border-border dark:border-border">
                                        {/* Tooltip Content */}
                                        <div className="w-80">
                                          {/* Header with Info Icon */}
                                          <div className="px-4 py-1 bg-muted/30 dark:bg-muted/40 border-b-2 border-border">
                                            <div className="flex items-center justify-between">
                                              <h3 className="font-bold text-sm text-foreground">Performance Analysis</h3>
                                              <TooltipProvider>
                                                <Tooltip>
                                                  <TooltipTrigger asChild>
                                                    <button className="p-1.5 rounded-full hover:bg-muted/50 transition-colors">
                                                      <Info className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                                                    </button>
                                                  </TooltipTrigger>
                                                  <TooltipContent side="left" className="max-w-sm p-0 bg-background/95 backdrop-blur-md border">
                                                    <div className="p-4">
                                                      <div className="flex items-center gap-2 mb-3">
                                                        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                        <span className="font-semibold text-sm">What is Win Rate?</span>
                                                      </div>
                                                      <p className="text-xs text-muted-foreground leading-relaxed">
                                                        Win rate measures how often your investment predictions hit their target ranges. Each successful prediction improves your credibility as an advisor. A higher win rate means more reliable recommendations for your followers.
                                                      </p>
                                                    </div>
                                                  </TooltipContent>
                                                </Tooltip>
                                              </TooltipProvider>
                                            </div>
                                          </div>

                                          {/* Content with Redesigned Boxes */}
                                          <div className="p-4 space-y-4">
                                            {/* Target and Result in Same Row */}
                                            <div className="flex items-stretch gap-3">
                                              {/* Target Box */}
                                              <div className="flex-1 border border-blue-200 dark:border-blue-800 rounded-lg overflow-hidden flex flex-col">
                                                {/* Header */}
                                                <div className="px-3 py-2 bg-blue-50 dark:bg-blue-950/30 border-b border-blue-200 dark:border-blue-800">
                                                  <div className="flex items-center gap-2">
                                                    <BarChart2 className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                                    <span className="font-medium text-xs text-blue-700 dark:text-blue-300">Target Prediction</span>
                                                  </div>
                                                </div>
                                                {/* Content */}
                                                <div className="px-3 py-3 text-center flex-1 flex flex-col justify-center">
                                                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400">5-10%</div>
                                                  <div className="text-xs text-muted-foreground mt-1">Expected Range</div>
                                                </div>
                                                {/* Footer */}
                                                <div className="px-3 py-1.5 bg-muted/30 border-t border-border text-center">
                                                  <div className="text-xs text-muted-foreground">15 Aug • Hold 1w</div>
                                                </div>
                                              </div>

                                              {/* Arrow */}
                                              <div className="flex-shrink-0 flex items-center">
                                                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                                              </div>

                                              {/* Achievement Box */}
                                              <div className="flex-1 border border-green-200 dark:border-green-800 rounded-lg overflow-hidden flex flex-col">
                                                {/* Header */}
                                                <div className="px-3 py-2 bg-green-50 dark:bg-green-950/30 border-b border-green-200 dark:border-green-800">
                                                  <div className="flex items-center gap-2">
                                                    <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                    <span className="font-medium text-xs text-green-700 dark:text-green-300">Actual Result</span>
                                                  </div>
                                                </div>
                                                {/* Content */}
                                                <div className="px-3 py-3 text-center flex-1 flex flex-col justify-center">
                                                  <div className="text-xl font-bold text-green-600 dark:text-green-400">+8%</div>
                                                  <div className="text-xs text-muted-foreground mt-1">Achieved Return</div>
                                                </div>
                                                {/* Footer */}
                                                <div className="px-3 py-1.5 bg-muted/30 border-t border-border text-center">
                                                  <div className="text-xs text-muted-foreground">28 Aug • 13 days</div>
                                                </div>
                                              </div>
                                            </div>

                                            {/* Separator */}
                                            <div className="border-t-1  border-border"></div>

                                            {/* Achievement Rate Box */}
                                            <div className="border-2 border-dashed border-green-300 dark:border-green-600 rounded-lg overflow-hidden bg-green-50 dark:bg-green-950/20">
                                              {/* Header */}
                                              <div className="px-3 py-2 bg-green-100 dark:bg-green-900/30 border-b border-green-200 dark:border-green-700">
                                                <div className="flex items-center gap-2">
                                                  <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
                                                  <span className="font-medium text-sm text-green-700 dark:text-green-300">Achievement Rate</span>
                                                </div>
                                              </div>
                                              {/* Content */}
                                              <div className="px-3 py-4 text-center">
                                                <div className="text-4xl font-bold text-green-600 dark:text-green-400">100%</div>
                                                <div className="text-xs text-green-600 dark:text-green-400 mt-1">Target Successfully Met</div>
                                              </div>
                                              {/* Footer */}
                                              <div className="px-3 py-2 bg-green-100 dark:bg-green-900/30 border-t border-green-200 dark:border-green-700 text-center">
                                                <div className="text-xs text-green-700 dark:text-green-300">8% return within 5-10% range ✓</div>
                                              </div>
                                            </div>
                                          </div>

                                          {/* Footer - Win Rate Impact Only */}
                                          <div className="px-4 py-2 bg-muted/10 border-t-2 border-dashed border-border">
                                            <div className="flex items-center justify-between text-xs">
                                              <span className="text-muted-foreground">Win Rate Impact</span>
                                              <div className="flex items-center gap-1">
                                                <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                <span className="font-bold text-green-600 dark:text-green-400">+3%</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                ) : (
                                  <span className="text-muted-foreground text-sm">-</span>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
                </>
              )}

              {/* Tips Tab Content */}
              {activeTab === 'tips' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                      Investment Tips 
                      {filteredPosts.length !== posts.length && (
                        <span className="text-muted-foreground ml-2">
                          ({filteredPosts.length} of {posts.length})
                        </span>
                      )}
                    </h2>
                    <div className="flex items-center gap-2">

                       {/* Expandable Search */}
                      <div className="flex items-center gap-2">
                        {showExpandedSearch ? (
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                              <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search tips..."
                                className="pl-10 pr-10 w-64 h-9 bg-background/80 dark:bg-secondary/80 border border-border/50 dark:border-border/70 rounded-xl text-sm"
                                autoFocus
                              />
                              {search && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 rounded-lg hover:bg-destructive/10 hover:text-destructive"
                                  onClick={() => setSearch('')}
                                >
                                  <X size={14} />
                                </Button>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowExpandedSearch(false)}
                              className="h-9 w-9 p-0 rounded-xl hover:bg-muted/50"
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowExpandedSearch(true)}
                            className="h-9 w-9 p-0 rounded-xl bg-background/50 dark:bg-secondary/50 border border-border/50 dark:border-border/70 hover:bg-primary/10 hover:border-primary/40 transition-all duration-200"
                          >
                            <Search size={16} className="text-primary" />
                          </Button>
                        )}
                      </div>
                      
                      {/* Other buttons */}
                      <Button variant="outline" size="sm">
                        <ArrowUpRight size={16} className="mr-2" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw size={16} className="mr-2" />
                        Refresh
                      </Button>
                    </div>
                  </div>

                  {filteredPosts.length === 0 ? (
                    <Card className="text-center py-12 bg-gradient-to-br from-background to-muted/20 dark:from-card/50 dark:to-secondary/30 border-2 border-border dark:border-border">
                      <CardContent>
                        {posts.length === 0 ? (
                          <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 rounded-full flex items-center justify-center">
                              <MessageSquare className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">No tips yet</h3>
                              <p className="text-muted-foreground">Create your first investment tip to get started.</p>
                            </div>
                            <Button 
                              onClick={() => setShowNewTipForm(true)}
                              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Create Your First Tip
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/20 rounded-full flex items-center justify-center">
                              <Search className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">No tips match your filters</h3>
                              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                            </div>
                            <Button 
                              variant="outline" 
                              onClick={clearAllFilters}
                              className="border-2 border-border dark:border-border hover:bg-primary/10 hover:border-primary/50"
                            >
                              Clear All Filters
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader className="bg-primary/10 dark:bg-primary/20">
                          <TableRow>
                            <TableHead className="w-[120px] font-semibold text-primary">Time</TableHead>
                            <TableHead className="w-[100px] font-semibold text-primary">Symbol</TableHead>
                            <TableHead className="w-[120px] font-semibold text-primary">Asset Class</TableHead>
                            <TableHead className="w-[100px] font-semibold text-primary text-center">Revenue</TableHead>
                            <TableHead className="w-[80px] font-semibold text-primary text-center">Views</TableHead>
                            <TableHead className="w-[80px] font-semibold text-primary text-center">Unlocks</TableHead>
                            <TableHead className="w-[100px] font-semibold text-foreground bg-muted/70 dark:bg-muted/90 text-center">Success</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredPosts.map((tip) => (
                            <TableRow key={tip.id} className="hover:bg-muted/50">
                              <TableCell className="text-sm text-muted-foreground">
                                {tip.created_at && formatDistanceToNow(new Date(tip.created_at), { addSuffix: true })}
                              </TableCell>
                              <TableCell className="font-medium">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="text-primary font-semibold cursor-help hover:text-primary/80 transition-colors">
                                        {tip.symbol}
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="p-0 bg-background/95 dark:bg-card/95 backdrop-blur-md border w-96 h-64">
                                      <div className="w-full h-full">
                                        <TradingViewWidget
                                          symbol={tip.symbol}
                                          width="100%"
                                          height="100%"
                                          theme="dark"
                                        />
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary" className="text-xs">
                                  {tip.asset_class || tip.sector || 'Equity'}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-center">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="flex items-center justify-center gap-1 cursor-help">
                                        <img src={'/lollipop.svg'} alt="Lollipop" className="h-3 w-3" />
                                        <span className="font-medium text-sm">{tip.lollipop_cost || 0}</span>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" className="p-0 bg-background/95 dark:bg-card/95 backdrop-blur-md border w-48">
                                      <div className="text-center px-4 py-2">
                                        <div className="text-xs text-muted-foreground mb-1">Total Revenue</div>
                                        <div className="text-lg font-bold text-green-600 dark:text-green-400">₹{((tip.lollipop_cost || 0) * 10).toLocaleString()}</div>
                                      </div>
                                      <div className="px-4 py-1 bg-muted/20 border-t text-center">
                                        <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                                          1 <img src={'/lollipop.svg'} alt="Lollipop" className="h-3 w-3" /> = ₹10
                                        </div>
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <Eye size={12} className="text-muted-foreground" />
                                  <span className="font-medium">{tip.views || 0}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <Unlock size={12} className="text-muted-foreground" />
                                  <span className="font-medium">{tip.unlocks || 0}</span>
                                </div>
                              </TableCell>
                              <TableCell className="bg-muted/70 dark:bg-muted/90 border-l border-border/40">
                                <div className="flex items-center justify-center gap-1">
                                  {tip.win_rate ? (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <div className="flex items-center gap-1 cursor-help">
                                            <Target size={12} className="text-muted-foreground" />
                                            <span className="font-medium text-sm">{tip.win_rate}%</span>
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent side={"left"} className="max-w-xs p-0 bg-background/95 dark:bg-card/95 backdrop-blur-md border-2 border-border dark:border-border">
                                          {/* Performance Analysis Tooltip Content would go here */}
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  ) : (
                                    <span className="text-muted-foreground text-sm">-</span>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              )}

              {/* Chat Tab Content */}
              {activeTab === 'chat' && (
                <div className="space-y-6">
                  <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mb-6">
                      <MessageSquare className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Community Chat</h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                      Connect with fellow investors, share insights, and discuss market trends in real-time.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                      <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-border hover:border-primary/30">
                        <div className="text-center">
                          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg w-fit mx-auto mb-4">
                            <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">Community Discussions</h3>
                          <p className="text-sm text-muted-foreground">Join public channels to discuss market trends, share insights, and learn from other investors.</p>
                          <Button className="mt-4 w-full" variant="outline">
                            Join Discussions
                          </Button>
                        </div>
                      </Card>
                      
                      <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-border hover:border-primary/30">
                        <div className="text-center">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg w-fit mx-auto mb-4">
                            <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">Direct Messages</h3>
                          <p className="text-sm text-muted-foreground">Connect privately with advisors and other investors for personalized discussions.</p>
                          <Button className="mt-4 w-full" variant="outline">
                            Start Messaging
                          </Button>
                        </div>
                      </Card>
                      
                      <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-border hover:border-primary/30">
                        <div className="text-center">
                          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg w-fit mx-auto mb-4">
                            <Bell className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">Live Updates</h3>
                          <p className="text-sm text-muted-foreground">Get real-time notifications about market movements and new investment tips.</p>
                          <Button className="mt-4 w-full" variant="outline">
                            Enable Notifications
                          </Button>
                        </div>
                      </Card>
                    </div>
                    
                    <div className="mt-12 p-6 bg-muted/30 rounded-xl border border-border/50">
                      <h4 className="font-semibold text-foreground mb-2">Coming Soon</h4>
                      <p className="text-sm text-muted-foreground">
                        We're building an advanced chat system with real-time messaging, voice calls, and AI-powered investment insights. 
                        Stay tuned for updates!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Portfolio Tab Content */}
              {activeTab === 'portfolio' && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full flex items-center justify-center mb-6">
                      <PieChart className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Portfolio Management</h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                      Track your investments, analyze performance, and optimize your portfolio allocation.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                      <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-border hover:border-primary/30">
                        <div className="text-center">
                          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg w-fit mx-auto mb-4">
                            <Building2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">Holdings Overview</h3>
                          <p className="text-sm text-muted-foreground">View all your current positions, market values, and performance metrics in one place.</p>
                          <Button className="mt-4 w-full" variant="outline">
                            View Holdings
                          </Button>
                        </div>
                      </Card>
                      
                      <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-border hover:border-primary/30">
                        <div className="text-center">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg w-fit mx-auto mb-4">
                            <BarChart2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">Asset Allocation</h3>
                          <p className="text-sm text-muted-foreground">Analyze your portfolio distribution across different asset classes, sectors, and risk levels.</p>
                          <Button className="mt-4 w-full" variant="outline">
                            View Allocation
                          </Button>
                        </div>
                      </Card>
                      
                      <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-border hover:border-primary/30">
                        <div className="text-center">
                          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg w-fit mx-auto mb-4">
                            <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">Performance Metrics</h3>
                          <p className="text-sm text-muted-foreground">Track returns, volatility, Sharpe ratio, and other key performance indicators.</p>
                          <Button className="mt-4 w-full" variant="outline">
                            View Metrics
                          </Button>
                        </div>
                      </Card>
                      
                      <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-border hover:border-primary/30">
                        <div className="text-center">
                          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg w-fit mx-auto mb-4">
                            <Gauge className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">Risk Analysis</h3>
                          <p className="text-sm text-muted-foreground">Evaluate portfolio risk, diversification, and stress test scenarios.</p>
                          <Button className="mt-4 w-full" variant="outline">
                            Analyze Risk
                          </Button>
                        </div>
                      </Card>
                      
                      <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-border hover:border-primary/30">
                        <div className="text-center">
                          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg w-fit mx-auto mb-4">
                            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">Rebalancing</h3>
                          <p className="text-sm text-muted-foreground">Get recommendations for rebalancing your portfolio to maintain target allocations.</p>
                          <Button className="mt-4 w-full" variant="outline">
                            Rebalance
                          </Button>
                        </div>
                      </Card>
                      
                      <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-border hover:border-primary/30">
                        <div className="text-center">
                          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg w-fit mx-auto mb-4">
                            <Calendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">Trade History</h3>
                          <p className="text-sm text-muted-foreground">Review your trading history, profit/loss, and identify patterns in your investment behavior.</p>
                          <Button className="mt-4 w-full" variant="outline">
                            View History
                          </Button>
                        </div>
                      </Card>
                    </div>
                    
                    <div className="mt-12 p-6 bg-muted/30 rounded-xl border border-border/50">
                      <h4 className="font-semibold text-foreground mb-2">Coming Soon</h4>
                      <p className="text-sm text-muted-foreground">
                        Advanced portfolio analytics with AI-powered insights, automated rebalancing, and integration with major brokers.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tools Tab Content */}
              {activeTab === 'tools' && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-100 to-yellow-100 dark:from-green-900/30 dark:to-yellow-900/30 rounded-full flex items-center justify-center mb-6">
                      <Settings className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Investment Tools & Analysis</h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                      Access advanced tools for market analysis, research, and investment decision making.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                      <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-border hover:border-primary/30">
                        <div className="text-center">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg w-fit mx-auto mb-4">
                            <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">Chart Analysis</h3>
                          <p className="text-sm text-muted-foreground">Advanced charting tools with technical indicators, pattern recognition, and market analysis.</p>
                          <Button className="mt-4 w-full" variant="outline" onClick={() => setShowFullScreenChart(true)}>
                            Open Charts
                          </Button>
                        </div>
                      </Card>
                      
                      <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-border hover:border-primary/30">
                        <div className="text-center">
                          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg w-fit mx-auto mb-4">
                            <Calculator className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">Financial Calculator</h3>
                          <p className="text-sm text-muted-foreground">Calculate returns, compound interest, SIP values, and other financial metrics.</p>
                          <Button className="mt-4 w-full" variant="outline">
                            Open Calculator
                          </Button>
                        </div>
                      </Card>
                      
                      <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-border hover:border-primary/30">
                        <div className="text-center">
                          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg w-fit mx-auto mb-4">
                            <Download className="h-6 w-6 text-green-600 dark:text-green-400" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">Export Data</h3>
                          <p className="text-sm text-muted-foreground">Export your investment tips, analytics, and portfolio data in various formats.</p>
                          <Button className="mt-4 w-full" variant="outline">
                            Export Data
                          </Button>
                        </div>
                      </Card>
                      
                      <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-border hover:border-primary/30">
                        <div className="text-center">
                          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg w-fit mx-auto mb-4">
                            <Globe className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">Market Screener</h3>
                          <p className="text-sm text-muted-foreground">Screen stocks and other assets based on fundamental and technical criteria.</p>
                          <Button className="mt-4 w-full" variant="outline">
                            Open Screener
                          </Button>
                        </div>
                      </Card>
                      
                      <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-border hover:border-primary/30">
                        <div className="text-center">
                          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg w-fit mx-auto mb-4">
                            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">Risk Calculator</h3>
                          <p className="text-sm text-muted-foreground">Assess risk tolerance, calculate Value at Risk (VaR), and stress test portfolios.</p>
                          <Button className="mt-4 w-full" variant="outline">
                            Calculate Risk
                          </Button>
                        </div>
                      </Card>
                      
                      <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-border hover:border-primary/30">
                        <div className="text-center">
                          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg w-fit mx-auto mb-4">
                            {isDarkTheme ? (
                              <Sun className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            ) : (
                              <Moon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            )}
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">Theme Settings</h3>
                          <p className="text-sm text-muted-foreground">Customize your dashboard appearance with light and dark themes.</p>
                          <Button className="mt-4 w-full" variant="outline" onClick={toggleTheme}>
                            Switch to {isDarkTheme ? 'Light' : 'Dark'} Mode
                          </Button>
                        </div>
                      </Card>
                    </div>
                    
                    <div className="mt-12 p-6 bg-muted/30 rounded-xl border border-border/50">
                      <h4 className="font-semibold text-foreground mb-2">More Tools Coming Soon</h4>
                      <p className="text-sm text-muted-foreground">
                        AI-powered market analysis, automated trading strategies, and advanced backtesting capabilities.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        {/* New Tip Form Sheet */}
        <Sheet open={showNewTipForm} onOpenChange={setShowNewTipForm}>
          <SheetContent side="right" className="max-h-[100vh] min-w-[60vw] lg:w-[60vw] overflow-hidden flex flex-col p-0 from-background to-muted/20">
            {/* Enhanced Header */}
            <SheetHeader className="border-b border-border/50 px-8 py-6 bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm">
              <SheetTitle className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 shadow-sm">
                  <Plus size={24} className="text-primary" />
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-bold tracking-tight">
                    {editingTip ? 'Edit Investment Tip' : 'Create New Investment Tip'}
                  </div>
                  <div className="text-sm text-muted-foreground font-normal leading-relaxed">
                    Share your investment research and analysis with the community
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>
            
            {/* Enhanced Action Buttons */}
            <div className="absolute top-6 right-20 flex gap-3 z-20">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setShowNewTipForm(false);
                        setEditingTip(null);
                        setNewTip({
                          tip: '', symbol: '', asset: '', sector: '', advisor_name: '', advisor_avatar: '', advisor_sebi_registered: false,
                          sentiment: '', strategy: '', risk: '', expected_return: '', holding: '', duration: '', conviction: '',
                          market_cap: '', dividend_yield: '', region: '', volatility: '', liquidity: '', win_rate: '', allocation: '',
                          valuation_metric: '', growth_metric: '', valuation: '', technical_indicator: '', technical: '',
                          esg_rating: '', analysis_type: '', catalyst: '', diversification: '', performance: '',
                          entry_price: '', exit_price: '', stop_loss: '',
                        });
                      }}
                      className="h-9 px-4 border-2 hover:bg-muted/50 transition-all duration-200 shadow-sm"
                    >
                      <X size={16} className="mr-2" />
                      Cancel
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="p-0 border-2 border-black dark:border-black shadow-lg bg-white dark:bg-background rounded-lg overflow-hidden">
                    <div className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900 dark:text-foreground">Cancel & Close</div>
                      <div className="text-xs text-gray-600 dark:text-muted-foreground mt-1">Discard changes and return to dashboard</div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="sm" 
                      onClick={handleSubmitNewTip} 
                      disabled={submitting} 
                      className="h-9 px-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg hover:shadow-xl transition-all duration-200 border-0"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {editingTip ? 'Updating...' : 'Creating...'}
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          {editingTip ? 'Update Tip' : 'Publish Tip'}
                        </>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="p-0 border-2 border-black dark:border-black shadow-lg bg-white dark:bg-background rounded-lg overflow-hidden">
                    <div className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900 dark:text-foreground">
                        {editingTip ? 'Update Investment Tip' : 'Publish Investment Tip'}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-muted-foreground mt-1">
                        {editingTip ? 'Save changes to your investment analysis' : 'Share your research with the community'}
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            {/* Enhanced Content Area */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-8 py-6 space-y-8">
                
                {/* Essential Information Section - Grid Style */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 pb-4 border-b border-border/30">
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-950/50 dark:to-blue-900/30 rounded-xl border border-blue-200/50 dark:border-blue-800/30 shadow-sm">
                      <FileText size={20} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-foreground tracking-tight">Essential Information</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">Core details about your investment recommendation</p>
                    </div>
                  </div>
                  
                  {/* Investment Thesis - Full Width */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Label htmlFor="tip" className="text-sm font-semibold flex items-center gap-2 text-foreground">
                        <MessageSquare size={16} className="text-primary" />
                        Investment Thesis
                        <span className="text-red-500 text-xs">*</span>
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info size={16} className="text-muted-foreground hover:text-foreground cursor-help transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="p-0 border-2 border-black dark:border-black shadow-xl bg-white dark:bg-background rounded-xl overflow-hidden">
                            <div className="w-80 p-5">
                              <div className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">Investment Thesis</div>
                              <div className="text-xs text-gray-600 dark:text-muted-foreground space-y-2 leading-relaxed">
                                <p>• Explain your investment reasoning and research</p>
                                <p>• Include key fundamentals, catalysts, and outlook</p>
                                <p>• Provide context for why this is a good opportunity</p>
                                <p>• Be specific about timing and market conditions</p>
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Textarea
                      id="tip"
                      value={newTip.tip}
                      onChange={(e) => handleNewTipChange('tip', e.target.value)}
                      placeholder="Provide detailed analysis of your investment idea, including fundamentals, catalysts, valuation rationale, and market timing..."
                      className="min-h-[120px] resize-none border-2 focus:border-primary/60 rounded-xl bg-background/50 backdrop-blur-sm shadow-sm transition-all duration-200 focus:shadow-md"
                    />
                  </div>
                  
                  {/* Grid Cards for Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Symbol Card */}
                    <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <BarChart2 size={18} className="text-primary" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-foreground">Symbol</Label>
                          <p className="text-xs text-muted-foreground">Trading ticker</p>
                        </div>
                      </div>
                      <Input
                        value={newTip.symbol}
                        onChange={(e) => handleNewTipChange('symbol', e.target.value.toUpperCase())}
                        placeholder="e.g., AAPL"
                        className="border-0 bg-muted/30 font-mono font-semibold text-center text-lg h-10 focus:bg-muted/50 transition-colors"
                      />
                    </div>

                    {/* Asset Class Card */}
                    <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Package size={18} className="text-primary" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-foreground">Asset Class</Label>
                          <p className="text-xs text-muted-foreground">Investment type</p>
                        </div>
                      </div>
                      <Select value={newTip.asset} onValueChange={(val) => handleNewTipChange('asset', val)}>
                        <SelectTrigger className="border-0 bg-muted/30 h-10 font-semibold focus:bg-muted/50">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2">
                          {MASTER_FILTERS.assets.map(opt => (
                            <SelectItem key={opt.name} value={opt.name} className="rounded-lg">
                              <div className="flex items-center gap-3 py-1">
                                <opt.Icon size={16} className="text-muted-foreground" />
                                <span className="font-medium">{opt.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sector Card */}
                    <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Building size={18} className="text-primary" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-foreground">Sector</Label>
                          <p className="text-xs text-muted-foreground">Industry category</p>
                        </div>
                      </div>
                      <Select value={newTip.sector} onValueChange={(val) => handleNewTipChange('sector', val)}>
                        <SelectTrigger className="border-0 bg-muted/30 h-10 font-semibold focus:bg-muted/50">
                          <SelectValue placeholder="Select sector" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2">
                          {MASTER_FILTERS.sectors.map(opt => (
                            <SelectItem key={opt.name} value={opt.name} className="rounded-lg">
                              <div className="flex items-center gap-3 py-1">
                                <opt.Icon size={16} className="text-muted-foreground" />
                                <span className="font-medium">{opt.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Price Targets Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 pb-4 border-b border-border/30">
                    <div className="p-3 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-950/50 dark:to-red-900/30 rounded-xl border border-red-200/50 dark:border-red-800/30 shadow-sm">
                      <Target size={20} className="text-red-600 dark:text-red-400" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-foreground tracking-tight">Price Targets</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">Entry, exit, and risk management levels</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Entry Price Card */}
                    <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <ArrowUpRight size={18} className="text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-foreground">Entry Price</Label>
                          <p className="text-xs text-muted-foreground">Buy level</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <Input
                          type="number"
                          step="0.01"
                          value={newTip.entry_price}
                          onChange={(e) => handleNewTipChange('entry_price', e.target.value)}
                          placeholder="150.00"
                          className="border-0 bg-muted/30 h-10 font-semibold text-center focus:bg-muted/50"
                        />
                      </div>
                    </div>
                    
                    {/* Exit Price Card */}
                    <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <TrendingUp size={18} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-foreground">Exit Price</Label>
                          <p className="text-xs text-muted-foreground">Target level</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <Input
                          type="number"
                          step="0.01"
                          value={newTip.exit_price}
                          onChange={(e) => handleNewTipChange('exit_price', e.target.value)}
                          placeholder="180.00"
                          className="border-0 bg-muted/30 h-10 font-semibold text-center focus:bg-muted/50"
                        />
                      </div>
                    </div>
                    
                    {/* Stop Loss Card */}
                    <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                          <Shield size={18} className="text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-foreground">Stop Loss</Label>
                          <p className="text-xs text-muted-foreground">Risk limit</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <Input
                          type="number"
                          step="0.01"
                          value={newTip.stop_loss}
                          onChange={(e) => handleNewTipChange('stop_loss', e.target.value)}
                          placeholder="140.00"
                          className="border-0 bg-muted/30 h-10 font-semibold text-center focus:bg-muted/50"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strategy & Risk Grid */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 pb-4 border-b border-border/30">
                    <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-950/50 dark:to-orange-900/30 rounded-xl border border-orange-200/50 dark:border-orange-800/30 shadow-sm">
                      <Target size={20} className="text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-foreground tracking-tight">Strategy & Risk Management</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">Define your investment approach and risk parameters</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Strategy Card */}
                    <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <TrendingUp size={18} className="text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-foreground">Strategy</Label>
                          <p className="text-xs text-muted-foreground">Approach</p>
                        </div>
                      </div>
                      <Select value={newTip.strategy} onValueChange={(val) => handleNewTipChange('strategy', val)}>
                        <SelectTrigger className="border-0 bg-muted/30 h-10 font-semibold focus:bg-muted/50">
                          <SelectValue placeholder="Strategy" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2">
                          {MASTER_FILTERS.strategies.map(opt => (
                            <SelectItem key={opt.name} value={opt.name} className="rounded-lg">
                              <div className="flex items-center gap-3 py-1">
                                <opt.Icon size={16} className="text-muted-foreground" />
                                <span className="font-medium">{opt.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Risk Card */}
                    <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                          <Shield size={18} className="text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-foreground">Risk Level</Label>
                          <p className="text-xs text-muted-foreground">Assessment</p>
                        </div>
                      </div>
                      <Select value={newTip.risk} onValueChange={(val) => handleNewTipChange('risk', val)}>
                        <SelectTrigger className="border-0 bg-muted/30 h-10 font-semibold focus:bg-muted/50">
                          <SelectValue placeholder="Risk" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2">
                          {MASTER_FILTERS.risk.map(opt => (
                            <SelectItem key={opt.name} value={opt.name} className="rounded-lg">
                              <div className="flex items-center gap-3 py-1">
                                <opt.Icon size={16} className="text-muted-foreground" />
                                <span className="font-medium">{opt.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sentiment Card */}
                    <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <Activity size={18} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-foreground">Sentiment</Label>
                          <p className="text-xs text-muted-foreground">Outlook</p>
                        </div>
                      </div>
                      <Select value={newTip.sentiment} onValueChange={(val) => handleNewTipChange('sentiment', val)}>
                        <SelectTrigger className="border-0 bg-muted/30 h-10 font-semibold focus:bg-muted/50">
                          <SelectValue placeholder="Sentiment" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2">
                          {MASTER_FILTERS.sentiment.map(opt => (
                            <SelectItem key={opt.name} value={opt.name} className="rounded-lg">
                              <div className="flex items-center gap-3 py-1">
                                <opt.Icon size={16} className="text-muted-foreground" />
                                <span className="font-medium">{opt.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Conviction Card */}
                    <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                          <Award size={18} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-foreground">Conviction</Label>
                          <p className="text-xs text-muted-foreground">Confidence</p>
                        </div>
                      </div>
                      <Select value={newTip.conviction} onValueChange={(val) => handleNewTipChange('conviction', val)}>
                        <SelectTrigger className="border-0 bg-muted/30 h-10 font-semibold focus:bg-muted/50">
                          <SelectValue placeholder="Conviction" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2">
                          {MASTER_FILTERS.conviction.map(opt => (
                            <SelectItem key={opt.name} value={opt.name} className="rounded-lg">
                              <div className="flex items-center gap-3 py-1">
                                <opt.Icon size={16} className="text-muted-foreground" />
                                <span className="font-medium">{opt.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Investment Metrics Grid */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 pb-4 border-b border-border/30">
                    <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-950/50 dark:to-green-900/30 rounded-xl border border-green-200/50 dark:border-green-800/30 shadow-sm">
                      <Calculator size={20} className="text-green-600 dark:text-green-400" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-foreground tracking-tight">Investment Metrics</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">Time horizon, returns, and allocation details</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Holding Period Card */}
                    <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                          <Clock size={18} className="text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-foreground">Holding Period</Label>
                          <p className="text-xs text-muted-foreground">Duration</p>
                        </div>
                      </div>
                      <Select value={newTip.holding} onValueChange={(val) => handleNewTipChange('holding', val)}>
                        <SelectTrigger className="border-0 bg-muted/30 h-10 font-semibold focus:bg-muted/50">
                          <SelectValue placeholder="Period" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2">
                          {MASTER_FILTERS.holding.map(opt => (
                            <SelectItem key={opt.name} value={opt.name} className="rounded-lg">
                              <div className="flex items-center gap-3 py-1">
                                <opt.Icon size={16} className="text-muted-foreground" />
                                <span className="font-medium">{opt.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Expected Return Card */}
                    <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                          <TrendingUp size={18} className="text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-foreground">Expected Return</Label>
                          <p className="text-xs text-muted-foreground">Target %</p>
                        </div>
                      </div>
                      <Select value={newTip.expected_return} onValueChange={(val) => handleNewTipChange('expected_return', val)}>
                        <SelectTrigger className="border-0 bg-muted/30 h-10 font-semibold focus:bg-muted/50">
                          <SelectValue placeholder="Return %" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2">
                          {['<5%', '5-10%', '10-20%', '20-30%', '30-50%', '50%+'].map(opt => (
                            <SelectItem key={opt} value={opt} className="rounded-lg font-medium">{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Allocation Card */}
                    <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                          <PieChart size={18} className="text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-foreground">Allocation</Label>
                          <p className="text-xs text-muted-foreground">Portfolio %</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          max="100"
                          value={newTip.allocation}
                          onChange={(e) => handleNewTipChange('allocation', e.target.value)}
                          placeholder="5.0"
                          className="border-0 bg-muted/30 h-10 font-semibold text-center focus:bg-muted/50"
                        />
                      </div>
                    </div>

                    {/* Win Rate Card */}
                    <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                          <Trophy size={18} className="text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-foreground">Win Rate</Label>
                          <p className="text-xs text-muted-foreground">Success %</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          max="100"
                          value={newTip.win_rate}
                          onChange={(e) => handleNewTipChange('win_rate', e.target.value)}
                          placeholder="75.0"
                          className="border-0 bg-muted/30 h-10 font-semibold text-center focus:bg-muted/50"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Metrics Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 pb-4 border-b border-border/30">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-950/50 dark:to-purple-900/30 rounded-xl border border-purple-200/50 dark:border-purple-800/30 shadow-sm">
                      <DollarSign size={20} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-foreground tracking-tight">Financial Metrics</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">Additional financial and market data points</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Dividend Yield Card */}
                    <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <Percent size={18} className="text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-foreground">Dividend Yield</Label>
                          <p className="text-xs text-muted-foreground">Annual %</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <Input
                          type="number"
                          step="0.01"
                          value={newTip.dividend_yield}
                          onChange={(e) => handleNewTipChange('dividend_yield', e.target.value)}
                          placeholder="2.5"
                          className="border-0 bg-muted/30 h-10 font-semibold text-center focus:bg-muted/50"
                        />
                      </div>
                    </div>

                    {/* Volatility Card */}
                    <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                          <Activity size={18} className="text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-foreground">Volatility</Label>
                          <p className="text-xs text-muted-foreground">Price swings</p>
                        </div>
                      </div>
                      <Select value={newTip.volatility} onValueChange={(val) => handleNewTipChange('volatility', val)}>
                        <SelectTrigger className="border-0 bg-muted/30 h-10 font-semibold focus:bg-muted/50">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2">
                          {['Very Low', 'Low', 'Medium', 'High', 'Very High'].map(opt => (
                            <SelectItem key={opt} value={opt} className="rounded-lg font-medium">{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Liquidity Card */}
                    <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <Droplets size={18} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-foreground">Liquidity</Label>
                          <p className="text-xs text-muted-foreground">Trading ease</p>
                        </div>
                      </div>
                      <Select value={newTip.liquidity} onValueChange={(val) => handleNewTipChange('liquidity', val)}>
                        <SelectTrigger className="border-0 bg-muted/30 h-10 font-semibold focus:bg-muted/50">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2">
                          {['Very High', 'High', 'Medium', 'Low', 'Very Low'].map(opt => (
                            <SelectItem key={opt} value={opt} className="rounded-lg font-medium">{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* ESG Rating Card */}
                    <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                          <Leaf size={18} className="text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-foreground">ESG Rating</Label>
                          <p className="text-xs text-muted-foreground">Sustainability</p>
                        </div>
                      </div>
                      <Select value={newTip.esg_rating} onValueChange={(val) => handleNewTipChange('esg_rating', val)}>
                        <SelectTrigger className="border-0 bg-muted/30 h-10 font-semibold focus:bg-muted/50">
                          <SelectValue placeholder="Rating" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2">
                          {['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC'].map(opt => (
                            <SelectItem key={opt} value={opt} className="rounded-lg font-medium">{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Valuation & Technical Analysis Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 pb-4 border-b border-border/30">
                    <div className="p-3 bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-950/50 dark:to-indigo-900/30 rounded-xl border border-indigo-200/50 dark:border-indigo-800/30 shadow-sm">
                      <LineChart size={20} className="text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-foreground tracking-tight">Valuation & Technical Analysis</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">Fundamental metrics and technical indicators</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Valuation Metrics */}
                    <div className="space-y-4">
                      <h4 className="text-base font-semibold text-foreground flex items-center gap-2">
                        <Calculator size={16} className="text-primary" />
                        Valuation Metrics
                      </h4>
                      
                      <div className="grid gap-4">
                        {/* Valuation Metric Card */}
                        <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                              <Banknote size={18} className="text-cyan-600 dark:text-cyan-400" />
                            </div>
                            <div>
                              <Label className="text-sm font-semibold text-foreground">Valuation Metric</Label>
                              <p className="text-xs text-muted-foreground">Primary metric</p>
                            </div>
                          </div>
                          <Select value={newTip.valuation_metric} onValueChange={(val) => handleNewTipChange('valuation_metric', val)}>
                            <SelectTrigger className="border-0 bg-muted/30 h-10 font-semibold focus:bg-muted/50">
                              <SelectValue placeholder="Select metric" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-2">
                              {['P/E Ratio', 'P/B Ratio', 'EV/EBITDA', 'P/S Ratio', 'PEG Ratio', 'Dividend Yield', 'Price/Cash Flow'].map(opt => (
                                <SelectItem key={opt} value={opt} className="rounded-lg font-medium">{opt}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Growth Metric Card */}
                        <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                              <TrendingUp size={18} className="text-teal-600 dark:text-teal-400" />
                            </div>
                            <div>
                              <Label className="text-sm font-semibold text-foreground">Growth Metric</Label>
                              <p className="text-xs text-muted-foreground">Growth measure</p>
                            </div>
                          </div>
                          <Select value={newTip.growth_metric} onValueChange={(val) => handleNewTipChange('growth_metric', val)}>
                            <SelectTrigger className="border-0 bg-muted/30 h-10 font-semibold focus:bg-muted/50">
                              <SelectValue placeholder="Select metric" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-2">
                              {['Revenue Growth', 'Earnings Growth', 'EBITDA Growth', 'Free Cash Flow Growth', 'ROE', 'ROA', 'ROIC'].map(opt => (
                                <SelectItem key={opt} value={opt} className="rounded-lg font-medium">{opt}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Valuation Notes */}
                        <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-muted dark:bg-secondary/50 rounded-lg">
                              <FileText size={18} className="text-muted-foreground dark:text-muted-foreground" />
                            </div>
                            <div>
                              <Label className="text-sm font-semibold text-foreground">Valuation Notes</Label>
                              <p className="text-xs text-muted-foreground">Analysis details</p>
                            </div>
                          </div>
                          <Textarea
                            value={newTip.valuation}
                            onChange={(e) => handleNewTipChange('valuation', e.target.value)}
                            placeholder="Detailed valuation analysis..."
                            className="min-h-[80px] border-0 bg-muted/30 focus:bg-muted/50 resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Technical Analysis */}
                    <div className="space-y-4">
                      <h4 className="text-base font-semibold text-foreground flex items-center gap-2">
                        <BarChart2 size={16} className="text-primary" />
                        Technical Analysis
                      </h4>
                      
                      <div className="grid gap-4">
                        {/* Technical Indicator Card */}
                        <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
                              <Activity size={18} className="text-rose-600 dark:text-rose-400" />
                            </div>
                            <div>
                              <Label className="text-sm font-semibold text-foreground">Technical Indicator</Label>
                              <p className="text-xs text-muted-foreground">Primary signal</p>
                            </div>
                          </div>
                          <Select value={newTip.technical_indicator} onValueChange={(val) => handleNewTipChange('technical_indicator', val)}>
                            <SelectTrigger className="border-0 bg-muted/30 h-10 font-semibold focus:bg-muted/50">
                              <SelectValue placeholder="Select indicator" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-2">
                              {['RSI', 'MACD', 'Moving Averages', 'Bollinger Bands', 'Stochastic', 'Williams %R', 'Volume', 'Support/Resistance'].map(opt => (
                                <SelectItem key={opt} value={opt} className="rounded-lg font-medium">{opt}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Technical Analysis Notes */}
                        <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                              <LineChart size={18} className="text-violet-600 dark:text-violet-400" />
                            </div>
                            <div>
                              <Label className="text-sm font-semibold text-foreground">Technical Analysis</Label>
                              <p className="text-xs text-muted-foreground">Chart patterns</p>
                            </div>
                          </div>
                          <Textarea
                            value={newTip.technical}
                            onChange={(e) => handleNewTipChange('technical', e.target.value)}
                            placeholder="Technical analysis notes, chart patterns, support/resistance levels..."
                            className="min-h-[80px] border-0 bg-muted/30 focus:bg-muted/50 resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Investment Catalyst & Additional Details Section */}
                <div className="space-y-6 pb-6">
                  <div className="flex items-center gap-4 pb-4 border-b border-border/30">
                    <div className="p-3 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-950/50 dark:to-amber-900/30 rounded-xl border border-amber-200/50 dark:border-amber-800/30 shadow-sm">
                      <Lightbulb size={20} className="text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-foreground tracking-tight">Investment Catalyst & Context</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">Key drivers and additional investment details</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Investment Catalyst - Full Width */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                          <Rocket size={16} className="text-primary" />
                          Investment Catalyst
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info size={16} className="text-muted-foreground hover:text-foreground cursor-help transition-colors" />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="p-0 border-2 border-black dark:border-black shadow-xl bg-white dark:bg-background rounded-xl overflow-hidden">
                              <div className="w-80 p-5">
                                <div className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">Key Investment Catalyst</div>
                                <div className="text-xs text-gray-600 dark:text-muted-foreground space-y-2 leading-relaxed">
                                  <p>What will drive the stock price higher?</p>
                                  <p>• Earnings growth, new product launch</p>
                                  <p>• Regulatory approval, market expansion</p>
                                  <p>• Management change, strategic initiatives</p>
                                  <p>• Sector rotation, economic conditions</p>
                                </div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Textarea
                        value={newTip.catalyst}
                        onChange={(e) => handleNewTipChange('catalyst', e.target.value)}
                        placeholder="Describe the key catalyst that will drive price appreciation (e.g., upcoming earnings beat, product launch, regulatory approval...)"
                        className="min-h-[100px] resize-none border-2 focus:border-primary/60 rounded-xl bg-background/50 backdrop-blur-sm shadow-sm transition-all duration-200 focus:shadow-md"
                      />
                    </div>

                    {/* Additional Details Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Region & Market Cap */}
                      <div className="space-y-4">
                        <h4 className="text-base font-semibold text-foreground flex items-center gap-2">
                          <Globe size={16} className="text-primary" />
                          Market Context
                        </h4>
                        
                        <div className="grid gap-4">
                          {/* Region Card */}
                          <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 bg-sky-100 dark:bg-sky-900/30 rounded-lg">
                                <Globe size={18} className="text-sky-600 dark:text-sky-400" />
                              </div>
                              <div>
                                <Label className="text-sm font-semibold text-foreground">Region</Label>
                                <p className="text-xs text-muted-foreground">Market geography</p>
                              </div>
                            </div>
                            <Select value={newTip.region} onValueChange={(val) => handleNewTipChange('region', val)}>
                              <SelectTrigger className="border-0 bg-muted/30 h-10 font-semibold focus:bg-muted/50">
                                <SelectValue placeholder="Select region" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl border-2">
                                {MASTER_FILTERS.regions.map(opt => (
                                  <SelectItem key={opt.name} value={opt.name} className="rounded-lg">
                                    <div className="flex items-center gap-3 py-1">
                                      <opt.Icon size={16} className="text-muted-foreground" />
                                      <span className="font-medium">{opt.name}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Market Cap Card */}
                          <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 bg-muted dark:bg-secondary/50 rounded-lg">
                                <Building2 size={18} className="text-muted-foreground dark:text-muted-foreground" />
                              </div>
                              <div>
                                <Label className="text-sm font-semibold text-foreground">Market Cap</Label>
                                <p className="text-xs text-muted-foreground">Company size</p>
                              </div>
                            </div>
                            <Select value={newTip.market_cap} onValueChange={(val) => handleNewTipChange('market_cap', val)}>
                              <SelectTrigger className="border-0 bg-muted/30 h-10 font-semibold focus:bg-muted/50">
                                <SelectValue placeholder="Select size" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl border-2">
                                {MASTER_FILTERS.marketCap.map(opt => (
                                  <SelectItem key={opt.name} value={opt.name} className="rounded-lg">
                                    <div className="flex items-center gap-3 py-1">
                                      <opt.Icon size={16} className="text-muted-foreground" />
                                      <span className="font-medium">{opt.name}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Investment Details */}
                      <div className="space-y-4">
                        <h4 className="text-base font-semibold text-foreground flex items-center gap-2">
                          <Briefcase size={16} className="text-primary" />
                          Investment Details
                        </h4>
                        
                        <div className="grid gap-4">
                          {/* Analysis Type Card */}
                          <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                                <Calculator size={18} className="text-pink-600 dark:text-pink-400" />
                              </div>
                              <div>
                                <Label className="text-sm font-semibold text-foreground">Analysis Type</Label>
                                <p className="text-xs text-muted-foreground">Method used</p>
                              </div>
                            </div>
                            <Select value={newTip.analysis_type} onValueChange={(val) => handleNewTipChange('analysis_type', val)}>
                              <SelectTrigger className="border-0 bg-muted/30 h-10 font-semibold focus:bg-muted/50">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl border-2">
                                {MASTER_FILTERS.analysisType.map(opt => (
                                  <SelectItem key={opt.name} value={opt.name} className="rounded-lg">
                                    <div className="flex items-center gap-3 py-1">
                                      <opt.Icon size={16} className="text-muted-foreground" />
                                      <span className="font-medium">{opt.name}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Diversification Card */}
                          <div className="bg-background/50 border-2 border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                                <GitBranch size={18} className="text-teal-600 dark:text-teal-400" />
                              </div>
                              <div>
                                <Label className="text-sm font-semibold text-foreground">Diversification</Label>
                                <p className="text-xs text-muted-foreground">Portfolio role</p>
                              </div>
                            </div>
                            <Input
                              value={newTip.diversification}
                              onChange={(e) => handleNewTipChange('diversification', e.target.value)}
                              placeholder="e.g., Core holding, Satellite position"
                              className="border-0 bg-muted/30 h-10 font-semibold focus:bg-muted/50"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Tip Details Sheet */}
        <Sheet open={showTipDetails} onOpenChange={setShowTipDetails}>
          <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto bg-white dark:bg-black border-l border-gray-200 dark:border-gray-800">
            {/* Header with padding matching stats cards */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-background/95 via-background/98 to-background/95 dark:from-card/95 dark:via-secondary/98 dark:to-card/95">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 shadow-sm">
                  <BarChart2 size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-xl font-bold">{selectedTip?.symbol}</div>
                  <div className="text-sm text-muted-foreground">Investment Analysis</div>
                </div>
              </div>
            </div>
            
            {/* Mobile Tip Sheet Content - Exact Copy from TipScreen.jsx */}
            <div className="space-y-6 p-2">
            {selectedTip && (
              <>
                {/* Header - Dual Template */}
                <div className="p-2 border-b border-border">
                  {selectedTip.advisor_sebi_registered || selectedTip.sebi_registered ? (
                    // SEBI Registered Advisor Template - Professional Advisory
                    <>
                      <div className="flex items-center gap-3 text-lg font-semibold mb-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Target size={20} className="text-primary" />
                        </div>
                        Investment Advisory
                      </div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        Copy this exact configuration to achieve the projected results. Professional analysis with precise entry, exit, and risk parameters for {selectedTip.symbol}.
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
                        Educational analysis for learning purposes. Study these price levels and market dynamics to understand potential {selectedTip.symbol} opportunities.
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
                        <div style={{ height: '320px', width: '100%', margin: -1 }}>
                          <TradingViewWidget
                            symbol={selectedTip?.symbol}
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
                    {selectedTip.advisor_sebi_registered || selectedTip.sebi_registered ? 'Investment Strategy' : 'Research Analysis'}
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
                          {selectedTip.asset || selectedTip.asset_class}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="text-xs text-muted-foreground">Symbol</div>
                          <div className="font-bold text-sm text-primary">{selectedTip.symbol}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-xs text-muted-foreground">Sector</div>
                          <div className="font-semibold text-sm">{selectedTip.sector}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-xs text-muted-foreground">
                            {selectedTip.advisor_sebi_registered || selectedTip.sebi_registered ? 'Trade Style' : 'Study Period'}
                          </div>
                          <div className="font-semibold text-sm">{selectedTip.holding || 'Swing'}</div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border">
                        <div className="flex items-start gap-2 mb-2">
                          <BookOpen size={14} className="text-primary mt-0.5" />
                          <span className="text-sm font-medium">
                            {selectedTip.advisor_sebi_registered || selectedTip.sebi_registered ? 'Investment Thesis' : 'Research Findings'}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground leading-relaxed">
                          {selectedTip.tip}
                        </div>
                      </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="px-4 py-2 bg-muted/20 border-t border-border">
                      <div className="text-xs text-muted-foreground text-center">
                        {selectedTip.advisor_sebi_registered || selectedTip.sebi_registered 
                          ? 'Professional investment advisory with actionable trade setup' 
                          : 'Educational research for learning - not direct investment advice'
                        }
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trade Configuration Section - Dual Template */}
                <div className="space-y-4 p-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <Target size={14} />
                    {selectedTip.advisor_sebi_registered || selectedTip.sebi_registered ? 'Trade Configuration' : 'Price Analysis'}
                  </h3>
                  
                  {/* Price Targets Card */}
                  <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <div className="px-4 py-3 bg-muted/40 border-b border-border">
                      <div className="flex items-center gap-2">
                        <Target size={16} className="text-green-600" />
                        <span className="text-sm font-medium">
                          {selectedTip.advisor_sebi_registered || selectedTip.sebi_registered ? 'Price Targets' : 'Price Levels Study'}
                        </span>
                      </div>
                    </div>
                    
                        <div className="p-4">
                          <div className="grid grid-cols-3 gap-4">
                            {selectedTip.entry_price && (
                              <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200 cursor-pointer hover:bg-green-100 transition-colors">
                                <div className="text-xs text-green-700 mb-1">
                                  {selectedTip.advisor_sebi_registered || selectedTip.sebi_registered ? 'Entry Point' : 'Study Level'}
                                </div>
                                <div className="font-bold text-lg text-green-700">₹{selectedTip.entry_price}</div>
                              </div>
                            )}
                            
                            {selectedTip.exit_price && (
                              <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors">
                                <div className="text-xs text-blue-700 mb-1">
                                  {selectedTip.advisor_sebi_registered || selectedTip.sebi_registered ? 'Target Price' : 'Price Target Study'}
                                </div>
                                <div className="font-bold text-lg text-blue-700">₹{selectedTip.exit_price}</div>
                              </div>
                            )}
                            
                            {selectedTip.stop_loss && (
                              <div className="text-center p-3 rounded-lg bg-red-50 border border-red-200 cursor-pointer hover:bg-red-100 transition-colors">
                                <div className="text-xs text-red-700 mb-1">
                                  {selectedTip.advisor_sebi_registered || selectedTip.sebi_registered ? 'Stop Loss' : 'Risk Level Study'}
                                </div>
                                <div className="font-bold text-lg text-red-700">₹{selectedTip.stop_loss}</div>
                              </div>
                            )}
                          </div>
                        </div>                    <div className="px-4 py-2 bg-muted/20 border-t border-border">
                      <div className="text-xs text-muted-foreground text-center">
                        {selectedTip.advisor_sebi_registered || selectedTip.sebi_registered 
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
                          {selectedTip.advisor_sebi_registered || selectedTip.sebi_registered ? 'Position Management' : 'Portfolio Study'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                          <div className="text-xs text-muted-foreground mb-1">
                            {selectedTip.advisor_sebi_registered || selectedTip.sebi_registered ? 'Expected Return' : 'Return Analysis'}
                          </div>
                          <div className="font-bold text-sm text-green-600">{selectedTip.expected_return || 'N/A'}</div>
                        </div>
                        
                        <div className="text-center p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                          <div className="text-xs text-muted-foreground mb-1">
                            {selectedTip.advisor_sebi_registered || selectedTip.sebi_registered ? 'Portfolio Allocation' : 'Allocation Study'}
                          </div>
                          <div className="font-bold text-sm">{selectedTip.allocation || '5'}%</div>
                        </div>
                        
                        <div className="text-center p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                          <div className="text-xs text-muted-foreground mb-1">
                            {selectedTip.advisor_sebi_registered || selectedTip.sebi_registered ? 'Investment Duration' : 'Duration Study'}
                          </div>
                          <div className="font-bold text-sm">{selectedTip.duration || selectedTip.holding || 'Medium'}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-4 py-2 bg-muted/20 border-t border-border">
                      <div className="text-xs text-muted-foreground text-center">
                        {selectedTip.advisor_sebi_registered || selectedTip.sebi_registered 
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
                    {selectedTip.advisor_sebi_registered || selectedTip.sebi_registered ? 'Market Intelligence' : 'Market Research'}
                  </h3>
                  
                  {/* Analysis Summary Card */}
                  <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <div className="px-4 py-3 bg-muted/40 border-b border-border">
                      <div className="flex items-center gap-2">
                        <Activity size={16} className="text-orange-600" />
                        <span className="text-sm font-medium">
                          {selectedTip.advisor_sebi_registered || selectedTip.sebi_registered ? 'Analysis Summary' : 'Research Summary'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-4">
                      {/* Primary Analysis Grid - 2x3 layout */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-muted/30 border border-dashed border-border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-muted-foreground">Risk Level</span>
                            <AlertTriangle size={12} className="text-yellow-600" />
                          </div>
                          <div className="font-medium text-sm">{selectedTip.risk || 'Medium'}</div>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-muted/30 border border-dashed border-border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-muted-foreground">Conviction</span>
                            <Award size={12} className="text-blue-600" />
                          </div>
                          <div className="font-medium text-sm">{selectedTip.conviction || 'High'}</div>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-muted/30 border border-dashed border-border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-muted-foreground">Strategy</span>
                            <Activity size={12} className="text-green-600" />
                          </div>
                          <div className="font-medium text-sm">{selectedTip.strategy || 'Growth'}</div>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-muted/30 border border-dashed border-border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-muted-foreground">Market Cap</span>
                            <Building size={12} className="text-purple-600" />
                          </div>
                          <div className="font-medium text-sm">{selectedTip.market_segment || 'Large Cap'}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-4 py-2 bg-muted/20 border-t border-border">
                      <div className="text-xs text-muted-foreground text-center">
                        {selectedTip.advisor_sebi_registered || selectedTip.sebi_registered 
                          ? 'Professional analysis based on comprehensive market research' 
                          : 'Educational analysis for learning market dynamics and investment principles'
                        }
                      </div>
                    </div>
                  </div>

                  {/* Technical & Fundamental Analysis Card - Only show if data exists */}
                  {(selectedTip.rsi || selectedTip.technical_rsi || selectedTip.macd || selectedTip.technical_macd || 
                    selectedTip.support_level || selectedTip.technical_support || selectedTip.resistance_level || 
                    selectedTip.technical_resistance || selectedTip.pe_ratio || selectedTip.fundamental_pe || 
                    selectedTip.pb_ratio || selectedTip.fundamental_pb || selectedTip.roe || selectedTip.fundamental_roe || 
                    selectedTip.debt_equity || selectedTip.fundamental_de || selectedTip.revenue_growth || 
                    selectedTip.financial_revenue_growth || selectedTip.profit_margin || selectedTip.financial_profit_margin || 
                    selectedTip.eps_growth || selectedTip.financial_eps_growth || selectedTip.market_cap_rank || 
                    selectedTip.market_position_rank || selectedTip.competitive_edge || selectedTip.market_competitive_edge || 
                    selectedTip.market_share || selectedTip.market_position_share) && (
                    <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <div className="px-4 py-3 bg-muted/40 border-b border-border">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-cyan-600" />
                        <span className="text-sm font-medium">
                          {selectedTip.advisor_sebi_registered || selectedTip.sebi_registered ? 'Technical & Fundamental Analysis' : 'Technical & Financial Study'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-6">
                      {/* Technical Analysis Section */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <BarChart2 size={14} className="text-cyan-600" />
                          <span className="text-sm font-semibold text-muted-foreground">Technical Indicators</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {(selectedTip.rsi || selectedTip.technical_rsi) && (
                            <div className="p-3 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-cyan-700 dark:text-cyan-300">RSI (14)</span>
                                <Activity size={12} className="text-cyan-600" />
                              </div>
                              <div className="font-medium text-sm text-cyan-800 dark:text-cyan-200">{selectedTip.rsi || selectedTip.technical_rsi}</div>
                              <div className="w-full h-1 bg-cyan-200 dark:bg-cyan-800 rounded-full mt-1">
                                <div className="h-1 bg-cyan-500 rounded-full" style={{ width: `${Math.min(100, (parseFloat(selectedTip.rsi || selectedTip.technical_rsi) / 100) * 100)}%` }}></div>
                              </div>
                            </div>
                          )}
                          
                          {(selectedTip.macd || selectedTip.technical_macd) && (
                            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-blue-700 dark:text-blue-300">MACD Signal</span>
                                <TrendingUp size={12} className="text-blue-600" />
                              </div>
                              <div className="font-medium text-sm text-blue-800 dark:text-blue-200">{selectedTip.macd || selectedTip.technical_macd}</div>
                              <div className="flex items-center gap-1 mt-1">
                                <div className={`w-2 h-2 rounded-full ${(selectedTip.macd || selectedTip.technical_macd) === 'Bullish' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span className="text-xs text-blue-600 dark:text-blue-400">
                                  {(selectedTip.macd || selectedTip.technical_macd) === 'Bullish' ? 'Positive' : 'Negative'}
                                </span>
                              </div>
                            </div>
                          )}
                          
                          {(selectedTip.support_level || selectedTip.technical_support) && (
                            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-green-700 dark:text-green-300">Support Level</span>
                                <ArrowDown size={12} className="text-green-600" />
                              </div>
                              <div className="font-medium text-sm text-green-800 dark:text-green-200">₹{selectedTip.support_level || selectedTip.technical_support}</div>
                            </div>
                          )}
                          
                          {(selectedTip.resistance_level || selectedTip.technical_resistance) && (
                            <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-orange-700 dark:text-orange-300">Resistance Level</span>
                                <ArrowUp size={12} className="text-orange-600" />
                              </div>
                              <div className="font-medium text-sm text-orange-800 dark:text-orange-200">₹{selectedTip.resistance_level || selectedTip.technical_resistance}</div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Fundamental Analysis Section */}
                      <div className="border-t border-dashed border-border pt-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Calculator size={14} className="text-emerald-600" />
                          <span className="text-sm font-semibold text-muted-foreground">Fundamental Metrics</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {(selectedTip.pe_ratio || selectedTip.fundamental_pe) && (
                            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-emerald-700 dark:text-emerald-300">P/E Ratio</span>
                                <DollarSign size={12} className="text-emerald-600" />
                              </div>
                              <div className="font-medium text-sm text-emerald-800 dark:text-emerald-200">{selectedTip.pe_ratio || selectedTip.fundamental_pe}</div>
                              <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                                {parseFloat(selectedTip.pe_ratio || selectedTip.fundamental_pe) < 20 ? 'Reasonable' : 'Premium'}
                              </div>
                            </div>
                          )}
                          
                          {(selectedTip.pb_ratio || selectedTip.fundamental_pb) && (
                            <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-purple-700 dark:text-purple-300">P/B Ratio</span>
                                <Package size={12} className="text-purple-600" />
                              </div>
                              <div className="font-medium text-sm text-purple-800 dark:text-purple-200">{selectedTip.pb_ratio || selectedTip.fundamental_pb}</div>
                              <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                                {parseFloat(selectedTip.pb_ratio || selectedTip.fundamental_pb) < 3 ? 'Fair Value' : 'Above Book'}
                              </div>
                            </div>
                          )}
                          
                          {(selectedTip.roe || selectedTip.fundamental_roe) && (
                            <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-indigo-700 dark:text-indigo-300">ROE (%)</span>
                                <TrendingUp size={12} className="text-indigo-600" />
                              </div>
                              <div className="font-medium text-sm text-indigo-800 dark:text-indigo-200">{selectedTip.roe || selectedTip.fundamental_roe}%</div>
                              <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                                {parseFloat(selectedTip.roe || selectedTip.fundamental_roe) > 15 ? 'Strong' : 'Average'}
                              </div>
                            </div>
                          )}
                          
                          {(selectedTip.debt_equity || selectedTip.fundamental_de) && (
                            <div className="p-3 rounded-lg bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-pink-700 dark:text-pink-300">Debt/Equity</span>
                                <AlertTriangle size={12} className="text-pink-600" />
                              </div>
                              <div className="font-medium text-sm text-pink-800 dark:text-pink-200">{selectedTip.debt_equity || selectedTip.fundamental_de}</div>
                              <div className="text-xs text-pink-600 dark:text-pink-400 mt-1">
                                {parseFloat(selectedTip.debt_equity || selectedTip.fundamental_de) < 0.5 ? 'Conservative' : 'Leveraged'}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Financial Health Section */}
                      <div className="border-t border-dashed border-border pt-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Shield size={14} className="text-amber-600" />
                          <span className="text-sm font-semibold text-muted-foreground">Financial Health</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {(selectedTip.revenue_growth || selectedTip.financial_revenue_growth) && (
                            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-center">
                              <div className="text-xs text-amber-700 dark:text-amber-300 mb-1">Revenue Growth</div>
                              <div className="font-medium text-sm text-amber-800 dark:text-amber-200">{selectedTip.revenue_growth || selectedTip.financial_revenue_growth}%</div>
                              <div className="w-full h-1 bg-amber-200 dark:bg-amber-800 rounded-full mt-1">
                                <div className="h-1 bg-amber-500 rounded-full" style={{ width: `${Math.min(100, Math.max(0, parseFloat(selectedTip.revenue_growth || selectedTip.financial_revenue_growth)))}%` }}></div>
                              </div>
                            </div>
                          )}
                          
                          {(selectedTip.profit_margin || selectedTip.financial_profit_margin) && (
                            <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 text-center">
                              <div className="text-xs text-teal-700 dark:text-teal-300 mb-1">Profit Margin</div>
                              <div className="font-medium text-sm text-teal-800 dark:text-teal-200">{selectedTip.profit_margin || selectedTip.financial_profit_margin}%</div>
                              <div className="w-full h-1 bg-teal-200 dark:bg-teal-800 rounded-full mt-1">
                                <div className="h-1 bg-teal-500 rounded-full" style={{ width: `${Math.min(100, Math.max(0, parseFloat(selectedTip.profit_margin || selectedTip.financial_profit_margin) * 10))}%` }}></div>
                              </div>
                            </div>
                          )}
                          
                          {(selectedTip.eps_growth || selectedTip.financial_eps_growth) && (
                            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 text-center">
                              <div className="text-xs text-rose-700 dark:text-rose-300 mb-1">EPS Growth</div>
                              <div className="font-medium text-sm text-rose-800 dark:text-rose-200">{selectedTip.eps_growth || selectedTip.financial_eps_growth}%</div>
                              <div className="w-full h-1 bg-rose-200 dark:bg-rose-800 rounded-full mt-1">
                                <div className="h-1 bg-rose-500 rounded-full" style={{ width: `${Math.min(100, Math.max(0, parseFloat(selectedTip.eps_growth || selectedTip.financial_eps_growth)))}%` }}></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Market Position Section */}
                      <div className="border-t border-dashed border-border pt-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Target size={14} className="text-violet-600" />
                          <span className="text-sm font-semibold text-muted-foreground">Market Position</span>
                        </div>
                        <div className="space-y-3">
                          {(selectedTip.market_cap_rank || selectedTip.market_position_rank) && (
                            <div className="flex items-center justify-between p-3 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-200 dark:border-violet-800">
                              <div className="flex items-center gap-2">
                                <Building size={12} className="text-violet-600" />
                                <span className="text-xs text-violet-700 dark:text-violet-300">Market Cap Rank</span>
                              </div>
                              <span className="text-sm font-medium text-violet-800 dark:text-violet-200">
                                #{selectedTip.market_cap_rank || selectedTip.market_position_rank} in sector
                              </span>
                            </div>
                          )}
                          
                          {(selectedTip.competitive_edge || selectedTip.market_competitive_edge) && (
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg border border-gray-200 dark:border-gray-800">
                              <div className="flex items-center gap-2">
                                <Award size={12} className="text-gray-600" />
                                <span className="text-xs text-gray-700 dark:text-gray-300">Competitive Edge</span>
                              </div>
                              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                {selectedTip.competitive_edge || selectedTip.market_competitive_edge}
                              </span>
                            </div>
                          )}
                          
                          {(selectedTip.market_share || selectedTip.market_position_share) && (
                            <div className="flex items-center justify-between p-3 bg-sky-50 dark:bg-sky-900/20 rounded-lg border border-sky-200 dark:border-sky-800">
                              <div className="flex items-center gap-2">
                                <Globe size={12} className="text-sky-600" />
                                <span className="text-xs text-sky-700 dark:text-sky-300">Market Share</span>
                              </div>
                              <span className="text-sm font-medium text-sky-800 dark:text-sky-200">
                                {selectedTip.market_share || selectedTip.market_position_share}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-4 py-2 bg-muted/20 border-t border-border">
                      <div className="text-xs text-muted-foreground text-center">
                        {selectedTip.advisor_sebi_registered || selectedTip.sebi_registered 
                          ? 'Comprehensive technical and fundamental analysis for professional investment decisions' 
                          : 'Educational study of technical indicators and fundamental metrics for learning purposes'
                        }
                      </div>
                    </div>
                  </div>
                  )}
                </div>

            

                {/* Disclaimer Section */}

              </>
            )}
            </div>
            
           
          </SheetContent>
        </Sheet>

        {/* Full Screen Chart Modal */}
        <Dialog open={showFullScreenChart} onOpenChange={setShowFullScreenChart}>
          <DialogContent className="min-w-[95vw] max-h-[95vh] w-full h-full p-0 overflow-hidden">
            <DialogHeader className="px-6 py-4 border-b">
              <DialogTitle className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                {chartSymbol} - Full Screen Chart
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 p-4 h-[calc(95vh-80px)]">
              {chartSymbol && (
                <TradingViewWidget 
                  symbol={chartSymbol} 
                  height="100%"
                  width="100%"
                  theme="light"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
