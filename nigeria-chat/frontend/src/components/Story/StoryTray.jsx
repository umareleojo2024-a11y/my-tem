import React from 'react';
import { getAvatarUrl } from '../../utils/formatters';

export const StoryTray = ({ stories, onSelectStory, onAddStory, user }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      overflowX: 'auto',
      padding: '4px 0 16px 0',
      marginBottom: '12px'
    }}>
      {/* Create story item */}
      <div
        onClick={onAddStory}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          width: '72px'
        }}
      >
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: '2px dashed var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--primary-light)',
          fontSize: '24px',
          color: 'var(--primary)',
          fontWeight: 'bold'
        }}>
          +
        </div>
        <span style={{ fontSize: '11px', marginTop: '4px', textAlign: 'center', fontWeight: 600 }}>
          Your Story
        </span>
      </div>

      {/* Existing stories */}
      {stories.map((story) => (
        <div
          key={story.id}
          onClick={() => onSelectStory(story)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            width: '72px'
          }}
        >
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            padding: '2px',
            background: 'linear-gradient(45deg, #008751, #ffb703, #008751)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img
              src={getAvatarUrl(story.author)}
              alt={story.author?.username}
              className="avatar"
              style={{
                width: '56px',
                height: '56px',
                border: '2px solid var(--bg-surface)'
              }}
            />
          </div>
          <span style={{
            fontSize: '11px',
            marginTop: '4px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '68px'
          }}>
            {story.author?.username}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StoryTray;
