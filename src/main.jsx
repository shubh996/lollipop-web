import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RootApp from './RootApp.jsx'
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsGenerator from './NewsGenerator.jsx';

import Login from './Login.jsx';
import UserPosts from './UserPosts.jsx';
import SinglePost from './SinglePost.jsx';
import Page from './analysts/Page.jsx';
import TipScreen from './TipScreen.jsx';
import TipDetail from './TipDetail.jsx';
import ProfileScreen from './ProfileScreen.jsx';
import TipDetailCard from './components/TipDetailCard.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<RootApp />} />
        <Route path="/tips" element={<TipScreen />} />
        <Route path="/tip" element={<TipDetailCard />} />
        <Route path="/profile/:userId" element={<ProfileScreen />} />
        <Route path="/headline-to-news" element={<NewsGenerator />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Page  />} />
        <Route path="/user/:userId" element={<UserPosts />} />
        <Route path="/user/:userId/post/:postId" element={<UserPosts />} />
        <Route path="/post/:postId" element={<SinglePost />} />
      </Routes>
    </Router>
    <Toaster richColors />
  </StrictMode>,
)
