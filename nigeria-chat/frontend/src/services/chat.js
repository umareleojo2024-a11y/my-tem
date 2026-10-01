import { supabase, isSupabaseConfigured } from './supabase';

const INITIAL_CONVERSATIONS = [
  {
    id: 'conv_001',
    title: null,
    is_group: false,
    last_message_text: 'Hello Eleojo! Excited about Nigeria Chat 🚀',
    last_message_time: new Date(Date.now() - 600000).toISOString(),
    recipient: {
      id: 'usr_tunde_002',
      username: 'tunde_lagos',
      full_name: 'Babatunde Adeleke',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      is_online: true,
      state_of_origin: 'Lagos'
    }
  },
  {
    id: 'conv_002',
    title: 'Naija Tech Hub 🇳🇬',
    is_group: true,
    last_message_text: 'Let us organize an Abuja tech meetup next weekend!',
    last_message_time: new Date(Date.now() - 3600000).toISOString(),
    recipient: {
      id: 'group_001',
      username: 'naija_tech',
      full_name: 'Naija Tech Hub 🇳🇬',
      avatar_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150',
      is_online: true,
      members_count: 34
    }
  }
];

const INITIAL_MESSAGES = {
  conv_001: [
    {
      id: 'msg_001',
      conversation_id: 'conv_001',
      sender_id: 'usr_tunde_002',
      message_text: 'Good day! How is the platform coming along?',
      media_url: null,
      media_type: null,
      created_at: new Date(Date.now() - 1200000).toISOString(),
      sender: {
        id: 'usr_tunde_002',
        username: 'tunde_lagos',
        full_name: 'Babatunde Adeleke',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
      }
    },
    {
      id: 'msg_002',
      conversation_id: 'conv_001',
      sender_id: 'usr_eleojo_001',
      message_text: 'Everything is running smoothly! We have full real-time messaging, stories, and multimedia support.',
      media_url: null,
      media_type: null,
      created_at: new Date(Date.now() - 900000).toISOString(),
      sender: {
        id: 'usr_eleojo_001',
        username: 'eleojocafe',
        full_name: 'Eleojo Cafe',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      }
    },
    {
      id: 'msg_003',
      conversation_id: 'conv_001',
      sender_id: 'usr_tunde_002',
      message_text: 'Hello Eleojo! Excited about Nigeria Chat 🚀',
      media_url: null,
      media_type: null,
      created_at: new Date(Date.now() - 600000).toISOString(),
      sender: {
        id: 'usr_tunde_002',
        username: 'tunde_lagos',
        full_name: 'Babatunde Adeleke',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
      }
    }
  ],
  conv_002: [
    {
      id: 'msg_101',
      conversation_id: 'conv_002',
      sender_id: 'usr_chioma_004',
      message_text: 'Hello everyone! Welcome to the official Naija Tech Group.',
      created_at: new Date(Date.now() - 7200000).toISOString(),
      sender: {
        id: 'usr_chioma_004',
        username: 'chioma_ph',
        full_name: 'Chioma Okonkwo',
        avatar_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150'
      }
    },
    {
      id: 'msg_102',
      conversation_id: 'conv_002',
      sender_id: 'usr_amina_003',
      message_text: 'Let us organize an Abuja tech meetup next weekend!',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      sender: {
        id: 'usr_amina_003',
        username: 'amina_kano',
        full_name: 'Amina Yusuf',
        avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
      }
    }
  ]
};

export const getConversations = async () => {
  if (!isSupabaseConfigured()) {
    return { data: INITIAL_CONVERSATIONS, error: null };
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: [], error: 'User not authenticated' };

  // Fetch conversation memberships for user
  const { data: memberships, error: memErr } = await supabase
    .from('conversation_members')
    .select('conversation_id')
    .eq('user_id', user.id);

  if (memErr) return { data: null, error: memErr };

  const convIds = memberships.map(m => m.conversation_id);
  if (convIds.length === 0) return { data: [], error: null };

  const { data: conversations, error: convErr } = await supabase
    .from('conversations')
    .select(`
      *,
      members:conversation_members(
        user:profiles(id, username, full_name, avatar_url, is_online, last_seen)
      )
    `)
    .in('id', convIds)
    .order('last_message_time', { ascending: false });

  if (convErr) return { data: null, error: convErr };

  // Format recipient helper
  const formatted = conversations.map(c => {
    const otherMember = c.members?.find(m => m.user?.id !== user.id)?.user;
    return {
      ...c,
      recipient: otherMember || {
        id: c.id,
        full_name: c.title || 'Chat',
        username: 'group',
        avatar_url: c.group_avatar_url || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150'
      }
    };
  });

  return { data: formatted, error: null };
};

export const getMessages = async (conversationId) => {
  if (!isSupabaseConfigured()) {
    const messages = INITIAL_MESSAGES[conversationId] || [];
    return { data: messages, error: null };
  }

  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      sender:profiles(id, username, full_name, avatar_url),
      reply_to:messages(id, message_text, sender_id, media_url, media_type)
    `)
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  return { data, error };
};

export const sendMessage = async ({ conversationId, messageText, mediaUrl = null, mediaType = null, replyToId = null }) => {
  if (!isSupabaseConfigured()) {
    const newMsg = {
      id: 'msg_' + Date.now(),
      conversation_id: conversationId,
      sender_id: 'usr_eleojo_001',
      message_text: messageText,
      media_url: mediaUrl,
      media_type: mediaType,
      reply_to_id: replyToId,
      created_at: new Date().toISOString(),
      sender: {
        id: 'usr_eleojo_001',
        username: 'eleojocafe',
        full_name: 'Eleojo Cafe',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      }
    };
    if (!INITIAL_MESSAGES[conversationId]) INITIAL_MESSAGES[conversationId] = [];
    INITIAL_MESSAGES[conversationId].push(newMsg);
    return { data: newMsg, error: null };
  }

  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      sender_id: user.id,
      message_text: messageText,
      media_url: mediaUrl,
      media_type: mediaType,
      reply_to_id: replyToId
    })
    .select(`
      *,
      sender:profiles(id, username, full_name, avatar_url),
      reply_to:messages(id, message_text, sender_id)
    `)
    .single();

  if (error) return { data: null, error };

  // Update conversation last message timestamp
  await supabase
    .from('conversations')
    .update({
      last_message_text: messageText || (mediaType ? `[${mediaType}]` : 'Media'),
      last_message_time: new Date().toISOString()
    })
    .eq('id', conversationId);

  return { data, error: null };
};

export const subscribeToMessages = (conversationId, onNewMessage) => {
  if (!isSupabaseConfigured()) {
    return { unsubscribe: () => {} };
  }

  const channel = supabase
    .channel(`chat_${conversationId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      },
      async (payload) => {
        // Fetch sender details
        const { data: sender } = await supabase
          .from('profiles')
          .select('id, username, full_name, avatar_url')
          .eq('id', payload.new.sender_id)
          .single();

        onNewMessage({
          ...payload.new,
          sender
        });
      }
    )
    .subscribe();

  return {
    unsubscribe: () => {
      supabase.removeChannel(channel);
    }
  };
};
