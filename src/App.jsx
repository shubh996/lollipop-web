import { useState, useEffect } from 'react';
import './App.css'
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "./components/theme-provider"
import { toast } from "sonner";
import { ChevronRight, ChevronLeft, CircleUser } from "lucide-react"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import Payment from './Payment';
import TradingViewWidget from './components/TradingViewWidget';
import TickerTape from './components/TickerTape';
import supabase from './lib/supabaseClient';
import NewsCards from './components/NewsCards';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { mockNewsData } from "./mockData";

function App() {
  const categories = [
    { label: "Stocks" },
    { label: "Commodities" },
    { label: "Forex" },
    { label: "Crypto" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0].label);
  const [newsItems, setNewsItems] = useState([]);
  const [selectedNewsId, setSelectedNewsId] = useState(null);
  const [viewedNewsIds, setViewedNewsIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null); // Store user profile
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false }).limit(100);
      let combinedNews = [];
      if (data && Array.isArray(data)) {
        combinedNews = [...mockNewsData, ...data];
      } else {
        combinedNews = [...mockNewsData];
      }
      setNewsItems(combinedNews);
      setLoading(false);
    };
    const fetchUserAndProfile = async () => {
      const { data: authData } = await supabase.auth.getUser();
      setUser(authData.user);
      if (authData.user) {
        // Fetch user profile from 'users' table
        const { data: profileData, error: profileError } = await supabase
          .from('users')
          .select('profile_photo_url, name')
          .eq('id', authData.user.id)
          .single();
        if (!profileError) {
          setProfile(profileData);
        } else {
          setProfile(null);
        }
      }
    }

    fetchNews();
    fetchUserAndProfile();
  }, []);

  // Filter news by category (if you want to keep this logic)
  const filteredNews = newsItems.filter(
    selectedCategory === "Stocks"
      ? (item) => !item.category || item.category === "Stocks"
      : (item) => item.category === selectedCategory
  );
  const newsIndex = filteredNews.findIndex((item) => item.id === selectedNewsId);
  const currentNews = filteredNews[newsIndex] || filteredNews[0];

  // Arrow navigation handlers
  const handlePrev = () => {
    const filteredIndex = filteredNews.findIndex((item) => item.id === selectedNewsId);
    if (filteredIndex > 0) {
      const prevId = filteredNews[filteredIndex - 1].id;
      setSelectedNewsId(prevId);
      setViewedNewsIds((prev) =>
        prev.includes(prevId) ? prev : [...prev, prevId]
      );
    }
  };

  const handleNext = () => {
    const filteredIndex = filteredNews.findIndex((item) => item.id === selectedNewsId);
    if (viewedNewsIds.length >= 10 && !viewedNewsIds.includes(filteredNews[filteredIndex + 1]?.id)) {
      toast.error("You have reached the daily limit", {
        description: "of 10 Free News per day",
        align: "left",
        action: {
          label: "Upgrade",
          onClick: () => handleUpgradeClick(),
        },
      });
      return;
    }
    if (filteredIndex < filteredNews.length - 1) {
      const nextId = filteredNews[filteredIndex + 1].id;
      setSelectedNewsId(nextId);
      setViewedNewsIds((prev) =>
        prev.includes(nextId) ? prev : [...prev, nextId]
      );
    }
  };

  const handleUpgradeClick = () => {
    toast(<Payment/>);
  };


     useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.code === 'Space' || e.key === ' ') {
          if (typeof handleNext === 'function') {
            e.preventDefault();
            handleNext();
          }
        } else if (e.key === 'ArrowLeft') {
          if (typeof handlePrev === 'function') {
            e.preventDefault();
            handlePrev();
          }
        } else if (e.key === 'ArrowRight') {
          if (typeof handleNext === 'function') {
            e.preventDefault();
            handleNext();
          }
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handlePrev, handleNext]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div style={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        
      }}>
        
        
        
        <TickerTape />



        <div style={{ zIndex:1000, scale:0.9,display: 'flex', justifyContent: 'center', width: '100%', margin: '85px 0 24px 0', marginBottom: 25, height: 1 }}>
          <Menubar style={{ fontFamily: 'Uber Move', height:37.5 , width:'auto'}}>
            {categories.map((cat, idx) => (
              <>
                <MenubarMenu style={{}} key={cat.label}>
                  <MenubarTrigger
                    style={{ 
                      fontFamily: 'Uber Move',
                      color: selectedCategory === cat.label ? 'var(--primary)' : 'var(--muted-foreground)',
                      background: selectedCategory === cat.label ? 'var(--primary-selected-bg, transparent)' : 'transparent',
                      fontWeight: selectedCategory === cat.label ? 700 : 500,
                      borderRadius: 6,
                      padding: '2px 12px',
                      transition: 'color 0.2s, background 0.2s',
                      cursor: 'pointer',
                      minHeight: 14,
                      height: 14,
                      lineHeight: '14px',
                    }}
                    aria-current={selectedCategory === cat.label ? 'page' : undefined}
                    onClick={() => {
                      if (cat.label !== 'Top News') {
                        toast.info('This categorization of news feature', {
                          description: `will be available in a future update.`
                        });
                        return;
                      }
                      setSelectedCategory(cat.label);
                      const firstInCat = newsItems.find((item) => item.category === cat.label || (cat.label === "Top News" && !item.category));
                      if (firstInCat) setSelectedNewsId(firstInCat.id);
                    }}
                  >
                    {cat.label}
                  </MenubarTrigger>
                </MenubarMenu>
                {idx < categories.length   && (
                  <span key={cat.label + '-sep'} style={{ color: 'var(--muted-foreground)', margin: '0 1px', fontWeight: 700, fontSize: 18, userSelect: 'none' }}>·</span>
                )}
              </>
            ))}
            
            <MenubarMenu>
              <MenubarTrigger
                style={{ padding: 0, background: 'none', border: 'none', marginLeft: 8, marginRight: 16, cursor: 'pointer' }}
                onClick={() => {
                  if (user) {
                    navigate('/dashboard', { state: { user, name: profile?.name, profilePhoto: profile?.profile_photo_url } });
                  } else {
                    navigate('/login');
                  }
                }}
              >
                {!user ? (
                  profile && profile.profile_photo_url ? (
                    <img src={profile.profile_photo_url} alt={"I"} style={{ width: 32, height: 32, borderRadius: '50%' }} />
                  ) : (
                    <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircleUser size={18} color="var(--primary)"/>
                  </div>
                  )
                ) : (
                  <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircleUser size={18} color="var(--primary)"/>
                  </div>
                )}
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>  
        </div>
        
        <div style={{ marginTop:24, width:"80vw", marginLeft:"10vw",height: '92vh' , textAlign: "left", justifyContent:"center", alignItems:"center", display: 'flex', flexDirection: 'row', overflow: 'hidden',  }}>
          <Button
            variant="outline" size="icon"
            onClick={handlePrev}
            disabled={newsIndex === 0}
            style={{
              position: 'absolute',
              left: 20,
              top: '47%',
              transform: 'translateY(-50%)',
              zIndex: 2,
            }}
            aria-label="Previous News"
          >
            <ChevronLeft size={24} />
          </Button>
          {loading ? (
            <div style={{ margin: 'auto', fontSize: 20 }}>Loading...</div>
          ) : filteredNews.length === 0 ? (
            <div style={{ margin: 'auto', fontSize: 20 }}>No news found.</div>
          ) : (
            <NewsCards currentNews={currentNews} showMeta={true} />
          )}
          <Button
            variant="outline" size="icon"
            onClick={handleNext}
            disabled={newsIndex === filteredNews.length - 1}
            style={{
              position: 'absolute',
              right: 20,
              top: '47%',
              transform: 'translateY(-50%)',
              zIndex: 2,
            }}
            aria-label="Next News"
          >
            <ChevronRight size={24} />
          </Button>
        </div>



      </div>
    </ThemeProvider>
  );
}

export default App;
