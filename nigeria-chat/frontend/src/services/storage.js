import { supabase, isSupabaseConfigured } from './supabase';

export const uploadToBucket = async (bucket, path, file) => {
  if (!isSupabaseConfigured()) {
    return { path, url: URL.createObjectURL(file), error: null };
  }

  const { data, error } = await supabase.storage.from(bucket).upload(path, file);
  if (error) return { data: null, error };

  const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(path);
  return { path: data.path, url: publicData.publicUrl, error: null };
};

export const deleteFromBucket = async (bucket, paths) => {
  if (!isSupabaseConfigured()) return { success: true };
  return await supabase.storage.from(bucket).remove(Array.isArray(paths) ? paths : [paths]);
};

export default {
  uploadToBucket,
  deleteFromBucket
};
