import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export const Sidebar = () => {
  const { user, logout } = useAuth();

  const links = [
    { to: '/', label: 'Home Feed', icon: '🏠' },
    { to: '/chat', label: 'Chat & DMs', icon: '💬', badge: 'Active' },
    { to: '/notifications', label: 'Notifications', icon: '🔔' },
    { to: '/stories', label: 'Stories', icon: '✨' },
    { to: '/groups', label: 'Groups', icon: '👥' },
    { to: '/pages', label: 'Pages', icon: '📄' },
    { to: '/marketplace', label: 'Marketplace (₦)', icon: '🛍️' },
    { to: '/music', label: 'Naija Music', icon: '🎵' },
    { to: '/videos', label: 'Videos', icon: '🎬' },
    { to: '/events', label: 'Events & Meetups', icon: '📅' },
    { to: '/profile', label: 'My Profile', icon: '👤' },
    { to: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="desktop-only" style={{
      width: 'var(--sidebar-width)',
      position: 'sticky',
      top: 'var(--navbar-height)',
      height: 'calc(100vh - var(--navbar-height))',
      padding: '16px 8px',
      overflowY: 'auto',
      borderRight: '1px solid var(--border-light)'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              color: isActive ? 'var(--primary)' : 'var(--text-primary)',
              background: isActive ? 'var(--primary-light)' : 'transparent',
              fontWeight: isActive ? 700 : 500,
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'background 0.15s ease'
            })}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '18px' }}>{link.icon}</span>
              <span>{link.label}</span>
            </div>
            {link.badge && (
              <span className="badge badge-nigeria" style={{ fontSize: '10px' }}>
                {link.badge}
              </span>
            )}
          </NavLink>
        ))}

        {user && (
          <button
            onClick={logout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 16px',
              marginTop: '16px',
              borderRadius: 'var(--radius-md)',
              color: '#d93025',
              background: 'transparent',
              border: 'none',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <span style={{ fontSize: '18px' }}>🚪</span>
            <span>Sign Out</span>
          </button>
        )}
      </div>

      {/* Naija Flag Footer Badge */}
      <div style={{
        marginTop: '30px',
        padding: '14px',
        borderRadius: 'var(--radius-md)',
        background: 'linear-gradient(135deg, rgba(0,135,81,0.08) 0%, rgba(255,183,3,0.1) 100%)',
        border: '1px solid rgba(0,135,81,0.2)',
        fontSize: '12px',
        textAlign: 'center'
      }}>
        <div style={{ fontWeight: 700, color: 'var(--primary)' }}>🇳🇬 Nigeria Chat</div>
        <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>Owned by Eleojocafe</div>
      </div>
    </aside>
  );
};

export default Sidebar;
