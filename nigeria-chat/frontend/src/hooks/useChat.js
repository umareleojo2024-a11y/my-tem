import { useState, useEffect, useCallback, useRef } from 'react';
import {
  getConversations,
  getMessages,
  sendMessage as apiSendMessage,
  subscribeToMessages
} from '../services/chat';

export const useChat = (initialConversationId = null) => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);

  const subscriptionRef = useRef(null);

  // Load conversations
  const fetchConversations = useCallback(async () => {
    try {
      setLoadingConversations(true);
      setError(null);
      const { data, error: err } = await getConversations();
      if (err) throw err;
      setConversations(data || []);

      if (data && data.length > 0 && !activeConversation) {
        const found = initialConversationId
          ? data.find(c => c.id === initialConversationId) || data[0]
          : data[0];
        setActiveConversation(found);
      }
    } catch (err) {
      setError(err.message || 'Failed to load conversations');
    } finally {
      setLoadingConversations(false);
    }
  }, [initialConversationId, activeConversation]);

  useEffect(() => {
    fetchConversations();
  }, []);

  // Load messages when active conversation changes
  useEffect(() => {
    if (!activeConversation?.id) return;

    let isMounted = true;
    const loadMsgs = async () => {
      try {
        setLoadingMessages(true);
        setError(null);
        const { data, error: err } = await getMessages(activeConversation.id);
        if (err) throw err;
        if (isMounted) setMessages(data || []);
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load messages');
      } finally {
        if (isMounted) setLoadingMessages(false);
      }
    };

    loadMsgs();

    // Subscribe to realtime updates
    if (subscriptionRef.current?.unsubscribe) {
      subscriptionRef.current.unsubscribe();
    }

    subscriptionRef.current = subscribeToMessages(activeConversation.id, (newMsg) => {
      setMessages((prev) => {
        if (prev.some(m => m.id === newMsg.id)) return prev;
        return [...prev, newMsg];
      });
    });

    return () => {
      isMounted = false;
      if (subscriptionRef.current?.unsubscribe) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [activeConversation?.id]);

  // Send message
  const sendMessage = async (text, media = null) => {
    if (!activeConversation?.id) return;
    if (!text && !media) return;

    try {
      const { data, error: err } = await apiSendMessage({
        conversationId: activeConversation.id,
        messageText: text,
        mediaUrl: media?.url || null,
        mediaType: media?.type || null,
        replyToId: replyingTo?.id || null
      });

      if (err) throw err;

      if (data) {
        setMessages((prev) => [...prev, data]);
        // Update conversation last message in list
        setConversations((prev) =>
          prev.map((c) =>
            c.id === activeConversation.id
              ? {
                  ...c,
                  last_message_text: text || (media?.type ? `[${media.type}]` : 'Media'),
                  last_message_time: new Date().toISOString()
                }
              : c
          )
        );
      }
      setReplyingTo(null);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to send message');
      throw err;
    }
  };

  return {
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
    refreshConversations: fetchConversations
  };
};

export default useChat;
