import { supabase, isSupabaseConfigured } from './supabase';

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n_01',
    type: 'like',
    title: 'New Like',
    message: 'Babatunde Adeleke liked your post',
    created_at: new Date(Date.now() - 1800000).toISOString(),
    is_read: false,
    sender: {
      username: 'tunde_lagos',
      full_name: 'Babatunde Adeleke',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    }
  },
  {
    id: 'n_02',
    type: 'comment',
    title: 'New Comment',
    message: 'Chioma Okonkwo commented on your post',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    is_read: false,
    sender: {
      username: 'chioma_ph',
      full_name: 'Chioma Okonkwo',
      avatar_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150'
    }
  },
  {
    id: 'n_03',
    type: 'follow',
    title: 'New Follower',
    message: 'Amina Yusuf started following you',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    is_read: true,
    sender: {
      username: 'amina_kano',
      full_name: 'Amina Yusuf',
      avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
    }
  }
];

export const getNotifications = async () => {
  if (!isSupabaseConfigured()) {
    return { data: INITIAL_NOTIFICATIONS, error: null };
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: [], error: null };

  const { data, error } = await supabase
    .from('notifications')
    .select(`
      *,
      sender:profiles(id, username, full_name, avatar_url)
    `)
    .eq('receiver_id', user.id)
    .order('created_at', { ascending: false });

  return { data, error };
};

export const markAsRead = async (notificationId) => {
  if (!isSupabaseConfigured()) return { success: true };
  return await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);
};

export const markAllAsRead = async () => {
  if (!isSupabaseConfigured()) return { success: true };
  const { data: { user } } = await supabase.auth.getUser();
  return await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('receiver_id', user.id);
};
