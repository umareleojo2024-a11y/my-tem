import { supabase, isSupabaseConfigured } from './supabase';

const DEMO_PROFILES = [
  {
    id: 'usr_eleojo_001',
    username: 'eleojocafe',
    full_name: 'Eleojo Cafe',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    cover_url: '',
    bio: 'Founder of Nigeria Chat. Tech Enthusiast, Naija to the World! 🇳🇬✨',
    state_of_origin: 'Kogi',
    city: 'Abuja',
    is_verified: true,
    is_online: true
  },
  {
    id: 'usr_tunde_002',
    username: 'tunde_lagos',
    full_name: 'Babatunde Adeleke',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    cover_url: '',
    bio: 'Software engineer based in Yaba, Lagos. Afrobeats lover.',
    state_of_origin: 'Lagos',
    city: 'Ikeja',
    is_verified: true,
    is_online: true
  },
  {
    id: 'usr_amina_003',
    username: 'amina_kano',
    full_name: 'Amina Yusuf',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    cover_url: '',
    bio: 'Digital artist & entrepreneur. Northern Nigeria vibes.',
    state_of_origin: 'Kano',
    city: 'Kano',
    is_verified: false,
    is_online: false
  },
  {
    id: 'usr_chioma_004',
    username: 'chioma_ph',
    full_name: 'Chioma Okonkwo',
    avatar_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150',
    cover_url: '',
    bio: 'Event planner & food blogger in Port Harcourt.',
    state_of_origin: 'Rivers',
    city: 'Port Harcourt',
    is_verified: true,
    is_online: true
  }
];

export const getProfile = async (userId) => {
  if (!isSupabaseConfigured()) {
    const profile = DEMO_PROFILES.find(p => p.id === userId) || DEMO_PROFILES[0];
    return { data: profile, error: null };
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  return { data, error };
};

export const updateProfile = async (userId, updates) => {
  if (!isSupabaseConfigured()) {
    return { data: { ...DEMO_PROFILES[0], ...updates }, error: null };
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();

  return { data, error };
};

export const searchUsers = async (query) => {
  if (!isSupabaseConfigured()) {
    const q = query.toLowerCase();
    const results = DEMO_PROFILES.filter(p => 
      p.username.toLowerCase().includes(q) || 
      p.full_name.toLowerCase().includes(q)
    );
    return { data: results, error: null };
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, full_name, avatar_url, state_of_origin, is_verified, is_online')
    .or(`username.ilike.%${query}%,full_name.ilike.%${query}%`)
    .limit(20);

  return { data, error };
};

export const followUser = async (targetId) => {
  if (!isSupabaseConfigured()) return { success: true };
  const user = (await supabase.auth.getUser()).data.user;
  return await supabase.from('follows').insert({
    follower_id: user.id,
    following_id: targetId
  });
};

export const unfollowUser = async (targetId) => {
  if (!isSupabaseConfigured()) return { success: true };
  const user = (await supabase.auth.getUser()).data.user;
  return await supabase.from('follows').delete().match({
    follower_id: user.id,
    following_id: targetId
  });
};
