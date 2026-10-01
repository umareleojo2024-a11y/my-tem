import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { getAvatarUrl } from '../../utils/formatters';

export const Navbar = () => {
  const { user, profile, logout } = useAuth();
  const location = useLocation();

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 'var(--navbar-height)',
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-light)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      zIndex: 100,
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Brand & Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img 
          src="/logo/nigeria_chat_logo.svg" 
          alt="Nigeria Chat Logo" 
          style={{ width: '36px', height: '36px', borderRadius: '10px' }} 
        />
        <div>
          <div style={{ fontWeight: 800, fontSize: '18px', color: 'var(--primary)', lineHeight: 1.1 }}>
            Nigeria Chat
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 600 }}>
            Owned by Eleojocafe
          </div>
        </div>
      </Link>

      {/* Global Search Bar (Hidden on tiny screens) */}
      <div className="desktop-only" style={{ flex: 1, maxWidth: '360px', margin: '0 20px' }}>
        <input
          type="text"
          placeholder="Search people, #topics, or marketplace..."
          style={{
            width: '100%',
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-light)',
            background: 'var(--bg-main)',
            color: 'var(--text-primary)',
            fontSize: '14px',
            outline: 'none'
          }}
        />
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Link 
          to="/chat" 
          className="btn btn-secondary" 
          style={{ padding: '6px 12px', fontSize: '13px' }}
          title="Direct Messages"
        >
          💬 <span className="desktop-only">Chat</span>
        </Link>

        <Link 
          to="/notifications" 
          className="btn btn-outline" 
          style={{ padding: '6px 12px', fontSize: '13px' }}
          title="Notifications"
        >
          🔔 <span className="desktop-only">Alerts</span>
        </Link>

        {user ? (
          <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              src={getAvatarUrl(profile || user)}
              alt="Profile"
              className="avatar"
              style={{ width: '34px', height: '34px', border: '2px solid var(--primary)' }}
            />
          </Link>
        ) : (
          <Link to="/login" className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '13px' }}>
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
