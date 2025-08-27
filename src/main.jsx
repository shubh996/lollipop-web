import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RootApp from './RootApp.jsx'
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsGenerator from './NewsGenerator.jsx';
import Story from './story.jsx';

import Login from './Login.jsx';
import UserPosts from './UserPosts.jsx';
import SinglePost from './SinglePost.jsx';
import Page from './analysts/page.jsx';
import TipScreen from './TipScreen.jsx';
import TipDetail from './TipDetail.jsx';
import ProfileScreen from './ProfileScreen.jsx';
import TipDetailCard from './components/TipDetailCard.jsx';
import PPT from './ppt.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Story />} />
        <Route path="/tips" element={<TipScreen />} />
        <Route path="/tip" element={<TipDetailCard />} />
        <Route path="/profile/:userId" element={<ProfileScreen />} />
        <Route path="/headline-to-news" element={<NewsGenerator />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Page  />} />
        <Route path="/story" element={<Story />} />
        <Route path="/ppt" element={<PPT />} />

        <Route path="/user/:userId" element={<UserPosts />} />
        <Route path="/user/:userId/post/:postId" element={<UserPosts />} />
        <Route path="/post/:postId" element={<SinglePost />} />
      </Routes>
    </Router>
    <Toaster richColors />
  </StrictMode>,
)
