import { useEffect, useState, useRef } from "react";
import NewPostForm from "./NewPostForm";
import supabase from "@/lib/supabaseClient";
import { AppSidebar } from "./app-sidebar"
import NewsCards from "@/components/NewsCards"
import SelectedPost from "./selected-post";
import { formatDistanceToNow } from "date-fns";
import { DataTable } from "./tips-data-table";
import { Trash } from "lucide-react";
import { columns as baseColumns } from "./tips-columns";

// Compose columns: all fields + delete icon
function columnsWithDelete(handleDeletePost) {
  // Clone base columns and add delete icon column at the end
  const deleteCol = {
    id: "actions",
    header: () => <span></span>,
    cell: ({ row }) => (
      <button
        onClick={() => handleDeletePost(row.original)}
        style={{ background: "none", border: "none", cursor: "pointer", color: "#d32f2f", display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}
        title="Delete Tip"
      >
        <Trash size={18} />
      </button>
    ),
    size: 40,
    minSize: 40,
    maxSize: 40,
    enableResizing: false,
  };
  // Ensure all columns have consistent cell style
  const styledColumns = baseColumns.map(col => {
    if (!col.cell) {
      return {
        ...col,
        cell: ({ row }) => (
          <span style={{ color: "#222", fontSize: 13, verticalAlign: "middle", display: "inline-block", width: "100%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {row.getValue(col.accessorKey)}
          </span>
        ),
      };
    }
    return col;
  });
  return [...styledColumns, deleteCol];
}

// Delete handler
async function deleteTipFromSupabase(id) {
  const {data, error } = await supabase.from("investment_tips").delete().eq("id", id);
  console.log('Delete response:', data, error);
  if (error) {
    console.error('Error deleting tip:', error);
    return false;
  }
  return !error;
}

// Handler to delete a post
function handleDeletePost(post) {
  if (!post?.id) {
    toast.error("Invalid tip selected for deletion.");
    return;
  }
  if (!window.confirm("Are you sure you want to delete this tip?")) return;
  deleteTipFromSupabase(post.id).then(success => {
    if (success) {
      setPosts(prev => prev.filter(p => p.id !== post.id));
      if (selectedPost && selectedPost.id === post.id) setSelectedPost(null);
      toast.success("Tip deleted.");
    } else {
      toast.error("Failed to delete tip.");
    }
  });
}
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
import { NavUser } from "./nav-user";

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
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
    tip: '',
    symbol: '',
    compared: '',
    holding: '',
    risk: '',
    conviction: '',
    strategy: '',
    sentiment: '',
    sector: '',
    target_duration: '',
    catalyst: '',
    valuation: '',
    technical: '',
    diversification: '',
    liquidity: '',
    expected_return: '',
    performance: '',
    entry_price: '',
    exit_price: '',
    stop_loss: '',
    

  });
  const [submitting, setSubmitting] = useState(false);
  const [selectedStocks, setSelectedStocks] = useState({ symbol: '', compared: '' });
  const location = useLocation();
  const navigate = useNavigate();
  
  // Update selected stocks when newPost changes
  useEffect(() => {
    setSelectedStocks({
      symbol: newPost.symbol || '',
      compared: newPost.compared || ''
    });
  }, [newPost.symbol, newPost.compared]);


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
          .from("investment_tips") // Ensure this matches your table name
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
    setNewPost({
   
      tip: '',
   
      symbol: '',
      compared: '',
      holding: '',
      risk: '',
      conviction: '',
      strategy: '',
      sentiment: '',
      sector: '',
      target_duration: '',
      catalyst: '',
      valuation: '',
      technical: '',
      diversification: '',
      liquidity: '',
      expected_return: '',
      performance: '',
    });
  };

  const handleSelectedPost = (post) => {
    console.log('Inside the function Selected post:', post);
    setSelectedPost(post);
  };

  // Handler to cancel new post creation
  const handleCancelNewPost = () => {
    setCreatingNewPost(false);
    setNewPost({
      
      tip: '',
      
      symbol: '',
      compared: '',
      holding: '',
      risk: '',
      conviction: '',
      strategy: '',
      sentiment: '',
      sector: '',
      target_duration: '',
      catalyst: '',
      valuation: '',
      technical: '',
      diversification: '',
      liquidity: '',
      expected_return: '',
      performance: '',
    });
  };

  // Handler to update new post fields
  const handleNewPostChange = (field, value) => {
    const updatedPost = { ...newPost, [field]: value };
    setNewPost(updatedPost);
    // Update selected stocks immediately for the TradingView widget
    if (field === 'symbol' || field === 'compared') {
      setSelectedStocks({
        symbol: field === 'symbol' ? value : updatedPost.symbol,
        compared: field === 'compared' ? value : updatedPost.compared
      });
    }
  };

  // Handler to submit new post with validation
  const handleSubmitNewPost = async () => {
    // Validation: require symbol, headline, tip,  and new fields
    if (!newPost.symbol) {
      toast.error('Please enter Stock 1.', { position: 'top-left' });
      return;
    }

    if (!newPost.tip) {
      toast.error('Please enter an Investment Tip.', { position: 'top-left' });
      return;
    }
  
    // Validate new fields (optional: add more validation as needed)
    setSubmitting(true);
    const postData = {
      ...newPost,
      user_id: user.id,
      avatar: profile?.profile_photo_url || user?.user_metadata?.profile_photo_url || '',
      name: profile?.name || user?.user_metadata?.name || '',
      created_at: new Date().toISOString(),
    };
    const { data, error } = await supabase.from('investment_tips').insert([postData]);
    data && console.log('New post data:', data);
    error && console.error('Error inserting post:', error);
    if (!error) {
      setPosts((prev) => [postData, ...prev]);
      setCreatingNewPost(false);
      setSelectedPost(postData);
    }
    setSubmitting(false);
  };

  // Handler to submit new post and keep form open for another
  const handleSubmitNewPostAndNew = async () => {
    // Validation: require symbol, headline, tip,  summary, image_url, and new fields
    if (!newPost.symbol) {
      toast.error('Please enter Stock 1.', { position: 'top-left' });
      return;
    }
   
    if (!newPost.tip) {
      toast.error('Please enter an Investment Tip.', { position: 'top-left' });
      return;
    }

    
 
    // Validate new fields (optional: add more validation as needed)
    setSubmitting(true);
    const postData = {
      ...newPost,
      user_id: user.id,
      avatar: profile?.profile_photo_url || user?.user_metadata?.profile_photo_url || '',
      name: profile?.name || user?.user_metadata?.name || '',
      created_at: new Date().toISOString(),
    };
    const { data, error } = await supabase.from('investment_tips').insert([postData]);

    if (!error) {
      setPosts((prev) => [postData, ...prev]);
      // Reset form for new post, keep creatingNewPost true
      setNewPost({
        tip: '',
        symbol: '',
        compared: '',
        holding: '',
        risk: '',
        conviction: '',
        strategy: '',
        sentiment: '',
        sector: '',
        target_duration: '',
        catalyst: '',
        valuation: '',
        technical: '',
        diversification: '',
        liquidity: '',
        expected_return: '',
        performance: '',
      });
      setSelectedStocks({ symbol: '', compared: '' });
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
    <div style={{ height: "100%", display: "flex",  width: "100%", 
      flexDirection: "column",justifyContent:"center", alignItems:"center",
      paddingLeft:"-20vw",paddingTop:"-10vh",}}>


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

               
      {/* <div style={{ marginBottom: 36, marginTop:-20,
        justifyContent: 'center',  padding: 0, borderRadius: 8 }}>
                  <Input
                    placeholder="Search by tip or symbol..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ width: 320 }}
                  />
      </div>


    <div style={{ width: '100%', borderRadius: 12,
      overflow: 'hidden', boxShadow: '0 2px 8px #0001', background: '#FFF' }}>
      <DataTable
        columns={columnsWithDelete(handleDeletePost)}
        data={posts.filter(
          post =>
            post.tip?.toLowerCase().includes(search.toLowerCase()) ||
            post.symbol?.toLowerCase().includes(search.toLowerCase())
        )}
        tableHeaderStyle={{ background: '#F6F6F7', color: '#222', fontWeight: 600, height: 48, fontSize: 16, borderBottom: '1px solid #E5E7EB' }}
        rowStyle={{ height: 44, verticalAlign: 'middle' }}
      />
    </div> */}
            
      
      <SidebarProvider
        style={{
          flexDirection: "row",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "#FFF",
        }}
      >
      <AppSidebar
        style={{backgroundColor:"#FFF",width:"25vw", height: "100vh",}}
        posts={creatingNewPost ? [] : posts}
        onSelectPost={handleSelectedPost}
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
      <SidebarInset style={{backgroundColor:"#FFF", width: "30vw", height: "100vh", position: "absolute", left: "22.5vw", top: "5vh", bottom: "0", right: "0", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
        <div style={{ width: '100%', display: 'flex', gap: 32 }}>
          <div style={{ flex: 1, marginLeft:"5vw" }}>
            {loading ? (
              <div>Loading posts...</div>
            ) : creatingNewPost ? (
              <></>
            ) : selectedPost ? (
              <SelectedPost post={selectedPost} onBack={() => setSelectedPost(null)} />
            ) : (
              <>
                <h4>Select a tip to see its details</h4>
              </>
            )}
          </div>
        </div>
      </SidebarInset>
      </SidebarProvider>




    </div>
  );
}
