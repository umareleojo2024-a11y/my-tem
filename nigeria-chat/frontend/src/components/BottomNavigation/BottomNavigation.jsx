import React from 'react';
import { NavLink } from 'react-router-dom';

export const BottomNavigation = () => {
  const tabs = [
    { to: '/', label: 'Feed', icon: '🏠' },
    { to: '/chat', label: 'Chat', icon: '💬' },
    { to: '/stories', label: 'Stories', icon: '✨' },
    { to: '/marketplace', label: 'Market', icon: '🛍️' },
    { to: '/notifications', label: 'Alerts', icon: '🔔' },
    { to: '/profile', label: 'Me', icon: '👤' },
  ];

  return (
    <nav className="mobile-only" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: 'var(--bottom-nav-height)',
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-light)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 100,
      boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)'
    }}>
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            height: '100%',
            color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
            fontWeight: isActive ? 700 : 500,
            fontSize: '11px',
            textDecoration: 'none',
            gap: '2px'
          })}
        >
          <span style={{ fontSize: '20px', lineHeight: 1 }}>{tab.icon}</span>
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNavigation;
