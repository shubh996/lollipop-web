import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from './lib/supabaseClient';
import NewsCards from './components/NewsCards';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function SinglePost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      const { data, error } = await supabase.from('posts').select('*').eq('id', postId).single();
      setPost(data || null);
      if (data && data.user_id) {
        const { data: userData } = await supabase.from('users').select('name, profile_photo_url').eq('id', data.user_id).single();
        setUserName(userData?.name || 'User');
        setUserPhoto(userData?.profile_photo_url || '');
      }
      setLoading(false);
    }
    fetchPost();
  }, [postId]);

  if (loading) {
    return <Skeleton style={{ width: '75vw', height: '80vh', borderRadius: 16, margin: 'auto' }} />;
  }
  if (!post) {
    return (
      <Card className="max-w-lg mx-auto mt-12">
        <CardContent className="text-center text-muted-foreground p-8">Post not found.</CardContent>
      </Card>
    );
  }
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
      marginTop: 30
    }}>
      <div style={{scale:0.95, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', margin: '20px 0 24px 0', marginBottom: 20, height: 1 }}>
        <Menubar style={{ fontFamily: 'Uber Move', height: 40 }}>
          <MenubarMenu>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin:4 }}>
              <Avatar style={{ width: 26, height: 26, borderRadius: '50%' }}>
                <AvatarImage src={userPhoto} alt={userName} style={{ width: 32, height: 32, borderRadius: '50%' }} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <MenubarTrigger style={{ fontWeight: 700, color: 'var(--primary)' }}>{userName}</MenubarTrigger>
            </div>
          </MenubarMenu>
        </Menubar>
      </div>
      <div style={{ marginTop:-15,  width:"80vw", marginLeft:"10vw",height: '92vh' , textAlign: "left", justifyContent:"center", alignItems:"center", display: 'flex', flexDirection: 'row', overflow: 'hidden',  }}>
        <NewsCards currentNews={post} showMeta={true} />
      </div>
    </div>
  );
} 