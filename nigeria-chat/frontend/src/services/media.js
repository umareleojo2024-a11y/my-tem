import { supabase, isSupabaseConfigured } from './supabase';

export const uploadMediaFile = async (bucket, file) => {
  if (!isSupabaseConfigured()) {
    // Return object URL for demo mode
    const localUrl = URL.createObjectURL(file);
    return {
      url: localUrl,
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'audio',
      error: null
    };
  }

  const fileExt = file.name.split('.').pop();
  const filePath = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) return { url: null, error };

  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return {
    url: publicUrlData.publicUrl,
    name: file.name,
    type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'audio',
    error: null
  };
};

export const getMediaPublicUrl = (bucket, path) => {
  if (!isSupabaseConfigured()) return path;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data?.publicUrl || path;
};
