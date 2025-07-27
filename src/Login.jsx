import React, { useEffect, useRef, memo, useState } from 'react';
import { GalleryVerticalEnd, Loader2Icon } from "lucide-react";
import supabase from '@/lib/supabaseClient';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

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
          navigate('/dashboard',  { state: { user: data?.user} });
        }


    
        console.log("error", error);
      if (error) throw error;
       // Adjust the route as needed
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center" style={{ marginBottom: '36px' }}>
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>
            {step === 'email' ? 'Enter your email to get OTP' : 'Enter the OTP sent to your email'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={step === 'email' ? handleSendOtp : handleVerifyOtp}>
            <div className="grid gap-6">
              {step === 'email' && (
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              )}

              {step === 'otp' && (
                <div className="grid gap-3">
                  <Label htmlFor="otp">OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
              )}

              <Button type="submit" className="w-full" style={{ marginTop: '36px' }} disabled={loading}>
                {loading ? 'Processing...' : step === 'email' ? 'Get OTP' : 'Login'}
              </Button>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
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

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        console.log("User is logged in:", user);

     
        // Redirect to dashboard if user is already logged in
        navigate("/dashboard", { state: { user: user } });
      }
    };

    checkUser();
  }, [navigate]);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', position: 'fixed', top: 0, left: 0 }}>
      {/* Left Section: Login Form */}
      <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '24px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', paddingLeft: '8px', paddingRight: '8px', fontSize: '1rem', color: 'var(--foreground)' }}>
            LOLLIPOP
          </a>
        </div>
        <div style={{ width: '100%', maxWidth: '20vw' }}>
          <LoginForm />
        </div>
      </div>

      {/* Right Section: Fullscreen Image */}
      <div style={{ flex: '1 1 50%', position: 'relative' }}>
        <img
          src="https://media.gettyimages.com/id/1315439642/photo/working-on-wall-street.jpg?s=2048x2048&w=gi&k=20&c=jw2igwC72YgTRyjb4LYpUAfjKTDkWGzA8JWbaE0Gs6U="
          alt="Image"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};

export default Login;
