import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, TrendingUp, Shield, Users, Target, Award, Zap } from 'lucide-react';

const Toby = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Welcome to Lollipop",
      subtitle: "The Future of Investment Intelligence",
      content: (
        <div className="text-center space-y-6">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Zap className="w-12 h-12 text-white" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Revolutionizing how investors access professional-grade investment insights through SEBI-registered advisors and AI-powered analysis.
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              SEBI Regulated
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              1000+ Investors
            </Badge>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "The Problem We Solve",
      subtitle: "Traditional Investment Advisory is Broken",
      content: (
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
              <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">Current Challenges</h4>
              <ul className="space-y-2 text-sm text-red-600 dark:text-red-400">
                <li>• Expensive advisory fees (₹50,000+ annually)</li>
                <li>• Lack of transparency in recommendations</li>
                <li>• No real-time performance tracking</li>
                <li>• Limited access to verified advisors</li>
                <li>• One-size-fits-all approach</li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">Our Solution</h4>
              <ul className="space-y-2 text-sm text-green-600 dark:text-green-400">
                <li>• Pay-per-tip model (₹50-200 per insight)</li>
                <li>• Complete transparency with track records</li>
                <li>• Real-time performance analytics</li>
                <li>• Curated SEBI-registered advisors</li>
                <li>• Personalized recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "How Lollipop Works",
      subtitle: "Simple, Transparent, Effective",
      content: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-bold mb-2">1. Choose Your Advisor</h4>
                <p className="text-sm text-muted-foreground">Browse verified SEBI-registered advisors with transparent track records</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-bold mb-2">2. Get Premium Tips</h4>
                <p className="text-sm text-muted-foreground">Unlock detailed investment insights with target prices and risk analysis</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-bold mb-2">3. Track Performance</h4>
                <p className="text-sm text-muted-foreground">Monitor real-time performance and build your investment portfolio</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Our Impact",
      subtitle: "Transforming Investment Outcomes",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h4 className="text-xl font-bold">Platform Statistics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">1000+</div>
                <div className="text-sm text-muted-foreground">Active Investors</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="text-2xl font-bold text-green-600">75%</div>
                <div className="text-sm text-muted-foreground">Average Win Rate</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">25+</div>
                <div className="text-sm text-muted-foreground">SEBI Advisors</div>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">₹50L+</div>
                <div className="text-sm text-muted-foreground">Tips Value</div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-xl font-bold">Success Story</h4>
            <Card className="p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    R
                  </div>
                  <div>
                    <div className="font-medium">Rahul Sharma</div>
                    <div className="text-sm text-muted-foreground">Software Engineer, Mumbai</div>
                  </div>
                </div>
                <blockquote className="text-sm italic text-muted-foreground border-l-4 border-primary pl-4">
                  "I went from losing money with random tips to consistent 15% returns. 
                  Lollipop's transparent advisor system helped me choose the right guidance for my portfolio."
                </blockquote>
                <div className="flex gap-2">
                  <Badge variant="outline">+23% Returns</Badge>
                  <Badge variant="outline">6 Months</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "The Future of Investing",
      subtitle: "Join the Revolution",
      content: (
        <div className="text-center space-y-8">
          <div className="max-w-3xl mx-auto">
            <h4 className="text-2xl font-bold mb-4">Why Choose Lollipop?</h4>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium">Regulatory Compliance</h5>
                    <p className="text-sm text-muted-foreground">All advisors are SEBI-registered with verified track records</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium">Performance Transparency</h5>
                    <p className="text-sm text-muted-foreground">Real-time tracking of all recommendations with historical data</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium">Affordable Access</h5>
                    <p className="text-sm text-muted-foreground">Pay only for the insights you need, starting from ₹50</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium">Personalized Experience</h5>
                    <p className="text-sm text-muted-foreground">AI-powered matching with advisors suited to your goals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-8">
            <h4 className="text-xl font-bold mb-4">Ready to Transform Your Investing?</h4>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Start Investing Today
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      )
    }
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
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
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

export default Toby;
