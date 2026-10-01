import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from '../Message/MessageBubble';
import { getAvatarUrl } from '../../utils/formatters';
import useAuth from '../../hooks/useAuth';

export const ChatWindow = ({
  conversation,
  messages,
  loading,
  error,
  replyingTo,
  setReplyingTo,
  onSendMessage,
  onBack
}) => {
  const { user } = useAuth();
  const [inputText, setInputText] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim() && !mediaFile) return;

    try {
      setSending(true);
      let mediaPayload = null;

      if (mediaFile) {
        mediaPayload = {
          url: mediaPreview,
          type: mediaFile.type.startsWith('image/') ? 'image' : mediaFile.type.startsWith('video/') ? 'video' : 'audio',
          name: mediaFile.name
        };
      }

      await onSendMessage(inputText.trim(), mediaPayload);
      setInputText('');
      setMediaFile(null);
      setMediaPreview(null);
    } catch (err) {
      console.error('Send error', err);
    } finally {
      setSending(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      const url = URL.createObjectURL(file);
      setMediaPreview(url);
    }
  };

  if (!conversation) {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
          Welcome to Nigeria Chat Messages
        </h3>
        <p style={{ fontSize: '14px', maxWidth: '360px', textAlign: 'center', marginTop: '6px' }}>
          Select a chat on the left to start sending real-time messages, photos, audio, and videos!
        </p>
      </div>
    );
  }

  const displayName = conversation.title || conversation.recipient?.full_name || conversation.recipient?.username || 'Chat';
  const avatar = conversation.group_avatar_url || getAvatarUrl(conversation.recipient);

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--bg-main)'
    }}>
      {/* Header */}
      <div style={{
        height: '60px',
        padding: '0 16px',
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {onBack && (
            <button
              onClick={onBack}
              className="btn btn-outline"
              style={{ padding: '6px 10px', fontSize: '14px', marginRight: '4px' }}
            >
              ← Back
            </button>
          )}
          <div style={{ position: 'relative' }}>
            <img
              src={avatar}
              alt={displayName}
              className="avatar"
              style={{ width: '38px', height: '38px' }}
            />
            {conversation.recipient?.is_online && (
              <span style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#10b981',
                border: '2px solid #ffffff'
              }} />
            )}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)' }}>
              {displayName}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {conversation.recipient?.is_online ? 'Online now' : 'Active recently'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="btn btn-outline" 
            title="Voice Call" 
            style={{ padding: '6px 10px', fontSize: '14px' }}
            onClick={() => alert(`Calling ${displayName}...`)}
          >
            📞
          </button>
          <button 
            className="btn btn-outline" 
            title="Video Call" 
            style={{ padding: '6px 10px', fontSize: '14px' }}
            onClick={() => alert(`Starting video call with ${displayName}...`)}
          >
            📹
          </button>
        </div>
      </div>

      {/* Message List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '13px',
            marginBottom: '12px'
          }}>
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>👋</div>
            <div style={{ fontWeight: 600 }}>No messages in this chat yet</div>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>
              Say hello and begin your conversation!
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isSelf = msg.sender_id === user?.id || msg.sender?.username === 'eleojocafe';
            return (
              <MessageBubble
                key={msg.id}
                message={msg}
                isSelf={isSelf}
                onReply={(m) => setReplyingTo(m)}
              />
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Replying banner */}
      {replyingTo && (
        <div style={{
          background: 'var(--bg-surface)',
          padding: '8px 16px',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px'
        }}>
          <div>
            <span style={{ fontWeight: 700, color: 'var(--primary)' }}>Replying to: </span>
            <span style={{ color: 'var(--text-secondary)' }}>
              {replyingTo.message_text || 'Media attachment'}
            </span>
          </div>
          <button
            onClick={() => setReplyingTo(null)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Media attachment preview */}
      {mediaPreview && (
        <div style={{
          background: 'var(--bg-surface)',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <img
            src={mediaPreview}
            alt="Preview"
            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }}
          />
          <div style={{ fontSize: '12px', flex: 1, color: 'var(--text-secondary)' }}>
            {mediaFile?.name}
          </div>
          <button
            onClick={() => { setMediaFile(null); setMediaPreview(null); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Input area */}
      <form onSubmit={handleSend} style={{
        padding: '12px 16px',
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        {/* Media file picker */}
        <label style={{ cursor: 'pointer', padding: '6px', fontSize: '18px' }} title="Attach Media">
          📎
          <input
            type="file"
            accept="image/*,video/*,audio/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </label>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-light)',
            background: 'var(--bg-main)',
            color: 'var(--text-primary)',
            fontSize: '14px',
            outline: 'none'
          }}
        />

        <button
          type="submit"
          disabled={sending || (!inputText.trim() && !mediaFile)}
          className="btn btn-primary"
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            opacity: (!inputText.trim() && !mediaFile) ? 0.6 : 1
          }}
        >
          {sending ? '...' : 'Send 🇳🇬'}
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
