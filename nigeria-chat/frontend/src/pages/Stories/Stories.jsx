import React, { useState } from 'react';
import StoryViewer from '../../components/Story/StoryViewer';
import StoryCreate from '../../components/Story/StoryCreate';
import { getAvatarUrl } from '../../utils/formatters';
import useAuth from '../../hooks/useAuth';

export const Stories = () => {
  const { user } = useAuth();
  const [selectedStory, setSelectedStory] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const [stories, setStories] = useState([
    {
      id: 'st_1',
      media_url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800',
      caption: 'Cruising through Ikoyi Lagos! 🚗💨',
      author: {
        username: 'tunde_lagos',
        full_name: 'Babatunde Adeleke',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
      }
    },
    {
      id: 'st_2',
      media_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800',
      caption: 'Traditional wedding reception vibes in Enugu ✨',
      author: {
        username: 'chioma_ph',
        full_name: 'Chioma Okonkwo',
        avatar_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150'
      }
    }
  ]);

  const handleAdd = (newStory) => {
    setStories([
      {
        id: 'st_' + Date.now(),
        ...newStory,
        author: {
          username: 'eleojocafe',
          full_name: 'Eleojo Cafe',
          avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
        }
      },
      ...stories
    ]);
  };

  return (
    <div className="main-layout">
      <main className="content-area">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800 }}>Naija Stories ✨</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Photos and clips from the last 24 hours across Nigeria
            </p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="btn btn-primary"
            style={{ fontSize: '13px' }}
          >
            + Add Story
          </button>
        </div>

        {/* Story Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '12px'
        }}>
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => setSelectedStory(story)}
              style={{
                height: '240px',
                borderRadius: 'var(--radius-md)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <img
                src={story.media_url}
                alt="Story"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.8) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <img
                    src={getAvatarUrl(story.author)}
                    alt="Author"
                    className="avatar"
                    style={{ width: '30px', height: '30px', border: '2px solid var(--primary)' }}
                  />
                  <span style={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}>
                    {story.author?.username}
                  </span>
                </div>

                <div style={{ color: '#fff', fontSize: '12px', lineHeight: 1.2 }}>
                  {story.caption}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedStory && (
          <StoryViewer story={selectedStory} onClose={() => setSelectedStory(null)} />
        )}

        {showCreate && (
          <StoryCreate onSaveStory={handleAdd} onClose={() => setShowCreate(false)} />
        )}
      </main>
    </div>
  );
};

export default Stories;
