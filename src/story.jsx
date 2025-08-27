import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronLeft, ChevronRight, TrendingUp, Shield, Users, Target, Award, Zap, 
  BarChart3, PieChart, LineChart, DollarSign, Clock, Star, CheckCircle, 
  AlertTriangle, TrendingDown, Calculator, Briefcase, Globe, ArrowUp, 
  ArrowDown, Eye, Lock, Unlock, Phone, Mail, MapPin, Calendar,
  Activity, Layers, Database, Smartphone, Cpu, Cloud, UserPlus, Wallet,
  TrendingDown as TrendingDownIcon, ArrowRight, FileText, CreditCard,
  Banknote, Percent, Gift, BookOpen, GraduationCap, Lightbulb,
  Network, Share2, MessageCircle, Bell, Settings, BarChart, PiggyBank,
  Coins, HandCoins, Receipt, Building, Factory, Menu, X, Download,
  Search, Filter,
  Upload,
  HelpCircle
} from 'lucide-react';
import LollipopSVG from './assets/icons/lollipop.svg';
import LollipopSVGWhite from './assets/icons/lollipop-white.svg';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const Story = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showAdvisorSheet, setShowAdvisorSheet] = useState(false);

  // Navigation sections for sticky header
  const navSections = [
    { id: 'hero', label: 'Home' },
    { id: 'problem', label: 'Problem' },
    { id: 'solution', label: 'Solution' },
    { id: 'advisors', label: 'For Advisors' },
    { id: 'platform', label: 'Test Platform' },
    { id: 'getting-started', label: 'Get Started' },
    { id: 'success-story', label: 'Success Story' },
    { id: 'cta', label: 'Join Now' },
    { id: 'contact', label: 'Contact' }
  ];

  // Action handlers for buttons
  const handleGetStarted = () => {
    window.location.href = '/tips';
  };

  const handleGoToTips = () => {
    window.location.href = '/tips';
  };

  const handleViewDemo = () => {
    // Open demo video or redirect to demo page
    window.open('https://demo.lollipop.in', '_blank');
  };

  const handleScheduleCall = () => {
    // Open Calendly or booking system
    window.open('https://calendly.com/lollipop-team/consultation', '_blank');
  };

  const handleCallUs = () => {
    window.open('tel:+918939350442');
  };

  const handleEmailUs = () => {
    window.open('mailto:hello@lollipop.in?subject=Inquiry about Lollipop Platform');
  };

  const handleSignup = () => {
    window.location.href = '/signup';
  };

  const handleAdvisorSignup = () => {
    setShowAdvisorSheet(true);
  };

  const handleTestPlatform = () => {
    window.open('/demo', '_blank');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Account for sticky header
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // Update active section immediately
      setActiveSection(sectionId);
      // Close mobile menu if open
      setMobileMenuOpen(false);
    }
  };

  const handlePremiumSubscription = (plan) => {
    window.location.href = `/subscription?plan=${plan}`;
  };

  // Handle PDF download
  const downloadPDF = async () => {
    const element = document.getElementById('landing-page-content');
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('lollipop-presentation.pdf');
  };

  // Handle scroll for active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = navSections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
        offset: document.getElementById(section.id)?.offsetTop || 0
      }));

      const scrollPosition = window.scrollY + 100;
      const currentSection = sections.find((section, index) => {
        const nextSection = sections[index + 1];
        return scrollPosition >= section.offset && 
               (!nextSection || scrollPosition < nextSection.offset);
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key for advisor sheet
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && showAdvisorSheet) {
        setShowAdvisorSheet(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showAdvisorSheet]);

const slides = [
  {
    id: 1,
    title: "Welcome to Lollipop",
    subtitle: "India's First SEBI-Regulated Investment Intelligence Platform",
    content: (
      <div className="space-y-8">
        {/* Hero Section with Pyramid Layout */}
        <div className="text-center space-y-6">
          <div className="mx-auto w-32 h-32 bg-gradient-to-br from-black to-gray-800 rounded-2xl flex items-center justify-center shadow-2xl">
            <img src={LollipopSVGWhite} className="w-16 h-16" alt="Lollipop Logo" />
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Democratizing professional investment advisory through technology, transparency, and regulatory compliance. 
              Connect with SEBI-registered advisors and unlock institutional-grade insights for your portfolio.
            </p>
          </div>
        </div>

        {/* Success Pyramid */}
        <div className="relative max-w-2xl mx-auto">
          <div className="text-center mb-4">
            <h4 className="text-lg font-bold">Our Success Pyramid</h4>
          </div>
          
          {/* Pyramid Level 1 - Top */}
          <div className="flex justify-center mb-2">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-6 py-3 rounded-lg text-center transform -rotate-1 shadow-lg">
              <div className="font-bold text-lg">72.3%</div>
              <div className="text-xs">Avg. Advisor Win Rate</div>
            </div>
          </div>
          
          {/* Pyramid Level 2 */}
          <div className="flex justify-center gap-4 mb-2">
            <div className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg text-center transform rotate-1 shadow-lg">
              <div className="font-bold">43%</div>
              <div className="text-xs">20-30 Years Age Group</div>
            </div>
            <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-4 py-2 rounded-lg text-center transform -rotate-1 shadow-lg">
              <div className="font-bold">957+</div>
              <div className="text-xs">SEBI Advisors</div>
            </div>
          </div>
          
          {/* Pyramid Level 3 - Base */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-8 py-4 rounded-lg text-center shadow-lg">
              <div className="font-bold text-xl">2.8M+</div>
              <div className="text-sm">Active Investors in India</div>
              <div className="text-xs mt-1">+15% annual growth</div>
            </div>
          </div>
        </div>

        {/* Circular Trust Indicators */}
        <div className="relative max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-8">
            <div className="relative">
              {/* Circular progress indicator */}
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-300 dark:text-gray-700"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-green-500"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="87, 100"
                  strokeLinecap="round"
                  fill="transparent"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">87%</div>
                  <div className="text-xs">YoY Growth</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-300 dark:text-gray-700"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-500"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="96, 100"
                  strokeLinecap="round"
                  fill="transparent"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">4.8★</div>
                  <div className="text-xs">User Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Flow */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-full px-6 py-3">
            <Shield className="w-5 h-5 text-green-600" />
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <Lock className="w-5 h-5 text-blue-600" />
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <Star className="w-5 h-5 text-purple-600" />
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <CheckCircle className="w-5 h-5 text-orange-600" />
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Market Analysis & Problem Statement",
    subtitle: "The ₹47,000 Crore Indian Investment Advisory Gap",
    content: (
      <div className="space-y-8">
        {/* Market Size Pie Chart */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-center">Market Penetration Gap</h4>
            <div className="relative w-64 h-64 mx-auto">
              {/* Pie Chart SVG */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-red-300"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray="97.7, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-green-500"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray="2.3, 100"
                  strokeDashoffset="97.7"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">97.7%</div>
                  <div className="text-sm">Underserved</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-300 rounded-full"></div>
                <span>Underserved (97.7%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Served (2.3%)</span>
              </div>
            </div>
          </div>

          {/* Market Funnel */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-center">Market Opportunity Funnel</h4>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">₹47,000Cr</div>
                <div className="text-sm">Total Market Size</div>
                <div className="text-xs opacity-80">Growing 18% annually</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-3 rounded-lg text-center mx-4">
                <div className="text-xl font-bold">₹8,400Cr</div>
                <div className="text-sm">Addressable Market</div>
                <div className="text-xs opacity-80">Our target segment</div>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-2 rounded-lg text-center mx-8">
                <div className="text-lg font-bold">14M</div>
                <div className="text-sm">Underserved Investors</div>
                <div className="text-xs opacity-80">Immediate opportunity</div>
              </div>
            </div>
          </div>
        </div>

     

        {/* Growth Trajectory Graph */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-xl p-6">
          <h4 className="text-lg font-bold mb-4 text-center">Market Growth Trajectory</h4>
          <div className="relative h-32 bg-white dark:bg-gray-900 rounded-lg p-4">
            {/* Simple line graph representation */}
            <svg className="w-full h-full" viewBox="0 0 400 100">
              <defs>
                <linearGradient id="growthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <polyline
                fill="none"
                stroke="url(#growthGradient)"
                strokeWidth="3"
                points="20,80 120,60 220,40 320,25 380,15"
              />
              <circle cx="20" cy="80" r="4" fill="#f59e0b" />
              <circle cx="120" cy="60" r="4" fill="#f59e0b" />
              <circle cx="220" cy="40" r="4" fill="#ef4444" />
              <circle cx="320" cy="25" r="4" fill="#8b5cf6" />
              <circle cx="380" cy="15" r="4" fill="#8b5cf6" />
            </svg>
            <div className="absolute bottom-2 left-4 text-xs text-orange-600">2020</div>
            <div className="absolute bottom-2 right-4 text-xs text-purple-600">2030</div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4 text-center">
            <div>
              <div className="text-xl font-bold text-orange-600">₹8,400Cr</div>
              <div className="text-xs">Current TAM</div>
            </div>
            <div>
              <div className="text-xl font-bold text-red-600">18%</div>
              <div className="text-xs">Annual Growth</div>
            </div>
            <div>
              <div className="text-xl font-bold text-purple-600">5x</div>
              <div className="text-xs">Expected Growth</div>
            </div>
            <div>
              <div className="text-xl font-bold text-blue-600">14M</div>
              <div className="text-xs">Target Users</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Platform Architecture & Technology",
    subtitle: "Built for Scale, Security, and Performance",
    content: (
      <div className="space-y-8">
        {/* Technology Stack Pyramid */}
        <div className="text-center space-y-6">
          <h4 className="text-xl font-bold">Technology Stack Pyramid</h4>
          <div className="max-w-lg mx-auto space-y-3">
            {/* Top Layer - Analytics */}
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-6 h-6" />
                  <div>
                    <div className="font-bold">Analytics Layer</div>
                    <div className="text-xs">Performance Tracking & Reports</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Middle Layer - Platform Services */}
            <div className="flex justify-center gap-3">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  <div>
                    <div className="font-bold text-sm">Real-time Analytics</div>
                    <div className="text-xs">99.9% Uptime</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <div>
                    <div className="font-bold text-sm">Security Layer</div>
                    <div className="text-xs">256-bit Encryption</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Base Layer - Infrastructure */}
            <div className="flex justify-center gap-2">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-2 rounded-lg shadow-lg text-center">
                <Cloud className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs font-bold">Cloud</div>
              </div>
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-lg shadow-lg text-center">
                <Smartphone className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs font-bold">Mobile</div>
              </div>
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 py-2 rounded-lg shadow-lg text-center">
                <Activity className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs font-bold">API</div>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-3 py-2 rounded-lg shadow-lg text-center">
                <Layers className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs font-bold">Services</div>
              </div>
            </div>
          </div>
        </div>

        {/* User Journey Flowchart */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
          <h4 className="text-xl font-bold mb-6 text-center">Complete User Journey Flowchart</h4>
          <div className="relative">
            {/* Flowchart nodes */}
            <div className="grid grid-cols-5 gap-4">
              {[
                {step: 1, title: "Register", desc: "Simple email signup", rate: "30 sec", color: "blue"},
                {step: 2, title: "Search", desc: "Find tips by company/strategy", rate: "25+ filters", color: "green"},
                {step: 3, title: "Audit", desc: "Check advisor track record", rate: "Full history", color: "purple"},
                {step: 4, title: "Trade", desc: "Place your trades", rate: "Instant", color: "orange"},
                {step: 5, title: "Track", desc: "Monitor portfolio", rate: "Live P&L", color: "red"}
              ].map((item, index) => (
                <div key={index} className="text-center relative">
                  <div className={`w-16 h-16 bg-${item.color}-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold shadow-lg`}>
                    {item.step}
                  </div>
                  <div className="font-medium text-sm">{item.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
                  <div className={`text-xs text-${item.color}-600 mt-1 font-bold`}>{item.rate}</div>
                  
                  {/* Arrow to next step */}
                  {index < 4 && (
                    <ArrowRight className="absolute top-6 -right-6 w-4 h-4 text-gray-400 z-10" />
                  )}
                </div>
              ))}
            </div>
            
            {/* Success Rate Flow */}
            <div className="mt-8 flex justify-center">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="font-bold">92%</div>
                    <div className="text-xs">Match Rate</div>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                  <div className="text-center">
                    <div className="font-bold">3.2s</div>
                    <div className="text-xs">Response Time</div>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                  <div className="text-center">
                    <div className="font-bold">78%</div>
                    <div className="text-xs">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics Dashboard */}
        <div className="grid md:grid-cols-4 gap-4">
          {[
            {icon: Cloud, title: "Cloud-Native", desc: "AWS Infrastructure", metric: "99.99%", detail: "SLA", color: "blue"},
            {icon: Smartphone, title: "Mobile-First", desc: "Progressive Web App", metric: "4.8★", detail: "App Rating", color: "green"},
            {icon: Activity, title: "API-Driven", desc: "RESTful Architecture", metric: "<200ms", detail: "Response", color: "purple"},
            {icon: Layers, title: "Microservices", desc: "Scalable Design", metric: "Auto", detail: "Scaling", color: "orange"}
          ].map((item, index) => (
            <Card key={index} className={`border-${item.color}-200 dark:border-${item.color}-800 relative overflow-hidden`}>
              <CardContent className="pt-4 text-center">
                <div className={`w-12 h-12 bg-${item.color}-100 dark:bg-${item.color}-900 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                </div>
                <div className="font-bold mb-1">{item.title}</div>
                <div className="text-xs text-muted-foreground mb-2">{item.desc}</div>
                <div className={`text-lg font-bold text-${item.color}-600`}>{item.metric}</div>
                <div className="text-xs text-muted-foreground">{item.detail}</div>
                
                {/* Background Pattern */}
                <div className={`absolute top-0 right-0 w-8 h-8 bg-${item.color}-100 dark:bg-${item.color}-900 rounded-bl-full opacity-50`}></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Comprehensive Performance Analytics",
    subtitle: "Data-Driven Investment Intelligence with Real Impact",
    content: (
      <div className="space-y-8">
        {/* Performance Dashboard Layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Win Rate Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Asset Class Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-48 h-48 mx-auto">
                {/* Circular Performance Chart */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circles */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-200" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-200" />
                  <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-200" />
                  <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-200" />
                  
                  {/* Performance arcs */}
                  <path d="M 50 10 A 40 40 0 0 1 85.36 35.36" fill="none" stroke="#22c55e" strokeWidth="3" />
                  <path d="M 85.36 35.36 A 40 40 0 0 1 85.36 64.64" fill="none" stroke="#3b82f6" strokeWidth="3" />
                  <path d="M 85.36 64.64 A 40 40 0 0 1 50 90" fill="none" stroke="#eab308" strokeWidth="3" />
                  <path d="M 50 90 A 40 40 0 0 1 14.64 64.64" fill="none" stroke="#f59e0b" strokeWidth="3" />
                </svg>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">78.4%</div>
                    <div className="text-xs">Avg Win Rate</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Large Cap 84.2%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Mid Cap 78.6%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Crypto 71.3%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Commodities 76.9%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Advisors Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5" />
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {rank: 1, name: "TechAnalyst Pro", specialty: "Technology", rate: "91.2%", badge: "🥇"},
                {rank: 2, name: "ValueInvestor_IN", specialty: "Value Investing", rate: "87.8%", badge: "🥈"},
                {rank: 3, name: "CryptoGuru_2024", specialty: "Cryptocurrency", rate: "83.4%", badge: "🥉"}
              ].map((advisor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="text-lg">{advisor.badge}</div>
                    <div>
                      <div className="font-bold text-sm">{advisor.name}</div>
                      <div className="text-xs text-muted-foreground">{advisor.specialty}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{advisor.rate}</div>
                    <div className="text-xs text-muted-foreground">Win Rate</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Growth Metrics Gauge */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Growth Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {label: "MAU", value: "847", change: "+34%", max: 1000},
                {label: "Tips", value: "2,134", change: "+67%", max: 3000},
                {label: "Revenue", value: "₹12.4L", change: "+89%", max: 15},
                {label: "Retention", value: "78.2%", change: "+12%", max: 100}
              ].map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{metric.label}</span>
                    <span className="font-bold">{metric.value}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                        style={{width: `${(parseFloat(metric.value.replace(/[^0-9.]/g, '')) / metric.max) * 100}%`}}
                      ></div>
                    </div>
                    <span className="text-xs text-green-600">{metric.change}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Success Stories Showcase */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-xl p-6">
          <h4 className="text-xl font-bold mb-6 text-center">Real Success Stories</h4>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Nitya Malhotra",
                role: "Marketing Manager",
                location: "Delhi",
                avatar: "N",
                returns: "+47%",
                profit: "₹23K",
                duration: "6 months",
                winRate: "89%",
                quote: "From random stock tips to systematic investing",
                color: "green"
              },
              {
                name: "Amit Gupta",
                role: "Software Engineer",
                location: "Bangalore",
                avatar: "A",
                returns: "+62%",
                profit: "₹1.8L",
                duration: "1 year",
                winRate: "85%",
                quote: "Best investment decision ever",
                color: "purple"
              },
              {
                name: "Venkant Rao",
                role: "Business Owner",
                location: "Mumbai",
                avatar: "V",
                returns: "+71%",
                profit: "₹4.2L",
                duration: "10 months",
                winRate: "91%",
                quote: "Platform's transparency gave me confidence",
                color: "orange"
              }
            ].map((story, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="pt-4">
                  {/* User Profile */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br from-${story.color}-400 to-${story.color}-600 rounded-full flex items-center justify-center text-white font-bold`}>
                      {story.avatar}
                    </div>
                    <div>
                      <div className="font-bold">{story.name}</div>
                      <div className="text-sm text-muted-foreground">{story.role}, {story.location}</div>
                    </div>
                  </div>
                  
                  {/* Performance Chart */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className={`text-center p-3 bg-${story.color}-50 dark:bg-${story.color}-950 rounded-lg`}>
                      <div className={`font-bold text-lg text-${story.color}-600`}>{story.returns}</div>
                      <div className="text-xs">Returns</div>
                    </div>
                    <div className={`text-center p-3 bg-${story.color}-50 dark:bg-${story.color}-950 rounded-lg`}>
                      <div className={`font-bold text-lg text-${story.color}-600`}>{story.profit}</div>
                      <div className="text-xs">Profit</div>
                    </div>
                  </div>
                  
                  {/* Quote */}
                  <blockquote className={`text-xs italic border-l-2 border-${story.color}-500 pl-3`}>
                    "{story.quote}"
                  </blockquote>
                  
                  {/* Background Pattern */}
                  <div className={`absolute top-0 right-0 w-16 h-16 bg-${story.color}-100 dark:bg-${story.color}-900 rounded-bl-full opacity-30`}></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-2">23.4%</div>
            <div className="text-sm text-muted-foreground mb-1">Average Annual Return</div>
            <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{width: '78%'}}></div>
            </div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">1.87</div>
            <div className="text-sm text-muted-foreground mb-1">Sharpe Ratio</div>
            <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
            </div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">12.3%</div>
            <div className="text-sm text-muted-foreground mb-1">Max Drawdown</div>
            <div className="w-full bg-purple-200 dark:bg-purple-800 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{width: '45%'}}></div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Business Model & Future Roadmap",
    subtitle: "Sustainable Growth with Clear Path to Profitability",
    content: (
      <div className="space-y-8">
        {/* Revenue Pie Chart */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Revenue Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-48 h-48 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Commission per Tip - 85% */}
                  <path
                    className="text-blue-500"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray="85, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Performance Bonuses - 10% */}
                  <path
                    className="text-green-500"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray="10, 100"
                    strokeDashoffset="85"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Platform Fee - 5% */}
                  <path
                    className="text-purple-500"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray="5, 100"
                    strokeDashoffset="95"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">₹12.4L</div>
                    <div className="text-xs">Monthly Revenue</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Tip Commissions</span>
                  </div>
                  <span className="font-bold">85%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Performance Bonuses</span>
                  </div>
                  <span className="font-bold">10%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Platform Fees</span>
                  </div>
                  <span className="font-bold">5%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Growth Funnel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Financial Growth Funnel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Growth stages */}
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">2025 Target</span>
                    <span className="text-xl font-bold">₹8.4Cr</span>
                  </div>
                  <div className="text-xs opacity-80">3x growth trajectory</div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg mx-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">2024 Current</span>
                    <span className="text-lg font-bold">₹2.8Cr</span>
                  </div>
                  <div className="text-xs opacity-80">45% achieved (₹1.26Cr)</div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-2 rounded-lg mx-8">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Break-even</span>
                    <span className="font-bold">Q2 2025</span>
                  </div>
                  <div className="text-xs opacity-80">On track for profitability</div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold">₹245</div>
                    <div className="text-xs text-muted-foreground">CAC</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">₹3,890</div>
                    <div className="text-xs text-muted-foreground">LTV</div>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <div className="text-xl font-bold text-green-600">15.9x</div>
                  <div className="text-xs text-muted-foreground">LTV/CAC Ratio</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Roadmap Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Product Development Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-green-500 via-blue-500 via-purple-500 to-orange-500"></div>
              
              <div className="space-y-8">
                {[
                  {
                    period: "Q4 2024",
                    title: "Core Platform ✓",
                    items: ["SEBI Advisor Marketplace", "Real-time Analytics", "Payment Gateway", "Mobile App Launch"],
                    status: "completed",
                    color: "green"
                  },
                  {
                    period: "Q1 2025",
                    title: "Platform Enhancement",
                    items: ["Advanced Analytics", "Portfolio Insights", "Risk Tracking", "Auto Notifications"],
                    status: "current",
                    color: "blue"
                  },
                  {
                    period: "Q2 2025",
                    title: "Advanced Features",
                    items: ["Options & Derivatives", "International Markets", "Social Trading Features", "API for Brokers"],
                    status: "planned",
                    color: "purple"
                  },
                  {
                    period: "Q3 2025",
                    title: "Scale & Expansion",
                    items: ["Institutional Platform", "White-label Solutions", "Regional Expansion", "Wealth Management"],
                    status: "future",
                    color: "orange"
                  }
                ].map((phase, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center gap-8">
                      {/* Timeline dot */}
                      <div className="flex-1 text-right">
                        <div className={`inline-block px-4 py-2 bg-${phase.color}-100 dark:bg-${phase.color}-900 rounded-lg`}>
                          <div className={`font-bold text-${phase.color}-700 dark:text-${phase.color}-300`}>{phase.period}</div>
                          <div className={`text-sm text-${phase.color}-600 dark:text-${phase.color}-400`}>{phase.title}</div>
                        </div>
                      </div>
                      
                      <div className={`w-4 h-4 bg-${phase.color}-500 rounded-full border-4 border-white dark:border-gray-900 z-10`}></div>
                      
                      <div className="flex-1">
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {phase.items.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle className={`w-3 h-3 text-${phase.color}-500`} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investment Opportunity Funnel */}
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 rounded-xl p-8">
          <div className="text-center space-y-6">
            <div>
              <h4 className="text-2xl font-bold mb-2">Investment Opportunity Funnel</h4>
              <p className="text-lg text-muted-foreground">Join the revolution in investment advisory</p>
            </div>
            
            {/* Funnel Visualization */}
            <div className="max-w-md mx-auto space-y-2">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
                <div className="font-bold">₹47,000Cr Market</div>
                <div className="text-sm opacity-80">Total Opportunity</div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg mx-6">
                <div className="font-bold">₹8,400Cr TAM</div>
                <div className="text-sm opacity-80">Addressable Market</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-2 rounded-lg mx-12">
                <div className="font-bold">14M Investors</div>
                <div className="text-sm opacity-80">Target Users</div>
              </div>
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-2 rounded-lg mx-16">
                <div className="font-bold">1,247 Active</div>
                <div className="text-sm opacity-80">Current Users</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-3">
                <Zap className="w-5 h-5 mr-2" />
                Start Investing Now
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                <Eye className="w-5 h-5 mr-2" />
                View Demo
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                <Phone className="w-5 h-5 mr-2" />
                Schedule Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  // Continue with slides 6-12 using similar smart layouts...
  // [I'll provide the remaining slides in the same format with visual layouts]
];


  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 8000);
      return () => clearInterval(timer);
    }
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // Advisor Onboarding Sheet Component
  const AdvisorOnboardingSheet = () => {
    if (!showAdvisorSheet) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setShowAdvisorSheet(false)}>
        <div className="fixed inset-y-0 right-0 w-full max-w-4xl bg-white dark:bg-gray-900 shadow-xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-green-600">Become a Lollipop Advisor</h2>
                  <p className="text-muted-foreground">Complete onboarding journey to start monetizing your expertise</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowAdvisorSheet(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Timeline View */}
            <div className="relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-green-500 to-purple-500"></div>

              {/* Timeline Steps */}
              <div className="space-y-12">
                
                {/* Step 1: Eligibility & Documentation */}
                <div className="relative flex items-start gap-6">
                  <div className="relative z-10 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Card className="border-blue-200 dark:border-blue-800">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-blue-600 text-xl">Step 1: Eligibility Check</CardTitle>
                          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                            <Clock className="w-3 h-3 mr-1" />
                            Day 1
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="font-semibold flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              Qualification Requirements
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                                <Award className="w-5 h-5 text-green-600" />
                                <span className="text-sm font-medium">SEBI RIA License</span>
                              </div>
                              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                                <Calendar className="w-5 h-5 text-green-600" />
                                <span className="text-sm font-medium">2+ Years Experience</span>
                              </div>
                              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="text-sm font-medium">Clean Record</span>
                              </div>
                              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                                <Users className="w-5 h-5 text-green-600" />
                                <span className="text-sm font-medium">Active Clients</span>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h4 className="font-semibold flex items-center gap-2">
                              <FileText className="w-5 h-5 text-orange-500" />
                              Required Documents
                            </h4>
                            <div className="space-y-2">
                              <div className="flex items-center gap-3 p-2 border rounded-lg">
                                <FileText className="w-4 h-4 text-blue-500" />
                                <span className="text-sm">SEBI RIA Certificate</span>
                                <Button size="sm" variant="outline" className="ml-auto">
                                  <Upload className="w-3 h-3 mr-1" />
                                  Upload
                                </Button>
                              </div>
                              <div className="flex items-center gap-3 p-2 border rounded-lg">
                                <CreditCard className="w-4 h-4 text-green-500" />
                                <span className="text-sm">PAN & Aadhaar</span>
                                <Button size="sm" variant="outline" className="ml-auto">
                                  <Upload className="w-3 h-3 mr-1" />
                                  Upload
                                </Button>
                              </div>
                              <div className="flex items-center gap-3 p-2 border rounded-lg">
                                <Banknote className="w-4 h-4 text-purple-500" />
                                <span className="text-sm">Bank Details</span>
                                <Button size="sm" variant="outline" className="ml-auto">
                                  <Upload className="w-3 h-3 mr-1" />
                                  Upload
                                </Button>
                              </div>
                              <div className="flex items-center gap-3 p-2 border rounded-lg">
                                <BarChart3 className="w-4 h-4 text-orange-500" />
                                <span className="text-sm">Portfolio Performance</span>
                                <Button size="sm" variant="outline" className="ml-auto">
                                  <Upload className="w-3 h-3 mr-1" />
                                  Upload
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                          <Button className="flex-1" onClick={() => window.open('/eligibility-check', '_blank')}>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Check Eligibility
                          </Button>
                          <Button variant="outline" className="flex-1" onClick={() => window.open('/document-checklist', '_blank')}>
                            <Download className="w-4 h-4 mr-2" />
                            Download Checklist
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Step 2: Verification Process */}
                <div className="relative flex items-start gap-6">
                  <div className="relative z-10 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Card className="border-green-200 dark:border-green-800">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-green-600 text-xl">Step 2: Verification Process</CardTitle>
                          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                            <Clock className="w-3 h-3 mr-1" />
                            Day 2-7
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-center p-4 border rounded-lg">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                              <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <h4 className="font-semibold mb-2">Document Review</h4>
                            <p className="text-sm text-muted-foreground">Automated verification system processes all documents</p>
                            <div className="mt-3">
                              <Badge variant="secondary">2-3 Days</Badge>
                            </div>
                          </div>
                          <div className="text-center p-4 border rounded-lg">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Eye className="w-6 h-6 text-purple-600" />
                            </div>
                            <h4 className="font-semibold mb-2">Background Check</h4>
                            <p className="text-sm text-muted-foreground">Comprehensive compliance and regulatory verification</p>
                            <div className="mt-3">
                              <Badge variant="secondary">1-2 Days</Badge>
                            </div>
                          </div>
                          <div className="text-center p-4 border rounded-lg">
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Users className="w-6 h-6 text-orange-600" />
                            </div>
                            <h4 className="font-semibold mb-2">Team Interview</h4>
                            <p className="text-sm text-muted-foreground">Video call with our advisor success team</p>
                            <div className="mt-3">
                              <Badge variant="secondary">30 Min</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                          <Button className="flex-1" onClick={() => window.open('/schedule-interview', '_blank')}>
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule Interview
                          </Button>
                          <Button variant="outline" className="flex-1" onClick={() => window.open('/verification-status', '_blank')}>
                            <Activity className="w-4 h-4 mr-2" />
                            Check Status
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Step 3: Platform Training */}
                <div className="relative flex items-start gap-6">
                  <div className="relative z-10 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Card className="border-purple-200 dark:border-purple-800">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-purple-600 text-xl">Step 3: Platform Training</CardTitle>
                          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                            <Clock className="w-3 h-3 mr-1" />
                            Day 8-14
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="font-semibold flex items-center gap-2">
                              <BookOpen className="w-5 h-5 text-purple-500" />
                              Training Modules
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3 p-3 border rounded-lg">
                                <Smartphone className="w-5 h-5 text-blue-500" />
                                <div className="flex-1">
                                  <div className="font-medium">Platform Navigation</div>
                                  <div className="text-sm text-muted-foreground">Master the advisor dashboard</div>
                                </div>
                                <Button size="sm" variant="outline">
                                  <Eye className="w-3 h-3 mr-1" />
                                  Start
                                </Button>
                              </div>
                              <div className="flex items-center gap-3 p-3 border rounded-lg">
                                <Lightbulb className="w-5 h-5 text-yellow-500" />
                                <div className="flex-1">
                                  <div className="font-medium">Tip Creation</div>
                                  <div className="text-sm text-muted-foreground">Best practices for high-quality tips</div>
                                </div>
                                <Button size="sm" variant="outline">
                                  <Eye className="w-3 h-3 mr-1" />
                                  Start
                                </Button>
                              </div>
                              <div className="flex items-center gap-3 p-3 border rounded-lg">
                                <MessageCircle className="w-5 h-5 text-green-500" />
                                <div className="flex-1">
                                  <div className="font-medium">Client Communication</div>
                                  <div className="text-sm text-muted-foreground">Professional interaction guidelines</div>
                                </div>
                                <Button size="sm" variant="outline">
                                  <Eye className="w-3 h-3 mr-1" />
                                  Start
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h4 className="font-semibold flex items-center gap-2">
                              <BarChart className="w-5 h-5 text-orange-500" />
                              Performance Tracking
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3 p-3 border rounded-lg">
                                <Target className="w-5 h-5 text-red-500" />
                                <div className="flex-1">
                                  <div className="font-medium">Success Metrics</div>
                                  <div className="text-sm text-muted-foreground">Understanding win rates & KPIs</div>
                                </div>
                                <Button size="sm" variant="outline">
                                  <Eye className="w-3 h-3 mr-1" />
                                  Start
                                </Button>
                              </div>
                              <div className="flex items-center gap-3 p-3 border rounded-lg">
                                <TrendingUp className="w-5 h-5 text-green-500" />
                                <div className="flex-1">
                                  <div className="font-medium">Revenue Optimization</div>
                                  <div className="text-sm text-muted-foreground">Maximize your earning potential</div>
                                </div>
                                <Button size="sm" variant="outline">
                                  <Eye className="w-3 h-3 mr-1" />
                                  Start
                                </Button>
                              </div>
                              <div className="flex items-center gap-3 p-3 border rounded-lg">
                                <Shield className="w-5 h-5 text-blue-500" />
                                <div className="flex-1">
                                  <div className="font-medium">Compliance</div>
                                  <div className="text-sm text-muted-foreground">Regulatory requirements</div>
                                </div>
                                <Button size="sm" variant="outline">
                                  <Eye className="w-3 h-3 mr-1" />
                                  Start
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Award className="w-6 h-6 text-purple-600" />
                            <div className="flex-1">
                              <div className="font-semibold">Certification Badge</div>
                              <div className="text-sm text-muted-foreground">Complete all modules to earn your verified advisor status</div>
                            </div>
                            <Button>
                              <GraduationCap className="w-4 h-4 mr-2" />
                              Start Training
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Step 4: Go Live & Monetize */}
                <div className="relative flex items-start gap-6">
                  <div className="relative z-10 w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Card className="border-yellow-200 dark:border-yellow-800">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-yellow-600 text-xl">Step 4: Go Live & Start Earning</CardTitle>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                            <Clock className="w-3 h-3 mr-1" />
                            Day 15+
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200">
                            <HandCoins className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-green-600">85%</div>
                            <div className="text-sm font-medium">Commission Rate</div>
                            <div className="text-xs text-muted-foreground mt-1">Per successful tip</div>
                          </div>
                          <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200">
                            <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-blue-600">₹1.75L</div>
                            <div className="text-sm font-medium">Average Monthly</div>
                            <div className="text-xs text-muted-foreground mt-1">Experienced advisors</div>
                          </div>
                          <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200">
                            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-purple-600">₹5L+</div>
                            <div className="text-sm font-medium">Top Performers</div>
                            <div className="text-xs text-muted-foreground mt-1">Monthly earnings</div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-orange-500" />
                            Your Success Roadmap
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 border rounded-lg">
                              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-bold">
                                1-2
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">Week 1-2</div>
                                <div className="text-sm text-muted-foreground">Create first 5-10 tips, build profile</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 border rounded-lg">
                              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-sm font-bold">
                                M1
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">Month 1</div>
                                <div className="text-sm text-muted-foreground">Establish 70%+ success rate</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 border rounded-lg">
                              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-sm font-bold">
                                2-3
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">Month 2-3</div>
                                <div className="text-sm text-muted-foreground">Scale tip frequency, build following</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 border rounded-lg">
                              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-sm font-bold">
                                3+
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">Month 3+</div>
                                <div className="text-sm text-muted-foreground">Optimize for premium positioning</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                          <Button className="flex-1" onClick={() => window.open('/create-first-tip', '_blank')}>
                            <Lightbulb className="w-4 h-4 mr-2" />
                            Create Your First Tip
                          </Button>
                          <Button variant="outline" className="flex-1" onClick={() => window.open('/earnings-calculator', '_blank')}>
                            <Calculator className="w-4 h-4 mr-2" />
                            Earnings Calculator
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Step 5: Ongoing Support */}
                <div className="relative flex items-start gap-6">
                  <div className="relative z-10 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Card className="border-orange-200 dark:border-orange-800">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-orange-600 text-xl">Step 5: Ongoing Support & Growth</CardTitle>
                          <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">
                            <Users className="w-3 h-3 mr-1" />
                            24/7
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="font-semibold flex items-center gap-2">
                              <Phone className="w-5 h-5 text-blue-500" />
                              Support Channels
                            </h4>
                            <div className="space-y-3">
                              <Button variant="outline" className="w-full justify-start" onClick={() => window.open('/advisor-success-manager', '_blank')}>
                                <Users className="w-4 h-4 mr-3" />
                                <div className="text-left">
                                  <div className="font-medium">Success Manager</div>
                                  <div className="text-xs text-muted-foreground">Dedicated advisor support</div>
                                </div>
                              </Button>
                              <Button variant="outline" className="w-full justify-start" onClick={() => window.open('/technical-support', '_blank')}>
                                <Settings className="w-4 h-4 mr-3" />
                                <div className="text-left">
                                  <div className="font-medium">Technical Support</div>
                                  <div className="text-xs text-muted-foreground">24/7 platform assistance</div>
                                </div>
                              </Button>
                              <Button variant="outline" className="w-full justify-start" onClick={() => window.open('/advisor-community', '_blank')}>
                                <MessageCircle className="w-4 h-4 mr-3" />
                                <div className="text-left">
                                  <div className="font-medium">Community Forum</div>
                                  <div className="text-xs text-muted-foreground">Connect with other advisors</div>
                                </div>
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h4 className="font-semibold flex items-center gap-2">
                              <TrendingUp className="w-5 h-5 text-green-500" />
                              Growth Resources
                            </h4>
                            <div className="space-y-3">
                              <Button variant="outline" className="w-full justify-start" onClick={() => window.open('/market-research-tools', '_blank')}>
                                <BarChart3 className="w-4 h-4 mr-3" />
                                <div className="text-left">
                                  <div className="font-medium">Research Tools</div>
                                  <div className="text-xs text-muted-foreground">Advanced market analysis</div>
                                </div>
                              </Button>
                              <Button variant="outline" className="w-full justify-start" onClick={() => window.open('/strategy-workshops', '_blank')}>
                                <Lightbulb className="w-4 h-4 mr-3" />
                                <div className="text-left">
                                  <div className="font-medium">Strategy Workshops</div>
                                  <div className="text-xs text-muted-foreground">Monthly skill enhancement</div>
                                </div>
                              </Button>
                              <Button variant="outline" className="w-full justify-start" onClick={() => window.open('/performance-analytics', '_blank')}>
                                <Activity className="w-4 h-4 mr-3" />
                                <div className="text-left">
                                  <div className="font-medium">Performance Analytics</div>
                                  <div className="text-xs text-muted-foreground">Detailed success metrics</div>
                                </div>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Section */}
            <div className="bg-white dark:bg-gray-900 border-t pt-6 mt-12">
              <div className="flex flex-col gap-4">
                <Button 
                  size="lg" 
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  onClick={() => {
                    setShowAdvisorSheet(false);
                    window.open('/advisor-application', '_blank');
                  }}
                >
                  <UserPlus className="w-6 h-6 mr-3" />
                  Start Your Application
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full h-12 text-base font-medium"
                  onClick={() => {
                    setShowAdvisorSheet(false);
                    window.open('/advisor-demo', '_blank');
                  }}
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Watch Platform Demo
                </Button>
              </div>

              {/* Quick Contact */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mt-4 pt-4 border-t">
                <Button variant="ghost" size="sm" className="w-full sm:w-auto h-10" onClick={() => window.open('mailto:advisors@lollipop.com', '_blank')}>
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support
                </Button>
                <Button variant="ghost" size="sm" className="w-full sm:w-auto h-10" onClick={() => window.open('tel:+91-8888-999-000', '_blank')}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call Support
                </Button>
                <Button variant="ghost" size="sm" className="w-full sm:w-auto h-10" onClick={() => window.open('/advisor-faq', '_blank')}>
                  <HelpCircle className="w-4 h-4 mr-2" />
                  FAQ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br rounded-lg flex items-center justify-center">
                <img src={LollipopSVG} className="w-5 h-5" alt="Lollipop Logo" />
              </div>
              <h1 className="text-xl font-bold">Lollipop</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {/* Desktop: Always show Get Started button */}
              <Button onClick={handleGetStarted} className="hidden md:block">
                Get Started
              </Button>
              
              {/* Mobile: Only show Get Started button when not in hero section */}
              {activeSection !== 'hero' && (
                <Button onClick={handleGetStarted} className="md:hidden">
                  Get Started
                </Button>
              )}
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-border">
              <div className="flex flex-col gap-2 pt-4">
                {navSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeSection === section.id 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:text-primary hover:bg-muted'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main id="landing-page-content">
        {/* Hero Section - 1. Lollipop Brand Introduction */}
        <section id="hero" className="py-20 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-950/50 dark:via-purple-950/50 dark:to-pink-950/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center space-y-8">
                {/* Logo and Brand */}
                <div className="space-y-6">
                  <div className=" flex items-center justify-center ">
                    <img src={LollipopSVG} className="w-20 h-20" alt="Lollipop Logo" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      LOLLIPOP
                    </h1>
                    <h2 className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium">
                      Personalized Tip Marketplace for Smart Investors
                    </h2>
                    <div className="max-w-4xl mx-auto">
                      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Search for tips by company, asset class, or strategy. Use 25+ filters to personalize your experience. 
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none mx-auto">
                  <Button size="lg" className="w-full sm:w-auto px-12 py-4 text-lg font-semibold" onClick={handleGetStarted}>
                    <Zap className="w-6 h-6 mr-3" />
                    Get Started for Free
                  </Button>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-12 py-4 text-lg" onClick={handleAdvisorSignup}>
                    <UserPlus className="w-6 h-6 mr-3" />
                    Register as Advisor
                  </Button>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                  <div className="text-center p-6 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">2.8M+</div>
                    <div className="text-sm md:text-base text-muted-foreground mb-1">Active Investors in India</div>
                    <div className="text-xs text-green-600">↗ +15% annually</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">43%</div>
                    <div className="text-sm md:text-base text-muted-foreground mb-1">Investors 20-30 Years</div>
                    <div className="text-xs text-green-600">↗ Fastest growing</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 dark:bg-purple-950 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">951</div>
                    <div className="text-sm md:text-base text-muted-foreground mb-1">SEBI Advisors</div>
                    <div className="text-xs text-blue-600">Verified & Active</div>
                  </div>
                  <div className="text-center p-6 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
                    <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">72.3%</div>
                    <div className="text-sm md:text-base text-muted-foreground mb-1">Avg. Advisor Win Rate</div>
                    <div className="text-xs text-green-600">Industry Standard</div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-4 pt-8">
                  <Badge variant="outline" className="px-4 py-2 bg-green-50 dark:bg-green-950 border-green-200">
                    <Shield className="w-4 h-4 mr-2 text-green-600" />
                    SEBI Regulated
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2 bg-blue-50 dark:bg-blue-950 border-blue-200">
                    <Lock className="w-4 h-4 mr-2 text-blue-600" />
                    Data Protected
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2 bg-purple-50 dark:bg-purple-950 border-purple-200">
                    <Star className="w-4 h-4 mr-2 text-purple-600" />
                    4.8/5 Rating
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2 bg-orange-50 dark:bg-orange-950 border-orange-200">
                    <CheckCircle className="w-4 h-4 mr-2 text-orange-600" />
                    ISO Certified
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2 bg-red-50 dark:bg-red-950 border-red-200">
                    <Users className="w-4 h-4 mr-2 text-red-600" />
                    8.5Cr+ Investors
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Problem Statement with Stats */}
        <section id="problem" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-16">
              {/* Market Analysis */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">The ₹47,000 Crore Market Gap</h2>
                <p className="text-xl text-muted-foreground">Understanding the Critical Challenges in Indian Investment Advisory</p>
              </div>

              {/* Shocking Statistics Section */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 rounded-xl p-8 border border-red-200 dark:border-red-800">
                <h3 className="text-2xl font-bold mb-6 text-center text-red-700 dark:text-red-300">The Harsh Reality of Indian Trading</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* FNO Loss Statistics */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-red-600 mb-2">91%</div>
                      <div className="text-lg font-medium mb-2">of F&O Traders Lose Money</div>
                      <div className="text-sm text-muted-foreground">According to SEBI study (2023)</div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                      <h4 className="font-bold mb-4 text-red-700 dark:text-red-300">F&O Trading Reality Check</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Average Loss per Trader</span>
                          <span className="font-bold text-red-600">₹1.1L annually</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Profitable Traders</span>
                          <span className="font-bold text-green-600">Only 9%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Heavy Losers (₹5L+)</span>
                          <span className="font-bold text-red-600">31% of traders</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Total F&O Losses (FY23)</span>
                          <span className="font-bold text-red-600">₹1.8L Crores</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900 dark:to-red-800 rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-700 dark:text-red-300 mb-1">1.2 Crore</div>
                        <div className="text-sm">Individual F&O traders lost money in FY23</div>
                      </div>
                    </div>
                  </div>

                  {/* Demographic Shift */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-orange-600 mb-2">43%</div>
                      <div className="text-lg font-medium mb-2">Young Traders (20-30 years)</div>
                      <div className="text-sm text-muted-foreground">Contributing to trading volume in 2024</div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                      <h4 className="font-bold mb-4 text-orange-700 dark:text-orange-300">Dramatic Demographic Shift</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>2019: Age 20-30</span>
                            <span className="font-bold text-orange-600">11%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div className="bg-orange-300 h-3 rounded-full" style={{width: '11%'}}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>2024: Age 20-30</span>
                            <span className="font-bold text-orange-600">43%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div className="bg-orange-600 h-3 rounded-full" style={{width: '43%'}}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                        <div className="text-center">
                          <div className="text-xl font-bold text-orange-600">290%</div>
                          <div className="text-xs">Increase in young trader participation</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-yellow-700 dark:text-yellow-300">8.5 Crore</div>
                        <div className="text-xs">Total retail investors in India</div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-blue-700 dark:text-blue-300">60%</div>
                        <div className="text-xs">Are first-time investors under 30</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* The Problem Summary */}
                <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl p-6 border-l-4 border-red-500">
                  <h4 className="text-xl font-bold mb-4 text-red-700 dark:text-red-300">The Core Problem</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-600" />
                      <div className="font-bold mb-1">Lack of Guidance</div>
                      <div className="text-sm text-muted-foreground">Young investors enter markets without proper advisory, leading to massive losses</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <TrendingDown className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                      <div className="font-bold mb-1">Speculation vs Investment</div>
                      <div className="text-sm text-muted-foreground">F&O trading treated as get-rich-quick scheme instead of systematic wealth building</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <Eye className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                      <div className="font-bold mb-1">Information Asymmetry</div>
                      <div className="text-sm text-muted-foreground">Retail investors lack access to institutional-quality research and insights</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Size Infographic */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Indian Investment Advisory Market Opportunity</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-600 mb-3">₹47,000Cr</div>
                    <div className="text-lg text-muted-foreground mb-2">Total Market Size</div>
                    <div className="text-sm text-green-600">Growing 18% annually</div>
                    <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <div className="text-xs text-muted-foreground">Driven by increasing retail participation and digital adoption</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-purple-600 mb-3">2.3%</div>
                    <div className="text-lg text-muted-foreground mb-2">Current Market Penetration</div>
                    <div className="text-sm text-red-600">vs 45% in US markets</div>
                    <div className="mt-4 p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <div className="text-xs text-muted-foreground">Massive opportunity for organized advisory services</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-orange-600 mb-3">14M</div>
                    <div className="text-lg text-muted-foreground mb-2">Underserved Investors</div>
                    <div className="text-sm text-blue-600">Our Primary Target Market</div>
                    <div className="mt-4 p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                      <div className="text-xs text-muted-foreground">Retail investors seeking professional guidance</div>
                    </div>
                  </div>
                </div>

                {/* Additional Market Insights */}
                <div className="mt-8 grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-green-600">3.2Cr</div>
                    <div className="text-sm text-muted-foreground">New demat accounts opened in 2023</div>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">₹2.3L Cr</div>
                    <div className="text-sm text-muted-foreground">Retail trading volume (daily avg)</div>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-purple-600">67%</div>
                    <div className="text-sm text-muted-foreground">Investors from Tier 2/3 cities</div>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-orange-600">₹15K</div>
                    <div className="text-sm text-muted-foreground">Average portfolio size</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Our Solution */}
        <section id="solution" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-16">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Solution: Lollipop Innovation</h2>
                <p className="text-xl text-muted-foreground">Transforming Investment Advisory with Technology & Transparency</p>
              </div>

              {/* Comparison Table */}
              <Card>
                <CardContent className="pt-8">
                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-4 px-6 font-bold text-lg">Features</th>
                          <th className="text-center py-4 px-6 font-bold text-lg text-red-600">
                            <div className="flex items-center justify-center gap-2">
                              <AlertTriangle className="w-5 h-5" />
                              Traditional Advisory
                            </div>
                          </th>
                          <th className="text-center py-4 px-6 font-bold text-lg text-green-600">
                            <div className="flex items-center justify-center gap-2">
                              <CheckCircle className="w-5 h-5" />
                              Lollipop Innovation
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="py-4 px-6 font-medium">Entry Barriers</td>
                          <td className="py-4 px-6 text-center">
                            <div className="text-red-600">
                              <div className="font-bold">₹5L+ minimum</div>
                              <div className="text-sm">₹50K+ annual fees</div>
                              <div className="text-xs mt-1">Only 3% can afford</div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="text-green-600">
                              <div className="font-bold">10 lollipops per tip</div>
                              <div className="text-sm">No minimum portfolio</div>
                              <div className="text-xs mt-1 font-bold">99% tips are FREE</div>
                            </div>
                          </td>
                        </tr>
                        
                        <tr className="border-b hover:bg-muted/50">
                          <td className="py-4 px-6 font-medium">Transparency</td>
                          <td className="py-4 px-6 text-center">
                            <div className="text-red-600">
                              <div className="font-bold">No real-time tracking</div>
                              <div className="text-sm">Hidden performance</div>
                              <div className="text-xs mt-1">67% unsure of results</div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="text-green-600">
                              <div className="font-bold">Live performance</div>
                              <div className="text-sm">Complete history visible</div>
                              <div className="text-xs mt-1">100% transparency</div>
                            </div>
                          </td>
                        </tr>

                        <tr className="border-b hover:bg-muted/50">
                          <td className="py-4 px-6 font-medium">Access Speed</td>
                          <td className="py-4 px-6 text-center">
                            <div className="text-red-600">
                              <div className="font-bold">Weeks to onboard</div>
                              <div className="text-sm">Complex KYC process</div>
                              <div className="text-xs mt-1">Miss opportunities</div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="text-green-600">
                              <div className="font-bold">2-minute signup</div>
                              <div className="text-sm">Instant access</div>
                              <div className="text-xs mt-1">Start immediately</div>
                            </div>
                          </td>
                        </tr>

                        <tr className="border-b hover:bg-muted/50">
                          <td className="py-4 px-6 font-medium">Advisor Choice</td>
                          <td className="py-4 px-6 text-center">
                            <div className="text-red-600">
                              <div className="font-bold">1-2 advisors</div>
                              <div className="text-sm">Limited options</div>
                              <div className="text-xs mt-1">No comparison</div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="text-green-600">
                              <div className="font-bold">All SEBI RIAs</div>
                              <div className="text-sm">Browse all advisors</div>
                              <div className="text-xs mt-1">Full choice freedom</div>
                            </div>
                          </td>
                        </tr>

                        <tr className="border-b hover:bg-muted/50">
                          <td className="py-4 px-6 font-medium">Premium Access</td>
                          <td className="py-4 px-6 text-center">
                            <div className="text-red-600">
                              <div className="font-bold">Always paid</div>
                              <div className="text-sm">High subscription fees</div>
                              <div className="text-xs mt-1">No free options</div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="text-green-600">
                              <div className="font-bold">Instant access</div>
                              <div className="text-sm">to all tips</div>
                              <div className="text-xs mt-1">No delays</div>
                            </div>
                          </td>
                        </tr>

                        <tr className="hover:bg-muted/50">
                          <td className="py-4 px-6 font-medium">Technology</td>
                          <td className="py-4 px-6 text-center">
                            <div className="text-red-600">
                              <div className="font-bold">Manual processes</div>
                              <div className="text-sm">Phone/email based</div>
                              <div className="text-xs mt-1">Outdated systems</div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="text-green-600">
                              <div className="font-bold">Digital platform</div>
                              <div className="text-sm">Real-time updates</div>
                              <div className="text-xs mt-1">Modern tech stack</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-6">
                    {/* Entry Barriers */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-center mb-4">Entry Barriers</h3>
                      <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <div className="font-bold text-red-600">Traditional Advisory</div>
                        </div>
                        <div className="text-red-600">
                          <div className="font-bold">₹5L+ minimum</div>
                          <div className="text-sm">₹50K+ annual fees</div>
                          <div className="text-xs mt-1">Only 3% can afford</div>
                        </div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <div className="font-bold text-green-600">Lollipop Innovation</div>
                        </div>
                        <div className="text-green-600">
                          <div className="font-bold">10 lollipops per tip</div>
                          <div className="text-sm">No minimum portfolio</div>
                          <div className="text-xs mt-1 font-bold">99% tips are FREE</div>
                        </div>
                      </div>
                    </div>

                    {/* Transparency */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-center mb-4">Transparency</h3>
                      <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <div className="font-bold text-red-600">Traditional Advisory</div>
                        </div>
                        <div className="text-red-600">
                          <div className="font-bold">No real-time tracking</div>
                          <div className="text-sm">Hidden performance</div>
                          <div className="text-xs mt-1">67% unsure of results</div>
                        </div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <div className="font-bold text-green-600">Lollipop Innovation</div>
                        </div>
                        <div className="text-green-600">
                          <div className="font-bold">Live performance</div>
                          <div className="text-sm">Complete history visible</div>
                          <div className="text-xs mt-1">100% transparency</div>
                        </div>
                      </div>
                    </div>

                    {/* Access Speed */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-center mb-4">Access Speed</h3>
                      <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <div className="font-bold text-red-600">Traditional Advisory</div>
                        </div>
                        <div className="text-red-600">
                          <div className="font-bold">Weeks to onboard</div>
                          <div className="text-sm">Complex KYC process</div>
                          <div className="text-xs mt-1">Miss opportunities</div>
                        </div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <div className="font-bold text-green-600">Lollipop Innovation</div>
                        </div>
                        <div className="text-green-600">
                          <div className="font-bold">2-minute signup</div>
                          <div className="text-sm">Instant access</div>
                          <div className="text-xs mt-1">Start immediately</div>
                        </div>
                      </div>
                    </div>

                    {/* Advisor Choice */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-center mb-4">Advisor Choice</h3>
                      <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <div className="font-bold text-red-600">Traditional Advisory</div>
                        </div>
                        <div className="text-red-600">
                          <div className="font-bold">1-2 advisors</div>
                          <div className="text-sm">Limited options</div>
                          <div className="text-xs mt-1">No comparison</div>
                        </div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <div className="font-bold text-green-600">Lollipop Innovation</div>
                        </div>
                        <div className="text-green-600">
                          <div className="font-bold">All SEBI RIAs</div>
                          <div className="text-sm">Browse all advisors</div>
                          <div className="text-xs mt-1">Full choice freedom</div>
                        </div>
                      </div>
                    </div>

                    {/* Premium Access */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-center mb-4">Premium Access</h3>
                      <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <div className="font-bold text-red-600">Traditional Advisory</div>
                        </div>
                        <div className="text-red-600">
                          <div className="font-bold">Always paid</div>
                          <div className="text-sm">High subscription fees</div>
                          <div className="text-xs mt-1">No free options</div>
                        </div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <div className="font-bold text-green-600">Lollipop Innovation</div>
                        </div>
                        <div className="text-green-600">
                          <div className="font-bold">Instant access</div>
                          <div className="text-sm">to all tips</div>
                          <div className="text-xs mt-1">No delays</div>
                        </div>
                      </div>
                    </div>

                    {/* Technology */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-center mb-4">Technology</h3>
                      <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <div className="font-bold text-red-600">Traditional Advisory</div>
                        </div>
                        <div className="text-red-600">
                          <div className="font-bold">Manual processes</div>
                          <div className="text-sm">Phone/email based</div>
                          <div className="text-xs mt-1">Outdated systems</div>
                        </div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <div className="font-bold text-green-600">Lollipop Innovation</div>
                        </div>
                        <div className="text-green-600">
                          <div className="font-bold">Digital platform</div>
                          <div className="text-sm">Real-time updates</div>
                          <div className="text-xs mt-1">Modern tech stack</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Highlights */}
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center border-2 border-green-200 dark:border-green-800">
                  <CardContent className="pt-8">
                    <div className="text-4xl font-bold text-green-600 mb-2">99%</div>
                    <div className="font-bold mb-2">Tips are FREE</div>
                    <div className="text-sm text-muted-foreground">All tips are completely free with instant access</div>
                  </CardContent>
                </Card>

                <Card className="text-center border-2 border-blue-200 dark:border-blue-800">
                  <CardContent className="pt-8">
                    <div className="text-4xl font-bold text-blue-600 mb-2">100</div>
                    <div className="font-bold mb-2">Free Lollipops</div>
                    <div className="text-sm text-muted-foreground">Every user gets 100 lollipops for free when they onboard</div>
                  </CardContent>
                </Card>

                <Card className="text-center border-2 border-purple-200 dark:border-purple-800">
                  <CardContent className="pt-8">
                    <div className="text-4xl font-bold text-purple-600 mb-2">SEBI</div>
                    <div className="font-bold mb-2">Registered Advisors</div>
                    <div className="text-sm text-muted-foreground">All tips from verified SEBI Registered Investment Advisors only</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

              {/* Solution Benefits */}
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center">
                  <CardContent className="pt-8">
                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Simple Advisor Discovery</h3>
                    <p className="text-muted-foreground mb-4">Browse all SEBI-registered advisors, view their track records, and choose the ones that match your investment style</p>
                    <div className="space-y-3 text-sm">
                      <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">50+ Verified Advisors</div>
                      <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">Full Transparency</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="pt-8">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Database className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Real-Time Analytics</h3>
                    <p className="text-muted-foreground mb-4">Live tracking of all your investments with instant performance updates, risk metrics, and comprehensive portfolio analysis</p>
                    <div className="space-y-3 text-sm">
                      <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">99.9% Uptime</div>
                      <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">Real-time Data Processing</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="pt-8">
                    <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Shield className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Enterprise Security</h3>
                    <p className="text-muted-foreground mb-4">Bank-grade encryption with multi-layer security protocols and full SEBI compliance frameworks to protect your data</p>
                    <div className="space-y-3 text-sm">
                      <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">256-bit Encryption</div>
                      <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg">ISO 27001 Certified</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
          
       

        {/* Technology Section */}
        <section id="technology" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-16">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Architecture & Technology</h2>
                <p className="text-xl text-muted-foreground">Built for Scale, Security, and Performance</p>
              </div>

             

              {/* Personalized Marketplace */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">Your Personalized Tip Marketplace</h3>
                  <p className="text-lg text-muted-foreground">Follow your investment ideas, not advisors. Search, filter, and discover tips that match your strategy.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Search className="w-5 h-5" />
                        Smart Search & Discovery
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border">
                        <div className="flex items-center gap-3 mb-3">
                          <Search className="w-5 h-5 text-blue-500" />
                          <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-sm text-muted-foreground">
                            Search "Reliance", "Tech stocks", "Options strategy"...
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Find tips for specific companies, sectors, or strategies across all advisors
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm">Search by company name (e.g., "HDFC Bank", "Tesla")</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm">Filter by asset class (Equity, F&O, Crypto, Bonds)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm">Discover strategy-based tips (Swing, Intraday, Long-term)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        25+ Smart Filters
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-center">
                          <div className="font-bold text-blue-600">Asset Classes</div>
                          <div className="text-xs mt-1">Equity, F&O, Crypto, Bonds</div>
                        </div>
                        <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg text-center">
                          <div className="font-bold text-green-600">Sectors</div>
                          <div className="text-xs mt-1">IT, Banking, Pharma, Auto</div>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg text-center">
                          <div className="font-bold text-purple-600">Strategy</div>
                          <div className="text-xs mt-1">Swing, Intraday, Long-term</div>
                        </div>
                        <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg text-center">
                          <div className="font-bold text-orange-600">Time Frame</div>
                          <div className="text-xs mt-1">1D, 1W, 1M, 3M+</div>
                        </div>
                        <div className="bg-red-50 dark:bg-red-950 p-3 rounded-lg text-center">
                          <div className="font-bold text-red-600">Risk Level</div>
                          <div className="text-xs mt-1">Low, Medium, High</div>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded-lg text-center">
                          <div className="font-bold text-yellow-600">Price Range</div>
                          <div className="text-xs mt-1">₹50 - ₹5000</div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <div className="font-bold mb-2">Your Investment Journey</div>
                        <div className="text-sm text-muted-foreground mb-3">You're not locked to one advisor. Browse all tips based on your preferences.</div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium">Follow your ideas, not advisors</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* User Journey Flowchart */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-8 text-center">Complete User Journey Flowchart</h3>
                
                {/* Flowchart Steps */}
                <div className="relative">
                  {/* Desktop Flowchart */}
                  <div className="hidden md:block">
                    {/* Top Row - Steps 1-3 */}
                    <div className="flex items-center justify-center gap-8 mb-8">
                      {/* Step 1 */}
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center mb-4 text-blue-800 font-bold text-xl shadow-lg">
                          1
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-md border border-blue-200 dark:border-blue-800 min-w-[150px]">
                          <div className="font-bold text-blue-700 dark:text-blue-300 mb-2">Register</div>
                          <div className="text-sm text-muted-foreground mb-1">Simple email signup</div>
                          <div className="text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">30 seconds</div>
                        </div>
                      </div>

                      {/* Arrow 1 */}
                      <div className="flex items-center">
                        <ArrowRight className="w-8 h-8 text-gray-400" />
                      </div>

                      {/* Step 2 */}
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-200 to-green-300 rounded-full flex items-center justify-center mb-4 text-green-800 font-bold text-xl shadow-lg">
                          2
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-md border border-green-200 dark:border-green-800 min-w-[150px]">
                          <div className="font-bold text-green-700 dark:text-green-300 mb-2">Search & Filter</div>
                          <div className="text-sm text-muted-foreground mb-1">Browse tips by company</div>
                          <div className="text-xs text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded">25+ filters</div>
                        </div>
                      </div>

                      {/* Arrow 2 */}
                      <div className="flex items-center">
                        <ArrowRight className="w-8 h-8 text-gray-400" />
                      </div>

                      {/* Step 3 */}
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full flex items-center justify-center mb-4 text-purple-800 font-bold text-xl shadow-lg">
                          3
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-md border border-purple-200 dark:border-purple-800 min-w-[150px]">
                          <div className="font-bold text-purple-700 dark:text-purple-300 mb-2">Audit Advisor</div>
                          <div className="text-sm text-muted-foreground mb-1">Check track record</div>
                          <div className="text-xs text-purple-600 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded">Full history</div>
                        </div>
                      </div>
                    </div>

                    {/* Connecting Arrow Down */}
                    <div className="flex justify-center mb-8">
                      <ArrowDown className="w-8 h-8 text-gray-400" />
                    </div>

                    {/* Bottom Row - Steps 4-6 */}
                    <div className="flex items-center justify-center gap-8">
                      {/* Step 4 */}
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full flex items-center justify-center mb-4 text-yellow-800 font-bold text-xl shadow-lg">
                          4
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-md border border-yellow-200 dark:border-yellow-800 min-w-[150px]">
                          <div className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Tip Configuration</div>
                          <div className="text-sm text-muted-foreground mb-1">Review tip details</div>
                          <div className="text-xs text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded">Full analysis</div>
                        </div>
                      </div>

                      {/* Arrow 4 */}
                      <div className="flex items-center">
                        <ArrowRight className="w-8 h-8 text-gray-400" />
                      </div>

                      {/* Step 5 */}
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center mb-4 text-orange-800 font-bold text-xl shadow-lg">
                          5
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-md border border-orange-200 dark:border-orange-800 min-w-[150px]">
                          <div className="font-bold text-orange-700 dark:text-orange-300 mb-2">Execute Trade</div>
                          <div className="text-sm text-muted-foreground mb-1">Via your brokerage app</div>
                          <div className="text-xs text-orange-600 bg-orange-50 dark:bg-orange-900/30 px-2 py-1 rounded">Any broker</div>
                        </div>
                      </div>

                      {/* Arrow 5 */}
                      <div className="flex items-center">
                        <ArrowRight className="w-8 h-8 text-gray-400" />
                      </div>

                      {/* Step 6 */}
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full flex items-center justify-center mb-4 text-pink-800 font-bold text-xl shadow-lg">
                          6
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-md border border-pink-200 dark:border-pink-800 min-w-[150px]">
                          <div className="font-bold text-pink-700 dark:text-pink-300 mb-2">Track Portfolio</div>
                          <div className="text-sm text-muted-foreground mb-1">Monitor performance</div>
                          <div className="text-xs text-pink-600 bg-pink-50 dark:bg-pink-900/30 px-2 py-1 rounded">Live P&L</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Flowchart */}
                  <div className="md:hidden space-y-6">
                    {[
                      { num: 1, title: "Register", desc: "Simple email signup", detail: "30 seconds", color: "blue" },
                      { num: 2, title: "Search & Filter", desc: "Browse tips by company", detail: "25+ filters", color: "green" },
                      { num: 3, title: "Audit Advisor", desc: "Check track record", detail: "Full history", color: "purple" },
                      { num: 4, title: "Tip Configuration", desc: "Review tip details", detail: "Full analysis", color: "yellow" },
                      { num: 5, title: "Execute Trade", desc: "Via your brokerage app", detail: "Any broker", color: "orange" },
                      { num: 6, title: "Track Portfolio", desc: "Monitor performance", detail: "Live P&L", color: "pink" }
                    ].map((step, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-center">
                          <div className={`w-16 h-16 bg-gradient-to-br from-${step.color}-200 to-${step.color}-300 rounded-full flex items-center justify-center text-${step.color}-800 font-bold text-lg shadow-lg mr-4`}>
                            {step.num}
                          </div>
                          <div className={`bg-white dark:bg-gray-800 rounded-lg p-4 flex-1 shadow-md border border-${step.color}-200 dark:border-${step.color}-800`}>
                            <div className={`font-bold text-${step.color}-700 dark:text-${step.color}-300 mb-1`}>{step.title}</div>
                            <div className="text-sm text-muted-foreground mb-2">{step.desc}</div>
                            <div className={`text-xs text-${step.color}-600 bg-${step.color}-50 dark:bg-${step.color}-900/30 px-2 py-1 rounded inline-block`}>{step.detail}</div>
                          </div>
                        </div>
                        {index < 5 && (
                          <div className="flex justify-center my-2">
                            <ArrowDown className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Journey Summary */}
                <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <h4 className="font-bold text-lg mb-3">Your Personalized Investment Journey</h4>
                    <p className="text-muted-foreground mb-4">Follow your investment ideas, not advisors. Complete control and transparency at every step.</p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                      <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">✓ 100 free lollipops</span>
                      <span className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">✓ All tips are free</span>
                      <span className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full">✓ Full transparency</span>
                      <span className="bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full">✓ Real-time tracking</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

   


        {/* 6. For Advisors - Monetization */}
        <section id="advisors" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-16">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Monetize Your Expertise</h2>
                <p className="text-xl text-muted-foreground">Join Lollipop as a SEBI-Registered Advisor and Earn</p>
              </div>

              {/* Advisor Benefits */}
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <HandCoins className="w-5 h-5" />
                        Revenue Opportunities
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold">Per Tip Commission</span>
                            <span className="text-green-600 font-bold">80%</span>
                          </div>
                          <div className="text-sm text-muted-foreground">Earn ₹40-800 per successful tip</div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold">Volume Bonuses</span>
                            <span className="text-blue-600 font-bold">15%</span>
                          </div>
                          <div className="text-sm text-muted-foreground">Additional earnings on high-performing tips</div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold">Performance Rewards</span>
                            <span className="text-purple-600 font-bold">Monthly</span>
                          </div>
                          <div className="text-sm text-muted-foreground">Extra incentives for top performers</div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-950 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                        <h4 className="font-bold mb-2 text-yellow-700 dark:text-yellow-300">Potential Monthly Earnings</h4>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div>
                            <div className="text-lg font-bold text-green-600">₹50K</div>
                            <div className="text-xs">Beginner Level</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-blue-600">₹1.75L</div>
                            <div className="text-xs">Experienced</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-purple-600">₹5L+</div>
                            <div className="text-xs">Top Performers</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="w-5 h-5" />
                        Platform Benefits
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium">Ready Client Base</div>
                            <div className="text-sm text-muted-foreground">Access to 1,247+ verified investors</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium">Direct Client Access</div>
                            <div className="text-sm text-muted-foreground">Investors can browse and choose you directly</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium">Performance Analytics</div>
                            <div className="text-sm text-muted-foreground">Track your tip success rate and earnings</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium">No Platform Fees</div>
                            <div className="text-sm text-muted-foreground">First 6 months completely free</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium">Marketing Support</div>
                            <div className="text-sm text-muted-foreground">We promote your profile to relevant investors</div>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full" size="lg" onClick={handleAdvisorSignup}>
                        <UserPlus className="w-5 h-5 mr-2" />
                        Join as Advisor
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Advisor Requirements */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Requirements to Join</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg">
                    <Shield className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                    <h4 className="font-bold mb-2">SEBI Registration</h4>
                    <p className="text-sm text-muted-foreground">Valid SEBI RIA license required</p>
                  </div>
                  <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg">
                    <Award className="w-12 h-12 mx-auto mb-4 text-green-600" />
                    <h4 className="font-bold mb-2">Experience</h4>
                    <p className="text-sm text-muted-foreground">Minimum 2 years in financial advisory</p>
                  </div>
                  <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg">
                    <Target className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                    <h4 className="font-bold mb-2">Track Record</h4>
                    <p className="text-sm text-muted-foreground">Proven investment performance history</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Test Our Platform */}
        <section id="platform" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-16">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Test Drive Our Platform</h2>
                <p className="text-xl text-muted-foreground">Try Lollipop risk-free with our demo account</p>
              </div>

              {/* Demo Features */}
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold">What You'll Experience</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <Eye className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">Live Market Simulation</h4>
                        <p className="text-muted-foreground">Experience real-time market data with ₹1L virtual portfolio</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">Advisor Interactions</h4>
                        <p className="text-muted-foreground">Chat with sample advisors and view their tip performance</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">Analytics Dashboard</h4>
                        <p className="text-muted-foreground">Explore comprehensive portfolio analytics and reporting</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <Smartphone className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">Mobile Experience</h4>
                        <p className="text-muted-foreground">Test our mobile-optimized interface and features</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <Card className="border-2 border-blue-200 dark:border-blue-800">
                    <CardContent className="pt-8">
                      <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                          <Zap className="w-10 h-10 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-2">Free Demo Account</h3>
                          <p className="text-muted-foreground mb-4">No credit card required • 7-day full access</p>
                        </div>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                              <div className="font-bold">₹1L</div>
                              <div className="text-muted-foreground">Virtual Portfolio</div>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                              <div className="font-bold">5</div>
                              <div className="text-muted-foreground">Sample Tips</div>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">
                              <div className="font-bold">Full</div>
                              <div className="text-muted-foreground">Feature Access</div>
                            </div>
                            <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg">
                              <div className="font-bold">24/7</div>
                              <div className="text-muted-foreground">Support</div>
                            </div>
                          </div>
                          <Button size="lg" className="w-full" onClick={handleTestPlatform}>
                            <Eye className="w-5 h-5 mr-2" />
                            Start Free Demo
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Getting Started Steps */}
        <section id="getting-started" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-16">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Get Started</h2>
                <p className="text-xl text-muted-foreground">Begin your investment journey in 3 simple steps</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-bl-full opacity-50"></div>
                  <CardContent className="pt-8">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                      1
                    </div>
                    <h3 className="text-xl font-bold mb-4">Register</h3>
                    <div className="space-y-3 text-sm text-muted-foreground mb-6">
                      <div>✓ Simple email registration</div>
                      <div>✓ Basic account setup</div>
                      <div>✓ No upfront payments</div>
                      <div>✓ Start browsing immediately</div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={handleSignup}>
                      Start Registration
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-green-100 dark:bg-green-900 rounded-bl-full opacity-50"></div>
                  <CardContent className="pt-8">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                      2
                    </div>
                    <h3 className="text-xl font-bold mb-4">Search & Filter</h3>
                    <div className="space-y-3 text-sm text-muted-foreground mb-6">
                      <div>✓ Search by company or strategy</div>
                      <div>✓ Use 25+ filters to personalize</div>
                      <div>✓ Browse tips across all advisors</div>
                      <div>✓ Follow your ideas, not advisors</div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => scrollToSection('advisors')}>
                      Browse Tips
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-bl-full opacity-50"></div>
                  <CardContent className="pt-8">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                      3
                    </div>
                    <h3 className="text-xl font-bold mb-4">Trade & Track</h3>
                    <div className="space-y-3 text-sm text-muted-foreground mb-6">
                      <div>✓ Place trades based on tips</div>
                      <div>✓ Monitor your portfolio</div>
                      <div>✓ Track real-time P&L</div>
                      <div>✓ Build your portfolio</div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={handleGoToTips}>
                      Buy First Tip
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Start Bonus */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">🎉 Welcome Bonus</h3>
                <p className="text-lg text-muted-foreground mb-6">New users get 100 free lollipops + instant access</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Button size="lg" className="flex-1" onClick={handleGetStarted}>
                    Claim Your Bonus
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1" onClick={handleViewDemo}>
                    Watch Tutorial
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Success Story */}
        <section id="success-story" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-16">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Success Story</h2>
                <p className="text-xl text-muted-foreground">How Ravi Kumar turned ₹50K into ₹2.3L in 8 months</p>
              </div>

              {/* Success Story Timeline */}
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-bl-full opacity-30"></div>
                <CardContent className="pt-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* User Profile */}
                    <div className="text-center lg:text-left">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4 text-white font-bold text-2xl">
                        RK
                      </div>
                      <h3 className="text-xl font-bold mb-2">Ravi Kumar</h3>
                      <p className="text-muted-foreground mb-4">Software Engineer, Pune</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between lg:justify-start lg:gap-4">
                          <span>Age:</span>
                          <span className="font-bold">28 years</span>
                        </div>
                        <div className="flex justify-between lg:justify-start lg:gap-4">
                          <span>Initial Investment:</span>
                          <span className="font-bold">₹50,000</span>
                        </div>
                        <div className="flex justify-between lg:justify-start lg:gap-4">
                          <span>Experience:</span>
                          <span className="font-bold">Beginner</span>
                        </div>
                      </div>
                    </div>

                    {/* Journey Timeline */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                          <div>
                            <div className="font-bold">Joined Lollipop (Jan 2024)</div>
                            <div className="text-sm text-muted-foreground">Started with ₹50K, matched with TechAnalyst Pro</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                          <div>
                            <div className="font-bold">First Success (Feb 2024)</div>
                            <div className="text-sm text-muted-foreground">25% return on HDFC Bank tip, gained confidence</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                          <div>
                            <div className="font-bold">Diversified Portfolio (Mar-Jun)</div>
                            <div className="text-sm text-muted-foreground">Followed advisor's diversification strategy across sectors</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">4</div>
                          <div>
                            <div className="font-bold">Major Win (Jul-Aug)</div>
                            <div className="text-sm text-muted-foreground">45% return on IT stock picks during tech rally</div>
                          </div>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                        <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">₹2.3L</div>
                          <div className="text-xs text-muted-foreground">Current Value</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">360%</div>
                          <div className="text-xs text-muted-foreground">Total Return</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">87%</div>
                          <div className="text-xs text-muted-foreground">Win Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <blockquote className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border-l-4 border-green-500">
                    <p className="text-lg italic mb-4">
                      "I was completely new to investing and was losing money in random stock picks. Lollipop changed everything. 
                      The advisor matching was perfect, and I could track every investment in real-time. The transparency gave me 
                      confidence to invest more systematically."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        RK
                      </div>
                      <div>
                        <div className="font-bold">Ravi Kumar</div>
                        <div className="text-sm text-muted-foreground">Verified Lollipop User</div>
                      </div>
                    </div>
                  </blockquote>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 10. Final CTA */}
        <section id="cta" className="py-20 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to Transform Your Wealth?</h2>
                <p className="text-xl text-muted-foreground mb-6">Join 1,247+ smart investors building wealth with professional guidance</p>
              </div>

              {/* Value Props */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600 mb-2">100</div>
                  <div className="text-muted-foreground">Free lollipops to start</div>
                </div>
                <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-2">2 min</div>
                  <div className="text-muted-foreground">Quick setup process</div>
                </div>
                <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-purple-600 mb-2">78.4%</div>
                  <div className="text-muted-foreground">Platform success rate</div>
                </div>
              </div>

              {/* Main CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 w-full max-w-3xl mx-auto">
                <Button size="lg" className="w-full sm:w-auto px-12 py-4 text-lg font-semibold" onClick={handleGetStarted}>
                  <Zap className="w-6 h-6 mr-3" />
                  Start Your Journey Now
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-12 py-4 text-lg" onClick={handleAdvisorSignup}>
                  <UserPlus className="w-6 h-6 mr-3" />
                  Register as Advisor
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-12 py-4 text-lg" onClick={handleTestPlatform}>
                  <Eye className="w-6 h-6 mr-3" />
                  Try Free Demo
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>No hidden fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span>SEBI regulated</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>4.8/5 user rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-500" />
                  <span>Available pan-India</span>
                </div>
              </div>

   
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
                <p className="text-xl text-muted-foreground">Ready to start your investment journey? We're here to help</p>
              </div>
              
              <Card>
                <CardContent className="pt-8">
                  <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-4 cursor-pointer" onClick={handleEmailUs}>
                      <Mail className="w-8 h-8 mx-auto text-blue-600" />
                      <div className="font-bold text-lg">Email Us</div>
                      <div className="space-y-1 text-muted-foreground">
                        <div className="hover:text-blue-600 transition-colors">hello@lollipop.in</div>
                        <div className="hover:text-blue-600 transition-colors">support@lollipop.in</div>
                      </div>
                    </div>
                    <div className="space-y-4 cursor-pointer" onClick={handleCallUs}>
                      <Phone className="w-8 h-8 mx-auto text-green-600" />
                      <div className="font-bold text-lg">Call Us</div>
                      <div className="space-y-1 text-muted-foreground">
                        <div className="hover:text-green-600 transition-colors">+91 89393 50442</div>
                        <div>Mon-Fri, 9 AM - 6 PM</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <MapPin className="w-8 h-8 mx-auto text-purple-600" />
                      <div className="font-bold text-lg">Visit Us</div>
                      <div className="space-y-1 text-muted-foreground">
                        <div>Bangalore, Karnataka</div>
                        <div>India 560001</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br rounded-lg flex items-center justify-center">
                    <img src={LollipopSVG} className="w-5 h-5" alt="Lollipop Logo" />
                  </div>
                  <h3 className="text-xl font-bold">Lollipop</h3>
                </div>
                <p className="text-muted-foreground">
                  India's first SEBI-regulated investment intelligence platform, democratizing professional advisory services.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold">Platform</h4>
                <div className="space-y-2 text-muted-foreground">
                  <div>Investment Tips</div>
                  <div>SEBI Advisors</div>
                  <div>Performance Analytics</div>
                  <div>Portfolio Tracking</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold">Company</h4>
                <div className="space-y-2 text-muted-foreground">
                  <div>About Us</div>
                  <div>Careers</div>
                  <div>Press</div>
                  <div>Contact</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold">Legal</h4>
                <div className="space-y-2 text-muted-foreground">
                  <div>Privacy Policy</div>
                  <div>Terms of Service</div>
                  <div>SEBI Compliance</div>
                  <div>Risk Disclosure</div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
              <p>&copy; 2024 Lollipop. All rights reserved. SEBI Registration: INH000000000</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Advisor Onboarding Sheet */}
      <AdvisorOnboardingSheet />
    </div>
  );
};

export default Story;
