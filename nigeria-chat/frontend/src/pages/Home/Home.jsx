import React, { useState } from 'react';
import usePosts from '../../hooks/usePosts';
import useAuth from '../../hooks/useAuth';
import StoryTray from '../../components/Story/StoryTray';
import StoryViewer from '../../components/Story/StoryViewer';
import StoryCreate from '../../components/Story/StoryCreate';
import PostCreate from '../../components/Post/PostCreate';
import PostCard from '../../components/Post/PostCard';
import Spinner from '../../components/Loading/Spinner';

export const Home = () => {
  const { user } = useAuth();
  const { posts, loading, error, addPost, toggleLike } = usePosts();
  const [selectedStory, setSelectedStory] = useState(null);
  const [showStoryCreate, setShowStoryCreate] = useState(false);

  const [stories, setStories] = useState([
    {
      id: 's1',
      media_url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800',
      caption: 'Lekki toll gate sunsets 🌅 #LagosVibes',
      author: {
        username: 'tunde_lagos',
        full_name: 'Babatunde Adeleke',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
      }
    },
    {
      id: 's2',
      media_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800',
      caption: 'Kano art exhibition opening today! 🎨',
      author: {
        username: 'amina_kano',
        full_name: 'Amina Yusuf',
        avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
      }
    },
    {
      id: 's3',
      media_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
      caption: 'Abuja tech founders meetup in progress 🇳🇬🚀',
      author: {
        username: 'eleojocafe',
        full_name: 'Eleojo Cafe',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      }
    }
  ]);

  const handleSaveStory = (newStory) => {
    setStories([
      {
        id: 's_' + Date.now(),
        ...newStory,
        author: {
          username: user?.user_metadata?.username || 'eleojocafe',
          full_name: user?.user_metadata?.full_name || 'Eleojo Cafe',
          avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
        }
      },
      ...stories
    ]);
  };

  return (
    <div className="main-layout">
      {/* Center Feed */}
      <main className="content-area">
        {/* Stories Bar */}
        <StoryTray
          stories={stories}
          onSelectStory={(s) => setSelectedStory(s)}
          onAddStory={() => setShowStoryCreate(true)}
          user={user}
        />

        {/* Story Modals */}
        {selectedStory && (
          <StoryViewer story={selectedStory} onClose={() => setSelectedStory(null)} />
        )}

        {showStoryCreate && (
          <StoryCreate onSaveStory={handleSaveStory} onClose={() => setShowStoryCreate(false)} />
        )}

        {/* Post Creation Box */}
        <PostCreate onPostCreated={addPost} />

        {/* Feed List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spinner size="32px" />
            <div style={{ marginTop: '10px', color: 'var(--text-muted)', fontSize: '14px' }}>
              Loading Nigeria Chat feed...
            </div>
          </div>
        ) : error ? (
          <div className="card" style={{ padding: '20px', color: '#dc2626', background: '#fee2e2' }}>
            ⚠️ Error: {error}
          </div>
        ) : posts.length === 0 ? (
          <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '8px' }}>🇳🇬</div>
            <h3>No posts yet</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px' }}>
              Be the first to share an update with the Nigeria Chat community!
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} onLikeToggle={toggleLike} />
          ))
        )}
      </main>

      {/* Right Sidebar: Trending Naija & Community Spotlight */}
      <aside className="right-sidebar">
        {/* Trending card */}
        <div className="card" style={{ padding: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🔥 Trending in Nigeria</span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Entertainment • Trending</div>
              <div style={{ fontWeight: 700 }}>#AfrobeatsGrammy</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>42.5K Posts</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Tech & Innovation</div>
              <div style={{ fontWeight: 700 }}>#NigeriaChat</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>Owned by Eleojocafe • 18.2K Posts</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Sports • Naija</div>
              <div style={{ fontWeight: 700 }}>#SuperEagles</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>31.9K Posts</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Business • Market</div>
              <div style={{ fontWeight: 700 }}>#NairaMarket</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>12.4K Posts</div>
            </div>
          </div>
        </div>

        {/* Suggested Friends */}
        <div className="card" style={{ padding: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '12px' }}>
            People You May Know
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150"
                  alt="Chioma"
                  className="avatar"
                  style={{ width: '36px', height: '36px' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px' }}>Chioma Okonkwo</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Port Harcourt • Events</div>
                </div>
              </div>
              <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '11px' }}>
                + Add
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
                  alt="Amina"
                  className="avatar"
                  style={{ width: '36px', height: '36px' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px' }}>Amina Yusuf</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Kano • Digital Art</div>
                </div>
              </div>
              <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '11px' }}>
                + Add
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Home;
