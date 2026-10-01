import { supabaseAdmin } from '../services/supabaseAdmin.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get conversation IDs where the user is a member
    const { data: memberships, error: memberErr } = await supabaseAdmin
      .from('conversation_members')
      .select('conversation_id, last_read_at')
      .eq('user_id', userId);

    if (memberErr) return errorResponse(res, memberErr.message, 400);

    const convIds = memberships.map(m => m.conversation_id);
    if (convIds.length === 0) {
      return successResponse(res, [], 'No conversations found');
    }

    const { data: conversations, error: convErr } = await supabaseAdmin
      .from('conversations')
      .select(`
        *,
        members:conversation_members(
          user:profiles(id, username, full_name, avatar_url, is_online, last_seen)
        )
      `)
      .in('id', convIds)
      .order('last_message_time', { ascending: false });

    if (convErr) return errorResponse(res, convErr.message, 400);
    return successResponse(res, conversations, 'Conversations fetched successfully');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.id;

    // Verify user is in conversation
    const { data: member, error: memberCheck } = await supabaseAdmin
      .from('conversation_members')
      .select('id')
      .eq('conversation_id', conversationId)
      .eq('user_id', userId)
      .single();

    if (memberCheck || !member) {
      return errorResponse(res, 'Access denied to this conversation', 403);
    }

    const { data: messages, error } = await supabaseAdmin
      .from('messages')
      .select(`
        *,
        sender:profiles(id, username, full_name, avatar_url),
        reply_to:messages(id, message_text, sender_id, media_url, media_type)
      `)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) return errorResponse(res, error.message, 400);

    // Update last_read_at
    await supabaseAdmin
      .from('conversation_members')
      .update({ last_read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .eq('user_id', userId);

    return successResponse(res, messages, 'Messages fetched');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const sender_id = req.user.id;
    const { message_text, media_url, media_type, reply_to_id } = req.body;

    if (!message_text && !media_url) {
      return errorResponse(res, 'Message text or media is required', 400);
    }

    const { data: message, error } = await supabaseAdmin
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id,
        message_text,
        media_url,
        media_type,
        reply_to_id
      })
      .select(`
        *,
        sender:profiles(id, username, full_name, avatar_url),
        reply_to:messages(id, message_text, sender_id)
      `)
      .single();

    if (error) return errorResponse(res, error.message, 400);

    // Update conversation last_message_text and time
    await supabaseAdmin
      .from('conversations')
      .update({
        last_message_text: message_text || (media_type ? `[${media_type}]` : 'Media'),
        last_message_time: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', conversationId);

    return successResponse(res, message, 'Message sent', 201);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const startConversation = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { recipientId, title, isGroup = false } = req.body;

    if (!recipientId && !isGroup) {
      return errorResponse(res, 'Recipient ID is required for direct chat', 400);
    }

    // Create conversation
    const { data: conv, error: convErr } = await supabaseAdmin
      .from('conversations')
      .insert({
        title: title || null,
        is_group: isGroup,
        created_by: senderId
      })
      .select()
      .single();

    if (convErr) return errorResponse(res, convErr.message, 400);

    // Add members
    const membersToInsert = [
      { conversation_id: conv.id, user_id: senderId, is_admin: true }
    ];
    if (recipientId && recipientId !== senderId) {
      membersToInsert.push({ conversation_id: conv.id, user_id: recipientId, is_admin: false });
    }

    await supabaseAdmin.from('conversation_members').insert(membersToInsert);

    return successResponse(res, conv, 'Conversation started', 201);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};
