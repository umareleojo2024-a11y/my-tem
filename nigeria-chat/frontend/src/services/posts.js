import { supabase, isSupabaseConfigured } from './supabase';

const INITIAL_POSTS = [
  {
    id: 'post_001',
    content: 'Welcome to Nigeria Chat! Built with love for our vibrant community across Nigeria and around the globe. Share your thoughts, connect with friends, and let Naija shine! 🇳🇬💚',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    likes_count: 42,
    comments_count: 9,
    shares_count: 5,
    location: 'Abuja, Nigeria',
    author: {
      id: 'usr_eleojo_001',
      username: 'eleojocafe',
      full_name: 'Eleojo Cafe',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      is_verified: true,
      state_of_origin: 'Kogi'
    },
    media: [
      {
        id: 'm1',
        media_url: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800',
        media_type: 'image'
      }
    ]
  },
  {
    id: 'post_002',
    content: 'Tech innovators in Lagos: Who is building AI tools tailored for African languages (Yoruba, Igbo, Hausa, Pidgin)? Let us connect in the comments!',
    created_at: new Date(Date.now() - 7200000).toISOString(),
    likes_count: 28,
    comments_count: 14,
    shares_count: 3,
    location: 'Yaba, Lagos',
    author: {
      id: 'usr_tunde_002',
      username: 'tunde_lagos',
      full_name: 'Babatunde Adeleke',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      is_verified: true,
      state_of_origin: 'Lagos'
    },
    media: []
  }
];

export const getFeedPosts = async (page = 1, limit = 10) => {
  if (!isSupabaseConfigured()) {
    const local = JSON.parse(sessionStorage.getItem('nc_local_posts') || '[]');
    return { data: [...local, ...INITIAL_POSTS], error: null };
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles(id, username, full_name, avatar_url, is_verified, state_of_origin),
      media:post_media(id, media_url, media_type, file_name)
    `)
    .order('created_at', { ascending: false })
    .range(from, to);

  return { data, error };
};

export const createPost = async ({ content, media = [], location = 'Nigeria' }) => {
  if (!isSupabaseConfigured()) {
    const newPost = {
      id: 'post_' + Date.now(),
      content,
      created_at: new Date().toISOString(),
      likes_count: 0,
      comments_count: 0,
      shares_count: 0,
      location,
      author: {
        id: 'usr_eleojo_001',
        username: 'eleojocafe',
        full_name: 'Eleojo Cafe',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        is_verified: true,
        state_of_origin: 'Kogi'
      },
      media: media.map((m, i) => ({ id: 'm_' + i, media_url: m.url, media_type: m.type }))
    };
    const local = JSON.parse(sessionStorage.getItem('nc_local_posts') || '[]');
    sessionStorage.setItem('nc_local_posts', JSON.stringify([newPost, ...local]));
    return { data: newPost, error: null };
  }

  const { data: { user } } = await supabase.auth.getUser();
  const { data: post, error } = await supabase
    .from('posts')
    .insert({
      author_id: user.id,
      content,
      location,
      visibility: 'public'
    })
    .select()
    .single();

  if (error) return { data: null, error };

  if (media && media.length > 0) {
    const mediaRecords = media.map(m => ({
      post_id: post.id,
      media_url: m.url,
      media_type: m.type || 'image',
      file_name: m.name
    }));
    await supabase.from('post_media').insert(mediaRecords);
  }

  return { data: post, error: null };
};

export const likePost = async (postId) => {
  if (!isSupabaseConfigured()) return { success: true };
  const user = (await supabase.auth.getUser()).data.user;
  return await supabase.from('reactions').upsert({
    user_id: user.id,
    target_type: 'post',
    target_id: postId,
    reaction_type: 'like'
  });
};

export const unlikePost = async (postId) => {
  if (!isSupabaseConfigured()) return { success: true };
  const user = (await supabase.auth.getUser()).data.user;
  return await supabase.from('reactions').delete().match({
    user_id: user.id,
    target_type: 'post',
    target_id: postId
  });
};

export const getPostComments = async (postId) => {
  if (!isSupabaseConfigured()) {
    return {
      data: [
        {
          id: 'c1',
          content: 'Proudly Nigerian! Loving the clean interface.',
          created_at: new Date(Date.now() - 1800000).toISOString(),
          author: {
            username: 'chioma_ph',
            full_name: 'Chioma Okonkwo',
            avatar_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150'
          }
        }
      ],
      error: null
    };
  }

  return await supabase
    .from('comments')
    .select(`
      *,
      author:profiles(id, username, full_name, avatar_url)
    `)
    .eq('post_id', postId)
    .order('created_at', { ascending: true });
};

export const addComment = async (postId, content) => {
  if (!isSupabaseConfigured()) {
    const comment = {
      id: 'c_' + Date.now(),
      content,
      created_at: new Date().toISOString(),
      author: {
        username: 'eleojocafe',
        full_name: 'Eleojo Cafe',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      }
    };
    return { data: comment, error: null };
  }

  const user = (await supabase.auth.getUser()).data.user;
  return await supabase
    .from('comments')
    .insert({
      post_id: postId,
      author_id: user.id,
      content
    })
    .select(`*, author:profiles(id, username, full_name, avatar_url)`)
    .single();
};
