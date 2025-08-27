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
  Coins, HandCoins, Receipt, Building, Factory, Menu, X, Download
} from 'lucide-react';import LollipopSVG from './assets/icons/lollipop.svg';
import LollipopSVGWhite from './assets/icons/lollipop-white.svg';
const PPT = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

 const slides = [
  {
      id: 1,
      title: "Welcome to Lollipop",
      subtitle: "India's First SEBI-Regulated Investment Intelligence Platform",
      content: (
        <div className="space-y-8">
          {/* Hero Section */}
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

          {/* Key Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="text-3xl font-bold text-blue-600 mb-1">1,247</div>
              <div className="text-sm text-muted-foreground">Active Investors</div>
              <div className="text-xs text-green-600 mt-1">+23% this month</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
              <div className="text-3xl font-bold text-green-600 mb-1">15.2Cr</div>
              <div className="text-sm text-muted-foreground">Assets Under Advisory</div>
              <div className="text-xs text-green-600 mt-1">+87% YoY</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="text-3xl font-bold text-purple-600 mb-1">34</div>
              <div className="text-sm text-muted-foreground">SEBI Advisors</div>
              <div className="text-xs text-blue-600 mt-1">Verified & Active</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
              <div className="text-3xl font-bold text-orange-600 mb-1">78.4%</div>
              <div className="text-sm text-muted-foreground">Platform Win Rate</div>
              <div className="text-xs text-green-600 mt-1">Industry Leading</div>
            </div>
          </div>

          {/* Regulatory Badges */}
          <div className="flex flex-wrap justify-center gap-3">
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
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Market Analysis & Problem Statement",
      subtitle: "The 47,000 Crore Indian Investment Advisory Gap",
      content: (
        <div className="space-y-8">
          {/* Market Size Infographic */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl p-6">
            <h4 className="text-xl font-bold mb-4 text-center">Indian Investment Advisory Market</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">47,000Cr</div>
                <div className="text-sm text-muted-foreground">Total Market Size</div>
                <div className="text-xs text-green-600 mt-1">Growing 18% annually</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">2.3%</div>
                <div className="text-sm text-muted-foreground">Market Penetration</div>
                <div className="text-xs text-red-600 mt-1">vs 45% in US</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">14M</div>
                <div className="text-sm text-muted-foreground">Underserved Investors</div>
                <div className="text-xs text-blue-600 mt-1">Our Target Market</div>
              </div>
            </div>
          </div>

          {/* Problem vs Solution Comparison */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-red-200 dark:border-red-800">
              <CardHeader className="bg-red-50 dark:bg-red-950">
                <CardTitle className="text-red-700 dark:text-red-300 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Traditional Advisory Problems
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <div className="font-medium">High Entry Barriers</div>
                      <div className="text-sm text-muted-foreground">5L+ minimum investment, 50K+ annual fees</div>
                      <div className="text-xs text-red-600">Only 3% of investors can afford</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Lack of Transparency</div>
                      <div className="text-sm text-muted-foreground">No real-time performance tracking</div>
                      <div className="text-xs text-red-600">67% investors unsure of advisor performance</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Delayed Access</div>
                      <div className="text-sm text-muted-foreground">Weeks for advisor onboarding</div>
                      <div className="text-xs text-red-600">Miss time-sensitive opportunities</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Limited Choice</div>
                      <div className="text-sm text-muted-foreground">Access to 1-2 advisors typically</div>
                      <div className="text-xs text-red-600">No performance comparison</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 dark:border-green-800">
              <CardHeader className="bg-green-50 dark:bg-green-950">
                <CardTitle className="text-green-700 dark:text-green-300 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Lollipop's Innovation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Micro-Investment Model</div>
                      <div className="text-sm text-muted-foreground">50-200 per tip, no minimum portfolio</div>
                      <div className="text-xs text-green-600">97% cost reduction vs traditional</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Real-Time Analytics</div>
                      <div className="text-sm text-muted-foreground">Live performance tracking & history</div>
                      <div className="text-xs text-green-600">Complete transparency guaranteed</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Instant Access</div>
                      <div className="text-sm text-muted-foreground">2-minute onboarding process</div>
                      <div className="text-xs text-green-600">Immediate advisor connection</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Curated Marketplace</div>
                      <div className="text-sm text-muted-foreground">34 verified SEBI advisors to choose from</div>
                      <div className="text-xs text-green-600">AI-powered matching algorithm</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Market Opportunity */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-xl p-6">
            <h4 className="text-lg font-bold mb-4">The Opportunity</h4>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-orange-600">14M+</div>
                <div className="text-sm text-muted-foreground">Underserved Retail Investors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">8,400Cr</div>
                <div className="text-sm text-muted-foreground">Addressable Market Size</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">18%</div>
                <div className="text-sm text-muted-foreground">Annual Market Growth</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">5x</div>
                <div className="text-sm text-muted-foreground">Expected Growth by 2030</div>
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
          {/* Technology Stack */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cpu className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-bold mb-2">AI-Powered Matching</h4>
                <p className="text-sm text-muted-foreground mb-3">Machine learning algorithms analyze investor profiles and match with optimal advisors</p>
                <div className="space-y-2 text-xs">
                  <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded">92% Match Accuracy</div>
                  <div className="bg-green-50 dark:bg-green-950 p-2 rounded">3.2s Average Response Time</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-bold mb-2">Real-Time Analytics</h4>
                <p className="text-sm text-muted-foreground mb-3">Live tracking of all investments with instant performance updates and risk metrics</p>
                <div className="space-y-2 text-xs">
                  <div className="bg-green-50 dark:bg-green-950 p-2 rounded">99.9% Uptime</div>
                  <div className="bg-purple-50 dark:bg-purple-950 p-2 rounded">Real-time Data Processing</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-bold mb-2">Enterprise Security</h4>
                <p className="text-sm text-muted-foreground mb-3">Bank-grade encryption with multi-layer security and compliance frameworks</p>
                <div className="space-y-2 text-xs">
                  <div className="bg-purple-50 dark:bg-purple-950 p-2 rounded">256-bit Encryption</div>
                  <div className="bg-orange-50 dark:bg-orange-950 p-2 rounded">ISO 27001 Certified</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Journey Flow */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
            <h4 className="text-xl font-bold mb-6 text-center">Complete User Journey</h4>
            <div className="grid md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">1</div>
                <div className="font-medium text-sm">Registration</div>
                <div className="text-xs text-muted-foreground mt-1">2-minute KYC process</div>
                <div className="text-xs text-blue-600 mt-1">94% completion rate</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">2</div>
                <div className="font-medium text-sm">Profile Setup</div>
                <div className="text-xs text-muted-foreground mt-1">Risk assessment & goals</div>
                <div className="text-xs text-green-600 mt-1">AI-powered analysis</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">3</div>
                <div className="font-medium text-sm">Advisor Matching</div>
                <div className="text-xs text-muted-foreground mt-1">Curated recommendations</div>
                <div className="text-xs text-purple-600 mt-1">3-5 optimal matches</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">4</div>
                <div className="font-medium text-sm">Tip Purchase</div>
                <div className="text-xs text-muted-foreground mt-1">Secure payment gateway</div>
                <div className="text-xs text-orange-600 mt-1">Instant access</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">5</div>
                <div className="font-medium text-sm">Portfolio Tracking</div>
                <div className="text-xs text-muted-foreground mt-1">Real-time monitoring</div>
                <div className="text-xs text-red-600 mt-1">Performance analytics</div>
              </div>
            </div>
          </div>

          {/* Technical Infrastructure */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-center">
              <Cloud className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="font-bold">Cloud-Native</div>
              <div className="text-xs text-muted-foreground">AWS Infrastructure</div>
              <div className="text-xs text-blue-600 mt-1">99.99% SLA</div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg text-center">
              <Smartphone className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="font-bold">Mobile-First</div>
              <div className="text-xs text-muted-foreground">Progressive Web App</div>
              <div className="text-xs text-green-600 mt-1">4.8â˜… App Rating</div>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg text-center">
              <Activity className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="font-bold">API-Driven</div>
              <div className="text-xs text-muted-foreground">RESTful Architecture</div>
              <div className="text-xs text-purple-600 mt-1">&lt; 200ms Response</div>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg text-center">
              <Layers className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <div className="font-bold">Microservices</div>
              <div className="text-xs text-muted-foreground">Scalable Design</div>
              <div className="text-xs text-orange-600 mt-1">Auto-scaling</div>
            </div>
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
          {/* Platform Performance Dashboard */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-xl font-bold">Platform Performance Metrics</h4>
              
              {/* Win Rate by Category */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Success Rates by Asset Class
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Large Cap Stocks</span>
                        <span className="font-bold text-green-600">84.2%</span>
                      </div>
                      <Progress value={84.2} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">127 tips tracked</div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mid Cap Stocks</span>
                        <span className="font-bold text-green-600">78.6%</span>
                      </div>
                      <Progress value={78.6} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">89 tips tracked</div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Crypto Currencies</span>
                        <span className="font-bold text-yellow-600">71.3%</span>
                      </div>
                      <Progress value={71.3} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">45 tips tracked</div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Commodities</span>
                        <span className="font-bold text-green-600">76.9%</span>
                      </div>
                      <Progress value={76.9} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">34 tips tracked</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk-Return Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Risk-Adjusted Returns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="text-lg font-bold text-green-600">23.4%</div>
                      <div className="text-xs text-muted-foreground">Average Annual Return</div>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">1.87</div>
                      <div className="text-xs text-muted-foreground">Sharpe Ratio</div>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">12.3%</div>
                      <div className="text-xs text-muted-foreground">Max Drawdown</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-bold">Top Performing Advisors</h4>
              
              {/* Advisor Leaderboard */}
              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gold-50 dark:bg-yellow-950 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                        <div>
                          <div className="font-bold">TechAnalyst Pro</div>
                          <div className="text-xs text-muted-foreground">Technology Specialist</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">91.2%</div>
                        <div className="text-xs text-muted-foreground">Win Rate</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                        <div>
                          <div className="font-bold">ValueInvestor_IN</div>
                          <div className="text-xs text-muted-foreground">Value Investing Expert</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">87.8%</div>
                        <div className="text-xs text-muted-foreground">Win Rate</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                        <div>
                          <div className="font-bold">CryptoGuru_2024</div>
                          <div className="text-xs text-muted-foreground">Cryptocurrency Analyst</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">83.4%</div>
                        <div className="text-xs text-muted-foreground">Win Rate</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Growth Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Growth Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Monthly Active Users</span>
                      <div className="flex items-center gap-2">
                        <ArrowUp className="w-4 h-4 text-green-500" />
                        <span className="font-bold">847</span>
                        <span className="text-xs text-green-600">+34%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tips Purchased</span>
                      <div className="flex items-center gap-2">
                        <ArrowUp className="w-4 h-4 text-green-500" />
                        <span className="font-bold">2,134</span>
                        <span className="text-xs text-green-600">+67%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Revenue Growth</span>
                      <div className="flex items-center gap-2">
                        <ArrowUp className="w-4 h-4 text-green-500" />
                        <span className="font-bold">12.4L</span>
                        <span className="text-xs text-green-600">+89%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Customer Retention</span>
                      <div className="flex items-center gap-2">
                        <ArrowUp className="w-4 h-4 text-green-500" />
                        <span className="font-bold">78.2%</span>
                        <span className="text-xs text-green-600">+12%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Success Stories */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-xl p-6">
            <h4 className="text-xl font-bold mb-6 text-center">Real Success Stories</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        P
                      </div>
                      <div>
                        <div className="font-bold">Nitya Malhotra</div>
                        <div className="text-sm text-muted-foreground">Marketing Manager, Delhi</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Investment Journey</div>
                      <div className="text-xs text-muted-foreground">Started with 50K portfolio, followed TechAnalyst Pro for 8 months</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-green-100 dark:bg-green-900 rounded">
                        <div className="font-bold text-green-600">+47%</div>
                        <div className="text-xs">Total Returns</div>
                      </div>
                      <div className="text-center p-2 bg-blue-100 dark:bg-blue-900 rounded">
                        <div className="font-bold text-blue-600">89%</div>
                        <div className="text-xs">Win Rate</div>
                      </div>
                    </div>
                    <blockquote className="text-xs italic border-l-2 border-green-500 pl-3">
                      "From random stock tips to systematic investing. Made 23K profit in my first 6 months!"
                    </blockquote>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                        A
                      </div>
                      <div>
                        <div className="font-bold">Amit Gupta</div>
                        <div className="text-sm text-muted-foreground">Software Engineer, Bangalore</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Investment Journey</div>
                      <div className="text-xs text-muted-foreground">Diversified portfolio across 3 advisors, 1 year experience</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-purple-100 dark:bg-purple-900 rounded">
                        <div className="font-bold text-purple-600">+62%</div>
                        <div className="text-xs">Total Returns</div>
                      </div>
                      <div className="text-center p-2 bg-pink-100 dark:bg-pink-900 rounded">
                        <div className="font-bold text-pink-600">1.8L</div>
                        <div className="text-xs">Profit Made</div>
                      </div>
                    </div>
                    <blockquote className="text-xs italic border-l-2 border-purple-500 pl-3">
                      "Best investment decision ever. Clear insights, real performance tracking, genuine advisors."
                    </blockquote>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                        S
                      </div>
                      <div>
                        <div className="font-bold">Venkant Rao</div>
                        <div className="text-sm text-muted-foreground">Business Owner, Mumbai</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Investment Journey</div>
                      <div className="text-xs text-muted-foreground">High-value investor, focuses on mid-cap opportunities</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-orange-100 dark:bg-orange-900 rounded">
                        <div className="font-bold text-orange-600">+71%</div>
                        <div className="text-xs">Total Returns</div>
                      </div>
                      <div className="text-center p-2 bg-red-100 dark:bg-red-900 rounded">
                        <div className="font-bold text-red-600">4.2L</div>
                        <div className="text-xs">Profit Made</div>
                      </div>
                    </div>
                    <blockquote className="text-xs italic border-l-2 border-orange-500 pl-3">
                      "Scaled my business profits into smart investments. Platform's transparency gave me confidence."
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
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
          {/* Revenue Model */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Revenue Streams
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div>
                      <div className="font-medium">Commission per Tip</div>
                      <div className="text-sm text-muted-foreground">20% on each tip purchase</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">78%</div>
                      <div className="text-xs text-muted-foreground">of revenue</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div>
                      <div className="font-medium">Premium Subscriptions</div>
                      <div className="text-sm text-muted-foreground">299/month for unlimited access</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">15%</div>
                      <div className="text-xs text-muted-foreground">of revenue</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <div>
                      <div className="font-medium">Advisory Platform Fee</div>
                      <div className="text-sm text-muted-foreground">1,999/month for advisors</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-purple-600">7%</div>
                      <div className="text-xs text-muted-foreground">of revenue</div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Monthly Recurring Revenue</span>
                    <span className="font-bold text-green-600">12.4L</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Growth Rate</span>
                    <span className="text-green-600">+67% MoM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Financial Projections
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>2024 Target Revenue</span>
                      <span className="font-bold">2.8Cr</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">1.26Cr achieved (45%)</div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>2025 Projection</span>
                      <span className="font-bold">8.4Cr</span>
                    </div>
                    <Progress value={100} className="h-2" />
                    <div className="text-xs text-green-600 mt-1">3x growth trajectory</div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Break-even Timeline</span>
                      <span className="font-bold">Q2 2025</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <div className="text-xs text-blue-600 mt-1">On track for profitability</div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="text-sm font-medium mb-2">Key Metrics</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>CAC (Customer Acquisition Cost)</span>
                      <span>245</span>
                    </div>
                    <div className="flex justify-between">
                      <span>LTV (Customer Lifetime Value)</span>
                      <span>3,890</span>
                    </div>
                    <div className="flex justify-between">
                      <span>LTV/CAC Ratio</span>
                      <span className="text-green-600 font-bold">15.9x</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Roadmap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Product Development Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-bold text-green-600">Q4 2024</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="font-medium">Core Platform âœ“</div>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>â€¢ SEBI Advisor Marketplace</li>
                      <li>â€¢ Real-time Analytics</li>
                      <li>â€¢ Payment Gateway</li>
                      <li>â€¢ Mobile App Launch</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-bold text-blue-600">Q1 2025</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="font-medium">AI Enhancement</div>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>â€¢ Smart Advisor Matching</li>
                      <li>â€¢ Portfolio Optimization</li>
                      <li>â€¢ Risk Assessment AI</li>
                      <li>â€¢ Automated Rebalancing</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="font-bold text-purple-600">Q2 2025</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="font-medium">Advanced Features</div>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>â€¢ Options & Derivatives</li>
                      <li>â€¢ International Markets</li>
                      <li>â€¢ Social Trading Features</li>
                      <li>â€¢ API for Brokers</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="font-bold text-orange-600">Q3 2025</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="font-medium">Scale & Expansion</div>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>â€¢ Institutional Platform</li>
                      <li>â€¢ White-label Solutions</li>
                      <li>â€¢ Regional Expansion</li>
                      <li>â€¢ Wealth Management</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 rounded-xl p-8">
            <div className="text-center space-y-6">
              <div>
                <h4 className="text-2xl font-bold mb-2">Ready to Transform Your Investment Journey?</h4>
                <p className="text-lg text-muted-foreground">Join 1,247+ smart investors who've already discovered the power of professional insights</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                  <div className="font-bold text-lg text-green-600">50</div>
                  <div className="text-sm text-muted-foreground">Start with just 50</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                  <div className="font-bold text-lg text-blue-600">2 min</div>
                  <div className="text-sm text-muted-foreground">Quick setup process</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                  <div className="font-bold text-lg text-purple-600">34+</div>
                  <div className="text-sm text-muted-foreground">SEBI advisors to choose</div>
                </div>
              </div>

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

              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No hidden fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>SEBI regulated advisors</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>4.8/5 user rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-500" />
                  <span>Available pan-India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <Mail className="w-6 h-6 mx-auto text-blue-600" />
                  <div className="font-medium">Email Us</div>
                  <div className="text-sm text-muted-foreground">hello@lollipop.in</div>
                  <div className="text-sm text-muted-foreground">support@lollipop.in</div>
                </div>
                <div className="space-y-2">
                  <Phone className="w-6 h-6 mx-auto text-green-600" />
                  <div className="font-medium">Call Us</div>
                  <div className="text-sm text-muted-foreground">+91 89393 50442</div>
                  <div className="text-sm text-muted-foreground">Mon-Fri, 9 AM - 6 PM</div>
                </div>
                <div className="space-y-2">
                  <MapPin className="w-6 h-6 mx-auto text-purple-600" />
                  <div className="font-medium">Visit Us</div>
                  <div className="text-sm text-muted-foreground">Bangalore, Karnataka</div>
                  <div className="text-sm text-muted-foreground">India 560001</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
      {
      id: 6,
      title: "How Lollipop Works",
      subtitle: "Complete End-to-End Investment Intelligence Flow",
      content: (
        <div className="space-y-8">
          {/* Detailed User Journey */}
          <div className="grid md:grid-cols-6 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
              <div className="font-bold text-sm mb-2">Discover Advisors</div>
              <div className="text-xs text-muted-foreground mb-2">Browse 34+ verified SEBI advisors by expertise, performance, and investment style</div>
              <div className="text-xs text-blue-600">AI-powered matching</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">2</div>
              <div className="font-bold text-sm mb-2">Evaluate Performance</div>
              <div className="text-xs text-muted-foreground mb-2">Review real-time analytics, win rates, risk metrics, and historical returns</div>
              <div className="text-xs text-green-600">100% transparent data</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">3</div>
              <div className="font-bold text-sm mb-2">Purchase Tips</div>
              <div className="text-xs text-muted-foreground mb-2">Pay ₹50-₹200 per investment tip with secure payment gateway</div>
              <div className="text-xs text-purple-600">Instant access</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold">4</div>
              <div className="font-bold text-sm mb-2">Execute Trades</div>
              <div className="text-xs text-muted-foreground mb-2">Place orders on your preferred broker with detailed entry/exit guidance</div>
              <div className="text-xs text-orange-600">Your funds, your control</div>
            </div>
            <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-xl border border-red-200 dark:border-red-800">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">5</div>
              <div className="font-bold text-sm mb-2">Track Performance</div>
              <div className="text-xs text-muted-foreground mb-2">Monitor real-time P&L, get alerts, and view comprehensive analytics</div>
              <div className="text-xs text-red-600">Live monitoring</div>
            </div>
            <div className="text-center p-4 bg-teal-50 dark:bg-teal-950 rounded-xl border border-teal-200 dark:border-teal-800">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">6</div>
              <div className="font-bold text-sm mb-2">Optimize Portfolio</div>
              <div className="text-xs text-muted-foreground mb-2">Refine advisor selection and risk allocation based on insights</div>
              <div className="text-xs text-teal-600">Continuous improvement</div>
            </div>
          </div>

          {/* Platform Guarantees */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-green-200 dark:border-green-800">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-6 h-6 text-green-600" />
                  <div className="font-bold">Complete Transparency</div>
                </div>
                <div className="text-sm text-muted-foreground">Every tip includes timestamp, rationale, risk assessment, and tracked outcomes with no hidden performance metrics</div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 dark:border-blue-800">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-6 h-6 text-blue-600" />
                  <div className="font-bold">Lightning Fast</div>
                </div>
                <div className="text-sm text-muted-foreground">2-minute onboarding, instant tip access, real-time alerts, and sub-second platform response times</div>
              </CardContent>
            </Card>
            <Card className="border-purple-200 dark:border-purple-800">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3 mb-3">
                  <Lock className="w-6 h-6 text-purple-600" />
                  <div className="font-bold">Your Control</div>
                </div>
                <div className="text-sm text-muted-foreground">Execute on your broker, maintain custody of funds, no power of attorney required - just pure investment intelligence</div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: "What's In It For Traders",
      subtitle: "Maximize Returns, Minimize Risk, Scale Smart",
      content: (
        <div className="space-y-8">
          {/* Core Value Propositions */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-green-200 dark:border-green-800">
              <CardHeader className="bg-green-50 dark:bg-green-950">
                <CardTitle className="text-lg flex items-center gap-2">
                  <PiggyBank className="w-5 h-5 text-green-600" />
                  Affordable Professional Advice
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Traditional Advisory</span>
                    <span className="text-red-600 font-bold">₹50K+ annually</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lollipop Model</span>
                    <span className="text-green-600 font-bold">₹50-200 per tip</span>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                    <div className="font-bold text-green-600">97% Cost Reduction</div>
                    <div className="text-xs text-muted-foreground">Access professional insights without breaking the bank</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardHeader className="bg-blue-50 dark:bg-blue-950">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Data-Driven Decisions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-center p-2 bg-blue-50 dark:bg-blue-950 rounded">
                      <div className="font-bold text-blue-600">78.4%</div>
                      <div className="text-xs">Platform Win Rate</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 dark:bg-green-950 rounded">
                      <div className="font-bold text-green-600">23.4%</div>
                      <div className="text-xs">Avg Returns</div>
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                    <div className="font-bold text-blue-600">Live Performance Tracking</div>
                    <div className="text-xs text-muted-foreground">Compare advisors, track P&L, analyze risk metrics in real-time</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardHeader className="bg-purple-50 dark:bg-purple-950">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Diversified Expertise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Large Cap Specialists</span>
                    <span className="text-green-600">84.2% win rate</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mid Cap Experts</span>
                    <span className="text-green-600">78.6% win rate</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Crypto Analysts</span>
                    <span className="text-yellow-600">71.3% win rate</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Commodity Traders</span>
                    <span className="text-green-600">76.9% win rate</span>
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">
                  <div className="font-bold text-purple-600">34+ SEBI Advisors</div>
                  <div className="text-xs text-muted-foreground">Choose from verified experts across all asset classes</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Success Metrics */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-xl p-6">
            <h4 className="text-xl font-bold mb-6 text-center">Real Trader Benefits</h4>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">₹23K</div>
                <div className="text-sm text-muted-foreground">Average Profit</div>
                <div className="text-xs text-orange-600">First 6 months</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">78%</div>
                <div className="text-sm text-muted-foreground">User Retention</div>
                <div className="text-xs text-red-600">Monthly active</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">2.1x</div>
                <div className="text-sm text-muted-foreground">Portfolio Growth</div>
                <div className="text-xs text-purple-600">Avg 12 months</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">92%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                <div className="text-xs text-blue-600">User surveys</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      title: "How Advisors Earn Money",
      subtitle: "Monetize Your Expertise, Scale Your Practice",
      content: (
        <div className="space-y-8">
          {/* Revenue Streams for Advisors */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-green-200 dark:border-green-800">
              <CardHeader className="bg-green-50 dark:bg-green-950">
                <CardTitle className="flex items-center gap-2">
                  <HandCoins className="w-6 h-6 text-green-600" />
                  Per-Tip Revenue Model
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-900 rounded-lg border">
                    <div>
                      <div className="font-medium">Set Your Price</div>
                      <div className="text-sm text-muted-foreground">₹50 - ₹200 per tip based on complexity</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">Your Choice</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-900 rounded-lg border">
                    <div>
                      <div className="font-medium">Revenue Share</div>
                      <div className="text-sm text-muted-foreground">You keep 80% of every tip sale</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">80%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-900 rounded-lg border">
                    <div>
                      <div className="font-medium">Platform Fee</div>
                      <div className="text-sm text-muted-foreground">20% covers infrastructure & compliance</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">20%</div>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <div className="font-bold text-green-600">Example: ₹100 Tip</div>
                  <div className="text-sm text-muted-foreground">You earn ₹80, Platform keeps ₹20</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardHeader className="bg-blue-50 dark:bg-blue-950">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  Scaling Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="font-medium">Volume Bonuses</div>
                    <div className="text-sm text-muted-foreground">Higher revenue share for top performers</div>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <div className="font-medium">Premium Placement</div>
                    <div className="text-sm text-muted-foreground">Featured advisor status for consistent winners</div>
                  </div>
                  <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <div className="font-medium">Referral Program</div>
                    <div className="text-sm text-muted-foreground">Earn from advisors you onboard to platform</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Earning Potential Examples */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-xl p-6">
            <h4 className="text-xl font-bold mb-6 text-center">Real Advisor Earnings</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-4 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="font-bold text-lg">Starter Advisor</div>
                  <div className="text-sm text-muted-foreground mb-4">50 tips/month × ₹75 avg</div>
                  <div className="text-2xl font-bold text-green-600">₹3,000</div>
                  <div className="text-xs text-muted-foreground">Monthly earnings</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div className="font-bold text-lg">Established Advisor</div>
                  <div className="text-sm text-muted-foreground mb-4">200 tips/month × ₹100 avg</div>
                  <div className="text-2xl font-bold text-purple-600">₹16,000</div>
                  <div className="text-xs text-muted-foreground">Monthly earnings</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div className="font-bold text-lg">Top Performer</div>
                  <div className="text-sm text-muted-foreground mb-4">400 tips/month × ₹125 avg</div>
                  <div className="text-2xl font-bold text-orange-600">₹40,000</div>
                  <div className="text-xs text-muted-foreground">Monthly earnings</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Platform Tools for Advisors */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <BarChart className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="font-bold text-sm">Analytics Dashboard</div>
              <div className="text-xs text-muted-foreground">Track performance, conversions, earnings</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <Bell className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="font-bold text-sm">Smart Alerts</div>
              <div className="text-xs text-muted-foreground">Market opportunities, tip reminders</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="font-bold text-sm">Client Communication</div>
              <div className="text-xs text-muted-foreground">Direct messaging, updates, feedback</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <div className="font-bold text-sm">Automated Payouts</div>
              <div className="text-xs text-muted-foreground">Weekly settlements, tax reports</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 9,
      title: "Compliance & Trust Framework",
      subtitle: "SEBI-Aligned, Transparent, and Secure",
      content: (
        <div className="space-y-8">
          {/* Regulatory Compliance */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-green-200 dark:border-green-800">
              <CardHeader className="bg-green-50 dark:bg-green-950">
                <CardTitle className="text-green-700 dark:text-green-300 flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  SEBI Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>All advisors SEBI-registered and verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Fee-based advisory model only</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>No custody or power of attorney</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Proper risk disclosures and suitability</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardHeader className="bg-blue-50 dark:bg-blue-950">
                <CardTitle className="text-blue-700 dark:text-blue-300 flex items-center gap-2">
                  <Lock className="w-6 h-6" />
                  Data Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>256-bit encryption for all data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>ISO 27001 security standards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Regular security audits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>GDPR-compliant data handling</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardHeader className="bg-purple-50 dark:bg-purple-950">
                <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  Transparency
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    <span>Real-time performance tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    <span>Complete audit trails</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    <span>Public advisor track records</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    <span>Clear fee structure disclosure</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
            <h4 className="text-xl font-bold mb-6 text-center">Trust & Safety Measures</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold">Advisor Verification</div>
                    <div className="text-sm text-muted-foreground">5-step verification process including SEBI registration check</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold">Performance Monitoring</div>
                    <div className="text-sm text-muted-foreground">Continuous tracking of advisor performance and compliance</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <Bell className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-bold">Risk Alerts</div>
                    <div className="text-sm text-muted-foreground">Automated alerts for unusual patterns or compliance issues</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                    <Receipt className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-bold">Audit Trail</div>
                    <div className="text-sm text-muted-foreground">Immutable records of all transactions and advisor actions</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <div className="font-bold">24/7 Support</div>
                    <div className="text-sm text-muted-foreground">Round-the-clock customer support for all users</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                    <Building className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="font-bold">Legal Framework</div>
                    <div className="text-sm text-muted-foreground">Clear terms, dispute resolution, and regulatory compliance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 10,
      title: "Pricing & Subscription Plans",
      subtitle: "Flexible Options for Every Investment Style",
      content: (
        <div className="space-y-8">
          {/* Investor Plans */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-center">For Investors</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardHeader className="bg-blue-50 dark:bg-blue-950 text-center">
                  <CardTitle className="text-blue-700 dark:text-blue-300">
                    <CreditCard className="w-6 h-6 mx-auto mb-2" />
                    Pay-Per-Tip
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-6">
                  <div className="text-3xl font-bold mb-2">₹50-200</div>
                  <div className="text-sm text-muted-foreground mb-6">Per individual tip</div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>No subscription commitment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Choose specific advisors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Full tip details & rationale</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Performance tracking</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6">Get Started</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 dark:border-green-800 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-600 text-white">Most Popular</Badge>
                </div>
                <CardHeader className="bg-green-50 dark:bg-green-950 text-center">
                  <CardTitle className="text-green-700 dark:text-green-300">
                    <Star className="w-6 h-6 mx-auto mb-2" />
                    Premium
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-6">
                  <div className="text-3xl font-bold mb-2">₹299</div>
                  <div className="text-sm text-muted-foreground mb-6">Per month</div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Unlimited tip access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>All advisor categories</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Priority customer support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Advanced analytics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Early access to new features</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">Start Free Trial</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 dark:border-purple-800">
                <CardHeader className="bg-purple-50 dark:bg-purple-950 text-center">
                  <CardTitle className="text-purple-700 dark:text-purple-300">
                    <Award className="w-6 h-6 mx-auto mb-2" />
                    Enterprise
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-6">
                  <div className="text-3xl font-bold mb-2">Custom</div>
                  <div className="text-sm text-muted-foreground mb-6">For institutions</div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>White-label solutions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>API access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Dedicated support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Custom integrations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Volume discounts</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-6">Contact Sales</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Advisor Plans */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-center">For SEBI-Registered Advisors</h4>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="border-2 border-orange-200 dark:border-orange-800">
                <CardHeader className="bg-orange-50 dark:bg-orange-950 text-center">
                  <CardTitle className="text-orange-700 dark:text-orange-300">
                    <Briefcase className="w-6 h-6 mx-auto mb-2" />
                    Basic Advisor
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold mb-2">80%</div>
                    <div className="text-sm text-muted-foreground">Revenue share per tip</div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Profile on marketplace</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Basic analytics dashboard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Standard customer support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Monthly payouts</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-6">Join Free</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-yellow-200 dark:border-yellow-800">
                <CardHeader className="bg-yellow-50 dark:bg-yellow-950 text-center">
                  <CardTitle className="text-yellow-700 dark:text-yellow-300">
                    <Star className="w-6 h-6 mx-auto mb-2" />
                    Pro Advisor
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold mb-2">₹1,999</div>
                    <div className="text-sm text-muted-foreground">Monthly + 80% revenue share</div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Priority marketplace placement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Advanced analytics & insights</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Marketing tools & badges</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Weekly payouts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Dedicated account manager</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-yellow-600 hover:bg-yellow-700">Upgrade Now</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 11,
      title: "Go-To-Market Strategy",
      subtitle: "Scaling Supply and Demand Through Strategic Growth Loops",
      content: (
        <div className="space-y-8">
          {/* Growth Strategy Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardHeader className="bg-blue-50 dark:bg-blue-950">
                <CardTitle className="flex items-center gap-2">
                  <Network className="w-5 h-5 text-blue-600" />
                  Supply-Side Growth
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium">SEBI Advisor Outreach</div>
                    <div className="text-muted-foreground">Direct partnerships with top advisory firms</div>
                  </div>
                  <div>
                    <div className="font-medium">Performance Incentives</div>
                    <div className="text-muted-foreground">Revenue sharing and bonus programs</div>
                  </div>
                  <div>
                    <div className="font-medium">Referral Network</div>
                    <div className="text-muted-foreground">Advisor-to-advisor referral bonuses</div>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                  <div className="font-bold text-blue-600">Target: 100+ Advisors</div>
                  <div className="text-xs text-muted-foreground">By Q2 2025</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 dark:border-green-800">
              <CardHeader className="bg-green-50 dark:bg-green-950">
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-green-600" />
                  Demand Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium">Content Marketing</div>
                    <div className="text-muted-foreground">Educational content and market insights</div>
                  </div>
                  <div>
                    <div className="font-medium">Influencer Partnerships</div>
                    <div className="text-muted-foreground">Financial influencers and YouTubers</div>
                  </div>
                  <div>
                    <div className="font-medium">Performance Marketing</div>
                    <div className="text-muted-foreground">SEO, SEM, and social media ads</div>
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                  <div className="font-bold text-green-600">Target: 10K+ Users</div>
                  <div className="text-xs text-muted-foreground">By Q2 2025</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardHeader className="bg-purple-50 dark:bg-purple-950">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Retention & Scaling
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium">Product Stickiness</div>
                    <div className="text-muted-foreground">Portfolio tracking and alerts</div>
                  </div>
                  <div>
                    <div className="font-medium">Community Building</div>
                    <div className="text-muted-foreground">User forums and success stories</div>
                  </div>
                  <div>
                    <div className="font-medium">Feature Expansion</div>
                    <div className="text-muted-foreground">Advanced tools and new asset classes</div>
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">
                  <div className="font-bold text-purple-600">Target: 80% Retention</div>
                  <div className="text-xs text-muted-foreground">Monthly active users</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Marketing Channels */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-xl p-6">
            <h4 className="text-xl font-bold mb-6 text-center">Customer Acquisition Channels</h4>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-8 h-8 text-orange-600" />
                </div>
                <div className="font-bold mb-2">SEO & Content</div>
                <div className="text-sm text-muted-foreground mb-2">Investment guides, advisor profiles, market analysis</div>
                <div className="text-xs text-orange-600">40% of traffic</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-8 h-8 text-red-600" />
                </div>
                <div className="font-bold mb-2">Social Media</div>
                <div className="text-sm text-muted-foreground mb-2">LinkedIn, Twitter, Instagram finance communities</div>
                <div className="text-xs text-red-600">25% of signups</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <div className="font-bold mb-2">Referrals</div>
                <div className="text-sm text-muted-foreground mb-2">User and advisor referral programs</div>
                <div className="text-xs text-purple-600">20% of growth</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <div className="font-bold mb-2">Paid Ads</div>
                <div className="text-sm text-muted-foreground mb-2">Google Ads, Facebook, YouTube pre-roll</div>
                <div className="text-xs text-blue-600">15% of conversions</div>
              </div>
            </div>
          </div>

          {/* Growth Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Growth Milestones & Targets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">Q4 2024 - Foundation</div>
                    <div className="text-sm text-muted-foreground">1,500 users, 35 advisors, ₹15L monthly revenue</div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Achieved</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">Q1 2025 - Acceleration</div>
                    <div className="text-sm text-muted-foreground">5,000 users, 60 advisors, ₹45L monthly revenue</div>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">Q2 2025 - Scale</div>
                    <div className="text-sm text-muted-foreground">15,000 users, 100 advisors, ₹1.2Cr monthly revenue</div>
                  </div>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Planned</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">Q3 2025 - Expansion</div>
                    <div className="text-sm text-muted-foreground">35,000 users, 200 advisors, ₹2.5Cr monthly revenue</div>
                  </div>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Target</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 12,
      title: "FAQs & Important Disclosures",
      subtitle: "Everything You Need to Know About Lollipop",
      content: (
        <div className="space-y-8">
          {/* FAQ Categories */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  For Investors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <div className="font-medium mb-1">How does Lollipop work?</div>
                  <div className="text-muted-foreground">Browse SEBI-registered advisors, purchase investment tips (₹50-200), execute trades on your broker, and track performance.</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Do you handle my funds?</div>
                  <div className="text-muted-foreground">No. You execute trades on your existing broker. We only provide investment advice - you maintain full control of your funds.</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Are all advisors verified?</div>
                  <div className="text-muted-foreground">Yes. Every advisor is SEBI-registered and undergoes a 5-step verification process including background checks.</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Can I get refunds on tips?</div>
                  <div className="text-muted-foreground">Tips are digital advisory services and generally non-refundable. However, we have a dispute resolution process for specific cases.</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  For Advisors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <div className="font-medium mb-1">Who can become an advisor?</div>
                  <div className="text-muted-foreground">Only SEBI-registered investment advisors with active licenses and good standing can join our platform.</div>
                </div>
                <div>
                  <div className="font-medium mb-1">How do payouts work?</div>
                  <div className="text-muted-foreground">You receive 80% of tip revenue with weekly/monthly settlements. Tax documents and statements are provided.</div>
                </div>
                <div>
                  <div className="font-medium mb-1">How to increase tip sales?</div>
                  <div className="text-muted-foreground">Maintain high win rates, provide detailed analysis, engage with users, and earn platform badges for better visibility.</div>
                </div>
                <div>
                  <div className="font-medium mb-1">What support is provided?</div>
                  <div className="text-muted-foreground">Analytics dashboard, marketing tools, customer support, and dedicated account management for Pro advisors.</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-800">
              <CardHeader className="bg-red-50 dark:bg-red-950">
                <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
                  <AlertTriangle className="w-5 h-5" />
                  Important Disclaimers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <div className="font-medium mb-1">Investment Risks</div>
                  <div className="text-muted-foreground">All investments are subject to market risks. Past performance does not guarantee future returns.</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Advisory Nature</div>
                  <div className="text-muted-foreground">We provide investment advice only. Final investment decisions rest with you as the investor.</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Suitability Assessment</div>
                  <div className="text-muted-foreground">Please ensure investments match your risk profile, investment horizon, and financial goals.</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Regulatory Compliance</div>
                  <div className="text-muted-foreground">All advisors follow SEBI guidelines. Report any compliance concerns to our support team.</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact & Support */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Get Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <Mail className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <div className="font-medium text-sm">Email Support</div>
                    <div className="text-xs text-muted-foreground">support@lollipop.in</div>
                    <div className="text-xs text-blue-600">24-48 hour response</div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <Phone className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <div className="font-medium text-sm">Phone Support</div>
                    <div className="text-xs text-muted-foreground">+91 89393 50442</div>
                    <div className="text-xs text-green-600">Mon-Fri, 9 AM - 6 PM</div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="font-medium mb-2">Live Chat</div>
                  <div className="text-sm text-muted-foreground">Available within the app for immediate assistance with urgent queries</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Legal & Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <div>
                    <div className="font-medium">Terms of Service</div>
                    <div className="text-muted-foreground">Clear guidelines for platform usage</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <div>
                    <div className="font-medium">Privacy Policy</div>
                    <div className="text-muted-foreground">GDPR-compliant data protection</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <div>
                    <div className="font-medium">Dispute Resolution</div>
                    <div className="text-muted-foreground">Fair process for resolving conflicts</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <div>
                    <div className="font-medium">SEBI Compliance</div>
                    <div className="text-muted-foreground">Regular audits and compliance monitoring</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Final CTA */}
          <div className="text-center bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 rounded-xl p-8">
            <h4 className="text-2xl font-bold mb-4">Ready to Start Your Investment Journey?</h4>
            <p className="text-lg text-muted-foreground mb-6">Join thousands of smart investors who trust Lollipop for professional investment insights</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                <Zap className="w-5 h-5 mr-2" />
                Start Investing Today
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                <Users className="w-5 h-5 mr-2" />
                Become an Advisor
              </Button>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              No hidden fees • SEBI-compliant • 4.8★ rating • Available pan-India
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br rounded-lg flex items-center justify-center">
                <img src={LollipopSVG} className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">Lollipop</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => window.history.back()}>
                Back to App
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Slide Counter */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-sm text-muted-foreground">
              {currentSlide + 1} of {slides.length}
            </div>
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Slide Content */}
          <div className="min-h-[60vh] flex flex-col">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                {slides[currentSlide].title}
              </h2>
              <p className="text-xl text-muted-foreground">
                {slides[currentSlide].subtitle}
              </p>
            </div>

            <div className="flex-1 flex items-center justify-center">
              {slides[currentSlide].content}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-sm"
              >
                {isAutoPlaying ? 'Pause' : 'Auto Play'}
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PPT;
