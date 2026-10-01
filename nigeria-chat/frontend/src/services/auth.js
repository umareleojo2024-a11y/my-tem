import { supabase, isSupabaseConfigured } from './supabase';

const DEMO_USER = {
  id: 'usr_eleojo_001',
  email: 'eleojo@nigeriachat.ng',
  user_metadata: {
    username: 'eleojocafe',
    full_name: 'Eleojo Cafe (Founder)',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    state_of_origin: 'Kogi'
  }
};

export const signUp = async ({ email, password, username, fullName, stateOfOrigin }) => {
  if (!isSupabaseConfigured()) {
    console.warn('[Nigeria Chat] Supabase not configured in .env. Using development session.');
    const user = {
      id: 'usr_' + Date.now(),
      email,
      user_metadata: {
        username,
        full_name: fullName || username,
        state_of_origin: stateOfOrigin || 'Lagos',
        avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`
      }
    };
    localStorage.setItem('nc_demo_user', JSON.stringify(user));
    return { data: { user }, error: null };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        full_name: fullName || username,
        state_of_origin: stateOfOrigin || 'Lagos'
      }
    }
  });

  return { data, error };
};

export const signIn = async ({ email, password }) => {
  if (!isSupabaseConfigured()) {
    console.warn('[Nigeria Chat] Supabase not configured in .env. Using development session.');
    const user = { ...DEMO_USER, email };
    localStorage.setItem('nc_demo_user', JSON.stringify(user));
    return { data: { user, session: { access_token: 'demo-token' } }, error: null };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  return { data, error };
};

export const signOut = async () => {
  if (!isSupabaseConfigured()) {
    localStorage.removeItem('nc_demo_user');
    return { error: null };
  }
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  if (!isSupabaseConfigured()) {
    const saved = localStorage.getItem('nc_demo_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEMO_USER;
      }
    }
    return DEMO_USER;
  }

  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const onAuthStateChange = (callback) => {
  if (!isSupabaseConfigured()) {
    const user = getCurrentUser();
    callback('SIGNED_IN', { user });
    return { data: { subscription: { unsubscribe: () => {} } } };
  }
  return supabase.auth.onAuthStateChange(callback);
};
