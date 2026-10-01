import React, { useState } from 'react';
import useChat from '../../hooks/useChat';
import useAuth from '../../hooks/useAuth';
import ConversationList from '../../components/Chat/ConversationList';
import ChatWindow from '../../components/Chat/ChatWindow';

export const Chat = () => {
  const { user } = useAuth();
  const {
    conversations,
    activeConversation,
    setActiveConversation,
    messages,
    loadingConversations,
    loadingMessages,
    error,
    replyingTo,
    setReplyingTo,
    sendMessage,
    refreshConversations
  } = useChat();

  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [newChatRecipient, setNewChatRecipient] = useState('');
  const [mobileShowChat, setMobileShowChat] = useState(false);

  const handleSelectConv = (conv) => {
    setActiveConversation(conv);
    setMobileShowChat(true);
  };

  const handleStartNewChat = (e) => {
    e.preventDefault();
    if (!newChatRecipient.trim()) return;

    const newConv = {
      id: 'conv_' + Date.now(),
      title: null,
      is_group: false,
      last_message_text: 'Started new conversation',
      last_message_time: new Date().toISOString(),
      recipient: {
        id: 'usr_' + Date.now(),
        username: newChatRecipient.toLowerCase().replace(/\s+/g, '_'),
        full_name: newChatRecipient,
        avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${newChatRecipient}`,
        is_online: true
      }
    };

    setActiveConversation(newConv);
    setShowNewChatModal(false);
    setNewChatRecipient('');
    setMobileShowChat(true);
  };

  return (
    <div style={{
      height: 'calc(100vh - var(--navbar-height))',
      marginTop: 'var(--navbar-height)',
      display: 'flex',
      overflow: 'hidden'
    }}>
      {/* Left Column: Conversation List */}
      <div style={{
        width: '100%',
        maxWidth: '380px',
        height: '100%',
        display: (mobileShowChat && window.innerWidth <= 768) ? 'none' : 'flex',
        flexDirection: 'column'
      }}>
        <ConversationList
          conversations={conversations}
          activeConversation={activeConversation}
          onSelectConversation={handleSelectConv}
          loading={loadingConversations}
          onNewChat={() => setShowNewChatModal(true)}
        />
      </div>

      {/* Right Column: Chat Window */}
      <div style={{
        flex: 1,
        height: '100%',
        display: (!mobileShowChat && window.innerWidth <= 768) ? 'none' : 'flex',
        flexDirection: 'column'
      }}>
        <ChatWindow
          conversation={activeConversation}
          messages={messages}
          loading={loadingMessages}
          error={error}
          replyingTo={replyingTo}
          setReplyingTo={setReplyingTo}
          onSendMessage={sendMessage}
          onBack={() => setMobileShowChat(false)}
        />
      </div>

      {/* New Chat Modal */}
      {showNewChatModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '16px'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '12px' }}>
              Start New Chat 🇳🇬
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Enter a name or @username to start messaging on Nigeria Chat.
            </p>

            <form onSubmit={handleStartNewChat}>
              <input
                type="text"
                value={newChatRecipient}
                onChange={(e) => setNewChatRecipient(e.target.value)}
                placeholder="e.g. Babatunde or amina_kano"
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-main)',
                  fontSize: '14px',
                  marginBottom: '16px'
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowNewChatModal(false)}
                  className="btn btn-outline"
                  style={{ fontSize: '13px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ fontSize: '13px' }}
                >
                  Start Chat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
