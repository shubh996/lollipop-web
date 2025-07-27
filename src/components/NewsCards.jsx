import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader , CardTitle, CardAction, CardFooter} from "@/components/ui/card";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThumbsUp, ThumbsDown, Bookmark, Search, Youtube, Twitter, ChevronLeft, ChevronRight, Maximize, BubblesIcon, LightbulbIcon, Lightbulb, Gift, Lollipop, Share2, CircleUser, Info, Star, Clock, TrendingDown, TrendingUp, Zap, DollarSign, Shield, Newspaper, ArrowUpRight, Activity } from "lucide-react";
import TradingViewWidget from './TradingViewWidget';
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getGeminiResponse } from "../services/gemini";
import { toast } from "sonner";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import supabase from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { timeAgo } from '../lib/utils';
import ProfileMenuIcon from './ProfileMenuIcon';
import LollipopIcon from './Lollipop';

// Add a mapping from strategy value to human-readable name
const strategyNames = {
  buy_and_hold: 'Buy and Hold',
  buy_short_term: 'Buy - Short Term',
  buy_on_dip: 'Buy on Dip',
  buy_breakout: 'Buy Breakout',
  buy_momentum: 'Buy Momentum',
  sell_take_profit: 'Sell - Take Profit',
  sell_stop_loss: 'Sell - Stop Loss',
  sell_on_news: 'Sell on News',
  sell_resistance: 'Sell Resistance',
  sell_trailing_stop: 'Sell Trailing Stop',
};

// Icon mapping for strategies
const strategyIcons = {
  buy_and_hold: Star,
  buy_short_term: Clock,
  buy_on_dip: TrendingDown,
  buy_breakout: TrendingUp,
  buy_momentum: Zap,
  sell_take_profit: DollarSign,
  sell_stop_loss: Shield,
  sell_on_news: Newspaper,
  sell_resistance: ArrowUpRight,
  sell_trailing_stop: Activity,
};

