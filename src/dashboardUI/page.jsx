import { useEffect, useState, useRef } from "react";
import supabase from "@/lib/supabaseClient";
import { AppSidebar } from "./app-sidebar"
import NewsCards from "@/components/NewsCards"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Upload, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', profile_photo_url: '' });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [creatingNewPost, setCreatingNewPost] = useState(false);
  const [newPost, setNewPost] = useState({
    headline: '',
    summary: '',
    investmentTip: '',
    image_url: '',
    post_type: 'buy',
    post_strategy: '',
    stock1: '',
    stock2: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [selectedStocks, setSelectedStocks] = useState({ stock1: '', stock2: '' });
  const location = useLocation();
  const navigate = useNavigate();
  
  // Update selected stocks when newPost changes
  useEffect(() => {
    setSelectedStocks({
      stock1: newPost.stock1 || '',
      stock2: newPost.stock2 || ''
    });
  }, [newPost.stock1, newPost.stock2]);


  useEffect(() => {
    async function fetchUserAndPosts() {
      setLoading(true);
      const { data: authData } = await supabase.auth.getUser();
      setUser(authData.user);
      if (authData.user) {
        // Fetch user profile from 'users' table
        const { data: profileData } = await supabase
          .from('users')
          .select('profile_photo_url, name, email')
          .eq('id', authData.user.id)
          .single();
        
        setProfile(profileData);
        
        // Check if profile setup is needed
        if (!profileData?.name || !profileData?.profile_photo_url) {
          setShowProfileSetup(true);
          setProfileForm({
            name: profileData?.name || '',
            profile_photo_url: profileData?.profile_photo_url || ''
          });
        }
        
        const { data: postsData } = await supabase
          .from("posts")
          .select("*")
          .eq("user_id", authData.user.id)
          .order("created_at", { ascending: false });
        setPosts(postsData || []);
      } else {
        setProfile(null);
        setPosts([]);
      }
      setLoading(false);
    }
    fetchUserAndPosts();
  }, []);
  
  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('post-images')
        .getPublicUrl(fileName);
      
      setProfileForm(prev => ({
        ...prev,
        profile_photo_url: publicUrl
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!profileForm.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    
    if (!profileForm.profile_photo_url) {
      toast.error('Please upload a profile picture');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          name: profileForm.name.trim(),
          profile_photo_url: profileForm.profile_photo_url,
          
        }, {
          onConflict: 'id'
        });
      
      if (error) throw error;
      
      // Update local state
      setProfile({
        ...profile,
        name: profileForm.name.trim(),
        profile_photo_url: profileForm.profile_photo_url
      });
      
      setShowProfileSetup(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  // Handler to start new post creation
  const handleStartNewPost = (postType = 'buy', postStrategy = '') => {
    setCreatingNewPost(true);
    setSelectedPost(null);
    setNewPost({ headline: '', summary: '', investmentTip: '', image_url: '', post_type: postType, post_strategy: postStrategy, stock1: '', stock2: '' });
  };

  // Handler to cancel new post creation
  const handleCancelNewPost = () => {
    setCreatingNewPost(false);
    setNewPost({ headline: '', summary: '', investmentTip: '', image_url: '', post_type: 'buy', post_strategy: '', stock1: '', stock2: '' });
  };

  // Handler to update new post fields
  const handleNewPostChange = (field, value) => {
    const updatedPost = { ...newPost, [field]: value };
    setNewPost(updatedPost);
    
    // Update selected stocks immediately for the TradingView widget
    if (field === 'stock1' || field === 'stock2') {
      setSelectedStocks({
        stock1: field === 'stock1' ? value : updatedPost.stock1,
        stock2: field === 'stock2' ? value : updatedPost.stock2
      });
    }
  };

  // Handler to submit new post with validation
  const handleSubmitNewPost = async () => {
    // Validation: require stock1, headline, investmentTip, post_type, post_strategy, summary, and image_url
    if (!newPost.stock1) {
      toast.error('Please enter Stock 1.', { position: 'top-left' });
      return;
    }
    if (!newPost.headline) {
      toast.error('Please enter a Headline.', { position: 'top-left' });
      return;
    }
    if (!newPost.investmentTip) {
      toast.error('Please enter an Investment Tip.', { position: 'top-left' });
      return;
    }
    if (!newPost.post_type) {
      toast.error('Please select Buy/Sell.', { position: 'top-left' });
      return;
    }
    if (!newPost.post_strategy) {
      toast.error('Please select a Strategy.', { position: 'top-left' });
      return;
    }
    if (!newPost.summary) {
      toast.error('Please enter a Summary.', { position: 'top-left' });
      return;
    }
    if (!newPost.image_url) {
      toast.error('Please upload an Image.', { position: 'top-left' });
      return;
    }
    setSubmitting(true);
    const postData = {
      ...newPost,
      user_id: user.id,
      created_at: new Date().toISOString(),
      post_strategy: newPost.post_strategy || '',
    };
    const { data, error } = await supabase.from('posts').insert([postData]);
    if (!error) {
      setPosts((prev) => [postData, ...prev]);
      setCreatingNewPost(false);
      setSelectedPost(postData);
    }
    setSubmitting(false);
  };

  // Handler to submit new post and keep form open for another
  const handleSubmitNewPostAndNew = async () => {
    // Validation: require stock1, headline, investmentTip, post_type, post_strategy, summary, and image_url
    if (!newPost.stock1) {
      toast.error('Please enter Stock 1.', { position: 'top-left' });
      return;
    }
    if (!newPost.headline) {
      toast.error('Please enter a Headline.', { position: 'top-left' });
      return;
    }
    if (!newPost.investmentTip) {
      toast.error('Please enter an Investment Tip.', { position: 'top-left' });
      return;
    }
    if (!newPost.post_type) {
      toast.error('Please select Buy/Sell.', { position: 'top-left' });
      return;
    }
    if (!newPost.post_strategy) {
      toast.error('Please select a Strategy.', { position: 'top-left' });
      return;
    }
    if (!newPost.summary) {
      toast.error('Please enter a Summary.', { position: 'top-left' });
      return;
    }
    if (!newPost.image_url) {
      toast.error('Please upload an Image.', { position: 'top-left' });
      return;
    }
    setSubmitting(true);
    const postData = {
      ...newPost,
      user_id: user.id,
      created_at: new Date().toISOString(),
      post_strategy: newPost.post_strategy || '',
    };
    const { data, error } = await supabase.from('posts').insert([postData]);
    if (!error) {
      setPosts((prev) => [postData, ...prev]);
      // Reset form for new post, keep creatingNewPost true
      setNewPost({
        headline: '',
        summary: '',
        investmentTip: '',
        image_url: '',
        post_type: 'buy',
        post_strategy: '',
        stock1: '',
        stock2: '',
      });
      setSelectedStocks({ stock1: '', stock2: '' });
      toast.success('Post created! You can add another.');
    }
    setSubmitting(false);
  };

  // Handler for image upload
  const handleNewPostImageUpload = async (file) => {
    if (!file) return;
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage.from('post-images').upload(fileName, file);
    if (error) {
      toast.error('Image upload failed. Please try again.', { position: 'top-left' });
      return;
    }
    // Get public URL
    const { data: urlData } = supabase.storage.from('post-images').getPublicUrl(fileName);
    setNewPost(prev => ({ ...prev, image_url: urlData.publicUrl }));
  };

  return (
    <>
      {/* Profile Setup Dialog */}
      <Dialog open={showProfileSetup} onOpenChange={setShowProfileSetup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profileForm.profile_photo_url} />
                  <AvatarFallback>
                    {isUploading ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <span className="text-2xl">
                        {profileForm.name ? profileForm.name.charAt(0).toUpperCase() : 'U'}
                      </span>
                    )}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors"
                >
                  <Upload className="h-4 w-4" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleProfileImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              
              <div className="w-full space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="submit" disabled={isUploading}>
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : 'Save Profile'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      <SidebarProvider
        style={{
          flexDirection: "row",
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
      <AppSidebar
        style={{ width: "17.5vw", height: "100vh", display: "flex", justifyContent: "flex-start", alignItems: "center" }}
        posts={creatingNewPost ? [] : posts}
        onSelectPost={setSelectedPost}
        selectedPost={selectedPost}
        user={{
          name: profile?.name || user?.user_metadata?.name,
          email: profile?.email || user?.email,
          avatar: profile?.profile_photo_url || user?.user_metadata?.profile_photo_url,
          id: user?.id,
        }}
        onNewPost={handleStartNewPost}
        creatingNewPost={creatingNewPost}
        newPost={newPost}
        onNewPostChange={handleNewPostChange}
        onCancelNewPost={handleCancelNewPost}
        submitting={submitting}
        onSubmitNewPost={handleSubmitNewPost}
        onSubmitNewPostAndNew={handleSubmitNewPostAndNew}
        onNewPostImageUpload={handleNewPostImageUpload}
      />
      <SidebarInset style={{ width: "70vw", height: "100vh", position: "absolute", left: "22.5vw", top: "5vh", bottom: "0", right: "0", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
        <div style={{ width: '100%', display: 'flex', gap: 32 }}>
          
          
          {/* Sidebar content: either new post form or placeholder */}
          

          {/* Main content: NewsCards preview or selected post */}
          <div style={{ flex: 1 }}>
            {loading ? (
              <div>Loading posts...</div>
            ) : posts.length === 0 && !creatingNewPost? (
              <div>No posts found.</div>
            ) : creatingNewPost ? (
              <NewsCards 
                key={`new-post-${selectedStocks.stock1}-${selectedStocks.stock2}`}
                currentNews={newPost} 
                showMeta={false} 
                selectedStocks={{
                  stock1: newPost.stock1 || '',
                  stock2: newPost.stock2 || ''
                }}
              />
            ) : selectedPost ? (
              <NewsCards 
                currentNews={selectedPost} 
                showMeta={false} 
                selectedStocks={{
                  stock1: selectedPost.stock1 || '',
                  stock2: selectedPost.stock2 || ''
                }}
              />
            ) : (
              <div>Select a post to view details.</div>
            )}
          </div>
        </div>
      </SidebarInset>
      </SidebarProvider>
    </>
  );
}
