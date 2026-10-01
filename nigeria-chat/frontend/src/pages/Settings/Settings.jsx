import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { isSupabaseConfigured } from '../../services/supabase';

export const Settings = () => {
  const { user, profile } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const supabaseConnected = isSupabaseConfigured();

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  return (
    <div className="main-layout">
      <main className="content-area">
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800 }}>Settings ⚙️</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Manage preferences, connections, and app configurations
          </p>
        </div>

        {/* Supabase Connection Status */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Supabase Database & Realtime</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Status: {supabaseConnected ? '🟢 Connected to Live Supabase' : '🟡 Active in Development / Demo Mode'}
              </p>
            </div>
            <span className={`badge ${supabaseConnected ? 'badge-nigeria' : ''}`} style={{ padding: '6px 12px' }}>
              {supabaseConnected ? 'Live' : 'Dev Mode'}
            </span>
          </div>

          <div style={{
            marginTop: '14px',
            padding: '12px',
            background: 'var(--bg-main)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12px',
            color: 'var(--text-secondary)'
          }}>
            <strong>Connecting your Supabase project:</strong>
            <ol style={{ paddingLeft: '18px', marginTop: '6px', lineHeight: 1.6 }}>
              <li>Copy <code>supabase/schema.sql</code>, <code>policies.sql</code>, and <code>storage.sql</code> into your Supabase SQL Editor.</li>
              <li>Provide your Project URL & Anon Key in <code>frontend/.env</code>:</li>
              <code style={{ display: 'block', margin: '4px 0', background: 'var(--border-subtle)', padding: '4px 8px', borderRadius: '4px' }}>
                VITE_SUPABASE_URL=https://your-project.supabase.co<br />
                VITE_SUPABASE_ANON_KEY=your-anon-key
              </code>
            </ol>
          </div>
        </div>

        {/* Appearance & Theme */}
        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Appearance</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>Dark Theme</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Enable high-contrast night mode
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="btn btn-outline"
              style={{ fontSize: '13px', padding: '6px 14px' }}
            >
              {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Notifications</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>Real-time Push Alerts</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Get notified when you receive messages or mentions
              </div>
            </div>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              style={{ width: '20px', height: '20px', accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Ownership and Platform Info */}
        <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
          <img
            src="/logo/nigeria_chat_logo.svg"
            alt="Nigeria Chat"
            style={{ width: '48px', height: '48px', margin: '0 auto 8px auto', display: 'block' }}
          />
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>
            Nigeria Chat v1.0.0
          </h3>
          <p style={{ fontSize: '13px', fontWeight: 600, marginTop: '2px' }}>
            Owned and Designed by Eleojocafe
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Full-Stack React + Node.js + Supabase + Android Capacitor Architecture
          </p>
        </div>
      </main>
    </div>
  );
};

export default Settings;
