"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { ArchiveX, Command, File, Inbox, Send, Trash2, Plus, Lock } from "lucide-react"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import supabase from '@/lib/supabaseClient';
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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { NavUser } from "./nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"

function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return 'just now';
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }
  return 'just now';
}

export function AppSidebar({ posts = [], onSelectPost, selectedPost, user, onNewPost, creatingNewPost, newPost, onNewPostChange, onCancelNewPost, submitting, onSubmitNewPost, onSubmitNewPostAndNew, onNewPostImageUpload, ...props }) {
  // Sidebar navigation items (can be customized)
  const navMain = [
    {
      title: "Posts",
      url: "#",
      icon: Inbox,
      isActive: true,
    },
  ];
  const [activeItem, setActiveItem] = React.useState(navMain[0]);
  const { setOpen } = useSidebar();
  const [deletingId, setDeletingId] = React.useState(null);
  const [localPosts, setLocalPosts] = React.useState(posts);
  const [search, setSearch] = React.useState("");
  const [showTypeDropdown, setShowTypeDropdown] = useState("Buy");
  const [pendingType, setPendingType] = useState('');


  React.useEffect(() => {
    setLocalPosts(posts);
  }, [posts]);

  // Filter posts by search
  const filteredPosts = search.trim()
    ? localPosts.filter(
        (post) =>
          post.headline?.toLowerCase().includes(search.toLowerCase()) ||
          post.summary?.toLowerCase().includes(search.toLowerCase())
      )
    : localPosts;

  async function handleDelete(postId) {
    const { error } = await supabase.from('posts').delete().eq('id', postId);
    if (!error) {
      setLocalPosts((prev) => prev.filter((p) => p.id !== postId));
      if (selectedPost && selectedPost.id === postId && onSelectPost) {
        onSelectPost(null);
      }
    } else {
      alert('Failed to delete post.');
    }
    setDeletingId(null);
  }

  const handlePlusClick = () => {
    setShowTypeDropdown(true);
  };

  const handleTypeSelect = (val) => {
    setShowTypeDropdown(false);
    setPendingType('');
    onNewPost(val); // pass selected type to parent
  };

  return (
    <Sidebar style={{backgroundColor: "#FFF"}}
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* Plus button for new post creation with dropdown */}
      {!creatingNewPost && (
        <div className="flex items-center justify-center p-2" style={{ borderBottom: '1px solid #eee', background: '#EEE', marginTop: -100 }}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="New Post">
                <Plus className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">

            <DropdownMenuLabel style={{padding:5, backgroundColor:"#EEE", 
              fontWeight:"bold", borderRadius:"5px", margin:5}}>Select Category</DropdownMenuLabel>

              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => onNewPost('stocks', '')}>
                  <div className="flex items-center gap-2">
                    <Inbox className="w-4 h-4" />
                    <span>Stocks</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    toast.info('Crypto analysis is coming soon!');
                  }}
                  className="opacity-50 cursor-not-allowed"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Command className="w-4 h-4" />
                      <span>Crypto</span>
                    </div>
                    <Lock className="w-3 h-3 text-muted-foreground" />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    toast.info('Commodities analysis is coming soon!');
                  }}
                  className="opacity-50 cursor-not-allowed"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <ArchiveX className="w-4 h-4" />
                      <span>Commodities</span>
                    </div>
                    <Lock className="w-3 h-3 text-muted-foreground" />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    toast.info('Forex analysis is coming soon!');
                  }}
                  className="opacity-50 cursor-not-allowed"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      <span>Forex</span>
                    </div>
                    <Lock className="w-3 h-3 text-muted-foreground" />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* If creating new post, show form instead of post list */}
      {creatingNewPost ? (
      
      <div style={{margin:20, }}>
            
            
            <div>New Post</div>
            
            <div style={{fontSize:14, color:"#666", marginBottom:40,
            borderBottom:"1px solid #CCC", paddingBottom:10


            }}>Fill in the details to create a new post.</div>

       
            <div style={{marginTop: 20}}>
             
            </div>

            <div style={{display:"flex", gap:10, flexDirection:"row", justifyContent:"space-between",alignItems:"center", marginTop: 10}}>
              <div className="flex-1">
                <Label htmlFor="symbol1">Stock 1</Label>
                <Input
                  id="symbol1"
                  placeholder="e.g. RELIANCE"
                  value={newPost.stock1}
                  onChange={e => onNewPostChange('stock1', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="symbol2">Stock 2 (optional)</Label>
                <Input
                  id="symbol2"
                  placeholder="e.g. TCS"
                  value={newPost.stock2}
                  onChange={e => onNewPostChange('stock2', e.target.value)}
                  className="mt-1"
                />  
              </div>
            </div>

            {/* Image upload */}
            <div style={{marginTop:20}}>
        

<div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="picture">Picture</Label>
              <Input 
              
              id="image"
                type="file"
                accept="image/*"
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    onNewPostImageUpload(e.target.files[0]);
                  }
                }}
              />
            </div>
             
            </div>
            

           


            <div style={{marginTop:20}}>
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                placeholder="Enter stock analysis headline..."
                value={newPost.headline}
                onChange={e => onNewPostChange('headline', e.target.value)}
                className="mt-1"
              />
            </div>


            <div style={{marginTop:20}}>
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                placeholder="Summary"
                value={newPost.summary}
                onChange={e => onNewPostChange('summary', e.target.value)}
                className="mt-1"
              />
            </div>


            <div style={{marginTop:20}}>
              <Label htmlFor="investmentTip">Investment Tip</Label>
              <Textarea
                id="investmentTip"
                placeholder="Investment Tip"
                value={newPost.investmentTip}
                onChange={e => onNewPostChange('investmentTip', e.target.value)}
                className="mt-1"
              />
            </div>


            <div style={{marginTop:20}} className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="post_type">Post Type</Label>
                <Select style={{width:"100%",}} value={newPost.post_type} onValueChange={val => onNewPostChange('post_type', val)}>
                  <SelectTrigger id="post_type" className="mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buy">Buy</SelectItem>
                    <SelectItem value="sell">Sell</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label htmlFor="post_strategy">Strategy</Label>
                <Select
                  style={{width:"100%",}}
                  value={newPost.post_strategy || ''}
                  onValueChange={val => onNewPostChange('post_strategy', val)}
                  disabled={!newPost.post_type}
                >
                  <SelectTrigger id="post_strategy" className="mt-1">
                    <SelectValue placeholder="Select strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    {newPost.post_type === 'buy' && (
                      <>
                        <SelectItem value="buy_and_hold">Buy and Hold</SelectItem>
                        <SelectItem value="buy_short_term">Buy - Short Term</SelectItem>
                        <SelectItem value="buy_on_dip">Buy on Dip</SelectItem>
                        <SelectItem value="buy_breakout">Buy Breakout</SelectItem>
                        <SelectItem value="buy_momentum">Buy Momentum</SelectItem>
                      </>
                    )}
                    {newPost.post_type === 'sell' && (
                      <>
                        <SelectItem value="sell_take_profit">Sell - Take Profit</SelectItem>
                        <SelectItem value="sell_stop_loss">Sell - Stop Loss</SelectItem>
                        <SelectItem value="sell_on_news">Sell on News</SelectItem>
                        <SelectItem value="sell_resistance">Sell Resistance</SelectItem>
                        <SelectItem value="sell_trailing_stop">Sell Trailing Stop</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>


            <div style={{display:"flex", gap:10, justifyContent:"flex-end", 
            flexDirection:"row", justifyContent:"space-between",alignItems:"center",
position:"absolute", bottom:10, right:10
            }}>
              <Button variant="outline"  onClick={onCancelNewPost} type="button">Cancel</Button>
              <Button variant="default" onClick={onSubmitNewPost} disabled={submitting} type="button">
                {submitting ? 'Submitting...' : 'Submit'}
              </Button>
              <Button variant="secondary" onClick={onSubmitNewPostAndNew} disabled={submitting} type="button">
                {submitting ? 'Submitting...' : 'Submit and New'}
              </Button>
            </div>


            </div>
       
      ) : (
        <Sidebar collapsible="none" className="hidden flex-1 md:flex" style={{backgroundColor: "#FFF"}}>
          <SidebarHeader className="gap-3.5 border-b p-4">
            <div className="flex w-full items-center justify-between">
              <div className="text-foreground text-base font-medium">
                {activeItem?.title}
              </div>
            </div>
            <SidebarInput
              placeholder="Type to search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup className="px-0" style={{backgroundColor: "#FFF"}}>
              <SidebarGroupContent>
                {
                  filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className={`hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center gap-3 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0 cursor-pointer ${selectedPost?.id === post.id ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
                      onClick={() => onSelectPost && onSelectPost(post)}
                    >
                      <Avatar className="w-8 h-8 mr-2">
                        {post.image_url ? (
                          <AvatarImage src={post.image_url} alt={post.headline} />
                        ) : (
                          <AvatarFallback>{post.headline?.[0] || '?'}</AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="font-medium truncate">{post.headline}</div>
                        <div className="text-xs text-muted-foreground truncate">{timeAgo(post.created_at)}</div>
                      </div>
                      <AlertDialog open={deletingId === post.id} onOpenChange={open => setDeletingId(open ? post.id : null)}>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); setDeletingId(post.id); }}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Post?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this post? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDeletingId(null)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(post.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ))
                }
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter style={{padding:10, paddingTop:12.5, paddingBottom:12.5,  borderTop: "1px solid #CCC"}}>
            <NavUser user={user}  />
          </SidebarFooter>
        </Sidebar>
      )}
    </Sidebar>
  );
}
