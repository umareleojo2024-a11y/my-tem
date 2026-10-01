import React, { useState } from 'react';
import { getAvatarUrl } from '../../utils/formatters';

export const ProfileHeader = ({ profile, isOwnProfile, onUpdateProfile }) => {
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(profile?.bio || '');
  const [stateOfOrigin, setStateOfOrigin] = useState(profile?.state_of_origin || 'Lagos');
  const [city, setCity] = useState(profile?.city || 'Lagos');

  const handleSave = async () => {
    if (onUpdateProfile) {
      await onUpdateProfile({ bio, state_of_origin: stateOfOrigin, city });
    }
    setEditing(false);
  };

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      {/* Cover Banner */}
      <div style={{
        height: '180px',
        background: profile?.cover_url ? `url(${profile.cover_url}) center/cover` : 'linear-gradient(135deg, #008751 0%, #004d2e 100%)',
        position: 'relative'
      }} />

      {/* Profile Details Container */}
      <div style={{ padding: '0 20px 20px 20px', position: 'relative' }}>
        {/* Avatar & Actions Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginTop: '-50px',
          marginBottom: '16px'
        }}>
          <img
            src={getAvatarUrl(profile)}
            alt={profile?.full_name}
            className="avatar"
            style={{
              width: '100px',
              height: '100px',
              border: '4px solid var(--bg-surface)',
              boxShadow: 'var(--shadow-md)',
              background: '#fff'
            }}
          />

          {isOwnProfile && (
            <button
              onClick={() => setEditing(!editing)}
              className="btn btn-outline"
              style={{ fontSize: '13px', padding: '6px 16px' }}
            >
              {editing ? 'Cancel' : 'Edit Profile'}
            </button>
          )}
        </div>

        {/* Name and Handle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>
            {profile?.full_name || 'Naija User'}
          </h1>
          {profile?.is_verified && (
            <span style={{ color: 'var(--primary)', fontSize: '18px' }} title="Verified User">
              ✓
            </span>
          )}
          <span className="badge badge-nigeria" style={{ marginLeft: 'auto' }}>
            🇳🇬 {profile?.state_of_origin || 'Nigeria'}
          </span>
        </div>

        <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
          @{profile?.username || 'username'}
        </div>

        {/* Bio */}
        {editing ? (
          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell Naija about yourself..."
              rows={3}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                background: 'var(--bg-main)',
                color: 'var(--text-primary)',
                fontSize: '14px'
              }}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City (e.g. Ikeja, Abuja)"
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-main)',
                  fontSize: '13px'
                }}
              />
              <button onClick={handleSave} className="btn btn-primary" style={{ padding: '6px 18px', fontSize: '13px' }}>
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <p style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '16px' }}>
            {profile?.bio || 'Proudly Nigerian. Welcome to my space on Nigeria Chat! 🇳🇬✨'}
          </p>
        )}

        {/* Location & Meta info */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
          <div>📍 {profile?.city || 'Lagos'}, {profile?.state_of_origin || 'Nigeria'}</div>
          <div>👥 420 Followers</div>
          <div>🔗 Following 180</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
