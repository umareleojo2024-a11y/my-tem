import React, { useEffect, useState } from 'react';
import { getAvatarUrl } from '../../utils/formatters';

export const StoryViewer = ({ story, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!story) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onClose();
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [story, onClose]);

  if (!story) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.92)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        height: '90vh',
        maxHeight: '750px',
        background: '#111',
        borderRadius: 'var(--radius-lg)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Progress Bar */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '12px',
          height: '3px',
          background: 'rgba(255,255,255,0.3)',
          borderRadius: '2px',
          zIndex: 10
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: '#008751',
            borderRadius: '2px',
            transition: 'width 0.1s linear'
          }} />
        </div>

        {/* Header */}
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '16px',
          right: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10,
          color: '#fff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              src={getAvatarUrl(story.author)}
              alt="Author"
              className="avatar"
              style={{ width: '34px', height: '34px', border: '1px solid #fff' }}
            />
            <span style={{ fontWeight: 700, fontSize: '14px' }}>
              {story.author?.full_name || story.author?.username}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(0,0,0,0.5)',
              border: 'none',
              color: '#fff',
              fontSize: '18px',
              cursor: 'pointer',
              borderRadius: '50%',
              width: '32px',
              height: '32px'
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={story.media_url}
            alt="Story"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Caption */}
        {story.caption && (
          <div style={{
            padding: '16px',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
            color: '#fff',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {story.caption}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryViewer;
