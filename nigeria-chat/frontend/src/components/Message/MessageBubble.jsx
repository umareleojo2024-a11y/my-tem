import React from 'react';
import { formatRelativeTime } from '../../utils/formatters';

export const MessageBubble = ({ message, isSelf, onReply }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: isSelf ? 'flex-end' : 'flex-start',
      marginBottom: '10px',
      position: 'relative'
    }}>
      {/* Replied Message Preview */}
      {message.reply_to && (
        <div style={{
          fontSize: '11px',
          background: isSelf ? 'rgba(0, 135, 81, 0.15)' : 'rgba(0, 0, 0, 0.05)',
          borderLeft: '3px solid var(--primary)',
          padding: '4px 8px',
          borderRadius: '4px',
          marginBottom: '2px',
          maxWidth: '75%',
          color: 'var(--text-secondary)'
        }}>
          Replying: {message.reply_to.message_text || 'Attachment'}
        </div>
      )}

      {/* Main Message Bubble */}
      <div style={{
        maxWidth: '80%',
        padding: '10px 14px',
        borderRadius: isSelf ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        backgroundColor: isSelf ? 'var(--bg-bubble-self)' : 'var(--bg-bubble-other)',
        color: isSelf ? 'var(--text-bubble-self)' : 'var(--text-bubble-other)',
        boxShadow: 'var(--shadow-sm)',
        wordBreak: 'break-word',
        position: 'relative'
      }}>
        {/* Media Preview */}
        {message.media_url && (
          <div style={{ marginBottom: '6px' }}>
            {message.media_type === 'image' && (
              <img
                src={message.media_url}
                alt="Chat attachment"
                style={{ maxWidth: '100%', maxHeight: '240px', borderRadius: '10px', display: 'block' }}
                loading="lazy"
              />
            )}
            {message.media_type === 'video' && (
              <video
                src={message.media_url}
                controls
                style={{ maxWidth: '100%', maxHeight: '240px', borderRadius: '10px' }}
              />
            )}
            {message.media_type === 'audio' && (
              <audio src={message.media_url} controls style={{ width: '220px', height: '40px' }} />
            )}
          </div>
        )}

        {/* Message Text */}
        {message.message_text && (
          <div style={{ fontSize: '14px', lineHeight: 1.4 }}>
            {message.message_text}
          </div>
        )}

        {/* Timestamp & Status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '4px',
          fontSize: '10px',
          marginTop: '4px',
          opacity: 0.8
        }}>
          <span>{formatRelativeTime(message.created_at)}</span>
          {isSelf && (
            <span>{message.is_read ? '✓✓' : '✓'}</span>
          )}
        </div>
      </div>

      {/* Reply Action Trigger */}
      <button
        onClick={() => onReply(message)}
        title="Reply to message"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '11px',
          color: 'var(--text-muted)',
          marginTop: '2px',
          padding: '2px 4px'
        }}
      >
        ↩ Reply
      </button>
    </div>
  );
};

export default MessageBubble;
