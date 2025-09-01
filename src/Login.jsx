import React, { useEffect, useRef, memo, useState } from 'react';
import { GalleryVerticalEnd, Loader2Icon, Mail, KeyRound, ArrowRight, Shield } from "lucide-react";
import supabase from '@/lib/supabaseClient';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import LollipopSVG from './assets/icons/lollipop.svg';
import LollipopSVGWhite from './assets/icons/lollipop-white.svg';


const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('email'); // 'email' or 'otp'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithOtp({ 
        email,
        options: {
          emailRedirectTo: undefined, // This forces OTP mode
          shouldCreateUser: true
        }
      });
      console.log("data", data);
      console.log("error", error);
    
      if (error) throw error;
      setStep('otp');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const {data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email'
      });
      console.log("data", data);

      if (data) {
        await createUserProfileIfNotExists({
          id: data.user.id,
          name: data.user.user_metadata.name || '',
          email: data.user.email || '',
          profile_photo_url: data.user.user_metadata.profile_photo_url || '',
        });
        navigate('/tips',  { state: { user: data?.user} });
      }

      console.log("error", error);
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Authentication Form */}
      <div className="p-4 rounded-lg border border-border bg-muted/30">
        <form onSubmit={step === 'email' ? handleSendOtp : handleVerifyOtp} className="space-y-4">
          {step === 'email' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Mail size={16} className="text-blue-500" />
                <Label htmlFor="email" className="font-medium text-sm">Email Address</Label>
              </div>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                We'll send you a secure one-time password
              </p>
            </div>
          )}

          {step === 'otp' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <KeyRound size={16} className="text-green-500" />
                  <Label htmlFor="otp" className="font-medium text-sm">Verification Code</Label>
                </div>
                <Badge variant="outline" className="text-xs border-green-200 text-green-700 bg-green-50">
                  Sent to {email}
                </Badge>
              </div>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full text-center tracking-widest"
                maxLength={6}
              />
              <p className="text-xs text-muted-foreground">
                Check your email for the verification code
              </p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2Icon size={16} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {step === 'email' ? 'Send Verification Code' : 'Continue to Dashboard'}
                <ArrowRight size={16} />
              </>
            )}
          </Button>

          {step === 'otp' && (
            <Button 
              type="button" 
              variant="outline" 
              className="w-full" 
              onClick={() => setStep('email')}
              disabled={loading}
            >
              ← Use Different Email
            </Button>
          )}

          {error && (
            <div className="p-3 rounded-lg border border-destructive/20 bg-destructive/10">
              <p className="text-destructive text-sm text-center">{error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

async function createUserProfileIfNotExists({ id, name, email, profile_photo_url }) {
  console.log('Checking if user already exists');

  const { data: existing, error: fetchError } = await supabase
    .from('users')
    .select('id')
    .eq('id', id)
    .single();

  console.log('User fetch result:', existing);

  // Check if it's a real error (not just "no rows found")
  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error fetching user:', fetchError);
    return;
  }

  // If no user found, create one
  if (!existing) {
    console.log('User does not exist, creating new user');
    const { error: insertError } = await supabase
      .from('users')
      .insert([
        {
          id,
          name: name || '',
          email: email || '',
          profile_photo_url: profile_photo_url || '',
          created_at: new Date().toISOString(),
        }
      ]);
    
    if (insertError) {
      console.error('Error inserting user:', insertError);
      return { success: false, error: insertError };
    } else {
      console.log('User created successfully');
      return { success: true, created: true };
    }
  } else {
    console.log('User already exists');
    return { success: true, created: false };
  }
}

const Login = () => {
  const navigate = useNavigate();
  const [showMobileLogin, setShowMobileLogin] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        console.log("User is logged in:", user);
        navigate("/tips", { state: { user: user } });
      }
    };

    checkUser();
  }, [navigate]);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Mobile Landing View (when login form is not shown) */}
      <div className={`lg:hidden w-full h-full relative ${showMobileLogin ? 'hidden' : 'block'}`}>
        {/* Background Image */}
        <img
          src="https://media.gettyimages.com/id/1315439642/photo/working-on-wall-street.jpg?s=2048x2048&w=gi&k=20&c=jw2igwC72YgTRyjb4LYpUAfjKTDkWGzA8JWbaE0Gs6U="
          alt="Financial Markets"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Mobile Header - Extreme Top */}
        <div className="absolute top-0 left-0 right-0 w-full h-[8vh] z-20 bg-gradient-to-b from-black/80 via-black/60 to-transparent border-b border-white/20">
          <div className="flex items-center justify-between h-full px-6">
            {/* Logo on extreme left */}
            <img src={LollipopSVGWhite} alt="Lollipop" className="w-8 h-8 flex-shrink-0" />
            
            {/* Title and subtitle on extreme right */}
            <div className="text-right">
              <h1 className="text-lg font-bold text-white leading-tight">LOLLIPOP</h1>
              <p className="text-xs text-white/90 leading-tight">Investment Intelligence Platform</p>
            </div>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="absolute inset-0 flex flex-col px-6 z-10">
          {/* Centered Main Content */}
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div className="space-y-6 max-w-sm">
              {/* Main Title - Centered */}
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-white leading-tight">
                  Expert Investment <span className="text-blue-300">Insights</span>
                </h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  Join thousands of investors making informed decisions with real-time tips and analysis
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Footer with CTA - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 z-20 lg:hidden">
          <div className="space-y-4">
            <Button 
              onClick={() => setShowMobileLogin(true)}
              className="w-full bg-white text-black hover:bg-white/90 font-bold py-6 text-xl shadow-2xl transform transition-all duration-200 hover:scale-105"
            >
              Get Started
              <ArrowRight size={50} className="ml-1 w-12 h-12" />
            </Button>
            
            <div className="text-center">
              <p className="text-xs text-white/70">
                By continuing, you agree to our{" "}
                <a href="#" className="text-white hover:underline">Terms</a>
                {" "}and{" "}
                <a href="#" className="text-white hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Login Form (slide up) */}
      <div className={`lg:hidden w-full h-full bg-background ${showMobileLogin ? 'block' : 'hidden'}`}>
        <div className="flex flex-col h-full">
          {/* Mobile Login Header with Logo */}
          <header className="border-b border-border p-4 bg-background/95 backdrop-blur-sm">
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-3">
                <img src={LollipopSVG} alt="Lollipop" className="w-8 h-8" />
                <div className="text-center">
                  <h1 className="text-lg font-bold text-foreground">LOLLIPOP</h1>
                  <p className="text-xs text-muted-foreground">Investment Intelligence</p>
                </div>
              </div>
              
              <div className="w-12"></div> {/* Spacer for center alignment */}
            </div>
          </header>

          {/* Mobile Login Content - Now fully scrollable */}
          <main className="flex-1 overflow-y-auto">
            <div className="min-h-full flex flex-col px-6 py-8">
              <div className="max-w-md mx-auto w-full space-y-6 flex-1">
                {/* Welcome Section */}
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
                  <p className="text-muted-foreground">
                    Access your personalized investment insights
                  </p>
                </div>

                {/* Login Form */}
                <LoginForm />

                {/* Enhanced Features Section - Mobile */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide text-center">
                    What You Get
                  </h3>
                  
                  <div className="grid gap-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">Real-time Investment Tips</p>
                        <p className="text-xs text-muted-foreground">Get actionable insights from expert advisors</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">Advanced Market Analysis</p>
                        <p className="text-xs text-muted-foreground">Comprehensive market data and technical analysis</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                      <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">SEBI Registered Investment Advisors</p>
                        <p className="text-xs text-muted-foreground">Verified professionals with regulatory compliance</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">AI-Powered Risk Assessment</p>
                        <p className="text-xs text-muted-foreground">Smart risk analysis for informed decisions</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">Advanced Filtering</p>
                        <p className="text-xs text-muted-foreground">Filter by asset class, risk, sector, and more</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">Personalized Feed</p>
                        <p className="text-xs text-muted-foreground">Tailored recommendations based on your preferences</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer content moved inside scrollable area */}
                <div className="border-t border-border pt-6 mt-8">
                  <div className="space-y-3">
                    {/* Security Note */}
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Shield size={14} />
                      <span className="text-xs">Secure & Encrypted Login</span>
                    </div>
                    
                    {/* Legal Disclaimer */}
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        By continuing, you agree to our{" "}
                        <a href="#" className="text-primary hover:underline font-medium">Terms of Service</a>
                        {" "}and{" "}
                        <a href="#" className="text-primary hover:underline font-medium">Privacy Policy</a>.
                        Investment advice is provided for informational purposes only.
                      </p>
                    </div>
                    
                    {/* Additional Disclaimer */}
                    <div className="text-center pb-4">
                      <p className="text-xs text-muted-foreground/80">
                        © 2025 Lollipop. All investments carry risk of loss.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex w-full h-full">
        {/* Left Side: Login Content */}
        <div className="w-2/5 flex flex-col bg-background">
          {/* Header */}
          <header className="border-b border-border p-6 flex-shrink-0">
            <div className="flex items-center gap-3">
              {/* Lollipop SVG Icon */}
              <img src={LollipopSVG} alt="Lollipop" className="w-10 h-10" />
              
              <div>
                <h1 className="text-xl font-bold text-foreground">LOLLIPOP</h1>
                <p className="text-sm text-muted-foreground">Investment Intelligence Platform</p>
              </div>
            </div>
          </header>

          {/* Scrollable Main Content */}
          <main className="flex-1 overflow-y-auto px-6 py-8">
            <div className="max-w-md mx-auto w-full space-y-8">
              {/* Welcome Section */}
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
                  <p className="text-muted-foreground">
                    Access your personalized investment insights and expert tips
                  </p>
                </div>
              </div>

              {/* Login Form */}
              <LoginForm />

              {/* Enhanced Features Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide text-center">
                  What You Get
                </h3>
                
                <div className="grid gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-sm">Real-time Investment Tips</p>
                      <p className="text-xs text-muted-foreground">Get actionable insights from expert advisors</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-sm">Advanced Market Analysis</p>
                      <p className="text-xs text-muted-foreground">Comprehensive market data and technical analysis</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-sm">SEBI Registered Investment Advisors</p>
                      <p className="text-xs text-muted-foreground">Verified professionals with regulatory compliance</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-sm">AI-Powered Risk Assessment</p>
                      <p className="text-xs text-muted-foreground">Smart risk analysis for informed decisions</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                    <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-sm">Advanced Filtering</p>
                      <p className="text-xs text-muted-foreground">Filter by asset class, risk, sector, and more</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-sm">Personalized Feed</p>
                      <p className="text-xs text-muted-foreground">Tailored recommendations based on your preferences</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Extra spacing at bottom for better scroll experience */}
              <div className="pb-4"></div>
            </div>
          </main>

          {/* Fixed Footer */}
          <footer className="border-t border-border p-6 flex-shrink-0 bg-background">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                By continuing, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </p>
            </div>
          </footer>
        </div>

        {/* Right Side: Image (Desktop only) */}
        <div className="w-3/5 relative">
          <img
            src="https://media.gettyimages.com/id/1315439642/photo/working-on-wall-street.jpg?s=2048x2048&w=gi&k=20&c=jw2igwC72YgTRyjb4LYpUAfjKTDkWGzA8JWbaE0Gs6U="
            alt="Financial Markets"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Overlay content */}
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h2 className="text-2xl font-bold mb-2">Expert Investment Insights</h2>
            <p className="text-white/90 text-sm">
              Join thousands of investors making informed decisions with real-time tips and analysis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
