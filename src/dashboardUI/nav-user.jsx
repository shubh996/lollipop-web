"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CircleUser,
  CreditCard,
  LogOut,
  Sparkles,
  X,
  Check,
  Pencil,
  Image as ImageIcon
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useEffect, useState, useRef } from "react"
import supabase from "../lib/supabaseClient"
import {  useNavigate } from "react-router-dom"

export function NavUser({ user, onUpdate }) {
  const { isMobile } = useSidebar()
  const [userData, setUserData] = useState(null)
  const [isEditingName, setIsEditingName] = useState(false)
  const [name, setName] = useState(user?.name || '')
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  console.log("user", user)

  useEffect(() => {
    if (isEditingName && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditingName])

  useEffect(() => {
    if (user?.name) {
      setName(user.name)
    }
  }, [user?.name])

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.from('users').select('*').eq('id', user?.id).single();
      setUserData(data)
    }
    fetchUser();
  }, [])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    } else {
      navigate('/login');
    }
  };

  const handleNameUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    const { data, error } = await supabase
      .from('users')
      .update({ name: name.trim() })
      .eq('id', user.id)
      .select()
      .single();

      console.log("data after name save", data)

    if (!error && data) {
      setUserData(data);
      if (onUpdate) onUpdate(data);
    }
    
    setIsEditingName(false);
  };

  const handleAvatarUpload = async (e) => {

    console.log("file", e.target.files[0])

    const file = e.target.files[0];
    if (!file) return;

    console.log('1. Checking file size');
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.log('File size should be less than 5MB');
      alert('File size should be less than 5MB');
      return;
    }

    setIsUploading(true);

    console.log('2. Checking if the avatars bucket exists');
    try {
    

       const fileName = `${Date.now()}_${file.name}`;
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('post-images')
            .upload(fileName, file);
      
          if (uploadError) {
            console.error('Image upload failed:', uploadError);
            alert('Image upload failed. Please try again.');
            return;
          }
      
          console.log("Image uploaded successfully:", uploadData);
      
          // 3. Get public image URL
          const {
            data: { publicUrl },
          } = supabase.storage.from('post-images').getPublicUrl(fileName);
      
          console.log("Public image URL:", publicUrl);

      console.log('6. Updating user\'s avatar URL in the database');
      // Update user's avatar URL in the database
      const { data, error: updateError } = await supabase
        .from('users')
        .update({ 
          profile_photo_url: publicUrl,
        })
        .eq('id', user.id)
        .select()
        .single();

      console.log('update data:', data);
      console.log('update error:', updateError);
      if (updateError) throw updateError;

      if (data) {
        setUserData(data);
        if (onUpdate) onUpdate(data);
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert(`Error uploading image: ${error.message}`);
    } finally {
      setIsUploading(false);
      e.target.value = ''; // Reset file input
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0"
            >
              <Avatar style={{width: 28, height: 28}} >
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback><CircleUser size={18} /></AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="relative group">
                  <Avatar 
                    className="h-8 w-8 rounded-lg cursor-pointer group-hover:opacity-80 transition-opacity"
                    onClick={triggerFileInput}
                  >
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>
                      {isUploading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <CircleUser size={18} />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleAvatarUpload(e)}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                  {isEditingName ? (
                    <div className="flex items-center gap-1">
                      <form onSubmit={handleNameUpdate} className="flex-1 flex items-center gap-1">
                        <input
                          ref={inputRef}
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="flex-1 bg-transparent outline-none border-b border-foreground/20 focus:border-primary px-1 py-0.5 text-sm"
                          onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                              e.preventDefault();
                              setIsEditingName(false);
                              setName(user?.name || '');
                            }
                          }}
                          autoFocus
                        />
                        <button 
                          type="submit"
                          className="p-1 hover:bg-accent rounded-full text-green-600 hover:text-green-700"
                          title="Save changes"
                        >
                          <Check size={16} />
                        </button>
                        <button 
                          type="button"
                          className="p-1 hover:bg-accent rounded-full text-red-600 hover:text-red-700"
                          onClick={() => {
                            setIsEditingName(false);
                            setName(user?.name || '');
                          }}
                          title="Cancel"
                        >
                          <X size={16} />
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="flex items-center group">
                      <span 
                        className="truncate font-medium hover:bg-accent/50 px-1.5 py-0.5 rounded cursor-pointer flex-1 min-w-0"
                        onClick={() => {
                          setIsEditingName(true);
                          setName(user?.name || '');
                        }}
                      >
                        {user?.name}
                      </span>
                      <button 
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-accent/50 text-muted-foreground"
                        onClick={() => {
                          setIsEditingName(true);
                          setName(user?.name || '');
                        }}
                        title="Edit name"
                      >
                        <Pencil size={14} />
                      </button>
                    </div>
                  )}
                  <span className="truncate text-xs text-muted-foreground px-1.5">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
