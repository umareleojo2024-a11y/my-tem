import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import BottomNavigation from './components/BottomNavigation/BottomNavigation';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Chat from './pages/Chat/Chat';
import Notifications from './pages/Notifications/Notifications';
import Stories from './pages/Stories/Stories';
import Groups from './pages/Groups/Groups';
import Pages from './pages/Pages/Pages';
import Marketplace from './pages/Marketplace/Marketplace';
import Music from './pages/Music/Music';
import Videos from './pages/Videos/Videos';
import Events from './pages/Events/Events';
import Settings from './pages/Settings/Settings';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isChatPage = location.pathname === '/chat';

  return (
    <div className="app-container">
      {!isAuthPage && <Navbar />}
      <div style={{ display: 'flex', flex: 1 }}>
        {!isAuthPage && !isChatPage && <Sidebar />}
        <div style={{ flex: 1, minWidth: 0 }}>
          {children}
        </div>
      </div>
      {!isAuthPage && <BottomNavigation />}
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/pages" element={<Pages />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/music" element={<Music />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/events" element={<Events />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
