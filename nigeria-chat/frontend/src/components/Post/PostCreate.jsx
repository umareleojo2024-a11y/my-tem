import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { getAvatarUrl } from '../../utils/formatters';

export const PostCreate = ({ onPostCreated }) => {
  const { user, profile } = useAuth();
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('Lagos, Nigeria');
  const [mediaUrl, setMediaUrl] = useState('');
  const [showMediaInput, setShowMediaInput] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !mediaUrl) return;

    try {
      setSubmitting(true);
      const media = mediaUrl ? [{ url: mediaUrl, type: 'image' }] : [];
      await onPostCreated({ content, media, location });
      setContent('');
      setMediaUrl('');
      setShowMediaInput(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card" style={{ padding: '16px' }}>
      <div style={{ display: 'flex', gap: '12px' }}>
        <img
          src={getAvatarUrl(profile || user)}
          alt="Avatar"
          className="avatar"
          style={{ width: '42px', height: '42px' }}
        />
        <div style={{ flex: 1 }}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Wetin dey happen? Share your thoughts with Naija..."
            rows={3}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              resize: 'none',
              fontSize: '15px',
              background: 'transparent',
              color: 'var(--text-primary)'
            }}
          />

          {showMediaInput && (
            <div style={{ margin: '8px 0' }}>
              <input
                type="text"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="Paste Image URL (e.g. https://...)"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-main)',
                  color: 'var(--text-primary)',
                  fontSize: '13px'
                }}
              />
              {mediaUrl && (
                <div style={{ marginTop: '8px', position: 'relative' }}>
                  <img
                    src={mediaUrl}
                    alt="Preview"
                    style={{ maxHeight: '180px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                    onError={() => alert('Invalid image link')}
                  />
                </div>
              )}
            </div>
          )}

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '12px',
            marginTop: '8px'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setShowMediaInput(!showMediaInput)}
                className="btn btn-outline"
                style={{ padding: '6px 12px', fontSize: '12px' }}
              >
                📷 Photo
              </button>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-main)',
                  color: 'var(--text-secondary)',
                  fontSize: '12px'
                }}
              >
                <option value="Lagos, Nigeria">📍 Lagos</option>
                <option value="Abuja FCT, Nigeria">📍 Abuja</option>
                <option value="Port Harcourt, Nigeria">📍 Port Harcourt</option>
                <option value="Kano, Nigeria">📍 Kano</option>
                <option value="Ibadan, Nigeria">📍 Ibadan</option>
                <option value="Enugu, Nigeria">📍 Enugu</option>
                <option value="Diaspora">🌍 Diaspora</option>
              </select>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting || (!content.trim() && !mediaUrl)}
              className="btn btn-primary"
              style={{
                opacity: (!content.trim() && !mediaUrl) ? 0.6 : 1,
                padding: '6px 18px',
                fontSize: '13px'
              }}
            >
              {submitting ? 'Posting...' : 'Post 🇳🇬'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCreate;
