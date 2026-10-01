import { createClient } from '@supabase/supabase-js';

// Read environment variables and sanitize whitespace
const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const rawAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

/**
 * Sanitizes and formats the Supabase URL:
 * - Ensures https:// protocol
 * - Removes trailing slashes
 */
const formatSupabaseUrl = (url) => {
  if (!url) return '';
  let formatted = url.trim();
  if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
    formatted = `https://${formatted}`;
  }
  return formatted.replace(/\/+$/, '');
};

/**
 * Validates whether Supabase environment variables are properly configured with real values
 * rather than empty strings or template placeholders.
 */
export const isSupabaseConfigured = () => {
  if (!rawUrl || !rawAnonKey) return false;

  const placeholders = [
    'your-project-id',
    'your-project.supabase.co',
    'your-supabase-anon-key',
    'your-anon-key',
    'demo-key',
    'demo-nigeria-chat'
  ];

  const hasPlaceholder = placeholders.some(
    (ph) => rawUrl.toLowerCase().includes(ph) || rawAnonKey.toLowerCase().includes(ph)
  );

  if (hasPlaceholder) return false;

  try {
    const parsed = new URL(formatSupabaseUrl(rawUrl));
    return Boolean(parsed.hostname && rawAnonKey.length >= 20);
  } catch (e) {
    return false;
  }
};

/**
 * Creates a safe fallback dummy client for development/demo mode when
 * real Supabase credentials are not yet supplied.
 * This prevents runtime "ERR_NAME_NOT_RESOLVED", unhandled network rejections,
 * or broken WebSocket connection loops in the browser console.
 */
const createSafeFallbackClient = () => {
  const dummyQueryBuilder = {
    select: () => dummyQueryBuilder,
    insert: async () => ({ data: null, error: null }),
    update: () => dummyQueryBuilder,
    upsert: () => dummyQueryBuilder,
    delete: () => dummyQueryBuilder,
    eq: () => dummyQueryBuilder,
    in: () => dummyQueryBuilder,
    or: () => dummyQueryBuilder,
    order: () => dummyQueryBuilder,
    range: () => dummyQueryBuilder,
    limit: () => dummyQueryBuilder,
    single: async () => ({ data: null, error: null }),
    then: (resolve) => resolve({ data: [], error: null })
  };

  return {
    auth: {
      getUser: async () => {
        const saved = localStorage.getItem('nc_demo_user');
        return { data: { user: saved ? JSON.parse(saved) : null }, error: null };
      },
      getSession: async () => {
        const saved = localStorage.getItem('nc_demo_user');
        return { data: { session: saved ? { user: JSON.parse(saved) } : null }, error: null };
      },
      signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured in .env') }),
      signUp: async () => ({ data: null, error: new Error('Supabase not configured in .env') }),
      signOut: async () => {
        localStorage.removeItem('nc_demo_user');
        return { error: null };
      },
      onAuthStateChange: (callback) => {
        const saved = localStorage.getItem('nc_demo_user');
        if (saved) {
          try {
            callback('SIGNED_IN', { user: JSON.parse(saved) });
          } catch (e) {
            // ignore JSON parse error
          }
        }
        return { data: { subscription: { unsubscribe: () => {} } } };
      }
    },
    from: () => dummyQueryBuilder,
    channel: () => ({
      on: function () { return this; },
      subscribe: () => ({ unsubscribe: () => {} })
    }),
    removeChannel: () => {},
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: new Error('Supabase storage not configured') }),
        getPublicUrl: (path) => ({ data: { publicUrl: path } }),
        remove: async () => ({ data: null, error: null })
      })
    }
  };
};

// Initialize Supabase Client safely
let clientInstance;

if (isSupabaseConfigured()) {
  const sanitizedUrl = formatSupabaseUrl(rawUrl);
  clientInstance = createClient(sanitizedUrl, rawAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'nigeria_chat_auth_session'
    },
    realtime: {
      params: {
        eventsPerSecond: 10
      },
      timeout: 10000
    },
    global: {
      headers: {
        'x-application-name': 'Nigeria Chat (Eleojocafe)'
      }
    }
  });
} else {
  clientInstance = createSafeFallbackClient();
}

/**
 * Tests live connectivity to Supabase
 * @returns {Promise<{ connected: boolean, message: string }>}
 */
export const testSupabaseConnection = async () => {
  if (!isSupabaseConfigured()) {
    return {
      connected: false,
      message: 'Supabase credentials not configured in frontend/.env'
    };
  }

  try {
    const { error } = await clientInstance.from('profiles').select('id').limit(1);
    if (error && error.code !== 'PGRST116') {
      return {
        connected: false,
        message: `Connection error: ${error.message}`
      };
    }
    return {
      connected: true,
      message: 'Successfully connected to live Supabase database!'
    };
  } catch (err) {
    return {
      connected: false,
      message: `Network error: ${err.message || 'Failed to fetch'}`
    };
  }
};

export const supabase = clientInstance;
export default supabase;
