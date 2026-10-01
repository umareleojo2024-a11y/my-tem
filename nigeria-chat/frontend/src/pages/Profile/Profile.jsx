import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import usePosts from '../../hooks/usePosts';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import PostCard from '../../components/Post/PostCard';

export const Profile = () => {
  const { user, profile, setProfile } = useAuth();
  const { posts, toggleLike } = usePosts();
  const [activeTab, setActiveTab] = useState('posts');

  const myPosts = posts.filter(
    (p) => p.author?.id === user?.id || p.author?.username === (profile?.username || 'eleojocafe')
  );

  const handleUpdate = (updatedData) => {
    setProfile((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <div className="main-layout">
      <main className="content-area" style={{ maxWidth: '800px' }}>
        <ProfileHeader
          profile={profile || user}
          isOwnProfile={true}
          onUpdateProfile={handleUpdate}
        />

        {/* Profile Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-light)',
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
          marginBottom: '16px'
        }}>
          {['posts', 'media', 'friends'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '12px',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab ? '3px solid var(--primary)' : '3px solid transparent',
                color: activeTab === tab ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: activeTab === tab ? 700 : 500,
                fontSize: '14px',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'posts' && (
          <div>
            {myPosts.length === 0 ? (
              <div className="card" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
                You haven't posted anything yet. Share your thoughts with Nigeria Chat!
              </div>
            ) : (
              myPosts.map((post) => (
                <PostCard key={post.id} post={post} onLikeToggle={toggleLike} />
              ))
            )}
          </div>
        )}

        {activeTab === 'media' && (
          <div className="card" style={{ padding: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>
              Photos & Media 📷
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '8px'
            }}>
              <img
                src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=400"
                alt="Media item"
                style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
              />
              <img
                src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400"
                alt="Media item"
                style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
              />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400"
                alt="Media item"
                style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
              />
            </div>
          </div>
        )}

        {activeTab === 'friends' && (
          <div className="card" style={{ padding: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>
              My Naija Network 🇳🇬
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
                    alt="Tunde"
                    className="avatar"
                    style={{ width: '40px', height: '40px' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>Babatunde Adeleke</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>@tunde_lagos • Lagos</div>
                  </div>
                </div>
                <button className="btn btn-outline" style={{ fontSize: '12px', padding: '4px 12px' }}>
                  Message
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150"
                    alt="Chioma"
                    className="avatar"
                    style={{ width: '40px', height: '40px' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>Chioma Okonkwo</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>@chioma_ph • Rivers</div>
                  </div>
                </div>
                <button className="btn btn-outline" style={{ fontSize: '12px', padding: '4px 12px' }}>
                  Message
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
