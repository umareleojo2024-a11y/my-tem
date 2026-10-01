import { supabaseAdmin } from '../services/supabaseAdmin.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const { data: notifications, error } = await supabaseAdmin
      .from('notifications')
      .select(`
        *,
        sender:profiles(id, username, full_name, avatar_url)
      `)
      .eq('receiver_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) return errorResponse(res, error.message, 400);
    return successResponse(res, notifications, 'Notifications fetched');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const markAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const query = supabaseAdmin
      .from('notifications')
      .update({ is_read: true })
      .eq('receiver_id', userId);

    if (id !== 'all') {
      query.eq('id', id);
    }

    const { error } = await query;
    if (error) return errorResponse(res, error.message, 400);

    return successResponse(res, null, 'Notifications updated');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};