function NewsCards({ 
  currentNews, 
  newsIndex, 
  handlePrev, 
  handleNext, 
  totalNews,
  showMeta = false,
  onStrategyClick,
  selectedStocks = {}
}) {


  console.log("currentNews", currentNews)

  // Chat-related state
  const [chatMessages, setChatMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [showAllSuggestions, setShowAllSuggestions] = useState(true);
  const inputRef = useRef(null);
  const [uploaderName, setUploaderName] = useState('');
  const [uploaderPhoto, setUploaderPhoto] = useState('');
  const navigate = useNavigate();

  const [likeCount, setLikeCount] = useState(currentNews?.like_count || 0);
  const [dislikeCount, setDislikeCount] = useState(currentNews?.dislike_count || 0);
  const [bookmarkCount, setBookmarkCount] = useState(currentNews?.bookmark_count || 0);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const [user, setUser] = useState(null);

  const chatSuggestions = [
    "What does this mean for Tesla stock?",
    "Is this a good time to buy TSLA?",
    "How will this affect the EV market?"
  ];

  // Format chat messages
  const formatMessage = (message) => {
    const parts = message.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // Handle sending messages
  const handleSendMessage = async (message) => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    setShowAllSuggestions(false);
    
    try {
      const updatedMessages = [...chatMessages, { role: 'user', content: message }];
      setChatMessages(updatedMessages);

      const context = `
        Headline: ${currentNews.headline}
        Summary: ${currentNews.summary}
        Investment Tip: ${currentNews.investmentTip}
      `;

      const result = await getGeminiResponse(message, context, updatedMessages);
      
      if (result.success) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: result.data }]);
        setInputValue('');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error processing your request.' 
      }]);
      toast.error('Failed to get AI response', {
        description: error.message || 'Please try again later'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Clear chat when news changes
  React.useEffect(() => {
    setChatMessages([]);
    setInputValue('');
  }, [currentNews]);

  React.useEffect(() => {
    async function fetchUploaderInfo() {
      if (currentNews?.user_id) {
        const { data, error } = await supabase
          .from('users')
          .select('name, profile_photo_url')
          .eq('id', currentNews.user_id)
          .single();
        if (data) {
          setUploaderName(data.name || 'Unknown');
          setUploaderPhoto(data.profile_photo_url || '');
        } else {
          setUploaderName('Unknown');
          setUploaderPhoto('');
        }
      } else {
        setUploaderName('Unknown');
        setUploaderPhoto('');
      }
    }
    if (showMeta) fetchUploaderInfo();
  }, [currentNews?.user_id, showMeta]);

  // Handler for clicking uploader name
  const handleUploaderClick = () => {
    if (currentNews?.user_id) {
      navigate(`/user/${currentNews.user_id}`);
    }
  };

  React.useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      // Check if this post is bookmarked by the user (array field)
      if (data.user && currentNews?.id) {
        const { data: userData } = await supabase
          .from('users')
          .select('bookmarks')
          .eq('id', data.user.id)
          .single();
        const bookmarksArr = userData?.bookmarks || [];
        setBookmarked(bookmarksArr.includes(currentNews.id));
      } else {
        setBookmarked(false);
      }
    }
    fetchUser();
  }, [currentNews?.id]);

  // Bookmark state from localStorage
  React.useEffect(() => {
    if (!currentNews?.id) return;
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setBookmarked(bookmarks.includes(currentNews.id));
  }, [currentNews?.id]);

  const responsiveFont = (min, max, vwMin = 320, vwMax = 1600) => 
    `clamp(${min}px, calc(${min}px + (${max} - ${min}) * ((100vw - ${vwMin}px) / (${vwMax} - ${vwMin}))), ${max}px)`;

  const StrategyIcon = currentNews?.post_strategy && strategyIcons[currentNews.post_strategy] ? strategyIcons[currentNews.post_strategy] : Info;
  const strategyLabel = currentNews?.post_strategy && strategyNames[currentNews.post_strategy] ? strategyNames[currentNews.post_strategy] : 'No Strategy';
  const handleStrategyClick = () => {
    if (typeof onStrategyClick === 'function' && currentNews?.post_strategy) {
      onStrategyClick(currentNews.post_strategy);
    }
  };

  return (
    <div style={{ width:"75vw",  height: '92vh',  flexDirection: 'row', overflow: 'visible' }}>


  

      <Card style={{ height: '90%', fontFamily: 'Uber Move', width: '100%', flexDirection:"row", overflow: 'visible',}}>




        {/* News Section (Left) */}
        <div style={{ height: '100%', width: '22vw', display: 'flex', 
          flexDirection: 'column', justifyContent: 'space-between', 
          padding: 5, 
          marginLeft: 20 }}>
          
          
          
          {/* Top: Image, Headline, Summary */}
          <div style={{ overflow: 'visible', marginBottom: 0 }}>
            {/* Image with timestamp overlay */}
            <div style={{ width: '100%', height: '20vh', borderRadius: '7px', overflow: 'visible', marginBottom: 16, backgroundColor: '#f3f4f6', position: 'relative' }}>
              <img src={currentNews.image_url}
                alt="news"
                style={{ width: '100%', height: '100%', objectFit: 'cover',marginTop:10 }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e5e7eb', color: '#6b7280', fontWeight: 'bold' }}>IMG</div>
              {currentNews?.created_at && (
                <span style={{ position: 'absolute', right: 10, bottom: 10, background: 'rgba(0,0,0,0.65)', color: '#fff', borderRadius: 6, padding: '2px 10px', fontSize: 12, fontWeight: 500, zIndex: 2 }}>
                  {timeAgo(currentNews.created_at)}
                </span>
              )}
            </div>
            <h4 style={{ fontFamily: 'Uber Move', fontWeight: 700, fontSize: responsiveFont(15, 15), marginBottom: 16, marginTop: 0, color: 'var(--foreground)' }}>{currentNews?.headline}</h4>
            <div style={{ textAlign:"justify", fontFamily: 'Uber Move Regular',height:"25vh", fontSize: responsiveFont(14, 14), marginBottom: 0, lineHeight: 1.6, color: 'var(--muted-foreground)' }}>{currentNews?.summary}</div>
          </div>

          {/* Bottom: Lollipop, Investment Tip, Menu Bar */}
          <div style={{ width: '107.5%', marginLeft: '-3%' }}>
          

            <LollipopIcon postType={currentNews?.post_type} tip={currentNews?.investmentTip} strategyTitle={strategyNames[currentNews?.post_strategy]} strategyIcons={strategyIcons} strategyNames={strategyNames}/>

            <Menubar style={{ marginTop: '16px', fontFamily: 'Uber Move', height: 40, justifyContent: 'center', display: 'flex', gap: 48 }}>
              {/* Like/Dislike/Bookmark group */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                <MenubarMenu>
                  <MenubarTrigger
                    style={{ padding: '8px 8px', borderRadius: '6px', color: liked ? 'green' : 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                    onClick={async () => {
                      const user = (await supabase.auth.getUser()).data.user;
                      if (!user) {
                        toast.error('Please log in to like posts.');
                        return;
                      }
                      let newCount = likeCount;
                      if (!liked) {
                        newCount = likeCount + 1;
                        setLikeCount(newCount);
                        setLiked(true);
                      } else {
                        newCount = likeCount - 1;
                        setLikeCount(newCount);
                        setLiked(false);
                      }
                      const { error } = await supabase.from('posts').update({ like_count: newCount }).eq('id', currentNews.id);
                      if (!error) toast.success(liked ? 'Like removed!' : 'Liked!');
                    }}
                  >
                    <ThumbsUp size={16} />
                  </MenubarTrigger>
                </MenubarMenu>
                <span style={{ color: 'var(--muted-foreground)', margin: '0 6px', fontWeight: 700, fontSize: 18, userSelect: 'none' }}>·</span>
                <MenubarMenu>
                  <MenubarTrigger
                    style={{ padding: '8px 8px', borderRadius: '6px', color: disliked ? 'red' : 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                    onClick={async () => {
                      const user = (await supabase.auth.getUser()).data.user;
                      if (!user) {
                        toast.error('Please log in to dislike posts.');
                        return;
                      }
                      let newCount = dislikeCount;
                      if (!disliked) {
                        newCount = dislikeCount + 1;
                        setDislikeCount(newCount);
                        setDisliked(true);
                      } else {
                        newCount = dislikeCount - 1;
                        setDislikeCount(newCount);
                        setDisliked(false);
                      }
                      const { error } = await supabase.from('posts').update({ dislike_count: newCount }).eq('id', currentNews.id);
                      if (!error) toast.success(disliked ? 'Dislike removed!' : 'Disliked!');
                    }}
                  >
                    <ThumbsDown size={16} /> 
                  </MenubarTrigger>
                </MenubarMenu>
                <span style={{ color: 'var(--muted-foreground)', margin: '0 6px', fontWeight: 700, fontSize: 18, userSelect: 'none' }}>·</span>
                <MenubarMenu>
                  <MenubarTrigger
                    style={{ padding: '8px 8px', borderRadius: '6px', color: bookmarked ? 'white' : 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, background: bookmarked ? '#222' : 'none', borderRadius: bookmarked ? '50%' : '6px', fill: bookmarked ? 'black' : 'none' }}
                    onClick={() => {
                      if (!currentNews?.id) return;
                      let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
                      if (!bookmarked) {
                        if (!bookmarks.includes(currentNews.id)) {
                          bookmarks.push(currentNews.id);
                          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                          setBookmarked(true);
                          toast.success('Bookmarked!');
                        }
                      } else {
                        bookmarks = bookmarks.filter(id => id !== currentNews.id);
                        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                        setBookmarked(false);
                        toast.success('Bookmark removed!');
                      }
                    }}
                  >
                    <Bookmark size={16.56} />
                  </MenubarTrigger>
                </MenubarMenu>
                <span style={{ color: 'var(--muted-foreground)', margin: '0 6px', fontWeight: 700, fontSize: 18, userSelect: 'none' }}>·</span>
                <MenubarMenu>
                  <MenubarTrigger
                    style={{ padding: '8px 8px', borderRadius: '6px', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                    onClick={async () => {
                      let shareUrl;
                      if (currentNews?.user_id && currentNews?.id) {
                        shareUrl = window.location.origin + '/user/' + currentNews.user_id + '/post/' + currentNews.id;
                      } else if (currentNews?.id) {
                        shareUrl = window.location.origin + '/post/' + currentNews.id;
                      } else {
                        shareUrl = window.location.origin;
                      }
                      try {
                        await navigator.clipboard.writeText(shareUrl);
                        toast.success('Link copied to clipboard!');
                      } catch {
                        toast.error('Failed to copy link.');
                      }
                    }}
                  >
                    <Share2 size={15.56} />
                  </MenubarTrigger>
                </MenubarMenu>
                <span style={{ color: 'var(--muted-foreground)', margin: '0 6px', fontWeight: 700, fontSize: 18, userSelect: 'none' }}>·</span>

                <MenubarMenu>
                  <MenubarTrigger
                    style={{ padding: '8px 8px', borderRadius: '6px', color: 'var(--primary)', cursor: 'pointer' }}
                    onClick={() => {
                      const query = encodeURIComponent(currentNews?.headline || '');
                      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
                    }}
                  >
                    <Youtube size={17.56} />
                  </MenubarTrigger>
                </MenubarMenu>
                <span style={{ color: 'var(--muted-foreground)', margin: '0 6px', fontWeight: 700, fontSize: 18, userSelect: 'none' }}>·</span>
                <MenubarMenu>
                  <MenubarTrigger
                    style={{ padding: '8px 8px', borderRadius: '6px', color: 'var(--primary)', cursor: 'pointer' }}
                    onClick={() => {
                      const query = encodeURIComponent(currentNews?.headline || '');
                      window.open(`https://twitter.com/search?q=${query}`, '_blank');
                    }}
                  >
                    <Twitter size={16.56} />
                  </MenubarTrigger>
                </MenubarMenu>
                <span style={{ color: 'var(--muted-foreground)', margin: '0 6px', fontWeight: 700, fontSize: 18, userSelect: 'none' }}>·</span>
                <MenubarMenu>
                  <MenubarTrigger
                    style={{ padding: '8px 8px', borderRadius: '6px', color: 'var(--primary)', cursor: 'pointer' }}
                    onClick={() => {
                      const query = encodeURIComponent(currentNews?.headline || '');
                      window.open(`https://www.google.com/search?q=${query}`, '_blank');
                    }}
                  >
                    <Search size={16.56} />
                  </MenubarTrigger>
                </MenubarMenu>
                
              </div>
             
            </Menubar>
          </div>


        </div>

        {/* Separator */}
        <div style={{ width: 1, background: 'var(--border)', marginBottom: 6, marginLeft: 16, marginRight: 16 }} />

        {/* Chat Section (Right) */}
        <div style={{  width: '75vw', display: 'flex', marginRight: -10, flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
          
    

            
              
              
              <div style={{ 
                overflowY: 'auto', 
                marginTop: 10,
                paddingRight: '4.5%', 
                borderRadius: 0, 
                minHeight: 120, 
                color: 'var(--foreground)', 
                display: 'flex', 
                flexDirection: 'column', 
                 gap: 16,
                height: '50%',
                maxHeight: '100%',
                width: '100%',
              }}>
                <TradingViewWidget 
                  symbol={selectedStocks.stock1 || currentNews.stock1}
                  compareSymbol={selectedStocks.stock2 || currentNews.stock2}
                />

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {chatMessages.map((message, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: message.role === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '80%',
                        alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                      }}
                    >
                      <div style={{
                        background: message.role === 'user' ? 'var(--primary)' : 'var(--card)',
                        color: message.role === 'user' ? 'var(--primary-foreground)' : 'var(--foreground)',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        borderBottomRightRadius: message.role === 'user' ? '4px' : '12px',
                        borderBottomLeftRadius: message.role === 'assistant' ? '4px' : '12px',
                        fontSize: '13px',
                        lineHeight: '1.5',
                        fontFamily: 'Uber Move',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {formatMessage(message.content)}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--muted-foreground)',
                      fontSize: '13px',
                      fontFamily: 'Uber Move'
                    }}>
                      Searching ...
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom: Sample Questions, Input, Send Button as one docked group */}
              <div style={{
                width: '100%',
                position: 'absolute',
                left: 0,
                bottom: 0,
                
              }}>
                <div style={{ padding: '0 0px', width: '96%', fontFamily: 'Uber Move' }}>
                  <Accordion 
                    type="single" 
                    collapsible 
                    defaultValue={chatMessages.length === 0 ? "suggestions" : undefined}
                    className="w-full" 
                    style={{ border: 'none', display: chatMessages.length > 0 ? 'none' : 'block' }}
                  >
                    <AccordionItem 
                      value="suggestions" 
                      style={{ 
                        border: '1px solid var(--border)', 
                        borderRadius: 8, 
                        background: 'var(--card)'
                      }}
                    >
                      <AccordionTrigger 
                        style={{ 
                          padding: '10px 16px', 
                          fontSize: 13,
                          fontWeight: 500,
                          color: 'var(--foreground)',
                        }}
                      >
                        {showAllSuggestions ? "Sample Questions" : "See More Questions"}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {chatSuggestions.map((suggestion, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleSendMessage(suggestion)}
                              style={{ 
                                padding: '5px 16px',
                                fontSize: 15,
                                color: 'var(--muted-foreground)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                borderRadius: 6,
                                '&:hover': {
                                  background: 'var(--accent)',
                                  color: 'var(--accent-foreground)'
                                }
                              }}
                            >
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div style={{ padding: '0 0px', width: '96%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
                    <Input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && inputValue.trim()) {
                          handleSendMessage(inputValue);
                        }
                      }}
                      placeholder="Ask AI your question related to this news ..."
                      style={{
                        fontFamily: 'Uber Move',
                        flex: 1,
                        height: '42px',
                        padding: '0 16px',
                        borderRadius: 8,
                        border: '1px solid var(--border)',
                        background: 'var(--background)',
                        color: 'var(--foreground)',
                        fontSize: 13,
                        outline: 'none',
                        boxShadow: 'none',
                        transition: 'border 0.2s',
                      }}
                    />
                    <Button
                      type="submit"
                      onClick={() => {
                        if (inputValue.trim()) {
                          handleSendMessage(inputValue);
                        }
                      }}
                      style={{
                        fontFamily: 'Uber Move',
                        background: 'var(--primary)',
                        color: 'var(--primary-foreground)',
                        border: 'none',
                        borderRadius: 8,
                        height: '40px',
                        padding: '0 24px',
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        boxShadow: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </div>



       
        </div>




      </Card>

{ showMeta && <Button onClick={handleUploaderClick} variant="outline" 
                style={{
                  
                  position: 'absolute', bottom: "3%", left: "19.5%", width: "auto",

                  padding:10, paddingTop:17.5, paddingBottom:17.5, borderRadius: 8.9, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Uber Move', fontSize: responsiveFont(13, 13), color: 'var(--foreground)'}}>
                  <Avatar style={{ width: 24, height: 24, borderRadius: '50%', marginRight: 4 }}>
                    <AvatarImage src={uploaderPhoto} alt={uploaderName} style={{ width: 24, height: 24, borderRadius: '50%' }} />
                    <AvatarFallback><CircleUser size={18} /></AvatarFallback>
                  </Avatar> <span
                    style={{ }}
                    onClick={handleUploaderClick}
                    title={`Show all posts by ${uploaderName}`}
                >
                  {uploaderName}
                </span>
    </Button>
    
    
    }

    </div>
  );
}

export default NewsCards;
