import React, { useState } from 'react';
import { formatRelativeTime, getAvatarUrl } from '../../utils/formatters';

export const ConversationList = ({
  conversations,
  activeConversation,
  onSelectConversation,
  loading,
  onNewChat
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = conversations.filter(c => {
    const name = c.title || c.recipient?.full_name || c.recipient?.username || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid var(--border-light)',
      background: 'var(--bg-surface)'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
          Messages 🇳🇬
        </h2>
        <button
          onClick={onNewChat}
          className="btn btn-secondary"
          style={{ padding: '6px 12px', fontSize: '12px' }}
        >
          + New Chat
        </button>
      </div>

      {/* Search Input */}
      <div style={{ padding: '10px 16px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search conversations..."
          style={{
            width: '100%',
            padding: '8px 14px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-light)',
            background: 'var(--bg-main)',
            color: 'var(--text-primary)',
            fontSize: '13px',
            outline: 'none'
          }}
        />
      </div>

      {/* Conversation Items */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading conversations...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '30px 16px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>💬</div>
            <div style={{ fontWeight: 600 }}>No conversations yet</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Start a new conversation with friends or join Naija Tech Hub!
            </div>
            <button
              onClick={onNewChat}
              className="btn btn-primary"
              style={{ marginTop: '12px', padding: '6px 16px', fontSize: '13px' }}
            >
              Start Chatting
            </button>
          </div>
        ) : (
          filtered.map((conv) => {
            const isActive = activeConversation?.id === conv.id;
            const displayName = conv.title || conv.recipient?.full_name || conv.recipient?.username || 'Chat';
            const avatar = conv.group_avatar_url || getAvatarUrl(conv.recipient);

            return (
              <div
                key={conv.id}
                onClick={() => onSelectConversation(conv)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--border-subtle)',
                  background: isActive ? 'var(--primary-light)' : 'transparent',
                  transition: 'background 0.15s ease'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={avatar}
                    alt={displayName}
                    className="avatar"
                    style={{ width: '44px', height: '44px' }}
                  />
                  {conv.recipient?.is_online && (
                    <span style={{
                      position: 'absolute',
                      bottom: '2px',
                      right: '2px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#10b981',
                      border: '2px solid #ffffff'
                    }} />
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{
                      fontWeight: 700,
                      fontSize: '14px',
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {displayName}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', flexShrink: 0 }}>
                      {formatRelativeTime(conv.last_message_time)}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginTop: '2px'
                  }}>
                    {conv.last_message_text || 'No messages yet'}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConversationList;
