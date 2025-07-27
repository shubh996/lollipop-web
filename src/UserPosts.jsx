import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, CircleUser } from "lucide-react";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import TickerTape from './components/TickerTape';
import supabase from './lib/supabaseClient';
import NewsCards from './components/NewsCards';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';


export default function UserPosts() {
  const { userId, postId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [selectedNewsIdx, setSelectedNewsIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');

  useEffect(() => {
    async function fetchUserPosts() {
      setLoading(true);
      const { data: userData } = await supabase.from('users').select('name, profile_photo_url').eq('id', userId).single();
      setUserName(userData?.name || 'User');
      setUserPhoto(userData?.profile_photo_url || '');
      const { data, error } = await supabase.from('posts').select('*').eq('user_id', userId).order('created_at', { ascending: false });
      setPosts(data || []);
      
      if (postId && data) {
        const index = data.findIndex(post => post.id === postId);
        setSelectedNewsIdx(index !== -1 ? index : 0);
      } else if (location.state?.initialPostId && data) {
        const index = data.findIndex(post => post.id === location.state.initialPostId);
        setSelectedNewsIdx(index !== -1 ? index : 0);
      } else {
        setSelectedNewsIdx(0);
      }
      
      setLoading(false);
    }
    fetchUserPosts();
  }, [userId, postId, location.state?.initialPostId]);

  const handlePrev = () => {
    setSelectedNewsIdx((idx) => Math.max(0, idx - 1));
  };
  const handleNext = () => {
    setSelectedNewsIdx((idx) => Math.min(posts.length - 1, idx + 1));
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

    const handleUploaderClick = () => {
      if (currentNews?.user_id) {
        navigate(`/user/${currentNews.user_id}`);
      }
    };

  return (
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
      <div style={{width: '100%', height: '7.5%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      </div>
      <div style={{ scale:1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', 
        margin: '20px 0 24px 0', marginBottom: 20, height: 1 }}>
     

        <Button onClick={() => navigate(`/user/${userId}`)}variant="outline" 
                style={{
                

                  padding:10, paddingTop:15, paddingBottom:15, borderRadius: 8.9, display: 'flex', alignItems: 'center', 
                  gap: 8, fontFamily: 'Uber Move', fontSize: 13, color: 'var(--foreground)'}}>
                  <Avatar style={{ width: 24, height: 24, borderRadius: '50%', marginRight: 4 }}>
                    <AvatarImage src={userPhoto} alt={userName} style={{ width: 24, height: 24, borderRadius: '50%' }} />
                    <AvatarFallback><CircleUser size={18} /></AvatarFallback>
                  </Avatar> <span
                    style={{ }}
                    onClick={handleUploaderClick}
                    title={`Show all posts by ${userName}`}
                >
                  {userName}
                </span>
    </Button>
      </div>
      <div style={{ marginTop:-15,  width:"80vw", marginLeft:"10vw",height: '92vh' , textAlign: "left", justifyContent:"center", alignItems:"center", display: 'flex', flexDirection: 'row', overflow: 'hidden',  }}>
        {/* Only show navigation buttons if not viewing a single post */}
        {(!postId) && (
          <>
            <Button
              variant="outline" size="icon"
              onClick={handlePrev}
              disabled={selectedNewsIdx === 0}
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
          </>
        )}
        {loading ? (
          <div style={{ margin: 'auto', fontSize: 20 }}>Loading...</div>
        ) : posts.length === 0 ? (
          <div style={{ margin: 'auto', fontSize: 20 }}>No posts found for this user.</div>
        ) : (
          <NewsCards currentNews={posts[selectedNewsIdx]} showMeta={false} />
        )}
        {(!postId) && (
          <>
            <Button
              variant="outline" size="icon"
              onClick={handleNext}
              disabled={selectedNewsIdx === posts.length - 1}
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
          </>
        )}
      </div>
    </div>
  );
}
