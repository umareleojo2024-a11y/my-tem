import React, { useState } from 'react';

export const StoryCreate = ({ onSaveStory, onClose }) => {
  const [mediaUrl, setMediaUrl] = useState('');
  const [caption, setCaption] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mediaUrl) return;
    onSaveStory({ media_url: mediaUrl, caption });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '14px' }}>
          Add to Your Naija Story ✨
        </h3>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Image URL:
            </label>
            <input
              type="text"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              required
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                background: 'var(--bg-main)',
                fontSize: '14px',
                marginTop: '4px'
              }}
            />
          </div>

          {mediaUrl && (
            <img
              src={mediaUrl}
              alt="Preview"
              style={{ maxHeight: '180px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
            />
          )}

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Caption:
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What's the vibe today?"
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                background: 'var(--bg-main)',
                fontSize: '14px',
                marginTop: '4px'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
            <button type="button" onClick={onClose} className="btn btn-outline" style={{ fontSize: '13px' }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ fontSize: '13px' }}>
              Share Story 🇳🇬
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoryCreate;
